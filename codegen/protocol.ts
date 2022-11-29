import * as path from "https://deno.land/std@0.166.0/path/mod.ts";
import * as fs from "https://deno.land/std@0.166.0/fs/mod.ts";

import {
  createTypeContext,
  DocumentedType,
  ExportedType,
  Type,
  TypeContext,
  Variable,
} from "./type.ts";
import { format } from "./utils.ts";

export type Flow = "serverbound" | "clientbound";

export interface Protocol {
  name: string;
  version: number;
  packets: Record<Flow, Packet[]>;
}

export interface Packet {
  protocol: string;
  flow: Flow;
  id: number;
  name: string;
  fields: Record<string, Type>;
  reader?: (context: TypeContext) => Variable[];
  writer?: (context: TypeContext) => void;
}

export const types = new Map<string, ExportedType>();
export const protocols = new Map<string, Protocol>();
export let currentProtocol: Protocol | null = null;
export let currentFlow: Flow | null = null;

/** Exports and returns an aliased type. */
export function type(name: string, type: Type): ExportedType;
export function type(name: string): (type: Type) => ExportedType;
export function type(name: string, type?: Type): unknown {
  if (types.has(name)) {
    throw new Error(`Type '${name}' is already defined`);
  }

  const defineType = (type: Type) => {
    const exportedType = new ExportedType(name, type);
    types.set(name, exportedType);
    return exportedType;
  };

  if (type instanceof Type) return defineType(type);
  return (type: Type) => defineType(type);
}

/** Returns a documented type. If and where the doc comment appears depends on where it is being used. */
export function doc(type: Type, description: string): Type {
  if (type instanceof DocumentedType) {
    throw new Error("Type is already documented");
  }

  return new DocumentedType(description, type);
}

/** Defines a new protocol and uses it in subsequent calls to the {@linkcode packet} function. */
export function protocol(name: string, version: number): void {
  // if (version == null) {
  //   if (!protocols.has(name)) throw new Error(`Protocol `)
  // }

  if (protocols.has(name)) {
    throw new Error(`Protocol '${name}' is already defined`);
  }

  currentProtocol = { name, version, packets: { clientbound: [], serverbound: [] } };
  protocols.set(name, currentProtocol);
}

/** Sets the current packet flow used in subsequent calls to the {@linkcode packet} function.  */
export function flow(flow: Flow): void {
  currentFlow = flow;
}

/** Defines a packet using the current protocol and packet flow. */
export function packet(name: string, fields: Record<string, Type>): void;
export function packet(
  name: string,
  fields: Record<string, Type>,
  reader: (context: TypeContext) => Variable[],
  writer: (context: TypeContext) => void,
): void;
export function packet(
  name: string,
  fields: Record<string, Type>,
  reader?: (context: TypeContext) => Variable[],
  writer?: (context: TypeContext) => void,
): void {
  if (!currentProtocol) throw new Error("Must first call protocol()");
  if (!currentFlow) throw new Error("Must first call flow()");

  const packets = currentProtocol.packets[currentFlow];

  packets.push({
    protocol: currentProtocol.name,
    flow: currentFlow,
    id: packets.length,
    name,
    fields,
    reader,
    writer,
  });
}

/** Generates the modules for all types and protocols. */
export async function generate(outputPath: string): Promise<void> {
  console.log("generating protocol");

  await fs.ensureDir(path.resolve(outputPath));

  const output = async (filePath: string, code: string, shouldFormat = true) => {
    if (shouldFormat) code = await format(code);
    await Deno.writeTextFile(path.resolve(outputPath, filePath), code);
  };

  const symbols = new Set<string>();
  const usedSymbols = new Set<string>();
  let moduleInit = "// deno-lint-ignore-file\n";
  moduleInit += `import { Reader, Writer } from "minecraft/io/mod.ts";\n`;
  moduleInit += `import { CompoundTag } from "minecraft/nbt/tag.ts";\n`;
  moduleInit += "\n";

  const context = createTypeContext({
    defineGlobal(init, name) {
      moduleInit += "\nexport " + init + "\n";
      symbols.add(name);
    },
    defineConstant(name, expression) {
      let suffix = 0;
      while (symbols.has(name + (suffix || ""))) suffix++;
      name += suffix || "";
      moduleInit += `\nexport const ${name} = ${expression};\n`;
      symbols.add(name);
      return name;
    },
    onUse(name) {
      usedSymbols.add(name);
    },
  });

  for (const type of types.values()) {
    type.init(context, true);
  }

  await output("types.ts", moduleInit);

  const typesSymbols = new Set(symbols);

  for (const protocol of protocols.values()) {
    const protocolName = protocol.name.replace(/^./, (c) => c.toUpperCase());

    await fs.ensureDir(path.resolve(outputPath, protocol.name));

    const allFlows = Array.from<[Flow, string]>([
      ["serverbound", "Server"],
      ["clientbound", "Client"],
    ]);
    const flows = allFlows.filter(([flow]) => protocol.packets[flow].length > 0);

    for (const [flow, flowShort] of flows) {
      moduleInit = "";
      usedSymbols.clear();
      for (const packet of protocol.packets[flow]) {
        for (
          const type of Object.values(packet.fields).flatMap((type) => [type, ...type.subtypes])
        ) {
          if (type instanceof ExportedType) {
            usedSymbols.add(type.name);
          } else if (type.definition == "CompoundTag | null") {
            usedSymbols.add("CompoundTag");
          }
        }

        for (const type of Object.values(packet.fields)) {
          type.init(context);
        }
      }

      let moduleCode = "";
      const handler = flowShort + protocolName + "Handler";
      moduleCode += "\n";
      moduleCode += `export interface ${handler} extends PacketHandler {\n`;
      for (const packet of protocol.packets[flow]) {
        moduleCode += `handle${
          packet.name.replace(/^(?:Client|Server)(?:bound)?(\w+)Packet$/, "$1")
        }?(packet: ${packet.name}): Promise<void>;`;
      }
      moduleCode += `}\n\n`;

      for (const packet of protocol.packets[flow]) {
        moduleCode += `export class ${packet.name} implements Packet<${handler}> {\n`;

        moduleCode += `constructor(\n`;
        for (const [name, type] of Object.entries(packet.fields)) {
          if (type instanceof DocumentedType) moduleCode += type.comment;
          moduleCode += `public ${name}: ${type.definition},\n`;
        }
        moduleCode += `) {}\n`;

        const capture = context.capture(() => {
          if (packet.reader) {
            return packet.reader(context).map((variable) => {
              variable.use();
              return variable;
            });
          }
          return Object.entries(packet.fields).map(([name, type]) => {
            const variable = context.declare(name, () => type.reader(context));
            variable.use();
            return variable;
          });
        });
        moduleCode += `static read(reader: Reader) {\n${capture.statementBlock}return new this(${
          capture.value.map((variable) => variable.use()).join(", ")
        });\n}\n`;

        moduleCode += `write(writer: Writer) {\n`;
        if (packet.writer) {
          const { writer } = packet;
          moduleCode += context.capture(() => writer(context)).statementBlock;
        } else {
          for (const [name, type] of Object.entries(packet.fields)) {
            const capture = context.capture(() => type.writer(context, `this.${name}`));
            moduleCode += capture.statementBlock;
          }
        }
        moduleCode += `}\n`;

        moduleCode += `handle(handler: ${handler}) {\nreturn handler.handle${
          packet.name.replace(/^(?:Client|Server)(?:bound)?(\w+)Packet$/, "$1")
        }?.(this);\n}\n`;

        moduleCode += `}\n\n`;
      }

      let moduleImports = "// deno-lint-ignore-file\n";
      moduleImports += `import { Reader, Writer } from "minecraft/io/mod.ts";\n`;
      if (usedSymbols.has("CompoundTag")) {
        moduleImports += `import { CompoundTag } from "minecraft/nbt/tag.ts";\n`;
      }
      moduleImports += `import { Packet, PacketHandler } from "minecraft/network/packet.ts";\n`;
      const importedTypes = [...usedSymbols].filter((name) => typesSymbols.has(name));
      if (importedTypes.length > 0) {
        moduleImports += `import { ${importedTypes.join(", ")} } from "../types.ts";\n`;
      }

      await output(
        `${protocol.name}/${flow}.ts`,
        moduleImports + "\n" + moduleInit + "\n" + moduleCode,
      );
    }

    let moduleCode = "// deno-lint-ignore-file\n";
    moduleCode += `import { Protocol } from "minecraft/network/protocol.ts";\n`;
    for (const [flow, flowShort] of flows) {
      const imports = [
        flowShort + protocolName + "Handler",
        ...protocol.packets[flow].map((p) => p.name),
      ];
      moduleCode += `import { ${imports.join(", ")} } from "./${flow}.ts"\n`;
    }
    moduleCode += "\n";

    moduleCode += `export class ${protocolName}Protocol extends Protocol<${
      allFlows.map(([flow, flowShort]) =>
        protocol.packets[flow].length > 0 ? `${flowShort}${protocolName}Handler` : "void"
      )
    }> {\nconstructor() {\nsuper();\n`;
    for (const [flow] of flows) {
      for (const packet of protocol.packets[flow]) {
        moduleCode += `this.register${
          flow.replace(/^./, (c) => c.toUpperCase())
        }(${packet.id}, ${packet.name});\n`;
      }
    }
    moduleCode += "}\n}\n\n";
    moduleCode += `export const ${protocol.name}Protocol = new ${protocolName}Protocol();\n\n`;
    for (const [flow] of flows) moduleCode += `export * from "./${flow}.ts"\n`;

    await output(`${protocol.name}/mod.ts`, moduleCode);
  }

  let moduleCode = "";
  for (const protocol of protocols.values()) {
    moduleCode += `export * from "./${protocol.name}/mod.ts";\n`;
  }
  await output(`mod.ts`, moduleCode);
}

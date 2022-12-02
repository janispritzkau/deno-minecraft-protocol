import * as fs from "https://deno.land/std@0.166.0/fs/mod.ts";
import * as path from "https://deno.land/std@0.166.0/path/mod.ts";

import { AliasedType, DocumentedType, ExportedType, Type } from "./type.ts";
import { createTypeContext, TypeContext, Variable } from "./type_context.ts";
import { format, formatDocComment } from "./utils.ts";

export type Flow = "serverbound" | "clientbound";

export interface PacketMethod {
  declaration: string;
  body: string;
}

export interface Packet {
  protocol: string;
  flow: Flow;
  id: number;
  name: string;
  description: string | null;
  fields: Record<string, Type>;
  methods: PacketMethod[];
  reader?: (context: TypeContext) => Variable[];
  writer?: (context: TypeContext) => void;
  method(declaration: string, body: string): Packet;
  doc(description: string): Packet;
}

interface Protocol {
  name: string;
  packets: Record<Flow, Packet[]>;
}

const types = new Map<string, ExportedType>();
const protocols = new Map<string, Protocol>();
let currentProtocol: Protocol | null = null;
let currentFlow: Flow | null = null;

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

/** Defines a new protocol and uses it in subsequent calls to the {@linkcode packet} function. */
export function protocol(name: string): void {
  if (protocols.has(name)) {
    throw new Error(`Protocol '${name}' is already defined`);
  }

  currentProtocol = { name, packets: { clientbound: [], serverbound: [] } };
  protocols.set(name, currentProtocol);
}

/** Sets the current packet flow used in subsequent calls to the {@linkcode packet} function.  */
export function flow(flow: Flow): void {
  currentFlow = flow;
}

/** Defines a packet using the current protocol and packet flow. */
export function packet(name: string, fields: Record<string, Type>): Packet;
export function packet(
  name: string,
  fields: Record<string, Type>,
  reader: (context: TypeContext) => Variable[],
  writer: (context: TypeContext) => void,
): Packet;
export function packet(
  name: string,
  fields: Record<string, Type>,
  reader?: (context: TypeContext) => Variable[],
  writer?: (context: TypeContext) => void,
): Packet {
  if (!currentProtocol) throw new Error("Must first call protocol()");
  if (!currentFlow) throw new Error("Must first call flow()");

  const packets = currentProtocol.packets[currentFlow];

  const packet: Packet = {
    protocol: currentProtocol.name,
    flow: currentFlow,
    id: packets.length,
    name,
    description: null,
    fields,
    methods: [],
    reader,
    writer,
    method(declaration, body) {
      packet.methods.push({ declaration, body });
      return packet;
    },
    doc(description) {
      packet.description = description;
      return packet;
    },
  };

  packets.push(packet);
  return packet;
}

export interface GenerateOptions {
  imports?: Record<string, string[]>;
}

/** Generates the modules for all types and protocols. */
export async function generate(outputPath: string, options?: GenerateOptions): Promise<void> {
  console.log("generating protocol");

  await fs.ensureDir(path.resolve(outputPath));

  const output = async (filePath: string, code: string, shouldFormat = true) => {
    if (shouldFormat) code = await format(code);
    await Deno.writeTextFile(path.resolve(outputPath, filePath), code);
  };

  const importMap = new SymbolImportMap();
  if (options?.imports) {
    for (const path in options.imports) {
      for (const symbol of options.imports[path]!) {
        importMap.add(symbol, path);
      }
    }
  }

  const imports = (moduleDir: string, symbols: string[]) => {
    let code = "";
    for (const [importPath, importedSymbols] of importMap.imports(symbols)) {
      code += `import { ${importedSymbols.join(", ")} } from "${
        importPath.startsWith("./")
          ? path.relative(path.resolve(outputPath, moduleDir), importPath).replace(/^(?!\.)/, "./")
          : importPath
      }";\n`;
    }
    return code;
  };

  const symbols = new Set<string>();
  const usedSymbols = new Set<string>();
  let exportConstants = true;

  let moduleInit = "";

  const context = createTypeContext({
    declare(symbol, init, isGlobal) {
      let suffix = 0;
      while (symbols.has(symbol + (suffix || ""))) suffix++;
      symbol += suffix || "";
      moduleInit += init(symbol, isGlobal || exportConstants) + "\n";
      symbols.add(symbol);
      return symbol;
    },
    use(symbol) {
      if (symbol in globalThis) return;
      usedSymbols.add(symbol);
    },
  });

  for (const type of types.values()) {
    type.init(context, true);
  }

  await output(
    "types.ts",
    "// deno-lint-ignore-file\n" + imports("./", [
      "Reader",
      "Writer",
      ...[...usedSymbols].filter((symbol) => !symbols.has(symbol)),
    ]) + "\n" + moduleInit.trimEnd() + "\n",
  );

  for (const symbol of symbols) {
    importMap.add(symbol, "./" + path.join(outputPath, "types.ts"));
  }
  symbols.clear();

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
      exportConstants = false;

      const handler = flowShort + protocolName + "Handler";
      let moduleCode = "";
      moduleCode += `export interface ${handler} extends PacketHandler {\n`;
      for (const packet of protocol.packets[flow]) {
        moduleCode += `handle${
          packet.name.replace(/^(?:Client|Server)(?:bound)?(\w+)Packet$/, "$1")
        }?(packet: ${packet.name}): Promise<void>;`;
      }
      moduleCode += `}\n\n`;
      importMap.add(handler, "./" + path.join(outputPath, `${protocol.name}/${flow}.ts`));

      for (const packet of protocol.packets[flow]) {
        for (
          const type of Object.values(packet.fields)
            .flatMap((type) => [type, ...type.subtypes])
        ) {
          if (type instanceof AliasedType) {
            usedSymbols.add(type.definition);
          }
        }

        for (const type of Object.values(packet.fields)) type.init(context);

        let packetCode = "";
        if (packet.description) moduleCode += formatDocComment(packet.description);
        packetCode += `export class ${packet.name} implements Packet<${handler}> {\n`;

        packetCode += `constructor(\n`;
        for (const [name, type] of Object.entries(packet.fields)) {
          if (type instanceof DocumentedType) packetCode += type.comment;
          packetCode += `public ${name}: ${type.definition},\n`;
        }
        packetCode += `) {}\n`;

        const capture = context.capture(() => {
          if (packet.reader) {
            return packet.reader(context).map((variable) => {
              variable.use();
              return variable;
            });
          }
          return Object.entries(packet.fields).map(([name, type]) => {
            const variable = context.declare(name, () => type.read(context));
            variable.use();
            return variable;
          });
        });
        packetCode += `static read(reader: Reader) {\n${capture.statementBlock}return new this(${
          capture.value.map((variable) => variable.use()).join(", ")
        });\n}\n`;

        packetCode += `write(writer: Writer) {\n`;
        if (packet.writer) {
          const { writer } = packet;
          packetCode += context.capture(() => writer(context)).statementBlock;
        } else {
          for (const [name, type] of Object.entries(packet.fields)) {
            const capture = context.capture(() => type.write(context, `this.${name}`));
            packetCode += capture.statementBlock;
          }
        }
        packetCode += `}\n`;

        packetCode += `async handle(handler: ${handler}) {\nawait handler.handle${
          packet.name.replace(/^(?:Client|Server)(?:bound)?(\w+)Packet$/, "$1")
        }?.(this);\n}\n`;

        for (const method of packet.methods) {
          packetCode += `${method.declaration} {\n${method.body.trimEnd()}\n}\n`;
        }

        packetCode += `}\n\n`;

        moduleCode += moduleInit + packetCode;
        moduleInit = "";

        importMap.add(packet.name, "./" + path.join(outputPath, `${protocol.name}/${flow}.ts`));
      }

      let moduleImports = "// deno-lint-ignore-file\n";
      moduleImports += imports(
        protocol.name,
        [
          "Reader",
          "Writer",
          "Packet",
          "PacketHandler",
          ...usedSymbols,
        ].filter((symbol) => !symbols.has(symbol)),
      );

      await output(
        `${protocol.name}/${flow}.ts`,
        moduleImports + "\n" + moduleInit + moduleCode.trimEnd() + "\n",
      );
    }

    let moduleCode = "// deno-lint-ignore-file\n";
    moduleCode += imports(protocol.name, [
      "Protocol",
      ...flows.flatMap(([flow, flowShort]) => {
        return [flowShort + protocolName + "Handler", ...protocol.packets[flow].map((p) => p.name)];
      }),
    ]);
    moduleCode += "\n";

    moduleCode +=
      `export const ${protocol.name}Protocol = new class ${protocolName}Protocol extends Protocol<${
        allFlows.map(([flow, flowShort]) =>
          protocol.packets[flow].length > 0 ? `${flowShort}${protocolName}Handler` : "void"
        )
      }> {\nconstructor() {\nsuper();\n`;
    for (const [flow] of flows) {
      for (const packet of protocol.packets[flow]) {
        moduleCode += `this.register${flow.replace(/^./, (c) => c.toUpperCase())}(0x${
          packet.id.toString(16).padStart(2, "0")
        }, ${packet.name});\n`;
      }
    }
    moduleCode += "}\n};\n\n";

    for (const [flow] of flows) moduleCode += `export * from "./${flow}.ts"\n`;

    await output(`${protocol.name}/mod.ts`, moduleCode);
  }

  let moduleCode = `export * from "./types.ts";\n`;
  for (const protocol of protocols.values()) {
    moduleCode += `export * from "./${protocol.name}/mod.ts";\n`;
  }
  await output(`mod.ts`, moduleCode);
}

class SymbolImportMap {
  #importMap: Map<string, Set<string>> = new Map();
  #symbolMap: Map<string, string> = new Map();

  add(symbol: string, path: string) {
    const symbols = this.#importMap.get(path) ?? new Set();
    this.#importMap.set(path, symbols);
    symbols.add(symbol);
    if (this.#symbolMap.has(symbol)) throw new Error(`Symbol '${symbol}' is already imported`);
    this.#symbolMap.set(symbol, path);
  }

  imports(symbols: string[]) {
    const imports = new Map<string, string[]>();
    for (const symbol of symbols) {
      const path = this.#symbolMap.get(symbol);
      if (path == null) throw new Error(`Could not import symbol '${symbol}'`);
      const importedSymbols = imports.get(path) ?? [];
      imports.set(path, importedSymbols);
      importedSymbols.push(symbol);
    }
    return imports;
  }
}

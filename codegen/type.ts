export interface Statement {
  readonly code: string;
  readonly variable: Variable | null;
  push(): void;
}

export interface Variable {
  name: string;
  identifier: string;
  readonly hasSideEffect: boolean;
  readonly expression: string | null;
  readonly statement: Statement;
  readonly used: boolean;
  use(): string;
}

export interface Capture<T> {
  value: T;
  statements: Statement[];
  readonly statementBlock: string;
}

export interface CaptureOptions {
  /** Name of the `Reader` instance. */
  reader?: string;
  /** Name of the `Writer` instance. */
  writer?: string;
}

export interface TypeContext {
  readonly reader: string;
  readonly writer: string;
  global(name: string, init?: string): string;
  constant(key: symbol, expression?: string): string;
  /** Pushes a statement to the stack. */
  statement(code: string): void;
  /** Defines a let variable. */
  declare(name: string, type?: string, expression?: string, hasSideEffect?: boolean): Variable;
  /** Defines a const variable with lazy evaluated expression. */
  declare(name: string, evaluate: () => string, hasSideEffect?: boolean, type?: string): Variable;
  /** Captures variable declarations and statements declared inside the callback function. */
  capture<T>(fn: () => T, options?: CaptureOptions): Capture<T>;
  alias(type: Type, name: string): void;
  alias(type: Type): string | null;
  type(type: Type): string;
}

export abstract class Type {
  get subtypes(): Type[] {
    return [];
  }

  /** The type definition as used in type annotations and aliases. */
  abstract readonly definition: string;

  /** A type definition which is safe to use in ambiguous contexts. (e.g. array of union type) */
  get safeDefinition(): string {
    return this.definition;
  }

  /** Defines reader code and returns the value expression. */
  reader(context: TypeContext): string;
  reader(): never {
    throw new Error(`No reader method defined for ${this.constructor.name}`);
  }

  /** Creates writer code by pushing statements to the type context's stack. */
  writer(context: TypeContext, expression: string): void;
  writer(): void {}

  /** Initializes globals and constants. */
  init(context: TypeContext): void {
    this.subtypes.forEach((type) => type.init(context));
  }

  alias(name: string): Type {
    return new AliasedType(name, this);
  }

  optional(isPresent: Type): Type {
    return new OptionalType(this, isPresent);
  }
}

/*
  Basic types
*/

export class NativeType extends Type {
  #definition: string;

  constructor(
    private suffix: string,
    definition: string,
    private readArguments: Type[] = [],
  ) {
    super();
    this.#definition = definition;
  }

  get subtypes(): Type[] {
    return this.readArguments;
  }

  get definition(): string {
    return this.#definition;
  }

  get safeDefinition(): string {
    return this.definition.includes("|") ? `(${this.definition})` : this.definition;
  }

  reader(context: TypeContext): string {
    const args = this.readArguments.map((arg) => arg.reader(context));
    return `${context.reader}.read${this.suffix}(${args.join(", ")})`;
  }

  writer(context: TypeContext, expression: string): void {
    context.statement(`${context.writer}.write${this.suffix}(${expression});`);
  }
}

export class OptionalType extends Type {
  constructor(
    private value: Type,
    private isPresent: Type,
  ) {
    super();
    this.value = value;
    this.isPresent = isPresent;
    if (isPresent.definition != "boolean") throw new Error("'isPresent' must be a boolean type");
  }

  get subtypes(): Type[] {
    return [this.value, this.isPresent];
  }

  get definition(): string {
    return `${this.value.safeDefinition} | null`;
  }

  get safeDefinition(): string {
    return `(${this.definition})`;
  }

  reader(context: TypeContext): string {
    const isPresent = this.isPresent.reader(context);
    const capture = context.capture(() => this.value.reader(context));
    if (capture.statements.length > 0) {
      const value = context.declare("value", context.type(this), "null");
      const block = `${capture.statementBlock}${value.use()} = ${capture.value};\n`;
      context.statement(`if (${isPresent}) {\n${block}}`);
      return value.use();
    }
    return `${isPresent} ? ${capture.value} : null`;
  }

  writer(context: TypeContext, expression: string): void {
    this.isPresent.writer(context, `${expression} != null`);
    const capture = context.capture(() => this.value.writer(context, expression));
    const statement = capture.statements.length > 1
      ? `{\n${capture.statementBlock}}`
      : capture.statementBlock;
    context.statement(`if (${expression} != null) ${statement}`);
  }
}

export class ListType extends Type {
  constructor(
    private item: Type,
    private length: Type,
  ) {
    super();
    this.item = item;
    this.length = length;
  }

  get subtypes(): Type[] {
    return [this.item, ...this.item.subtypes, this.length, ...this.length.subtypes];
  }

  get definition(): string {
    return `${this.item.safeDefinition}[]`;
  }

  reader(context: TypeContext): string {
    const length = context.declare("length", () => this.length.reader(context));
    const list = context.declare("list", () => "[]", true, context.type(this));
    const { identifier: i } = context.declare("i");
    const capture = context.capture(() => this.item.reader(context));
    const block = `${capture.statementBlock}${list.use()}.push(${capture.value});\n`;
    const statement = capture.statements.length > 0 ? `{\n${block}}` : block;
    context.statement(`for (let ${i} = ${length.expression}; ${i}--;) ${statement}`);
    return list.use();
  }

  writer(context: TypeContext, expression: string): void {
    this.length.writer(context, `${expression}.length`);
    const item = context.declare("item");
    const capture = context.capture(() => this.item.writer(context, item.identifier));
    const statement = capture.statements.length > 1
      ? `{\n${capture.statementBlock}}`
      : capture.statementBlock;
    context.statement(`for (const ${item.identifier} of ${expression}) ${statement}`);
  }
}

export class StructType extends Type {
  constructor(public fields: Record<string, Type>) {
    super();
  }

  get subtypes(): Type[] {
    return Object.values(this.fields).flatMap((type) => [type, ...type.subtypes]);
  }

  get definition(): string {
    const includesDoc = Object.values(this.fields).some((type) => type instanceof DocumentedType);
    const fields = Object.entries(this.fields).map(([name, type]) => {
      const doc = type instanceof DocumentedType ? type.comment : "";
      return `${doc}${name}: ${type.definition}`;
    });
    return includesDoc ? `{\n${fields.join(";\n")};\n}` : `{ ${fields.join("; ")} }`;
  }

  reader(context: TypeContext): string {
    const { value: variables, statements } = context.capture(() => {
      return this.getFieldVariables(context).map((variable) => {
        variable.use();
        return variable;
      });
    });
    const redeclarations = variables.filter((variable) =>
      statements.find((stmt) => stmt.variable?.identifier == variable.expression)
    );
    let v = variables.length;
    let s = statements.length;
    while (v >= 0 && variables[v]?.statement == statements[s]) {
      v--;
      s--;
    }
    for (let i = 0; i <= s; i++) {
      const stmt = statements[i]!;
      if (
        stmt.variable && (redeclarations.includes(stmt.variable) || !stmt.variable.hasSideEffect)
      ) continue;
      stmt.push();
    }
    const fields = variables.map((variable, idx) => {
      let { name, identifier, expression } = variable;
      if (
        expression &&
        (idx > v || redeclarations.includes(variable) || !variable.hasSideEffect)
      ) identifier = expression;
      return name == identifier ? name : `${name}: ${identifier}`;
    });
    return `{ ${fields.join(", ")} }`;
  }

  writer(context: TypeContext, expression: string): void {
    for (const name in this.fields) {
      this.fields[name]!.writer(context, `${expression}.${name}`);
    }
  }

  getFieldVariables(context: TypeContext): Variable[] {
    return Object.entries(this.fields).map(([name, type]) => {
      return context.declare(name, () => type.reader(context));
    });
  }
}

export class MergeStructsType extends StructType {
  private structs: StructType[];

  constructor(...structs: StructType[]) {
    super(Object.fromEntries(structs.flatMap((struct) => Object.entries(struct.fields))));
    this.structs = structs;
  }

  get subtypes(): Type[] {
    return this.structs.flatMap((struct) => [struct, ...struct.subtypes]);
  }

  writer(context: TypeContext, expression: string): void {
    this.structs.forEach((struct) => struct.writer(context, expression));
  }

  getFieldVariables(context: TypeContext): Variable[] {
    return this.structs.flatMap((struct) => struct.getFieldVariables(context));
  }
}

export class MapType extends Type {
  constructor(
    private key: Type,
    private value: Type,
    private length: Type,
  ) {
    super();
  }

  get subtypes(): Type[] {
    return [this.key, ...this.key.subtypes, this.value, ...this.value.subtypes];
  }

  get definition(): string {
    return `Map<${this.key.definition}, ${this.value.definition}>`;
  }

  reader(context: TypeContext): string {
    const length = context.declare("length", () => this.length.reader(context), true);
    const map = context.declare("map", () => "new Map()", true, context.type(this));
    const { identifier: i } = context.declare("i");
    const { value: { key, value }, statementBlock } = context.capture(() => {
      return {
        key: context.declare("key", () => this.key.reader(context)).use(),
        value: context.declare("value", () => this.value.reader(context)).use(),
      };
    });
    const block = `${statementBlock}${map.use()}.set(${key}, ${value});\n`;
    context.statement(`for (let ${i} = ${length.expression}; ${i}--;) {\n${block}}`);
    return map.use();
  }

  writer(context: TypeContext, expression: string): void {
    const key = context.declare("key");
    const value = context.declare("value");
    const { statementBlock } = context.capture(() => ({
      key: this.key.writer(context, key.identifier),
      value: this.value.writer(context, value.identifier),
    }));
    this.length.writer(context, `${expression}.size`);
    context.statement(
      `for (const [${key.identifier}, ${value.identifier}] of ${expression}) {\n${statementBlock}}`,
    );
  }
}

const ENUM_MAPPER_FACTORY = `\
function createEnumMapper<T extends string>(keys: T[]) {
  const idMap = Object.fromEntries(keys.map((key, id) => [key, id]));
  return {
    toId(key: T): number {
      const id = idMap[key];
      if (id == null) throw new Error("Invalid enum key '\${key}'");
      return id;
    },
    fromId(id: number): T {
      const key = keys[id];
      if (key == null) throw new Error(\`Invalid enum id \${key}\`);
      return key;
    },
  };
}`;

export class EnumType extends Type {
  private mapper: symbol;

  constructor(private value: Type, private variants: string[], mapper?: symbol) {
    super();
    this.value = value;
    this.variants = variants;
    this.mapper = mapper ?? Symbol("mapper");
  }

  get subtypes(): Type[] {
    return [this.value];
  }

  get definition(): string {
    return this.variants.map((variant) => JSON.stringify(variant)).join(" | ");
  }

  get safeDefinition(): string {
    return `(${this.definition})`;
  }

  reader(context: TypeContext): string {
    return `${context.constant(this.mapper)}.fromId(${this.value.reader(context)})`;
  }

  writer(context: TypeContext, expression: string): void {
    this.value.writer(context, `${context.constant(this.mapper)}.toId(${expression})`);
  }

  init(context: TypeContext): void {
    super.init(context);
    context.global("createEnumMapper", ENUM_MAPPER_FACTORY);
    const alias = context.alias(this);
    const mapperName = alias?.replace(/^./, (c) => c.toLowerCase()).replace(/$/, "Enum");
    if (mapperName && this.mapper.description != mapperName) this.mapper = Symbol(mapperName);

    context.constant(
      this.mapper,
      `createEnumMapper${alias ? `<${alias}>` : ""}(${
        this.variants.length >= 20
          ? "JSON.parse(`" + JSON.stringify(this.variants) + "`)"
          : "[" + this.variants.map((variant) => JSON.stringify(variant)).join(", ") + "]"
      })`,
    );
  }
}

export class TaggedUnionType extends Type {
  variants: Record<string, StructType>;

  constructor(
    private tag: string,
    private tagType: Type,
    variants: Record<string, StructType | null>,
    private tagMapping?: Record<string, unknown>,
  ) {
    super();
    this.variants = Object.fromEntries(
      Object.entries(variants).map(([tag, struct]) => {
        const tagStruct = new StructType({ [this.tag]: new LiteralType(tag) });
        return [tag, struct ? new MergeStructsType(tagStruct, struct) : tagStruct];
      }),
    );
  }

  get subtypes(): Type[] {
    return [
      this.tagType,
      ...Object.values(this.variants).flatMap((struct) => [struct, ...struct.subtypes]),
    ];
  }

  get definition(): string {
    return Object.values(this.variants).map((struct) => `\n| ${struct.definition}`).join("");
  }

  get safeDefinition(): string {
    return `(${Object.values(this.variants).map((struct) => struct.definition).join(" | ")})`;
  }

  reader(context: TypeContext): string {
    const result = context.declare("result", context.type(this));
    context.statement(
      `switch (${this.tagType.reader(context)}) {\n${
        Object.entries(this.variants).map(([tag, variant], id) => {
          const key = this.tagMapping
            ? this.tagMapping[tag]
            : unwrapType(this.tagType) instanceof EnumType || this.tagType.definition == "string"
            ? JSON.stringify(tag)
            : id;
          const capture: Capture<string> = context.capture(() => variant.reader(context));
          const block = capture.statementBlock +
            `${result.identifier} = ${capture.value};\nbreak;\n`;
          return capture.statements.some((stmt) => stmt.variable != null)
            ? `case ${key}: {\n${block}}\n`
            : `case ${key}: ${block}`;
        }).join("")
      }default: throw new Error("Invalid tag id");\n}`,
    );
    return result.use();
  }

  writer(context: TypeContext, expression: string): void {
    context.statement(
      `switch (${expression}.${this.tag}) {\n${
        Object.entries(this.variants).map(([tag, variant], id) => {
          const key = this.tagMapping
            ? this.tagMapping[tag]
            : unwrapType(this.tagType) instanceof EnumType || this.tagType.definition == "string"
            ? JSON.stringify(tag)
            : id;
          const capture = context.capture(() => {
            this.tagType.writer(context, String(key));
            variant.writer(context, expression);
          });
          // if (capture.statements.length == 0) return "";
          return `case ${JSON.stringify(tag)}: {\n` + capture.statementBlock + `break;\n}\n`;
        }).join("")
      }default:\nthrow new Error("Invalid tag");\n}`,
    );
  }
}

export class PackedType extends StructType {
  private shift: number[];
  private refs: Map<ReferencedType, number>;

  constructor(
    private int: Type,
    private bits: number[],
    typeGetter: (...args: Type[]) => Record<string, Type>,
  ) {
    const refs = new Map<ReferencedType, number>();

    super(typeGetter(...bits.map((_, index) => {
      const type = new ReferencedType("number");
      refs.set(type, index);
      return type;
    })));

    this.shift = [...bits.keys()].map((i) => bits.slice(i + 1).reduce((a, x) => a + x, 0));
    this.refs = refs;

    const fieldTypes = Object.values(this.fields);

    for (const ref of refs.keys()) {
      if (!fieldTypes.includes(ref)) throw new Error("Every reference type must appear in fields");
    }

    for (const type of fieldTypes) {
      for (const subtype of type.subtypes) {
        if (subtype instanceof ReferencedType && this.refs.has(subtype)) {
          throw new Error("Referenced type cannot be used in subtypes");
        }
      }
    }
  }

  get subtypes(): Type[] {
    return [this.int, ...super.subtypes];
  }

  writer(context: TypeContext, expression: string): void {
    this.int.writer(
      context,
      Object.entries(this.fields).map(([name, type]) => {
        if (!(type instanceof ReferencedType)) return null;
        const i = this.refs.get(type);
        if (i == null) return null;
        const value = (this.int.definition == "bigint" ? "BigInt" : "") +
          `(${expression}.${name} & ${hex((1 << this.bits[i]!) - 1)})`;
        return `${value} << ${this.shift[i]!}${this.#suffix}`;
      }).filter((x) => x != null).join(" | "),
    );
    super.writer(context, expression);
  }

  getFieldVariables(context: TypeContext): Variable[] {
    const p = context.declare("p", () => this.int.reader(context));
    for (const [type, index] of this.refs) {
      const bits = this.bits[index]!;
      const shift = this.bits.slice(index + 1).reduce((a, x) => a + x, 0);
      const mask = hex((1 << bits) - 1) + this.#suffix;
      const unsigned = (this.int.definition == "bigint" ? `Number` : "") +
        `(${p.use()} >> ${shift}${this.#suffix} & ${mask})`;
      type.ref = new ExpressionType("number", unsigned + ` << ${32 - bits} >> ${32 - bits}`);
    }
    return super.getFieldVariables(context);
  }

  get #suffix() {
    return this.int.definition == "bigint" ? "n" : "";
  }
}

export class BitFlagsType extends StructType {
  private refs: Map<ReferencedType, string>;

  constructor(private int: Type, private masks: Record<string, number>) {
    const refs = new Map();
    super(Object.fromEntries(
      Object.keys(masks).map((name) => {
        const type = new ReferencedType("boolean");
        refs.set(type, name);
        return [name, type];
      }),
    ));
    this.int = int;
    this.masks = masks;
    this.refs = refs;
  }

  get subtypes(): Type[] {
    return [this.int, ...super.subtypes];
  }

  writer(context: TypeContext, expression: string): void {
    this.int.writer(
      context,
      Object.entries(this.masks).map(([name, mask]) => {
        return `(-${expression}.${name} & ${hex(mask)})`;
      }).join(" | "),
    );
    super.writer(context, expression);
  }

  getFieldVariables(context: TypeContext): Variable[] {
    const flags = context.declare("flags", () => this.int.reader(context));
    for (const [type, name] of this.refs) {
      type.ref = new ExpressionType("number", `(${flags.use()} & ${hex(this.masks[name]!)}) > 0`);
    }
    return super.getFieldVariables(context);
  }

  map<T extends Type>(fn: (...fields: Type[]) => T): T {
    return fn(...this.refs.keys());
  }
}

/*
  Special types
*/

export class DefinitionType extends Type {
  #definition: string;

  constructor(definition: string) {
    super();
    this.#definition = definition;
  }

  get definition(): string {
    return this.#definition;
  }
}

export class ExpressionType extends DefinitionType {
  constructor(definition: string, private expression: string) {
    super(definition);
  }

  reader(): string {
    return this.expression;
  }
}

export class LiteralType extends Type {
  constructor(private literal: string | number | boolean) {
    super();
  }

  get definition(): string {
    if (typeof this.literal == "string") return JSON.stringify(this.literal);
    return typeof this.literal;
  }

  reader(): string {
    return JSON.stringify(this.literal);
  }
}

export class WrappedType extends Type {
  constructor(public inner: Type) {
    super();
    this.inner = inner;
  }

  get subtypes(): Type[] {
    return [this.inner, ...this.inner.subtypes];
  }

  get definition(): string {
    return this.inner.definition;
  }

  reader(context: TypeContext): string {
    return this.inner.reader(context);
  }

  writer(context: TypeContext, expression: string): void {
    return this.inner.writer(context, expression);
  }
}

export class DocumentedType extends WrappedType {
  constructor(private description: string, inner: Type) {
    super(inner);
  }

  get comment(): string {
    return `/** ${this.description} */\n`;
  }
}

export class ReferencedType extends DefinitionType {
  ref: Type | null = null;

  constructor(definition: string) {
    super(definition);
  }

  reader(context: TypeContext): string {
    if (!this.ref) throw new Error("No reference set");
    return this.ref.reader(context);
  }
}

export class AliasedType extends WrappedType {
  #alias: string;

  constructor(alias: string, inner: Type) {
    super(inner);
    this.#alias = alias;
  }

  get definition(): string {
    return this.#alias;
  }

  init(context: TypeContext): void {
    context.alias(this.inner, this.#alias);
    this.inner.init(context);
  }
}

export class ExportedType extends AliasedType {
  private readFn: string;
  private writeFn: string;

  constructor(public name: string, inner: Type) {
    super(name, inner);
    this.readFn = "read" + name;
    this.writeFn = "write" + name;
  }

  get subtypes(): Type[] {
    return [];
  }

  reader(context: TypeContext): string {
    return `${context.global(this.readFn)}(${context.reader})`;
  }

  writer(context: TypeContext, expression: string): void {
    context.statement(`${context.global(this.writeFn)}(${context.writer}, ${expression});`);
  }

  init(context: TypeContext, initInnerType = false): void {
    if (initInnerType) super.init(context);

    const readerCapture = context.capture(() => {
      return this.inner.reader(context);
    }, { reader: "reader" });

    context.global(
      this.readFn,
      `function ${this.readFn}(reader: Reader): ${this.name} {\n${readerCapture.statementBlock}return ${readerCapture.value};\n}`,
    );

    const writerCapture = context.capture(() => {
      const value = context.declare("value");
      this.inner.writer(context, value.identifier);
      return value.identifier;
    }, { writer: "writer" });

    context.global(
      this.writeFn,
      `function ${this.writeFn}(writer: Writer, ${writerCapture.value}: ${this.name}) {\n${writerCapture.statementBlock}}`,
    );
  }
}

export class CustomType extends WrappedType {
  constructor(
    definition: string | Type,
    private readFn: (context: TypeContext) => string,
    private writeFn: (context: TypeContext, expression: string) => void,
  ) {
    super(definition instanceof Type ? definition : new DefinitionType(definition));
  }

  reader(context: TypeContext): string {
    return this.readFn(context);
  }

  writer(context: TypeContext, expression: string): void {
    this.writeFn(context, expression);
  }
}

export class SerializableType extends Type {
  constructor(
    private name: string,
    private value: Type,
    private deserializer: (value: string) => string,
    private serializer: (value: string) => string,
  ) {
    super();
  }

  get definition(): string {
    return this.name;
  }

  reader(context: TypeContext): string {
    return this.deserializer(this.value.reader(context));
  }

  writer(context: TypeContext, expression: string): void {
    this.value.writer(context, this.serializer(expression));
  }
}

export class CustomStructType extends StructType {
  constructor(
    fieldDefinitions: Record<string, Type | string>,
    private readFn: (context: TypeContext) => Record<string, Variable>,
    private writeFn: (context: TypeContext, expression: string) => void,
  ) {
    super(Object.fromEntries(
      Object.entries(fieldDefinitions).map(([name, definition]) => {
        return [name, definition instanceof Type ? definition : new DefinitionType(definition)];
      }),
    ));
  }

  writer(context: TypeContext, expression: string): void {
    this.writeFn(context, expression);
  }

  getFieldVariables(context: TypeContext): Variable[] {
    return Object.entries(this.readFn(context)).map(([name, variable]) => {
      if (variable.name == name) return variable;
      return context.declare(name, () => variable.use());
    });
  }
}

/*
  Type context
*/

export interface TypeContextOptions {
  defineGlobal(init: string, name: string): void;
  defineConstant(name: string, expression: string): string;
  onUse?(name: string): void;
}

export function createTypeContext(options: TypeContextOptions): TypeContext {
  const globals = new Set<string>();
  const constants = new Map<symbol, string>();
  const typeAliases = new Map<string, string>();

  const stack: Statement[][] = [];
  const variableStatements = new WeakMap<Statement, Variable>();

  const pushStatement = (evaluate: () => string) => {
    const statement: Statement = Object.freeze<Statement>({
      get code() {
        return evaluate().replace(/(?<!\n)$/, "\n");
      },
      get variable() {
        return variableStatements.get(statement) ?? null;
      },
      push() {
        const statements = stack.pop();
        if (statements == null) throw new Error("Uncaptured statement");
        statements.push(statement);
        stack.push(statements);
      },
    });
    statement.push();
    return statement;
  };

  let currentReader = "reader";
  let currentWriter = "writer";

  const context: TypeContext = {
    get reader() {
      return currentReader;
    },

    get writer() {
      return currentWriter;
    },

    global(name, init) {
      options.onUse?.(name);
      if (globals.has(name)) return name;
      if (init == null) throw new Error("Global not defined");
      options.defineGlobal(init, name);
      globals.add(name);
      return name;
    },

    constant(key, expression) {
      let name = constants.get(key);
      if (name != null) {
        options.onUse?.(name);
        return name;
      }
      if (key.description == null) throw new Error("Key must have a description");
      if (expression == null) throw new Error("Constant is not defined");
      name = options.defineConstant(key.description, expression);
      constants.set(key, name);
      options.onUse?.(name);
      return name;
    },

    statement(code) {
      pushStatement(() => code);
    },

    declare(name, evalOrType, exprOrSideEffect?, sideEffectOrType?) {
      let identifier = name;
      let suffix = 1;
      while (
        identifier == currentReader || identifier == currentWriter ||
        stack.flat().some((s) => variableStatements.get(s)?.identifier == identifier)
      ) {
        identifier = name + suffix;
        suffix++;
      }

      let used = false;

      const variable: Variable = Object.freeze<Variable>({
        name,
        identifier,
        get hasSideEffect() {
          return evalOrType instanceof Function
            ? exprOrSideEffect as boolean ?? true
            : sideEffectOrType as boolean ?? true;
        },
        get expression() {
          return expression ?? null;
        },
        get statement() {
          return statement;
        },
        get used() {
          return used;
        },
        use() {
          used = true;
          return identifier;
        },
      });

      const letOrConst = evalOrType instanceof Function ? "const" : "let";
      const type = evalOrType instanceof Function ? sideEffectOrType as string : evalOrType;

      const statement = pushStatement(() => {
        return `${letOrConst} ${identifier}${type ? ": " + type : ""}${
          expression ? ` = ${expression}` : ""
        };`;
      });
      variableStatements.set(statement, variable);

      stack.push([]);
      const expression = evalOrType instanceof Function ? evalOrType() : exprOrSideEffect as string;
      const statements = stack.pop()!;
      stack[stack.length - 1]!.splice(-1, 0, ...statements);

      return variable;
    },

    capture(fn, options) {
      stack.push([]);
      const [reader, writer] = [currentReader, currentWriter];
      if (options?.reader) currentReader = options.reader;
      if (options?.writer) currentWriter = options.writer;
      const value = fn();
      [currentReader, currentWriter] = [reader, writer];
      const statements = stack.pop()!.filter((stmt) => variableStatements.get(stmt)?.used ?? true);
      return {
        value,
        statements,
        get statementBlock() {
          return statements.map((stmt) => stmt.code).join("");
        },
      };
    },

    alias(type, alias?: string) {
      if (alias == null) {
        const alias = typeAliases.get(type.definition);
        if (alias) options.onUse?.(alias);
        return alias ?? null;
      }
      if (type instanceof DocumentedType) {
        context.global(alias, type.comment + `type ${alias} = ${type.definition};`);
        typeAliases.set(type.inner.definition, alias);
      } else {
        context.global(alias, `type ${alias} = ${type.definition};`);
      }
      typeAliases.set(type.definition, alias);
      return alias;
    },

    type(type) {
      const alias = typeAliases.get(type.definition);
      if (alias) options.onUse?.(alias);
      return alias ?? type.definition;
    },
  };

  return context;
}

function unwrapType(type: Type) {
  if (type instanceof WrappedType) return type.inner;
  return type;
}

function hex(x: number) {
  return "0x" + x.toString(16);
}

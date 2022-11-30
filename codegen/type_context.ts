import { DocumentedType, Type } from "./type.ts";

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
  map<T>(fn: (capture: Capture<T>) => T): T;
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

  use(symbol: string): string;

  global(name: string, init?: (identifier: string, isExported: boolean) => string): string;

  constant(name: symbol, expression?: string): string;

  /** Pushes a statement onto the stack. */
  statement(code: string): void;

  /** Defines a let variable. */
  declare(name: string, type?: string, expression?: string, hasSideEffect?: boolean): Variable;

  /** Defines a const variable with a lazy evaluated expression. */
  declare(name: string, evaluate: () => string, hasSideEffect?: boolean, type?: string): Variable;

  alias(type: Type, name: string): void;
  alias(type: Type): string | null;

  type(type: Type): string;

  /** Captures variable declarations and statements declared inside the callback function. */
  capture<T>(fn: () => T, options?: CaptureOptions): Capture<T>;
}

export interface TypeContextOptions {
  declare(
    name: string,
    init: (identifier: string, isExported: boolean) => string,
    isGlobal: boolean,
  ): string;
  use(symbol: string): void;
}

export function createTypeContext(options: TypeContextOptions): TypeContext {
  /** Global name to identifier mapping. */
  const globals = new Map<string, string>();
  /** Constant key to identifier mapping. */
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

    use(symbol) {
      options.use(symbol);
      return symbol;
    },

    global(name, init) {
      let identifier = globals.get(name);
      if (identifier != null && init == null) options.use(identifier);
      if (identifier != null) return identifier;
      if (init == null) throw new Error(`Global '${name}' is not defined`);
      identifier = options.declare(name, init, true);
      globals.set(name, identifier);
      return identifier;
    },

    constant(key, expression) {
      let identifier = constants.get(key);
      if (identifier != null && expression == null) options.use(identifier);
      if (identifier != null) return identifier;
      if (key.description == null) throw new Error("Constant key must have a description");
      if (expression == null) throw new Error(`Constant '${key.description}' is not defined`);
      identifier = options.declare(key.description, (identifier, isExported) => {
        return (isExported ? "export " : "") + `const ${identifier} = ${expression};\n`;
      }, false);
      constants.set(key, identifier);
      return identifier;
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
      const capture: Capture<ReturnType<typeof fn>> = {
        value,
        statements,
        get statementBlock() {
          return statements.map((stmt) => stmt.code).join("");
        },
        map(fn) {
          return fn(capture as Capture<any>);
        },
      };
      return capture;
    },

    alias(type, alias?: string) {
      if (alias == null) {
        const alias = typeAliases.get(type.definition);
        if (alias) options.use(alias);
        return alias ?? null;
      }
      if (type instanceof DocumentedType) {
        alias = context.global(alias, (identifier, isExported) => {
          return type.comment + (isExported ? "export " : "") +
            `type ${identifier} = ${type.definition};\n`;
        });
        typeAliases.set(type.inner.definition, alias);
      } else {
        alias = context.global(alias, (identifier, isExported) => {
          return (isExported ? "export " : "") + `type ${identifier} = ${type.definition};\n`;
        });
      }
      typeAliases.set(type.definition, alias);
      return alias;
    },

    type(type) {
      const alias = typeAliases.get(type.definition);
      if (alias) options.use(alias);
      return alias ?? type.definition;
    },
  };

  return context;
}

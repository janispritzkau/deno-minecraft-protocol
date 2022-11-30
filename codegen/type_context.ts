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

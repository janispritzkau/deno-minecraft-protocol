import { cyan } from "https://deno.land/std@0.166.0/fmt/colors.ts";
import * as json from "../utils/json.ts";
import { Style } from "./style.ts";

export abstract class Component {
  children: Component[] = [];
  style = new Style();

  static literal(text: string) {
    return new LiteralComponent(text);
  }

  static translatable(key: string, ...args: Component[]) {
    return new TranslatableComponent(key, args);
  }

  static deserialize(value: unknown): Component {
    if (json.isPrimitive(value)) return this.literal(value.toString());

    if (value instanceof Array) {
      if (value.length == 0) throw new Error("Array must not be empty");
      const component = this.deserialize(value[0]);
      for (let i = 1; i < value.length; i++) component.append(this.deserialize(value[i]));
      return component;
    }

    json.assertIsObject(value);
    let component: Component;

    if ("text" in value) {
      component = this.literal(json.asString(value.text));
    } else if ("translate" in value) {
      const key = json.asString(value.translate);
      if ("with" in value) {
        const args = json.asArray(value.with).map((arg) => this.deserialize(arg));
        component = this.translatable(key, ...args);
      } else {
        component = this.translatable(key);
      }
    } else {
      throw new Error("Invalid chat component");
    }

    if ("extra" in value) {
      const extra = json.asArray(value.extra);
      if (extra.length == 0) throw new Error("Array 'extra' must not be empty");
      for (const value of extra) component.append(this.deserialize(value));
    }

    try {
      component.style = Style.deserialize(value);
    } catch (e) {
      console.log(value);
      throw e;
    }
    return component;
  }

  serialize(): JsonComponent {
    let value: JsonTextComponent | JsonTranslatableComponent;

    if (this instanceof LiteralComponent) {
      value = { text: this.text };
    } else if (this instanceof TranslatableComponent) {
      value = {
        translate: this.key,
        with: this.args.map((arg) => arg.serialize()),
      };
    } else {
      throw new Error("Invalid component type");
    }

    this.style.serialize(value);

    if (this.children.length > 0) {
      value.extra = this.children.map((component) => component.serialize());
    }

    return value;
  }

  append(component: Component) {
    this.children.push(component);
  }

  reduce<T>(value: T, fn: (value: T, text: string, style: Style) => T): T {
    value = fn(value, this.toString(), this.style);
    for (const child of this.children) {
      value = child.reduce(
        value,
        (value, text, style) => fn(value, text, this.style.merge(style)),
      );
    }
    return value;
  }

  [Symbol.for("Deno.customInspect")](
    inspect: typeof Deno.inspect,
    options: Deno.InspectOptions & { indentLevel: number; depth: number },
  ) {
    if (options.indentLevel >= options.depth) return cyan("[Component]");
    return `Component(${inspect(this.serialize(), options)})`;
  }
}

export class LiteralComponent extends Component {
  constructor(public text: string) {
    super();
  }
}

export class TranslatableComponent extends Component {
  constructor(public key: string, public args: Component[]) {
    super();
  }
}

export type JsonComponent =
  | string
  | JsonComponent[]
  | JsonTextComponent
  | JsonTranslatableComponent
  | JsonScoreComponent;

export interface JsonComponentBase {
  extra?: JsonComponent[];
  color?: string;
  bold?: boolean;
  italic?: boolean;
  underlined?: boolean;
  strikethrough?: boolean;
  obfuscated?: boolean;
  clickEvent?: JsonClickEvent;
  hoverEvent?: JsonHoverEvent | JsonHoverEventLegacy;
  insertion?: string;
}

export interface JsonTextComponent extends JsonComponentBase {
  text: string;
}

export interface JsonTranslatableComponent extends JsonComponentBase {
  translate: string;
  with?: JsonComponent[];
}

export interface JsonScoreComponent extends JsonComponentBase {
  score: {
    name: string;
    objective: string;
  };
}

export interface JsonClickEvent {
  action: string;
  value: unknown;
}

export interface JsonHoverEvent {
  action: string;
  contents: unknown;
}

export interface JsonHoverEventLegacy {
  action: string;
  value: JsonComponent;
}

export class Component {
  constructor(public json: unknown) {}

  static literal(text: string) {
    return new Component({ text });
  }

  static deserialize(value: unknown) {
    return new this(value);
  }

  serialize() {
    return this.json;
  }
}

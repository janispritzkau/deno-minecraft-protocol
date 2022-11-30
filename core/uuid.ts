const UUID_REGEX = /[0-9a-z]{8}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{4}-[0-9a-z]{12}|[0-9a-z]{32}/i;

export class Uuid {
  static #nil = new Uuid(0n);
  #value: bigint;

  constructor(value: bigint) {
    if (value < 0n) throw new Error("Value for UUID cannot be negative");
    if (value >= 1n << 128n) throw new Error("Value for UUID is too large");
    this.#value = value;
  }

  static get empty() {
    return this.#nil;
  }

  static from(uuid: string | bigint | Uint8Array): Uuid {
    if (uuid instanceof Uint8Array) {
      if (uuid.length != 16) {
        throw new Error("Uint8Array must be 16 bytes to be converted to UUID");
      }
      return new Uuid(uuid.reduce((value, byte) => value << 8n | BigInt(byte), 0n));
    }
    if (typeof uuid == "bigint") return new Uuid(uuid);
    if (!UUID_REGEX.test(uuid)) throw new Error("UUID has invalid format");
    return new Uuid(BigInt(`0x${uuid.replaceAll("-", "")}`));
  }

  static random() {
    return Uuid.from(crypto.randomUUID());
  }

  get value(): bigint {
    return this.#value;
  }

  hex(includeDashes = false): string {
    const uuid = this.#value.toString(16).padStart(32, "0");
    if (!includeDashes) return uuid;
    return uuid.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, "$1-$2-$3-$4-$5");
  }

  bytes(): Uint8Array {
    const buffer = new ArrayBuffer(16);
    const view = new DataView(buffer);
    view.setBigUint64(0, this.#value >> 64n);
    view.setBigUint64(8, BigInt.asUintN(64, this.#value));
    return new Uint8Array(buffer);
  }

  toString(): string {
    return this.hex(true);
  }

  [Symbol.for("Deno.customInspect")](inspect: typeof Deno.inspect, options: Deno.InspectOptions) {
    return `Uuid(${inspect(this.toString(), { colors: options.colors })})`;
  }
}

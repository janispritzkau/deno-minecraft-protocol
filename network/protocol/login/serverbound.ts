// deno-lint-ignore-file
import { Reader, Writer } from "minecraft/io/mod.ts";
import { Packet, PacketHandler } from "minecraft/network/packet.ts";
import { ProfilePublicKey, readProfilePublicKey, writeProfilePublicKey } from "../types.ts";

export interface ServerLoginHandler extends PacketHandler {
  handleHello?(packet: ServerboundHelloPacket): Promise<void>;
  handleKey?(packet: ServerboundKeyPacket): Promise<void>;
  handleCustomQuery?(packet: ServerboundCustomQueryPacket): Promise<void>;
}

export class ServerboundHelloPacket implements Packet<ServerLoginHandler> {
  constructor(
    public name: string,
    public publicKey: ProfilePublicKey | null,
    public profileId: string | null,
  ) {}
  static read(reader: Reader) {
    const name = reader.readString(16);
    const publicKey = reader.readBoolean() ? readProfilePublicKey(reader) : null;
    const profileId = reader.readBoolean() ? reader.readUuid() : null;
    return new this(name, publicKey, profileId);
  }
  write(writer: Writer) {
    writer.writeString(this.name);
    writer.writeBoolean(this.publicKey != null);
    if (this.publicKey != null) writeProfilePublicKey(writer, this.publicKey);
    writer.writeBoolean(this.profileId != null);
    if (this.profileId != null) writer.writeUuid(this.profileId);
  }
  handle(handler: ServerLoginHandler) {
    return handler.handleHello?.(this);
  }
}

export class ServerboundKeyPacket implements Packet<ServerLoginHandler> {
  constructor(
    public key: Uint8Array,
    public nonceOrSignature:
      | { type: "nonce"; nonce: Uint8Array }
      | { type: "salt_signature"; salt: bigint; signature: Uint8Array },
  ) {}
  static read(reader: Reader) {
    const key = reader.readByteArray();
    let result:
      | { type: "nonce"; nonce: Uint8Array }
      | { type: "salt_signature"; salt: bigint; signature: Uint8Array };
    switch (reader.readBoolean()) {
      case true:
        result = { type: "nonce", nonce: reader.readByteArray() };
        break;
      case false:
        result = { type: "salt_signature", salt: reader.readLong(), signature: reader.readByteArray() };
        break;
      default:
        throw new Error("Invalid tag id");
    }
    const nonceOrSignature = result;
    return new this(key, nonceOrSignature);
  }
  write(writer: Writer) {
    writer.writeByteArray(this.key);
    switch (this.nonceOrSignature.type) {
      case "nonce": {
        writer.writeBoolean(true);
        writer.writeByteArray(this.nonceOrSignature.nonce);
        break;
      }
      case "salt_signature": {
        writer.writeBoolean(false);
        writer.writeLong(this.nonceOrSignature.salt);
        writer.writeByteArray(this.nonceOrSignature.signature);
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  handle(handler: ServerLoginHandler) {
    return handler.handleKey?.(this);
  }
}

export class ServerboundCustomQueryPacket implements Packet<ServerLoginHandler> {
  constructor(
    public transactionId: number,
    public data: Uint8Array | null,
  ) {}
  static read(reader: Reader) {
    const transactionId = reader.readVarInt();
    const data = reader.readBoolean() ? reader.read(reader.unreadBytes) : null;
    return new this(transactionId, data);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.transactionId);
    writer.writeBoolean(this.data != null);
    if (this.data != null) writer.write(this.data);
  }
  handle(handler: ServerLoginHandler) {
    return handler.handleCustomQuery?.(this);
  }
}

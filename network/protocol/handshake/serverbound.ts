// deno-lint-ignore-file
import { Reader, Writer } from "minecraft/io/mod.ts";
import { Packet, PacketHandler } from "minecraft/network/packet.ts";

export interface ServerHandshakeHandler extends PacketHandler {
  handleIntention?(packet: ClientIntentionPacket): Promise<void>;
}

export class ClientIntentionPacket implements Packet<ServerHandshakeHandler> {
  constructor(
    public protocolVersion: number,
    public hostname: string,
    public port: number,
    /** The next protocol state */
    public intention: number,
  ) {}
  static read(reader: Reader) {
    const protocolVersion = reader.readVarInt();
    const hostname = reader.readString(255);
    const port = reader.readShort();
    const intention = reader.readVarInt();
    return new this(protocolVersion, hostname, port, intention);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.protocolVersion);
    writer.writeString(this.hostname);
    writer.writeShort(this.port);
    writer.writeVarInt(this.intention);
  }
  handle(handler: ServerHandshakeHandler) {
    return handler.handleIntention?.(this);
  }
}

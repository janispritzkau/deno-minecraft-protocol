// deno-lint-ignore-file
import { Reader, Writer } from "minecraft/io/mod.ts";
import { Packet, PacketHandler } from "minecraft/network/packet.ts";
import { createEnumMapper } from "../types.ts";

export type HandshakeIntention = "status" | "login";

export const handshakeIntentionEnum = createEnumMapper<HandshakeIntention>({ "status": 1, "login": 2 });

export interface ServerHandshakeHandler extends PacketHandler {
  handleIntention?(packet: ClientIntentionPacket): Promise<void>;
}

export class ClientIntentionPacket implements Packet<ServerHandshakeHandler> {
  constructor(
    public protocolVersion: number,
    public hostname: string,
    public port: number,
    /** The next protocol state. */
    public intention: HandshakeIntention,
  ) {}
  static read(reader: Reader) {
    const protocolVersion = reader.readVarInt();
    const hostname = reader.readString(255);
    const port = reader.readShort();
    const intention = handshakeIntentionEnum.fromId(reader.readVarInt());
    return new this(protocolVersion, hostname, port, intention);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.protocolVersion);
    writer.writeString(this.hostname);
    writer.writeShort(this.port);
    writer.writeVarInt(handshakeIntentionEnum.toId(this.intention));
  }
  async handle(handler: ServerHandshakeHandler) {
    await handler.handleIntention?.(this);
  }
}

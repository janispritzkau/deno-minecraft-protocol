// deno-lint-ignore-file
import { Reader, Writer } from "minecraft/io/mod.ts";
import { Packet, PacketHandler } from "minecraft/network/packet.ts";

export type ServerStatus = unknown;

export interface ClientStatusHandler extends PacketHandler {
  handleStatusResponse?(packet: ClientboundStatusResponsePacket): Promise<void>;
  handlePongResponse?(packet: ClientboundPongResponsePacket): Promise<void>;
}

export class ClientboundStatusResponsePacket implements Packet<ClientStatusHandler> {
  constructor(
    public status: ServerStatus,
  ) {}
  static read(reader: Reader) {
    const status = reader.readJson();
    return new this(status);
  }
  write(writer: Writer) {
    writer.writeJson(this.status);
  }
  async handle(handler: ClientStatusHandler) {
    await handler.handleStatusResponse?.(this);
  }
}

export class ClientboundPongResponsePacket implements Packet<ClientStatusHandler> {
  constructor(
    public time: bigint,
  ) {}
  static read(reader: Reader) {
    const time = reader.readLong();
    return new this(time);
  }
  write(writer: Writer) {
    writer.writeLong(this.time);
  }
  async handle(handler: ClientStatusHandler) {
    await handler.handlePongResponse?.(this);
  }
}

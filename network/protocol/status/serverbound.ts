// deno-lint-ignore-file
import { Reader, Writer } from "minecraft/io/mod.ts";
import { Packet, PacketHandler } from "minecraft/network/packet.ts";

export interface ServerStatusHandler extends PacketHandler {
  handleStatusRequest?(packet: ServerboundStatusRequestPacket): Promise<void>;
  handlePingRequest?(packet: ServerboundPingRequestPacket): Promise<void>;
}

export class ServerboundStatusRequestPacket implements Packet<ServerStatusHandler> {
  constructor() {}
  static read(reader: Reader) {
    return new this();
  }
  write(writer: Writer) {
  }
  async handle(handler: ServerStatusHandler) {
    await handler.handleStatusRequest?.(this);
  }
}

export class ServerboundPingRequestPacket implements Packet<ServerStatusHandler> {
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
  async handle(handler: ServerStatusHandler) {
    await handler.handlePingRequest?.(this);
  }
}

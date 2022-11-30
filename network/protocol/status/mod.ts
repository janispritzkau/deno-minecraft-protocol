// deno-lint-ignore-file
import { Protocol } from "minecraft/network/protocol.ts";
import { ServerboundPingRequestPacket, ServerboundStatusRequestPacket, ServerStatusHandler } from "./serverbound.ts";
import { ClientboundPongResponsePacket, ClientboundStatusResponsePacket, ClientStatusHandler } from "./clientbound.ts";

export const statusProtocol = new class StatusProtocol extends Protocol<ServerStatusHandler, ClientStatusHandler> {
  constructor() {
    super();
    this.registerServerbound(0x00, ServerboundStatusRequestPacket);
    this.registerServerbound(0x01, ServerboundPingRequestPacket);
    this.registerClientbound(0x00, ClientboundStatusResponsePacket);
    this.registerClientbound(0x01, ClientboundPongResponsePacket);
  }
}();

export * from "./serverbound.ts";
export * from "./clientbound.ts";

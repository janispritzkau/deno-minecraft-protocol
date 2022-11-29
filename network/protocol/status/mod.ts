// deno-lint-ignore-file
import { Protocol } from "minecraft/network/protocol.ts";
import { ServerboundPingRequestPacket, ServerboundStatusRequestPacket, ServerStatusHandler } from "./serverbound.ts";
import { ClientboundPongResponsePacket, ClientboundStatusResponsePacket, ClientStatusHandler } from "./clientbound.ts";

export class StatusProtocol extends Protocol<ServerStatusHandler, ClientStatusHandler> {
  constructor() {
    super();
    this.registerServerbound(0, ServerboundStatusRequestPacket);
    this.registerServerbound(1, ServerboundPingRequestPacket);
    this.registerClientbound(0, ClientboundStatusResponsePacket);
    this.registerClientbound(1, ClientboundPongResponsePacket);
  }
}

export const statusProtocol = new StatusProtocol();

export * from "./serverbound.ts";
export * from "./clientbound.ts";

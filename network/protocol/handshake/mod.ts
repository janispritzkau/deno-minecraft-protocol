// deno-lint-ignore-file
import { Protocol } from "minecraft/network/protocol.ts";
import { ClientIntentionPacket, ServerHandshakeHandler } from "./serverbound.ts";

export class HandshakeProtocol extends Protocol<ServerHandshakeHandler, void> {
  constructor() {
    super();
    this.registerServerbound(0, ClientIntentionPacket);
  }
}

export const handshakeProtocol = new HandshakeProtocol();

export * from "./serverbound.ts";

// deno-lint-ignore-file
import { Protocol } from "minecraft/network/protocol.ts";
import { ClientIntentionPacket, ServerHandshakeHandler } from "./serverbound.ts";

export const handshakeProtocol = new class HandshakeProtocol extends Protocol<ServerHandshakeHandler, void> {
  constructor() {
    super();
    this.registerServerbound(0x00, ClientIntentionPacket);
  }
}();

export * from "./serverbound.ts";

// deno-lint-ignore-file
import { Protocol } from "minecraft/network/protocol.ts";
import {
  ServerboundCustomQueryPacket,
  ServerboundHelloPacket,
  ServerboundKeyPacket,
  ServerLoginHandler,
} from "./serverbound.ts";
import {
  ClientboundCustomQueryPacket,
  ClientboundGameProfilePacket,
  ClientboundHelloPacket,
  ClientboundLoginCompressionPacket,
  ClientboundLoginDisconnectPacket,
  ClientLoginHandler,
} from "./clientbound.ts";

export const loginProtocol = new class LoginProtocol extends Protocol<ServerLoginHandler, ClientLoginHandler> {
  constructor() {
    super();
    this.registerServerbound(0x00, ServerboundHelloPacket);
    this.registerServerbound(0x01, ServerboundKeyPacket);
    this.registerServerbound(0x02, ServerboundCustomQueryPacket);
    this.registerClientbound(0x00, ClientboundLoginDisconnectPacket);
    this.registerClientbound(0x01, ClientboundHelloPacket);
    this.registerClientbound(0x02, ClientboundGameProfilePacket);
    this.registerClientbound(0x03, ClientboundLoginCompressionPacket);
    this.registerClientbound(0x04, ClientboundCustomQueryPacket);
  }
}();

export * from "./serverbound.ts";
export * from "./clientbound.ts";

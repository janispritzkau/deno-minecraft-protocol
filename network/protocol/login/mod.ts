// deno-lint-ignore-file
import { Protocol } from "minecraft/network/protocol.ts";
import { ServerboundCustomQueryPacket, ServerboundHelloPacket, ServerboundKeyPacket, ServerLoginHandler } from "./serverbound.ts";
import {
  ClientboundCustomQueryPacket,
  ClientboundGameProfilePacket,
  ClientboundHelloPacket,
  ClientboundLoginCompressionPacket,
  ClientboundLoginDisconnectPacket,
  ClientLoginHandler,
} from "./clientbound.ts";

export class LoginProtocol extends Protocol<ServerLoginHandler, ClientLoginHandler> {
  constructor() {
    super();
    this.registerServerbound(0, ServerboundHelloPacket);
    this.registerServerbound(1, ServerboundKeyPacket);
    this.registerServerbound(2, ServerboundCustomQueryPacket);
    this.registerClientbound(0, ClientboundLoginDisconnectPacket);
    this.registerClientbound(1, ClientboundHelloPacket);
    this.registerClientbound(2, ClientboundGameProfilePacket);
    this.registerClientbound(3, ClientboundLoginCompressionPacket);
    this.registerClientbound(4, ClientboundCustomQueryPacket);
  }
}

export const loginProtocol = new LoginProtocol();

export * from "./serverbound.ts";
export * from "./clientbound.ts";

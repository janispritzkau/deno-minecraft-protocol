// deno-lint-ignore-file
import { Reader, Writer } from "minecraft/io/mod.ts";
import { Packet, PacketHandler } from "minecraft/network/packet.ts";
import { Component, GameProfile, readGameProfile, readProperties, readResourceLocation, ResourceLocation, writeGameProfile, writeProperties, writeResourceLocation } from "../types.ts";

export interface ClientLoginHandler extends PacketHandler {
  handleLoginDisconnect?(packet: ClientboundLoginDisconnectPacket): Promise<void>;
  handleHello?(packet: ClientboundHelloPacket): Promise<void>;
  handleGameProfile?(packet: ClientboundGameProfilePacket): Promise<void>;
  handleLoginCompression?(packet: ClientboundLoginCompressionPacket): Promise<void>;
  handleCustomQuery?(packet: ClientboundCustomQueryPacket): Promise<void>;
}

export class ClientboundLoginDisconnectPacket implements Packet<ClientLoginHandler> {
  constructor(
    public reason: Component,
  ) {}
  static read(reader: Reader) {
    const reason = reader.readJson();
    return new this(reason);
  }
  write(writer: Writer) {
    writer.writeJson(this.reason);
  }
  handle(handler: ClientLoginHandler) {
    return handler.handleLoginDisconnect?.(this);
  }
}

export class ClientboundHelloPacket implements Packet<ClientLoginHandler> {
  constructor(
    public serverId: string,
    public publicKey: Uint8Array,
    public nonce: Uint8Array,
  ) {}
  static read(reader: Reader) {
    const serverId = reader.readString(20);
    const publicKey = reader.readByteArray();
    const nonce = reader.readByteArray();
    return new this(serverId, publicKey, nonce);
  }
  write(writer: Writer) {
    writer.writeString(this.serverId);
    writer.writeByteArray(this.publicKey);
    writer.writeByteArray(this.nonce);
  }
  handle(handler: ClientLoginHandler) {
    return handler.handleHello?.(this);
  }
}

export class ClientboundGameProfilePacket implements Packet<ClientLoginHandler> {
  constructor(
    public gameProfile: GameProfile,
  ) {}
  static read(reader: Reader) {
    const gameProfile = readGameProfile(reader);
    return new this(gameProfile);
  }
  write(writer: Writer) {
    writeGameProfile(writer, this.gameProfile);
  }
  handle(handler: ClientLoginHandler) {
    return handler.handleGameProfile?.(this);
  }
}

export class ClientboundLoginCompressionPacket implements Packet<ClientLoginHandler> {
  constructor(
    public compressionThreshold: number,
  ) {}
  static read(reader: Reader) {
    const compressionThreshold = reader.readVarInt();
    return new this(compressionThreshold);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.compressionThreshold);
  }
  handle(handler: ClientLoginHandler) {
    return handler.handleLoginCompression?.(this);
  }
}

export class ClientboundCustomQueryPacket implements Packet<ClientLoginHandler> {
  constructor(
    public transactionId: number,
    public identifier: ResourceLocation,
    public data: Uint8Array,
  ) {}
  static read(reader: Reader) {
    const transactionId = reader.readVarInt();
    const identifier = readResourceLocation(reader);
    const data = reader.read(reader.unreadBytes);
    return new this(transactionId, identifier, data);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.transactionId);
    writeResourceLocation(writer, this.identifier);
    writer.write(this.data);
  }
  handle(handler: ClientLoginHandler) {
    return handler.handleCustomQuery?.(this);
  }
}

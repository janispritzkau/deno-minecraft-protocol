import { flow, packet, protocol } from "../protocol.ts";

import {
  Boolean,
  ByteArray,
  Component,
  Data,
  Long,
  Optional,
  REMAINING_BYTES,
  String,
  Struct,
  TaggedUnion,
  Uuid,
  VarInt,
} from "../types.ts";

import { GameProfile, ProfilePublicKey, ResourceLocation } from "../protocol_types.ts";

protocol("login");

flow("clientbound");

packet("ClientboundLoginDisconnectPacket", {
  reason: Component,
});

packet("ClientboundHelloPacket", {
  serverId: String(20),
  publicKey: ByteArray(),
  nonce: ByteArray(),
});

packet("ClientboundGameProfilePacket", {
  profile: GameProfile,
});

packet("ClientboundLoginCompressionPacket", {
  compressionThreshold: VarInt,
});

packet("ClientboundCustomQueryPacket", {
  transactionId: VarInt,
  identifier: ResourceLocation,
  data: Data(REMAINING_BYTES),
});

flow("serverbound");

packet("ServerboundHelloPacket", {
  name: String(16),
  publicKey: Optional(ProfilePublicKey),
  profileId: Optional(Uuid),
});

packet("ServerboundKeyPacket", {
  key: ByteArray(),
  nonceOrSignature: TaggedUnion("type", Boolean, {
    "nonce": Struct({
      nonce: ByteArray(),
    }),
    "salt_signature": Struct({
      salt: Long,
      signature: ByteArray(),
    }),
  }, { "nonce": true, "salt_signature": false }),
});

packet("ServerboundCustomQueryPacket", {
  transactionId: VarInt,
  data: Optional(Data(REMAINING_BYTES)),
});

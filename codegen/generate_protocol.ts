import { generate } from "./protocol.ts";

await import("./registry_types.ts");
await import("./protocol_types.ts");

await import("./protocol/handshake.ts");
await import("./protocol/game.ts");
await import("./protocol/status.ts");
await import("./protocol/login.ts");

await generate("network/protocol", {
  imports: {
    "minecraft/io/mod.ts": ["Reader", "Writer"],
    "minecraft/nbt/tag.ts": ["CompoundTag"],
    "minecraft/network/packet.ts": ["Packet", "PacketHandler"],
    "minecraft/network/protocol.ts": ["Protocol"],
    "./core/uuid.ts": ["Uuid"],
    "./core/resource_location.ts": ["ResourceLocation"],
    "./chat/component.ts": ["Component"],
    "./network/protocol/status/server_status.ts": [
      "ServerStatus",
      "deserializeServerStatus",
      "serializeServerStatus",
    ],
  },
});

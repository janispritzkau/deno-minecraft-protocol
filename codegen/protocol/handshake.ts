import { doc, flow, packet, protocol } from "../protocol.ts";
import { Short, String, VarInt } from "../types.ts";

protocol("handshake", -1);

flow("serverbound");

packet("ClientIntentionPacket", {
  protocolVersion: VarInt,
  hostname: String(255),
  port: Short,
  intention: doc(VarInt, "The next protocol state"),
});

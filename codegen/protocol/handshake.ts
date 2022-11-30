import { flow, packet, protocol } from "../protocol.ts";
import { Enum, Short, String, VarInt } from "../types.ts";

protocol("handshake");

flow("serverbound");

const HandshakeIntention = Enum({
  "status": 1,
  "login": 2,
}).alias("HandshakeIntention");

packet("ClientIntentionPacket", {
  protocolVersion: VarInt,
  hostname: String(255),
  port: Short,
  intention: HandshakeIntention.doc("The next protocol state."),
});

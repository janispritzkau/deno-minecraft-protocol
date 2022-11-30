import { flow, packet, protocol } from "../protocol.ts";
import { Json, Long } from "../types.ts";

protocol("status");

flow("serverbound");

packet("ServerboundStatusRequestPacket", {});

packet("ServerboundPingRequestPacket", {
  time: Long,
});

flow("clientbound");

packet("ClientboundStatusResponsePacket", {
  status: Json.alias("ServerStatus"),
});

packet("ClientboundPongResponsePacket", {
  time: Long,
});

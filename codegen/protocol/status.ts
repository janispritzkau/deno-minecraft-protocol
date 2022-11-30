import { flow, packet, protocol } from "../protocol.ts";
import { Json, Long, Serializable } from "../types.ts";

protocol("status");

flow("serverbound");

packet("ServerboundStatusRequestPacket", {});

packet("ServerboundPingRequestPacket", {
  time: Long,
});

flow("clientbound");

packet("ClientboundStatusResponsePacket", {
  status: Serializable("ServerStatus", Json, (value, { use }) => {
    return `${use("deserializeServerStatus")}(${value})`;
  }, (value, { use }) => {
    return `${use("serializeServerStatus")}(${value})`;
  }),
});

packet("ClientboundPongResponsePacket", {
  time: Long,
});

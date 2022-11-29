import { generate } from "./protocol.ts";

await import("./registry_types.ts");
await import("./protocol_types.ts");

await import("./protocol/handshake.ts");
await import("./protocol/game.ts");
await import("./protocol/status.ts");
await import("./protocol/login.ts");

await generate("network/protocol");

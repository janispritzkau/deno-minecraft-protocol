import { protocol } from "../protocol.ts";

protocol("game", 0);

await import("./game/serverbound.ts");
await import("./game/clientbound.ts");

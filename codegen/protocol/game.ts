import { protocol } from "../protocol.ts";

protocol("game");

await import("./game/serverbound.ts");
await import("./game/clientbound.ts");

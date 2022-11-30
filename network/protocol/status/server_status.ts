import * as json from "../../../utils/json.ts";
import { Component } from "../../../chat/component.ts";

// Required for the proxy to ensure that the serialized format remains the same when the same object is passed on.
// JSON with extra whitespace would cause problems too.
const ORIGINAL_STATUS_JSON = new WeakMap<ServerStatus, unknown>();

export type ServerStatus = {
  description?: Component;
  players?: {
    max: number;
    online: number;
    sample?: { id: string; name: string }[];
  };
  version?: {
    name: string;
    protocol: number;
  };
  /** A data URL encoded 64x64 PNG image. */
  favicon?: string;
  previewsChat?: boolean;
  enforcesSecureChat?: boolean;
};

export function deserializeServerStatus(value: unknown): ServerStatus {
  json.assertIsObject(value);
  const status: ServerStatus = {};
  ORIGINAL_STATUS_JSON.set(status, value);
  if ("description" in value) status.description = Component.deserialize(value.description);
  if ("players" in value) {
    const players = json.asObject(value.players);
    status.players = { max: json.asNumber(players.max), online: json.asNumber(players.online) };
    if (players.sample != null) {
      status.players.sample = json.asArray(players.sample).map((player) => {
        json.assertIsObject(player);
        return { id: json.asString(player.id), name: json.asString(player.name) };
      });
    }
    status.players = Object.freeze(status.players);
  }
  if ("favicon" in value) status.favicon = json.asString(value.favicon);
  status.previewsChat = json.asBoolean(value.previewsChat);
  status.enforcesSecureChat = json.asBoolean(value.enforcesSecureChat);
  return Object.freeze(status);
}

export function serializeServerStatus(status: ServerStatus): unknown {
  return ORIGINAL_STATUS_JSON.get(status) ?? {
    ...status,
    description: status.description?.serialize(),
  };
}

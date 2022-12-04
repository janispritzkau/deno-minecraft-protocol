import * as json from "../../../utils/json.ts";
import { Component } from "../../../chat/component.ts";

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
  }
  if ("version" in value) {
    const version = json.asObject(value.version);
    status.version = {
      name: json.asString(version.name),
      protocol: json.asNumber(version.protocol),
    };
  }
  if ("favicon" in value) status.favicon = json.asString(value.favicon);
  status.previewsChat = json.asBoolean(value.previewsChat);
  status.enforcesSecureChat = json.asBoolean(value.enforcesSecureChat);
  return status;
}

export function serializeServerStatus(status: ServerStatus): unknown {
  return {
    ...status,
    description: status.description?.serialize(),
  };
}

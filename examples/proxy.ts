import { parse } from "https://deno.land/std@0.166.0/flags/mod.ts";
import {
  bold,
  cyan,
  getColorEnabled,
  gray,
  green,
  red,
  setColorEnabled,
} from "https://deno.land/std@0.166.0/fmt/colors.ts";
import { hashServerId } from "minecraft/crypto/mod.ts";
import { encryptRsaPkcs1, importRsaPublicKey, signRsaPkcs1Sha256 } from "minecraft/crypto/rsa.ts";
import { Writer } from "minecraft/io/writer.ts";
import {
  parseServerAddress,
  ResolvedAddress,
  resolveServerAddress,
} from "minecraft/network/address.ts";
import { Connection } from "minecraft/network/connection.ts";
import { Packet, PacketHandler } from "minecraft/network/packet.ts";
import { Protocol } from "minecraft/network/protocol.ts";
import { Component } from "../chat/component.ts";
import { Uuid } from "../core/uuid.ts";
import {
  ClientboundAddEntityPacket,
  ClientboundForgetLevelChunkPacket,
  ClientboundLevelChunkWithLightPacket,
  ClientboundLevelParticlesPacket,
  ClientboundLightUpdatePacket,
  ClientboundLoginDisconnectPacket,
  ClientboundMoveEntityPosPacket,
  ClientboundMoveEntityPosRotPacket,
  ClientboundMoveEntityRotPacket,
  ClientboundRotateHeadPacket,
  ClientboundSetEntityDataPacket,
  ClientboundSetEntityMotionPacket,
  ClientboundTeleportEntityPacket,
  ClientboundUpdateAttributesPacket,
  ClientIntentionPacket,
  gameProtocol,
  handshakeProtocol,
  loginProtocol,
  ServerboundHelloPacket,
  ServerboundKeyPacket,
  ServerboundMovePlayerPosPacket,
  ServerboundMovePlayerPosRotPacket,
  ServerboundMovePlayerRotPacket,
  statusProtocol,
} from "../network/protocol/mod.ts";
import { getProfile, Profile } from "./_utils/auth.ts";
import { getProfileKeys } from "./_utils/keys.ts";

if (!Deno.isatty(Deno.stdout.rid)) setColorEnabled(false);

const HELP = `
USAGE:
    proxy [OPTIONS] <address>

ARGS:
    <address>
        The address the proxy will connect to

OPTIONS:
    --port <port>
        Port the proxy server will listen on (default: 25566)
    --hostname <host>
        Listen on a specific hostname
    --profile <name>
        Profile name used for authentication
`.trim();

function help(errorMessage?: string): never {
  if (errorMessage) console.error(red("error") + ":", errorMessage, "\n");
  console.log(HELP);
  Deno.exit(1);
}

async function main() {
  const args = parse(Deno.args, {
    string: ["port", "hostname", "profile"],
    default: { port: 25566 },
    boolean: ["help"],
  });

  if (args.help) help();

  const serverAddress = parseServerAddress(args._[0]?.toString() ?? "localhost:25565");
  const connectAddress = await resolveServerAddress(serverAddress.hostname, serverAddress.port);

  console.log(
    "using proxy address:",
    bold(cyan(connectAddress.hostname + ":" + connectAddress.port)),
  );

  const profile = args.profile ? await getProfile(args.profile) : null;

  const listener = Deno.listen({ hostname: args.hostname, port: Number(args.port) });
  const listenAddr = listener.addr as Deno.NetAddr;
  console.log(
    "proxy server listening on:",
    bold(cyan(listenAddr.hostname + ":" + listenAddr.port)),
  );

  for await (const denoConn of listener) {
    const remoteNetAddr = denoConn.remoteAddr as Deno.NetAddr;
    const remoteAddress = `${remoteNetAddr.hostname}:${remoteNetAddr.port}`;

    console.log(new Date(), gray(remoteAddress), green("incoming connection"));
    const conn = new Connection(denoConn);

    let closedByServer = false;
    handleConnection(
      conn,
      serverAddress.hostname,
      connectAddress,
      remoteAddress,
      profile,
    ).then((wasClosedByServer) => {
      closedByServer = wasClosedByServer;
    }).catch((e) => {
      console.error("error in server connection handler:", e);
    }).finally(() => {
      if (!conn.closed) conn.close();
      console.log(
        new Date(),
        gray(remoteAddress),
        red("connection closed" + (closedByServer ? " by server" : "")),
      );
    });
  }
}

const INSPECT_LINE_LIMIT = 100;

// deno-lint-ignore ban-types
const FILTERED_PACKETS = new Set<Function>([
  ServerboundMovePlayerPosPacket,
  ServerboundMovePlayerPosRotPacket,
  ServerboundMovePlayerRotPacket,
  ClientboundAddEntityPacket,
  ClientboundMoveEntityPosPacket,
  ClientboundMoveEntityPosRotPacket,
  ClientboundMoveEntityRotPacket,
  ClientboundSetEntityMotionPacket,
  ClientboundRotateHeadPacket,
  ClientboundTeleportEntityPacket,
  ClientboundUpdateAttributesPacket,
  ClientboundSetEntityDataPacket,
  ClientboundLevelChunkWithLightPacket,
  ClientboundLightUpdatePacket,
  ClientboundForgetLevelChunkPacket,
  ClientboundLevelParticlesPacket,
]);

async function handleConnection(
  conn: Connection,
  hostname: string,
  connectAddress: ResolvedAddress,
  remoteAddress: string,
  profile: Profile | null,
): Promise<boolean> {
  conn.setServerProtocol(handshakeProtocol);
  const handshake = await conn.receive();
  if (!(handshake instanceof ClientIntentionPacket)) return false;

  if (handshake.intention == "login" && handshake.protocolVersion != 760) {
    conn.setServerProtocol(loginProtocol);
    await conn.receiveRaw();
    await conn.send(
      new ClientboundLoginDisconnectPacket(
        Component.literal("[Proxy] Unsupported protocol version"),
      ),
    );
    return false;
  }

  const client = new Connection(await Deno.connect(connectAddress));
  client.setClientProtocol(handshakeProtocol);

  const modifiedHandshake = new ClientIntentionPacket(
    handshake.protocolVersion,
    hostname,
    connectAddress.port,
    handshake.intention,
  );

  const log = (flow: string, packet: Packet) => {
    const inspected = Deno.inspect(packet, {
      colors: getColorEnabled(),
      depth: 8,
      iterableLimit: 50,
    }).split("\n");
    console.log(
      new Date(),
      gray(remoteAddress),
      bold(flow),
      inspected.slice(0, INSPECT_LINE_LIMIT).join("\n") +
        (inspected.length > INSPECT_LINE_LIMIT
          ? "\n" + gray("... " + (inspected.length - INSPECT_LINE_LIMIT) + " lines truncated")
          : ""),
    );
  };

  log("[C -> S]", modifiedHandshake);

  await client.send(modifiedHandshake);

  let serverProtocol: Protocol<unknown, unknown> = handshakeProtocol;
  let serverHandler: PacketHandler | undefined;

  const setServerProtocol = <Handler extends PacketHandler>(
    protocol: Protocol<Handler, unknown>,
    handler?: Handler,
  ) => {
    conn.setServerProtocol(protocol);
    serverProtocol = protocol;
    serverHandler = handler;
  };

  let clientProtocol: Protocol<unknown, unknown> = handshakeProtocol;
  let clientHandler: PacketHandler | undefined;

  const setClientProtocol = <Handler extends PacketHandler>(
    protocol: Protocol<unknown, Handler>,
    handler?: Handler,
  ) => {
    client.setClientProtocol(protocol);
    clientProtocol = protocol;
    clientHandler = handler;
  };

  const skipPackets = new WeakSet<Packet>();

  if (handshake.intention == "login") {
    setServerProtocol(loginProtocol);
    const hello = await conn.receive();
    if (!(hello instanceof ServerboundHelloPacket)) return false;

    setClientProtocol(loginProtocol, {
      async handleGameProfile(packet) {
        await conn.send(packet);
        setServerProtocol(gameProtocol);
        setClientProtocol(gameProtocol);
        skipPackets.add(packet);
      },
      async handleLoginCompression(packet) {
        client.setCompressionThreshold(packet.compressionThreshold);
        skipPackets.add(packet);
      },
      async handleHello(packet) {
        if (profile == null) {
          await conn.send(
            new ClientboundLoginDisconnectPacket(
              Component.literal("[Proxy] Profile required for online servers"),
            ),
          );
          return client.close();
        }

        if (hello.publicKey && hello.profileId?.toString() != profile.id) {
          await conn.send(
            new ClientboundLoginDisconnectPacket(
              Component.literal("[Proxy] Please login using this profile: " + profile.name),
            ),
          );
          return client.close();
        }

        const publicKey = await importRsaPublicKey(packet.publicKey);
        const key = crypto.getRandomValues(new Uint8Array(16));
        const encryptedKey = await encryptRsaPkcs1(publicKey, key);
        const serverId = await hashServerId(packet.serverId, key, packet.publicKey);

        const response = await fetch(
          "https://sessionserver.mojang.com/session/minecraft/join",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              accessToken: profile.accessToken,
              selectedProfile: profile.id,
              serverId,
            }),
          },
        );

        if (!response.ok) throw new Error("Failed to join server");

        let keyPacket: ServerboundKeyPacket;
        if (hello.publicKey != null) {
          const profileKeys = await getProfileKeys(profile.id, profile.accessToken);
          const salt = crypto.getRandomValues(new BigUint64Array(1))[0]!;
          const msg = new Writer().write(packet.nonce).writeLong(salt).bytes();
          const signature = new Uint8Array(await signRsaPkcs1Sha256(profileKeys.privateKey, msg));
          keyPacket = new ServerboundKeyPacket(
            encryptedKey,
            { type: "salt_signature", salt, signature },
          );
        } else {
          const nonce = await encryptRsaPkcs1(publicKey, packet.nonce);
          keyPacket = new ServerboundKeyPacket(encryptedKey, { type: "nonce", nonce });
        }

        log("[C -> S]", keyPacket);
        await client.send(keyPacket);

        client.setEncryption(key);
        skipPackets.add(packet);
      },
    });

    if (profile == null) {
      log("[C -> S]", hello);
      await client.send(hello);
    } else {
      const profileKeys = hello.publicKey
        ? await getProfileKeys(profile.id, profile.accessToken)
        : null;
      const modifiedHello = new ServerboundHelloPacket(
        profile.name,
        profileKeys
          ? {
            expiresAt: profileKeys.expiresAt,
            key: profileKeys.publicKey,
            keySignature: profileKeys.publicKeySignature,
          }
          : null,
        Uuid.from(profile.id),
      );
      log("[C -> S]", modifiedHello);
      await client.send(modifiedHello);
    }
  } else if (handshake.intention == "status") {
    setServerProtocol(statusProtocol);
    setClientProtocol(statusProtocol);
  }

  let connectionClosedByServer = false;

  (async () => {
    while (!conn.closed) {
      const buf = await client.receiveRaw();
      if (buf == null) break;
      const packet = clientProtocol.deserializeClientbound(buf);
      if (clientHandler) await packet.handle(clientHandler);
      if (skipPackets.has(packet) || conn.closed) continue;
      await conn.send(packet);
      if (FILTERED_PACKETS.has(packet.constructor)) continue;
      log("[S -> C]", packet);
    }
  })().catch((e) => {
    if (e instanceof Deno.errors.Interrupted) return;
    console.error("error in client receive loop:", e);
  }).finally(() => {
    if (!client.closed) client.close();
    if (!conn.closed) {
      conn.close();
      connectionClosedByServer = true;
    }
  });

  while (true) {
    const buf = await conn.receiveRaw();
    if (buf == null) break;
    const packet = serverProtocol.deserializeServerbound(buf);
    if (serverHandler) await packet.handle(serverHandler);
    if (skipPackets.has(packet) || client.closed) continue;
    await client.send(packet);
    if (FILTERED_PACKETS.has(packet.constructor)) continue;
    log("[C -> S]", packet);
  }

  if (!client.closed) client.close();
  return connectionClosedByServer;
}

await main();

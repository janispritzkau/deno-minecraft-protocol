// deno-lint-ignore-file

import * as C from "https://deno.land/std@0.166.0/fmt/colors.ts";
import { equals } from "https://deno.land/std@0.166.0/bytes/equals.ts";
import { assertEquals } from "https://deno.land/std@0.166.0/testing/asserts.ts";
import {
  Connection,
  Packet,
  PacketHandler,
  parseServerAddress,
  Protocol,
  resolveServerAddress,
  ServerAddress,
} from "minecraft/network/mod.ts";
import {
  ClientboundForgetLevelChunkPacket,
  ClientboundGameProfilePacket,
  ClientboundLevelChunkWithLightPacket,
  ClientboundLightUpdatePacket,
  ClientboundLoginCompressionPacket,
  ClientboundLoginDisconnectPacket,
  ClientboundMoveEntityPosPacket,
  ClientboundMoveEntityPosRotPacket,
  ClientboundMoveEntityRotPacket,
  ClientboundRotateHeadPacket,
  ClientboundSetEntityMotionPacket,
  ClientboundTeleportEntityPacket,
  ClientboundUpdateAttributesPacket,
  ClientIntentionPacket,
  gameProtocol,
  handshakeProtocol,
  loginProtocol,
  ServerboundMovePlayerPosPacket,
  ServerboundMovePlayerPosRotPacket,
  ServerboundMovePlayerRotPacket,
  statusProtocol,
} from "../network/protocol/mod.ts";

const FILTERED_PACKETS = new Set<Function>([
  ServerboundMovePlayerPosPacket,
  ServerboundMovePlayerPosRotPacket,
  ServerboundMovePlayerRotPacket,

  ClientboundLightUpdatePacket,
  ClientboundLevelChunkWithLightPacket,
  ClientboundForgetLevelChunkPacket,
  ClientboundMoveEntityPosPacket,
  ClientboundMoveEntityPosRotPacket,
  ClientboundMoveEntityRotPacket,
  ClientboundSetEntityMotionPacket,
  ClientboundRotateHeadPacket,
  ClientboundTeleportEntityPacket,
  ClientboundUpdateAttributesPacket,
]);

async function handleConnection(conn: Connection, address: ServerAddress, netAddr: string) {
  const filteredPackets = new Map<Function, number>();
  const packetFlow = new Map<Function, string>();

  const log = (flow?: string, packet?: Packet) => {
    if (packet && flow && FILTERED_PACKETS.has(packet.constructor)) {
      packetFlow.set(packet.constructor, flow!);
      filteredPackets.set(packet.constructor, (filteredPackets.get(packet.constructor) ?? 0) + 1);
      return;
    }

    const internalLog = (flow: string, ...args: unknown[]) => {
      console.log(new Date(), C.gray(netAddr), `${C.bold(C.white("[" + flow + "]"))}`, ...args);
    };

    if (filteredPackets.size > 0) {
      for (const [constructor, count] of filteredPackets) {
        internalLog(
          packetFlow.get(constructor)!,
          C.gray(constructor.name + (count > 1 ? C.bold(` x${count}`) : "")),
        );
      }
      filteredPackets.clear();
    }

    if (packet && flow) {
      internalLog(flow, Deno.inspect(packet, { colors: true, depth: 5, iterableLimit: 20 }));
    }
  };

  conn.setServerProtocol(handshakeProtocol);
  const handshake = await conn.receive();
  if (!(handshake instanceof ClientIntentionPacket)) return;

  const connectAddr = await resolveServerAddress(address.hostname, address.port);

  const client = new Connection(await Deno.connect(connectAddr));
  client.setClientProtocol(handshakeProtocol);

  await client.send(
    new ClientIntentionPacket(
      handshake.protocolVersion,
      address.hostname,
      connectAddr.port,
      handshake.intention,
    ),
  );

  log("C -> S", handshake);

  let serverProtocol: Protocol<unknown, unknown> = handshakeProtocol;
  let serverHandler: PacketHandler | undefined;
  let clientProtocol: Protocol<unknown, unknown> = handshakeProtocol;
  let clientHandler: PacketHandler | undefined;

  const setServerProtocol = <H extends PacketHandler>(
    protocol: Protocol<H, unknown>,
    handler?: H,
  ) => {
    conn.setServerProtocol(protocol);
    serverProtocol = protocol;
    serverHandler = handler;
  };

  const setClientProtocol = <H extends PacketHandler>(
    protocol: Protocol<unknown, H>,
    handler?: H,
  ) => {
    client.setClientProtocol(protocol);
    clientProtocol = protocol;
    clientHandler = handler;
  };

  if (handshake.intention == 1) {
    setServerProtocol(statusProtocol);
    setClientProtocol(statusProtocol);
  } else if (handshake.intention == 2) {
    setServerProtocol(loginProtocol);

    setClientProtocol(loginProtocol, {
      async handleGameProfile() {
        setClientProtocol(gameProtocol);
      },
      async handleLoginCompression(packet) {
        client.setCompressionThreshold(packet.compressionThreshold);
      },
      async handleHello() {
        await conn.send(new ClientboundLoginDisconnectPacket({ text: "Encryption not supported" }));
        conn.close();
        client.close();
      },
    });
  } else {
    client.close();
    return;
  }

  (async () => {
    while (true) {
      const buf = await client.receiveRaw();
      if (buf == null) break;

      const packet = clientProtocol.deserializeClientbound(buf);
      log("S -> C", packet);

      const serialized = clientProtocol.serializeClientbound(packet);
      if (!equals(buf, serialized)) {
        assertEquals(serialized, buf, "Mismatch between deserialization and serialization");
      }

      if (clientHandler) packet.handle(clientHandler);
      if (packet instanceof ClientboundLoginCompressionPacket) continue;
      await conn.send(packet);

      if (packet instanceof ClientboundGameProfilePacket) {
        setServerProtocol(gameProtocol);
      }
    }
  })().catch((e) => {
    if (!(e instanceof Deno.errors.Interrupted)) console.error("error in proxy handler:", e);
    if (!conn.closed) conn.close();
  }).finally(() => {
    if (!client.closed) client.close();
  });

  while (true) {
    const buf = await conn.receiveRaw();
    if (buf == null) break;

    const packet = serverProtocol.deserializeServerbound(buf);
    log("C -> S", packet);

    const serialized = serverProtocol.serializeServerbound(packet);
    if (!equals(buf, serialized)) {
      assertEquals(serialized, buf, "Mismatch between deserialization and serialization");
    }

    if (serverHandler) packet.handle(serverHandler);
    await client.send(packet);
  }

  log();
  if (!client.closed) client.close();
}

async function runProxyServer(port = 25566, connectAddress = "localhost:25565") {
  const serverAddress = parseServerAddress(connectAddress);
  const listener = Deno.listen({ hostname: "0.0.0.0", port });

  for await (const denoConn of listener) {
    const remoteNetAddr = denoConn.remoteAddr as Deno.NetAddr;
    const remoteAddr = `${remoteNetAddr.hostname}:${remoteNetAddr.port}`;
    console.log("new incoming connection", C.gray(remoteAddr));

    const connection = new Connection(denoConn);
    await handleConnection(connection, serverAddress, remoteAddr).catch((e) => {
      console.error("error in server handler:", e);
    }).finally(() => {
      if (!connection.closed) connection.close();
      console.log("connection closed", C.gray(remoteAddr));
    });
  }
}

await runProxyServer();

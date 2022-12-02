import * as base64 from "https://deno.land/std@0.166.0/encoding/base64.ts";
import { importRsaPrivateKey, RsaPrivateKey } from "minecraft/crypto/rsa.ts";

export interface ProfileKeys {
  privateKey: RsaPrivateKey;
  publicKey: Uint8Array;
  publicKeySignature: Uint8Array;
  expiresAt: Date;
}

export async function getProfileKeys(
  profileId: string,
  accessToken: string,
): Promise<ProfileKeys> {
  const keyCache: Record<string, CachedProfileKeys> = JSON.parse(
    localStorage.getItem("profile_keys") ?? "{}",
  );

  let cachedKeys = keyCache[profileId];
  if (!cachedKeys || Date.now() > new Date(cachedKeys.expiresAt).getTime()) {
    const response = await fetch(
      "https://api.minecraftservices.com/player/certificates",
      {
        method: "POST",
        headers: { Authorization: `Bearer ${accessToken}` },
      },
    );
    if (!response.ok) throw new Error(response.statusText);

    const body = await response.json();
    cachedKeys = {
      privateKey: extractPemBase64Data(body["keyPair"]["privateKey"]),
      publicKey: extractPemBase64Data(body["keyPair"]["publicKey"]),
      publicKeySignature: body["publicKeySignatureV2"],
      expiresAt: new Date(body["expiresAt"]).toISOString(),
    };
  }

  keyCache[profileId] = cachedKeys;
  localStorage.setItem("profile_keys", JSON.stringify(keyCache));

  return {
    privateKey: await importRsaPrivateKey(base64.decode(cachedKeys.privateKey)),
    publicKey: base64.decode(cachedKeys.publicKey),
    publicKeySignature: base64.decode(cachedKeys.publicKeySignature),
    expiresAt: new Date(cachedKeys.expiresAt),
  };
}

function extractPemBase64Data(key: string) {
  return key.trim().split("\n").slice(1, -1).join("");
}

interface CachedProfileKeys {
  privateKey: string;
  publicKey: string;
  publicKeySignature: string;
  expiresAt: string;
}

import { delay } from "https://deno.land/std@0.166.0/async/delay.ts";
import { bold, underline } from "https://deno.land/std@0.166.0/fmt/colors.ts";
import {
  fetchMinecraftAccessToken,
  MinecraftAccessToken,
  oauthClient,
  OAuthToken,
} from "minecraft/auth/mod.ts";

export interface Profile {
  id: string;
  name: string;
  accessToken: string;
}

export async function getProfile(profileName: string): Promise<Profile> {
  const profileCache: Record<string, CachedProfile> = JSON.parse(
    localStorage.getItem("profile_cache") ?? "{}",
  );

  let cachedProfile: CachedProfile | undefined;
  if (profileName != null) {
    cachedProfile = profileCache[profileName] ??
      Object.values(profileCache).find((p) => p.name == profileName);
  }

  let accessToken: string;
  if (cachedProfile) {
    accessToken = await getAccessToken(cachedProfile.tokens);
  } else {
    const tokenCache: TokenCache = {};
    accessToken = await getAccessToken(tokenCache);

    const response = await fetch(
      "https://api.minecraftservices.com/minecraft/profile",
      { headers: { Authorization: `Bearer ${accessToken}` } },
    );
    if (!response.ok) throw new Error(response.statusText);

    const body = await response.json();
    cachedProfile = { id: body["id"], name: body["name"], tokens: tokenCache };
  }

  profileCache[cachedProfile.id] = cachedProfile;
  localStorage.setItem("profile_cache", JSON.stringify(profileCache));

  if (cachedProfile.name != profileName) {
    throw new Error(
      `Successfully authenticated ${cachedProfile.name}, but was expecting ${profileName}`,
    );
  }

  return { id: cachedProfile.id, name: cachedProfile.name, accessToken };
}

async function getAccessToken(cache: TokenCache): Promise<string> {
  if (!cache.oauth) {
    const request = await oauthClient.requestDeviceAuthorization();
    console.log(
      "to authenticate, please open",
      underline(request.verificationUri),
      "and enter this code:",
      bold(request.userCode),
    );

    let token: OAuthToken | null = null;
    while (token == null) {
      await delay(request.interval);
      if (Date.now() > request.expiryTime) {
        throw new Error("Device code expired");
      }
      token = await oauthClient.requestDeviceAccessToken(request.deviceCode);
    }
    cache.oauth = token;
  } else if (Date.now() > cache.oauth.expiryTime) {
    cache.oauth = await oauthClient.refreshAccessToken(cache.oauth.refreshToken);
  }

  if (!cache.minecraft || Date.now() > cache.minecraft.expiryTime) {
    cache.minecraft = await fetchMinecraftAccessToken(cache.oauth.accessToken);
  }

  return cache.minecraft.accessToken;
}

interface CachedProfile {
  id: string;
  name: string;
  tokens: TokenCache;
}

interface TokenCache {
  oauth?: OAuthToken;
  minecraft?: MinecraftAccessToken;
}

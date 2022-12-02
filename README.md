# Deno Minecraft Protocol

## Installing the example proxy

```sh
deno install --unstable --name minecraft_proxy --allow-net \
  --import-map https://denopkg.com/janispritzkau/deno-minecraft-protocol/import_map.json \
  https://denopkg.com/janispritzkau/deno-minecraft-protocol/examples/proxy.ts
```

## Using the proxy

```sh
# for offline servers
minecraft_proxy

# with custom port and proxy address
minecraft_proxy --port 25565 localhost:25567

# for online servers
minecraft_proxy --profile NAME play.example.org

# for more info
minecraft_proxy --help
```

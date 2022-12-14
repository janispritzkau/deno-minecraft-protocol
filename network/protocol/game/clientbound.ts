// deno-lint-ignore-file
import { Reader, Writer } from "minecraft/io/mod.ts";
import { Packet, PacketHandler } from "minecraft/network/packet.ts";
import {
  Block,
  BlockEntityType,
  blockEntityTypeEnum,
  blockEnum,
  BlockPos,
  BlockState,
  CatVariant,
  catVariantEnum,
  ChatFormatting,
  chatFormattingEnum,
  ChatType,
  chatTypeEnum,
  ChunkData,
  CommandNode,
  createEnumMapper,
  CustomStat,
  customStatEnum,
  Difficulty,
  difficultyEnum,
  Dimension,
  Direction,
  directionEnum,
  EntityType,
  entityTypeEnum,
  EquipmentSlot,
  equipmentSlotEnum,
  FilterMask,
  FrogVariant,
  frogVariantEnum,
  GameMode,
  GameProfile,
  GlobalPos,
  InteractionHand,
  interactionHandEnum,
  Item,
  itemEnum,
  ItemStack,
  LightData,
  Menu,
  menuEnum,
  MobEffect,
  mobEffectEnum,
  PaintingVariant,
  paintingVariantEnum,
  particleTypeEnum,
  PositionSource,
  ProfilePublicKey,
  readBlockPos,
  readBlockState,
  readChunkData,
  readCommandNode,
  readFilterMask,
  readGameProfile,
  readGlobalPos,
  readItemStack,
  readLightData,
  readPositionSource,
  readProfilePublicKey,
  readSignedMessageBody,
  readSignedMessageHeader,
  RecipeBookType,
  SignedMessageBody,
  SignedMessageHeader,
  SoundEvent,
  soundEventEnum,
  SoundSource,
  soundSourceEnum,
  statTypeEnum,
  VillagerProfession,
  villagerProfessionEnum,
  VillagerType,
  villagerTypeEnum,
  writeBlockPos,
  writeBlockState,
  writeChunkData,
  writeCommandNode,
  writeFilterMask,
  writeGameProfile,
  writeGlobalPos,
  writeItemStack,
  writeLightData,
  writePositionSource,
  writeProfilePublicKey,
  writeSignedMessageBody,
  writeSignedMessageHeader,
} from "../types.ts";
import { Uuid } from "../../../core/uuid.ts";
import { CompoundTag } from "minecraft/nbt/tag.ts";
import { Component } from "../../../chat/component.ts";
import { ResourceLocation } from "../../../core/resource_location.ts";

export interface ClientGameHandler extends PacketHandler {
  handleAddEntity?(packet: ClientboundAddEntityPacket): Promise<void>;
  handleAddExperienceOrb?(packet: ClientboundAddExperienceOrbPacket): Promise<void>;
  handleAddPlayer?(packet: ClientboundAddPlayerPacket): Promise<void>;
  handleAnimate?(packet: ClientboundAnimatePacket): Promise<void>;
  handleAwardStats?(packet: ClientboundAwardStatsPacket): Promise<void>;
  handleBlockChangedAck?(packet: ClientboundBlockChangedAckPacket): Promise<void>;
  handleBlockDestruction?(packet: ClientboundBlockDestructionPacket): Promise<void>;
  handleBlockEntityData?(packet: ClientboundBlockEntityDataPacket): Promise<void>;
  handleBlockEvent?(packet: ClientboundBlockEventPacket): Promise<void>;
  handleBlockUpdate?(packet: ClientboundBlockUpdatePacket): Promise<void>;
  handleBossEvent?(packet: ClientboundBossEventPacket): Promise<void>;
  handleChangeDifficulty?(packet: ClientboundChangeDifficultyPacket): Promise<void>;
  handleChatPreview?(packet: ClientboundChatPreviewPacket): Promise<void>;
  handleClearTitles?(packet: ClientboundClearTitlesPacket): Promise<void>;
  handleCommandSuggestions?(packet: ClientboundCommandSuggestionsPacket): Promise<void>;
  handleCommands?(packet: ClientboundCommandsPacket): Promise<void>;
  handleContainerClose?(packet: ClientboundContainerClosePacket): Promise<void>;
  handleContainerSetContent?(packet: ClientboundContainerSetContentPacket): Promise<void>;
  handleContainerSetData?(packet: ClientboundContainerSetDataPacket): Promise<void>;
  handleContainerSetSlot?(packet: ClientboundContainerSetSlotPacket): Promise<void>;
  handleCooldown?(packet: ClientboundCooldownPacket): Promise<void>;
  handleCustomChatCompletions?(packet: ClientboundCustomChatCompletionsPacket): Promise<void>;
  handleCustomPayload?(packet: ClientboundCustomPayloadPacket): Promise<void>;
  handleCustomSound?(packet: ClientboundCustomSoundPacket): Promise<void>;
  handleDeleteChat?(packet: ClientboundDeleteChatPacket): Promise<void>;
  handleDisconnect?(packet: ClientboundDisconnectPacket): Promise<void>;
  handleEntityEvent?(packet: ClientboundEntityEventPacket): Promise<void>;
  handleExplode?(packet: ClientboundExplodePacket): Promise<void>;
  handleForgetLevelChunk?(packet: ClientboundForgetLevelChunkPacket): Promise<void>;
  handleGameEvent?(packet: ClientboundGameEventPacket): Promise<void>;
  handleHorseScreenOpen?(packet: ClientboundHorseScreenOpenPacket): Promise<void>;
  handleInitializeBorder?(packet: ClientboundInitializeBorderPacket): Promise<void>;
  handleKeepAlive?(packet: ClientboundKeepAlivePacket): Promise<void>;
  handleLevelChunkWithLight?(packet: ClientboundLevelChunkWithLightPacket): Promise<void>;
  handleLevelEvent?(packet: ClientboundLevelEventPacket): Promise<void>;
  handleLevelParticles?(packet: ClientboundLevelParticlesPacket): Promise<void>;
  handleLightUpdate?(packet: ClientboundLightUpdatePacket): Promise<void>;
  handleLogin?(packet: ClientboundLoginPacket): Promise<void>;
  handleMapItemData?(packet: ClientboundMapItemDataPacket): Promise<void>;
  handleMerchantOffers?(packet: ClientboundMerchantOffersPacket): Promise<void>;
  handleMoveEntityPos?(packet: ClientboundMoveEntityPosPacket): Promise<void>;
  handleMoveEntityPosRot?(packet: ClientboundMoveEntityPosRotPacket): Promise<void>;
  handleMoveEntityRot?(packet: ClientboundMoveEntityRotPacket): Promise<void>;
  handleMoveVehicle?(packet: ClientboundMoveVehiclePacket): Promise<void>;
  handleOpenBook?(packet: ClientboundOpenBookPacket): Promise<void>;
  handleOpenScreen?(packet: ClientboundOpenScreenPacket): Promise<void>;
  handleOpenSignEditor?(packet: ClientboundOpenSignEditorPacket): Promise<void>;
  handlePing?(packet: ClientboundPingPacket): Promise<void>;
  handlePlaceGhostRecipe?(packet: ClientboundPlaceGhostRecipePacket): Promise<void>;
  handlePlayerAbilities?(packet: ClientboundPlayerAbilitiesPacket): Promise<void>;
  handlePlayerChatHeader?(packet: ClientboundPlayerChatHeaderPacket): Promise<void>;
  handlePlayerChat?(packet: ClientboundPlayerChatPacket): Promise<void>;
  handlePlayerCombatEnd?(packet: ClientboundPlayerCombatEndPacket): Promise<void>;
  handlePlayerCombatEnter?(packet: ClientboundPlayerCombatEnterPacket): Promise<void>;
  handlePlayerCombatKill?(packet: ClientboundPlayerCombatKillPacket): Promise<void>;
  handlePlayerInfo?(packet: ClientboundPlayerInfoPacket): Promise<void>;
  handlePlayerLookAt?(packet: ClientboundPlayerLookAtPacket): Promise<void>;
  handlePlayerPosition?(packet: ClientboundPlayerPositionPacket): Promise<void>;
  handleRecipe?(packet: ClientboundRecipePacket): Promise<void>;
  handleRemoveEntities?(packet: ClientboundRemoveEntitiesPacket): Promise<void>;
  handleRemoveMobEffect?(packet: ClientboundRemoveMobEffectPacket): Promise<void>;
  handleResourcePack?(packet: ClientboundResourcePackPacket): Promise<void>;
  handleRespawn?(packet: ClientboundRespawnPacket): Promise<void>;
  handleRotateHead?(packet: ClientboundRotateHeadPacket): Promise<void>;
  handleSectionBlocksUpdate?(packet: ClientboundSectionBlocksUpdatePacket): Promise<void>;
  handleSelectAdvancementsTab?(packet: ClientboundSelectAdvancementsTabPacket): Promise<void>;
  handleServerData?(packet: ClientboundServerDataPacket): Promise<void>;
  handleSetActionBarText?(packet: ClientboundSetActionBarTextPacket): Promise<void>;
  handleSetBorderCenter?(packet: ClientboundSetBorderCenterPacket): Promise<void>;
  handleSetBorderLerpSize?(packet: ClientboundSetBorderLerpSizePacket): Promise<void>;
  handleSetBorderSize?(packet: ClientboundSetBorderSizePacket): Promise<void>;
  handleSetBorderWarningDelay?(packet: ClientboundSetBorderWarningDelayPacket): Promise<void>;
  handleSetBorderWarningDistance?(packet: ClientboundSetBorderWarningDistancePacket): Promise<void>;
  handleSetCamera?(packet: ClientboundSetCameraPacket): Promise<void>;
  handleSetCarriedItem?(packet: ClientboundSetCarriedItemPacket): Promise<void>;
  handleSetChunkCacheCenter?(packet: ClientboundSetChunkCacheCenterPacket): Promise<void>;
  handleSetChunkCacheRadius?(packet: ClientboundSetChunkCacheRadiusPacket): Promise<void>;
  handleSetDefaultSpawnPosition?(packet: ClientboundSetDefaultSpawnPositionPacket): Promise<void>;
  handleSetDisplayChatPreview?(packet: ClientboundSetDisplayChatPreviewPacket): Promise<void>;
  handleSetDisplayObjective?(packet: ClientboundSetDisplayObjectivePacket): Promise<void>;
  handleSetEntityData?(packet: ClientboundSetEntityDataPacket): Promise<void>;
  handleSetEntityLink?(packet: ClientboundSetEntityLinkPacket): Promise<void>;
  handleSetEntityMotion?(packet: ClientboundSetEntityMotionPacket): Promise<void>;
  handleSetEquipment?(packet: ClientboundSetEquipmentPacket): Promise<void>;
  handleSetExperience?(packet: ClientboundSetExperiencePacket): Promise<void>;
  handleSetHealth?(packet: ClientboundSetHealthPacket): Promise<void>;
  handleSetObjective?(packet: ClientboundSetObjectivePacket): Promise<void>;
  handleSetPassengers?(packet: ClientboundSetPassengersPacket): Promise<void>;
  handleSetPlayerTeam?(packet: ClientboundSetPlayerTeamPacket): Promise<void>;
  handleSetScore?(packet: ClientboundSetScorePacket): Promise<void>;
  handleSetSimulationDistance?(packet: ClientboundSetSimulationDistancePacket): Promise<void>;
  handleSetSubtitleText?(packet: ClientboundSetSubtitleTextPacket): Promise<void>;
  handleSetTime?(packet: ClientboundSetTimePacket): Promise<void>;
  handleSetTitleText?(packet: ClientboundSetTitleTextPacket): Promise<void>;
  handleSetTitlesAnimation?(packet: ClientboundSetTitlesAnimationPacket): Promise<void>;
  handleSoundEntity?(packet: ClientboundSoundEntityPacket): Promise<void>;
  handleSound?(packet: ClientboundSoundPacket): Promise<void>;
  handleStopSound?(packet: ClientboundStopSoundPacket): Promise<void>;
  handleSystemChat?(packet: ClientboundSystemChatPacket): Promise<void>;
  handleTabList?(packet: ClientboundTabListPacket): Promise<void>;
  handleTagQuery?(packet: ClientboundTagQueryPacket): Promise<void>;
  handleTakeItemEntity?(packet: ClientboundTakeItemEntityPacket): Promise<void>;
  handleTeleportEntity?(packet: ClientboundTeleportEntityPacket): Promise<void>;
  handleUpdateAdvancements?(packet: ClientboundUpdateAdvancementsPacket): Promise<void>;
  handleUpdateAttributes?(packet: ClientboundUpdateAttributesPacket): Promise<void>;
  handleUpdateMobEffect?(packet: ClientboundUpdateMobEffectPacket): Promise<void>;
  handleUpdateRecipes?(packet: ClientboundUpdateRecipesPacket): Promise<void>;
  handleUpdateTags?(packet: ClientboundUpdateTagsPacket): Promise<void>;
}

export class ClientboundAddEntityPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public uuid: Uuid,
    public entityType: EntityType,
    public x: number,
    public y: number,
    public z: number,
    public pitch: number,
    public yaw: number,
    public headYaw: number,
    /** The meaning of this value is dependent on the entity type. */
    public data: number,
    /** Velocity on the X axis. */
    public vx: number,
    /** Velocity on the Y axis. */
    public vy: number,
    /** Velocity on the Z axis. */
    public vz: number,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const uuid = Uuid.from(reader.read(16));
    const entityType = entityTypeEnum.fromId(reader.readVarInt());
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const pitch = reader.readByte();
    const yaw = reader.readByte();
    const headYaw = reader.readByte();
    const data = reader.readVarInt();
    const vx = reader.readShort();
    const vy = reader.readShort();
    const vz = reader.readShort();
    return new this(entityId, uuid, entityType, x, y, z, pitch, yaw, headYaw, data, vx, vy, vz);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.write(this.uuid.bytes());
    writer.writeVarInt(entityTypeEnum.toId(this.entityType));
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeByte(this.pitch);
    writer.writeByte(this.yaw);
    writer.writeByte(this.headYaw);
    writer.writeVarInt(this.data);
    writer.writeShort(this.vx);
    writer.writeShort(this.vy);
    writer.writeShort(this.vz);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleAddEntity?.(this);
  }
}

export class ClientboundAddExperienceOrbPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public x: number,
    public y: number,
    public z: number,
    /** The amount of experience. */
    public amount: number,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const amount = reader.readShort();
    return new this(entityId, x, y, z, amount);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeShort(this.amount);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleAddExperienceOrb?.(this);
  }
}

export class ClientboundAddPlayerPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public playerId: Uuid,
    public x: number,
    public y: number,
    public z: number,
    public yaw: number,
    public pitch: number,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const playerId = Uuid.from(reader.read(16));
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const yaw = reader.readByte();
    const pitch = reader.readByte();
    return new this(entityId, playerId, x, y, z, yaw, pitch);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.write(this.playerId.bytes());
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeByte(this.yaw);
    writer.writeByte(this.pitch);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleAddPlayer?.(this);
  }
}

export type AnimateAction =
  | "swing_main_hand"
  | "animate_hurt"
  | "stop_sleeping"
  | "swing_off_hand"
  | "critical_hit"
  | "enchanted_hit";

const animateActionEnum = createEnumMapper<AnimateAction>({
  "swing_main_hand": 0,
  "animate_hurt": 1,
  "stop_sleeping": 2,
  "swing_off_hand": 3,
  "critical_hit": 4,
  "enchanted_hit": 5,
});

export class ClientboundAnimatePacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public action: AnimateAction,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const action = animateActionEnum.fromId(reader.readUnsignedByte());
    return new this(entityId, action);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeUnsignedByte(animateActionEnum.toId(this.action));
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleAnimate?.(this);
  }
}

export type Stat = {
  stat:
    | { type: "minecraft:mined"; block: Block }
    | { type: "minecraft:crafted"; item: Item }
    | { type: "minecraft:used"; item: Item }
    | { type: "minecraft:broken"; item: Item }
    | { type: "minecraft:picked_up"; item: Item }
    | { type: "minecraft:dropped"; item: Item }
    | { type: "minecraft:killed"; entityType: EntityType }
    | { type: "minecraft:killed_by"; entityType: EntityType }
    | { type: "minecraft:custom"; custom: CustomStat };
  value: number;
};

export class ClientboundAwardStatsPacket implements Packet<ClientGameHandler> {
  constructor(
    public stats: Stat[],
  ) {}
  static read(reader: Reader) {
    const list: Stat[] = [];
    for (let i = reader.readVarInt(); i--;) {
      let result:
        | { type: "minecraft:mined"; block: Block }
        | { type: "minecraft:crafted"; item: Item }
        | { type: "minecraft:used"; item: Item }
        | { type: "minecraft:broken"; item: Item }
        | { type: "minecraft:picked_up"; item: Item }
        | { type: "minecraft:dropped"; item: Item }
        | { type: "minecraft:killed"; entityType: EntityType }
        | { type: "minecraft:killed_by"; entityType: EntityType }
        | { type: "minecraft:custom"; custom: CustomStat };
      switch (statTypeEnum.fromId(reader.readVarInt())) {
        case "minecraft:mined":
          result = { type: "minecraft:mined", block: blockEnum.fromId(reader.readVarInt()) };
          break;
        case "minecraft:crafted":
          result = { type: "minecraft:crafted", item: itemEnum.fromId(reader.readVarInt()) };
          break;
        case "minecraft:used":
          result = { type: "minecraft:used", item: itemEnum.fromId(reader.readVarInt()) };
          break;
        case "minecraft:broken":
          result = { type: "minecraft:broken", item: itemEnum.fromId(reader.readVarInt()) };
          break;
        case "minecraft:picked_up":
          result = { type: "minecraft:picked_up", item: itemEnum.fromId(reader.readVarInt()) };
          break;
        case "minecraft:dropped":
          result = { type: "minecraft:dropped", item: itemEnum.fromId(reader.readVarInt()) };
          break;
        case "minecraft:killed":
          result = { type: "minecraft:killed", entityType: entityTypeEnum.fromId(reader.readVarInt()) };
          break;
        case "minecraft:killed_by":
          result = { type: "minecraft:killed_by", entityType: entityTypeEnum.fromId(reader.readVarInt()) };
          break;
        case "minecraft:custom":
          result = { type: "minecraft:custom", custom: customStatEnum.fromId(reader.readVarInt()) };
          break;
        default:
          throw new Error("Invalid tag id");
      }
      list.push({ stat: result, value: reader.readVarInt() });
    }
    const stats = list;
    return new this(stats);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.stats.length);
    for (const item of this.stats) {
      switch (item.stat.type) {
        case "minecraft:mined": {
          writer.writeVarInt(statTypeEnum.toId("minecraft:mined"));
          writer.writeVarInt(blockEnum.toId(item.stat.block));
          break;
        }
        case "minecraft:crafted": {
          writer.writeVarInt(statTypeEnum.toId("minecraft:crafted"));
          writer.writeVarInt(itemEnum.toId(item.stat.item));
          break;
        }
        case "minecraft:used": {
          writer.writeVarInt(statTypeEnum.toId("minecraft:used"));
          writer.writeVarInt(itemEnum.toId(item.stat.item));
          break;
        }
        case "minecraft:broken": {
          writer.writeVarInt(statTypeEnum.toId("minecraft:broken"));
          writer.writeVarInt(itemEnum.toId(item.stat.item));
          break;
        }
        case "minecraft:picked_up": {
          writer.writeVarInt(statTypeEnum.toId("minecraft:picked_up"));
          writer.writeVarInt(itemEnum.toId(item.stat.item));
          break;
        }
        case "minecraft:dropped": {
          writer.writeVarInt(statTypeEnum.toId("minecraft:dropped"));
          writer.writeVarInt(itemEnum.toId(item.stat.item));
          break;
        }
        case "minecraft:killed": {
          writer.writeVarInt(statTypeEnum.toId("minecraft:killed"));
          writer.writeVarInt(entityTypeEnum.toId(item.stat.entityType));
          break;
        }
        case "minecraft:killed_by": {
          writer.writeVarInt(statTypeEnum.toId("minecraft:killed_by"));
          writer.writeVarInt(entityTypeEnum.toId(item.stat.entityType));
          break;
        }
        case "minecraft:custom": {
          writer.writeVarInt(statTypeEnum.toId("minecraft:custom"));
          writer.writeVarInt(customStatEnum.toId(item.stat.custom));
          break;
        }
        default:
          throw new Error("Invalid tag");
      }
      writer.writeVarInt(item.value);
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleAwardStats?.(this);
  }
}

export class ClientboundBlockChangedAckPacket implements Packet<ClientGameHandler> {
  constructor(
    public sequence: number,
  ) {}
  static read(reader: Reader) {
    const sequence = reader.readVarInt();
    return new this(sequence);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.sequence);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleBlockChangedAck?.(this);
  }
}

export class ClientboundBlockDestructionPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public pos: BlockPos,
    /** The block breaking progress from 0 to 9 */
    public progress: number,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const pos = readBlockPos(reader);
    const progress = reader.readUnsignedByte();
    return new this(entityId, pos, progress);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writeBlockPos(writer, this.pos);
    writer.writeUnsignedByte(this.progress);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleBlockDestruction?.(this);
  }
}

export class ClientboundBlockEntityDataPacket implements Packet<ClientGameHandler> {
  constructor(
    public pos: BlockPos,
    public blockEntityType: BlockEntityType,
    public tag: CompoundTag | null,
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    const blockEntityType = blockEntityTypeEnum.fromId(reader.readVarInt());
    const tag = reader.readCompoundTag();
    return new this(pos, blockEntityType, tag);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writer.writeVarInt(blockEntityTypeEnum.toId(this.blockEntityType));
    writer.writeCompoundTag(this.tag);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleBlockEntityData?.(this);
  }
}

export class ClientboundBlockEventPacket implements Packet<ClientGameHandler> {
  constructor(
    public pos: BlockPos,
    /** Type of action (varies depending on block) */
    public type: number,
    /** Action parameter */
    public param: number,
    public block: Block,
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    const type = reader.readUnsignedByte();
    const param = reader.readUnsignedByte();
    const block = blockEnum.fromId(reader.readVarInt());
    return new this(pos, type, param, block);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writer.writeUnsignedByte(this.type);
    writer.writeUnsignedByte(this.param);
    writer.writeVarInt(blockEnum.toId(this.block));
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleBlockEvent?.(this);
  }
}

export class ClientboundBlockUpdatePacket implements Packet<ClientGameHandler> {
  constructor(
    public pos: BlockPos,
    public blockState: BlockState,
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    const blockState = readBlockState(reader);
    return new this(pos, blockState);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writeBlockState(writer, this.blockState);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleBlockUpdate?.(this);
  }
}

export type BossBarAction =
  | {
    type: "add";
    name: Component;
    progress: number;
    color: BossBarColor;
    overlay: BossBarOverlay;
    darkenScreen: boolean;
    playMusic: boolean;
    createWorldFog: boolean;
  }
  | { type: "remove" }
  | { type: "update_progress"; progress: number }
  | { type: "update_name"; name: Component }
  | { type: "update_style"; color: BossBarColor; overlay: BossBarOverlay }
  | { type: "update_properties"; darkenScreen: boolean; playMusic: boolean; createWorldFog: boolean };

export type BossBarColor = "pink" | "blue" | "red" | "green" | "yellow" | "purple" | "white";

const bossBarColorEnum = createEnumMapper<BossBarColor>({
  "pink": 0,
  "blue": 1,
  "red": 2,
  "green": 3,
  "yellow": 4,
  "purple": 5,
  "white": 6,
});

export type BossBarOverlay = "progress" | "notched_6" | "notched_10" | "notched_12" | "notched_20";

const bossBarOverlayEnum = createEnumMapper<BossBarOverlay>({
  "progress": 0,
  "notched_6": 1,
  "notched_10": 2,
  "notched_12": 3,
  "notched_20": 4,
});

export class ClientboundBossEventPacket implements Packet<ClientGameHandler> {
  constructor(
    public bossBarId: Uuid,
    public action: BossBarAction,
  ) {}
  static read(reader: Reader) {
    const bossBarId = Uuid.from(reader.read(16));
    let result: BossBarAction;
    switch (reader.readVarInt()) {
      case 0: {
        const type = "add";
        const name = Component.deserialize(reader.readJson());
        const progress = reader.readFloat();
        const color = bossBarColorEnum.fromId(reader.readVarInt());
        const overlay = bossBarOverlayEnum.fromId(reader.readVarInt());
        const flags = reader.readByte();
        result = {
          type,
          name,
          progress,
          color,
          overlay,
          darkenScreen: (flags & 0x1) > 0,
          playMusic: (flags & 0x2) > 0,
          createWorldFog: (flags & 0x4) > 0,
        };
        break;
      }
      case 1:
        result = { type: "remove" };
        break;
      case 2:
        result = { type: "update_progress", progress: reader.readFloat() };
        break;
      case 3:
        result = { type: "update_name", name: Component.deserialize(reader.readJson()) };
        break;
      case 4:
        result = {
          type: "update_style",
          color: bossBarColorEnum.fromId(reader.readVarInt()),
          overlay: bossBarOverlayEnum.fromId(reader.readVarInt()),
        };
        break;
      case 5: {
        const type = "update_properties";
        const flags = reader.readByte();
        result = {
          type,
          darkenScreen: (flags & 0x1) > 0,
          playMusic: (flags & 0x2) > 0,
          createWorldFog: (flags & 0x4) > 0,
        };
        break;
      }
      default:
        throw new Error("Invalid tag id");
    }
    const action = result;
    return new this(bossBarId, action);
  }
  write(writer: Writer) {
    writer.write(this.bossBarId.bytes());
    switch (this.action.type) {
      case "add": {
        writer.writeVarInt(0);
        writer.writeJson(this.action.name.serialize());
        writer.writeFloat(this.action.progress);
        writer.writeVarInt(bossBarColorEnum.toId(this.action.color));
        writer.writeVarInt(bossBarOverlayEnum.toId(this.action.overlay));
        writer.writeByte(
          (-this.action.darkenScreen & 0x1) | (-this.action.playMusic & 0x2) | (-this.action.createWorldFog & 0x4),
        );
        break;
      }
      case "remove": {
        writer.writeVarInt(1);
        break;
      }
      case "update_progress": {
        writer.writeVarInt(2);
        writer.writeFloat(this.action.progress);
        break;
      }
      case "update_name": {
        writer.writeVarInt(3);
        writer.writeJson(this.action.name.serialize());
        break;
      }
      case "update_style": {
        writer.writeVarInt(4);
        writer.writeVarInt(bossBarColorEnum.toId(this.action.color));
        writer.writeVarInt(bossBarOverlayEnum.toId(this.action.overlay));
        break;
      }
      case "update_properties": {
        writer.writeVarInt(5);
        writer.writeByte(
          (-this.action.darkenScreen & 0x1) | (-this.action.playMusic & 0x2) | (-this.action.createWorldFog & 0x4),
        );
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleBossEvent?.(this);
  }
}

export class ClientboundChangeDifficultyPacket implements Packet<ClientGameHandler> {
  constructor(
    public difficulty: Difficulty,
    public isLocked: boolean,
  ) {}
  static read(reader: Reader) {
    const difficulty = difficultyEnum.fromId(reader.readUnsignedByte());
    const isLocked = reader.readBoolean();
    return new this(difficulty, isLocked);
  }
  write(writer: Writer) {
    writer.writeUnsignedByte(difficultyEnum.toId(this.difficulty));
    writer.writeBoolean(this.isLocked);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleChangeDifficulty?.(this);
  }
}

export class ClientboundChatPreviewPacket implements Packet<ClientGameHandler> {
  constructor(
    public transactionId: number,
    public preview: Component | null,
  ) {}
  static read(reader: Reader) {
    const transactionId = reader.readInt();
    const preview = reader.readBoolean() ? Component.deserialize(reader.readJson()) : null;
    return new this(transactionId, preview);
  }
  write(writer: Writer) {
    writer.writeInt(this.transactionId);
    writer.writeBoolean(this.preview != null);
    if (this.preview != null) writer.writeJson(this.preview.serialize());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleChatPreview?.(this);
  }
}

export class ClientboundClearTitlesPacket implements Packet<ClientGameHandler> {
  constructor(
    /** Reset fade-in, stay and fade-out time. */
    public resetTimes: boolean,
  ) {}
  static read(reader: Reader) {
    const resetTimes = reader.readBoolean();
    return new this(resetTimes);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.resetTimes);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleClearTitles?.(this);
  }
}

export type Suggestion = { text: string; tooltip: Component | null };

export class ClientboundCommandSuggestionsPacket implements Packet<ClientGameHandler> {
  constructor(
    public transactionId: number,
    public rangeStart: number,
    public rangeLength: number,
    public suggestions: Suggestion[],
  ) {}
  static read(reader: Reader) {
    const transactionId = reader.readVarInt();
    const rangeStart = reader.readVarInt();
    const rangeLength = reader.readVarInt();
    const list: Suggestion[] = [];
    for (let i = reader.readVarInt(); i--;) {
      list.push({
        text: reader.readString(),
        tooltip: reader.readBoolean() ? Component.deserialize(reader.readJson()) : null,
      });
    }
    const suggestions = list;
    return new this(transactionId, rangeStart, rangeLength, suggestions);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.transactionId);
    writer.writeVarInt(this.rangeStart);
    writer.writeVarInt(this.rangeLength);
    writer.writeVarInt(this.suggestions.length);
    for (const item of this.suggestions) {
      writer.writeString(item.text);
      writer.writeBoolean(item.tooltip != null);
      if (item.tooltip != null) writer.writeJson(item.tooltip.serialize());
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleCommandSuggestions?.(this);
  }
}

export class ClientboundCommandsPacket implements Packet<ClientGameHandler> {
  constructor(
    public entries: CommandNode[],
    public rootIndex: number,
  ) {}
  static read(reader: Reader) {
    const list: CommandNode[] = [];
    for (let i = reader.readVarInt(); i--;) list.push(readCommandNode(reader));
    const entries = list;
    const rootIndex = reader.readVarInt();
    return new this(entries, rootIndex);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entries.length);
    for (const item of this.entries) writeCommandNode(writer, item);
    writer.writeVarInt(this.rootIndex);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleCommands?.(this);
  }
}

export class ClientboundContainerClosePacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readUnsignedByte();
    return new this(containerId);
  }
  write(writer: Writer) {
    writer.writeUnsignedByte(this.containerId);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleContainerClose?.(this);
  }
}

export class ClientboundContainerSetContentPacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    public stateId: number,
    /** The array index corresponds to the slot number. */
    public itemSlots: ItemStack[],
    public carriedItem: ItemStack,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readUnsignedByte();
    const stateId = reader.readVarInt();
    const list: ItemStack[] = [];
    for (let i = reader.readVarInt(); i--;) list.push(readItemStack(reader));
    const itemSlots = list;
    const carriedItem = readItemStack(reader);
    return new this(containerId, stateId, itemSlots, carriedItem);
  }
  write(writer: Writer) {
    writer.writeUnsignedByte(this.containerId);
    writer.writeVarInt(this.stateId);
    writer.writeVarInt(this.itemSlots.length);
    for (const item of this.itemSlots) writeItemStack(writer, item);
    writeItemStack(writer, this.carriedItem);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleContainerSetContent?.(this);
  }
}

export class ClientboundContainerSetDataPacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    public id: number,
    public value: number,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readUnsignedByte();
    const id = reader.readShort();
    const value = reader.readShort();
    return new this(containerId, id, value);
  }
  write(writer: Writer) {
    writer.writeUnsignedByte(this.containerId);
    writer.writeShort(this.id);
    writer.writeShort(this.value);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleContainerSetData?.(this);
  }
}

export class ClientboundContainerSetSlotPacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    public stateId: number,
    public slot: number,
    public itemStack: ItemStack,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readByte();
    const stateId = reader.readVarInt();
    const slot = reader.readShort();
    const itemStack = readItemStack(reader);
    return new this(containerId, stateId, slot, itemStack);
  }
  write(writer: Writer) {
    writer.writeByte(this.containerId);
    writer.writeVarInt(this.stateId);
    writer.writeShort(this.slot);
    writeItemStack(writer, this.itemStack);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleContainerSetSlot?.(this);
  }
}

export class ClientboundCooldownPacket implements Packet<ClientGameHandler> {
  constructor(
    public item: Item,
    public duration: number,
  ) {}
  static read(reader: Reader) {
    const item = itemEnum.fromId(reader.readVarInt());
    const duration = reader.readVarInt();
    return new this(item, duration);
  }
  write(writer: Writer) {
    writer.writeVarInt(itemEnum.toId(this.item));
    writer.writeVarInt(this.duration);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleCooldown?.(this);
  }
}

export type CustomChatCompletionsAction = "add" | "remove" | "set";

const customChatCompletionsActionEnum = createEnumMapper<CustomChatCompletionsAction>({
  "add": 0,
  "remove": 1,
  "set": 2,
});

export class ClientboundCustomChatCompletionsPacket implements Packet<ClientGameHandler> {
  constructor(
    public action: CustomChatCompletionsAction,
    public entries: string[],
  ) {}
  static read(reader: Reader) {
    const action = customChatCompletionsActionEnum.fromId(reader.readVarInt());
    const list: string[] = [];
    for (let i = reader.readVarInt(); i--;) list.push(reader.readString());
    const entries = list;
    return new this(action, entries);
  }
  write(writer: Writer) {
    writer.writeVarInt(customChatCompletionsActionEnum.toId(this.action));
    writer.writeVarInt(this.entries.length);
    for (const item of this.entries) writer.writeString(item);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleCustomChatCompletions?.(this);
  }
}

export class ClientboundCustomPayloadPacket implements Packet<ClientGameHandler> {
  constructor(
    public identifier: ResourceLocation,
    public data: Uint8Array,
  ) {}
  static read(reader: Reader) {
    const identifier = ResourceLocation.from(reader.readString(32767));
    const data = reader.read(reader.unreadBytes);
    return new this(identifier, data);
  }
  write(writer: Writer) {
    writer.writeString(this.identifier.toString());
    writer.write(this.data);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleCustomPayload?.(this);
  }
}

export class ClientboundCustomSoundPacket implements Packet<ClientGameHandler> {
  constructor(
    public sound: ResourceLocation,
    public source: SoundSource,
    public x: number,
    public y: number,
    public z: number,
    public volume: number,
    public pitch: number,
    public seed: bigint,
  ) {}
  static read(reader: Reader) {
    const sound = ResourceLocation.from(reader.readString(32767));
    const source = soundSourceEnum.fromId(reader.readVarInt());
    const x = reader.readInt();
    const y = reader.readInt();
    const z = reader.readInt();
    const volume = reader.readFloat();
    const pitch = reader.readFloat();
    const seed = reader.readLong();
    return new this(sound, source, x, y, z, volume, pitch, seed);
  }
  write(writer: Writer) {
    writer.writeString(this.sound.toString());
    writer.writeVarInt(soundSourceEnum.toId(this.source));
    writer.writeInt(this.x);
    writer.writeInt(this.y);
    writer.writeInt(this.z);
    writer.writeFloat(this.volume);
    writer.writeFloat(this.pitch);
    writer.writeLong(this.seed);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleCustomSound?.(this);
  }
}

export class ClientboundDeleteChatPacket implements Packet<ClientGameHandler> {
  constructor(
    public messageSignature: Uint8Array,
  ) {}
  static read(reader: Reader) {
    const messageSignature = reader.readByteArray();
    return new this(messageSignature);
  }
  write(writer: Writer) {
    writer.writeByteArray(this.messageSignature);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleDeleteChat?.(this);
  }
}

export class ClientboundDisconnectPacket implements Packet<ClientGameHandler> {
  constructor(
    public reason: Component,
  ) {}
  static read(reader: Reader) {
    const reason = Component.deserialize(reader.readJson());
    return new this(reason);
  }
  write(writer: Writer) {
    writer.writeJson(this.reason.serialize());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleDisconnect?.(this);
  }
}

export class ClientboundEntityEventPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    /** Event ids vary depending on the entity type. */
    public eventId: number,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readInt();
    const eventId = reader.readByte();
    return new this(entityId, eventId);
  }
  write(writer: Writer) {
    writer.writeInt(this.entityId);
    writer.writeByte(this.eventId);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleEntityEvent?.(this);
  }
}

export class ClientboundExplodePacket implements Packet<ClientGameHandler> {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public power: number,
    public toBlow: { x: number; y: number; z: number }[],
    public knockbackX: number,
    public knockbackY: number,
    public knockbackZ: number,
  ) {}
  static read(reader: Reader) {
    const x = reader.readFloat();
    const y = reader.readFloat();
    const z = reader.readFloat();
    const power = reader.readFloat();
    const list: { x: number; y: number; z: number }[] = [];
    for (let i = reader.readVarInt(); i--;) {
      list.push({ x: reader.readByte(), y: reader.readByte(), z: reader.readByte() });
    }
    const toBlow = list;
    const knockbackX = reader.readFloat();
    const knockbackY = reader.readFloat();
    const knockbackZ = reader.readFloat();
    return new this(x, y, z, power, toBlow, knockbackX, knockbackY, knockbackZ);
  }
  write(writer: Writer) {
    writer.writeFloat(this.x);
    writer.writeFloat(this.y);
    writer.writeFloat(this.z);
    writer.writeFloat(this.power);
    writer.writeVarInt(this.toBlow.length);
    for (const item of this.toBlow) {
      writer.writeByte(item.x);
      writer.writeByte(item.y);
      writer.writeByte(item.z);
    }
    writer.writeFloat(this.knockbackX);
    writer.writeFloat(this.knockbackY);
    writer.writeFloat(this.knockbackZ);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleExplode?.(this);
  }
}

export class ClientboundForgetLevelChunkPacket implements Packet<ClientGameHandler> {
  constructor(
    public chunkX: number,
    public chunkZ: number,
  ) {}
  static read(reader: Reader) {
    const chunkX = reader.readInt();
    const chunkZ = reader.readInt();
    return new this(chunkX, chunkZ);
  }
  write(writer: Writer) {
    writer.writeInt(this.chunkX);
    writer.writeInt(this.chunkZ);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleForgetLevelChunk?.(this);
  }
}

export type GameEvent =
  | "no_respawn_block_available"
  | "start_raining"
  | "stop_raining"
  | "change_game_mode"
  | "win_game"
  | "demo_event"
  | "arrow_hit_player"
  | "rain_level_change"
  | "thunder_level_change"
  | "puffer_fish_sting"
  | "guardian_elder_effect"
  | "immediate_respawn";

const gameEventEnum = createEnumMapper<GameEvent>({
  "no_respawn_block_available": 0,
  "start_raining": 1,
  "stop_raining": 2,
  "change_game_mode": 3,
  "win_game": 4,
  "demo_event": 5,
  "arrow_hit_player": 6,
  "rain_level_change": 7,
  "thunder_level_change": 8,
  "puffer_fish_sting": 9,
  "guardian_elder_effect": 10,
  "immediate_respawn": 11,
});

export class ClientboundGameEventPacket implements Packet<ClientGameHandler> {
  constructor(
    public event: GameEvent,
    /** Varies depending on event. */
    public value: number,
  ) {}
  static read(reader: Reader) {
    const event = gameEventEnum.fromId(reader.readUnsignedByte());
    const value = reader.readFloat();
    return new this(event, value);
  }
  write(writer: Writer) {
    writer.writeUnsignedByte(gameEventEnum.toId(this.event));
    writer.writeFloat(this.value);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleGameEvent?.(this);
  }
}

export class ClientboundHorseScreenOpenPacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    /** Number of slots the container has. */
    public containerSize: number,
    public entityId: number,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readUnsignedByte();
    const containerSize = reader.readVarInt();
    const entityId = reader.readInt();
    return new this(containerId, containerSize, entityId);
  }
  write(writer: Writer) {
    writer.writeUnsignedByte(this.containerId);
    writer.writeVarInt(this.containerSize);
    writer.writeInt(this.entityId);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleHorseScreenOpen?.(this);
  }
}

export class ClientboundInitializeBorderPacket implements Packet<ClientGameHandler> {
  constructor(
    public centerX: number,
    public centerZ: number,
    public oldSize: number,
    public newSize: number,
    public lerpTime: bigint,
    public newAbsoluteMaxSize: number,
    public warningBlocks: number,
    public warningTime: number,
  ) {}
  static read(reader: Reader) {
    const centerX = reader.readDouble();
    const centerZ = reader.readDouble();
    const oldSize = reader.readDouble();
    const newSize = reader.readDouble();
    const lerpTime = reader.readVarLong();
    const newAbsoluteMaxSize = reader.readVarInt();
    const warningBlocks = reader.readVarInt();
    const warningTime = reader.readVarInt();
    return new this(centerX, centerZ, oldSize, newSize, lerpTime, newAbsoluteMaxSize, warningBlocks, warningTime);
  }
  write(writer: Writer) {
    writer.writeDouble(this.centerX);
    writer.writeDouble(this.centerZ);
    writer.writeDouble(this.oldSize);
    writer.writeDouble(this.newSize);
    writer.writeVarLong(this.lerpTime);
    writer.writeVarInt(this.newAbsoluteMaxSize);
    writer.writeVarInt(this.warningBlocks);
    writer.writeVarInt(this.warningTime);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleInitializeBorder?.(this);
  }
}

export class ClientboundKeepAlivePacket implements Packet<ClientGameHandler> {
  constructor(
    public id: bigint,
  ) {}
  static read(reader: Reader) {
    const id = reader.readLong();
    return new this(id);
  }
  write(writer: Writer) {
    writer.writeLong(this.id);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleKeepAlive?.(this);
  }
}

export class ClientboundLevelChunkWithLightPacket implements Packet<ClientGameHandler> {
  constructor(
    public chunkX: number,
    public chunkZ: number,
    public chunkData: ChunkData,
    public lightData: LightData,
  ) {}
  static read(reader: Reader) {
    const chunkX = reader.readInt();
    const chunkZ = reader.readInt();
    const chunkData = readChunkData(reader);
    const lightData = readLightData(reader);
    return new this(chunkX, chunkZ, chunkData, lightData);
  }
  write(writer: Writer) {
    writer.writeInt(this.chunkX);
    writer.writeInt(this.chunkZ);
    writeChunkData(writer, this.chunkData);
    writeLightData(writer, this.lightData);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleLevelChunkWithLight?.(this);
  }
}

export class ClientboundLevelEventPacket implements Packet<ClientGameHandler> {
  constructor(
    public eventId: number,
    public pos: BlockPos,
    public data: number,
    public isGlobal: boolean,
  ) {}
  static read(reader: Reader) {
    const eventId = reader.readInt();
    const pos = readBlockPos(reader);
    const data = reader.readInt();
    const isGlobal = reader.readBoolean();
    return new this(eventId, pos, data, isGlobal);
  }
  write(writer: Writer) {
    writer.writeInt(this.eventId);
    writeBlockPos(writer, this.pos);
    writer.writeInt(this.data);
    writer.writeBoolean(this.isGlobal);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleLevelEvent?.(this);
  }
}

export type ParticleOptions =
  | { type: "minecraft:ambient_entity_effect" }
  | { type: "minecraft:angry_villager" }
  | { type: "minecraft:block"; blockState: BlockState }
  | { type: "minecraft:block_marker"; blockState: BlockState }
  | { type: "minecraft:bubble" }
  | { type: "minecraft:cloud" }
  | { type: "minecraft:crit" }
  | { type: "minecraft:damage_indicator" }
  | { type: "minecraft:dragon_breath" }
  | { type: "minecraft:dripping_lava" }
  | { type: "minecraft:falling_lava" }
  | { type: "minecraft:landing_lava" }
  | { type: "minecraft:dripping_water" }
  | { type: "minecraft:falling_water" }
  | { type: "minecraft:dust"; color: { r: number; g: number; b: number }; scale: number }
  | {
    type: "minecraft:dust_color_transition";
    fromColor: { r: number; g: number; b: number };
    scale: number;
    toColor: { r: number; g: number; b: number };
  }
  | { type: "minecraft:effect" }
  | { type: "minecraft:elder_guardian" }
  | { type: "minecraft:enchanted_hit" }
  | { type: "minecraft:enchant" }
  | { type: "minecraft:end_rod" }
  | { type: "minecraft:entity_effect" }
  | { type: "minecraft:explosion_emitter" }
  | { type: "minecraft:explosion" }
  | { type: "minecraft:sonic_boom" }
  | { type: "minecraft:falling_dust"; blockState: BlockState }
  | { type: "minecraft:firework" }
  | { type: "minecraft:fishing" }
  | { type: "minecraft:flame" }
  | { type: "minecraft:sculk_soul" }
  | { type: "minecraft:sculk_charge"; roll: number }
  | { type: "minecraft:sculk_charge_pop" }
  | { type: "minecraft:soul_fire_flame" }
  | { type: "minecraft:soul" }
  | { type: "minecraft:flash" }
  | { type: "minecraft:happy_villager" }
  | { type: "minecraft:composter" }
  | { type: "minecraft:heart" }
  | { type: "minecraft:instant_effect" }
  | { type: "minecraft:item"; itemStack: ItemStack }
  | { type: "minecraft:vibration"; destination: PositionSource; arrivalInTicks: number }
  | { type: "minecraft:item_slime" }
  | { type: "minecraft:item_snowball" }
  | { type: "minecraft:large_smoke" }
  | { type: "minecraft:lava" }
  | { type: "minecraft:mycelium" }
  | { type: "minecraft:note" }
  | { type: "minecraft:poof" }
  | { type: "minecraft:portal" }
  | { type: "minecraft:rain" }
  | { type: "minecraft:smoke" }
  | { type: "minecraft:sneeze" }
  | { type: "minecraft:spit" }
  | { type: "minecraft:squid_ink" }
  | { type: "minecraft:sweep_attack" }
  | { type: "minecraft:totem_of_undying" }
  | { type: "minecraft:underwater" }
  | { type: "minecraft:splash" }
  | { type: "minecraft:witch" }
  | { type: "minecraft:bubble_pop" }
  | { type: "minecraft:current_down" }
  | { type: "minecraft:bubble_column_up" }
  | { type: "minecraft:nautilus" }
  | { type: "minecraft:dolphin" }
  | { type: "minecraft:campfire_cosy_smoke" }
  | { type: "minecraft:campfire_signal_smoke" }
  | { type: "minecraft:dripping_honey" }
  | { type: "minecraft:falling_honey" }
  | { type: "minecraft:landing_honey" }
  | { type: "minecraft:falling_nectar" }
  | { type: "minecraft:falling_spore_blossom" }
  | { type: "minecraft:ash" }
  | { type: "minecraft:crimson_spore" }
  | { type: "minecraft:warped_spore" }
  | { type: "minecraft:spore_blossom_air" }
  | { type: "minecraft:dripping_obsidian_tear" }
  | { type: "minecraft:falling_obsidian_tear" }
  | { type: "minecraft:landing_obsidian_tear" }
  | { type: "minecraft:reverse_portal" }
  | { type: "minecraft:white_ash" }
  | { type: "minecraft:small_flame" }
  | { type: "minecraft:snowflake" }
  | { type: "minecraft:dripping_dripstone_lava" }
  | { type: "minecraft:falling_dripstone_lava" }
  | { type: "minecraft:dripping_dripstone_water" }
  | { type: "minecraft:falling_dripstone_water" }
  | { type: "minecraft:glow_squid_ink" }
  | { type: "minecraft:glow" }
  | { type: "minecraft:wax_on" }
  | { type: "minecraft:wax_off" }
  | { type: "minecraft:electric_spark" }
  | { type: "minecraft:scrape" }
  | { type: "minecraft:shriek"; delay: number };

export class ClientboundLevelParticlesPacket implements Packet<ClientGameHandler> {
  constructor(
    /** Increases visible particle distance. */
    public overrideLimiter: boolean,
    public x: number,
    public y: number,
    public z: number,
    public randomX: number,
    public randomY: number,
    public randomZ: number,
    public maxSpeed: number,
    public count: number,
    public particle: ParticleOptions,
  ) {}
  static read(reader: Reader) {
    const particleType = reader.readVarInt();
    const overrideLimiter = reader.readBoolean();
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const randomX = reader.readFloat();
    const randomY = reader.readFloat();
    const randomZ = reader.readFloat();
    const maxSpeed = reader.readFloat();
    const count = reader.readInt();
    let result: ParticleOptions;
    switch (particleType) {
      case 0:
        result = { type: "minecraft:ambient_entity_effect" };
        break;
      case 1:
        result = { type: "minecraft:angry_villager" };
        break;
      case 2:
        result = { type: "minecraft:block", blockState: readBlockState(reader) };
        break;
      case 3:
        result = { type: "minecraft:block_marker", blockState: readBlockState(reader) };
        break;
      case 4:
        result = { type: "minecraft:bubble" };
        break;
      case 5:
        result = { type: "minecraft:cloud" };
        break;
      case 6:
        result = { type: "minecraft:crit" };
        break;
      case 7:
        result = { type: "minecraft:damage_indicator" };
        break;
      case 8:
        result = { type: "minecraft:dragon_breath" };
        break;
      case 9:
        result = { type: "minecraft:dripping_lava" };
        break;
      case 10:
        result = { type: "minecraft:falling_lava" };
        break;
      case 11:
        result = { type: "minecraft:landing_lava" };
        break;
      case 12:
        result = { type: "minecraft:dripping_water" };
        break;
      case 13:
        result = { type: "minecraft:falling_water" };
        break;
      case 14:
        result = {
          type: "minecraft:dust",
          color: { r: reader.readFloat(), g: reader.readFloat(), b: reader.readFloat() },
          scale: reader.readFloat(),
        };
        break;
      case 15:
        result = {
          type: "minecraft:dust_color_transition",
          fromColor: { r: reader.readFloat(), g: reader.readFloat(), b: reader.readFloat() },
          scale: reader.readFloat(),
          toColor: { r: reader.readFloat(), g: reader.readFloat(), b: reader.readFloat() },
        };
        break;
      case 16:
        result = { type: "minecraft:effect" };
        break;
      case 17:
        result = { type: "minecraft:elder_guardian" };
        break;
      case 18:
        result = { type: "minecraft:enchanted_hit" };
        break;
      case 19:
        result = { type: "minecraft:enchant" };
        break;
      case 20:
        result = { type: "minecraft:end_rod" };
        break;
      case 21:
        result = { type: "minecraft:entity_effect" };
        break;
      case 22:
        result = { type: "minecraft:explosion_emitter" };
        break;
      case 23:
        result = { type: "minecraft:explosion" };
        break;
      case 24:
        result = { type: "minecraft:sonic_boom" };
        break;
      case 25:
        result = { type: "minecraft:falling_dust", blockState: readBlockState(reader) };
        break;
      case 26:
        result = { type: "minecraft:firework" };
        break;
      case 27:
        result = { type: "minecraft:fishing" };
        break;
      case 28:
        result = { type: "minecraft:flame" };
        break;
      case 29:
        result = { type: "minecraft:sculk_soul" };
        break;
      case 30:
        result = { type: "minecraft:sculk_charge", roll: reader.readFloat() };
        break;
      case 31:
        result = { type: "minecraft:sculk_charge_pop" };
        break;
      case 32:
        result = { type: "minecraft:soul_fire_flame" };
        break;
      case 33:
        result = { type: "minecraft:soul" };
        break;
      case 34:
        result = { type: "minecraft:flash" };
        break;
      case 35:
        result = { type: "minecraft:happy_villager" };
        break;
      case 36:
        result = { type: "minecraft:composter" };
        break;
      case 37:
        result = { type: "minecraft:heart" };
        break;
      case 38:
        result = { type: "minecraft:instant_effect" };
        break;
      case 39:
        result = { type: "minecraft:item", itemStack: readItemStack(reader) };
        break;
      case 40:
        result = {
          type: "minecraft:vibration",
          destination: readPositionSource(reader),
          arrivalInTicks: reader.readVarInt(),
        };
        break;
      case 41:
        result = { type: "minecraft:item_slime" };
        break;
      case 42:
        result = { type: "minecraft:item_snowball" };
        break;
      case 43:
        result = { type: "minecraft:large_smoke" };
        break;
      case 44:
        result = { type: "minecraft:lava" };
        break;
      case 45:
        result = { type: "minecraft:mycelium" };
        break;
      case 46:
        result = { type: "minecraft:note" };
        break;
      case 47:
        result = { type: "minecraft:poof" };
        break;
      case 48:
        result = { type: "minecraft:portal" };
        break;
      case 49:
        result = { type: "minecraft:rain" };
        break;
      case 50:
        result = { type: "minecraft:smoke" };
        break;
      case 51:
        result = { type: "minecraft:sneeze" };
        break;
      case 52:
        result = { type: "minecraft:spit" };
        break;
      case 53:
        result = { type: "minecraft:squid_ink" };
        break;
      case 54:
        result = { type: "minecraft:sweep_attack" };
        break;
      case 55:
        result = { type: "minecraft:totem_of_undying" };
        break;
      case 56:
        result = { type: "minecraft:underwater" };
        break;
      case 57:
        result = { type: "minecraft:splash" };
        break;
      case 58:
        result = { type: "minecraft:witch" };
        break;
      case 59:
        result = { type: "minecraft:bubble_pop" };
        break;
      case 60:
        result = { type: "minecraft:current_down" };
        break;
      case 61:
        result = { type: "minecraft:bubble_column_up" };
        break;
      case 62:
        result = { type: "minecraft:nautilus" };
        break;
      case 63:
        result = { type: "minecraft:dolphin" };
        break;
      case 64:
        result = { type: "minecraft:campfire_cosy_smoke" };
        break;
      case 65:
        result = { type: "minecraft:campfire_signal_smoke" };
        break;
      case 66:
        result = { type: "minecraft:dripping_honey" };
        break;
      case 67:
        result = { type: "minecraft:falling_honey" };
        break;
      case 68:
        result = { type: "minecraft:landing_honey" };
        break;
      case 69:
        result = { type: "minecraft:falling_nectar" };
        break;
      case 70:
        result = { type: "minecraft:falling_spore_blossom" };
        break;
      case 71:
        result = { type: "minecraft:ash" };
        break;
      case 72:
        result = { type: "minecraft:crimson_spore" };
        break;
      case 73:
        result = { type: "minecraft:warped_spore" };
        break;
      case 74:
        result = { type: "minecraft:spore_blossom_air" };
        break;
      case 75:
        result = { type: "minecraft:dripping_obsidian_tear" };
        break;
      case 76:
        result = { type: "minecraft:falling_obsidian_tear" };
        break;
      case 77:
        result = { type: "minecraft:landing_obsidian_tear" };
        break;
      case 78:
        result = { type: "minecraft:reverse_portal" };
        break;
      case 79:
        result = { type: "minecraft:white_ash" };
        break;
      case 80:
        result = { type: "minecraft:small_flame" };
        break;
      case 81:
        result = { type: "minecraft:snowflake" };
        break;
      case 82:
        result = { type: "minecraft:dripping_dripstone_lava" };
        break;
      case 83:
        result = { type: "minecraft:falling_dripstone_lava" };
        break;
      case 84:
        result = { type: "minecraft:dripping_dripstone_water" };
        break;
      case 85:
        result = { type: "minecraft:falling_dripstone_water" };
        break;
      case 86:
        result = { type: "minecraft:glow_squid_ink" };
        break;
      case 87:
        result = { type: "minecraft:glow" };
        break;
      case 88:
        result = { type: "minecraft:wax_on" };
        break;
      case 89:
        result = { type: "minecraft:wax_off" };
        break;
      case 90:
        result = { type: "minecraft:electric_spark" };
        break;
      case 91:
        result = { type: "minecraft:scrape" };
        break;
      case 92:
        result = { type: "minecraft:shriek", delay: reader.readVarInt() };
        break;
      default:
        throw new Error("Invalid tag id");
    }
    const particle = result;
    return new this(overrideLimiter, x, y, z, randomX, randomY, randomZ, maxSpeed, count, particle);
  }
  write(writer: Writer) {
    writer.writeVarInt(particleTypeEnum.toId(this.particle.type));
    writer.writeBoolean(this.overrideLimiter);
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeFloat(this.randomX);
    writer.writeFloat(this.randomY);
    writer.writeFloat(this.randomZ);
    writer.writeFloat(this.maxSpeed);
    writer.writeInt(this.count);
    switch (this.particle.type) {
      case "minecraft:ambient_entity_effect": {
        break;
      }
      case "minecraft:angry_villager": {
        break;
      }
      case "minecraft:block": {
        writeBlockState(writer, this.particle.blockState);
        break;
      }
      case "minecraft:block_marker": {
        writeBlockState(writer, this.particle.blockState);
        break;
      }
      case "minecraft:bubble": {
        break;
      }
      case "minecraft:cloud": {
        break;
      }
      case "minecraft:crit": {
        break;
      }
      case "minecraft:damage_indicator": {
        break;
      }
      case "minecraft:dragon_breath": {
        break;
      }
      case "minecraft:dripping_lava": {
        break;
      }
      case "minecraft:falling_lava": {
        break;
      }
      case "minecraft:landing_lava": {
        break;
      }
      case "minecraft:dripping_water": {
        break;
      }
      case "minecraft:falling_water": {
        break;
      }
      case "minecraft:dust": {
        writer.writeFloat(this.particle.color.r);
        writer.writeFloat(this.particle.color.g);
        writer.writeFloat(this.particle.color.b);
        writer.writeFloat(this.particle.scale);
        break;
      }
      case "minecraft:dust_color_transition": {
        writer.writeFloat(this.particle.fromColor.r);
        writer.writeFloat(this.particle.fromColor.g);
        writer.writeFloat(this.particle.fromColor.b);
        writer.writeFloat(this.particle.scale);
        writer.writeFloat(this.particle.toColor.r);
        writer.writeFloat(this.particle.toColor.g);
        writer.writeFloat(this.particle.toColor.b);
        break;
      }
      case "minecraft:effect": {
        break;
      }
      case "minecraft:elder_guardian": {
        break;
      }
      case "minecraft:enchanted_hit": {
        break;
      }
      case "minecraft:enchant": {
        break;
      }
      case "minecraft:end_rod": {
        break;
      }
      case "minecraft:entity_effect": {
        break;
      }
      case "minecraft:explosion_emitter": {
        break;
      }
      case "minecraft:explosion": {
        break;
      }
      case "minecraft:sonic_boom": {
        break;
      }
      case "minecraft:falling_dust": {
        writeBlockState(writer, this.particle.blockState);
        break;
      }
      case "minecraft:firework": {
        break;
      }
      case "minecraft:fishing": {
        break;
      }
      case "minecraft:flame": {
        break;
      }
      case "minecraft:sculk_soul": {
        break;
      }
      case "minecraft:sculk_charge": {
        writer.writeFloat(this.particle.roll);
        break;
      }
      case "minecraft:sculk_charge_pop": {
        break;
      }
      case "minecraft:soul_fire_flame": {
        break;
      }
      case "minecraft:soul": {
        break;
      }
      case "minecraft:flash": {
        break;
      }
      case "minecraft:happy_villager": {
        break;
      }
      case "minecraft:composter": {
        break;
      }
      case "minecraft:heart": {
        break;
      }
      case "minecraft:instant_effect": {
        break;
      }
      case "minecraft:item": {
        writeItemStack(writer, this.particle.itemStack);
        break;
      }
      case "minecraft:vibration": {
        writePositionSource(writer, this.particle.destination);
        writer.writeVarInt(this.particle.arrivalInTicks);
        break;
      }
      case "minecraft:item_slime": {
        break;
      }
      case "minecraft:item_snowball": {
        break;
      }
      case "minecraft:large_smoke": {
        break;
      }
      case "minecraft:lava": {
        break;
      }
      case "minecraft:mycelium": {
        break;
      }
      case "minecraft:note": {
        break;
      }
      case "minecraft:poof": {
        break;
      }
      case "minecraft:portal": {
        break;
      }
      case "minecraft:rain": {
        break;
      }
      case "minecraft:smoke": {
        break;
      }
      case "minecraft:sneeze": {
        break;
      }
      case "minecraft:spit": {
        break;
      }
      case "minecraft:squid_ink": {
        break;
      }
      case "minecraft:sweep_attack": {
        break;
      }
      case "minecraft:totem_of_undying": {
        break;
      }
      case "minecraft:underwater": {
        break;
      }
      case "minecraft:splash": {
        break;
      }
      case "minecraft:witch": {
        break;
      }
      case "minecraft:bubble_pop": {
        break;
      }
      case "minecraft:current_down": {
        break;
      }
      case "minecraft:bubble_column_up": {
        break;
      }
      case "minecraft:nautilus": {
        break;
      }
      case "minecraft:dolphin": {
        break;
      }
      case "minecraft:campfire_cosy_smoke": {
        break;
      }
      case "minecraft:campfire_signal_smoke": {
        break;
      }
      case "minecraft:dripping_honey": {
        break;
      }
      case "minecraft:falling_honey": {
        break;
      }
      case "minecraft:landing_honey": {
        break;
      }
      case "minecraft:falling_nectar": {
        break;
      }
      case "minecraft:falling_spore_blossom": {
        break;
      }
      case "minecraft:ash": {
        break;
      }
      case "minecraft:crimson_spore": {
        break;
      }
      case "minecraft:warped_spore": {
        break;
      }
      case "minecraft:spore_blossom_air": {
        break;
      }
      case "minecraft:dripping_obsidian_tear": {
        break;
      }
      case "minecraft:falling_obsidian_tear": {
        break;
      }
      case "minecraft:landing_obsidian_tear": {
        break;
      }
      case "minecraft:reverse_portal": {
        break;
      }
      case "minecraft:white_ash": {
        break;
      }
      case "minecraft:small_flame": {
        break;
      }
      case "minecraft:snowflake": {
        break;
      }
      case "minecraft:dripping_dripstone_lava": {
        break;
      }
      case "minecraft:falling_dripstone_lava": {
        break;
      }
      case "minecraft:dripping_dripstone_water": {
        break;
      }
      case "minecraft:falling_dripstone_water": {
        break;
      }
      case "minecraft:glow_squid_ink": {
        break;
      }
      case "minecraft:glow": {
        break;
      }
      case "minecraft:wax_on": {
        break;
      }
      case "minecraft:wax_off": {
        break;
      }
      case "minecraft:electric_spark": {
        break;
      }
      case "minecraft:scrape": {
        break;
      }
      case "minecraft:shriek": {
        writer.writeVarInt(this.particle.delay);
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleLevelParticles?.(this);
  }
}

export class ClientboundLightUpdatePacket implements Packet<ClientGameHandler> {
  constructor(
    public chunkX: number,
    public chunkZ: number,
    public lightData: LightData,
  ) {}
  static read(reader: Reader) {
    const chunkX = reader.readVarInt();
    const chunkZ = reader.readVarInt();
    const lightData = readLightData(reader);
    return new this(chunkX, chunkZ, lightData);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.chunkX);
    writer.writeVarInt(this.chunkZ);
    writeLightData(writer, this.lightData);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleLightUpdate?.(this);
  }
}

const gameModeEnum = createEnumMapper<GameMode>({ "survival": 0, "creative": 1, "adventure": 2, "spectator": 3 });

export type NullableGameMode = GameMode | null;

const gameModeEnum1 = createEnumMapper<GameMode>({ "survival": 0, "creative": 1, "adventure": 2, "spectator": 3 });

export type DimensionType = ResourceLocation;

export class ClientboundLoginPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public hardcore: boolean,
    public gameMode: GameMode,
    public previousGameMode: NullableGameMode,
    public levels: Dimension[],
    public registryHolder: CompoundTag | null,
    public dimensionType: DimensionType,
    public dimension: Dimension,
    public seed: bigint,
    public maxPlayers: number,
    public chunkRadius: number,
    public simulationDistance: number,
    public reducedDebugInfo: boolean,
    public showDeathScreen: boolean,
    public isDebug: boolean,
    public isFlat: boolean,
    public lastDeathLocation: GlobalPos | null,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readInt();
    const hardcore = reader.readBoolean();
    const gameMode = gameModeEnum.fromId(reader.readByte());
    let gameMode1: GameMode | null = null;
    const bytes = reader.read(reader.unreadBytes);
    reader = new Reader(bytes);
    if (new Reader(bytes).readByte() != -1) {
      gameMode1 = gameModeEnum1.fromId(reader.readByte());
    } else {
      reader.readByte();
    }
    const previousGameMode = gameMode1;
    const list: Dimension[] = [];
    for (let i = reader.readVarInt(); i--;) list.push(ResourceLocation.from(reader.readString(32767)));
    const levels = list;
    const registryHolder = reader.readCompoundTag();
    const dimensionType = ResourceLocation.from(reader.readString(32767));
    const dimension = ResourceLocation.from(reader.readString(32767));
    const seed = reader.readLong();
    const maxPlayers = reader.readVarInt();
    const chunkRadius = reader.readVarInt();
    const simulationDistance = reader.readVarInt();
    const reducedDebugInfo = reader.readBoolean();
    const showDeathScreen = reader.readBoolean();
    const isDebug = reader.readBoolean();
    const isFlat = reader.readBoolean();
    const lastDeathLocation = reader.readBoolean() ? readGlobalPos(reader) : null;
    return new this(
      entityId,
      hardcore,
      gameMode,
      previousGameMode,
      levels,
      registryHolder,
      dimensionType,
      dimension,
      seed,
      maxPlayers,
      chunkRadius,
      simulationDistance,
      reducedDebugInfo,
      showDeathScreen,
      isDebug,
      isFlat,
      lastDeathLocation,
    );
  }
  write(writer: Writer) {
    writer.writeInt(this.entityId);
    writer.writeBoolean(this.hardcore);
    writer.writeByte(gameModeEnum.toId(this.gameMode));
    if (this.previousGameMode != null) {
      writer.writeByte(gameModeEnum1.toId(this.previousGameMode));
    } else {
      writer.writeByte(-1);
    }
    writer.writeVarInt(this.levels.length);
    for (const item of this.levels) writer.writeString(item.toString());
    writer.writeCompoundTag(this.registryHolder);
    writer.writeString(this.dimensionType.toString());
    writer.writeString(this.dimension.toString());
    writer.writeLong(this.seed);
    writer.writeVarInt(this.maxPlayers);
    writer.writeVarInt(this.chunkRadius);
    writer.writeVarInt(this.simulationDistance);
    writer.writeBoolean(this.reducedDebugInfo);
    writer.writeBoolean(this.showDeathScreen);
    writer.writeBoolean(this.isDebug);
    writer.writeBoolean(this.isFlat);
    writer.writeBoolean(this.lastDeathLocation != null);
    if (this.lastDeathLocation != null) writeGlobalPos(writer, this.lastDeathLocation);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleLogin?.(this);
  }
}

export type MapDecoration = { type: MapDecorationType; x: number; z: number; rotation: number; name: Component | null };

export type MapDecorationType =
  | "player"
  | "frame"
  | "red_marker"
  | "blue_marker"
  | "target_x"
  | "target_point"
  | "player_off_map"
  | "player_off_limits"
  | "mansion"
  | "monument"
  | "banner_white"
  | "banner_orange"
  | "banner_magenta"
  | "banner_light_blue"
  | "banner_yellow"
  | "banner_lime"
  | "banner_pink"
  | "banner_gray"
  | "banner_light_gray"
  | "banner_cyan"
  | "banner_purple"
  | "banner_blue"
  | "banner_brown"
  | "banner_green"
  | "banner_red"
  | "banner_black"
  | "red_x";

const mapDecorationTypeEnum = createEnumMapper<MapDecorationType>(
  JSON.parse(
    `{"player":0,"frame":1,"red_marker":2,"blue_marker":3,"target_x":4,"target_point":5,"player_off_map":6,"player_off_limits":7,"mansion":8,"monument":9,"banner_white":10,"banner_orange":11,"banner_magenta":12,"banner_light_blue":13,"banner_yellow":14,"banner_lime":15,"banner_pink":16,"banner_gray":17,"banner_light_gray":18,"banner_cyan":19,"banner_purple":20,"banner_blue":21,"banner_brown":22,"banner_green":23,"banner_red":24,"banner_black":25,"red_x":26}`,
  ),
);

export type NullableMapPatch =
  | { width: number; height: number; startX: number; startZ: number; colors: Uint8Array }
  | null;

export class ClientboundMapItemDataPacket implements Packet<ClientGameHandler> {
  constructor(
    public mapId: number,
    /** Value from 0 to 4 (blocks per pixel: 2 ^ scale) */
    public scale: number,
    public locked: boolean,
    public decorations: MapDecoration[] | null,
    public patch: NullableMapPatch,
  ) {}
  static read(reader: Reader) {
    const mapId = reader.readVarInt();
    const scale = reader.readByte();
    const locked = reader.readBoolean();
    let value: MapDecoration[] | null = null;
    if (reader.readBoolean()) {
      const list: MapDecoration[] = [];
      for (let i = reader.readVarInt(); i--;) {
        list.push({
          type: mapDecorationTypeEnum.fromId(reader.readVarInt()),
          x: reader.readByte(),
          z: reader.readByte(),
          rotation: reader.readByte(),
          name: reader.readBoolean() ? Component.deserialize(reader.readJson()) : null,
        });
      }
      value = list;
    }
    const decorations = value;
    let patch1: { width: number; height: number; startX: number; startZ: number; colors: Uint8Array } | null = null;
    const width = reader.readByte();
    if (width != 0) {
      patch1 = {
        width,
        height: reader.readByte(),
        startX: reader.readByte(),
        startZ: reader.readByte(),
        colors: reader.readByteArray(),
      };
    }
    const patch = patch1;
    return new this(mapId, scale, locked, decorations, patch);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.mapId);
    writer.writeByte(this.scale);
    writer.writeBoolean(this.locked);
    writer.writeBoolean(this.decorations != null);
    if (this.decorations != null) {
      writer.writeVarInt(this.decorations.length);
      for (const item of this.decorations) {
        writer.writeVarInt(mapDecorationTypeEnum.toId(item.type));
        writer.writeByte(item.x);
        writer.writeByte(item.z);
        writer.writeByte(item.rotation);
        writer.writeBoolean(item.name != null);
        if (item.name != null) writer.writeJson(item.name.serialize());
      }
    }
    if (this.patch != null) {
      writer.writeByte(this.patch.width);
      writer.writeByte(this.patch.height);
      writer.writeByte(this.patch.startX);
      writer.writeByte(this.patch.startZ);
      writer.writeByteArray(this.patch.colors);
    } else {
      writer.writeByte(0);
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleMapItemData?.(this);
  }
}

export type MerchantOffer = {
  baseCostA: Item;
  result: Item;
  costB: Item;
  isOutOfStock: boolean;
  uses: number;
  maxUses: number;
  xp: number;
  specialPriceDiff: number;
  priceMultiplier: number;
  demand: number;
};

export class ClientboundMerchantOffersPacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    public offers: MerchantOffer[],
    public villagerLevel: number,
    public villagerXp: number,
    public showProgress: boolean,
    public canRestock: boolean,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readVarInt();
    const list: MerchantOffer[] = [];
    for (let i = reader.readVarInt(); i--;) {
      list.push({
        baseCostA: itemEnum.fromId(reader.readVarInt()),
        result: itemEnum.fromId(reader.readVarInt()),
        costB: itemEnum.fromId(reader.readVarInt()),
        isOutOfStock: reader.readBoolean(),
        uses: reader.readInt(),
        maxUses: reader.readInt(),
        xp: reader.readInt(),
        specialPriceDiff: reader.readInt(),
        priceMultiplier: reader.readFloat(),
        demand: reader.readInt(),
      });
    }
    const offers = list;
    const villagerLevel = reader.readVarInt();
    const villagerXp = reader.readVarInt();
    const showProgress = reader.readBoolean();
    const canRestock = reader.readBoolean();
    return new this(containerId, offers, villagerLevel, villagerXp, showProgress, canRestock);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.containerId);
    writer.writeVarInt(this.offers.length);
    for (const item of this.offers) {
      writer.writeVarInt(itemEnum.toId(item.baseCostA));
      writer.writeVarInt(itemEnum.toId(item.result));
      writer.writeVarInt(itemEnum.toId(item.costB));
      writer.writeBoolean(item.isOutOfStock);
      writer.writeInt(item.uses);
      writer.writeInt(item.maxUses);
      writer.writeInt(item.xp);
      writer.writeInt(item.specialPriceDiff);
      writer.writeFloat(item.priceMultiplier);
      writer.writeInt(item.demand);
    }
    writer.writeVarInt(this.villagerLevel);
    writer.writeVarInt(this.villagerXp);
    writer.writeBoolean(this.showProgress);
    writer.writeBoolean(this.canRestock);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleMerchantOffers?.(this);
  }
}

export class ClientboundMoveEntityPosPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public x: number,
    public y: number,
    public z: number,
    public onGround: boolean,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const x = reader.readShort();
    const y = reader.readShort();
    const z = reader.readShort();
    const onGround = reader.readBoolean();
    return new this(entityId, x, y, z, onGround);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeShort(this.x);
    writer.writeShort(this.y);
    writer.writeShort(this.z);
    writer.writeBoolean(this.onGround);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleMoveEntityPos?.(this);
  }
}

export class ClientboundMoveEntityPosRotPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public x: number,
    public y: number,
    public z: number,
    public yaw: number,
    public pitch: number,
    public onGround: boolean,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const x = reader.readShort();
    const y = reader.readShort();
    const z = reader.readShort();
    const yaw = reader.readByte();
    const pitch = reader.readByte();
    const onGround = reader.readBoolean();
    return new this(entityId, x, y, z, yaw, pitch, onGround);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeShort(this.x);
    writer.writeShort(this.y);
    writer.writeShort(this.z);
    writer.writeByte(this.yaw);
    writer.writeByte(this.pitch);
    writer.writeBoolean(this.onGround);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleMoveEntityPosRot?.(this);
  }
}

export class ClientboundMoveEntityRotPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public yaw: number,
    public pitch: number,
    public onGround: boolean,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const yaw = reader.readByte();
    const pitch = reader.readByte();
    const onGround = reader.readBoolean();
    return new this(entityId, yaw, pitch, onGround);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeByte(this.yaw);
    writer.writeByte(this.pitch);
    writer.writeBoolean(this.onGround);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleMoveEntityRot?.(this);
  }
}

export class ClientboundMoveVehiclePacket implements Packet<ClientGameHandler> {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public yaw: number,
    public pitch: number,
  ) {}
  static read(reader: Reader) {
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const yaw = reader.readFloat();
    const pitch = reader.readFloat();
    return new this(x, y, z, yaw, pitch);
  }
  write(writer: Writer) {
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeFloat(this.yaw);
    writer.writeFloat(this.pitch);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleMoveVehicle?.(this);
  }
}

export class ClientboundOpenBookPacket implements Packet<ClientGameHandler> {
  constructor(
    public hand: InteractionHand,
  ) {}
  static read(reader: Reader) {
    const hand = interactionHandEnum.fromId(reader.readVarInt());
    return new this(hand);
  }
  write(writer: Writer) {
    writer.writeVarInt(interactionHandEnum.toId(this.hand));
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleOpenBook?.(this);
  }
}

export class ClientboundOpenScreenPacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    public menu: Menu,
    public title: Component,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readVarInt();
    const menu = menuEnum.fromId(reader.readVarInt());
    const title = Component.deserialize(reader.readJson());
    return new this(containerId, menu, title);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.containerId);
    writer.writeVarInt(menuEnum.toId(this.menu));
    writer.writeJson(this.title.serialize());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleOpenScreen?.(this);
  }
}

export class ClientboundOpenSignEditorPacket implements Packet<ClientGameHandler> {
  constructor(
    public pos: BlockPos,
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    return new this(pos);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleOpenSignEditor?.(this);
  }
}

export class ClientboundPingPacket implements Packet<ClientGameHandler> {
  constructor(
    public id: number,
  ) {}
  static read(reader: Reader) {
    const id = reader.readInt();
    return new this(id);
  }
  write(writer: Writer) {
    writer.writeInt(this.id);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handlePing?.(this);
  }
}

export class ClientboundPlaceGhostRecipePacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    public recipe: ResourceLocation,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readByte();
    const recipe = ResourceLocation.from(reader.readString(32767));
    return new this(containerId, recipe);
  }
  write(writer: Writer) {
    writer.writeByte(this.containerId);
    writer.writeString(this.recipe.toString());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handlePlaceGhostRecipe?.(this);
  }
}

export class ClientboundPlayerAbilitiesPacket implements Packet<ClientGameHandler> {
  constructor(
    public flags: { invulnerable: boolean; isFlying: boolean; canFly: boolean; instabuild: boolean },
    public flyingSpeed: number,
    public walkingSpeed: number,
  ) {}
  static read(reader: Reader) {
    const flags1 = reader.readByte();
    const flags = {
      invulnerable: (flags1 & 0x1) > 0,
      isFlying: (flags1 & 0x2) > 0,
      canFly: (flags1 & 0x4) > 0,
      instabuild: (flags1 & 0x8) > 0,
    };
    const flyingSpeed = reader.readFloat();
    const walkingSpeed = reader.readFloat();
    return new this(flags, flyingSpeed, walkingSpeed);
  }
  write(writer: Writer) {
    writer.writeByte(
      (-this.flags.invulnerable & 0x1) | (-this.flags.isFlying & 0x2) | (-this.flags.canFly & 0x4) |
        (-this.flags.instabuild & 0x8),
    );
    writer.writeFloat(this.flyingSpeed);
    writer.writeFloat(this.walkingSpeed);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handlePlayerAbilities?.(this);
  }
}

export class ClientboundPlayerChatHeaderPacket implements Packet<ClientGameHandler> {
  constructor(
    public header: SignedMessageHeader,
    public headerSignature: Uint8Array,
    public bodyDigest: Uint8Array,
  ) {}
  static read(reader: Reader) {
    const header = readSignedMessageHeader(reader);
    const headerSignature = reader.readByteArray();
    const bodyDigest = reader.readByteArray();
    return new this(header, headerSignature, bodyDigest);
  }
  write(writer: Writer) {
    writeSignedMessageHeader(writer, this.header);
    writer.writeByteArray(this.headerSignature);
    writer.writeByteArray(this.bodyDigest);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handlePlayerChatHeader?.(this);
  }
}

export type PlayerChatMessage = {
  signedHeader: SignedMessageHeader;
  headerSignature: Uint8Array;
  signedBody: SignedMessageBody;
  unsignedContent: Component | null;
  filterMask: FilterMask;
};

export type ChatTypeBound = { chatType: ChatType; name: Component; targetName: Component | null };

export class ClientboundPlayerChatPacket implements Packet<ClientGameHandler> {
  constructor(
    public message: PlayerChatMessage,
    public chatType: ChatTypeBound,
  ) {}
  static read(reader: Reader) {
    const message = {
      signedHeader: readSignedMessageHeader(reader),
      headerSignature: reader.readByteArray(),
      signedBody: readSignedMessageBody(reader),
      unsignedContent: reader.readBoolean() ? Component.deserialize(reader.readJson()) : null,
      filterMask: readFilterMask(reader),
    };
    const chatType = {
      chatType: chatTypeEnum.fromId(reader.readVarInt()),
      name: Component.deserialize(reader.readJson()),
      targetName: reader.readBoolean() ? Component.deserialize(reader.readJson()) : null,
    };
    return new this(message, chatType);
  }
  write(writer: Writer) {
    writeSignedMessageHeader(writer, this.message.signedHeader);
    writer.writeByteArray(this.message.headerSignature);
    writeSignedMessageBody(writer, this.message.signedBody);
    writer.writeBoolean(this.message.unsignedContent != null);
    if (this.message.unsignedContent != null) writer.writeJson(this.message.unsignedContent.serialize());
    writeFilterMask(writer, this.message.filterMask);
    writer.writeVarInt(chatTypeEnum.toId(this.chatType.chatType));
    writer.writeJson(this.chatType.name.serialize());
    writer.writeBoolean(this.chatType.targetName != null);
    if (this.chatType.targetName != null) writer.writeJson(this.chatType.targetName.serialize());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handlePlayerChat?.(this);
  }
}

export class ClientboundPlayerCombatEndPacket implements Packet<ClientGameHandler> {
  constructor(
    public duration: number,
    public killerEntityId: number,
  ) {}
  static read(reader: Reader) {
    const duration = reader.readVarInt();
    const killerEntityId = reader.readInt();
    return new this(duration, killerEntityId);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.duration);
    writer.writeInt(this.killerEntityId);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handlePlayerCombatEnd?.(this);
  }
}

export class ClientboundPlayerCombatEnterPacket implements Packet<ClientGameHandler> {
  constructor() {}
  static read(reader: Reader) {
    return new this();
  }
  write(writer: Writer) {
  }
  async handle(handler: ClientGameHandler) {
    await handler.handlePlayerCombatEnter?.(this);
  }
}

export class ClientboundPlayerCombatKillPacket implements Packet<ClientGameHandler> {
  constructor(
    public playerId: number,
    public killerEntityId: number,
    public message: Component,
  ) {}
  static read(reader: Reader) {
    const playerId = reader.readVarInt();
    const killerEntityId = reader.readInt();
    const message = Component.deserialize(reader.readJson());
    return new this(playerId, killerEntityId, message);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.playerId);
    writer.writeInt(this.killerEntityId);
    writer.writeJson(this.message.serialize());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handlePlayerCombatKill?.(this);
  }
}

export type PlayerInfoUpdate =
  | {
    type: "add";
    players: {
      profile: GameProfile;
      gameMode: GameMode;
      latency: number;
      displayName: Component | null;
      publicKey: ProfilePublicKey | null;
    }[];
  }
  | { type: "update_game_mode"; entries: { playerId: Uuid; gameMode: GameMode }[] }
  | { type: "update_latency"; entries: { playerId: Uuid; latency: number }[] }
  | { type: "update_display_name"; entries: { playerId: Uuid; displayName: Component | null }[] }
  | { type: "remove"; playerIds: Uuid[] };

export class ClientboundPlayerInfoPacket implements Packet<ClientGameHandler> {
  constructor(
    public update: PlayerInfoUpdate,
  ) {}
  static read(reader: Reader) {
    let result: PlayerInfoUpdate;
    switch (reader.readVarInt()) {
      case 0: {
        const type = "add";
        const list: {
          profile: GameProfile;
          gameMode: GameMode;
          latency: number;
          displayName: Component | null;
          publicKey: ProfilePublicKey | null;
        }[] = [];
        for (let i = reader.readVarInt(); i--;) {
          list.push({
            profile: readGameProfile(reader),
            gameMode: gameModeEnum.fromId(reader.readVarInt()),
            latency: reader.readVarInt(),
            displayName: reader.readBoolean() ? Component.deserialize(reader.readJson()) : null,
            publicKey: reader.readBoolean() ? readProfilePublicKey(reader) : null,
          });
        }
        result = { type, players: list };
        break;
      }
      case 1: {
        const type = "update_game_mode";
        const list: { playerId: Uuid; gameMode: GameMode }[] = [];
        for (let i = reader.readVarInt(); i--;) {
          list.push({ playerId: Uuid.from(reader.read(16)), gameMode: gameModeEnum.fromId(reader.readVarInt()) });
        }
        result = { type, entries: list };
        break;
      }
      case 2: {
        const type = "update_latency";
        const list: { playerId: Uuid; latency: number }[] = [];
        for (let i = reader.readVarInt(); i--;) {
          list.push({ playerId: Uuid.from(reader.read(16)), latency: reader.readVarInt() });
        }
        result = { type, entries: list };
        break;
      }
      case 3: {
        const type = "update_display_name";
        const list: { playerId: Uuid; displayName: Component | null }[] = [];
        for (let i = reader.readVarInt(); i--;) {
          list.push({
            playerId: Uuid.from(reader.read(16)),
            displayName: reader.readBoolean() ? Component.deserialize(reader.readJson()) : null,
          });
        }
        result = { type, entries: list };
        break;
      }
      case 4: {
        const type = "remove";
        const list: Uuid[] = [];
        for (let i = reader.readVarInt(); i--;) list.push(Uuid.from(reader.read(16)));
        result = { type, playerIds: list };
        break;
      }
      default:
        throw new Error("Invalid tag id");
    }
    const update = result;
    return new this(update);
  }
  write(writer: Writer) {
    switch (this.update.type) {
      case "add": {
        writer.writeVarInt(0);
        writer.writeVarInt(this.update.players.length);
        for (const item of this.update.players) {
          writeGameProfile(writer, item.profile);
          writer.writeVarInt(gameModeEnum.toId(item.gameMode));
          writer.writeVarInt(item.latency);
          writer.writeBoolean(item.displayName != null);
          if (item.displayName != null) writer.writeJson(item.displayName.serialize());
          writer.writeBoolean(item.publicKey != null);
          if (item.publicKey != null) writeProfilePublicKey(writer, item.publicKey);
        }
        break;
      }
      case "update_game_mode": {
        writer.writeVarInt(1);
        writer.writeVarInt(this.update.entries.length);
        for (const item of this.update.entries) {
          writer.write(item.playerId.bytes());
          writer.writeVarInt(gameModeEnum.toId(item.gameMode));
        }
        break;
      }
      case "update_latency": {
        writer.writeVarInt(2);
        writer.writeVarInt(this.update.entries.length);
        for (const item of this.update.entries) {
          writer.write(item.playerId.bytes());
          writer.writeVarInt(item.latency);
        }
        break;
      }
      case "update_display_name": {
        writer.writeVarInt(3);
        writer.writeVarInt(this.update.entries.length);
        for (const item of this.update.entries) {
          writer.write(item.playerId.bytes());
          writer.writeBoolean(item.displayName != null);
          if (item.displayName != null) writer.writeJson(item.displayName.serialize());
        }
        break;
      }
      case "remove": {
        writer.writeVarInt(4);
        writer.writeVarInt(this.update.playerIds.length);
        for (const item of this.update.playerIds) writer.write(item.bytes());
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handlePlayerInfo?.(this);
  }
}

export type EntityAnchor = "feet" | "eyes";

const entityAnchorEnum = createEnumMapper<EntityAnchor>({ "feet": 0, "eyes": 1 });

export class ClientboundPlayerLookAtPacket implements Packet<ClientGameHandler> {
  constructor(
    public from: EntityAnchor,
    public x: number,
    public y: number,
    public z: number,
    public atEntity: { id: number; to: EntityAnchor } | null,
  ) {}
  static read(reader: Reader) {
    const from = entityAnchorEnum.fromId(reader.readVarInt());
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const atEntity = reader.readBoolean()
      ? { id: reader.readVarInt(), to: entityAnchorEnum.fromId(reader.readVarInt()) }
      : null;
    return new this(from, x, y, z, atEntity);
  }
  write(writer: Writer) {
    writer.writeVarInt(entityAnchorEnum.toId(this.from));
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeBoolean(this.atEntity != null);
    if (this.atEntity != null) {
      writer.writeVarInt(this.atEntity.id);
      writer.writeVarInt(entityAnchorEnum.toId(this.atEntity.to));
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handlePlayerLookAt?.(this);
  }
}

export class ClientboundPlayerPositionPacket implements Packet<ClientGameHandler> {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public yaw: number,
    public pitch: number,
    public relative: { x: boolean; y: boolean; z: boolean; yaw: boolean; pitch: boolean },
    public teleportId: number,
    public dismountVehicle: boolean,
  ) {}
  static read(reader: Reader) {
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const yaw = reader.readFloat();
    const pitch = reader.readFloat();
    const flags = reader.readByte();
    const relative = {
      x: (flags & 0x1) > 0,
      y: (flags & 0x2) > 0,
      z: (flags & 0x4) > 0,
      yaw: (flags & 0x8) > 0,
      pitch: (flags & 0x10) > 0,
    };
    const teleportId = reader.readVarInt();
    const dismountVehicle = reader.readBoolean();
    return new this(x, y, z, yaw, pitch, relative, teleportId, dismountVehicle);
  }
  write(writer: Writer) {
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeFloat(this.yaw);
    writer.writeFloat(this.pitch);
    writer.writeByte(
      (-this.relative.x & 0x1) | (-this.relative.y & 0x2) | (-this.relative.z & 0x4) | (-this.relative.yaw & 0x8) |
        (-this.relative.pitch & 0x10),
    );
    writer.writeVarInt(this.teleportId);
    writer.writeBoolean(this.dismountVehicle);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handlePlayerPosition?.(this);
  }
}

export type RecipeBookSettings = { open: boolean; filtering: boolean };

export type RecipeAction =
  | { type: "init"; toHighlight: ResourceLocation[] }
  | { type: "add" }
  | { type: "remove" };

const mapper = createEnumMapper({ "init": 0, "add": 1, "remove": 2 });

export class ClientboundRecipePacket implements Packet<ClientGameHandler> {
  constructor(
    public bookSettings: Map<RecipeBookType, RecipeBookSettings>,
    public recipes: ResourceLocation[],
    public action: RecipeAction,
  ) {}
  static read(reader: Reader) {
    const action = reader.readVarInt();
    let map: Map<RecipeBookType, RecipeBookSettings> = new Map();
    for (let i = 0; i < 4; i++) {
      map.set(Array.from<RecipeBookType>(["crafting", "furnace", "blast_furnace", "smoker"])[i]!, {
        open: reader.readBoolean(),
        filtering: reader.readBoolean(),
      });
    }
    const bookSettings = map;
    const list: ResourceLocation[] = [];
    for (let i1 = reader.readVarInt(); i1--;) list.push(ResourceLocation.from(reader.readString(32767)));
    const recipes = list;
    let result: RecipeAction;
    switch (action) {
      case 0: {
        const type = "init";
        const list1: ResourceLocation[] = [];
        for (let i2 = reader.readVarInt(); i2--;) list1.push(ResourceLocation.from(reader.readString(32767)));
        result = { type, toHighlight: list1 };
        break;
      }
      case 1:
        result = { type: "add" };
        break;
      case 2:
        result = { type: "remove" };
        break;
      default:
        throw new Error("Invalid tag id");
    }
    const action1 = result;
    return new this(bookSettings, recipes, action1);
  }
  write(writer: Writer) {
    writer.writeVarInt(mapper.toId(this.action.type));
    for (const bookType of Array.from<RecipeBookType>(["crafting", "furnace", "blast_furnace", "smoker"])) {
      const settings = this.bookSettings.get(bookType);
      writer.writeBoolean(settings?.open ?? false);
      writer.writeBoolean(settings?.filtering ?? false);
    }
    writer.writeVarInt(this.recipes.length);
    for (const item of this.recipes) writer.writeString(item.toString());
    switch (this.action.type) {
      case "init": {
        writer.writeVarInt(this.action.toHighlight.length);
        for (const item1 of this.action.toHighlight) writer.writeString(item1.toString());
        break;
      }
      case "add": {
        break;
      }
      case "remove": {
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleRecipe?.(this);
  }
}

export class ClientboundRemoveEntitiesPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityIds: number[],
  ) {}
  static read(reader: Reader) {
    const list: number[] = [];
    for (let i = reader.readVarInt(); i--;) list.push(reader.readVarInt());
    const entityIds = list;
    return new this(entityIds);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityIds.length);
    for (const item of this.entityIds) writer.writeVarInt(item);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleRemoveEntities?.(this);
  }
}

export class ClientboundRemoveMobEffectPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public effect: MobEffect,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const effect = mobEffectEnum.fromId(reader.readVarInt());
    return new this(entityId, effect);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeVarInt(mobEffectEnum.toId(this.effect));
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleRemoveMobEffect?.(this);
  }
}

export class ClientboundResourcePackPacket implements Packet<ClientGameHandler> {
  constructor(
    public url: string,
    public hash: string,
    public required: boolean,
    public prompt: Component | null,
  ) {}
  static read(reader: Reader) {
    const url = reader.readString();
    const hash = reader.readString(40);
    const required = reader.readBoolean();
    const prompt = reader.readBoolean() ? Component.deserialize(reader.readJson()) : null;
    return new this(url, hash, required, prompt);
  }
  write(writer: Writer) {
    writer.writeString(this.url);
    writer.writeString(this.hash);
    writer.writeBoolean(this.required);
    writer.writeBoolean(this.prompt != null);
    if (this.prompt != null) writer.writeJson(this.prompt.serialize());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleResourcePack?.(this);
  }
}

export class ClientboundRespawnPacket implements Packet<ClientGameHandler> {
  constructor(
    public dimensionType: DimensionType,
    public dimension: Dimension,
    public seed: bigint,
    public playerGameMode: GameMode,
    public previousPlayerGameMode: NullableGameMode,
    public isDebug: boolean,
    public isFlat: boolean,
    public keepAllPlayerData: boolean,
    public lastDeathLocation: GlobalPos | null,
  ) {}
  static read(reader: Reader) {
    const dimensionType = ResourceLocation.from(reader.readString(32767));
    const dimension = ResourceLocation.from(reader.readString(32767));
    const seed = reader.readLong();
    const playerGameMode = gameModeEnum.fromId(reader.readByte());
    let gameMode: GameMode | null = null;
    const bytes = reader.read(reader.unreadBytes);
    reader = new Reader(bytes);
    if (new Reader(bytes).readByte() != -1) {
      gameMode = gameModeEnum1.fromId(reader.readByte());
    } else {
      reader.readByte();
    }
    const previousPlayerGameMode = gameMode;
    const isDebug = reader.readBoolean();
    const isFlat = reader.readBoolean();
    const keepAllPlayerData = reader.readBoolean();
    const lastDeathLocation = reader.readBoolean() ? readGlobalPos(reader) : null;
    return new this(
      dimensionType,
      dimension,
      seed,
      playerGameMode,
      previousPlayerGameMode,
      isDebug,
      isFlat,
      keepAllPlayerData,
      lastDeathLocation,
    );
  }
  write(writer: Writer) {
    writer.writeString(this.dimensionType.toString());
    writer.writeString(this.dimension.toString());
    writer.writeLong(this.seed);
    writer.writeByte(gameModeEnum.toId(this.playerGameMode));
    if (this.previousPlayerGameMode != null) {
      writer.writeByte(gameModeEnum1.toId(this.previousPlayerGameMode));
    } else {
      writer.writeByte(-1);
    }
    writer.writeBoolean(this.isDebug);
    writer.writeBoolean(this.isFlat);
    writer.writeBoolean(this.keepAllPlayerData);
    writer.writeBoolean(this.lastDeathLocation != null);
    if (this.lastDeathLocation != null) writeGlobalPos(writer, this.lastDeathLocation);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleRespawn?.(this);
  }
}

export class ClientboundRotateHeadPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public headYaw: number,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const headYaw = reader.readByte();
    return new this(entityId, headYaw);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeByte(this.headYaw);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleRotateHead?.(this);
  }
}

export type SectionPos = { x: number; y: number; z: number };

export class ClientboundSectionBlocksUpdatePacket implements Packet<ClientGameHandler> {
  constructor(
    public sectionPos: SectionPos,
    public suppressLightUpdates: boolean,
    public blocks: { state: number; x: number; y: number; z: number }[],
  ) {}
  static read(reader: Reader) {
    const p = reader.readLong();
    const sectionPos = {
      x: Number(p >> 42n & 0x3fffffn) << 10 >> 10,
      y: Number(p >> 0n & 0xfffffn) << 12 >> 12,
      z: Number(p >> 20n & 0x3fffffn) << 10 >> 10,
    };
    const suppressLightUpdates = reader.readBoolean();
    const list: { state: number; x: number; y: number; z: number }[] = [];
    for (let i = reader.readVarInt(); i--;) {
      const p1 = reader.readVarLong();
      list.push({
        state: Number(p1 >> 12n & 0xfffffn) << -20 >> -20,
        x: Number(p1 >> 8n & 0xfn) << 28 >> 28,
        y: Number(p1 >> 0n & 0xfn) << 28 >> 28,
        z: Number(p1 >> 4n & 0xfn) << 28 >> 28,
      });
    }
    const blocks = list;
    return new this(sectionPos, suppressLightUpdates, blocks);
  }
  write(writer: Writer) {
    writer.writeLong(
      BigInt(this.sectionPos.x & 0x3fffff) << 42n | BigInt(this.sectionPos.y & 0xfffff) << 0n |
        BigInt(this.sectionPos.z & 0x3fffff) << 20n,
    );
    writer.writeBoolean(this.suppressLightUpdates);
    writer.writeVarInt(this.blocks.length);
    for (const item of this.blocks) {
      writer.writeVarLong(
        BigInt(item.state & 0xfffff) << 12n | BigInt(item.x & 0xf) << 8n | BigInt(item.y & 0xf) << 0n |
          BigInt(item.z & 0xf) << 4n,
      );
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSectionBlocksUpdate?.(this);
  }
}

export class ClientboundSelectAdvancementsTabPacket implements Packet<ClientGameHandler> {
  constructor(
    public tab: ResourceLocation | null,
  ) {}
  static read(reader: Reader) {
    const tab = reader.readBoolean() ? ResourceLocation.from(reader.readString(32767)) : null;
    return new this(tab);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.tab != null);
    if (this.tab != null) writer.writeString(this.tab.toString());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSelectAdvancementsTab?.(this);
  }
}

export class ClientboundServerDataPacket implements Packet<ClientGameHandler> {
  constructor(
    public motd: Component | null,
    /** Icon encoded as base64 */
    public icon: string | null,
    public previewsChat: boolean,
    public enforcesSecureChat: boolean,
  ) {}
  static read(reader: Reader) {
    const motd = reader.readBoolean() ? Component.deserialize(reader.readJson()) : null;
    const icon = reader.readBoolean() ? reader.readString() : null;
    const previewsChat = reader.readBoolean();
    const enforcesSecureChat = reader.readBoolean();
    return new this(motd, icon, previewsChat, enforcesSecureChat);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.motd != null);
    if (this.motd != null) writer.writeJson(this.motd.serialize());
    writer.writeBoolean(this.icon != null);
    if (this.icon != null) writer.writeString(this.icon);
    writer.writeBoolean(this.previewsChat);
    writer.writeBoolean(this.enforcesSecureChat);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleServerData?.(this);
  }
}

export class ClientboundSetActionBarTextPacket implements Packet<ClientGameHandler> {
  constructor(
    public text: Component,
  ) {}
  static read(reader: Reader) {
    const text = Component.deserialize(reader.readJson());
    return new this(text);
  }
  write(writer: Writer) {
    writer.writeJson(this.text.serialize());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetActionBarText?.(this);
  }
}

export class ClientboundSetBorderCenterPacket implements Packet<ClientGameHandler> {
  constructor(
    public centerX: number,
    public centerZ: number,
  ) {}
  static read(reader: Reader) {
    const centerX = reader.readDouble();
    const centerZ = reader.readDouble();
    return new this(centerX, centerZ);
  }
  write(writer: Writer) {
    writer.writeDouble(this.centerX);
    writer.writeDouble(this.centerZ);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetBorderCenter?.(this);
  }
}

export class ClientboundSetBorderLerpSizePacket implements Packet<ClientGameHandler> {
  constructor(
    public oldSize: number,
    public newSize: number,
    public lerpTime: bigint,
  ) {}
  static read(reader: Reader) {
    const oldSize = reader.readDouble();
    const newSize = reader.readDouble();
    const lerpTime = reader.readVarLong();
    return new this(oldSize, newSize, lerpTime);
  }
  write(writer: Writer) {
    writer.writeDouble(this.oldSize);
    writer.writeDouble(this.newSize);
    writer.writeVarLong(this.lerpTime);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetBorderLerpSize?.(this);
  }
}

export class ClientboundSetBorderSizePacket implements Packet<ClientGameHandler> {
  constructor(
    public size: number,
  ) {}
  static read(reader: Reader) {
    const size = reader.readDouble();
    return new this(size);
  }
  write(writer: Writer) {
    writer.writeDouble(this.size);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetBorderSize?.(this);
  }
}

export class ClientboundSetBorderWarningDelayPacket implements Packet<ClientGameHandler> {
  constructor(
    public warningDelay: number,
  ) {}
  static read(reader: Reader) {
    const warningDelay = reader.readVarInt();
    return new this(warningDelay);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.warningDelay);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetBorderWarningDelay?.(this);
  }
}

export class ClientboundSetBorderWarningDistancePacket implements Packet<ClientGameHandler> {
  constructor(
    public warningBlocks: number,
  ) {}
  static read(reader: Reader) {
    const warningBlocks = reader.readVarInt();
    return new this(warningBlocks);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.warningBlocks);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetBorderWarningDistance?.(this);
  }
}

export class ClientboundSetCameraPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    return new this(entityId);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetCamera?.(this);
  }
}

export class ClientboundSetCarriedItemPacket implements Packet<ClientGameHandler> {
  constructor(
    public slot: number,
  ) {}
  static read(reader: Reader) {
    const slot = reader.readByte();
    return new this(slot);
  }
  write(writer: Writer) {
    writer.writeByte(this.slot);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetCarriedItem?.(this);
  }
}

export class ClientboundSetChunkCacheCenterPacket implements Packet<ClientGameHandler> {
  constructor(
    public x: number,
    public z: number,
  ) {}
  static read(reader: Reader) {
    const x = reader.readVarInt();
    const z = reader.readVarInt();
    return new this(x, z);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.x);
    writer.writeVarInt(this.z);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetChunkCacheCenter?.(this);
  }
}

export class ClientboundSetChunkCacheRadiusPacket implements Packet<ClientGameHandler> {
  constructor(
    public chunkRadius: number,
  ) {}
  static read(reader: Reader) {
    const chunkRadius = reader.readVarInt();
    return new this(chunkRadius);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.chunkRadius);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetChunkCacheRadius?.(this);
  }
}

export class ClientboundSetDefaultSpawnPositionPacket implements Packet<ClientGameHandler> {
  constructor(
    public pos: BlockPos,
    public angle: number,
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    const angle = reader.readFloat();
    return new this(pos, angle);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writer.writeFloat(this.angle);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetDefaultSpawnPosition?.(this);
  }
}

export class ClientboundSetDisplayChatPreviewPacket implements Packet<ClientGameHandler> {
  constructor(
    public previewEnabled: boolean,
  ) {}
  static read(reader: Reader) {
    const previewEnabled = reader.readBoolean();
    return new this(previewEnabled);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.previewEnabled);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetDisplayChatPreview?.(this);
  }
}

export class ClientboundSetDisplayObjectivePacket implements Packet<ClientGameHandler> {
  constructor(
    public slot: number,
    public objectiveName: string,
  ) {}
  static read(reader: Reader) {
    const slot = reader.readByte();
    const objectiveName = reader.readString();
    return new this(slot, objectiveName);
  }
  write(writer: Writer) {
    writer.writeByte(this.slot);
    writer.writeString(this.objectiveName);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetDisplayObjective?.(this);
  }
}

export type EntityData = Map<number, EntityDataValue>;

export type EntityDataValue =
  | { type: "byte"; value: number }
  | { type: "int"; value: number }
  | { type: "float"; value: number }
  | { type: "string"; value: string }
  | { type: "component"; component: Component }
  | { type: "optional_component"; component: Component | null }
  | { type: "item_stack"; itemStack: ItemStack }
  | { type: "boolean"; value: boolean }
  | { type: "rotations"; x: number; y: number; z: number }
  | { type: "block_pos"; pos: BlockPos }
  | { type: "optional_block_pos"; pos: BlockPos | null }
  | { type: "direction"; direction: Direction }
  | { type: "optional_uuid"; uuid: Uuid | null }
  | { type: "block_state"; blockState: BlockState }
  | { type: "compound_tag"; tag: CompoundTag | null }
  | { type: "particle"; particle: ParticleOptions }
  | { type: "villager_data"; villagerType: VillagerType; profession: VillagerProfession; level: number }
  | { type: "optional_unsigned_int"; value: number | null }
  | { type: "pose"; pose: Pose }
  | { type: "cat_variant"; variant: CatVariant }
  | { type: "frog_variant"; variant: FrogVariant }
  | { type: "optional_global_pos"; globalPos: GlobalPos | null }
  | { type: "painting_variant"; variant: PaintingVariant };

export type Pose =
  | "standing"
  | "fall_flying"
  | "sleeping"
  | "swimming"
  | "spin_attack"
  | "crouching"
  | "long_jumping"
  | "dying"
  | "croaking"
  | "using_tongue"
  | "roaring"
  | "sniffing"
  | "emerging"
  | "digging";

const poseEnum = createEnumMapper<Pose>({
  "standing": 0,
  "fall_flying": 1,
  "sleeping": 2,
  "swimming": 3,
  "spin_attack": 4,
  "crouching": 5,
  "long_jumping": 6,
  "dying": 7,
  "croaking": 8,
  "using_tongue": 9,
  "roaring": 10,
  "sniffing": 11,
  "emerging": 12,
  "digging": 13,
});

export class ClientboundSetEntityDataPacket implements Packet<ClientGameHandler> {
  constructor(
    public id: number,
    public entityData: EntityData,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    let map: Map<number, EntityDataValue> = new Map();
    while (true) {
      const id1 = reader.readByte();
      if (id1 == -1) break;
      let result: EntityDataValue;
      switch (reader.readVarInt()) {
        case 0:
          result = { type: "byte", value: reader.readByte() };
          break;
        case 1:
          result = { type: "int", value: reader.readVarInt() };
          break;
        case 2:
          result = { type: "float", value: reader.readFloat() };
          break;
        case 3:
          result = { type: "string", value: reader.readString() };
          break;
        case 4:
          result = { type: "component", component: Component.deserialize(reader.readJson()) };
          break;
        case 5:
          result = {
            type: "optional_component",
            component: reader.readBoolean() ? Component.deserialize(reader.readJson()) : null,
          };
          break;
        case 6:
          result = { type: "item_stack", itemStack: readItemStack(reader) };
          break;
        case 7:
          result = { type: "boolean", value: reader.readBoolean() };
          break;
        case 8:
          result = { type: "rotations", x: reader.readFloat(), y: reader.readFloat(), z: reader.readFloat() };
          break;
        case 9:
          result = { type: "block_pos", pos: readBlockPos(reader) };
          break;
        case 10:
          result = { type: "optional_block_pos", pos: reader.readBoolean() ? readBlockPos(reader) : null };
          break;
        case 11:
          result = { type: "direction", direction: directionEnum.fromId(reader.readVarInt()) };
          break;
        case 12:
          result = { type: "optional_uuid", uuid: reader.readBoolean() ? Uuid.from(reader.read(16)) : null };
          break;
        case 13:
          result = { type: "block_state", blockState: readBlockState(reader) };
          break;
        case 14:
          result = { type: "compound_tag", tag: reader.readCompoundTag() };
          break;
        case 15: {
          const type = "particle";
          let result1: ParticleOptions;
          switch (particleTypeEnum.fromId(reader.readVarInt())) {
            case "minecraft:ambient_entity_effect":
              result1 = { type: "minecraft:ambient_entity_effect" };
              break;
            case "minecraft:angry_villager":
              result1 = { type: "minecraft:angry_villager" };
              break;
            case "minecraft:block":
              result1 = { type: "minecraft:block", blockState: readBlockState(reader) };
              break;
            case "minecraft:block_marker":
              result1 = { type: "minecraft:block_marker", blockState: readBlockState(reader) };
              break;
            case "minecraft:bubble":
              result1 = { type: "minecraft:bubble" };
              break;
            case "minecraft:cloud":
              result1 = { type: "minecraft:cloud" };
              break;
            case "minecraft:crit":
              result1 = { type: "minecraft:crit" };
              break;
            case "minecraft:damage_indicator":
              result1 = { type: "minecraft:damage_indicator" };
              break;
            case "minecraft:dragon_breath":
              result1 = { type: "minecraft:dragon_breath" };
              break;
            case "minecraft:dripping_lava":
              result1 = { type: "minecraft:dripping_lava" };
              break;
            case "minecraft:falling_lava":
              result1 = { type: "minecraft:falling_lava" };
              break;
            case "minecraft:landing_lava":
              result1 = { type: "minecraft:landing_lava" };
              break;
            case "minecraft:dripping_water":
              result1 = { type: "minecraft:dripping_water" };
              break;
            case "minecraft:falling_water":
              result1 = { type: "minecraft:falling_water" };
              break;
            case "minecraft:dust":
              result1 = {
                type: "minecraft:dust",
                color: { r: reader.readFloat(), g: reader.readFloat(), b: reader.readFloat() },
                scale: reader.readFloat(),
              };
              break;
            case "minecraft:dust_color_transition":
              result1 = {
                type: "minecraft:dust_color_transition",
                fromColor: { r: reader.readFloat(), g: reader.readFloat(), b: reader.readFloat() },
                scale: reader.readFloat(),
                toColor: { r: reader.readFloat(), g: reader.readFloat(), b: reader.readFloat() },
              };
              break;
            case "minecraft:effect":
              result1 = { type: "minecraft:effect" };
              break;
            case "minecraft:elder_guardian":
              result1 = { type: "minecraft:elder_guardian" };
              break;
            case "minecraft:enchanted_hit":
              result1 = { type: "minecraft:enchanted_hit" };
              break;
            case "minecraft:enchant":
              result1 = { type: "minecraft:enchant" };
              break;
            case "minecraft:end_rod":
              result1 = { type: "minecraft:end_rod" };
              break;
            case "minecraft:entity_effect":
              result1 = { type: "minecraft:entity_effect" };
              break;
            case "minecraft:explosion_emitter":
              result1 = { type: "minecraft:explosion_emitter" };
              break;
            case "minecraft:explosion":
              result1 = { type: "minecraft:explosion" };
              break;
            case "minecraft:sonic_boom":
              result1 = { type: "minecraft:sonic_boom" };
              break;
            case "minecraft:falling_dust":
              result1 = { type: "minecraft:falling_dust", blockState: readBlockState(reader) };
              break;
            case "minecraft:firework":
              result1 = { type: "minecraft:firework" };
              break;
            case "minecraft:fishing":
              result1 = { type: "minecraft:fishing" };
              break;
            case "minecraft:flame":
              result1 = { type: "minecraft:flame" };
              break;
            case "minecraft:sculk_soul":
              result1 = { type: "minecraft:sculk_soul" };
              break;
            case "minecraft:sculk_charge":
              result1 = { type: "minecraft:sculk_charge", roll: reader.readFloat() };
              break;
            case "minecraft:sculk_charge_pop":
              result1 = { type: "minecraft:sculk_charge_pop" };
              break;
            case "minecraft:soul_fire_flame":
              result1 = { type: "minecraft:soul_fire_flame" };
              break;
            case "minecraft:soul":
              result1 = { type: "minecraft:soul" };
              break;
            case "minecraft:flash":
              result1 = { type: "minecraft:flash" };
              break;
            case "minecraft:happy_villager":
              result1 = { type: "minecraft:happy_villager" };
              break;
            case "minecraft:composter":
              result1 = { type: "minecraft:composter" };
              break;
            case "minecraft:heart":
              result1 = { type: "minecraft:heart" };
              break;
            case "minecraft:instant_effect":
              result1 = { type: "minecraft:instant_effect" };
              break;
            case "minecraft:item":
              result1 = { type: "minecraft:item", itemStack: readItemStack(reader) };
              break;
            case "minecraft:vibration":
              result1 = {
                type: "minecraft:vibration",
                destination: readPositionSource(reader),
                arrivalInTicks: reader.readVarInt(),
              };
              break;
            case "minecraft:item_slime":
              result1 = { type: "minecraft:item_slime" };
              break;
            case "minecraft:item_snowball":
              result1 = { type: "minecraft:item_snowball" };
              break;
            case "minecraft:large_smoke":
              result1 = { type: "minecraft:large_smoke" };
              break;
            case "minecraft:lava":
              result1 = { type: "minecraft:lava" };
              break;
            case "minecraft:mycelium":
              result1 = { type: "minecraft:mycelium" };
              break;
            case "minecraft:note":
              result1 = { type: "minecraft:note" };
              break;
            case "minecraft:poof":
              result1 = { type: "minecraft:poof" };
              break;
            case "minecraft:portal":
              result1 = { type: "minecraft:portal" };
              break;
            case "minecraft:rain":
              result1 = { type: "minecraft:rain" };
              break;
            case "minecraft:smoke":
              result1 = { type: "minecraft:smoke" };
              break;
            case "minecraft:sneeze":
              result1 = { type: "minecraft:sneeze" };
              break;
            case "minecraft:spit":
              result1 = { type: "minecraft:spit" };
              break;
            case "minecraft:squid_ink":
              result1 = { type: "minecraft:squid_ink" };
              break;
            case "minecraft:sweep_attack":
              result1 = { type: "minecraft:sweep_attack" };
              break;
            case "minecraft:totem_of_undying":
              result1 = { type: "minecraft:totem_of_undying" };
              break;
            case "minecraft:underwater":
              result1 = { type: "minecraft:underwater" };
              break;
            case "minecraft:splash":
              result1 = { type: "minecraft:splash" };
              break;
            case "minecraft:witch":
              result1 = { type: "minecraft:witch" };
              break;
            case "minecraft:bubble_pop":
              result1 = { type: "minecraft:bubble_pop" };
              break;
            case "minecraft:current_down":
              result1 = { type: "minecraft:current_down" };
              break;
            case "minecraft:bubble_column_up":
              result1 = { type: "minecraft:bubble_column_up" };
              break;
            case "minecraft:nautilus":
              result1 = { type: "minecraft:nautilus" };
              break;
            case "minecraft:dolphin":
              result1 = { type: "minecraft:dolphin" };
              break;
            case "minecraft:campfire_cosy_smoke":
              result1 = { type: "minecraft:campfire_cosy_smoke" };
              break;
            case "minecraft:campfire_signal_smoke":
              result1 = { type: "minecraft:campfire_signal_smoke" };
              break;
            case "minecraft:dripping_honey":
              result1 = { type: "minecraft:dripping_honey" };
              break;
            case "minecraft:falling_honey":
              result1 = { type: "minecraft:falling_honey" };
              break;
            case "minecraft:landing_honey":
              result1 = { type: "minecraft:landing_honey" };
              break;
            case "minecraft:falling_nectar":
              result1 = { type: "minecraft:falling_nectar" };
              break;
            case "minecraft:falling_spore_blossom":
              result1 = { type: "minecraft:falling_spore_blossom" };
              break;
            case "minecraft:ash":
              result1 = { type: "minecraft:ash" };
              break;
            case "minecraft:crimson_spore":
              result1 = { type: "minecraft:crimson_spore" };
              break;
            case "minecraft:warped_spore":
              result1 = { type: "minecraft:warped_spore" };
              break;
            case "minecraft:spore_blossom_air":
              result1 = { type: "minecraft:spore_blossom_air" };
              break;
            case "minecraft:dripping_obsidian_tear":
              result1 = { type: "minecraft:dripping_obsidian_tear" };
              break;
            case "minecraft:falling_obsidian_tear":
              result1 = { type: "minecraft:falling_obsidian_tear" };
              break;
            case "minecraft:landing_obsidian_tear":
              result1 = { type: "minecraft:landing_obsidian_tear" };
              break;
            case "minecraft:reverse_portal":
              result1 = { type: "minecraft:reverse_portal" };
              break;
            case "minecraft:white_ash":
              result1 = { type: "minecraft:white_ash" };
              break;
            case "minecraft:small_flame":
              result1 = { type: "minecraft:small_flame" };
              break;
            case "minecraft:snowflake":
              result1 = { type: "minecraft:snowflake" };
              break;
            case "minecraft:dripping_dripstone_lava":
              result1 = { type: "minecraft:dripping_dripstone_lava" };
              break;
            case "minecraft:falling_dripstone_lava":
              result1 = { type: "minecraft:falling_dripstone_lava" };
              break;
            case "minecraft:dripping_dripstone_water":
              result1 = { type: "minecraft:dripping_dripstone_water" };
              break;
            case "minecraft:falling_dripstone_water":
              result1 = { type: "minecraft:falling_dripstone_water" };
              break;
            case "minecraft:glow_squid_ink":
              result1 = { type: "minecraft:glow_squid_ink" };
              break;
            case "minecraft:glow":
              result1 = { type: "minecraft:glow" };
              break;
            case "minecraft:wax_on":
              result1 = { type: "minecraft:wax_on" };
              break;
            case "minecraft:wax_off":
              result1 = { type: "minecraft:wax_off" };
              break;
            case "minecraft:electric_spark":
              result1 = { type: "minecraft:electric_spark" };
              break;
            case "minecraft:scrape":
              result1 = { type: "minecraft:scrape" };
              break;
            case "minecraft:shriek":
              result1 = { type: "minecraft:shriek", delay: reader.readVarInt() };
              break;
            default:
              throw new Error("Invalid tag id");
          }
          result = { type, particle: result1 };
          break;
        }
        case 16:
          result = {
            type: "villager_data",
            villagerType: villagerTypeEnum.fromId(reader.readVarInt()),
            profession: villagerProfessionEnum.fromId(reader.readVarInt()),
            level: reader.readVarInt(),
          };
          break;
        case 17: {
          const type = "optional_unsigned_int";
          const value1 = reader.readVarInt();
          result = { type, value: value1 > 0 ? value1 - 1 : null };
          break;
        }
        case 18:
          result = { type: "pose", pose: poseEnum.fromId(reader.readVarInt()) };
          break;
        case 19:
          result = { type: "cat_variant", variant: catVariantEnum.fromId(reader.readVarInt()) };
          break;
        case 20:
          result = { type: "frog_variant", variant: frogVariantEnum.fromId(reader.readVarInt()) };
          break;
        case 21:
          result = { type: "optional_global_pos", globalPos: reader.readBoolean() ? readGlobalPos(reader) : null };
          break;
        case 22:
          result = { type: "painting_variant", variant: paintingVariantEnum.fromId(reader.readVarInt()) };
          break;
        default:
          throw new Error("Invalid tag id");
      }
      map.set(id1, result);
    }
    const entityData = map;
    return new this(id, entityData);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    for (const [id, data] of this.entityData) {
      writer.writeByte(id);
      switch (data.type) {
        case "byte": {
          writer.writeVarInt(0);
          writer.writeByte(data.value);
          break;
        }
        case "int": {
          writer.writeVarInt(1);
          writer.writeVarInt(data.value);
          break;
        }
        case "float": {
          writer.writeVarInt(2);
          writer.writeFloat(data.value);
          break;
        }
        case "string": {
          writer.writeVarInt(3);
          writer.writeString(data.value);
          break;
        }
        case "component": {
          writer.writeVarInt(4);
          writer.writeJson(data.component.serialize());
          break;
        }
        case "optional_component": {
          writer.writeVarInt(5);
          writer.writeBoolean(data.component != null);
          if (data.component != null) writer.writeJson(data.component.serialize());
          break;
        }
        case "item_stack": {
          writer.writeVarInt(6);
          writeItemStack(writer, data.itemStack);
          break;
        }
        case "boolean": {
          writer.writeVarInt(7);
          writer.writeBoolean(data.value);
          break;
        }
        case "rotations": {
          writer.writeVarInt(8);
          writer.writeFloat(data.x);
          writer.writeFloat(data.y);
          writer.writeFloat(data.z);
          break;
        }
        case "block_pos": {
          writer.writeVarInt(9);
          writeBlockPos(writer, data.pos);
          break;
        }
        case "optional_block_pos": {
          writer.writeVarInt(10);
          writer.writeBoolean(data.pos != null);
          if (data.pos != null) writeBlockPos(writer, data.pos);
          break;
        }
        case "direction": {
          writer.writeVarInt(11);
          writer.writeVarInt(directionEnum.toId(data.direction));
          break;
        }
        case "optional_uuid": {
          writer.writeVarInt(12);
          writer.writeBoolean(data.uuid != null);
          if (data.uuid != null) writer.write(data.uuid.bytes());
          break;
        }
        case "block_state": {
          writer.writeVarInt(13);
          writeBlockState(writer, data.blockState);
          break;
        }
        case "compound_tag": {
          writer.writeVarInt(14);
          writer.writeCompoundTag(data.tag);
          break;
        }
        case "particle": {
          writer.writeVarInt(15);
          switch (data.particle.type) {
            case "minecraft:ambient_entity_effect": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:ambient_entity_effect"));
              break;
            }
            case "minecraft:angry_villager": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:angry_villager"));
              break;
            }
            case "minecraft:block": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:block"));
              writeBlockState(writer, data.particle.blockState);
              break;
            }
            case "minecraft:block_marker": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:block_marker"));
              writeBlockState(writer, data.particle.blockState);
              break;
            }
            case "minecraft:bubble": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:bubble"));
              break;
            }
            case "minecraft:cloud": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:cloud"));
              break;
            }
            case "minecraft:crit": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:crit"));
              break;
            }
            case "minecraft:damage_indicator": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:damage_indicator"));
              break;
            }
            case "minecraft:dragon_breath": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:dragon_breath"));
              break;
            }
            case "minecraft:dripping_lava": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:dripping_lava"));
              break;
            }
            case "minecraft:falling_lava": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:falling_lava"));
              break;
            }
            case "minecraft:landing_lava": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:landing_lava"));
              break;
            }
            case "minecraft:dripping_water": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:dripping_water"));
              break;
            }
            case "minecraft:falling_water": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:falling_water"));
              break;
            }
            case "minecraft:dust": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:dust"));
              writer.writeFloat(data.particle.color.r);
              writer.writeFloat(data.particle.color.g);
              writer.writeFloat(data.particle.color.b);
              writer.writeFloat(data.particle.scale);
              break;
            }
            case "minecraft:dust_color_transition": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:dust_color_transition"));
              writer.writeFloat(data.particle.fromColor.r);
              writer.writeFloat(data.particle.fromColor.g);
              writer.writeFloat(data.particle.fromColor.b);
              writer.writeFloat(data.particle.scale);
              writer.writeFloat(data.particle.toColor.r);
              writer.writeFloat(data.particle.toColor.g);
              writer.writeFloat(data.particle.toColor.b);
              break;
            }
            case "minecraft:effect": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:effect"));
              break;
            }
            case "minecraft:elder_guardian": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:elder_guardian"));
              break;
            }
            case "minecraft:enchanted_hit": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:enchanted_hit"));
              break;
            }
            case "minecraft:enchant": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:enchant"));
              break;
            }
            case "minecraft:end_rod": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:end_rod"));
              break;
            }
            case "minecraft:entity_effect": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:entity_effect"));
              break;
            }
            case "minecraft:explosion_emitter": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:explosion_emitter"));
              break;
            }
            case "minecraft:explosion": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:explosion"));
              break;
            }
            case "minecraft:sonic_boom": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:sonic_boom"));
              break;
            }
            case "minecraft:falling_dust": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:falling_dust"));
              writeBlockState(writer, data.particle.blockState);
              break;
            }
            case "minecraft:firework": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:firework"));
              break;
            }
            case "minecraft:fishing": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:fishing"));
              break;
            }
            case "minecraft:flame": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:flame"));
              break;
            }
            case "minecraft:sculk_soul": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:sculk_soul"));
              break;
            }
            case "minecraft:sculk_charge": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:sculk_charge"));
              writer.writeFloat(data.particle.roll);
              break;
            }
            case "minecraft:sculk_charge_pop": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:sculk_charge_pop"));
              break;
            }
            case "minecraft:soul_fire_flame": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:soul_fire_flame"));
              break;
            }
            case "minecraft:soul": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:soul"));
              break;
            }
            case "minecraft:flash": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:flash"));
              break;
            }
            case "minecraft:happy_villager": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:happy_villager"));
              break;
            }
            case "minecraft:composter": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:composter"));
              break;
            }
            case "minecraft:heart": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:heart"));
              break;
            }
            case "minecraft:instant_effect": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:instant_effect"));
              break;
            }
            case "minecraft:item": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:item"));
              writeItemStack(writer, data.particle.itemStack);
              break;
            }
            case "minecraft:vibration": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:vibration"));
              writePositionSource(writer, data.particle.destination);
              writer.writeVarInt(data.particle.arrivalInTicks);
              break;
            }
            case "minecraft:item_slime": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:item_slime"));
              break;
            }
            case "minecraft:item_snowball": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:item_snowball"));
              break;
            }
            case "minecraft:large_smoke": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:large_smoke"));
              break;
            }
            case "minecraft:lava": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:lava"));
              break;
            }
            case "minecraft:mycelium": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:mycelium"));
              break;
            }
            case "minecraft:note": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:note"));
              break;
            }
            case "minecraft:poof": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:poof"));
              break;
            }
            case "minecraft:portal": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:portal"));
              break;
            }
            case "minecraft:rain": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:rain"));
              break;
            }
            case "minecraft:smoke": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:smoke"));
              break;
            }
            case "minecraft:sneeze": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:sneeze"));
              break;
            }
            case "minecraft:spit": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:spit"));
              break;
            }
            case "minecraft:squid_ink": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:squid_ink"));
              break;
            }
            case "minecraft:sweep_attack": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:sweep_attack"));
              break;
            }
            case "minecraft:totem_of_undying": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:totem_of_undying"));
              break;
            }
            case "minecraft:underwater": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:underwater"));
              break;
            }
            case "minecraft:splash": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:splash"));
              break;
            }
            case "minecraft:witch": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:witch"));
              break;
            }
            case "minecraft:bubble_pop": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:bubble_pop"));
              break;
            }
            case "minecraft:current_down": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:current_down"));
              break;
            }
            case "minecraft:bubble_column_up": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:bubble_column_up"));
              break;
            }
            case "minecraft:nautilus": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:nautilus"));
              break;
            }
            case "minecraft:dolphin": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:dolphin"));
              break;
            }
            case "minecraft:campfire_cosy_smoke": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:campfire_cosy_smoke"));
              break;
            }
            case "minecraft:campfire_signal_smoke": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:campfire_signal_smoke"));
              break;
            }
            case "minecraft:dripping_honey": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:dripping_honey"));
              break;
            }
            case "minecraft:falling_honey": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:falling_honey"));
              break;
            }
            case "minecraft:landing_honey": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:landing_honey"));
              break;
            }
            case "minecraft:falling_nectar": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:falling_nectar"));
              break;
            }
            case "minecraft:falling_spore_blossom": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:falling_spore_blossom"));
              break;
            }
            case "minecraft:ash": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:ash"));
              break;
            }
            case "minecraft:crimson_spore": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:crimson_spore"));
              break;
            }
            case "minecraft:warped_spore": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:warped_spore"));
              break;
            }
            case "minecraft:spore_blossom_air": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:spore_blossom_air"));
              break;
            }
            case "minecraft:dripping_obsidian_tear": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:dripping_obsidian_tear"));
              break;
            }
            case "minecraft:falling_obsidian_tear": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:falling_obsidian_tear"));
              break;
            }
            case "minecraft:landing_obsidian_tear": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:landing_obsidian_tear"));
              break;
            }
            case "minecraft:reverse_portal": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:reverse_portal"));
              break;
            }
            case "minecraft:white_ash": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:white_ash"));
              break;
            }
            case "minecraft:small_flame": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:small_flame"));
              break;
            }
            case "minecraft:snowflake": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:snowflake"));
              break;
            }
            case "minecraft:dripping_dripstone_lava": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:dripping_dripstone_lava"));
              break;
            }
            case "minecraft:falling_dripstone_lava": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:falling_dripstone_lava"));
              break;
            }
            case "minecraft:dripping_dripstone_water": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:dripping_dripstone_water"));
              break;
            }
            case "minecraft:falling_dripstone_water": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:falling_dripstone_water"));
              break;
            }
            case "minecraft:glow_squid_ink": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:glow_squid_ink"));
              break;
            }
            case "minecraft:glow": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:glow"));
              break;
            }
            case "minecraft:wax_on": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:wax_on"));
              break;
            }
            case "minecraft:wax_off": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:wax_off"));
              break;
            }
            case "minecraft:electric_spark": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:electric_spark"));
              break;
            }
            case "minecraft:scrape": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:scrape"));
              break;
            }
            case "minecraft:shriek": {
              writer.writeVarInt(particleTypeEnum.toId("minecraft:shriek"));
              writer.writeVarInt(data.particle.delay);
              break;
            }
            default:
              throw new Error("Invalid tag");
          }
          break;
        }
        case "villager_data": {
          writer.writeVarInt(16);
          writer.writeVarInt(villagerTypeEnum.toId(data.villagerType));
          writer.writeVarInt(villagerProfessionEnum.toId(data.profession));
          writer.writeVarInt(data.level);
          break;
        }
        case "optional_unsigned_int": {
          writer.writeVarInt(17);
          writer.writeVarInt(data.value != null ? data.value + 1 : 0);
          break;
        }
        case "pose": {
          writer.writeVarInt(18);
          writer.writeVarInt(poseEnum.toId(data.pose));
          break;
        }
        case "cat_variant": {
          writer.writeVarInt(19);
          writer.writeVarInt(catVariantEnum.toId(data.variant));
          break;
        }
        case "frog_variant": {
          writer.writeVarInt(20);
          writer.writeVarInt(frogVariantEnum.toId(data.variant));
          break;
        }
        case "optional_global_pos": {
          writer.writeVarInt(21);
          writer.writeBoolean(data.globalPos != null);
          if (data.globalPos != null) writeGlobalPos(writer, data.globalPos);
          break;
        }
        case "painting_variant": {
          writer.writeVarInt(22);
          writer.writeVarInt(paintingVariantEnum.toId(data.variant));
          break;
        }
        default:
          throw new Error("Invalid tag");
      }
    }
    writer.writeByte(-1);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetEntityData?.(this);
  }
}

export class ClientboundSetEntityLinkPacket implements Packet<ClientGameHandler> {
  constructor(
    public sourceId: number,
    public destId: number,
  ) {}
  static read(reader: Reader) {
    const sourceId = reader.readInt();
    const destId = reader.readInt();
    return new this(sourceId, destId);
  }
  write(writer: Writer) {
    writer.writeInt(this.sourceId);
    writer.writeInt(this.destId);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetEntityLink?.(this);
  }
}

export class ClientboundSetEntityMotionPacket implements Packet<ClientGameHandler> {
  constructor(
    public id: number,
    /** Velocity on the X axis. */
    public vx: number,
    /** Velocity on the X axis. */
    public vy: number,
    /** Velocity on the X axis. */
    public vz: number,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    const vx = reader.readShort();
    const vy = reader.readShort();
    const vz = reader.readShort();
    return new this(id, vx, vy, vz);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    writer.writeShort(this.vx);
    writer.writeShort(this.vy);
    writer.writeShort(this.vz);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetEntityMotion?.(this);
  }
}

export class ClientboundSetEquipmentPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public equipmentSlots: Map<EquipmentSlot, ItemStack>,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    let equipmentSlots: Map<EquipmentSlot, ItemStack> = new Map();
    let i: number;
    do {
      i = reader.readByte();
      const slot = equipmentSlotEnum.fromId(i & 127);
      equipmentSlots.set(slot, readItemStack(reader));
    } while ((i & -128) != 0);
    return new this(entityId, equipmentSlots);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    const equipmentSlots = [...this.equipmentSlots.keys()];
    for (let i = 0; i < equipmentSlots.length; i++) {
      writer.writeByte(equipmentSlotEnum.toId(equipmentSlots[i]!) | (i != equipmentSlots.length - 1 ? -128 : 0));
      writeItemStack(writer, this.equipmentSlots.get(equipmentSlots[i]!)!);
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetEquipment?.(this);
  }
}

export class ClientboundSetExperiencePacket implements Packet<ClientGameHandler> {
  constructor(
    public experienceProgress: number,
    public experienceLevel: number,
    public totalExperience: number,
  ) {}
  static read(reader: Reader) {
    const experienceProgress = reader.readFloat();
    const experienceLevel = reader.readVarInt();
    const totalExperience = reader.readVarInt();
    return new this(experienceProgress, experienceLevel, totalExperience);
  }
  write(writer: Writer) {
    writer.writeFloat(this.experienceProgress);
    writer.writeVarInt(this.experienceLevel);
    writer.writeVarInt(this.totalExperience);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetExperience?.(this);
  }
}

export class ClientboundSetHealthPacket implements Packet<ClientGameHandler> {
  constructor(
    public health: number,
    public food: number,
    public saturation: number,
  ) {}
  static read(reader: Reader) {
    const health = reader.readFloat();
    const food = reader.readVarInt();
    const saturation = reader.readFloat();
    return new this(health, food, saturation);
  }
  write(writer: Writer) {
    writer.writeFloat(this.health);
    writer.writeVarInt(this.food);
    writer.writeFloat(this.saturation);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetHealth?.(this);
  }
}

export type ObjectiveAction =
  | { type: "add"; displayName: Component; renderType: CriteriaRenderType }
  | { type: "remove" }
  | { type: "change"; displayName: Component; renderType: CriteriaRenderType };

export type CriteriaRenderType = "integer" | "hearts";

const criteriaRenderTypeEnum = createEnumMapper<CriteriaRenderType>({ "integer": 0, "hearts": 1 });

export class ClientboundSetObjectivePacket implements Packet<ClientGameHandler> {
  constructor(
    public objectiveName: string,
    public action: ObjectiveAction,
  ) {}
  static read(reader: Reader) {
    const objectiveName = reader.readString();
    let result: ObjectiveAction;
    switch (reader.readByte()) {
      case 0:
        result = {
          type: "add",
          displayName: Component.deserialize(reader.readJson()),
          renderType: criteriaRenderTypeEnum.fromId(reader.readVarInt()),
        };
        break;
      case 1:
        result = { type: "remove" };
        break;
      case 2:
        result = {
          type: "change",
          displayName: Component.deserialize(reader.readJson()),
          renderType: criteriaRenderTypeEnum.fromId(reader.readVarInt()),
        };
        break;
      default:
        throw new Error("Invalid tag id");
    }
    const action = result;
    return new this(objectiveName, action);
  }
  write(writer: Writer) {
    writer.writeString(this.objectiveName);
    switch (this.action.type) {
      case "add": {
        writer.writeByte(0);
        writer.writeJson(this.action.displayName.serialize());
        writer.writeVarInt(criteriaRenderTypeEnum.toId(this.action.renderType));
        break;
      }
      case "remove": {
        writer.writeByte(1);
        break;
      }
      case "change": {
        writer.writeByte(2);
        writer.writeJson(this.action.displayName.serialize());
        writer.writeVarInt(criteriaRenderTypeEnum.toId(this.action.renderType));
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetObjective?.(this);
  }
}

export class ClientboundSetPassengersPacket implements Packet<ClientGameHandler> {
  constructor(
    public vehicleEntityId: number,
    public passengerEntityIds: number[],
  ) {}
  static read(reader: Reader) {
    const vehicleEntityId = reader.readVarInt();
    const list: number[] = [];
    for (let i = reader.readVarInt(); i--;) list.push(reader.readVarInt());
    const passengerEntityIds = list;
    return new this(vehicleEntityId, passengerEntityIds);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.vehicleEntityId);
    writer.writeVarInt(this.passengerEntityIds.length);
    for (const item of this.passengerEntityIds) writer.writeVarInt(item);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetPassengers?.(this);
  }
}

export class ClientboundSetPlayerTeamPacket implements Packet<ClientGameHandler> {
  constructor(
    public teamName: string,
    public action:
      | {
        type: "add_team";
        displayName: Component;
        flags: { allowFriendlyFire: boolean; seeFriendlyInvisibles: boolean };
        nametagVisibility: string;
        collisionRule: string;
        color: ChatFormatting;
        playerPrefix: Component;
        playerSuffix: Component;
        players: string[];
      }
      | { type: "remove_team" }
      | {
        type: "modify_team";
        displayName: Component;
        flags: { allowFriendlyFire: boolean; seeFriendlyInvisibles: boolean };
        nametagVisibility: string;
        collisionRule: string;
        color: ChatFormatting;
        playerPrefix: Component;
        playerSuffix: Component;
      }
      | { type: "add_players"; players: string[] }
      | { type: "remove_players"; players: string[] },
  ) {}
  static read(reader: Reader) {
    const teamName = reader.readString();
    let result:
      | {
        type: "add_team";
        displayName: Component;
        flags: { allowFriendlyFire: boolean; seeFriendlyInvisibles: boolean };
        nametagVisibility: string;
        collisionRule: string;
        color: ChatFormatting;
        playerPrefix: Component;
        playerSuffix: Component;
        players: string[];
      }
      | { type: "remove_team" }
      | {
        type: "modify_team";
        displayName: Component;
        flags: { allowFriendlyFire: boolean; seeFriendlyInvisibles: boolean };
        nametagVisibility: string;
        collisionRule: string;
        color: ChatFormatting;
        playerPrefix: Component;
        playerSuffix: Component;
      }
      | { type: "add_players"; players: string[] }
      | { type: "remove_players"; players: string[] };
    switch (reader.readByte()) {
      case 0: {
        const type = "add_team";
        const displayName = Component.deserialize(reader.readJson());
        const flags1 = reader.readByte();
        const flags = { allowFriendlyFire: (flags1 & 0x1) > 0, seeFriendlyInvisibles: (flags1 & 0x2) > 0 };
        const nametagVisibility = reader.readString();
        const collisionRule = reader.readString();
        const color = chatFormattingEnum.fromId(reader.readVarInt());
        const playerPrefix = Component.deserialize(reader.readJson());
        const playerSuffix = Component.deserialize(reader.readJson());
        const list: string[] = [];
        for (let i = reader.readVarInt(); i--;) list.push(reader.readString());
        result = {
          type,
          displayName,
          flags,
          nametagVisibility,
          collisionRule,
          color,
          playerPrefix,
          playerSuffix,
          players: list,
        };
        break;
      }
      case 1:
        result = { type: "remove_team" };
        break;
      case 2: {
        const type = "modify_team";
        const displayName = Component.deserialize(reader.readJson());
        const flags1 = reader.readByte();
        result = {
          type,
          displayName,
          flags: { allowFriendlyFire: (flags1 & 0x1) > 0, seeFriendlyInvisibles: (flags1 & 0x2) > 0 },
          nametagVisibility: reader.readString(),
          collisionRule: reader.readString(),
          color: chatFormattingEnum.fromId(reader.readVarInt()),
          playerPrefix: Component.deserialize(reader.readJson()),
          playerSuffix: Component.deserialize(reader.readJson()),
        };
        break;
      }
      case 3: {
        const type = "add_players";
        const list: string[] = [];
        for (let i = reader.readVarInt(); i--;) list.push(reader.readString());
        result = { type, players: list };
        break;
      }
      case 4: {
        const type = "remove_players";
        const list: string[] = [];
        for (let i = reader.readVarInt(); i--;) list.push(reader.readString());
        result = { type, players: list };
        break;
      }
      default:
        throw new Error("Invalid tag id");
    }
    const action = result;
    return new this(teamName, action);
  }
  write(writer: Writer) {
    writer.writeString(this.teamName);
    switch (this.action.type) {
      case "add_team": {
        writer.writeByte(0);
        writer.writeJson(this.action.displayName.serialize());
        writer.writeByte(
          (-this.action.flags.allowFriendlyFire & 0x1) | (-this.action.flags.seeFriendlyInvisibles & 0x2),
        );
        writer.writeString(this.action.nametagVisibility);
        writer.writeString(this.action.collisionRule);
        writer.writeVarInt(chatFormattingEnum.toId(this.action.color));
        writer.writeJson(this.action.playerPrefix.serialize());
        writer.writeJson(this.action.playerSuffix.serialize());
        writer.writeVarInt(this.action.players.length);
        for (const item of this.action.players) writer.writeString(item);
        break;
      }
      case "remove_team": {
        writer.writeByte(1);
        break;
      }
      case "modify_team": {
        writer.writeByte(2);
        writer.writeJson(this.action.displayName.serialize());
        writer.writeByte(
          (-this.action.flags.allowFriendlyFire & 0x1) | (-this.action.flags.seeFriendlyInvisibles & 0x2),
        );
        writer.writeString(this.action.nametagVisibility);
        writer.writeString(this.action.collisionRule);
        writer.writeVarInt(chatFormattingEnum.toId(this.action.color));
        writer.writeJson(this.action.playerPrefix.serialize());
        writer.writeJson(this.action.playerSuffix.serialize());
        break;
      }
      case "add_players": {
        writer.writeByte(3);
        writer.writeVarInt(this.action.players.length);
        for (const item of this.action.players) writer.writeString(item);
        break;
      }
      case "remove_players": {
        writer.writeByte(4);
        writer.writeVarInt(this.action.players.length);
        for (const item of this.action.players) writer.writeString(item);
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetPlayerTeam?.(this);
  }
}

export type ScoreboardAction =
  | { type: "update"; objective: string; score: number }
  | { type: "remove"; objective: string };

export class ClientboundSetScorePacket implements Packet<ClientGameHandler> {
  constructor(
    public owner: string,
    public action: ScoreboardAction,
  ) {}
  static read(reader: Reader) {
    const owner = reader.readString();
    let result: ScoreboardAction;
    switch (reader.readVarInt()) {
      case 0:
        result = { type: "update", objective: reader.readString(), score: reader.readVarInt() };
        break;
      case 1:
        result = { type: "remove", objective: reader.readString() };
        break;
      default:
        throw new Error("Invalid tag id");
    }
    const action = result;
    return new this(owner, action);
  }
  write(writer: Writer) {
    writer.writeString(this.owner);
    switch (this.action.type) {
      case "update": {
        writer.writeVarInt(0);
        writer.writeString(this.action.objective);
        writer.writeVarInt(this.action.score);
        break;
      }
      case "remove": {
        writer.writeVarInt(1);
        writer.writeString(this.action.objective);
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetScore?.(this);
  }
}

export class ClientboundSetSimulationDistancePacket implements Packet<ClientGameHandler> {
  constructor(
    public simulationDistance: number,
  ) {}
  static read(reader: Reader) {
    const simulationDistance = reader.readVarInt();
    return new this(simulationDistance);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.simulationDistance);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetSimulationDistance?.(this);
  }
}

export class ClientboundSetSubtitleTextPacket implements Packet<ClientGameHandler> {
  constructor(
    public subtitle: Component,
  ) {}
  static read(reader: Reader) {
    const subtitle = Component.deserialize(reader.readJson());
    return new this(subtitle);
  }
  write(writer: Writer) {
    writer.writeJson(this.subtitle.serialize());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetSubtitleText?.(this);
  }
}

export class ClientboundSetTimePacket implements Packet<ClientGameHandler> {
  constructor(
    public gameTime: bigint,
    public dayTime: bigint,
  ) {}
  static read(reader: Reader) {
    const gameTime = reader.readLong();
    const dayTime = reader.readLong();
    return new this(gameTime, dayTime);
  }
  write(writer: Writer) {
    writer.writeLong(this.gameTime);
    writer.writeLong(this.dayTime);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetTime?.(this);
  }
}

export class ClientboundSetTitleTextPacket implements Packet<ClientGameHandler> {
  constructor(
    public title: Component,
  ) {}
  static read(reader: Reader) {
    const title = Component.deserialize(reader.readJson());
    return new this(title);
  }
  write(writer: Writer) {
    writer.writeJson(this.title.serialize());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetTitleText?.(this);
  }
}

export class ClientboundSetTitlesAnimationPacket implements Packet<ClientGameHandler> {
  constructor(
    public fadeIn: number,
    public stay: number,
    public fadeOut: number,
  ) {}
  static read(reader: Reader) {
    const fadeIn = reader.readInt();
    const stay = reader.readInt();
    const fadeOut = reader.readInt();
    return new this(fadeIn, stay, fadeOut);
  }
  write(writer: Writer) {
    writer.writeInt(this.fadeIn);
    writer.writeInt(this.stay);
    writer.writeInt(this.fadeOut);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSetTitlesAnimation?.(this);
  }
}

export class ClientboundSoundEntityPacket implements Packet<ClientGameHandler> {
  constructor(
    public sound: SoundEvent,
    public source: SoundSource,
    public id: number,
    public volume: number,
    public pitch: number,
    public seed: bigint,
  ) {}
  static read(reader: Reader) {
    const sound = soundEventEnum.fromId(reader.readVarInt());
    const source = soundSourceEnum.fromId(reader.readVarInt());
    const id = reader.readVarInt();
    const volume = reader.readFloat();
    const pitch = reader.readFloat();
    const seed = reader.readLong();
    return new this(sound, source, id, volume, pitch, seed);
  }
  write(writer: Writer) {
    writer.writeVarInt(soundEventEnum.toId(this.sound));
    writer.writeVarInt(soundSourceEnum.toId(this.source));
    writer.writeVarInt(this.id);
    writer.writeFloat(this.volume);
    writer.writeFloat(this.pitch);
    writer.writeLong(this.seed);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSoundEntity?.(this);
  }
}

export class ClientboundSoundPacket implements Packet<ClientGameHandler> {
  constructor(
    public sound: SoundEvent,
    public source: SoundSource,
    public x: number,
    public y: number,
    public z: number,
    public volume: number,
    public pitch: number,
    public seed: bigint,
  ) {}
  static read(reader: Reader) {
    const sound = soundEventEnum.fromId(reader.readVarInt());
    const source = soundSourceEnum.fromId(reader.readVarInt());
    const x = reader.readInt();
    const y = reader.readInt();
    const z = reader.readInt();
    const volume = reader.readFloat();
    const pitch = reader.readFloat();
    const seed = reader.readLong();
    return new this(sound, source, x, y, z, volume, pitch, seed);
  }
  write(writer: Writer) {
    writer.writeVarInt(soundEventEnum.toId(this.sound));
    writer.writeVarInt(soundSourceEnum.toId(this.source));
    writer.writeInt(this.x);
    writer.writeInt(this.y);
    writer.writeInt(this.z);
    writer.writeFloat(this.volume);
    writer.writeFloat(this.pitch);
    writer.writeLong(this.seed);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSound?.(this);
  }
}

export class ClientboundStopSoundPacket implements Packet<ClientGameHandler> {
  constructor(
    public source: SoundSource | null,
    public sound: ResourceLocation | null,
  ) {}
  static read(reader: Reader) {
    const flags = reader.readByte();
    const source = (flags & 0x1) != 0 ? soundSourceEnum.fromId(reader.readVarInt()) : null;
    const sound = (flags & 0x1) != 0 ? ResourceLocation.from(reader.readString(32767)) : null;
    return new this(source, sound);
  }
  write(writer: Writer) {
    writer.writeByte(-(this.source != null) & 0x1 | -(this.sound != null) & 0x2);
    if (this.source != null) writer.writeVarInt(soundSourceEnum.toId(this.source));
    if (this.sound != null) writer.writeString(this.sound.toString());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleStopSound?.(this);
  }
}

export class ClientboundSystemChatPacket implements Packet<ClientGameHandler> {
  constructor(
    public content: Component,
    public overlay: boolean,
  ) {}
  static read(reader: Reader) {
    const content = Component.deserialize(reader.readJson());
    const overlay = reader.readBoolean();
    return new this(content, overlay);
  }
  write(writer: Writer) {
    writer.writeJson(this.content.serialize());
    writer.writeBoolean(this.overlay);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleSystemChat?.(this);
  }
}

export class ClientboundTabListPacket implements Packet<ClientGameHandler> {
  constructor(
    public header: Component,
    public footer: Component,
  ) {}
  static read(reader: Reader) {
    const header = Component.deserialize(reader.readJson());
    const footer = Component.deserialize(reader.readJson());
    return new this(header, footer);
  }
  write(writer: Writer) {
    writer.writeJson(this.header.serialize());
    writer.writeJson(this.footer.serialize());
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleTabList?.(this);
  }
}

export class ClientboundTagQueryPacket implements Packet<ClientGameHandler> {
  constructor(
    public transactionId: number,
    public tag: CompoundTag | null,
  ) {}
  static read(reader: Reader) {
    const transactionId = reader.readVarInt();
    const tag = reader.readCompoundTag();
    return new this(transactionId, tag);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.transactionId);
    writer.writeCompoundTag(this.tag);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleTagQuery?.(this);
  }
}

export class ClientboundTakeItemEntityPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public playerId: number,
    public amount: number,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const playerId = reader.readVarInt();
    const amount = reader.readVarInt();
    return new this(entityId, playerId, amount);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeVarInt(this.playerId);
    writer.writeVarInt(this.amount);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleTakeItemEntity?.(this);
  }
}

export class ClientboundTeleportEntityPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public x: number,
    public y: number,
    public z: number,
    public yaw: number,
    public pitch: number,
    public onGround: boolean,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const yaw = reader.readByte();
    const pitch = reader.readByte();
    const onGround = reader.readBoolean();
    return new this(entityId, x, y, z, yaw, pitch, onGround);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeByte(this.yaw);
    writer.writeByte(this.pitch);
    writer.writeBoolean(this.onGround);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleTeleportEntity?.(this);
  }
}

export type Advancement = {
  parentId: ResourceLocation | null;
  display: DisplayInfo | null;
  criteria: string[];
  requirements: string[][];
};

export type DisplayInfo = {
  title: Component;
  description: Component;
  icon: ItemStack;
  frame: FrameType;
  background: ResourceLocation | null;
  showToast: boolean;
  hidden: boolean;
  x: number;
  y: number;
};

export type FrameType = "task" | "challenge" | "goal";

const frameTypeEnum = createEnumMapper<FrameType>({ "task": 0, "challenge": 1, "goal": 2 });

export type AdvancementProgress = Map<ResourceLocation, CriterionProgress>;

export type CriterionProgress = { obtainedAt: Date | null };

export class ClientboundUpdateAdvancementsPacket implements Packet<ClientGameHandler> {
  constructor(
    public reset: boolean,
    public added: Map<ResourceLocation, Advancement>,
    public removed: ResourceLocation[],
    public progress: Map<ResourceLocation, AdvancementProgress>,
  ) {}
  static read(reader: Reader) {
    const reset = reader.readBoolean();
    const map: Map<ResourceLocation, Advancement> = new Map();
    for (let i = reader.readVarInt(); i--;) {
      const key = ResourceLocation.from(reader.readString(32767));
      const parentId = reader.readBoolean() ? ResourceLocation.from(reader.readString(32767)) : null;
      let value1: DisplayInfo | null = null;
      if (reader.readBoolean()) {
        const title = Component.deserialize(reader.readJson());
        const description = Component.deserialize(reader.readJson());
        const icon = readItemStack(reader);
        const frame = frameTypeEnum.fromId(reader.readVarInt());
        const flags = reader.readInt();
        let background: ResourceLocation | null = null;
        if ((flags & 0x1) != 0) background = ResourceLocation.from(reader.readString(32767));
        value1 = {
          title,
          description,
          icon,
          frame,
          background,
          showToast: (flags & 0x2) != 0,
          hidden: (flags & 0x4) != 0,
          x: reader.readFloat(),
          y: reader.readFloat(),
        };
      }
      const list: string[] = [];
      for (let i1 = reader.readVarInt(); i1--;) list.push(reader.readString());
      const list1: string[][] = [];
      for (let i2 = reader.readVarInt(); i2--;) {
        const list2: string[] = [];
        for (let i3 = reader.readVarInt(); i3--;) list2.push(reader.readString());
        list1.push(list2);
      }
      const value = { parentId, display: value1, criteria: list, requirements: list1 };
      map.set(key, value);
    }
    const added = map;
    const list: ResourceLocation[] = [];
    for (let i1 = reader.readVarInt(); i1--;) list.push(ResourceLocation.from(reader.readString(32767)));
    const removed = list;
    const map1: Map<ResourceLocation, AdvancementProgress> = new Map();
    for (let i2 = reader.readVarInt(); i2--;) {
      const key = ResourceLocation.from(reader.readString(32767));
      const map2: AdvancementProgress = new Map();
      for (let i3 = reader.readVarInt(); i3--;) {
        const key1 = ResourceLocation.from(reader.readString(32767));
        const value1 = { obtainedAt: reader.readBoolean() ? new Date(Number(reader.readLong())) : null };
        map2.set(key1, value1);
      }
      const value = map2;
      map1.set(key, value);
    }
    const progress = map1;
    return new this(reset, added, removed, progress);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.reset);
    writer.writeVarInt(this.added.size);
    for (const [key, value] of this.added) {
      writer.writeString(key.toString());
      writer.writeBoolean(value.parentId != null);
      if (value.parentId != null) writer.writeString(value.parentId.toString());
      writer.writeBoolean(value.display != null);
      if (value.display != null) {
        writer.writeJson(value.display.title.serialize());
        writer.writeJson(value.display.description.serialize());
        writeItemStack(writer, value.display.icon);
        writer.writeVarInt(frameTypeEnum.toId(value.display.frame));
        writer.writeInt(
          -(value.display.background != null) & 0x1 | -value.display.showToast & 0x2 | -value.display.hidden & 0x4,
        );
        if (value.display.background != null) {
          writer.writeString(value.display.background.toString());
        }
        writer.writeFloat(value.display.x);
        writer.writeFloat(value.display.y);
      }
      writer.writeVarInt(value.criteria.length);
      for (const item of value.criteria) writer.writeString(item);
      writer.writeVarInt(value.requirements.length);
      for (const item1 of value.requirements) {
        writer.writeVarInt(item1.length);
        for (const item2 of item1) writer.writeString(item2);
      }
    }
    writer.writeVarInt(this.removed.length);
    for (const item of this.removed) writer.writeString(item.toString());
    writer.writeVarInt(this.progress.size);
    for (const [key, value] of this.progress) {
      writer.writeString(key.toString());
      writer.writeVarInt(value.size);
      for (const [key1, value1] of value) {
        writer.writeString(key1.toString());
        writer.writeBoolean(value1.obtainedAt != null);
        if (value1.obtainedAt != null) writer.writeLong(BigInt(value1.obtainedAt.getTime()));
      }
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleUpdateAdvancements?.(this);
  }
}

export type Attribute = { id: ResourceLocation; base: number; modifiers: AttributeModifier[] };

export type AttributeModifier = {
  id: Uuid;
  amount: number;
  operation: "addition" | "multiply_base" | "multiply_total";
};

const mapper1 = createEnumMapper({ "addition": 0, "multiply_base": 1, "multiply_total": 2 });

export class ClientboundUpdateAttributesPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public attributes: Attribute[],
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const list: Attribute[] = [];
    for (let i = reader.readVarInt(); i--;) {
      const id = ResourceLocation.from(reader.readString(32767));
      const base = reader.readDouble();
      const list1: AttributeModifier[] = [];
      for (let i1 = reader.readVarInt(); i1--;) {
        list1.push({
          id: Uuid.from(reader.read(16)),
          amount: reader.readDouble(),
          operation: mapper1.fromId(reader.readVarInt()),
        });
      }
      list.push({ id, base, modifiers: list1 });
    }
    const attributes = list;
    return new this(entityId, attributes);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeVarInt(this.attributes.length);
    for (const item of this.attributes) {
      writer.writeString(item.id.toString());
      writer.writeDouble(item.base);
      writer.writeVarInt(item.modifiers.length);
      for (const item1 of item.modifiers) {
        writer.write(item1.id.bytes());
        writer.writeDouble(item1.amount);
        writer.writeVarInt(mapper1.toId(item1.operation));
      }
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleUpdateAttributes?.(this);
  }
}

export class ClientboundUpdateMobEffectPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public effect: MobEffect,
    public effectAmplifier: number,
    public effectDurationTicks: number,
    public flags: { isAmbient: boolean; isVisible: boolean; showIcon: boolean },
    public factorData: (CompoundTag | null) | null,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const effect = mobEffectEnum.fromId(reader.readVarInt());
    const effectAmplifier = reader.readByte();
    const effectDurationTicks = reader.readVarInt();
    const flags1 = reader.readByte();
    const flags = { isAmbient: (flags1 & 0x1) > 0, isVisible: (flags1 & 0x2) > 0, showIcon: (flags1 & 0x4) > 0 };
    const factorData = reader.readBoolean() ? reader.readCompoundTag() : null;
    return new this(entityId, effect, effectAmplifier, effectDurationTicks, flags, factorData);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeVarInt(mobEffectEnum.toId(this.effect));
    writer.writeByte(this.effectAmplifier);
    writer.writeVarInt(this.effectDurationTicks);
    writer.writeByte((-this.flags.isAmbient & 0x1) | (-this.flags.isVisible & 0x2) | (-this.flags.showIcon & 0x4));
    writer.writeBoolean(this.factorData != null);
    if (this.factorData != null) writer.writeCompoundTag(this.factorData);
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleUpdateMobEffect?.(this);
  }
}

export type Recipe = { recipeId: ResourceLocation; serializer: RecipeSerializer };

export type RecipeSerializer =
  | {
    id: "crafting_shaped";
    width: number;
    height: number;
    group: string;
    ingredients: Ingredient[];
    result: ItemStack;
  }
  | { id: "crafting_shapeless"; group: string; ingredients: Ingredient[]; result: ItemStack }
  | { id: "crafting_special_armordye" }
  | { id: "crafting_special_bookcloning" }
  | { id: "crafting_special_mapcloning" }
  | { id: "crafting_special_mapextending" }
  | { id: "crafting_special_firework_rocket" }
  | { id: "crafting_special_firework_star" }
  | { id: "crafting_special_firework_star_fade" }
  | { id: "crafting_special_tippedarrow" }
  | { id: "crafting_special_bannerduplicate" }
  | { id: "crafting_special_shielddecoration" }
  | { id: "crafting_special_shulkerboxcoloring" }
  | { id: "crafting_special_suspiciousstew" }
  | { id: "crafting_special_repairitem" }
  | {
    id: "smelting";
    group: string;
    ingredient: Ingredient;
    result: ItemStack;
    experience: number;
    cookingTime: number;
  }
  | {
    id: "blasting";
    group: string;
    ingredient: Ingredient;
    result: ItemStack;
    experience: number;
    cookingTime: number;
  }
  | { id: "smoking"; group: string; ingredient: Ingredient; result: ItemStack; experience: number; cookingTime: number }
  | {
    id: "campfire_cooking";
    group: string;
    ingredient: Ingredient;
    result: ItemStack;
    experience: number;
    cookingTime: number;
  }
  | { id: "stonecutting"; group: string; ingredient: Ingredient; result: ItemStack }
  | { id: "smithing"; base: Ingredient; addition: Ingredient; result: ItemStack };

export type Ingredient = ItemStack[];

export class ClientboundUpdateRecipesPacket implements Packet<ClientGameHandler> {
  constructor(
    public recipes: Recipe[],
  ) {}
  static read(reader: Reader) {
    const list: Recipe[] = [];
    for (let i = reader.readVarInt(); i--;) {
      const serializerId = ResourceLocation.from(reader.readString(32767));
      const recipeId = ResourceLocation.from(reader.readString(32767));
      let result: RecipeSerializer;
      switch (serializerId.path) {
        case "crafting_shaped": {
          const id = "crafting_shaped";
          const width = reader.readVarInt();
          const height = reader.readVarInt();
          const group = reader.readString();
          const list1: Ingredient[] = [];
          for (let i1 = width * height; i1--;) {
            const list2: Ingredient = [];
            for (let i2 = reader.readVarInt(); i2--;) list2.push(readItemStack(reader));
            list1.push(list2);
          }
          result = { id, width, height, group, ingredients: list1, result: readItemStack(reader) };
          break;
        }
        case "crafting_shapeless": {
          const id = "crafting_shapeless";
          const group = reader.readString();
          const list1: Ingredient[] = [];
          for (let i1 = reader.readVarInt(); i1--;) {
            const list2: Ingredient = [];
            for (let i2 = reader.readVarInt(); i2--;) list2.push(readItemStack(reader));
            list1.push(list2);
          }
          result = { id, group, ingredients: list1, result: readItemStack(reader) };
          break;
        }
        case "crafting_special_armordye":
          result = { id: "crafting_special_armordye" };
          break;
        case "crafting_special_bookcloning":
          result = { id: "crafting_special_bookcloning" };
          break;
        case "crafting_special_mapcloning":
          result = { id: "crafting_special_mapcloning" };
          break;
        case "crafting_special_mapextending":
          result = { id: "crafting_special_mapextending" };
          break;
        case "crafting_special_firework_rocket":
          result = { id: "crafting_special_firework_rocket" };
          break;
        case "crafting_special_firework_star":
          result = { id: "crafting_special_firework_star" };
          break;
        case "crafting_special_firework_star_fade":
          result = { id: "crafting_special_firework_star_fade" };
          break;
        case "crafting_special_tippedarrow":
          result = { id: "crafting_special_tippedarrow" };
          break;
        case "crafting_special_bannerduplicate":
          result = { id: "crafting_special_bannerduplicate" };
          break;
        case "crafting_special_shielddecoration":
          result = { id: "crafting_special_shielddecoration" };
          break;
        case "crafting_special_shulkerboxcoloring":
          result = { id: "crafting_special_shulkerboxcoloring" };
          break;
        case "crafting_special_suspiciousstew":
          result = { id: "crafting_special_suspiciousstew" };
          break;
        case "crafting_special_repairitem":
          result = { id: "crafting_special_repairitem" };
          break;
        case "smelting": {
          const id = "smelting";
          const group = reader.readString();
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          result = {
            id,
            group,
            ingredient: list1,
            result: readItemStack(reader),
            experience: reader.readFloat(),
            cookingTime: reader.readVarInt(),
          };
          break;
        }
        case "blasting": {
          const id = "blasting";
          const group = reader.readString();
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          result = {
            id,
            group,
            ingredient: list1,
            result: readItemStack(reader),
            experience: reader.readFloat(),
            cookingTime: reader.readVarInt(),
          };
          break;
        }
        case "smoking": {
          const id = "smoking";
          const group = reader.readString();
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          result = {
            id,
            group,
            ingredient: list1,
            result: readItemStack(reader),
            experience: reader.readFloat(),
            cookingTime: reader.readVarInt(),
          };
          break;
        }
        case "campfire_cooking": {
          const id = "campfire_cooking";
          const group = reader.readString();
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          result = {
            id,
            group,
            ingredient: list1,
            result: readItemStack(reader),
            experience: reader.readFloat(),
            cookingTime: reader.readVarInt(),
          };
          break;
        }
        case "stonecutting": {
          const id = "stonecutting";
          const group = reader.readString();
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          result = { id, group, ingredient: list1, result: readItemStack(reader) };
          break;
        }
        case "smithing": {
          const id = "smithing";
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          const list2: Ingredient = [];
          for (let i2 = reader.readVarInt(); i2--;) list2.push(readItemStack(reader));
          result = { id, base: list1, addition: list2, result: readItemStack(reader) };
          break;
        }
        default:
          throw new Error("Invalid tag id");
      }
      list.push({ recipeId, serializer: result });
    }
    const recipes = list;
    return new this(recipes);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.recipes.length);
    for (const item of this.recipes) {
      writer.writeString(new ResourceLocation("minecraft", item.serializer.id).toString());
      writer.writeString(item.recipeId.toString());
      switch (item.serializer.id) {
        case "crafting_shaped": {
          writer.writeVarInt(item.serializer.width);
          writer.writeVarInt(item.serializer.height);
          writer.writeString(item.serializer.group);
          for (const item1 of item.serializer.ingredients) {
            writer.writeVarInt(item1.length);
            for (const item2 of item1) writeItemStack(writer, item2);
          }
          writeItemStack(writer, item.serializer.result);
          break;
        }
        case "crafting_shapeless": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredients.length);
          for (const item1 of item.serializer.ingredients) {
            writer.writeVarInt(item1.length);
            for (const item2 of item1) writeItemStack(writer, item2);
          }
          writeItemStack(writer, item.serializer.result);
          break;
        }
        case "crafting_special_armordye": {
          break;
        }
        case "crafting_special_bookcloning": {
          break;
        }
        case "crafting_special_mapcloning": {
          break;
        }
        case "crafting_special_mapextending": {
          break;
        }
        case "crafting_special_firework_rocket": {
          break;
        }
        case "crafting_special_firework_star": {
          break;
        }
        case "crafting_special_firework_star_fade": {
          break;
        }
        case "crafting_special_tippedarrow": {
          break;
        }
        case "crafting_special_bannerduplicate": {
          break;
        }
        case "crafting_special_shielddecoration": {
          break;
        }
        case "crafting_special_shulkerboxcoloring": {
          break;
        }
        case "crafting_special_suspiciousstew": {
          break;
        }
        case "crafting_special_repairitem": {
          break;
        }
        case "smelting": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredient.length);
          for (const item1 of item.serializer.ingredient) writeItemStack(writer, item1);
          writeItemStack(writer, item.serializer.result);
          writer.writeFloat(item.serializer.experience);
          writer.writeVarInt(item.serializer.cookingTime);
          break;
        }
        case "blasting": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredient.length);
          for (const item1 of item.serializer.ingredient) writeItemStack(writer, item1);
          writeItemStack(writer, item.serializer.result);
          writer.writeFloat(item.serializer.experience);
          writer.writeVarInt(item.serializer.cookingTime);
          break;
        }
        case "smoking": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredient.length);
          for (const item1 of item.serializer.ingredient) writeItemStack(writer, item1);
          writeItemStack(writer, item.serializer.result);
          writer.writeFloat(item.serializer.experience);
          writer.writeVarInt(item.serializer.cookingTime);
          break;
        }
        case "campfire_cooking": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredient.length);
          for (const item1 of item.serializer.ingredient) writeItemStack(writer, item1);
          writeItemStack(writer, item.serializer.result);
          writer.writeFloat(item.serializer.experience);
          writer.writeVarInt(item.serializer.cookingTime);
          break;
        }
        case "stonecutting": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredient.length);
          for (const item1 of item.serializer.ingredient) writeItemStack(writer, item1);
          writeItemStack(writer, item.serializer.result);
          break;
        }
        case "smithing": {
          writer.writeVarInt(item.serializer.base.length);
          for (const item1 of item.serializer.base) writeItemStack(writer, item1);
          writer.writeVarInt(item.serializer.addition.length);
          for (const item2 of item.serializer.addition) writeItemStack(writer, item2);
          writeItemStack(writer, item.serializer.result);
          break;
        }
        default:
          throw new Error("Invalid tag");
      }
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleUpdateRecipes?.(this);
  }
}

export class ClientboundUpdateTagsPacket implements Packet<ClientGameHandler> {
  constructor(
    public tags: Map<ResourceLocation, Map<ResourceLocation, number[]>>,
  ) {}
  static read(reader: Reader) {
    const map: Map<ResourceLocation, Map<ResourceLocation, number[]>> = new Map();
    for (let i = reader.readVarInt(); i--;) {
      const key = ResourceLocation.from(reader.readString(32767));
      const map1: Map<ResourceLocation, number[]> = new Map();
      for (let i1 = reader.readVarInt(); i1--;) {
        const key1 = ResourceLocation.from(reader.readString(32767));
        const list: number[] = [];
        for (let i2 = reader.readVarInt(); i2--;) list.push(reader.readVarInt());
        const value1 = list;
        map1.set(key1, value1);
      }
      const value = map1;
      map.set(key, value);
    }
    const tags = map;
    return new this(tags);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.tags.size);
    for (const [key, value] of this.tags) {
      writer.writeString(key.toString());
      writer.writeVarInt(value.size);
      for (const [key1, value1] of value) {
        writer.writeString(key1.toString());
        writer.writeVarInt(value1.length);
        for (const item of value1) writer.writeVarInt(item);
      }
    }
  }
  async handle(handler: ClientGameHandler) {
    await handler.handleUpdateTags?.(this);
  }
}

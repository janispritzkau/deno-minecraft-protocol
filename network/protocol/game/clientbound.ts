// deno-lint-ignore-file
import { Reader, Writer } from "minecraft/io/mod.ts";
import { CompoundTag } from "minecraft/nbt/tag.ts";
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
  ChatTypeBound,
  ChunkData,
  CommandNode,
  Component,
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
  FrogVariant,
  frogVariantEnum,
  GameMode,
  gameModeEnum,
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
  MerchantOffers,
  MessageSignature,
  MobEffect,
  mobEffectEnum,
  PaintingVariant,
  paintingVariantEnum,
  ParticleType,
  particleTypeEnum,
  PlayerChatMessage,
  PositionSource,
  ProfilePublicKey,
  readBlock,
  readBlockEntityType,
  readBlockPos,
  readBlockState,
  readCatVariant,
  readChatFormatting,
  readChatType,
  readChatTypeBound,
  readChunkData,
  readCommandArgument,
  readCommandNode,
  readCustomStat,
  readDifficulty,
  readDirection,
  readEntityType,
  readEquipmentSlot,
  readFilterMask,
  readFrogVariant,
  readGameMode,
  readGameProfile,
  readGlobalPos,
  readInteractionHand,
  readItem,
  readItemStack,
  readLightData,
  readMenu,
  readMerchantOffer,
  readMerchantOffers,
  readMobEffect,
  readPaintingVariant,
  readParticleType,
  readPlayerChatMessage,
  readPositionSource,
  readProfilePublicKey,
  readProperties,
  readRecipeBookType,
  readResourceLocation,
  readSignedMessageBody,
  readSignedMessageHeader,
  readSoundEvent,
  readSoundSource,
  readStatType,
  readVillagerProfession,
  readVillagerType,
  RecipeBookType,
  recipeBookTypeEnum,
  ResourceLocation,
  SignedMessageHeader,
  SoundEvent,
  soundEventEnum,
  SoundSource,
  soundSourceEnum,
  StatType,
  statTypeEnum,
  VillagerProfession,
  villagerProfessionEnum,
  VillagerType,
  villagerTypeEnum,
  writeBlock,
  writeBlockEntityType,
  writeBlockPos,
  writeBlockState,
  writeCatVariant,
  writeChatFormatting,
  writeChatType,
  writeChatTypeBound,
  writeChunkData,
  writeCommandArgument,
  writeCommandNode,
  writeCustomStat,
  writeDifficulty,
  writeDirection,
  writeEntityType,
  writeEquipmentSlot,
  writeFilterMask,
  writeFrogVariant,
  writeGameMode,
  writeGameProfile,
  writeGlobalPos,
  writeInteractionHand,
  writeItem,
  writeItemStack,
  writeLightData,
  writeMenu,
  writeMerchantOffer,
  writeMerchantOffers,
  writeMobEffect,
  writePaintingVariant,
  writeParticleType,
  writePlayerChatMessage,
  writePositionSource,
  writeProfilePublicKey,
  writeProperties,
  writeRecipeBookType,
  writeResourceLocation,
  writeSignedMessageBody,
  writeSignedMessageHeader,
  writeSoundEvent,
  writeSoundSource,
  writeStatType,
  writeVillagerProfession,
  writeVillagerType,
} from "../types.ts";

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
    | { type: "minecraft:custom"; customStat: CustomStat };
  value: number;
};

export type BossBarOperation =
  | { type: "add"; name: Component; progress: number; color: BossBarColor; overlay: BossBarOverlay; darkenScreen: boolean; playMusic: boolean; createWorldFog: boolean }
  | { type: "remove" }
  | { type: "update_progress"; progress: number }
  | { type: "update_name"; name: Component }
  | { type: "update_style"; color: BossBarColor; overlay: BossBarOverlay }
  | { type: "update_properties"; darkenScreen: boolean; playMusic: boolean; createWorldFog: boolean };

export type BossBarColor = "pink" | "blue" | "red" | "green" | "yellow" | "purple" | "white";

export const bossBarColorEnum = createEnumMapper<BossBarColor>(["pink", "blue", "red", "green", "yellow", "purple", "white"]);

export type BossBarOverlay = "progress" | "notched_6" | "notched_10" | "notched_12" | "notched_20";

export const bossBarOverlayEnum = createEnumMapper<BossBarOverlay>(["progress", "notched_6", "notched_10", "notched_12", "notched_20"]);

export type Suggestion = { text: string; tooltip: Component | null };

export type CustomChatCompletionsAction = "add" | "remove" | "set";

export const customChatCompletionsActionEnum = createEnumMapper<CustomChatCompletionsAction>(["add", "remove", "set"]);

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

export const gameEventEnum = createEnumMapper<GameEvent>([
  "no_respawn_block_available",
  "start_raining",
  "stop_raining",
  "change_game_mode",
  "win_game",
  "demo_event",
  "arrow_hit_player",
  "rain_level_change",
  "thunder_level_change",
  "puffer_fish_sting",
  "guardian_elder_effect",
  "immediate_respawn",
]);

export type ParticleOptions =
  | { type: "minecraft:ambient_entity_effect" }
  | { type: "minecraft:angry_villager" }
  | { type: "minecraft:block"; state: BlockState }
  | { type: "minecraft:block_marker"; state: BlockState }
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
  | { type: "minecraft:dust_color_transition"; fromColor: { r: number; g: number; b: number }; scale: number; toColor: { r: number; g: number; b: number } }
  | { type: "minecraft:effect" }
  | { type: "minecraft:elder_guardian" }
  | { type: "minecraft:enchanted_hit" }
  | { type: "minecraft:enchant" }
  | { type: "minecraft:end_rod" }
  | { type: "minecraft:entity_effect" }
  | { type: "minecraft:explosion_emitter" }
  | { type: "minecraft:explosion" }
  | { type: "minecraft:sonic_boom" }
  | { type: "minecraft:falling_dust"; state: BlockState }
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

export type GameType = "survival" | "creative" | "adventure" | "spectator";

export const gameTypeEnum = createEnumMapper<GameType>(["survival", "creative", "adventure", "spectator"]);

export type NullableGameType = GameType | null;

export type DimensionType = ResourceLocation;

export type MapDecoration = { type: MapDecorationType; x: number; y: number; rot: number; name: Component | null };

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

export const mapDecorationTypeEnum = createEnumMapper<MapDecorationType>(
  JSON.parse(
    `["player","frame","red_marker","blue_marker","target_x","target_point","player_off_map","player_off_limits","mansion","monument","banner_white","banner_orange","banner_magenta","banner_light_blue","banner_yellow","banner_lime","banner_pink","banner_gray","banner_light_gray","banner_cyan","banner_purple","banner_blue","banner_brown","banner_green","banner_red","banner_black","red_x"]`,
  ),
);

export type NullableMapPatch = { width: number; height: number; startX: number; startY: number; mapColors: Uint8Array } | null;

export type PlayerInfoUpdate =
  | { action: "add_player"; entries: { profile: GameProfile; gameMode: GameMode; latency: number; displayName: Component | null; publicKey: ProfilePublicKey | null }[] }
  | { action: "update_game_mode"; entries: { id: string; gameMode: GameMode }[] }
  | { action: "update_latency"; entries: { id: string; latency: number }[] }
  | { action: "update_display_name"; entries: { id: string; displayName: Component | null }[] }
  | { action: "remove_player"; entries: { id: string }[] };

export type EntityAnchor = "feet" | "eyes";

export const entityAnchorEnum = createEnumMapper<EntityAnchor>(["feet", "eyes"]);

export type RecipeBookSettings = { open: boolean; filtering: boolean };

export type RecipeAction =
  | { type: "init"; toHighlight: ResourceLocation[] }
  | { type: "add" }
  | { type: "remove" };

export const mapper3 = createEnumMapper(["init", "add", "remove"]);

export type SectionPos = { x: number; y: number; z: number };

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
  | { type: "optional_uuid"; uuid: string | null }
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

export const poseEnum = createEnumMapper<Pose>([
  "standing",
  "fall_flying",
  "sleeping",
  "swimming",
  "spin_attack",
  "crouching",
  "long_jumping",
  "dying",
  "croaking",
  "using_tongue",
  "roaring",
  "sniffing",
  "emerging",
  "digging",
]);

export type ObjectiveAction =
  | { type: "add"; displayName: Component; renderType: CriteriaRenderType }
  | { type: "remove" }
  | { type: "change"; displayName: Component; renderType: CriteriaRenderType };

export type CriteriaRenderType = "integer" | "hearts";

export const criteriaRenderTypeEnum = createEnumMapper<CriteriaRenderType>(["integer", "hearts"]);

export type ScoreboardAction =
  | { type: "update"; objective: string; score: number }
  | { type: "remove"; objective: string };

export type Advancement = { parentId: ResourceLocation | null; display: DisplayInfo | null; criteria: string[]; requirements: string[][] };

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

export const frameTypeEnum = createEnumMapper<FrameType>(["task", "challenge", "goal"]);

export type AdvancementProgress = Map<ResourceLocation, CriterionProgress>;

export type CriterionProgress = { obtainedAt: Date | null };

export const mapper4 = createEnumMapper(["addition", "multiply_base", "multiply_total"]);

export type Recipe = { id: ResourceLocation; serializer: RecipeSerializer };

export type RecipeSerializer =
  | { id: "minecraft:crafting_shaped"; width: number; height: number; group: string; ingredients: Ingredient[]; result: ItemStack }
  | { id: "minecraft:crafting_shapeless"; group: string; ingredients: Ingredient[]; result: ItemStack }
  | { id: "minecraft:crafting_special_armordye" }
  | { id: "minecraft:crafting_special_bookcloning" }
  | { id: "minecraft:crafting_special_mapcloning" }
  | { id: "minecraft:crafting_special_mapextending" }
  | { id: "minecraft:crafting_special_firework_rocket" }
  | { id: "minecraft:crafting_special_firework_star" }
  | { id: "minecraft:crafting_special_firework_star_fade" }
  | { id: "minecraft:crafting_special_tippedarrow" }
  | { id: "minecraft:crafting_special_bannerduplicate" }
  | { id: "minecraft:crafting_special_shielddecoration" }
  | { id: "minecraft:crafting_special_shulkerboxcoloring" }
  | { id: "minecraft:crafting_special_suspiciousstew" }
  | { id: "minecraft:crafting_special_repairitem" }
  | { id: "minecraft:smelting"; group: string; ingredient: Ingredient; result: ItemStack; experience: number; cookingTime: number }
  | { id: "minecraft:blasting"; group: string; ingredient: Ingredient; result: ItemStack; experience: number; cookingTime: number }
  | { id: "minecraft:smoking"; group: string; ingredient: Ingredient; result: ItemStack; experience: number; cookingTime: number }
  | { id: "minecraft:campfire_cooking"; group: string; ingredient: Ingredient; result: ItemStack; experience: number; cookingTime: number }
  | { id: "minecraft:stonecutting"; group: string; ingredient: Ingredient; result: ItemStack }
  | { id: "minecraft:smithing"; base: Ingredient; addition: Ingredient; result: ItemStack };

export type Ingredient = ItemStack[];

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
    public id: number,
    public uuid: string,
    public type: EntityType,
    public x: number,
    public y: number,
    public z: number,
    public xRot: number,
    public yRot: number,
    public yHeadRot: number,
    public data: number,
    public xa: number,
    public ya: number,
    public za: number,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    const uuid = reader.readUuid();
    const type = readEntityType(reader);
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const xRot = reader.readByte();
    const yRot = reader.readByte();
    const yHeadRot = reader.readByte();
    const data = reader.readVarInt();
    const xa = reader.readShort();
    const ya = reader.readShort();
    const za = reader.readShort();
    return new this(id, uuid, type, x, y, z, xRot, yRot, yHeadRot, data, xa, ya, za);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    writer.writeUuid(this.uuid);
    writeEntityType(writer, this.type);
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeByte(this.xRot);
    writer.writeByte(this.yRot);
    writer.writeByte(this.yHeadRot);
    writer.writeVarInt(this.data);
    writer.writeShort(this.xa);
    writer.writeShort(this.ya);
    writer.writeShort(this.za);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleAddEntity?.(this);
  }
}

export class ClientboundAddExperienceOrbPacket implements Packet<ClientGameHandler> {
  constructor(
    public id: number,
    public x: number,
    public y: number,
    public z: number,
    public value: number,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const value = reader.readShort();
    return new this(id, x, y, z, value);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeShort(this.value);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleAddExperienceOrb?.(this);
  }
}

export class ClientboundAddPlayerPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public playerId: string,
    public x: number,
    public y: number,
    public z: number,
    public yRot: number,
    public xRot: number,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const playerId = reader.readUuid();
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const yRot = reader.readByte();
    const xRot = reader.readByte();
    return new this(entityId, playerId, x, y, z, yRot, xRot);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeUuid(this.playerId);
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeByte(this.yRot);
    writer.writeByte(this.xRot);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleAddPlayer?.(this);
  }
}

export class ClientboundAnimatePacket implements Packet<ClientGameHandler> {
  constructor(
    public id: number,
    public action: number,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    const action = reader.readUnsignedByte();
    return new this(id, action);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    writer.writeUnsignedByte(this.action);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleAnimate?.(this);
  }
}

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
        | { type: "minecraft:custom"; customStat: CustomStat };
      switch (readStatType(reader)) {
        case "minecraft:mined":
          result = { type: "minecraft:mined", block: readBlock(reader) };
          break;
        case "minecraft:crafted":
          result = { type: "minecraft:crafted", item: readItem(reader) };
          break;
        case "minecraft:used":
          result = { type: "minecraft:used", item: readItem(reader) };
          break;
        case "minecraft:broken":
          result = { type: "minecraft:broken", item: readItem(reader) };
          break;
        case "minecraft:picked_up":
          result = { type: "minecraft:picked_up", item: readItem(reader) };
          break;
        case "minecraft:dropped":
          result = { type: "minecraft:dropped", item: readItem(reader) };
          break;
        case "minecraft:killed":
          result = { type: "minecraft:killed", entityType: readEntityType(reader) };
          break;
        case "minecraft:killed_by":
          result = { type: "minecraft:killed_by", entityType: readEntityType(reader) };
          break;
        case "minecraft:custom":
          result = { type: "minecraft:custom", customStat: readCustomStat(reader) };
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
          writeStatType(writer, "minecraft:mined");
          writeBlock(writer, item.stat.block);
          break;
        }
        case "minecraft:crafted": {
          writeStatType(writer, "minecraft:crafted");
          writeItem(writer, item.stat.item);
          break;
        }
        case "minecraft:used": {
          writeStatType(writer, "minecraft:used");
          writeItem(writer, item.stat.item);
          break;
        }
        case "minecraft:broken": {
          writeStatType(writer, "minecraft:broken");
          writeItem(writer, item.stat.item);
          break;
        }
        case "minecraft:picked_up": {
          writeStatType(writer, "minecraft:picked_up");
          writeItem(writer, item.stat.item);
          break;
        }
        case "minecraft:dropped": {
          writeStatType(writer, "minecraft:dropped");
          writeItem(writer, item.stat.item);
          break;
        }
        case "minecraft:killed": {
          writeStatType(writer, "minecraft:killed");
          writeEntityType(writer, item.stat.entityType);
          break;
        }
        case "minecraft:killed_by": {
          writeStatType(writer, "minecraft:killed_by");
          writeEntityType(writer, item.stat.entityType);
          break;
        }
        case "minecraft:custom": {
          writeStatType(writer, "minecraft:custom");
          writeCustomStat(writer, item.stat.customStat);
          break;
        }
        default:
          throw new Error("Invalid tag");
      }
      writer.writeVarInt(item.value);
    }
  }
  handle(handler: ClientGameHandler) {
    return handler.handleAwardStats?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleBlockChangedAck?.(this);
  }
}

export class ClientboundBlockDestructionPacket implements Packet<ClientGameHandler> {
  constructor(
    public id: number,
    public pos: BlockPos,
    public progress: number,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    const pos = readBlockPos(reader);
    const progress = reader.readUnsignedByte();
    return new this(id, pos, progress);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    writeBlockPos(writer, this.pos);
    writer.writeUnsignedByte(this.progress);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleBlockDestruction?.(this);
  }
}

export class ClientboundBlockEntityDataPacket implements Packet<ClientGameHandler> {
  constructor(
    public pos: BlockPos,
    public type: BlockEntityType,
    public tag: CompoundTag | null,
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    const type = readBlockEntityType(reader);
    const tag = reader.readCompoundTag();
    return new this(pos, type, tag);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writeBlockEntityType(writer, this.type);
    writer.writeCompoundTag(this.tag);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleBlockEntityData?.(this);
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
    const block = readBlock(reader);
    return new this(pos, type, param, block);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writer.writeUnsignedByte(this.type);
    writer.writeUnsignedByte(this.param);
    writeBlock(writer, this.block);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleBlockEvent?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleBlockUpdate?.(this);
  }
}

export class ClientboundBossEventPacket implements Packet<ClientGameHandler> {
  constructor(
    public id: string,
    public operation: BossBarOperation,
  ) {}
  static read(reader: Reader) {
    const id = reader.readUuid();
    let result: BossBarOperation;
    switch (reader.readVarInt()) {
      case 0: {
        const type = "add";
        const name = reader.readJson();
        const progress = reader.readFloat();
        const color = bossBarColorEnum.fromId(reader.readVarInt());
        const overlay = bossBarOverlayEnum.fromId(reader.readVarInt());
        const flags = reader.readByte();
        result = { type, name, progress, color, overlay, darkenScreen: (flags & 0x1) > 0, playMusic: (flags & 0x2) > 0, createWorldFog: (flags & 0x4) > 0 };
        break;
      }
      case 1:
        result = { type: "remove" };
        break;
      case 2:
        result = { type: "update_progress", progress: reader.readFloat() };
        break;
      case 3:
        result = { type: "update_name", name: reader.readJson() };
        break;
      case 4:
        result = { type: "update_style", color: bossBarColorEnum.fromId(reader.readVarInt()), overlay: bossBarOverlayEnum.fromId(reader.readVarInt()) };
        break;
      case 5: {
        const type = "update_properties";
        const flags = reader.readByte();
        result = { type, darkenScreen: (flags & 0x1) > 0, playMusic: (flags & 0x2) > 0, createWorldFog: (flags & 0x4) > 0 };
        break;
      }
      default:
        throw new Error("Invalid tag id");
    }
    const operation = result;
    return new this(id, operation);
  }
  write(writer: Writer) {
    writer.writeUuid(this.id);
    switch (this.operation.type) {
      case "add": {
        writer.writeVarInt(0);
        writer.writeJson(this.operation.name);
        writer.writeFloat(this.operation.progress);
        writer.writeVarInt(bossBarColorEnum.toId(this.operation.color));
        writer.writeVarInt(bossBarOverlayEnum.toId(this.operation.overlay));
        writer.writeByte((-this.operation.darkenScreen & 0x1) | (-this.operation.playMusic & 0x2) | (-this.operation.createWorldFog & 0x4));
        break;
      }
      case "remove": {
        writer.writeVarInt(1);
        break;
      }
      case "update_progress": {
        writer.writeVarInt(2);
        writer.writeFloat(this.operation.progress);
        break;
      }
      case "update_name": {
        writer.writeVarInt(3);
        writer.writeJson(this.operation.name);
        break;
      }
      case "update_style": {
        writer.writeVarInt(4);
        writer.writeVarInt(bossBarColorEnum.toId(this.operation.color));
        writer.writeVarInt(bossBarOverlayEnum.toId(this.operation.overlay));
        break;
      }
      case "update_properties": {
        writer.writeVarInt(5);
        writer.writeByte((-this.operation.darkenScreen & 0x1) | (-this.operation.playMusic & 0x2) | (-this.operation.createWorldFog & 0x4));
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  handle(handler: ClientGameHandler) {
    return handler.handleBossEvent?.(this);
  }
}

export class ClientboundChangeDifficultyPacket implements Packet<ClientGameHandler> {
  constructor(
    public difficulty: Difficulty,
    public locked: boolean,
  ) {}
  static read(reader: Reader) {
    const difficulty = readDifficulty(reader);
    const locked = reader.readBoolean();
    return new this(difficulty, locked);
  }
  write(writer: Writer) {
    writeDifficulty(writer, this.difficulty);
    writer.writeBoolean(this.locked);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleChangeDifficulty?.(this);
  }
}

export class ClientboundChatPreviewPacket implements Packet<ClientGameHandler> {
  constructor(
    public queryId: number,
    public preview: Component | null,
  ) {}
  static read(reader: Reader) {
    const queryId = reader.readInt();
    const preview = reader.readBoolean() ? reader.readJson() : null;
    return new this(queryId, preview);
  }
  write(writer: Writer) {
    writer.writeInt(this.queryId);
    writer.writeBoolean(this.preview != null);
    if (this.preview != null) writer.writeJson(this.preview);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleChatPreview?.(this);
  }
}

export class ClientboundClearTitlesPacket implements Packet<ClientGameHandler> {
  constructor(
    public resetTimes: boolean,
  ) {}
  static read(reader: Reader) {
    const resetTimes = reader.readBoolean();
    return new this(resetTimes);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.resetTimes);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleClearTitles?.(this);
  }
}

export class ClientboundCommandSuggestionsPacket implements Packet<ClientGameHandler> {
  constructor(
    public id: number,
    public rangeStart: number,
    public rangeLength: number,
    public suggestions: Suggestion[],
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    const rangeStart = reader.readVarInt();
    const rangeLength = reader.readVarInt();
    const list: Suggestion[] = [];
    for (let i = reader.readVarInt(); i--;) list.push({ text: reader.readString(), tooltip: reader.readBoolean() ? reader.readJson() : null });
    const suggestions = list;
    return new this(id, rangeStart, rangeLength, suggestions);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    writer.writeVarInt(this.rangeStart);
    writer.writeVarInt(this.rangeLength);
    writer.writeVarInt(this.suggestions.length);
    for (const item of this.suggestions) {
      writer.writeString(item.text);
      writer.writeBoolean(item.tooltip != null);
      if (item.tooltip != null) writer.writeJson(item.tooltip);
    }
  }
  handle(handler: ClientGameHandler) {
    return handler.handleCommandSuggestions?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleCommands?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleContainerClose?.(this);
  }
}

export class ClientboundContainerSetContentPacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    public stateId: number,
    public items: ItemStack[],
    public carriedItem: ItemStack,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readUnsignedByte();
    const stateId = reader.readVarInt();
    const list: Ingredient = [];
    for (let i = reader.readVarInt(); i--;) list.push(readItemStack(reader));
    const items = list;
    const carriedItem = readItemStack(reader);
    return new this(containerId, stateId, items, carriedItem);
  }
  write(writer: Writer) {
    writer.writeUnsignedByte(this.containerId);
    writer.writeVarInt(this.stateId);
    writer.writeVarInt(this.items.length);
    for (const item of this.items) writeItemStack(writer, item);
    writeItemStack(writer, this.carriedItem);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleContainerSetContent?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleContainerSetData?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleContainerSetSlot?.(this);
  }
}

export class ClientboundCooldownPacket implements Packet<ClientGameHandler> {
  constructor(
    public item: Item,
    public duration: number,
  ) {}
  static read(reader: Reader) {
    const item = readItem(reader);
    const duration = reader.readVarInt();
    return new this(item, duration);
  }
  write(writer: Writer) {
    writeItem(writer, this.item);
    writer.writeVarInt(this.duration);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleCooldown?.(this);
  }
}

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
  handle(handler: ClientGameHandler) {
    return handler.handleCustomChatCompletions?.(this);
  }
}

export class ClientboundCustomPayloadPacket implements Packet<ClientGameHandler> {
  constructor(
    public identifier: ResourceLocation,
    public data: Uint8Array,
  ) {}
  static read(reader: Reader) {
    const identifier = readResourceLocation(reader);
    const data = reader.read(reader.unreadBytes);
    return new this(identifier, data);
  }
  write(writer: Writer) {
    writeResourceLocation(writer, this.identifier);
    writer.write(this.data);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleCustomPayload?.(this);
  }
}

export class ClientboundCustomSoundPacket implements Packet<ClientGameHandler> {
  constructor(
    public name: ResourceLocation,
    public source: SoundSource,
    public x: number,
    public y: number,
    public z: number,
    public volume: number,
    public pitch: number,
    public seed: bigint,
  ) {}
  static read(reader: Reader) {
    const name = readResourceLocation(reader);
    const source = readSoundSource(reader);
    const x = reader.readInt();
    const y = reader.readInt();
    const z = reader.readInt();
    const volume = reader.readFloat();
    const pitch = reader.readFloat();
    const seed = reader.readLong();
    return new this(name, source, x, y, z, volume, pitch, seed);
  }
  write(writer: Writer) {
    writeResourceLocation(writer, this.name);
    writeSoundSource(writer, this.source);
    writer.writeInt(this.x);
    writer.writeInt(this.y);
    writer.writeInt(this.z);
    writer.writeFloat(this.volume);
    writer.writeFloat(this.pitch);
    writer.writeLong(this.seed);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleCustomSound?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleDeleteChat?.(this);
  }
}

export class ClientboundDisconnectPacket implements Packet<ClientGameHandler> {
  constructor(
    public reason: Component,
  ) {}
  static read(reader: Reader) {
    const reason = reader.readJson();
    return new this(reason);
  }
  write(writer: Writer) {
    writer.writeJson(this.reason);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleDisconnect?.(this);
  }
}

export class ClientboundEntityEventPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
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
  handle(handler: ClientGameHandler) {
    return handler.handleEntityEvent?.(this);
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
    for (let i = reader.readVarInt(); i--;) list.push({ x: reader.readByte(), y: reader.readByte(), z: reader.readByte() });
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
  handle(handler: ClientGameHandler) {
    return handler.handleExplode?.(this);
  }
}

export class ClientboundForgetLevelChunkPacket implements Packet<ClientGameHandler> {
  constructor(
    public x: number,
    public z: number,
  ) {}
  static read(reader: Reader) {
    const x = reader.readInt();
    const z = reader.readInt();
    return new this(x, z);
  }
  write(writer: Writer) {
    writer.writeInt(this.x);
    writer.writeInt(this.z);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleForgetLevelChunk?.(this);
  }
}

export class ClientboundGameEventPacket implements Packet<ClientGameHandler> {
  constructor(
    public event: GameEvent,
    public param: number,
  ) {}
  static read(reader: Reader) {
    const event = gameEventEnum.fromId(reader.readUnsignedByte());
    const param = reader.readFloat();
    return new this(event, param);
  }
  write(writer: Writer) {
    writer.writeUnsignedByte(gameEventEnum.toId(this.event));
    writer.writeFloat(this.param);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleGameEvent?.(this);
  }
}

export class ClientboundHorseScreenOpenPacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    public size: number,
    public entityId: number,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readUnsignedByte();
    const size = reader.readVarInt();
    const entityId = reader.readInt();
    return new this(containerId, size, entityId);
  }
  write(writer: Writer) {
    writer.writeUnsignedByte(this.containerId);
    writer.writeVarInt(this.size);
    writer.writeInt(this.entityId);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleHorseScreenOpen?.(this);
  }
}

export class ClientboundInitializeBorderPacket implements Packet<ClientGameHandler> {
  constructor(
    public newCenterX: number,
    public newCenterZ: number,
    public oldSize: number,
    public newSize: number,
    public lerpTime: bigint,
    public newAbsoluteMaxSize: number,
    public warningBlocks: number,
    public warningTime: number,
  ) {}
  static read(reader: Reader) {
    const newCenterX = reader.readDouble();
    const newCenterZ = reader.readDouble();
    const oldSize = reader.readDouble();
    const newSize = reader.readDouble();
    const lerpTime = reader.readVarLong();
    const newAbsoluteMaxSize = reader.readVarInt();
    const warningBlocks = reader.readVarInt();
    const warningTime = reader.readVarInt();
    return new this(newCenterX, newCenterZ, oldSize, newSize, lerpTime, newAbsoluteMaxSize, warningBlocks, warningTime);
  }
  write(writer: Writer) {
    writer.writeDouble(this.newCenterX);
    writer.writeDouble(this.newCenterZ);
    writer.writeDouble(this.oldSize);
    writer.writeDouble(this.newSize);
    writer.writeVarLong(this.lerpTime);
    writer.writeVarInt(this.newAbsoluteMaxSize);
    writer.writeVarInt(this.warningBlocks);
    writer.writeVarInt(this.warningTime);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleInitializeBorder?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleKeepAlive?.(this);
  }
}

export class ClientboundLevelChunkWithLightPacket implements Packet<ClientGameHandler> {
  constructor(
    public x: number,
    public z: number,
    public chunkData: ChunkData,
    public lightData: LightData,
  ) {}
  static read(reader: Reader) {
    const x = reader.readInt();
    const z = reader.readInt();
    const chunkData = readChunkData(reader);
    const lightData = readLightData(reader);
    return new this(x, z, chunkData, lightData);
  }
  write(writer: Writer) {
    writer.writeInt(this.x);
    writer.writeInt(this.z);
    writeChunkData(writer, this.chunkData);
    writeLightData(writer, this.lightData);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleLevelChunkWithLight?.(this);
  }
}

export class ClientboundLevelEventPacket implements Packet<ClientGameHandler> {
  constructor(
    public type: number,
    public pos: BlockPos,
    public data: number,
    public globalEvent: boolean,
  ) {}
  static read(reader: Reader) {
    const type = reader.readInt();
    const pos = readBlockPos(reader);
    const data = reader.readInt();
    const globalEvent = reader.readBoolean();
    return new this(type, pos, data, globalEvent);
  }
  write(writer: Writer) {
    writer.writeInt(this.type);
    writeBlockPos(writer, this.pos);
    writer.writeInt(this.data);
    writer.writeBoolean(this.globalEvent);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleLevelEvent?.(this);
  }
}

export class ClientboundLevelParticlesPacket implements Packet<ClientGameHandler> {
  constructor(
    public overrideLimiter: boolean,
    public x: number,
    public y: number,
    public z: number,
    public xDist: number,
    public yDist: number,
    public zDist: number,
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
    const xDist = reader.readFloat();
    const yDist = reader.readFloat();
    const zDist = reader.readFloat();
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
        result = { type: "minecraft:block", state: readBlockState(reader) };
        break;
      case 3:
        result = { type: "minecraft:block_marker", state: readBlockState(reader) };
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
        result = { type: "minecraft:dust", color: { r: reader.readFloat(), g: reader.readFloat(), b: reader.readFloat() }, scale: reader.readFloat() };
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
        result = { type: "minecraft:falling_dust", state: readBlockState(reader) };
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
        result = { type: "minecraft:vibration", destination: readPositionSource(reader), arrivalInTicks: reader.readVarInt() };
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
    return new this(overrideLimiter, x, y, z, xDist, yDist, zDist, maxSpeed, count, particle);
  }
  write(writer: Writer) {
    writeParticleType(writer, this.particle.type);
    writer.writeBoolean(this.overrideLimiter);
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeFloat(this.xDist);
    writer.writeFloat(this.yDist);
    writer.writeFloat(this.zDist);
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
        writeBlockState(writer, this.particle.state);
        break;
      }
      case "minecraft:block_marker": {
        writeBlockState(writer, this.particle.state);
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
        writeBlockState(writer, this.particle.state);
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
  handle(handler: ClientGameHandler) {
    return handler.handleLevelParticles?.(this);
  }
}

export class ClientboundLightUpdatePacket implements Packet<ClientGameHandler> {
  constructor(
    public x: number,
    public z: number,
    public lightData: LightData,
  ) {}
  static read(reader: Reader) {
    const x = reader.readVarInt();
    const z = reader.readVarInt();
    const lightData = readLightData(reader);
    return new this(x, z, lightData);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.x);
    writer.writeVarInt(this.z);
    writeLightData(writer, this.lightData);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleLightUpdate?.(this);
  }
}

export class ClientboundLoginPacket implements Packet<ClientGameHandler> {
  constructor(
    public playerId: number,
    public hardcore: boolean,
    public gameType: GameType,
    public previousGameType: NullableGameType,
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
    const playerId = reader.readInt();
    const hardcore = reader.readBoolean();
    const gameType = gameTypeEnum.fromId(reader.readByte());
    let gameType1: GameType | null = null;
    const bytes = reader.read(reader.unreadBytes);
    reader = new Reader(bytes);
    if (new Reader(bytes).readByte() != -1) {
      gameType1 = gameTypeEnum.fromId(reader.readByte());
    } else {
      reader.readByte();
    }
    const previousGameType = gameType1;
    const list: Dimension[] = [];
    for (let i = reader.readVarInt(); i--;) list.push(readResourceLocation(reader));
    const levels = list;
    const registryHolder = reader.readCompoundTag();
    const dimensionType = readResourceLocation(reader);
    const dimension = readResourceLocation(reader);
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
      playerId,
      hardcore,
      gameType,
      previousGameType,
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
    writer.writeInt(this.playerId);
    writer.writeBoolean(this.hardcore);
    writer.writeByte(gameTypeEnum.toId(this.gameType));
    if (this.previousGameType != null) {
      writer.writeByte(gameTypeEnum.toId(this.previousGameType));
    } else {
      writer.writeByte(-1);
    }
    writer.writeVarInt(this.levels.length);
    for (const item of this.levels) writeResourceLocation(writer, item);
    writer.writeCompoundTag(this.registryHolder);
    writeResourceLocation(writer, this.dimensionType);
    writeResourceLocation(writer, this.dimension);
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
  handle(handler: ClientGameHandler) {
    return handler.handleLogin?.(this);
  }
}

export class ClientboundMapItemDataPacket implements Packet<ClientGameHandler> {
  constructor(
    public mapId: number,
    public scale: number,
    public locked: boolean,
    public decorations: MapDecoration[] | null,
    public colorPatch: NullableMapPatch,
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
          y: reader.readByte(),
          rot: reader.readByte(),
          name: reader.readBoolean() ? reader.readJson() : null,
        });
      }
      value = list;
    }
    const decorations = value;
    let patch: { width: number; height: number; startX: number; startY: number; mapColors: Uint8Array } | null = null;
    const width = reader.readByte();
    if (width != 0) {
      patch = { width, height: reader.readByte(), startX: reader.readByte(), startY: reader.readByte(), mapColors: reader.readByteArray() };
    }
    const colorPatch = patch;
    return new this(mapId, scale, locked, decorations, colorPatch);
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
        writer.writeByte(item.y);
        writer.writeByte(item.rot);
        writer.writeBoolean(item.name != null);
        if (item.name != null) writer.writeJson(item.name);
      }
    }
    if (this.colorPatch != null) {
      writer.writeByte(this.colorPatch.width);
      writer.writeByte(this.colorPatch.height);
      writer.writeByte(this.colorPatch.startX);
      writer.writeByte(this.colorPatch.startY);
      writer.writeByteArray(this.colorPatch.mapColors);
    } else {
      writer.writeByte(0);
    }
  }
  handle(handler: ClientGameHandler) {
    return handler.handleMapItemData?.(this);
  }
}

export class ClientboundMerchantOffersPacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    public offers: MerchantOffers,
    public villagerLevel: number,
    public villagerXp: number,
    public showProgress: boolean,
    public canRestock: boolean,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readVarInt();
    const offers = readMerchantOffers(reader);
    const villagerLevel = reader.readVarInt();
    const villagerXp = reader.readVarInt();
    const showProgress = reader.readBoolean();
    const canRestock = reader.readBoolean();
    return new this(containerId, offers, villagerLevel, villagerXp, showProgress, canRestock);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.containerId);
    writeMerchantOffers(writer, this.offers);
    writer.writeVarInt(this.villagerLevel);
    writer.writeVarInt(this.villagerXp);
    writer.writeBoolean(this.showProgress);
    writer.writeBoolean(this.canRestock);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleMerchantOffers?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleMoveEntityPos?.(this);
  }
}

export class ClientboundMoveEntityPosRotPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public x: number,
    public y: number,
    public z: number,
    public yRot: number,
    public xRot: number,
    public onGround: boolean,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const x = reader.readShort();
    const y = reader.readShort();
    const z = reader.readShort();
    const yRot = reader.readByte();
    const xRot = reader.readByte();
    const onGround = reader.readBoolean();
    return new this(entityId, x, y, z, yRot, xRot, onGround);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeShort(this.x);
    writer.writeShort(this.y);
    writer.writeShort(this.z);
    writer.writeByte(this.yRot);
    writer.writeByte(this.xRot);
    writer.writeBoolean(this.onGround);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleMoveEntityPosRot?.(this);
  }
}

export class ClientboundMoveEntityRotPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public yRot: number,
    public xRot: number,
    public onGround: boolean,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const yRot = reader.readByte();
    const xRot = reader.readByte();
    const onGround = reader.readBoolean();
    return new this(entityId, yRot, xRot, onGround);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeByte(this.yRot);
    writer.writeByte(this.xRot);
    writer.writeBoolean(this.onGround);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleMoveEntityRot?.(this);
  }
}

export class ClientboundMoveVehiclePacket implements Packet<ClientGameHandler> {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public yRot: number,
    public xRot: number,
  ) {}
  static read(reader: Reader) {
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const yRot = reader.readFloat();
    const xRot = reader.readFloat();
    return new this(x, y, z, yRot, xRot);
  }
  write(writer: Writer) {
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeFloat(this.yRot);
    writer.writeFloat(this.xRot);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleMoveVehicle?.(this);
  }
}

export class ClientboundOpenBookPacket implements Packet<ClientGameHandler> {
  constructor(
    public hand: InteractionHand,
  ) {}
  static read(reader: Reader) {
    const hand = readInteractionHand(reader);
    return new this(hand);
  }
  write(writer: Writer) {
    writeInteractionHand(writer, this.hand);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleOpenBook?.(this);
  }
}

export class ClientboundOpenScreenPacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    public type: Menu,
    public title: Component,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readVarInt();
    const type = readMenu(reader);
    const title = reader.readJson();
    return new this(containerId, type, title);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.containerId);
    writeMenu(writer, this.type);
    writer.writeJson(this.title);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleOpenScreen?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleOpenSignEditor?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handlePing?.(this);
  }
}

export class ClientboundPlaceGhostRecipePacket implements Packet<ClientGameHandler> {
  constructor(
    public containerId: number,
    public recipe: ResourceLocation,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readByte();
    const recipe = readResourceLocation(reader);
    return new this(containerId, recipe);
  }
  write(writer: Writer) {
    writer.writeByte(this.containerId);
    writeResourceLocation(writer, this.recipe);
  }
  handle(handler: ClientGameHandler) {
    return handler.handlePlaceGhostRecipe?.(this);
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
    const flags = { invulnerable: (flags1 & 0x1) > 0, isFlying: (flags1 & 0x2) > 0, canFly: (flags1 & 0x4) > 0, instabuild: (flags1 & 0x8) > 0 };
    const flyingSpeed = reader.readFloat();
    const walkingSpeed = reader.readFloat();
    return new this(flags, flyingSpeed, walkingSpeed);
  }
  write(writer: Writer) {
    writer.writeByte((-this.flags.invulnerable & 0x1) | (-this.flags.isFlying & 0x2) | (-this.flags.canFly & 0x4) | (-this.flags.instabuild & 0x8));
    writer.writeFloat(this.flyingSpeed);
    writer.writeFloat(this.walkingSpeed);
  }
  handle(handler: ClientGameHandler) {
    return handler.handlePlayerAbilities?.(this);
  }
}

export class ClientboundPlayerChatHeaderPacket implements Packet<ClientGameHandler> {
  constructor(
    public header: SignedMessageHeader,
    public headerSignature: MessageSignature,
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
  handle(handler: ClientGameHandler) {
    return handler.handlePlayerChatHeader?.(this);
  }
}

export class ClientboundPlayerChatPacket implements Packet<ClientGameHandler> {
  constructor(
    public message: PlayerChatMessage,
    public chatType: ChatTypeBound,
  ) {}
  static read(reader: Reader) {
    const message = readPlayerChatMessage(reader);
    const chatType = readChatTypeBound(reader);
    return new this(message, chatType);
  }
  write(writer: Writer) {
    writePlayerChatMessage(writer, this.message);
    writeChatTypeBound(writer, this.chatType);
  }
  handle(handler: ClientGameHandler) {
    return handler.handlePlayerChat?.(this);
  }
}

export class ClientboundPlayerCombatEndPacket implements Packet<ClientGameHandler> {
  constructor(
    public duration: number,
    public killedId: number,
  ) {}
  static read(reader: Reader) {
    const duration = reader.readVarInt();
    const killedId = reader.readInt();
    return new this(duration, killedId);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.duration);
    writer.writeInt(this.killedId);
  }
  handle(handler: ClientGameHandler) {
    return handler.handlePlayerCombatEnd?.(this);
  }
}

export class ClientboundPlayerCombatEnterPacket implements Packet<ClientGameHandler> {
  constructor() {}
  static read(reader: Reader) {
    return new this();
  }
  write(writer: Writer) {
  }
  handle(handler: ClientGameHandler) {
    return handler.handlePlayerCombatEnter?.(this);
  }
}

export class ClientboundPlayerCombatKillPacket implements Packet<ClientGameHandler> {
  constructor(
    public playerId: number,
    public killerId: number,
    public message: Component,
  ) {}
  static read(reader: Reader) {
    const playerId = reader.readVarInt();
    const killerId = reader.readInt();
    const message = reader.readJson();
    return new this(playerId, killerId, message);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.playerId);
    writer.writeInt(this.killerId);
    writer.writeJson(this.message);
  }
  handle(handler: ClientGameHandler) {
    return handler.handlePlayerCombatKill?.(this);
  }
}

export class ClientboundPlayerInfoPacket implements Packet<ClientGameHandler> {
  constructor(
    public update: PlayerInfoUpdate,
  ) {}
  static read(reader: Reader) {
    let result: PlayerInfoUpdate;
    switch (reader.readVarInt()) {
      case 0: {
        const action = "add_player";
        const list: { profile: GameProfile; gameMode: GameMode; latency: number; displayName: Component | null; publicKey: ProfilePublicKey | null }[] = [];
        for (let i = reader.readVarInt(); i--;) {
          list.push({
            profile: readGameProfile(reader),
            gameMode: readGameMode(reader),
            latency: reader.readVarInt(),
            displayName: reader.readBoolean() ? reader.readJson() : null,
            publicKey: reader.readBoolean() ? readProfilePublicKey(reader) : null,
          });
        }
        result = { action, entries: list };
        break;
      }
      case 1: {
        const action = "update_game_mode";
        const list: { id: string; gameMode: GameMode }[] = [];
        for (let i = reader.readVarInt(); i--;) list.push({ id: reader.readUuid(), gameMode: readGameMode(reader) });
        result = { action, entries: list };
        break;
      }
      case 2: {
        const action = "update_latency";
        const list: { id: string; latency: number }[] = [];
        for (let i = reader.readVarInt(); i--;) list.push({ id: reader.readUuid(), latency: reader.readVarInt() });
        result = { action, entries: list };
        break;
      }
      case 3: {
        const action = "update_display_name";
        const list: { id: string; displayName: Component | null }[] = [];
        for (let i = reader.readVarInt(); i--;) list.push({ id: reader.readUuid(), displayName: reader.readBoolean() ? reader.readJson() : null });
        result = { action, entries: list };
        break;
      }
      case 4: {
        const action = "remove_player";
        const list: { id: string }[] = [];
        for (let i = reader.readVarInt(); i--;) list.push({ id: reader.readUuid() });
        result = { action, entries: list };
        break;
      }
      default:
        throw new Error("Invalid tag id");
    }
    const update = result;
    return new this(update);
  }
  write(writer: Writer) {
    switch (this.update.action) {
      case "add_player": {
        writer.writeVarInt(0);
        writer.writeVarInt(this.update.entries.length);
        for (const item of this.update.entries) {
          writeGameProfile(writer, item.profile);
          writeGameMode(writer, item.gameMode);
          writer.writeVarInt(item.latency);
          writer.writeBoolean(item.displayName != null);
          if (item.displayName != null) writer.writeJson(item.displayName);
          writer.writeBoolean(item.publicKey != null);
          if (item.publicKey != null) writeProfilePublicKey(writer, item.publicKey);
        }
        break;
      }
      case "update_game_mode": {
        writer.writeVarInt(1);
        writer.writeVarInt(this.update.entries.length);
        for (const item of this.update.entries) {
          writer.writeUuid(item.id);
          writeGameMode(writer, item.gameMode);
        }
        break;
      }
      case "update_latency": {
        writer.writeVarInt(2);
        writer.writeVarInt(this.update.entries.length);
        for (const item of this.update.entries) {
          writer.writeUuid(item.id);
          writer.writeVarInt(item.latency);
        }
        break;
      }
      case "update_display_name": {
        writer.writeVarInt(3);
        writer.writeVarInt(this.update.entries.length);
        for (const item of this.update.entries) {
          writer.writeUuid(item.id);
          writer.writeBoolean(item.displayName != null);
          if (item.displayName != null) writer.writeJson(item.displayName);
        }
        break;
      }
      case "remove_player": {
        writer.writeVarInt(4);
        writer.writeVarInt(this.update.entries.length);
        for (const item of this.update.entries) writer.writeUuid(item.id);
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  handle(handler: ClientGameHandler) {
    return handler.handlePlayerInfo?.(this);
  }
}

export class ClientboundPlayerLookAtPacket implements Packet<ClientGameHandler> {
  constructor(
    public fromAnchor: EntityAnchor,
    public x: number,
    public y: number,
    public z: number,
    public atEntity: { entity: number; toAnchor: EntityAnchor } | null,
  ) {}
  static read(reader: Reader) {
    const fromAnchor = entityAnchorEnum.fromId(reader.readVarInt());
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const atEntity = reader.readBoolean() ? { entity: reader.readVarInt(), toAnchor: entityAnchorEnum.fromId(reader.readVarInt()) } : null;
    return new this(fromAnchor, x, y, z, atEntity);
  }
  write(writer: Writer) {
    writer.writeVarInt(entityAnchorEnum.toId(this.fromAnchor));
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeBoolean(this.atEntity != null);
    if (this.atEntity != null) {
      writer.writeVarInt(this.atEntity.entity);
      writer.writeVarInt(entityAnchorEnum.toId(this.atEntity.toAnchor));
    }
  }
  handle(handler: ClientGameHandler) {
    return handler.handlePlayerLookAt?.(this);
  }
}

export class ClientboundPlayerPositionPacket implements Packet<ClientGameHandler> {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public yRot: number,
    public xRot: number,
    public relativeArguments: { x: boolean; y: boolean; z: boolean; yRot: boolean; xRot: boolean },
    public id: number,
    public dismountVehicle: boolean,
  ) {}
  static read(reader: Reader) {
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const yRot = reader.readFloat();
    const xRot = reader.readFloat();
    const flags = reader.readByte();
    const relativeArguments = { x: (flags & 0x1) > 0, y: (flags & 0x2) > 0, z: (flags & 0x4) > 0, yRot: (flags & 0x8) > 0, xRot: (flags & 0x10) > 0 };
    const id = reader.readVarInt();
    const dismountVehicle = reader.readBoolean();
    return new this(x, y, z, yRot, xRot, relativeArguments, id, dismountVehicle);
  }
  write(writer: Writer) {
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeFloat(this.yRot);
    writer.writeFloat(this.xRot);
    writer.writeByte(
      (-this.relativeArguments.x & 0x1) | (-this.relativeArguments.y & 0x2) | (-this.relativeArguments.z & 0x4) | (-this.relativeArguments.yRot & 0x8) | (-this.relativeArguments.xRot & 0x10),
    );
    writer.writeVarInt(this.id);
    writer.writeBoolean(this.dismountVehicle);
  }
  handle(handler: ClientGameHandler) {
    return handler.handlePlayerPosition?.(this);
  }
}

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
      map.set(Array.from<RecipeBookType>(["crafting", "furnace", "blast_furnace", "smoker"])[i]!, { open: reader.readBoolean(), filtering: reader.readBoolean() });
    }
    const bookSettings = map;
    const list: ResourceLocation[] = [];
    for (let i1 = reader.readVarInt(); i1--;) list.push(readResourceLocation(reader));
    const recipes = list;
    let result: RecipeAction;
    switch (action) {
      case 0: {
        const type = "init";
        const list1: ResourceLocation[] = [];
        for (let i2 = reader.readVarInt(); i2--;) list1.push(readResourceLocation(reader));
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
    writer.writeVarInt(mapper3.toId(this.action.type));
    for (const bookType of Array.from<RecipeBookType>(["crafting", "furnace", "blast_furnace", "smoker"])) {
      const settings = this.bookSettings.get(bookType);
      writer.writeBoolean(settings?.open ?? false);
      writer.writeBoolean(settings?.filtering ?? false);
    }
    writer.writeVarInt(this.recipes.length);
    for (const item of this.recipes) writeResourceLocation(writer, item);
    switch (this.action.type) {
      case "init": {
        writer.writeVarInt(this.action.toHighlight.length);
        for (const item1 of this.action.toHighlight) writeResourceLocation(writer, item1);
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
  handle(handler: ClientGameHandler) {
    return handler.handleRecipe?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleRemoveEntities?.(this);
  }
}

export class ClientboundRemoveMobEffectPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public effect: MobEffect,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const effect = readMobEffect(reader);
    return new this(entityId, effect);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writeMobEffect(writer, this.effect);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleRemoveMobEffect?.(this);
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
    const prompt = reader.readBoolean() ? reader.readJson() : null;
    return new this(url, hash, required, prompt);
  }
  write(writer: Writer) {
    writer.writeString(this.url);
    writer.writeString(this.hash);
    writer.writeBoolean(this.required);
    writer.writeBoolean(this.prompt != null);
    if (this.prompt != null) writer.writeJson(this.prompt);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleResourcePack?.(this);
  }
}

export class ClientboundRespawnPacket implements Packet<ClientGameHandler> {
  constructor(
    public dimensionType: DimensionType,
    public dimension: Dimension,
    public seed: bigint,
    public playerGameType: GameType,
    public previousPlayerGameType: NullableGameType,
    public isDebug: boolean,
    public isFlat: boolean,
    public keepAllPlayerData: boolean,
    public lastDeathLocation: GlobalPos | null,
  ) {}
  static read(reader: Reader) {
    const dimensionType = readResourceLocation(reader);
    const dimension = readResourceLocation(reader);
    const seed = reader.readLong();
    const playerGameType = gameTypeEnum.fromId(reader.readByte());
    let gameType: GameType | null = null;
    const bytes = reader.read(reader.unreadBytes);
    reader = new Reader(bytes);
    if (new Reader(bytes).readByte() != -1) {
      gameType = gameTypeEnum.fromId(reader.readByte());
    } else {
      reader.readByte();
    }
    const previousPlayerGameType = gameType;
    const isDebug = reader.readBoolean();
    const isFlat = reader.readBoolean();
    const keepAllPlayerData = reader.readBoolean();
    const lastDeathLocation = reader.readBoolean() ? readGlobalPos(reader) : null;
    return new this(dimensionType, dimension, seed, playerGameType, previousPlayerGameType, isDebug, isFlat, keepAllPlayerData, lastDeathLocation);
  }
  write(writer: Writer) {
    writeResourceLocation(writer, this.dimensionType);
    writeResourceLocation(writer, this.dimension);
    writer.writeLong(this.seed);
    writer.writeByte(gameTypeEnum.toId(this.playerGameType));
    if (this.previousPlayerGameType != null) {
      writer.writeByte(gameTypeEnum.toId(this.previousPlayerGameType));
    } else {
      writer.writeByte(-1);
    }
    writer.writeBoolean(this.isDebug);
    writer.writeBoolean(this.isFlat);
    writer.writeBoolean(this.keepAllPlayerData);
    writer.writeBoolean(this.lastDeathLocation != null);
    if (this.lastDeathLocation != null) writeGlobalPos(writer, this.lastDeathLocation);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleRespawn?.(this);
  }
}

export class ClientboundRotateHeadPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public yHeadRot: number,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const yHeadRot = reader.readByte();
    return new this(entityId, yHeadRot);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeByte(this.yHeadRot);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleRotateHead?.(this);
  }
}

export class ClientboundSectionBlocksUpdatePacket implements Packet<ClientGameHandler> {
  constructor(
    public sectionPos: SectionPos,
    public suppressLightUpdates: boolean,
    public blocks: { state: number; x: number; y: number; z: number }[],
  ) {}
  static read(reader: Reader) {
    const p = reader.readLong();
    const sectionPos = { x: Number(p >> 42n & 0x3fffffn) << 10 >> 10, y: Number(p >> 0n & 0xfffffn) << 12 >> 12, z: Number(p >> 20n & 0x3fffffn) << 10 >> 10 };
    const suppressLightUpdates = reader.readBoolean();
    const list: { state: number; x: number; y: number; z: number }[] = [];
    for (let i = reader.readVarInt(); i--;) {
      const p1 = reader.readVarLong();
      list.push({ state: Number(p1 >> 12n & 0xfffffn) << -20 >> -20, x: Number(p1 >> 8n & 0xfn) << 28 >> 28, y: Number(p1 >> 0n & 0xfn) << 28 >> 28, z: Number(p1 >> 4n & 0xfn) << 28 >> 28 });
    }
    const blocks = list;
    return new this(sectionPos, suppressLightUpdates, blocks);
  }
  write(writer: Writer) {
    writer.writeLong(BigInt(this.sectionPos.x & 0x3fffff) << 42n | BigInt(this.sectionPos.y & 0xfffff) << 0n | BigInt(this.sectionPos.z & 0x3fffff) << 20n);
    writer.writeBoolean(this.suppressLightUpdates);
    writer.writeVarInt(this.blocks.length);
    for (const item of this.blocks) writer.writeVarLong(BigInt(item.state & 0xfffff) << 12n | BigInt(item.x & 0xf) << 8n | BigInt(item.y & 0xf) << 0n | BigInt(item.z & 0xf) << 4n);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSectionBlocksUpdate?.(this);
  }
}

export class ClientboundSelectAdvancementsTabPacket implements Packet<ClientGameHandler> {
  constructor(
    public tab: ResourceLocation | null,
  ) {}
  static read(reader: Reader) {
    const tab = reader.readBoolean() ? readResourceLocation(reader) : null;
    return new this(tab);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.tab != null);
    if (this.tab != null) writeResourceLocation(writer, this.tab);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSelectAdvancementsTab?.(this);
  }
}

export class ClientboundServerDataPacket implements Packet<ClientGameHandler> {
  constructor(
    public motd: Component | null,
    public iconBase64: string | null,
    public previewsChat: boolean,
    public enforcesSecureChat: boolean,
  ) {}
  static read(reader: Reader) {
    const motd = reader.readBoolean() ? reader.readJson() : null;
    const iconBase64 = reader.readBoolean() ? reader.readString() : null;
    const previewsChat = reader.readBoolean();
    const enforcesSecureChat = reader.readBoolean();
    return new this(motd, iconBase64, previewsChat, enforcesSecureChat);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.motd != null);
    if (this.motd != null) writer.writeJson(this.motd);
    writer.writeBoolean(this.iconBase64 != null);
    if (this.iconBase64 != null) writer.writeString(this.iconBase64);
    writer.writeBoolean(this.previewsChat);
    writer.writeBoolean(this.enforcesSecureChat);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleServerData?.(this);
  }
}

export class ClientboundSetActionBarTextPacket implements Packet<ClientGameHandler> {
  constructor(
    public text: Component,
  ) {}
  static read(reader: Reader) {
    const text = reader.readJson();
    return new this(text);
  }
  write(writer: Writer) {
    writer.writeJson(this.text);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetActionBarText?.(this);
  }
}

export class ClientboundSetBorderCenterPacket implements Packet<ClientGameHandler> {
  constructor(
    public newCenterX: number,
    public newCenterZ: number,
  ) {}
  static read(reader: Reader) {
    const newCenterX = reader.readDouble();
    const newCenterZ = reader.readDouble();
    return new this(newCenterX, newCenterZ);
  }
  write(writer: Writer) {
    writer.writeDouble(this.newCenterX);
    writer.writeDouble(this.newCenterZ);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetBorderCenter?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetBorderLerpSize?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetBorderSize?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetBorderWarningDelay?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetBorderWarningDistance?.(this);
  }
}

export class ClientboundSetCameraPacket implements Packet<ClientGameHandler> {
  constructor(
    public cameraId: number,
  ) {}
  static read(reader: Reader) {
    const cameraId = reader.readVarInt();
    return new this(cameraId);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.cameraId);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetCamera?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetCarriedItem?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetChunkCacheCenter?.(this);
  }
}

export class ClientboundSetChunkCacheRadiusPacket implements Packet<ClientGameHandler> {
  constructor(
    public radius: number,
  ) {}
  static read(reader: Reader) {
    const radius = reader.readVarInt();
    return new this(radius);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.radius);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetChunkCacheRadius?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetDefaultSpawnPosition?.(this);
  }
}

export class ClientboundSetDisplayChatPreviewPacket implements Packet<ClientGameHandler> {
  constructor(
    public enabled: boolean,
  ) {}
  static read(reader: Reader) {
    const enabled = reader.readBoolean();
    return new this(enabled);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.enabled);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetDisplayChatPreview?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetDisplayObjective?.(this);
  }
}

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
          result = { type: "component", component: reader.readJson() };
          break;
        case 5:
          result = { type: "optional_component", component: reader.readBoolean() ? reader.readJson() : null };
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
          result = { type: "direction", direction: readDirection(reader) };
          break;
        case 12:
          result = { type: "optional_uuid", uuid: reader.readBoolean() ? reader.readUuid() : null };
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
          switch (readParticleType(reader)) {
            case "minecraft:ambient_entity_effect":
              result1 = { type: "minecraft:ambient_entity_effect" };
              break;
            case "minecraft:angry_villager":
              result1 = { type: "minecraft:angry_villager" };
              break;
            case "minecraft:block":
              result1 = { type: "minecraft:block", state: readBlockState(reader) };
              break;
            case "minecraft:block_marker":
              result1 = { type: "minecraft:block_marker", state: readBlockState(reader) };
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
              result1 = { type: "minecraft:dust", color: { r: reader.readFloat(), g: reader.readFloat(), b: reader.readFloat() }, scale: reader.readFloat() };
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
              result1 = { type: "minecraft:falling_dust", state: readBlockState(reader) };
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
              result1 = { type: "minecraft:vibration", destination: readPositionSource(reader), arrivalInTicks: reader.readVarInt() };
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
          result = { type: "villager_data", villagerType: readVillagerType(reader), profession: readVillagerProfession(reader), level: reader.readVarInt() };
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
          result = { type: "cat_variant", variant: readCatVariant(reader) };
          break;
        case 20:
          result = { type: "frog_variant", variant: readFrogVariant(reader) };
          break;
        case 21:
          result = { type: "optional_global_pos", globalPos: reader.readBoolean() ? readGlobalPos(reader) : null };
          break;
        case 22:
          result = { type: "painting_variant", variant: readPaintingVariant(reader) };
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
          writer.writeJson(data.component);
          break;
        }
        case "optional_component": {
          writer.writeVarInt(5);
          writer.writeBoolean(data.component != null);
          if (data.component != null) writer.writeJson(data.component);
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
          writeDirection(writer, data.direction);
          break;
        }
        case "optional_uuid": {
          writer.writeVarInt(12);
          writer.writeBoolean(data.uuid != null);
          if (data.uuid != null) writer.writeUuid(data.uuid);
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
              writeParticleType(writer, "minecraft:ambient_entity_effect");
              break;
            }
            case "minecraft:angry_villager": {
              writeParticleType(writer, "minecraft:angry_villager");
              break;
            }
            case "minecraft:block": {
              writeParticleType(writer, "minecraft:block");
              writeBlockState(writer, data.particle.state);
              break;
            }
            case "minecraft:block_marker": {
              writeParticleType(writer, "minecraft:block_marker");
              writeBlockState(writer, data.particle.state);
              break;
            }
            case "minecraft:bubble": {
              writeParticleType(writer, "minecraft:bubble");
              break;
            }
            case "minecraft:cloud": {
              writeParticleType(writer, "minecraft:cloud");
              break;
            }
            case "minecraft:crit": {
              writeParticleType(writer, "minecraft:crit");
              break;
            }
            case "minecraft:damage_indicator": {
              writeParticleType(writer, "minecraft:damage_indicator");
              break;
            }
            case "minecraft:dragon_breath": {
              writeParticleType(writer, "minecraft:dragon_breath");
              break;
            }
            case "minecraft:dripping_lava": {
              writeParticleType(writer, "minecraft:dripping_lava");
              break;
            }
            case "minecraft:falling_lava": {
              writeParticleType(writer, "minecraft:falling_lava");
              break;
            }
            case "minecraft:landing_lava": {
              writeParticleType(writer, "minecraft:landing_lava");
              break;
            }
            case "minecraft:dripping_water": {
              writeParticleType(writer, "minecraft:dripping_water");
              break;
            }
            case "minecraft:falling_water": {
              writeParticleType(writer, "minecraft:falling_water");
              break;
            }
            case "minecraft:dust": {
              writeParticleType(writer, "minecraft:dust");
              writer.writeFloat(data.particle.color.r);
              writer.writeFloat(data.particle.color.g);
              writer.writeFloat(data.particle.color.b);
              writer.writeFloat(data.particle.scale);
              break;
            }
            case "minecraft:dust_color_transition": {
              writeParticleType(writer, "minecraft:dust_color_transition");
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
              writeParticleType(writer, "minecraft:effect");
              break;
            }
            case "minecraft:elder_guardian": {
              writeParticleType(writer, "minecraft:elder_guardian");
              break;
            }
            case "minecraft:enchanted_hit": {
              writeParticleType(writer, "minecraft:enchanted_hit");
              break;
            }
            case "minecraft:enchant": {
              writeParticleType(writer, "minecraft:enchant");
              break;
            }
            case "minecraft:end_rod": {
              writeParticleType(writer, "minecraft:end_rod");
              break;
            }
            case "minecraft:entity_effect": {
              writeParticleType(writer, "minecraft:entity_effect");
              break;
            }
            case "minecraft:explosion_emitter": {
              writeParticleType(writer, "minecraft:explosion_emitter");
              break;
            }
            case "minecraft:explosion": {
              writeParticleType(writer, "minecraft:explosion");
              break;
            }
            case "minecraft:sonic_boom": {
              writeParticleType(writer, "minecraft:sonic_boom");
              break;
            }
            case "minecraft:falling_dust": {
              writeParticleType(writer, "minecraft:falling_dust");
              writeBlockState(writer, data.particle.state);
              break;
            }
            case "minecraft:firework": {
              writeParticleType(writer, "minecraft:firework");
              break;
            }
            case "minecraft:fishing": {
              writeParticleType(writer, "minecraft:fishing");
              break;
            }
            case "minecraft:flame": {
              writeParticleType(writer, "minecraft:flame");
              break;
            }
            case "minecraft:sculk_soul": {
              writeParticleType(writer, "minecraft:sculk_soul");
              break;
            }
            case "minecraft:sculk_charge": {
              writeParticleType(writer, "minecraft:sculk_charge");
              writer.writeFloat(data.particle.roll);
              break;
            }
            case "minecraft:sculk_charge_pop": {
              writeParticleType(writer, "minecraft:sculk_charge_pop");
              break;
            }
            case "minecraft:soul_fire_flame": {
              writeParticleType(writer, "minecraft:soul_fire_flame");
              break;
            }
            case "minecraft:soul": {
              writeParticleType(writer, "minecraft:soul");
              break;
            }
            case "minecraft:flash": {
              writeParticleType(writer, "minecraft:flash");
              break;
            }
            case "minecraft:happy_villager": {
              writeParticleType(writer, "minecraft:happy_villager");
              break;
            }
            case "minecraft:composter": {
              writeParticleType(writer, "minecraft:composter");
              break;
            }
            case "minecraft:heart": {
              writeParticleType(writer, "minecraft:heart");
              break;
            }
            case "minecraft:instant_effect": {
              writeParticleType(writer, "minecraft:instant_effect");
              break;
            }
            case "minecraft:item": {
              writeParticleType(writer, "minecraft:item");
              writeItemStack(writer, data.particle.itemStack);
              break;
            }
            case "minecraft:vibration": {
              writeParticleType(writer, "minecraft:vibration");
              writePositionSource(writer, data.particle.destination);
              writer.writeVarInt(data.particle.arrivalInTicks);
              break;
            }
            case "minecraft:item_slime": {
              writeParticleType(writer, "minecraft:item_slime");
              break;
            }
            case "minecraft:item_snowball": {
              writeParticleType(writer, "minecraft:item_snowball");
              break;
            }
            case "minecraft:large_smoke": {
              writeParticleType(writer, "minecraft:large_smoke");
              break;
            }
            case "minecraft:lava": {
              writeParticleType(writer, "minecraft:lava");
              break;
            }
            case "minecraft:mycelium": {
              writeParticleType(writer, "minecraft:mycelium");
              break;
            }
            case "minecraft:note": {
              writeParticleType(writer, "minecraft:note");
              break;
            }
            case "minecraft:poof": {
              writeParticleType(writer, "minecraft:poof");
              break;
            }
            case "minecraft:portal": {
              writeParticleType(writer, "minecraft:portal");
              break;
            }
            case "minecraft:rain": {
              writeParticleType(writer, "minecraft:rain");
              break;
            }
            case "minecraft:smoke": {
              writeParticleType(writer, "minecraft:smoke");
              break;
            }
            case "minecraft:sneeze": {
              writeParticleType(writer, "minecraft:sneeze");
              break;
            }
            case "minecraft:spit": {
              writeParticleType(writer, "minecraft:spit");
              break;
            }
            case "minecraft:squid_ink": {
              writeParticleType(writer, "minecraft:squid_ink");
              break;
            }
            case "minecraft:sweep_attack": {
              writeParticleType(writer, "minecraft:sweep_attack");
              break;
            }
            case "minecraft:totem_of_undying": {
              writeParticleType(writer, "minecraft:totem_of_undying");
              break;
            }
            case "minecraft:underwater": {
              writeParticleType(writer, "minecraft:underwater");
              break;
            }
            case "minecraft:splash": {
              writeParticleType(writer, "minecraft:splash");
              break;
            }
            case "minecraft:witch": {
              writeParticleType(writer, "minecraft:witch");
              break;
            }
            case "minecraft:bubble_pop": {
              writeParticleType(writer, "minecraft:bubble_pop");
              break;
            }
            case "minecraft:current_down": {
              writeParticleType(writer, "minecraft:current_down");
              break;
            }
            case "minecraft:bubble_column_up": {
              writeParticleType(writer, "minecraft:bubble_column_up");
              break;
            }
            case "minecraft:nautilus": {
              writeParticleType(writer, "minecraft:nautilus");
              break;
            }
            case "minecraft:dolphin": {
              writeParticleType(writer, "minecraft:dolphin");
              break;
            }
            case "minecraft:campfire_cosy_smoke": {
              writeParticleType(writer, "minecraft:campfire_cosy_smoke");
              break;
            }
            case "minecraft:campfire_signal_smoke": {
              writeParticleType(writer, "minecraft:campfire_signal_smoke");
              break;
            }
            case "minecraft:dripping_honey": {
              writeParticleType(writer, "minecraft:dripping_honey");
              break;
            }
            case "minecraft:falling_honey": {
              writeParticleType(writer, "minecraft:falling_honey");
              break;
            }
            case "minecraft:landing_honey": {
              writeParticleType(writer, "minecraft:landing_honey");
              break;
            }
            case "minecraft:falling_nectar": {
              writeParticleType(writer, "minecraft:falling_nectar");
              break;
            }
            case "minecraft:falling_spore_blossom": {
              writeParticleType(writer, "minecraft:falling_spore_blossom");
              break;
            }
            case "minecraft:ash": {
              writeParticleType(writer, "minecraft:ash");
              break;
            }
            case "minecraft:crimson_spore": {
              writeParticleType(writer, "minecraft:crimson_spore");
              break;
            }
            case "minecraft:warped_spore": {
              writeParticleType(writer, "minecraft:warped_spore");
              break;
            }
            case "minecraft:spore_blossom_air": {
              writeParticleType(writer, "minecraft:spore_blossom_air");
              break;
            }
            case "minecraft:dripping_obsidian_tear": {
              writeParticleType(writer, "minecraft:dripping_obsidian_tear");
              break;
            }
            case "minecraft:falling_obsidian_tear": {
              writeParticleType(writer, "minecraft:falling_obsidian_tear");
              break;
            }
            case "minecraft:landing_obsidian_tear": {
              writeParticleType(writer, "minecraft:landing_obsidian_tear");
              break;
            }
            case "minecraft:reverse_portal": {
              writeParticleType(writer, "minecraft:reverse_portal");
              break;
            }
            case "minecraft:white_ash": {
              writeParticleType(writer, "minecraft:white_ash");
              break;
            }
            case "minecraft:small_flame": {
              writeParticleType(writer, "minecraft:small_flame");
              break;
            }
            case "minecraft:snowflake": {
              writeParticleType(writer, "minecraft:snowflake");
              break;
            }
            case "minecraft:dripping_dripstone_lava": {
              writeParticleType(writer, "minecraft:dripping_dripstone_lava");
              break;
            }
            case "minecraft:falling_dripstone_lava": {
              writeParticleType(writer, "minecraft:falling_dripstone_lava");
              break;
            }
            case "minecraft:dripping_dripstone_water": {
              writeParticleType(writer, "minecraft:dripping_dripstone_water");
              break;
            }
            case "minecraft:falling_dripstone_water": {
              writeParticleType(writer, "minecraft:falling_dripstone_water");
              break;
            }
            case "minecraft:glow_squid_ink": {
              writeParticleType(writer, "minecraft:glow_squid_ink");
              break;
            }
            case "minecraft:glow": {
              writeParticleType(writer, "minecraft:glow");
              break;
            }
            case "minecraft:wax_on": {
              writeParticleType(writer, "minecraft:wax_on");
              break;
            }
            case "minecraft:wax_off": {
              writeParticleType(writer, "minecraft:wax_off");
              break;
            }
            case "minecraft:electric_spark": {
              writeParticleType(writer, "minecraft:electric_spark");
              break;
            }
            case "minecraft:scrape": {
              writeParticleType(writer, "minecraft:scrape");
              break;
            }
            case "minecraft:shriek": {
              writeParticleType(writer, "minecraft:shriek");
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
          writeVillagerType(writer, data.villagerType);
          writeVillagerProfession(writer, data.profession);
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
          writeCatVariant(writer, data.variant);
          break;
        }
        case "frog_variant": {
          writer.writeVarInt(20);
          writeFrogVariant(writer, data.variant);
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
          writePaintingVariant(writer, data.variant);
          break;
        }
        default:
          throw new Error("Invalid tag");
      }
    }
    writer.writeByte(-1);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetEntityData?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetEntityLink?.(this);
  }
}

export class ClientboundSetEntityMotionPacket implements Packet<ClientGameHandler> {
  constructor(
    public id: number,
    public xa: number,
    public ya: number,
    public za: number,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    const xa = reader.readShort();
    const ya = reader.readShort();
    const za = reader.readShort();
    return new this(id, xa, ya, za);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    writer.writeShort(this.xa);
    writer.writeShort(this.ya);
    writer.writeShort(this.za);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetEntityMotion?.(this);
  }
}

export class ClientboundSetEquipmentPacket implements Packet<ClientGameHandler> {
  constructor(
    public entity: number,
    public slots: Map<EquipmentSlot, ItemStack>,
  ) {}
  static read(reader: Reader) {
    const entity = reader.readVarInt();
    let slots: Map<EquipmentSlot, ItemStack> = new Map();
    let i: number;
    do {
      i = reader.readByte();
      const slot = equipmentSlotEnum.fromId(i & 127);
      slots.set(slot, readItemStack(reader));
    } while ((i & -128) != 0);
    return new this(entity, slots);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entity);
    const slots = [...this.slots.keys()];
    for (let i = 0; i < slots.length; i++) {
      writer.writeByte(equipmentSlotEnum.toId(slots[i]!) | (i != slots.length - 1 ? -128 : 0));
      writeItemStack(writer, this.slots.get(slots[i]!)!);
    }
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetEquipment?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetExperience?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetHealth?.(this);
  }
}

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
        result = { type: "add", displayName: reader.readJson(), renderType: criteriaRenderTypeEnum.fromId(reader.readVarInt()) };
        break;
      case 1:
        result = { type: "remove" };
        break;
      case 2:
        result = { type: "change", displayName: reader.readJson(), renderType: criteriaRenderTypeEnum.fromId(reader.readVarInt()) };
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
        writer.writeJson(this.action.displayName);
        writer.writeVarInt(criteriaRenderTypeEnum.toId(this.action.renderType));
        break;
      }
      case "remove": {
        writer.writeByte(1);
        break;
      }
      case "change": {
        writer.writeByte(2);
        writer.writeJson(this.action.displayName);
        writer.writeVarInt(criteriaRenderTypeEnum.toId(this.action.renderType));
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetObjective?.(this);
  }
}

export class ClientboundSetPassengersPacket implements Packet<ClientGameHandler> {
  constructor(
    public vehicle: number,
    public passengers: number[],
  ) {}
  static read(reader: Reader) {
    const vehicle = reader.readVarInt();
    const list: number[] = [];
    for (let i = reader.readVarInt(); i--;) list.push(reader.readVarInt());
    const passengers = list;
    return new this(vehicle, passengers);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.vehicle);
    writer.writeVarInt(this.passengers.length);
    for (const item of this.passengers) writer.writeVarInt(item);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetPassengers?.(this);
  }
}

export class ClientboundSetPlayerTeamPacket implements Packet<ClientGameHandler> {
  constructor(
    public name: string,
    public action:
      | {
        type: "add_team";
        parameters: { displayName: Component; options: number; nametagVisibility: string; collisionRule: string; color: ChatFormatting; playerPrefix: Component; playerSuffix: Component };
        players: string[];
      }
      | { type: "remove_team" }
      | {
        type: "modify_team";
        parameters: { displayName: Component; options: number; nametagVisibility: string; collisionRule: string; color: ChatFormatting; playerPrefix: Component; playerSuffix: Component };
      }
      | { type: "add_players"; players: string[] }
      | { type: "remove_players"; players: string[] },
  ) {}
  static read(reader: Reader) {
    const name = reader.readString();
    let result:
      | {
        type: "add_team";
        parameters: { displayName: Component; options: number; nametagVisibility: string; collisionRule: string; color: ChatFormatting; playerPrefix: Component; playerSuffix: Component };
        players: string[];
      }
      | { type: "remove_team" }
      | {
        type: "modify_team";
        parameters: { displayName: Component; options: number; nametagVisibility: string; collisionRule: string; color: ChatFormatting; playerPrefix: Component; playerSuffix: Component };
      }
      | { type: "add_players"; players: string[] }
      | { type: "remove_players"; players: string[] };
    switch (reader.readByte()) {
      case 0: {
        const type = "add_team";
        const parameters = {
          displayName: reader.readJson(),
          options: reader.readByte(),
          nametagVisibility: reader.readString(),
          collisionRule: reader.readString(),
          color: readChatFormatting(reader),
          playerPrefix: reader.readJson(),
          playerSuffix: reader.readJson(),
        };
        const list: string[] = [];
        for (let i = reader.readVarInt(); i--;) list.push(reader.readString());
        result = { type, parameters, players: list };
        break;
      }
      case 1:
        result = { type: "remove_team" };
        break;
      case 2:
        result = {
          type: "modify_team",
          parameters: {
            displayName: reader.readJson(),
            options: reader.readByte(),
            nametagVisibility: reader.readString(),
            collisionRule: reader.readString(),
            color: readChatFormatting(reader),
            playerPrefix: reader.readJson(),
            playerSuffix: reader.readJson(),
          },
        };
        break;
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
    return new this(name, action);
  }
  write(writer: Writer) {
    writer.writeString(this.name);
    switch (this.action.type) {
      case "add_team": {
        writer.writeByte(0);
        writer.writeJson(this.action.parameters.displayName);
        writer.writeByte(this.action.parameters.options);
        writer.writeString(this.action.parameters.nametagVisibility);
        writer.writeString(this.action.parameters.collisionRule);
        writeChatFormatting(writer, this.action.parameters.color);
        writer.writeJson(this.action.parameters.playerPrefix);
        writer.writeJson(this.action.parameters.playerSuffix);
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
        writer.writeJson(this.action.parameters.displayName);
        writer.writeByte(this.action.parameters.options);
        writer.writeString(this.action.parameters.nametagVisibility);
        writer.writeString(this.action.parameters.collisionRule);
        writeChatFormatting(writer, this.action.parameters.color);
        writer.writeJson(this.action.parameters.playerPrefix);
        writer.writeJson(this.action.parameters.playerSuffix);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetPlayerTeam?.(this);
  }
}

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
  handle(handler: ClientGameHandler) {
    return handler.handleSetScore?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetSimulationDistance?.(this);
  }
}

export class ClientboundSetSubtitleTextPacket implements Packet<ClientGameHandler> {
  constructor(
    public text: Component,
  ) {}
  static read(reader: Reader) {
    const text = reader.readJson();
    return new this(text);
  }
  write(writer: Writer) {
    writer.writeJson(this.text);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetSubtitleText?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleSetTime?.(this);
  }
}

export class ClientboundSetTitleTextPacket implements Packet<ClientGameHandler> {
  constructor(
    public text: Component,
  ) {}
  static read(reader: Reader) {
    const text = reader.readJson();
    return new this(text);
  }
  write(writer: Writer) {
    writer.writeJson(this.text);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetTitleText?.(this);
  }
}

export class ClientboundSetTitlesAnimationPacket implements Packet<ClientGameHandler> {
  constructor(
    public fadeIn: number,
    public say: number,
    public fadeOut: number,
  ) {}
  static read(reader: Reader) {
    const fadeIn = reader.readInt();
    const say = reader.readInt();
    const fadeOut = reader.readInt();
    return new this(fadeIn, say, fadeOut);
  }
  write(writer: Writer) {
    writer.writeInt(this.fadeIn);
    writer.writeInt(this.say);
    writer.writeInt(this.fadeOut);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSetTitlesAnimation?.(this);
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
    const sound = readSoundEvent(reader);
    const source = readSoundSource(reader);
    const id = reader.readVarInt();
    const volume = reader.readFloat();
    const pitch = reader.readFloat();
    const seed = reader.readLong();
    return new this(sound, source, id, volume, pitch, seed);
  }
  write(writer: Writer) {
    writeSoundEvent(writer, this.sound);
    writeSoundSource(writer, this.source);
    writer.writeVarInt(this.id);
    writer.writeFloat(this.volume);
    writer.writeFloat(this.pitch);
    writer.writeLong(this.seed);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSoundEntity?.(this);
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
    public seen: bigint,
  ) {}
  static read(reader: Reader) {
    const sound = readSoundEvent(reader);
    const source = readSoundSource(reader);
    const x = reader.readInt();
    const y = reader.readInt();
    const z = reader.readInt();
    const volume = reader.readFloat();
    const pitch = reader.readFloat();
    const seen = reader.readLong();
    return new this(sound, source, x, y, z, volume, pitch, seen);
  }
  write(writer: Writer) {
    writeSoundEvent(writer, this.sound);
    writeSoundSource(writer, this.source);
    writer.writeInt(this.x);
    writer.writeInt(this.y);
    writer.writeInt(this.z);
    writer.writeFloat(this.volume);
    writer.writeFloat(this.pitch);
    writer.writeLong(this.seen);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSound?.(this);
  }
}

export class ClientboundStopSoundPacket implements Packet<ClientGameHandler> {
  constructor(
    public source: SoundSource | null,
    public name: ResourceLocation | null,
  ) {}
  static read(reader: Reader) {
    const flags = reader.readByte();
    const source = (flags & 0x1) != 0 ? readSoundSource(reader) : null;
    const name = (flags & 0x1) != 0 ? readResourceLocation(reader) : null;
    return new this(source, name);
  }
  write(writer: Writer) {
    writer.writeByte(-(this.source != null) & 0x1 | -(this.name != null) & 0x2);
    if (this.source != null) writeSoundSource(writer, this.source);
    if (this.name != null) writeResourceLocation(writer, this.name);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleStopSound?.(this);
  }
}

export class ClientboundSystemChatPacket implements Packet<ClientGameHandler> {
  constructor(
    public content: Component,
    public overlay: boolean,
  ) {}
  static read(reader: Reader) {
    const content = reader.readJson();
    const overlay = reader.readBoolean();
    return new this(content, overlay);
  }
  write(writer: Writer) {
    writer.writeJson(this.content);
    writer.writeBoolean(this.overlay);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleSystemChat?.(this);
  }
}

export class ClientboundTabListPacket implements Packet<ClientGameHandler> {
  constructor(
    public header: Component,
    public footer: Component,
  ) {}
  static read(reader: Reader) {
    const header = reader.readJson();
    const footer = reader.readJson();
    return new this(header, footer);
  }
  write(writer: Writer) {
    writer.writeJson(this.header);
    writer.writeJson(this.footer);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleTabList?.(this);
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
  handle(handler: ClientGameHandler) {
    return handler.handleTagQuery?.(this);
  }
}

export class ClientboundTakeItemEntityPacket implements Packet<ClientGameHandler> {
  constructor(
    public itemId: number,
    public playerId: number,
    public amount: number,
  ) {}
  static read(reader: Reader) {
    const itemId = reader.readVarInt();
    const playerId = reader.readVarInt();
    const amount = reader.readVarInt();
    return new this(itemId, playerId, amount);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.itemId);
    writer.writeVarInt(this.playerId);
    writer.writeVarInt(this.amount);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleTakeItemEntity?.(this);
  }
}

export class ClientboundTeleportEntityPacket implements Packet<ClientGameHandler> {
  constructor(
    public id: number,
    public x: number,
    public y: number,
    public z: number,
    public yRot: number,
    public xRot: number,
    public onGround: boolean,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const yRot = reader.readByte();
    const xRot = reader.readByte();
    const onGround = reader.readBoolean();
    return new this(id, x, y, z, yRot, xRot, onGround);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeByte(this.yRot);
    writer.writeByte(this.xRot);
    writer.writeBoolean(this.onGround);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleTeleportEntity?.(this);
  }
}

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
      const key = readResourceLocation(reader);
      const parentId = reader.readBoolean() ? readResourceLocation(reader) : null;
      let value1: DisplayInfo | null = null;
      if (reader.readBoolean()) {
        const title = reader.readJson();
        const description = reader.readJson();
        const icon = readItemStack(reader);
        const frame = frameTypeEnum.fromId(reader.readVarInt());
        const flags = reader.readInt();
        let background: ResourceLocation | null = null;
        if ((flags & 0x1) != 0) background = readResourceLocation(reader);
        value1 = { title, description, icon, frame, background, showToast: (flags & 0x2) != 0, hidden: (flags & 0x4) != 0, x: reader.readFloat(), y: reader.readFloat() };
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
    for (let i1 = reader.readVarInt(); i1--;) list.push(readResourceLocation(reader));
    const removed = list;
    const map1: Map<ResourceLocation, AdvancementProgress> = new Map();
    for (let i2 = reader.readVarInt(); i2--;) {
      const key = readResourceLocation(reader);
      const map2: AdvancementProgress = new Map();
      for (let i3 = reader.readVarInt(); i3--;) {
        const key1 = readResourceLocation(reader);
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
      writeResourceLocation(writer, key);
      writer.writeBoolean(value.parentId != null);
      if (value.parentId != null) writeResourceLocation(writer, value.parentId);
      writer.writeBoolean(value.display != null);
      if (value.display != null) {
        writer.writeJson(value.display.title);
        writer.writeJson(value.display.description);
        writeItemStack(writer, value.display.icon);
        writer.writeVarInt(frameTypeEnum.toId(value.display.frame));
        writer.writeInt(-(value.display.background != null) & 0x1 | -value.display.showToast & 0x2 | -value.display.hidden & 0x4);
        if (value.display.background != null) {
          writeResourceLocation(writer, value.display.background);
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
    for (const item of this.removed) writeResourceLocation(writer, item);
    writer.writeVarInt(this.progress.size);
    for (const [key, value] of this.progress) {
      writeResourceLocation(writer, key);
      writer.writeVarInt(value.size);
      for (const [key1, value1] of value) {
        writeResourceLocation(writer, key1);
        writer.writeBoolean(value1.obtainedAt != null);
        if (value1.obtainedAt != null) writer.writeLong(BigInt(value1.obtainedAt.getTime()));
      }
    }
  }
  handle(handler: ClientGameHandler) {
    return handler.handleUpdateAdvancements?.(this);
  }
}

export class ClientboundUpdateAttributesPacket implements Packet<ClientGameHandler> {
  constructor(
    public entityId: number,
    public attributes: { attribute: ResourceLocation; base: number; modifiers: { id: string; amount: number; operation: "addition" | "multiply_base" | "multiply_total" }[] }[],
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    const list: { attribute: ResourceLocation; base: number; modifiers: { id: string; amount: number; operation: "addition" | "multiply_base" | "multiply_total" }[] }[] = [];
    for (let i = reader.readVarInt(); i--;) {
      const attribute = readResourceLocation(reader);
      const base = reader.readDouble();
      const list1: { id: string; amount: number; operation: "addition" | "multiply_base" | "multiply_total" }[] = [];
      for (let i1 = reader.readVarInt(); i1--;) list1.push({ id: reader.readUuid(), amount: reader.readDouble(), operation: mapper4.fromId(reader.readVarInt()) });
      list.push({ attribute, base, modifiers: list1 });
    }
    const attributes = list;
    return new this(entityId, attributes);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writer.writeVarInt(this.attributes.length);
    for (const item of this.attributes) {
      writeResourceLocation(writer, item.attribute);
      writer.writeDouble(item.base);
      writer.writeVarInt(item.modifiers.length);
      for (const item1 of item.modifiers) {
        writer.writeUuid(item1.id);
        writer.writeDouble(item1.amount);
        writer.writeVarInt(mapper4.toId(item1.operation));
      }
    }
  }
  handle(handler: ClientGameHandler) {
    return handler.handleUpdateAttributes?.(this);
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
    const effect = readMobEffect(reader);
    const effectAmplifier = reader.readByte();
    const effectDurationTicks = reader.readVarInt();
    const flags1 = reader.readByte();
    const flags = { isAmbient: (flags1 & 0x1) > 0, isVisible: (flags1 & 0x2) > 0, showIcon: (flags1 & 0x4) > 0 };
    const factorData = reader.readBoolean() ? reader.readCompoundTag() : null;
    return new this(entityId, effect, effectAmplifier, effectDurationTicks, flags, factorData);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    writeMobEffect(writer, this.effect);
    writer.writeByte(this.effectAmplifier);
    writer.writeVarInt(this.effectDurationTicks);
    writer.writeByte((-this.flags.isAmbient & 0x1) | (-this.flags.isVisible & 0x2) | (-this.flags.showIcon & 0x4));
    writer.writeBoolean(this.factorData != null);
    if (this.factorData != null) writer.writeCompoundTag(this.factorData);
  }
  handle(handler: ClientGameHandler) {
    return handler.handleUpdateMobEffect?.(this);
  }
}

export class ClientboundUpdateRecipesPacket implements Packet<ClientGameHandler> {
  constructor(
    public recipes: Recipe[],
  ) {}
  static read(reader: Reader) {
    const list: Recipe[] = [];
    for (let i = reader.readVarInt(); i--;) {
      const serializerId = readResourceLocation(reader);
      const id = readResourceLocation(reader);
      let result: RecipeSerializer;
      switch (serializerId) {
        case "minecraft:crafting_shaped": {
          const id1 = "minecraft:crafting_shaped";
          const width = reader.readVarInt();
          const height = reader.readVarInt();
          const group = reader.readString();
          const list1: Ingredient[] = [];
          for (let i1 = width * height; i1--;) {
            const list2: Ingredient = [];
            for (let i2 = reader.readVarInt(); i2--;) list2.push(readItemStack(reader));
            list1.push(list2);
          }
          result = { id: id1, width, height, group, ingredients: list1, result: readItemStack(reader) };
          break;
        }
        case "minecraft:crafting_shapeless": {
          const id1 = "minecraft:crafting_shapeless";
          const group = reader.readString();
          const list1: Ingredient[] = [];
          for (let i1 = reader.readVarInt(); i1--;) {
            const list2: Ingredient = [];
            for (let i2 = reader.readVarInt(); i2--;) list2.push(readItemStack(reader));
            list1.push(list2);
          }
          result = { id: id1, group, ingredients: list1, result: readItemStack(reader) };
          break;
        }
        case "minecraft:crafting_special_armordye":
          result = { id: "minecraft:crafting_special_armordye" };
          break;
        case "minecraft:crafting_special_bookcloning":
          result = { id: "minecraft:crafting_special_bookcloning" };
          break;
        case "minecraft:crafting_special_mapcloning":
          result = { id: "minecraft:crafting_special_mapcloning" };
          break;
        case "minecraft:crafting_special_mapextending":
          result = { id: "minecraft:crafting_special_mapextending" };
          break;
        case "minecraft:crafting_special_firework_rocket":
          result = { id: "minecraft:crafting_special_firework_rocket" };
          break;
        case "minecraft:crafting_special_firework_star":
          result = { id: "minecraft:crafting_special_firework_star" };
          break;
        case "minecraft:crafting_special_firework_star_fade":
          result = { id: "minecraft:crafting_special_firework_star_fade" };
          break;
        case "minecraft:crafting_special_tippedarrow":
          result = { id: "minecraft:crafting_special_tippedarrow" };
          break;
        case "minecraft:crafting_special_bannerduplicate":
          result = { id: "minecraft:crafting_special_bannerduplicate" };
          break;
        case "minecraft:crafting_special_shielddecoration":
          result = { id: "minecraft:crafting_special_shielddecoration" };
          break;
        case "minecraft:crafting_special_shulkerboxcoloring":
          result = { id: "minecraft:crafting_special_shulkerboxcoloring" };
          break;
        case "minecraft:crafting_special_suspiciousstew":
          result = { id: "minecraft:crafting_special_suspiciousstew" };
          break;
        case "minecraft:crafting_special_repairitem":
          result = { id: "minecraft:crafting_special_repairitem" };
          break;
        case "minecraft:smelting": {
          const id1 = "minecraft:smelting";
          const group = reader.readString();
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          result = { id: id1, group, ingredient: list1, result: readItemStack(reader), experience: reader.readFloat(), cookingTime: reader.readVarInt() };
          break;
        }
        case "minecraft:blasting": {
          const id1 = "minecraft:blasting";
          const group = reader.readString();
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          result = { id: id1, group, ingredient: list1, result: readItemStack(reader), experience: reader.readFloat(), cookingTime: reader.readVarInt() };
          break;
        }
        case "minecraft:smoking": {
          const id1 = "minecraft:smoking";
          const group = reader.readString();
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          result = { id: id1, group, ingredient: list1, result: readItemStack(reader), experience: reader.readFloat(), cookingTime: reader.readVarInt() };
          break;
        }
        case "minecraft:campfire_cooking": {
          const id1 = "minecraft:campfire_cooking";
          const group = reader.readString();
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          result = { id: id1, group, ingredient: list1, result: readItemStack(reader), experience: reader.readFloat(), cookingTime: reader.readVarInt() };
          break;
        }
        case "minecraft:stonecutting": {
          const id1 = "minecraft:stonecutting";
          const group = reader.readString();
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          result = { id: id1, group, ingredient: list1, result: readItemStack(reader) };
          break;
        }
        case "minecraft:smithing": {
          const id1 = "minecraft:smithing";
          const list1: Ingredient = [];
          for (let i1 = reader.readVarInt(); i1--;) list1.push(readItemStack(reader));
          const list2: Ingredient = [];
          for (let i2 = reader.readVarInt(); i2--;) list2.push(readItemStack(reader));
          result = { id: id1, base: list1, addition: list2, result: readItemStack(reader) };
          break;
        }
        default:
          throw new Error("Invalid tag id");
      }
      list.push({ id, serializer: result });
    }
    const recipes = list;
    return new this(recipes);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.recipes.length);
    for (const item of this.recipes) {
      writeResourceLocation(writer, item.serializer.id);
      writeResourceLocation(writer, item.id);
      switch (item.serializer.id) {
        case "minecraft:crafting_shaped": {
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
        case "minecraft:crafting_shapeless": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredients.length);
          for (const item1 of item.serializer.ingredients) {
            writer.writeVarInt(item1.length);
            for (const item2 of item1) writeItemStack(writer, item2);
          }
          writeItemStack(writer, item.serializer.result);
          break;
        }
        case "minecraft:crafting_special_armordye": {
          break;
        }
        case "minecraft:crafting_special_bookcloning": {
          break;
        }
        case "minecraft:crafting_special_mapcloning": {
          break;
        }
        case "minecraft:crafting_special_mapextending": {
          break;
        }
        case "minecraft:crafting_special_firework_rocket": {
          break;
        }
        case "minecraft:crafting_special_firework_star": {
          break;
        }
        case "minecraft:crafting_special_firework_star_fade": {
          break;
        }
        case "minecraft:crafting_special_tippedarrow": {
          break;
        }
        case "minecraft:crafting_special_bannerduplicate": {
          break;
        }
        case "minecraft:crafting_special_shielddecoration": {
          break;
        }
        case "minecraft:crafting_special_shulkerboxcoloring": {
          break;
        }
        case "minecraft:crafting_special_suspiciousstew": {
          break;
        }
        case "minecraft:crafting_special_repairitem": {
          break;
        }
        case "minecraft:smelting": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredient.length);
          for (const item1 of item.serializer.ingredient) writeItemStack(writer, item1);
          writeItemStack(writer, item.serializer.result);
          writer.writeFloat(item.serializer.experience);
          writer.writeVarInt(item.serializer.cookingTime);
          break;
        }
        case "minecraft:blasting": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredient.length);
          for (const item1 of item.serializer.ingredient) writeItemStack(writer, item1);
          writeItemStack(writer, item.serializer.result);
          writer.writeFloat(item.serializer.experience);
          writer.writeVarInt(item.serializer.cookingTime);
          break;
        }
        case "minecraft:smoking": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredient.length);
          for (const item1 of item.serializer.ingredient) writeItemStack(writer, item1);
          writeItemStack(writer, item.serializer.result);
          writer.writeFloat(item.serializer.experience);
          writer.writeVarInt(item.serializer.cookingTime);
          break;
        }
        case "minecraft:campfire_cooking": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredient.length);
          for (const item1 of item.serializer.ingredient) writeItemStack(writer, item1);
          writeItemStack(writer, item.serializer.result);
          writer.writeFloat(item.serializer.experience);
          writer.writeVarInt(item.serializer.cookingTime);
          break;
        }
        case "minecraft:stonecutting": {
          writer.writeString(item.serializer.group);
          writer.writeVarInt(item.serializer.ingredient.length);
          for (const item1 of item.serializer.ingredient) writeItemStack(writer, item1);
          writeItemStack(writer, item.serializer.result);
          break;
        }
        case "minecraft:smithing": {
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
  handle(handler: ClientGameHandler) {
    return handler.handleUpdateRecipes?.(this);
  }
}

export class ClientboundUpdateTagsPacket implements Packet<ClientGameHandler> {
  constructor(
    public tags: Map<ResourceLocation, Map<ResourceLocation, number[]>>,
  ) {}
  static read(reader: Reader) {
    const map: Map<ResourceLocation, Map<ResourceLocation, number[]>> = new Map();
    for (let i = reader.readVarInt(); i--;) {
      const key = readResourceLocation(reader);
      const map1: Map<ResourceLocation, number[]> = new Map();
      for (let i1 = reader.readVarInt(); i1--;) {
        const key1 = readResourceLocation(reader);
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
      writeResourceLocation(writer, key);
      writer.writeVarInt(value.size);
      for (const [key1, value1] of value) {
        writeResourceLocation(writer, key1);
        writer.writeVarInt(value1.length);
        for (const item of value1) writer.writeVarInt(item);
      }
    }
  }
  handle(handler: ClientGameHandler) {
    return handler.handleUpdateTags?.(this);
  }
}

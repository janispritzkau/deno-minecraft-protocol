import { flow, packet } from "../../protocol.ts";
import { DefinitionType, ExpressionType, Type } from "../../type.ts";
import {
  BitFlags,
  Boolean,
  Byte,
  ByteArray,
  Component,
  Custom,
  CustomStruct,
  Data,
  Date,
  Double,
  Enum,
  Float,
  Int,
  List,
  Long,
  Map,
  Merge,
  Nbt,
  Optional,
  Packed,
  REMAINING_BYTES,
  Short,
  String,
  Struct,
  TaggedUnion,
  UnsignedByte,
  Uuid,
  VarInt,
  VarLong,
} from "../../types.ts";

import {
  BlockPos,
  BlockState,
  ChatFormatting,
  ChunkData,
  CommandNode,
  Difficulty,
  Direction,
  EquipmentSlot,
  FilterMask,
  GameMode,
  GameModeByte,
  GameProfile,
  GlobalPos,
  InteractionHand,
  ItemStack,
  LightData,
  NullableGameModeByte,
  ParticleOptions,
  ProfilePublicKey,
  RecipeBookType,
  ResourceLocation,
  SignedMessageBody,
  SignedMessageHeader,
  SoundSource,
} from "../../protocol_types.ts";
import {
  Block,
  BlockEntityType,
  CatVariant,
  ChatType,
  CustomStat,
  EntityType,
  FrogVariant,
  Item,
  Menu,
  MobEffect,
  PaintingVariant,
  ParticleType,
  SoundEvent,
  StatType,
  VillagerProfession,
  VillagerType,
} from "../../registry_types.ts";

flow("clientbound");

packet("ClientboundAddEntityPacket", {
  entityId: VarInt,
  uuid: Uuid,
  entityType: EntityType,
  x: Double,
  y: Double,
  z: Double,
  pitch: Byte,
  yaw: Byte,
  headYaw: Byte,
  data: VarInt.doc("The meaning of this value is dependent on the entity type."),
  vx: Short.doc("Velocity on the X axis."),
  vy: Short.doc("Velocity on the Y axis."),
  vz: Short.doc("Velocity on the Z axis."),
});

packet("ClientboundAddExperienceOrbPacket", {
  entityId: VarInt,
  x: Double,
  y: Double,
  z: Double,
  amount: Short.doc("The amount of experience."),
});

packet("ClientboundAddPlayerPacket", {
  entityId: VarInt,
  playerId: Uuid,
  x: Double,
  y: Double,
  z: Double,
  yaw: Byte,
  pitch: Byte,
});

packet("ClientboundAnimatePacket", {
  entityId: VarInt,
  action: Enum([
    "swing_main_hand",
    "animate_hurt",
    "stop_sleeping",
    "swing_off_hand",
    "critical_hit",
    "enchanted_hit",
  ], UnsignedByte).alias("AnimateAction"),
});

packet("ClientboundAwardStatsPacket", {
  stats: List(
    Struct({
      stat: TaggedUnion("type", StatType, {
        "minecraft:mined": Struct({ block: Block }),
        "minecraft:crafted": Struct({ item: Item }),
        "minecraft:used": Struct({ item: Item }),
        "minecraft:broken": Struct({ item: Item }),
        "minecraft:picked_up": Struct({ item: Item }),
        "minecraft:dropped": Struct({ item: Item }),
        "minecraft:killed": Struct({ entityType: EntityType }),
        "minecraft:killed_by": Struct({ entityType: EntityType }),
        "minecraft:custom": Struct({ custom: CustomStat }),
      }),
      value: VarInt,
    }).alias("Stat"),
  ),
});

packet("ClientboundBlockChangedAckPacket", {
  sequence: VarInt,
});

packet("ClientboundBlockDestructionPacket", {
  entityId: VarInt,
  pos: BlockPos,
  progress: UnsignedByte.doc("The block breaking progress from 0 to 9"),
});

packet("ClientboundBlockEntityDataPacket", {
  pos: BlockPos,
  blockEntityType: BlockEntityType,
  tag: Nbt,
});

// TODO
packet("ClientboundBlockEventPacket", {
  pos: BlockPos,
  type: UnsignedByte.doc("Type of action (varies depending on block)"),
  param: UnsignedByte.doc("Action parameter"),
  block: Block,
  // event: TaggedUnion("action", VarInt, {
  //   "update_opener_count": Struct({
  //     block: Block.doc("Is either ender chest, regular chest or shulker box."),
  //     count: UnsignedByte,
  //   }), // action 1
  //   "extend_piston": Struct({ direction: UnsignedByte }), // action 0
  //   "retract_piston": Struct({ direction: UnsignedByte }), // action 1
  //   "cancel_extending_piston": Struct({ direction: UnsignedByte }), // action 2
  //   "play_note_block": null, // action 0
  //   "ring_bell": Struct({ direction: UnsignedByte }), // action 1
  //   "reset_spawner_delay": null, // action 1
  //   "trigger_end_gateway_cooldown": null, // action 1
  // }),
});

packet("ClientboundBlockUpdatePacket", {
  pos: BlockPos,
  blockState: BlockState,
});

const BossBarColor = Enum([
  "pink",
  "blue",
  "red",
  "green",
  "yellow",
  "purple",
  "white",
]).alias("BossBarColor");

const BossBarOverlay = Enum([
  "progress",
  "notched_6",
  "notched_10",
  "notched_12",
  "notched_20",
]).alias("BossBarOverlay");

const BossBarProperties = BitFlags(Byte, {
  darkenScreen: 0x01,
  playMusic: 0x02,
  createWorldFog: 0x04,
});

const BossBarAction = TaggedUnion("type", VarInt, {
  add: Merge(
    Struct({
      name: Component,
      progress: Float,
      color: BossBarColor,
      overlay: BossBarOverlay,
    }),
    BossBarProperties,
  ),
  remove: Struct({}),
  update_progress: Struct({ progress: Float }),
  update_name: Struct({ name: Component }),
  update_style: Struct({ color: BossBarColor, overlay: BossBarOverlay }),
  update_properties: BossBarProperties,
}).alias("BossBarAction");

packet("ClientboundBossEventPacket", {
  bossBarId: Uuid,
  action: BossBarAction,
});

packet("ClientboundChangeDifficultyPacket", {
  difficulty: Difficulty,
  isLocked: Boolean,
});

packet("ClientboundChatPreviewPacket", {
  transactionId: Int,
  preview: Optional(Component),
});

packet("ClientboundClearTitlesPacket", {
  resetTimes: Boolean.doc("Reset fade-in, stay and fade-out time."),
});

const Suggestion = Struct({
  text: String(),
  tooltip: Optional(Component),
}).alias("Suggestion");

packet("ClientboundCommandSuggestionsPacket", {
  transactionId: VarInt,
  rangeStart: VarInt,
  rangeLength: VarInt,
  suggestions: List(Suggestion),
});

packet("ClientboundCommandsPacket", {
  entries: List(CommandNode),
  rootIndex: VarInt,
});

packet("ClientboundContainerClosePacket", {
  containerId: UnsignedByte,
});

packet("ClientboundContainerSetContentPacket", {
  containerId: UnsignedByte,
  stateId: VarInt,
  itemSlots: List(ItemStack).doc("The array index corresponds to the slot number."),
  carriedItem: ItemStack,
});

// TODO: class method to deserialize data slots based on menu type
packet("ClientboundContainerSetDataPacket", {
  containerId: UnsignedByte,
  id: Short,
  value: Short,
});

packet("ClientboundContainerSetSlotPacket", {
  containerId: Byte,
  stateId: VarInt,
  slot: Short,
  itemStack: ItemStack,
});

packet("ClientboundCooldownPacket", {
  item: Item,
  duration: VarInt,
});

packet("ClientboundCustomChatCompletionsPacket", {
  action: Enum(["add", "remove", "set"]).alias("CustomChatCompletionsAction"),
  entries: List(String()),
});

packet("ClientboundCustomPayloadPacket", {
  identifier: ResourceLocation,
  data: Data(REMAINING_BYTES),
});

packet("ClientboundCustomSoundPacket", {
  sound: ResourceLocation,
  source: SoundSource,
  x: Int,
  y: Int,
  z: Int,
  volume: Float,
  pitch: Float,
  seed: Long,
});

packet("ClientboundDeleteChatPacket", {
  messageSignature: ByteArray(),
});

packet("ClientboundDisconnectPacket", {
  reason: Component,
});

packet("ClientboundEntityEventPacket", {
  entityId: Int,
  eventId: Byte.doc("Event ids vary depending on the entity type."),
});

packet("ClientboundExplodePacket", {
  x: Float,
  y: Float,
  z: Float,
  power: Float,
  toBlow: List(Struct({ x: Byte, y: Byte, z: Byte })),
  knockbackX: Float,
  knockbackY: Float,
  knockbackZ: Float,
});

packet("ClientboundForgetLevelChunkPacket", {
  chunkX: Int,
  chunkZ: Int,
});

// TODO: improve
packet("ClientboundGameEventPacket", {
  event: Enum([
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
  ], UnsignedByte).alias("GameEvent"),
  value: Float.doc("Varies depending on event."),
});

packet("ClientboundHorseScreenOpenPacket", {
  containerId: UnsignedByte,
  containerSize: VarInt.doc("Number of slots the container has."),
  entityId: Int,
});

packet("ClientboundInitializeBorderPacket", {
  centerX: Double,
  centerZ: Double,
  oldSize: Double,
  newSize: Double,
  lerpTime: VarLong,
  newAbsoluteMaxSize: VarInt,
  warningBlocks: VarInt,
  warningTime: VarInt,
});

packet("ClientboundKeepAlivePacket", {
  id: Long,
});

packet("ClientboundLevelChunkWithLightPacket", {
  chunkX: Int,
  chunkZ: Int,
  chunkData: ChunkData,
  lightData: LightData,
});

packet("ClientboundLevelEventPacket", {
  eventId: Int,
  pos: BlockPos,
  data: Int,
  isGlobal: Boolean,
});

packet("ClientboundLevelParticlesPacket", {
  overrideLimiter: Boolean.doc("Increases visible particle distance."),
  x: Double,
  y: Double,
  z: Double,
  randomX: Float,
  randomY: Float,
  randomZ: Float,
  maxSpeed: Float,
  count: Int,
  particle: ParticleOptions(ParticleType),
}, (context) => {
  const particleType = context.declare("particleType", () => VarInt.read(context));
  return [
    context.declare("overrideLimiter", () => Boolean.read(context)),
    context.declare("x", () => Double.read(context)),
    context.declare("y", () => Double.read(context)),
    context.declare("z", () => Double.read(context)),
    context.declare("randomX", () => Float.read(context)),
    context.declare("randomY", () => Float.read(context)),
    context.declare("randomZ", () => Float.read(context)),
    context.declare("maxSpeed", () => Float.read(context)),
    context.declare("count", () => Int.read(context)),
    context.declare("particle", () => {
      return ParticleOptions(
        new ExpressionType("number", particleType.use()),
      ).read(context);
    }),
  ];
}, (context) => {
  ParticleType.write(context, "this.particle.type");
  Boolean.write(context, "this.overrideLimiter");
  Double.write(context, "this.x");
  Double.write(context, "this.y");
  Double.write(context, "this.z");
  Float.write(context, "this.randomX");
  Float.write(context, "this.randomY");
  Float.write(context, "this.randomZ");
  Float.write(context, "this.maxSpeed");
  Int.write(context, "this.count");
  ParticleOptions(new DefinitionType("number")).write(context, "this.particle");
});

packet("ClientboundLightUpdatePacket", {
  chunkX: VarInt,
  chunkZ: VarInt,
  lightData: LightData,
});

packet("ClientboundLoginPacket", {
  entityId: Int,
  hardcore: Boolean,
  gameMode: GameModeByte,
  previousGameMode: NullableGameModeByte,
  levels: List(ResourceLocation.alias("Dimension")),
  registryHolder: Nbt,
  dimensionType: ResourceLocation.alias("DimensionType"),
  dimension: ResourceLocation.alias("Dimension"),
  seed: Long,
  maxPlayers: VarInt,
  chunkRadius: VarInt,
  simulationDistance: VarInt,
  reducedDebugInfo: Boolean,
  showDeathScreen: Boolean,
  isDebug: Boolean,
  isFlat: Boolean,
  lastDeathLocation: Optional(GlobalPos),
});

const MapDecorationType = Enum([
  "player",
  "frame",
  "red_marker",
  "blue_marker",
  "target_x",
  "target_point",
  "player_off_map",
  "player_off_limits",
  "mansion",
  "monument",
  "banner_white",
  "banner_orange",
  "banner_magenta",
  "banner_light_blue",
  "banner_yellow",
  "banner_lime",
  "banner_pink",
  "banner_gray",
  "banner_light_gray",
  "banner_cyan",
  "banner_purple",
  "banner_blue",
  "banner_brown",
  "banner_green",
  "banner_red",
  "banner_black",
  "red_x",
]).alias("MapDecorationType");

const MapDecoration = Struct({
  type: MapDecorationType,
  x: Byte,
  z: Byte,
  rotation: Byte,
  name: Optional(Component),
}).alias("MapDecoration");

const MapPatch = Struct({
  width: Byte,
  height: Byte,
  startX: Byte,
  startZ: Byte,
  colors: ByteArray(),
});

const NullableMapPatch = Custom(Optional(MapPatch), (context) => {
  const patch = context.declare("patch", Optional(MapPatch).definition, "null");
  const width = context.declare("width", () => Byte.read(context));
  context.statement(`if (${width.use()} != 0) {\n${
    context.capture(() => {
      context.statement(`${patch.use()} = ${
        Struct({
          width: new ExpressionType("number", width.use()),
          height: Byte,
          startX: Byte,
          startZ: Byte,
          colors: ByteArray(),
        }).read(context)
      }`);
    }).statementBlock
  }}`);
  return patch.use();
}, (context, value) => {
  context.statement(
    `if (${value} != null) {\n${
      context.capture(() => MapPatch.write(context, value)).statementBlock
    }}`,
  );
  context.statement(`else {\n${context.capture(() => Byte.write(context, "0")).statementBlock}}`);
}).alias("NullableMapPatch");

packet("ClientboundMapItemDataPacket", {
  mapId: VarInt,
  scale: Byte.doc("Value from 0 to 4 (blocks per pixel: 2 ^ scale)"),
  locked: Boolean,
  decorations: Optional(List(MapDecoration)),
  patch: NullableMapPatch,
});

const MerchantOffer = Struct({
  baseCostA: Item,
  result: Item,
  costB: Item,
  isOutOfStock: Boolean,
  uses: Int,
  maxUses: Int,
  xp: Int,
  specialPriceDiff: Int,
  priceMultiplier: Float,
  demand: Int,
}).alias("MerchantOffer");

packet("ClientboundMerchantOffersPacket", {
  containerId: VarInt,
  offers: List(MerchantOffer),
  villagerLevel: VarInt,
  villagerXp: VarInt,
  showProgress: Boolean,
  canRestock: Boolean,
});

packet("ClientboundMoveEntityPosPacket", {
  entityId: VarInt,
  x: Short,
  y: Short,
  z: Short,
  onGround: Boolean,
});

packet("ClientboundMoveEntityPosRotPacket", {
  entityId: VarInt,
  x: Short,
  y: Short,
  z: Short,
  yaw: Byte,
  pitch: Byte,
  onGround: Boolean,
});

packet("ClientboundMoveEntityRotPacket", {
  entityId: VarInt,
  yaw: Byte,
  pitch: Byte,
  onGround: Boolean,
});

packet("ClientboundMoveVehiclePacket", {
  x: Double,
  y: Double,
  z: Double,
  yaw: Float,
  pitch: Float,
});

packet("ClientboundOpenBookPacket", {
  hand: InteractionHand,
});

packet("ClientboundOpenScreenPacket", {
  containerId: VarInt,
  menu: Menu,
  title: Component,
});

packet("ClientboundOpenSignEditorPacket", {
  pos: BlockPos,
});

packet("ClientboundPingPacket", {
  id: Int,
});

packet("ClientboundPlaceGhostRecipePacket", {
  containerId: Byte,
  recipe: ResourceLocation,
});

packet("ClientboundPlayerAbilitiesPacket", {
  flags: BitFlags(Byte, {
    invulnerable: 0x01,
    isFlying: 0x02,
    canFly: 0x04,
    instabuild: 0x08,
  }),
  flyingSpeed: Float,
  walkingSpeed: Float,
});

packet("ClientboundPlayerChatHeaderPacket", {
  header: SignedMessageHeader,
  headerSignature: ByteArray(),
  bodyDigest: ByteArray(),
});

packet("ClientboundPlayerChatPacket", {
  message: Struct({
    signedHeader: SignedMessageHeader,
    headerSignature: ByteArray(),
    signedBody: SignedMessageBody,
    unsignedContent: Optional(Component),
    filterMask: FilterMask,
  }).alias("PlayerChatMessage"),
  chatType: Struct({
    chatType: ChatType,
    name: Component,
    targetName: Optional(Component),
  }).alias("ChatTypeBound"),
});

packet("ClientboundPlayerCombatEndPacket", {
  duration: VarInt,
  killerEntityId: Int,
});

packet("ClientboundPlayerCombatEnterPacket", {});

packet("ClientboundPlayerCombatKillPacket", {
  playerId: VarInt,
  killerEntityId: Int,
  message: Component,
});

packet("ClientboundPlayerInfoPacket", {
  update: TaggedUnion("type", VarInt, {
    "add": Struct({
      players: List(Struct({
        profile: GameProfile,
        gameMode: GameMode,
        latency: VarInt,
        displayName: Optional(Component),
        publicKey: Optional(ProfilePublicKey),
      })),
    }),
    "update_game_mode": Struct({
      entries: List(Struct({
        playerId: Uuid,
        gameMode: GameMode,
      })),
    }),
    "update_latency": Struct({
      entries: List(Struct({
        playerId: Uuid,
        latency: VarInt,
      })),
    }),
    "update_display_name": Struct({
      entries: List(Struct({
        playerId: Uuid,
        displayName: Optional(Component),
      })),
    }),
    "remove": Struct({
      playerIds: List(Uuid),
    }),
  }).alias("PlayerInfoUpdate"),
});

const EntityAnchor = Enum(["feet", "eyes"]).alias("EntityAnchor");

packet("ClientboundPlayerLookAtPacket", {
  from: EntityAnchor,
  x: Double,
  y: Double,
  z: Double,
  atEntity: Optional(Struct({
    id: VarInt,
    to: EntityAnchor,
  })),
});

packet("ClientboundPlayerPositionPacket", {
  x: Double,
  y: Double,
  z: Double,
  yaw: Float,
  pitch: Float,
  relative: BitFlags(Byte, {
    x: 0x01,
    y: 0x02,
    z: 0x04,
    yaw: 0x08,
    pitch: 0x10,
  }),
  teleportId: VarInt,
  dismountVehicle: Boolean,
});

const RecipeBookSettings = Struct({
  open: Boolean,
  filtering: Boolean,
}).alias("RecipeBookSettings");

const RecipeActionType = Enum(["init", "add", "remove"]);

const RecipeAction = (type: Type) => {
  return TaggedUnion("type", type, {
    "init": Struct({ toHighlight: List(ResourceLocation) }),
    "add": null,
    "remove": null,
  }).alias("RecipeAction");
};

packet("ClientboundRecipePacket", {
  bookSettings: Map(RecipeBookType, RecipeBookSettings),
  recipes: List(ResourceLocation),
  action: RecipeAction(RecipeActionType),
}, (context) => {
  const action = context.declare("action", () => VarInt.read(context));
  const map = context.declare(
    "map",
    Map(RecipeBookType, RecipeBookSettings).definition,
    "new Map()",
  );
  return [
    context.declare("bookSettings", () => {
      const { identifier: i } = context.declare("i");
      context.statement(
        `for (let ${i} = 0; ${i} < 4; ${i}++) {\n${
          context.capture(() => {
            const key =
              `Array.from<RecipeBookType>(["crafting", "furnace", "blast_furnace", "smoker"])[${i}]!`;
            context.statement(
              `${map.use()}.set(${key}, ${RecipeBookSettings.read(context)})`,
            );
          }).statementBlock
        }}`,
      );
      return map.use();
    }),
    context.declare("recipes", () => List(ResourceLocation).read(context)),
    context.declare("action", () => {
      return RecipeAction(
        new ExpressionType("number", action.use()),
      ).read(context);
    }),
  ];
}, (context) => {
  RecipeActionType.write(context, `this.action.type`);
  context.statement(
    `for (const bookType of Array.from<RecipeBookType>(["crafting", "furnace", "blast_furnace", "smoker"])) {\n${
      context.capture(() => {
        const settings = context.declare("settings", () => `this.bookSettings.get(bookType)`);
        Boolean.write(context, `${settings.use()}?.open ?? false`);
        Boolean.write(context, `${settings.use()}?.filtering ?? false`);
      }).statementBlock
    }}`,
  );
  List(ResourceLocation).write(context, "this.recipes");
  RecipeAction(new DefinitionType("number")).write(context, "this.action");
});

packet("ClientboundRemoveEntitiesPacket", {
  entityIds: List(VarInt),
});

packet("ClientboundRemoveMobEffectPacket", {
  entityId: VarInt,
  effect: MobEffect,
});

packet("ClientboundResourcePackPacket", {
  url: String(),
  hash: String(40),
  required: Boolean,
  prompt: Optional(Component),
});

packet("ClientboundRespawnPacket", {
  dimensionType: ResourceLocation.alias("DimensionType"),
  dimension: ResourceLocation.alias("Dimension"),
  seed: Long,
  playerGameMode: GameModeByte,
  previousPlayerGameMode: NullableGameModeByte,
  isDebug: Boolean,
  isFlat: Boolean,
  keepAllPlayerData: Boolean,
  lastDeathLocation: Optional(GlobalPos),
});

packet("ClientboundRotateHeadPacket", {
  entityId: VarInt,
  headYaw: Byte,
});

const SectionPos = Packed(Long, [22, 22, 20], (x, z, y) => ({ x, y, z })).alias("SectionPos");

packet("ClientboundSectionBlocksUpdatePacket", {
  sectionPos: SectionPos,
  suppressLightUpdates: Boolean,
  blocks: List(Packed(VarLong, [52, 4, 4, 4], (state, x, z, y) => ({ state, x, y, z }))),
});

packet("ClientboundSelectAdvancementsTabPacket", {
  tab: Optional(ResourceLocation),
});

packet("ClientboundServerDataPacket", {
  motd: Optional(Component),
  icon: Optional(String()).doc("Icon encoded as base64"),
  previewsChat: Boolean,
  enforcesSecureChat: Boolean,
});

packet("ClientboundSetActionBarTextPacket", {
  text: Component,
});

packet("ClientboundSetBorderCenterPacket", {
  centerX: Double,
  centerZ: Double,
});

packet("ClientboundSetBorderLerpSizePacket", {
  oldSize: Double,
  newSize: Double,
  lerpTime: VarLong,
});

packet("ClientboundSetBorderSizePacket", {
  size: Double,
});

packet("ClientboundSetBorderWarningDelayPacket", {
  warningDelay: VarInt,
});

packet("ClientboundSetBorderWarningDistancePacket", {
  warningBlocks: VarInt,
});

packet("ClientboundSetCameraPacket", {
  entityId: VarInt,
});

packet("ClientboundSetCarriedItemPacket", {
  slot: Byte,
});

packet("ClientboundSetChunkCacheCenterPacket", {
  x: VarInt,
  z: VarInt,
});

packet("ClientboundSetChunkCacheRadiusPacket", {
  chunkRadius: VarInt,
});

packet("ClientboundSetDefaultSpawnPositionPacket", {
  pos: BlockPos,
  angle: Float,
});

packet("ClientboundSetDisplayChatPreviewPacket", {
  previewEnabled: Boolean,
});

packet("ClientboundSetDisplayObjectivePacket", {
  slot: Byte,
  objectiveName: String(),
});

const Pose = Enum([
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
]).alias("Pose");

const EntityDataValue = TaggedUnion("type", VarInt, {
  "byte": Struct({ value: Byte }),
  "int": Struct({ value: VarInt }),
  "float": Struct({ value: Float }),
  "string": Struct({ value: String() }),
  "component": Struct({ component: Component }),
  "optional_component": Struct({ component: Optional(Component) }),
  "item_stack": Struct({ itemStack: ItemStack }),
  "boolean": Struct({ value: Boolean }),
  "rotations": Struct({ x: Float, y: Float, z: Float }),
  "block_pos": Struct({ pos: BlockPos }),
  "optional_block_pos": Struct({ pos: Optional(BlockPos) }),
  "direction": Struct({ direction: Direction }),
  "optional_uuid": Struct({ uuid: Optional(Uuid) }),
  "block_state": Struct({ blockState: BlockState }),
  "compound_tag": Struct({ tag: Nbt }),
  "particle": Struct({ particle: ParticleOptions(ParticleType).alias("ParticleOptions") }),
  "villager_data": Struct({
    villagerType: VillagerType,
    profession: VillagerProfession,
    level: VarInt,
  }),
  "optional_unsigned_int": Struct({
    value: Custom(Optional(VarInt), (context) => {
      const value = context.declare("value", () => VarInt.read(context));
      return `${value.use()} > 0 ? ${value.use()} - 1 : null`;
    }, (context, value) => {
      VarInt.write(context, `${value} != null ? ${value} + 1 : 0`);
    }),
  }),
  "pose": Struct({ pose: Pose }),
  "cat_variant": Struct({ variant: CatVariant }),
  "frog_variant": Struct({ variant: FrogVariant }),
  "optional_global_pos": Struct({ globalPos: Optional(GlobalPos) }),
  "painting_variant": Struct({ variant: PaintingVariant }),
}).alias("EntityDataValue");

const EntityData = Custom(Map(Byte, EntityDataValue), (context) => {
  const map = context.declare("map", Map(Byte, EntityDataValue).definition, "new Map()");
  const capture = context.capture(() => {
    const id = context.declare("id", () => `${context.reader}.readByte()`);
    context.statement(`if (${id.use()} == -1) break`);
    return `${map.use()}.set(${id.use()}, ${EntityDataValue.read(context)})`;
  });
  context.statement(`while (true) {\n${capture.statementBlock}${capture.value}}`);
  return map.use();
}, (context, value) => {
  const id = context.declare("id");
  const data = context.declare("data");
  context.statement(
    `for (const [${id.identifier}, ${data.identifier}] of ${value}) {\n${
      context.capture(() => {
        Byte.write(context, id.identifier);
        EntityDataValue.write(context, data.identifier);
      }).statementBlock
    }}`,
  );
  Byte.write(context, "-1");
}).alias("EntityData");

packet("ClientboundSetEntityDataPacket", {
  id: VarInt,
  entityData: EntityData,
});

packet("ClientboundSetEntityLinkPacket", {
  sourceId: Int,
  destId: Int,
});

packet("ClientboundSetEntityMotionPacket", {
  id: VarInt,
  vx: Short.doc("Velocity on the X axis."),
  vy: Short.doc("Velocity on the X axis."),
  vz: Short.doc("Velocity on the X axis."),
});

packet("ClientboundSetEquipmentPacket", {
  entityId: VarInt,
  equipmentSlots: Map(EquipmentSlot, ItemStack),
}, (context) => {
  const entityId = context.declare("entityId", () => VarInt.read(context));
  const equipmentSlots = context.declare(
    "equipmentSlots",
    Map(EquipmentSlot, ItemStack).definition,
    "new Map()",
  );
  const i = context.declare("i", "number");
  context.statement(`do {\n${
    context.capture(() => {
      context.statement(`${i.use()} = ${Byte.read(context)}`);
      // TODO: too hacky
      const slot = context.declare("slot", () => {
        const capture = context.capture(() => EquipmentSlot.inner.read(context));
        return capture.value.replace(`${context.reader}.readVarInt()`, `${i.use()} & 127`);
      });
      context.statement(`${equipmentSlots.use()}.set(${slot.use()}, ${ItemStack.read(context)})`);
    }).statementBlock
  }} while ((i & -128) != 0);`);
  return [entityId, equipmentSlots];
}, (context) => {
  VarInt.write(context, "this.entityId");
  context.statement("const equipmentSlots = [...this.equipmentSlots.keys()]");
  context.statement(`for (let i = 0; i < equipmentSlots.length; i++) {\n${
    context.capture(() => {
      // TODO: too hacky
      const id = context.capture(() => {
        EquipmentSlot.inner.write(context, `equipmentSlots[i]!`);
      }).statementBlock.match(/\((.+)\);/)?.[1]!;
      Byte.write(context, `${id} | (i != equipmentSlots.length - 1 ? -128 : 0)`);
      ItemStack.write(context, "this.equipmentSlots.get(equipmentSlots[i]!)!");
    }).statementBlock
  }}`);
});

packet("ClientboundSetExperiencePacket", {
  experienceProgress: Float,
  experienceLevel: VarInt,
  totalExperience: VarInt,
});

packet("ClientboundSetHealthPacket", {
  health: Float,
  food: VarInt,
  saturation: Float,
});

const ObjectiveData = Struct({
  displayName: Component,
  renderType: Enum(["integer", "hearts"]).alias("CriteriaRenderType"),
});

const ObjectiveAction = TaggedUnion("type", Byte, {
  add: ObjectiveData,
  remove: null,
  change: ObjectiveData,
}).alias("ObjectiveAction");

packet("ClientboundSetObjectivePacket", {
  objectiveName: String(),
  action: ObjectiveAction,
});

packet("ClientboundSetPassengersPacket", {
  vehicleEntityId: VarInt,
  passengerEntityIds: List(VarInt),
});

const SetPlayerTeamParameters = Struct({
  displayName: Component,
  flags: BitFlags(Byte, {
    allowFriendlyFire: 0x1,
    seeFriendlyInvisibles: 0x2,
  }),
  nametagVisibility: String(),
  collisionRule: String(),
  color: ChatFormatting,
  playerPrefix: Component,
  playerSuffix: Component,
});

const SetPlayerTeamPlayers = Struct({
  players: List(String()),
});

packet("ClientboundSetPlayerTeamPacket", {
  teamName: String(),
  action: TaggedUnion("type", Byte, {
    "add_team": Merge(SetPlayerTeamParameters, SetPlayerTeamPlayers),
    "remove_team": null,
    "modify_team": SetPlayerTeamParameters,
    "add_players": SetPlayerTeamPlayers,
    "remove_players": SetPlayerTeamPlayers,
  }),
});

packet("ClientboundSetScorePacket", {
  owner: String(),
  action: TaggedUnion("type", VarInt, {
    "update": Struct({ objective: String(), score: VarInt }),
    "remove": Struct({ objective: String() }),
  }).alias("ScoreboardAction"),
});

packet("ClientboundSetSimulationDistancePacket", {
  simulationDistance: VarInt,
});

packet("ClientboundSetSubtitleTextPacket", {
  subtitle: Component,
});

packet("ClientboundSetTimePacket", {
  gameTime: Long,
  dayTime: Long,
});

packet("ClientboundSetTitleTextPacket", {
  title: Component,
});

packet("ClientboundSetTitlesAnimationPacket", {
  fadeIn: Int,
  stay: Int,
  fadeOut: Int,
});

packet("ClientboundSoundEntityPacket", {
  sound: SoundEvent,
  source: SoundSource,
  id: VarInt,
  volume: Float,
  pitch: Float,
  seed: Long,
});

packet("ClientboundSoundPacket", {
  sound: SoundEvent,
  source: SoundSource,
  x: Int,
  y: Int,
  z: Int,
  volume: Float,
  pitch: Float,
  seed: Long,
});

packet("ClientboundStopSoundPacket", {
  source: Optional(SoundSource),
  sound: Optional(ResourceLocation),
}, (context) => {
  const flags = context.declare("flags", () => Byte.read(context));
  return [
    context.declare("source", () => {
      return SoundSource.optional(
        new ExpressionType("boolean", `(${flags.use()} & 0x1) != 0`),
      ).read(context);
    }),
    context.declare("sound", () => {
      return ResourceLocation.optional(
        new ExpressionType("boolean", `(${flags.use()} & 0x1) != 0`),
      ).read(context);
    }),
  ];
}, (context) => {
  Byte.write(context, `-(this.source != null) & 0x1 | -(this.sound != null) & 0x2`);
  SoundSource.optional(
    new ExpressionType("boolean", "this.source != null"),
  ).write(context, "this.source");
  ResourceLocation.optional(
    new ExpressionType("boolean", "this.sound != null"),
  ).write(context, "this.sound");
});

packet("ClientboundSystemChatPacket", {
  content: Component,
  overlay: Boolean,
});

packet("ClientboundTabListPacket", {
  header: Component,
  footer: Component,
});

packet("ClientboundTagQueryPacket", {
  transactionId: VarInt,
  tag: Nbt,
});

packet("ClientboundTakeItemEntityPacket", {
  entityId: VarInt,
  playerId: VarInt,
  amount: VarInt,
});

packet("ClientboundTeleportEntityPacket", {
  entityId: VarInt,
  x: Double,
  y: Double,
  z: Double,
  yaw: Byte,
  pitch: Byte,
  onGround: Boolean,
});

const FrameType = Enum([
  "task",
  "challenge",
  "goal",
]).alias("FrameType");

const DisplayInfo = Merge(
  Struct({
    title: Component,
    description: Component,
    icon: ItemStack,
    frame: FrameType,
  }),
  CustomStruct({
    background: Optional(ResourceLocation),
    showToast: Boolean,
    hidden: Boolean,
  }, (context) => {
    const flags = context.declare("flags", () => Int.read(context));
    const background = context.declare("background", Optional(ResourceLocation).definition, "null");
    context.statement(
      `if ((${flags.use()} & 0x1) != 0) ${background.use()} = ${ResourceLocation.read(context)}`,
    );
    return {
      background,
      showToast: context.declare("showToast", () => `(${flags.use()} & 0x2) != 0`),
      hidden: context.declare("hidden", () => `(${flags.use()} & 0x4) != 0`),
    };
  }, (context, value) => {
    Int.write(
      context,
      `-(${value}.background != null) & 0x1 | -${value}.showToast & 0x2 | -${value}.hidden & 0x4`,
    );
    context.statement(
      `if (${value}.background != null) {\n${
        context.capture(() => {
          ResourceLocation.write(context, `${value}.background`);
        }).statementBlock
      }}`,
    );
  }),
  Struct({
    x: Float,
    y: Float,
  }),
).alias("DisplayInfo");

const Advancement = Struct({
  parentId: Optional(ResourceLocation),
  display: Optional(DisplayInfo),
  criteria: List(String()),
  requirements: List(List(String())),
}).alias("Advancement");

const CriterionProgress = Struct({
  obtainedAt: Optional(Date),
}).alias("CriterionProgress");

const AdvancementProgress = Map(ResourceLocation, CriterionProgress).alias("AdvancementProgress");

packet("ClientboundUpdateAdvancementsPacket", {
  reset: Boolean,
  added: Map(ResourceLocation, Advancement),
  removed: List(ResourceLocation),
  progress: Map(ResourceLocation, AdvancementProgress),
});

const AttributeModifier = Struct({
  id: Uuid,
  amount: Double,
  operation: Enum(["addition", "multiply_base", "multiply_total"]),
}).alias("AttributeModifier");

const Attribute = Struct({
  id: ResourceLocation,
  base: Double,
  modifiers: List(AttributeModifier),
}).alias("Attribute");

packet("ClientboundUpdateAttributesPacket", {
  entityId: VarInt,
  attributes: List(Attribute),
});

packet("ClientboundUpdateMobEffectPacket", {
  entityId: VarInt,
  effect: MobEffect,
  effectAmplifier: Byte,
  effectDurationTicks: VarInt,
  flags: BitFlags(Byte, {
    isAmbient: 0x1,
    isVisible: 0x2,
    showIcon: 0x4,
  }),
  factorData: Optional(Nbt),
});

const Ingredient = List(ItemStack).alias("Ingredient");

const CookingRecipeSerializer = Struct({
  group: String(),
  ingredient: Ingredient,
  result: ItemStack,
  experience: Float,
  cookingTime: VarInt,
});

const RecipeSerializer = (type: Type) => {
  return TaggedUnion("id", type, {
    "crafting_shaped": CustomStruct({
      width: VarInt,
      height: VarInt,
      group: String(),
      ingredients: List(Ingredient),
      result: ItemStack,
    }, (context) => {
      const width = context.declare("width", () => VarInt.read(context));
      const height = context.declare("height", () => VarInt.read(context));
      return {
        width,
        height,
        group: context.declare("group", () => String().read(context)),
        ingredients: context.declare("ingredients", () => {
          return List(
            Ingredient,
            new ExpressionType("number", `${width.use()} * ${height.use()}`),
          ).read(context);
        }),
        result: context.declare("result", () => ItemStack.read(context)),
      };
    }, (context, value) => {
      VarInt.write(context, `${value}.width`);
      VarInt.write(context, `${value}.height`);
      String().write(context, `${value}.group`);
      List(Ingredient, 0).write(context, `${value}.ingredients`);
      ItemStack.write(context, `${value}.result`);
    }),
    "crafting_shapeless": Struct({
      group: String(),
      ingredients: List(Ingredient),
      result: ItemStack,
    }),
    "crafting_special_armordye": null,
    "crafting_special_bookcloning": null,
    "crafting_special_mapcloning": null,
    "crafting_special_mapextending": null,
    "crafting_special_firework_rocket": null,
    "crafting_special_firework_star": null,
    "crafting_special_firework_star_fade": null,
    "crafting_special_tippedarrow": null,
    "crafting_special_bannerduplicate": null,
    "crafting_special_shielddecoration": null,
    "crafting_special_shulkerboxcoloring": null,
    "crafting_special_suspiciousstew": null,
    "crafting_special_repairitem": null,
    "smelting": CookingRecipeSerializer,
    "blasting": CookingRecipeSerializer,
    "smoking": CookingRecipeSerializer,
    "campfire_cooking": CookingRecipeSerializer,
    "stonecutting": Struct({
      group: String(),
      ingredient: Ingredient,
      result: ItemStack,
    }),
    "smithing": Struct({
      base: Ingredient,
      addition: Ingredient,
      result: ItemStack,
    }),
  }).alias("RecipeSerializer");
};

const Recipe = CustomStruct({
  recipeId: ResourceLocation,
  serializer: RecipeSerializer(ResourceLocation),
}, (context) => {
  const serializerId = context.declare("serializerId", () => ResourceLocation.read(context));
  return {
    recipeId: context.declare("recipeId", () => ResourceLocation.read(context)),
    serializer: context.declare("serializer", () => {
      return RecipeSerializer(
        new ExpressionType("string", `${serializerId.use()}.path`),
      ).read(context);
    }),
  };
}, (context, value) => {
  ResourceLocation.write(context, `new ResourceLocation("minecraft", ${value}.serializer.id)`);
  ResourceLocation.write(context, `${value}.recipeId`);
  RecipeSerializer(new DefinitionType("string")).write(context, `${value}.serializer`);
}).alias("Recipe");

packet("ClientboundUpdateRecipesPacket", {
  recipes: List(Recipe),
});

packet("ClientboundUpdateTagsPacket", {
  tags: Map(ResourceLocation, Map(ResourceLocation, List(VarInt))),
});

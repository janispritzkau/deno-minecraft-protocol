import { flow, packet } from "../../protocol.ts";
import {
  BitFlags,
  Boolean,
  Byte,
  ByteArray,
  Data,
  Double,
  Enum,
  Float,
  Int,
  List,
  Long,
  Map,
  Optional,
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
import { MobEffect } from "../../registry_types.ts";
import {
  ArgumentSignatures,
  BlockPos,
  ChatVisiblity,
  ClickType,
  Direction,
  HumanoidArm,
  InteractionHand,
  ItemStack,
  LastSeenMessagesUpdate,
  PlayerAction,
  RecipeBookType,
  ResourceLocation,
} from "../../protocol_types.ts";

flow("serverbound");

packet("ServerboundAcceptTeleportationPacket", {
  id: VarInt,
});

packet("ServerboundBlockEntityTagQueryPacket", {
  transactionId: VarInt,
  pos: BlockPos,
});

packet("ServerboundChangeDifficultyPacket", {
  difficulty: UnsignedByte,
});

packet("ServerboundChatAckPacket", {
  lastSeenMessages: LastSeenMessagesUpdate,
});

packet("ServerboundChatCommandPacket", {
  command: String(256),
  timeStamp: Long,
  salt: Long,
  argumentSignatures: ArgumentSignatures,
  signedPreview: Boolean,
  lastSeenMessages: LastSeenMessagesUpdate,
});

packet("ServerboundChatPacket", {
  message: String(256),
  timeStamp: Long,
  salt: Long,
  signature: ByteArray().alias("MessageSignature"),
  signedPreview: Boolean,
  lastSeenMessages: LastSeenMessagesUpdate,
});

packet("ServerboundChatPreviewPacket", {
  transactionId: Int,
  message: String(256),
});

packet("ServerboundClientCommandPacket", {
  action: Enum(["perform_respawn", "request_stats"]).alias("ClientCommandAction"),
});

packet("ServerboundClientInformationPacket", {
  language: String(16),
  viewDistance: Byte,
  chatVisibility: ChatVisiblity,
  chatColors: Boolean,
  modelCustomisation: Byte,
  mainHand: HumanoidArm,
  textFilteringEnabled: Boolean,
  allowsListing: Boolean,
});

packet("ServerboundCommandSuggestionPacket", {
  transactionId: VarInt,
  command: String(32500),
});

packet("ServerboundContainerButtonClickPacket", {
  containerId: Byte,
  buttonId: Byte,
});

packet("ServerboundContainerClickPacket", {
  containerId: Byte,
  stateId: VarInt,
  slotNum: Short,
  buttonNum: Byte,
  clickType: ClickType,
  changedSlots: Map(Short, ItemStack),
  carriedItem: ItemStack,
});

packet("ServerboundContainerClosePacket", {
  containerId: Byte,
});

packet("ServerboundCustomPayloadPacket", {
  identifier: ResourceLocation,
  data: Data(REMAINING_BYTES),
});

packet("ServerboundEditBookPacket", {
  slot: VarInt,
  pages: List(String(8192)),
  title: Optional(String(128)),
});

packet("ServerboundEntityTagQueryPacket", {
  transactionId: VarInt,
  entityId: VarInt,
});

packet("ServerboundInteractPacket", {
  entityId: VarInt,
  action: TaggedUnion("type", VarInt, {
    interact: Struct({ hand: InteractionHand }),
    attack: null,
    interact_at: Struct({
      location: Struct({ x: Float, y: Float, z: Float }),
      hand: InteractionHand,
    }),
  }),
  usingSecondaryAction: Boolean,
});

packet("ServerboundJigsawGeneratePacket", {
  pos: BlockPos,
  levels: VarInt,
  keepJigsaws: Boolean,
});

packet("ServerboundKeepAlivePacket", {
  id: Long,
});

packet("ServerboundLockDifficultyPacket", {
  locked: Boolean,
});

packet("ServerboundMovePlayerPosPacket", {
  x: Double,
  y: Double,
  z: Double,
  onGround: Boolean,
});

packet("ServerboundMovePlayerPosRotPacket", {
  x: Double,
  y: Double,
  z: Double,
  yRot: Float,
  xRot: Float,
  onGround: Boolean,
});

packet("ServerboundMovePlayerRotPacket", {
  yRot: Float,
  xRot: Float,
  onGround: Boolean,
});

packet("ServerboundMovePlayerStatusOnlyPacket", {
  onGround: Boolean,
});

packet("ServerboundMoveVehiclePacket", {
  x: Double,
  y: Double,
  z: Double,
  yRot: Float,
  xRot: Float,
});

packet("ServerboundPaddleBoatPacket", {
  left: Boolean,
  right: Boolean,
});

packet("ServerboundPickItemPacket", {
  slot: VarInt,
});

packet("ServerboundPlaceRecipePacket", {
  containerId: Byte,
  recipe: ResourceLocation,
  shiftDown: Boolean,
});

packet("ServerboundPlayerAbilitiesPacket", {
  flags: BitFlags(Byte, {
    isFlying: 0x02,
  }),
});

packet("ServerboundPlayerActionPacket", {
  action: PlayerAction,
  pos: BlockPos,
  direction: Direction,
  sequence: VarInt,
});

packet("ServerboundPlayerCommandPacket", {
  id: VarInt,
  command: Enum([
    "press_shift_key",
    "release_shift_key",
    "stop_sleeping",
    "start_sprinting",
    "stop_sprinting",
    "start_riding_jump",
    "stop_riding_jump",
    "open_inventory",
    "start_fall_flying",
  ]).alias("PlayerCommand"),
  data: VarInt,
});

packet("ServerboundPlayerInputPacket", {
  xxa: Float,
  zza: Float,
  fields: BitFlags(Byte, {
    isJumping: 0x01,
    isShiftKeyDown: 0x02,
  }),
});

packet("ServerboundPongPacket", {
  id: Int,
});

packet("ServerboundRecipeBookChangeSettingsPacket", {
  bookType: RecipeBookType,
  isOpen: Boolean,
  isFiltering: Boolean,
});

packet("ServerboundRecipeBookSeenRecipePacket", {
  recipe: ResourceLocation,
});

packet("ServerboundRenameItemPacket", {
  name: String(),
});

packet("ServerboundResourcePackPacket", {
  action: Enum([
    "successfully_loaded",
    "declined",
    "failed_download",
    "accepted",
  ]).alias("ResourcePackAction"),
});

packet("ServerboundSeenAdvancementsPacket", {
  action: TaggedUnion("type", VarInt, {
    opened_tab: Struct({ tab: ResourceLocation }),
    closed_screen: null,
  }),
});

packet("ServerboundSelectTradePacket", {
  item: VarInt,
});

packet("ServerboundSetBeaconPacket", {
  primary: Optional(MobEffect),
  secondary: Optional(MobEffect),
});

packet("ServerboundSetCarriedItemPacket", {
  slot: Short,
});

packet("ServerboundSetCommandBlockPacket", {
  pos: BlockPos,
  command: String(),
  mode: Enum(["sequence", "auto", "redstone"]).alias("CommandBlockMode"),
  fields: BitFlags(Byte, {
    trackOutput: 0x01,
    conditional: 0x02,
    automatic: 0x04,
  }),
});

packet("ServerboundSetCommandMinecartPacket", {
  entity: VarInt,
  command: String(),
  trackOutput: Boolean,
});

packet("ServerboundSetCreativeModeSlotPacket", {
  slotNum: Short,
  itemStack: ItemStack,
});

packet("ServerboundSetJigsawBlockPacket", {
  pos: BlockPos,
  name: ResourceLocation,
  target: ResourceLocation,
  pool: ResourceLocation,
  finalState: String(),
  joint: Enum(["rollable", "aligned"]).alias("JigsawBlockJointType"),
});

const StructureBlockUpdateType = Enum([
  "update_data",
  "save_area",
  "load_area",
  "scan_area",
]).alias("StructureBlockUpdateType");

const StructureMode = Enum([
  "save",
  "load",
  "corner",
  "data",
]).alias("StructureMode");

const Mirror = Enum([
  "none",
  "left_right",
  "front_back",
]).alias("Mirror");

const Rotation = Enum([
  "none",
  "clockwise_90",
  "clockwise_180",
  "counterclockwise_90",
]).alias("Rotation");

packet("ServerboundSetStructureBlockPacket", {
  pos: BlockPos,
  updateType: StructureBlockUpdateType,
  mode: StructureMode,
  name: String(),
  offset: Struct({ x: Byte, y: Byte, z: Byte }),
  size: Struct({ x: Byte, y: Byte, z: Byte }),
  mirror: Mirror,
  rotation: Rotation,
  data: String(128),
  integrity: Float,
  seed: VarLong,
  flags: BitFlags(Byte, {
    ignoreEntities: 0x01,
    showAir: 0x02,
    showBoundingBox: 0x04,
  }),
});

packet("ServerboundSignUpdatePacket", {
  pos: BlockPos,
  lines: List(String(384), 4),
});

packet("ServerboundSwingPacket", {
  hand: InteractionHand,
});

packet("ServerboundTeleportToEntityPacket", {
  uuid: Uuid,
});

packet("ServerboundUseItemOnPacket", {
  hand: InteractionHand,
  blockHit: Struct({
    blockPos: BlockPos,
    direction: Direction,
    location: Struct({ x: Float, y: Float, z: Float }).doc(
      "Position relative to the block's origin.",
    ),
    inside: Boolean,
  }).alias("BlockHitResult"),
  sequence: VarInt,
});

packet("ServerboundUseItemPacket", {
  hand: InteractionHand,
  sequence: VarInt,
});

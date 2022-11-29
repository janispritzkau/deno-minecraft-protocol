// deno-lint-ignore-file
import { Reader, Writer } from "minecraft/io/mod.ts";
import { Packet, PacketHandler } from "minecraft/network/packet.ts";
import {
  ArgumentSignatures,
  BlockPos,
  ChatVisiblity,
  chatVisiblityEnum,
  ClickType,
  clickTypeEnum,
  createEnumMapper,
  Direction,
  directionEnum,
  HumanoidArm,
  humanoidArmEnum,
  InteractionHand,
  interactionHandEnum,
  ItemStack,
  LastSeenMessagesUpdate,
  MessageSignature,
  MobEffect,
  mobEffectEnum,
  PlayerAction,
  playerActionEnum,
  readArgumentSignatureEntry,
  readArgumentSignatures,
  readBlockPos,
  readChatVisiblity,
  readClickType,
  readDirection,
  readHumanoidArm,
  readInteractionHand,
  readItem,
  readItemStack,
  readLastSeenMessagesEntry,
  readLastSeenMessagesUpdate,
  readMobEffect,
  readPlayerAction,
  readRecipeBookType,
  readResourceLocation,
  RecipeBookType,
  recipeBookTypeEnum,
  ResourceLocation,
  writeArgumentSignatureEntry,
  writeArgumentSignatures,
  writeBlockPos,
  writeChatVisiblity,
  writeClickType,
  writeDirection,
  writeHumanoidArm,
  writeInteractionHand,
  writeItem,
  writeItemStack,
  writeLastSeenMessagesEntry,
  writeLastSeenMessagesUpdate,
  writeMobEffect,
  writePlayerAction,
  writeRecipeBookType,
  writeResourceLocation,
} from "../types.ts";

export type ClientCommandAction = "perform_respawn" | "request_stats";

export const clientCommandActionEnum = createEnumMapper<ClientCommandAction>(["perform_respawn", "request_stats"]);

export const mapper1 = createEnumMapper([
  "press_shift_key",
  "release_shift_key",
  "stop_sleeping",
  "start_sprinting",
  "stop_sprinting",
  "start_riding_jump",
  "stop_riding_jump",
  "open_inventory",
  "start_fall_flying",
]);

export const mapper2 = createEnumMapper(["successfully_loaded", "declined", "failed_download", "accepted"]);

export type CommandBlockMode = "sequence" | "auto" | "redstone";

export const commandBlockModeEnum = createEnumMapper<CommandBlockMode>(["sequence", "auto", "redstone"]);

export type JigsawBlockJointType = "rollable" | "aligned";

export const jigsawBlockJointTypeEnum = createEnumMapper<JigsawBlockJointType>(["rollable", "aligned"]);

export type StructureBlockUpdateType = "update_data" | "save_area" | "load_area" | "scan_area";

export const structureBlockUpdateTypeEnum = createEnumMapper<StructureBlockUpdateType>(["update_data", "save_area", "load_area", "scan_area"]);

export type StructureMode = "save" | "load" | "corner" | "data";

export const structureModeEnum = createEnumMapper<StructureMode>(["save", "load", "corner", "data"]);

export type Mirror = "none" | "left_right" | "front_back";

export const mirrorEnum = createEnumMapper<Mirror>(["none", "left_right", "front_back"]);

export type Rotation = "none" | "clockwise_90" | "clockwise_180" | "counterclockwise_90";

export const rotationEnum = createEnumMapper<Rotation>(["none", "clockwise_90", "clockwise_180", "counterclockwise_90"]);

export type BlockHitResult = {
  blockPos: BlockPos;
  direction: Direction;
  /** Relative to the block position */
  location: { x: number; y: number; z: number };
  inside: boolean;
};

export interface ServerGameHandler extends PacketHandler {
  handleAcceptTeleportation?(packet: ServerboundAcceptTeleportationPacket): Promise<void>;
  handleBlockEntityTagQuery?(packet: ServerboundBlockEntityTagQueryPacket): Promise<void>;
  handleChangeDifficulty?(packet: ServerboundChangeDifficultyPacket): Promise<void>;
  handleChatAck?(packet: ServerboundChatAckPacket): Promise<void>;
  handleChatCommand?(packet: ServerboundChatCommandPacket): Promise<void>;
  handleChat?(packet: ServerboundChatPacket): Promise<void>;
  handleChatPreview?(packet: ServerboundChatPreviewPacket): Promise<void>;
  handleClientCommand?(packet: ServerboundClientCommandPacket): Promise<void>;
  handleClientInformation?(packet: ServerboundClientInformationPacket): Promise<void>;
  handleCommandSuggestion?(packet: ServerboundCommandSuggestionPacket): Promise<void>;
  handleContainerButtonClick?(packet: ServerboundContainerButtonClickPacket): Promise<void>;
  handleContainerClick?(packet: ServerboundContainerClickPacket): Promise<void>;
  handleContainerClose?(packet: ServerboundContainerClosePacket): Promise<void>;
  handleCustomPayload?(packet: ServerboundCustomPayloadPacket): Promise<void>;
  handleEditBook?(packet: ServerboundEditBookPacket): Promise<void>;
  handleEntityTagQuery?(packet: ServerboundEntityTagQueryPacket): Promise<void>;
  handleInteract?(packet: ServerboundInteractPacket): Promise<void>;
  handleJigsawGenerate?(packet: ServerboundJigsawGeneratePacket): Promise<void>;
  handleKeepAlive?(packet: ServerboundKeepAlivePacket): Promise<void>;
  handleLockDifficulty?(packet: ServerboundLockDifficultyPacket): Promise<void>;
  handleMovePlayerPos?(packet: ServerboundMovePlayerPosPacket): Promise<void>;
  handleMovePlayerPosRot?(packet: ServerboundMovePlayerPosRotPacket): Promise<void>;
  handleMovePlayerRot?(packet: ServerboundMovePlayerRotPacket): Promise<void>;
  handleMovePlayerStatusOnly?(packet: ServerboundMovePlayerStatusOnlyPacket): Promise<void>;
  handleMoveVehicle?(packet: ServerboundMoveVehiclePacket): Promise<void>;
  handlePaddleBoat?(packet: ServerboundPaddleBoatPacket): Promise<void>;
  handlePickItem?(packet: ServerboundPickItemPacket): Promise<void>;
  handlePlaceRecipe?(packet: ServerboundPlaceRecipePacket): Promise<void>;
  handlePlayerAbilities?(packet: ServerboundPlayerAbilitiesPacket): Promise<void>;
  handlePlayerAction?(packet: ServerboundPlayerActionPacket): Promise<void>;
  handlePlayerCommand?(packet: ServerboundPlayerCommandPacket): Promise<void>;
  handlePlayerInput?(packet: ServerboundPlayerInputPacket): Promise<void>;
  handlePong?(packet: ServerboundPongPacket): Promise<void>;
  handleRecipeBookChangeSettings?(packet: ServerboundRecipeBookChangeSettingsPacket): Promise<void>;
  handleRecipeBookSeenRecipe?(packet: ServerboundRecipeBookSeenRecipePacket): Promise<void>;
  handleRenameItem?(packet: ServerboundRenameItemPacket): Promise<void>;
  handleResourcePack?(packet: ServerboundResourcePackPacket): Promise<void>;
  handleSeenAdvancements?(packet: ServerboundSeenAdvancementsPacket): Promise<void>;
  handleSelectTrade?(packet: ServerboundSelectTradePacket): Promise<void>;
  handleSetBeacon?(packet: ServerboundSetBeaconPacket): Promise<void>;
  handleSetCarriedItem?(packet: ServerboundSetCarriedItemPacket): Promise<void>;
  handleSetCommandBlock?(packet: ServerboundSetCommandBlockPacket): Promise<void>;
  handleSetCommandMinecart?(packet: ServerboundSetCommandMinecartPacket): Promise<void>;
  handleSetCreativeModeSlot?(packet: ServerboundSetCreativeModeSlotPacket): Promise<void>;
  handleSetJigsawBlock?(packet: ServerboundSetJigsawBlockPacket): Promise<void>;
  handleSetStructureBlock?(packet: ServerboundSetStructureBlockPacket): Promise<void>;
  handleSignUpdate?(packet: ServerboundSignUpdatePacket): Promise<void>;
  handleSwing?(packet: ServerboundSwingPacket): Promise<void>;
  handleTeleportToEntity?(packet: ServerboundTeleportToEntityPacket): Promise<void>;
  handleUseItemOn?(packet: ServerboundUseItemOnPacket): Promise<void>;
  handleUseItem?(packet: ServerboundUseItemPacket): Promise<void>;
}

export class ServerboundAcceptTeleportationPacket implements Packet<ServerGameHandler> {
  constructor(
    public id: number,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    return new this(id);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleAcceptTeleportation?.(this);
  }
}

export class ServerboundBlockEntityTagQueryPacket implements Packet<ServerGameHandler> {
  constructor(
    public transactionId: number,
    public pos: BlockPos,
  ) {}
  static read(reader: Reader) {
    const transactionId = reader.readVarInt();
    const pos = readBlockPos(reader);
    return new this(transactionId, pos);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.transactionId);
    writeBlockPos(writer, this.pos);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleBlockEntityTagQuery?.(this);
  }
}

export class ServerboundChangeDifficultyPacket implements Packet<ServerGameHandler> {
  constructor(
    public difficulty: number,
  ) {}
  static read(reader: Reader) {
    const difficulty = reader.readUnsignedByte();
    return new this(difficulty);
  }
  write(writer: Writer) {
    writer.writeUnsignedByte(this.difficulty);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleChangeDifficulty?.(this);
  }
}

export class ServerboundChatAckPacket implements Packet<ServerGameHandler> {
  constructor(
    public lastSeenMessages: LastSeenMessagesUpdate,
  ) {}
  static read(reader: Reader) {
    const lastSeenMessages = readLastSeenMessagesUpdate(reader);
    return new this(lastSeenMessages);
  }
  write(writer: Writer) {
    writeLastSeenMessagesUpdate(writer, this.lastSeenMessages);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleChatAck?.(this);
  }
}

export class ServerboundChatCommandPacket implements Packet<ServerGameHandler> {
  constructor(
    public command: string,
    public timeStamp: bigint,
    public salt: bigint,
    public argumentSignatures: ArgumentSignatures,
    public signedPreview: boolean,
    public lastSeenMessages: LastSeenMessagesUpdate,
  ) {}
  static read(reader: Reader) {
    const command = reader.readString(256);
    const timeStamp = reader.readLong();
    const salt = reader.readLong();
    const argumentSignatures = readArgumentSignatures(reader);
    const signedPreview = reader.readBoolean();
    const lastSeenMessages = readLastSeenMessagesUpdate(reader);
    return new this(command, timeStamp, salt, argumentSignatures, signedPreview, lastSeenMessages);
  }
  write(writer: Writer) {
    writer.writeString(this.command);
    writer.writeLong(this.timeStamp);
    writer.writeLong(this.salt);
    writeArgumentSignatures(writer, this.argumentSignatures);
    writer.writeBoolean(this.signedPreview);
    writeLastSeenMessagesUpdate(writer, this.lastSeenMessages);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleChatCommand?.(this);
  }
}

export class ServerboundChatPacket implements Packet<ServerGameHandler> {
  constructor(
    public message: string,
    public timeStamp: bigint,
    public salt: bigint,
    public signature: MessageSignature,
    public signedPreview: boolean,
    public lastSeenMessages: LastSeenMessagesUpdate,
  ) {}
  static read(reader: Reader) {
    const message = reader.readString(256);
    const timeStamp = reader.readLong();
    const salt = reader.readLong();
    const signature = reader.readByteArray();
    const signedPreview = reader.readBoolean();
    const lastSeenMessages = readLastSeenMessagesUpdate(reader);
    return new this(message, timeStamp, salt, signature, signedPreview, lastSeenMessages);
  }
  write(writer: Writer) {
    writer.writeString(this.message);
    writer.writeLong(this.timeStamp);
    writer.writeLong(this.salt);
    writer.writeByteArray(this.signature);
    writer.writeBoolean(this.signedPreview);
    writeLastSeenMessagesUpdate(writer, this.lastSeenMessages);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleChat?.(this);
  }
}

export class ServerboundChatPreviewPacket implements Packet<ServerGameHandler> {
  constructor(
    public queryId: number,
    public query: string,
  ) {}
  static read(reader: Reader) {
    const queryId = reader.readInt();
    const query = reader.readString(256);
    return new this(queryId, query);
  }
  write(writer: Writer) {
    writer.writeInt(this.queryId);
    writer.writeString(this.query);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleChatPreview?.(this);
  }
}

export class ServerboundClientCommandPacket implements Packet<ServerGameHandler> {
  constructor(
    public action: ClientCommandAction,
  ) {}
  static read(reader: Reader) {
    const action = clientCommandActionEnum.fromId(reader.readVarInt());
    return new this(action);
  }
  write(writer: Writer) {
    writer.writeVarInt(clientCommandActionEnum.toId(this.action));
  }
  handle(handler: ServerGameHandler) {
    return handler.handleClientCommand?.(this);
  }
}

export class ServerboundClientInformationPacket implements Packet<ServerGameHandler> {
  constructor(
    public language: string,
    public viewDistance: number,
    public chatVisibility: ChatVisiblity,
    public chatColors: boolean,
    public modelCustomisation: number,
    public mainHand: HumanoidArm,
    public textFilteringEnabled: boolean,
    public allowsListing: boolean,
  ) {}
  static read(reader: Reader) {
    const language = reader.readString(16);
    const viewDistance = reader.readByte();
    const chatVisibility = readChatVisiblity(reader);
    const chatColors = reader.readBoolean();
    const modelCustomisation = reader.readByte();
    const mainHand = readHumanoidArm(reader);
    const textFilteringEnabled = reader.readBoolean();
    const allowsListing = reader.readBoolean();
    return new this(language, viewDistance, chatVisibility, chatColors, modelCustomisation, mainHand, textFilteringEnabled, allowsListing);
  }
  write(writer: Writer) {
    writer.writeString(this.language);
    writer.writeByte(this.viewDistance);
    writeChatVisiblity(writer, this.chatVisibility);
    writer.writeBoolean(this.chatColors);
    writer.writeByte(this.modelCustomisation);
    writeHumanoidArm(writer, this.mainHand);
    writer.writeBoolean(this.textFilteringEnabled);
    writer.writeBoolean(this.allowsListing);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleClientInformation?.(this);
  }
}

export class ServerboundCommandSuggestionPacket implements Packet<ServerGameHandler> {
  constructor(
    public id: number,
    public command: string,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    const command = reader.readString(32500);
    return new this(id, command);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    writer.writeString(this.command);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleCommandSuggestion?.(this);
  }
}

export class ServerboundContainerButtonClickPacket implements Packet<ServerGameHandler> {
  constructor(
    public containerId: number,
    public buttonId: number,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readByte();
    const buttonId = reader.readByte();
    return new this(containerId, buttonId);
  }
  write(writer: Writer) {
    writer.writeByte(this.containerId);
    writer.writeByte(this.buttonId);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleContainerButtonClick?.(this);
  }
}

export class ServerboundContainerClickPacket implements Packet<ServerGameHandler> {
  constructor(
    public containerId: number,
    public stateId: number,
    public slotNum: number,
    public buttonNum: number,
    public clickType: ClickType,
    public changedSlots: Map<number, ItemStack>,
    public carriedItem: ItemStack,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readByte();
    const stateId = reader.readVarInt();
    const slotNum = reader.readShort();
    const buttonNum = reader.readByte();
    const clickType = readClickType(reader);
    const map: Map<number, ItemStack> = new Map();
    for (let i = reader.readVarInt(); i--;) {
      const key = reader.readShort();
      const value = readItemStack(reader);
      map.set(key, value);
    }
    const changedSlots = map;
    const carriedItem = readItemStack(reader);
    return new this(containerId, stateId, slotNum, buttonNum, clickType, changedSlots, carriedItem);
  }
  write(writer: Writer) {
    writer.writeByte(this.containerId);
    writer.writeVarInt(this.stateId);
    writer.writeShort(this.slotNum);
    writer.writeByte(this.buttonNum);
    writeClickType(writer, this.clickType);
    writer.writeVarInt(this.changedSlots.size);
    for (const [key, value] of this.changedSlots) {
      writer.writeShort(key);
      writeItemStack(writer, value);
    }
    writeItemStack(writer, this.carriedItem);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleContainerClick?.(this);
  }
}

export class ServerboundContainerClosePacket implements Packet<ServerGameHandler> {
  constructor(
    public containerId: number,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readByte();
    return new this(containerId);
  }
  write(writer: Writer) {
    writer.writeByte(this.containerId);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleContainerClose?.(this);
  }
}

export class ServerboundCustomPayloadPacket implements Packet<ServerGameHandler> {
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
  handle(handler: ServerGameHandler) {
    return handler.handleCustomPayload?.(this);
  }
}

export class ServerboundEditBookPacket implements Packet<ServerGameHandler> {
  constructor(
    public slot: number,
    public pages: string[],
    public title: string | null,
  ) {}
  static read(reader: Reader) {
    const slot = reader.readVarInt();
    const list: string[] = [];
    for (let i = reader.readVarInt(); i--;) list.push(reader.readString(8192));
    const pages = list;
    const title = reader.readBoolean() ? reader.readString(128) : null;
    return new this(slot, pages, title);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.slot);
    writer.writeVarInt(this.pages.length);
    for (const item of this.pages) writer.writeString(item);
    writer.writeBoolean(this.title != null);
    if (this.title != null) writer.writeString(this.title);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleEditBook?.(this);
  }
}

export class ServerboundEntityTagQueryPacket implements Packet<ServerGameHandler> {
  constructor(
    public transactionId: number,
    public entityId: number,
  ) {}
  static read(reader: Reader) {
    const transactionId = reader.readVarInt();
    const entityId = reader.readVarInt();
    return new this(transactionId, entityId);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.transactionId);
    writer.writeVarInt(this.entityId);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleEntityTagQuery?.(this);
  }
}

export class ServerboundInteractPacket implements Packet<ServerGameHandler> {
  constructor(
    public entityId: number,
    public action:
      | { type: "interact"; hand: InteractionHand }
      | { type: "attack" }
      | { type: "interact_at"; location: { x: number; y: number; z: number }; hand: InteractionHand },
    public usingSecondaryAction: boolean,
  ) {}
  static read(reader: Reader) {
    const entityId = reader.readVarInt();
    let result:
      | { type: "interact"; hand: InteractionHand }
      | { type: "attack" }
      | { type: "interact_at"; location: { x: number; y: number; z: number }; hand: InteractionHand };
    switch (reader.readVarInt()) {
      case 0:
        result = { type: "interact", hand: readInteractionHand(reader) };
        break;
      case 1:
        result = { type: "attack" };
        break;
      case 2:
        result = { type: "interact_at", location: { x: reader.readFloat(), y: reader.readFloat(), z: reader.readFloat() }, hand: readInteractionHand(reader) };
        break;
      default:
        throw new Error("Invalid tag id");
    }
    const action = result;
    const usingSecondaryAction = reader.readBoolean();
    return new this(entityId, action, usingSecondaryAction);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entityId);
    switch (this.action.type) {
      case "interact": {
        writer.writeVarInt(0);
        writeInteractionHand(writer, this.action.hand);
        break;
      }
      case "attack": {
        writer.writeVarInt(1);
        break;
      }
      case "interact_at": {
        writer.writeVarInt(2);
        writer.writeFloat(this.action.location.x);
        writer.writeFloat(this.action.location.y);
        writer.writeFloat(this.action.location.z);
        writeInteractionHand(writer, this.action.hand);
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
    writer.writeBoolean(this.usingSecondaryAction);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleInteract?.(this);
  }
}

export class ServerboundJigsawGeneratePacket implements Packet<ServerGameHandler> {
  constructor(
    public pos: BlockPos,
    public levels: number,
    public keepJigsaws: boolean,
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    const levels = reader.readVarInt();
    const keepJigsaws = reader.readBoolean();
    return new this(pos, levels, keepJigsaws);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writer.writeVarInt(this.levels);
    writer.writeBoolean(this.keepJigsaws);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleJigsawGenerate?.(this);
  }
}

export class ServerboundKeepAlivePacket implements Packet<ServerGameHandler> {
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
  handle(handler: ServerGameHandler) {
    return handler.handleKeepAlive?.(this);
  }
}

export class ServerboundLockDifficultyPacket implements Packet<ServerGameHandler> {
  constructor(
    public locked: boolean,
  ) {}
  static read(reader: Reader) {
    const locked = reader.readBoolean();
    return new this(locked);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.locked);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleLockDifficulty?.(this);
  }
}

export class ServerboundMovePlayerPosPacket implements Packet<ServerGameHandler> {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public onGround: boolean,
  ) {}
  static read(reader: Reader) {
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const onGround = reader.readBoolean();
    return new this(x, y, z, onGround);
  }
  write(writer: Writer) {
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeBoolean(this.onGround);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleMovePlayerPos?.(this);
  }
}

export class ServerboundMovePlayerPosRotPacket implements Packet<ServerGameHandler> {
  constructor(
    public x: number,
    public y: number,
    public z: number,
    public yRot: number,
    public xRot: number,
    public onGround: boolean,
  ) {}
  static read(reader: Reader) {
    const x = reader.readDouble();
    const y = reader.readDouble();
    const z = reader.readDouble();
    const yRot = reader.readFloat();
    const xRot = reader.readFloat();
    const onGround = reader.readBoolean();
    return new this(x, y, z, yRot, xRot, onGround);
  }
  write(writer: Writer) {
    writer.writeDouble(this.x);
    writer.writeDouble(this.y);
    writer.writeDouble(this.z);
    writer.writeFloat(this.yRot);
    writer.writeFloat(this.xRot);
    writer.writeBoolean(this.onGround);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleMovePlayerPosRot?.(this);
  }
}

export class ServerboundMovePlayerRotPacket implements Packet<ServerGameHandler> {
  constructor(
    public yRot: number,
    public xRot: number,
    public onGround: boolean,
  ) {}
  static read(reader: Reader) {
    const yRot = reader.readFloat();
    const xRot = reader.readFloat();
    const onGround = reader.readBoolean();
    return new this(yRot, xRot, onGround);
  }
  write(writer: Writer) {
    writer.writeFloat(this.yRot);
    writer.writeFloat(this.xRot);
    writer.writeBoolean(this.onGround);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleMovePlayerRot?.(this);
  }
}

export class ServerboundMovePlayerStatusOnlyPacket implements Packet<ServerGameHandler> {
  constructor(
    public onGround: boolean,
  ) {}
  static read(reader: Reader) {
    const onGround = reader.readBoolean();
    return new this(onGround);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.onGround);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleMovePlayerStatusOnly?.(this);
  }
}

export class ServerboundMoveVehiclePacket implements Packet<ServerGameHandler> {
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
  handle(handler: ServerGameHandler) {
    return handler.handleMoveVehicle?.(this);
  }
}

export class ServerboundPaddleBoatPacket implements Packet<ServerGameHandler> {
  constructor(
    public left: boolean,
    public right: boolean,
  ) {}
  static read(reader: Reader) {
    const left = reader.readBoolean();
    const right = reader.readBoolean();
    return new this(left, right);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.left);
    writer.writeBoolean(this.right);
  }
  handle(handler: ServerGameHandler) {
    return handler.handlePaddleBoat?.(this);
  }
}

export class ServerboundPickItemPacket implements Packet<ServerGameHandler> {
  constructor(
    public slot: number,
  ) {}
  static read(reader: Reader) {
    const slot = reader.readVarInt();
    return new this(slot);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.slot);
  }
  handle(handler: ServerGameHandler) {
    return handler.handlePickItem?.(this);
  }
}

export class ServerboundPlaceRecipePacket implements Packet<ServerGameHandler> {
  constructor(
    public containerId: number,
    public recipe: ResourceLocation,
    public shiftDown: boolean,
  ) {}
  static read(reader: Reader) {
    const containerId = reader.readByte();
    const recipe = readResourceLocation(reader);
    const shiftDown = reader.readBoolean();
    return new this(containerId, recipe, shiftDown);
  }
  write(writer: Writer) {
    writer.writeByte(this.containerId);
    writeResourceLocation(writer, this.recipe);
    writer.writeBoolean(this.shiftDown);
  }
  handle(handler: ServerGameHandler) {
    return handler.handlePlaceRecipe?.(this);
  }
}

export class ServerboundPlayerAbilitiesPacket implements Packet<ServerGameHandler> {
  constructor(
    public flags: { isFlying: boolean },
  ) {}
  static read(reader: Reader) {
    const flags1 = reader.readByte();
    const flags = { isFlying: (flags1 & 0x2) > 0 };
    return new this(flags);
  }
  write(writer: Writer) {
    writer.writeByte(-this.flags.isFlying & 0x2);
  }
  handle(handler: ServerGameHandler) {
    return handler.handlePlayerAbilities?.(this);
  }
}

export class ServerboundPlayerActionPacket implements Packet<ServerGameHandler> {
  constructor(
    public action: PlayerAction,
    public pos: BlockPos,
    public direction: Direction,
    public sequence: number,
  ) {}
  static read(reader: Reader) {
    const action = readPlayerAction(reader);
    const pos = readBlockPos(reader);
    const direction = readDirection(reader);
    const sequence = reader.readVarInt();
    return new this(action, pos, direction, sequence);
  }
  write(writer: Writer) {
    writePlayerAction(writer, this.action);
    writeBlockPos(writer, this.pos);
    writeDirection(writer, this.direction);
    writer.writeVarInt(this.sequence);
  }
  handle(handler: ServerGameHandler) {
    return handler.handlePlayerAction?.(this);
  }
}

export class ServerboundPlayerCommandPacket implements Packet<ServerGameHandler> {
  constructor(
    public id: number,
    public action: "press_shift_key" | "release_shift_key" | "stop_sleeping" | "start_sprinting" | "stop_sprinting" | "start_riding_jump" | "stop_riding_jump" | "open_inventory" | "start_fall_flying",
    public data: number,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    const action = mapper1.fromId(reader.readVarInt());
    const data = reader.readVarInt();
    return new this(id, action, data);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    writer.writeVarInt(mapper1.toId(this.action));
    writer.writeVarInt(this.data);
  }
  handle(handler: ServerGameHandler) {
    return handler.handlePlayerCommand?.(this);
  }
}

export class ServerboundPlayerInputPacket implements Packet<ServerGameHandler> {
  constructor(
    public xxa: number,
    public zza: number,
    public fields: { isJumping: boolean; isShiftKeyDown: boolean },
  ) {}
  static read(reader: Reader) {
    const xxa = reader.readFloat();
    const zza = reader.readFloat();
    const flags = reader.readByte();
    const fields = { isJumping: (flags & 0x1) > 0, isShiftKeyDown: (flags & 0x2) > 0 };
    return new this(xxa, zza, fields);
  }
  write(writer: Writer) {
    writer.writeFloat(this.xxa);
    writer.writeFloat(this.zza);
    writer.writeByte((-this.fields.isJumping & 0x1) | (-this.fields.isShiftKeyDown & 0x2));
  }
  handle(handler: ServerGameHandler) {
    return handler.handlePlayerInput?.(this);
  }
}

export class ServerboundPongPacket implements Packet<ServerGameHandler> {
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
  handle(handler: ServerGameHandler) {
    return handler.handlePong?.(this);
  }
}

export class ServerboundRecipeBookChangeSettingsPacket implements Packet<ServerGameHandler> {
  constructor(
    public bookType: RecipeBookType,
    public isOpen: boolean,
    public isFiltering: boolean,
  ) {}
  static read(reader: Reader) {
    const bookType = readRecipeBookType(reader);
    const isOpen = reader.readBoolean();
    const isFiltering = reader.readBoolean();
    return new this(bookType, isOpen, isFiltering);
  }
  write(writer: Writer) {
    writeRecipeBookType(writer, this.bookType);
    writer.writeBoolean(this.isOpen);
    writer.writeBoolean(this.isFiltering);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleRecipeBookChangeSettings?.(this);
  }
}

export class ServerboundRecipeBookSeenRecipePacket implements Packet<ServerGameHandler> {
  constructor(
    public recipe: ResourceLocation,
  ) {}
  static read(reader: Reader) {
    const recipe = readResourceLocation(reader);
    return new this(recipe);
  }
  write(writer: Writer) {
    writeResourceLocation(writer, this.recipe);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleRecipeBookSeenRecipe?.(this);
  }
}

export class ServerboundRenameItemPacket implements Packet<ServerGameHandler> {
  constructor(
    public name: string,
  ) {}
  static read(reader: Reader) {
    const name = reader.readString();
    return new this(name);
  }
  write(writer: Writer) {
    writer.writeString(this.name);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleRenameItem?.(this);
  }
}

export class ServerboundResourcePackPacket implements Packet<ServerGameHandler> {
  constructor(
    public action: "successfully_loaded" | "declined" | "failed_download" | "accepted",
  ) {}
  static read(reader: Reader) {
    const action = mapper2.fromId(reader.readVarInt());
    return new this(action);
  }
  write(writer: Writer) {
    writer.writeVarInt(mapper2.toId(this.action));
  }
  handle(handler: ServerGameHandler) {
    return handler.handleResourcePack?.(this);
  }
}

export class ServerboundSeenAdvancementsPacket implements Packet<ServerGameHandler> {
  constructor(
    public action:
      | { type: "opened_tab"; tab: ResourceLocation }
      | { type: "closed_screen" },
  ) {}
  static read(reader: Reader) {
    let result:
      | { type: "opened_tab"; tab: ResourceLocation }
      | { type: "closed_screen" };
    switch (reader.readVarInt()) {
      case 0:
        result = { type: "opened_tab", tab: readResourceLocation(reader) };
        break;
      case 1:
        result = { type: "closed_screen" };
        break;
      default:
        throw new Error("Invalid tag id");
    }
    const action = result;
    return new this(action);
  }
  write(writer: Writer) {
    switch (this.action.type) {
      case "opened_tab": {
        writer.writeVarInt(0);
        writeResourceLocation(writer, this.action.tab);
        break;
      }
      case "closed_screen": {
        writer.writeVarInt(1);
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
  }
  handle(handler: ServerGameHandler) {
    return handler.handleSeenAdvancements?.(this);
  }
}

export class ServerboundSelectTradePacket implements Packet<ServerGameHandler> {
  constructor(
    public item: number,
  ) {}
  static read(reader: Reader) {
    const item = reader.readVarInt();
    return new this(item);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.item);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleSelectTrade?.(this);
  }
}

export class ServerboundSetBeaconPacket implements Packet<ServerGameHandler> {
  constructor(
    public primary: MobEffect | null,
    public secondary: MobEffect | null,
  ) {}
  static read(reader: Reader) {
    const primary = reader.readBoolean() ? readMobEffect(reader) : null;
    const secondary = reader.readBoolean() ? readMobEffect(reader) : null;
    return new this(primary, secondary);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.primary != null);
    if (this.primary != null) writeMobEffect(writer, this.primary);
    writer.writeBoolean(this.secondary != null);
    if (this.secondary != null) writeMobEffect(writer, this.secondary);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleSetBeacon?.(this);
  }
}

export class ServerboundSetCarriedItemPacket implements Packet<ServerGameHandler> {
  constructor(
    public slot: number,
  ) {}
  static read(reader: Reader) {
    const slot = reader.readShort();
    return new this(slot);
  }
  write(writer: Writer) {
    writer.writeShort(this.slot);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleSetCarriedItem?.(this);
  }
}

export class ServerboundSetCommandBlockPacket implements Packet<ServerGameHandler> {
  constructor(
    public pos: BlockPos,
    public command: string,
    public mode: CommandBlockMode,
    public fields: { trackOutput: boolean; conditional: boolean; automatic: boolean },
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    const command = reader.readString();
    const mode = commandBlockModeEnum.fromId(reader.readVarInt());
    const flags = reader.readByte();
    const fields = { trackOutput: (flags & 0x1) > 0, conditional: (flags & 0x2) > 0, automatic: (flags & 0x4) > 0 };
    return new this(pos, command, mode, fields);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writer.writeString(this.command);
    writer.writeVarInt(commandBlockModeEnum.toId(this.mode));
    writer.writeByte((-this.fields.trackOutput & 0x1) | (-this.fields.conditional & 0x2) | (-this.fields.automatic & 0x4));
  }
  handle(handler: ServerGameHandler) {
    return handler.handleSetCommandBlock?.(this);
  }
}

export class ServerboundSetCommandMinecartPacket implements Packet<ServerGameHandler> {
  constructor(
    public entity: number,
    public command: string,
    public trackOutput: boolean,
  ) {}
  static read(reader: Reader) {
    const entity = reader.readVarInt();
    const command = reader.readString();
    const trackOutput = reader.readBoolean();
    return new this(entity, command, trackOutput);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.entity);
    writer.writeString(this.command);
    writer.writeBoolean(this.trackOutput);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleSetCommandMinecart?.(this);
  }
}

export class ServerboundSetCreativeModeSlotPacket implements Packet<ServerGameHandler> {
  constructor(
    public slotNum: number,
    public itemStack: ItemStack,
  ) {}
  static read(reader: Reader) {
    const slotNum = reader.readShort();
    const itemStack = readItemStack(reader);
    return new this(slotNum, itemStack);
  }
  write(writer: Writer) {
    writer.writeShort(this.slotNum);
    writeItemStack(writer, this.itemStack);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleSetCreativeModeSlot?.(this);
  }
}

export class ServerboundSetJigsawBlockPacket implements Packet<ServerGameHandler> {
  constructor(
    public pos: BlockPos,
    public name: ResourceLocation,
    public target: ResourceLocation,
    public pool: ResourceLocation,
    public finalState: string,
    public joint: JigsawBlockJointType,
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    const name = readResourceLocation(reader);
    const target = readResourceLocation(reader);
    const pool = readResourceLocation(reader);
    const finalState = reader.readString();
    const joint = jigsawBlockJointTypeEnum.fromId(reader.readVarInt());
    return new this(pos, name, target, pool, finalState, joint);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writeResourceLocation(writer, this.name);
    writeResourceLocation(writer, this.target);
    writeResourceLocation(writer, this.pool);
    writer.writeString(this.finalState);
    writer.writeVarInt(jigsawBlockJointTypeEnum.toId(this.joint));
  }
  handle(handler: ServerGameHandler) {
    return handler.handleSetJigsawBlock?.(this);
  }
}

export class ServerboundSetStructureBlockPacket implements Packet<ServerGameHandler> {
  constructor(
    public pos: BlockPos,
    public updateType: StructureBlockUpdateType,
    public mode: StructureMode,
    public name: string,
    public offset: { x: number; y: number; z: number },
    public size: { x: number; y: number; z: number },
    public mirror: Mirror,
    public rotation: Rotation,
    public data: string,
    public integrity: number,
    public seed: bigint,
    public flags: { ignoreEntities: boolean; showAir: boolean; showBoundingBox: boolean },
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    const updateType = structureBlockUpdateTypeEnum.fromId(reader.readVarInt());
    const mode = structureModeEnum.fromId(reader.readVarInt());
    const name = reader.readString();
    const offset = { x: reader.readByte(), y: reader.readByte(), z: reader.readByte() };
    const size = { x: reader.readByte(), y: reader.readByte(), z: reader.readByte() };
    const mirror = mirrorEnum.fromId(reader.readVarInt());
    const rotation = rotationEnum.fromId(reader.readVarInt());
    const data = reader.readString(128);
    const integrity = reader.readFloat();
    const seed = reader.readVarLong();
    const flags1 = reader.readByte();
    const flags = { ignoreEntities: (flags1 & 0x1) > 0, showAir: (flags1 & 0x2) > 0, showBoundingBox: (flags1 & 0x4) > 0 };
    return new this(pos, updateType, mode, name, offset, size, mirror, rotation, data, integrity, seed, flags);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writer.writeVarInt(structureBlockUpdateTypeEnum.toId(this.updateType));
    writer.writeVarInt(structureModeEnum.toId(this.mode));
    writer.writeString(this.name);
    writer.writeByte(this.offset.x);
    writer.writeByte(this.offset.y);
    writer.writeByte(this.offset.z);
    writer.writeByte(this.size.x);
    writer.writeByte(this.size.y);
    writer.writeByte(this.size.z);
    writer.writeVarInt(mirrorEnum.toId(this.mirror));
    writer.writeVarInt(rotationEnum.toId(this.rotation));
    writer.writeString(this.data);
    writer.writeFloat(this.integrity);
    writer.writeVarLong(this.seed);
    writer.writeByte((-this.flags.ignoreEntities & 0x1) | (-this.flags.showAir & 0x2) | (-this.flags.showBoundingBox & 0x4));
  }
  handle(handler: ServerGameHandler) {
    return handler.handleSetStructureBlock?.(this);
  }
}

export class ServerboundSignUpdatePacket implements Packet<ServerGameHandler> {
  constructor(
    public pos: BlockPos,
    public lines: string[],
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    const list: string[] = [];
    for (let i = 4; i--;) list.push(reader.readString(384));
    const lines = list;
    return new this(pos, lines);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    for (const item of this.lines) writer.writeString(item);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleSignUpdate?.(this);
  }
}

export class ServerboundSwingPacket implements Packet<ServerGameHandler> {
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
  handle(handler: ServerGameHandler) {
    return handler.handleSwing?.(this);
  }
}

export class ServerboundTeleportToEntityPacket implements Packet<ServerGameHandler> {
  constructor(
    public uuid: string,
  ) {}
  static read(reader: Reader) {
    const uuid = reader.readUuid();
    return new this(uuid);
  }
  write(writer: Writer) {
    writer.writeUuid(this.uuid);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleTeleportToEntity?.(this);
  }
}

export class ServerboundUseItemOnPacket implements Packet<ServerGameHandler> {
  constructor(
    public hand: InteractionHand,
    public blockHit: BlockHitResult,
    public sequence: number,
  ) {}
  static read(reader: Reader) {
    const hand = readInteractionHand(reader);
    const blockHit = {
      blockPos: readBlockPos(reader),
      direction: readDirection(reader),
      location: { x: reader.readFloat(), y: reader.readFloat(), z: reader.readFloat() },
      inside: reader.readBoolean(),
    };
    const sequence = reader.readVarInt();
    return new this(hand, blockHit, sequence);
  }
  write(writer: Writer) {
    writeInteractionHand(writer, this.hand);
    writeBlockPos(writer, this.blockHit.blockPos);
    writeDirection(writer, this.blockHit.direction);
    writer.writeFloat(this.blockHit.location.x);
    writer.writeFloat(this.blockHit.location.y);
    writer.writeFloat(this.blockHit.location.z);
    writer.writeBoolean(this.blockHit.inside);
    writer.writeVarInt(this.sequence);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleUseItemOn?.(this);
  }
}

export class ServerboundUseItemPacket implements Packet<ServerGameHandler> {
  constructor(
    public hand: InteractionHand,
    public sequence: number,
  ) {}
  static read(reader: Reader) {
    const hand = readInteractionHand(reader);
    const sequence = reader.readVarInt();
    return new this(hand, sequence);
  }
  write(writer: Writer) {
    writeInteractionHand(writer, this.hand);
    writer.writeVarInt(this.sequence);
  }
  handle(handler: ServerGameHandler) {
    return handler.handleUseItem?.(this);
  }
}

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
  Difficulty,
  difficultyEnum,
  Direction,
  directionEnum,
  HumanoidArm,
  humanoidArmEnum,
  InteractionHand,
  interactionHandEnum,
  ItemStack,
  LastSeenMessagesUpdate,
  MobEffect,
  mobEffectEnum,
  PlayerAction,
  playerActionEnum,
  readArgumentSignatures,
  readBlockPos,
  readItemStack,
  readLastSeenMessagesUpdate,
  RecipeBookType,
  recipeBookTypeEnum,
  writeArgumentSignatures,
  writeBlockPos,
  writeItemStack,
  writeLastSeenMessagesUpdate,
} from "../types.ts";
import { ResourceLocation } from "../../../core/resource_location.ts";
import { Uuid } from "../../../core/uuid.ts";

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
    public teleportId: number,
  ) {}
  static read(reader: Reader) {
    const teleportId = reader.readVarInt();
    return new this(teleportId);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.teleportId);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleAcceptTeleportation?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleBlockEntityTagQuery?.(this);
  }
}

export class ServerboundChangeDifficultyPacket implements Packet<ServerGameHandler> {
  constructor(
    public difficulty: Difficulty,
  ) {}
  static read(reader: Reader) {
    const difficulty = difficultyEnum.fromId(reader.readUnsignedByte());
    return new this(difficulty);
  }
  write(writer: Writer) {
    writer.writeUnsignedByte(difficultyEnum.toId(this.difficulty));
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleChangeDifficulty?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleChatAck?.(this);
  }
}

export class ServerboundChatCommandPacket implements Packet<ServerGameHandler> {
  constructor(
    public command: string,
    public timestamp: bigint,
    public salt: bigint,
    public argumentSignatures: ArgumentSignatures,
    public signedPreview: boolean,
    public lastSeenMessages: LastSeenMessagesUpdate,
  ) {}
  static read(reader: Reader) {
    const command = reader.readString(256);
    const timestamp = reader.readLong();
    const salt = reader.readLong();
    const argumentSignatures = readArgumentSignatures(reader);
    const signedPreview = reader.readBoolean();
    const lastSeenMessages = readLastSeenMessagesUpdate(reader);
    return new this(command, timestamp, salt, argumentSignatures, signedPreview, lastSeenMessages);
  }
  write(writer: Writer) {
    writer.writeString(this.command);
    writer.writeLong(this.timestamp);
    writer.writeLong(this.salt);
    writeArgumentSignatures(writer, this.argumentSignatures);
    writer.writeBoolean(this.signedPreview);
    writeLastSeenMessagesUpdate(writer, this.lastSeenMessages);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleChatCommand?.(this);
  }
}

export type MessageSignature = Uint8Array;

export class ServerboundChatPacket implements Packet<ServerGameHandler> {
  constructor(
    public message: string,
    public timestamp: bigint,
    public salt: bigint,
    public signature: MessageSignature,
    public signedPreview: boolean,
    public lastSeenMessages: LastSeenMessagesUpdate,
  ) {}
  static read(reader: Reader) {
    const message = reader.readString(256);
    const timestamp = reader.readLong();
    const salt = reader.readLong();
    const signature = reader.readByteArray();
    const signedPreview = reader.readBoolean();
    const lastSeenMessages = readLastSeenMessagesUpdate(reader);
    return new this(message, timestamp, salt, signature, signedPreview, lastSeenMessages);
  }
  write(writer: Writer) {
    writer.writeString(this.message);
    writer.writeLong(this.timestamp);
    writer.writeLong(this.salt);
    writer.writeByteArray(this.signature);
    writer.writeBoolean(this.signedPreview);
    writeLastSeenMessagesUpdate(writer, this.lastSeenMessages);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleChat?.(this);
  }
}

export class ServerboundChatPreviewPacket implements Packet<ServerGameHandler> {
  constructor(
    public transactionId: number,
    public message: string,
  ) {}
  static read(reader: Reader) {
    const transactionId = reader.readInt();
    const message = reader.readString(256);
    return new this(transactionId, message);
  }
  write(writer: Writer) {
    writer.writeInt(this.transactionId);
    writer.writeString(this.message);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleChatPreview?.(this);
  }
}

export type ClientCommandAction = "perform_respawn" | "request_stats";

const clientCommandActionEnum = createEnumMapper<ClientCommandAction>({ "perform_respawn": 0, "request_stats": 1 });

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
  async handle(handler: ServerGameHandler) {
    await handler.handleClientCommand?.(this);
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
    const chatVisibility = chatVisiblityEnum.fromId(reader.readVarInt());
    const chatColors = reader.readBoolean();
    const modelCustomisation = reader.readByte();
    const mainHand = humanoidArmEnum.fromId(reader.readVarInt());
    const textFilteringEnabled = reader.readBoolean();
    const allowsListing = reader.readBoolean();
    return new this(
      language,
      viewDistance,
      chatVisibility,
      chatColors,
      modelCustomisation,
      mainHand,
      textFilteringEnabled,
      allowsListing,
    );
  }
  write(writer: Writer) {
    writer.writeString(this.language);
    writer.writeByte(this.viewDistance);
    writer.writeVarInt(chatVisiblityEnum.toId(this.chatVisibility));
    writer.writeBoolean(this.chatColors);
    writer.writeByte(this.modelCustomisation);
    writer.writeVarInt(humanoidArmEnum.toId(this.mainHand));
    writer.writeBoolean(this.textFilteringEnabled);
    writer.writeBoolean(this.allowsListing);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleClientInformation?.(this);
  }
}

export class ServerboundCommandSuggestionPacket implements Packet<ServerGameHandler> {
  constructor(
    public transactionId: number,
    public command: string,
  ) {}
  static read(reader: Reader) {
    const transactionId = reader.readVarInt();
    const command = reader.readString(32500);
    return new this(transactionId, command);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.transactionId);
    writer.writeString(this.command);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleCommandSuggestion?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleContainerButtonClick?.(this);
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
    const clickType = clickTypeEnum.fromId(reader.readVarInt());
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
    writer.writeVarInt(clickTypeEnum.toId(this.clickType));
    writer.writeVarInt(this.changedSlots.size);
    for (const [key, value] of this.changedSlots) {
      writer.writeShort(key);
      writeItemStack(writer, value);
    }
    writeItemStack(writer, this.carriedItem);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleContainerClick?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleContainerClose?.(this);
  }
}

export class ServerboundCustomPayloadPacket implements Packet<ServerGameHandler> {
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
  async handle(handler: ServerGameHandler) {
    await handler.handleCustomPayload?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleEditBook?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleEntityTagQuery?.(this);
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
        result = { type: "interact", hand: interactionHandEnum.fromId(reader.readVarInt()) };
        break;
      case 1:
        result = { type: "attack" };
        break;
      case 2:
        result = {
          type: "interact_at",
          location: { x: reader.readFloat(), y: reader.readFloat(), z: reader.readFloat() },
          hand: interactionHandEnum.fromId(reader.readVarInt()),
        };
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
        writer.writeVarInt(interactionHandEnum.toId(this.action.hand));
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
        writer.writeVarInt(interactionHandEnum.toId(this.action.hand));
        break;
      }
      default:
        throw new Error("Invalid tag");
    }
    writer.writeBoolean(this.usingSecondaryAction);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleInteract?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleJigsawGenerate?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleKeepAlive?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleLockDifficulty?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleMovePlayerPos?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleMovePlayerPosRot?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleMovePlayerRot?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleMovePlayerStatusOnly?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleMoveVehicle?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handlePaddleBoat?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handlePickItem?.(this);
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
    const recipe = ResourceLocation.from(reader.readString(32767));
    const shiftDown = reader.readBoolean();
    return new this(containerId, recipe, shiftDown);
  }
  write(writer: Writer) {
    writer.writeByte(this.containerId);
    writer.writeString(this.recipe.toString());
    writer.writeBoolean(this.shiftDown);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handlePlaceRecipe?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handlePlayerAbilities?.(this);
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
    const action = playerActionEnum.fromId(reader.readVarInt());
    const pos = readBlockPos(reader);
    const direction = directionEnum.fromId(reader.readVarInt());
    const sequence = reader.readVarInt();
    return new this(action, pos, direction, sequence);
  }
  write(writer: Writer) {
    writer.writeVarInt(playerActionEnum.toId(this.action));
    writeBlockPos(writer, this.pos);
    writer.writeVarInt(directionEnum.toId(this.direction));
    writer.writeVarInt(this.sequence);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handlePlayerAction?.(this);
  }
}

export type PlayerCommand =
  | "press_shift_key"
  | "release_shift_key"
  | "stop_sleeping"
  | "start_sprinting"
  | "stop_sprinting"
  | "start_riding_jump"
  | "stop_riding_jump"
  | "open_inventory"
  | "start_fall_flying";

const playerCommandEnum = createEnumMapper<PlayerCommand>({
  "press_shift_key": 0,
  "release_shift_key": 1,
  "stop_sleeping": 2,
  "start_sprinting": 3,
  "stop_sprinting": 4,
  "start_riding_jump": 5,
  "stop_riding_jump": 6,
  "open_inventory": 7,
  "start_fall_flying": 8,
});

export class ServerboundPlayerCommandPacket implements Packet<ServerGameHandler> {
  constructor(
    public id: number,
    public command: PlayerCommand,
    public data: number,
  ) {}
  static read(reader: Reader) {
    const id = reader.readVarInt();
    const command = playerCommandEnum.fromId(reader.readVarInt());
    const data = reader.readVarInt();
    return new this(id, command, data);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.id);
    writer.writeVarInt(playerCommandEnum.toId(this.command));
    writer.writeVarInt(this.data);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handlePlayerCommand?.(this);
  }
}

export class ServerboundPlayerInputPacket implements Packet<ServerGameHandler> {
  constructor(
    public xxa: number,
    public zza: number,
    public flags: { isJumping: boolean; isShiftKeyDown: boolean },
  ) {}
  static read(reader: Reader) {
    const xxa = reader.readFloat();
    const zza = reader.readFloat();
    const flags1 = reader.readByte();
    const flags = { isJumping: (flags1 & 0x1) > 0, isShiftKeyDown: (flags1 & 0x2) > 0 };
    return new this(xxa, zza, flags);
  }
  write(writer: Writer) {
    writer.writeFloat(this.xxa);
    writer.writeFloat(this.zza);
    writer.writeByte((-this.flags.isJumping & 0x1) | (-this.flags.isShiftKeyDown & 0x2));
  }
  async handle(handler: ServerGameHandler) {
    await handler.handlePlayerInput?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handlePong?.(this);
  }
}

export class ServerboundRecipeBookChangeSettingsPacket implements Packet<ServerGameHandler> {
  constructor(
    public bookType: RecipeBookType,
    public isOpen: boolean,
    public isFiltering: boolean,
  ) {}
  static read(reader: Reader) {
    const bookType = recipeBookTypeEnum.fromId(reader.readVarInt());
    const isOpen = reader.readBoolean();
    const isFiltering = reader.readBoolean();
    return new this(bookType, isOpen, isFiltering);
  }
  write(writer: Writer) {
    writer.writeVarInt(recipeBookTypeEnum.toId(this.bookType));
    writer.writeBoolean(this.isOpen);
    writer.writeBoolean(this.isFiltering);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleRecipeBookChangeSettings?.(this);
  }
}

export class ServerboundRecipeBookSeenRecipePacket implements Packet<ServerGameHandler> {
  constructor(
    public recipe: ResourceLocation,
  ) {}
  static read(reader: Reader) {
    const recipe = ResourceLocation.from(reader.readString(32767));
    return new this(recipe);
  }
  write(writer: Writer) {
    writer.writeString(this.recipe.toString());
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleRecipeBookSeenRecipe?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleRenameItem?.(this);
  }
}

export type ResourcePackAction = "successfully_loaded" | "declined" | "failed_download" | "accepted";

const resourcePackActionEnum = createEnumMapper<ResourcePackAction>({
  "successfully_loaded": 0,
  "declined": 1,
  "failed_download": 2,
  "accepted": 3,
});

export class ServerboundResourcePackPacket implements Packet<ServerGameHandler> {
  constructor(
    public action: ResourcePackAction,
  ) {}
  static read(reader: Reader) {
    const action = resourcePackActionEnum.fromId(reader.readVarInt());
    return new this(action);
  }
  write(writer: Writer) {
    writer.writeVarInt(resourcePackActionEnum.toId(this.action));
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleResourcePack?.(this);
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
        result = { type: "opened_tab", tab: ResourceLocation.from(reader.readString(32767)) };
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
        writer.writeString(this.action.tab.toString());
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
  async handle(handler: ServerGameHandler) {
    await handler.handleSeenAdvancements?.(this);
  }
}

export class ServerboundSelectTradePacket implements Packet<ServerGameHandler> {
  constructor(
    public offerIndex: number,
  ) {}
  static read(reader: Reader) {
    const offerIndex = reader.readVarInt();
    return new this(offerIndex);
  }
  write(writer: Writer) {
    writer.writeVarInt(this.offerIndex);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleSelectTrade?.(this);
  }
}

export class ServerboundSetBeaconPacket implements Packet<ServerGameHandler> {
  constructor(
    public primaryEffect: MobEffect | null,
    public secondaryEffect: MobEffect | null,
  ) {}
  static read(reader: Reader) {
    const primaryEffect = reader.readBoolean() ? mobEffectEnum.fromId(reader.readVarInt()) : null;
    const secondaryEffect = reader.readBoolean() ? mobEffectEnum.fromId(reader.readVarInt()) : null;
    return new this(primaryEffect, secondaryEffect);
  }
  write(writer: Writer) {
    writer.writeBoolean(this.primaryEffect != null);
    if (this.primaryEffect != null) writer.writeVarInt(mobEffectEnum.toId(this.primaryEffect));
    writer.writeBoolean(this.secondaryEffect != null);
    if (this.secondaryEffect != null) writer.writeVarInt(mobEffectEnum.toId(this.secondaryEffect));
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleSetBeacon?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleSetCarriedItem?.(this);
  }
}

export type CommandBlockMode = "sequence" | "auto" | "redstone";

const commandBlockModeEnum = createEnumMapper<CommandBlockMode>({ "sequence": 0, "auto": 1, "redstone": 2 });

export class ServerboundSetCommandBlockPacket implements Packet<ServerGameHandler> {
  constructor(
    public pos: BlockPos,
    public command: string,
    public mode: CommandBlockMode,
    public flags: { trackOutput: boolean; conditional: boolean; automatic: boolean },
  ) {}
  static read(reader: Reader) {
    const pos = readBlockPos(reader);
    const command = reader.readString();
    const mode = commandBlockModeEnum.fromId(reader.readVarInt());
    const flags1 = reader.readByte();
    const flags = { trackOutput: (flags1 & 0x1) > 0, conditional: (flags1 & 0x2) > 0, automatic: (flags1 & 0x4) > 0 };
    return new this(pos, command, mode, flags);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writer.writeString(this.command);
    writer.writeVarInt(commandBlockModeEnum.toId(this.mode));
    writer.writeByte((-this.flags.trackOutput & 0x1) | (-this.flags.conditional & 0x2) | (-this.flags.automatic & 0x4));
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleSetCommandBlock?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleSetCommandMinecart?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleSetCreativeModeSlot?.(this);
  }
}

export type JigsawBlockJointType = "rollable" | "aligned";

const jigsawBlockJointTypeEnum = createEnumMapper<JigsawBlockJointType>({ "rollable": 0, "aligned": 1 });

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
    const name = ResourceLocation.from(reader.readString(32767));
    const target = ResourceLocation.from(reader.readString(32767));
    const pool = ResourceLocation.from(reader.readString(32767));
    const finalState = reader.readString();
    const joint = jigsawBlockJointTypeEnum.fromId(reader.readVarInt());
    return new this(pos, name, target, pool, finalState, joint);
  }
  write(writer: Writer) {
    writeBlockPos(writer, this.pos);
    writer.writeString(this.name.toString());
    writer.writeString(this.target.toString());
    writer.writeString(this.pool.toString());
    writer.writeString(this.finalState);
    writer.writeVarInt(jigsawBlockJointTypeEnum.toId(this.joint));
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleSetJigsawBlock?.(this);
  }
}

export type StructureBlockUpdateType = "update_data" | "save_area" | "load_area" | "scan_area";

const structureBlockUpdateTypeEnum = createEnumMapper<StructureBlockUpdateType>({
  "update_data": 0,
  "save_area": 1,
  "load_area": 2,
  "scan_area": 3,
});

export type StructureMode = "save" | "load" | "corner" | "data";

const structureModeEnum = createEnumMapper<StructureMode>({ "save": 0, "load": 1, "corner": 2, "data": 3 });

export type Mirror = "none" | "left_right" | "front_back";

const mirrorEnum = createEnumMapper<Mirror>({ "none": 0, "left_right": 1, "front_back": 2 });

export type Rotation = "none" | "clockwise_90" | "clockwise_180" | "counterclockwise_90";

const rotationEnum = createEnumMapper<Rotation>({
  "none": 0,
  "clockwise_90": 1,
  "clockwise_180": 2,
  "counterclockwise_90": 3,
});

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
    const flags = {
      ignoreEntities: (flags1 & 0x1) > 0,
      showAir: (flags1 & 0x2) > 0,
      showBoundingBox: (flags1 & 0x4) > 0,
    };
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
    writer.writeByte(
      (-this.flags.ignoreEntities & 0x1) | (-this.flags.showAir & 0x2) | (-this.flags.showBoundingBox & 0x4),
    );
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleSetStructureBlock?.(this);
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
  async handle(handler: ServerGameHandler) {
    await handler.handleSignUpdate?.(this);
  }
}

export class ServerboundSwingPacket implements Packet<ServerGameHandler> {
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
  async handle(handler: ServerGameHandler) {
    await handler.handleSwing?.(this);
  }
}

export class ServerboundTeleportToEntityPacket implements Packet<ServerGameHandler> {
  constructor(
    public entityUuid: Uuid,
  ) {}
  static read(reader: Reader) {
    const entityUuid = Uuid.from(reader.read(16));
    return new this(entityUuid);
  }
  write(writer: Writer) {
    writer.write(this.entityUuid.bytes());
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleTeleportToEntity?.(this);
  }
}

export type BlockHitResult = {
  blockPos: BlockPos;
  direction: Direction;
  /** Position relative to the block's origin. */
  location: { x: number; y: number; z: number };
  isInside: boolean;
};

export class ServerboundUseItemOnPacket implements Packet<ServerGameHandler> {
  constructor(
    public hand: InteractionHand,
    public blockHit: BlockHitResult,
    public sequence: number,
  ) {}
  static read(reader: Reader) {
    const hand = interactionHandEnum.fromId(reader.readVarInt());
    const blockHit = {
      blockPos: readBlockPos(reader),
      direction: directionEnum.fromId(reader.readVarInt()),
      location: { x: reader.readFloat(), y: reader.readFloat(), z: reader.readFloat() },
      isInside: reader.readBoolean(),
    };
    const sequence = reader.readVarInt();
    return new this(hand, blockHit, sequence);
  }
  write(writer: Writer) {
    writer.writeVarInt(interactionHandEnum.toId(this.hand));
    writeBlockPos(writer, this.blockHit.blockPos);
    writer.writeVarInt(directionEnum.toId(this.blockHit.direction));
    writer.writeFloat(this.blockHit.location.x);
    writer.writeFloat(this.blockHit.location.y);
    writer.writeFloat(this.blockHit.location.z);
    writer.writeBoolean(this.blockHit.isInside);
    writer.writeVarInt(this.sequence);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleUseItemOn?.(this);
  }
}

export class ServerboundUseItemPacket implements Packet<ServerGameHandler> {
  constructor(
    public hand: InteractionHand,
    public sequence: number,
  ) {}
  static read(reader: Reader) {
    const hand = interactionHandEnum.fromId(reader.readVarInt());
    const sequence = reader.readVarInt();
    return new this(hand, sequence);
  }
  write(writer: Writer) {
    writer.writeVarInt(interactionHandEnum.toId(this.hand));
    writer.writeVarInt(this.sequence);
  }
  async handle(handler: ServerGameHandler) {
    await handler.handleUseItem?.(this);
  }
}

import { type } from "./protocol.ts";
import { BlockEntityType, Item } from "./registry_types.ts";
import { AliasedType, Type } from "./type.ts";
import {
  BitFlags,
  Boolean,
  Byte,
  ByteArray,
  Component,
  Custom,
  CustomStruct,
  Date,
  Double,
  Enum,
  Float,
  Int,
  List,
  Long,
  LongArray,
  Map,
  Merge,
  Nbt,
  Optional,
  Packed,
  Serializable,
  Short,
  String,
  Struct,
  TaggedUnion,
  UnsignedByte,
  Uuid,
  VarInt,
} from "./types.ts";

export const ResourceLocation = Serializable(
  "ResourceLocation",
  String(32767),
  (value) => `ResourceLocation.from(${value})`,
  (value) => `${value}.toString()`,
);

export const BlockPos = type("BlockPos", Packed(Long, [26, 26, 12], (x, z, y) => ({ x, y, z })));
export const BlockState = type("BlockState", VarInt);

export const ItemStack = type("ItemStack")(Optional(Struct({
  item: Item,
  count: Byte,
  tag: Nbt,
})));

export const Difficulty = type("Difficulty")(Enum([
  "peaceful",
  "easy",
  "normal",
  "hard",
], UnsignedByte));

const GameModeWith = (type: Type) => {
  return Enum([
    "survival",
    "creative",
    "adventure",
    "spectator",
  ], type);
};

const NullableGameModeWith = (type: Type) => {
  const gameModeEnum = GameModeWith(type).alias("GameMode");
  return Custom(Optional(gameModeEnum), (context) => {
    const { reader } = context;
    const gameMode = context.declare("gameMode", Optional(gameModeEnum).definition, "null");
    // TODO: there should be a better way
    context.statement(`const bytes = ${reader}.read(${reader}.unreadBytes)`);
    context.statement(`${reader} = new Reader(bytes)`);
    context.statement(
      `if (${
        context.capture(() => type.read(context), { reader: "new Reader(bytes)" }).value
      } != -1) {\n${
        context.capture(() => {
          context.statement(`${gameMode.use()} = ${gameModeEnum.read(context)}`);
        }).statementBlock
      }}`,
    );
    context.statement(`else {\n${type.read(context)};\n}`);
    return gameMode.use();
  }, (context, value) => {
    context.statement(
      `if (${value} != null) {\n${
        context.capture(() => gameModeEnum.write(context, value)).statementBlock
      }}`,
    );
    context.statement(
      `else {\n${context.capture(() => type.write(context, "-1")).statementBlock}}`,
    );
  });
};

export const GameMode = type("GameMode", GameModeWith(VarInt));
export const GameModeByte = GameModeWith(Byte).alias("GameMode");
export const NullableGameModeByte = NullableGameModeWith(Byte).alias("NullableGameMode");

export const Direction = type("Direction")(Enum([
  "down",
  "up",
  "north",
  "south",
  "west",
  "east",
]));

export const SoundSource = type("SoundSource")(Enum([
  "master",
  "music",
  "record",
  "weather",
  "block",
  "hostile",
  "neutral",
  "player",
  "ambient",
  "voice",
]));

export const Dimension = ResourceLocation.alias("Dimension");

export const GlobalPos = type("GlobalPos")(Struct({
  dimension: Dimension,
  pos: BlockPos,
}));

export const Properties = type("Properties")(Map(
  String(),
  Struct({
    value: String(),
    signature: Optional(String()),
  }),
));

export const GameProfile = type("GameProfile")(Struct({
  id: Uuid,
  name: String(16),
  properties: Properties,
}));

export const ProfilePublicKey = type("ProfilePublicKey")(Struct({
  expiresAt: Date,
  key: ByteArray(),
  keySignature: ByteArray(4096),
}));

export const ChunkBlockEntity = type("ChunkBlockEntity")(Merge(
  Packed(Byte, [4, 4], (x, z) => ({ x, z })),
  Struct({ y: Short, type: BlockEntityType, tag: Nbt }),
));

export const ChunkData = type("ChunkData")(Struct({
  heightmaps: Nbt,
  data: ByteArray(),
  blockEntities: List(ChunkBlockEntity),
}));

export const LightData = type("LightData")(Struct({
  trustEdges: Boolean,
  skyYMask: LongArray(),
  blockYMask: LongArray(),
  emptySkyYMask: LongArray(),
  emptyBlockYMask: LongArray(),
  skyUpdates: List(ByteArray(2048)),
  blockUpdates: List(ByteArray(2048)),
}));

// TODO: remove namespace prefix
const PositionSource = type("PositionSource")(TaggedUnion("type", String(), {
  "minecraft:block": Struct({ pos: BlockPos }),
  "minecraft:entity": Struct({ entityId: VarInt, yOffset: Float }),
}));

const BlockParticleOptions = Struct({
  blockState: BlockState,
});

const DustParticleOptions = Struct({
  color: Struct({ r: Float, g: Float, b: Float }),
  scale: Float,
});

const DustColorTransitionParticleOptions = Struct({
  fromColor: Struct({ r: Float, g: Float, b: Float }),
  scale: Float,
  toColor: Struct({ r: Float, g: Float, b: Float }),
});

const SculkChargeParticleOptions = Struct({
  roll: Float,
});

const ItemParticleOptions = Struct({
  itemStack: ItemStack,
});

const VibrationParticleOptions = Struct({
  destination: PositionSource,
  arrivalInTicks: VarInt,
});

const ShriekParticleOption = Struct({
  delay: VarInt,
});

export const ParticleOptions = (particleType: Type) => {
  return new AliasedType(
    "ParticleOptions",
    TaggedUnion("type", particleType, {
      "minecraft:ambient_entity_effect": null,
      "minecraft:angry_villager": null,
      "minecraft:block": BlockParticleOptions,
      "minecraft:block_marker": BlockParticleOptions,
      "minecraft:bubble": null,
      "minecraft:cloud": null,
      "minecraft:crit": null,
      "minecraft:damage_indicator": null,
      "minecraft:dragon_breath": null,
      "minecraft:dripping_lava": null,
      "minecraft:falling_lava": null,
      "minecraft:landing_lava": null,
      "minecraft:dripping_water": null,
      "minecraft:falling_water": null,
      "minecraft:dust": DustParticleOptions,
      "minecraft:dust_color_transition": DustColorTransitionParticleOptions,
      "minecraft:effect": null,
      "minecraft:elder_guardian": null,
      "minecraft:enchanted_hit": null,
      "minecraft:enchant": null,
      "minecraft:end_rod": null,
      "minecraft:entity_effect": null,
      "minecraft:explosion_emitter": null,
      "minecraft:explosion": null,
      "minecraft:sonic_boom": null,
      "minecraft:falling_dust": BlockParticleOptions,
      "minecraft:firework": null,
      "minecraft:fishing": null,
      "minecraft:flame": null,
      "minecraft:sculk_soul": null,
      "minecraft:sculk_charge": SculkChargeParticleOptions,
      "minecraft:sculk_charge_pop": null,
      "minecraft:soul_fire_flame": null,
      "minecraft:soul": null,
      "minecraft:flash": null,
      "minecraft:happy_villager": null,
      "minecraft:composter": null,
      "minecraft:heart": null,
      "minecraft:instant_effect": null,
      "minecraft:item": ItemParticleOptions,
      "minecraft:vibration": VibrationParticleOptions,
      "minecraft:item_slime": null,
      "minecraft:item_snowball": null,
      "minecraft:large_smoke": null,
      "minecraft:lava": null,
      "minecraft:mycelium": null,
      "minecraft:note": null,
      "minecraft:poof": null,
      "minecraft:portal": null,
      "minecraft:rain": null,
      "minecraft:smoke": null,
      "minecraft:sneeze": null,
      "minecraft:spit": null,
      "minecraft:squid_ink": null,
      "minecraft:sweep_attack": null,
      "minecraft:totem_of_undying": null,
      "minecraft:underwater": null,
      "minecraft:splash": null,
      "minecraft:witch": null,
      "minecraft:bubble_pop": null,
      "minecraft:current_down": null,
      "minecraft:bubble_column_up": null,
      "minecraft:nautilus": null,
      "minecraft:dolphin": null,
      "minecraft:campfire_cosy_smoke": null,
      "minecraft:campfire_signal_smoke": null,
      "minecraft:dripping_honey": null,
      "minecraft:falling_honey": null,
      "minecraft:landing_honey": null,
      "minecraft:falling_nectar": null,
      "minecraft:falling_spore_blossom": null,
      "minecraft:ash": null,
      "minecraft:crimson_spore": null,
      "minecraft:warped_spore": null,
      "minecraft:spore_blossom_air": null,
      "minecraft:dripping_obsidian_tear": null,
      "minecraft:falling_obsidian_tear": null,
      "minecraft:landing_obsidian_tear": null,
      "minecraft:reverse_portal": null,
      "minecraft:white_ash": null,
      "minecraft:small_flame": null,
      "minecraft:snowflake": null,
      "minecraft:dripping_dripstone_lava": null,
      "minecraft:falling_dripstone_lava": null,
      "minecraft:dripping_dripstone_water": null,
      "minecraft:falling_dripstone_water": null,
      "minecraft:glow_squid_ink": null,
      "minecraft:glow": null,
      "minecraft:wax_on": null,
      "minecraft:wax_off": null,
      "minecraft:electric_spark": null,
      "minecraft:scrape": null,
      "minecraft:shriek": ShriekParticleOption,
    }),
  );
};

const CommandMinMaxArgument = (type: Type) => {
  return CustomStruct({ min: Optional(type), max: Optional(type) }, (context) => {
    const flags = context.declare("flags", () => UnsignedByte.read(context));
    return {
      min: context.declare("min", () => `${flags.use()} & 0x1 ? ${type.read(context)} : null`),
      max: context.declare("max", () => `${flags.use()} & 0x2 ? ${type.read(context)} : null`),
    };
  }, (context, arg) => {
    const { statement, capture } = context;
    UnsignedByte.write(context, `-(${arg}.min != null) & 0x1 | -(${arg}.max != null) & 0x2`);
    statement(`if (${arg}.min != null) {\n${
      capture(() => {
        type.write(context, `${arg}.min`);
      }).statementBlock
    }}`);
    statement(`if (${arg}.max != null) {\n${
      capture(() => {
        type.write(context, `${arg}.max`);
      }).statementBlock
    }}`);
  });
};

const BrigadierStringTemplate = Enum([
  "single_word",
  "quotable_phrase",
  "greedy_phrase",
]).alias("BrigadierStringTemplate");

const CommandArgument = type("CommandArgument")(TaggedUnion("type", VarInt, {
  "brigadier:bool": null,
  "brigadier:float": CommandMinMaxArgument(Float),
  "brigadier:double": CommandMinMaxArgument(Double),
  "brigadier:integer": CommandMinMaxArgument(Int),
  "brigadier:long": CommandMinMaxArgument(Long),
  "brigadier:string": Struct({ template: BrigadierStringTemplate }),
  "entity": BitFlags(Byte, { single: 0x1, playersOnly: 0x2 }),
  "game_profile": null,
  "block_pos": null,
  "column_pos": null,
  "vec3": null,
  "vec2": null,
  "block_state": null,
  "block_predicate": null,
  "item_stack": null,
  "item_predicate": null,
  "color": null,
  "component": null,
  "message": null,
  "nbt_compound_tag": null,
  "nbt_tag": null,
  "nbt_path": null,
  "objective": null,
  "objective_criteria": null,
  "operation": null,
  "particle": null,
  "angle": null,
  "rotation": null,
  "scoreboard_slot": null,
  "score_holder": BitFlags(Byte, { multiple: 0x1 }),
  "swizzle": null,
  "team": null,
  "item_slot": null,
  "resource_location": null,
  "mob_effect": null,
  "function": null,
  "entity_anchor": null,
  "int_range": null,
  "float_range": null,
  "item_enchantment": null,
  "entity_summon": null,
  "dimension": null,
  "time": null,
  "resource_or_tag": Struct({ registryKey: ResourceLocation }),
  "resource": Struct({ registryKey: ResourceLocation }),
  "template_mirror": null,
  "template_rotation": null,
  "uuid": null,
}));

const CommandNodeStub = type("CommandNodeStub")(TaggedUnion("type", Byte, {
  root: null,
  literal: Struct({ id: String() }),
  argument: Struct({
    id: String(),
    argument: CommandArgument,
    suggestionId: Optional(ResourceLocation),
  }),
}));

export const CommandNode = type("CommandNode")(CustomStruct({
  isExecutable: Boolean,
  children: List(VarInt),
  redirectNode: Optional(VarInt),
  node: CommandNodeStub,
}, (context) => {
  const { reader, declare, statement, capture } = context;

  const flags = declare("flags", () => Byte.read(context));
  const isExecutable = declare("isExecutable", () => `(${flags.use()} & 0x4) != 0`);
  const children = declare("children", () => List(VarInt).read(context));

  const redirectNode = declare("redirectNode", "number | null", "null");
  statement(`if ((${flags.use()} & 0x8) != 0) ${redirectNode.use()} = ${reader}.readVarInt()`);

  const node = declare("node", Optional(CommandNodeStub).definition, "null");
  const { value: literalValue, statementBlock: literalStatements } = capture(() =>
    `{ type: "literal", id: ${String().read(context)} }`
  );

  const type = `(${flags.use()} & 0x3)`;
  statement(`if (${type} == 1) {\n${literalStatements}${node.use()} = ${literalValue};\n}`);
  const { value: argumentValue, statementBlock: argumentStatements } = capture(() =>
    `{ type: "argument", id: ${declare("id", () => String().read(context)).use()}, argument: ${
      declare("argument", () => CommandArgument.read(context)).use()
    }, suggestionId: ((${flags.use()} & 0x10) != 0) ? ${ResourceLocation.read(context)} : null }`
  );
  statement(`else if (${type} == 2) {\n${argumentStatements}${node.use()} = ${argumentValue};\n}`);
  statement(`else {\n${node.use()} = { type: "root" };\n}`);

  return { isExecutable, children, redirectNode, node };
}, (context, node) => {
  const { writer, statement, capture } = context;

  const nodeType = context.declare("type", "number");
  statement(`switch (${node}.node.type) {\n${
    ["root", "literal", "argument"].map((type, id) => {
      return `case ${JSON.stringify(type)}:\n${nodeType.use()} = ${id};\nbreak;\n`;
    }).join("")
  }}`);

  const hasRedirect = `${node}.redirectNode != null)`;
  const hasSuggestion = `${node}.node.type == "argument" && ${node}.node.suggestionId != null`;
  Byte.write(
    context,
    `${nodeType.use()} | -${node}.isExecutable & 0x4 | -(${hasRedirect} & 0x8 | -(${hasSuggestion}) & 0x10`,
  );

  List(VarInt).write(context, `${node}.children`);

  statement(`if (${node}.redirectNode != null) ${writer}.writeVarInt(${node}.redirectNode);\n`);
  statement(`if (${node}.node.type == "literal") ${
    capture(() => {
      String().write(context, `${node}.node.id`);
    }).statementBlock
  }`);
  statement(`else if (${node}.node.type == "argument") {\n${
    capture(() => {
      String().write(context, `${node}.node.id`);
      CommandArgument.write(context, `${node}.node.argument`);
      statement(`if (${node}.node.suggestionId != null) {\n${
        capture(() => ResourceLocation.write(context, `${node}.node.suggestionId`)).statementBlock
      }}`);
    }).statementBlock
  }}`);
}));

export const SignedMessageHeader = type("SignedMessageHeader")(Struct({
  previousSignature: Optional(ByteArray()),
  sender: Uuid,
}));

export const ChatMessageContent = type("ChatMessageContent")(Struct({
  plain: String(256),
  decorated: Optional(Component),
}));

export const LastSeenMessagesEntry = type("LastSeenMessagesEntry")(Struct({
  profileId: Uuid,
  lastSignature: ByteArray(),
}));

export const LastSeenMessagesUpdate = type("LastSeenMessagesUpdate")(Struct({
  lastSeen: List(LastSeenMessagesEntry),
  lastReceived: Optional(LastSeenMessagesEntry),
}));

export const SignedMessageBody = type("SignedMessageBody")(Struct({
  content: ChatMessageContent,
  timestamp: Long,
  salt: Long,
  lastSeen: List(LastSeenMessagesEntry),
}));

export const FilterMask = type("FilterMask")(TaggedUnion("type", VarInt, {
  pass_through: null,
  fully_filtered: null,
  partially_filtered: Struct({ filter: LongArray().alias("BitSet") }),
}));

export const ArgumentSignatureEntry = type("ArgumentSignatureEntry")(Struct({
  name: String(16),
  signature: ByteArray(),
}));

export const ArgumentSignatures = type("ArgumentSignatures", List(ArgumentSignatureEntry));

export const ChatVisiblity = type("ChatVisiblity")(Enum([
  "full",
  "system",
  "hidden",
]));

export const HumanoidArm = type("HumanoidArm")(Enum([
  "left",
  "right",
]));

export const ClickType = type("ClickType")(Enum([
  "pickup",
  "quick_move",
  "swap",
  "clone",
  "throw",
  "quick_craft",
  "pickup_all",
]));

export const EquipmentSlot = type("EquipmentSlot")(Enum([
  "mainhand",
  "offhand",
  "feet",
  "legs",
  "chest",
  "head",
]));

export const PlayerAction = type("PlayerAction")(Enum([
  "start_destroy_block",
  "abort_destroy_block",
  "stop_destroy_block",
  "drop_all_items",
  "drop_item",
  "release_use_item",
  "swap_item_with_offhand",
]));

export const InteractionHand = type("InteractionHand")(Enum([
  "main_hand",
  "off_hand",
]));

export const RecipeBookType = type("RecipeBookType")(Enum([
  "crafting",
  "furnace",
  "blast_furnace",
  "smoker",
]));

export const ChatFormatting = type("ChatFormatting")(Enum([
  "black",
  "dark_blue",
  "dark_green",
  "dark_aqua",
  "dark_red",
  "dark_purple",
  "gold",
  "gray",
  "dark_gray",
  "blue",
  "green",
  "aqua",
  "red",
  "light_purple",
  "yellow",
  "white",
  "obfuscated",
  "bold",
  "strikethrough",
  "underline",
  "italic",
  "reset",
]));

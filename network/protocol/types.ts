// deno-lint-ignore-file
import { Reader, Writer } from "minecraft/io/mod.ts";
import { CompoundTag } from "minecraft/nbt/tag.ts";

export type ChatType =
  | "minecraft:chat"
  | "minecraft:say_command"
  | "minecraft:msg_command_incoming"
  | "minecraft:msg_command_outgoing"
  | "minecraft:team_msg_command_incoming"
  | "minecraft:team_msg_command_outgoing"
  | "minecraft:emote_command";

export function createEnumMapper<T extends string>(keys: T[]) {
  const idMap = Object.fromEntries(keys.map((key, id) => [key, id]));
  return {
    toId(key: T): number {
      const id = idMap[key];
      if (id == null) throw new Error("Invalid enum key '${key}'");
      return id;
    },
    fromId(id: number): T {
      const key = keys[id];
      if (key == null) throw new Error(`Invalid enum id ${key}`);
      return key;
    },
  };
}

export const chatTypeEnum = createEnumMapper<ChatType>([
  "minecraft:chat",
  "minecraft:say_command",
  "minecraft:msg_command_incoming",
  "minecraft:msg_command_outgoing",
  "minecraft:team_msg_command_incoming",
  "minecraft:team_msg_command_outgoing",
  "minecraft:emote_command",
]);

export function readChatType(reader: Reader): ChatType {
  return chatTypeEnum.fromId(reader.readVarInt());
}

export function writeChatType(writer: Writer, value: ChatType) {
  writer.writeVarInt(chatTypeEnum.toId(value));
}

export type SoundEvent =
  | "minecraft:entity.allay.ambient_with_item"
  | "minecraft:entity.allay.ambient_without_item"
  | "minecraft:entity.allay.death"
  | "minecraft:entity.allay.hurt"
  | "minecraft:entity.allay.item_given"
  | "minecraft:entity.allay.item_taken"
  | "minecraft:entity.allay.item_thrown"
  | "minecraft:ambient.cave"
  | "minecraft:ambient.basalt_deltas.additions"
  | "minecraft:ambient.basalt_deltas.loop"
  | "minecraft:ambient.basalt_deltas.mood"
  | "minecraft:ambient.crimson_forest.additions"
  | "minecraft:ambient.crimson_forest.loop"
  | "minecraft:ambient.crimson_forest.mood"
  | "minecraft:ambient.nether_wastes.additions"
  | "minecraft:ambient.nether_wastes.loop"
  | "minecraft:ambient.nether_wastes.mood"
  | "minecraft:ambient.soul_sand_valley.additions"
  | "minecraft:ambient.soul_sand_valley.loop"
  | "minecraft:ambient.soul_sand_valley.mood"
  | "minecraft:ambient.warped_forest.additions"
  | "minecraft:ambient.warped_forest.loop"
  | "minecraft:ambient.warped_forest.mood"
  | "minecraft:ambient.underwater.enter"
  | "minecraft:ambient.underwater.exit"
  | "minecraft:ambient.underwater.loop"
  | "minecraft:ambient.underwater.loop.additions"
  | "minecraft:ambient.underwater.loop.additions.rare"
  | "minecraft:ambient.underwater.loop.additions.ultra_rare"
  | "minecraft:block.amethyst_block.break"
  | "minecraft:block.amethyst_block.chime"
  | "minecraft:block.amethyst_block.fall"
  | "minecraft:block.amethyst_block.hit"
  | "minecraft:block.amethyst_block.place"
  | "minecraft:block.amethyst_block.step"
  | "minecraft:block.amethyst_cluster.break"
  | "minecraft:block.amethyst_cluster.fall"
  | "minecraft:block.amethyst_cluster.hit"
  | "minecraft:block.amethyst_cluster.place"
  | "minecraft:block.amethyst_cluster.step"
  | "minecraft:block.ancient_debris.break"
  | "minecraft:block.ancient_debris.step"
  | "minecraft:block.ancient_debris.place"
  | "minecraft:block.ancient_debris.hit"
  | "minecraft:block.ancient_debris.fall"
  | "minecraft:block.anvil.break"
  | "minecraft:block.anvil.destroy"
  | "minecraft:block.anvil.fall"
  | "minecraft:block.anvil.hit"
  | "minecraft:block.anvil.land"
  | "minecraft:block.anvil.place"
  | "minecraft:block.anvil.step"
  | "minecraft:block.anvil.use"
  | "minecraft:item.armor.equip_chain"
  | "minecraft:item.armor.equip_diamond"
  | "minecraft:item.armor.equip_elytra"
  | "minecraft:item.armor.equip_generic"
  | "minecraft:item.armor.equip_gold"
  | "minecraft:item.armor.equip_iron"
  | "minecraft:item.armor.equip_leather"
  | "minecraft:item.armor.equip_netherite"
  | "minecraft:item.armor.equip_turtle"
  | "minecraft:entity.armor_stand.break"
  | "minecraft:entity.armor_stand.fall"
  | "minecraft:entity.armor_stand.hit"
  | "minecraft:entity.armor_stand.place"
  | "minecraft:entity.arrow.hit"
  | "minecraft:entity.arrow.hit_player"
  | "minecraft:entity.arrow.shoot"
  | "minecraft:item.axe.strip"
  | "minecraft:item.axe.scrape"
  | "minecraft:item.axe.wax_off"
  | "minecraft:entity.axolotl.attack"
  | "minecraft:entity.axolotl.death"
  | "minecraft:entity.axolotl.hurt"
  | "minecraft:entity.axolotl.idle_air"
  | "minecraft:entity.axolotl.idle_water"
  | "minecraft:entity.axolotl.splash"
  | "minecraft:entity.axolotl.swim"
  | "minecraft:block.azalea.break"
  | "minecraft:block.azalea.fall"
  | "minecraft:block.azalea.hit"
  | "minecraft:block.azalea.place"
  | "minecraft:block.azalea.step"
  | "minecraft:block.azalea_leaves.break"
  | "minecraft:block.azalea_leaves.fall"
  | "minecraft:block.azalea_leaves.hit"
  | "minecraft:block.azalea_leaves.place"
  | "minecraft:block.azalea_leaves.step"
  | "minecraft:block.bamboo.break"
  | "minecraft:block.bamboo.fall"
  | "minecraft:block.bamboo.hit"
  | "minecraft:block.bamboo.place"
  | "minecraft:block.bamboo.step"
  | "minecraft:block.bamboo_sapling.break"
  | "minecraft:block.bamboo_sapling.hit"
  | "minecraft:block.bamboo_sapling.place"
  | "minecraft:block.barrel.close"
  | "minecraft:block.barrel.open"
  | "minecraft:block.basalt.break"
  | "minecraft:block.basalt.step"
  | "minecraft:block.basalt.place"
  | "minecraft:block.basalt.hit"
  | "minecraft:block.basalt.fall"
  | "minecraft:entity.bat.ambient"
  | "minecraft:entity.bat.death"
  | "minecraft:entity.bat.hurt"
  | "minecraft:entity.bat.loop"
  | "minecraft:entity.bat.takeoff"
  | "minecraft:block.beacon.activate"
  | "minecraft:block.beacon.ambient"
  | "minecraft:block.beacon.deactivate"
  | "minecraft:block.beacon.power_select"
  | "minecraft:entity.bee.death"
  | "minecraft:entity.bee.hurt"
  | "minecraft:entity.bee.loop_aggressive"
  | "minecraft:entity.bee.loop"
  | "minecraft:entity.bee.sting"
  | "minecraft:entity.bee.pollinate"
  | "minecraft:block.beehive.drip"
  | "minecraft:block.beehive.enter"
  | "minecraft:block.beehive.exit"
  | "minecraft:block.beehive.shear"
  | "minecraft:block.beehive.work"
  | "minecraft:block.bell.use"
  | "minecraft:block.bell.resonate"
  | "minecraft:block.big_dripleaf.break"
  | "minecraft:block.big_dripleaf.fall"
  | "minecraft:block.big_dripleaf.hit"
  | "minecraft:block.big_dripleaf.place"
  | "minecraft:block.big_dripleaf.step"
  | "minecraft:entity.blaze.ambient"
  | "minecraft:entity.blaze.burn"
  | "minecraft:entity.blaze.death"
  | "minecraft:entity.blaze.hurt"
  | "minecraft:entity.blaze.shoot"
  | "minecraft:entity.boat.paddle_land"
  | "minecraft:entity.boat.paddle_water"
  | "minecraft:block.bone_block.break"
  | "minecraft:block.bone_block.fall"
  | "minecraft:block.bone_block.hit"
  | "minecraft:block.bone_block.place"
  | "minecraft:block.bone_block.step"
  | "minecraft:item.bone_meal.use"
  | "minecraft:item.book.page_turn"
  | "minecraft:item.book.put"
  | "minecraft:block.blastfurnace.fire_crackle"
  | "minecraft:item.bottle.empty"
  | "minecraft:item.bottle.fill"
  | "minecraft:item.bottle.fill_dragonbreath"
  | "minecraft:block.brewing_stand.brew"
  | "minecraft:block.bubble_column.bubble_pop"
  | "minecraft:block.bubble_column.upwards_ambient"
  | "minecraft:block.bubble_column.upwards_inside"
  | "minecraft:block.bubble_column.whirlpool_ambient"
  | "minecraft:block.bubble_column.whirlpool_inside"
  | "minecraft:item.bucket.empty"
  | "minecraft:item.bucket.empty_axolotl"
  | "minecraft:item.bucket.empty_fish"
  | "minecraft:item.bucket.empty_lava"
  | "minecraft:item.bucket.empty_powder_snow"
  | "minecraft:item.bucket.empty_tadpole"
  | "minecraft:item.bucket.fill"
  | "minecraft:item.bucket.fill_axolotl"
  | "minecraft:item.bucket.fill_fish"
  | "minecraft:item.bucket.fill_lava"
  | "minecraft:item.bucket.fill_powder_snow"
  | "minecraft:item.bucket.fill_tadpole"
  | "minecraft:item.bundle.drop_contents"
  | "minecraft:item.bundle.insert"
  | "minecraft:item.bundle.remove_one"
  | "minecraft:block.cake.add_candle"
  | "minecraft:block.calcite.break"
  | "minecraft:block.calcite.step"
  | "minecraft:block.calcite.place"
  | "minecraft:block.calcite.hit"
  | "minecraft:block.calcite.fall"
  | "minecraft:block.campfire.crackle"
  | "minecraft:block.candle.ambient"
  | "minecraft:block.candle.break"
  | "minecraft:block.candle.extinguish"
  | "minecraft:block.candle.fall"
  | "minecraft:block.candle.hit"
  | "minecraft:block.candle.place"
  | "minecraft:block.candle.step"
  | "minecraft:entity.cat.ambient"
  | "minecraft:entity.cat.stray_ambient"
  | "minecraft:entity.cat.death"
  | "minecraft:entity.cat.eat"
  | "minecraft:entity.cat.hiss"
  | "minecraft:entity.cat.beg_for_food"
  | "minecraft:entity.cat.hurt"
  | "minecraft:entity.cat.purr"
  | "minecraft:entity.cat.purreow"
  | "minecraft:block.cave_vines.break"
  | "minecraft:block.cave_vines.fall"
  | "minecraft:block.cave_vines.hit"
  | "minecraft:block.cave_vines.place"
  | "minecraft:block.cave_vines.step"
  | "minecraft:block.cave_vines.pick_berries"
  | "minecraft:block.chain.break"
  | "minecraft:block.chain.fall"
  | "minecraft:block.chain.hit"
  | "minecraft:block.chain.place"
  | "minecraft:block.chain.step"
  | "minecraft:block.chest.close"
  | "minecraft:block.chest.locked"
  | "minecraft:block.chest.open"
  | "minecraft:entity.chicken.ambient"
  | "minecraft:entity.chicken.death"
  | "minecraft:entity.chicken.egg"
  | "minecraft:entity.chicken.hurt"
  | "minecraft:entity.chicken.step"
  | "minecraft:block.chorus_flower.death"
  | "minecraft:block.chorus_flower.grow"
  | "minecraft:item.chorus_fruit.teleport"
  | "minecraft:entity.cod.ambient"
  | "minecraft:entity.cod.death"
  | "minecraft:entity.cod.flop"
  | "minecraft:entity.cod.hurt"
  | "minecraft:block.comparator.click"
  | "minecraft:block.composter.empty"
  | "minecraft:block.composter.fill"
  | "minecraft:block.composter.fill_success"
  | "minecraft:block.composter.ready"
  | "minecraft:block.conduit.activate"
  | "minecraft:block.conduit.ambient"
  | "minecraft:block.conduit.ambient.short"
  | "minecraft:block.conduit.attack.target"
  | "minecraft:block.conduit.deactivate"
  | "minecraft:block.copper.break"
  | "minecraft:block.copper.step"
  | "minecraft:block.copper.place"
  | "minecraft:block.copper.hit"
  | "minecraft:block.copper.fall"
  | "minecraft:block.coral_block.break"
  | "minecraft:block.coral_block.fall"
  | "minecraft:block.coral_block.hit"
  | "minecraft:block.coral_block.place"
  | "minecraft:block.coral_block.step"
  | "minecraft:entity.cow.ambient"
  | "minecraft:entity.cow.death"
  | "minecraft:entity.cow.hurt"
  | "minecraft:entity.cow.milk"
  | "minecraft:entity.cow.step"
  | "minecraft:entity.creeper.death"
  | "minecraft:entity.creeper.hurt"
  | "minecraft:entity.creeper.primed"
  | "minecraft:block.crop.break"
  | "minecraft:item.crop.plant"
  | "minecraft:item.crossbow.hit"
  | "minecraft:item.crossbow.loading_end"
  | "minecraft:item.crossbow.loading_middle"
  | "minecraft:item.crossbow.loading_start"
  | "minecraft:item.crossbow.quick_charge_1"
  | "minecraft:item.crossbow.quick_charge_2"
  | "minecraft:item.crossbow.quick_charge_3"
  | "minecraft:item.crossbow.shoot"
  | "minecraft:block.deepslate_bricks.break"
  | "minecraft:block.deepslate_bricks.fall"
  | "minecraft:block.deepslate_bricks.hit"
  | "minecraft:block.deepslate_bricks.place"
  | "minecraft:block.deepslate_bricks.step"
  | "minecraft:block.deepslate.break"
  | "minecraft:block.deepslate.fall"
  | "minecraft:block.deepslate.hit"
  | "minecraft:block.deepslate.place"
  | "minecraft:block.deepslate.step"
  | "minecraft:block.deepslate_tiles.break"
  | "minecraft:block.deepslate_tiles.fall"
  | "minecraft:block.deepslate_tiles.hit"
  | "minecraft:block.deepslate_tiles.place"
  | "minecraft:block.deepslate_tiles.step"
  | "minecraft:block.dispenser.dispense"
  | "minecraft:block.dispenser.fail"
  | "minecraft:block.dispenser.launch"
  | "minecraft:entity.dolphin.ambient"
  | "minecraft:entity.dolphin.ambient_water"
  | "minecraft:entity.dolphin.attack"
  | "minecraft:entity.dolphin.death"
  | "minecraft:entity.dolphin.eat"
  | "minecraft:entity.dolphin.hurt"
  | "minecraft:entity.dolphin.jump"
  | "minecraft:entity.dolphin.play"
  | "minecraft:entity.dolphin.splash"
  | "minecraft:entity.dolphin.swim"
  | "minecraft:entity.donkey.ambient"
  | "minecraft:entity.donkey.angry"
  | "minecraft:entity.donkey.chest"
  | "minecraft:entity.donkey.death"
  | "minecraft:entity.donkey.eat"
  | "minecraft:entity.donkey.hurt"
  | "minecraft:block.dripstone_block.break"
  | "minecraft:block.dripstone_block.step"
  | "minecraft:block.dripstone_block.place"
  | "minecraft:block.dripstone_block.hit"
  | "minecraft:block.dripstone_block.fall"
  | "minecraft:block.pointed_dripstone.break"
  | "minecraft:block.pointed_dripstone.step"
  | "minecraft:block.pointed_dripstone.place"
  | "minecraft:block.pointed_dripstone.hit"
  | "minecraft:block.pointed_dripstone.fall"
  | "minecraft:block.pointed_dripstone.land"
  | "minecraft:block.pointed_dripstone.drip_lava"
  | "minecraft:block.pointed_dripstone.drip_water"
  | "minecraft:block.pointed_dripstone.drip_lava_into_cauldron"
  | "minecraft:block.pointed_dripstone.drip_water_into_cauldron"
  | "minecraft:block.big_dripleaf.tilt_down"
  | "minecraft:block.big_dripleaf.tilt_up"
  | "minecraft:entity.drowned.ambient"
  | "minecraft:entity.drowned.ambient_water"
  | "minecraft:entity.drowned.death"
  | "minecraft:entity.drowned.death_water"
  | "minecraft:entity.drowned.hurt"
  | "minecraft:entity.drowned.hurt_water"
  | "minecraft:entity.drowned.shoot"
  | "minecraft:entity.drowned.step"
  | "minecraft:entity.drowned.swim"
  | "minecraft:item.dye.use"
  | "minecraft:entity.egg.throw"
  | "minecraft:entity.elder_guardian.ambient"
  | "minecraft:entity.elder_guardian.ambient_land"
  | "minecraft:entity.elder_guardian.curse"
  | "minecraft:entity.elder_guardian.death"
  | "minecraft:entity.elder_guardian.death_land"
  | "minecraft:entity.elder_guardian.flop"
  | "minecraft:entity.elder_guardian.hurt"
  | "minecraft:entity.elder_guardian.hurt_land"
  | "minecraft:item.elytra.flying"
  | "minecraft:block.enchantment_table.use"
  | "minecraft:block.ender_chest.close"
  | "minecraft:block.ender_chest.open"
  | "minecraft:entity.ender_dragon.ambient"
  | "minecraft:entity.ender_dragon.death"
  | "minecraft:entity.dragon_fireball.explode"
  | "minecraft:entity.ender_dragon.flap"
  | "minecraft:entity.ender_dragon.growl"
  | "minecraft:entity.ender_dragon.hurt"
  | "minecraft:entity.ender_dragon.shoot"
  | "minecraft:entity.ender_eye.death"
  | "minecraft:entity.ender_eye.launch"
  | "minecraft:entity.enderman.ambient"
  | "minecraft:entity.enderman.death"
  | "minecraft:entity.enderman.hurt"
  | "minecraft:entity.enderman.scream"
  | "minecraft:entity.enderman.stare"
  | "minecraft:entity.enderman.teleport"
  | "minecraft:entity.endermite.ambient"
  | "minecraft:entity.endermite.death"
  | "minecraft:entity.endermite.hurt"
  | "minecraft:entity.endermite.step"
  | "minecraft:entity.ender_pearl.throw"
  | "minecraft:block.end_gateway.spawn"
  | "minecraft:block.end_portal_frame.fill"
  | "minecraft:block.end_portal.spawn"
  | "minecraft:entity.evoker.ambient"
  | "minecraft:entity.evoker.cast_spell"
  | "minecraft:entity.evoker.celebrate"
  | "minecraft:entity.evoker.death"
  | "minecraft:entity.evoker_fangs.attack"
  | "minecraft:entity.evoker.hurt"
  | "minecraft:entity.evoker.prepare_attack"
  | "minecraft:entity.evoker.prepare_summon"
  | "minecraft:entity.evoker.prepare_wololo"
  | "minecraft:entity.experience_bottle.throw"
  | "minecraft:entity.experience_orb.pickup"
  | "minecraft:block.fence_gate.close"
  | "minecraft:block.fence_gate.open"
  | "minecraft:item.firecharge.use"
  | "minecraft:entity.firework_rocket.blast"
  | "minecraft:entity.firework_rocket.blast_far"
  | "minecraft:entity.firework_rocket.large_blast"
  | "minecraft:entity.firework_rocket.large_blast_far"
  | "minecraft:entity.firework_rocket.launch"
  | "minecraft:entity.firework_rocket.shoot"
  | "minecraft:entity.firework_rocket.twinkle"
  | "minecraft:entity.firework_rocket.twinkle_far"
  | "minecraft:block.fire.ambient"
  | "minecraft:block.fire.extinguish"
  | "minecraft:entity.fish.swim"
  | "minecraft:entity.fishing_bobber.retrieve"
  | "minecraft:entity.fishing_bobber.splash"
  | "minecraft:entity.fishing_bobber.throw"
  | "minecraft:item.flintandsteel.use"
  | "minecraft:block.flowering_azalea.break"
  | "minecraft:block.flowering_azalea.fall"
  | "minecraft:block.flowering_azalea.hit"
  | "minecraft:block.flowering_azalea.place"
  | "minecraft:block.flowering_azalea.step"
  | "minecraft:entity.fox.aggro"
  | "minecraft:entity.fox.ambient"
  | "minecraft:entity.fox.bite"
  | "minecraft:entity.fox.death"
  | "minecraft:entity.fox.eat"
  | "minecraft:entity.fox.hurt"
  | "minecraft:entity.fox.screech"
  | "minecraft:entity.fox.sleep"
  | "minecraft:entity.fox.sniff"
  | "minecraft:entity.fox.spit"
  | "minecraft:entity.fox.teleport"
  | "minecraft:block.froglight.break"
  | "minecraft:block.froglight.fall"
  | "minecraft:block.froglight.hit"
  | "minecraft:block.froglight.place"
  | "minecraft:block.froglight.step"
  | "minecraft:block.frogspawn.step"
  | "minecraft:block.frogspawn.break"
  | "minecraft:block.frogspawn.fall"
  | "minecraft:block.frogspawn.hatch"
  | "minecraft:block.frogspawn.hit"
  | "minecraft:block.frogspawn.place"
  | "minecraft:entity.frog.ambient"
  | "minecraft:entity.frog.death"
  | "minecraft:entity.frog.eat"
  | "minecraft:entity.frog.hurt"
  | "minecraft:entity.frog.lay_spawn"
  | "minecraft:entity.frog.long_jump"
  | "minecraft:entity.frog.step"
  | "minecraft:entity.frog.tongue"
  | "minecraft:block.roots.break"
  | "minecraft:block.roots.step"
  | "minecraft:block.roots.place"
  | "minecraft:block.roots.hit"
  | "minecraft:block.roots.fall"
  | "minecraft:block.furnace.fire_crackle"
  | "minecraft:entity.generic.big_fall"
  | "minecraft:entity.generic.burn"
  | "minecraft:entity.generic.death"
  | "minecraft:entity.generic.drink"
  | "minecraft:entity.generic.eat"
  | "minecraft:entity.generic.explode"
  | "minecraft:entity.generic.extinguish_fire"
  | "minecraft:entity.generic.hurt"
  | "minecraft:entity.generic.small_fall"
  | "minecraft:entity.generic.splash"
  | "minecraft:entity.generic.swim"
  | "minecraft:entity.ghast.ambient"
  | "minecraft:entity.ghast.death"
  | "minecraft:entity.ghast.hurt"
  | "minecraft:entity.ghast.scream"
  | "minecraft:entity.ghast.shoot"
  | "minecraft:entity.ghast.warn"
  | "minecraft:block.gilded_blackstone.break"
  | "minecraft:block.gilded_blackstone.fall"
  | "minecraft:block.gilded_blackstone.hit"
  | "minecraft:block.gilded_blackstone.place"
  | "minecraft:block.gilded_blackstone.step"
  | "minecraft:block.glass.break"
  | "minecraft:block.glass.fall"
  | "minecraft:block.glass.hit"
  | "minecraft:block.glass.place"
  | "minecraft:block.glass.step"
  | "minecraft:item.glow_ink_sac.use"
  | "minecraft:entity.glow_item_frame.add_item"
  | "minecraft:entity.glow_item_frame.break"
  | "minecraft:entity.glow_item_frame.place"
  | "minecraft:entity.glow_item_frame.remove_item"
  | "minecraft:entity.glow_item_frame.rotate_item"
  | "minecraft:entity.glow_squid.ambient"
  | "minecraft:entity.glow_squid.death"
  | "minecraft:entity.glow_squid.hurt"
  | "minecraft:entity.glow_squid.squirt"
  | "minecraft:entity.goat.ambient"
  | "minecraft:entity.goat.death"
  | "minecraft:entity.goat.eat"
  | "minecraft:entity.goat.hurt"
  | "minecraft:entity.goat.long_jump"
  | "minecraft:entity.goat.milk"
  | "minecraft:entity.goat.prepare_ram"
  | "minecraft:entity.goat.ram_impact"
  | "minecraft:entity.goat.horn_break"
  | "minecraft:item.goat_horn.play"
  | "minecraft:entity.goat.screaming.ambient"
  | "minecraft:entity.goat.screaming.death"
  | "minecraft:entity.goat.screaming.eat"
  | "minecraft:entity.goat.screaming.hurt"
  | "minecraft:entity.goat.screaming.long_jump"
  | "minecraft:entity.goat.screaming.milk"
  | "minecraft:entity.goat.screaming.prepare_ram"
  | "minecraft:entity.goat.screaming.ram_impact"
  | "minecraft:entity.goat.screaming.horn_break"
  | "minecraft:entity.goat.step"
  | "minecraft:block.grass.break"
  | "minecraft:block.grass.fall"
  | "minecraft:block.grass.hit"
  | "minecraft:block.grass.place"
  | "minecraft:block.grass.step"
  | "minecraft:block.gravel.break"
  | "minecraft:block.gravel.fall"
  | "minecraft:block.gravel.hit"
  | "minecraft:block.gravel.place"
  | "minecraft:block.gravel.step"
  | "minecraft:block.grindstone.use"
  | "minecraft:block.growing_plant.crop"
  | "minecraft:entity.guardian.ambient"
  | "minecraft:entity.guardian.ambient_land"
  | "minecraft:entity.guardian.attack"
  | "minecraft:entity.guardian.death"
  | "minecraft:entity.guardian.death_land"
  | "minecraft:entity.guardian.flop"
  | "minecraft:entity.guardian.hurt"
  | "minecraft:entity.guardian.hurt_land"
  | "minecraft:block.hanging_roots.break"
  | "minecraft:block.hanging_roots.fall"
  | "minecraft:block.hanging_roots.hit"
  | "minecraft:block.hanging_roots.place"
  | "minecraft:block.hanging_roots.step"
  | "minecraft:item.hoe.till"
  | "minecraft:entity.hoglin.ambient"
  | "minecraft:entity.hoglin.angry"
  | "minecraft:entity.hoglin.attack"
  | "minecraft:entity.hoglin.converted_to_zombified"
  | "minecraft:entity.hoglin.death"
  | "minecraft:entity.hoglin.hurt"
  | "minecraft:entity.hoglin.retreat"
  | "minecraft:entity.hoglin.step"
  | "minecraft:block.honey_block.break"
  | "minecraft:block.honey_block.fall"
  | "minecraft:block.honey_block.hit"
  | "minecraft:block.honey_block.place"
  | "minecraft:block.honey_block.slide"
  | "minecraft:block.honey_block.step"
  | "minecraft:item.honeycomb.wax_on"
  | "minecraft:item.honey_bottle.drink"
  | "minecraft:item.goat_horn.sound.0"
  | "minecraft:item.goat_horn.sound.1"
  | "minecraft:item.goat_horn.sound.2"
  | "minecraft:item.goat_horn.sound.3"
  | "minecraft:item.goat_horn.sound.4"
  | "minecraft:item.goat_horn.sound.5"
  | "minecraft:item.goat_horn.sound.6"
  | "minecraft:item.goat_horn.sound.7"
  | "minecraft:entity.horse.ambient"
  | "minecraft:entity.horse.angry"
  | "minecraft:entity.horse.armor"
  | "minecraft:entity.horse.breathe"
  | "minecraft:entity.horse.death"
  | "minecraft:entity.horse.eat"
  | "minecraft:entity.horse.gallop"
  | "minecraft:entity.horse.hurt"
  | "minecraft:entity.horse.jump"
  | "minecraft:entity.horse.land"
  | "minecraft:entity.horse.saddle"
  | "minecraft:entity.horse.step"
  | "minecraft:entity.horse.step_wood"
  | "minecraft:entity.hostile.big_fall"
  | "minecraft:entity.hostile.death"
  | "minecraft:entity.hostile.hurt"
  | "minecraft:entity.hostile.small_fall"
  | "minecraft:entity.hostile.splash"
  | "minecraft:entity.hostile.swim"
  | "minecraft:entity.husk.ambient"
  | "minecraft:entity.husk.converted_to_zombie"
  | "minecraft:entity.husk.death"
  | "minecraft:entity.husk.hurt"
  | "minecraft:entity.husk.step"
  | "minecraft:entity.illusioner.ambient"
  | "minecraft:entity.illusioner.cast_spell"
  | "minecraft:entity.illusioner.death"
  | "minecraft:entity.illusioner.hurt"
  | "minecraft:entity.illusioner.mirror_move"
  | "minecraft:entity.illusioner.prepare_blindness"
  | "minecraft:entity.illusioner.prepare_mirror"
  | "minecraft:item.ink_sac.use"
  | "minecraft:block.iron_door.close"
  | "minecraft:block.iron_door.open"
  | "minecraft:entity.iron_golem.attack"
  | "minecraft:entity.iron_golem.damage"
  | "minecraft:entity.iron_golem.death"
  | "minecraft:entity.iron_golem.hurt"
  | "minecraft:entity.iron_golem.repair"
  | "minecraft:entity.iron_golem.step"
  | "minecraft:block.iron_trapdoor.close"
  | "minecraft:block.iron_trapdoor.open"
  | "minecraft:entity.item_frame.add_item"
  | "minecraft:entity.item_frame.break"
  | "minecraft:entity.item_frame.place"
  | "minecraft:entity.item_frame.remove_item"
  | "minecraft:entity.item_frame.rotate_item"
  | "minecraft:entity.item.break"
  | "minecraft:entity.item.pickup"
  | "minecraft:block.ladder.break"
  | "minecraft:block.ladder.fall"
  | "minecraft:block.ladder.hit"
  | "minecraft:block.ladder.place"
  | "minecraft:block.ladder.step"
  | "minecraft:block.lantern.break"
  | "minecraft:block.lantern.fall"
  | "minecraft:block.lantern.hit"
  | "minecraft:block.lantern.place"
  | "minecraft:block.lantern.step"
  | "minecraft:block.large_amethyst_bud.break"
  | "minecraft:block.large_amethyst_bud.place"
  | "minecraft:block.lava.ambient"
  | "minecraft:block.lava.extinguish"
  | "minecraft:block.lava.pop"
  | "minecraft:entity.leash_knot.break"
  | "minecraft:entity.leash_knot.place"
  | "minecraft:block.lever.click"
  | "minecraft:entity.lightning_bolt.impact"
  | "minecraft:entity.lightning_bolt.thunder"
  | "minecraft:entity.lingering_potion.throw"
  | "minecraft:entity.llama.ambient"
  | "minecraft:entity.llama.angry"
  | "minecraft:entity.llama.chest"
  | "minecraft:entity.llama.death"
  | "minecraft:entity.llama.eat"
  | "minecraft:entity.llama.hurt"
  | "minecraft:entity.llama.spit"
  | "minecraft:entity.llama.step"
  | "minecraft:entity.llama.swag"
  | "minecraft:entity.magma_cube.death_small"
  | "minecraft:block.lodestone.break"
  | "minecraft:block.lodestone.step"
  | "minecraft:block.lodestone.place"
  | "minecraft:block.lodestone.hit"
  | "minecraft:block.lodestone.fall"
  | "minecraft:item.lodestone_compass.lock"
  | "minecraft:entity.magma_cube.death"
  | "minecraft:entity.magma_cube.hurt"
  | "minecraft:entity.magma_cube.hurt_small"
  | "minecraft:entity.magma_cube.jump"
  | "minecraft:entity.magma_cube.squish"
  | "minecraft:entity.magma_cube.squish_small"
  | "minecraft:block.mangrove_roots.break"
  | "minecraft:block.mangrove_roots.fall"
  | "minecraft:block.mangrove_roots.hit"
  | "minecraft:block.mangrove_roots.place"
  | "minecraft:block.mangrove_roots.step"
  | "minecraft:block.medium_amethyst_bud.break"
  | "minecraft:block.medium_amethyst_bud.place"
  | "minecraft:block.metal.break"
  | "minecraft:block.metal.fall"
  | "minecraft:block.metal.hit"
  | "minecraft:block.metal.place"
  | "minecraft:block.metal_pressure_plate.click_off"
  | "minecraft:block.metal_pressure_plate.click_on"
  | "minecraft:block.metal.step"
  | "minecraft:entity.minecart.inside.underwater"
  | "minecraft:entity.minecart.inside"
  | "minecraft:entity.minecart.riding"
  | "minecraft:entity.mooshroom.convert"
  | "minecraft:entity.mooshroom.eat"
  | "minecraft:entity.mooshroom.milk"
  | "minecraft:entity.mooshroom.suspicious_milk"
  | "minecraft:entity.mooshroom.shear"
  | "minecraft:block.moss_carpet.break"
  | "minecraft:block.moss_carpet.fall"
  | "minecraft:block.moss_carpet.hit"
  | "minecraft:block.moss_carpet.place"
  | "minecraft:block.moss_carpet.step"
  | "minecraft:block.moss.break"
  | "minecraft:block.moss.fall"
  | "minecraft:block.moss.hit"
  | "minecraft:block.moss.place"
  | "minecraft:block.moss.step"
  | "minecraft:block.mud.break"
  | "minecraft:block.mud.fall"
  | "minecraft:block.mud.hit"
  | "minecraft:block.mud.place"
  | "minecraft:block.mud.step"
  | "minecraft:block.mud_bricks.break"
  | "minecraft:block.mud_bricks.fall"
  | "minecraft:block.mud_bricks.hit"
  | "minecraft:block.mud_bricks.place"
  | "minecraft:block.mud_bricks.step"
  | "minecraft:block.muddy_mangrove_roots.break"
  | "minecraft:block.muddy_mangrove_roots.fall"
  | "minecraft:block.muddy_mangrove_roots.hit"
  | "minecraft:block.muddy_mangrove_roots.place"
  | "minecraft:block.muddy_mangrove_roots.step"
  | "minecraft:entity.mule.ambient"
  | "minecraft:entity.mule.angry"
  | "minecraft:entity.mule.chest"
  | "minecraft:entity.mule.death"
  | "minecraft:entity.mule.eat"
  | "minecraft:entity.mule.hurt"
  | "minecraft:music.creative"
  | "minecraft:music.credits"
  | "minecraft:music_disc.5"
  | "minecraft:music_disc.11"
  | "minecraft:music_disc.13"
  | "minecraft:music_disc.blocks"
  | "minecraft:music_disc.cat"
  | "minecraft:music_disc.chirp"
  | "minecraft:music_disc.far"
  | "minecraft:music_disc.mall"
  | "minecraft:music_disc.mellohi"
  | "minecraft:music_disc.pigstep"
  | "minecraft:music_disc.stal"
  | "minecraft:music_disc.strad"
  | "minecraft:music_disc.wait"
  | "minecraft:music_disc.ward"
  | "minecraft:music_disc.otherside"
  | "minecraft:music.dragon"
  | "minecraft:music.end"
  | "minecraft:music.game"
  | "minecraft:music.menu"
  | "minecraft:music.nether.basalt_deltas"
  | "minecraft:music.nether.crimson_forest"
  | "minecraft:music.overworld.deep_dark"
  | "minecraft:music.overworld.dripstone_caves"
  | "minecraft:music.overworld.grove"
  | "minecraft:music.overworld.jagged_peaks"
  | "minecraft:music.overworld.lush_caves"
  | "minecraft:music.overworld.swamp"
  | "minecraft:music.overworld.jungle_and_forest"
  | "minecraft:music.overworld.old_growth_taiga"
  | "minecraft:music.overworld.meadow"
  | "minecraft:music.nether.nether_wastes"
  | "minecraft:music.overworld.frozen_peaks"
  | "minecraft:music.overworld.snowy_slopes"
  | "minecraft:music.nether.soul_sand_valley"
  | "minecraft:music.overworld.stony_peaks"
  | "minecraft:music.nether.warped_forest"
  | "minecraft:music.under_water"
  | "minecraft:block.nether_bricks.break"
  | "minecraft:block.nether_bricks.step"
  | "minecraft:block.nether_bricks.place"
  | "minecraft:block.nether_bricks.hit"
  | "minecraft:block.nether_bricks.fall"
  | "minecraft:block.nether_wart.break"
  | "minecraft:item.nether_wart.plant"
  | "minecraft:block.packed_mud.break"
  | "minecraft:block.packed_mud.fall"
  | "minecraft:block.packed_mud.hit"
  | "minecraft:block.packed_mud.place"
  | "minecraft:block.packed_mud.step"
  | "minecraft:block.stem.break"
  | "minecraft:block.stem.step"
  | "minecraft:block.stem.place"
  | "minecraft:block.stem.hit"
  | "minecraft:block.stem.fall"
  | "minecraft:block.nylium.break"
  | "minecraft:block.nylium.step"
  | "minecraft:block.nylium.place"
  | "minecraft:block.nylium.hit"
  | "minecraft:block.nylium.fall"
  | "minecraft:block.nether_sprouts.break"
  | "minecraft:block.nether_sprouts.step"
  | "minecraft:block.nether_sprouts.place"
  | "minecraft:block.nether_sprouts.hit"
  | "minecraft:block.nether_sprouts.fall"
  | "minecraft:block.fungus.break"
  | "minecraft:block.fungus.step"
  | "minecraft:block.fungus.place"
  | "minecraft:block.fungus.hit"
  | "minecraft:block.fungus.fall"
  | "minecraft:block.weeping_vines.break"
  | "minecraft:block.weeping_vines.step"
  | "minecraft:block.weeping_vines.place"
  | "minecraft:block.weeping_vines.hit"
  | "minecraft:block.weeping_vines.fall"
  | "minecraft:block.wart_block.break"
  | "minecraft:block.wart_block.step"
  | "minecraft:block.wart_block.place"
  | "minecraft:block.wart_block.hit"
  | "minecraft:block.wart_block.fall"
  | "minecraft:block.netherite_block.break"
  | "minecraft:block.netherite_block.step"
  | "minecraft:block.netherite_block.place"
  | "minecraft:block.netherite_block.hit"
  | "minecraft:block.netherite_block.fall"
  | "minecraft:block.netherrack.break"
  | "minecraft:block.netherrack.step"
  | "minecraft:block.netherrack.place"
  | "minecraft:block.netherrack.hit"
  | "minecraft:block.netherrack.fall"
  | "minecraft:block.note_block.basedrum"
  | "minecraft:block.note_block.bass"
  | "minecraft:block.note_block.bell"
  | "minecraft:block.note_block.chime"
  | "minecraft:block.note_block.flute"
  | "minecraft:block.note_block.guitar"
  | "minecraft:block.note_block.harp"
  | "minecraft:block.note_block.hat"
  | "minecraft:block.note_block.pling"
  | "minecraft:block.note_block.snare"
  | "minecraft:block.note_block.xylophone"
  | "minecraft:block.note_block.iron_xylophone"
  | "minecraft:block.note_block.cow_bell"
  | "minecraft:block.note_block.didgeridoo"
  | "minecraft:block.note_block.bit"
  | "minecraft:block.note_block.banjo"
  | "minecraft:entity.ocelot.hurt"
  | "minecraft:entity.ocelot.ambient"
  | "minecraft:entity.ocelot.death"
  | "minecraft:entity.painting.break"
  | "minecraft:entity.painting.place"
  | "minecraft:entity.panda.pre_sneeze"
  | "minecraft:entity.panda.sneeze"
  | "minecraft:entity.panda.ambient"
  | "minecraft:entity.panda.death"
  | "minecraft:entity.panda.eat"
  | "minecraft:entity.panda.step"
  | "minecraft:entity.panda.cant_breed"
  | "minecraft:entity.panda.aggressive_ambient"
  | "minecraft:entity.panda.worried_ambient"
  | "minecraft:entity.panda.hurt"
  | "minecraft:entity.panda.bite"
  | "minecraft:entity.parrot.ambient"
  | "minecraft:entity.parrot.death"
  | "minecraft:entity.parrot.eat"
  | "minecraft:entity.parrot.fly"
  | "minecraft:entity.parrot.hurt"
  | "minecraft:entity.parrot.imitate.blaze"
  | "minecraft:entity.parrot.imitate.creeper"
  | "minecraft:entity.parrot.imitate.drowned"
  | "minecraft:entity.parrot.imitate.elder_guardian"
  | "minecraft:entity.parrot.imitate.ender_dragon"
  | "minecraft:entity.parrot.imitate.endermite"
  | "minecraft:entity.parrot.imitate.evoker"
  | "minecraft:entity.parrot.imitate.ghast"
  | "minecraft:entity.parrot.imitate.guardian"
  | "minecraft:entity.parrot.imitate.hoglin"
  | "minecraft:entity.parrot.imitate.husk"
  | "minecraft:entity.parrot.imitate.illusioner"
  | "minecraft:entity.parrot.imitate.magma_cube"
  | "minecraft:entity.parrot.imitate.phantom"
  | "minecraft:entity.parrot.imitate.piglin"
  | "minecraft:entity.parrot.imitate.piglin_brute"
  | "minecraft:entity.parrot.imitate.pillager"
  | "minecraft:entity.parrot.imitate.ravager"
  | "minecraft:entity.parrot.imitate.shulker"
  | "minecraft:entity.parrot.imitate.silverfish"
  | "minecraft:entity.parrot.imitate.skeleton"
  | "minecraft:entity.parrot.imitate.slime"
  | "minecraft:entity.parrot.imitate.spider"
  | "minecraft:entity.parrot.imitate.stray"
  | "minecraft:entity.parrot.imitate.vex"
  | "minecraft:entity.parrot.imitate.vindicator"
  | "minecraft:entity.parrot.imitate.warden"
  | "minecraft:entity.parrot.imitate.witch"
  | "minecraft:entity.parrot.imitate.wither"
  | "minecraft:entity.parrot.imitate.wither_skeleton"
  | "minecraft:entity.parrot.imitate.zoglin"
  | "minecraft:entity.parrot.imitate.zombie"
  | "minecraft:entity.parrot.imitate.zombie_villager"
  | "minecraft:entity.parrot.step"
  | "minecraft:entity.phantom.ambient"
  | "minecraft:entity.phantom.bite"
  | "minecraft:entity.phantom.death"
  | "minecraft:entity.phantom.flap"
  | "minecraft:entity.phantom.hurt"
  | "minecraft:entity.phantom.swoop"
  | "minecraft:entity.pig.ambient"
  | "minecraft:entity.pig.death"
  | "minecraft:entity.pig.hurt"
  | "minecraft:entity.pig.saddle"
  | "minecraft:entity.pig.step"
  | "minecraft:entity.piglin.admiring_item"
  | "minecraft:entity.piglin.ambient"
  | "minecraft:entity.piglin.angry"
  | "minecraft:entity.piglin.celebrate"
  | "minecraft:entity.piglin.death"
  | "minecraft:entity.piglin.jealous"
  | "minecraft:entity.piglin.hurt"
  | "minecraft:entity.piglin.retreat"
  | "minecraft:entity.piglin.step"
  | "minecraft:entity.piglin.converted_to_zombified"
  | "minecraft:entity.piglin_brute.ambient"
  | "minecraft:entity.piglin_brute.angry"
  | "minecraft:entity.piglin_brute.death"
  | "minecraft:entity.piglin_brute.hurt"
  | "minecraft:entity.piglin_brute.step"
  | "minecraft:entity.piglin_brute.converted_to_zombified"
  | "minecraft:entity.pillager.ambient"
  | "minecraft:entity.pillager.celebrate"
  | "minecraft:entity.pillager.death"
  | "minecraft:entity.pillager.hurt"
  | "minecraft:block.piston.contract"
  | "minecraft:block.piston.extend"
  | "minecraft:entity.player.attack.crit"
  | "minecraft:entity.player.attack.knockback"
  | "minecraft:entity.player.attack.nodamage"
  | "minecraft:entity.player.attack.strong"
  | "minecraft:entity.player.attack.sweep"
  | "minecraft:entity.player.attack.weak"
  | "minecraft:entity.player.big_fall"
  | "minecraft:entity.player.breath"
  | "minecraft:entity.player.burp"
  | "minecraft:entity.player.death"
  | "minecraft:entity.player.hurt"
  | "minecraft:entity.player.hurt_drown"
  | "minecraft:entity.player.hurt_freeze"
  | "minecraft:entity.player.hurt_on_fire"
  | "minecraft:entity.player.hurt_sweet_berry_bush"
  | "minecraft:entity.player.levelup"
  | "minecraft:entity.player.small_fall"
  | "minecraft:entity.player.splash"
  | "minecraft:entity.player.splash.high_speed"
  | "minecraft:entity.player.swim"
  | "minecraft:entity.polar_bear.ambient"
  | "minecraft:entity.polar_bear.ambient_baby"
  | "minecraft:entity.polar_bear.death"
  | "minecraft:entity.polar_bear.hurt"
  | "minecraft:entity.polar_bear.step"
  | "minecraft:entity.polar_bear.warning"
  | "minecraft:block.polished_deepslate.break"
  | "minecraft:block.polished_deepslate.fall"
  | "minecraft:block.polished_deepslate.hit"
  | "minecraft:block.polished_deepslate.place"
  | "minecraft:block.polished_deepslate.step"
  | "minecraft:block.portal.ambient"
  | "minecraft:block.portal.travel"
  | "minecraft:block.portal.trigger"
  | "minecraft:block.powder_snow.break"
  | "minecraft:block.powder_snow.fall"
  | "minecraft:block.powder_snow.hit"
  | "minecraft:block.powder_snow.place"
  | "minecraft:block.powder_snow.step"
  | "minecraft:entity.puffer_fish.ambient"
  | "minecraft:entity.puffer_fish.blow_out"
  | "minecraft:entity.puffer_fish.blow_up"
  | "minecraft:entity.puffer_fish.death"
  | "minecraft:entity.puffer_fish.flop"
  | "minecraft:entity.puffer_fish.hurt"
  | "minecraft:entity.puffer_fish.sting"
  | "minecraft:block.pumpkin.carve"
  | "minecraft:entity.rabbit.ambient"
  | "minecraft:entity.rabbit.attack"
  | "minecraft:entity.rabbit.death"
  | "minecraft:entity.rabbit.hurt"
  | "minecraft:entity.rabbit.jump"
  | "minecraft:event.raid.horn"
  | "minecraft:entity.ravager.ambient"
  | "minecraft:entity.ravager.attack"
  | "minecraft:entity.ravager.celebrate"
  | "minecraft:entity.ravager.death"
  | "minecraft:entity.ravager.hurt"
  | "minecraft:entity.ravager.step"
  | "minecraft:entity.ravager.stunned"
  | "minecraft:entity.ravager.roar"
  | "minecraft:block.nether_gold_ore.break"
  | "minecraft:block.nether_gold_ore.fall"
  | "minecraft:block.nether_gold_ore.hit"
  | "minecraft:block.nether_gold_ore.place"
  | "minecraft:block.nether_gold_ore.step"
  | "minecraft:block.nether_ore.break"
  | "minecraft:block.nether_ore.fall"
  | "minecraft:block.nether_ore.hit"
  | "minecraft:block.nether_ore.place"
  | "minecraft:block.nether_ore.step"
  | "minecraft:block.redstone_torch.burnout"
  | "minecraft:block.respawn_anchor.ambient"
  | "minecraft:block.respawn_anchor.charge"
  | "minecraft:block.respawn_anchor.deplete"
  | "minecraft:block.respawn_anchor.set_spawn"
  | "minecraft:block.rooted_dirt.break"
  | "minecraft:block.rooted_dirt.fall"
  | "minecraft:block.rooted_dirt.hit"
  | "minecraft:block.rooted_dirt.place"
  | "minecraft:block.rooted_dirt.step"
  | "minecraft:entity.salmon.ambient"
  | "minecraft:entity.salmon.death"
  | "minecraft:entity.salmon.flop"
  | "minecraft:entity.salmon.hurt"
  | "minecraft:block.sand.break"
  | "minecraft:block.sand.fall"
  | "minecraft:block.sand.hit"
  | "minecraft:block.sand.place"
  | "minecraft:block.sand.step"
  | "minecraft:block.scaffolding.break"
  | "minecraft:block.scaffolding.fall"
  | "minecraft:block.scaffolding.hit"
  | "minecraft:block.scaffolding.place"
  | "minecraft:block.scaffolding.step"
  | "minecraft:block.sculk.spread"
  | "minecraft:block.sculk.charge"
  | "minecraft:block.sculk.break"
  | "minecraft:block.sculk.fall"
  | "minecraft:block.sculk.hit"
  | "minecraft:block.sculk.place"
  | "minecraft:block.sculk.step"
  | "minecraft:block.sculk_catalyst.bloom"
  | "minecraft:block.sculk_catalyst.break"
  | "minecraft:block.sculk_catalyst.fall"
  | "minecraft:block.sculk_catalyst.hit"
  | "minecraft:block.sculk_catalyst.place"
  | "minecraft:block.sculk_catalyst.step"
  | "minecraft:block.sculk_sensor.clicking"
  | "minecraft:block.sculk_sensor.clicking_stop"
  | "minecraft:block.sculk_sensor.break"
  | "minecraft:block.sculk_sensor.fall"
  | "minecraft:block.sculk_sensor.hit"
  | "minecraft:block.sculk_sensor.place"
  | "minecraft:block.sculk_sensor.step"
  | "minecraft:block.sculk_shrieker.break"
  | "minecraft:block.sculk_shrieker.fall"
  | "minecraft:block.sculk_shrieker.hit"
  | "minecraft:block.sculk_shrieker.place"
  | "minecraft:block.sculk_shrieker.shriek"
  | "minecraft:block.sculk_shrieker.step"
  | "minecraft:block.sculk_vein.break"
  | "minecraft:block.sculk_vein.fall"
  | "minecraft:block.sculk_vein.hit"
  | "minecraft:block.sculk_vein.place"
  | "minecraft:block.sculk_vein.step"
  | "minecraft:entity.sheep.ambient"
  | "minecraft:entity.sheep.death"
  | "minecraft:entity.sheep.hurt"
  | "minecraft:entity.sheep.shear"
  | "minecraft:entity.sheep.step"
  | "minecraft:item.shield.block"
  | "minecraft:item.shield.break"
  | "minecraft:block.shroomlight.break"
  | "minecraft:block.shroomlight.step"
  | "minecraft:block.shroomlight.place"
  | "minecraft:block.shroomlight.hit"
  | "minecraft:block.shroomlight.fall"
  | "minecraft:item.shovel.flatten"
  | "minecraft:entity.shulker.ambient"
  | "minecraft:block.shulker_box.close"
  | "minecraft:block.shulker_box.open"
  | "minecraft:entity.shulker_bullet.hit"
  | "minecraft:entity.shulker_bullet.hurt"
  | "minecraft:entity.shulker.close"
  | "minecraft:entity.shulker.death"
  | "minecraft:entity.shulker.hurt"
  | "minecraft:entity.shulker.hurt_closed"
  | "minecraft:entity.shulker.open"
  | "minecraft:entity.shulker.shoot"
  | "minecraft:entity.shulker.teleport"
  | "minecraft:entity.silverfish.ambient"
  | "minecraft:entity.silverfish.death"
  | "minecraft:entity.silverfish.hurt"
  | "minecraft:entity.silverfish.step"
  | "minecraft:entity.skeleton.ambient"
  | "minecraft:entity.skeleton.converted_to_stray"
  | "minecraft:entity.skeleton.death"
  | "minecraft:entity.skeleton_horse.ambient"
  | "minecraft:entity.skeleton_horse.death"
  | "minecraft:entity.skeleton_horse.hurt"
  | "minecraft:entity.skeleton_horse.swim"
  | "minecraft:entity.skeleton_horse.ambient_water"
  | "minecraft:entity.skeleton_horse.gallop_water"
  | "minecraft:entity.skeleton_horse.jump_water"
  | "minecraft:entity.skeleton_horse.step_water"
  | "minecraft:entity.skeleton.hurt"
  | "minecraft:entity.skeleton.shoot"
  | "minecraft:entity.skeleton.step"
  | "minecraft:entity.slime.attack"
  | "minecraft:entity.slime.death"
  | "minecraft:entity.slime.hurt"
  | "minecraft:entity.slime.jump"
  | "minecraft:entity.slime.squish"
  | "minecraft:block.slime_block.break"
  | "minecraft:block.slime_block.fall"
  | "minecraft:block.slime_block.hit"
  | "minecraft:block.slime_block.place"
  | "minecraft:block.slime_block.step"
  | "minecraft:block.small_amethyst_bud.break"
  | "minecraft:block.small_amethyst_bud.place"
  | "minecraft:block.small_dripleaf.break"
  | "minecraft:block.small_dripleaf.fall"
  | "minecraft:block.small_dripleaf.hit"
  | "minecraft:block.small_dripleaf.place"
  | "minecraft:block.small_dripleaf.step"
  | "minecraft:block.soul_sand.break"
  | "minecraft:block.soul_sand.step"
  | "minecraft:block.soul_sand.place"
  | "minecraft:block.soul_sand.hit"
  | "minecraft:block.soul_sand.fall"
  | "minecraft:block.soul_soil.break"
  | "minecraft:block.soul_soil.step"
  | "minecraft:block.soul_soil.place"
  | "minecraft:block.soul_soil.hit"
  | "minecraft:block.soul_soil.fall"
  | "minecraft:particle.soul_escape"
  | "minecraft:block.spore_blossom.break"
  | "minecraft:block.spore_blossom.fall"
  | "minecraft:block.spore_blossom.hit"
  | "minecraft:block.spore_blossom.place"
  | "minecraft:block.spore_blossom.step"
  | "minecraft:entity.strider.ambient"
  | "minecraft:entity.strider.happy"
  | "minecraft:entity.strider.retreat"
  | "minecraft:entity.strider.death"
  | "minecraft:entity.strider.hurt"
  | "minecraft:entity.strider.step"
  | "minecraft:entity.strider.step_lava"
  | "minecraft:entity.strider.eat"
  | "minecraft:entity.strider.saddle"
  | "minecraft:entity.slime.death_small"
  | "minecraft:entity.slime.hurt_small"
  | "minecraft:entity.slime.jump_small"
  | "minecraft:entity.slime.squish_small"
  | "minecraft:block.smithing_table.use"
  | "minecraft:block.smoker.smoke"
  | "minecraft:entity.snowball.throw"
  | "minecraft:block.snow.break"
  | "minecraft:block.snow.fall"
  | "minecraft:entity.snow_golem.ambient"
  | "minecraft:entity.snow_golem.death"
  | "minecraft:entity.snow_golem.hurt"
  | "minecraft:entity.snow_golem.shoot"
  | "minecraft:entity.snow_golem.shear"
  | "minecraft:block.snow.hit"
  | "minecraft:block.snow.place"
  | "minecraft:block.snow.step"
  | "minecraft:entity.spider.ambient"
  | "minecraft:entity.spider.death"
  | "minecraft:entity.spider.hurt"
  | "minecraft:entity.spider.step"
  | "minecraft:entity.splash_potion.break"
  | "minecraft:entity.splash_potion.throw"
  | "minecraft:item.spyglass.use"
  | "minecraft:item.spyglass.stop_using"
  | "minecraft:entity.squid.ambient"
  | "minecraft:entity.squid.death"
  | "minecraft:entity.squid.hurt"
  | "minecraft:entity.squid.squirt"
  | "minecraft:block.stone.break"
  | "minecraft:block.stone_button.click_off"
  | "minecraft:block.stone_button.click_on"
  | "minecraft:block.stone.fall"
  | "minecraft:block.stone.hit"
  | "minecraft:block.stone.place"
  | "minecraft:block.stone_pressure_plate.click_off"
  | "minecraft:block.stone_pressure_plate.click_on"
  | "minecraft:block.stone.step"
  | "minecraft:entity.stray.ambient"
  | "minecraft:entity.stray.death"
  | "minecraft:entity.stray.hurt"
  | "minecraft:entity.stray.step"
  | "minecraft:block.sweet_berry_bush.break"
  | "minecraft:block.sweet_berry_bush.place"
  | "minecraft:block.sweet_berry_bush.pick_berries"
  | "minecraft:entity.tadpole.death"
  | "minecraft:entity.tadpole.flop"
  | "minecraft:entity.tadpole.grow_up"
  | "minecraft:entity.tadpole.hurt"
  | "minecraft:enchant.thorns.hit"
  | "minecraft:entity.tnt.primed"
  | "minecraft:item.totem.use"
  | "minecraft:item.trident.hit"
  | "minecraft:item.trident.hit_ground"
  | "minecraft:item.trident.return"
  | "minecraft:item.trident.riptide_1"
  | "minecraft:item.trident.riptide_2"
  | "minecraft:item.trident.riptide_3"
  | "minecraft:item.trident.throw"
  | "minecraft:item.trident.thunder"
  | "minecraft:block.tripwire.attach"
  | "minecraft:block.tripwire.click_off"
  | "minecraft:block.tripwire.click_on"
  | "minecraft:block.tripwire.detach"
  | "minecraft:entity.tropical_fish.ambient"
  | "minecraft:entity.tropical_fish.death"
  | "minecraft:entity.tropical_fish.flop"
  | "minecraft:entity.tropical_fish.hurt"
  | "minecraft:block.tuff.break"
  | "minecraft:block.tuff.step"
  | "minecraft:block.tuff.place"
  | "minecraft:block.tuff.hit"
  | "minecraft:block.tuff.fall"
  | "minecraft:entity.turtle.ambient_land"
  | "minecraft:entity.turtle.death"
  | "minecraft:entity.turtle.death_baby"
  | "minecraft:entity.turtle.egg_break"
  | "minecraft:entity.turtle.egg_crack"
  | "minecraft:entity.turtle.egg_hatch"
  | "minecraft:entity.turtle.hurt"
  | "minecraft:entity.turtle.hurt_baby"
  | "minecraft:entity.turtle.lay_egg"
  | "minecraft:entity.turtle.shamble"
  | "minecraft:entity.turtle.shamble_baby"
  | "minecraft:entity.turtle.swim"
  | "minecraft:ui.button.click"
  | "minecraft:ui.loom.select_pattern"
  | "minecraft:ui.loom.take_result"
  | "minecraft:ui.cartography_table.take_result"
  | "minecraft:ui.stonecutter.take_result"
  | "minecraft:ui.stonecutter.select_recipe"
  | "minecraft:ui.toast.challenge_complete"
  | "minecraft:ui.toast.in"
  | "minecraft:ui.toast.out"
  | "minecraft:entity.vex.ambient"
  | "minecraft:entity.vex.charge"
  | "minecraft:entity.vex.death"
  | "minecraft:entity.vex.hurt"
  | "minecraft:entity.villager.ambient"
  | "minecraft:entity.villager.celebrate"
  | "minecraft:entity.villager.death"
  | "minecraft:entity.villager.hurt"
  | "minecraft:entity.villager.no"
  | "minecraft:entity.villager.trade"
  | "minecraft:entity.villager.yes"
  | "minecraft:entity.villager.work_armorer"
  | "minecraft:entity.villager.work_butcher"
  | "minecraft:entity.villager.work_cartographer"
  | "minecraft:entity.villager.work_cleric"
  | "minecraft:entity.villager.work_farmer"
  | "minecraft:entity.villager.work_fisherman"
  | "minecraft:entity.villager.work_fletcher"
  | "minecraft:entity.villager.work_leatherworker"
  | "minecraft:entity.villager.work_librarian"
  | "minecraft:entity.villager.work_mason"
  | "minecraft:entity.villager.work_shepherd"
  | "minecraft:entity.villager.work_toolsmith"
  | "minecraft:entity.villager.work_weaponsmith"
  | "minecraft:entity.vindicator.ambient"
  | "minecraft:entity.vindicator.celebrate"
  | "minecraft:entity.vindicator.death"
  | "minecraft:entity.vindicator.hurt"
  | "minecraft:block.vine.break"
  | "minecraft:block.vine.fall"
  | "minecraft:block.vine.hit"
  | "minecraft:block.vine.place"
  | "minecraft:block.vine.step"
  | "minecraft:block.lily_pad.place"
  | "minecraft:entity.wandering_trader.ambient"
  | "minecraft:entity.wandering_trader.death"
  | "minecraft:entity.wandering_trader.disappeared"
  | "minecraft:entity.wandering_trader.drink_milk"
  | "minecraft:entity.wandering_trader.drink_potion"
  | "minecraft:entity.wandering_trader.hurt"
  | "minecraft:entity.wandering_trader.no"
  | "minecraft:entity.wandering_trader.reappeared"
  | "minecraft:entity.wandering_trader.trade"
  | "minecraft:entity.wandering_trader.yes"
  | "minecraft:entity.warden.agitated"
  | "minecraft:entity.warden.ambient"
  | "minecraft:entity.warden.angry"
  | "minecraft:entity.warden.attack_impact"
  | "minecraft:entity.warden.death"
  | "minecraft:entity.warden.dig"
  | "minecraft:entity.warden.emerge"
  | "minecraft:entity.warden.heartbeat"
  | "minecraft:entity.warden.hurt"
  | "minecraft:entity.warden.listening"
  | "minecraft:entity.warden.listening_angry"
  | "minecraft:entity.warden.nearby_close"
  | "minecraft:entity.warden.nearby_closer"
  | "minecraft:entity.warden.nearby_closest"
  | "minecraft:entity.warden.roar"
  | "minecraft:entity.warden.sniff"
  | "minecraft:entity.warden.sonic_boom"
  | "minecraft:entity.warden.sonic_charge"
  | "minecraft:entity.warden.step"
  | "minecraft:entity.warden.tendril_clicks"
  | "minecraft:block.water.ambient"
  | "minecraft:weather.rain"
  | "minecraft:weather.rain.above"
  | "minecraft:block.wet_grass.break"
  | "minecraft:block.wet_grass.fall"
  | "minecraft:block.wet_grass.hit"
  | "minecraft:block.wet_grass.place"
  | "minecraft:block.wet_grass.step"
  | "minecraft:entity.witch.ambient"
  | "minecraft:entity.witch.celebrate"
  | "minecraft:entity.witch.death"
  | "minecraft:entity.witch.drink"
  | "minecraft:entity.witch.hurt"
  | "minecraft:entity.witch.throw"
  | "minecraft:entity.wither.ambient"
  | "minecraft:entity.wither.break_block"
  | "minecraft:entity.wither.death"
  | "minecraft:entity.wither.hurt"
  | "minecraft:entity.wither.shoot"
  | "minecraft:entity.wither_skeleton.ambient"
  | "minecraft:entity.wither_skeleton.death"
  | "minecraft:entity.wither_skeleton.hurt"
  | "minecraft:entity.wither_skeleton.step"
  | "minecraft:entity.wither.spawn"
  | "minecraft:entity.wolf.ambient"
  | "minecraft:entity.wolf.death"
  | "minecraft:entity.wolf.growl"
  | "minecraft:entity.wolf.howl"
  | "minecraft:entity.wolf.hurt"
  | "minecraft:entity.wolf.pant"
  | "minecraft:entity.wolf.shake"
  | "minecraft:entity.wolf.step"
  | "minecraft:entity.wolf.whine"
  | "minecraft:block.wooden_door.close"
  | "minecraft:block.wooden_door.open"
  | "minecraft:block.wooden_trapdoor.close"
  | "minecraft:block.wooden_trapdoor.open"
  | "minecraft:block.wood.break"
  | "minecraft:block.wooden_button.click_off"
  | "minecraft:block.wooden_button.click_on"
  | "minecraft:block.wood.fall"
  | "minecraft:block.wood.hit"
  | "minecraft:block.wood.place"
  | "minecraft:block.wooden_pressure_plate.click_off"
  | "minecraft:block.wooden_pressure_plate.click_on"
  | "minecraft:block.wood.step"
  | "minecraft:block.wool.break"
  | "minecraft:block.wool.fall"
  | "minecraft:block.wool.hit"
  | "minecraft:block.wool.place"
  | "minecraft:block.wool.step"
  | "minecraft:entity.zoglin.ambient"
  | "minecraft:entity.zoglin.angry"
  | "minecraft:entity.zoglin.attack"
  | "minecraft:entity.zoglin.death"
  | "minecraft:entity.zoglin.hurt"
  | "minecraft:entity.zoglin.step"
  | "minecraft:entity.zombie.ambient"
  | "minecraft:entity.zombie.attack_wooden_door"
  | "minecraft:entity.zombie.attack_iron_door"
  | "minecraft:entity.zombie.break_wooden_door"
  | "minecraft:entity.zombie.converted_to_drowned"
  | "minecraft:entity.zombie.death"
  | "minecraft:entity.zombie.destroy_egg"
  | "minecraft:entity.zombie_horse.ambient"
  | "minecraft:entity.zombie_horse.death"
  | "minecraft:entity.zombie_horse.hurt"
  | "minecraft:entity.zombie.hurt"
  | "minecraft:entity.zombie.infect"
  | "minecraft:entity.zombified_piglin.ambient"
  | "minecraft:entity.zombified_piglin.angry"
  | "minecraft:entity.zombified_piglin.death"
  | "minecraft:entity.zombified_piglin.hurt"
  | "minecraft:entity.zombie.step"
  | "minecraft:entity.zombie_villager.ambient"
  | "minecraft:entity.zombie_villager.converted"
  | "minecraft:entity.zombie_villager.cure"
  | "minecraft:entity.zombie_villager.death"
  | "minecraft:entity.zombie_villager.hurt"
  | "minecraft:entity.zombie_villager.step";

export const soundEventEnum = createEnumMapper<SoundEvent>(
  JSON.parse(
    `["minecraft:entity.allay.ambient_with_item","minecraft:entity.allay.ambient_without_item","minecraft:entity.allay.death","minecraft:entity.allay.hurt","minecraft:entity.allay.item_given","minecraft:entity.allay.item_taken","minecraft:entity.allay.item_thrown","minecraft:ambient.cave","minecraft:ambient.basalt_deltas.additions","minecraft:ambient.basalt_deltas.loop","minecraft:ambient.basalt_deltas.mood","minecraft:ambient.crimson_forest.additions","minecraft:ambient.crimson_forest.loop","minecraft:ambient.crimson_forest.mood","minecraft:ambient.nether_wastes.additions","minecraft:ambient.nether_wastes.loop","minecraft:ambient.nether_wastes.mood","minecraft:ambient.soul_sand_valley.additions","minecraft:ambient.soul_sand_valley.loop","minecraft:ambient.soul_sand_valley.mood","minecraft:ambient.warped_forest.additions","minecraft:ambient.warped_forest.loop","minecraft:ambient.warped_forest.mood","minecraft:ambient.underwater.enter","minecraft:ambient.underwater.exit","minecraft:ambient.underwater.loop","minecraft:ambient.underwater.loop.additions","minecraft:ambient.underwater.loop.additions.rare","minecraft:ambient.underwater.loop.additions.ultra_rare","minecraft:block.amethyst_block.break","minecraft:block.amethyst_block.chime","minecraft:block.amethyst_block.fall","minecraft:block.amethyst_block.hit","minecraft:block.amethyst_block.place","minecraft:block.amethyst_block.step","minecraft:block.amethyst_cluster.break","minecraft:block.amethyst_cluster.fall","minecraft:block.amethyst_cluster.hit","minecraft:block.amethyst_cluster.place","minecraft:block.amethyst_cluster.step","minecraft:block.ancient_debris.break","minecraft:block.ancient_debris.step","minecraft:block.ancient_debris.place","minecraft:block.ancient_debris.hit","minecraft:block.ancient_debris.fall","minecraft:block.anvil.break","minecraft:block.anvil.destroy","minecraft:block.anvil.fall","minecraft:block.anvil.hit","minecraft:block.anvil.land","minecraft:block.anvil.place","minecraft:block.anvil.step","minecraft:block.anvil.use","minecraft:item.armor.equip_chain","minecraft:item.armor.equip_diamond","minecraft:item.armor.equip_elytra","minecraft:item.armor.equip_generic","minecraft:item.armor.equip_gold","minecraft:item.armor.equip_iron","minecraft:item.armor.equip_leather","minecraft:item.armor.equip_netherite","minecraft:item.armor.equip_turtle","minecraft:entity.armor_stand.break","minecraft:entity.armor_stand.fall","minecraft:entity.armor_stand.hit","minecraft:entity.armor_stand.place","minecraft:entity.arrow.hit","minecraft:entity.arrow.hit_player","minecraft:entity.arrow.shoot","minecraft:item.axe.strip","minecraft:item.axe.scrape","minecraft:item.axe.wax_off","minecraft:entity.axolotl.attack","minecraft:entity.axolotl.death","minecraft:entity.axolotl.hurt","minecraft:entity.axolotl.idle_air","minecraft:entity.axolotl.idle_water","minecraft:entity.axolotl.splash","minecraft:entity.axolotl.swim","minecraft:block.azalea.break","minecraft:block.azalea.fall","minecraft:block.azalea.hit","minecraft:block.azalea.place","minecraft:block.azalea.step","minecraft:block.azalea_leaves.break","minecraft:block.azalea_leaves.fall","minecraft:block.azalea_leaves.hit","minecraft:block.azalea_leaves.place","minecraft:block.azalea_leaves.step","minecraft:block.bamboo.break","minecraft:block.bamboo.fall","minecraft:block.bamboo.hit","minecraft:block.bamboo.place","minecraft:block.bamboo.step","minecraft:block.bamboo_sapling.break","minecraft:block.bamboo_sapling.hit","minecraft:block.bamboo_sapling.place","minecraft:block.barrel.close","minecraft:block.barrel.open","minecraft:block.basalt.break","minecraft:block.basalt.step","minecraft:block.basalt.place","minecraft:block.basalt.hit","minecraft:block.basalt.fall","minecraft:entity.bat.ambient","minecraft:entity.bat.death","minecraft:entity.bat.hurt","minecraft:entity.bat.loop","minecraft:entity.bat.takeoff","minecraft:block.beacon.activate","minecraft:block.beacon.ambient","minecraft:block.beacon.deactivate","minecraft:block.beacon.power_select","minecraft:entity.bee.death","minecraft:entity.bee.hurt","minecraft:entity.bee.loop_aggressive","minecraft:entity.bee.loop","minecraft:entity.bee.sting","minecraft:entity.bee.pollinate","minecraft:block.beehive.drip","minecraft:block.beehive.enter","minecraft:block.beehive.exit","minecraft:block.beehive.shear","minecraft:block.beehive.work","minecraft:block.bell.use","minecraft:block.bell.resonate","minecraft:block.big_dripleaf.break","minecraft:block.big_dripleaf.fall","minecraft:block.big_dripleaf.hit","minecraft:block.big_dripleaf.place","minecraft:block.big_dripleaf.step","minecraft:entity.blaze.ambient","minecraft:entity.blaze.burn","minecraft:entity.blaze.death","minecraft:entity.blaze.hurt","minecraft:entity.blaze.shoot","minecraft:entity.boat.paddle_land","minecraft:entity.boat.paddle_water","minecraft:block.bone_block.break","minecraft:block.bone_block.fall","minecraft:block.bone_block.hit","minecraft:block.bone_block.place","minecraft:block.bone_block.step","minecraft:item.bone_meal.use","minecraft:item.book.page_turn","minecraft:item.book.put","minecraft:block.blastfurnace.fire_crackle","minecraft:item.bottle.empty","minecraft:item.bottle.fill","minecraft:item.bottle.fill_dragonbreath","minecraft:block.brewing_stand.brew","minecraft:block.bubble_column.bubble_pop","minecraft:block.bubble_column.upwards_ambient","minecraft:block.bubble_column.upwards_inside","minecraft:block.bubble_column.whirlpool_ambient","minecraft:block.bubble_column.whirlpool_inside","minecraft:item.bucket.empty","minecraft:item.bucket.empty_axolotl","minecraft:item.bucket.empty_fish","minecraft:item.bucket.empty_lava","minecraft:item.bucket.empty_powder_snow","minecraft:item.bucket.empty_tadpole","minecraft:item.bucket.fill","minecraft:item.bucket.fill_axolotl","minecraft:item.bucket.fill_fish","minecraft:item.bucket.fill_lava","minecraft:item.bucket.fill_powder_snow","minecraft:item.bucket.fill_tadpole","minecraft:item.bundle.drop_contents","minecraft:item.bundle.insert","minecraft:item.bundle.remove_one","minecraft:block.cake.add_candle","minecraft:block.calcite.break","minecraft:block.calcite.step","minecraft:block.calcite.place","minecraft:block.calcite.hit","minecraft:block.calcite.fall","minecraft:block.campfire.crackle","minecraft:block.candle.ambient","minecraft:block.candle.break","minecraft:block.candle.extinguish","minecraft:block.candle.fall","minecraft:block.candle.hit","minecraft:block.candle.place","minecraft:block.candle.step","minecraft:entity.cat.ambient","minecraft:entity.cat.stray_ambient","minecraft:entity.cat.death","minecraft:entity.cat.eat","minecraft:entity.cat.hiss","minecraft:entity.cat.beg_for_food","minecraft:entity.cat.hurt","minecraft:entity.cat.purr","minecraft:entity.cat.purreow","minecraft:block.cave_vines.break","minecraft:block.cave_vines.fall","minecraft:block.cave_vines.hit","minecraft:block.cave_vines.place","minecraft:block.cave_vines.step","minecraft:block.cave_vines.pick_berries","minecraft:block.chain.break","minecraft:block.chain.fall","minecraft:block.chain.hit","minecraft:block.chain.place","minecraft:block.chain.step","minecraft:block.chest.close","minecraft:block.chest.locked","minecraft:block.chest.open","minecraft:entity.chicken.ambient","minecraft:entity.chicken.death","minecraft:entity.chicken.egg","minecraft:entity.chicken.hurt","minecraft:entity.chicken.step","minecraft:block.chorus_flower.death","minecraft:block.chorus_flower.grow","minecraft:item.chorus_fruit.teleport","minecraft:entity.cod.ambient","minecraft:entity.cod.death","minecraft:entity.cod.flop","minecraft:entity.cod.hurt","minecraft:block.comparator.click","minecraft:block.composter.empty","minecraft:block.composter.fill","minecraft:block.composter.fill_success","minecraft:block.composter.ready","minecraft:block.conduit.activate","minecraft:block.conduit.ambient","minecraft:block.conduit.ambient.short","minecraft:block.conduit.attack.target","minecraft:block.conduit.deactivate","minecraft:block.copper.break","minecraft:block.copper.step","minecraft:block.copper.place","minecraft:block.copper.hit","minecraft:block.copper.fall","minecraft:block.coral_block.break","minecraft:block.coral_block.fall","minecraft:block.coral_block.hit","minecraft:block.coral_block.place","minecraft:block.coral_block.step","minecraft:entity.cow.ambient","minecraft:entity.cow.death","minecraft:entity.cow.hurt","minecraft:entity.cow.milk","minecraft:entity.cow.step","minecraft:entity.creeper.death","minecraft:entity.creeper.hurt","minecraft:entity.creeper.primed","minecraft:block.crop.break","minecraft:item.crop.plant","minecraft:item.crossbow.hit","minecraft:item.crossbow.loading_end","minecraft:item.crossbow.loading_middle","minecraft:item.crossbow.loading_start","minecraft:item.crossbow.quick_charge_1","minecraft:item.crossbow.quick_charge_2","minecraft:item.crossbow.quick_charge_3","minecraft:item.crossbow.shoot","minecraft:block.deepslate_bricks.break","minecraft:block.deepslate_bricks.fall","minecraft:block.deepslate_bricks.hit","minecraft:block.deepslate_bricks.place","minecraft:block.deepslate_bricks.step","minecraft:block.deepslate.break","minecraft:block.deepslate.fall","minecraft:block.deepslate.hit","minecraft:block.deepslate.place","minecraft:block.deepslate.step","minecraft:block.deepslate_tiles.break","minecraft:block.deepslate_tiles.fall","minecraft:block.deepslate_tiles.hit","minecraft:block.deepslate_tiles.place","minecraft:block.deepslate_tiles.step","minecraft:block.dispenser.dispense","minecraft:block.dispenser.fail","minecraft:block.dispenser.launch","minecraft:entity.dolphin.ambient","minecraft:entity.dolphin.ambient_water","minecraft:entity.dolphin.attack","minecraft:entity.dolphin.death","minecraft:entity.dolphin.eat","minecraft:entity.dolphin.hurt","minecraft:entity.dolphin.jump","minecraft:entity.dolphin.play","minecraft:entity.dolphin.splash","minecraft:entity.dolphin.swim","minecraft:entity.donkey.ambient","minecraft:entity.donkey.angry","minecraft:entity.donkey.chest","minecraft:entity.donkey.death","minecraft:entity.donkey.eat","minecraft:entity.donkey.hurt","minecraft:block.dripstone_block.break","minecraft:block.dripstone_block.step","minecraft:block.dripstone_block.place","minecraft:block.dripstone_block.hit","minecraft:block.dripstone_block.fall","minecraft:block.pointed_dripstone.break","minecraft:block.pointed_dripstone.step","minecraft:block.pointed_dripstone.place","minecraft:block.pointed_dripstone.hit","minecraft:block.pointed_dripstone.fall","minecraft:block.pointed_dripstone.land","minecraft:block.pointed_dripstone.drip_lava","minecraft:block.pointed_dripstone.drip_water","minecraft:block.pointed_dripstone.drip_lava_into_cauldron","minecraft:block.pointed_dripstone.drip_water_into_cauldron","minecraft:block.big_dripleaf.tilt_down","minecraft:block.big_dripleaf.tilt_up","minecraft:entity.drowned.ambient","minecraft:entity.drowned.ambient_water","minecraft:entity.drowned.death","minecraft:entity.drowned.death_water","minecraft:entity.drowned.hurt","minecraft:entity.drowned.hurt_water","minecraft:entity.drowned.shoot","minecraft:entity.drowned.step","minecraft:entity.drowned.swim","minecraft:item.dye.use","minecraft:entity.egg.throw","minecraft:entity.elder_guardian.ambient","minecraft:entity.elder_guardian.ambient_land","minecraft:entity.elder_guardian.curse","minecraft:entity.elder_guardian.death","minecraft:entity.elder_guardian.death_land","minecraft:entity.elder_guardian.flop","minecraft:entity.elder_guardian.hurt","minecraft:entity.elder_guardian.hurt_land","minecraft:item.elytra.flying","minecraft:block.enchantment_table.use","minecraft:block.ender_chest.close","minecraft:block.ender_chest.open","minecraft:entity.ender_dragon.ambient","minecraft:entity.ender_dragon.death","minecraft:entity.dragon_fireball.explode","minecraft:entity.ender_dragon.flap","minecraft:entity.ender_dragon.growl","minecraft:entity.ender_dragon.hurt","minecraft:entity.ender_dragon.shoot","minecraft:entity.ender_eye.death","minecraft:entity.ender_eye.launch","minecraft:entity.enderman.ambient","minecraft:entity.enderman.death","minecraft:entity.enderman.hurt","minecraft:entity.enderman.scream","minecraft:entity.enderman.stare","minecraft:entity.enderman.teleport","minecraft:entity.endermite.ambient","minecraft:entity.endermite.death","minecraft:entity.endermite.hurt","minecraft:entity.endermite.step","minecraft:entity.ender_pearl.throw","minecraft:block.end_gateway.spawn","minecraft:block.end_portal_frame.fill","minecraft:block.end_portal.spawn","minecraft:entity.evoker.ambient","minecraft:entity.evoker.cast_spell","minecraft:entity.evoker.celebrate","minecraft:entity.evoker.death","minecraft:entity.evoker_fangs.attack","minecraft:entity.evoker.hurt","minecraft:entity.evoker.prepare_attack","minecraft:entity.evoker.prepare_summon","minecraft:entity.evoker.prepare_wololo","minecraft:entity.experience_bottle.throw","minecraft:entity.experience_orb.pickup","minecraft:block.fence_gate.close","minecraft:block.fence_gate.open","minecraft:item.firecharge.use","minecraft:entity.firework_rocket.blast","minecraft:entity.firework_rocket.blast_far","minecraft:entity.firework_rocket.large_blast","minecraft:entity.firework_rocket.large_blast_far","minecraft:entity.firework_rocket.launch","minecraft:entity.firework_rocket.shoot","minecraft:entity.firework_rocket.twinkle","minecraft:entity.firework_rocket.twinkle_far","minecraft:block.fire.ambient","minecraft:block.fire.extinguish","minecraft:entity.fish.swim","minecraft:entity.fishing_bobber.retrieve","minecraft:entity.fishing_bobber.splash","minecraft:entity.fishing_bobber.throw","minecraft:item.flintandsteel.use","minecraft:block.flowering_azalea.break","minecraft:block.flowering_azalea.fall","minecraft:block.flowering_azalea.hit","minecraft:block.flowering_azalea.place","minecraft:block.flowering_azalea.step","minecraft:entity.fox.aggro","minecraft:entity.fox.ambient","minecraft:entity.fox.bite","minecraft:entity.fox.death","minecraft:entity.fox.eat","minecraft:entity.fox.hurt","minecraft:entity.fox.screech","minecraft:entity.fox.sleep","minecraft:entity.fox.sniff","minecraft:entity.fox.spit","minecraft:entity.fox.teleport","minecraft:block.froglight.break","minecraft:block.froglight.fall","minecraft:block.froglight.hit","minecraft:block.froglight.place","minecraft:block.froglight.step","minecraft:block.frogspawn.step","minecraft:block.frogspawn.break","minecraft:block.frogspawn.fall","minecraft:block.frogspawn.hatch","minecraft:block.frogspawn.hit","minecraft:block.frogspawn.place","minecraft:entity.frog.ambient","minecraft:entity.frog.death","minecraft:entity.frog.eat","minecraft:entity.frog.hurt","minecraft:entity.frog.lay_spawn","minecraft:entity.frog.long_jump","minecraft:entity.frog.step","minecraft:entity.frog.tongue","minecraft:block.roots.break","minecraft:block.roots.step","minecraft:block.roots.place","minecraft:block.roots.hit","minecraft:block.roots.fall","minecraft:block.furnace.fire_crackle","minecraft:entity.generic.big_fall","minecraft:entity.generic.burn","minecraft:entity.generic.death","minecraft:entity.generic.drink","minecraft:entity.generic.eat","minecraft:entity.generic.explode","minecraft:entity.generic.extinguish_fire","minecraft:entity.generic.hurt","minecraft:entity.generic.small_fall","minecraft:entity.generic.splash","minecraft:entity.generic.swim","minecraft:entity.ghast.ambient","minecraft:entity.ghast.death","minecraft:entity.ghast.hurt","minecraft:entity.ghast.scream","minecraft:entity.ghast.shoot","minecraft:entity.ghast.warn","minecraft:block.gilded_blackstone.break","minecraft:block.gilded_blackstone.fall","minecraft:block.gilded_blackstone.hit","minecraft:block.gilded_blackstone.place","minecraft:block.gilded_blackstone.step","minecraft:block.glass.break","minecraft:block.glass.fall","minecraft:block.glass.hit","minecraft:block.glass.place","minecraft:block.glass.step","minecraft:item.glow_ink_sac.use","minecraft:entity.glow_item_frame.add_item","minecraft:entity.glow_item_frame.break","minecraft:entity.glow_item_frame.place","minecraft:entity.glow_item_frame.remove_item","minecraft:entity.glow_item_frame.rotate_item","minecraft:entity.glow_squid.ambient","minecraft:entity.glow_squid.death","minecraft:entity.glow_squid.hurt","minecraft:entity.glow_squid.squirt","minecraft:entity.goat.ambient","minecraft:entity.goat.death","minecraft:entity.goat.eat","minecraft:entity.goat.hurt","minecraft:entity.goat.long_jump","minecraft:entity.goat.milk","minecraft:entity.goat.prepare_ram","minecraft:entity.goat.ram_impact","minecraft:entity.goat.horn_break","minecraft:item.goat_horn.play","minecraft:entity.goat.screaming.ambient","minecraft:entity.goat.screaming.death","minecraft:entity.goat.screaming.eat","minecraft:entity.goat.screaming.hurt","minecraft:entity.goat.screaming.long_jump","minecraft:entity.goat.screaming.milk","minecraft:entity.goat.screaming.prepare_ram","minecraft:entity.goat.screaming.ram_impact","minecraft:entity.goat.screaming.horn_break","minecraft:entity.goat.step","minecraft:block.grass.break","minecraft:block.grass.fall","minecraft:block.grass.hit","minecraft:block.grass.place","minecraft:block.grass.step","minecraft:block.gravel.break","minecraft:block.gravel.fall","minecraft:block.gravel.hit","minecraft:block.gravel.place","minecraft:block.gravel.step","minecraft:block.grindstone.use","minecraft:block.growing_plant.crop","minecraft:entity.guardian.ambient","minecraft:entity.guardian.ambient_land","minecraft:entity.guardian.attack","minecraft:entity.guardian.death","minecraft:entity.guardian.death_land","minecraft:entity.guardian.flop","minecraft:entity.guardian.hurt","minecraft:entity.guardian.hurt_land","minecraft:block.hanging_roots.break","minecraft:block.hanging_roots.fall","minecraft:block.hanging_roots.hit","minecraft:block.hanging_roots.place","minecraft:block.hanging_roots.step","minecraft:item.hoe.till","minecraft:entity.hoglin.ambient","minecraft:entity.hoglin.angry","minecraft:entity.hoglin.attack","minecraft:entity.hoglin.converted_to_zombified","minecraft:entity.hoglin.death","minecraft:entity.hoglin.hurt","minecraft:entity.hoglin.retreat","minecraft:entity.hoglin.step","minecraft:block.honey_block.break","minecraft:block.honey_block.fall","minecraft:block.honey_block.hit","minecraft:block.honey_block.place","minecraft:block.honey_block.slide","minecraft:block.honey_block.step","minecraft:item.honeycomb.wax_on","minecraft:item.honey_bottle.drink","minecraft:item.goat_horn.sound.0","minecraft:item.goat_horn.sound.1","minecraft:item.goat_horn.sound.2","minecraft:item.goat_horn.sound.3","minecraft:item.goat_horn.sound.4","minecraft:item.goat_horn.sound.5","minecraft:item.goat_horn.sound.6","minecraft:item.goat_horn.sound.7","minecraft:entity.horse.ambient","minecraft:entity.horse.angry","minecraft:entity.horse.armor","minecraft:entity.horse.breathe","minecraft:entity.horse.death","minecraft:entity.horse.eat","minecraft:entity.horse.gallop","minecraft:entity.horse.hurt","minecraft:entity.horse.jump","minecraft:entity.horse.land","minecraft:entity.horse.saddle","minecraft:entity.horse.step","minecraft:entity.horse.step_wood","minecraft:entity.hostile.big_fall","minecraft:entity.hostile.death","minecraft:entity.hostile.hurt","minecraft:entity.hostile.small_fall","minecraft:entity.hostile.splash","minecraft:entity.hostile.swim","minecraft:entity.husk.ambient","minecraft:entity.husk.converted_to_zombie","minecraft:entity.husk.death","minecraft:entity.husk.hurt","minecraft:entity.husk.step","minecraft:entity.illusioner.ambient","minecraft:entity.illusioner.cast_spell","minecraft:entity.illusioner.death","minecraft:entity.illusioner.hurt","minecraft:entity.illusioner.mirror_move","minecraft:entity.illusioner.prepare_blindness","minecraft:entity.illusioner.prepare_mirror","minecraft:item.ink_sac.use","minecraft:block.iron_door.close","minecraft:block.iron_door.open","minecraft:entity.iron_golem.attack","minecraft:entity.iron_golem.damage","minecraft:entity.iron_golem.death","minecraft:entity.iron_golem.hurt","minecraft:entity.iron_golem.repair","minecraft:entity.iron_golem.step","minecraft:block.iron_trapdoor.close","minecraft:block.iron_trapdoor.open","minecraft:entity.item_frame.add_item","minecraft:entity.item_frame.break","minecraft:entity.item_frame.place","minecraft:entity.item_frame.remove_item","minecraft:entity.item_frame.rotate_item","minecraft:entity.item.break","minecraft:entity.item.pickup","minecraft:block.ladder.break","minecraft:block.ladder.fall","minecraft:block.ladder.hit","minecraft:block.ladder.place","minecraft:block.ladder.step","minecraft:block.lantern.break","minecraft:block.lantern.fall","minecraft:block.lantern.hit","minecraft:block.lantern.place","minecraft:block.lantern.step","minecraft:block.large_amethyst_bud.break","minecraft:block.large_amethyst_bud.place","minecraft:block.lava.ambient","minecraft:block.lava.extinguish","minecraft:block.lava.pop","minecraft:entity.leash_knot.break","minecraft:entity.leash_knot.place","minecraft:block.lever.click","minecraft:entity.lightning_bolt.impact","minecraft:entity.lightning_bolt.thunder","minecraft:entity.lingering_potion.throw","minecraft:entity.llama.ambient","minecraft:entity.llama.angry","minecraft:entity.llama.chest","minecraft:entity.llama.death","minecraft:entity.llama.eat","minecraft:entity.llama.hurt","minecraft:entity.llama.spit","minecraft:entity.llama.step","minecraft:entity.llama.swag","minecraft:entity.magma_cube.death_small","minecraft:block.lodestone.break","minecraft:block.lodestone.step","minecraft:block.lodestone.place","minecraft:block.lodestone.hit","minecraft:block.lodestone.fall","minecraft:item.lodestone_compass.lock","minecraft:entity.magma_cube.death","minecraft:entity.magma_cube.hurt","minecraft:entity.magma_cube.hurt_small","minecraft:entity.magma_cube.jump","minecraft:entity.magma_cube.squish","minecraft:entity.magma_cube.squish_small","minecraft:block.mangrove_roots.break","minecraft:block.mangrove_roots.fall","minecraft:block.mangrove_roots.hit","minecraft:block.mangrove_roots.place","minecraft:block.mangrove_roots.step","minecraft:block.medium_amethyst_bud.break","minecraft:block.medium_amethyst_bud.place","minecraft:block.metal.break","minecraft:block.metal.fall","minecraft:block.metal.hit","minecraft:block.metal.place","minecraft:block.metal_pressure_plate.click_off","minecraft:block.metal_pressure_plate.click_on","minecraft:block.metal.step","minecraft:entity.minecart.inside.underwater","minecraft:entity.minecart.inside","minecraft:entity.minecart.riding","minecraft:entity.mooshroom.convert","minecraft:entity.mooshroom.eat","minecraft:entity.mooshroom.milk","minecraft:entity.mooshroom.suspicious_milk","minecraft:entity.mooshroom.shear","minecraft:block.moss_carpet.break","minecraft:block.moss_carpet.fall","minecraft:block.moss_carpet.hit","minecraft:block.moss_carpet.place","minecraft:block.moss_carpet.step","minecraft:block.moss.break","minecraft:block.moss.fall","minecraft:block.moss.hit","minecraft:block.moss.place","minecraft:block.moss.step","minecraft:block.mud.break","minecraft:block.mud.fall","minecraft:block.mud.hit","minecraft:block.mud.place","minecraft:block.mud.step","minecraft:block.mud_bricks.break","minecraft:block.mud_bricks.fall","minecraft:block.mud_bricks.hit","minecraft:block.mud_bricks.place","minecraft:block.mud_bricks.step","minecraft:block.muddy_mangrove_roots.break","minecraft:block.muddy_mangrove_roots.fall","minecraft:block.muddy_mangrove_roots.hit","minecraft:block.muddy_mangrove_roots.place","minecraft:block.muddy_mangrove_roots.step","minecraft:entity.mule.ambient","minecraft:entity.mule.angry","minecraft:entity.mule.chest","minecraft:entity.mule.death","minecraft:entity.mule.eat","minecraft:entity.mule.hurt","minecraft:music.creative","minecraft:music.credits","minecraft:music_disc.5","minecraft:music_disc.11","minecraft:music_disc.13","minecraft:music_disc.blocks","minecraft:music_disc.cat","minecraft:music_disc.chirp","minecraft:music_disc.far","minecraft:music_disc.mall","minecraft:music_disc.mellohi","minecraft:music_disc.pigstep","minecraft:music_disc.stal","minecraft:music_disc.strad","minecraft:music_disc.wait","minecraft:music_disc.ward","minecraft:music_disc.otherside","minecraft:music.dragon","minecraft:music.end","minecraft:music.game","minecraft:music.menu","minecraft:music.nether.basalt_deltas","minecraft:music.nether.crimson_forest","minecraft:music.overworld.deep_dark","minecraft:music.overworld.dripstone_caves","minecraft:music.overworld.grove","minecraft:music.overworld.jagged_peaks","minecraft:music.overworld.lush_caves","minecraft:music.overworld.swamp","minecraft:music.overworld.jungle_and_forest","minecraft:music.overworld.old_growth_taiga","minecraft:music.overworld.meadow","minecraft:music.nether.nether_wastes","minecraft:music.overworld.frozen_peaks","minecraft:music.overworld.snowy_slopes","minecraft:music.nether.soul_sand_valley","minecraft:music.overworld.stony_peaks","minecraft:music.nether.warped_forest","minecraft:music.under_water","minecraft:block.nether_bricks.break","minecraft:block.nether_bricks.step","minecraft:block.nether_bricks.place","minecraft:block.nether_bricks.hit","minecraft:block.nether_bricks.fall","minecraft:block.nether_wart.break","minecraft:item.nether_wart.plant","minecraft:block.packed_mud.break","minecraft:block.packed_mud.fall","minecraft:block.packed_mud.hit","minecraft:block.packed_mud.place","minecraft:block.packed_mud.step","minecraft:block.stem.break","minecraft:block.stem.step","minecraft:block.stem.place","minecraft:block.stem.hit","minecraft:block.stem.fall","minecraft:block.nylium.break","minecraft:block.nylium.step","minecraft:block.nylium.place","minecraft:block.nylium.hit","minecraft:block.nylium.fall","minecraft:block.nether_sprouts.break","minecraft:block.nether_sprouts.step","minecraft:block.nether_sprouts.place","minecraft:block.nether_sprouts.hit","minecraft:block.nether_sprouts.fall","minecraft:block.fungus.break","minecraft:block.fungus.step","minecraft:block.fungus.place","minecraft:block.fungus.hit","minecraft:block.fungus.fall","minecraft:block.weeping_vines.break","minecraft:block.weeping_vines.step","minecraft:block.weeping_vines.place","minecraft:block.weeping_vines.hit","minecraft:block.weeping_vines.fall","minecraft:block.wart_block.break","minecraft:block.wart_block.step","minecraft:block.wart_block.place","minecraft:block.wart_block.hit","minecraft:block.wart_block.fall","minecraft:block.netherite_block.break","minecraft:block.netherite_block.step","minecraft:block.netherite_block.place","minecraft:block.netherite_block.hit","minecraft:block.netherite_block.fall","minecraft:block.netherrack.break","minecraft:block.netherrack.step","minecraft:block.netherrack.place","minecraft:block.netherrack.hit","minecraft:block.netherrack.fall","minecraft:block.note_block.basedrum","minecraft:block.note_block.bass","minecraft:block.note_block.bell","minecraft:block.note_block.chime","minecraft:block.note_block.flute","minecraft:block.note_block.guitar","minecraft:block.note_block.harp","minecraft:block.note_block.hat","minecraft:block.note_block.pling","minecraft:block.note_block.snare","minecraft:block.note_block.xylophone","minecraft:block.note_block.iron_xylophone","minecraft:block.note_block.cow_bell","minecraft:block.note_block.didgeridoo","minecraft:block.note_block.bit","minecraft:block.note_block.banjo","minecraft:entity.ocelot.hurt","minecraft:entity.ocelot.ambient","minecraft:entity.ocelot.death","minecraft:entity.painting.break","minecraft:entity.painting.place","minecraft:entity.panda.pre_sneeze","minecraft:entity.panda.sneeze","minecraft:entity.panda.ambient","minecraft:entity.panda.death","minecraft:entity.panda.eat","minecraft:entity.panda.step","minecraft:entity.panda.cant_breed","minecraft:entity.panda.aggressive_ambient","minecraft:entity.panda.worried_ambient","minecraft:entity.panda.hurt","minecraft:entity.panda.bite","minecraft:entity.parrot.ambient","minecraft:entity.parrot.death","minecraft:entity.parrot.eat","minecraft:entity.parrot.fly","minecraft:entity.parrot.hurt","minecraft:entity.parrot.imitate.blaze","minecraft:entity.parrot.imitate.creeper","minecraft:entity.parrot.imitate.drowned","minecraft:entity.parrot.imitate.elder_guardian","minecraft:entity.parrot.imitate.ender_dragon","minecraft:entity.parrot.imitate.endermite","minecraft:entity.parrot.imitate.evoker","minecraft:entity.parrot.imitate.ghast","minecraft:entity.parrot.imitate.guardian","minecraft:entity.parrot.imitate.hoglin","minecraft:entity.parrot.imitate.husk","minecraft:entity.parrot.imitate.illusioner","minecraft:entity.parrot.imitate.magma_cube","minecraft:entity.parrot.imitate.phantom","minecraft:entity.parrot.imitate.piglin","minecraft:entity.parrot.imitate.piglin_brute","minecraft:entity.parrot.imitate.pillager","minecraft:entity.parrot.imitate.ravager","minecraft:entity.parrot.imitate.shulker","minecraft:entity.parrot.imitate.silverfish","minecraft:entity.parrot.imitate.skeleton","minecraft:entity.parrot.imitate.slime","minecraft:entity.parrot.imitate.spider","minecraft:entity.parrot.imitate.stray","minecraft:entity.parrot.imitate.vex","minecraft:entity.parrot.imitate.vindicator","minecraft:entity.parrot.imitate.warden","minecraft:entity.parrot.imitate.witch","minecraft:entity.parrot.imitate.wither","minecraft:entity.parrot.imitate.wither_skeleton","minecraft:entity.parrot.imitate.zoglin","minecraft:entity.parrot.imitate.zombie","minecraft:entity.parrot.imitate.zombie_villager","minecraft:entity.parrot.step","minecraft:entity.phantom.ambient","minecraft:entity.phantom.bite","minecraft:entity.phantom.death","minecraft:entity.phantom.flap","minecraft:entity.phantom.hurt","minecraft:entity.phantom.swoop","minecraft:entity.pig.ambient","minecraft:entity.pig.death","minecraft:entity.pig.hurt","minecraft:entity.pig.saddle","minecraft:entity.pig.step","minecraft:entity.piglin.admiring_item","minecraft:entity.piglin.ambient","minecraft:entity.piglin.angry","minecraft:entity.piglin.celebrate","minecraft:entity.piglin.death","minecraft:entity.piglin.jealous","minecraft:entity.piglin.hurt","minecraft:entity.piglin.retreat","minecraft:entity.piglin.step","minecraft:entity.piglin.converted_to_zombified","minecraft:entity.piglin_brute.ambient","minecraft:entity.piglin_brute.angry","minecraft:entity.piglin_brute.death","minecraft:entity.piglin_brute.hurt","minecraft:entity.piglin_brute.step","minecraft:entity.piglin_brute.converted_to_zombified","minecraft:entity.pillager.ambient","minecraft:entity.pillager.celebrate","minecraft:entity.pillager.death","minecraft:entity.pillager.hurt","minecraft:block.piston.contract","minecraft:block.piston.extend","minecraft:entity.player.attack.crit","minecraft:entity.player.attack.knockback","minecraft:entity.player.attack.nodamage","minecraft:entity.player.attack.strong","minecraft:entity.player.attack.sweep","minecraft:entity.player.attack.weak","minecraft:entity.player.big_fall","minecraft:entity.player.breath","minecraft:entity.player.burp","minecraft:entity.player.death","minecraft:entity.player.hurt","minecraft:entity.player.hurt_drown","minecraft:entity.player.hurt_freeze","minecraft:entity.player.hurt_on_fire","minecraft:entity.player.hurt_sweet_berry_bush","minecraft:entity.player.levelup","minecraft:entity.player.small_fall","minecraft:entity.player.splash","minecraft:entity.player.splash.high_speed","minecraft:entity.player.swim","minecraft:entity.polar_bear.ambient","minecraft:entity.polar_bear.ambient_baby","minecraft:entity.polar_bear.death","minecraft:entity.polar_bear.hurt","minecraft:entity.polar_bear.step","minecraft:entity.polar_bear.warning","minecraft:block.polished_deepslate.break","minecraft:block.polished_deepslate.fall","minecraft:block.polished_deepslate.hit","minecraft:block.polished_deepslate.place","minecraft:block.polished_deepslate.step","minecraft:block.portal.ambient","minecraft:block.portal.travel","minecraft:block.portal.trigger","minecraft:block.powder_snow.break","minecraft:block.powder_snow.fall","minecraft:block.powder_snow.hit","minecraft:block.powder_snow.place","minecraft:block.powder_snow.step","minecraft:entity.puffer_fish.ambient","minecraft:entity.puffer_fish.blow_out","minecraft:entity.puffer_fish.blow_up","minecraft:entity.puffer_fish.death","minecraft:entity.puffer_fish.flop","minecraft:entity.puffer_fish.hurt","minecraft:entity.puffer_fish.sting","minecraft:block.pumpkin.carve","minecraft:entity.rabbit.ambient","minecraft:entity.rabbit.attack","minecraft:entity.rabbit.death","minecraft:entity.rabbit.hurt","minecraft:entity.rabbit.jump","minecraft:event.raid.horn","minecraft:entity.ravager.ambient","minecraft:entity.ravager.attack","minecraft:entity.ravager.celebrate","minecraft:entity.ravager.death","minecraft:entity.ravager.hurt","minecraft:entity.ravager.step","minecraft:entity.ravager.stunned","minecraft:entity.ravager.roar","minecraft:block.nether_gold_ore.break","minecraft:block.nether_gold_ore.fall","minecraft:block.nether_gold_ore.hit","minecraft:block.nether_gold_ore.place","minecraft:block.nether_gold_ore.step","minecraft:block.nether_ore.break","minecraft:block.nether_ore.fall","minecraft:block.nether_ore.hit","minecraft:block.nether_ore.place","minecraft:block.nether_ore.step","minecraft:block.redstone_torch.burnout","minecraft:block.respawn_anchor.ambient","minecraft:block.respawn_anchor.charge","minecraft:block.respawn_anchor.deplete","minecraft:block.respawn_anchor.set_spawn","minecraft:block.rooted_dirt.break","minecraft:block.rooted_dirt.fall","minecraft:block.rooted_dirt.hit","minecraft:block.rooted_dirt.place","minecraft:block.rooted_dirt.step","minecraft:entity.salmon.ambient","minecraft:entity.salmon.death","minecraft:entity.salmon.flop","minecraft:entity.salmon.hurt","minecraft:block.sand.break","minecraft:block.sand.fall","minecraft:block.sand.hit","minecraft:block.sand.place","minecraft:block.sand.step","minecraft:block.scaffolding.break","minecraft:block.scaffolding.fall","minecraft:block.scaffolding.hit","minecraft:block.scaffolding.place","minecraft:block.scaffolding.step","minecraft:block.sculk.spread","minecraft:block.sculk.charge","minecraft:block.sculk.break","minecraft:block.sculk.fall","minecraft:block.sculk.hit","minecraft:block.sculk.place","minecraft:block.sculk.step","minecraft:block.sculk_catalyst.bloom","minecraft:block.sculk_catalyst.break","minecraft:block.sculk_catalyst.fall","minecraft:block.sculk_catalyst.hit","minecraft:block.sculk_catalyst.place","minecraft:block.sculk_catalyst.step","minecraft:block.sculk_sensor.clicking","minecraft:block.sculk_sensor.clicking_stop","minecraft:block.sculk_sensor.break","minecraft:block.sculk_sensor.fall","minecraft:block.sculk_sensor.hit","minecraft:block.sculk_sensor.place","minecraft:block.sculk_sensor.step","minecraft:block.sculk_shrieker.break","minecraft:block.sculk_shrieker.fall","minecraft:block.sculk_shrieker.hit","minecraft:block.sculk_shrieker.place","minecraft:block.sculk_shrieker.shriek","minecraft:block.sculk_shrieker.step","minecraft:block.sculk_vein.break","minecraft:block.sculk_vein.fall","minecraft:block.sculk_vein.hit","minecraft:block.sculk_vein.place","minecraft:block.sculk_vein.step","minecraft:entity.sheep.ambient","minecraft:entity.sheep.death","minecraft:entity.sheep.hurt","minecraft:entity.sheep.shear","minecraft:entity.sheep.step","minecraft:item.shield.block","minecraft:item.shield.break","minecraft:block.shroomlight.break","minecraft:block.shroomlight.step","minecraft:block.shroomlight.place","minecraft:block.shroomlight.hit","minecraft:block.shroomlight.fall","minecraft:item.shovel.flatten","minecraft:entity.shulker.ambient","minecraft:block.shulker_box.close","minecraft:block.shulker_box.open","minecraft:entity.shulker_bullet.hit","minecraft:entity.shulker_bullet.hurt","minecraft:entity.shulker.close","minecraft:entity.shulker.death","minecraft:entity.shulker.hurt","minecraft:entity.shulker.hurt_closed","minecraft:entity.shulker.open","minecraft:entity.shulker.shoot","minecraft:entity.shulker.teleport","minecraft:entity.silverfish.ambient","minecraft:entity.silverfish.death","minecraft:entity.silverfish.hurt","minecraft:entity.silverfish.step","minecraft:entity.skeleton.ambient","minecraft:entity.skeleton.converted_to_stray","minecraft:entity.skeleton.death","minecraft:entity.skeleton_horse.ambient","minecraft:entity.skeleton_horse.death","minecraft:entity.skeleton_horse.hurt","minecraft:entity.skeleton_horse.swim","minecraft:entity.skeleton_horse.ambient_water","minecraft:entity.skeleton_horse.gallop_water","minecraft:entity.skeleton_horse.jump_water","minecraft:entity.skeleton_horse.step_water","minecraft:entity.skeleton.hurt","minecraft:entity.skeleton.shoot","minecraft:entity.skeleton.step","minecraft:entity.slime.attack","minecraft:entity.slime.death","minecraft:entity.slime.hurt","minecraft:entity.slime.jump","minecraft:entity.slime.squish","minecraft:block.slime_block.break","minecraft:block.slime_block.fall","minecraft:block.slime_block.hit","minecraft:block.slime_block.place","minecraft:block.slime_block.step","minecraft:block.small_amethyst_bud.break","minecraft:block.small_amethyst_bud.place","minecraft:block.small_dripleaf.break","minecraft:block.small_dripleaf.fall","minecraft:block.small_dripleaf.hit","minecraft:block.small_dripleaf.place","minecraft:block.small_dripleaf.step","minecraft:block.soul_sand.break","minecraft:block.soul_sand.step","minecraft:block.soul_sand.place","minecraft:block.soul_sand.hit","minecraft:block.soul_sand.fall","minecraft:block.soul_soil.break","minecraft:block.soul_soil.step","minecraft:block.soul_soil.place","minecraft:block.soul_soil.hit","minecraft:block.soul_soil.fall","minecraft:particle.soul_escape","minecraft:block.spore_blossom.break","minecraft:block.spore_blossom.fall","minecraft:block.spore_blossom.hit","minecraft:block.spore_blossom.place","minecraft:block.spore_blossom.step","minecraft:entity.strider.ambient","minecraft:entity.strider.happy","minecraft:entity.strider.retreat","minecraft:entity.strider.death","minecraft:entity.strider.hurt","minecraft:entity.strider.step","minecraft:entity.strider.step_lava","minecraft:entity.strider.eat","minecraft:entity.strider.saddle","minecraft:entity.slime.death_small","minecraft:entity.slime.hurt_small","minecraft:entity.slime.jump_small","minecraft:entity.slime.squish_small","minecraft:block.smithing_table.use","minecraft:block.smoker.smoke","minecraft:entity.snowball.throw","minecraft:block.snow.break","minecraft:block.snow.fall","minecraft:entity.snow_golem.ambient","minecraft:entity.snow_golem.death","minecraft:entity.snow_golem.hurt","minecraft:entity.snow_golem.shoot","minecraft:entity.snow_golem.shear","minecraft:block.snow.hit","minecraft:block.snow.place","minecraft:block.snow.step","minecraft:entity.spider.ambient","minecraft:entity.spider.death","minecraft:entity.spider.hurt","minecraft:entity.spider.step","minecraft:entity.splash_potion.break","minecraft:entity.splash_potion.throw","minecraft:item.spyglass.use","minecraft:item.spyglass.stop_using","minecraft:entity.squid.ambient","minecraft:entity.squid.death","minecraft:entity.squid.hurt","minecraft:entity.squid.squirt","minecraft:block.stone.break","minecraft:block.stone_button.click_off","minecraft:block.stone_button.click_on","minecraft:block.stone.fall","minecraft:block.stone.hit","minecraft:block.stone.place","minecraft:block.stone_pressure_plate.click_off","minecraft:block.stone_pressure_plate.click_on","minecraft:block.stone.step","minecraft:entity.stray.ambient","minecraft:entity.stray.death","minecraft:entity.stray.hurt","minecraft:entity.stray.step","minecraft:block.sweet_berry_bush.break","minecraft:block.sweet_berry_bush.place","minecraft:block.sweet_berry_bush.pick_berries","minecraft:entity.tadpole.death","minecraft:entity.tadpole.flop","minecraft:entity.tadpole.grow_up","minecraft:entity.tadpole.hurt","minecraft:enchant.thorns.hit","minecraft:entity.tnt.primed","minecraft:item.totem.use","minecraft:item.trident.hit","minecraft:item.trident.hit_ground","minecraft:item.trident.return","minecraft:item.trident.riptide_1","minecraft:item.trident.riptide_2","minecraft:item.trident.riptide_3","minecraft:item.trident.throw","minecraft:item.trident.thunder","minecraft:block.tripwire.attach","minecraft:block.tripwire.click_off","minecraft:block.tripwire.click_on","minecraft:block.tripwire.detach","minecraft:entity.tropical_fish.ambient","minecraft:entity.tropical_fish.death","minecraft:entity.tropical_fish.flop","minecraft:entity.tropical_fish.hurt","minecraft:block.tuff.break","minecraft:block.tuff.step","minecraft:block.tuff.place","minecraft:block.tuff.hit","minecraft:block.tuff.fall","minecraft:entity.turtle.ambient_land","minecraft:entity.turtle.death","minecraft:entity.turtle.death_baby","minecraft:entity.turtle.egg_break","minecraft:entity.turtle.egg_crack","minecraft:entity.turtle.egg_hatch","minecraft:entity.turtle.hurt","minecraft:entity.turtle.hurt_baby","minecraft:entity.turtle.lay_egg","minecraft:entity.turtle.shamble","minecraft:entity.turtle.shamble_baby","minecraft:entity.turtle.swim","minecraft:ui.button.click","minecraft:ui.loom.select_pattern","minecraft:ui.loom.take_result","minecraft:ui.cartography_table.take_result","minecraft:ui.stonecutter.take_result","minecraft:ui.stonecutter.select_recipe","minecraft:ui.toast.challenge_complete","minecraft:ui.toast.in","minecraft:ui.toast.out","minecraft:entity.vex.ambient","minecraft:entity.vex.charge","minecraft:entity.vex.death","minecraft:entity.vex.hurt","minecraft:entity.villager.ambient","minecraft:entity.villager.celebrate","minecraft:entity.villager.death","minecraft:entity.villager.hurt","minecraft:entity.villager.no","minecraft:entity.villager.trade","minecraft:entity.villager.yes","minecraft:entity.villager.work_armorer","minecraft:entity.villager.work_butcher","minecraft:entity.villager.work_cartographer","minecraft:entity.villager.work_cleric","minecraft:entity.villager.work_farmer","minecraft:entity.villager.work_fisherman","minecraft:entity.villager.work_fletcher","minecraft:entity.villager.work_leatherworker","minecraft:entity.villager.work_librarian","minecraft:entity.villager.work_mason","minecraft:entity.villager.work_shepherd","minecraft:entity.villager.work_toolsmith","minecraft:entity.villager.work_weaponsmith","minecraft:entity.vindicator.ambient","minecraft:entity.vindicator.celebrate","minecraft:entity.vindicator.death","minecraft:entity.vindicator.hurt","minecraft:block.vine.break","minecraft:block.vine.fall","minecraft:block.vine.hit","minecraft:block.vine.place","minecraft:block.vine.step","minecraft:block.lily_pad.place","minecraft:entity.wandering_trader.ambient","minecraft:entity.wandering_trader.death","minecraft:entity.wandering_trader.disappeared","minecraft:entity.wandering_trader.drink_milk","minecraft:entity.wandering_trader.drink_potion","minecraft:entity.wandering_trader.hurt","minecraft:entity.wandering_trader.no","minecraft:entity.wandering_trader.reappeared","minecraft:entity.wandering_trader.trade","minecraft:entity.wandering_trader.yes","minecraft:entity.warden.agitated","minecraft:entity.warden.ambient","minecraft:entity.warden.angry","minecraft:entity.warden.attack_impact","minecraft:entity.warden.death","minecraft:entity.warden.dig","minecraft:entity.warden.emerge","minecraft:entity.warden.heartbeat","minecraft:entity.warden.hurt","minecraft:entity.warden.listening","minecraft:entity.warden.listening_angry","minecraft:entity.warden.nearby_close","minecraft:entity.warden.nearby_closer","minecraft:entity.warden.nearby_closest","minecraft:entity.warden.roar","minecraft:entity.warden.sniff","minecraft:entity.warden.sonic_boom","minecraft:entity.warden.sonic_charge","minecraft:entity.warden.step","minecraft:entity.warden.tendril_clicks","minecraft:block.water.ambient","minecraft:weather.rain","minecraft:weather.rain.above","minecraft:block.wet_grass.break","minecraft:block.wet_grass.fall","minecraft:block.wet_grass.hit","minecraft:block.wet_grass.place","minecraft:block.wet_grass.step","minecraft:entity.witch.ambient","minecraft:entity.witch.celebrate","minecraft:entity.witch.death","minecraft:entity.witch.drink","minecraft:entity.witch.hurt","minecraft:entity.witch.throw","minecraft:entity.wither.ambient","minecraft:entity.wither.break_block","minecraft:entity.wither.death","minecraft:entity.wither.hurt","minecraft:entity.wither.shoot","minecraft:entity.wither_skeleton.ambient","minecraft:entity.wither_skeleton.death","minecraft:entity.wither_skeleton.hurt","minecraft:entity.wither_skeleton.step","minecraft:entity.wither.spawn","minecraft:entity.wolf.ambient","minecraft:entity.wolf.death","minecraft:entity.wolf.growl","minecraft:entity.wolf.howl","minecraft:entity.wolf.hurt","minecraft:entity.wolf.pant","minecraft:entity.wolf.shake","minecraft:entity.wolf.step","minecraft:entity.wolf.whine","minecraft:block.wooden_door.close","minecraft:block.wooden_door.open","minecraft:block.wooden_trapdoor.close","minecraft:block.wooden_trapdoor.open","minecraft:block.wood.break","minecraft:block.wooden_button.click_off","minecraft:block.wooden_button.click_on","minecraft:block.wood.fall","minecraft:block.wood.hit","minecraft:block.wood.place","minecraft:block.wooden_pressure_plate.click_off","minecraft:block.wooden_pressure_plate.click_on","minecraft:block.wood.step","minecraft:block.wool.break","minecraft:block.wool.fall","minecraft:block.wool.hit","minecraft:block.wool.place","minecraft:block.wool.step","minecraft:entity.zoglin.ambient","minecraft:entity.zoglin.angry","minecraft:entity.zoglin.attack","minecraft:entity.zoglin.death","minecraft:entity.zoglin.hurt","minecraft:entity.zoglin.step","minecraft:entity.zombie.ambient","minecraft:entity.zombie.attack_wooden_door","minecraft:entity.zombie.attack_iron_door","minecraft:entity.zombie.break_wooden_door","minecraft:entity.zombie.converted_to_drowned","minecraft:entity.zombie.death","minecraft:entity.zombie.destroy_egg","minecraft:entity.zombie_horse.ambient","minecraft:entity.zombie_horse.death","minecraft:entity.zombie_horse.hurt","minecraft:entity.zombie.hurt","minecraft:entity.zombie.infect","minecraft:entity.zombified_piglin.ambient","minecraft:entity.zombified_piglin.angry","minecraft:entity.zombified_piglin.death","minecraft:entity.zombified_piglin.hurt","minecraft:entity.zombie.step","minecraft:entity.zombie_villager.ambient","minecraft:entity.zombie_villager.converted","minecraft:entity.zombie_villager.cure","minecraft:entity.zombie_villager.death","minecraft:entity.zombie_villager.hurt","minecraft:entity.zombie_villager.step"]`,
  ),
);

export function readSoundEvent(reader: Reader): SoundEvent {
  return soundEventEnum.fromId(reader.readVarInt());
}

export function writeSoundEvent(writer: Writer, value: SoundEvent) {
  writer.writeVarInt(soundEventEnum.toId(value));
}

export type MobEffect =
  | "dummy:invalid"
  | "minecraft:speed"
  | "minecraft:slowness"
  | "minecraft:haste"
  | "minecraft:mining_fatigue"
  | "minecraft:strength"
  | "minecraft:instant_health"
  | "minecraft:instant_damage"
  | "minecraft:jump_boost"
  | "minecraft:nausea"
  | "minecraft:regeneration"
  | "minecraft:resistance"
  | "minecraft:fire_resistance"
  | "minecraft:water_breathing"
  | "minecraft:invisibility"
  | "minecraft:blindness"
  | "minecraft:night_vision"
  | "minecraft:hunger"
  | "minecraft:weakness"
  | "minecraft:poison"
  | "minecraft:wither"
  | "minecraft:health_boost"
  | "minecraft:absorption"
  | "minecraft:saturation"
  | "minecraft:glowing"
  | "minecraft:levitation"
  | "minecraft:luck"
  | "minecraft:unluck"
  | "minecraft:slow_falling"
  | "minecraft:conduit_power"
  | "minecraft:dolphins_grace"
  | "minecraft:bad_omen"
  | "minecraft:hero_of_the_village"
  | "minecraft:darkness";

export const mobEffectEnum = createEnumMapper<MobEffect>(
  JSON.parse(
    `["dummy:invalid","minecraft:speed","minecraft:slowness","minecraft:haste","minecraft:mining_fatigue","minecraft:strength","minecraft:instant_health","minecraft:instant_damage","minecraft:jump_boost","minecraft:nausea","minecraft:regeneration","minecraft:resistance","minecraft:fire_resistance","minecraft:water_breathing","minecraft:invisibility","minecraft:blindness","minecraft:night_vision","minecraft:hunger","minecraft:weakness","minecraft:poison","minecraft:wither","minecraft:health_boost","minecraft:absorption","minecraft:saturation","minecraft:glowing","minecraft:levitation","minecraft:luck","minecraft:unluck","minecraft:slow_falling","minecraft:conduit_power","minecraft:dolphins_grace","minecraft:bad_omen","minecraft:hero_of_the_village","minecraft:darkness"]`,
  ),
);

export function readMobEffect(reader: Reader): MobEffect {
  return mobEffectEnum.fromId(reader.readVarInt());
}

export function writeMobEffect(writer: Writer, value: MobEffect) {
  writer.writeVarInt(mobEffectEnum.toId(value));
}

export type EntityType =
  | "minecraft:allay"
  | "minecraft:area_effect_cloud"
  | "minecraft:armor_stand"
  | "minecraft:arrow"
  | "minecraft:axolotl"
  | "minecraft:bat"
  | "minecraft:bee"
  | "minecraft:blaze"
  | "minecraft:boat"
  | "minecraft:chest_boat"
  | "minecraft:cat"
  | "minecraft:cave_spider"
  | "minecraft:chicken"
  | "minecraft:cod"
  | "minecraft:cow"
  | "minecraft:creeper"
  | "minecraft:dolphin"
  | "minecraft:donkey"
  | "minecraft:dragon_fireball"
  | "minecraft:drowned"
  | "minecraft:elder_guardian"
  | "minecraft:end_crystal"
  | "minecraft:ender_dragon"
  | "minecraft:enderman"
  | "minecraft:endermite"
  | "minecraft:evoker"
  | "minecraft:evoker_fangs"
  | "minecraft:experience_orb"
  | "minecraft:eye_of_ender"
  | "minecraft:falling_block"
  | "minecraft:firework_rocket"
  | "minecraft:fox"
  | "minecraft:frog"
  | "minecraft:ghast"
  | "minecraft:giant"
  | "minecraft:glow_item_frame"
  | "minecraft:glow_squid"
  | "minecraft:goat"
  | "minecraft:guardian"
  | "minecraft:hoglin"
  | "minecraft:horse"
  | "minecraft:husk"
  | "minecraft:illusioner"
  | "minecraft:iron_golem"
  | "minecraft:item"
  | "minecraft:item_frame"
  | "minecraft:fireball"
  | "minecraft:leash_knot"
  | "minecraft:lightning_bolt"
  | "minecraft:llama"
  | "minecraft:llama_spit"
  | "minecraft:magma_cube"
  | "minecraft:marker"
  | "minecraft:minecart"
  | "minecraft:chest_minecart"
  | "minecraft:command_block_minecart"
  | "minecraft:furnace_minecart"
  | "minecraft:hopper_minecart"
  | "minecraft:spawner_minecart"
  | "minecraft:tnt_minecart"
  | "minecraft:mule"
  | "minecraft:mooshroom"
  | "minecraft:ocelot"
  | "minecraft:painting"
  | "minecraft:panda"
  | "minecraft:parrot"
  | "minecraft:phantom"
  | "minecraft:pig"
  | "minecraft:piglin"
  | "minecraft:piglin_brute"
  | "minecraft:pillager"
  | "minecraft:polar_bear"
  | "minecraft:tnt"
  | "minecraft:pufferfish"
  | "minecraft:rabbit"
  | "minecraft:ravager"
  | "minecraft:salmon"
  | "minecraft:sheep"
  | "minecraft:shulker"
  | "minecraft:shulker_bullet"
  | "minecraft:silverfish"
  | "minecraft:skeleton"
  | "minecraft:skeleton_horse"
  | "minecraft:slime"
  | "minecraft:small_fireball"
  | "minecraft:snow_golem"
  | "minecraft:snowball"
  | "minecraft:spectral_arrow"
  | "minecraft:spider"
  | "minecraft:squid"
  | "minecraft:stray"
  | "minecraft:strider"
  | "minecraft:tadpole"
  | "minecraft:egg"
  | "minecraft:ender_pearl"
  | "minecraft:experience_bottle"
  | "minecraft:potion"
  | "minecraft:trident"
  | "minecraft:trader_llama"
  | "minecraft:tropical_fish"
  | "minecraft:turtle"
  | "minecraft:vex"
  | "minecraft:villager"
  | "minecraft:vindicator"
  | "minecraft:wandering_trader"
  | "minecraft:warden"
  | "minecraft:witch"
  | "minecraft:wither"
  | "minecraft:wither_skeleton"
  | "minecraft:wither_skull"
  | "minecraft:wolf"
  | "minecraft:zoglin"
  | "minecraft:zombie"
  | "minecraft:zombie_horse"
  | "minecraft:zombie_villager"
  | "minecraft:zombified_piglin"
  | "minecraft:player"
  | "minecraft:fishing_bobber";

export const entityTypeEnum = createEnumMapper<EntityType>(
  JSON.parse(
    `["minecraft:allay","minecraft:area_effect_cloud","minecraft:armor_stand","minecraft:arrow","minecraft:axolotl","minecraft:bat","minecraft:bee","minecraft:blaze","minecraft:boat","minecraft:chest_boat","minecraft:cat","minecraft:cave_spider","minecraft:chicken","minecraft:cod","minecraft:cow","minecraft:creeper","minecraft:dolphin","minecraft:donkey","minecraft:dragon_fireball","minecraft:drowned","minecraft:elder_guardian","minecraft:end_crystal","minecraft:ender_dragon","minecraft:enderman","minecraft:endermite","minecraft:evoker","minecraft:evoker_fangs","minecraft:experience_orb","minecraft:eye_of_ender","minecraft:falling_block","minecraft:firework_rocket","minecraft:fox","minecraft:frog","minecraft:ghast","minecraft:giant","minecraft:glow_item_frame","minecraft:glow_squid","minecraft:goat","minecraft:guardian","minecraft:hoglin","minecraft:horse","minecraft:husk","minecraft:illusioner","minecraft:iron_golem","minecraft:item","minecraft:item_frame","minecraft:fireball","minecraft:leash_knot","minecraft:lightning_bolt","minecraft:llama","minecraft:llama_spit","minecraft:magma_cube","minecraft:marker","minecraft:minecart","minecraft:chest_minecart","minecraft:command_block_minecart","minecraft:furnace_minecart","minecraft:hopper_minecart","minecraft:spawner_minecart","minecraft:tnt_minecart","minecraft:mule","minecraft:mooshroom","minecraft:ocelot","minecraft:painting","minecraft:panda","minecraft:parrot","minecraft:phantom","minecraft:pig","minecraft:piglin","minecraft:piglin_brute","minecraft:pillager","minecraft:polar_bear","minecraft:tnt","minecraft:pufferfish","minecraft:rabbit","minecraft:ravager","minecraft:salmon","minecraft:sheep","minecraft:shulker","minecraft:shulker_bullet","minecraft:silverfish","minecraft:skeleton","minecraft:skeleton_horse","minecraft:slime","minecraft:small_fireball","minecraft:snow_golem","minecraft:snowball","minecraft:spectral_arrow","minecraft:spider","minecraft:squid","minecraft:stray","minecraft:strider","minecraft:tadpole","minecraft:egg","minecraft:ender_pearl","minecraft:experience_bottle","minecraft:potion","minecraft:trident","minecraft:trader_llama","minecraft:tropical_fish","minecraft:turtle","minecraft:vex","minecraft:villager","minecraft:vindicator","minecraft:wandering_trader","minecraft:warden","minecraft:witch","minecraft:wither","minecraft:wither_skeleton","minecraft:wither_skull","minecraft:wolf","minecraft:zoglin","minecraft:zombie","minecraft:zombie_horse","minecraft:zombie_villager","minecraft:zombified_piglin","minecraft:player","minecraft:fishing_bobber"]`,
  ),
);

export function readEntityType(reader: Reader): EntityType {
  return entityTypeEnum.fromId(reader.readVarInt());
}

export function writeEntityType(writer: Writer, value: EntityType) {
  writer.writeVarInt(entityTypeEnum.toId(value));
}

export type BlockEntityType =
  | "minecraft:furnace"
  | "minecraft:chest"
  | "minecraft:trapped_chest"
  | "minecraft:ender_chest"
  | "minecraft:jukebox"
  | "minecraft:dispenser"
  | "minecraft:dropper"
  | "minecraft:sign"
  | "minecraft:mob_spawner"
  | "minecraft:piston"
  | "minecraft:brewing_stand"
  | "minecraft:enchanting_table"
  | "minecraft:end_portal"
  | "minecraft:beacon"
  | "minecraft:skull"
  | "minecraft:daylight_detector"
  | "minecraft:hopper"
  | "minecraft:comparator"
  | "minecraft:banner"
  | "minecraft:structure_block"
  | "minecraft:end_gateway"
  | "minecraft:command_block"
  | "minecraft:shulker_box"
  | "minecraft:bed"
  | "minecraft:conduit"
  | "minecraft:barrel"
  | "minecraft:smoker"
  | "minecraft:blast_furnace"
  | "minecraft:lectern"
  | "minecraft:bell"
  | "minecraft:jigsaw"
  | "minecraft:campfire"
  | "minecraft:beehive"
  | "minecraft:sculk_sensor"
  | "minecraft:sculk_catalyst"
  | "minecraft:sculk_shrieker";

export const blockEntityTypeEnum = createEnumMapper<BlockEntityType>(
  JSON.parse(
    `["minecraft:furnace","minecraft:chest","minecraft:trapped_chest","minecraft:ender_chest","minecraft:jukebox","minecraft:dispenser","minecraft:dropper","minecraft:sign","minecraft:mob_spawner","minecraft:piston","minecraft:brewing_stand","minecraft:enchanting_table","minecraft:end_portal","minecraft:beacon","minecraft:skull","minecraft:daylight_detector","minecraft:hopper","minecraft:comparator","minecraft:banner","minecraft:structure_block","minecraft:end_gateway","minecraft:command_block","minecraft:shulker_box","minecraft:bed","minecraft:conduit","minecraft:barrel","minecraft:smoker","minecraft:blast_furnace","minecraft:lectern","minecraft:bell","minecraft:jigsaw","minecraft:campfire","minecraft:beehive","minecraft:sculk_sensor","minecraft:sculk_catalyst","minecraft:sculk_shrieker"]`,
  ),
);

export function readBlockEntityType(reader: Reader): BlockEntityType {
  return blockEntityTypeEnum.fromId(reader.readVarInt());
}

export function writeBlockEntityType(writer: Writer, value: BlockEntityType) {
  writer.writeVarInt(blockEntityTypeEnum.toId(value));
}

export type Item =
  | "minecraft:air"
  | "minecraft:stone"
  | "minecraft:granite"
  | "minecraft:polished_granite"
  | "minecraft:diorite"
  | "minecraft:polished_diorite"
  | "minecraft:andesite"
  | "minecraft:polished_andesite"
  | "minecraft:deepslate"
  | "minecraft:cobbled_deepslate"
  | "minecraft:polished_deepslate"
  | "minecraft:calcite"
  | "minecraft:tuff"
  | "minecraft:dripstone_block"
  | "minecraft:grass_block"
  | "minecraft:dirt"
  | "minecraft:coarse_dirt"
  | "minecraft:podzol"
  | "minecraft:rooted_dirt"
  | "minecraft:mud"
  | "minecraft:crimson_nylium"
  | "minecraft:warped_nylium"
  | "minecraft:cobblestone"
  | "minecraft:oak_planks"
  | "minecraft:spruce_planks"
  | "minecraft:birch_planks"
  | "minecraft:jungle_planks"
  | "minecraft:acacia_planks"
  | "minecraft:dark_oak_planks"
  | "minecraft:mangrove_planks"
  | "minecraft:crimson_planks"
  | "minecraft:warped_planks"
  | "minecraft:oak_sapling"
  | "minecraft:spruce_sapling"
  | "minecraft:birch_sapling"
  | "minecraft:jungle_sapling"
  | "minecraft:acacia_sapling"
  | "minecraft:dark_oak_sapling"
  | "minecraft:mangrove_propagule"
  | "minecraft:bedrock"
  | "minecraft:sand"
  | "minecraft:red_sand"
  | "minecraft:gravel"
  | "minecraft:coal_ore"
  | "minecraft:deepslate_coal_ore"
  | "minecraft:iron_ore"
  | "minecraft:deepslate_iron_ore"
  | "minecraft:copper_ore"
  | "minecraft:deepslate_copper_ore"
  | "minecraft:gold_ore"
  | "minecraft:deepslate_gold_ore"
  | "minecraft:redstone_ore"
  | "minecraft:deepslate_redstone_ore"
  | "minecraft:emerald_ore"
  | "minecraft:deepslate_emerald_ore"
  | "minecraft:lapis_ore"
  | "minecraft:deepslate_lapis_ore"
  | "minecraft:diamond_ore"
  | "minecraft:deepslate_diamond_ore"
  | "minecraft:nether_gold_ore"
  | "minecraft:nether_quartz_ore"
  | "minecraft:ancient_debris"
  | "minecraft:coal_block"
  | "minecraft:raw_iron_block"
  | "minecraft:raw_copper_block"
  | "minecraft:raw_gold_block"
  | "minecraft:amethyst_block"
  | "minecraft:budding_amethyst"
  | "minecraft:iron_block"
  | "minecraft:copper_block"
  | "minecraft:gold_block"
  | "minecraft:diamond_block"
  | "minecraft:netherite_block"
  | "minecraft:exposed_copper"
  | "minecraft:weathered_copper"
  | "minecraft:oxidized_copper"
  | "minecraft:cut_copper"
  | "minecraft:exposed_cut_copper"
  | "minecraft:weathered_cut_copper"
  | "minecraft:oxidized_cut_copper"
  | "minecraft:cut_copper_stairs"
  | "minecraft:exposed_cut_copper_stairs"
  | "minecraft:weathered_cut_copper_stairs"
  | "minecraft:oxidized_cut_copper_stairs"
  | "minecraft:cut_copper_slab"
  | "minecraft:exposed_cut_copper_slab"
  | "minecraft:weathered_cut_copper_slab"
  | "minecraft:oxidized_cut_copper_slab"
  | "minecraft:waxed_copper_block"
  | "minecraft:waxed_exposed_copper"
  | "minecraft:waxed_weathered_copper"
  | "minecraft:waxed_oxidized_copper"
  | "minecraft:waxed_cut_copper"
  | "minecraft:waxed_exposed_cut_copper"
  | "minecraft:waxed_weathered_cut_copper"
  | "minecraft:waxed_oxidized_cut_copper"
  | "minecraft:waxed_cut_copper_stairs"
  | "minecraft:waxed_exposed_cut_copper_stairs"
  | "minecraft:waxed_weathered_cut_copper_stairs"
  | "minecraft:waxed_oxidized_cut_copper_stairs"
  | "minecraft:waxed_cut_copper_slab"
  | "minecraft:waxed_exposed_cut_copper_slab"
  | "minecraft:waxed_weathered_cut_copper_slab"
  | "minecraft:waxed_oxidized_cut_copper_slab"
  | "minecraft:oak_log"
  | "minecraft:spruce_log"
  | "minecraft:birch_log"
  | "minecraft:jungle_log"
  | "minecraft:acacia_log"
  | "minecraft:dark_oak_log"
  | "minecraft:mangrove_log"
  | "minecraft:mangrove_roots"
  | "minecraft:muddy_mangrove_roots"
  | "minecraft:crimson_stem"
  | "minecraft:warped_stem"
  | "minecraft:stripped_oak_log"
  | "minecraft:stripped_spruce_log"
  | "minecraft:stripped_birch_log"
  | "minecraft:stripped_jungle_log"
  | "minecraft:stripped_acacia_log"
  | "minecraft:stripped_dark_oak_log"
  | "minecraft:stripped_mangrove_log"
  | "minecraft:stripped_crimson_stem"
  | "minecraft:stripped_warped_stem"
  | "minecraft:stripped_oak_wood"
  | "minecraft:stripped_spruce_wood"
  | "minecraft:stripped_birch_wood"
  | "minecraft:stripped_jungle_wood"
  | "minecraft:stripped_acacia_wood"
  | "minecraft:stripped_dark_oak_wood"
  | "minecraft:stripped_mangrove_wood"
  | "minecraft:stripped_crimson_hyphae"
  | "minecraft:stripped_warped_hyphae"
  | "minecraft:oak_wood"
  | "minecraft:spruce_wood"
  | "minecraft:birch_wood"
  | "minecraft:jungle_wood"
  | "minecraft:acacia_wood"
  | "minecraft:dark_oak_wood"
  | "minecraft:mangrove_wood"
  | "minecraft:crimson_hyphae"
  | "minecraft:warped_hyphae"
  | "minecraft:oak_leaves"
  | "minecraft:spruce_leaves"
  | "minecraft:birch_leaves"
  | "minecraft:jungle_leaves"
  | "minecraft:acacia_leaves"
  | "minecraft:dark_oak_leaves"
  | "minecraft:mangrove_leaves"
  | "minecraft:azalea_leaves"
  | "minecraft:flowering_azalea_leaves"
  | "minecraft:sponge"
  | "minecraft:wet_sponge"
  | "minecraft:glass"
  | "minecraft:tinted_glass"
  | "minecraft:lapis_block"
  | "minecraft:sandstone"
  | "minecraft:chiseled_sandstone"
  | "minecraft:cut_sandstone"
  | "minecraft:cobweb"
  | "minecraft:grass"
  | "minecraft:fern"
  | "minecraft:azalea"
  | "minecraft:flowering_azalea"
  | "minecraft:dead_bush"
  | "minecraft:seagrass"
  | "minecraft:sea_pickle"
  | "minecraft:white_wool"
  | "minecraft:orange_wool"
  | "minecraft:magenta_wool"
  | "minecraft:light_blue_wool"
  | "minecraft:yellow_wool"
  | "minecraft:lime_wool"
  | "minecraft:pink_wool"
  | "minecraft:gray_wool"
  | "minecraft:light_gray_wool"
  | "minecraft:cyan_wool"
  | "minecraft:purple_wool"
  | "minecraft:blue_wool"
  | "minecraft:brown_wool"
  | "minecraft:green_wool"
  | "minecraft:red_wool"
  | "minecraft:black_wool"
  | "minecraft:dandelion"
  | "minecraft:poppy"
  | "minecraft:blue_orchid"
  | "minecraft:allium"
  | "minecraft:azure_bluet"
  | "minecraft:red_tulip"
  | "minecraft:orange_tulip"
  | "minecraft:white_tulip"
  | "minecraft:pink_tulip"
  | "minecraft:oxeye_daisy"
  | "minecraft:cornflower"
  | "minecraft:lily_of_the_valley"
  | "minecraft:wither_rose"
  | "minecraft:spore_blossom"
  | "minecraft:brown_mushroom"
  | "minecraft:red_mushroom"
  | "minecraft:crimson_fungus"
  | "minecraft:warped_fungus"
  | "minecraft:crimson_roots"
  | "minecraft:warped_roots"
  | "minecraft:nether_sprouts"
  | "minecraft:weeping_vines"
  | "minecraft:twisting_vines"
  | "minecraft:sugar_cane"
  | "minecraft:kelp"
  | "minecraft:moss_carpet"
  | "minecraft:moss_block"
  | "minecraft:hanging_roots"
  | "minecraft:big_dripleaf"
  | "minecraft:small_dripleaf"
  | "minecraft:bamboo"
  | "minecraft:oak_slab"
  | "minecraft:spruce_slab"
  | "minecraft:birch_slab"
  | "minecraft:jungle_slab"
  | "minecraft:acacia_slab"
  | "minecraft:dark_oak_slab"
  | "minecraft:mangrove_slab"
  | "minecraft:crimson_slab"
  | "minecraft:warped_slab"
  | "minecraft:stone_slab"
  | "minecraft:smooth_stone_slab"
  | "minecraft:sandstone_slab"
  | "minecraft:cut_sandstone_slab"
  | "minecraft:petrified_oak_slab"
  | "minecraft:cobblestone_slab"
  | "minecraft:brick_slab"
  | "minecraft:stone_brick_slab"
  | "minecraft:mud_brick_slab"
  | "minecraft:nether_brick_slab"
  | "minecraft:quartz_slab"
  | "minecraft:red_sandstone_slab"
  | "minecraft:cut_red_sandstone_slab"
  | "minecraft:purpur_slab"
  | "minecraft:prismarine_slab"
  | "minecraft:prismarine_brick_slab"
  | "minecraft:dark_prismarine_slab"
  | "minecraft:smooth_quartz"
  | "minecraft:smooth_red_sandstone"
  | "minecraft:smooth_sandstone"
  | "minecraft:smooth_stone"
  | "minecraft:bricks"
  | "minecraft:bookshelf"
  | "minecraft:mossy_cobblestone"
  | "minecraft:obsidian"
  | "minecraft:torch"
  | "minecraft:end_rod"
  | "minecraft:chorus_plant"
  | "minecraft:chorus_flower"
  | "minecraft:purpur_block"
  | "minecraft:purpur_pillar"
  | "minecraft:purpur_stairs"
  | "minecraft:spawner"
  | "minecraft:chest"
  | "minecraft:crafting_table"
  | "minecraft:farmland"
  | "minecraft:furnace"
  | "minecraft:ladder"
  | "minecraft:cobblestone_stairs"
  | "minecraft:snow"
  | "minecraft:ice"
  | "minecraft:snow_block"
  | "minecraft:cactus"
  | "minecraft:clay"
  | "minecraft:jukebox"
  | "minecraft:oak_fence"
  | "minecraft:spruce_fence"
  | "minecraft:birch_fence"
  | "minecraft:jungle_fence"
  | "minecraft:acacia_fence"
  | "minecraft:dark_oak_fence"
  | "minecraft:mangrove_fence"
  | "minecraft:crimson_fence"
  | "minecraft:warped_fence"
  | "minecraft:pumpkin"
  | "minecraft:carved_pumpkin"
  | "minecraft:jack_o_lantern"
  | "minecraft:netherrack"
  | "minecraft:soul_sand"
  | "minecraft:soul_soil"
  | "minecraft:basalt"
  | "minecraft:polished_basalt"
  | "minecraft:smooth_basalt"
  | "minecraft:soul_torch"
  | "minecraft:glowstone"
  | "minecraft:infested_stone"
  | "minecraft:infested_cobblestone"
  | "minecraft:infested_stone_bricks"
  | "minecraft:infested_mossy_stone_bricks"
  | "minecraft:infested_cracked_stone_bricks"
  | "minecraft:infested_chiseled_stone_bricks"
  | "minecraft:infested_deepslate"
  | "minecraft:stone_bricks"
  | "minecraft:mossy_stone_bricks"
  | "minecraft:cracked_stone_bricks"
  | "minecraft:chiseled_stone_bricks"
  | "minecraft:packed_mud"
  | "minecraft:mud_bricks"
  | "minecraft:deepslate_bricks"
  | "minecraft:cracked_deepslate_bricks"
  | "minecraft:deepslate_tiles"
  | "minecraft:cracked_deepslate_tiles"
  | "minecraft:chiseled_deepslate"
  | "minecraft:reinforced_deepslate"
  | "minecraft:brown_mushroom_block"
  | "minecraft:red_mushroom_block"
  | "minecraft:mushroom_stem"
  | "minecraft:iron_bars"
  | "minecraft:chain"
  | "minecraft:glass_pane"
  | "minecraft:melon"
  | "minecraft:vine"
  | "minecraft:glow_lichen"
  | "minecraft:brick_stairs"
  | "minecraft:stone_brick_stairs"
  | "minecraft:mud_brick_stairs"
  | "minecraft:mycelium"
  | "minecraft:lily_pad"
  | "minecraft:nether_bricks"
  | "minecraft:cracked_nether_bricks"
  | "minecraft:chiseled_nether_bricks"
  | "minecraft:nether_brick_fence"
  | "minecraft:nether_brick_stairs"
  | "minecraft:sculk"
  | "minecraft:sculk_vein"
  | "minecraft:sculk_catalyst"
  | "minecraft:sculk_shrieker"
  | "minecraft:enchanting_table"
  | "minecraft:end_portal_frame"
  | "minecraft:end_stone"
  | "minecraft:end_stone_bricks"
  | "minecraft:dragon_egg"
  | "minecraft:sandstone_stairs"
  | "minecraft:ender_chest"
  | "minecraft:emerald_block"
  | "minecraft:oak_stairs"
  | "minecraft:spruce_stairs"
  | "minecraft:birch_stairs"
  | "minecraft:jungle_stairs"
  | "minecraft:acacia_stairs"
  | "minecraft:dark_oak_stairs"
  | "minecraft:mangrove_stairs"
  | "minecraft:crimson_stairs"
  | "minecraft:warped_stairs"
  | "minecraft:command_block"
  | "minecraft:beacon"
  | "minecraft:cobblestone_wall"
  | "minecraft:mossy_cobblestone_wall"
  | "minecraft:brick_wall"
  | "minecraft:prismarine_wall"
  | "minecraft:red_sandstone_wall"
  | "minecraft:mossy_stone_brick_wall"
  | "minecraft:granite_wall"
  | "minecraft:stone_brick_wall"
  | "minecraft:mud_brick_wall"
  | "minecraft:nether_brick_wall"
  | "minecraft:andesite_wall"
  | "minecraft:red_nether_brick_wall"
  | "minecraft:sandstone_wall"
  | "minecraft:end_stone_brick_wall"
  | "minecraft:diorite_wall"
  | "minecraft:blackstone_wall"
  | "minecraft:polished_blackstone_wall"
  | "minecraft:polished_blackstone_brick_wall"
  | "minecraft:cobbled_deepslate_wall"
  | "minecraft:polished_deepslate_wall"
  | "minecraft:deepslate_brick_wall"
  | "minecraft:deepslate_tile_wall"
  | "minecraft:anvil"
  | "minecraft:chipped_anvil"
  | "minecraft:damaged_anvil"
  | "minecraft:chiseled_quartz_block"
  | "minecraft:quartz_block"
  | "minecraft:quartz_bricks"
  | "minecraft:quartz_pillar"
  | "minecraft:quartz_stairs"
  | "minecraft:white_terracotta"
  | "minecraft:orange_terracotta"
  | "minecraft:magenta_terracotta"
  | "minecraft:light_blue_terracotta"
  | "minecraft:yellow_terracotta"
  | "minecraft:lime_terracotta"
  | "minecraft:pink_terracotta"
  | "minecraft:gray_terracotta"
  | "minecraft:light_gray_terracotta"
  | "minecraft:cyan_terracotta"
  | "minecraft:purple_terracotta"
  | "minecraft:blue_terracotta"
  | "minecraft:brown_terracotta"
  | "minecraft:green_terracotta"
  | "minecraft:red_terracotta"
  | "minecraft:black_terracotta"
  | "minecraft:barrier"
  | "minecraft:light"
  | "minecraft:hay_block"
  | "minecraft:white_carpet"
  | "minecraft:orange_carpet"
  | "minecraft:magenta_carpet"
  | "minecraft:light_blue_carpet"
  | "minecraft:yellow_carpet"
  | "minecraft:lime_carpet"
  | "minecraft:pink_carpet"
  | "minecraft:gray_carpet"
  | "minecraft:light_gray_carpet"
  | "minecraft:cyan_carpet"
  | "minecraft:purple_carpet"
  | "minecraft:blue_carpet"
  | "minecraft:brown_carpet"
  | "minecraft:green_carpet"
  | "minecraft:red_carpet"
  | "minecraft:black_carpet"
  | "minecraft:terracotta"
  | "minecraft:packed_ice"
  | "minecraft:dirt_path"
  | "minecraft:sunflower"
  | "minecraft:lilac"
  | "minecraft:rose_bush"
  | "minecraft:peony"
  | "minecraft:tall_grass"
  | "minecraft:large_fern"
  | "minecraft:white_stained_glass"
  | "minecraft:orange_stained_glass"
  | "minecraft:magenta_stained_glass"
  | "minecraft:light_blue_stained_glass"
  | "minecraft:yellow_stained_glass"
  | "minecraft:lime_stained_glass"
  | "minecraft:pink_stained_glass"
  | "minecraft:gray_stained_glass"
  | "minecraft:light_gray_stained_glass"
  | "minecraft:cyan_stained_glass"
  | "minecraft:purple_stained_glass"
  | "minecraft:blue_stained_glass"
  | "minecraft:brown_stained_glass"
  | "minecraft:green_stained_glass"
  | "minecraft:red_stained_glass"
  | "minecraft:black_stained_glass"
  | "minecraft:white_stained_glass_pane"
  | "minecraft:orange_stained_glass_pane"
  | "minecraft:magenta_stained_glass_pane"
  | "minecraft:light_blue_stained_glass_pane"
  | "minecraft:yellow_stained_glass_pane"
  | "minecraft:lime_stained_glass_pane"
  | "minecraft:pink_stained_glass_pane"
  | "minecraft:gray_stained_glass_pane"
  | "minecraft:light_gray_stained_glass_pane"
  | "minecraft:cyan_stained_glass_pane"
  | "minecraft:purple_stained_glass_pane"
  | "minecraft:blue_stained_glass_pane"
  | "minecraft:brown_stained_glass_pane"
  | "minecraft:green_stained_glass_pane"
  | "minecraft:red_stained_glass_pane"
  | "minecraft:black_stained_glass_pane"
  | "minecraft:prismarine"
  | "minecraft:prismarine_bricks"
  | "minecraft:dark_prismarine"
  | "minecraft:prismarine_stairs"
  | "minecraft:prismarine_brick_stairs"
  | "minecraft:dark_prismarine_stairs"
  | "minecraft:sea_lantern"
  | "minecraft:red_sandstone"
  | "minecraft:chiseled_red_sandstone"
  | "minecraft:cut_red_sandstone"
  | "minecraft:red_sandstone_stairs"
  | "minecraft:repeating_command_block"
  | "minecraft:chain_command_block"
  | "minecraft:magma_block"
  | "minecraft:nether_wart_block"
  | "minecraft:warped_wart_block"
  | "minecraft:red_nether_bricks"
  | "minecraft:bone_block"
  | "minecraft:structure_void"
  | "minecraft:shulker_box"
  | "minecraft:white_shulker_box"
  | "minecraft:orange_shulker_box"
  | "minecraft:magenta_shulker_box"
  | "minecraft:light_blue_shulker_box"
  | "minecraft:yellow_shulker_box"
  | "minecraft:lime_shulker_box"
  | "minecraft:pink_shulker_box"
  | "minecraft:gray_shulker_box"
  | "minecraft:light_gray_shulker_box"
  | "minecraft:cyan_shulker_box"
  | "minecraft:purple_shulker_box"
  | "minecraft:blue_shulker_box"
  | "minecraft:brown_shulker_box"
  | "minecraft:green_shulker_box"
  | "minecraft:red_shulker_box"
  | "minecraft:black_shulker_box"
  | "minecraft:white_glazed_terracotta"
  | "minecraft:orange_glazed_terracotta"
  | "minecraft:magenta_glazed_terracotta"
  | "minecraft:light_blue_glazed_terracotta"
  | "minecraft:yellow_glazed_terracotta"
  | "minecraft:lime_glazed_terracotta"
  | "minecraft:pink_glazed_terracotta"
  | "minecraft:gray_glazed_terracotta"
  | "minecraft:light_gray_glazed_terracotta"
  | "minecraft:cyan_glazed_terracotta"
  | "minecraft:purple_glazed_terracotta"
  | "minecraft:blue_glazed_terracotta"
  | "minecraft:brown_glazed_terracotta"
  | "minecraft:green_glazed_terracotta"
  | "minecraft:red_glazed_terracotta"
  | "minecraft:black_glazed_terracotta"
  | "minecraft:white_concrete"
  | "minecraft:orange_concrete"
  | "minecraft:magenta_concrete"
  | "minecraft:light_blue_concrete"
  | "minecraft:yellow_concrete"
  | "minecraft:lime_concrete"
  | "minecraft:pink_concrete"
  | "minecraft:gray_concrete"
  | "minecraft:light_gray_concrete"
  | "minecraft:cyan_concrete"
  | "minecraft:purple_concrete"
  | "minecraft:blue_concrete"
  | "minecraft:brown_concrete"
  | "minecraft:green_concrete"
  | "minecraft:red_concrete"
  | "minecraft:black_concrete"
  | "minecraft:white_concrete_powder"
  | "minecraft:orange_concrete_powder"
  | "minecraft:magenta_concrete_powder"
  | "minecraft:light_blue_concrete_powder"
  | "minecraft:yellow_concrete_powder"
  | "minecraft:lime_concrete_powder"
  | "minecraft:pink_concrete_powder"
  | "minecraft:gray_concrete_powder"
  | "minecraft:light_gray_concrete_powder"
  | "minecraft:cyan_concrete_powder"
  | "minecraft:purple_concrete_powder"
  | "minecraft:blue_concrete_powder"
  | "minecraft:brown_concrete_powder"
  | "minecraft:green_concrete_powder"
  | "minecraft:red_concrete_powder"
  | "minecraft:black_concrete_powder"
  | "minecraft:turtle_egg"
  | "minecraft:dead_tube_coral_block"
  | "minecraft:dead_brain_coral_block"
  | "minecraft:dead_bubble_coral_block"
  | "minecraft:dead_fire_coral_block"
  | "minecraft:dead_horn_coral_block"
  | "minecraft:tube_coral_block"
  | "minecraft:brain_coral_block"
  | "minecraft:bubble_coral_block"
  | "minecraft:fire_coral_block"
  | "minecraft:horn_coral_block"
  | "minecraft:tube_coral"
  | "minecraft:brain_coral"
  | "minecraft:bubble_coral"
  | "minecraft:fire_coral"
  | "minecraft:horn_coral"
  | "minecraft:dead_brain_coral"
  | "minecraft:dead_bubble_coral"
  | "minecraft:dead_fire_coral"
  | "minecraft:dead_horn_coral"
  | "minecraft:dead_tube_coral"
  | "minecraft:tube_coral_fan"
  | "minecraft:brain_coral_fan"
  | "minecraft:bubble_coral_fan"
  | "minecraft:fire_coral_fan"
  | "minecraft:horn_coral_fan"
  | "minecraft:dead_tube_coral_fan"
  | "minecraft:dead_brain_coral_fan"
  | "minecraft:dead_bubble_coral_fan"
  | "minecraft:dead_fire_coral_fan"
  | "minecraft:dead_horn_coral_fan"
  | "minecraft:blue_ice"
  | "minecraft:conduit"
  | "minecraft:polished_granite_stairs"
  | "minecraft:smooth_red_sandstone_stairs"
  | "minecraft:mossy_stone_brick_stairs"
  | "minecraft:polished_diorite_stairs"
  | "minecraft:mossy_cobblestone_stairs"
  | "minecraft:end_stone_brick_stairs"
  | "minecraft:stone_stairs"
  | "minecraft:smooth_sandstone_stairs"
  | "minecraft:smooth_quartz_stairs"
  | "minecraft:granite_stairs"
  | "minecraft:andesite_stairs"
  | "minecraft:red_nether_brick_stairs"
  | "minecraft:polished_andesite_stairs"
  | "minecraft:diorite_stairs"
  | "minecraft:cobbled_deepslate_stairs"
  | "minecraft:polished_deepslate_stairs"
  | "minecraft:deepslate_brick_stairs"
  | "minecraft:deepslate_tile_stairs"
  | "minecraft:polished_granite_slab"
  | "minecraft:smooth_red_sandstone_slab"
  | "minecraft:mossy_stone_brick_slab"
  | "minecraft:polished_diorite_slab"
  | "minecraft:mossy_cobblestone_slab"
  | "minecraft:end_stone_brick_slab"
  | "minecraft:smooth_sandstone_slab"
  | "minecraft:smooth_quartz_slab"
  | "minecraft:granite_slab"
  | "minecraft:andesite_slab"
  | "minecraft:red_nether_brick_slab"
  | "minecraft:polished_andesite_slab"
  | "minecraft:diorite_slab"
  | "minecraft:cobbled_deepslate_slab"
  | "minecraft:polished_deepslate_slab"
  | "minecraft:deepslate_brick_slab"
  | "minecraft:deepslate_tile_slab"
  | "minecraft:scaffolding"
  | "minecraft:redstone"
  | "minecraft:redstone_torch"
  | "minecraft:redstone_block"
  | "minecraft:repeater"
  | "minecraft:comparator"
  | "minecraft:piston"
  | "minecraft:sticky_piston"
  | "minecraft:slime_block"
  | "minecraft:honey_block"
  | "minecraft:observer"
  | "minecraft:hopper"
  | "minecraft:dispenser"
  | "minecraft:dropper"
  | "minecraft:lectern"
  | "minecraft:target"
  | "minecraft:lever"
  | "minecraft:lightning_rod"
  | "minecraft:daylight_detector"
  | "minecraft:sculk_sensor"
  | "minecraft:tripwire_hook"
  | "minecraft:trapped_chest"
  | "minecraft:tnt"
  | "minecraft:redstone_lamp"
  | "minecraft:note_block"
  | "minecraft:stone_button"
  | "minecraft:polished_blackstone_button"
  | "minecraft:oak_button"
  | "minecraft:spruce_button"
  | "minecraft:birch_button"
  | "minecraft:jungle_button"
  | "minecraft:acacia_button"
  | "minecraft:dark_oak_button"
  | "minecraft:mangrove_button"
  | "minecraft:crimson_button"
  | "minecraft:warped_button"
  | "minecraft:stone_pressure_plate"
  | "minecraft:polished_blackstone_pressure_plate"
  | "minecraft:light_weighted_pressure_plate"
  | "minecraft:heavy_weighted_pressure_plate"
  | "minecraft:oak_pressure_plate"
  | "minecraft:spruce_pressure_plate"
  | "minecraft:birch_pressure_plate"
  | "minecraft:jungle_pressure_plate"
  | "minecraft:acacia_pressure_plate"
  | "minecraft:dark_oak_pressure_plate"
  | "minecraft:mangrove_pressure_plate"
  | "minecraft:crimson_pressure_plate"
  | "minecraft:warped_pressure_plate"
  | "minecraft:iron_door"
  | "minecraft:oak_door"
  | "minecraft:spruce_door"
  | "minecraft:birch_door"
  | "minecraft:jungle_door"
  | "minecraft:acacia_door"
  | "minecraft:dark_oak_door"
  | "minecraft:mangrove_door"
  | "minecraft:crimson_door"
  | "minecraft:warped_door"
  | "minecraft:iron_trapdoor"
  | "minecraft:oak_trapdoor"
  | "minecraft:spruce_trapdoor"
  | "minecraft:birch_trapdoor"
  | "minecraft:jungle_trapdoor"
  | "minecraft:acacia_trapdoor"
  | "minecraft:dark_oak_trapdoor"
  | "minecraft:mangrove_trapdoor"
  | "minecraft:crimson_trapdoor"
  | "minecraft:warped_trapdoor"
  | "minecraft:oak_fence_gate"
  | "minecraft:spruce_fence_gate"
  | "minecraft:birch_fence_gate"
  | "minecraft:jungle_fence_gate"
  | "minecraft:acacia_fence_gate"
  | "minecraft:dark_oak_fence_gate"
  | "minecraft:mangrove_fence_gate"
  | "minecraft:crimson_fence_gate"
  | "minecraft:warped_fence_gate"
  | "minecraft:powered_rail"
  | "minecraft:detector_rail"
  | "minecraft:rail"
  | "minecraft:activator_rail"
  | "minecraft:saddle"
  | "minecraft:minecart"
  | "minecraft:chest_minecart"
  | "minecraft:furnace_minecart"
  | "minecraft:tnt_minecart"
  | "minecraft:hopper_minecart"
  | "minecraft:carrot_on_a_stick"
  | "minecraft:warped_fungus_on_a_stick"
  | "minecraft:elytra"
  | "minecraft:oak_boat"
  | "minecraft:oak_chest_boat"
  | "minecraft:spruce_boat"
  | "minecraft:spruce_chest_boat"
  | "minecraft:birch_boat"
  | "minecraft:birch_chest_boat"
  | "minecraft:jungle_boat"
  | "minecraft:jungle_chest_boat"
  | "minecraft:acacia_boat"
  | "minecraft:acacia_chest_boat"
  | "minecraft:dark_oak_boat"
  | "minecraft:dark_oak_chest_boat"
  | "minecraft:mangrove_boat"
  | "minecraft:mangrove_chest_boat"
  | "minecraft:structure_block"
  | "minecraft:jigsaw"
  | "minecraft:turtle_helmet"
  | "minecraft:scute"
  | "minecraft:flint_and_steel"
  | "minecraft:apple"
  | "minecraft:bow"
  | "minecraft:arrow"
  | "minecraft:coal"
  | "minecraft:charcoal"
  | "minecraft:diamond"
  | "minecraft:emerald"
  | "minecraft:lapis_lazuli"
  | "minecraft:quartz"
  | "minecraft:amethyst_shard"
  | "minecraft:raw_iron"
  | "minecraft:iron_ingot"
  | "minecraft:raw_copper"
  | "minecraft:copper_ingot"
  | "minecraft:raw_gold"
  | "minecraft:gold_ingot"
  | "minecraft:netherite_ingot"
  | "minecraft:netherite_scrap"
  | "minecraft:wooden_sword"
  | "minecraft:wooden_shovel"
  | "minecraft:wooden_pickaxe"
  | "minecraft:wooden_axe"
  | "minecraft:wooden_hoe"
  | "minecraft:stone_sword"
  | "minecraft:stone_shovel"
  | "minecraft:stone_pickaxe"
  | "minecraft:stone_axe"
  | "minecraft:stone_hoe"
  | "minecraft:golden_sword"
  | "minecraft:golden_shovel"
  | "minecraft:golden_pickaxe"
  | "minecraft:golden_axe"
  | "minecraft:golden_hoe"
  | "minecraft:iron_sword"
  | "minecraft:iron_shovel"
  | "minecraft:iron_pickaxe"
  | "minecraft:iron_axe"
  | "minecraft:iron_hoe"
  | "minecraft:diamond_sword"
  | "minecraft:diamond_shovel"
  | "minecraft:diamond_pickaxe"
  | "minecraft:diamond_axe"
  | "minecraft:diamond_hoe"
  | "minecraft:netherite_sword"
  | "minecraft:netherite_shovel"
  | "minecraft:netherite_pickaxe"
  | "minecraft:netherite_axe"
  | "minecraft:netherite_hoe"
  | "minecraft:stick"
  | "minecraft:bowl"
  | "minecraft:mushroom_stew"
  | "minecraft:string"
  | "minecraft:feather"
  | "minecraft:gunpowder"
  | "minecraft:wheat_seeds"
  | "minecraft:wheat"
  | "minecraft:bread"
  | "minecraft:leather_helmet"
  | "minecraft:leather_chestplate"
  | "minecraft:leather_leggings"
  | "minecraft:leather_boots"
  | "minecraft:chainmail_helmet"
  | "minecraft:chainmail_chestplate"
  | "minecraft:chainmail_leggings"
  | "minecraft:chainmail_boots"
  | "minecraft:iron_helmet"
  | "minecraft:iron_chestplate"
  | "minecraft:iron_leggings"
  | "minecraft:iron_boots"
  | "minecraft:diamond_helmet"
  | "minecraft:diamond_chestplate"
  | "minecraft:diamond_leggings"
  | "minecraft:diamond_boots"
  | "minecraft:golden_helmet"
  | "minecraft:golden_chestplate"
  | "minecraft:golden_leggings"
  | "minecraft:golden_boots"
  | "minecraft:netherite_helmet"
  | "minecraft:netherite_chestplate"
  | "minecraft:netherite_leggings"
  | "minecraft:netherite_boots"
  | "minecraft:flint"
  | "minecraft:porkchop"
  | "minecraft:cooked_porkchop"
  | "minecraft:painting"
  | "minecraft:golden_apple"
  | "minecraft:enchanted_golden_apple"
  | "minecraft:oak_sign"
  | "minecraft:spruce_sign"
  | "minecraft:birch_sign"
  | "minecraft:jungle_sign"
  | "minecraft:acacia_sign"
  | "minecraft:dark_oak_sign"
  | "minecraft:mangrove_sign"
  | "minecraft:crimson_sign"
  | "minecraft:warped_sign"
  | "minecraft:bucket"
  | "minecraft:water_bucket"
  | "minecraft:lava_bucket"
  | "minecraft:powder_snow_bucket"
  | "minecraft:snowball"
  | "minecraft:leather"
  | "minecraft:milk_bucket"
  | "minecraft:pufferfish_bucket"
  | "minecraft:salmon_bucket"
  | "minecraft:cod_bucket"
  | "minecraft:tropical_fish_bucket"
  | "minecraft:axolotl_bucket"
  | "minecraft:tadpole_bucket"
  | "minecraft:brick"
  | "minecraft:clay_ball"
  | "minecraft:dried_kelp_block"
  | "minecraft:paper"
  | "minecraft:book"
  | "minecraft:slime_ball"
  | "minecraft:egg"
  | "minecraft:compass"
  | "minecraft:recovery_compass"
  | "minecraft:bundle"
  | "minecraft:fishing_rod"
  | "minecraft:clock"
  | "minecraft:spyglass"
  | "minecraft:glowstone_dust"
  | "minecraft:cod"
  | "minecraft:salmon"
  | "minecraft:tropical_fish"
  | "minecraft:pufferfish"
  | "minecraft:cooked_cod"
  | "minecraft:cooked_salmon"
  | "minecraft:ink_sac"
  | "minecraft:glow_ink_sac"
  | "minecraft:cocoa_beans"
  | "minecraft:white_dye"
  | "minecraft:orange_dye"
  | "minecraft:magenta_dye"
  | "minecraft:light_blue_dye"
  | "minecraft:yellow_dye"
  | "minecraft:lime_dye"
  | "minecraft:pink_dye"
  | "minecraft:gray_dye"
  | "minecraft:light_gray_dye"
  | "minecraft:cyan_dye"
  | "minecraft:purple_dye"
  | "minecraft:blue_dye"
  | "minecraft:brown_dye"
  | "minecraft:green_dye"
  | "minecraft:red_dye"
  | "minecraft:black_dye"
  | "minecraft:bone_meal"
  | "minecraft:bone"
  | "minecraft:sugar"
  | "minecraft:cake"
  | "minecraft:white_bed"
  | "minecraft:orange_bed"
  | "minecraft:magenta_bed"
  | "minecraft:light_blue_bed"
  | "minecraft:yellow_bed"
  | "minecraft:lime_bed"
  | "minecraft:pink_bed"
  | "minecraft:gray_bed"
  | "minecraft:light_gray_bed"
  | "minecraft:cyan_bed"
  | "minecraft:purple_bed"
  | "minecraft:blue_bed"
  | "minecraft:brown_bed"
  | "minecraft:green_bed"
  | "minecraft:red_bed"
  | "minecraft:black_bed"
  | "minecraft:cookie"
  | "minecraft:filled_map"
  | "minecraft:shears"
  | "minecraft:melon_slice"
  | "minecraft:dried_kelp"
  | "minecraft:pumpkin_seeds"
  | "minecraft:melon_seeds"
  | "minecraft:beef"
  | "minecraft:cooked_beef"
  | "minecraft:chicken"
  | "minecraft:cooked_chicken"
  | "minecraft:rotten_flesh"
  | "minecraft:ender_pearl"
  | "minecraft:blaze_rod"
  | "minecraft:ghast_tear"
  | "minecraft:gold_nugget"
  | "minecraft:nether_wart"
  | "minecraft:potion"
  | "minecraft:glass_bottle"
  | "minecraft:spider_eye"
  | "minecraft:fermented_spider_eye"
  | "minecraft:blaze_powder"
  | "minecraft:magma_cream"
  | "minecraft:brewing_stand"
  | "minecraft:cauldron"
  | "minecraft:ender_eye"
  | "minecraft:glistering_melon_slice"
  | "minecraft:allay_spawn_egg"
  | "minecraft:axolotl_spawn_egg"
  | "minecraft:bat_spawn_egg"
  | "minecraft:bee_spawn_egg"
  | "minecraft:blaze_spawn_egg"
  | "minecraft:cat_spawn_egg"
  | "minecraft:cave_spider_spawn_egg"
  | "minecraft:chicken_spawn_egg"
  | "minecraft:cod_spawn_egg"
  | "minecraft:cow_spawn_egg"
  | "minecraft:creeper_spawn_egg"
  | "minecraft:dolphin_spawn_egg"
  | "minecraft:donkey_spawn_egg"
  | "minecraft:drowned_spawn_egg"
  | "minecraft:elder_guardian_spawn_egg"
  | "minecraft:enderman_spawn_egg"
  | "minecraft:endermite_spawn_egg"
  | "minecraft:evoker_spawn_egg"
  | "minecraft:fox_spawn_egg"
  | "minecraft:frog_spawn_egg"
  | "minecraft:ghast_spawn_egg"
  | "minecraft:glow_squid_spawn_egg"
  | "minecraft:goat_spawn_egg"
  | "minecraft:guardian_spawn_egg"
  | "minecraft:hoglin_spawn_egg"
  | "minecraft:horse_spawn_egg"
  | "minecraft:husk_spawn_egg"
  | "minecraft:llama_spawn_egg"
  | "minecraft:magma_cube_spawn_egg"
  | "minecraft:mooshroom_spawn_egg"
  | "minecraft:mule_spawn_egg"
  | "minecraft:ocelot_spawn_egg"
  | "minecraft:panda_spawn_egg"
  | "minecraft:parrot_spawn_egg"
  | "minecraft:phantom_spawn_egg"
  | "minecraft:pig_spawn_egg"
  | "minecraft:piglin_spawn_egg"
  | "minecraft:piglin_brute_spawn_egg"
  | "minecraft:pillager_spawn_egg"
  | "minecraft:polar_bear_spawn_egg"
  | "minecraft:pufferfish_spawn_egg"
  | "minecraft:rabbit_spawn_egg"
  | "minecraft:ravager_spawn_egg"
  | "minecraft:salmon_spawn_egg"
  | "minecraft:sheep_spawn_egg"
  | "minecraft:shulker_spawn_egg"
  | "minecraft:silverfish_spawn_egg"
  | "minecraft:skeleton_spawn_egg"
  | "minecraft:skeleton_horse_spawn_egg"
  | "minecraft:slime_spawn_egg"
  | "minecraft:spider_spawn_egg"
  | "minecraft:squid_spawn_egg"
  | "minecraft:stray_spawn_egg"
  | "minecraft:strider_spawn_egg"
  | "minecraft:tadpole_spawn_egg"
  | "minecraft:trader_llama_spawn_egg"
  | "minecraft:tropical_fish_spawn_egg"
  | "minecraft:turtle_spawn_egg"
  | "minecraft:vex_spawn_egg"
  | "minecraft:villager_spawn_egg"
  | "minecraft:vindicator_spawn_egg"
  | "minecraft:wandering_trader_spawn_egg"
  | "minecraft:warden_spawn_egg"
  | "minecraft:witch_spawn_egg"
  | "minecraft:wither_skeleton_spawn_egg"
  | "minecraft:wolf_spawn_egg"
  | "minecraft:zoglin_spawn_egg"
  | "minecraft:zombie_spawn_egg"
  | "minecraft:zombie_horse_spawn_egg"
  | "minecraft:zombie_villager_spawn_egg"
  | "minecraft:zombified_piglin_spawn_egg"
  | "minecraft:experience_bottle"
  | "minecraft:fire_charge"
  | "minecraft:writable_book"
  | "minecraft:written_book"
  | "minecraft:item_frame"
  | "minecraft:glow_item_frame"
  | "minecraft:flower_pot"
  | "minecraft:carrot"
  | "minecraft:potato"
  | "minecraft:baked_potato"
  | "minecraft:poisonous_potato"
  | "minecraft:map"
  | "minecraft:golden_carrot"
  | "minecraft:skeleton_skull"
  | "minecraft:wither_skeleton_skull"
  | "minecraft:player_head"
  | "minecraft:zombie_head"
  | "minecraft:creeper_head"
  | "minecraft:dragon_head"
  | "minecraft:nether_star"
  | "minecraft:pumpkin_pie"
  | "minecraft:firework_rocket"
  | "minecraft:firework_star"
  | "minecraft:enchanted_book"
  | "minecraft:nether_brick"
  | "minecraft:prismarine_shard"
  | "minecraft:prismarine_crystals"
  | "minecraft:rabbit"
  | "minecraft:cooked_rabbit"
  | "minecraft:rabbit_stew"
  | "minecraft:rabbit_foot"
  | "minecraft:rabbit_hide"
  | "minecraft:armor_stand"
  | "minecraft:iron_horse_armor"
  | "minecraft:golden_horse_armor"
  | "minecraft:diamond_horse_armor"
  | "minecraft:leather_horse_armor"
  | "minecraft:lead"
  | "minecraft:name_tag"
  | "minecraft:command_block_minecart"
  | "minecraft:mutton"
  | "minecraft:cooked_mutton"
  | "minecraft:white_banner"
  | "minecraft:orange_banner"
  | "minecraft:magenta_banner"
  | "minecraft:light_blue_banner"
  | "minecraft:yellow_banner"
  | "minecraft:lime_banner"
  | "minecraft:pink_banner"
  | "minecraft:gray_banner"
  | "minecraft:light_gray_banner"
  | "minecraft:cyan_banner"
  | "minecraft:purple_banner"
  | "minecraft:blue_banner"
  | "minecraft:brown_banner"
  | "minecraft:green_banner"
  | "minecraft:red_banner"
  | "minecraft:black_banner"
  | "minecraft:end_crystal"
  | "minecraft:chorus_fruit"
  | "minecraft:popped_chorus_fruit"
  | "minecraft:beetroot"
  | "minecraft:beetroot_seeds"
  | "minecraft:beetroot_soup"
  | "minecraft:dragon_breath"
  | "minecraft:splash_potion"
  | "minecraft:spectral_arrow"
  | "minecraft:tipped_arrow"
  | "minecraft:lingering_potion"
  | "minecraft:shield"
  | "minecraft:totem_of_undying"
  | "minecraft:shulker_shell"
  | "minecraft:iron_nugget"
  | "minecraft:knowledge_book"
  | "minecraft:debug_stick"
  | "minecraft:music_disc_13"
  | "minecraft:music_disc_cat"
  | "minecraft:music_disc_blocks"
  | "minecraft:music_disc_chirp"
  | "minecraft:music_disc_far"
  | "minecraft:music_disc_mall"
  | "minecraft:music_disc_mellohi"
  | "minecraft:music_disc_stal"
  | "minecraft:music_disc_strad"
  | "minecraft:music_disc_ward"
  | "minecraft:music_disc_11"
  | "minecraft:music_disc_wait"
  | "minecraft:music_disc_otherside"
  | "minecraft:music_disc_5"
  | "minecraft:music_disc_pigstep"
  | "minecraft:disc_fragment_5"
  | "minecraft:trident"
  | "minecraft:phantom_membrane"
  | "minecraft:nautilus_shell"
  | "minecraft:heart_of_the_sea"
  | "minecraft:crossbow"
  | "minecraft:suspicious_stew"
  | "minecraft:loom"
  | "minecraft:flower_banner_pattern"
  | "minecraft:creeper_banner_pattern"
  | "minecraft:skull_banner_pattern"
  | "minecraft:mojang_banner_pattern"
  | "minecraft:globe_banner_pattern"
  | "minecraft:piglin_banner_pattern"
  | "minecraft:goat_horn"
  | "minecraft:composter"
  | "minecraft:barrel"
  | "minecraft:smoker"
  | "minecraft:blast_furnace"
  | "minecraft:cartography_table"
  | "minecraft:fletching_table"
  | "minecraft:grindstone"
  | "minecraft:smithing_table"
  | "minecraft:stonecutter"
  | "minecraft:bell"
  | "minecraft:lantern"
  | "minecraft:soul_lantern"
  | "minecraft:sweet_berries"
  | "minecraft:glow_berries"
  | "minecraft:campfire"
  | "minecraft:soul_campfire"
  | "minecraft:shroomlight"
  | "minecraft:honeycomb"
  | "minecraft:bee_nest"
  | "minecraft:beehive"
  | "minecraft:honey_bottle"
  | "minecraft:honeycomb_block"
  | "minecraft:lodestone"
  | "minecraft:crying_obsidian"
  | "minecraft:blackstone"
  | "minecraft:blackstone_slab"
  | "minecraft:blackstone_stairs"
  | "minecraft:gilded_blackstone"
  | "minecraft:polished_blackstone"
  | "minecraft:polished_blackstone_slab"
  | "minecraft:polished_blackstone_stairs"
  | "minecraft:chiseled_polished_blackstone"
  | "minecraft:polished_blackstone_bricks"
  | "minecraft:polished_blackstone_brick_slab"
  | "minecraft:polished_blackstone_brick_stairs"
  | "minecraft:cracked_polished_blackstone_bricks"
  | "minecraft:respawn_anchor"
  | "minecraft:candle"
  | "minecraft:white_candle"
  | "minecraft:orange_candle"
  | "minecraft:magenta_candle"
  | "minecraft:light_blue_candle"
  | "minecraft:yellow_candle"
  | "minecraft:lime_candle"
  | "minecraft:pink_candle"
  | "minecraft:gray_candle"
  | "minecraft:light_gray_candle"
  | "minecraft:cyan_candle"
  | "minecraft:purple_candle"
  | "minecraft:blue_candle"
  | "minecraft:brown_candle"
  | "minecraft:green_candle"
  | "minecraft:red_candle"
  | "minecraft:black_candle"
  | "minecraft:small_amethyst_bud"
  | "minecraft:medium_amethyst_bud"
  | "minecraft:large_amethyst_bud"
  | "minecraft:amethyst_cluster"
  | "minecraft:pointed_dripstone"
  | "minecraft:ochre_froglight"
  | "minecraft:verdant_froglight"
  | "minecraft:pearlescent_froglight"
  | "minecraft:frogspawn"
  | "minecraft:echo_shard";

export const itemEnum = createEnumMapper<Item>(
  JSON.parse(
    `["minecraft:air","minecraft:stone","minecraft:granite","minecraft:polished_granite","minecraft:diorite","minecraft:polished_diorite","minecraft:andesite","minecraft:polished_andesite","minecraft:deepslate","minecraft:cobbled_deepslate","minecraft:polished_deepslate","minecraft:calcite","minecraft:tuff","minecraft:dripstone_block","minecraft:grass_block","minecraft:dirt","minecraft:coarse_dirt","minecraft:podzol","minecraft:rooted_dirt","minecraft:mud","minecraft:crimson_nylium","minecraft:warped_nylium","minecraft:cobblestone","minecraft:oak_planks","minecraft:spruce_planks","minecraft:birch_planks","minecraft:jungle_planks","minecraft:acacia_planks","minecraft:dark_oak_planks","minecraft:mangrove_planks","minecraft:crimson_planks","minecraft:warped_planks","minecraft:oak_sapling","minecraft:spruce_sapling","minecraft:birch_sapling","minecraft:jungle_sapling","minecraft:acacia_sapling","minecraft:dark_oak_sapling","minecraft:mangrove_propagule","minecraft:bedrock","minecraft:sand","minecraft:red_sand","minecraft:gravel","minecraft:coal_ore","minecraft:deepslate_coal_ore","minecraft:iron_ore","minecraft:deepslate_iron_ore","minecraft:copper_ore","minecraft:deepslate_copper_ore","minecraft:gold_ore","minecraft:deepslate_gold_ore","minecraft:redstone_ore","minecraft:deepslate_redstone_ore","minecraft:emerald_ore","minecraft:deepslate_emerald_ore","minecraft:lapis_ore","minecraft:deepslate_lapis_ore","minecraft:diamond_ore","minecraft:deepslate_diamond_ore","minecraft:nether_gold_ore","minecraft:nether_quartz_ore","minecraft:ancient_debris","minecraft:coal_block","minecraft:raw_iron_block","minecraft:raw_copper_block","minecraft:raw_gold_block","minecraft:amethyst_block","minecraft:budding_amethyst","minecraft:iron_block","minecraft:copper_block","minecraft:gold_block","minecraft:diamond_block","minecraft:netherite_block","minecraft:exposed_copper","minecraft:weathered_copper","minecraft:oxidized_copper","minecraft:cut_copper","minecraft:exposed_cut_copper","minecraft:weathered_cut_copper","minecraft:oxidized_cut_copper","minecraft:cut_copper_stairs","minecraft:exposed_cut_copper_stairs","minecraft:weathered_cut_copper_stairs","minecraft:oxidized_cut_copper_stairs","minecraft:cut_copper_slab","minecraft:exposed_cut_copper_slab","minecraft:weathered_cut_copper_slab","minecraft:oxidized_cut_copper_slab","minecraft:waxed_copper_block","minecraft:waxed_exposed_copper","minecraft:waxed_weathered_copper","minecraft:waxed_oxidized_copper","minecraft:waxed_cut_copper","minecraft:waxed_exposed_cut_copper","minecraft:waxed_weathered_cut_copper","minecraft:waxed_oxidized_cut_copper","minecraft:waxed_cut_copper_stairs","minecraft:waxed_exposed_cut_copper_stairs","minecraft:waxed_weathered_cut_copper_stairs","minecraft:waxed_oxidized_cut_copper_stairs","minecraft:waxed_cut_copper_slab","minecraft:waxed_exposed_cut_copper_slab","minecraft:waxed_weathered_cut_copper_slab","minecraft:waxed_oxidized_cut_copper_slab","minecraft:oak_log","minecraft:spruce_log","minecraft:birch_log","minecraft:jungle_log","minecraft:acacia_log","minecraft:dark_oak_log","minecraft:mangrove_log","minecraft:mangrove_roots","minecraft:muddy_mangrove_roots","minecraft:crimson_stem","minecraft:warped_stem","minecraft:stripped_oak_log","minecraft:stripped_spruce_log","minecraft:stripped_birch_log","minecraft:stripped_jungle_log","minecraft:stripped_acacia_log","minecraft:stripped_dark_oak_log","minecraft:stripped_mangrove_log","minecraft:stripped_crimson_stem","minecraft:stripped_warped_stem","minecraft:stripped_oak_wood","minecraft:stripped_spruce_wood","minecraft:stripped_birch_wood","minecraft:stripped_jungle_wood","minecraft:stripped_acacia_wood","minecraft:stripped_dark_oak_wood","minecraft:stripped_mangrove_wood","minecraft:stripped_crimson_hyphae","minecraft:stripped_warped_hyphae","minecraft:oak_wood","minecraft:spruce_wood","minecraft:birch_wood","minecraft:jungle_wood","minecraft:acacia_wood","minecraft:dark_oak_wood","minecraft:mangrove_wood","minecraft:crimson_hyphae","minecraft:warped_hyphae","minecraft:oak_leaves","minecraft:spruce_leaves","minecraft:birch_leaves","minecraft:jungle_leaves","minecraft:acacia_leaves","minecraft:dark_oak_leaves","minecraft:mangrove_leaves","minecraft:azalea_leaves","minecraft:flowering_azalea_leaves","minecraft:sponge","minecraft:wet_sponge","minecraft:glass","minecraft:tinted_glass","minecraft:lapis_block","minecraft:sandstone","minecraft:chiseled_sandstone","minecraft:cut_sandstone","minecraft:cobweb","minecraft:grass","minecraft:fern","minecraft:azalea","minecraft:flowering_azalea","minecraft:dead_bush","minecraft:seagrass","minecraft:sea_pickle","minecraft:white_wool","minecraft:orange_wool","minecraft:magenta_wool","minecraft:light_blue_wool","minecraft:yellow_wool","minecraft:lime_wool","minecraft:pink_wool","minecraft:gray_wool","minecraft:light_gray_wool","minecraft:cyan_wool","minecraft:purple_wool","minecraft:blue_wool","minecraft:brown_wool","minecraft:green_wool","minecraft:red_wool","minecraft:black_wool","minecraft:dandelion","minecraft:poppy","minecraft:blue_orchid","minecraft:allium","minecraft:azure_bluet","minecraft:red_tulip","minecraft:orange_tulip","minecraft:white_tulip","minecraft:pink_tulip","minecraft:oxeye_daisy","minecraft:cornflower","minecraft:lily_of_the_valley","minecraft:wither_rose","minecraft:spore_blossom","minecraft:brown_mushroom","minecraft:red_mushroom","minecraft:crimson_fungus","minecraft:warped_fungus","minecraft:crimson_roots","minecraft:warped_roots","minecraft:nether_sprouts","minecraft:weeping_vines","minecraft:twisting_vines","minecraft:sugar_cane","minecraft:kelp","minecraft:moss_carpet","minecraft:moss_block","minecraft:hanging_roots","minecraft:big_dripleaf","minecraft:small_dripleaf","minecraft:bamboo","minecraft:oak_slab","minecraft:spruce_slab","minecraft:birch_slab","minecraft:jungle_slab","minecraft:acacia_slab","minecraft:dark_oak_slab","minecraft:mangrove_slab","minecraft:crimson_slab","minecraft:warped_slab","minecraft:stone_slab","minecraft:smooth_stone_slab","minecraft:sandstone_slab","minecraft:cut_sandstone_slab","minecraft:petrified_oak_slab","minecraft:cobblestone_slab","minecraft:brick_slab","minecraft:stone_brick_slab","minecraft:mud_brick_slab","minecraft:nether_brick_slab","minecraft:quartz_slab","minecraft:red_sandstone_slab","minecraft:cut_red_sandstone_slab","minecraft:purpur_slab","minecraft:prismarine_slab","minecraft:prismarine_brick_slab","minecraft:dark_prismarine_slab","minecraft:smooth_quartz","minecraft:smooth_red_sandstone","minecraft:smooth_sandstone","minecraft:smooth_stone","minecraft:bricks","minecraft:bookshelf","minecraft:mossy_cobblestone","minecraft:obsidian","minecraft:torch","minecraft:end_rod","minecraft:chorus_plant","minecraft:chorus_flower","minecraft:purpur_block","minecraft:purpur_pillar","minecraft:purpur_stairs","minecraft:spawner","minecraft:chest","minecraft:crafting_table","minecraft:farmland","minecraft:furnace","minecraft:ladder","minecraft:cobblestone_stairs","minecraft:snow","minecraft:ice","minecraft:snow_block","minecraft:cactus","minecraft:clay","minecraft:jukebox","minecraft:oak_fence","minecraft:spruce_fence","minecraft:birch_fence","minecraft:jungle_fence","minecraft:acacia_fence","minecraft:dark_oak_fence","minecraft:mangrove_fence","minecraft:crimson_fence","minecraft:warped_fence","minecraft:pumpkin","minecraft:carved_pumpkin","minecraft:jack_o_lantern","minecraft:netherrack","minecraft:soul_sand","minecraft:soul_soil","minecraft:basalt","minecraft:polished_basalt","minecraft:smooth_basalt","minecraft:soul_torch","minecraft:glowstone","minecraft:infested_stone","minecraft:infested_cobblestone","minecraft:infested_stone_bricks","minecraft:infested_mossy_stone_bricks","minecraft:infested_cracked_stone_bricks","minecraft:infested_chiseled_stone_bricks","minecraft:infested_deepslate","minecraft:stone_bricks","minecraft:mossy_stone_bricks","minecraft:cracked_stone_bricks","minecraft:chiseled_stone_bricks","minecraft:packed_mud","minecraft:mud_bricks","minecraft:deepslate_bricks","minecraft:cracked_deepslate_bricks","minecraft:deepslate_tiles","minecraft:cracked_deepslate_tiles","minecraft:chiseled_deepslate","minecraft:reinforced_deepslate","minecraft:brown_mushroom_block","minecraft:red_mushroom_block","minecraft:mushroom_stem","minecraft:iron_bars","minecraft:chain","minecraft:glass_pane","minecraft:melon","minecraft:vine","minecraft:glow_lichen","minecraft:brick_stairs","minecraft:stone_brick_stairs","minecraft:mud_brick_stairs","minecraft:mycelium","minecraft:lily_pad","minecraft:nether_bricks","minecraft:cracked_nether_bricks","minecraft:chiseled_nether_bricks","minecraft:nether_brick_fence","minecraft:nether_brick_stairs","minecraft:sculk","minecraft:sculk_vein","minecraft:sculk_catalyst","minecraft:sculk_shrieker","minecraft:enchanting_table","minecraft:end_portal_frame","minecraft:end_stone","minecraft:end_stone_bricks","minecraft:dragon_egg","minecraft:sandstone_stairs","minecraft:ender_chest","minecraft:emerald_block","minecraft:oak_stairs","minecraft:spruce_stairs","minecraft:birch_stairs","minecraft:jungle_stairs","minecraft:acacia_stairs","minecraft:dark_oak_stairs","minecraft:mangrove_stairs","minecraft:crimson_stairs","minecraft:warped_stairs","minecraft:command_block","minecraft:beacon","minecraft:cobblestone_wall","minecraft:mossy_cobblestone_wall","minecraft:brick_wall","minecraft:prismarine_wall","minecraft:red_sandstone_wall","minecraft:mossy_stone_brick_wall","minecraft:granite_wall","minecraft:stone_brick_wall","minecraft:mud_brick_wall","minecraft:nether_brick_wall","minecraft:andesite_wall","minecraft:red_nether_brick_wall","minecraft:sandstone_wall","minecraft:end_stone_brick_wall","minecraft:diorite_wall","minecraft:blackstone_wall","minecraft:polished_blackstone_wall","minecraft:polished_blackstone_brick_wall","minecraft:cobbled_deepslate_wall","minecraft:polished_deepslate_wall","minecraft:deepslate_brick_wall","minecraft:deepslate_tile_wall","minecraft:anvil","minecraft:chipped_anvil","minecraft:damaged_anvil","minecraft:chiseled_quartz_block","minecraft:quartz_block","minecraft:quartz_bricks","minecraft:quartz_pillar","minecraft:quartz_stairs","minecraft:white_terracotta","minecraft:orange_terracotta","minecraft:magenta_terracotta","minecraft:light_blue_terracotta","minecraft:yellow_terracotta","minecraft:lime_terracotta","minecraft:pink_terracotta","minecraft:gray_terracotta","minecraft:light_gray_terracotta","minecraft:cyan_terracotta","minecraft:purple_terracotta","minecraft:blue_terracotta","minecraft:brown_terracotta","minecraft:green_terracotta","minecraft:red_terracotta","minecraft:black_terracotta","minecraft:barrier","minecraft:light","minecraft:hay_block","minecraft:white_carpet","minecraft:orange_carpet","minecraft:magenta_carpet","minecraft:light_blue_carpet","minecraft:yellow_carpet","minecraft:lime_carpet","minecraft:pink_carpet","minecraft:gray_carpet","minecraft:light_gray_carpet","minecraft:cyan_carpet","minecraft:purple_carpet","minecraft:blue_carpet","minecraft:brown_carpet","minecraft:green_carpet","minecraft:red_carpet","minecraft:black_carpet","minecraft:terracotta","minecraft:packed_ice","minecraft:dirt_path","minecraft:sunflower","minecraft:lilac","minecraft:rose_bush","minecraft:peony","minecraft:tall_grass","minecraft:large_fern","minecraft:white_stained_glass","minecraft:orange_stained_glass","minecraft:magenta_stained_glass","minecraft:light_blue_stained_glass","minecraft:yellow_stained_glass","minecraft:lime_stained_glass","minecraft:pink_stained_glass","minecraft:gray_stained_glass","minecraft:light_gray_stained_glass","minecraft:cyan_stained_glass","minecraft:purple_stained_glass","minecraft:blue_stained_glass","minecraft:brown_stained_glass","minecraft:green_stained_glass","minecraft:red_stained_glass","minecraft:black_stained_glass","minecraft:white_stained_glass_pane","minecraft:orange_stained_glass_pane","minecraft:magenta_stained_glass_pane","minecraft:light_blue_stained_glass_pane","minecraft:yellow_stained_glass_pane","minecraft:lime_stained_glass_pane","minecraft:pink_stained_glass_pane","minecraft:gray_stained_glass_pane","minecraft:light_gray_stained_glass_pane","minecraft:cyan_stained_glass_pane","minecraft:purple_stained_glass_pane","minecraft:blue_stained_glass_pane","minecraft:brown_stained_glass_pane","minecraft:green_stained_glass_pane","minecraft:red_stained_glass_pane","minecraft:black_stained_glass_pane","minecraft:prismarine","minecraft:prismarine_bricks","minecraft:dark_prismarine","minecraft:prismarine_stairs","minecraft:prismarine_brick_stairs","minecraft:dark_prismarine_stairs","minecraft:sea_lantern","minecraft:red_sandstone","minecraft:chiseled_red_sandstone","minecraft:cut_red_sandstone","minecraft:red_sandstone_stairs","minecraft:repeating_command_block","minecraft:chain_command_block","minecraft:magma_block","minecraft:nether_wart_block","minecraft:warped_wart_block","minecraft:red_nether_bricks","minecraft:bone_block","minecraft:structure_void","minecraft:shulker_box","minecraft:white_shulker_box","minecraft:orange_shulker_box","minecraft:magenta_shulker_box","minecraft:light_blue_shulker_box","minecraft:yellow_shulker_box","minecraft:lime_shulker_box","minecraft:pink_shulker_box","minecraft:gray_shulker_box","minecraft:light_gray_shulker_box","minecraft:cyan_shulker_box","minecraft:purple_shulker_box","minecraft:blue_shulker_box","minecraft:brown_shulker_box","minecraft:green_shulker_box","minecraft:red_shulker_box","minecraft:black_shulker_box","minecraft:white_glazed_terracotta","minecraft:orange_glazed_terracotta","minecraft:magenta_glazed_terracotta","minecraft:light_blue_glazed_terracotta","minecraft:yellow_glazed_terracotta","minecraft:lime_glazed_terracotta","minecraft:pink_glazed_terracotta","minecraft:gray_glazed_terracotta","minecraft:light_gray_glazed_terracotta","minecraft:cyan_glazed_terracotta","minecraft:purple_glazed_terracotta","minecraft:blue_glazed_terracotta","minecraft:brown_glazed_terracotta","minecraft:green_glazed_terracotta","minecraft:red_glazed_terracotta","minecraft:black_glazed_terracotta","minecraft:white_concrete","minecraft:orange_concrete","minecraft:magenta_concrete","minecraft:light_blue_concrete","minecraft:yellow_concrete","minecraft:lime_concrete","minecraft:pink_concrete","minecraft:gray_concrete","minecraft:light_gray_concrete","minecraft:cyan_concrete","minecraft:purple_concrete","minecraft:blue_concrete","minecraft:brown_concrete","minecraft:green_concrete","minecraft:red_concrete","minecraft:black_concrete","minecraft:white_concrete_powder","minecraft:orange_concrete_powder","minecraft:magenta_concrete_powder","minecraft:light_blue_concrete_powder","minecraft:yellow_concrete_powder","minecraft:lime_concrete_powder","minecraft:pink_concrete_powder","minecraft:gray_concrete_powder","minecraft:light_gray_concrete_powder","minecraft:cyan_concrete_powder","minecraft:purple_concrete_powder","minecraft:blue_concrete_powder","minecraft:brown_concrete_powder","minecraft:green_concrete_powder","minecraft:red_concrete_powder","minecraft:black_concrete_powder","minecraft:turtle_egg","minecraft:dead_tube_coral_block","minecraft:dead_brain_coral_block","minecraft:dead_bubble_coral_block","minecraft:dead_fire_coral_block","minecraft:dead_horn_coral_block","minecraft:tube_coral_block","minecraft:brain_coral_block","minecraft:bubble_coral_block","minecraft:fire_coral_block","minecraft:horn_coral_block","minecraft:tube_coral","minecraft:brain_coral","minecraft:bubble_coral","minecraft:fire_coral","minecraft:horn_coral","minecraft:dead_brain_coral","minecraft:dead_bubble_coral","minecraft:dead_fire_coral","minecraft:dead_horn_coral","minecraft:dead_tube_coral","minecraft:tube_coral_fan","minecraft:brain_coral_fan","minecraft:bubble_coral_fan","minecraft:fire_coral_fan","minecraft:horn_coral_fan","minecraft:dead_tube_coral_fan","minecraft:dead_brain_coral_fan","minecraft:dead_bubble_coral_fan","minecraft:dead_fire_coral_fan","minecraft:dead_horn_coral_fan","minecraft:blue_ice","minecraft:conduit","minecraft:polished_granite_stairs","minecraft:smooth_red_sandstone_stairs","minecraft:mossy_stone_brick_stairs","minecraft:polished_diorite_stairs","minecraft:mossy_cobblestone_stairs","minecraft:end_stone_brick_stairs","minecraft:stone_stairs","minecraft:smooth_sandstone_stairs","minecraft:smooth_quartz_stairs","minecraft:granite_stairs","minecraft:andesite_stairs","minecraft:red_nether_brick_stairs","minecraft:polished_andesite_stairs","minecraft:diorite_stairs","minecraft:cobbled_deepslate_stairs","minecraft:polished_deepslate_stairs","minecraft:deepslate_brick_stairs","minecraft:deepslate_tile_stairs","minecraft:polished_granite_slab","minecraft:smooth_red_sandstone_slab","minecraft:mossy_stone_brick_slab","minecraft:polished_diorite_slab","minecraft:mossy_cobblestone_slab","minecraft:end_stone_brick_slab","minecraft:smooth_sandstone_slab","minecraft:smooth_quartz_slab","minecraft:granite_slab","minecraft:andesite_slab","minecraft:red_nether_brick_slab","minecraft:polished_andesite_slab","minecraft:diorite_slab","minecraft:cobbled_deepslate_slab","minecraft:polished_deepslate_slab","minecraft:deepslate_brick_slab","minecraft:deepslate_tile_slab","minecraft:scaffolding","minecraft:redstone","minecraft:redstone_torch","minecraft:redstone_block","minecraft:repeater","minecraft:comparator","minecraft:piston","minecraft:sticky_piston","minecraft:slime_block","minecraft:honey_block","minecraft:observer","minecraft:hopper","minecraft:dispenser","minecraft:dropper","minecraft:lectern","minecraft:target","minecraft:lever","minecraft:lightning_rod","minecraft:daylight_detector","minecraft:sculk_sensor","minecraft:tripwire_hook","minecraft:trapped_chest","minecraft:tnt","minecraft:redstone_lamp","minecraft:note_block","minecraft:stone_button","minecraft:polished_blackstone_button","minecraft:oak_button","minecraft:spruce_button","minecraft:birch_button","minecraft:jungle_button","minecraft:acacia_button","minecraft:dark_oak_button","minecraft:mangrove_button","minecraft:crimson_button","minecraft:warped_button","minecraft:stone_pressure_plate","minecraft:polished_blackstone_pressure_plate","minecraft:light_weighted_pressure_plate","minecraft:heavy_weighted_pressure_plate","minecraft:oak_pressure_plate","minecraft:spruce_pressure_plate","minecraft:birch_pressure_plate","minecraft:jungle_pressure_plate","minecraft:acacia_pressure_plate","minecraft:dark_oak_pressure_plate","minecraft:mangrove_pressure_plate","minecraft:crimson_pressure_plate","minecraft:warped_pressure_plate","minecraft:iron_door","minecraft:oak_door","minecraft:spruce_door","minecraft:birch_door","minecraft:jungle_door","minecraft:acacia_door","minecraft:dark_oak_door","minecraft:mangrove_door","minecraft:crimson_door","minecraft:warped_door","minecraft:iron_trapdoor","minecraft:oak_trapdoor","minecraft:spruce_trapdoor","minecraft:birch_trapdoor","minecraft:jungle_trapdoor","minecraft:acacia_trapdoor","minecraft:dark_oak_trapdoor","minecraft:mangrove_trapdoor","minecraft:crimson_trapdoor","minecraft:warped_trapdoor","minecraft:oak_fence_gate","minecraft:spruce_fence_gate","minecraft:birch_fence_gate","minecraft:jungle_fence_gate","minecraft:acacia_fence_gate","minecraft:dark_oak_fence_gate","minecraft:mangrove_fence_gate","minecraft:crimson_fence_gate","minecraft:warped_fence_gate","minecraft:powered_rail","minecraft:detector_rail","minecraft:rail","minecraft:activator_rail","minecraft:saddle","minecraft:minecart","minecraft:chest_minecart","minecraft:furnace_minecart","minecraft:tnt_minecart","minecraft:hopper_minecart","minecraft:carrot_on_a_stick","minecraft:warped_fungus_on_a_stick","minecraft:elytra","minecraft:oak_boat","minecraft:oak_chest_boat","minecraft:spruce_boat","minecraft:spruce_chest_boat","minecraft:birch_boat","minecraft:birch_chest_boat","minecraft:jungle_boat","minecraft:jungle_chest_boat","minecraft:acacia_boat","minecraft:acacia_chest_boat","minecraft:dark_oak_boat","minecraft:dark_oak_chest_boat","minecraft:mangrove_boat","minecraft:mangrove_chest_boat","minecraft:structure_block","minecraft:jigsaw","minecraft:turtle_helmet","minecraft:scute","minecraft:flint_and_steel","minecraft:apple","minecraft:bow","minecraft:arrow","minecraft:coal","minecraft:charcoal","minecraft:diamond","minecraft:emerald","minecraft:lapis_lazuli","minecraft:quartz","minecraft:amethyst_shard","minecraft:raw_iron","minecraft:iron_ingot","minecraft:raw_copper","minecraft:copper_ingot","minecraft:raw_gold","minecraft:gold_ingot","minecraft:netherite_ingot","minecraft:netherite_scrap","minecraft:wooden_sword","minecraft:wooden_shovel","minecraft:wooden_pickaxe","minecraft:wooden_axe","minecraft:wooden_hoe","minecraft:stone_sword","minecraft:stone_shovel","minecraft:stone_pickaxe","minecraft:stone_axe","minecraft:stone_hoe","minecraft:golden_sword","minecraft:golden_shovel","minecraft:golden_pickaxe","minecraft:golden_axe","minecraft:golden_hoe","minecraft:iron_sword","minecraft:iron_shovel","minecraft:iron_pickaxe","minecraft:iron_axe","minecraft:iron_hoe","minecraft:diamond_sword","minecraft:diamond_shovel","minecraft:diamond_pickaxe","minecraft:diamond_axe","minecraft:diamond_hoe","minecraft:netherite_sword","minecraft:netherite_shovel","minecraft:netherite_pickaxe","minecraft:netherite_axe","minecraft:netherite_hoe","minecraft:stick","minecraft:bowl","minecraft:mushroom_stew","minecraft:string","minecraft:feather","minecraft:gunpowder","minecraft:wheat_seeds","minecraft:wheat","minecraft:bread","minecraft:leather_helmet","minecraft:leather_chestplate","minecraft:leather_leggings","minecraft:leather_boots","minecraft:chainmail_helmet","minecraft:chainmail_chestplate","minecraft:chainmail_leggings","minecraft:chainmail_boots","minecraft:iron_helmet","minecraft:iron_chestplate","minecraft:iron_leggings","minecraft:iron_boots","minecraft:diamond_helmet","minecraft:diamond_chestplate","minecraft:diamond_leggings","minecraft:diamond_boots","minecraft:golden_helmet","minecraft:golden_chestplate","minecraft:golden_leggings","minecraft:golden_boots","minecraft:netherite_helmet","minecraft:netherite_chestplate","minecraft:netherite_leggings","minecraft:netherite_boots","minecraft:flint","minecraft:porkchop","minecraft:cooked_porkchop","minecraft:painting","minecraft:golden_apple","minecraft:enchanted_golden_apple","minecraft:oak_sign","minecraft:spruce_sign","minecraft:birch_sign","minecraft:jungle_sign","minecraft:acacia_sign","minecraft:dark_oak_sign","minecraft:mangrove_sign","minecraft:crimson_sign","minecraft:warped_sign","minecraft:bucket","minecraft:water_bucket","minecraft:lava_bucket","minecraft:powder_snow_bucket","minecraft:snowball","minecraft:leather","minecraft:milk_bucket","minecraft:pufferfish_bucket","minecraft:salmon_bucket","minecraft:cod_bucket","minecraft:tropical_fish_bucket","minecraft:axolotl_bucket","minecraft:tadpole_bucket","minecraft:brick","minecraft:clay_ball","minecraft:dried_kelp_block","minecraft:paper","minecraft:book","minecraft:slime_ball","minecraft:egg","minecraft:compass","minecraft:recovery_compass","minecraft:bundle","minecraft:fishing_rod","minecraft:clock","minecraft:spyglass","minecraft:glowstone_dust","minecraft:cod","minecraft:salmon","minecraft:tropical_fish","minecraft:pufferfish","minecraft:cooked_cod","minecraft:cooked_salmon","minecraft:ink_sac","minecraft:glow_ink_sac","minecraft:cocoa_beans","minecraft:white_dye","minecraft:orange_dye","minecraft:magenta_dye","minecraft:light_blue_dye","minecraft:yellow_dye","minecraft:lime_dye","minecraft:pink_dye","minecraft:gray_dye","minecraft:light_gray_dye","minecraft:cyan_dye","minecraft:purple_dye","minecraft:blue_dye","minecraft:brown_dye","minecraft:green_dye","minecraft:red_dye","minecraft:black_dye","minecraft:bone_meal","minecraft:bone","minecraft:sugar","minecraft:cake","minecraft:white_bed","minecraft:orange_bed","minecraft:magenta_bed","minecraft:light_blue_bed","minecraft:yellow_bed","minecraft:lime_bed","minecraft:pink_bed","minecraft:gray_bed","minecraft:light_gray_bed","minecraft:cyan_bed","minecraft:purple_bed","minecraft:blue_bed","minecraft:brown_bed","minecraft:green_bed","minecraft:red_bed","minecraft:black_bed","minecraft:cookie","minecraft:filled_map","minecraft:shears","minecraft:melon_slice","minecraft:dried_kelp","minecraft:pumpkin_seeds","minecraft:melon_seeds","minecraft:beef","minecraft:cooked_beef","minecraft:chicken","minecraft:cooked_chicken","minecraft:rotten_flesh","minecraft:ender_pearl","minecraft:blaze_rod","minecraft:ghast_tear","minecraft:gold_nugget","minecraft:nether_wart","minecraft:potion","minecraft:glass_bottle","minecraft:spider_eye","minecraft:fermented_spider_eye","minecraft:blaze_powder","minecraft:magma_cream","minecraft:brewing_stand","minecraft:cauldron","minecraft:ender_eye","minecraft:glistering_melon_slice","minecraft:allay_spawn_egg","minecraft:axolotl_spawn_egg","minecraft:bat_spawn_egg","minecraft:bee_spawn_egg","minecraft:blaze_spawn_egg","minecraft:cat_spawn_egg","minecraft:cave_spider_spawn_egg","minecraft:chicken_spawn_egg","minecraft:cod_spawn_egg","minecraft:cow_spawn_egg","minecraft:creeper_spawn_egg","minecraft:dolphin_spawn_egg","minecraft:donkey_spawn_egg","minecraft:drowned_spawn_egg","minecraft:elder_guardian_spawn_egg","minecraft:enderman_spawn_egg","minecraft:endermite_spawn_egg","minecraft:evoker_spawn_egg","minecraft:fox_spawn_egg","minecraft:frog_spawn_egg","minecraft:ghast_spawn_egg","minecraft:glow_squid_spawn_egg","minecraft:goat_spawn_egg","minecraft:guardian_spawn_egg","minecraft:hoglin_spawn_egg","minecraft:horse_spawn_egg","minecraft:husk_spawn_egg","minecraft:llama_spawn_egg","minecraft:magma_cube_spawn_egg","minecraft:mooshroom_spawn_egg","minecraft:mule_spawn_egg","minecraft:ocelot_spawn_egg","minecraft:panda_spawn_egg","minecraft:parrot_spawn_egg","minecraft:phantom_spawn_egg","minecraft:pig_spawn_egg","minecraft:piglin_spawn_egg","minecraft:piglin_brute_spawn_egg","minecraft:pillager_spawn_egg","minecraft:polar_bear_spawn_egg","minecraft:pufferfish_spawn_egg","minecraft:rabbit_spawn_egg","minecraft:ravager_spawn_egg","minecraft:salmon_spawn_egg","minecraft:sheep_spawn_egg","minecraft:shulker_spawn_egg","minecraft:silverfish_spawn_egg","minecraft:skeleton_spawn_egg","minecraft:skeleton_horse_spawn_egg","minecraft:slime_spawn_egg","minecraft:spider_spawn_egg","minecraft:squid_spawn_egg","minecraft:stray_spawn_egg","minecraft:strider_spawn_egg","minecraft:tadpole_spawn_egg","minecraft:trader_llama_spawn_egg","minecraft:tropical_fish_spawn_egg","minecraft:turtle_spawn_egg","minecraft:vex_spawn_egg","minecraft:villager_spawn_egg","minecraft:vindicator_spawn_egg","minecraft:wandering_trader_spawn_egg","minecraft:warden_spawn_egg","minecraft:witch_spawn_egg","minecraft:wither_skeleton_spawn_egg","minecraft:wolf_spawn_egg","minecraft:zoglin_spawn_egg","minecraft:zombie_spawn_egg","minecraft:zombie_horse_spawn_egg","minecraft:zombie_villager_spawn_egg","minecraft:zombified_piglin_spawn_egg","minecraft:experience_bottle","minecraft:fire_charge","minecraft:writable_book","minecraft:written_book","minecraft:item_frame","minecraft:glow_item_frame","minecraft:flower_pot","minecraft:carrot","minecraft:potato","minecraft:baked_potato","minecraft:poisonous_potato","minecraft:map","minecraft:golden_carrot","minecraft:skeleton_skull","minecraft:wither_skeleton_skull","minecraft:player_head","minecraft:zombie_head","minecraft:creeper_head","minecraft:dragon_head","minecraft:nether_star","minecraft:pumpkin_pie","minecraft:firework_rocket","minecraft:firework_star","minecraft:enchanted_book","minecraft:nether_brick","minecraft:prismarine_shard","minecraft:prismarine_crystals","minecraft:rabbit","minecraft:cooked_rabbit","minecraft:rabbit_stew","minecraft:rabbit_foot","minecraft:rabbit_hide","minecraft:armor_stand","minecraft:iron_horse_armor","minecraft:golden_horse_armor","minecraft:diamond_horse_armor","minecraft:leather_horse_armor","minecraft:lead","minecraft:name_tag","minecraft:command_block_minecart","minecraft:mutton","minecraft:cooked_mutton","minecraft:white_banner","minecraft:orange_banner","minecraft:magenta_banner","minecraft:light_blue_banner","minecraft:yellow_banner","minecraft:lime_banner","minecraft:pink_banner","minecraft:gray_banner","minecraft:light_gray_banner","minecraft:cyan_banner","minecraft:purple_banner","minecraft:blue_banner","minecraft:brown_banner","minecraft:green_banner","minecraft:red_banner","minecraft:black_banner","minecraft:end_crystal","minecraft:chorus_fruit","minecraft:popped_chorus_fruit","minecraft:beetroot","minecraft:beetroot_seeds","minecraft:beetroot_soup","minecraft:dragon_breath","minecraft:splash_potion","minecraft:spectral_arrow","minecraft:tipped_arrow","minecraft:lingering_potion","minecraft:shield","minecraft:totem_of_undying","minecraft:shulker_shell","minecraft:iron_nugget","minecraft:knowledge_book","minecraft:debug_stick","minecraft:music_disc_13","minecraft:music_disc_cat","minecraft:music_disc_blocks","minecraft:music_disc_chirp","minecraft:music_disc_far","minecraft:music_disc_mall","minecraft:music_disc_mellohi","minecraft:music_disc_stal","minecraft:music_disc_strad","minecraft:music_disc_ward","minecraft:music_disc_11","minecraft:music_disc_wait","minecraft:music_disc_otherside","minecraft:music_disc_5","minecraft:music_disc_pigstep","minecraft:disc_fragment_5","minecraft:trident","minecraft:phantom_membrane","minecraft:nautilus_shell","minecraft:heart_of_the_sea","minecraft:crossbow","minecraft:suspicious_stew","minecraft:loom","minecraft:flower_banner_pattern","minecraft:creeper_banner_pattern","minecraft:skull_banner_pattern","minecraft:mojang_banner_pattern","minecraft:globe_banner_pattern","minecraft:piglin_banner_pattern","minecraft:goat_horn","minecraft:composter","minecraft:barrel","minecraft:smoker","minecraft:blast_furnace","minecraft:cartography_table","minecraft:fletching_table","minecraft:grindstone","minecraft:smithing_table","minecraft:stonecutter","minecraft:bell","minecraft:lantern","minecraft:soul_lantern","minecraft:sweet_berries","minecraft:glow_berries","minecraft:campfire","minecraft:soul_campfire","minecraft:shroomlight","minecraft:honeycomb","minecraft:bee_nest","minecraft:beehive","minecraft:honey_bottle","minecraft:honeycomb_block","minecraft:lodestone","minecraft:crying_obsidian","minecraft:blackstone","minecraft:blackstone_slab","minecraft:blackstone_stairs","minecraft:gilded_blackstone","minecraft:polished_blackstone","minecraft:polished_blackstone_slab","minecraft:polished_blackstone_stairs","minecraft:chiseled_polished_blackstone","minecraft:polished_blackstone_bricks","minecraft:polished_blackstone_brick_slab","minecraft:polished_blackstone_brick_stairs","minecraft:cracked_polished_blackstone_bricks","minecraft:respawn_anchor","minecraft:candle","minecraft:white_candle","minecraft:orange_candle","minecraft:magenta_candle","minecraft:light_blue_candle","minecraft:yellow_candle","minecraft:lime_candle","minecraft:pink_candle","minecraft:gray_candle","minecraft:light_gray_candle","minecraft:cyan_candle","minecraft:purple_candle","minecraft:blue_candle","minecraft:brown_candle","minecraft:green_candle","minecraft:red_candle","minecraft:black_candle","minecraft:small_amethyst_bud","minecraft:medium_amethyst_bud","minecraft:large_amethyst_bud","minecraft:amethyst_cluster","minecraft:pointed_dripstone","minecraft:ochre_froglight","minecraft:verdant_froglight","minecraft:pearlescent_froglight","minecraft:frogspawn","minecraft:echo_shard"]`,
  ),
);

export function readItem(reader: Reader): Item {
  return itemEnum.fromId(reader.readVarInt());
}

export function writeItem(writer: Writer, value: Item) {
  writer.writeVarInt(itemEnum.toId(value));
}

export type Block =
  | "minecraft:air"
  | "minecraft:stone"
  | "minecraft:granite"
  | "minecraft:polished_granite"
  | "minecraft:diorite"
  | "minecraft:polished_diorite"
  | "minecraft:andesite"
  | "minecraft:polished_andesite"
  | "minecraft:grass_block"
  | "minecraft:dirt"
  | "minecraft:coarse_dirt"
  | "minecraft:podzol"
  | "minecraft:cobblestone"
  | "minecraft:oak_planks"
  | "minecraft:spruce_planks"
  | "minecraft:birch_planks"
  | "minecraft:jungle_planks"
  | "minecraft:acacia_planks"
  | "minecraft:dark_oak_planks"
  | "minecraft:mangrove_planks"
  | "minecraft:oak_sapling"
  | "minecraft:spruce_sapling"
  | "minecraft:birch_sapling"
  | "minecraft:jungle_sapling"
  | "minecraft:acacia_sapling"
  | "minecraft:dark_oak_sapling"
  | "minecraft:mangrove_propagule"
  | "minecraft:bedrock"
  | "minecraft:water"
  | "minecraft:lava"
  | "minecraft:sand"
  | "minecraft:red_sand"
  | "minecraft:gravel"
  | "minecraft:gold_ore"
  | "minecraft:deepslate_gold_ore"
  | "minecraft:iron_ore"
  | "minecraft:deepslate_iron_ore"
  | "minecraft:coal_ore"
  | "minecraft:deepslate_coal_ore"
  | "minecraft:nether_gold_ore"
  | "minecraft:oak_log"
  | "minecraft:spruce_log"
  | "minecraft:birch_log"
  | "minecraft:jungle_log"
  | "minecraft:acacia_log"
  | "minecraft:dark_oak_log"
  | "minecraft:mangrove_log"
  | "minecraft:mangrove_roots"
  | "minecraft:muddy_mangrove_roots"
  | "minecraft:stripped_spruce_log"
  | "minecraft:stripped_birch_log"
  | "minecraft:stripped_jungle_log"
  | "minecraft:stripped_acacia_log"
  | "minecraft:stripped_dark_oak_log"
  | "minecraft:stripped_oak_log"
  | "minecraft:stripped_mangrove_log"
  | "minecraft:oak_wood"
  | "minecraft:spruce_wood"
  | "minecraft:birch_wood"
  | "minecraft:jungle_wood"
  | "minecraft:acacia_wood"
  | "minecraft:dark_oak_wood"
  | "minecraft:mangrove_wood"
  | "minecraft:stripped_oak_wood"
  | "minecraft:stripped_spruce_wood"
  | "minecraft:stripped_birch_wood"
  | "minecraft:stripped_jungle_wood"
  | "minecraft:stripped_acacia_wood"
  | "minecraft:stripped_dark_oak_wood"
  | "minecraft:stripped_mangrove_wood"
  | "minecraft:oak_leaves"
  | "minecraft:spruce_leaves"
  | "minecraft:birch_leaves"
  | "minecraft:jungle_leaves"
  | "minecraft:acacia_leaves"
  | "minecraft:dark_oak_leaves"
  | "minecraft:mangrove_leaves"
  | "minecraft:azalea_leaves"
  | "minecraft:flowering_azalea_leaves"
  | "minecraft:sponge"
  | "minecraft:wet_sponge"
  | "minecraft:glass"
  | "minecraft:lapis_ore"
  | "minecraft:deepslate_lapis_ore"
  | "minecraft:lapis_block"
  | "minecraft:dispenser"
  | "minecraft:sandstone"
  | "minecraft:chiseled_sandstone"
  | "minecraft:cut_sandstone"
  | "minecraft:note_block"
  | "minecraft:white_bed"
  | "minecraft:orange_bed"
  | "minecraft:magenta_bed"
  | "minecraft:light_blue_bed"
  | "minecraft:yellow_bed"
  | "minecraft:lime_bed"
  | "minecraft:pink_bed"
  | "minecraft:gray_bed"
  | "minecraft:light_gray_bed"
  | "minecraft:cyan_bed"
  | "minecraft:purple_bed"
  | "minecraft:blue_bed"
  | "minecraft:brown_bed"
  | "minecraft:green_bed"
  | "minecraft:red_bed"
  | "minecraft:black_bed"
  | "minecraft:powered_rail"
  | "minecraft:detector_rail"
  | "minecraft:sticky_piston"
  | "minecraft:cobweb"
  | "minecraft:grass"
  | "minecraft:fern"
  | "minecraft:dead_bush"
  | "minecraft:seagrass"
  | "minecraft:tall_seagrass"
  | "minecraft:piston"
  | "minecraft:piston_head"
  | "minecraft:white_wool"
  | "minecraft:orange_wool"
  | "minecraft:magenta_wool"
  | "minecraft:light_blue_wool"
  | "minecraft:yellow_wool"
  | "minecraft:lime_wool"
  | "minecraft:pink_wool"
  | "minecraft:gray_wool"
  | "minecraft:light_gray_wool"
  | "minecraft:cyan_wool"
  | "minecraft:purple_wool"
  | "minecraft:blue_wool"
  | "minecraft:brown_wool"
  | "minecraft:green_wool"
  | "minecraft:red_wool"
  | "minecraft:black_wool"
  | "minecraft:moving_piston"
  | "minecraft:dandelion"
  | "minecraft:poppy"
  | "minecraft:blue_orchid"
  | "minecraft:allium"
  | "minecraft:azure_bluet"
  | "minecraft:red_tulip"
  | "minecraft:orange_tulip"
  | "minecraft:white_tulip"
  | "minecraft:pink_tulip"
  | "minecraft:oxeye_daisy"
  | "minecraft:cornflower"
  | "minecraft:wither_rose"
  | "minecraft:lily_of_the_valley"
  | "minecraft:brown_mushroom"
  | "minecraft:red_mushroom"
  | "minecraft:gold_block"
  | "minecraft:iron_block"
  | "minecraft:bricks"
  | "minecraft:tnt"
  | "minecraft:bookshelf"
  | "minecraft:mossy_cobblestone"
  | "minecraft:obsidian"
  | "minecraft:torch"
  | "minecraft:wall_torch"
  | "minecraft:fire"
  | "minecraft:soul_fire"
  | "minecraft:spawner"
  | "minecraft:oak_stairs"
  | "minecraft:chest"
  | "minecraft:redstone_wire"
  | "minecraft:diamond_ore"
  | "minecraft:deepslate_diamond_ore"
  | "minecraft:diamond_block"
  | "minecraft:crafting_table"
  | "minecraft:wheat"
  | "minecraft:farmland"
  | "minecraft:furnace"
  | "minecraft:oak_sign"
  | "minecraft:spruce_sign"
  | "minecraft:birch_sign"
  | "minecraft:acacia_sign"
  | "minecraft:jungle_sign"
  | "minecraft:dark_oak_sign"
  | "minecraft:mangrove_sign"
  | "minecraft:oak_door"
  | "minecraft:ladder"
  | "minecraft:rail"
  | "minecraft:cobblestone_stairs"
  | "minecraft:oak_wall_sign"
  | "minecraft:spruce_wall_sign"
  | "minecraft:birch_wall_sign"
  | "minecraft:acacia_wall_sign"
  | "minecraft:jungle_wall_sign"
  | "minecraft:dark_oak_wall_sign"
  | "minecraft:mangrove_wall_sign"
  | "minecraft:lever"
  | "minecraft:stone_pressure_plate"
  | "minecraft:iron_door"
  | "minecraft:oak_pressure_plate"
  | "minecraft:spruce_pressure_plate"
  | "minecraft:birch_pressure_plate"
  | "minecraft:jungle_pressure_plate"
  | "minecraft:acacia_pressure_plate"
  | "minecraft:dark_oak_pressure_plate"
  | "minecraft:mangrove_pressure_plate"
  | "minecraft:redstone_ore"
  | "minecraft:deepslate_redstone_ore"
  | "minecraft:redstone_torch"
  | "minecraft:redstone_wall_torch"
  | "minecraft:stone_button"
  | "minecraft:snow"
  | "minecraft:ice"
  | "minecraft:snow_block"
  | "minecraft:cactus"
  | "minecraft:clay"
  | "minecraft:sugar_cane"
  | "minecraft:jukebox"
  | "minecraft:oak_fence"
  | "minecraft:pumpkin"
  | "minecraft:netherrack"
  | "minecraft:soul_sand"
  | "minecraft:soul_soil"
  | "minecraft:basalt"
  | "minecraft:polished_basalt"
  | "minecraft:soul_torch"
  | "minecraft:soul_wall_torch"
  | "minecraft:glowstone"
  | "minecraft:nether_portal"
  | "minecraft:carved_pumpkin"
  | "minecraft:jack_o_lantern"
  | "minecraft:cake"
  | "minecraft:repeater"
  | "minecraft:white_stained_glass"
  | "minecraft:orange_stained_glass"
  | "minecraft:magenta_stained_glass"
  | "minecraft:light_blue_stained_glass"
  | "minecraft:yellow_stained_glass"
  | "minecraft:lime_stained_glass"
  | "minecraft:pink_stained_glass"
  | "minecraft:gray_stained_glass"
  | "minecraft:light_gray_stained_glass"
  | "minecraft:cyan_stained_glass"
  | "minecraft:purple_stained_glass"
  | "minecraft:blue_stained_glass"
  | "minecraft:brown_stained_glass"
  | "minecraft:green_stained_glass"
  | "minecraft:red_stained_glass"
  | "minecraft:black_stained_glass"
  | "minecraft:oak_trapdoor"
  | "minecraft:spruce_trapdoor"
  | "minecraft:birch_trapdoor"
  | "minecraft:jungle_trapdoor"
  | "minecraft:acacia_trapdoor"
  | "minecraft:dark_oak_trapdoor"
  | "minecraft:mangrove_trapdoor"
  | "minecraft:stone_bricks"
  | "minecraft:mossy_stone_bricks"
  | "minecraft:cracked_stone_bricks"
  | "minecraft:chiseled_stone_bricks"
  | "minecraft:packed_mud"
  | "minecraft:mud_bricks"
  | "minecraft:infested_stone"
  | "minecraft:infested_cobblestone"
  | "minecraft:infested_stone_bricks"
  | "minecraft:infested_mossy_stone_bricks"
  | "minecraft:infested_cracked_stone_bricks"
  | "minecraft:infested_chiseled_stone_bricks"
  | "minecraft:brown_mushroom_block"
  | "minecraft:red_mushroom_block"
  | "minecraft:mushroom_stem"
  | "minecraft:iron_bars"
  | "minecraft:chain"
  | "minecraft:glass_pane"
  | "minecraft:melon"
  | "minecraft:attached_pumpkin_stem"
  | "minecraft:attached_melon_stem"
  | "minecraft:pumpkin_stem"
  | "minecraft:melon_stem"
  | "minecraft:vine"
  | "minecraft:glow_lichen"
  | "minecraft:oak_fence_gate"
  | "minecraft:brick_stairs"
  | "minecraft:stone_brick_stairs"
  | "minecraft:mud_brick_stairs"
  | "minecraft:mycelium"
  | "minecraft:lily_pad"
  | "minecraft:nether_bricks"
  | "minecraft:nether_brick_fence"
  | "minecraft:nether_brick_stairs"
  | "minecraft:nether_wart"
  | "minecraft:enchanting_table"
  | "minecraft:brewing_stand"
  | "minecraft:cauldron"
  | "minecraft:water_cauldron"
  | "minecraft:lava_cauldron"
  | "minecraft:powder_snow_cauldron"
  | "minecraft:end_portal"
  | "minecraft:end_portal_frame"
  | "minecraft:end_stone"
  | "minecraft:dragon_egg"
  | "minecraft:redstone_lamp"
  | "minecraft:cocoa"
  | "minecraft:sandstone_stairs"
  | "minecraft:emerald_ore"
  | "minecraft:deepslate_emerald_ore"
  | "minecraft:ender_chest"
  | "minecraft:tripwire_hook"
  | "minecraft:tripwire"
  | "minecraft:emerald_block"
  | "minecraft:spruce_stairs"
  | "minecraft:birch_stairs"
  | "minecraft:jungle_stairs"
  | "minecraft:command_block"
  | "minecraft:beacon"
  | "minecraft:cobblestone_wall"
  | "minecraft:mossy_cobblestone_wall"
  | "minecraft:flower_pot"
  | "minecraft:potted_oak_sapling"
  | "minecraft:potted_spruce_sapling"
  | "minecraft:potted_birch_sapling"
  | "minecraft:potted_jungle_sapling"
  | "minecraft:potted_acacia_sapling"
  | "minecraft:potted_dark_oak_sapling"
  | "minecraft:potted_mangrove_propagule"
  | "minecraft:potted_fern"
  | "minecraft:potted_dandelion"
  | "minecraft:potted_poppy"
  | "minecraft:potted_blue_orchid"
  | "minecraft:potted_allium"
  | "minecraft:potted_azure_bluet"
  | "minecraft:potted_red_tulip"
  | "minecraft:potted_orange_tulip"
  | "minecraft:potted_white_tulip"
  | "minecraft:potted_pink_tulip"
  | "minecraft:potted_oxeye_daisy"
  | "minecraft:potted_cornflower"
  | "minecraft:potted_lily_of_the_valley"
  | "minecraft:potted_wither_rose"
  | "minecraft:potted_red_mushroom"
  | "minecraft:potted_brown_mushroom"
  | "minecraft:potted_dead_bush"
  | "minecraft:potted_cactus"
  | "minecraft:carrots"
  | "minecraft:potatoes"
  | "minecraft:oak_button"
  | "minecraft:spruce_button"
  | "minecraft:birch_button"
  | "minecraft:jungle_button"
  | "minecraft:acacia_button"
  | "minecraft:dark_oak_button"
  | "minecraft:mangrove_button"
  | "minecraft:skeleton_skull"
  | "minecraft:skeleton_wall_skull"
  | "minecraft:wither_skeleton_skull"
  | "minecraft:wither_skeleton_wall_skull"
  | "minecraft:zombie_head"
  | "minecraft:zombie_wall_head"
  | "minecraft:player_head"
  | "minecraft:player_wall_head"
  | "minecraft:creeper_head"
  | "minecraft:creeper_wall_head"
  | "minecraft:dragon_head"
  | "minecraft:dragon_wall_head"
  | "minecraft:anvil"
  | "minecraft:chipped_anvil"
  | "minecraft:damaged_anvil"
  | "minecraft:trapped_chest"
  | "minecraft:light_weighted_pressure_plate"
  | "minecraft:heavy_weighted_pressure_plate"
  | "minecraft:comparator"
  | "minecraft:daylight_detector"
  | "minecraft:redstone_block"
  | "minecraft:nether_quartz_ore"
  | "minecraft:hopper"
  | "minecraft:quartz_block"
  | "minecraft:chiseled_quartz_block"
  | "minecraft:quartz_pillar"
  | "minecraft:quartz_stairs"
  | "minecraft:activator_rail"
  | "minecraft:dropper"
  | "minecraft:white_terracotta"
  | "minecraft:orange_terracotta"
  | "minecraft:magenta_terracotta"
  | "minecraft:light_blue_terracotta"
  | "minecraft:yellow_terracotta"
  | "minecraft:lime_terracotta"
  | "minecraft:pink_terracotta"
  | "minecraft:gray_terracotta"
  | "minecraft:light_gray_terracotta"
  | "minecraft:cyan_terracotta"
  | "minecraft:purple_terracotta"
  | "minecraft:blue_terracotta"
  | "minecraft:brown_terracotta"
  | "minecraft:green_terracotta"
  | "minecraft:red_terracotta"
  | "minecraft:black_terracotta"
  | "minecraft:white_stained_glass_pane"
  | "minecraft:orange_stained_glass_pane"
  | "minecraft:magenta_stained_glass_pane"
  | "minecraft:light_blue_stained_glass_pane"
  | "minecraft:yellow_stained_glass_pane"
  | "minecraft:lime_stained_glass_pane"
  | "minecraft:pink_stained_glass_pane"
  | "minecraft:gray_stained_glass_pane"
  | "minecraft:light_gray_stained_glass_pane"
  | "minecraft:cyan_stained_glass_pane"
  | "minecraft:purple_stained_glass_pane"
  | "minecraft:blue_stained_glass_pane"
  | "minecraft:brown_stained_glass_pane"
  | "minecraft:green_stained_glass_pane"
  | "minecraft:red_stained_glass_pane"
  | "minecraft:black_stained_glass_pane"
  | "minecraft:acacia_stairs"
  | "minecraft:dark_oak_stairs"
  | "minecraft:mangrove_stairs"
  | "minecraft:slime_block"
  | "minecraft:barrier"
  | "minecraft:light"
  | "minecraft:iron_trapdoor"
  | "minecraft:prismarine"
  | "minecraft:prismarine_bricks"
  | "minecraft:dark_prismarine"
  | "minecraft:prismarine_stairs"
  | "minecraft:prismarine_brick_stairs"
  | "minecraft:dark_prismarine_stairs"
  | "minecraft:prismarine_slab"
  | "minecraft:prismarine_brick_slab"
  | "minecraft:dark_prismarine_slab"
  | "minecraft:sea_lantern"
  | "minecraft:hay_block"
  | "minecraft:white_carpet"
  | "minecraft:orange_carpet"
  | "minecraft:magenta_carpet"
  | "minecraft:light_blue_carpet"
  | "minecraft:yellow_carpet"
  | "minecraft:lime_carpet"
  | "minecraft:pink_carpet"
  | "minecraft:gray_carpet"
  | "minecraft:light_gray_carpet"
  | "minecraft:cyan_carpet"
  | "minecraft:purple_carpet"
  | "minecraft:blue_carpet"
  | "minecraft:brown_carpet"
  | "minecraft:green_carpet"
  | "minecraft:red_carpet"
  | "minecraft:black_carpet"
  | "minecraft:terracotta"
  | "minecraft:coal_block"
  | "minecraft:packed_ice"
  | "minecraft:sunflower"
  | "minecraft:lilac"
  | "minecraft:rose_bush"
  | "minecraft:peony"
  | "minecraft:tall_grass"
  | "minecraft:large_fern"
  | "minecraft:white_banner"
  | "minecraft:orange_banner"
  | "minecraft:magenta_banner"
  | "minecraft:light_blue_banner"
  | "minecraft:yellow_banner"
  | "minecraft:lime_banner"
  | "minecraft:pink_banner"
  | "minecraft:gray_banner"
  | "minecraft:light_gray_banner"
  | "minecraft:cyan_banner"
  | "minecraft:purple_banner"
  | "minecraft:blue_banner"
  | "minecraft:brown_banner"
  | "minecraft:green_banner"
  | "minecraft:red_banner"
  | "minecraft:black_banner"
  | "minecraft:white_wall_banner"
  | "minecraft:orange_wall_banner"
  | "minecraft:magenta_wall_banner"
  | "minecraft:light_blue_wall_banner"
  | "minecraft:yellow_wall_banner"
  | "minecraft:lime_wall_banner"
  | "minecraft:pink_wall_banner"
  | "minecraft:gray_wall_banner"
  | "minecraft:light_gray_wall_banner"
  | "minecraft:cyan_wall_banner"
  | "minecraft:purple_wall_banner"
  | "minecraft:blue_wall_banner"
  | "minecraft:brown_wall_banner"
  | "minecraft:green_wall_banner"
  | "minecraft:red_wall_banner"
  | "minecraft:black_wall_banner"
  | "minecraft:red_sandstone"
  | "minecraft:chiseled_red_sandstone"
  | "minecraft:cut_red_sandstone"
  | "minecraft:red_sandstone_stairs"
  | "minecraft:oak_slab"
  | "minecraft:spruce_slab"
  | "minecraft:birch_slab"
  | "minecraft:jungle_slab"
  | "minecraft:acacia_slab"
  | "minecraft:dark_oak_slab"
  | "minecraft:mangrove_slab"
  | "minecraft:stone_slab"
  | "minecraft:smooth_stone_slab"
  | "minecraft:sandstone_slab"
  | "minecraft:cut_sandstone_slab"
  | "minecraft:petrified_oak_slab"
  | "minecraft:cobblestone_slab"
  | "minecraft:brick_slab"
  | "minecraft:stone_brick_slab"
  | "minecraft:mud_brick_slab"
  | "minecraft:nether_brick_slab"
  | "minecraft:quartz_slab"
  | "minecraft:red_sandstone_slab"
  | "minecraft:cut_red_sandstone_slab"
  | "minecraft:purpur_slab"
  | "minecraft:smooth_stone"
  | "minecraft:smooth_sandstone"
  | "minecraft:smooth_quartz"
  | "minecraft:smooth_red_sandstone"
  | "minecraft:spruce_fence_gate"
  | "minecraft:birch_fence_gate"
  | "minecraft:jungle_fence_gate"
  | "minecraft:acacia_fence_gate"
  | "minecraft:dark_oak_fence_gate"
  | "minecraft:mangrove_fence_gate"
  | "minecraft:spruce_fence"
  | "minecraft:birch_fence"
  | "minecraft:jungle_fence"
  | "minecraft:acacia_fence"
  | "minecraft:dark_oak_fence"
  | "minecraft:mangrove_fence"
  | "minecraft:spruce_door"
  | "minecraft:birch_door"
  | "minecraft:jungle_door"
  | "minecraft:acacia_door"
  | "minecraft:dark_oak_door"
  | "minecraft:mangrove_door"
  | "minecraft:end_rod"
  | "minecraft:chorus_plant"
  | "minecraft:chorus_flower"
  | "minecraft:purpur_block"
  | "minecraft:purpur_pillar"
  | "minecraft:purpur_stairs"
  | "minecraft:end_stone_bricks"
  | "minecraft:beetroots"
  | "minecraft:dirt_path"
  | "minecraft:end_gateway"
  | "minecraft:repeating_command_block"
  | "minecraft:chain_command_block"
  | "minecraft:frosted_ice"
  | "minecraft:magma_block"
  | "minecraft:nether_wart_block"
  | "minecraft:red_nether_bricks"
  | "minecraft:bone_block"
  | "minecraft:structure_void"
  | "minecraft:observer"
  | "minecraft:shulker_box"
  | "minecraft:white_shulker_box"
  | "minecraft:orange_shulker_box"
  | "minecraft:magenta_shulker_box"
  | "minecraft:light_blue_shulker_box"
  | "minecraft:yellow_shulker_box"
  | "minecraft:lime_shulker_box"
  | "minecraft:pink_shulker_box"
  | "minecraft:gray_shulker_box"
  | "minecraft:light_gray_shulker_box"
  | "minecraft:cyan_shulker_box"
  | "minecraft:purple_shulker_box"
  | "minecraft:blue_shulker_box"
  | "minecraft:brown_shulker_box"
  | "minecraft:green_shulker_box"
  | "minecraft:red_shulker_box"
  | "minecraft:black_shulker_box"
  | "minecraft:white_glazed_terracotta"
  | "minecraft:orange_glazed_terracotta"
  | "minecraft:magenta_glazed_terracotta"
  | "minecraft:light_blue_glazed_terracotta"
  | "minecraft:yellow_glazed_terracotta"
  | "minecraft:lime_glazed_terracotta"
  | "minecraft:pink_glazed_terracotta"
  | "minecraft:gray_glazed_terracotta"
  | "minecraft:light_gray_glazed_terracotta"
  | "minecraft:cyan_glazed_terracotta"
  | "minecraft:purple_glazed_terracotta"
  | "minecraft:blue_glazed_terracotta"
  | "minecraft:brown_glazed_terracotta"
  | "minecraft:green_glazed_terracotta"
  | "minecraft:red_glazed_terracotta"
  | "minecraft:black_glazed_terracotta"
  | "minecraft:white_concrete"
  | "minecraft:orange_concrete"
  | "minecraft:magenta_concrete"
  | "minecraft:light_blue_concrete"
  | "minecraft:yellow_concrete"
  | "minecraft:lime_concrete"
  | "minecraft:pink_concrete"
  | "minecraft:gray_concrete"
  | "minecraft:light_gray_concrete"
  | "minecraft:cyan_concrete"
  | "minecraft:purple_concrete"
  | "minecraft:blue_concrete"
  | "minecraft:brown_concrete"
  | "minecraft:green_concrete"
  | "minecraft:red_concrete"
  | "minecraft:black_concrete"
  | "minecraft:white_concrete_powder"
  | "minecraft:orange_concrete_powder"
  | "minecraft:magenta_concrete_powder"
  | "minecraft:light_blue_concrete_powder"
  | "minecraft:yellow_concrete_powder"
  | "minecraft:lime_concrete_powder"
  | "minecraft:pink_concrete_powder"
  | "minecraft:gray_concrete_powder"
  | "minecraft:light_gray_concrete_powder"
  | "minecraft:cyan_concrete_powder"
  | "minecraft:purple_concrete_powder"
  | "minecraft:blue_concrete_powder"
  | "minecraft:brown_concrete_powder"
  | "minecraft:green_concrete_powder"
  | "minecraft:red_concrete_powder"
  | "minecraft:black_concrete_powder"
  | "minecraft:kelp"
  | "minecraft:kelp_plant"
  | "minecraft:dried_kelp_block"
  | "minecraft:turtle_egg"
  | "minecraft:dead_tube_coral_block"
  | "minecraft:dead_brain_coral_block"
  | "minecraft:dead_bubble_coral_block"
  | "minecraft:dead_fire_coral_block"
  | "minecraft:dead_horn_coral_block"
  | "minecraft:tube_coral_block"
  | "minecraft:brain_coral_block"
  | "minecraft:bubble_coral_block"
  | "minecraft:fire_coral_block"
  | "minecraft:horn_coral_block"
  | "minecraft:dead_tube_coral"
  | "minecraft:dead_brain_coral"
  | "minecraft:dead_bubble_coral"
  | "minecraft:dead_fire_coral"
  | "minecraft:dead_horn_coral"
  | "minecraft:tube_coral"
  | "minecraft:brain_coral"
  | "minecraft:bubble_coral"
  | "minecraft:fire_coral"
  | "minecraft:horn_coral"
  | "minecraft:dead_tube_coral_fan"
  | "minecraft:dead_brain_coral_fan"
  | "minecraft:dead_bubble_coral_fan"
  | "minecraft:dead_fire_coral_fan"
  | "minecraft:dead_horn_coral_fan"
  | "minecraft:tube_coral_fan"
  | "minecraft:brain_coral_fan"
  | "minecraft:bubble_coral_fan"
  | "minecraft:fire_coral_fan"
  | "minecraft:horn_coral_fan"
  | "minecraft:dead_tube_coral_wall_fan"
  | "minecraft:dead_brain_coral_wall_fan"
  | "minecraft:dead_bubble_coral_wall_fan"
  | "minecraft:dead_fire_coral_wall_fan"
  | "minecraft:dead_horn_coral_wall_fan"
  | "minecraft:tube_coral_wall_fan"
  | "minecraft:brain_coral_wall_fan"
  | "minecraft:bubble_coral_wall_fan"
  | "minecraft:fire_coral_wall_fan"
  | "minecraft:horn_coral_wall_fan"
  | "minecraft:sea_pickle"
  | "minecraft:blue_ice"
  | "minecraft:conduit"
  | "minecraft:bamboo_sapling"
  | "minecraft:bamboo"
  | "minecraft:potted_bamboo"
  | "minecraft:void_air"
  | "minecraft:cave_air"
  | "minecraft:bubble_column"
  | "minecraft:polished_granite_stairs"
  | "minecraft:smooth_red_sandstone_stairs"
  | "minecraft:mossy_stone_brick_stairs"
  | "minecraft:polished_diorite_stairs"
  | "minecraft:mossy_cobblestone_stairs"
  | "minecraft:end_stone_brick_stairs"
  | "minecraft:stone_stairs"
  | "minecraft:smooth_sandstone_stairs"
  | "minecraft:smooth_quartz_stairs"
  | "minecraft:granite_stairs"
  | "minecraft:andesite_stairs"
  | "minecraft:red_nether_brick_stairs"
  | "minecraft:polished_andesite_stairs"
  | "minecraft:diorite_stairs"
  | "minecraft:polished_granite_slab"
  | "minecraft:smooth_red_sandstone_slab"
  | "minecraft:mossy_stone_brick_slab"
  | "minecraft:polished_diorite_slab"
  | "minecraft:mossy_cobblestone_slab"
  | "minecraft:end_stone_brick_slab"
  | "minecraft:smooth_sandstone_slab"
  | "minecraft:smooth_quartz_slab"
  | "minecraft:granite_slab"
  | "minecraft:andesite_slab"
  | "minecraft:red_nether_brick_slab"
  | "minecraft:polished_andesite_slab"
  | "minecraft:diorite_slab"
  | "minecraft:brick_wall"
  | "minecraft:prismarine_wall"
  | "minecraft:red_sandstone_wall"
  | "minecraft:mossy_stone_brick_wall"
  | "minecraft:granite_wall"
  | "minecraft:stone_brick_wall"
  | "minecraft:mud_brick_wall"
  | "minecraft:nether_brick_wall"
  | "minecraft:andesite_wall"
  | "minecraft:red_nether_brick_wall"
  | "minecraft:sandstone_wall"
  | "minecraft:end_stone_brick_wall"
  | "minecraft:diorite_wall"
  | "minecraft:scaffolding"
  | "minecraft:loom"
  | "minecraft:barrel"
  | "minecraft:smoker"
  | "minecraft:blast_furnace"
  | "minecraft:cartography_table"
  | "minecraft:fletching_table"
  | "minecraft:grindstone"
  | "minecraft:lectern"
  | "minecraft:smithing_table"
  | "minecraft:stonecutter"
  | "minecraft:bell"
  | "minecraft:lantern"
  | "minecraft:soul_lantern"
  | "minecraft:campfire"
  | "minecraft:soul_campfire"
  | "minecraft:sweet_berry_bush"
  | "minecraft:warped_stem"
  | "minecraft:stripped_warped_stem"
  | "minecraft:warped_hyphae"
  | "minecraft:stripped_warped_hyphae"
  | "minecraft:warped_nylium"
  | "minecraft:warped_fungus"
  | "minecraft:warped_wart_block"
  | "minecraft:warped_roots"
  | "minecraft:nether_sprouts"
  | "minecraft:crimson_stem"
  | "minecraft:stripped_crimson_stem"
  | "minecraft:crimson_hyphae"
  | "minecraft:stripped_crimson_hyphae"
  | "minecraft:crimson_nylium"
  | "minecraft:crimson_fungus"
  | "minecraft:shroomlight"
  | "minecraft:weeping_vines"
  | "minecraft:weeping_vines_plant"
  | "minecraft:twisting_vines"
  | "minecraft:twisting_vines_plant"
  | "minecraft:crimson_roots"
  | "minecraft:crimson_planks"
  | "minecraft:warped_planks"
  | "minecraft:crimson_slab"
  | "minecraft:warped_slab"
  | "minecraft:crimson_pressure_plate"
  | "minecraft:warped_pressure_plate"
  | "minecraft:crimson_fence"
  | "minecraft:warped_fence"
  | "minecraft:crimson_trapdoor"
  | "minecraft:warped_trapdoor"
  | "minecraft:crimson_fence_gate"
  | "minecraft:warped_fence_gate"
  | "minecraft:crimson_stairs"
  | "minecraft:warped_stairs"
  | "minecraft:crimson_button"
  | "minecraft:warped_button"
  | "minecraft:crimson_door"
  | "minecraft:warped_door"
  | "minecraft:crimson_sign"
  | "minecraft:warped_sign"
  | "minecraft:crimson_wall_sign"
  | "minecraft:warped_wall_sign"
  | "minecraft:structure_block"
  | "minecraft:jigsaw"
  | "minecraft:composter"
  | "minecraft:target"
  | "minecraft:bee_nest"
  | "minecraft:beehive"
  | "minecraft:honey_block"
  | "minecraft:honeycomb_block"
  | "minecraft:netherite_block"
  | "minecraft:ancient_debris"
  | "minecraft:crying_obsidian"
  | "minecraft:respawn_anchor"
  | "minecraft:potted_crimson_fungus"
  | "minecraft:potted_warped_fungus"
  | "minecraft:potted_crimson_roots"
  | "minecraft:potted_warped_roots"
  | "minecraft:lodestone"
  | "minecraft:blackstone"
  | "minecraft:blackstone_stairs"
  | "minecraft:blackstone_wall"
  | "minecraft:blackstone_slab"
  | "minecraft:polished_blackstone"
  | "minecraft:polished_blackstone_bricks"
  | "minecraft:cracked_polished_blackstone_bricks"
  | "minecraft:chiseled_polished_blackstone"
  | "minecraft:polished_blackstone_brick_slab"
  | "minecraft:polished_blackstone_brick_stairs"
  | "minecraft:polished_blackstone_brick_wall"
  | "minecraft:gilded_blackstone"
  | "minecraft:polished_blackstone_stairs"
  | "minecraft:polished_blackstone_slab"
  | "minecraft:polished_blackstone_pressure_plate"
  | "minecraft:polished_blackstone_button"
  | "minecraft:polished_blackstone_wall"
  | "minecraft:chiseled_nether_bricks"
  | "minecraft:cracked_nether_bricks"
  | "minecraft:quartz_bricks"
  | "minecraft:candle"
  | "minecraft:white_candle"
  | "minecraft:orange_candle"
  | "minecraft:magenta_candle"
  | "minecraft:light_blue_candle"
  | "minecraft:yellow_candle"
  | "minecraft:lime_candle"
  | "minecraft:pink_candle"
  | "minecraft:gray_candle"
  | "minecraft:light_gray_candle"
  | "minecraft:cyan_candle"
  | "minecraft:purple_candle"
  | "minecraft:blue_candle"
  | "minecraft:brown_candle"
  | "minecraft:green_candle"
  | "minecraft:red_candle"
  | "minecraft:black_candle"
  | "minecraft:candle_cake"
  | "minecraft:white_candle_cake"
  | "minecraft:orange_candle_cake"
  | "minecraft:magenta_candle_cake"
  | "minecraft:light_blue_candle_cake"
  | "minecraft:yellow_candle_cake"
  | "minecraft:lime_candle_cake"
  | "minecraft:pink_candle_cake"
  | "minecraft:gray_candle_cake"
  | "minecraft:light_gray_candle_cake"
  | "minecraft:cyan_candle_cake"
  | "minecraft:purple_candle_cake"
  | "minecraft:blue_candle_cake"
  | "minecraft:brown_candle_cake"
  | "minecraft:green_candle_cake"
  | "minecraft:red_candle_cake"
  | "minecraft:black_candle_cake"
  | "minecraft:amethyst_block"
  | "minecraft:budding_amethyst"
  | "minecraft:amethyst_cluster"
  | "minecraft:large_amethyst_bud"
  | "minecraft:medium_amethyst_bud"
  | "minecraft:small_amethyst_bud"
  | "minecraft:tuff"
  | "minecraft:calcite"
  | "minecraft:tinted_glass"
  | "minecraft:powder_snow"
  | "minecraft:sculk_sensor"
  | "minecraft:sculk"
  | "minecraft:sculk_vein"
  | "minecraft:sculk_catalyst"
  | "minecraft:sculk_shrieker"
  | "minecraft:oxidized_copper"
  | "minecraft:weathered_copper"
  | "minecraft:exposed_copper"
  | "minecraft:copper_block"
  | "minecraft:copper_ore"
  | "minecraft:deepslate_copper_ore"
  | "minecraft:oxidized_cut_copper"
  | "minecraft:weathered_cut_copper"
  | "minecraft:exposed_cut_copper"
  | "minecraft:cut_copper"
  | "minecraft:oxidized_cut_copper_stairs"
  | "minecraft:weathered_cut_copper_stairs"
  | "minecraft:exposed_cut_copper_stairs"
  | "minecraft:cut_copper_stairs"
  | "minecraft:oxidized_cut_copper_slab"
  | "minecraft:weathered_cut_copper_slab"
  | "minecraft:exposed_cut_copper_slab"
  | "minecraft:cut_copper_slab"
  | "minecraft:waxed_copper_block"
  | "minecraft:waxed_weathered_copper"
  | "minecraft:waxed_exposed_copper"
  | "minecraft:waxed_oxidized_copper"
  | "minecraft:waxed_oxidized_cut_copper"
  | "minecraft:waxed_weathered_cut_copper"
  | "minecraft:waxed_exposed_cut_copper"
  | "minecraft:waxed_cut_copper"
  | "minecraft:waxed_oxidized_cut_copper_stairs"
  | "minecraft:waxed_weathered_cut_copper_stairs"
  | "minecraft:waxed_exposed_cut_copper_stairs"
  | "minecraft:waxed_cut_copper_stairs"
  | "minecraft:waxed_oxidized_cut_copper_slab"
  | "minecraft:waxed_weathered_cut_copper_slab"
  | "minecraft:waxed_exposed_cut_copper_slab"
  | "minecraft:waxed_cut_copper_slab"
  | "minecraft:lightning_rod"
  | "minecraft:pointed_dripstone"
  | "minecraft:dripstone_block"
  | "minecraft:cave_vines"
  | "minecraft:cave_vines_plant"
  | "minecraft:spore_blossom"
  | "minecraft:azalea"
  | "minecraft:flowering_azalea"
  | "minecraft:moss_carpet"
  | "minecraft:moss_block"
  | "minecraft:big_dripleaf"
  | "minecraft:big_dripleaf_stem"
  | "minecraft:small_dripleaf"
  | "minecraft:hanging_roots"
  | "minecraft:rooted_dirt"
  | "minecraft:mud"
  | "minecraft:deepslate"
  | "minecraft:cobbled_deepslate"
  | "minecraft:cobbled_deepslate_stairs"
  | "minecraft:cobbled_deepslate_slab"
  | "minecraft:cobbled_deepslate_wall"
  | "minecraft:polished_deepslate"
  | "minecraft:polished_deepslate_stairs"
  | "minecraft:polished_deepslate_slab"
  | "minecraft:polished_deepslate_wall"
  | "minecraft:deepslate_tiles"
  | "minecraft:deepslate_tile_stairs"
  | "minecraft:deepslate_tile_slab"
  | "minecraft:deepslate_tile_wall"
  | "minecraft:deepslate_bricks"
  | "minecraft:deepslate_brick_stairs"
  | "minecraft:deepslate_brick_slab"
  | "minecraft:deepslate_brick_wall"
  | "minecraft:chiseled_deepslate"
  | "minecraft:cracked_deepslate_bricks"
  | "minecraft:cracked_deepslate_tiles"
  | "minecraft:infested_deepslate"
  | "minecraft:smooth_basalt"
  | "minecraft:raw_iron_block"
  | "minecraft:raw_copper_block"
  | "minecraft:raw_gold_block"
  | "minecraft:potted_azalea_bush"
  | "minecraft:potted_flowering_azalea_bush"
  | "minecraft:ochre_froglight"
  | "minecraft:verdant_froglight"
  | "minecraft:pearlescent_froglight"
  | "minecraft:frogspawn"
  | "minecraft:reinforced_deepslate";

export const blockEnum = createEnumMapper<Block>(
  JSON.parse(
    `["minecraft:air","minecraft:stone","minecraft:granite","minecraft:polished_granite","minecraft:diorite","minecraft:polished_diorite","minecraft:andesite","minecraft:polished_andesite","minecraft:grass_block","minecraft:dirt","minecraft:coarse_dirt","minecraft:podzol","minecraft:cobblestone","minecraft:oak_planks","minecraft:spruce_planks","minecraft:birch_planks","minecraft:jungle_planks","minecraft:acacia_planks","minecraft:dark_oak_planks","minecraft:mangrove_planks","minecraft:oak_sapling","minecraft:spruce_sapling","minecraft:birch_sapling","minecraft:jungle_sapling","minecraft:acacia_sapling","minecraft:dark_oak_sapling","minecraft:mangrove_propagule","minecraft:bedrock","minecraft:water","minecraft:lava","minecraft:sand","minecraft:red_sand","minecraft:gravel","minecraft:gold_ore","minecraft:deepslate_gold_ore","minecraft:iron_ore","minecraft:deepslate_iron_ore","minecraft:coal_ore","minecraft:deepslate_coal_ore","minecraft:nether_gold_ore","minecraft:oak_log","minecraft:spruce_log","minecraft:birch_log","minecraft:jungle_log","minecraft:acacia_log","minecraft:dark_oak_log","minecraft:mangrove_log","minecraft:mangrove_roots","minecraft:muddy_mangrove_roots","minecraft:stripped_spruce_log","minecraft:stripped_birch_log","minecraft:stripped_jungle_log","minecraft:stripped_acacia_log","minecraft:stripped_dark_oak_log","minecraft:stripped_oak_log","minecraft:stripped_mangrove_log","minecraft:oak_wood","minecraft:spruce_wood","minecraft:birch_wood","minecraft:jungle_wood","minecraft:acacia_wood","minecraft:dark_oak_wood","minecraft:mangrove_wood","minecraft:stripped_oak_wood","minecraft:stripped_spruce_wood","minecraft:stripped_birch_wood","minecraft:stripped_jungle_wood","minecraft:stripped_acacia_wood","minecraft:stripped_dark_oak_wood","minecraft:stripped_mangrove_wood","minecraft:oak_leaves","minecraft:spruce_leaves","minecraft:birch_leaves","minecraft:jungle_leaves","minecraft:acacia_leaves","minecraft:dark_oak_leaves","minecraft:mangrove_leaves","minecraft:azalea_leaves","minecraft:flowering_azalea_leaves","minecraft:sponge","minecraft:wet_sponge","minecraft:glass","minecraft:lapis_ore","minecraft:deepslate_lapis_ore","minecraft:lapis_block","minecraft:dispenser","minecraft:sandstone","minecraft:chiseled_sandstone","minecraft:cut_sandstone","minecraft:note_block","minecraft:white_bed","minecraft:orange_bed","minecraft:magenta_bed","minecraft:light_blue_bed","minecraft:yellow_bed","minecraft:lime_bed","minecraft:pink_bed","minecraft:gray_bed","minecraft:light_gray_bed","minecraft:cyan_bed","minecraft:purple_bed","minecraft:blue_bed","minecraft:brown_bed","minecraft:green_bed","minecraft:red_bed","minecraft:black_bed","minecraft:powered_rail","minecraft:detector_rail","minecraft:sticky_piston","minecraft:cobweb","minecraft:grass","minecraft:fern","minecraft:dead_bush","minecraft:seagrass","minecraft:tall_seagrass","minecraft:piston","minecraft:piston_head","minecraft:white_wool","minecraft:orange_wool","minecraft:magenta_wool","minecraft:light_blue_wool","minecraft:yellow_wool","minecraft:lime_wool","minecraft:pink_wool","minecraft:gray_wool","minecraft:light_gray_wool","minecraft:cyan_wool","minecraft:purple_wool","minecraft:blue_wool","minecraft:brown_wool","minecraft:green_wool","minecraft:red_wool","minecraft:black_wool","minecraft:moving_piston","minecraft:dandelion","minecraft:poppy","minecraft:blue_orchid","minecraft:allium","minecraft:azure_bluet","minecraft:red_tulip","minecraft:orange_tulip","minecraft:white_tulip","minecraft:pink_tulip","minecraft:oxeye_daisy","minecraft:cornflower","minecraft:wither_rose","minecraft:lily_of_the_valley","minecraft:brown_mushroom","minecraft:red_mushroom","minecraft:gold_block","minecraft:iron_block","minecraft:bricks","minecraft:tnt","minecraft:bookshelf","minecraft:mossy_cobblestone","minecraft:obsidian","minecraft:torch","minecraft:wall_torch","minecraft:fire","minecraft:soul_fire","minecraft:spawner","minecraft:oak_stairs","minecraft:chest","minecraft:redstone_wire","minecraft:diamond_ore","minecraft:deepslate_diamond_ore","minecraft:diamond_block","minecraft:crafting_table","minecraft:wheat","minecraft:farmland","minecraft:furnace","minecraft:oak_sign","minecraft:spruce_sign","minecraft:birch_sign","minecraft:acacia_sign","minecraft:jungle_sign","minecraft:dark_oak_sign","minecraft:mangrove_sign","minecraft:oak_door","minecraft:ladder","minecraft:rail","minecraft:cobblestone_stairs","minecraft:oak_wall_sign","minecraft:spruce_wall_sign","minecraft:birch_wall_sign","minecraft:acacia_wall_sign","minecraft:jungle_wall_sign","minecraft:dark_oak_wall_sign","minecraft:mangrove_wall_sign","minecraft:lever","minecraft:stone_pressure_plate","minecraft:iron_door","minecraft:oak_pressure_plate","minecraft:spruce_pressure_plate","minecraft:birch_pressure_plate","minecraft:jungle_pressure_plate","minecraft:acacia_pressure_plate","minecraft:dark_oak_pressure_plate","minecraft:mangrove_pressure_plate","minecraft:redstone_ore","minecraft:deepslate_redstone_ore","minecraft:redstone_torch","minecraft:redstone_wall_torch","minecraft:stone_button","minecraft:snow","minecraft:ice","minecraft:snow_block","minecraft:cactus","minecraft:clay","minecraft:sugar_cane","minecraft:jukebox","minecraft:oak_fence","minecraft:pumpkin","minecraft:netherrack","minecraft:soul_sand","minecraft:soul_soil","minecraft:basalt","minecraft:polished_basalt","minecraft:soul_torch","minecraft:soul_wall_torch","minecraft:glowstone","minecraft:nether_portal","minecraft:carved_pumpkin","minecraft:jack_o_lantern","minecraft:cake","minecraft:repeater","minecraft:white_stained_glass","minecraft:orange_stained_glass","minecraft:magenta_stained_glass","minecraft:light_blue_stained_glass","minecraft:yellow_stained_glass","minecraft:lime_stained_glass","minecraft:pink_stained_glass","minecraft:gray_stained_glass","minecraft:light_gray_stained_glass","minecraft:cyan_stained_glass","minecraft:purple_stained_glass","minecraft:blue_stained_glass","minecraft:brown_stained_glass","minecraft:green_stained_glass","minecraft:red_stained_glass","minecraft:black_stained_glass","minecraft:oak_trapdoor","minecraft:spruce_trapdoor","minecraft:birch_trapdoor","minecraft:jungle_trapdoor","minecraft:acacia_trapdoor","minecraft:dark_oak_trapdoor","minecraft:mangrove_trapdoor","minecraft:stone_bricks","minecraft:mossy_stone_bricks","minecraft:cracked_stone_bricks","minecraft:chiseled_stone_bricks","minecraft:packed_mud","minecraft:mud_bricks","minecraft:infested_stone","minecraft:infested_cobblestone","minecraft:infested_stone_bricks","minecraft:infested_mossy_stone_bricks","minecraft:infested_cracked_stone_bricks","minecraft:infested_chiseled_stone_bricks","minecraft:brown_mushroom_block","minecraft:red_mushroom_block","minecraft:mushroom_stem","minecraft:iron_bars","minecraft:chain","minecraft:glass_pane","minecraft:melon","minecraft:attached_pumpkin_stem","minecraft:attached_melon_stem","minecraft:pumpkin_stem","minecraft:melon_stem","minecraft:vine","minecraft:glow_lichen","minecraft:oak_fence_gate","minecraft:brick_stairs","minecraft:stone_brick_stairs","minecraft:mud_brick_stairs","minecraft:mycelium","minecraft:lily_pad","minecraft:nether_bricks","minecraft:nether_brick_fence","minecraft:nether_brick_stairs","minecraft:nether_wart","minecraft:enchanting_table","minecraft:brewing_stand","minecraft:cauldron","minecraft:water_cauldron","minecraft:lava_cauldron","minecraft:powder_snow_cauldron","minecraft:end_portal","minecraft:end_portal_frame","minecraft:end_stone","minecraft:dragon_egg","minecraft:redstone_lamp","minecraft:cocoa","minecraft:sandstone_stairs","minecraft:emerald_ore","minecraft:deepslate_emerald_ore","minecraft:ender_chest","minecraft:tripwire_hook","minecraft:tripwire","minecraft:emerald_block","minecraft:spruce_stairs","minecraft:birch_stairs","minecraft:jungle_stairs","minecraft:command_block","minecraft:beacon","minecraft:cobblestone_wall","minecraft:mossy_cobblestone_wall","minecraft:flower_pot","minecraft:potted_oak_sapling","minecraft:potted_spruce_sapling","minecraft:potted_birch_sapling","minecraft:potted_jungle_sapling","minecraft:potted_acacia_sapling","minecraft:potted_dark_oak_sapling","minecraft:potted_mangrove_propagule","minecraft:potted_fern","minecraft:potted_dandelion","minecraft:potted_poppy","minecraft:potted_blue_orchid","minecraft:potted_allium","minecraft:potted_azure_bluet","minecraft:potted_red_tulip","minecraft:potted_orange_tulip","minecraft:potted_white_tulip","minecraft:potted_pink_tulip","minecraft:potted_oxeye_daisy","minecraft:potted_cornflower","minecraft:potted_lily_of_the_valley","minecraft:potted_wither_rose","minecraft:potted_red_mushroom","minecraft:potted_brown_mushroom","minecraft:potted_dead_bush","minecraft:potted_cactus","minecraft:carrots","minecraft:potatoes","minecraft:oak_button","minecraft:spruce_button","minecraft:birch_button","minecraft:jungle_button","minecraft:acacia_button","minecraft:dark_oak_button","minecraft:mangrove_button","minecraft:skeleton_skull","minecraft:skeleton_wall_skull","minecraft:wither_skeleton_skull","minecraft:wither_skeleton_wall_skull","minecraft:zombie_head","minecraft:zombie_wall_head","minecraft:player_head","minecraft:player_wall_head","minecraft:creeper_head","minecraft:creeper_wall_head","minecraft:dragon_head","minecraft:dragon_wall_head","minecraft:anvil","minecraft:chipped_anvil","minecraft:damaged_anvil","minecraft:trapped_chest","minecraft:light_weighted_pressure_plate","minecraft:heavy_weighted_pressure_plate","minecraft:comparator","minecraft:daylight_detector","minecraft:redstone_block","minecraft:nether_quartz_ore","minecraft:hopper","minecraft:quartz_block","minecraft:chiseled_quartz_block","minecraft:quartz_pillar","minecraft:quartz_stairs","minecraft:activator_rail","minecraft:dropper","minecraft:white_terracotta","minecraft:orange_terracotta","minecraft:magenta_terracotta","minecraft:light_blue_terracotta","minecraft:yellow_terracotta","minecraft:lime_terracotta","minecraft:pink_terracotta","minecraft:gray_terracotta","minecraft:light_gray_terracotta","minecraft:cyan_terracotta","minecraft:purple_terracotta","minecraft:blue_terracotta","minecraft:brown_terracotta","minecraft:green_terracotta","minecraft:red_terracotta","minecraft:black_terracotta","minecraft:white_stained_glass_pane","minecraft:orange_stained_glass_pane","minecraft:magenta_stained_glass_pane","minecraft:light_blue_stained_glass_pane","minecraft:yellow_stained_glass_pane","minecraft:lime_stained_glass_pane","minecraft:pink_stained_glass_pane","minecraft:gray_stained_glass_pane","minecraft:light_gray_stained_glass_pane","minecraft:cyan_stained_glass_pane","minecraft:purple_stained_glass_pane","minecraft:blue_stained_glass_pane","minecraft:brown_stained_glass_pane","minecraft:green_stained_glass_pane","minecraft:red_stained_glass_pane","minecraft:black_stained_glass_pane","minecraft:acacia_stairs","minecraft:dark_oak_stairs","minecraft:mangrove_stairs","minecraft:slime_block","minecraft:barrier","minecraft:light","minecraft:iron_trapdoor","minecraft:prismarine","minecraft:prismarine_bricks","minecraft:dark_prismarine","minecraft:prismarine_stairs","minecraft:prismarine_brick_stairs","minecraft:dark_prismarine_stairs","minecraft:prismarine_slab","minecraft:prismarine_brick_slab","minecraft:dark_prismarine_slab","minecraft:sea_lantern","minecraft:hay_block","minecraft:white_carpet","minecraft:orange_carpet","minecraft:magenta_carpet","minecraft:light_blue_carpet","minecraft:yellow_carpet","minecraft:lime_carpet","minecraft:pink_carpet","minecraft:gray_carpet","minecraft:light_gray_carpet","minecraft:cyan_carpet","minecraft:purple_carpet","minecraft:blue_carpet","minecraft:brown_carpet","minecraft:green_carpet","minecraft:red_carpet","minecraft:black_carpet","minecraft:terracotta","minecraft:coal_block","minecraft:packed_ice","minecraft:sunflower","minecraft:lilac","minecraft:rose_bush","minecraft:peony","minecraft:tall_grass","minecraft:large_fern","minecraft:white_banner","minecraft:orange_banner","minecraft:magenta_banner","minecraft:light_blue_banner","minecraft:yellow_banner","minecraft:lime_banner","minecraft:pink_banner","minecraft:gray_banner","minecraft:light_gray_banner","minecraft:cyan_banner","minecraft:purple_banner","minecraft:blue_banner","minecraft:brown_banner","minecraft:green_banner","minecraft:red_banner","minecraft:black_banner","minecraft:white_wall_banner","minecraft:orange_wall_banner","minecraft:magenta_wall_banner","minecraft:light_blue_wall_banner","minecraft:yellow_wall_banner","minecraft:lime_wall_banner","minecraft:pink_wall_banner","minecraft:gray_wall_banner","minecraft:light_gray_wall_banner","minecraft:cyan_wall_banner","minecraft:purple_wall_banner","minecraft:blue_wall_banner","minecraft:brown_wall_banner","minecraft:green_wall_banner","minecraft:red_wall_banner","minecraft:black_wall_banner","minecraft:red_sandstone","minecraft:chiseled_red_sandstone","minecraft:cut_red_sandstone","minecraft:red_sandstone_stairs","minecraft:oak_slab","minecraft:spruce_slab","minecraft:birch_slab","minecraft:jungle_slab","minecraft:acacia_slab","minecraft:dark_oak_slab","minecraft:mangrove_slab","minecraft:stone_slab","minecraft:smooth_stone_slab","minecraft:sandstone_slab","minecraft:cut_sandstone_slab","minecraft:petrified_oak_slab","minecraft:cobblestone_slab","minecraft:brick_slab","minecraft:stone_brick_slab","minecraft:mud_brick_slab","minecraft:nether_brick_slab","minecraft:quartz_slab","minecraft:red_sandstone_slab","minecraft:cut_red_sandstone_slab","minecraft:purpur_slab","minecraft:smooth_stone","minecraft:smooth_sandstone","minecraft:smooth_quartz","minecraft:smooth_red_sandstone","minecraft:spruce_fence_gate","minecraft:birch_fence_gate","minecraft:jungle_fence_gate","minecraft:acacia_fence_gate","minecraft:dark_oak_fence_gate","minecraft:mangrove_fence_gate","minecraft:spruce_fence","minecraft:birch_fence","minecraft:jungle_fence","minecraft:acacia_fence","minecraft:dark_oak_fence","minecraft:mangrove_fence","minecraft:spruce_door","minecraft:birch_door","minecraft:jungle_door","minecraft:acacia_door","minecraft:dark_oak_door","minecraft:mangrove_door","minecraft:end_rod","minecraft:chorus_plant","minecraft:chorus_flower","minecraft:purpur_block","minecraft:purpur_pillar","minecraft:purpur_stairs","minecraft:end_stone_bricks","minecraft:beetroots","minecraft:dirt_path","minecraft:end_gateway","minecraft:repeating_command_block","minecraft:chain_command_block","minecraft:frosted_ice","minecraft:magma_block","minecraft:nether_wart_block","minecraft:red_nether_bricks","minecraft:bone_block","minecraft:structure_void","minecraft:observer","minecraft:shulker_box","minecraft:white_shulker_box","minecraft:orange_shulker_box","minecraft:magenta_shulker_box","minecraft:light_blue_shulker_box","minecraft:yellow_shulker_box","minecraft:lime_shulker_box","minecraft:pink_shulker_box","minecraft:gray_shulker_box","minecraft:light_gray_shulker_box","minecraft:cyan_shulker_box","minecraft:purple_shulker_box","minecraft:blue_shulker_box","minecraft:brown_shulker_box","minecraft:green_shulker_box","minecraft:red_shulker_box","minecraft:black_shulker_box","minecraft:white_glazed_terracotta","minecraft:orange_glazed_terracotta","minecraft:magenta_glazed_terracotta","minecraft:light_blue_glazed_terracotta","minecraft:yellow_glazed_terracotta","minecraft:lime_glazed_terracotta","minecraft:pink_glazed_terracotta","minecraft:gray_glazed_terracotta","minecraft:light_gray_glazed_terracotta","minecraft:cyan_glazed_terracotta","minecraft:purple_glazed_terracotta","minecraft:blue_glazed_terracotta","minecraft:brown_glazed_terracotta","minecraft:green_glazed_terracotta","minecraft:red_glazed_terracotta","minecraft:black_glazed_terracotta","minecraft:white_concrete","minecraft:orange_concrete","minecraft:magenta_concrete","minecraft:light_blue_concrete","minecraft:yellow_concrete","minecraft:lime_concrete","minecraft:pink_concrete","minecraft:gray_concrete","minecraft:light_gray_concrete","minecraft:cyan_concrete","minecraft:purple_concrete","minecraft:blue_concrete","minecraft:brown_concrete","minecraft:green_concrete","minecraft:red_concrete","minecraft:black_concrete","minecraft:white_concrete_powder","minecraft:orange_concrete_powder","minecraft:magenta_concrete_powder","minecraft:light_blue_concrete_powder","minecraft:yellow_concrete_powder","minecraft:lime_concrete_powder","minecraft:pink_concrete_powder","minecraft:gray_concrete_powder","minecraft:light_gray_concrete_powder","minecraft:cyan_concrete_powder","minecraft:purple_concrete_powder","minecraft:blue_concrete_powder","minecraft:brown_concrete_powder","minecraft:green_concrete_powder","minecraft:red_concrete_powder","minecraft:black_concrete_powder","minecraft:kelp","minecraft:kelp_plant","minecraft:dried_kelp_block","minecraft:turtle_egg","minecraft:dead_tube_coral_block","minecraft:dead_brain_coral_block","minecraft:dead_bubble_coral_block","minecraft:dead_fire_coral_block","minecraft:dead_horn_coral_block","minecraft:tube_coral_block","minecraft:brain_coral_block","minecraft:bubble_coral_block","minecraft:fire_coral_block","minecraft:horn_coral_block","minecraft:dead_tube_coral","minecraft:dead_brain_coral","minecraft:dead_bubble_coral","minecraft:dead_fire_coral","minecraft:dead_horn_coral","minecraft:tube_coral","minecraft:brain_coral","minecraft:bubble_coral","minecraft:fire_coral","minecraft:horn_coral","minecraft:dead_tube_coral_fan","minecraft:dead_brain_coral_fan","minecraft:dead_bubble_coral_fan","minecraft:dead_fire_coral_fan","minecraft:dead_horn_coral_fan","minecraft:tube_coral_fan","minecraft:brain_coral_fan","minecraft:bubble_coral_fan","minecraft:fire_coral_fan","minecraft:horn_coral_fan","minecraft:dead_tube_coral_wall_fan","minecraft:dead_brain_coral_wall_fan","minecraft:dead_bubble_coral_wall_fan","minecraft:dead_fire_coral_wall_fan","minecraft:dead_horn_coral_wall_fan","minecraft:tube_coral_wall_fan","minecraft:brain_coral_wall_fan","minecraft:bubble_coral_wall_fan","minecraft:fire_coral_wall_fan","minecraft:horn_coral_wall_fan","minecraft:sea_pickle","minecraft:blue_ice","minecraft:conduit","minecraft:bamboo_sapling","minecraft:bamboo","minecraft:potted_bamboo","minecraft:void_air","minecraft:cave_air","minecraft:bubble_column","minecraft:polished_granite_stairs","minecraft:smooth_red_sandstone_stairs","minecraft:mossy_stone_brick_stairs","minecraft:polished_diorite_stairs","minecraft:mossy_cobblestone_stairs","minecraft:end_stone_brick_stairs","minecraft:stone_stairs","minecraft:smooth_sandstone_stairs","minecraft:smooth_quartz_stairs","minecraft:granite_stairs","minecraft:andesite_stairs","minecraft:red_nether_brick_stairs","minecraft:polished_andesite_stairs","minecraft:diorite_stairs","minecraft:polished_granite_slab","minecraft:smooth_red_sandstone_slab","minecraft:mossy_stone_brick_slab","minecraft:polished_diorite_slab","minecraft:mossy_cobblestone_slab","minecraft:end_stone_brick_slab","minecraft:smooth_sandstone_slab","minecraft:smooth_quartz_slab","minecraft:granite_slab","minecraft:andesite_slab","minecraft:red_nether_brick_slab","minecraft:polished_andesite_slab","minecraft:diorite_slab","minecraft:brick_wall","minecraft:prismarine_wall","minecraft:red_sandstone_wall","minecraft:mossy_stone_brick_wall","minecraft:granite_wall","minecraft:stone_brick_wall","minecraft:mud_brick_wall","minecraft:nether_brick_wall","minecraft:andesite_wall","minecraft:red_nether_brick_wall","minecraft:sandstone_wall","minecraft:end_stone_brick_wall","minecraft:diorite_wall","minecraft:scaffolding","minecraft:loom","minecraft:barrel","minecraft:smoker","minecraft:blast_furnace","minecraft:cartography_table","minecraft:fletching_table","minecraft:grindstone","minecraft:lectern","minecraft:smithing_table","minecraft:stonecutter","minecraft:bell","minecraft:lantern","minecraft:soul_lantern","minecraft:campfire","minecraft:soul_campfire","minecraft:sweet_berry_bush","minecraft:warped_stem","minecraft:stripped_warped_stem","minecraft:warped_hyphae","minecraft:stripped_warped_hyphae","minecraft:warped_nylium","minecraft:warped_fungus","minecraft:warped_wart_block","minecraft:warped_roots","minecraft:nether_sprouts","minecraft:crimson_stem","minecraft:stripped_crimson_stem","minecraft:crimson_hyphae","minecraft:stripped_crimson_hyphae","minecraft:crimson_nylium","minecraft:crimson_fungus","minecraft:shroomlight","minecraft:weeping_vines","minecraft:weeping_vines_plant","minecraft:twisting_vines","minecraft:twisting_vines_plant","minecraft:crimson_roots","minecraft:crimson_planks","minecraft:warped_planks","minecraft:crimson_slab","minecraft:warped_slab","minecraft:crimson_pressure_plate","minecraft:warped_pressure_plate","minecraft:crimson_fence","minecraft:warped_fence","minecraft:crimson_trapdoor","minecraft:warped_trapdoor","minecraft:crimson_fence_gate","minecraft:warped_fence_gate","minecraft:crimson_stairs","minecraft:warped_stairs","minecraft:crimson_button","minecraft:warped_button","minecraft:crimson_door","minecraft:warped_door","minecraft:crimson_sign","minecraft:warped_sign","minecraft:crimson_wall_sign","minecraft:warped_wall_sign","minecraft:structure_block","minecraft:jigsaw","minecraft:composter","minecraft:target","minecraft:bee_nest","minecraft:beehive","minecraft:honey_block","minecraft:honeycomb_block","minecraft:netherite_block","minecraft:ancient_debris","minecraft:crying_obsidian","minecraft:respawn_anchor","minecraft:potted_crimson_fungus","minecraft:potted_warped_fungus","minecraft:potted_crimson_roots","minecraft:potted_warped_roots","minecraft:lodestone","minecraft:blackstone","minecraft:blackstone_stairs","minecraft:blackstone_wall","minecraft:blackstone_slab","minecraft:polished_blackstone","minecraft:polished_blackstone_bricks","minecraft:cracked_polished_blackstone_bricks","minecraft:chiseled_polished_blackstone","minecraft:polished_blackstone_brick_slab","minecraft:polished_blackstone_brick_stairs","minecraft:polished_blackstone_brick_wall","minecraft:gilded_blackstone","minecraft:polished_blackstone_stairs","minecraft:polished_blackstone_slab","minecraft:polished_blackstone_pressure_plate","minecraft:polished_blackstone_button","minecraft:polished_blackstone_wall","minecraft:chiseled_nether_bricks","minecraft:cracked_nether_bricks","minecraft:quartz_bricks","minecraft:candle","minecraft:white_candle","minecraft:orange_candle","minecraft:magenta_candle","minecraft:light_blue_candle","minecraft:yellow_candle","minecraft:lime_candle","minecraft:pink_candle","minecraft:gray_candle","minecraft:light_gray_candle","minecraft:cyan_candle","minecraft:purple_candle","minecraft:blue_candle","minecraft:brown_candle","minecraft:green_candle","minecraft:red_candle","minecraft:black_candle","minecraft:candle_cake","minecraft:white_candle_cake","minecraft:orange_candle_cake","minecraft:magenta_candle_cake","minecraft:light_blue_candle_cake","minecraft:yellow_candle_cake","minecraft:lime_candle_cake","minecraft:pink_candle_cake","minecraft:gray_candle_cake","minecraft:light_gray_candle_cake","minecraft:cyan_candle_cake","minecraft:purple_candle_cake","minecraft:blue_candle_cake","minecraft:brown_candle_cake","minecraft:green_candle_cake","minecraft:red_candle_cake","minecraft:black_candle_cake","minecraft:amethyst_block","minecraft:budding_amethyst","minecraft:amethyst_cluster","minecraft:large_amethyst_bud","minecraft:medium_amethyst_bud","minecraft:small_amethyst_bud","minecraft:tuff","minecraft:calcite","minecraft:tinted_glass","minecraft:powder_snow","minecraft:sculk_sensor","minecraft:sculk","minecraft:sculk_vein","minecraft:sculk_catalyst","minecraft:sculk_shrieker","minecraft:oxidized_copper","minecraft:weathered_copper","minecraft:exposed_copper","minecraft:copper_block","minecraft:copper_ore","minecraft:deepslate_copper_ore","minecraft:oxidized_cut_copper","minecraft:weathered_cut_copper","minecraft:exposed_cut_copper","minecraft:cut_copper","minecraft:oxidized_cut_copper_stairs","minecraft:weathered_cut_copper_stairs","minecraft:exposed_cut_copper_stairs","minecraft:cut_copper_stairs","minecraft:oxidized_cut_copper_slab","minecraft:weathered_cut_copper_slab","minecraft:exposed_cut_copper_slab","minecraft:cut_copper_slab","minecraft:waxed_copper_block","minecraft:waxed_weathered_copper","minecraft:waxed_exposed_copper","minecraft:waxed_oxidized_copper","minecraft:waxed_oxidized_cut_copper","minecraft:waxed_weathered_cut_copper","minecraft:waxed_exposed_cut_copper","minecraft:waxed_cut_copper","minecraft:waxed_oxidized_cut_copper_stairs","minecraft:waxed_weathered_cut_copper_stairs","minecraft:waxed_exposed_cut_copper_stairs","minecraft:waxed_cut_copper_stairs","minecraft:waxed_oxidized_cut_copper_slab","minecraft:waxed_weathered_cut_copper_slab","minecraft:waxed_exposed_cut_copper_slab","minecraft:waxed_cut_copper_slab","minecraft:lightning_rod","minecraft:pointed_dripstone","minecraft:dripstone_block","minecraft:cave_vines","minecraft:cave_vines_plant","minecraft:spore_blossom","minecraft:azalea","minecraft:flowering_azalea","minecraft:moss_carpet","minecraft:moss_block","minecraft:big_dripleaf","minecraft:big_dripleaf_stem","minecraft:small_dripleaf","minecraft:hanging_roots","minecraft:rooted_dirt","minecraft:mud","minecraft:deepslate","minecraft:cobbled_deepslate","minecraft:cobbled_deepslate_stairs","minecraft:cobbled_deepslate_slab","minecraft:cobbled_deepslate_wall","minecraft:polished_deepslate","minecraft:polished_deepslate_stairs","minecraft:polished_deepslate_slab","minecraft:polished_deepslate_wall","minecraft:deepslate_tiles","minecraft:deepslate_tile_stairs","minecraft:deepslate_tile_slab","minecraft:deepslate_tile_wall","minecraft:deepslate_bricks","minecraft:deepslate_brick_stairs","minecraft:deepslate_brick_slab","minecraft:deepslate_brick_wall","minecraft:chiseled_deepslate","minecraft:cracked_deepslate_bricks","minecraft:cracked_deepslate_tiles","minecraft:infested_deepslate","minecraft:smooth_basalt","minecraft:raw_iron_block","minecraft:raw_copper_block","minecraft:raw_gold_block","minecraft:potted_azalea_bush","minecraft:potted_flowering_azalea_bush","minecraft:ochre_froglight","minecraft:verdant_froglight","minecraft:pearlescent_froglight","minecraft:frogspawn","minecraft:reinforced_deepslate"]`,
  ),
);

export function readBlock(reader: Reader): Block {
  return blockEnum.fromId(reader.readVarInt());
}

export function writeBlock(writer: Writer, value: Block) {
  writer.writeVarInt(blockEnum.toId(value));
}

export type ParticleType =
  | "minecraft:ambient_entity_effect"
  | "minecraft:angry_villager"
  | "minecraft:block"
  | "minecraft:block_marker"
  | "minecraft:bubble"
  | "minecraft:cloud"
  | "minecraft:crit"
  | "minecraft:damage_indicator"
  | "minecraft:dragon_breath"
  | "minecraft:dripping_lava"
  | "minecraft:falling_lava"
  | "minecraft:landing_lava"
  | "minecraft:dripping_water"
  | "minecraft:falling_water"
  | "minecraft:dust"
  | "minecraft:dust_color_transition"
  | "minecraft:effect"
  | "minecraft:elder_guardian"
  | "minecraft:enchanted_hit"
  | "minecraft:enchant"
  | "minecraft:end_rod"
  | "minecraft:entity_effect"
  | "minecraft:explosion_emitter"
  | "minecraft:explosion"
  | "minecraft:sonic_boom"
  | "minecraft:falling_dust"
  | "minecraft:firework"
  | "minecraft:fishing"
  | "minecraft:flame"
  | "minecraft:sculk_soul"
  | "minecraft:sculk_charge"
  | "minecraft:sculk_charge_pop"
  | "minecraft:soul_fire_flame"
  | "minecraft:soul"
  | "minecraft:flash"
  | "minecraft:happy_villager"
  | "minecraft:composter"
  | "minecraft:heart"
  | "minecraft:instant_effect"
  | "minecraft:item"
  | "minecraft:vibration"
  | "minecraft:item_slime"
  | "minecraft:item_snowball"
  | "minecraft:large_smoke"
  | "minecraft:lava"
  | "minecraft:mycelium"
  | "minecraft:note"
  | "minecraft:poof"
  | "minecraft:portal"
  | "minecraft:rain"
  | "minecraft:smoke"
  | "minecraft:sneeze"
  | "minecraft:spit"
  | "minecraft:squid_ink"
  | "minecraft:sweep_attack"
  | "minecraft:totem_of_undying"
  | "minecraft:underwater"
  | "minecraft:splash"
  | "minecraft:witch"
  | "minecraft:bubble_pop"
  | "minecraft:current_down"
  | "minecraft:bubble_column_up"
  | "minecraft:nautilus"
  | "minecraft:dolphin"
  | "minecraft:campfire_cosy_smoke"
  | "minecraft:campfire_signal_smoke"
  | "minecraft:dripping_honey"
  | "minecraft:falling_honey"
  | "minecraft:landing_honey"
  | "minecraft:falling_nectar"
  | "minecraft:falling_spore_blossom"
  | "minecraft:ash"
  | "minecraft:crimson_spore"
  | "minecraft:warped_spore"
  | "minecraft:spore_blossom_air"
  | "minecraft:dripping_obsidian_tear"
  | "minecraft:falling_obsidian_tear"
  | "minecraft:landing_obsidian_tear"
  | "minecraft:reverse_portal"
  | "minecraft:white_ash"
  | "minecraft:small_flame"
  | "minecraft:snowflake"
  | "minecraft:dripping_dripstone_lava"
  | "minecraft:falling_dripstone_lava"
  | "minecraft:dripping_dripstone_water"
  | "minecraft:falling_dripstone_water"
  | "minecraft:glow_squid_ink"
  | "minecraft:glow"
  | "minecraft:wax_on"
  | "minecraft:wax_off"
  | "minecraft:electric_spark"
  | "minecraft:scrape"
  | "minecraft:shriek";

export const particleTypeEnum = createEnumMapper<ParticleType>(
  JSON.parse(
    `["minecraft:ambient_entity_effect","minecraft:angry_villager","minecraft:block","minecraft:block_marker","minecraft:bubble","minecraft:cloud","minecraft:crit","minecraft:damage_indicator","minecraft:dragon_breath","minecraft:dripping_lava","minecraft:falling_lava","minecraft:landing_lava","minecraft:dripping_water","minecraft:falling_water","minecraft:dust","minecraft:dust_color_transition","minecraft:effect","minecraft:elder_guardian","minecraft:enchanted_hit","minecraft:enchant","minecraft:end_rod","minecraft:entity_effect","minecraft:explosion_emitter","minecraft:explosion","minecraft:sonic_boom","minecraft:falling_dust","minecraft:firework","minecraft:fishing","minecraft:flame","minecraft:sculk_soul","minecraft:sculk_charge","minecraft:sculk_charge_pop","minecraft:soul_fire_flame","minecraft:soul","minecraft:flash","minecraft:happy_villager","minecraft:composter","minecraft:heart","minecraft:instant_effect","minecraft:item","minecraft:vibration","minecraft:item_slime","minecraft:item_snowball","minecraft:large_smoke","minecraft:lava","minecraft:mycelium","minecraft:note","minecraft:poof","minecraft:portal","minecraft:rain","minecraft:smoke","minecraft:sneeze","minecraft:spit","minecraft:squid_ink","minecraft:sweep_attack","minecraft:totem_of_undying","minecraft:underwater","minecraft:splash","minecraft:witch","minecraft:bubble_pop","minecraft:current_down","minecraft:bubble_column_up","minecraft:nautilus","minecraft:dolphin","minecraft:campfire_cosy_smoke","minecraft:campfire_signal_smoke","minecraft:dripping_honey","minecraft:falling_honey","minecraft:landing_honey","minecraft:falling_nectar","minecraft:falling_spore_blossom","minecraft:ash","minecraft:crimson_spore","minecraft:warped_spore","minecraft:spore_blossom_air","minecraft:dripping_obsidian_tear","minecraft:falling_obsidian_tear","minecraft:landing_obsidian_tear","minecraft:reverse_portal","minecraft:white_ash","minecraft:small_flame","minecraft:snowflake","minecraft:dripping_dripstone_lava","minecraft:falling_dripstone_lava","minecraft:dripping_dripstone_water","minecraft:falling_dripstone_water","minecraft:glow_squid_ink","minecraft:glow","minecraft:wax_on","minecraft:wax_off","minecraft:electric_spark","minecraft:scrape","minecraft:shriek"]`,
  ),
);

export function readParticleType(reader: Reader): ParticleType {
  return particleTypeEnum.fromId(reader.readVarInt());
}

export function writeParticleType(writer: Writer, value: ParticleType) {
  writer.writeVarInt(particleTypeEnum.toId(value));
}

export type Menu =
  | "minecraft:generic_9x1"
  | "minecraft:generic_9x2"
  | "minecraft:generic_9x3"
  | "minecraft:generic_9x4"
  | "minecraft:generic_9x5"
  | "minecraft:generic_9x6"
  | "minecraft:generic_3x3"
  | "minecraft:anvil"
  | "minecraft:beacon"
  | "minecraft:blast_furnace"
  | "minecraft:brewing_stand"
  | "minecraft:crafting"
  | "minecraft:enchantment"
  | "minecraft:furnace"
  | "minecraft:grindstone"
  | "minecraft:hopper"
  | "minecraft:lectern"
  | "minecraft:loom"
  | "minecraft:merchant"
  | "minecraft:shulker_box"
  | "minecraft:smithing"
  | "minecraft:smoker"
  | "minecraft:cartography_table"
  | "minecraft:stonecutter";

export const menuEnum = createEnumMapper<Menu>(
  JSON.parse(
    `["minecraft:generic_9x1","minecraft:generic_9x2","minecraft:generic_9x3","minecraft:generic_9x4","minecraft:generic_9x5","minecraft:generic_9x6","minecraft:generic_3x3","minecraft:anvil","minecraft:beacon","minecraft:blast_furnace","minecraft:brewing_stand","minecraft:crafting","minecraft:enchantment","minecraft:furnace","minecraft:grindstone","minecraft:hopper","minecraft:lectern","minecraft:loom","minecraft:merchant","minecraft:shulker_box","minecraft:smithing","minecraft:smoker","minecraft:cartography_table","minecraft:stonecutter"]`,
  ),
);

export function readMenu(reader: Reader): Menu {
  return menuEnum.fromId(reader.readVarInt());
}

export function writeMenu(writer: Writer, value: Menu) {
  writer.writeVarInt(menuEnum.toId(value));
}

export type VillagerType = "minecraft:desert" | "minecraft:jungle" | "minecraft:plains" | "minecraft:savanna" | "minecraft:snow" | "minecraft:swamp" | "minecraft:taiga";

export const villagerTypeEnum = createEnumMapper<VillagerType>([
  "minecraft:desert",
  "minecraft:jungle",
  "minecraft:plains",
  "minecraft:savanna",
  "minecraft:snow",
  "minecraft:swamp",
  "minecraft:taiga",
]);

export function readVillagerType(reader: Reader): VillagerType {
  return villagerTypeEnum.fromId(reader.readVarInt());
}

export function writeVillagerType(writer: Writer, value: VillagerType) {
  writer.writeVarInt(villagerTypeEnum.toId(value));
}

export type VillagerProfession =
  | "minecraft:none"
  | "minecraft:armorer"
  | "minecraft:butcher"
  | "minecraft:cartographer"
  | "minecraft:cleric"
  | "minecraft:farmer"
  | "minecraft:fisherman"
  | "minecraft:fletcher"
  | "minecraft:leatherworker"
  | "minecraft:librarian"
  | "minecraft:mason"
  | "minecraft:nitwit"
  | "minecraft:shepherd"
  | "minecraft:toolsmith"
  | "minecraft:weaponsmith";

export const villagerProfessionEnum = createEnumMapper<VillagerProfession>([
  "minecraft:none",
  "minecraft:armorer",
  "minecraft:butcher",
  "minecraft:cartographer",
  "minecraft:cleric",
  "minecraft:farmer",
  "minecraft:fisherman",
  "minecraft:fletcher",
  "minecraft:leatherworker",
  "minecraft:librarian",
  "minecraft:mason",
  "minecraft:nitwit",
  "minecraft:shepherd",
  "minecraft:toolsmith",
  "minecraft:weaponsmith",
]);

export function readVillagerProfession(reader: Reader): VillagerProfession {
  return villagerProfessionEnum.fromId(reader.readVarInt());
}

export function writeVillagerProfession(writer: Writer, value: VillagerProfession) {
  writer.writeVarInt(villagerProfessionEnum.toId(value));
}

export type CatVariant =
  | "minecraft:tabby"
  | "minecraft:black"
  | "minecraft:red"
  | "minecraft:siamese"
  | "minecraft:british_shorthair"
  | "minecraft:calico"
  | "minecraft:persian"
  | "minecraft:ragdoll"
  | "minecraft:white"
  | "minecraft:jellie"
  | "minecraft:all_black";

export const catVariantEnum = createEnumMapper<CatVariant>([
  "minecraft:tabby",
  "minecraft:black",
  "minecraft:red",
  "minecraft:siamese",
  "minecraft:british_shorthair",
  "minecraft:calico",
  "minecraft:persian",
  "minecraft:ragdoll",
  "minecraft:white",
  "minecraft:jellie",
  "minecraft:all_black",
]);

export function readCatVariant(reader: Reader): CatVariant {
  return catVariantEnum.fromId(reader.readVarInt());
}

export function writeCatVariant(writer: Writer, value: CatVariant) {
  writer.writeVarInt(catVariantEnum.toId(value));
}

export type FrogVariant = "minecraft:temperate" | "minecraft:warm" | "minecraft:cold";

export const frogVariantEnum = createEnumMapper<FrogVariant>(["minecraft:temperate", "minecraft:warm", "minecraft:cold"]);

export function readFrogVariant(reader: Reader): FrogVariant {
  return frogVariantEnum.fromId(reader.readVarInt());
}

export function writeFrogVariant(writer: Writer, value: FrogVariant) {
  writer.writeVarInt(frogVariantEnum.toId(value));
}

export type PaintingVariant =
  | "minecraft:kebab"
  | "minecraft:aztec"
  | "minecraft:alban"
  | "minecraft:aztec2"
  | "minecraft:bomb"
  | "minecraft:plant"
  | "minecraft:wasteland"
  | "minecraft:pool"
  | "minecraft:courbet"
  | "minecraft:sea"
  | "minecraft:sunset"
  | "minecraft:creebet"
  | "minecraft:wanderer"
  | "minecraft:graham"
  | "minecraft:match"
  | "minecraft:bust"
  | "minecraft:stage"
  | "minecraft:void"
  | "minecraft:skull_and_roses"
  | "minecraft:wither"
  | "minecraft:fighters"
  | "minecraft:pointer"
  | "minecraft:pigscene"
  | "minecraft:burning_skull"
  | "minecraft:skeleton"
  | "minecraft:earth"
  | "minecraft:wind"
  | "minecraft:water"
  | "minecraft:fire"
  | "minecraft:donkey_kong";

export const paintingVariantEnum = createEnumMapper<PaintingVariant>(
  JSON.parse(
    `["minecraft:kebab","minecraft:aztec","minecraft:alban","minecraft:aztec2","minecraft:bomb","minecraft:plant","minecraft:wasteland","minecraft:pool","minecraft:courbet","minecraft:sea","minecraft:sunset","minecraft:creebet","minecraft:wanderer","minecraft:graham","minecraft:match","minecraft:bust","minecraft:stage","minecraft:void","minecraft:skull_and_roses","minecraft:wither","minecraft:fighters","minecraft:pointer","minecraft:pigscene","minecraft:burning_skull","minecraft:skeleton","minecraft:earth","minecraft:wind","minecraft:water","minecraft:fire","minecraft:donkey_kong"]`,
  ),
);

export function readPaintingVariant(reader: Reader): PaintingVariant {
  return paintingVariantEnum.fromId(reader.readVarInt());
}

export function writePaintingVariant(writer: Writer, value: PaintingVariant) {
  writer.writeVarInt(paintingVariantEnum.toId(value));
}

export type StatType =
  | "minecraft:mined"
  | "minecraft:crafted"
  | "minecraft:used"
  | "minecraft:broken"
  | "minecraft:picked_up"
  | "minecraft:dropped"
  | "minecraft:killed"
  | "minecraft:killed_by"
  | "minecraft:custom";

export const statTypeEnum = createEnumMapper<StatType>([
  "minecraft:mined",
  "minecraft:crafted",
  "minecraft:used",
  "minecraft:broken",
  "minecraft:picked_up",
  "minecraft:dropped",
  "minecraft:killed",
  "minecraft:killed_by",
  "minecraft:custom",
]);

export function readStatType(reader: Reader): StatType {
  return statTypeEnum.fromId(reader.readVarInt());
}

export function writeStatType(writer: Writer, value: StatType) {
  writer.writeVarInt(statTypeEnum.toId(value));
}

export type CustomStat =
  | "minecraft:leave_game"
  | "minecraft:play_time"
  | "minecraft:total_world_time"
  | "minecraft:time_since_death"
  | "minecraft:time_since_rest"
  | "minecraft:sneak_time"
  | "minecraft:walk_one_cm"
  | "minecraft:crouch_one_cm"
  | "minecraft:sprint_one_cm"
  | "minecraft:walk_on_water_one_cm"
  | "minecraft:fall_one_cm"
  | "minecraft:climb_one_cm"
  | "minecraft:fly_one_cm"
  | "minecraft:walk_under_water_one_cm"
  | "minecraft:minecart_one_cm"
  | "minecraft:boat_one_cm"
  | "minecraft:pig_one_cm"
  | "minecraft:horse_one_cm"
  | "minecraft:aviate_one_cm"
  | "minecraft:swim_one_cm"
  | "minecraft:strider_one_cm"
  | "minecraft:jump"
  | "minecraft:drop"
  | "minecraft:damage_dealt"
  | "minecraft:damage_dealt_absorbed"
  | "minecraft:damage_dealt_resisted"
  | "minecraft:damage_taken"
  | "minecraft:damage_blocked_by_shield"
  | "minecraft:damage_absorbed"
  | "minecraft:damage_resisted"
  | "minecraft:deaths"
  | "minecraft:mob_kills"
  | "minecraft:animals_bred"
  | "minecraft:player_kills"
  | "minecraft:fish_caught"
  | "minecraft:talked_to_villager"
  | "minecraft:traded_with_villager"
  | "minecraft:eat_cake_slice"
  | "minecraft:fill_cauldron"
  | "minecraft:use_cauldron"
  | "minecraft:clean_armor"
  | "minecraft:clean_banner"
  | "minecraft:clean_shulker_box"
  | "minecraft:interact_with_brewingstand"
  | "minecraft:interact_with_beacon"
  | "minecraft:inspect_dropper"
  | "minecraft:inspect_hopper"
  | "minecraft:inspect_dispenser"
  | "minecraft:play_noteblock"
  | "minecraft:tune_noteblock"
  | "minecraft:pot_flower"
  | "minecraft:trigger_trapped_chest"
  | "minecraft:open_enderchest"
  | "minecraft:enchant_item"
  | "minecraft:play_record"
  | "minecraft:interact_with_furnace"
  | "minecraft:interact_with_crafting_table"
  | "minecraft:open_chest"
  | "minecraft:sleep_in_bed"
  | "minecraft:open_shulker_box"
  | "minecraft:open_barrel"
  | "minecraft:interact_with_blast_furnace"
  | "minecraft:interact_with_smoker"
  | "minecraft:interact_with_lectern"
  | "minecraft:interact_with_campfire"
  | "minecraft:interact_with_cartography_table"
  | "minecraft:interact_with_loom"
  | "minecraft:interact_with_stonecutter"
  | "minecraft:bell_ring"
  | "minecraft:raid_trigger"
  | "minecraft:raid_win"
  | "minecraft:interact_with_anvil"
  | "minecraft:interact_with_grindstone"
  | "minecraft:target_hit"
  | "minecraft:interact_with_smithing_table";

export const customStatEnum = createEnumMapper<CustomStat>(
  JSON.parse(
    `["minecraft:leave_game","minecraft:play_time","minecraft:total_world_time","minecraft:time_since_death","minecraft:time_since_rest","minecraft:sneak_time","minecraft:walk_one_cm","minecraft:crouch_one_cm","minecraft:sprint_one_cm","minecraft:walk_on_water_one_cm","minecraft:fall_one_cm","minecraft:climb_one_cm","minecraft:fly_one_cm","minecraft:walk_under_water_one_cm","minecraft:minecart_one_cm","minecraft:boat_one_cm","minecraft:pig_one_cm","minecraft:horse_one_cm","minecraft:aviate_one_cm","minecraft:swim_one_cm","minecraft:strider_one_cm","minecraft:jump","minecraft:drop","minecraft:damage_dealt","minecraft:damage_dealt_absorbed","minecraft:damage_dealt_resisted","minecraft:damage_taken","minecraft:damage_blocked_by_shield","minecraft:damage_absorbed","minecraft:damage_resisted","minecraft:deaths","minecraft:mob_kills","minecraft:animals_bred","minecraft:player_kills","minecraft:fish_caught","minecraft:talked_to_villager","minecraft:traded_with_villager","minecraft:eat_cake_slice","minecraft:fill_cauldron","minecraft:use_cauldron","minecraft:clean_armor","minecraft:clean_banner","minecraft:clean_shulker_box","minecraft:interact_with_brewingstand","minecraft:interact_with_beacon","minecraft:inspect_dropper","minecraft:inspect_hopper","minecraft:inspect_dispenser","minecraft:play_noteblock","minecraft:tune_noteblock","minecraft:pot_flower","minecraft:trigger_trapped_chest","minecraft:open_enderchest","minecraft:enchant_item","minecraft:play_record","minecraft:interact_with_furnace","minecraft:interact_with_crafting_table","minecraft:open_chest","minecraft:sleep_in_bed","minecraft:open_shulker_box","minecraft:open_barrel","minecraft:interact_with_blast_furnace","minecraft:interact_with_smoker","minecraft:interact_with_lectern","minecraft:interact_with_campfire","minecraft:interact_with_cartography_table","minecraft:interact_with_loom","minecraft:interact_with_stonecutter","minecraft:bell_ring","minecraft:raid_trigger","minecraft:raid_win","minecraft:interact_with_anvil","minecraft:interact_with_grindstone","minecraft:target_hit","minecraft:interact_with_smithing_table"]`,
  ),
);

export function readCustomStat(reader: Reader): CustomStat {
  return customStatEnum.fromId(reader.readVarInt());
}

export function writeCustomStat(writer: Writer, value: CustomStat) {
  writer.writeVarInt(customStatEnum.toId(value));
}

export type ResourceLocation = string;

export function readResourceLocation(reader: Reader): ResourceLocation {
  return reader.readString(32767);
}

export function writeResourceLocation(writer: Writer, value: ResourceLocation) {
  writer.writeString(value);
}

export type BlockPos = { x: number; y: number; z: number };

export function readBlockPos(reader: Reader): BlockPos {
  const p = reader.readLong();
  return { x: Number(p >> 38n & 0x3ffffffn) << 6 >> 6, y: Number(p >> 0n & 0xfffn) << 20 >> 20, z: Number(p >> 12n & 0x3ffffffn) << 6 >> 6 };
}

export function writeBlockPos(writer: Writer, value: BlockPos) {
  writer.writeLong(BigInt(value.x & 0x3ffffff) << 38n | BigInt(value.y & 0xfff) << 0n | BigInt(value.z & 0x3ffffff) << 12n);
}

export type BlockState = number;

export function readBlockState(reader: Reader): BlockState {
  return reader.readVarInt();
}

export function writeBlockState(writer: Writer, value: BlockState) {
  writer.writeVarInt(value);
}

export type ItemStack = { item: Item; count: number; tag: CompoundTag | null } | null;

export function readItemStack(reader: Reader): ItemStack {
  return reader.readBoolean() ? { item: readItem(reader), count: reader.readByte(), tag: reader.readCompoundTag() } : null;
}

export function writeItemStack(writer: Writer, value: ItemStack) {
  writer.writeBoolean(value != null);
  if (value != null) {
    writeItem(writer, value.item);
    writer.writeByte(value.count);
    writer.writeCompoundTag(value.tag);
  }
}

export type Difficulty = "peaceful" | "easy" | "normal" | "hard";

export const difficultyEnum = createEnumMapper<Difficulty>(["peaceful", "easy", "normal", "hard"]);

export function readDifficulty(reader: Reader): Difficulty {
  return difficultyEnum.fromId(reader.readVarInt());
}

export function writeDifficulty(writer: Writer, value: Difficulty) {
  writer.writeVarInt(difficultyEnum.toId(value));
}

export type GameMode = "survival" | "creative" | "adventure" | "spectator";

export const gameModeEnum = createEnumMapper<GameMode>(["survival", "creative", "adventure", "spectator"]);

export function readGameMode(reader: Reader): GameMode {
  return gameModeEnum.fromId(reader.readVarInt());
}

export function writeGameMode(writer: Writer, value: GameMode) {
  writer.writeVarInt(gameModeEnum.toId(value));
}

export type Direction = "down" | "up" | "north" | "south" | "west" | "east";

export const directionEnum = createEnumMapper<Direction>(["down", "up", "north", "south", "west", "east"]);

export function readDirection(reader: Reader): Direction {
  return directionEnum.fromId(reader.readVarInt());
}

export function writeDirection(writer: Writer, value: Direction) {
  writer.writeVarInt(directionEnum.toId(value));
}

export type SoundSource = "master" | "music" | "record" | "weather" | "block" | "hostile" | "neutral" | "player" | "ambient" | "voice";

export const soundSourceEnum = createEnumMapper<SoundSource>(["master", "music", "record", "weather", "block", "hostile", "neutral", "player", "ambient", "voice"]);

export function readSoundSource(reader: Reader): SoundSource {
  return soundSourceEnum.fromId(reader.readVarInt());
}

export function writeSoundSource(writer: Writer, value: SoundSource) {
  writer.writeVarInt(soundSourceEnum.toId(value));
}

export type GlobalPos = { dimension: Dimension; pos: BlockPos };

export type Dimension = ResourceLocation;

export function readGlobalPos(reader: Reader): GlobalPos {
  return { dimension: readResourceLocation(reader), pos: readBlockPos(reader) };
}

export function writeGlobalPos(writer: Writer, value: GlobalPos) {
  writeResourceLocation(writer, value.dimension);
  writeBlockPos(writer, value.pos);
}

export type Properties = Map<string, { value: string; signature: string | null }>;

export function readProperties(reader: Reader): Properties {
  const map: Properties = new Map();
  for (let i = reader.readVarInt(); i--;) {
    const key = reader.readString();
    const value = { value: reader.readString(), signature: reader.readBoolean() ? reader.readString() : null };
    map.set(key, value);
  }
  return map;
}

export function writeProperties(writer: Writer, value: Properties) {
  writer.writeVarInt(value.size);
  for (const [key, value1] of value) {
    writer.writeString(key);
    writer.writeString(value1.value);
    writer.writeBoolean(value1.signature != null);
    if (value1.signature != null) writer.writeString(value1.signature);
  }
}

export type GameProfile = { id: string; name: string; properties: Properties };

export function readGameProfile(reader: Reader): GameProfile {
  return { id: reader.readUuid(), name: reader.readString(16), properties: readProperties(reader) };
}

export function writeGameProfile(writer: Writer, value: GameProfile) {
  writer.writeUuid(value.id);
  writer.writeString(value.name);
  writeProperties(writer, value.properties);
}

export type ProfilePublicKey = { expiresAt: bigint; key: Uint8Array; keySignature: Uint8Array };

export function readProfilePublicKey(reader: Reader): ProfilePublicKey {
  return { expiresAt: reader.readLong(), key: reader.readByteArray(), keySignature: reader.readByteArray(4096) };
}

export function writeProfilePublicKey(writer: Writer, value: ProfilePublicKey) {
  writer.writeLong(value.expiresAt);
  writer.writeByteArray(value.key);
  writer.writeByteArray(value.keySignature);
}

export type ChunkData = { heightmaps: CompoundTag | null; buffer: Uint8Array; blockEntitiesData: { x: number; z: number; y: number; type: BlockEntityType; tag: CompoundTag | null }[] };

export function readChunkData(reader: Reader): ChunkData {
  const heightmaps = reader.readCompoundTag();
  const buffer = reader.readByteArray();
  const list: { x: number; z: number; y: number; type: BlockEntityType; tag: CompoundTag | null }[] = [];
  for (let i = reader.readVarInt(); i--;) {
    const p = reader.readByte();
    list.push({ x: (p >> 4 & 0xf) << 28 >> 28, z: (p >> 0 & 0xf) << 28 >> 28, y: reader.readShort(), type: readBlockEntityType(reader), tag: reader.readCompoundTag() });
  }
  return { heightmaps, buffer, blockEntitiesData: list };
}

export function writeChunkData(writer: Writer, value: ChunkData) {
  writer.writeCompoundTag(value.heightmaps);
  writer.writeByteArray(value.buffer);
  writer.writeVarInt(value.blockEntitiesData.length);
  for (const item of value.blockEntitiesData) {
    writer.writeByte((item.x & 0xf) << 4 | (item.z & 0xf) << 0);
    writer.writeShort(item.y);
    writeBlockEntityType(writer, item.type);
    writer.writeCompoundTag(item.tag);
  }
}

export type LightData = {
  trustEdges: boolean;
  skyYMask: BigInt64Array;
  blockYMask: BigInt64Array;
  emptySkyYMask: BigInt64Array;
  emptyBlockYMask: BigInt64Array;
  skyUpdates: Uint8Array[];
  blockUpdates: Uint8Array[];
};

export function readLightData(reader: Reader): LightData {
  const trustEdges = reader.readBoolean();
  const skyYMask = reader.readLongArray();
  const blockYMask = reader.readLongArray();
  const emptySkyYMask = reader.readLongArray();
  const emptyBlockYMask = reader.readLongArray();
  const list: Uint8Array[] = [];
  for (let i = reader.readVarInt(); i--;) list.push(reader.readByteArray(2048));
  const list1: Uint8Array[] = [];
  for (let i1 = reader.readVarInt(); i1--;) list1.push(reader.readByteArray(2048));
  return { trustEdges, skyYMask, blockYMask, emptySkyYMask, emptyBlockYMask, skyUpdates: list, blockUpdates: list1 };
}

export function writeLightData(writer: Writer, value: LightData) {
  writer.writeBoolean(value.trustEdges);
  writer.writeLongArray(value.skyYMask);
  writer.writeLongArray(value.blockYMask);
  writer.writeLongArray(value.emptySkyYMask);
  writer.writeLongArray(value.emptyBlockYMask);
  writer.writeVarInt(value.skyUpdates.length);
  for (const item of value.skyUpdates) writer.writeByteArray(item);
  writer.writeVarInt(value.blockUpdates.length);
  for (const item1 of value.blockUpdates) writer.writeByteArray(item1);
}

export type PositionSource =
  | { type: "minecraft:block"; pos: BlockPos }
  | { type: "minecraft:entity"; id: number; yOffset: number };

export function readPositionSource(reader: Reader): PositionSource {
  let result: PositionSource;
  switch (reader.readString()) {
    case "minecraft:block":
      result = { type: "minecraft:block", pos: readBlockPos(reader) };
      break;
    case "minecraft:entity":
      result = { type: "minecraft:entity", id: reader.readVarInt(), yOffset: reader.readFloat() };
      break;
    default:
      throw new Error("Invalid tag id");
  }
  return result;
}

export function writePositionSource(writer: Writer, value: PositionSource) {
  switch (value.type) {
    case "minecraft:block": {
      writer.writeString("minecraft:block");
      writeBlockPos(writer, value.pos);
      break;
    }
    case "minecraft:entity": {
      writer.writeString("minecraft:entity");
      writer.writeVarInt(value.id);
      writer.writeFloat(value.yOffset);
      break;
    }
    default:
      throw new Error("Invalid tag");
  }
}

export type CommandArgument =
  | { type: "brigadier:bool" }
  | { type: "brigadier:float"; min: number | null; max: number | null }
  | { type: "brigadier:double"; min: number | null; max: number | null }
  | { type: "brigadier:integer"; min: number | null; max: number | null }
  | { type: "brigadier:long"; min: bigint | null; max: bigint | null }
  | { type: "brigadier:string"; template: "single_word" | "quotable_phrase" | "greedy_phrase" }
  | { type: "entity"; single: boolean; playersOnly: boolean }
  | { type: "game_profile" }
  | { type: "block_pos" }
  | { type: "column_pos" }
  | { type: "vec3" }
  | { type: "vec2" }
  | { type: "block_state" }
  | { type: "block_predicate" }
  | { type: "item_stack" }
  | { type: "item_predicate" }
  | { type: "color" }
  | { type: "component" }
  | { type: "message" }
  | { type: "nbt_compound_tag" }
  | { type: "nbt_tag" }
  | { type: "nbt_path" }
  | { type: "objective" }
  | { type: "objective_criteria" }
  | { type: "operation" }
  | { type: "particle" }
  | { type: "angle" }
  | { type: "rotation" }
  | { type: "scoreboard_slot" }
  | { type: "score_holder"; multiple: boolean }
  | { type: "swizzle" }
  | { type: "team" }
  | { type: "item_slot" }
  | { type: "resource_location" }
  | { type: "mob_effect" }
  | { type: "function" }
  | { type: "entity_anchor" }
  | { type: "int_range" }
  | { type: "float_range" }
  | { type: "item_enchantment" }
  | { type: "entity_summon" }
  | { type: "dimension" }
  | { type: "time" }
  | { type: "resource_or_tag"; registryKey: ResourceLocation }
  | { type: "resource"; registryKey: ResourceLocation }
  | { type: "template_mirror" }
  | { type: "template_rotation" }
  | { type: "uuid" };

export const mapper = createEnumMapper(["single_word", "quotable_phrase", "greedy_phrase"]);

export function readCommandArgument(reader: Reader): CommandArgument {
  let result: CommandArgument;
  switch (reader.readVarInt()) {
    case 0:
      result = { type: "brigadier:bool" };
      break;
    case 1: {
      const type = "brigadier:float";
      const flags = reader.readUnsignedByte();
      result = { type, min: flags & 0x1 ? reader.readFloat() : null, max: flags & 0x2 ? reader.readFloat() : null };
      break;
    }
    case 2: {
      const type = "brigadier:double";
      const flags = reader.readUnsignedByte();
      result = { type, min: flags & 0x1 ? reader.readDouble() : null, max: flags & 0x2 ? reader.readDouble() : null };
      break;
    }
    case 3: {
      const type = "brigadier:integer";
      const flags = reader.readUnsignedByte();
      result = { type, min: flags & 0x1 ? reader.readInt() : null, max: flags & 0x2 ? reader.readInt() : null };
      break;
    }
    case 4: {
      const type = "brigadier:long";
      const flags = reader.readUnsignedByte();
      result = { type, min: flags & 0x1 ? reader.readLong() : null, max: flags & 0x2 ? reader.readLong() : null };
      break;
    }
    case 5:
      result = { type: "brigadier:string", template: mapper.fromId(reader.readVarInt()) };
      break;
    case 6: {
      const type = "entity";
      const flags = reader.readByte();
      result = { type, single: (flags & 0x1) > 0, playersOnly: (flags & 0x2) > 0 };
      break;
    }
    case 7:
      result = { type: "game_profile" };
      break;
    case 8:
      result = { type: "block_pos" };
      break;
    case 9:
      result = { type: "column_pos" };
      break;
    case 10:
      result = { type: "vec3" };
      break;
    case 11:
      result = { type: "vec2" };
      break;
    case 12:
      result = { type: "block_state" };
      break;
    case 13:
      result = { type: "block_predicate" };
      break;
    case 14:
      result = { type: "item_stack" };
      break;
    case 15:
      result = { type: "item_predicate" };
      break;
    case 16:
      result = { type: "color" };
      break;
    case 17:
      result = { type: "component" };
      break;
    case 18:
      result = { type: "message" };
      break;
    case 19:
      result = { type: "nbt_compound_tag" };
      break;
    case 20:
      result = { type: "nbt_tag" };
      break;
    case 21:
      result = { type: "nbt_path" };
      break;
    case 22:
      result = { type: "objective" };
      break;
    case 23:
      result = { type: "objective_criteria" };
      break;
    case 24:
      result = { type: "operation" };
      break;
    case 25:
      result = { type: "particle" };
      break;
    case 26:
      result = { type: "angle" };
      break;
    case 27:
      result = { type: "rotation" };
      break;
    case 28:
      result = { type: "scoreboard_slot" };
      break;
    case 29: {
      const type = "score_holder";
      const flags = reader.readByte();
      result = { type, multiple: (flags & 0x1) > 0 };
      break;
    }
    case 30:
      result = { type: "swizzle" };
      break;
    case 31:
      result = { type: "team" };
      break;
    case 32:
      result = { type: "item_slot" };
      break;
    case 33:
      result = { type: "resource_location" };
      break;
    case 34:
      result = { type: "mob_effect" };
      break;
    case 35:
      result = { type: "function" };
      break;
    case 36:
      result = { type: "entity_anchor" };
      break;
    case 37:
      result = { type: "int_range" };
      break;
    case 38:
      result = { type: "float_range" };
      break;
    case 39:
      result = { type: "item_enchantment" };
      break;
    case 40:
      result = { type: "entity_summon" };
      break;
    case 41:
      result = { type: "dimension" };
      break;
    case 42:
      result = { type: "time" };
      break;
    case 43:
      result = { type: "resource_or_tag", registryKey: readResourceLocation(reader) };
      break;
    case 44:
      result = { type: "resource", registryKey: readResourceLocation(reader) };
      break;
    case 45:
      result = { type: "template_mirror" };
      break;
    case 46:
      result = { type: "template_rotation" };
      break;
    case 47:
      result = { type: "uuid" };
      break;
    default:
      throw new Error("Invalid tag id");
  }
  return result;
}

export function writeCommandArgument(writer: Writer, value: CommandArgument) {
  switch (value.type) {
    case "brigadier:bool": {
      writer.writeVarInt(0);
      break;
    }
    case "brigadier:float": {
      writer.writeVarInt(1);
      writer.writeUnsignedByte(-(value.min != null) & 0x1 | -(value.max != null) & 0x2);
      if (value.min != null) {
        writer.writeFloat(value.min);
      }
      if (value.max != null) {
        writer.writeFloat(value.max);
      }
      break;
    }
    case "brigadier:double": {
      writer.writeVarInt(2);
      writer.writeUnsignedByte(-(value.min != null) & 0x1 | -(value.max != null) & 0x2);
      if (value.min != null) {
        writer.writeDouble(value.min);
      }
      if (value.max != null) {
        writer.writeDouble(value.max);
      }
      break;
    }
    case "brigadier:integer": {
      writer.writeVarInt(3);
      writer.writeUnsignedByte(-(value.min != null) & 0x1 | -(value.max != null) & 0x2);
      if (value.min != null) {
        writer.writeInt(value.min);
      }
      if (value.max != null) {
        writer.writeInt(value.max);
      }
      break;
    }
    case "brigadier:long": {
      writer.writeVarInt(4);
      writer.writeUnsignedByte(-(value.min != null) & 0x1 | -(value.max != null) & 0x2);
      if (value.min != null) {
        writer.writeLong(value.min);
      }
      if (value.max != null) {
        writer.writeLong(value.max);
      }
      break;
    }
    case "brigadier:string": {
      writer.writeVarInt(5);
      writer.writeVarInt(mapper.toId(value.template));
      break;
    }
    case "entity": {
      writer.writeVarInt(6);
      writer.writeByte((-value.single & 0x1) | (-value.playersOnly & 0x2));
      break;
    }
    case "game_profile": {
      writer.writeVarInt(7);
      break;
    }
    case "block_pos": {
      writer.writeVarInt(8);
      break;
    }
    case "column_pos": {
      writer.writeVarInt(9);
      break;
    }
    case "vec3": {
      writer.writeVarInt(10);
      break;
    }
    case "vec2": {
      writer.writeVarInt(11);
      break;
    }
    case "block_state": {
      writer.writeVarInt(12);
      break;
    }
    case "block_predicate": {
      writer.writeVarInt(13);
      break;
    }
    case "item_stack": {
      writer.writeVarInt(14);
      break;
    }
    case "item_predicate": {
      writer.writeVarInt(15);
      break;
    }
    case "color": {
      writer.writeVarInt(16);
      break;
    }
    case "component": {
      writer.writeVarInt(17);
      break;
    }
    case "message": {
      writer.writeVarInt(18);
      break;
    }
    case "nbt_compound_tag": {
      writer.writeVarInt(19);
      break;
    }
    case "nbt_tag": {
      writer.writeVarInt(20);
      break;
    }
    case "nbt_path": {
      writer.writeVarInt(21);
      break;
    }
    case "objective": {
      writer.writeVarInt(22);
      break;
    }
    case "objective_criteria": {
      writer.writeVarInt(23);
      break;
    }
    case "operation": {
      writer.writeVarInt(24);
      break;
    }
    case "particle": {
      writer.writeVarInt(25);
      break;
    }
    case "angle": {
      writer.writeVarInt(26);
      break;
    }
    case "rotation": {
      writer.writeVarInt(27);
      break;
    }
    case "scoreboard_slot": {
      writer.writeVarInt(28);
      break;
    }
    case "score_holder": {
      writer.writeVarInt(29);
      writer.writeByte(-value.multiple & 0x1);
      break;
    }
    case "swizzle": {
      writer.writeVarInt(30);
      break;
    }
    case "team": {
      writer.writeVarInt(31);
      break;
    }
    case "item_slot": {
      writer.writeVarInt(32);
      break;
    }
    case "resource_location": {
      writer.writeVarInt(33);
      break;
    }
    case "mob_effect": {
      writer.writeVarInt(34);
      break;
    }
    case "function": {
      writer.writeVarInt(35);
      break;
    }
    case "entity_anchor": {
      writer.writeVarInt(36);
      break;
    }
    case "int_range": {
      writer.writeVarInt(37);
      break;
    }
    case "float_range": {
      writer.writeVarInt(38);
      break;
    }
    case "item_enchantment": {
      writer.writeVarInt(39);
      break;
    }
    case "entity_summon": {
      writer.writeVarInt(40);
      break;
    }
    case "dimension": {
      writer.writeVarInt(41);
      break;
    }
    case "time": {
      writer.writeVarInt(42);
      break;
    }
    case "resource_or_tag": {
      writer.writeVarInt(43);
      writeResourceLocation(writer, value.registryKey);
      break;
    }
    case "resource": {
      writer.writeVarInt(44);
      writeResourceLocation(writer, value.registryKey);
      break;
    }
    case "template_mirror": {
      writer.writeVarInt(45);
      break;
    }
    case "template_rotation": {
      writer.writeVarInt(46);
      break;
    }
    case "uuid": {
      writer.writeVarInt(47);
      break;
    }
    default:
      throw new Error("Invalid tag");
  }
}

export type CommandNodeStub =
  | { type: "root" }
  | { type: "literal"; id: string }
  | { type: "argument"; id: string; argument: CommandArgument; suggestionId: ResourceLocation | null };

export function readCommandNodeStub(reader: Reader): CommandNodeStub {
  let result: CommandNodeStub;
  switch (reader.readByte()) {
    case 0:
      result = { type: "root" };
      break;
    case 1:
      result = { type: "literal", id: reader.readString() };
      break;
    case 2:
      result = { type: "argument", id: reader.readString(), argument: readCommandArgument(reader), suggestionId: reader.readBoolean() ? readResourceLocation(reader) : null };
      break;
    default:
      throw new Error("Invalid tag id");
  }
  return result;
}

export function writeCommandNodeStub(writer: Writer, value: CommandNodeStub) {
  switch (value.type) {
    case "root": {
      writer.writeByte(0);
      break;
    }
    case "literal": {
      writer.writeByte(1);
      writer.writeString(value.id);
      break;
    }
    case "argument": {
      writer.writeByte(2);
      writer.writeString(value.id);
      writeCommandArgument(writer, value.argument);
      writer.writeBoolean(value.suggestionId != null);
      if (value.suggestionId != null) writeResourceLocation(writer, value.suggestionId);
      break;
    }
    default:
      throw new Error("Invalid tag");
  }
}

export type CommandNode = { isExecutable: boolean; children: number[]; redirectNode: number | null; node: CommandNodeStub };

export function readCommandNode(reader: Reader): CommandNode {
  const flags = reader.readByte();
  const isExecutable = (flags & 0x4) != 0;
  const list: number[] = [];
  for (let i = reader.readVarInt(); i--;) list.push(reader.readVarInt());
  let redirectNode: number | null = null;
  if ((flags & 0x8) != 0) redirectNode = reader.readVarInt();
  let node: CommandNodeStub | null = null;
  if ((flags & 0x3) == 1) {
    node = { type: "literal", id: reader.readString() };
  } else if ((flags & 0x3) == 2) {
    const id = reader.readString();
    const argument = readCommandArgument(reader);
    node = { type: "argument", id: id, argument: argument, suggestionId: ((flags & 0x10) != 0) ? readResourceLocation(reader) : null };
  } else {
    node = { type: "root" };
  }
  return { isExecutable, children: list, redirectNode, node };
}

export function writeCommandNode(writer: Writer, value: CommandNode) {
  let type: number;
  switch (value.node.type) {
    case "root":
      type = 0;
      break;
    case "literal":
      type = 1;
      break;
    case "argument":
      type = 2;
      break;
  }
  writer.writeByte(type | -value.isExecutable & 0x4 | -(value.redirectNode != null) & 0x8 | -(value.node.type == "argument" && value.node.suggestionId != null) & 0x10);
  writer.writeVarInt(value.children.length);
  for (const item of value.children) writer.writeVarInt(item);
  if (value.redirectNode != null) writer.writeVarInt(value.redirectNode);
  if (value.node.type == "literal") writer.writeString(value.node.id);
  else if (value.node.type == "argument") {
    writer.writeString(value.node.id);
    writeCommandArgument(writer, value.node.argument);
    if (value.node.suggestionId != null) {
      writeResourceLocation(writer, value.node.suggestionId);
    }
  }
}

export type SignedMessageHeader = { previousSignature: MessageSignature | null; sender: string };

export type MessageSignature = Uint8Array;

export function readSignedMessageHeader(reader: Reader): SignedMessageHeader {
  return { previousSignature: reader.readBoolean() ? reader.readByteArray() : null, sender: reader.readUuid() };
}

export function writeSignedMessageHeader(writer: Writer, value: SignedMessageHeader) {
  writer.writeBoolean(value.previousSignature != null);
  if (value.previousSignature != null) writer.writeByteArray(value.previousSignature);
  writer.writeUuid(value.sender);
}

export type ChatMessageContent = { plain: string; decorated: Component | null };

export type Component = unknown;

export function readChatMessageContent(reader: Reader): ChatMessageContent {
  return { plain: reader.readString(256), decorated: reader.readBoolean() ? reader.readJson() : null };
}

export function writeChatMessageContent(writer: Writer, value: ChatMessageContent) {
  writer.writeString(value.plain);
  writer.writeBoolean(value.decorated != null);
  if (value.decorated != null) writer.writeJson(value.decorated);
}

export type Instant = bigint;

export function readInstant(reader: Reader): Instant {
  return reader.readLong();
}

export function writeInstant(writer: Writer, value: Instant) {
  writer.writeLong(value);
}

export type LastSeenMessagesEntry = { profileId: string; lastSignature: MessageSignature | null };

export function readLastSeenMessagesEntry(reader: Reader): LastSeenMessagesEntry {
  return { profileId: reader.readUuid(), lastSignature: reader.readBoolean() ? reader.readByteArray() : null };
}

export function writeLastSeenMessagesEntry(writer: Writer, value: LastSeenMessagesEntry) {
  writer.writeUuid(value.profileId);
  writer.writeBoolean(value.lastSignature != null);
  if (value.lastSignature != null) writer.writeByteArray(value.lastSignature);
}

export type LastSeenMessagesUpdate = { lastSeen: LastSeenMessagesEntry[]; lastReceived: LastSeenMessagesEntry | null };

export function readLastSeenMessagesUpdate(reader: Reader): LastSeenMessagesUpdate {
  const list: LastSeenMessagesEntry[] = [];
  for (let i = reader.readVarInt(); i--;) list.push(readLastSeenMessagesEntry(reader));
  return { lastSeen: list, lastReceived: reader.readBoolean() ? readLastSeenMessagesEntry(reader) : null };
}

export function writeLastSeenMessagesUpdate(writer: Writer, value: LastSeenMessagesUpdate) {
  writer.writeVarInt(value.lastSeen.length);
  for (const item of value.lastSeen) writeLastSeenMessagesEntry(writer, item);
  writer.writeBoolean(value.lastReceived != null);
  if (value.lastReceived != null) writeLastSeenMessagesEntry(writer, value.lastReceived);
}

export type SignedMessageBody = { content: ChatMessageContent; timeStamp: Instant; salt: bigint; lastSeen: LastSeenMessagesEntry[] };

export function readSignedMessageBody(reader: Reader): SignedMessageBody {
  const content = readChatMessageContent(reader);
  const timeStamp = readInstant(reader);
  const salt = reader.readLong();
  const list: LastSeenMessagesEntry[] = [];
  for (let i = reader.readVarInt(); i--;) list.push(readLastSeenMessagesEntry(reader));
  return { content, timeStamp, salt, lastSeen: list };
}

export function writeSignedMessageBody(writer: Writer, value: SignedMessageBody) {
  writeChatMessageContent(writer, value.content);
  writeInstant(writer, value.timeStamp);
  writer.writeLong(value.salt);
  writer.writeVarInt(value.lastSeen.length);
  for (const item of value.lastSeen) writeLastSeenMessagesEntry(writer, item);
}

export type FilterMask =
  | { type: "pass_through" }
  | { type: "fully_filtered" }
  | { type: "partially_filtered"; filter: BitSet };

export type BitSet = BigInt64Array;

export function readFilterMask(reader: Reader): FilterMask {
  let result: FilterMask;
  switch (reader.readVarInt()) {
    case 0:
      result = { type: "pass_through" };
      break;
    case 1:
      result = { type: "fully_filtered" };
      break;
    case 2:
      result = { type: "partially_filtered", filter: reader.readLongArray() };
      break;
    default:
      throw new Error("Invalid tag id");
  }
  return result;
}

export function writeFilterMask(writer: Writer, value: FilterMask) {
  switch (value.type) {
    case "pass_through": {
      writer.writeVarInt(0);
      break;
    }
    case "fully_filtered": {
      writer.writeVarInt(1);
      break;
    }
    case "partially_filtered": {
      writer.writeVarInt(2);
      writer.writeLongArray(value.filter);
      break;
    }
    default:
      throw new Error("Invalid tag");
  }
}

export type PlayerChatMessage = { signedHeader: SignedMessageHeader; headerSignature: MessageSignature; signedBody: SignedMessageBody; unsignedContent: Component | null; filterMask: FilterMask };

export function readPlayerChatMessage(reader: Reader): PlayerChatMessage {
  return {
    signedHeader: readSignedMessageHeader(reader),
    headerSignature: reader.readByteArray(),
    signedBody: readSignedMessageBody(reader),
    unsignedContent: reader.readBoolean() ? reader.readJson() : null,
    filterMask: readFilterMask(reader),
  };
}

export function writePlayerChatMessage(writer: Writer, value: PlayerChatMessage) {
  writeSignedMessageHeader(writer, value.signedHeader);
  writer.writeByteArray(value.headerSignature);
  writeSignedMessageBody(writer, value.signedBody);
  writer.writeBoolean(value.unsignedContent != null);
  if (value.unsignedContent != null) writer.writeJson(value.unsignedContent);
  writeFilterMask(writer, value.filterMask);
}

export type ChatTypeBound = { chatType: ChatType; name: Component; targetName: Component | null };

export function readChatTypeBound(reader: Reader): ChatTypeBound {
  return { chatType: readChatType(reader), name: reader.readJson(), targetName: reader.readBoolean() ? reader.readJson() : null };
}

export function writeChatTypeBound(writer: Writer, value: ChatTypeBound) {
  writeChatType(writer, value.chatType);
  writer.writeJson(value.name);
  writer.writeBoolean(value.targetName != null);
  if (value.targetName != null) writer.writeJson(value.targetName);
}

export type ArgumentSignatureEntry = { name: string; signature: MessageSignature };

export function readArgumentSignatureEntry(reader: Reader): ArgumentSignatureEntry {
  return { name: reader.readString(16), signature: reader.readByteArray() };
}

export function writeArgumentSignatureEntry(writer: Writer, value: ArgumentSignatureEntry) {
  writer.writeString(value.name);
  writer.writeByteArray(value.signature);
}

export type ArgumentSignatures = ArgumentSignatureEntry[];

export function readArgumentSignatures(reader: Reader): ArgumentSignatures {
  const list: ArgumentSignatures = [];
  for (let i = reader.readVarInt(); i--;) list.push(readArgumentSignatureEntry(reader));
  return list;
}

export function writeArgumentSignatures(writer: Writer, value: ArgumentSignatures) {
  writer.writeVarInt(value.length);
  for (const item of value) writeArgumentSignatureEntry(writer, item);
}

export type ChatVisiblity = "full" | "system" | "hidden";

export const chatVisiblityEnum = createEnumMapper<ChatVisiblity>(["full", "system", "hidden"]);

export function readChatVisiblity(reader: Reader): ChatVisiblity {
  return chatVisiblityEnum.fromId(reader.readVarInt());
}

export function writeChatVisiblity(writer: Writer, value: ChatVisiblity) {
  writer.writeVarInt(chatVisiblityEnum.toId(value));
}

export type HumanoidArm = "left" | "right";

export const humanoidArmEnum = createEnumMapper<HumanoidArm>(["left", "right"]);

export function readHumanoidArm(reader: Reader): HumanoidArm {
  return humanoidArmEnum.fromId(reader.readVarInt());
}

export function writeHumanoidArm(writer: Writer, value: HumanoidArm) {
  writer.writeVarInt(humanoidArmEnum.toId(value));
}

export type ClickType = "pickup" | "quick_move" | "swap" | "clone" | "throw" | "quick_craft" | "pickup_all";

export const clickTypeEnum = createEnumMapper<ClickType>(["pickup", "quick_move", "swap", "clone", "throw", "quick_craft", "pickup_all"]);

export function readClickType(reader: Reader): ClickType {
  return clickTypeEnum.fromId(reader.readVarInt());
}

export function writeClickType(writer: Writer, value: ClickType) {
  writer.writeVarInt(clickTypeEnum.toId(value));
}

export type EquipmentSlot = "mainhand" | "offhand" | "feet" | "legs" | "chest" | "head";

export const equipmentSlotEnum = createEnumMapper<EquipmentSlot>(["mainhand", "offhand", "feet", "legs", "chest", "head"]);

export function readEquipmentSlot(reader: Reader): EquipmentSlot {
  return equipmentSlotEnum.fromId(reader.readVarInt());
}

export function writeEquipmentSlot(writer: Writer, value: EquipmentSlot) {
  writer.writeVarInt(equipmentSlotEnum.toId(value));
}

export type PlayerAction = "start_destroy_block" | "abort_destroy_block" | "stop_destroy_block" | "drop_all_items" | "drop_item" | "release_use_item" | "swap_item_with_offhand";

export const playerActionEnum = createEnumMapper<PlayerAction>([
  "start_destroy_block",
  "abort_destroy_block",
  "stop_destroy_block",
  "drop_all_items",
  "drop_item",
  "release_use_item",
  "swap_item_with_offhand",
]);

export function readPlayerAction(reader: Reader): PlayerAction {
  return playerActionEnum.fromId(reader.readVarInt());
}

export function writePlayerAction(writer: Writer, value: PlayerAction) {
  writer.writeVarInt(playerActionEnum.toId(value));
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

export function readMerchantOffer(reader: Reader): MerchantOffer {
  return {
    baseCostA: readItem(reader),
    result: readItem(reader),
    costB: readItem(reader),
    isOutOfStock: reader.readBoolean(),
    uses: reader.readInt(),
    maxUses: reader.readInt(),
    xp: reader.readInt(),
    specialPriceDiff: reader.readInt(),
    priceMultiplier: reader.readFloat(),
    demand: reader.readInt(),
  };
}

export function writeMerchantOffer(writer: Writer, value: MerchantOffer) {
  writeItem(writer, value.baseCostA);
  writeItem(writer, value.result);
  writeItem(writer, value.costB);
  writer.writeBoolean(value.isOutOfStock);
  writer.writeInt(value.uses);
  writer.writeInt(value.maxUses);
  writer.writeInt(value.xp);
  writer.writeInt(value.specialPriceDiff);
  writer.writeFloat(value.priceMultiplier);
  writer.writeInt(value.demand);
}

export type MerchantOffers = MerchantOffer[];

export function readMerchantOffers(reader: Reader): MerchantOffers {
  const list: MerchantOffers = [];
  for (let i = reader.readVarInt(); i--;) list.push(readMerchantOffer(reader));
  return list;
}

export function writeMerchantOffers(writer: Writer, value: MerchantOffers) {
  writer.writeVarInt(value.length);
  for (const item of value) writeMerchantOffer(writer, item);
}

export type InteractionHand = "main_hand" | "off_hand";

export const interactionHandEnum = createEnumMapper<InteractionHand>(["main_hand", "off_hand"]);

export function readInteractionHand(reader: Reader): InteractionHand {
  return interactionHandEnum.fromId(reader.readVarInt());
}

export function writeInteractionHand(writer: Writer, value: InteractionHand) {
  writer.writeVarInt(interactionHandEnum.toId(value));
}

export type RecipeBookType = "crafting" | "furnace" | "blast_furnace" | "smoker";

export const recipeBookTypeEnum = createEnumMapper<RecipeBookType>(["crafting", "furnace", "blast_furnace", "smoker"]);

export function readRecipeBookType(reader: Reader): RecipeBookType {
  return recipeBookTypeEnum.fromId(reader.readVarInt());
}

export function writeRecipeBookType(writer: Writer, value: RecipeBookType) {
  writer.writeVarInt(recipeBookTypeEnum.toId(value));
}

export type ChatFormatting =
  | "black"
  | "dark_blue"
  | "dark_green"
  | "dark_aqua"
  | "dark_red"
  | "dark_purple"
  | "gold"
  | "gray"
  | "dark_gray"
  | "blue"
  | "green"
  | "aqua"
  | "red"
  | "light_purple"
  | "yellow"
  | "white"
  | "obfuscated"
  | "bold"
  | "strikethrough"
  | "underline"
  | "italic"
  | "reset";

export const chatFormattingEnum = createEnumMapper<ChatFormatting>(
  JSON.parse(
    `["black","dark_blue","dark_green","dark_aqua","dark_red","dark_purple","gold","gray","dark_gray","blue","green","aqua","red","light_purple","yellow","white","obfuscated","bold","strikethrough","underline","italic","reset"]`,
  ),
);

export function readChatFormatting(reader: Reader): ChatFormatting {
  return chatFormattingEnum.fromId(reader.readVarInt());
}

export function writeChatFormatting(writer: Writer, value: ChatFormatting) {
  writer.writeVarInt(chatFormattingEnum.toId(value));
}

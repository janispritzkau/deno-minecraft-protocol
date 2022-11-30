// deno-lint-ignore-file
import { Reader, Writer } from "minecraft/io/mod.ts";
import { CompoundTag } from "minecraft/nbt/tag.ts";
import { Uuid } from "../../core/uuid.ts";
import { Component } from "../../chat/component.ts";

export type ChatType =
  | "minecraft:chat"
  | "minecraft:say_command"
  | "minecraft:msg_command_incoming"
  | "minecraft:msg_command_outgoing"
  | "minecraft:team_msg_command_incoming"
  | "minecraft:team_msg_command_outgoing"
  | "minecraft:emote_command";

export function createEnumMapper<T extends string>(keyIds: Record<T, number>) {
  const idKeys = new Map(Object.entries(keyIds).map(([key, id]) => [id, key] as [number, T]));
  return {
    toId(key: T): number {
      const id = keyIds[key];
      if (id == null) throw new Error("Invalid enum key" + key);
      return id;
    },
    fromId(id: number): T {
      const key = idKeys.get(id);
      if (key == null) throw new Error("Invalid enum id" + id);
      return key;
    },
  };
}

export const chatTypeEnum = createEnumMapper<ChatType>({
  "minecraft:chat": 0,
  "minecraft:say_command": 1,
  "minecraft:msg_command_incoming": 2,
  "minecraft:msg_command_outgoing": 3,
  "minecraft:team_msg_command_incoming": 4,
  "minecraft:team_msg_command_outgoing": 5,
  "minecraft:emote_command": 6,
});

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
    `{"minecraft:entity.allay.ambient_with_item":0,"minecraft:entity.allay.ambient_without_item":1,"minecraft:entity.allay.death":2,"minecraft:entity.allay.hurt":3,"minecraft:entity.allay.item_given":4,"minecraft:entity.allay.item_taken":5,"minecraft:entity.allay.item_thrown":6,"minecraft:ambient.cave":7,"minecraft:ambient.basalt_deltas.additions":8,"minecraft:ambient.basalt_deltas.loop":9,"minecraft:ambient.basalt_deltas.mood":10,"minecraft:ambient.crimson_forest.additions":11,"minecraft:ambient.crimson_forest.loop":12,"minecraft:ambient.crimson_forest.mood":13,"minecraft:ambient.nether_wastes.additions":14,"minecraft:ambient.nether_wastes.loop":15,"minecraft:ambient.nether_wastes.mood":16,"minecraft:ambient.soul_sand_valley.additions":17,"minecraft:ambient.soul_sand_valley.loop":18,"minecraft:ambient.soul_sand_valley.mood":19,"minecraft:ambient.warped_forest.additions":20,"minecraft:ambient.warped_forest.loop":21,"minecraft:ambient.warped_forest.mood":22,"minecraft:ambient.underwater.enter":23,"minecraft:ambient.underwater.exit":24,"minecraft:ambient.underwater.loop":25,"minecraft:ambient.underwater.loop.additions":26,"minecraft:ambient.underwater.loop.additions.rare":27,"minecraft:ambient.underwater.loop.additions.ultra_rare":28,"minecraft:block.amethyst_block.break":29,"minecraft:block.amethyst_block.chime":30,"minecraft:block.amethyst_block.fall":31,"minecraft:block.amethyst_block.hit":32,"minecraft:block.amethyst_block.place":33,"minecraft:block.amethyst_block.step":34,"minecraft:block.amethyst_cluster.break":35,"minecraft:block.amethyst_cluster.fall":36,"minecraft:block.amethyst_cluster.hit":37,"minecraft:block.amethyst_cluster.place":38,"minecraft:block.amethyst_cluster.step":39,"minecraft:block.ancient_debris.break":40,"minecraft:block.ancient_debris.step":41,"minecraft:block.ancient_debris.place":42,"minecraft:block.ancient_debris.hit":43,"minecraft:block.ancient_debris.fall":44,"minecraft:block.anvil.break":45,"minecraft:block.anvil.destroy":46,"minecraft:block.anvil.fall":47,"minecraft:block.anvil.hit":48,"minecraft:block.anvil.land":49,"minecraft:block.anvil.place":50,"minecraft:block.anvil.step":51,"minecraft:block.anvil.use":52,"minecraft:item.armor.equip_chain":53,"minecraft:item.armor.equip_diamond":54,"minecraft:item.armor.equip_elytra":55,"minecraft:item.armor.equip_generic":56,"minecraft:item.armor.equip_gold":57,"minecraft:item.armor.equip_iron":58,"minecraft:item.armor.equip_leather":59,"minecraft:item.armor.equip_netherite":60,"minecraft:item.armor.equip_turtle":61,"minecraft:entity.armor_stand.break":62,"minecraft:entity.armor_stand.fall":63,"minecraft:entity.armor_stand.hit":64,"minecraft:entity.armor_stand.place":65,"minecraft:entity.arrow.hit":66,"minecraft:entity.arrow.hit_player":67,"minecraft:entity.arrow.shoot":68,"minecraft:item.axe.strip":69,"minecraft:item.axe.scrape":70,"minecraft:item.axe.wax_off":71,"minecraft:entity.axolotl.attack":72,"minecraft:entity.axolotl.death":73,"minecraft:entity.axolotl.hurt":74,"minecraft:entity.axolotl.idle_air":75,"minecraft:entity.axolotl.idle_water":76,"minecraft:entity.axolotl.splash":77,"minecraft:entity.axolotl.swim":78,"minecraft:block.azalea.break":79,"minecraft:block.azalea.fall":80,"minecraft:block.azalea.hit":81,"minecraft:block.azalea.place":82,"minecraft:block.azalea.step":83,"minecraft:block.azalea_leaves.break":84,"minecraft:block.azalea_leaves.fall":85,"minecraft:block.azalea_leaves.hit":86,"minecraft:block.azalea_leaves.place":87,"minecraft:block.azalea_leaves.step":88,"minecraft:block.bamboo.break":89,"minecraft:block.bamboo.fall":90,"minecraft:block.bamboo.hit":91,"minecraft:block.bamboo.place":92,"minecraft:block.bamboo.step":93,"minecraft:block.bamboo_sapling.break":94,"minecraft:block.bamboo_sapling.hit":95,"minecraft:block.bamboo_sapling.place":96,"minecraft:block.barrel.close":97,"minecraft:block.barrel.open":98,"minecraft:block.basalt.break":99,"minecraft:block.basalt.step":100,"minecraft:block.basalt.place":101,"minecraft:block.basalt.hit":102,"minecraft:block.basalt.fall":103,"minecraft:entity.bat.ambient":104,"minecraft:entity.bat.death":105,"minecraft:entity.bat.hurt":106,"minecraft:entity.bat.loop":107,"minecraft:entity.bat.takeoff":108,"minecraft:block.beacon.activate":109,"minecraft:block.beacon.ambient":110,"minecraft:block.beacon.deactivate":111,"minecraft:block.beacon.power_select":112,"minecraft:entity.bee.death":113,"minecraft:entity.bee.hurt":114,"minecraft:entity.bee.loop_aggressive":115,"minecraft:entity.bee.loop":116,"minecraft:entity.bee.sting":117,"minecraft:entity.bee.pollinate":118,"minecraft:block.beehive.drip":119,"minecraft:block.beehive.enter":120,"minecraft:block.beehive.exit":121,"minecraft:block.beehive.shear":122,"minecraft:block.beehive.work":123,"minecraft:block.bell.use":124,"minecraft:block.bell.resonate":125,"minecraft:block.big_dripleaf.break":126,"minecraft:block.big_dripleaf.fall":127,"minecraft:block.big_dripleaf.hit":128,"minecraft:block.big_dripleaf.place":129,"minecraft:block.big_dripleaf.step":130,"minecraft:entity.blaze.ambient":131,"minecraft:entity.blaze.burn":132,"minecraft:entity.blaze.death":133,"minecraft:entity.blaze.hurt":134,"minecraft:entity.blaze.shoot":135,"minecraft:entity.boat.paddle_land":136,"minecraft:entity.boat.paddle_water":137,"minecraft:block.bone_block.break":138,"minecraft:block.bone_block.fall":139,"minecraft:block.bone_block.hit":140,"minecraft:block.bone_block.place":141,"minecraft:block.bone_block.step":142,"minecraft:item.bone_meal.use":143,"minecraft:item.book.page_turn":144,"minecraft:item.book.put":145,"minecraft:block.blastfurnace.fire_crackle":146,"minecraft:item.bottle.empty":147,"minecraft:item.bottle.fill":148,"minecraft:item.bottle.fill_dragonbreath":149,"minecraft:block.brewing_stand.brew":150,"minecraft:block.bubble_column.bubble_pop":151,"minecraft:block.bubble_column.upwards_ambient":152,"minecraft:block.bubble_column.upwards_inside":153,"minecraft:block.bubble_column.whirlpool_ambient":154,"minecraft:block.bubble_column.whirlpool_inside":155,"minecraft:item.bucket.empty":156,"minecraft:item.bucket.empty_axolotl":157,"minecraft:item.bucket.empty_fish":158,"minecraft:item.bucket.empty_lava":159,"minecraft:item.bucket.empty_powder_snow":160,"minecraft:item.bucket.empty_tadpole":161,"minecraft:item.bucket.fill":162,"minecraft:item.bucket.fill_axolotl":163,"minecraft:item.bucket.fill_fish":164,"minecraft:item.bucket.fill_lava":165,"minecraft:item.bucket.fill_powder_snow":166,"minecraft:item.bucket.fill_tadpole":167,"minecraft:item.bundle.drop_contents":168,"minecraft:item.bundle.insert":169,"minecraft:item.bundle.remove_one":170,"minecraft:block.cake.add_candle":171,"minecraft:block.calcite.break":172,"minecraft:block.calcite.step":173,"minecraft:block.calcite.place":174,"minecraft:block.calcite.hit":175,"minecraft:block.calcite.fall":176,"minecraft:block.campfire.crackle":177,"minecraft:block.candle.ambient":178,"minecraft:block.candle.break":179,"minecraft:block.candle.extinguish":180,"minecraft:block.candle.fall":181,"minecraft:block.candle.hit":182,"minecraft:block.candle.place":183,"minecraft:block.candle.step":184,"minecraft:entity.cat.ambient":185,"minecraft:entity.cat.stray_ambient":186,"minecraft:entity.cat.death":187,"minecraft:entity.cat.eat":188,"minecraft:entity.cat.hiss":189,"minecraft:entity.cat.beg_for_food":190,"minecraft:entity.cat.hurt":191,"minecraft:entity.cat.purr":192,"minecraft:entity.cat.purreow":193,"minecraft:block.cave_vines.break":194,"minecraft:block.cave_vines.fall":195,"minecraft:block.cave_vines.hit":196,"minecraft:block.cave_vines.place":197,"minecraft:block.cave_vines.step":198,"minecraft:block.cave_vines.pick_berries":199,"minecraft:block.chain.break":200,"minecraft:block.chain.fall":201,"minecraft:block.chain.hit":202,"minecraft:block.chain.place":203,"minecraft:block.chain.step":204,"minecraft:block.chest.close":205,"minecraft:block.chest.locked":206,"minecraft:block.chest.open":207,"minecraft:entity.chicken.ambient":208,"minecraft:entity.chicken.death":209,"minecraft:entity.chicken.egg":210,"minecraft:entity.chicken.hurt":211,"minecraft:entity.chicken.step":212,"minecraft:block.chorus_flower.death":213,"minecraft:block.chorus_flower.grow":214,"minecraft:item.chorus_fruit.teleport":215,"minecraft:entity.cod.ambient":216,"minecraft:entity.cod.death":217,"minecraft:entity.cod.flop":218,"minecraft:entity.cod.hurt":219,"minecraft:block.comparator.click":220,"minecraft:block.composter.empty":221,"minecraft:block.composter.fill":222,"minecraft:block.composter.fill_success":223,"minecraft:block.composter.ready":224,"minecraft:block.conduit.activate":225,"minecraft:block.conduit.ambient":226,"minecraft:block.conduit.ambient.short":227,"minecraft:block.conduit.attack.target":228,"minecraft:block.conduit.deactivate":229,"minecraft:block.copper.break":230,"minecraft:block.copper.step":231,"minecraft:block.copper.place":232,"minecraft:block.copper.hit":233,"minecraft:block.copper.fall":234,"minecraft:block.coral_block.break":235,"minecraft:block.coral_block.fall":236,"minecraft:block.coral_block.hit":237,"minecraft:block.coral_block.place":238,"minecraft:block.coral_block.step":239,"minecraft:entity.cow.ambient":240,"minecraft:entity.cow.death":241,"minecraft:entity.cow.hurt":242,"minecraft:entity.cow.milk":243,"minecraft:entity.cow.step":244,"minecraft:entity.creeper.death":245,"minecraft:entity.creeper.hurt":246,"minecraft:entity.creeper.primed":247,"minecraft:block.crop.break":248,"minecraft:item.crop.plant":249,"minecraft:item.crossbow.hit":250,"minecraft:item.crossbow.loading_end":251,"minecraft:item.crossbow.loading_middle":252,"minecraft:item.crossbow.loading_start":253,"minecraft:item.crossbow.quick_charge_1":254,"minecraft:item.crossbow.quick_charge_2":255,"minecraft:item.crossbow.quick_charge_3":256,"minecraft:item.crossbow.shoot":257,"minecraft:block.deepslate_bricks.break":258,"minecraft:block.deepslate_bricks.fall":259,"minecraft:block.deepslate_bricks.hit":260,"minecraft:block.deepslate_bricks.place":261,"minecraft:block.deepslate_bricks.step":262,"minecraft:block.deepslate.break":263,"minecraft:block.deepslate.fall":264,"minecraft:block.deepslate.hit":265,"minecraft:block.deepslate.place":266,"minecraft:block.deepslate.step":267,"minecraft:block.deepslate_tiles.break":268,"minecraft:block.deepslate_tiles.fall":269,"minecraft:block.deepslate_tiles.hit":270,"minecraft:block.deepslate_tiles.place":271,"minecraft:block.deepslate_tiles.step":272,"minecraft:block.dispenser.dispense":273,"minecraft:block.dispenser.fail":274,"minecraft:block.dispenser.launch":275,"minecraft:entity.dolphin.ambient":276,"minecraft:entity.dolphin.ambient_water":277,"minecraft:entity.dolphin.attack":278,"minecraft:entity.dolphin.death":279,"minecraft:entity.dolphin.eat":280,"minecraft:entity.dolphin.hurt":281,"minecraft:entity.dolphin.jump":282,"minecraft:entity.dolphin.play":283,"minecraft:entity.dolphin.splash":284,"minecraft:entity.dolphin.swim":285,"minecraft:entity.donkey.ambient":286,"minecraft:entity.donkey.angry":287,"minecraft:entity.donkey.chest":288,"minecraft:entity.donkey.death":289,"minecraft:entity.donkey.eat":290,"minecraft:entity.donkey.hurt":291,"minecraft:block.dripstone_block.break":292,"minecraft:block.dripstone_block.step":293,"minecraft:block.dripstone_block.place":294,"minecraft:block.dripstone_block.hit":295,"minecraft:block.dripstone_block.fall":296,"minecraft:block.pointed_dripstone.break":297,"minecraft:block.pointed_dripstone.step":298,"minecraft:block.pointed_dripstone.place":299,"minecraft:block.pointed_dripstone.hit":300,"minecraft:block.pointed_dripstone.fall":301,"minecraft:block.pointed_dripstone.land":302,"minecraft:block.pointed_dripstone.drip_lava":303,"minecraft:block.pointed_dripstone.drip_water":304,"minecraft:block.pointed_dripstone.drip_lava_into_cauldron":305,"minecraft:block.pointed_dripstone.drip_water_into_cauldron":306,"minecraft:block.big_dripleaf.tilt_down":307,"minecraft:block.big_dripleaf.tilt_up":308,"minecraft:entity.drowned.ambient":309,"minecraft:entity.drowned.ambient_water":310,"minecraft:entity.drowned.death":311,"minecraft:entity.drowned.death_water":312,"minecraft:entity.drowned.hurt":313,"minecraft:entity.drowned.hurt_water":314,"minecraft:entity.drowned.shoot":315,"minecraft:entity.drowned.step":316,"minecraft:entity.drowned.swim":317,"minecraft:item.dye.use":318,"minecraft:entity.egg.throw":319,"minecraft:entity.elder_guardian.ambient":320,"minecraft:entity.elder_guardian.ambient_land":321,"minecraft:entity.elder_guardian.curse":322,"minecraft:entity.elder_guardian.death":323,"minecraft:entity.elder_guardian.death_land":324,"minecraft:entity.elder_guardian.flop":325,"minecraft:entity.elder_guardian.hurt":326,"minecraft:entity.elder_guardian.hurt_land":327,"minecraft:item.elytra.flying":328,"minecraft:block.enchantment_table.use":329,"minecraft:block.ender_chest.close":330,"minecraft:block.ender_chest.open":331,"minecraft:entity.ender_dragon.ambient":332,"minecraft:entity.ender_dragon.death":333,"minecraft:entity.dragon_fireball.explode":334,"minecraft:entity.ender_dragon.flap":335,"minecraft:entity.ender_dragon.growl":336,"minecraft:entity.ender_dragon.hurt":337,"minecraft:entity.ender_dragon.shoot":338,"minecraft:entity.ender_eye.death":339,"minecraft:entity.ender_eye.launch":340,"minecraft:entity.enderman.ambient":341,"minecraft:entity.enderman.death":342,"minecraft:entity.enderman.hurt":343,"minecraft:entity.enderman.scream":344,"minecraft:entity.enderman.stare":345,"minecraft:entity.enderman.teleport":346,"minecraft:entity.endermite.ambient":347,"minecraft:entity.endermite.death":348,"minecraft:entity.endermite.hurt":349,"minecraft:entity.endermite.step":350,"minecraft:entity.ender_pearl.throw":351,"minecraft:block.end_gateway.spawn":352,"minecraft:block.end_portal_frame.fill":353,"minecraft:block.end_portal.spawn":354,"minecraft:entity.evoker.ambient":355,"minecraft:entity.evoker.cast_spell":356,"minecraft:entity.evoker.celebrate":357,"minecraft:entity.evoker.death":358,"minecraft:entity.evoker_fangs.attack":359,"minecraft:entity.evoker.hurt":360,"minecraft:entity.evoker.prepare_attack":361,"minecraft:entity.evoker.prepare_summon":362,"minecraft:entity.evoker.prepare_wololo":363,"minecraft:entity.experience_bottle.throw":364,"minecraft:entity.experience_orb.pickup":365,"minecraft:block.fence_gate.close":366,"minecraft:block.fence_gate.open":367,"minecraft:item.firecharge.use":368,"minecraft:entity.firework_rocket.blast":369,"minecraft:entity.firework_rocket.blast_far":370,"minecraft:entity.firework_rocket.large_blast":371,"minecraft:entity.firework_rocket.large_blast_far":372,"minecraft:entity.firework_rocket.launch":373,"minecraft:entity.firework_rocket.shoot":374,"minecraft:entity.firework_rocket.twinkle":375,"minecraft:entity.firework_rocket.twinkle_far":376,"minecraft:block.fire.ambient":377,"minecraft:block.fire.extinguish":378,"minecraft:entity.fish.swim":379,"minecraft:entity.fishing_bobber.retrieve":380,"minecraft:entity.fishing_bobber.splash":381,"minecraft:entity.fishing_bobber.throw":382,"minecraft:item.flintandsteel.use":383,"minecraft:block.flowering_azalea.break":384,"minecraft:block.flowering_azalea.fall":385,"minecraft:block.flowering_azalea.hit":386,"minecraft:block.flowering_azalea.place":387,"minecraft:block.flowering_azalea.step":388,"minecraft:entity.fox.aggro":389,"minecraft:entity.fox.ambient":390,"minecraft:entity.fox.bite":391,"minecraft:entity.fox.death":392,"minecraft:entity.fox.eat":393,"minecraft:entity.fox.hurt":394,"minecraft:entity.fox.screech":395,"minecraft:entity.fox.sleep":396,"minecraft:entity.fox.sniff":397,"minecraft:entity.fox.spit":398,"minecraft:entity.fox.teleport":399,"minecraft:block.froglight.break":400,"minecraft:block.froglight.fall":401,"minecraft:block.froglight.hit":402,"minecraft:block.froglight.place":403,"minecraft:block.froglight.step":404,"minecraft:block.frogspawn.step":405,"minecraft:block.frogspawn.break":406,"minecraft:block.frogspawn.fall":407,"minecraft:block.frogspawn.hatch":408,"minecraft:block.frogspawn.hit":409,"minecraft:block.frogspawn.place":410,"minecraft:entity.frog.ambient":411,"minecraft:entity.frog.death":412,"minecraft:entity.frog.eat":413,"minecraft:entity.frog.hurt":414,"minecraft:entity.frog.lay_spawn":415,"minecraft:entity.frog.long_jump":416,"minecraft:entity.frog.step":417,"minecraft:entity.frog.tongue":418,"minecraft:block.roots.break":419,"minecraft:block.roots.step":420,"minecraft:block.roots.place":421,"minecraft:block.roots.hit":422,"minecraft:block.roots.fall":423,"minecraft:block.furnace.fire_crackle":424,"minecraft:entity.generic.big_fall":425,"minecraft:entity.generic.burn":426,"minecraft:entity.generic.death":427,"minecraft:entity.generic.drink":428,"minecraft:entity.generic.eat":429,"minecraft:entity.generic.explode":430,"minecraft:entity.generic.extinguish_fire":431,"minecraft:entity.generic.hurt":432,"minecraft:entity.generic.small_fall":433,"minecraft:entity.generic.splash":434,"minecraft:entity.generic.swim":435,"minecraft:entity.ghast.ambient":436,"minecraft:entity.ghast.death":437,"minecraft:entity.ghast.hurt":438,"minecraft:entity.ghast.scream":439,"minecraft:entity.ghast.shoot":440,"minecraft:entity.ghast.warn":441,"minecraft:block.gilded_blackstone.break":442,"minecraft:block.gilded_blackstone.fall":443,"minecraft:block.gilded_blackstone.hit":444,"minecraft:block.gilded_blackstone.place":445,"minecraft:block.gilded_blackstone.step":446,"minecraft:block.glass.break":447,"minecraft:block.glass.fall":448,"minecraft:block.glass.hit":449,"minecraft:block.glass.place":450,"minecraft:block.glass.step":451,"minecraft:item.glow_ink_sac.use":452,"minecraft:entity.glow_item_frame.add_item":453,"minecraft:entity.glow_item_frame.break":454,"minecraft:entity.glow_item_frame.place":455,"minecraft:entity.glow_item_frame.remove_item":456,"minecraft:entity.glow_item_frame.rotate_item":457,"minecraft:entity.glow_squid.ambient":458,"minecraft:entity.glow_squid.death":459,"minecraft:entity.glow_squid.hurt":460,"minecraft:entity.glow_squid.squirt":461,"minecraft:entity.goat.ambient":462,"minecraft:entity.goat.death":463,"minecraft:entity.goat.eat":464,"minecraft:entity.goat.hurt":465,"minecraft:entity.goat.long_jump":466,"minecraft:entity.goat.milk":467,"minecraft:entity.goat.prepare_ram":468,"minecraft:entity.goat.ram_impact":469,"minecraft:entity.goat.horn_break":470,"minecraft:item.goat_horn.play":471,"minecraft:entity.goat.screaming.ambient":472,"minecraft:entity.goat.screaming.death":473,"minecraft:entity.goat.screaming.eat":474,"minecraft:entity.goat.screaming.hurt":475,"minecraft:entity.goat.screaming.long_jump":476,"minecraft:entity.goat.screaming.milk":477,"minecraft:entity.goat.screaming.prepare_ram":478,"minecraft:entity.goat.screaming.ram_impact":479,"minecraft:entity.goat.screaming.horn_break":480,"minecraft:entity.goat.step":481,"minecraft:block.grass.break":482,"minecraft:block.grass.fall":483,"minecraft:block.grass.hit":484,"minecraft:block.grass.place":485,"minecraft:block.grass.step":486,"minecraft:block.gravel.break":487,"minecraft:block.gravel.fall":488,"minecraft:block.gravel.hit":489,"minecraft:block.gravel.place":490,"minecraft:block.gravel.step":491,"minecraft:block.grindstone.use":492,"minecraft:block.growing_plant.crop":493,"minecraft:entity.guardian.ambient":494,"minecraft:entity.guardian.ambient_land":495,"minecraft:entity.guardian.attack":496,"minecraft:entity.guardian.death":497,"minecraft:entity.guardian.death_land":498,"minecraft:entity.guardian.flop":499,"minecraft:entity.guardian.hurt":500,"minecraft:entity.guardian.hurt_land":501,"minecraft:block.hanging_roots.break":502,"minecraft:block.hanging_roots.fall":503,"minecraft:block.hanging_roots.hit":504,"minecraft:block.hanging_roots.place":505,"minecraft:block.hanging_roots.step":506,"minecraft:item.hoe.till":507,"minecraft:entity.hoglin.ambient":508,"minecraft:entity.hoglin.angry":509,"minecraft:entity.hoglin.attack":510,"minecraft:entity.hoglin.converted_to_zombified":511,"minecraft:entity.hoglin.death":512,"minecraft:entity.hoglin.hurt":513,"minecraft:entity.hoglin.retreat":514,"minecraft:entity.hoglin.step":515,"minecraft:block.honey_block.break":516,"minecraft:block.honey_block.fall":517,"minecraft:block.honey_block.hit":518,"minecraft:block.honey_block.place":519,"minecraft:block.honey_block.slide":520,"minecraft:block.honey_block.step":521,"minecraft:item.honeycomb.wax_on":522,"minecraft:item.honey_bottle.drink":523,"minecraft:item.goat_horn.sound.0":524,"minecraft:item.goat_horn.sound.1":525,"minecraft:item.goat_horn.sound.2":526,"minecraft:item.goat_horn.sound.3":527,"minecraft:item.goat_horn.sound.4":528,"minecraft:item.goat_horn.sound.5":529,"minecraft:item.goat_horn.sound.6":530,"minecraft:item.goat_horn.sound.7":531,"minecraft:entity.horse.ambient":532,"minecraft:entity.horse.angry":533,"minecraft:entity.horse.armor":534,"minecraft:entity.horse.breathe":535,"minecraft:entity.horse.death":536,"minecraft:entity.horse.eat":537,"minecraft:entity.horse.gallop":538,"minecraft:entity.horse.hurt":539,"minecraft:entity.horse.jump":540,"minecraft:entity.horse.land":541,"minecraft:entity.horse.saddle":542,"minecraft:entity.horse.step":543,"minecraft:entity.horse.step_wood":544,"minecraft:entity.hostile.big_fall":545,"minecraft:entity.hostile.death":546,"minecraft:entity.hostile.hurt":547,"minecraft:entity.hostile.small_fall":548,"minecraft:entity.hostile.splash":549,"minecraft:entity.hostile.swim":550,"minecraft:entity.husk.ambient":551,"minecraft:entity.husk.converted_to_zombie":552,"minecraft:entity.husk.death":553,"minecraft:entity.husk.hurt":554,"minecraft:entity.husk.step":555,"minecraft:entity.illusioner.ambient":556,"minecraft:entity.illusioner.cast_spell":557,"minecraft:entity.illusioner.death":558,"minecraft:entity.illusioner.hurt":559,"minecraft:entity.illusioner.mirror_move":560,"minecraft:entity.illusioner.prepare_blindness":561,"minecraft:entity.illusioner.prepare_mirror":562,"minecraft:item.ink_sac.use":563,"minecraft:block.iron_door.close":564,"minecraft:block.iron_door.open":565,"minecraft:entity.iron_golem.attack":566,"minecraft:entity.iron_golem.damage":567,"minecraft:entity.iron_golem.death":568,"minecraft:entity.iron_golem.hurt":569,"minecraft:entity.iron_golem.repair":570,"minecraft:entity.iron_golem.step":571,"minecraft:block.iron_trapdoor.close":572,"minecraft:block.iron_trapdoor.open":573,"minecraft:entity.item_frame.add_item":574,"minecraft:entity.item_frame.break":575,"minecraft:entity.item_frame.place":576,"minecraft:entity.item_frame.remove_item":577,"minecraft:entity.item_frame.rotate_item":578,"minecraft:entity.item.break":579,"minecraft:entity.item.pickup":580,"minecraft:block.ladder.break":581,"minecraft:block.ladder.fall":582,"minecraft:block.ladder.hit":583,"minecraft:block.ladder.place":584,"minecraft:block.ladder.step":585,"minecraft:block.lantern.break":586,"minecraft:block.lantern.fall":587,"minecraft:block.lantern.hit":588,"minecraft:block.lantern.place":589,"minecraft:block.lantern.step":590,"minecraft:block.large_amethyst_bud.break":591,"minecraft:block.large_amethyst_bud.place":592,"minecraft:block.lava.ambient":593,"minecraft:block.lava.extinguish":594,"minecraft:block.lava.pop":595,"minecraft:entity.leash_knot.break":596,"minecraft:entity.leash_knot.place":597,"minecraft:block.lever.click":598,"minecraft:entity.lightning_bolt.impact":599,"minecraft:entity.lightning_bolt.thunder":600,"minecraft:entity.lingering_potion.throw":601,"minecraft:entity.llama.ambient":602,"minecraft:entity.llama.angry":603,"minecraft:entity.llama.chest":604,"minecraft:entity.llama.death":605,"minecraft:entity.llama.eat":606,"minecraft:entity.llama.hurt":607,"minecraft:entity.llama.spit":608,"minecraft:entity.llama.step":609,"minecraft:entity.llama.swag":610,"minecraft:entity.magma_cube.death_small":611,"minecraft:block.lodestone.break":612,"minecraft:block.lodestone.step":613,"minecraft:block.lodestone.place":614,"minecraft:block.lodestone.hit":615,"minecraft:block.lodestone.fall":616,"minecraft:item.lodestone_compass.lock":617,"minecraft:entity.magma_cube.death":618,"minecraft:entity.magma_cube.hurt":619,"minecraft:entity.magma_cube.hurt_small":620,"minecraft:entity.magma_cube.jump":621,"minecraft:entity.magma_cube.squish":622,"minecraft:entity.magma_cube.squish_small":623,"minecraft:block.mangrove_roots.break":624,"minecraft:block.mangrove_roots.fall":625,"minecraft:block.mangrove_roots.hit":626,"minecraft:block.mangrove_roots.place":627,"minecraft:block.mangrove_roots.step":628,"minecraft:block.medium_amethyst_bud.break":629,"minecraft:block.medium_amethyst_bud.place":630,"minecraft:block.metal.break":631,"minecraft:block.metal.fall":632,"minecraft:block.metal.hit":633,"minecraft:block.metal.place":634,"minecraft:block.metal_pressure_plate.click_off":635,"minecraft:block.metal_pressure_plate.click_on":636,"minecraft:block.metal.step":637,"minecraft:entity.minecart.inside.underwater":638,"minecraft:entity.minecart.inside":639,"minecraft:entity.minecart.riding":640,"minecraft:entity.mooshroom.convert":641,"minecraft:entity.mooshroom.eat":642,"minecraft:entity.mooshroom.milk":643,"minecraft:entity.mooshroom.suspicious_milk":644,"minecraft:entity.mooshroom.shear":645,"minecraft:block.moss_carpet.break":646,"minecraft:block.moss_carpet.fall":647,"minecraft:block.moss_carpet.hit":648,"minecraft:block.moss_carpet.place":649,"minecraft:block.moss_carpet.step":650,"minecraft:block.moss.break":651,"minecraft:block.moss.fall":652,"minecraft:block.moss.hit":653,"minecraft:block.moss.place":654,"minecraft:block.moss.step":655,"minecraft:block.mud.break":656,"minecraft:block.mud.fall":657,"minecraft:block.mud.hit":658,"minecraft:block.mud.place":659,"minecraft:block.mud.step":660,"minecraft:block.mud_bricks.break":661,"minecraft:block.mud_bricks.fall":662,"minecraft:block.mud_bricks.hit":663,"minecraft:block.mud_bricks.place":664,"minecraft:block.mud_bricks.step":665,"minecraft:block.muddy_mangrove_roots.break":666,"minecraft:block.muddy_mangrove_roots.fall":667,"minecraft:block.muddy_mangrove_roots.hit":668,"minecraft:block.muddy_mangrove_roots.place":669,"minecraft:block.muddy_mangrove_roots.step":670,"minecraft:entity.mule.ambient":671,"minecraft:entity.mule.angry":672,"minecraft:entity.mule.chest":673,"minecraft:entity.mule.death":674,"minecraft:entity.mule.eat":675,"minecraft:entity.mule.hurt":676,"minecraft:music.creative":677,"minecraft:music.credits":678,"minecraft:music_disc.5":679,"minecraft:music_disc.11":680,"minecraft:music_disc.13":681,"minecraft:music_disc.blocks":682,"minecraft:music_disc.cat":683,"minecraft:music_disc.chirp":684,"minecraft:music_disc.far":685,"minecraft:music_disc.mall":686,"minecraft:music_disc.mellohi":687,"minecraft:music_disc.pigstep":688,"minecraft:music_disc.stal":689,"minecraft:music_disc.strad":690,"minecraft:music_disc.wait":691,"minecraft:music_disc.ward":692,"minecraft:music_disc.otherside":693,"minecraft:music.dragon":694,"minecraft:music.end":695,"minecraft:music.game":696,"minecraft:music.menu":697,"minecraft:music.nether.basalt_deltas":698,"minecraft:music.nether.crimson_forest":699,"minecraft:music.overworld.deep_dark":700,"minecraft:music.overworld.dripstone_caves":701,"minecraft:music.overworld.grove":702,"minecraft:music.overworld.jagged_peaks":703,"minecraft:music.overworld.lush_caves":704,"minecraft:music.overworld.swamp":705,"minecraft:music.overworld.jungle_and_forest":706,"minecraft:music.overworld.old_growth_taiga":707,"minecraft:music.overworld.meadow":708,"minecraft:music.nether.nether_wastes":709,"minecraft:music.overworld.frozen_peaks":710,"minecraft:music.overworld.snowy_slopes":711,"minecraft:music.nether.soul_sand_valley":712,"minecraft:music.overworld.stony_peaks":713,"minecraft:music.nether.warped_forest":714,"minecraft:music.under_water":715,"minecraft:block.nether_bricks.break":716,"minecraft:block.nether_bricks.step":717,"minecraft:block.nether_bricks.place":718,"minecraft:block.nether_bricks.hit":719,"minecraft:block.nether_bricks.fall":720,"minecraft:block.nether_wart.break":721,"minecraft:item.nether_wart.plant":722,"minecraft:block.packed_mud.break":723,"minecraft:block.packed_mud.fall":724,"minecraft:block.packed_mud.hit":725,"minecraft:block.packed_mud.place":726,"minecraft:block.packed_mud.step":727,"minecraft:block.stem.break":728,"minecraft:block.stem.step":729,"minecraft:block.stem.place":730,"minecraft:block.stem.hit":731,"minecraft:block.stem.fall":732,"minecraft:block.nylium.break":733,"minecraft:block.nylium.step":734,"minecraft:block.nylium.place":735,"minecraft:block.nylium.hit":736,"minecraft:block.nylium.fall":737,"minecraft:block.nether_sprouts.break":738,"minecraft:block.nether_sprouts.step":739,"minecraft:block.nether_sprouts.place":740,"minecraft:block.nether_sprouts.hit":741,"minecraft:block.nether_sprouts.fall":742,"minecraft:block.fungus.break":743,"minecraft:block.fungus.step":744,"minecraft:block.fungus.place":745,"minecraft:block.fungus.hit":746,"minecraft:block.fungus.fall":747,"minecraft:block.weeping_vines.break":748,"minecraft:block.weeping_vines.step":749,"minecraft:block.weeping_vines.place":750,"minecraft:block.weeping_vines.hit":751,"minecraft:block.weeping_vines.fall":752,"minecraft:block.wart_block.break":753,"minecraft:block.wart_block.step":754,"minecraft:block.wart_block.place":755,"minecraft:block.wart_block.hit":756,"minecraft:block.wart_block.fall":757,"minecraft:block.netherite_block.break":758,"minecraft:block.netherite_block.step":759,"minecraft:block.netherite_block.place":760,"minecraft:block.netherite_block.hit":761,"minecraft:block.netherite_block.fall":762,"minecraft:block.netherrack.break":763,"minecraft:block.netherrack.step":764,"minecraft:block.netherrack.place":765,"minecraft:block.netherrack.hit":766,"minecraft:block.netherrack.fall":767,"minecraft:block.note_block.basedrum":768,"minecraft:block.note_block.bass":769,"minecraft:block.note_block.bell":770,"minecraft:block.note_block.chime":771,"minecraft:block.note_block.flute":772,"minecraft:block.note_block.guitar":773,"minecraft:block.note_block.harp":774,"minecraft:block.note_block.hat":775,"minecraft:block.note_block.pling":776,"minecraft:block.note_block.snare":777,"minecraft:block.note_block.xylophone":778,"minecraft:block.note_block.iron_xylophone":779,"minecraft:block.note_block.cow_bell":780,"minecraft:block.note_block.didgeridoo":781,"minecraft:block.note_block.bit":782,"minecraft:block.note_block.banjo":783,"minecraft:entity.ocelot.hurt":784,"minecraft:entity.ocelot.ambient":785,"minecraft:entity.ocelot.death":786,"minecraft:entity.painting.break":787,"minecraft:entity.painting.place":788,"minecraft:entity.panda.pre_sneeze":789,"minecraft:entity.panda.sneeze":790,"minecraft:entity.panda.ambient":791,"minecraft:entity.panda.death":792,"minecraft:entity.panda.eat":793,"minecraft:entity.panda.step":794,"minecraft:entity.panda.cant_breed":795,"minecraft:entity.panda.aggressive_ambient":796,"minecraft:entity.panda.worried_ambient":797,"minecraft:entity.panda.hurt":798,"minecraft:entity.panda.bite":799,"minecraft:entity.parrot.ambient":800,"minecraft:entity.parrot.death":801,"minecraft:entity.parrot.eat":802,"minecraft:entity.parrot.fly":803,"minecraft:entity.parrot.hurt":804,"minecraft:entity.parrot.imitate.blaze":805,"minecraft:entity.parrot.imitate.creeper":806,"minecraft:entity.parrot.imitate.drowned":807,"minecraft:entity.parrot.imitate.elder_guardian":808,"minecraft:entity.parrot.imitate.ender_dragon":809,"minecraft:entity.parrot.imitate.endermite":810,"minecraft:entity.parrot.imitate.evoker":811,"minecraft:entity.parrot.imitate.ghast":812,"minecraft:entity.parrot.imitate.guardian":813,"minecraft:entity.parrot.imitate.hoglin":814,"minecraft:entity.parrot.imitate.husk":815,"minecraft:entity.parrot.imitate.illusioner":816,"minecraft:entity.parrot.imitate.magma_cube":817,"minecraft:entity.parrot.imitate.phantom":818,"minecraft:entity.parrot.imitate.piglin":819,"minecraft:entity.parrot.imitate.piglin_brute":820,"minecraft:entity.parrot.imitate.pillager":821,"minecraft:entity.parrot.imitate.ravager":822,"minecraft:entity.parrot.imitate.shulker":823,"minecraft:entity.parrot.imitate.silverfish":824,"minecraft:entity.parrot.imitate.skeleton":825,"minecraft:entity.parrot.imitate.slime":826,"minecraft:entity.parrot.imitate.spider":827,"minecraft:entity.parrot.imitate.stray":828,"minecraft:entity.parrot.imitate.vex":829,"minecraft:entity.parrot.imitate.vindicator":830,"minecraft:entity.parrot.imitate.warden":831,"minecraft:entity.parrot.imitate.witch":832,"minecraft:entity.parrot.imitate.wither":833,"minecraft:entity.parrot.imitate.wither_skeleton":834,"minecraft:entity.parrot.imitate.zoglin":835,"minecraft:entity.parrot.imitate.zombie":836,"minecraft:entity.parrot.imitate.zombie_villager":837,"minecraft:entity.parrot.step":838,"minecraft:entity.phantom.ambient":839,"minecraft:entity.phantom.bite":840,"minecraft:entity.phantom.death":841,"minecraft:entity.phantom.flap":842,"minecraft:entity.phantom.hurt":843,"minecraft:entity.phantom.swoop":844,"minecraft:entity.pig.ambient":845,"minecraft:entity.pig.death":846,"minecraft:entity.pig.hurt":847,"minecraft:entity.pig.saddle":848,"minecraft:entity.pig.step":849,"minecraft:entity.piglin.admiring_item":850,"minecraft:entity.piglin.ambient":851,"minecraft:entity.piglin.angry":852,"minecraft:entity.piglin.celebrate":853,"minecraft:entity.piglin.death":854,"minecraft:entity.piglin.jealous":855,"minecraft:entity.piglin.hurt":856,"minecraft:entity.piglin.retreat":857,"minecraft:entity.piglin.step":858,"minecraft:entity.piglin.converted_to_zombified":859,"minecraft:entity.piglin_brute.ambient":860,"minecraft:entity.piglin_brute.angry":861,"minecraft:entity.piglin_brute.death":862,"minecraft:entity.piglin_brute.hurt":863,"minecraft:entity.piglin_brute.step":864,"minecraft:entity.piglin_brute.converted_to_zombified":865,"minecraft:entity.pillager.ambient":866,"minecraft:entity.pillager.celebrate":867,"minecraft:entity.pillager.death":868,"minecraft:entity.pillager.hurt":869,"minecraft:block.piston.contract":870,"minecraft:block.piston.extend":871,"minecraft:entity.player.attack.crit":872,"minecraft:entity.player.attack.knockback":873,"minecraft:entity.player.attack.nodamage":874,"minecraft:entity.player.attack.strong":875,"minecraft:entity.player.attack.sweep":876,"minecraft:entity.player.attack.weak":877,"minecraft:entity.player.big_fall":878,"minecraft:entity.player.breath":879,"minecraft:entity.player.burp":880,"minecraft:entity.player.death":881,"minecraft:entity.player.hurt":882,"minecraft:entity.player.hurt_drown":883,"minecraft:entity.player.hurt_freeze":884,"minecraft:entity.player.hurt_on_fire":885,"minecraft:entity.player.hurt_sweet_berry_bush":886,"minecraft:entity.player.levelup":887,"minecraft:entity.player.small_fall":888,"minecraft:entity.player.splash":889,"minecraft:entity.player.splash.high_speed":890,"minecraft:entity.player.swim":891,"minecraft:entity.polar_bear.ambient":892,"minecraft:entity.polar_bear.ambient_baby":893,"minecraft:entity.polar_bear.death":894,"minecraft:entity.polar_bear.hurt":895,"minecraft:entity.polar_bear.step":896,"minecraft:entity.polar_bear.warning":897,"minecraft:block.polished_deepslate.break":898,"minecraft:block.polished_deepslate.fall":899,"minecraft:block.polished_deepslate.hit":900,"minecraft:block.polished_deepslate.place":901,"minecraft:block.polished_deepslate.step":902,"minecraft:block.portal.ambient":903,"minecraft:block.portal.travel":904,"minecraft:block.portal.trigger":905,"minecraft:block.powder_snow.break":906,"minecraft:block.powder_snow.fall":907,"minecraft:block.powder_snow.hit":908,"minecraft:block.powder_snow.place":909,"minecraft:block.powder_snow.step":910,"minecraft:entity.puffer_fish.ambient":911,"minecraft:entity.puffer_fish.blow_out":912,"minecraft:entity.puffer_fish.blow_up":913,"minecraft:entity.puffer_fish.death":914,"minecraft:entity.puffer_fish.flop":915,"minecraft:entity.puffer_fish.hurt":916,"minecraft:entity.puffer_fish.sting":917,"minecraft:block.pumpkin.carve":918,"minecraft:entity.rabbit.ambient":919,"minecraft:entity.rabbit.attack":920,"minecraft:entity.rabbit.death":921,"minecraft:entity.rabbit.hurt":922,"minecraft:entity.rabbit.jump":923,"minecraft:event.raid.horn":924,"minecraft:entity.ravager.ambient":925,"minecraft:entity.ravager.attack":926,"minecraft:entity.ravager.celebrate":927,"minecraft:entity.ravager.death":928,"minecraft:entity.ravager.hurt":929,"minecraft:entity.ravager.step":930,"minecraft:entity.ravager.stunned":931,"minecraft:entity.ravager.roar":932,"minecraft:block.nether_gold_ore.break":933,"minecraft:block.nether_gold_ore.fall":934,"minecraft:block.nether_gold_ore.hit":935,"minecraft:block.nether_gold_ore.place":936,"minecraft:block.nether_gold_ore.step":937,"minecraft:block.nether_ore.break":938,"minecraft:block.nether_ore.fall":939,"minecraft:block.nether_ore.hit":940,"minecraft:block.nether_ore.place":941,"minecraft:block.nether_ore.step":942,"minecraft:block.redstone_torch.burnout":943,"minecraft:block.respawn_anchor.ambient":944,"minecraft:block.respawn_anchor.charge":945,"minecraft:block.respawn_anchor.deplete":946,"minecraft:block.respawn_anchor.set_spawn":947,"minecraft:block.rooted_dirt.break":948,"minecraft:block.rooted_dirt.fall":949,"minecraft:block.rooted_dirt.hit":950,"minecraft:block.rooted_dirt.place":951,"minecraft:block.rooted_dirt.step":952,"minecraft:entity.salmon.ambient":953,"minecraft:entity.salmon.death":954,"minecraft:entity.salmon.flop":955,"minecraft:entity.salmon.hurt":956,"minecraft:block.sand.break":957,"minecraft:block.sand.fall":958,"minecraft:block.sand.hit":959,"minecraft:block.sand.place":960,"minecraft:block.sand.step":961,"minecraft:block.scaffolding.break":962,"minecraft:block.scaffolding.fall":963,"minecraft:block.scaffolding.hit":964,"minecraft:block.scaffolding.place":965,"minecraft:block.scaffolding.step":966,"minecraft:block.sculk.spread":967,"minecraft:block.sculk.charge":968,"minecraft:block.sculk.break":969,"minecraft:block.sculk.fall":970,"minecraft:block.sculk.hit":971,"minecraft:block.sculk.place":972,"minecraft:block.sculk.step":973,"minecraft:block.sculk_catalyst.bloom":974,"minecraft:block.sculk_catalyst.break":975,"minecraft:block.sculk_catalyst.fall":976,"minecraft:block.sculk_catalyst.hit":977,"minecraft:block.sculk_catalyst.place":978,"minecraft:block.sculk_catalyst.step":979,"minecraft:block.sculk_sensor.clicking":980,"minecraft:block.sculk_sensor.clicking_stop":981,"minecraft:block.sculk_sensor.break":982,"minecraft:block.sculk_sensor.fall":983,"minecraft:block.sculk_sensor.hit":984,"minecraft:block.sculk_sensor.place":985,"minecraft:block.sculk_sensor.step":986,"minecraft:block.sculk_shrieker.break":987,"minecraft:block.sculk_shrieker.fall":988,"minecraft:block.sculk_shrieker.hit":989,"minecraft:block.sculk_shrieker.place":990,"minecraft:block.sculk_shrieker.shriek":991,"minecraft:block.sculk_shrieker.step":992,"minecraft:block.sculk_vein.break":993,"minecraft:block.sculk_vein.fall":994,"minecraft:block.sculk_vein.hit":995,"minecraft:block.sculk_vein.place":996,"minecraft:block.sculk_vein.step":997,"minecraft:entity.sheep.ambient":998,"minecraft:entity.sheep.death":999,"minecraft:entity.sheep.hurt":1000,"minecraft:entity.sheep.shear":1001,"minecraft:entity.sheep.step":1002,"minecraft:item.shield.block":1003,"minecraft:item.shield.break":1004,"minecraft:block.shroomlight.break":1005,"minecraft:block.shroomlight.step":1006,"minecraft:block.shroomlight.place":1007,"minecraft:block.shroomlight.hit":1008,"minecraft:block.shroomlight.fall":1009,"minecraft:item.shovel.flatten":1010,"minecraft:entity.shulker.ambient":1011,"minecraft:block.shulker_box.close":1012,"minecraft:block.shulker_box.open":1013,"minecraft:entity.shulker_bullet.hit":1014,"minecraft:entity.shulker_bullet.hurt":1015,"minecraft:entity.shulker.close":1016,"minecraft:entity.shulker.death":1017,"minecraft:entity.shulker.hurt":1018,"minecraft:entity.shulker.hurt_closed":1019,"minecraft:entity.shulker.open":1020,"minecraft:entity.shulker.shoot":1021,"minecraft:entity.shulker.teleport":1022,"minecraft:entity.silverfish.ambient":1023,"minecraft:entity.silverfish.death":1024,"minecraft:entity.silverfish.hurt":1025,"minecraft:entity.silverfish.step":1026,"minecraft:entity.skeleton.ambient":1027,"minecraft:entity.skeleton.converted_to_stray":1028,"minecraft:entity.skeleton.death":1029,"minecraft:entity.skeleton_horse.ambient":1030,"minecraft:entity.skeleton_horse.death":1031,"minecraft:entity.skeleton_horse.hurt":1032,"minecraft:entity.skeleton_horse.swim":1033,"minecraft:entity.skeleton_horse.ambient_water":1034,"minecraft:entity.skeleton_horse.gallop_water":1035,"minecraft:entity.skeleton_horse.jump_water":1036,"minecraft:entity.skeleton_horse.step_water":1037,"minecraft:entity.skeleton.hurt":1038,"minecraft:entity.skeleton.shoot":1039,"minecraft:entity.skeleton.step":1040,"minecraft:entity.slime.attack":1041,"minecraft:entity.slime.death":1042,"minecraft:entity.slime.hurt":1043,"minecraft:entity.slime.jump":1044,"minecraft:entity.slime.squish":1045,"minecraft:block.slime_block.break":1046,"minecraft:block.slime_block.fall":1047,"minecraft:block.slime_block.hit":1048,"minecraft:block.slime_block.place":1049,"minecraft:block.slime_block.step":1050,"minecraft:block.small_amethyst_bud.break":1051,"minecraft:block.small_amethyst_bud.place":1052,"minecraft:block.small_dripleaf.break":1053,"minecraft:block.small_dripleaf.fall":1054,"minecraft:block.small_dripleaf.hit":1055,"minecraft:block.small_dripleaf.place":1056,"minecraft:block.small_dripleaf.step":1057,"minecraft:block.soul_sand.break":1058,"minecraft:block.soul_sand.step":1059,"minecraft:block.soul_sand.place":1060,"minecraft:block.soul_sand.hit":1061,"minecraft:block.soul_sand.fall":1062,"minecraft:block.soul_soil.break":1063,"minecraft:block.soul_soil.step":1064,"minecraft:block.soul_soil.place":1065,"minecraft:block.soul_soil.hit":1066,"minecraft:block.soul_soil.fall":1067,"minecraft:particle.soul_escape":1068,"minecraft:block.spore_blossom.break":1069,"minecraft:block.spore_blossom.fall":1070,"minecraft:block.spore_blossom.hit":1071,"minecraft:block.spore_blossom.place":1072,"minecraft:block.spore_blossom.step":1073,"minecraft:entity.strider.ambient":1074,"minecraft:entity.strider.happy":1075,"minecraft:entity.strider.retreat":1076,"minecraft:entity.strider.death":1077,"minecraft:entity.strider.hurt":1078,"minecraft:entity.strider.step":1079,"minecraft:entity.strider.step_lava":1080,"minecraft:entity.strider.eat":1081,"minecraft:entity.strider.saddle":1082,"minecraft:entity.slime.death_small":1083,"minecraft:entity.slime.hurt_small":1084,"minecraft:entity.slime.jump_small":1085,"minecraft:entity.slime.squish_small":1086,"minecraft:block.smithing_table.use":1087,"minecraft:block.smoker.smoke":1088,"minecraft:entity.snowball.throw":1089,"minecraft:block.snow.break":1090,"minecraft:block.snow.fall":1091,"minecraft:entity.snow_golem.ambient":1092,"minecraft:entity.snow_golem.death":1093,"minecraft:entity.snow_golem.hurt":1094,"minecraft:entity.snow_golem.shoot":1095,"minecraft:entity.snow_golem.shear":1096,"minecraft:block.snow.hit":1097,"minecraft:block.snow.place":1098,"minecraft:block.snow.step":1099,"minecraft:entity.spider.ambient":1100,"minecraft:entity.spider.death":1101,"minecraft:entity.spider.hurt":1102,"minecraft:entity.spider.step":1103,"minecraft:entity.splash_potion.break":1104,"minecraft:entity.splash_potion.throw":1105,"minecraft:item.spyglass.use":1106,"minecraft:item.spyglass.stop_using":1107,"minecraft:entity.squid.ambient":1108,"minecraft:entity.squid.death":1109,"minecraft:entity.squid.hurt":1110,"minecraft:entity.squid.squirt":1111,"minecraft:block.stone.break":1112,"minecraft:block.stone_button.click_off":1113,"minecraft:block.stone_button.click_on":1114,"minecraft:block.stone.fall":1115,"minecraft:block.stone.hit":1116,"minecraft:block.stone.place":1117,"minecraft:block.stone_pressure_plate.click_off":1118,"minecraft:block.stone_pressure_plate.click_on":1119,"minecraft:block.stone.step":1120,"minecraft:entity.stray.ambient":1121,"minecraft:entity.stray.death":1122,"minecraft:entity.stray.hurt":1123,"minecraft:entity.stray.step":1124,"minecraft:block.sweet_berry_bush.break":1125,"minecraft:block.sweet_berry_bush.place":1126,"minecraft:block.sweet_berry_bush.pick_berries":1127,"minecraft:entity.tadpole.death":1128,"minecraft:entity.tadpole.flop":1129,"minecraft:entity.tadpole.grow_up":1130,"minecraft:entity.tadpole.hurt":1131,"minecraft:enchant.thorns.hit":1132,"minecraft:entity.tnt.primed":1133,"minecraft:item.totem.use":1134,"minecraft:item.trident.hit":1135,"minecraft:item.trident.hit_ground":1136,"minecraft:item.trident.return":1137,"minecraft:item.trident.riptide_1":1138,"minecraft:item.trident.riptide_2":1139,"minecraft:item.trident.riptide_3":1140,"minecraft:item.trident.throw":1141,"minecraft:item.trident.thunder":1142,"minecraft:block.tripwire.attach":1143,"minecraft:block.tripwire.click_off":1144,"minecraft:block.tripwire.click_on":1145,"minecraft:block.tripwire.detach":1146,"minecraft:entity.tropical_fish.ambient":1147,"minecraft:entity.tropical_fish.death":1148,"minecraft:entity.tropical_fish.flop":1149,"minecraft:entity.tropical_fish.hurt":1150,"minecraft:block.tuff.break":1151,"minecraft:block.tuff.step":1152,"minecraft:block.tuff.place":1153,"minecraft:block.tuff.hit":1154,"minecraft:block.tuff.fall":1155,"minecraft:entity.turtle.ambient_land":1156,"minecraft:entity.turtle.death":1157,"minecraft:entity.turtle.death_baby":1158,"minecraft:entity.turtle.egg_break":1159,"minecraft:entity.turtle.egg_crack":1160,"minecraft:entity.turtle.egg_hatch":1161,"minecraft:entity.turtle.hurt":1162,"minecraft:entity.turtle.hurt_baby":1163,"minecraft:entity.turtle.lay_egg":1164,"minecraft:entity.turtle.shamble":1165,"minecraft:entity.turtle.shamble_baby":1166,"minecraft:entity.turtle.swim":1167,"minecraft:ui.button.click":1168,"minecraft:ui.loom.select_pattern":1169,"minecraft:ui.loom.take_result":1170,"minecraft:ui.cartography_table.take_result":1171,"minecraft:ui.stonecutter.take_result":1172,"minecraft:ui.stonecutter.select_recipe":1173,"minecraft:ui.toast.challenge_complete":1174,"minecraft:ui.toast.in":1175,"minecraft:ui.toast.out":1176,"minecraft:entity.vex.ambient":1177,"minecraft:entity.vex.charge":1178,"minecraft:entity.vex.death":1179,"minecraft:entity.vex.hurt":1180,"minecraft:entity.villager.ambient":1181,"minecraft:entity.villager.celebrate":1182,"minecraft:entity.villager.death":1183,"minecraft:entity.villager.hurt":1184,"minecraft:entity.villager.no":1185,"minecraft:entity.villager.trade":1186,"minecraft:entity.villager.yes":1187,"minecraft:entity.villager.work_armorer":1188,"minecraft:entity.villager.work_butcher":1189,"minecraft:entity.villager.work_cartographer":1190,"minecraft:entity.villager.work_cleric":1191,"minecraft:entity.villager.work_farmer":1192,"minecraft:entity.villager.work_fisherman":1193,"minecraft:entity.villager.work_fletcher":1194,"minecraft:entity.villager.work_leatherworker":1195,"minecraft:entity.villager.work_librarian":1196,"minecraft:entity.villager.work_mason":1197,"minecraft:entity.villager.work_shepherd":1198,"minecraft:entity.villager.work_toolsmith":1199,"minecraft:entity.villager.work_weaponsmith":1200,"minecraft:entity.vindicator.ambient":1201,"minecraft:entity.vindicator.celebrate":1202,"minecraft:entity.vindicator.death":1203,"minecraft:entity.vindicator.hurt":1204,"minecraft:block.vine.break":1205,"minecraft:block.vine.fall":1206,"minecraft:block.vine.hit":1207,"minecraft:block.vine.place":1208,"minecraft:block.vine.step":1209,"minecraft:block.lily_pad.place":1210,"minecraft:entity.wandering_trader.ambient":1211,"minecraft:entity.wandering_trader.death":1212,"minecraft:entity.wandering_trader.disappeared":1213,"minecraft:entity.wandering_trader.drink_milk":1214,"minecraft:entity.wandering_trader.drink_potion":1215,"minecraft:entity.wandering_trader.hurt":1216,"minecraft:entity.wandering_trader.no":1217,"minecraft:entity.wandering_trader.reappeared":1218,"minecraft:entity.wandering_trader.trade":1219,"minecraft:entity.wandering_trader.yes":1220,"minecraft:entity.warden.agitated":1221,"minecraft:entity.warden.ambient":1222,"minecraft:entity.warden.angry":1223,"minecraft:entity.warden.attack_impact":1224,"minecraft:entity.warden.death":1225,"minecraft:entity.warden.dig":1226,"minecraft:entity.warden.emerge":1227,"minecraft:entity.warden.heartbeat":1228,"minecraft:entity.warden.hurt":1229,"minecraft:entity.warden.listening":1230,"minecraft:entity.warden.listening_angry":1231,"minecraft:entity.warden.nearby_close":1232,"minecraft:entity.warden.nearby_closer":1233,"minecraft:entity.warden.nearby_closest":1234,"minecraft:entity.warden.roar":1235,"minecraft:entity.warden.sniff":1236,"minecraft:entity.warden.sonic_boom":1237,"minecraft:entity.warden.sonic_charge":1238,"minecraft:entity.warden.step":1239,"minecraft:entity.warden.tendril_clicks":1240,"minecraft:block.water.ambient":1241,"minecraft:weather.rain":1242,"minecraft:weather.rain.above":1243,"minecraft:block.wet_grass.break":1244,"minecraft:block.wet_grass.fall":1245,"minecraft:block.wet_grass.hit":1246,"minecraft:block.wet_grass.place":1247,"minecraft:block.wet_grass.step":1248,"minecraft:entity.witch.ambient":1249,"minecraft:entity.witch.celebrate":1250,"minecraft:entity.witch.death":1251,"minecraft:entity.witch.drink":1252,"minecraft:entity.witch.hurt":1253,"minecraft:entity.witch.throw":1254,"minecraft:entity.wither.ambient":1255,"minecraft:entity.wither.break_block":1256,"minecraft:entity.wither.death":1257,"minecraft:entity.wither.hurt":1258,"minecraft:entity.wither.shoot":1259,"minecraft:entity.wither_skeleton.ambient":1260,"minecraft:entity.wither_skeleton.death":1261,"minecraft:entity.wither_skeleton.hurt":1262,"minecraft:entity.wither_skeleton.step":1263,"minecraft:entity.wither.spawn":1264,"minecraft:entity.wolf.ambient":1265,"minecraft:entity.wolf.death":1266,"minecraft:entity.wolf.growl":1267,"minecraft:entity.wolf.howl":1268,"minecraft:entity.wolf.hurt":1269,"minecraft:entity.wolf.pant":1270,"minecraft:entity.wolf.shake":1271,"minecraft:entity.wolf.step":1272,"minecraft:entity.wolf.whine":1273,"minecraft:block.wooden_door.close":1274,"minecraft:block.wooden_door.open":1275,"minecraft:block.wooden_trapdoor.close":1276,"minecraft:block.wooden_trapdoor.open":1277,"minecraft:block.wood.break":1278,"minecraft:block.wooden_button.click_off":1279,"minecraft:block.wooden_button.click_on":1280,"minecraft:block.wood.fall":1281,"minecraft:block.wood.hit":1282,"minecraft:block.wood.place":1283,"minecraft:block.wooden_pressure_plate.click_off":1284,"minecraft:block.wooden_pressure_plate.click_on":1285,"minecraft:block.wood.step":1286,"minecraft:block.wool.break":1287,"minecraft:block.wool.fall":1288,"minecraft:block.wool.hit":1289,"minecraft:block.wool.place":1290,"minecraft:block.wool.step":1291,"minecraft:entity.zoglin.ambient":1292,"minecraft:entity.zoglin.angry":1293,"minecraft:entity.zoglin.attack":1294,"minecraft:entity.zoglin.death":1295,"minecraft:entity.zoglin.hurt":1296,"minecraft:entity.zoglin.step":1297,"minecraft:entity.zombie.ambient":1298,"minecraft:entity.zombie.attack_wooden_door":1299,"minecraft:entity.zombie.attack_iron_door":1300,"minecraft:entity.zombie.break_wooden_door":1301,"minecraft:entity.zombie.converted_to_drowned":1302,"minecraft:entity.zombie.death":1303,"minecraft:entity.zombie.destroy_egg":1304,"minecraft:entity.zombie_horse.ambient":1305,"minecraft:entity.zombie_horse.death":1306,"minecraft:entity.zombie_horse.hurt":1307,"minecraft:entity.zombie.hurt":1308,"minecraft:entity.zombie.infect":1309,"minecraft:entity.zombified_piglin.ambient":1310,"minecraft:entity.zombified_piglin.angry":1311,"minecraft:entity.zombified_piglin.death":1312,"minecraft:entity.zombified_piglin.hurt":1313,"minecraft:entity.zombie.step":1314,"minecraft:entity.zombie_villager.ambient":1315,"minecraft:entity.zombie_villager.converted":1316,"minecraft:entity.zombie_villager.cure":1317,"minecraft:entity.zombie_villager.death":1318,"minecraft:entity.zombie_villager.hurt":1319,"minecraft:entity.zombie_villager.step":1320}`,
  ),
);

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
    `{"dummy:invalid":0,"minecraft:speed":1,"minecraft:slowness":2,"minecraft:haste":3,"minecraft:mining_fatigue":4,"minecraft:strength":5,"minecraft:instant_health":6,"minecraft:instant_damage":7,"minecraft:jump_boost":8,"minecraft:nausea":9,"minecraft:regeneration":10,"minecraft:resistance":11,"minecraft:fire_resistance":12,"minecraft:water_breathing":13,"minecraft:invisibility":14,"minecraft:blindness":15,"minecraft:night_vision":16,"minecraft:hunger":17,"minecraft:weakness":18,"minecraft:poison":19,"minecraft:wither":20,"minecraft:health_boost":21,"minecraft:absorption":22,"minecraft:saturation":23,"minecraft:glowing":24,"minecraft:levitation":25,"minecraft:luck":26,"minecraft:unluck":27,"minecraft:slow_falling":28,"minecraft:conduit_power":29,"minecraft:dolphins_grace":30,"minecraft:bad_omen":31,"minecraft:hero_of_the_village":32,"minecraft:darkness":33}`,
  ),
);

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
    `{"minecraft:allay":0,"minecraft:area_effect_cloud":1,"minecraft:armor_stand":2,"minecraft:arrow":3,"minecraft:axolotl":4,"minecraft:bat":5,"minecraft:bee":6,"minecraft:blaze":7,"minecraft:boat":8,"minecraft:chest_boat":9,"minecraft:cat":10,"minecraft:cave_spider":11,"minecraft:chicken":12,"minecraft:cod":13,"minecraft:cow":14,"minecraft:creeper":15,"minecraft:dolphin":16,"minecraft:donkey":17,"minecraft:dragon_fireball":18,"minecraft:drowned":19,"minecraft:elder_guardian":20,"minecraft:end_crystal":21,"minecraft:ender_dragon":22,"minecraft:enderman":23,"minecraft:endermite":24,"minecraft:evoker":25,"minecraft:evoker_fangs":26,"minecraft:experience_orb":27,"minecraft:eye_of_ender":28,"minecraft:falling_block":29,"minecraft:firework_rocket":30,"minecraft:fox":31,"minecraft:frog":32,"minecraft:ghast":33,"minecraft:giant":34,"minecraft:glow_item_frame":35,"minecraft:glow_squid":36,"minecraft:goat":37,"minecraft:guardian":38,"minecraft:hoglin":39,"minecraft:horse":40,"minecraft:husk":41,"minecraft:illusioner":42,"minecraft:iron_golem":43,"minecraft:item":44,"minecraft:item_frame":45,"minecraft:fireball":46,"minecraft:leash_knot":47,"minecraft:lightning_bolt":48,"minecraft:llama":49,"minecraft:llama_spit":50,"minecraft:magma_cube":51,"minecraft:marker":52,"minecraft:minecart":53,"minecraft:chest_minecart":54,"minecraft:command_block_minecart":55,"minecraft:furnace_minecart":56,"minecraft:hopper_minecart":57,"minecraft:spawner_minecart":58,"minecraft:tnt_minecart":59,"minecraft:mule":60,"minecraft:mooshroom":61,"minecraft:ocelot":62,"minecraft:painting":63,"minecraft:panda":64,"minecraft:parrot":65,"minecraft:phantom":66,"minecraft:pig":67,"minecraft:piglin":68,"minecraft:piglin_brute":69,"minecraft:pillager":70,"minecraft:polar_bear":71,"minecraft:tnt":72,"minecraft:pufferfish":73,"minecraft:rabbit":74,"minecraft:ravager":75,"minecraft:salmon":76,"minecraft:sheep":77,"minecraft:shulker":78,"minecraft:shulker_bullet":79,"minecraft:silverfish":80,"minecraft:skeleton":81,"minecraft:skeleton_horse":82,"minecraft:slime":83,"minecraft:small_fireball":84,"minecraft:snow_golem":85,"minecraft:snowball":86,"minecraft:spectral_arrow":87,"minecraft:spider":88,"minecraft:squid":89,"minecraft:stray":90,"minecraft:strider":91,"minecraft:tadpole":92,"minecraft:egg":93,"minecraft:ender_pearl":94,"minecraft:experience_bottle":95,"minecraft:potion":96,"minecraft:trident":97,"minecraft:trader_llama":98,"minecraft:tropical_fish":99,"minecraft:turtle":100,"minecraft:vex":101,"minecraft:villager":102,"minecraft:vindicator":103,"minecraft:wandering_trader":104,"minecraft:warden":105,"minecraft:witch":106,"minecraft:wither":107,"minecraft:wither_skeleton":108,"minecraft:wither_skull":109,"minecraft:wolf":110,"minecraft:zoglin":111,"minecraft:zombie":112,"minecraft:zombie_horse":113,"minecraft:zombie_villager":114,"minecraft:zombified_piglin":115,"minecraft:player":116,"minecraft:fishing_bobber":117}`,
  ),
);

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
    `{"minecraft:furnace":0,"minecraft:chest":1,"minecraft:trapped_chest":2,"minecraft:ender_chest":3,"minecraft:jukebox":4,"minecraft:dispenser":5,"minecraft:dropper":6,"minecraft:sign":7,"minecraft:mob_spawner":8,"minecraft:piston":9,"minecraft:brewing_stand":10,"minecraft:enchanting_table":11,"minecraft:end_portal":12,"minecraft:beacon":13,"minecraft:skull":14,"minecraft:daylight_detector":15,"minecraft:hopper":16,"minecraft:comparator":17,"minecraft:banner":18,"minecraft:structure_block":19,"minecraft:end_gateway":20,"minecraft:command_block":21,"minecraft:shulker_box":22,"minecraft:bed":23,"minecraft:conduit":24,"minecraft:barrel":25,"minecraft:smoker":26,"minecraft:blast_furnace":27,"minecraft:lectern":28,"minecraft:bell":29,"minecraft:jigsaw":30,"minecraft:campfire":31,"minecraft:beehive":32,"minecraft:sculk_sensor":33,"minecraft:sculk_catalyst":34,"minecraft:sculk_shrieker":35}`,
  ),
);

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
    `{"minecraft:air":0,"minecraft:stone":1,"minecraft:granite":2,"minecraft:polished_granite":3,"minecraft:diorite":4,"minecraft:polished_diorite":5,"minecraft:andesite":6,"minecraft:polished_andesite":7,"minecraft:deepslate":8,"minecraft:cobbled_deepslate":9,"minecraft:polished_deepslate":10,"minecraft:calcite":11,"minecraft:tuff":12,"minecraft:dripstone_block":13,"minecraft:grass_block":14,"minecraft:dirt":15,"minecraft:coarse_dirt":16,"minecraft:podzol":17,"minecraft:rooted_dirt":18,"minecraft:mud":19,"minecraft:crimson_nylium":20,"minecraft:warped_nylium":21,"minecraft:cobblestone":22,"minecraft:oak_planks":23,"minecraft:spruce_planks":24,"minecraft:birch_planks":25,"minecraft:jungle_planks":26,"minecraft:acacia_planks":27,"minecraft:dark_oak_planks":28,"minecraft:mangrove_planks":29,"minecraft:crimson_planks":30,"minecraft:warped_planks":31,"minecraft:oak_sapling":32,"minecraft:spruce_sapling":33,"minecraft:birch_sapling":34,"minecraft:jungle_sapling":35,"minecraft:acacia_sapling":36,"minecraft:dark_oak_sapling":37,"minecraft:mangrove_propagule":38,"minecraft:bedrock":39,"minecraft:sand":40,"minecraft:red_sand":41,"minecraft:gravel":42,"minecraft:coal_ore":43,"minecraft:deepslate_coal_ore":44,"minecraft:iron_ore":45,"minecraft:deepslate_iron_ore":46,"minecraft:copper_ore":47,"minecraft:deepslate_copper_ore":48,"minecraft:gold_ore":49,"minecraft:deepslate_gold_ore":50,"minecraft:redstone_ore":51,"minecraft:deepslate_redstone_ore":52,"minecraft:emerald_ore":53,"minecraft:deepslate_emerald_ore":54,"minecraft:lapis_ore":55,"minecraft:deepslate_lapis_ore":56,"minecraft:diamond_ore":57,"minecraft:deepslate_diamond_ore":58,"minecraft:nether_gold_ore":59,"minecraft:nether_quartz_ore":60,"minecraft:ancient_debris":61,"minecraft:coal_block":62,"minecraft:raw_iron_block":63,"minecraft:raw_copper_block":64,"minecraft:raw_gold_block":65,"minecraft:amethyst_block":66,"minecraft:budding_amethyst":67,"minecraft:iron_block":68,"minecraft:copper_block":69,"minecraft:gold_block":70,"minecraft:diamond_block":71,"minecraft:netherite_block":72,"minecraft:exposed_copper":73,"minecraft:weathered_copper":74,"minecraft:oxidized_copper":75,"minecraft:cut_copper":76,"minecraft:exposed_cut_copper":77,"minecraft:weathered_cut_copper":78,"minecraft:oxidized_cut_copper":79,"minecraft:cut_copper_stairs":80,"minecraft:exposed_cut_copper_stairs":81,"minecraft:weathered_cut_copper_stairs":82,"minecraft:oxidized_cut_copper_stairs":83,"minecraft:cut_copper_slab":84,"minecraft:exposed_cut_copper_slab":85,"minecraft:weathered_cut_copper_slab":86,"minecraft:oxidized_cut_copper_slab":87,"minecraft:waxed_copper_block":88,"minecraft:waxed_exposed_copper":89,"minecraft:waxed_weathered_copper":90,"minecraft:waxed_oxidized_copper":91,"minecraft:waxed_cut_copper":92,"minecraft:waxed_exposed_cut_copper":93,"minecraft:waxed_weathered_cut_copper":94,"minecraft:waxed_oxidized_cut_copper":95,"minecraft:waxed_cut_copper_stairs":96,"minecraft:waxed_exposed_cut_copper_stairs":97,"minecraft:waxed_weathered_cut_copper_stairs":98,"minecraft:waxed_oxidized_cut_copper_stairs":99,"minecraft:waxed_cut_copper_slab":100,"minecraft:waxed_exposed_cut_copper_slab":101,"minecraft:waxed_weathered_cut_copper_slab":102,"minecraft:waxed_oxidized_cut_copper_slab":103,"minecraft:oak_log":104,"minecraft:spruce_log":105,"minecraft:birch_log":106,"minecraft:jungle_log":107,"minecraft:acacia_log":108,"minecraft:dark_oak_log":109,"minecraft:mangrove_log":110,"minecraft:mangrove_roots":111,"minecraft:muddy_mangrove_roots":112,"minecraft:crimson_stem":113,"minecraft:warped_stem":114,"minecraft:stripped_oak_log":115,"minecraft:stripped_spruce_log":116,"minecraft:stripped_birch_log":117,"minecraft:stripped_jungle_log":118,"minecraft:stripped_acacia_log":119,"minecraft:stripped_dark_oak_log":120,"minecraft:stripped_mangrove_log":121,"minecraft:stripped_crimson_stem":122,"minecraft:stripped_warped_stem":123,"minecraft:stripped_oak_wood":124,"minecraft:stripped_spruce_wood":125,"minecraft:stripped_birch_wood":126,"minecraft:stripped_jungle_wood":127,"minecraft:stripped_acacia_wood":128,"minecraft:stripped_dark_oak_wood":129,"minecraft:stripped_mangrove_wood":130,"minecraft:stripped_crimson_hyphae":131,"minecraft:stripped_warped_hyphae":132,"minecraft:oak_wood":133,"minecraft:spruce_wood":134,"minecraft:birch_wood":135,"minecraft:jungle_wood":136,"minecraft:acacia_wood":137,"minecraft:dark_oak_wood":138,"minecraft:mangrove_wood":139,"minecraft:crimson_hyphae":140,"minecraft:warped_hyphae":141,"minecraft:oak_leaves":142,"minecraft:spruce_leaves":143,"minecraft:birch_leaves":144,"minecraft:jungle_leaves":145,"minecraft:acacia_leaves":146,"minecraft:dark_oak_leaves":147,"minecraft:mangrove_leaves":148,"minecraft:azalea_leaves":149,"minecraft:flowering_azalea_leaves":150,"minecraft:sponge":151,"minecraft:wet_sponge":152,"minecraft:glass":153,"minecraft:tinted_glass":154,"minecraft:lapis_block":155,"minecraft:sandstone":156,"minecraft:chiseled_sandstone":157,"minecraft:cut_sandstone":158,"minecraft:cobweb":159,"minecraft:grass":160,"minecraft:fern":161,"minecraft:azalea":162,"minecraft:flowering_azalea":163,"minecraft:dead_bush":164,"minecraft:seagrass":165,"minecraft:sea_pickle":166,"minecraft:white_wool":167,"minecraft:orange_wool":168,"minecraft:magenta_wool":169,"minecraft:light_blue_wool":170,"minecraft:yellow_wool":171,"minecraft:lime_wool":172,"minecraft:pink_wool":173,"minecraft:gray_wool":174,"minecraft:light_gray_wool":175,"minecraft:cyan_wool":176,"minecraft:purple_wool":177,"minecraft:blue_wool":178,"minecraft:brown_wool":179,"minecraft:green_wool":180,"minecraft:red_wool":181,"minecraft:black_wool":182,"minecraft:dandelion":183,"minecraft:poppy":184,"minecraft:blue_orchid":185,"minecraft:allium":186,"minecraft:azure_bluet":187,"minecraft:red_tulip":188,"minecraft:orange_tulip":189,"minecraft:white_tulip":190,"minecraft:pink_tulip":191,"minecraft:oxeye_daisy":192,"minecraft:cornflower":193,"minecraft:lily_of_the_valley":194,"minecraft:wither_rose":195,"minecraft:spore_blossom":196,"minecraft:brown_mushroom":197,"minecraft:red_mushroom":198,"minecraft:crimson_fungus":199,"minecraft:warped_fungus":200,"minecraft:crimson_roots":201,"minecraft:warped_roots":202,"minecraft:nether_sprouts":203,"minecraft:weeping_vines":204,"minecraft:twisting_vines":205,"minecraft:sugar_cane":206,"minecraft:kelp":207,"minecraft:moss_carpet":208,"minecraft:moss_block":209,"minecraft:hanging_roots":210,"minecraft:big_dripleaf":211,"minecraft:small_dripleaf":212,"minecraft:bamboo":213,"minecraft:oak_slab":214,"minecraft:spruce_slab":215,"minecraft:birch_slab":216,"minecraft:jungle_slab":217,"minecraft:acacia_slab":218,"minecraft:dark_oak_slab":219,"minecraft:mangrove_slab":220,"minecraft:crimson_slab":221,"minecraft:warped_slab":222,"minecraft:stone_slab":223,"minecraft:smooth_stone_slab":224,"minecraft:sandstone_slab":225,"minecraft:cut_sandstone_slab":226,"minecraft:petrified_oak_slab":227,"minecraft:cobblestone_slab":228,"minecraft:brick_slab":229,"minecraft:stone_brick_slab":230,"minecraft:mud_brick_slab":231,"minecraft:nether_brick_slab":232,"minecraft:quartz_slab":233,"minecraft:red_sandstone_slab":234,"minecraft:cut_red_sandstone_slab":235,"minecraft:purpur_slab":236,"minecraft:prismarine_slab":237,"minecraft:prismarine_brick_slab":238,"minecraft:dark_prismarine_slab":239,"minecraft:smooth_quartz":240,"minecraft:smooth_red_sandstone":241,"minecraft:smooth_sandstone":242,"minecraft:smooth_stone":243,"minecraft:bricks":244,"minecraft:bookshelf":245,"minecraft:mossy_cobblestone":246,"minecraft:obsidian":247,"minecraft:torch":248,"minecraft:end_rod":249,"minecraft:chorus_plant":250,"minecraft:chorus_flower":251,"minecraft:purpur_block":252,"minecraft:purpur_pillar":253,"minecraft:purpur_stairs":254,"minecraft:spawner":255,"minecraft:chest":256,"minecraft:crafting_table":257,"minecraft:farmland":258,"minecraft:furnace":259,"minecraft:ladder":260,"minecraft:cobblestone_stairs":261,"minecraft:snow":262,"minecraft:ice":263,"minecraft:snow_block":264,"minecraft:cactus":265,"minecraft:clay":266,"minecraft:jukebox":267,"minecraft:oak_fence":268,"minecraft:spruce_fence":269,"minecraft:birch_fence":270,"minecraft:jungle_fence":271,"minecraft:acacia_fence":272,"minecraft:dark_oak_fence":273,"minecraft:mangrove_fence":274,"minecraft:crimson_fence":275,"minecraft:warped_fence":276,"minecraft:pumpkin":277,"minecraft:carved_pumpkin":278,"minecraft:jack_o_lantern":279,"minecraft:netherrack":280,"minecraft:soul_sand":281,"minecraft:soul_soil":282,"minecraft:basalt":283,"minecraft:polished_basalt":284,"minecraft:smooth_basalt":285,"minecraft:soul_torch":286,"minecraft:glowstone":287,"minecraft:infested_stone":288,"minecraft:infested_cobblestone":289,"minecraft:infested_stone_bricks":290,"minecraft:infested_mossy_stone_bricks":291,"minecraft:infested_cracked_stone_bricks":292,"minecraft:infested_chiseled_stone_bricks":293,"minecraft:infested_deepslate":294,"minecraft:stone_bricks":295,"minecraft:mossy_stone_bricks":296,"minecraft:cracked_stone_bricks":297,"minecraft:chiseled_stone_bricks":298,"minecraft:packed_mud":299,"minecraft:mud_bricks":300,"minecraft:deepslate_bricks":301,"minecraft:cracked_deepslate_bricks":302,"minecraft:deepslate_tiles":303,"minecraft:cracked_deepslate_tiles":304,"minecraft:chiseled_deepslate":305,"minecraft:reinforced_deepslate":306,"minecraft:brown_mushroom_block":307,"minecraft:red_mushroom_block":308,"minecraft:mushroom_stem":309,"minecraft:iron_bars":310,"minecraft:chain":311,"minecraft:glass_pane":312,"minecraft:melon":313,"minecraft:vine":314,"minecraft:glow_lichen":315,"minecraft:brick_stairs":316,"minecraft:stone_brick_stairs":317,"minecraft:mud_brick_stairs":318,"minecraft:mycelium":319,"minecraft:lily_pad":320,"minecraft:nether_bricks":321,"minecraft:cracked_nether_bricks":322,"minecraft:chiseled_nether_bricks":323,"minecraft:nether_brick_fence":324,"minecraft:nether_brick_stairs":325,"minecraft:sculk":326,"minecraft:sculk_vein":327,"minecraft:sculk_catalyst":328,"minecraft:sculk_shrieker":329,"minecraft:enchanting_table":330,"minecraft:end_portal_frame":331,"minecraft:end_stone":332,"minecraft:end_stone_bricks":333,"minecraft:dragon_egg":334,"minecraft:sandstone_stairs":335,"minecraft:ender_chest":336,"minecraft:emerald_block":337,"minecraft:oak_stairs":338,"minecraft:spruce_stairs":339,"minecraft:birch_stairs":340,"minecraft:jungle_stairs":341,"minecraft:acacia_stairs":342,"minecraft:dark_oak_stairs":343,"minecraft:mangrove_stairs":344,"minecraft:crimson_stairs":345,"minecraft:warped_stairs":346,"minecraft:command_block":347,"minecraft:beacon":348,"minecraft:cobblestone_wall":349,"minecraft:mossy_cobblestone_wall":350,"minecraft:brick_wall":351,"minecraft:prismarine_wall":352,"minecraft:red_sandstone_wall":353,"minecraft:mossy_stone_brick_wall":354,"minecraft:granite_wall":355,"minecraft:stone_brick_wall":356,"minecraft:mud_brick_wall":357,"minecraft:nether_brick_wall":358,"minecraft:andesite_wall":359,"minecraft:red_nether_brick_wall":360,"minecraft:sandstone_wall":361,"minecraft:end_stone_brick_wall":362,"minecraft:diorite_wall":363,"minecraft:blackstone_wall":364,"minecraft:polished_blackstone_wall":365,"minecraft:polished_blackstone_brick_wall":366,"minecraft:cobbled_deepslate_wall":367,"minecraft:polished_deepslate_wall":368,"minecraft:deepslate_brick_wall":369,"minecraft:deepslate_tile_wall":370,"minecraft:anvil":371,"minecraft:chipped_anvil":372,"minecraft:damaged_anvil":373,"minecraft:chiseled_quartz_block":374,"minecraft:quartz_block":375,"minecraft:quartz_bricks":376,"minecraft:quartz_pillar":377,"minecraft:quartz_stairs":378,"minecraft:white_terracotta":379,"minecraft:orange_terracotta":380,"minecraft:magenta_terracotta":381,"minecraft:light_blue_terracotta":382,"minecraft:yellow_terracotta":383,"minecraft:lime_terracotta":384,"minecraft:pink_terracotta":385,"minecraft:gray_terracotta":386,"minecraft:light_gray_terracotta":387,"minecraft:cyan_terracotta":388,"minecraft:purple_terracotta":389,"minecraft:blue_terracotta":390,"minecraft:brown_terracotta":391,"minecraft:green_terracotta":392,"minecraft:red_terracotta":393,"minecraft:black_terracotta":394,"minecraft:barrier":395,"minecraft:light":396,"minecraft:hay_block":397,"minecraft:white_carpet":398,"minecraft:orange_carpet":399,"minecraft:magenta_carpet":400,"minecraft:light_blue_carpet":401,"minecraft:yellow_carpet":402,"minecraft:lime_carpet":403,"minecraft:pink_carpet":404,"minecraft:gray_carpet":405,"minecraft:light_gray_carpet":406,"minecraft:cyan_carpet":407,"minecraft:purple_carpet":408,"minecraft:blue_carpet":409,"minecraft:brown_carpet":410,"minecraft:green_carpet":411,"minecraft:red_carpet":412,"minecraft:black_carpet":413,"minecraft:terracotta":414,"minecraft:packed_ice":415,"minecraft:dirt_path":416,"minecraft:sunflower":417,"minecraft:lilac":418,"minecraft:rose_bush":419,"minecraft:peony":420,"minecraft:tall_grass":421,"minecraft:large_fern":422,"minecraft:white_stained_glass":423,"minecraft:orange_stained_glass":424,"minecraft:magenta_stained_glass":425,"minecraft:light_blue_stained_glass":426,"minecraft:yellow_stained_glass":427,"minecraft:lime_stained_glass":428,"minecraft:pink_stained_glass":429,"minecraft:gray_stained_glass":430,"minecraft:light_gray_stained_glass":431,"minecraft:cyan_stained_glass":432,"minecraft:purple_stained_glass":433,"minecraft:blue_stained_glass":434,"minecraft:brown_stained_glass":435,"minecraft:green_stained_glass":436,"minecraft:red_stained_glass":437,"minecraft:black_stained_glass":438,"minecraft:white_stained_glass_pane":439,"minecraft:orange_stained_glass_pane":440,"minecraft:magenta_stained_glass_pane":441,"minecraft:light_blue_stained_glass_pane":442,"minecraft:yellow_stained_glass_pane":443,"minecraft:lime_stained_glass_pane":444,"minecraft:pink_stained_glass_pane":445,"minecraft:gray_stained_glass_pane":446,"minecraft:light_gray_stained_glass_pane":447,"minecraft:cyan_stained_glass_pane":448,"minecraft:purple_stained_glass_pane":449,"minecraft:blue_stained_glass_pane":450,"minecraft:brown_stained_glass_pane":451,"minecraft:green_stained_glass_pane":452,"minecraft:red_stained_glass_pane":453,"minecraft:black_stained_glass_pane":454,"minecraft:prismarine":455,"minecraft:prismarine_bricks":456,"minecraft:dark_prismarine":457,"minecraft:prismarine_stairs":458,"minecraft:prismarine_brick_stairs":459,"minecraft:dark_prismarine_stairs":460,"minecraft:sea_lantern":461,"minecraft:red_sandstone":462,"minecraft:chiseled_red_sandstone":463,"minecraft:cut_red_sandstone":464,"minecraft:red_sandstone_stairs":465,"minecraft:repeating_command_block":466,"minecraft:chain_command_block":467,"minecraft:magma_block":468,"minecraft:nether_wart_block":469,"minecraft:warped_wart_block":470,"minecraft:red_nether_bricks":471,"minecraft:bone_block":472,"minecraft:structure_void":473,"minecraft:shulker_box":474,"minecraft:white_shulker_box":475,"minecraft:orange_shulker_box":476,"minecraft:magenta_shulker_box":477,"minecraft:light_blue_shulker_box":478,"minecraft:yellow_shulker_box":479,"minecraft:lime_shulker_box":480,"minecraft:pink_shulker_box":481,"minecraft:gray_shulker_box":482,"minecraft:light_gray_shulker_box":483,"minecraft:cyan_shulker_box":484,"minecraft:purple_shulker_box":485,"minecraft:blue_shulker_box":486,"minecraft:brown_shulker_box":487,"minecraft:green_shulker_box":488,"minecraft:red_shulker_box":489,"minecraft:black_shulker_box":490,"minecraft:white_glazed_terracotta":491,"minecraft:orange_glazed_terracotta":492,"minecraft:magenta_glazed_terracotta":493,"minecraft:light_blue_glazed_terracotta":494,"minecraft:yellow_glazed_terracotta":495,"minecraft:lime_glazed_terracotta":496,"minecraft:pink_glazed_terracotta":497,"minecraft:gray_glazed_terracotta":498,"minecraft:light_gray_glazed_terracotta":499,"minecraft:cyan_glazed_terracotta":500,"minecraft:purple_glazed_terracotta":501,"minecraft:blue_glazed_terracotta":502,"minecraft:brown_glazed_terracotta":503,"minecraft:green_glazed_terracotta":504,"minecraft:red_glazed_terracotta":505,"minecraft:black_glazed_terracotta":506,"minecraft:white_concrete":507,"minecraft:orange_concrete":508,"minecraft:magenta_concrete":509,"minecraft:light_blue_concrete":510,"minecraft:yellow_concrete":511,"minecraft:lime_concrete":512,"minecraft:pink_concrete":513,"minecraft:gray_concrete":514,"minecraft:light_gray_concrete":515,"minecraft:cyan_concrete":516,"minecraft:purple_concrete":517,"minecraft:blue_concrete":518,"minecraft:brown_concrete":519,"minecraft:green_concrete":520,"minecraft:red_concrete":521,"minecraft:black_concrete":522,"minecraft:white_concrete_powder":523,"minecraft:orange_concrete_powder":524,"minecraft:magenta_concrete_powder":525,"minecraft:light_blue_concrete_powder":526,"minecraft:yellow_concrete_powder":527,"minecraft:lime_concrete_powder":528,"minecraft:pink_concrete_powder":529,"minecraft:gray_concrete_powder":530,"minecraft:light_gray_concrete_powder":531,"minecraft:cyan_concrete_powder":532,"minecraft:purple_concrete_powder":533,"minecraft:blue_concrete_powder":534,"minecraft:brown_concrete_powder":535,"minecraft:green_concrete_powder":536,"minecraft:red_concrete_powder":537,"minecraft:black_concrete_powder":538,"minecraft:turtle_egg":539,"minecraft:dead_tube_coral_block":540,"minecraft:dead_brain_coral_block":541,"minecraft:dead_bubble_coral_block":542,"minecraft:dead_fire_coral_block":543,"minecraft:dead_horn_coral_block":544,"minecraft:tube_coral_block":545,"minecraft:brain_coral_block":546,"minecraft:bubble_coral_block":547,"minecraft:fire_coral_block":548,"minecraft:horn_coral_block":549,"minecraft:tube_coral":550,"minecraft:brain_coral":551,"minecraft:bubble_coral":552,"minecraft:fire_coral":553,"minecraft:horn_coral":554,"minecraft:dead_brain_coral":555,"minecraft:dead_bubble_coral":556,"minecraft:dead_fire_coral":557,"minecraft:dead_horn_coral":558,"minecraft:dead_tube_coral":559,"minecraft:tube_coral_fan":560,"minecraft:brain_coral_fan":561,"minecraft:bubble_coral_fan":562,"minecraft:fire_coral_fan":563,"minecraft:horn_coral_fan":564,"minecraft:dead_tube_coral_fan":565,"minecraft:dead_brain_coral_fan":566,"minecraft:dead_bubble_coral_fan":567,"minecraft:dead_fire_coral_fan":568,"minecraft:dead_horn_coral_fan":569,"minecraft:blue_ice":570,"minecraft:conduit":571,"minecraft:polished_granite_stairs":572,"minecraft:smooth_red_sandstone_stairs":573,"minecraft:mossy_stone_brick_stairs":574,"minecraft:polished_diorite_stairs":575,"minecraft:mossy_cobblestone_stairs":576,"minecraft:end_stone_brick_stairs":577,"minecraft:stone_stairs":578,"minecraft:smooth_sandstone_stairs":579,"minecraft:smooth_quartz_stairs":580,"minecraft:granite_stairs":581,"minecraft:andesite_stairs":582,"minecraft:red_nether_brick_stairs":583,"minecraft:polished_andesite_stairs":584,"minecraft:diorite_stairs":585,"minecraft:cobbled_deepslate_stairs":586,"minecraft:polished_deepslate_stairs":587,"minecraft:deepslate_brick_stairs":588,"minecraft:deepslate_tile_stairs":589,"minecraft:polished_granite_slab":590,"minecraft:smooth_red_sandstone_slab":591,"minecraft:mossy_stone_brick_slab":592,"minecraft:polished_diorite_slab":593,"minecraft:mossy_cobblestone_slab":594,"minecraft:end_stone_brick_slab":595,"minecraft:smooth_sandstone_slab":596,"minecraft:smooth_quartz_slab":597,"minecraft:granite_slab":598,"minecraft:andesite_slab":599,"minecraft:red_nether_brick_slab":600,"minecraft:polished_andesite_slab":601,"minecraft:diorite_slab":602,"minecraft:cobbled_deepslate_slab":603,"minecraft:polished_deepslate_slab":604,"minecraft:deepslate_brick_slab":605,"minecraft:deepslate_tile_slab":606,"minecraft:scaffolding":607,"minecraft:redstone":608,"minecraft:redstone_torch":609,"minecraft:redstone_block":610,"minecraft:repeater":611,"minecraft:comparator":612,"minecraft:piston":613,"minecraft:sticky_piston":614,"minecraft:slime_block":615,"minecraft:honey_block":616,"minecraft:observer":617,"minecraft:hopper":618,"minecraft:dispenser":619,"minecraft:dropper":620,"minecraft:lectern":621,"minecraft:target":622,"minecraft:lever":623,"minecraft:lightning_rod":624,"minecraft:daylight_detector":625,"minecraft:sculk_sensor":626,"minecraft:tripwire_hook":627,"minecraft:trapped_chest":628,"minecraft:tnt":629,"minecraft:redstone_lamp":630,"minecraft:note_block":631,"minecraft:stone_button":632,"minecraft:polished_blackstone_button":633,"minecraft:oak_button":634,"minecraft:spruce_button":635,"minecraft:birch_button":636,"minecraft:jungle_button":637,"minecraft:acacia_button":638,"minecraft:dark_oak_button":639,"minecraft:mangrove_button":640,"minecraft:crimson_button":641,"minecraft:warped_button":642,"minecraft:stone_pressure_plate":643,"minecraft:polished_blackstone_pressure_plate":644,"minecraft:light_weighted_pressure_plate":645,"minecraft:heavy_weighted_pressure_plate":646,"minecraft:oak_pressure_plate":647,"minecraft:spruce_pressure_plate":648,"minecraft:birch_pressure_plate":649,"minecraft:jungle_pressure_plate":650,"minecraft:acacia_pressure_plate":651,"minecraft:dark_oak_pressure_plate":652,"minecraft:mangrove_pressure_plate":653,"minecraft:crimson_pressure_plate":654,"minecraft:warped_pressure_plate":655,"minecraft:iron_door":656,"minecraft:oak_door":657,"minecraft:spruce_door":658,"minecraft:birch_door":659,"minecraft:jungle_door":660,"minecraft:acacia_door":661,"minecraft:dark_oak_door":662,"minecraft:mangrove_door":663,"minecraft:crimson_door":664,"minecraft:warped_door":665,"minecraft:iron_trapdoor":666,"minecraft:oak_trapdoor":667,"minecraft:spruce_trapdoor":668,"minecraft:birch_trapdoor":669,"minecraft:jungle_trapdoor":670,"minecraft:acacia_trapdoor":671,"minecraft:dark_oak_trapdoor":672,"minecraft:mangrove_trapdoor":673,"minecraft:crimson_trapdoor":674,"minecraft:warped_trapdoor":675,"minecraft:oak_fence_gate":676,"minecraft:spruce_fence_gate":677,"minecraft:birch_fence_gate":678,"minecraft:jungle_fence_gate":679,"minecraft:acacia_fence_gate":680,"minecraft:dark_oak_fence_gate":681,"minecraft:mangrove_fence_gate":682,"minecraft:crimson_fence_gate":683,"minecraft:warped_fence_gate":684,"minecraft:powered_rail":685,"minecraft:detector_rail":686,"minecraft:rail":687,"minecraft:activator_rail":688,"minecraft:saddle":689,"minecraft:minecart":690,"minecraft:chest_minecart":691,"minecraft:furnace_minecart":692,"minecraft:tnt_minecart":693,"minecraft:hopper_minecart":694,"minecraft:carrot_on_a_stick":695,"minecraft:warped_fungus_on_a_stick":696,"minecraft:elytra":697,"minecraft:oak_boat":698,"minecraft:oak_chest_boat":699,"minecraft:spruce_boat":700,"minecraft:spruce_chest_boat":701,"minecraft:birch_boat":702,"minecraft:birch_chest_boat":703,"minecraft:jungle_boat":704,"minecraft:jungle_chest_boat":705,"minecraft:acacia_boat":706,"minecraft:acacia_chest_boat":707,"minecraft:dark_oak_boat":708,"minecraft:dark_oak_chest_boat":709,"minecraft:mangrove_boat":710,"minecraft:mangrove_chest_boat":711,"minecraft:structure_block":712,"minecraft:jigsaw":713,"minecraft:turtle_helmet":714,"minecraft:scute":715,"minecraft:flint_and_steel":716,"minecraft:apple":717,"minecraft:bow":718,"minecraft:arrow":719,"minecraft:coal":720,"minecraft:charcoal":721,"minecraft:diamond":722,"minecraft:emerald":723,"minecraft:lapis_lazuli":724,"minecraft:quartz":725,"minecraft:amethyst_shard":726,"minecraft:raw_iron":727,"minecraft:iron_ingot":728,"minecraft:raw_copper":729,"minecraft:copper_ingot":730,"minecraft:raw_gold":731,"minecraft:gold_ingot":732,"minecraft:netherite_ingot":733,"minecraft:netherite_scrap":734,"minecraft:wooden_sword":735,"minecraft:wooden_shovel":736,"minecraft:wooden_pickaxe":737,"minecraft:wooden_axe":738,"minecraft:wooden_hoe":739,"minecraft:stone_sword":740,"minecraft:stone_shovel":741,"minecraft:stone_pickaxe":742,"minecraft:stone_axe":743,"minecraft:stone_hoe":744,"minecraft:golden_sword":745,"minecraft:golden_shovel":746,"minecraft:golden_pickaxe":747,"minecraft:golden_axe":748,"minecraft:golden_hoe":749,"minecraft:iron_sword":750,"minecraft:iron_shovel":751,"minecraft:iron_pickaxe":752,"minecraft:iron_axe":753,"minecraft:iron_hoe":754,"minecraft:diamond_sword":755,"minecraft:diamond_shovel":756,"minecraft:diamond_pickaxe":757,"minecraft:diamond_axe":758,"minecraft:diamond_hoe":759,"minecraft:netherite_sword":760,"minecraft:netherite_shovel":761,"minecraft:netherite_pickaxe":762,"minecraft:netherite_axe":763,"minecraft:netherite_hoe":764,"minecraft:stick":765,"minecraft:bowl":766,"minecraft:mushroom_stew":767,"minecraft:string":768,"minecraft:feather":769,"minecraft:gunpowder":770,"minecraft:wheat_seeds":771,"minecraft:wheat":772,"minecraft:bread":773,"minecraft:leather_helmet":774,"minecraft:leather_chestplate":775,"minecraft:leather_leggings":776,"minecraft:leather_boots":777,"minecraft:chainmail_helmet":778,"minecraft:chainmail_chestplate":779,"minecraft:chainmail_leggings":780,"minecraft:chainmail_boots":781,"minecraft:iron_helmet":782,"minecraft:iron_chestplate":783,"minecraft:iron_leggings":784,"minecraft:iron_boots":785,"minecraft:diamond_helmet":786,"minecraft:diamond_chestplate":787,"minecraft:diamond_leggings":788,"minecraft:diamond_boots":789,"minecraft:golden_helmet":790,"minecraft:golden_chestplate":791,"minecraft:golden_leggings":792,"minecraft:golden_boots":793,"minecraft:netherite_helmet":794,"minecraft:netherite_chestplate":795,"minecraft:netherite_leggings":796,"minecraft:netherite_boots":797,"minecraft:flint":798,"minecraft:porkchop":799,"minecraft:cooked_porkchop":800,"minecraft:painting":801,"minecraft:golden_apple":802,"minecraft:enchanted_golden_apple":803,"minecraft:oak_sign":804,"minecraft:spruce_sign":805,"minecraft:birch_sign":806,"minecraft:jungle_sign":807,"minecraft:acacia_sign":808,"minecraft:dark_oak_sign":809,"minecraft:mangrove_sign":810,"minecraft:crimson_sign":811,"minecraft:warped_sign":812,"minecraft:bucket":813,"minecraft:water_bucket":814,"minecraft:lava_bucket":815,"minecraft:powder_snow_bucket":816,"minecraft:snowball":817,"minecraft:leather":818,"minecraft:milk_bucket":819,"minecraft:pufferfish_bucket":820,"minecraft:salmon_bucket":821,"minecraft:cod_bucket":822,"minecraft:tropical_fish_bucket":823,"minecraft:axolotl_bucket":824,"minecraft:tadpole_bucket":825,"minecraft:brick":826,"minecraft:clay_ball":827,"minecraft:dried_kelp_block":828,"minecraft:paper":829,"minecraft:book":830,"minecraft:slime_ball":831,"minecraft:egg":832,"minecraft:compass":833,"minecraft:recovery_compass":834,"minecraft:bundle":835,"minecraft:fishing_rod":836,"minecraft:clock":837,"minecraft:spyglass":838,"minecraft:glowstone_dust":839,"minecraft:cod":840,"minecraft:salmon":841,"minecraft:tropical_fish":842,"minecraft:pufferfish":843,"minecraft:cooked_cod":844,"minecraft:cooked_salmon":845,"minecraft:ink_sac":846,"minecraft:glow_ink_sac":847,"minecraft:cocoa_beans":848,"minecraft:white_dye":849,"minecraft:orange_dye":850,"minecraft:magenta_dye":851,"minecraft:light_blue_dye":852,"minecraft:yellow_dye":853,"minecraft:lime_dye":854,"minecraft:pink_dye":855,"minecraft:gray_dye":856,"minecraft:light_gray_dye":857,"minecraft:cyan_dye":858,"minecraft:purple_dye":859,"minecraft:blue_dye":860,"minecraft:brown_dye":861,"minecraft:green_dye":862,"minecraft:red_dye":863,"minecraft:black_dye":864,"minecraft:bone_meal":865,"minecraft:bone":866,"minecraft:sugar":867,"minecraft:cake":868,"minecraft:white_bed":869,"minecraft:orange_bed":870,"minecraft:magenta_bed":871,"minecraft:light_blue_bed":872,"minecraft:yellow_bed":873,"minecraft:lime_bed":874,"minecraft:pink_bed":875,"minecraft:gray_bed":876,"minecraft:light_gray_bed":877,"minecraft:cyan_bed":878,"minecraft:purple_bed":879,"minecraft:blue_bed":880,"minecraft:brown_bed":881,"minecraft:green_bed":882,"minecraft:red_bed":883,"minecraft:black_bed":884,"minecraft:cookie":885,"minecraft:filled_map":886,"minecraft:shears":887,"minecraft:melon_slice":888,"minecraft:dried_kelp":889,"minecraft:pumpkin_seeds":890,"minecraft:melon_seeds":891,"minecraft:beef":892,"minecraft:cooked_beef":893,"minecraft:chicken":894,"minecraft:cooked_chicken":895,"minecraft:rotten_flesh":896,"minecraft:ender_pearl":897,"minecraft:blaze_rod":898,"minecraft:ghast_tear":899,"minecraft:gold_nugget":900,"minecraft:nether_wart":901,"minecraft:potion":902,"minecraft:glass_bottle":903,"minecraft:spider_eye":904,"minecraft:fermented_spider_eye":905,"minecraft:blaze_powder":906,"minecraft:magma_cream":907,"minecraft:brewing_stand":908,"minecraft:cauldron":909,"minecraft:ender_eye":910,"minecraft:glistering_melon_slice":911,"minecraft:allay_spawn_egg":912,"minecraft:axolotl_spawn_egg":913,"minecraft:bat_spawn_egg":914,"minecraft:bee_spawn_egg":915,"minecraft:blaze_spawn_egg":916,"minecraft:cat_spawn_egg":917,"minecraft:cave_spider_spawn_egg":918,"minecraft:chicken_spawn_egg":919,"minecraft:cod_spawn_egg":920,"minecraft:cow_spawn_egg":921,"minecraft:creeper_spawn_egg":922,"minecraft:dolphin_spawn_egg":923,"minecraft:donkey_spawn_egg":924,"minecraft:drowned_spawn_egg":925,"minecraft:elder_guardian_spawn_egg":926,"minecraft:enderman_spawn_egg":927,"minecraft:endermite_spawn_egg":928,"minecraft:evoker_spawn_egg":929,"minecraft:fox_spawn_egg":930,"minecraft:frog_spawn_egg":931,"minecraft:ghast_spawn_egg":932,"minecraft:glow_squid_spawn_egg":933,"minecraft:goat_spawn_egg":934,"minecraft:guardian_spawn_egg":935,"minecraft:hoglin_spawn_egg":936,"minecraft:horse_spawn_egg":937,"minecraft:husk_spawn_egg":938,"minecraft:llama_spawn_egg":939,"minecraft:magma_cube_spawn_egg":940,"minecraft:mooshroom_spawn_egg":941,"minecraft:mule_spawn_egg":942,"minecraft:ocelot_spawn_egg":943,"minecraft:panda_spawn_egg":944,"minecraft:parrot_spawn_egg":945,"minecraft:phantom_spawn_egg":946,"minecraft:pig_spawn_egg":947,"minecraft:piglin_spawn_egg":948,"minecraft:piglin_brute_spawn_egg":949,"minecraft:pillager_spawn_egg":950,"minecraft:polar_bear_spawn_egg":951,"minecraft:pufferfish_spawn_egg":952,"minecraft:rabbit_spawn_egg":953,"minecraft:ravager_spawn_egg":954,"minecraft:salmon_spawn_egg":955,"minecraft:sheep_spawn_egg":956,"minecraft:shulker_spawn_egg":957,"minecraft:silverfish_spawn_egg":958,"minecraft:skeleton_spawn_egg":959,"minecraft:skeleton_horse_spawn_egg":960,"minecraft:slime_spawn_egg":961,"minecraft:spider_spawn_egg":962,"minecraft:squid_spawn_egg":963,"minecraft:stray_spawn_egg":964,"minecraft:strider_spawn_egg":965,"minecraft:tadpole_spawn_egg":966,"minecraft:trader_llama_spawn_egg":967,"minecraft:tropical_fish_spawn_egg":968,"minecraft:turtle_spawn_egg":969,"minecraft:vex_spawn_egg":970,"minecraft:villager_spawn_egg":971,"minecraft:vindicator_spawn_egg":972,"minecraft:wandering_trader_spawn_egg":973,"minecraft:warden_spawn_egg":974,"minecraft:witch_spawn_egg":975,"minecraft:wither_skeleton_spawn_egg":976,"minecraft:wolf_spawn_egg":977,"minecraft:zoglin_spawn_egg":978,"minecraft:zombie_spawn_egg":979,"minecraft:zombie_horse_spawn_egg":980,"minecraft:zombie_villager_spawn_egg":981,"minecraft:zombified_piglin_spawn_egg":982,"minecraft:experience_bottle":983,"minecraft:fire_charge":984,"minecraft:writable_book":985,"minecraft:written_book":986,"minecraft:item_frame":987,"minecraft:glow_item_frame":988,"minecraft:flower_pot":989,"minecraft:carrot":990,"minecraft:potato":991,"minecraft:baked_potato":992,"minecraft:poisonous_potato":993,"minecraft:map":994,"minecraft:golden_carrot":995,"minecraft:skeleton_skull":996,"minecraft:wither_skeleton_skull":997,"minecraft:player_head":998,"minecraft:zombie_head":999,"minecraft:creeper_head":1000,"minecraft:dragon_head":1001,"minecraft:nether_star":1002,"minecraft:pumpkin_pie":1003,"minecraft:firework_rocket":1004,"minecraft:firework_star":1005,"minecraft:enchanted_book":1006,"minecraft:nether_brick":1007,"minecraft:prismarine_shard":1008,"minecraft:prismarine_crystals":1009,"minecraft:rabbit":1010,"minecraft:cooked_rabbit":1011,"minecraft:rabbit_stew":1012,"minecraft:rabbit_foot":1013,"minecraft:rabbit_hide":1014,"minecraft:armor_stand":1015,"minecraft:iron_horse_armor":1016,"minecraft:golden_horse_armor":1017,"minecraft:diamond_horse_armor":1018,"minecraft:leather_horse_armor":1019,"minecraft:lead":1020,"minecraft:name_tag":1021,"minecraft:command_block_minecart":1022,"minecraft:mutton":1023,"minecraft:cooked_mutton":1024,"minecraft:white_banner":1025,"minecraft:orange_banner":1026,"minecraft:magenta_banner":1027,"minecraft:light_blue_banner":1028,"minecraft:yellow_banner":1029,"minecraft:lime_banner":1030,"minecraft:pink_banner":1031,"minecraft:gray_banner":1032,"minecraft:light_gray_banner":1033,"minecraft:cyan_banner":1034,"minecraft:purple_banner":1035,"minecraft:blue_banner":1036,"minecraft:brown_banner":1037,"minecraft:green_banner":1038,"minecraft:red_banner":1039,"minecraft:black_banner":1040,"minecraft:end_crystal":1041,"minecraft:chorus_fruit":1042,"minecraft:popped_chorus_fruit":1043,"minecraft:beetroot":1044,"minecraft:beetroot_seeds":1045,"minecraft:beetroot_soup":1046,"minecraft:dragon_breath":1047,"minecraft:splash_potion":1048,"minecraft:spectral_arrow":1049,"minecraft:tipped_arrow":1050,"minecraft:lingering_potion":1051,"minecraft:shield":1052,"minecraft:totem_of_undying":1053,"minecraft:shulker_shell":1054,"minecraft:iron_nugget":1055,"minecraft:knowledge_book":1056,"minecraft:debug_stick":1057,"minecraft:music_disc_13":1058,"minecraft:music_disc_cat":1059,"minecraft:music_disc_blocks":1060,"minecraft:music_disc_chirp":1061,"minecraft:music_disc_far":1062,"minecraft:music_disc_mall":1063,"minecraft:music_disc_mellohi":1064,"minecraft:music_disc_stal":1065,"minecraft:music_disc_strad":1066,"minecraft:music_disc_ward":1067,"minecraft:music_disc_11":1068,"minecraft:music_disc_wait":1069,"minecraft:music_disc_otherside":1070,"minecraft:music_disc_5":1071,"minecraft:music_disc_pigstep":1072,"minecraft:disc_fragment_5":1073,"minecraft:trident":1074,"minecraft:phantom_membrane":1075,"minecraft:nautilus_shell":1076,"minecraft:heart_of_the_sea":1077,"minecraft:crossbow":1078,"minecraft:suspicious_stew":1079,"minecraft:loom":1080,"minecraft:flower_banner_pattern":1081,"minecraft:creeper_banner_pattern":1082,"minecraft:skull_banner_pattern":1083,"minecraft:mojang_banner_pattern":1084,"minecraft:globe_banner_pattern":1085,"minecraft:piglin_banner_pattern":1086,"minecraft:goat_horn":1087,"minecraft:composter":1088,"minecraft:barrel":1089,"minecraft:smoker":1090,"minecraft:blast_furnace":1091,"minecraft:cartography_table":1092,"minecraft:fletching_table":1093,"minecraft:grindstone":1094,"minecraft:smithing_table":1095,"minecraft:stonecutter":1096,"minecraft:bell":1097,"minecraft:lantern":1098,"minecraft:soul_lantern":1099,"minecraft:sweet_berries":1100,"minecraft:glow_berries":1101,"minecraft:campfire":1102,"minecraft:soul_campfire":1103,"minecraft:shroomlight":1104,"minecraft:honeycomb":1105,"minecraft:bee_nest":1106,"minecraft:beehive":1107,"minecraft:honey_bottle":1108,"minecraft:honeycomb_block":1109,"minecraft:lodestone":1110,"minecraft:crying_obsidian":1111,"minecraft:blackstone":1112,"minecraft:blackstone_slab":1113,"minecraft:blackstone_stairs":1114,"minecraft:gilded_blackstone":1115,"minecraft:polished_blackstone":1116,"minecraft:polished_blackstone_slab":1117,"minecraft:polished_blackstone_stairs":1118,"minecraft:chiseled_polished_blackstone":1119,"minecraft:polished_blackstone_bricks":1120,"minecraft:polished_blackstone_brick_slab":1121,"minecraft:polished_blackstone_brick_stairs":1122,"minecraft:cracked_polished_blackstone_bricks":1123,"minecraft:respawn_anchor":1124,"minecraft:candle":1125,"minecraft:white_candle":1126,"minecraft:orange_candle":1127,"minecraft:magenta_candle":1128,"minecraft:light_blue_candle":1129,"minecraft:yellow_candle":1130,"minecraft:lime_candle":1131,"minecraft:pink_candle":1132,"minecraft:gray_candle":1133,"minecraft:light_gray_candle":1134,"minecraft:cyan_candle":1135,"minecraft:purple_candle":1136,"minecraft:blue_candle":1137,"minecraft:brown_candle":1138,"minecraft:green_candle":1139,"minecraft:red_candle":1140,"minecraft:black_candle":1141,"minecraft:small_amethyst_bud":1142,"minecraft:medium_amethyst_bud":1143,"minecraft:large_amethyst_bud":1144,"minecraft:amethyst_cluster":1145,"minecraft:pointed_dripstone":1146,"minecraft:ochre_froglight":1147,"minecraft:verdant_froglight":1148,"minecraft:pearlescent_froglight":1149,"minecraft:frogspawn":1150,"minecraft:echo_shard":1151}`,
  ),
);

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
    `{"minecraft:air":0,"minecraft:stone":1,"minecraft:granite":2,"minecraft:polished_granite":3,"minecraft:diorite":4,"minecraft:polished_diorite":5,"minecraft:andesite":6,"minecraft:polished_andesite":7,"minecraft:grass_block":8,"minecraft:dirt":9,"minecraft:coarse_dirt":10,"minecraft:podzol":11,"minecraft:cobblestone":12,"minecraft:oak_planks":13,"minecraft:spruce_planks":14,"minecraft:birch_planks":15,"minecraft:jungle_planks":16,"minecraft:acacia_planks":17,"minecraft:dark_oak_planks":18,"minecraft:mangrove_planks":19,"minecraft:oak_sapling":20,"minecraft:spruce_sapling":21,"minecraft:birch_sapling":22,"minecraft:jungle_sapling":23,"minecraft:acacia_sapling":24,"minecraft:dark_oak_sapling":25,"minecraft:mangrove_propagule":26,"minecraft:bedrock":27,"minecraft:water":28,"minecraft:lava":29,"minecraft:sand":30,"minecraft:red_sand":31,"minecraft:gravel":32,"minecraft:gold_ore":33,"minecraft:deepslate_gold_ore":34,"minecraft:iron_ore":35,"minecraft:deepslate_iron_ore":36,"minecraft:coal_ore":37,"minecraft:deepslate_coal_ore":38,"minecraft:nether_gold_ore":39,"minecraft:oak_log":40,"minecraft:spruce_log":41,"minecraft:birch_log":42,"minecraft:jungle_log":43,"minecraft:acacia_log":44,"minecraft:dark_oak_log":45,"minecraft:mangrove_log":46,"minecraft:mangrove_roots":47,"minecraft:muddy_mangrove_roots":48,"minecraft:stripped_spruce_log":49,"minecraft:stripped_birch_log":50,"minecraft:stripped_jungle_log":51,"minecraft:stripped_acacia_log":52,"minecraft:stripped_dark_oak_log":53,"minecraft:stripped_oak_log":54,"minecraft:stripped_mangrove_log":55,"minecraft:oak_wood":56,"minecraft:spruce_wood":57,"minecraft:birch_wood":58,"minecraft:jungle_wood":59,"minecraft:acacia_wood":60,"minecraft:dark_oak_wood":61,"minecraft:mangrove_wood":62,"minecraft:stripped_oak_wood":63,"minecraft:stripped_spruce_wood":64,"minecraft:stripped_birch_wood":65,"minecraft:stripped_jungle_wood":66,"minecraft:stripped_acacia_wood":67,"minecraft:stripped_dark_oak_wood":68,"minecraft:stripped_mangrove_wood":69,"minecraft:oak_leaves":70,"minecraft:spruce_leaves":71,"minecraft:birch_leaves":72,"minecraft:jungle_leaves":73,"minecraft:acacia_leaves":74,"minecraft:dark_oak_leaves":75,"minecraft:mangrove_leaves":76,"minecraft:azalea_leaves":77,"minecraft:flowering_azalea_leaves":78,"minecraft:sponge":79,"minecraft:wet_sponge":80,"minecraft:glass":81,"minecraft:lapis_ore":82,"minecraft:deepslate_lapis_ore":83,"minecraft:lapis_block":84,"minecraft:dispenser":85,"minecraft:sandstone":86,"minecraft:chiseled_sandstone":87,"minecraft:cut_sandstone":88,"minecraft:note_block":89,"minecraft:white_bed":90,"minecraft:orange_bed":91,"minecraft:magenta_bed":92,"minecraft:light_blue_bed":93,"minecraft:yellow_bed":94,"minecraft:lime_bed":95,"minecraft:pink_bed":96,"minecraft:gray_bed":97,"minecraft:light_gray_bed":98,"minecraft:cyan_bed":99,"minecraft:purple_bed":100,"minecraft:blue_bed":101,"minecraft:brown_bed":102,"minecraft:green_bed":103,"minecraft:red_bed":104,"minecraft:black_bed":105,"minecraft:powered_rail":106,"minecraft:detector_rail":107,"minecraft:sticky_piston":108,"minecraft:cobweb":109,"minecraft:grass":110,"minecraft:fern":111,"minecraft:dead_bush":112,"minecraft:seagrass":113,"minecraft:tall_seagrass":114,"minecraft:piston":115,"minecraft:piston_head":116,"minecraft:white_wool":117,"minecraft:orange_wool":118,"minecraft:magenta_wool":119,"minecraft:light_blue_wool":120,"minecraft:yellow_wool":121,"minecraft:lime_wool":122,"minecraft:pink_wool":123,"minecraft:gray_wool":124,"minecraft:light_gray_wool":125,"minecraft:cyan_wool":126,"minecraft:purple_wool":127,"minecraft:blue_wool":128,"minecraft:brown_wool":129,"minecraft:green_wool":130,"minecraft:red_wool":131,"minecraft:black_wool":132,"minecraft:moving_piston":133,"minecraft:dandelion":134,"minecraft:poppy":135,"minecraft:blue_orchid":136,"minecraft:allium":137,"minecraft:azure_bluet":138,"minecraft:red_tulip":139,"minecraft:orange_tulip":140,"minecraft:white_tulip":141,"minecraft:pink_tulip":142,"minecraft:oxeye_daisy":143,"minecraft:cornflower":144,"minecraft:wither_rose":145,"minecraft:lily_of_the_valley":146,"minecraft:brown_mushroom":147,"minecraft:red_mushroom":148,"minecraft:gold_block":149,"minecraft:iron_block":150,"minecraft:bricks":151,"minecraft:tnt":152,"minecraft:bookshelf":153,"minecraft:mossy_cobblestone":154,"minecraft:obsidian":155,"minecraft:torch":156,"minecraft:wall_torch":157,"minecraft:fire":158,"minecraft:soul_fire":159,"minecraft:spawner":160,"minecraft:oak_stairs":161,"minecraft:chest":162,"minecraft:redstone_wire":163,"minecraft:diamond_ore":164,"minecraft:deepslate_diamond_ore":165,"minecraft:diamond_block":166,"minecraft:crafting_table":167,"minecraft:wheat":168,"minecraft:farmland":169,"minecraft:furnace":170,"minecraft:oak_sign":171,"minecraft:spruce_sign":172,"minecraft:birch_sign":173,"minecraft:acacia_sign":174,"minecraft:jungle_sign":175,"minecraft:dark_oak_sign":176,"minecraft:mangrove_sign":177,"minecraft:oak_door":178,"minecraft:ladder":179,"minecraft:rail":180,"minecraft:cobblestone_stairs":181,"minecraft:oak_wall_sign":182,"minecraft:spruce_wall_sign":183,"minecraft:birch_wall_sign":184,"minecraft:acacia_wall_sign":185,"minecraft:jungle_wall_sign":186,"minecraft:dark_oak_wall_sign":187,"minecraft:mangrove_wall_sign":188,"minecraft:lever":189,"minecraft:stone_pressure_plate":190,"minecraft:iron_door":191,"minecraft:oak_pressure_plate":192,"minecraft:spruce_pressure_plate":193,"minecraft:birch_pressure_plate":194,"minecraft:jungle_pressure_plate":195,"minecraft:acacia_pressure_plate":196,"minecraft:dark_oak_pressure_plate":197,"minecraft:mangrove_pressure_plate":198,"minecraft:redstone_ore":199,"minecraft:deepslate_redstone_ore":200,"minecraft:redstone_torch":201,"minecraft:redstone_wall_torch":202,"minecraft:stone_button":203,"minecraft:snow":204,"minecraft:ice":205,"minecraft:snow_block":206,"minecraft:cactus":207,"minecraft:clay":208,"minecraft:sugar_cane":209,"minecraft:jukebox":210,"minecraft:oak_fence":211,"minecraft:pumpkin":212,"minecraft:netherrack":213,"minecraft:soul_sand":214,"minecraft:soul_soil":215,"minecraft:basalt":216,"minecraft:polished_basalt":217,"minecraft:soul_torch":218,"minecraft:soul_wall_torch":219,"minecraft:glowstone":220,"minecraft:nether_portal":221,"minecraft:carved_pumpkin":222,"minecraft:jack_o_lantern":223,"minecraft:cake":224,"minecraft:repeater":225,"minecraft:white_stained_glass":226,"minecraft:orange_stained_glass":227,"minecraft:magenta_stained_glass":228,"minecraft:light_blue_stained_glass":229,"minecraft:yellow_stained_glass":230,"minecraft:lime_stained_glass":231,"minecraft:pink_stained_glass":232,"minecraft:gray_stained_glass":233,"minecraft:light_gray_stained_glass":234,"minecraft:cyan_stained_glass":235,"minecraft:purple_stained_glass":236,"minecraft:blue_stained_glass":237,"minecraft:brown_stained_glass":238,"minecraft:green_stained_glass":239,"minecraft:red_stained_glass":240,"minecraft:black_stained_glass":241,"minecraft:oak_trapdoor":242,"minecraft:spruce_trapdoor":243,"minecraft:birch_trapdoor":244,"minecraft:jungle_trapdoor":245,"minecraft:acacia_trapdoor":246,"minecraft:dark_oak_trapdoor":247,"minecraft:mangrove_trapdoor":248,"minecraft:stone_bricks":249,"minecraft:mossy_stone_bricks":250,"minecraft:cracked_stone_bricks":251,"minecraft:chiseled_stone_bricks":252,"minecraft:packed_mud":253,"minecraft:mud_bricks":254,"minecraft:infested_stone":255,"minecraft:infested_cobblestone":256,"minecraft:infested_stone_bricks":257,"minecraft:infested_mossy_stone_bricks":258,"minecraft:infested_cracked_stone_bricks":259,"minecraft:infested_chiseled_stone_bricks":260,"minecraft:brown_mushroom_block":261,"minecraft:red_mushroom_block":262,"minecraft:mushroom_stem":263,"minecraft:iron_bars":264,"minecraft:chain":265,"minecraft:glass_pane":266,"minecraft:melon":267,"minecraft:attached_pumpkin_stem":268,"minecraft:attached_melon_stem":269,"minecraft:pumpkin_stem":270,"minecraft:melon_stem":271,"minecraft:vine":272,"minecraft:glow_lichen":273,"minecraft:oak_fence_gate":274,"minecraft:brick_stairs":275,"minecraft:stone_brick_stairs":276,"minecraft:mud_brick_stairs":277,"minecraft:mycelium":278,"minecraft:lily_pad":279,"minecraft:nether_bricks":280,"minecraft:nether_brick_fence":281,"minecraft:nether_brick_stairs":282,"minecraft:nether_wart":283,"minecraft:enchanting_table":284,"minecraft:brewing_stand":285,"minecraft:cauldron":286,"minecraft:water_cauldron":287,"minecraft:lava_cauldron":288,"minecraft:powder_snow_cauldron":289,"minecraft:end_portal":290,"minecraft:end_portal_frame":291,"minecraft:end_stone":292,"minecraft:dragon_egg":293,"minecraft:redstone_lamp":294,"minecraft:cocoa":295,"minecraft:sandstone_stairs":296,"minecraft:emerald_ore":297,"minecraft:deepslate_emerald_ore":298,"minecraft:ender_chest":299,"minecraft:tripwire_hook":300,"minecraft:tripwire":301,"minecraft:emerald_block":302,"minecraft:spruce_stairs":303,"minecraft:birch_stairs":304,"minecraft:jungle_stairs":305,"minecraft:command_block":306,"minecraft:beacon":307,"minecraft:cobblestone_wall":308,"minecraft:mossy_cobblestone_wall":309,"minecraft:flower_pot":310,"minecraft:potted_oak_sapling":311,"minecraft:potted_spruce_sapling":312,"minecraft:potted_birch_sapling":313,"minecraft:potted_jungle_sapling":314,"minecraft:potted_acacia_sapling":315,"minecraft:potted_dark_oak_sapling":316,"minecraft:potted_mangrove_propagule":317,"minecraft:potted_fern":318,"minecraft:potted_dandelion":319,"minecraft:potted_poppy":320,"minecraft:potted_blue_orchid":321,"minecraft:potted_allium":322,"minecraft:potted_azure_bluet":323,"minecraft:potted_red_tulip":324,"minecraft:potted_orange_tulip":325,"minecraft:potted_white_tulip":326,"minecraft:potted_pink_tulip":327,"minecraft:potted_oxeye_daisy":328,"minecraft:potted_cornflower":329,"minecraft:potted_lily_of_the_valley":330,"minecraft:potted_wither_rose":331,"minecraft:potted_red_mushroom":332,"minecraft:potted_brown_mushroom":333,"minecraft:potted_dead_bush":334,"minecraft:potted_cactus":335,"minecraft:carrots":336,"minecraft:potatoes":337,"minecraft:oak_button":338,"minecraft:spruce_button":339,"minecraft:birch_button":340,"minecraft:jungle_button":341,"minecraft:acacia_button":342,"minecraft:dark_oak_button":343,"minecraft:mangrove_button":344,"minecraft:skeleton_skull":345,"minecraft:skeleton_wall_skull":346,"minecraft:wither_skeleton_skull":347,"minecraft:wither_skeleton_wall_skull":348,"minecraft:zombie_head":349,"minecraft:zombie_wall_head":350,"minecraft:player_head":351,"minecraft:player_wall_head":352,"minecraft:creeper_head":353,"minecraft:creeper_wall_head":354,"minecraft:dragon_head":355,"minecraft:dragon_wall_head":356,"minecraft:anvil":357,"minecraft:chipped_anvil":358,"minecraft:damaged_anvil":359,"minecraft:trapped_chest":360,"minecraft:light_weighted_pressure_plate":361,"minecraft:heavy_weighted_pressure_plate":362,"minecraft:comparator":363,"minecraft:daylight_detector":364,"minecraft:redstone_block":365,"minecraft:nether_quartz_ore":366,"minecraft:hopper":367,"minecraft:quartz_block":368,"minecraft:chiseled_quartz_block":369,"minecraft:quartz_pillar":370,"minecraft:quartz_stairs":371,"minecraft:activator_rail":372,"minecraft:dropper":373,"minecraft:white_terracotta":374,"minecraft:orange_terracotta":375,"minecraft:magenta_terracotta":376,"minecraft:light_blue_terracotta":377,"minecraft:yellow_terracotta":378,"minecraft:lime_terracotta":379,"minecraft:pink_terracotta":380,"minecraft:gray_terracotta":381,"minecraft:light_gray_terracotta":382,"minecraft:cyan_terracotta":383,"minecraft:purple_terracotta":384,"minecraft:blue_terracotta":385,"minecraft:brown_terracotta":386,"minecraft:green_terracotta":387,"minecraft:red_terracotta":388,"minecraft:black_terracotta":389,"minecraft:white_stained_glass_pane":390,"minecraft:orange_stained_glass_pane":391,"minecraft:magenta_stained_glass_pane":392,"minecraft:light_blue_stained_glass_pane":393,"minecraft:yellow_stained_glass_pane":394,"minecraft:lime_stained_glass_pane":395,"minecraft:pink_stained_glass_pane":396,"minecraft:gray_stained_glass_pane":397,"minecraft:light_gray_stained_glass_pane":398,"minecraft:cyan_stained_glass_pane":399,"minecraft:purple_stained_glass_pane":400,"minecraft:blue_stained_glass_pane":401,"minecraft:brown_stained_glass_pane":402,"minecraft:green_stained_glass_pane":403,"minecraft:red_stained_glass_pane":404,"minecraft:black_stained_glass_pane":405,"minecraft:acacia_stairs":406,"minecraft:dark_oak_stairs":407,"minecraft:mangrove_stairs":408,"minecraft:slime_block":409,"minecraft:barrier":410,"minecraft:light":411,"minecraft:iron_trapdoor":412,"minecraft:prismarine":413,"minecraft:prismarine_bricks":414,"minecraft:dark_prismarine":415,"minecraft:prismarine_stairs":416,"minecraft:prismarine_brick_stairs":417,"minecraft:dark_prismarine_stairs":418,"minecraft:prismarine_slab":419,"minecraft:prismarine_brick_slab":420,"minecraft:dark_prismarine_slab":421,"minecraft:sea_lantern":422,"minecraft:hay_block":423,"minecraft:white_carpet":424,"minecraft:orange_carpet":425,"minecraft:magenta_carpet":426,"minecraft:light_blue_carpet":427,"minecraft:yellow_carpet":428,"minecraft:lime_carpet":429,"minecraft:pink_carpet":430,"minecraft:gray_carpet":431,"minecraft:light_gray_carpet":432,"minecraft:cyan_carpet":433,"minecraft:purple_carpet":434,"minecraft:blue_carpet":435,"minecraft:brown_carpet":436,"minecraft:green_carpet":437,"minecraft:red_carpet":438,"minecraft:black_carpet":439,"minecraft:terracotta":440,"minecraft:coal_block":441,"minecraft:packed_ice":442,"minecraft:sunflower":443,"minecraft:lilac":444,"minecraft:rose_bush":445,"minecraft:peony":446,"minecraft:tall_grass":447,"minecraft:large_fern":448,"minecraft:white_banner":449,"minecraft:orange_banner":450,"minecraft:magenta_banner":451,"minecraft:light_blue_banner":452,"minecraft:yellow_banner":453,"minecraft:lime_banner":454,"minecraft:pink_banner":455,"minecraft:gray_banner":456,"minecraft:light_gray_banner":457,"minecraft:cyan_banner":458,"minecraft:purple_banner":459,"minecraft:blue_banner":460,"minecraft:brown_banner":461,"minecraft:green_banner":462,"minecraft:red_banner":463,"minecraft:black_banner":464,"minecraft:white_wall_banner":465,"minecraft:orange_wall_banner":466,"minecraft:magenta_wall_banner":467,"minecraft:light_blue_wall_banner":468,"minecraft:yellow_wall_banner":469,"minecraft:lime_wall_banner":470,"minecraft:pink_wall_banner":471,"minecraft:gray_wall_banner":472,"minecraft:light_gray_wall_banner":473,"minecraft:cyan_wall_banner":474,"minecraft:purple_wall_banner":475,"minecraft:blue_wall_banner":476,"minecraft:brown_wall_banner":477,"minecraft:green_wall_banner":478,"minecraft:red_wall_banner":479,"minecraft:black_wall_banner":480,"minecraft:red_sandstone":481,"minecraft:chiseled_red_sandstone":482,"minecraft:cut_red_sandstone":483,"minecraft:red_sandstone_stairs":484,"minecraft:oak_slab":485,"minecraft:spruce_slab":486,"minecraft:birch_slab":487,"minecraft:jungle_slab":488,"minecraft:acacia_slab":489,"minecraft:dark_oak_slab":490,"minecraft:mangrove_slab":491,"minecraft:stone_slab":492,"minecraft:smooth_stone_slab":493,"minecraft:sandstone_slab":494,"minecraft:cut_sandstone_slab":495,"minecraft:petrified_oak_slab":496,"minecraft:cobblestone_slab":497,"minecraft:brick_slab":498,"minecraft:stone_brick_slab":499,"minecraft:mud_brick_slab":500,"minecraft:nether_brick_slab":501,"minecraft:quartz_slab":502,"minecraft:red_sandstone_slab":503,"minecraft:cut_red_sandstone_slab":504,"minecraft:purpur_slab":505,"minecraft:smooth_stone":506,"minecraft:smooth_sandstone":507,"minecraft:smooth_quartz":508,"minecraft:smooth_red_sandstone":509,"minecraft:spruce_fence_gate":510,"minecraft:birch_fence_gate":511,"minecraft:jungle_fence_gate":512,"minecraft:acacia_fence_gate":513,"minecraft:dark_oak_fence_gate":514,"minecraft:mangrove_fence_gate":515,"minecraft:spruce_fence":516,"minecraft:birch_fence":517,"minecraft:jungle_fence":518,"minecraft:acacia_fence":519,"minecraft:dark_oak_fence":520,"minecraft:mangrove_fence":521,"minecraft:spruce_door":522,"minecraft:birch_door":523,"minecraft:jungle_door":524,"minecraft:acacia_door":525,"minecraft:dark_oak_door":526,"minecraft:mangrove_door":527,"minecraft:end_rod":528,"minecraft:chorus_plant":529,"minecraft:chorus_flower":530,"minecraft:purpur_block":531,"minecraft:purpur_pillar":532,"minecraft:purpur_stairs":533,"minecraft:end_stone_bricks":534,"minecraft:beetroots":535,"minecraft:dirt_path":536,"minecraft:end_gateway":537,"minecraft:repeating_command_block":538,"minecraft:chain_command_block":539,"minecraft:frosted_ice":540,"minecraft:magma_block":541,"minecraft:nether_wart_block":542,"minecraft:red_nether_bricks":543,"minecraft:bone_block":544,"minecraft:structure_void":545,"minecraft:observer":546,"minecraft:shulker_box":547,"minecraft:white_shulker_box":548,"minecraft:orange_shulker_box":549,"minecraft:magenta_shulker_box":550,"minecraft:light_blue_shulker_box":551,"minecraft:yellow_shulker_box":552,"minecraft:lime_shulker_box":553,"minecraft:pink_shulker_box":554,"minecraft:gray_shulker_box":555,"minecraft:light_gray_shulker_box":556,"minecraft:cyan_shulker_box":557,"minecraft:purple_shulker_box":558,"minecraft:blue_shulker_box":559,"minecraft:brown_shulker_box":560,"minecraft:green_shulker_box":561,"minecraft:red_shulker_box":562,"minecraft:black_shulker_box":563,"minecraft:white_glazed_terracotta":564,"minecraft:orange_glazed_terracotta":565,"minecraft:magenta_glazed_terracotta":566,"minecraft:light_blue_glazed_terracotta":567,"minecraft:yellow_glazed_terracotta":568,"minecraft:lime_glazed_terracotta":569,"minecraft:pink_glazed_terracotta":570,"minecraft:gray_glazed_terracotta":571,"minecraft:light_gray_glazed_terracotta":572,"minecraft:cyan_glazed_terracotta":573,"minecraft:purple_glazed_terracotta":574,"minecraft:blue_glazed_terracotta":575,"minecraft:brown_glazed_terracotta":576,"minecraft:green_glazed_terracotta":577,"minecraft:red_glazed_terracotta":578,"minecraft:black_glazed_terracotta":579,"minecraft:white_concrete":580,"minecraft:orange_concrete":581,"minecraft:magenta_concrete":582,"minecraft:light_blue_concrete":583,"minecraft:yellow_concrete":584,"minecraft:lime_concrete":585,"minecraft:pink_concrete":586,"minecraft:gray_concrete":587,"minecraft:light_gray_concrete":588,"minecraft:cyan_concrete":589,"minecraft:purple_concrete":590,"minecraft:blue_concrete":591,"minecraft:brown_concrete":592,"minecraft:green_concrete":593,"minecraft:red_concrete":594,"minecraft:black_concrete":595,"minecraft:white_concrete_powder":596,"minecraft:orange_concrete_powder":597,"minecraft:magenta_concrete_powder":598,"minecraft:light_blue_concrete_powder":599,"minecraft:yellow_concrete_powder":600,"minecraft:lime_concrete_powder":601,"minecraft:pink_concrete_powder":602,"minecraft:gray_concrete_powder":603,"minecraft:light_gray_concrete_powder":604,"minecraft:cyan_concrete_powder":605,"minecraft:purple_concrete_powder":606,"minecraft:blue_concrete_powder":607,"minecraft:brown_concrete_powder":608,"minecraft:green_concrete_powder":609,"minecraft:red_concrete_powder":610,"minecraft:black_concrete_powder":611,"minecraft:kelp":612,"minecraft:kelp_plant":613,"minecraft:dried_kelp_block":614,"minecraft:turtle_egg":615,"minecraft:dead_tube_coral_block":616,"minecraft:dead_brain_coral_block":617,"minecraft:dead_bubble_coral_block":618,"minecraft:dead_fire_coral_block":619,"minecraft:dead_horn_coral_block":620,"minecraft:tube_coral_block":621,"minecraft:brain_coral_block":622,"minecraft:bubble_coral_block":623,"minecraft:fire_coral_block":624,"minecraft:horn_coral_block":625,"minecraft:dead_tube_coral":626,"minecraft:dead_brain_coral":627,"minecraft:dead_bubble_coral":628,"minecraft:dead_fire_coral":629,"minecraft:dead_horn_coral":630,"minecraft:tube_coral":631,"minecraft:brain_coral":632,"minecraft:bubble_coral":633,"minecraft:fire_coral":634,"minecraft:horn_coral":635,"minecraft:dead_tube_coral_fan":636,"minecraft:dead_brain_coral_fan":637,"minecraft:dead_bubble_coral_fan":638,"minecraft:dead_fire_coral_fan":639,"minecraft:dead_horn_coral_fan":640,"minecraft:tube_coral_fan":641,"minecraft:brain_coral_fan":642,"minecraft:bubble_coral_fan":643,"minecraft:fire_coral_fan":644,"minecraft:horn_coral_fan":645,"minecraft:dead_tube_coral_wall_fan":646,"minecraft:dead_brain_coral_wall_fan":647,"minecraft:dead_bubble_coral_wall_fan":648,"minecraft:dead_fire_coral_wall_fan":649,"minecraft:dead_horn_coral_wall_fan":650,"minecraft:tube_coral_wall_fan":651,"minecraft:brain_coral_wall_fan":652,"minecraft:bubble_coral_wall_fan":653,"minecraft:fire_coral_wall_fan":654,"minecraft:horn_coral_wall_fan":655,"minecraft:sea_pickle":656,"minecraft:blue_ice":657,"minecraft:conduit":658,"minecraft:bamboo_sapling":659,"minecraft:bamboo":660,"minecraft:potted_bamboo":661,"minecraft:void_air":662,"minecraft:cave_air":663,"minecraft:bubble_column":664,"minecraft:polished_granite_stairs":665,"minecraft:smooth_red_sandstone_stairs":666,"minecraft:mossy_stone_brick_stairs":667,"minecraft:polished_diorite_stairs":668,"minecraft:mossy_cobblestone_stairs":669,"minecraft:end_stone_brick_stairs":670,"minecraft:stone_stairs":671,"minecraft:smooth_sandstone_stairs":672,"minecraft:smooth_quartz_stairs":673,"minecraft:granite_stairs":674,"minecraft:andesite_stairs":675,"minecraft:red_nether_brick_stairs":676,"minecraft:polished_andesite_stairs":677,"minecraft:diorite_stairs":678,"minecraft:polished_granite_slab":679,"minecraft:smooth_red_sandstone_slab":680,"minecraft:mossy_stone_brick_slab":681,"minecraft:polished_diorite_slab":682,"minecraft:mossy_cobblestone_slab":683,"minecraft:end_stone_brick_slab":684,"minecraft:smooth_sandstone_slab":685,"minecraft:smooth_quartz_slab":686,"minecraft:granite_slab":687,"minecraft:andesite_slab":688,"minecraft:red_nether_brick_slab":689,"minecraft:polished_andesite_slab":690,"minecraft:diorite_slab":691,"minecraft:brick_wall":692,"minecraft:prismarine_wall":693,"minecraft:red_sandstone_wall":694,"minecraft:mossy_stone_brick_wall":695,"minecraft:granite_wall":696,"minecraft:stone_brick_wall":697,"minecraft:mud_brick_wall":698,"minecraft:nether_brick_wall":699,"minecraft:andesite_wall":700,"minecraft:red_nether_brick_wall":701,"minecraft:sandstone_wall":702,"minecraft:end_stone_brick_wall":703,"minecraft:diorite_wall":704,"minecraft:scaffolding":705,"minecraft:loom":706,"minecraft:barrel":707,"minecraft:smoker":708,"minecraft:blast_furnace":709,"minecraft:cartography_table":710,"minecraft:fletching_table":711,"minecraft:grindstone":712,"minecraft:lectern":713,"minecraft:smithing_table":714,"minecraft:stonecutter":715,"minecraft:bell":716,"minecraft:lantern":717,"minecraft:soul_lantern":718,"minecraft:campfire":719,"minecraft:soul_campfire":720,"minecraft:sweet_berry_bush":721,"minecraft:warped_stem":722,"minecraft:stripped_warped_stem":723,"minecraft:warped_hyphae":724,"minecraft:stripped_warped_hyphae":725,"minecraft:warped_nylium":726,"minecraft:warped_fungus":727,"minecraft:warped_wart_block":728,"minecraft:warped_roots":729,"minecraft:nether_sprouts":730,"minecraft:crimson_stem":731,"minecraft:stripped_crimson_stem":732,"minecraft:crimson_hyphae":733,"minecraft:stripped_crimson_hyphae":734,"minecraft:crimson_nylium":735,"minecraft:crimson_fungus":736,"minecraft:shroomlight":737,"minecraft:weeping_vines":738,"minecraft:weeping_vines_plant":739,"minecraft:twisting_vines":740,"minecraft:twisting_vines_plant":741,"minecraft:crimson_roots":742,"minecraft:crimson_planks":743,"minecraft:warped_planks":744,"minecraft:crimson_slab":745,"minecraft:warped_slab":746,"minecraft:crimson_pressure_plate":747,"minecraft:warped_pressure_plate":748,"minecraft:crimson_fence":749,"minecraft:warped_fence":750,"minecraft:crimson_trapdoor":751,"minecraft:warped_trapdoor":752,"minecraft:crimson_fence_gate":753,"minecraft:warped_fence_gate":754,"minecraft:crimson_stairs":755,"minecraft:warped_stairs":756,"minecraft:crimson_button":757,"minecraft:warped_button":758,"minecraft:crimson_door":759,"minecraft:warped_door":760,"minecraft:crimson_sign":761,"minecraft:warped_sign":762,"minecraft:crimson_wall_sign":763,"minecraft:warped_wall_sign":764,"minecraft:structure_block":765,"minecraft:jigsaw":766,"minecraft:composter":767,"minecraft:target":768,"minecraft:bee_nest":769,"minecraft:beehive":770,"minecraft:honey_block":771,"minecraft:honeycomb_block":772,"minecraft:netherite_block":773,"minecraft:ancient_debris":774,"minecraft:crying_obsidian":775,"minecraft:respawn_anchor":776,"minecraft:potted_crimson_fungus":777,"minecraft:potted_warped_fungus":778,"minecraft:potted_crimson_roots":779,"minecraft:potted_warped_roots":780,"minecraft:lodestone":781,"minecraft:blackstone":782,"minecraft:blackstone_stairs":783,"minecraft:blackstone_wall":784,"minecraft:blackstone_slab":785,"minecraft:polished_blackstone":786,"minecraft:polished_blackstone_bricks":787,"minecraft:cracked_polished_blackstone_bricks":788,"minecraft:chiseled_polished_blackstone":789,"minecraft:polished_blackstone_brick_slab":790,"minecraft:polished_blackstone_brick_stairs":791,"minecraft:polished_blackstone_brick_wall":792,"minecraft:gilded_blackstone":793,"minecraft:polished_blackstone_stairs":794,"minecraft:polished_blackstone_slab":795,"minecraft:polished_blackstone_pressure_plate":796,"minecraft:polished_blackstone_button":797,"minecraft:polished_blackstone_wall":798,"minecraft:chiseled_nether_bricks":799,"minecraft:cracked_nether_bricks":800,"minecraft:quartz_bricks":801,"minecraft:candle":802,"minecraft:white_candle":803,"minecraft:orange_candle":804,"minecraft:magenta_candle":805,"minecraft:light_blue_candle":806,"minecraft:yellow_candle":807,"minecraft:lime_candle":808,"minecraft:pink_candle":809,"minecraft:gray_candle":810,"minecraft:light_gray_candle":811,"minecraft:cyan_candle":812,"minecraft:purple_candle":813,"minecraft:blue_candle":814,"minecraft:brown_candle":815,"minecraft:green_candle":816,"minecraft:red_candle":817,"minecraft:black_candle":818,"minecraft:candle_cake":819,"minecraft:white_candle_cake":820,"minecraft:orange_candle_cake":821,"minecraft:magenta_candle_cake":822,"minecraft:light_blue_candle_cake":823,"minecraft:yellow_candle_cake":824,"minecraft:lime_candle_cake":825,"minecraft:pink_candle_cake":826,"minecraft:gray_candle_cake":827,"minecraft:light_gray_candle_cake":828,"minecraft:cyan_candle_cake":829,"minecraft:purple_candle_cake":830,"minecraft:blue_candle_cake":831,"minecraft:brown_candle_cake":832,"minecraft:green_candle_cake":833,"minecraft:red_candle_cake":834,"minecraft:black_candle_cake":835,"minecraft:amethyst_block":836,"minecraft:budding_amethyst":837,"minecraft:amethyst_cluster":838,"minecraft:large_amethyst_bud":839,"minecraft:medium_amethyst_bud":840,"minecraft:small_amethyst_bud":841,"minecraft:tuff":842,"minecraft:calcite":843,"minecraft:tinted_glass":844,"minecraft:powder_snow":845,"minecraft:sculk_sensor":846,"minecraft:sculk":847,"minecraft:sculk_vein":848,"minecraft:sculk_catalyst":849,"minecraft:sculk_shrieker":850,"minecraft:oxidized_copper":851,"minecraft:weathered_copper":852,"minecraft:exposed_copper":853,"minecraft:copper_block":854,"minecraft:copper_ore":855,"minecraft:deepslate_copper_ore":856,"minecraft:oxidized_cut_copper":857,"minecraft:weathered_cut_copper":858,"minecraft:exposed_cut_copper":859,"minecraft:cut_copper":860,"minecraft:oxidized_cut_copper_stairs":861,"minecraft:weathered_cut_copper_stairs":862,"minecraft:exposed_cut_copper_stairs":863,"minecraft:cut_copper_stairs":864,"minecraft:oxidized_cut_copper_slab":865,"minecraft:weathered_cut_copper_slab":866,"minecraft:exposed_cut_copper_slab":867,"minecraft:cut_copper_slab":868,"minecraft:waxed_copper_block":869,"minecraft:waxed_weathered_copper":870,"minecraft:waxed_exposed_copper":871,"minecraft:waxed_oxidized_copper":872,"minecraft:waxed_oxidized_cut_copper":873,"minecraft:waxed_weathered_cut_copper":874,"minecraft:waxed_exposed_cut_copper":875,"minecraft:waxed_cut_copper":876,"minecraft:waxed_oxidized_cut_copper_stairs":877,"minecraft:waxed_weathered_cut_copper_stairs":878,"minecraft:waxed_exposed_cut_copper_stairs":879,"minecraft:waxed_cut_copper_stairs":880,"minecraft:waxed_oxidized_cut_copper_slab":881,"minecraft:waxed_weathered_cut_copper_slab":882,"minecraft:waxed_exposed_cut_copper_slab":883,"minecraft:waxed_cut_copper_slab":884,"minecraft:lightning_rod":885,"minecraft:pointed_dripstone":886,"minecraft:dripstone_block":887,"minecraft:cave_vines":888,"minecraft:cave_vines_plant":889,"minecraft:spore_blossom":890,"minecraft:azalea":891,"minecraft:flowering_azalea":892,"minecraft:moss_carpet":893,"minecraft:moss_block":894,"minecraft:big_dripleaf":895,"minecraft:big_dripleaf_stem":896,"minecraft:small_dripleaf":897,"minecraft:hanging_roots":898,"minecraft:rooted_dirt":899,"minecraft:mud":900,"minecraft:deepslate":901,"minecraft:cobbled_deepslate":902,"minecraft:cobbled_deepslate_stairs":903,"minecraft:cobbled_deepslate_slab":904,"minecraft:cobbled_deepslate_wall":905,"minecraft:polished_deepslate":906,"minecraft:polished_deepslate_stairs":907,"minecraft:polished_deepslate_slab":908,"minecraft:polished_deepslate_wall":909,"minecraft:deepslate_tiles":910,"minecraft:deepslate_tile_stairs":911,"minecraft:deepslate_tile_slab":912,"minecraft:deepslate_tile_wall":913,"minecraft:deepslate_bricks":914,"minecraft:deepslate_brick_stairs":915,"minecraft:deepslate_brick_slab":916,"minecraft:deepslate_brick_wall":917,"minecraft:chiseled_deepslate":918,"minecraft:cracked_deepslate_bricks":919,"minecraft:cracked_deepslate_tiles":920,"minecraft:infested_deepslate":921,"minecraft:smooth_basalt":922,"minecraft:raw_iron_block":923,"minecraft:raw_copper_block":924,"minecraft:raw_gold_block":925,"minecraft:potted_azalea_bush":926,"minecraft:potted_flowering_azalea_bush":927,"minecraft:ochre_froglight":928,"minecraft:verdant_froglight":929,"minecraft:pearlescent_froglight":930,"minecraft:frogspawn":931,"minecraft:reinforced_deepslate":932}`,
  ),
);

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
    `{"minecraft:ambient_entity_effect":0,"minecraft:angry_villager":1,"minecraft:block":2,"minecraft:block_marker":3,"minecraft:bubble":4,"minecraft:cloud":5,"minecraft:crit":6,"minecraft:damage_indicator":7,"minecraft:dragon_breath":8,"minecraft:dripping_lava":9,"minecraft:falling_lava":10,"minecraft:landing_lava":11,"minecraft:dripping_water":12,"minecraft:falling_water":13,"minecraft:dust":14,"minecraft:dust_color_transition":15,"minecraft:effect":16,"minecraft:elder_guardian":17,"minecraft:enchanted_hit":18,"minecraft:enchant":19,"minecraft:end_rod":20,"minecraft:entity_effect":21,"minecraft:explosion_emitter":22,"minecraft:explosion":23,"minecraft:sonic_boom":24,"minecraft:falling_dust":25,"minecraft:firework":26,"minecraft:fishing":27,"minecraft:flame":28,"minecraft:sculk_soul":29,"minecraft:sculk_charge":30,"minecraft:sculk_charge_pop":31,"minecraft:soul_fire_flame":32,"minecraft:soul":33,"minecraft:flash":34,"minecraft:happy_villager":35,"minecraft:composter":36,"minecraft:heart":37,"minecraft:instant_effect":38,"minecraft:item":39,"minecraft:vibration":40,"minecraft:item_slime":41,"minecraft:item_snowball":42,"minecraft:large_smoke":43,"minecraft:lava":44,"minecraft:mycelium":45,"minecraft:note":46,"minecraft:poof":47,"minecraft:portal":48,"minecraft:rain":49,"minecraft:smoke":50,"minecraft:sneeze":51,"minecraft:spit":52,"minecraft:squid_ink":53,"minecraft:sweep_attack":54,"minecraft:totem_of_undying":55,"minecraft:underwater":56,"minecraft:splash":57,"minecraft:witch":58,"minecraft:bubble_pop":59,"minecraft:current_down":60,"minecraft:bubble_column_up":61,"minecraft:nautilus":62,"minecraft:dolphin":63,"minecraft:campfire_cosy_smoke":64,"minecraft:campfire_signal_smoke":65,"minecraft:dripping_honey":66,"minecraft:falling_honey":67,"minecraft:landing_honey":68,"minecraft:falling_nectar":69,"minecraft:falling_spore_blossom":70,"minecraft:ash":71,"minecraft:crimson_spore":72,"minecraft:warped_spore":73,"minecraft:spore_blossom_air":74,"minecraft:dripping_obsidian_tear":75,"minecraft:falling_obsidian_tear":76,"minecraft:landing_obsidian_tear":77,"minecraft:reverse_portal":78,"minecraft:white_ash":79,"minecraft:small_flame":80,"minecraft:snowflake":81,"minecraft:dripping_dripstone_lava":82,"minecraft:falling_dripstone_lava":83,"minecraft:dripping_dripstone_water":84,"minecraft:falling_dripstone_water":85,"minecraft:glow_squid_ink":86,"minecraft:glow":87,"minecraft:wax_on":88,"minecraft:wax_off":89,"minecraft:electric_spark":90,"minecraft:scrape":91,"minecraft:shriek":92}`,
  ),
);

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
    `{"minecraft:generic_9x1":0,"minecraft:generic_9x2":1,"minecraft:generic_9x3":2,"minecraft:generic_9x4":3,"minecraft:generic_9x5":4,"minecraft:generic_9x6":5,"minecraft:generic_3x3":6,"minecraft:anvil":7,"minecraft:beacon":8,"minecraft:blast_furnace":9,"minecraft:brewing_stand":10,"minecraft:crafting":11,"minecraft:enchantment":12,"minecraft:furnace":13,"minecraft:grindstone":14,"minecraft:hopper":15,"minecraft:lectern":16,"minecraft:loom":17,"minecraft:merchant":18,"minecraft:shulker_box":19,"minecraft:smithing":20,"minecraft:smoker":21,"minecraft:cartography_table":22,"minecraft:stonecutter":23}`,
  ),
);

export type VillagerType =
  | "minecraft:desert"
  | "minecraft:jungle"
  | "minecraft:plains"
  | "minecraft:savanna"
  | "minecraft:snow"
  | "minecraft:swamp"
  | "minecraft:taiga";

export const villagerTypeEnum = createEnumMapper<VillagerType>({
  "minecraft:desert": 0,
  "minecraft:jungle": 1,
  "minecraft:plains": 2,
  "minecraft:savanna": 3,
  "minecraft:snow": 4,
  "minecraft:swamp": 5,
  "minecraft:taiga": 6,
});

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

export const villagerProfessionEnum = createEnumMapper<VillagerProfession>({
  "minecraft:none": 0,
  "minecraft:armorer": 1,
  "minecraft:butcher": 2,
  "minecraft:cartographer": 3,
  "minecraft:cleric": 4,
  "minecraft:farmer": 5,
  "minecraft:fisherman": 6,
  "minecraft:fletcher": 7,
  "minecraft:leatherworker": 8,
  "minecraft:librarian": 9,
  "minecraft:mason": 10,
  "minecraft:nitwit": 11,
  "minecraft:shepherd": 12,
  "minecraft:toolsmith": 13,
  "minecraft:weaponsmith": 14,
});

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

export const catVariantEnum = createEnumMapper<CatVariant>({
  "minecraft:tabby": 0,
  "minecraft:black": 1,
  "minecraft:red": 2,
  "minecraft:siamese": 3,
  "minecraft:british_shorthair": 4,
  "minecraft:calico": 5,
  "minecraft:persian": 6,
  "minecraft:ragdoll": 7,
  "minecraft:white": 8,
  "minecraft:jellie": 9,
  "minecraft:all_black": 10,
});

export type FrogVariant = "minecraft:temperate" | "minecraft:warm" | "minecraft:cold";

export const frogVariantEnum = createEnumMapper<FrogVariant>({
  "minecraft:temperate": 0,
  "minecraft:warm": 1,
  "minecraft:cold": 2,
});

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
    `{"minecraft:kebab":0,"minecraft:aztec":1,"minecraft:alban":2,"minecraft:aztec2":3,"minecraft:bomb":4,"minecraft:plant":5,"minecraft:wasteland":6,"minecraft:pool":7,"minecraft:courbet":8,"minecraft:sea":9,"minecraft:sunset":10,"minecraft:creebet":11,"minecraft:wanderer":12,"minecraft:graham":13,"minecraft:match":14,"minecraft:bust":15,"minecraft:stage":16,"minecraft:void":17,"minecraft:skull_and_roses":18,"minecraft:wither":19,"minecraft:fighters":20,"minecraft:pointer":21,"minecraft:pigscene":22,"minecraft:burning_skull":23,"minecraft:skeleton":24,"minecraft:earth":25,"minecraft:wind":26,"minecraft:water":27,"minecraft:fire":28,"minecraft:donkey_kong":29}`,
  ),
);

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

export const statTypeEnum = createEnumMapper<StatType>({
  "minecraft:mined": 0,
  "minecraft:crafted": 1,
  "minecraft:used": 2,
  "minecraft:broken": 3,
  "minecraft:picked_up": 4,
  "minecraft:dropped": 5,
  "minecraft:killed": 6,
  "minecraft:killed_by": 7,
  "minecraft:custom": 8,
});

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
    `{"minecraft:leave_game":0,"minecraft:play_time":1,"minecraft:total_world_time":2,"minecraft:time_since_death":3,"minecraft:time_since_rest":4,"minecraft:sneak_time":5,"minecraft:walk_one_cm":6,"minecraft:crouch_one_cm":7,"minecraft:sprint_one_cm":8,"minecraft:walk_on_water_one_cm":9,"minecraft:fall_one_cm":10,"minecraft:climb_one_cm":11,"minecraft:fly_one_cm":12,"minecraft:walk_under_water_one_cm":13,"minecraft:minecart_one_cm":14,"minecraft:boat_one_cm":15,"minecraft:pig_one_cm":16,"minecraft:horse_one_cm":17,"minecraft:aviate_one_cm":18,"minecraft:swim_one_cm":19,"minecraft:strider_one_cm":20,"minecraft:jump":21,"minecraft:drop":22,"minecraft:damage_dealt":23,"minecraft:damage_dealt_absorbed":24,"minecraft:damage_dealt_resisted":25,"minecraft:damage_taken":26,"minecraft:damage_blocked_by_shield":27,"minecraft:damage_absorbed":28,"minecraft:damage_resisted":29,"minecraft:deaths":30,"minecraft:mob_kills":31,"minecraft:animals_bred":32,"minecraft:player_kills":33,"minecraft:fish_caught":34,"minecraft:talked_to_villager":35,"minecraft:traded_with_villager":36,"minecraft:eat_cake_slice":37,"minecraft:fill_cauldron":38,"minecraft:use_cauldron":39,"minecraft:clean_armor":40,"minecraft:clean_banner":41,"minecraft:clean_shulker_box":42,"minecraft:interact_with_brewingstand":43,"minecraft:interact_with_beacon":44,"minecraft:inspect_dropper":45,"minecraft:inspect_hopper":46,"minecraft:inspect_dispenser":47,"minecraft:play_noteblock":48,"minecraft:tune_noteblock":49,"minecraft:pot_flower":50,"minecraft:trigger_trapped_chest":51,"minecraft:open_enderchest":52,"minecraft:enchant_item":53,"minecraft:play_record":54,"minecraft:interact_with_furnace":55,"minecraft:interact_with_crafting_table":56,"minecraft:open_chest":57,"minecraft:sleep_in_bed":58,"minecraft:open_shulker_box":59,"minecraft:open_barrel":60,"minecraft:interact_with_blast_furnace":61,"minecraft:interact_with_smoker":62,"minecraft:interact_with_lectern":63,"minecraft:interact_with_campfire":64,"minecraft:interact_with_cartography_table":65,"minecraft:interact_with_loom":66,"minecraft:interact_with_stonecutter":67,"minecraft:bell_ring":68,"minecraft:raid_trigger":69,"minecraft:raid_win":70,"minecraft:interact_with_anvil":71,"minecraft:interact_with_grindstone":72,"minecraft:target_hit":73,"minecraft:interact_with_smithing_table":74}`,
  ),
);

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
  return {
    x: Number(p >> 38n & 0x3ffffffn) << 6 >> 6,
    y: Number(p >> 0n & 0xfffn) << 20 >> 20,
    z: Number(p >> 12n & 0x3ffffffn) << 6 >> 6,
  };
}

export function writeBlockPos(writer: Writer, value: BlockPos) {
  writer.writeLong(
    BigInt(value.x & 0x3ffffff) << 38n | BigInt(value.y & 0xfff) << 0n | BigInt(value.z & 0x3ffffff) << 12n,
  );
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
  return reader.readBoolean()
    ? { item: itemEnum.fromId(reader.readVarInt()), count: reader.readByte(), tag: reader.readCompoundTag() }
    : null;
}

export function writeItemStack(writer: Writer, value: ItemStack) {
  writer.writeBoolean(value != null);
  if (value != null) {
    writer.writeVarInt(itemEnum.toId(value.item));
    writer.writeByte(value.count);
    writer.writeCompoundTag(value.tag);
  }
}

export type Difficulty = "peaceful" | "easy" | "normal" | "hard";

export const difficultyEnum = createEnumMapper<Difficulty>({ "peaceful": 0, "easy": 1, "normal": 2, "hard": 3 });

export type GameMode = "survival" | "creative" | "adventure" | "spectator";

export const gameModeEnum = createEnumMapper<GameMode>({
  "survival": 0,
  "creative": 1,
  "adventure": 2,
  "spectator": 3,
});

export type Direction = "down" | "up" | "north" | "south" | "west" | "east";

export const directionEnum = createEnumMapper<Direction>({
  "down": 0,
  "up": 1,
  "north": 2,
  "south": 3,
  "west": 4,
  "east": 5,
});

export type SoundSource =
  | "master"
  | "music"
  | "record"
  | "weather"
  | "block"
  | "hostile"
  | "neutral"
  | "player"
  | "ambient"
  | "voice";

export const soundSourceEnum = createEnumMapper<SoundSource>({
  "master": 0,
  "music": 1,
  "record": 2,
  "weather": 3,
  "block": 4,
  "hostile": 5,
  "neutral": 6,
  "player": 7,
  "ambient": 8,
  "voice": 9,
});

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

export type GameProfile = { id: Uuid; name: string; properties: Properties };

export function readGameProfile(reader: Reader): GameProfile {
  return { id: Uuid.from(reader.read(16)), name: reader.readString(16), properties: readProperties(reader) };
}

export function writeGameProfile(writer: Writer, value: GameProfile) {
  writer.write(value.id.bytes());
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

export type ChunkData = {
  heightmaps: CompoundTag | null;
  buffer: Uint8Array;
  blockEntitiesData: { x: number; z: number; y: number; type: BlockEntityType; tag: CompoundTag | null }[];
};

export function readChunkData(reader: Reader): ChunkData {
  const heightmaps = reader.readCompoundTag();
  const buffer = reader.readByteArray();
  const list: { x: number; z: number; y: number; type: BlockEntityType; tag: CompoundTag | null }[] = [];
  for (let i = reader.readVarInt(); i--;) {
    const p = reader.readByte();
    list.push({
      x: (p >> 4 & 0xf) << 28 >> 28,
      z: (p >> 0 & 0xf) << 28 >> 28,
      y: reader.readShort(),
      type: blockEntityTypeEnum.fromId(reader.readVarInt()),
      tag: reader.readCompoundTag(),
    });
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
    writer.writeVarInt(blockEntityTypeEnum.toId(item.type));
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
  | { type: "brigadier:string"; template: BrigadierStringTemplate }
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

export type BrigadierStringTemplate = "single_word" | "quotable_phrase" | "greedy_phrase";

export const brigadierStringTemplateEnum = createEnumMapper<BrigadierStringTemplate>({
  "single_word": 0,
  "quotable_phrase": 1,
  "greedy_phrase": 2,
});

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
      result = { type: "brigadier:string", template: brigadierStringTemplateEnum.fromId(reader.readVarInt()) };
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
      writer.writeVarInt(brigadierStringTemplateEnum.toId(value.template));
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
      result = {
        type: "argument",
        id: reader.readString(),
        argument: readCommandArgument(reader),
        suggestionId: reader.readBoolean() ? readResourceLocation(reader) : null,
      };
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

export type CommandNode = {
  isExecutable: boolean;
  children: number[];
  redirectNode: number | null;
  node: CommandNodeStub;
};

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
    node = {
      type: "argument",
      id: id,
      argument: argument,
      suggestionId: ((flags & 0x10) != 0) ? readResourceLocation(reader) : null,
    };
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
  writer.writeByte(
    type | -value.isExecutable & 0x4 | -(value.redirectNode != null) & 0x8 |
      -(value.node.type == "argument" && value.node.suggestionId != null) & 0x10,
  );
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

export type SignedMessageHeader = { previousSignature: MessageSignature | null; sender: Uuid };

export type MessageSignature = Uint8Array;

export function readSignedMessageHeader(reader: Reader): SignedMessageHeader {
  return {
    previousSignature: reader.readBoolean() ? reader.readByteArray() : null,
    sender: Uuid.from(reader.read(16)),
  };
}

export function writeSignedMessageHeader(writer: Writer, value: SignedMessageHeader) {
  writer.writeBoolean(value.previousSignature != null);
  if (value.previousSignature != null) writer.writeByteArray(value.previousSignature);
  writer.write(value.sender.bytes());
}

export type ChatMessageContent = { plain: string; decorated: Component | null };

export function readChatMessageContent(reader: Reader): ChatMessageContent {
  return {
    plain: reader.readString(256),
    decorated: reader.readBoolean() ? Component.deserialize(reader.readJson()) : null,
  };
}

export function writeChatMessageContent(writer: Writer, value: ChatMessageContent) {
  writer.writeString(value.plain);
  writer.writeBoolean(value.decorated != null);
  if (value.decorated != null) writer.writeJson(value.decorated.serialize());
}

export type Instant = bigint;

export function readInstant(reader: Reader): Instant {
  return reader.readLong();
}

export function writeInstant(writer: Writer, value: Instant) {
  writer.writeLong(value);
}

export type LastSeenMessagesEntry = { profileId: Uuid; lastSignature: MessageSignature | null };

export function readLastSeenMessagesEntry(reader: Reader): LastSeenMessagesEntry {
  return { profileId: Uuid.from(reader.read(16)), lastSignature: reader.readBoolean() ? reader.readByteArray() : null };
}

export function writeLastSeenMessagesEntry(writer: Writer, value: LastSeenMessagesEntry) {
  writer.write(value.profileId.bytes());
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

export type SignedMessageBody = {
  content: ChatMessageContent;
  timeStamp: Instant;
  salt: bigint;
  lastSeen: LastSeenMessagesEntry[];
};

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

export type PlayerChatMessage = {
  signedHeader: SignedMessageHeader;
  headerSignature: MessageSignature;
  signedBody: SignedMessageBody;
  unsignedContent: Component | null;
  filterMask: FilterMask;
};

export function readPlayerChatMessage(reader: Reader): PlayerChatMessage {
  return {
    signedHeader: readSignedMessageHeader(reader),
    headerSignature: reader.readByteArray(),
    signedBody: readSignedMessageBody(reader),
    unsignedContent: reader.readBoolean() ? Component.deserialize(reader.readJson()) : null,
    filterMask: readFilterMask(reader),
  };
}

export function writePlayerChatMessage(writer: Writer, value: PlayerChatMessage) {
  writeSignedMessageHeader(writer, value.signedHeader);
  writer.writeByteArray(value.headerSignature);
  writeSignedMessageBody(writer, value.signedBody);
  writer.writeBoolean(value.unsignedContent != null);
  if (value.unsignedContent != null) writer.writeJson(value.unsignedContent.serialize());
  writeFilterMask(writer, value.filterMask);
}

export type ChatTypeBound = { chatType: ChatType; name: Component; targetName: Component | null };

export function readChatTypeBound(reader: Reader): ChatTypeBound {
  return {
    chatType: chatTypeEnum.fromId(reader.readVarInt()),
    name: Component.deserialize(reader.readJson()),
    targetName: reader.readBoolean() ? Component.deserialize(reader.readJson()) : null,
  };
}

export function writeChatTypeBound(writer: Writer, value: ChatTypeBound) {
  writer.writeVarInt(chatTypeEnum.toId(value.chatType));
  writer.writeJson(value.name.serialize());
  writer.writeBoolean(value.targetName != null);
  if (value.targetName != null) writer.writeJson(value.targetName.serialize());
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

export const chatVisiblityEnum = createEnumMapper<ChatVisiblity>({ "full": 0, "system": 1, "hidden": 2 });

export type HumanoidArm = "left" | "right";

export const humanoidArmEnum = createEnumMapper<HumanoidArm>({ "left": 0, "right": 1 });

export type ClickType = "pickup" | "quick_move" | "swap" | "clone" | "throw" | "quick_craft" | "pickup_all";

export const clickTypeEnum = createEnumMapper<ClickType>({
  "pickup": 0,
  "quick_move": 1,
  "swap": 2,
  "clone": 3,
  "throw": 4,
  "quick_craft": 5,
  "pickup_all": 6,
});

export type EquipmentSlot = "mainhand" | "offhand" | "feet" | "legs" | "chest" | "head";

export const equipmentSlotEnum = createEnumMapper<EquipmentSlot>({
  "mainhand": 0,
  "offhand": 1,
  "feet": 2,
  "legs": 3,
  "chest": 4,
  "head": 5,
});

export type PlayerAction =
  | "start_destroy_block"
  | "abort_destroy_block"
  | "stop_destroy_block"
  | "drop_all_items"
  | "drop_item"
  | "release_use_item"
  | "swap_item_with_offhand";

export const playerActionEnum = createEnumMapper<PlayerAction>({
  "start_destroy_block": 0,
  "abort_destroy_block": 1,
  "stop_destroy_block": 2,
  "drop_all_items": 3,
  "drop_item": 4,
  "release_use_item": 5,
  "swap_item_with_offhand": 6,
});

export type InteractionHand = "main_hand" | "off_hand";

export const interactionHandEnum = createEnumMapper<InteractionHand>({ "main_hand": 0, "off_hand": 1 });

export type RecipeBookType = "crafting" | "furnace" | "blast_furnace" | "smoker";

export const recipeBookTypeEnum = createEnumMapper<RecipeBookType>({
  "crafting": 0,
  "furnace": 1,
  "blast_furnace": 2,
  "smoker": 3,
});

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

export const chatFormattingEnum = createEnumMapper<ChatFormatting>({
  "black": 0,
  "dark_blue": 1,
  "dark_green": 2,
  "dark_aqua": 3,
  "dark_red": 4,
  "dark_purple": 5,
  "gold": 6,
  "gray": 7,
  "dark_gray": 8,
  "blue": 9,
  "green": 10,
  "aqua": 11,
  "red": 12,
  "light_purple": 13,
  "yellow": 14,
  "white": 15,
  "obfuscated": 16,
  "bold": 17,
  "strikethrough": 18,
  "underline": 19,
  "italic": 20,
  "reset": -1,
});

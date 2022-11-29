// deno-lint-ignore-file
import { Protocol } from "minecraft/network/protocol.ts";
import {
  ServerboundAcceptTeleportationPacket,
  ServerboundBlockEntityTagQueryPacket,
  ServerboundChangeDifficultyPacket,
  ServerboundChatAckPacket,
  ServerboundChatCommandPacket,
  ServerboundChatPacket,
  ServerboundChatPreviewPacket,
  ServerboundClientCommandPacket,
  ServerboundClientInformationPacket,
  ServerboundCommandSuggestionPacket,
  ServerboundContainerButtonClickPacket,
  ServerboundContainerClickPacket,
  ServerboundContainerClosePacket,
  ServerboundCustomPayloadPacket,
  ServerboundEditBookPacket,
  ServerboundEntityTagQueryPacket,
  ServerboundInteractPacket,
  ServerboundJigsawGeneratePacket,
  ServerboundKeepAlivePacket,
  ServerboundLockDifficultyPacket,
  ServerboundMovePlayerPosPacket,
  ServerboundMovePlayerPosRotPacket,
  ServerboundMovePlayerRotPacket,
  ServerboundMovePlayerStatusOnlyPacket,
  ServerboundMoveVehiclePacket,
  ServerboundPaddleBoatPacket,
  ServerboundPickItemPacket,
  ServerboundPlaceRecipePacket,
  ServerboundPlayerAbilitiesPacket,
  ServerboundPlayerActionPacket,
  ServerboundPlayerCommandPacket,
  ServerboundPlayerInputPacket,
  ServerboundPongPacket,
  ServerboundRecipeBookChangeSettingsPacket,
  ServerboundRecipeBookSeenRecipePacket,
  ServerboundRenameItemPacket,
  ServerboundResourcePackPacket,
  ServerboundSeenAdvancementsPacket,
  ServerboundSelectTradePacket,
  ServerboundSetBeaconPacket,
  ServerboundSetCarriedItemPacket,
  ServerboundSetCommandBlockPacket,
  ServerboundSetCommandMinecartPacket,
  ServerboundSetCreativeModeSlotPacket,
  ServerboundSetJigsawBlockPacket,
  ServerboundSetStructureBlockPacket,
  ServerboundSignUpdatePacket,
  ServerboundSwingPacket,
  ServerboundTeleportToEntityPacket,
  ServerboundUseItemOnPacket,
  ServerboundUseItemPacket,
  ServerGameHandler,
} from "./serverbound.ts";
import {
  ClientboundAddEntityPacket,
  ClientboundAddExperienceOrbPacket,
  ClientboundAddPlayerPacket,
  ClientboundAnimatePacket,
  ClientboundAwardStatsPacket,
  ClientboundBlockChangedAckPacket,
  ClientboundBlockDestructionPacket,
  ClientboundBlockEntityDataPacket,
  ClientboundBlockEventPacket,
  ClientboundBlockUpdatePacket,
  ClientboundBossEventPacket,
  ClientboundChangeDifficultyPacket,
  ClientboundChatPreviewPacket,
  ClientboundClearTitlesPacket,
  ClientboundCommandsPacket,
  ClientboundCommandSuggestionsPacket,
  ClientboundContainerClosePacket,
  ClientboundContainerSetContentPacket,
  ClientboundContainerSetDataPacket,
  ClientboundContainerSetSlotPacket,
  ClientboundCooldownPacket,
  ClientboundCustomChatCompletionsPacket,
  ClientboundCustomPayloadPacket,
  ClientboundCustomSoundPacket,
  ClientboundDeleteChatPacket,
  ClientboundDisconnectPacket,
  ClientboundEntityEventPacket,
  ClientboundExplodePacket,
  ClientboundForgetLevelChunkPacket,
  ClientboundGameEventPacket,
  ClientboundHorseScreenOpenPacket,
  ClientboundInitializeBorderPacket,
  ClientboundKeepAlivePacket,
  ClientboundLevelChunkWithLightPacket,
  ClientboundLevelEventPacket,
  ClientboundLevelParticlesPacket,
  ClientboundLightUpdatePacket,
  ClientboundLoginPacket,
  ClientboundMapItemDataPacket,
  ClientboundMerchantOffersPacket,
  ClientboundMoveEntityPosPacket,
  ClientboundMoveEntityPosRotPacket,
  ClientboundMoveEntityRotPacket,
  ClientboundMoveVehiclePacket,
  ClientboundOpenBookPacket,
  ClientboundOpenScreenPacket,
  ClientboundOpenSignEditorPacket,
  ClientboundPingPacket,
  ClientboundPlaceGhostRecipePacket,
  ClientboundPlayerAbilitiesPacket,
  ClientboundPlayerChatHeaderPacket,
  ClientboundPlayerChatPacket,
  ClientboundPlayerCombatEndPacket,
  ClientboundPlayerCombatEnterPacket,
  ClientboundPlayerCombatKillPacket,
  ClientboundPlayerInfoPacket,
  ClientboundPlayerLookAtPacket,
  ClientboundPlayerPositionPacket,
  ClientboundRecipePacket,
  ClientboundRemoveEntitiesPacket,
  ClientboundRemoveMobEffectPacket,
  ClientboundResourcePackPacket,
  ClientboundRespawnPacket,
  ClientboundRotateHeadPacket,
  ClientboundSectionBlocksUpdatePacket,
  ClientboundSelectAdvancementsTabPacket,
  ClientboundServerDataPacket,
  ClientboundSetActionBarTextPacket,
  ClientboundSetBorderCenterPacket,
  ClientboundSetBorderLerpSizePacket,
  ClientboundSetBorderSizePacket,
  ClientboundSetBorderWarningDelayPacket,
  ClientboundSetBorderWarningDistancePacket,
  ClientboundSetCameraPacket,
  ClientboundSetCarriedItemPacket,
  ClientboundSetChunkCacheCenterPacket,
  ClientboundSetChunkCacheRadiusPacket,
  ClientboundSetDefaultSpawnPositionPacket,
  ClientboundSetDisplayChatPreviewPacket,
  ClientboundSetDisplayObjectivePacket,
  ClientboundSetEntityDataPacket,
  ClientboundSetEntityLinkPacket,
  ClientboundSetEntityMotionPacket,
  ClientboundSetEquipmentPacket,
  ClientboundSetExperiencePacket,
  ClientboundSetHealthPacket,
  ClientboundSetObjectivePacket,
  ClientboundSetPassengersPacket,
  ClientboundSetPlayerTeamPacket,
  ClientboundSetScorePacket,
  ClientboundSetSimulationDistancePacket,
  ClientboundSetSubtitleTextPacket,
  ClientboundSetTimePacket,
  ClientboundSetTitlesAnimationPacket,
  ClientboundSetTitleTextPacket,
  ClientboundSoundEntityPacket,
  ClientboundSoundPacket,
  ClientboundStopSoundPacket,
  ClientboundSystemChatPacket,
  ClientboundTabListPacket,
  ClientboundTagQueryPacket,
  ClientboundTakeItemEntityPacket,
  ClientboundTeleportEntityPacket,
  ClientboundUpdateAdvancementsPacket,
  ClientboundUpdateAttributesPacket,
  ClientboundUpdateMobEffectPacket,
  ClientboundUpdateRecipesPacket,
  ClientboundUpdateTagsPacket,
  ClientGameHandler,
} from "./clientbound.ts";

export class GameProtocol extends Protocol<ServerGameHandler, ClientGameHandler> {
  constructor() {
    super();
    this.registerServerbound(0, ServerboundAcceptTeleportationPacket);
    this.registerServerbound(1, ServerboundBlockEntityTagQueryPacket);
    this.registerServerbound(2, ServerboundChangeDifficultyPacket);
    this.registerServerbound(3, ServerboundChatAckPacket);
    this.registerServerbound(4, ServerboundChatCommandPacket);
    this.registerServerbound(5, ServerboundChatPacket);
    this.registerServerbound(6, ServerboundChatPreviewPacket);
    this.registerServerbound(7, ServerboundClientCommandPacket);
    this.registerServerbound(8, ServerboundClientInformationPacket);
    this.registerServerbound(9, ServerboundCommandSuggestionPacket);
    this.registerServerbound(10, ServerboundContainerButtonClickPacket);
    this.registerServerbound(11, ServerboundContainerClickPacket);
    this.registerServerbound(12, ServerboundContainerClosePacket);
    this.registerServerbound(13, ServerboundCustomPayloadPacket);
    this.registerServerbound(14, ServerboundEditBookPacket);
    this.registerServerbound(15, ServerboundEntityTagQueryPacket);
    this.registerServerbound(16, ServerboundInteractPacket);
    this.registerServerbound(17, ServerboundJigsawGeneratePacket);
    this.registerServerbound(18, ServerboundKeepAlivePacket);
    this.registerServerbound(19, ServerboundLockDifficultyPacket);
    this.registerServerbound(20, ServerboundMovePlayerPosPacket);
    this.registerServerbound(21, ServerboundMovePlayerPosRotPacket);
    this.registerServerbound(22, ServerboundMovePlayerRotPacket);
    this.registerServerbound(23, ServerboundMovePlayerStatusOnlyPacket);
    this.registerServerbound(24, ServerboundMoveVehiclePacket);
    this.registerServerbound(25, ServerboundPaddleBoatPacket);
    this.registerServerbound(26, ServerboundPickItemPacket);
    this.registerServerbound(27, ServerboundPlaceRecipePacket);
    this.registerServerbound(28, ServerboundPlayerAbilitiesPacket);
    this.registerServerbound(29, ServerboundPlayerActionPacket);
    this.registerServerbound(30, ServerboundPlayerCommandPacket);
    this.registerServerbound(31, ServerboundPlayerInputPacket);
    this.registerServerbound(32, ServerboundPongPacket);
    this.registerServerbound(33, ServerboundRecipeBookChangeSettingsPacket);
    this.registerServerbound(34, ServerboundRecipeBookSeenRecipePacket);
    this.registerServerbound(35, ServerboundRenameItemPacket);
    this.registerServerbound(36, ServerboundResourcePackPacket);
    this.registerServerbound(37, ServerboundSeenAdvancementsPacket);
    this.registerServerbound(38, ServerboundSelectTradePacket);
    this.registerServerbound(39, ServerboundSetBeaconPacket);
    this.registerServerbound(40, ServerboundSetCarriedItemPacket);
    this.registerServerbound(41, ServerboundSetCommandBlockPacket);
    this.registerServerbound(42, ServerboundSetCommandMinecartPacket);
    this.registerServerbound(43, ServerboundSetCreativeModeSlotPacket);
    this.registerServerbound(44, ServerboundSetJigsawBlockPacket);
    this.registerServerbound(45, ServerboundSetStructureBlockPacket);
    this.registerServerbound(46, ServerboundSignUpdatePacket);
    this.registerServerbound(47, ServerboundSwingPacket);
    this.registerServerbound(48, ServerboundTeleportToEntityPacket);
    this.registerServerbound(49, ServerboundUseItemOnPacket);
    this.registerServerbound(50, ServerboundUseItemPacket);
    this.registerClientbound(0, ClientboundAddEntityPacket);
    this.registerClientbound(1, ClientboundAddExperienceOrbPacket);
    this.registerClientbound(2, ClientboundAddPlayerPacket);
    this.registerClientbound(3, ClientboundAnimatePacket);
    this.registerClientbound(4, ClientboundAwardStatsPacket);
    this.registerClientbound(5, ClientboundBlockChangedAckPacket);
    this.registerClientbound(6, ClientboundBlockDestructionPacket);
    this.registerClientbound(7, ClientboundBlockEntityDataPacket);
    this.registerClientbound(8, ClientboundBlockEventPacket);
    this.registerClientbound(9, ClientboundBlockUpdatePacket);
    this.registerClientbound(10, ClientboundBossEventPacket);
    this.registerClientbound(11, ClientboundChangeDifficultyPacket);
    this.registerClientbound(12, ClientboundChatPreviewPacket);
    this.registerClientbound(13, ClientboundClearTitlesPacket);
    this.registerClientbound(14, ClientboundCommandSuggestionsPacket);
    this.registerClientbound(15, ClientboundCommandsPacket);
    this.registerClientbound(16, ClientboundContainerClosePacket);
    this.registerClientbound(17, ClientboundContainerSetContentPacket);
    this.registerClientbound(18, ClientboundContainerSetDataPacket);
    this.registerClientbound(19, ClientboundContainerSetSlotPacket);
    this.registerClientbound(20, ClientboundCooldownPacket);
    this.registerClientbound(21, ClientboundCustomChatCompletionsPacket);
    this.registerClientbound(22, ClientboundCustomPayloadPacket);
    this.registerClientbound(23, ClientboundCustomSoundPacket);
    this.registerClientbound(24, ClientboundDeleteChatPacket);
    this.registerClientbound(25, ClientboundDisconnectPacket);
    this.registerClientbound(26, ClientboundEntityEventPacket);
    this.registerClientbound(27, ClientboundExplodePacket);
    this.registerClientbound(28, ClientboundForgetLevelChunkPacket);
    this.registerClientbound(29, ClientboundGameEventPacket);
    this.registerClientbound(30, ClientboundHorseScreenOpenPacket);
    this.registerClientbound(31, ClientboundInitializeBorderPacket);
    this.registerClientbound(32, ClientboundKeepAlivePacket);
    this.registerClientbound(33, ClientboundLevelChunkWithLightPacket);
    this.registerClientbound(34, ClientboundLevelEventPacket);
    this.registerClientbound(35, ClientboundLevelParticlesPacket);
    this.registerClientbound(36, ClientboundLightUpdatePacket);
    this.registerClientbound(37, ClientboundLoginPacket);
    this.registerClientbound(38, ClientboundMapItemDataPacket);
    this.registerClientbound(39, ClientboundMerchantOffersPacket);
    this.registerClientbound(40, ClientboundMoveEntityPosPacket);
    this.registerClientbound(41, ClientboundMoveEntityPosRotPacket);
    this.registerClientbound(42, ClientboundMoveEntityRotPacket);
    this.registerClientbound(43, ClientboundMoveVehiclePacket);
    this.registerClientbound(44, ClientboundOpenBookPacket);
    this.registerClientbound(45, ClientboundOpenScreenPacket);
    this.registerClientbound(46, ClientboundOpenSignEditorPacket);
    this.registerClientbound(47, ClientboundPingPacket);
    this.registerClientbound(48, ClientboundPlaceGhostRecipePacket);
    this.registerClientbound(49, ClientboundPlayerAbilitiesPacket);
    this.registerClientbound(50, ClientboundPlayerChatHeaderPacket);
    this.registerClientbound(51, ClientboundPlayerChatPacket);
    this.registerClientbound(52, ClientboundPlayerCombatEndPacket);
    this.registerClientbound(53, ClientboundPlayerCombatEnterPacket);
    this.registerClientbound(54, ClientboundPlayerCombatKillPacket);
    this.registerClientbound(55, ClientboundPlayerInfoPacket);
    this.registerClientbound(56, ClientboundPlayerLookAtPacket);
    this.registerClientbound(57, ClientboundPlayerPositionPacket);
    this.registerClientbound(58, ClientboundRecipePacket);
    this.registerClientbound(59, ClientboundRemoveEntitiesPacket);
    this.registerClientbound(60, ClientboundRemoveMobEffectPacket);
    this.registerClientbound(61, ClientboundResourcePackPacket);
    this.registerClientbound(62, ClientboundRespawnPacket);
    this.registerClientbound(63, ClientboundRotateHeadPacket);
    this.registerClientbound(64, ClientboundSectionBlocksUpdatePacket);
    this.registerClientbound(65, ClientboundSelectAdvancementsTabPacket);
    this.registerClientbound(66, ClientboundServerDataPacket);
    this.registerClientbound(67, ClientboundSetActionBarTextPacket);
    this.registerClientbound(68, ClientboundSetBorderCenterPacket);
    this.registerClientbound(69, ClientboundSetBorderLerpSizePacket);
    this.registerClientbound(70, ClientboundSetBorderSizePacket);
    this.registerClientbound(71, ClientboundSetBorderWarningDelayPacket);
    this.registerClientbound(72, ClientboundSetBorderWarningDistancePacket);
    this.registerClientbound(73, ClientboundSetCameraPacket);
    this.registerClientbound(74, ClientboundSetCarriedItemPacket);
    this.registerClientbound(75, ClientboundSetChunkCacheCenterPacket);
    this.registerClientbound(76, ClientboundSetChunkCacheRadiusPacket);
    this.registerClientbound(77, ClientboundSetDefaultSpawnPositionPacket);
    this.registerClientbound(78, ClientboundSetDisplayChatPreviewPacket);
    this.registerClientbound(79, ClientboundSetDisplayObjectivePacket);
    this.registerClientbound(80, ClientboundSetEntityDataPacket);
    this.registerClientbound(81, ClientboundSetEntityLinkPacket);
    this.registerClientbound(82, ClientboundSetEntityMotionPacket);
    this.registerClientbound(83, ClientboundSetEquipmentPacket);
    this.registerClientbound(84, ClientboundSetExperiencePacket);
    this.registerClientbound(85, ClientboundSetHealthPacket);
    this.registerClientbound(86, ClientboundSetObjectivePacket);
    this.registerClientbound(87, ClientboundSetPassengersPacket);
    this.registerClientbound(88, ClientboundSetPlayerTeamPacket);
    this.registerClientbound(89, ClientboundSetScorePacket);
    this.registerClientbound(90, ClientboundSetSimulationDistancePacket);
    this.registerClientbound(91, ClientboundSetSubtitleTextPacket);
    this.registerClientbound(92, ClientboundSetTimePacket);
    this.registerClientbound(93, ClientboundSetTitleTextPacket);
    this.registerClientbound(94, ClientboundSetTitlesAnimationPacket);
    this.registerClientbound(95, ClientboundSoundEntityPacket);
    this.registerClientbound(96, ClientboundSoundPacket);
    this.registerClientbound(97, ClientboundStopSoundPacket);
    this.registerClientbound(98, ClientboundSystemChatPacket);
    this.registerClientbound(99, ClientboundTabListPacket);
    this.registerClientbound(100, ClientboundTagQueryPacket);
    this.registerClientbound(101, ClientboundTakeItemEntityPacket);
    this.registerClientbound(102, ClientboundTeleportEntityPacket);
    this.registerClientbound(103, ClientboundUpdateAdvancementsPacket);
    this.registerClientbound(104, ClientboundUpdateAttributesPacket);
    this.registerClientbound(105, ClientboundUpdateMobEffectPacket);
    this.registerClientbound(106, ClientboundUpdateRecipesPacket);
    this.registerClientbound(107, ClientboundUpdateTagsPacket);
  }
}

export const gameProtocol = new GameProtocol();

export * from "./serverbound.ts";
export * from "./clientbound.ts";

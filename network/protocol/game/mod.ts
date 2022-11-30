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

export const gameProtocol = new class GameProtocol extends Protocol<ServerGameHandler, ClientGameHandler> {
  constructor() {
    super();
    this.registerServerbound(0x00, ServerboundAcceptTeleportationPacket);
    this.registerServerbound(0x01, ServerboundBlockEntityTagQueryPacket);
    this.registerServerbound(0x02, ServerboundChangeDifficultyPacket);
    this.registerServerbound(0x03, ServerboundChatAckPacket);
    this.registerServerbound(0x04, ServerboundChatCommandPacket);
    this.registerServerbound(0x05, ServerboundChatPacket);
    this.registerServerbound(0x06, ServerboundChatPreviewPacket);
    this.registerServerbound(0x07, ServerboundClientCommandPacket);
    this.registerServerbound(0x08, ServerboundClientInformationPacket);
    this.registerServerbound(0x09, ServerboundCommandSuggestionPacket);
    this.registerServerbound(0x0a, ServerboundContainerButtonClickPacket);
    this.registerServerbound(0x0b, ServerboundContainerClickPacket);
    this.registerServerbound(0x0c, ServerboundContainerClosePacket);
    this.registerServerbound(0x0d, ServerboundCustomPayloadPacket);
    this.registerServerbound(0x0e, ServerboundEditBookPacket);
    this.registerServerbound(0x0f, ServerboundEntityTagQueryPacket);
    this.registerServerbound(0x10, ServerboundInteractPacket);
    this.registerServerbound(0x11, ServerboundJigsawGeneratePacket);
    this.registerServerbound(0x12, ServerboundKeepAlivePacket);
    this.registerServerbound(0x13, ServerboundLockDifficultyPacket);
    this.registerServerbound(0x14, ServerboundMovePlayerPosPacket);
    this.registerServerbound(0x15, ServerboundMovePlayerPosRotPacket);
    this.registerServerbound(0x16, ServerboundMovePlayerRotPacket);
    this.registerServerbound(0x17, ServerboundMovePlayerStatusOnlyPacket);
    this.registerServerbound(0x18, ServerboundMoveVehiclePacket);
    this.registerServerbound(0x19, ServerboundPaddleBoatPacket);
    this.registerServerbound(0x1a, ServerboundPickItemPacket);
    this.registerServerbound(0x1b, ServerboundPlaceRecipePacket);
    this.registerServerbound(0x1c, ServerboundPlayerAbilitiesPacket);
    this.registerServerbound(0x1d, ServerboundPlayerActionPacket);
    this.registerServerbound(0x1e, ServerboundPlayerCommandPacket);
    this.registerServerbound(0x1f, ServerboundPlayerInputPacket);
    this.registerServerbound(0x20, ServerboundPongPacket);
    this.registerServerbound(0x21, ServerboundRecipeBookChangeSettingsPacket);
    this.registerServerbound(0x22, ServerboundRecipeBookSeenRecipePacket);
    this.registerServerbound(0x23, ServerboundRenameItemPacket);
    this.registerServerbound(0x24, ServerboundResourcePackPacket);
    this.registerServerbound(0x25, ServerboundSeenAdvancementsPacket);
    this.registerServerbound(0x26, ServerboundSelectTradePacket);
    this.registerServerbound(0x27, ServerboundSetBeaconPacket);
    this.registerServerbound(0x28, ServerboundSetCarriedItemPacket);
    this.registerServerbound(0x29, ServerboundSetCommandBlockPacket);
    this.registerServerbound(0x2a, ServerboundSetCommandMinecartPacket);
    this.registerServerbound(0x2b, ServerboundSetCreativeModeSlotPacket);
    this.registerServerbound(0x2c, ServerboundSetJigsawBlockPacket);
    this.registerServerbound(0x2d, ServerboundSetStructureBlockPacket);
    this.registerServerbound(0x2e, ServerboundSignUpdatePacket);
    this.registerServerbound(0x2f, ServerboundSwingPacket);
    this.registerServerbound(0x30, ServerboundTeleportToEntityPacket);
    this.registerServerbound(0x31, ServerboundUseItemOnPacket);
    this.registerServerbound(0x32, ServerboundUseItemPacket);
    this.registerClientbound(0x00, ClientboundAddEntityPacket);
    this.registerClientbound(0x01, ClientboundAddExperienceOrbPacket);
    this.registerClientbound(0x02, ClientboundAddPlayerPacket);
    this.registerClientbound(0x03, ClientboundAnimatePacket);
    this.registerClientbound(0x04, ClientboundAwardStatsPacket);
    this.registerClientbound(0x05, ClientboundBlockChangedAckPacket);
    this.registerClientbound(0x06, ClientboundBlockDestructionPacket);
    this.registerClientbound(0x07, ClientboundBlockEntityDataPacket);
    this.registerClientbound(0x08, ClientboundBlockEventPacket);
    this.registerClientbound(0x09, ClientboundBlockUpdatePacket);
    this.registerClientbound(0x0a, ClientboundBossEventPacket);
    this.registerClientbound(0x0b, ClientboundChangeDifficultyPacket);
    this.registerClientbound(0x0c, ClientboundChatPreviewPacket);
    this.registerClientbound(0x0d, ClientboundClearTitlesPacket);
    this.registerClientbound(0x0e, ClientboundCommandSuggestionsPacket);
    this.registerClientbound(0x0f, ClientboundCommandsPacket);
    this.registerClientbound(0x10, ClientboundContainerClosePacket);
    this.registerClientbound(0x11, ClientboundContainerSetContentPacket);
    this.registerClientbound(0x12, ClientboundContainerSetDataPacket);
    this.registerClientbound(0x13, ClientboundContainerSetSlotPacket);
    this.registerClientbound(0x14, ClientboundCooldownPacket);
    this.registerClientbound(0x15, ClientboundCustomChatCompletionsPacket);
    this.registerClientbound(0x16, ClientboundCustomPayloadPacket);
    this.registerClientbound(0x17, ClientboundCustomSoundPacket);
    this.registerClientbound(0x18, ClientboundDeleteChatPacket);
    this.registerClientbound(0x19, ClientboundDisconnectPacket);
    this.registerClientbound(0x1a, ClientboundEntityEventPacket);
    this.registerClientbound(0x1b, ClientboundExplodePacket);
    this.registerClientbound(0x1c, ClientboundForgetLevelChunkPacket);
    this.registerClientbound(0x1d, ClientboundGameEventPacket);
    this.registerClientbound(0x1e, ClientboundHorseScreenOpenPacket);
    this.registerClientbound(0x1f, ClientboundInitializeBorderPacket);
    this.registerClientbound(0x20, ClientboundKeepAlivePacket);
    this.registerClientbound(0x21, ClientboundLevelChunkWithLightPacket);
    this.registerClientbound(0x22, ClientboundLevelEventPacket);
    this.registerClientbound(0x23, ClientboundLevelParticlesPacket);
    this.registerClientbound(0x24, ClientboundLightUpdatePacket);
    this.registerClientbound(0x25, ClientboundLoginPacket);
    this.registerClientbound(0x26, ClientboundMapItemDataPacket);
    this.registerClientbound(0x27, ClientboundMerchantOffersPacket);
    this.registerClientbound(0x28, ClientboundMoveEntityPosPacket);
    this.registerClientbound(0x29, ClientboundMoveEntityPosRotPacket);
    this.registerClientbound(0x2a, ClientboundMoveEntityRotPacket);
    this.registerClientbound(0x2b, ClientboundMoveVehiclePacket);
    this.registerClientbound(0x2c, ClientboundOpenBookPacket);
    this.registerClientbound(0x2d, ClientboundOpenScreenPacket);
    this.registerClientbound(0x2e, ClientboundOpenSignEditorPacket);
    this.registerClientbound(0x2f, ClientboundPingPacket);
    this.registerClientbound(0x30, ClientboundPlaceGhostRecipePacket);
    this.registerClientbound(0x31, ClientboundPlayerAbilitiesPacket);
    this.registerClientbound(0x32, ClientboundPlayerChatHeaderPacket);
    this.registerClientbound(0x33, ClientboundPlayerChatPacket);
    this.registerClientbound(0x34, ClientboundPlayerCombatEndPacket);
    this.registerClientbound(0x35, ClientboundPlayerCombatEnterPacket);
    this.registerClientbound(0x36, ClientboundPlayerCombatKillPacket);
    this.registerClientbound(0x37, ClientboundPlayerInfoPacket);
    this.registerClientbound(0x38, ClientboundPlayerLookAtPacket);
    this.registerClientbound(0x39, ClientboundPlayerPositionPacket);
    this.registerClientbound(0x3a, ClientboundRecipePacket);
    this.registerClientbound(0x3b, ClientboundRemoveEntitiesPacket);
    this.registerClientbound(0x3c, ClientboundRemoveMobEffectPacket);
    this.registerClientbound(0x3d, ClientboundResourcePackPacket);
    this.registerClientbound(0x3e, ClientboundRespawnPacket);
    this.registerClientbound(0x3f, ClientboundRotateHeadPacket);
    this.registerClientbound(0x40, ClientboundSectionBlocksUpdatePacket);
    this.registerClientbound(0x41, ClientboundSelectAdvancementsTabPacket);
    this.registerClientbound(0x42, ClientboundServerDataPacket);
    this.registerClientbound(0x43, ClientboundSetActionBarTextPacket);
    this.registerClientbound(0x44, ClientboundSetBorderCenterPacket);
    this.registerClientbound(0x45, ClientboundSetBorderLerpSizePacket);
    this.registerClientbound(0x46, ClientboundSetBorderSizePacket);
    this.registerClientbound(0x47, ClientboundSetBorderWarningDelayPacket);
    this.registerClientbound(0x48, ClientboundSetBorderWarningDistancePacket);
    this.registerClientbound(0x49, ClientboundSetCameraPacket);
    this.registerClientbound(0x4a, ClientboundSetCarriedItemPacket);
    this.registerClientbound(0x4b, ClientboundSetChunkCacheCenterPacket);
    this.registerClientbound(0x4c, ClientboundSetChunkCacheRadiusPacket);
    this.registerClientbound(0x4d, ClientboundSetDefaultSpawnPositionPacket);
    this.registerClientbound(0x4e, ClientboundSetDisplayChatPreviewPacket);
    this.registerClientbound(0x4f, ClientboundSetDisplayObjectivePacket);
    this.registerClientbound(0x50, ClientboundSetEntityDataPacket);
    this.registerClientbound(0x51, ClientboundSetEntityLinkPacket);
    this.registerClientbound(0x52, ClientboundSetEntityMotionPacket);
    this.registerClientbound(0x53, ClientboundSetEquipmentPacket);
    this.registerClientbound(0x54, ClientboundSetExperiencePacket);
    this.registerClientbound(0x55, ClientboundSetHealthPacket);
    this.registerClientbound(0x56, ClientboundSetObjectivePacket);
    this.registerClientbound(0x57, ClientboundSetPassengersPacket);
    this.registerClientbound(0x58, ClientboundSetPlayerTeamPacket);
    this.registerClientbound(0x59, ClientboundSetScorePacket);
    this.registerClientbound(0x5a, ClientboundSetSimulationDistancePacket);
    this.registerClientbound(0x5b, ClientboundSetSubtitleTextPacket);
    this.registerClientbound(0x5c, ClientboundSetTimePacket);
    this.registerClientbound(0x5d, ClientboundSetTitleTextPacket);
    this.registerClientbound(0x5e, ClientboundSetTitlesAnimationPacket);
    this.registerClientbound(0x5f, ClientboundSoundEntityPacket);
    this.registerClientbound(0x60, ClientboundSoundPacket);
    this.registerClientbound(0x61, ClientboundStopSoundPacket);
    this.registerClientbound(0x62, ClientboundSystemChatPacket);
    this.registerClientbound(0x63, ClientboundTabListPacket);
    this.registerClientbound(0x64, ClientboundTagQueryPacket);
    this.registerClientbound(0x65, ClientboundTakeItemEntityPacket);
    this.registerClientbound(0x66, ClientboundTeleportEntityPacket);
    this.registerClientbound(0x67, ClientboundUpdateAdvancementsPacket);
    this.registerClientbound(0x68, ClientboundUpdateAttributesPacket);
    this.registerClientbound(0x69, ClientboundUpdateMobEffectPacket);
    this.registerClientbound(0x6a, ClientboundUpdateRecipesPacket);
    this.registerClientbound(0x6b, ClientboundUpdateTagsPacket);
  }
}();

export * from "./serverbound.ts";
export * from "./clientbound.ts";

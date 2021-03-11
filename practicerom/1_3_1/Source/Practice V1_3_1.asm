// Donkey Kong 64 - Practice ROM
// By theballaam96
// http://www.twitter.com/tjballaam

[InCutscene]: 0x807444EC
[TransitionSpeed]: 0x807FD88C
[CutsceneWillPlay]: 0x8075533B
[MysteryWriteOffset]: 0x29C
[CurrentCharacter]: 0x36F
[KRoolRound]: 0x80750AD4
[MovesBase]:  0x807FC950 // End: 0x807FCB28
[MovesBaseSize]: 0x1D8
[PlayerOneColour]: 0x807552F4
[Mode]: 0x80755318
[TBVoidByte]: 0x807FBB63
[CurrentMap]: 0x8076A0A8
[DestExit]: 0x807444E8
[StorySkip]: 0x8074452C
[HelmTimerDisplay]: 0x80755348 // u32
[HelmTimerShown]: 0x80755350 // u8
[TempFlagBlock]: 0x807FDD90
[InSubmap]: 0x8076A170
[ParentMap]: 0x8076A172
[ParentExit]: 0x8076A174
[HelmTimer]: 0x80755348 // u32
[HelmTimerPaused]: 0x80713C9B // u8
[Lag]: 0x80744478 // u32
[KRoolTimerText]: 0x80754AD0
[FrameLag]: 0x8076AF10
[FrameReal]: 0x80767CC4
[RNG]: 0x80746A40 // u32
[BetaNinRWSkip]: 0x80755324 // u8
[Gamemode]: 0x80755314 // u8
[ObjectModel2Pointer]: 0x807F6000
[ObjectModel2Timer]: 0x8076A064
[ObjectModel2Count]: 0x807F6004
[ObjectModel2Count_Dupe]: 0x80747D70
[LoadingZoneArray]: 0x807FDCB4
[LoadingZoneArraySize]: 0x807FDCB0
[CutsceneIndex]: 0x807476F4
[CutsceneActive]: 0x807444EC
[CutsceneTypePointer]: 0x807476FC
[PreviousCameraState]: 0x807F5CF0
[CurrentCameraState]: 0x807F5CF2
[CameraStateChangeTimer]: 0x807F5CEC
[AutowalkPointer]: 0x807FD70C
[PositionWarpInfo]: 0x807FC918
[PositionWarpBitfield]: 0x8076AEE2
[PositionFloatWarps]: 0x8076AEE4 // f32 x 3
[SFXVolume]: 0x8074583C
[MusicVolume]: 0x80745840
[ChimpyCam]: 0x80744530
[ScreenRatio]: 0x807444C0

// Buttons
[L_Button]: 0x0020
[D_Up]: 0x0800
[D_Down]: 0x0400
[D_Left]: 0x0200
[D_Right]: 0x0100
[B_Button]: 0x4000
[A_Button]: 0x8000
[Z_Button]: 0x2000
[R_Button]: 0x0010

// MIPS ASM
[ReturnAddress]: 0x807FFFC0
[ReturnAddress2]: 0x807FFFC4
[ReturnAddress3]: 0x807FFFC8 // Compact Functions
[ReturnAddress4]: 0x807FFFBC

[VarStorage0]: 0x807FF5F0
[VarStorage1]: 0x807FF5F4
[VarStorage2]: 0x807FF5F8
[VarStorage3]: 0x807FF5FC

// OSD
[WriteTextZone]: 0x807FCAA0
[ControllerInput]: 0x80014DC4
[NewlyPressedControllerInput]: 0x807ECD66
[WarpY]: 69
[WipeY]: 117
[PauseMenuTextPointer]: 0x807FC7E0
[PauseMenuPointer]: 0x807FC640
[MaxCooldown]: 6
[MinCooldown]: 2

// ISG
[ISGActive]: 0x80755070
[ISGTimestamp]: 0x807F5CE0
[ISGPreviousFadeout]: 0x807F5D14
[CurrentTimestamp]: 0x80014FE0

// Tag Anywhere
[Player]: 0x807FBB4C
[SwapObject]: 0x807FC924
[Character]: 0x8074E77C
[Camera]: 0x807FB968
[StaticCamera]: 0x80764EBC // Is this in the stack?

// FUNCTIONS
[SetFlag]: 0x8073129C
[CheckFlag]: 0x8073110C
[PrintText]: 0x806ABB98
// a0 = HUD Pointer?
// a1 = x
// a2 = y
// a3 = scale
// sp[0x10] = String
[Malloc]: 0x80610FE8 // a0 = size
[SetHUDPointer]: 0x806A921C // a0 = malloc outcome
[PlaySFX]: 0x80609140 // a0 = Sound Effect, a1 = 0x7FFF, a2 = 427C0000, a3 = 0x3f800000, sp+0x10 = 0, sp + 0x14 = 0
[InitiateTransition]: 0x805FF378
[GetFlagBlockAddress]: 0x8060E25C
[IsAddressActor]: 0x8067AF44 // a0 = InputAddress, v0 = Output Bool
[GetTimestamp]: 0x800060B0 // v0 = Output u64
[DMAFileTransfer]: 0x80000450
[CancelCutscene]: 0x8061D4E4 // a0 = some actor addr
[SpawnObjectModelTwo]: 0x80632630
[PlaySong]: 0x80602A94

// Sound Effects
[Banana]: 0x2A0
[Okay]: 0x23C
[UhOh]: 0x150
[Bell]: 0x1F
[KLumsy]: 0x31C
[Wrong]: 0x98
[Potion]: 0x214
[AmmoPickup]: 0x157
[Coin]: 0x1D1
[BeepHigh]: 116
[BeepLow]: 117
[FeedMe]: 601
[Bounce]: 458
[TimerTock]: 143
[ChunkyFallTooFar]: 197
[Fire]: 234

// Variables
[MasterLevelCount]: 9
[SlideCap]: 5
[SpecialFlagsCount]: 52
[Slot3OptionCount]: 13
[DisplayTypeCount]: 8
[MovementStateIndex]: 6
[LoadingZoneTypesCount]: 5
[LoadingZoneMassCount]: 2
[FileStatusCount]: 3
[IndependentCheatCount]: 2
[LModesCount]: 4
[SongsCount]: 117
[TimerStartCount]: 3
[TimerFinishCount]: 4
[WarpMasterCount]: 12

// COLLECTABLES
[CollectableBase]: 0x807FCC40

// INTERNAL
[MenuOpen]: 0x807FFFFF // u8
[SpecialFlagIndex]: 0x807FFFFE // u8
[Slot3Position]: 0x807FFFFD // u8
[MenuPosition]: 0x807FFFFB // u8
[MenuActionCooldown]: 0x807FFFFA // u8 - Prevents crashes
[PauseMenuNextScreen]: 0x807FFFF9 // u8
[HasASavestate]: 0x807FFFF8 // u8 - Bool
[InBadMap]: 0x807FFFF7 // u8 - Bool
[MenuSavestateAction]: 0x807FFFF6 // u8 - 0 = Save, 1 = Load
[StickWasNonNeutral]: 0x807FFFF5 // u8 - Bool
[PauseMenuScreen]: 0x807FFFF4 // u8
[StoredMainMenuTextPointer]: 0x807FFFF0 // u32 pointer
[VariableDisplayOn]: 0x807FFFEF // u8
[ExtraSlotPosition]: 0x807FFFEE // u8
[SniperOn]: 0x807FFFED // u8
[SlamLevel]: 0x807FFFEC // u8
[CumulativeLag]: 0x807FFFE8 // u32
[ISGTimer]: 0x807FFFE0 // u64
[StoredLag]: 0x807FFFDC // u32
[StoredTime]: 0x807FFFD8 // u32
[StoredStart]: 0x807FFFD4 // u32
[StoredTimerMode]: 0x807FFFD3 // u8 - 0: Reset/Zeroed, 1: Started, 2: Stopped
[StoredRound]: 0x807FFFD2 // u8
[DisablePositionButtons]: 0x807FFFD1 // u8
[DisableTagAnywhere]: 0x807FFFD0 // u8
[SelectedMasterLevelIndex]: 0x807FFFCF // u8
[SelectedMapIndex]: 0x807FFFCE // u8
[SelectedMapCap]: 0x807FFFCD // u8
[MenuSlide]: 0x807FFFCC // u8
[SandstormAddress]: 0x807FFDFC // u32
[SandstormActive]: 0x807FFDFB // u8
[SandstormChange]: 0x807FFDFA // u8
[SandstormChangeCountdown]: 0x807FFDF9 // u8
[AutoPhaseStateOn]: 0x807FFDF8 // u8
[GiantKoshaTimerAddress]: 0x807FFDF4 // u32
[GiantKoshaTimerValue]: 0x807FFDF2 // u16
[DisplayText]: 0x807FFDE0 // 0x10
[InitialObjectModel2ArrayCount]: 0x807FFDDC // u32
[LZTypesShownBitfield]: 0x807FFDDB // u8 Bitfield
[LZTypesSelected]: 0x807FFDDA // u8
[LZMassSelected]: 0x807FFDD9 // u8
[InfiniteHealthCheatOn]: 0x807FFDD8 // u8
[LButtonCheatMode]: 0x807FFDD7 // u8
[SelectedFileStatus]: 0x807FFDD6 // u8
[SelectedLMode]: 0x807FFDD5 // u8
[SelectedIndependentCheat]: 0x807FFDD4 // u8
[TimerStartMode]: 0x807FFDD3 // u8
[TimerPauseMode]: 0x807FFDD2 // u8
[TimerFinishMode]: 0x807FFDD1 // u8
[SelectedMasterWarpLevel]: 0x807FFDD0 // u8
[TimerReduction]: 0x807FFDCC // u32 - Pause Menu
[TimerAfterReduction]: 0x807FFDC8 // u32
[SelectedSubWarpLevel]: 0x807FFDC7 // u8

// OSD Arrays
[NewPauseMenu]: 0x807FFF10 // 0x70
[LevelsArray]: 0x807FFF80 // 0x38
[SniperArray]: 0x807FF900 // 0x8
[SlamArray]: 0x807FF908 // 0x4
[Slot3Array]: 0x807FF90C // 0x20
[SandstormText]: 0x807FF990 // 0x4
[MovementStateText]: 0x807FF994 // 0x4
[LoadingZoneTypes]: 0x807FF998 // 0x14
[LoadingZoneMass]: 0x807FF9AC // 0x8

[MapsArray_Japes]: 0x807FF600 // 0x30
[MapsArray_Aztec]: 0x807FF630 // 0x38
[MapsArray_Factory]: 0x807FF668 // 0x3C
[MapsArray_Galleon]: 0x807FF6A4 // 0x50
[MapsArray_Fungi]: 0x807FF6F4 // 0x5C
[MapsArray_Caves]: 0x807FF750 // 0x58
[MapsArray_Castle]: 0x807FF7A8 // 0x5C
[MapsArray_HelmRool]: 0x807FF804 // 0x20
[MapsArray_Isles]: 0x807FF824 // 0x48
[MapsArray_Master]: 0x807FF86C // 0x30

[SpecialFlagsArray]: 0x807FF500

// SAVEPOSITION STORAGE
[SavedCameraPosition]: 0x807FFEA4 // 3x f32
[SavedVerticalSpeedComponents]: 0x807FFEB0 // 2x f32 (Velocity then Accel)
[SavedHVelocity]: 0x807FFEB4 // f32
[SavedFloor]: 0x807FFEBC // f32
[SavedStoredPosition1]: 0x807FFEC0 // 3x s16
[SavedStoredPosition2]: 0x807FFEC6 // 3x s16
[SavedRotations]: 0x807FFECC // u16 Rot Y (Facing), u16 Rot Z
[SavedPositions]: 0x807FFED0 // 3x f32
[SavedMovement]: 0x807FFEDC // u8
[SavedMovementProgress]: 0x807FFEDD // u8
[SavedPositionMap]: 0x807FFEDE // u8
[SavedBoneArrayCounter]: 0x807FFEDF // u8 (Temp for loading)

// Savestates
[SavedKongBase]: 0x807FFA00 // 0x1D8 in size
[SavedPositions_State]: 0x807FFBD8 // f32 x 3
[SavedCollectableBase]: 0x807FFBF0 // 0x10
[SavedMap]: 0x807FFC00 // u8
[SavedExit]: 0x807FFC01 // u8
[SavedCharacter]: 0x807FFC02 // u8
[SavedParentMap]: 0x807FFC03 // u8
[SavedParentExit]: 0x807FFC04 // u8
[SavedInSubmap]: 0x807FFC05 // u8
[SavedPermanentFlags]: 0x807FFC20 // 0x13B in size
[SavedTemporaryFlags]: 0x807FFC10 // 0x10 in size 

.org 0x805FC164 // retroben's hook but up a few functions
J Start

// .org 0x80600674 // Lag Hook
// J 	UpdateLag
// NOP

.org 0x8000072C // Boot
J 	LoadInAdditionalFile
NOP

// .org 0x80646074 // GK Timer Hook
// J 	GrabGKTimerAddress
// NOP

// .org 0x806F3750 // Kong hook
// J 	KongCode
// NOP

// Start in Isles
.org 0x80714544
ADDIU 		a0, r0, 0x22 // Set destination map to be Isles

.org 0x80714558
ADDIU 		a1, r0, 0x0 // Set destination exit to Exit 0

.org 0x8000DE88 // 0x00DE88 > 0x00EDDA. EDD1 seems the safe limit before overwriting data.

Start:
	// Run the code we replaced
	JAL     0x805FC2B0
	NOP
	// Load in pointer to alt menu
	LW 		a1, @StoredMainMenuTextPointer
	BNEZ 	a1, SetOtherVariables // Text pointer not loaded in
	LI 		a2, @NewPauseMenu
	LI 		a1, @StoredMainMenuTextPointer
	SW 		a2, 0x0(a1)

	SetOtherVariables:
		// Lag Hook - NOTE: UPDATE ON EVERY REVISION
		LI 		a1, 0x080003E7
		SW 		a1, 0x80600674
		SW 		r0, 0x80600678
		// GK Timer Hook - NOTE: UPDATE ON EVERY REVISION
		LI 		a1, 0x0817700F
		SW 		a1, 0x80646074
		SW 		r0, 0x80646078
		// Kong Hook - NOTE: UPDATE ON EVERY REVISION
		LI 		a1, 0x081772B6
		SW 		a1, 0x806F3750
		SW 		r0, 0x806F3754
		// Skip Rap/DK TV
		LBU 	t3, @Gamemode
		LI 		a1, 1 		// Nin/RW Skip
		LI 		a2, 0x50 	// Dest Map
		BEQ 	a1, t3, SetSkip
		LI 		a3, 5 		// Dest GM
		LI 		a1, 0 		// Nin/RW Skip

		SetSkip:
			SB 		a1, @BetaNinRWSkip
			SB 		a2, 0x807132BF // Set Destination Map after N/R Logos to Main Menu
			SB 		a3, 0x807132CB // Set Gamemode after N/R Logos to Main Menu Mode
			// Story Skip On
			LI 		t3, 1
			SB 		t3, @StorySkip
			// Turn off BoM Timer
			SB 		r0, @HelmTimerPaused
			SW 		r0, 0x80713DE0 // NOP out a line so that helm timeout is prevented
			// Unlock Mystery Menu
			LI      t6, 0x807ED558
			LI      t0, -1
			SD      t0, 0(t6)
			// Set K Rool to round 11 (Cause the sound effect is the best one)
			LBU 	t0, @InCutscene
			LI 		t6, 6
			BEQ 	t0, t6, TransitionFunctions
			LUI 	t6, 0x3F80 // f32 = 1
			LW 		t0, @TransitionSpeed
			BNE 	t0, t6, EveryFrameFunctions
			NOP

	TransitionFunctions:
		LW 		t6, @RNG
		LI 		a0, 11 // Max Round (RNG % a0). Range 0 - 10
		DIVU 	t6, a0
		MFHI 	t6
		ADDIU 	t6, t6, 1 // Add offset of 1
		SB 		t6, @StoredRound
		// Waterfall CS
		JAL 	CodedSetPermFlag
		LI      a0, 378
		// Escape CS
		JAL 	CodedSetPermFlag
		LI      a0, 390
		JAL 	UpdateLevelArray
		NOP
		JAL 	PopulateSpecialFlagsArray
		NOP
		JAL 	PopulateBetterWarpingArray
		NOP
		JAL 	CreateLZTypesArrays
		NOP

	EveryFrameFunctions:
		JAL 	ChangeColour
		NOP
		LBU 	a0, @StoredRound
		LBU 	a1, @DisableTagAnywhere
		BNEZ 	a1, EveryFrameFunctions2
		SB 		a0, @KRoolRound
		JAL 	TagAnywhere
		NOP
		
	EveryFrameFunctions2:
		JAL 	ChangeSelectedMap
		NOP
		JAL 	ToggleSpecialFlag
		NOP
		JAL 	UpdateAltMenu
		NOP
		JAL 	OpenMenu
		NOP
		JAL 	UpdateMenuPosition
		NOP
		JAL 	AlterMenuCode
		NOP
		JAL 	GlobalSavestateHandler
		NOP
		JAL 	CheckMapType
		NOP
		JAL 	VariableDisplay
		NOP
		JAL 	UpdateSlot3Arrays
		NOP
		JAL 	HandleSlot3
		NOP
		JAL 	ResetCLagCounter
		NOP
		JAL 	ChangeMenuSlide
		NOP
		JAL 	HandleSecondSlide
		NOP
		JAL 	CorrectSpecialFlagsArray
		NOP
		JAL 	GrabSandstormAddress
		NOP
		JAL 	UpdateSandstormText
		NOP
		JAL 	ToggleAztecSandstorm
		NOP
		JAL 	GetGKTimer
		NOP
		JAL 	UpdateMovementStateText
		NOP
		JAL 	SpawnLZIndicators
		NOP
		JAL 	CorrectLZTypesArray
		NOP
		JAL 	HandleThirdSlide
		NOP
		JAL 	HandleFourthSlide
		NOP
		JAL 	HandleFifthSlide
		NOP
		JAL 	HandleSlideSix
		NOP
		JAL 	InfiniteHealth
		NOP
		JAL 	UpdateIndependentCheatText
		NOP
		JAL 	LToLevitate
		NOP
		JAL 	LToCancelCS
		NOP
		JAL 	HandleTimer
		NOP
		// JAL 	MenuHeader
		// NOP
		// LA 		s0, List_EveryFrameFunctions

		//FunctionLoop:
		//	LW 		a1, 0x0(s0)
		//	BEQZ 	a1, Finish
		//	NOP
		//	JALR 	a1
		//	NOP
		//	ADDIU 	s0, s0, 4
		//	B 		FunctionLoop
		//	NOP


	Finish:
		J       0x805FC15C // retroben's hook but up a few functions
		NOP

// Position Savestate
PositionSavestates:
	SW 		ra, @ReturnAddress

	CheckLeft:
		LH 		a1, @NewlyPressedControllerInput
		ANDI 	a1, a1, @D_Left
		BEQZ 	a1, CheckRight
		NOP 
		B 		LoadPosition
		NOP

	CheckRight:
		LH 		a1, @NewlyPressedControllerInput
		ANDI 	a1, a1, @D_Right
		BEQZ 	a1, FinishPositionWrite
		NOP

	SavePosition:
		LW 		a1, @Player
		// Actual Positions
		LI 		a3, @SavedPositions
		LW 		a2, 0x7C (a1) // X Position
		SW 		a2, 0x0 (a3)
		LW 		a2, 0x80 (a1) // Y Position
		SW 		a2, 0x4 (a3)
		LW 		a2, 0x84 (a1) // Z Position
		SW 		a2, 0x8 (a3)
		// Stored Position
		LW 		a2, 0x4 (a1) // Rendering Params Pointer
		LW 		a0, 0x14 (a2) // Bone Array 1
		LI 		a3, @SavedStoredPosition1
		LH 		t9, 0x58 (a0)
		SH 		t9, 0x0 (a3)
		LH 		t9, 0x5A (a0)
		SH 		t9, 0x2 (a3)
		LH 		t9, 0x5C (a0)
		SH 		t9, 0x4 (a3)
		LW 		a0, 0x18 (a2) // Bone Array 2
		LI 		a3, @SavedStoredPosition2
		LH 		t9, 0x58 (a0)
		SH 		t9, 0x0 (a3)
		LH 		t9, 0x5A (a0)
		SH 		t9, 0x2 (a3)
		LH 		t9, 0x5C (a0)
		SH 		t9, 0x4 (a3)
		// Facing Angle
		LI 		a3, @SavedRotations
		LHU		a2, 0xE6 (a1)
		SH 		a2, 0x0 (a3)
		LHU		a2, 0xE8 (a1)
		SH 		a2, 0x2 (a3)
		// Speed/Accel
		LI 		a3, @SavedHVelocity
		LW 		a2, 0xB8 (a1)
		SW 		a2, 0x0 (a3)
		LI 		a3, @SavedVerticalSpeedComponents
		LW 		a2, 0xC0 (a1)
		SW 		a2, 0x0 (a3)
		LW 		a2, 0xC4 (a1)
		SW 		a2, 0x4 (a3)
		// Floor
		LI 		a3, @SavedFloor
		LW 		a2, 0xA4 (a1)
		SW 		a2, 0x0 (a3)
		// Saved Boolean
		LW 		a1, @CurrentMap
		SB 		a1, @SavedPositionMap
		// Play Bell SFX
		JAL 	CodedPlaySFX
		LI 		a0, @Bell
		B 		FinishPositionWrite
		NOP

	LoadPosition:
		LBU 	a1, @SavedPositionMap
		LW 		a3, @CurrentMap
		BNE 	a1, a3, FinishPositionWrite // If not equal to the last stored map, prevent write
		NOP
		SW 		r0, @StoredTime
		SB 		r0, @StoredTimerMode
		LW 		a1, @Player
		// Actual Positions
		LI 		a3, @SavedPositions
		LW 		a2, 0x0 (a3) // X
		SW 		a2, 0x7C (a1)
		LW 		a2, 0x4 (a3) // Y
		SW 		a2, 0x80 (a1)
		LW 		a2, 0x8 (a3) // Z
		SW 		a2, 0x84 (a1)
		LW 		a0, @AutowalkPointer
		BEQZ 	a0, LoadStoredPosition
		NOP
		LW 		a2, 0x0 (a3) // X
		MTC1 	a2, f0
		CVT.W.S f0, f0
		MFC1 	a2, f0
		SH 		a2, 0x12 (a0)
		LW 		a2, 0x8 (a3) // Z
		MTC1 	a2, f0
		CVT.W.S f0, f0
		MFC1 	a2, f0
		SH 		a2, 0x16 (a0)


	LoadStoredPosition:
		// Stored Position
		LBU 	a2, 0x63 (a1)
		ANDI 	a2, a2, 4
		BNEZ 	a2, LoadSkew
		LW 		a2, 0x4 (a1) // Rendering Params Pointer
		LW 		a0, 0x14 (a2) // Bone Array 1
		LI 		a3, @SavedStoredPosition1
		LH 		t9, 0x0 (a3)
		SH 		t9, 0x58 (a0)
		LH 		t9, 0x2 (a3)
		SH 		t9, 0x5A (a0)
		LH 		t9, 0x4 (a3)
		SH 		t9, 0x5C (a0)
		LW 		a0, 0x18 (a2) // Bone Array 2
		LI 		a3, @SavedStoredPosition2
		LH 		t9, 0x0 (a3)
		SH 		t9, 0x58 (a0)
		LH 		t9, 0x2 (a3)
		SH 		t9, 0x5A (a0)
		LH 		t9, 0x4 (a3)
		SH 		t9, 0x5C (a0)


	LoadSkew:
		// Facing & Skew Angle
		LI 		a3, @SavedRotations
		LHU		a2, 0x0 (a3)
		SH 		a2, 0xE6 (a1)
		LHU		a2, 0x2 (a3)
		SH 		a2, 0xE8 (a1)
		// Speed/Accel
		LI 		a3, @SavedHVelocity
		LW 		a2, 0x0 (a3)
		SW 		a2, 0xB8 (a1)
		LI 		a3, @SavedVerticalSpeedComponents
		LW 		a2, 0x0 (a3)
		SW 		a2, 0xC0 (a1)
		LW 		a2, 0x4 (a3)
		SW 		a2, 0xC4 (a1)
		// Floor
		LI 		a3, @SavedFloor
		LW 		a2, 0x0 (a3)
		SW 		a2, 0xA4 (a1)
		// Collision
		SW 		r0, 0x13C (a1)
		SB 		r0, 0x110 (a1)

	FinishPositionWrite:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

// Toggle special flag
ToggleSpecialFlag:
	SW 		ra, @ReturnAddress
	LBU 	a1, @MenuOpen
	BEQZ 	a1, FinishWarp // Menu not open
	NOP
	LBU 	a1, @MenuSlide
	BNEZ 	a1, FinishWarp // Not on slide 1
	NOP
	LBU 	a1, @MenuPosition
	BNEZ 	a1, FinishWarp // Menu not in position 0
	NOP
	LH 		a1, @NewlyPressedControllerInput
	ANDI 	a1, a1, @A_Button
	BEQZ 	a1, FinishWarp // A not pressed
	
	LA 		a1, SpecialFlags_flags
	LBU 	a2, @SpecialFlagIndex
	SLL 	a3, a2, 1
	ADD 	a1, a1, a3
	LHU		a0, 0x0 (a1)
	LA 		a3, SpecialFlags_flagType
	ADD 	a3, a3, a2
	LBU 	a1, 0x0 (a3)
	SW 		a0, @VarStorage0
	SW 		a1, @VarStorage1
	JAL 	@CheckFlag
	NOP
	LW 		a1, @VarStorage1
	LW 		a0, @VarStorage0
	LI 		t6, 1
	ADDIU 	a2, a1, 0
	JAL     @SetFlag
	SUBU 	a1, t6, v0

	FinishWarp:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

// Detect opening of menu
OpenMenu:
	SW 		ra, @ReturnAddress
	LBU 	a1, @TBVoidByte
	ANDI 	a1, a1, 2
	BEQZ 	a1, CorrectStoredPointer
	NOP
	// Pause Menu is open
	LBU 	a1, @PauseMenuScreen
	BNEZ 	a1, FinishOpenMenu
	NOP
	// Pause Menu is not transitioning to a non-zero screen
	LBU 	a1, @PauseMenuNextScreen
	BNEZ 	a1, FinishOpenMenu
	NOP
	// Not on main screen
	LHU 	a1, @NewlyPressedControllerInput
	ANDI 	a3, a1, 0xA010 // AZR not pressed
	BNEZ 	a3, FinishOpenMenu
	NOP
	// A not pressed
	ANDI 	a1, a1, @D_Up
	BEQZ 	a1, FinishOpenMenu
	NOP
	// D-Up Pressed
	// Set default savestate option
	LBU 	a3, @HasASavestate
	SB 		a3, @MenuSavestateAction
	// Toggle Menu Byte
	LI 		a3, @MenuOpen
	LBU 	a1, 0x0(a3)
	LI 		a2, 1
	SUBU 	a1, a2, a1
	SB 		a1, 0x0(a3)
	// BEQZ 	a1, OpenMenu_DefaultMenu
	// NOP
	// LW 		a2, @RNG
	// LI 		a1, @SongsCount
	// DIVU 	a2, a1
	// MFHI 	a2
	// LA 		a1, ToolsMenu_Songs
	// ADD 	a1, a1, a2
	// LBU 	a0, 0x0 (a1) // Song
	// JAL 	@PlaySong
	// LUI 	a1, 0x3F80 // Volume
	// B 		OpenMenu_Others
	// NOP

	// OpenMenu_DefaultMenu:
	// 	LUI 	a1, 0x3F80 // Volume
	// 	JAL 	@PlaySong
	// 	LI 		a0, 34 // Pause Menu Song

	OpenMenu_Others:
		// Reset File State
		SB 		r0, @SelectedFileStatus

		// Match L Mode
		LBU 	a1, @LButtonCheatMode
		SB 		a1, @SelectedLMode

		// Swap Pointers
		LW 		a1, @PauseMenuTextPointer
		LW 		a2, @StoredMainMenuTextPointer
		SW 		a2, @PauseMenuTextPointer
		SW 		a1, @StoredMainMenuTextPointer
		B 		FinishOpenMenu
		NOP

	CorrectStoredPointer:
		LI 		a1, @NewPauseMenu
		SW 		a1, @StoredMainMenuTextPointer
		SB 		r0, @MenuOpen

	FinishOpenMenu:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

CodedSetPermFlag:
	// a0 is parameter for encoded flag
	SW 		ra, @ReturnAddress3
	LI      a1, 1
	JAL     @SetFlag
	LI      a2, 0
	LW 		ra, @ReturnAddress3
	JR 		ra
	NOP

CodedPlaySFX:
	// a0 is paramater for sound effect index
	SW 		ra, @ReturnAddress3
	LI 		a1, 0x7FFF
	LUI 	a2, 0x427C
	LUI		a3, 0x3F80
	SW 		r0, 0x10 (sp)
	JAL 	@PlaySFX
	SW 		r0, 0x14 (sp)
	LW 		ra, @ReturnAddress3
	JR 		ra
	NOP

UpdateMenuPosition:
	SW 		ra, @ReturnAddress3
	LW 		a0, @PauseMenuPointer
	JAL 	@IsAddressActor
	NOP
	BEQZ 	v0, FinishMenuPositionUpdate
	LI 		a1, 95 // Pause Menu Actor
	LW 		a0, @PauseMenuPointer
	LW 		a2, 0x58(a0)
	BNE 	a1, a2, FinishMenuPositionUpdate
	LBU 	a1, 0x18F(a0)
	SB 		a1, @MenuPosition
	LBU 	a1, 0x197(a0)
	SB 		a1, @PauseMenuScreen
	LBU 	a1, 0x18B(a0)
	SB 		a1, @PauseMenuNextScreen

	FinishMenuPositionUpdate:
		LW 		ra, @ReturnAddress3
		JR 		ra
		NOP

// OSD Map - Repurposed for other slots
ChangeSelectedMap:
	SW 		ra, @ReturnAddress

	// Tick Down Menu Cooldown
	TickCooldown:
		LBU 	a1, @MenuActionCooldown
		BEQZ 	a1, CheckMenuOpen
		ADDI 	a1, a1, -1
		SB 		a1, @MenuActionCooldown

	CheckMenuOpen:
		LBU 	a1, @MenuOpen
		BEQZ 	a1, FinishChange // Menu not open
		NOP
		LBU 	a1, @MenuSlide
		BNEZ 	a1, CheckMenuOpen_SlideTwo // Not on slide 1
		LI 		a3, @SpecialFlagsCount
		LBU 	a1, @MenuPosition
		BEQZ 	a1, IsMapSlot // Position 0
		LI 		a2, 1
		LBU 	a3, @HasASavestate // Slot 2 Cap
		BEQ 	a1, a2, IsSaveSlot
		NOP
		B 		IsSlot3 // Position 2
		LI 		a3, @Slot3OptionCount // Slot 3 Options

	CheckMenuOpen_SlideTwo:
		LBU 	a1, @MenuSlide
		LI 		a2, 1
		BNE 	a1, a2, CheckMenuOpen_SlideThree
		NOP
		LBU 	a1, @MenuPosition
		BEQZ 	a1, FinishChange
		NOP
		LBU 	a2, @SelectedMasterLevelIndex
		LA 		a3, Maps_Counts
		ADD 	a3, a3, a2
		LBU 	a3, 0x0 (a3)
		SB 		a3, @SelectedMapCap
		LI 		a3, @MasterLevelCount
		// Master Level
		LI 		a2, 1
		BEQ 	a1, a2, IsMasterLevelSlot
		NOP
		// Sub Level
		LBU 	a3, @SelectedMapCap
		B 		IsSubLevelSlot
		NOP

	CheckMenuOpen_SlideThree:
		LBU 	a1, @MenuSlide
		LI 		a2, 2
		BNE 	a1, a2, CheckMenuOpen_SlideFour
		NOP
		LBU 	a1, @MenuPosition
		BEQZ 	a1, FinishChange
		NOP
		LI 		a3, @LoadingZoneTypesCount 
		LI 		a2, 1
		BEQ 	a1, a2, IsIndivLZSlot
		NOP
		LI 		a3, @LoadingZoneMassCount
		B 		IsMassLZSlot
		NOP

	CheckMenuOpen_SlideFour:
		LBU 	a1, @MenuSlide
		LI 		a2, 3
		BNE 	a1, a2, CheckMenuOpen_SlideFive
		NOP
		B 		FinishChange
		NOP

	CheckMenuOpen_SlideFive:
		LBU 	a1, @MenuSlide
		LI 		a2, 4
		BNE 	a1, a2, CheckMenuOpen_SlideSix
		NOP
		LBU 	a1, @MenuPosition
		LI 		a3, @WarpMasterCount
		BEQZ 	a1, IsMasterWarpSlot
		NOP
		LA 		a3, Warps_Master_Length
		LBU 	a2, @SelectedMasterWarpLevel
		ADD 	a3, a3, a2
		LBU 	a3, 0x0 (a3)
		LI 		a2, 1
		BEQ 	a1, a2, IsSubWarpSlot
		NOP
		B 		FinishChange
		NOP

	CheckMenuOpen_SlideSix:
		LBU 	a1, @MenuPosition
		LI 		a3, @FileStatusCount
		BEQZ 	a1, IsFileStatusSlot
		LI 		a2, 1
		LI 		a3, @IndependentCheatCount
		BEQ 	a1, a2, IsIndependentCheatSlot
		NOP
		LI 		a3, @LModesCount
		B 		IsLModeSlot
		NOP

	// t9 = Index addr
	// a3 = Cap
	IsMapSlot:
		LI 		t9, @SpecialFlagIndex
		B 		CheckMenuCooldown
		NOP

	IsSaveSlot:
		LI 		t9, @MenuSavestateAction
		SLL 	a3, a3, 1
		ADDIU 	a3, a3, 1 // 1 or 3
		B 		CheckMenuCooldown
		NOP

	IsSlot3:
		LI 		t9, @Slot3Position
		B 	 	CheckMenuCooldown
		NOP

	IsMasterLevelSlot:
		LI 		t9, @SelectedMasterLevelIndex
		B 		CheckMenuCooldown
		NOP

	IsSubLevelSlot:
		LI 		t9, @SelectedMapIndex
		B 		CheckMenuCooldown
		NOP

	IsIndivLZSlot:
		LI 		t9, @LZTypesSelected
		B 		CheckMenuCooldown
		NOP

	IsMassLZSlot:
		LI 		t9, @LZMassSelected
		B 		CheckMenuCooldown
		NOP

	IsFileStatusSlot:
		LI 		t9, @SelectedFileStatus
		B 		CheckMenuCooldown
		NOP

	IsIndependentCheatSlot:
		LI 		t9, @SelectedIndependentCheat
		B 		CheckMenuCooldown
		NOP

	IsLModeSlot:
		LI 		t9, @SelectedLMode
		B 		CheckMenuCooldown
		NOP

	IsTimerStartSlot:
		LI 		t9, @TimerStartMode
		B 		CheckMenuCooldown
		NOP

	IsTimerPauseSlot:
		LI 		t9, @TimerPauseMode
		B 		CheckMenuCooldown
		NOP

	IsTimerFinishSlot:
		LI 		t9, @TimerFinishMode
		B 		CheckMenuCooldown
		NOP

	IsMasterWarpSlot:
		LI 		t9, @SelectedMasterWarpLevel
		B 		CheckMenuCooldown
		NOP

	IsSubWarpSlot:
		LI 		t9, @SelectedSubWarpLevel
		B 		CheckMenuCooldown
		NOP

	CheckMenuCooldown:
		LBU 	a2, @MenuActionCooldown
		BNEZ 	a2, FinishChange // Cooldown isn't at 0
		NOP
		LI 		a2, @ControllerInput
		LB 		a1, 0x2(a2) // Controller Stick X
		ADDIU 	a1, a1, 40
		BGTZ 	a1, CheckMenuRight
		NOP
		LBU 	a1, @MenuSlide
		LI 		a0, 1
		BNE 	a0, a1, CheckMenuCooldown_0
		NOP
		LBU 	a1, @MenuPosition
		BNE 	a0, a1, CheckMenuCooldown_1
		NOP
		SB 		r0, @SelectedMapIndex
		B 		CheckMenuCooldown_1
		NOP

	CheckMenuCooldown_0:
		LBU 	a1, @MenuSlide
		LI 		a0, 4
		BNE 	a0, a1, CheckMenuCooldown_1
		NOP
		LBU 	a1, @MenuPosition
		BNEZ 	a1, CheckMenuCooldown_1
		NOP
		SB 		r0, @SelectedSubWarpLevel

	CheckMenuCooldown_1:
		LBU 	a1, 0x0(t9)
		BEQZ 	a1, LoopToEnd // If array index == 0, loop to end
		NOP
		B 		SetChange
		ADDI 	a1, a1, -1

	CheckMenuRight:
		LB 		a1, 0x2(a2)
		ADDI 	a1, a1, -40
		BLEZ 	a1, FinishChange
		NOP
		LBU 	a1, @MenuSlide
		LI 		a0, 1
		BNE 	a0, a1, CheckMenuRight_0
		NOP
		LBU 	a1, @MenuPosition
		BNE 	a0, a1, CheckMenuRight_1
		NOP
		SB 		r0, @SelectedMapIndex

	CheckMenuRight_0:
		LBU 	a1, @MenuSlide
		LI 		a0, 4
		BNE 	a0, a1, CheckMenuRight_1
		NOP
		LBU 	a1, @MenuPosition
		BNEZ 	a1, CheckMenuRight_1
		NOP
		SB 		r0, @SelectedSubWarpLevel

	CheckMenuRight_1:
		LBU 	a1, 0x0(t9)
		ADDIU 	a1, a1, 1
		BNE 	a1, a3, SetChange
		NOP

	LoopToStart:
		B 		SetChange
		LI 		a1, 0

	LoopToEnd:
		B 		SetChange
		ADDI 	a1, a3, -1

	SetChange:
		SB 		a1, 0x0(t9)
		// Play Banana SFX
		JAL 	CodedPlaySFX
		LI 		a0, @Banana
		// Decrement Max Cooldown
		LH 		a1, @ControllerInput
		ANDI 	a1, a1, @L_Button
		BEQZ 	a1, SetChange_Max
		NOP
		B 		SetChange_Set
		LI 		a1, @MinCooldown

	SetChange_Max:
		LI 		a1, @MaxCooldown

	SetChange_Set:
		SB 		a1, @MenuActionCooldown

	FinishChange:
		LW 		ra, @ReturnAddress 
		JR 		ra
		NOP

// Alter pause menu code
AlterMenuCode:
	LBU 	a0, @MenuOpen
	BEQZ 	a0, NormalCode
	LUI		a1, 0x806B

	PatchedCode:
		// Z
		SH 	r0, 0x8662(a1) //0x806A8662
		// R
		SH 	r0, 0x862A(a1) //0x806A862A
		// A
		SH 	r0, 0x871E(a1) //0x806A871E
		JR 	ra
		SH 	r0, 0x87FA(a1) //0x806A87FA

	NormalCode:
		// Z
		LI 	a0, @Z_Button
		SH 	a0, 0x8662(a1) //0x806A8662
		// R
		LI 	a0, @R_Button
		SH 	a0, 0x862A(a1) //0x806A862A
		// A
		LI 	a0, @A_Button
		SH 	a0, 0x871E(a1) //0x806A871E
		JR 	ra
		SH 	a0, 0x87FA(a1) //0x806A87FA

// Savestate Handler
GlobalSavestateHandler:
	SW 		ra, @ReturnAddress
	LBU 	a1, @MenuSlide
	BNEZ 	a1, FinishStateHandler // Menu not on slide 1
	NOP
	LBU 	a1, @MenuOpen
	BEQZ 	a1, FinishStateHandler // Menu not open
	NOP
	LBU 	a1, @MenuPosition
	LI 		a2, 1
	BNE 	a1, a2, FinishStateHandler // Menu not in position 1
	NOP
	LH 		a1, @NewlyPressedControllerInput
	ANDI 	a1, a1, @A_Button
	BEQZ 	a1, FinishStateHandler // A not pressed
	NOP
	LBU 	a1, @InBadMap
	BNEZ 	a1, Nope
	NOP
	JAL 	@GetFlagBlockAddress
	ADDIU 	a0, r0, 0 // Flag Type 0 (Permanent)
	LI 		a0, 0x13C
	LBU 	a1, @MenuSavestateAction
	BNEZ 	a1, Handler_Load
	ADDIU 	a3, v0, 0 // Copy v0
	B 		Handler_Save
	NOP

	Nope:
		JAL 	CodedPlaySFX
		LI 		a0, @Wrong
		B 		FinishStateHandler
		NOP

	Handler_Save:
		LI 		a1, 1
		SB 		a1, @HasASavestate
		LI 		a1, @SavedPermanentFlags

		ReadFlags:
			LW 		a2, 0x0(a3)
			SW 		a2, 0x0(a1)
			BEQZ 	a0, SaveMap
			ADDI 	a0, a0, -4
			ADDIU 	a3, a3, 4
			B 		ReadFlags
			ADDIU 	a1, a1, 4

		SaveMap:
			// Play "Okay" SFX
			JAL 	CodedPlaySFX
			LI 		a0, @Okay
			LI 		a0, @MovesBase
			LI 		a1, @MovesBaseSize
			LI 		a2, @SavedKongBase
		
			SaveKongBase:
				// Store Kong Base
				LW 		a3, 0x0(a0)
				SW 		a3, 0x0(a2)
				BEQZ 	a1, SaveKongPosition
				ADDIU 	a0, a0, 4
				ADDIU  	a2, a2, 4
				B 		SaveKongBase
				ADDI 	a1, a1, -4

		SaveKongPosition:
			LW 		a0, @Player
			BEQZ 	a0, SaveMapVars
			NOP
			LI 		a2, @SavedPositions_State
			LW 		a1, 0x7C (a0)
			SW 		a1, 0x0 (a2)
			LW 		a1, 0x80 (a0)
			SW 		a1, 0x4 (a2)
			LW 		a1, 0x84 (a0)
			SW 		a1, 0x8 (a2)

		SaveMapVars:
			// Store Map & Kong variables
			LBU 	a1, @InSubmap
			SB 		a1, @SavedInSubmap
			LH		a1, @ParentMap
			SB 		a1, @SavedParentMap
			LBU		a1, @ParentExit
			SB 		a1, @SavedParentExit
			LW 		a1, @CurrentMap
			SB 		a1, @SavedMap
			LW 		a1, @DestExit
			SB 		a1, @SavedExit
			LBU		a1, @Character
			SB 		a1, @SavedCharacter
			// Collectable Base
			LI 		a0, @CollectableBase
			LI 		a2, @SavedCollectableBase
			LD 		a1, 0x0 (a0)
			SD 		a1, 0x0 (a2)
			LD 		a1, 0x8 (a0)
			SD 		a1, 0x8 (a2)
			// Temp Flag Block
			LI 		a0, @TempFlagBlock
			LI 		a1, @SavedTemporaryFlags
			LD 		a2, 0x0(a0)
			LD 		a3, 0x8(a0)
			SD 		a2, 0x0(a1)
			B 		FinishStateHandler
			SD 		a3, 0x8(a1)

	Handler_Load:
		SW 		r0, @StoredTime
		SB 		r0, @StoredTimerMode
		LI 		a1, @SavedPermanentFlags

		WriteFlags:
			LW 		a2, 0x0(a1)
			SW 		a2, 0x0(a3)
			BEQZ 	a0, LoadWarp
			ADDIU 	a1, a1, 4
			ADDI 	a0, a0, -4
			B 		WriteFlags
			ADDIU 	a3, a3, 4

		LoadWarp:
			LI 		a0, @MovesBase
			LI 		a1, @MovesBaseSize
			LI 		a2, @SavedKongBase
		
			LoadKongBase:
				// Load Kong Base
				LW 		a3, 0x0(a2)
				SW 		a3, 0x0(a0)
				BEQZ 	a1, LoadMapVars
				ADDIU 	a0, a0, 4
				ADDIU  	a2, a2, 4
				B 		LoadKongBase
				ADDI 	a1, a1, -4

		LoadMapVars:
			// Load Map & Kong Variables
			LI 		a0, @SavedTemporaryFlags
			LI 		a1, @TempFlagBlock
			LD 		a2, 0x0(a0)
			LD 		a3, 0x8(a0)
			SD 		a2, 0x0(a1)
			SD 		a3, 0x8(a1)
			// LBU		a0, @SavedInSubmap
			// SB 		a0, @InSubmap
			// LBU 	a0, @SavedParentMap
			// SH		a0, @ParentMap
			// LBU 	a0, @SavedParentExit
			// SB		a0, @ParentExit
			LBU 	a0, @SavedCharacter
			SB 		a0, @Character
			LBU 	a0, @SavedMap // Destination Map
			LBU 	a1, @SavedExit // Destination Exit
			JAL 	@InitiateTransition
			NOP
			// Collectable Base
			LI 		a0, @CollectableBase
			LI 		a2, @SavedCollectableBase
			LD 		a1, 0x0 (a2)
			SD 		a1, 0x0 (a0)
			LD 		a1, 0x8 (a2)
			SD 		a1, 0x8 (a0)

		LoadKongPosition:
			LI 		a0, @SavedPositions_State
			LI 		a2, @PositionWarpInfo
			LI 		a3, @PositionFloatWarps
			// X
			LW 		a1, 0x0 (a0)
			SW 		a1, 0x0 (a3)
			MTC1 	a1, f0
			CVT.W.S f0, f0
			MFC1 	a1, f0
			SH 		a1, 0x0 (a2)
			// Y & Floor
			LW 		a1, 0x4 (a0)
			SW 		a1, 0x4 (a3)
			MTC1 	a1, f0
			CVT.W.S f0, f0
			MFC1 	a1, f0
			SH 		a1, 0x2 (a2)
			// Z
			LW 		a1, 0x8 (a0)
			SW 		a1, 0x8 (a3)
			MTC1 	a1, f0
			CVT.W.S f0, f0
			MFC1 	a1, f0
			SH 		a1, 0x4 (a2)
			// Check Load State mode
			LBU 	a1, @MenuSavestateAction
			LI 		a3, 1
			BNE 	a1, a3, FinishStateHandler
			NOP
			// Load in position rather than 
			LHU 	a1, @PositionWarpBitfield
			ORI 	a1, a1, 1
			SH 		a1, @PositionWarpBitfield

	FinishStateHandler:
		LW 	ra, @ReturnAddress
		JR 	ra
		NOP

// Check if in Bad Map
CheckMapType:
	LW 		a0, @CurrentMap
	LA 		a1, BadSavestateMaps

	TypeCheckLoop:
		LBU 	a2, 0x0(a1)
		BEQ 	a0, a2, MapTypeInvalid
		NOP
		BNEZ 	a2, TypeCheckLoop
		ADDIU 	a1, a1, 1
		SLTI 	a2, a0, 0x73
		BNEZ 	a2, MapTypeValid
		SLTI 	a3, a0, 0x97
		BEQZ 	a3, MapTypeValid
		NOP

	MapTypeInvalid:
		LI 		a0, 1
		SB 		a0, @InBadMap
		B 		FinishMapCheck

	MapTypeValid:
		SB 		r0, @InBadMap

	FinishMapCheck:
		JR 		ra
		NOP

MultBy60:
	// Input = 60
	SLL 	a2, a1, 2 // a2 = 4 * a1 ; a1 = Original counter
	SUBU 	a2, a2, a1 // a2 = a2 - a1 ; a2 = 3 * Original
	SLL 	a1, a2, 2 // a1 = 4 * a2 ; a1 = 12 * Original
	ADD 	a1, a1, a2 // a1 = a1 + a2 ; a1 = 15 * Original
	JR 		ra
	SLL 	a1, a1, 2 // a1 = a1 * 4 ; a1 = 60 * Original

.org 0x80000A30 // 0x000A30 > 0x0010BC

LoadInAdditionalFile:
    JAL     @DMAFileTransfer
    ADDIU   a0, a0, 0x13F0
    LI      a1, 0x2004CB0
    LI      a2, 0x805DAE00
    JAL     @DMAFileTransfer       
    LUI     a0, 0x200 // 0x2000000
    J       0x80000734
    NOP

// Update 3rd Pause Menu Slot arrays
UpdateSlot3Arrays:
	// Update Sniper Scope Array
	LI 		a2, @SniperArray
	LA 		a1, PauseMenu_Sniper_Off
	SW 		a1, 0x0(a2)
	LA 		a1, PauseMenu_Sniper_On
	SW 		a1, 0x4(a2)
	// Slam
	LA 		a0, PauseMenu_Slam
	LI 		a1, @Slot3Array
	SW 		a0, 0x00(a1)
	LBU 	a2, @SlamLevel
	ADDIU 	a2, a2, 0x30 // ASCII
	SB 		a2, 0xD(a0)
	// Sniper
	LI 		a0, @SniperArray
	LBU 	a2, @SniperOn
	SLL 	a2, a2, 2
	ADD 	a0, a0, a2
	LW 		a0, 0x0(a0)
	SW 		a0, 0x04(a1)
	// Setup Takeoff Skip
	LA 		a0, PauseMenu_Takeoff
	SW 		a0, 0x08(a1) 		
	// Variable Display
	LA 		a0, PauseMenu_VDisplay_Array
	LBU 	a2, @VariableDisplayOn
	SLL 	a2, a2, 2
	ADD 	a0, a0, a2
	LW 		a0, 0x0(a0)
	SW 		a0, 0x0C(a1)
	// Unlock Moves
	LA 		a0, PauseMenu_UnlockMoves
	SW 		a0, 0x10(a1)
	// Give Coins
	LA 		a0, PauseMenu_GiveCoins
	SW 		a0, 0x14(a1)
	// Restock Inventory Items
	LA 		a0, PauseMenu_GiveInventoryItems
	SW 		a0, 0x18(a1)
	// Disable Pos Buttons
	LA 		a0, PauseMenu_DisablePositionLoad_Array
	LBU 	a2, @DisablePositionButtons
	SLL 	a2, a2, 2
	ADD 	a0, a0, a2
	LW 		a0, 0x0(a0)
	SW 		a0, 0x1C(a1)
	// Disable Pos Buttons
	LA 		a0, PauseMenu_DisableTagAnywhere_Array
	LBU 	a2, @DisableTagAnywhere
	SLL 	a2, a2, 2
	ADD 	a0, a0, a2
	LW 		a0, 0x0(a0)
	SW 		a0, 0x20(a1)
	// Sound
	LA 		a0, PauseMenu_Sound_Array
	LBU 	a2, @SFXVolume
	BEQZ 	a2, Slot3Arrays_SoundUpdate
	LI 		a2, 0
	LI 		a2, 4

	Slot3Arrays_SoundUpdate:
		ADD 	a0, a0, a2
		LW 		a0, 0x0 (a0)
		SW 		a0, 0x24 (a1)
		// Music
		LA 		a0, PauseMenu_Music_Array
		LBU 	a2, @MusicVolume
		BEQZ 	a2, Slot3Arrays_MusicUpdate
		LI 		a2, 0
		LI 		a2, 4

	Slot3Arrays_MusicUpdate:
		ADD 	a0, a0, a2
		LW 		a0, 0x0 (a0)
		SW 		a0, 0x28 (a1)
		// Camera Mode
		LA 		a0, PauseMenu_CameraMode_Array
		LBU 	a2, @ChimpyCam
		SLL 	a2, a2, 2
		ADD 	a0, a0, a2
		LW 		a0, 0x0 (a0)
		SW 		a0, 0x2C (a1)
		// Screen Ratio
		LA 		a0, PauseMenu_ScreenMode_Array
		LBU 	a2, @ScreenRatio
		SLL 	a2, a2, 2
		ADD 	a0, a0, a2
		LW 		a0, 0x0 (a0)
		SW 		a0, 0x30 (a1)
		JR 		ra
		NOP

HandleSlot3:
	SW 		ra, @ReturnAddress2
	LBU 	a0, @MenuSlide
	BNEZ 	a0, FinishHandlingSlot3 // Not on slide 1
	NOP
	LBU 	a0, @MenuOpen
	BEQZ 	a0, FinishHandlingSlot3
	LI 		a1, 2 // Slot Position
	LBU 	a0, @MenuPosition
	BNE 	a0, a1, FinishHandlingSlot3
	LH 		a0, @NewlyPressedControllerInput
	ANDI 	a0, a0, @A_Button
	BEQZ 	a0, FinishHandlingSlot3
	NOP

	PressingA:
		LBU 	a0, @Slot3Position
		BEQZ	a0, ChangeSlam
		LI 		a1, 1
		BEQ 	a0, a1, ChangeSniper
		LI 		a2, 2
		BEQ 	a0, a2, SetupTakeoff
		LI 		a1, 3
		BEQ 	a0, a1, ChangeVDisp
		LI 		a2, 4
		BEQ 	a0, a2, HandleMoves
		LI 		a1, 5
		BEQ 	a0, a1, HandleCoins
		LI 		a2, 6
		BEQ 	a0, a2, HandleRestock
		LI 		a1, 7
		BEQ 	a0, a1, TogglePosActive
		LI 		a2, 8
		BEQ 	a0, a2, ToggleTagAnywhereActive
		LI 		a1, 9
		BEQ 	a0, a1, ChangeSound
		LI 		a2, 10
		BEQ 	a0, a2, ChangeMusic
		LI 		a1, 11
		BEQ 	a0, a1, ToggleCameraMode
		LI 		a2, 12
		BEQ 	a0, a2, ToggleScreenRatio
		NOP
		B 		FinishHandlingSlot3
		NOP

	ChangeSlam:
		LBU 	a0, @SlamLevel
		ADDIU 	a0, a0, 1
		LI 		a1, 4
		BEQ 	a0, a1, SlamOverflow
		NOP
		SB 		a0, @SlamLevel
		JAL 	UpdateSlamSnipe
		NOP
		B 		FinishHandlingSlot3
		NOP

	SlamOverflow:
		SB 		r0, @SlamLevel
		B 		FinishHandlingSlot3
		NOP

	ChangeSniper:
		LBU 	a0, @SniperOn
		LI 		a1, 1
		SUBU 	a0, a1, a0
		SB 		a0, @SniperOn
		JAL 	UpdateSlamSnipe
		NOP
		B 		FinishHandlingSlot3
		NOP

	ChangeVDisp:
		LBU 	a0, @VariableDisplayOn
		ADDIU 	a0, a0, 1
		LI 		a1, @DisplayTypeCount // Amount of display types
		BEQ 	a0, a1, VDispOverflow
		NOP
		SB 		a0, @VariableDisplayOn
		B 		FinishHandlingSlot3
		NOP

	VDispOverflow:
		SB 		r0, @VariableDisplayOn
		B 		FinishHandlingSlot3
		NOP

	SetupTakeoff:
		JAL 	TakeoffSkip
		NOP
		B 		FinishHandlingSlot3
		NOP

	HandleMoves:
		JAL 	GiveMoves
		NOP
		B 		FinishHandlingSlot3
		NOP

	HandleCoins:
		JAL 	GiveCoins
		NOP
		B 		FinishHandlingSlot3
		NOP

	HandleRestock:
		JAL 	RestockInventory
		NOP
		B 		FinishHandlingSlot3
		NOP

	TogglePosActive:
		LBU 	a0, @DisablePositionButtons
		LI 		a1, 1
		SUBU 	a0, a1, a0
		SB 		a0, @DisablePositionButtons
		B 		FinishHandlingSlot3
		NOP

	ToggleTagAnywhereActive:
		LBU 	a0, @DisableTagAnywhere
		LI 		a1, 1
		SUBU 	a0, a1, a0
		SB 		a0, @DisableTagAnywhere
		B 		FinishHandlingSlot3
		NOP

	ChangeSound:
		LBU 	a0, @SFXVolume
		BEQZ 	a0, ChangeSound_Set
		LI 		a1, 40
		LI 		a1, 0

	ChangeSound_Set:
		SB 		a1, @SFXVolume
		B 		FinishHandlingSlot3
		NOP

	ChangeMusic:
		LBU 	a0, @MusicVolume
		BEQZ 	a0, ChangeMusic_Set
		LI 		a1, 40
		LI 		a1, 0

	ChangeMusic_Set:
		SB 		a1, @MusicVolume
		B 		FinishHandlingSlot3
		NOP

	ToggleCameraMode:
		LBU 	a0, @ChimpyCam
		LI 		a1, 1
		SUBU 	a0, a1, a0
		SB 		a0, @ChimpyCam
		B 		FinishHandlingSlot3
		NOP

	ToggleScreenRatio:
		LBU 	a0, @ScreenRatio
		LI 		a1, 1
		SUBU 	a0, a1, a0
		SB 		a0, @ScreenRatio
		B 		FinishHandlingSlot3
		NOP

	FinishHandlingSlot3:
		LW 		ra, @ReturnAddress2
		JR		ra
		NOP

// Setup Takeoff Skip Flags
TakeoffSkip:
	SW 		ra, @ReturnAddress
	// Set all relevant flags
	LA 		a0, TakeoffSkipSetFlags
	JAL 	SetAllFlags
	NOP
	// Clear key 3 & 8 turned in
	LI      a0, 446 // Key 3 Turned In
	LI      a1, 0
	JAL     @SetFlag
	LI      a2, 0
	LI      a0, 451 // Key 8 Turned In
	LI      a1, 0
	JAL     @SetFlag
	LI      a2, 0
	// Clear Rainbow Coin FTT
	LI      a0, 364
	LI      a1, 0
	JAL     @SetFlag
	LI      a2, 0
	// Clear K. Lumsy Patch
	LI 		a0, 718
	LI 		a1, 0
	JAL 	@SetFlag
	LI 		a2, 0
	JAL 	CodedPlaySFX
	LI 		a0, @KLumsy
	LW 		ra, @ReturnAddress
	JR 		ra
	NOP

ResetCLagCounter:
	LBU 	a1, @LButtonCheatMode
	BNEZ 	a1, FinishResetCounter
	NOP
	LBU 	a1, @TBVoidByte
	ANDI 	a1, a1, 2
	BNEZ 	a1, FinishResetCounter // Pause Menu
	NOP
	LH 		a1, @NewlyPressedControllerInput
	ANDI 	a1, a1, @L_Button
	BEQZ  	a1, FinishResetCounter
	NOP
	SW 		r0, @CumulativeLag

	FinishResetCounter:
		JR 	ra
		NOP

UpdateSlamSnipe:
	LI 		a0, @MovesBase
	LBU 	a1, @SlamLevel
	SB 		a1, 0x1(a0) // DK Slam
	SB 		a1, 0x5F(a0) // Diddy Slam
	SB 		a1, 0xBD(a0) // Lanky Slam
	SB 		a1, 0x11B(a0) // Tiny Slam
	SB 		a1, 0x179(a0) // Chunky Slam
	LBU 	a1, @SniperOn // ANDI Statement: 0x7 on, 0x3 off
	SLL 	t9, a1, 2
	ADDIU 	a1, t9, 3
	// DK Gun Bitfield
	LBU 	a2, 0x2(a0)
	AND 	a3, a2, a1
	OR 		a2, a3, t9
	SB 		a2, 0x2(a0)
	// Diddy Gun Bitfield
	LBU 	a2, 0x60(a0)
	AND 	a3, a2, a1
	OR 		a2, a3, t9
	SB 		a2, 0x60(a0)
	// Lanky Gun Bitfield
	LBU 	a2, 0xBE(a0)
	AND 	a3, a2, a1
	OR 		a2, a3, t9
	SB 		a2, 0xBE(a0)
	// Tiny Gun Bitfield
	LBU 	a2, 0x11C(a0)
	AND 	a3, a2, a1
	OR 		a2, a3, t9
	SB 		a2, 0x11C(a0)
	// Chunky Gun Bitfield
	LBU 	a2, 0x17A(a0)
	AND 	a3, a2, a1
	OR 		a2, a3, t9
	JR 		ra
	SB 		a2, 0x17A(a0)

UpdateLag:
	// Our Code
	LW 		a0, @FrameReal
	LW 		a1, @FrameLag
	SUBU 	a1, a0, a1
	SW 		a1, @StoredLag
	// Run code we replaced
	LUI 	t6, 0x8077
	J 		0x8060067C
	LBU 	t6, 0xAF14(t6)

// Who says it's only Link's tunic which can change colour
ChangeColour:
	SW 		ra, @ReturnAddress
	LUI 	a0, 0x8069	
	SB 		r0, 0xA62F(a0) // 0x8068A62F // Enable colouring for 1-player gameplay
	SW 		r0, 0xA450(a0) // 0x8068A450 // Disable shading
	JAL 	0x8068A508
	// NOP
	SW 		r0, 0xA458(a0) // 0x8068A458 // Turn off low poly models
	LA 		a0, KongColours
	LBU 	a1, @Character
	ADD 	a0, a0, a1
	LBU 	a1, 0x0 (a0)
	SW 		a1, @PlayerOneColour

	FinishColourChange:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

// Updates Level Array for pause menu
UpdateLevelArray:
	LI 		a2, @LevelsArray
	LA 		a1, PauseMenu_Warp_List
	LA 		t0, PauseMenu_Warp_Length
	LI 		t9, 13

	LevelArrayProcess:
		SW 		a1, 0x0 (a2)
		BEQZ 	t9, FinishGeneratingLevelArray
		LBU 	a0, 0x0 (t0)
		ADD 	a1, a1, a0
		ADDIU 	a2, a2, 4
		ADDIU 	t0, t0, 1
		B 		LevelArrayProcess
		ADDI 	t9, t9, -1

	FinishGeneratingLevelArray:
		JR 		ra
		NOP

.org 0x805DAE00
VariableDisplay:
	SW 		ra, @ReturnAddress
	// Fix Delimiter Pointer
	LI 		a0, 0x8076
	SH 		a0, 0x8068E80A
	LI 		a0, 0x9F4C
	SH 		a0, 0x8068E812
	LBU 	a0, @VariableDisplayOn
	SW 		r0, 0x80713CD8
	BEQZ 	a0, VDispOff
	LUI 	a3, 0x42FA // K Rool Timer X (125)
	// Change Helm Timer Format
	SW 		r0, 0x80759F54 // Seconds Text
	LI 		a1, 7
	BEQ 	a0, a1, VDispAngle
	LI 		a2, @MovementStateIndex
	BEQ 	a0, a2, VDispMovement
	LI 		a1, 5
	BEQ 	a0, a1, VDispGKTimer
	LI 		a2, 4
	BEQ 	a0, a2, VDispTimer
	LI 		a1, 3
	BEQ 	a0, a1, VDispSpd
	LI 		a2, 2
	BEQ 	a0, a2, VDispCLag
	NOP

	VDispLag:
		LI 		a1, @DisplayText
		JAL 	ConvertCodePointerForWatchText
		NOP
		LI 		a0, 0x4C4147 // Header - LAG
		LW 		a1, @StoredLag // Value
		LI 		a2, 0 // Display Type
		JAL 	FormatTextForWatch
		LI 		a3, 3 // Header Length
		LI 		a0, 0
		B 		UpdateVDispText
		LI 		a1, 0

	VDispSpd:
		LI 		a1, @DisplayText
		JAL 	ConvertCodePointerForWatchText
		NOP
		LW 		a0, @Player // Player pointer
		BEQZ 	a0, VDispSpdFormat // Player pointer null
		LI 		a1, 0
		LW 		a1, 0xB8 (a0) // Grab velocity hex
	
	VDispSpdFormat:
		LI 		a0, 0x535044 // Header - SPEED
		// a1 carried from prior
		LI 		a2, 1 // Display Type
		JAL 	FormatTextForWatch
		LI 		a3, 3 // Header Length
		LI 		a0, 0
		B 		UpdateVDispText
		LI 		a1, 0

	VDispCLag:
		LI 		a1, @DisplayText
		JAL 	ConvertCodePointerForWatchText
		NOP
		LW 		a1, @StoredLag
		LW 		a2, @CumulativeLag
		ADD 	a1, a1, a2 // Lag + Old Lag
		SW 		a1, @CumulativeLag
		LI 		a0, 0x434C4147 // Header - CLAG
		// a1 carried from prior
		LI 		a2, 0 // Display Type
		JAL 	FormatTextForWatch
		LI 		a3, 4 // Header Length
		LI 		a1, 0
		LI 		a0, 0
		B 		UpdateVDispText
		LI 		a2, 0 // ""

	VDispTimer:
		LI 		a1, @DisplayText
		JAL 	ConvertCodePointerForWatchText
		NOP
		LWU 	a1, @TimerAfterReduction
		MTC1 	a1, f0
		LUI 	t6, 0x4270 // 60 as float
		MTC1 	t6, f2
		CVT.S.W f4, f0
		DIV.S 	f0, f4, f2
		MFC1 	a1, f0
		LI 		a0, 0x54494D45 // Header - TIME
		LI 		a2, 1 // Display Type
		JAL 	FormatTextForWatch
		LI 		a3, 4 // Header Length
		LI 		a1, 0
		LI 		a0, 0
		B 		UpdateVDispText
		NOP

	VDispGKTimer:
		LW 		a0, @CurrentMap
		LI 		a3, 0x48
		BNE 	a0, a3, VDispGKTimer_NotCaves
		NOP

		VDispGKTimer_IsCaves:
			LI 		a1, @DisplayText
			JAL 	ConvertCodePointerForWatchText
			NOP
			LH 		a1, @GiantKoshaTimerValue
			LI 		a0, 0x4B4F5348 // Header - KOSH
			LI 		a2, 0 // Display Type
			JAL 	FormatTextForWatch
			LI 		a3, 4 // Header Length
			LI 		a1, 0
			LI 		a0, 0
			B 		UpdateVDispText
			LI		a2, 0x0 // ""

		VDispGKTimer_NotCaves:
			LI 		a0, 0x56455300 // VES
			SW 		a0, 0x80759F54 // Seconds Text
			LI 		a2, 0x20434100 // "_CA"
			LI 		a0, 0x4E4F5400 // "NOT"
			B 		UpdateVDispText
			NOP

	VDispMovement:
		// 0x8068E808 = LUI $a1 0x8076 (3C058076)
		// 0x8068E810 = ADDIU $a1 $a1 0x9F4C (24A59F4C)
		LI 		a0, 0 // ""
		LI 		a2, 0 // ""
		LW 		a1, @MovementStateText
		BEQZ 	a1, UpdateVDispText
		LI 		a1, 0
		LW 		a1, @MovementStateText
		SRL 	a2, a1, 16
		ANDI 	a0, a1, 0xFFFF
		SLTIU 	a1, a0, 0x8000
		ADD 	a2, a2, a1
		SH 		a2, 0x8068E80A
		SH 		a0, 0x8068E812
		LI 		a1, 0
		LI 		a0, 0
		B 		UpdateVDispText
		LI 		a2, 0

	VDispAngle:
		LI 		a1, @DisplayText
		JAL 	ConvertCodePointerForWatchText
		NOP
		LW 		a0, @Player
		BEQZ 	a0, VDispAngle_Text
		LI 		a1, 0
		LH 		a1, 0xE6 (a0)
		MTC1 	a1, f6
		CVT.S.W f0, f6 // f0 = angle
		LUI		t6, 0x4580
		MTC1 	t6, f2 // 4096
		LUI 	t6, 0x43B4
		MTC1 	t6, f4 // 360
		DIV.S 	f0, f0, f2
		MUL.S 	f0, f0, f4
		MFC1 	a1, f0

	VDispAngle_Text:
		LI 		a0, 0x414E474C // Header - ANGL
		LI 		a2, 1 // Display Type
		JAL 	FormatTextForWatch
		LI 		a3, 4 // Header Length
		LI 		a1, 0
		LI 		a0, 0
		B 		UpdateVDispText
		LI 		a2, 0

	UpdateVDispText:
		SW 		a0, 0x80759F50 // Change Minutes Text
		SW 		a2, 0x80759F4C // Change Delimiter
		SW 		a1, @HelmTimerDisplay
		LI 		a0, 1
		SB 		a0, @HelmTimerShown
		B 		HandleKRoolTimer
		LUI 	a3, 0x435C // K Rool Timer X (220)

	VDispOff:
		SB 		r0, @HelmTimerShown
		LI 		a0, 0x25326400 // "%2d"
		SW 		a0, 0x80759F50 // Change Minutes Text
		LUI		a0, 0x3A00 // " : "
		SW 		a0, 0x80759F4C // Change Delimiter
		LI 		a0, 0x0C180AA5
		SW 		a0, 0x80713CD8 // BoM off song

	HandleKRoolTimer:
		// K Rool Check
		LW 		a0, @CurrentMap
		SLTI 	a1, a0, 0xCB
		BNEZ 	a1, FinishVDisplay
		SLTI 	a2, a0, 0xD0
		BEQZ 	a2, FinishVDisplay
		NOP
		LW 		a0, @Player
		BEQZ 	a0, FinishVDisplay
		LW 		a1, 0x328(a0)
		BEQZ 	a1, FinishVDisplay
		NOP
		SW 		a3, 0x7C(a1)

	FinishVDisplay:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

// Loops through a flag array and sets all of them
// Credit: Isotarge (Tag Anywhere V5)
SetAllFlags:
	// Params:
	// a0 = Array
	ADDIU	sp, sp, -0x18 // Push S0
	SW		s0, 0x10(sp)
	SW 		ra, 0x14(sp)
	NOP

	// Load flag array base into register to loop with
	ADDIU 	s0, a0, 0

	SetAllFlagsLoop:
	    LHU     a0, 0(s0) // Load the flag index from the array
	    BEQZ    a0, FinishSettingAllFlags // If the flag index is 0, exit the loop
	    NOP
	    JAL     CodedSetPermFlag
	    NOP
	    B       SetAllFlagsLoop
	    ADDIU   s0, s0, 2 // Move on to the next flag in the array

	FinishSettingAllFlags:
		LW		s0, 0x10(sp)  // Pop S0
		LW 		ra, 0x14(sp)
		JR
		ADDIU	sp, sp, 0x18

// Tag Anywhere
TagAnywhere:
	LBU 	a1, @TBVoidByte
	ANDI 	a1, a1, 2
	BNEZ 	a1, FinishTagAnywhere // Pause Menu
	NOP
	LH 		a1, @NewlyPressedControllerInput
	ANDI 	a1, a1, @D_Down
	BEQZ 	a1, FinishTagAnywhere // Not Pressing DDown
	NOP
	LBU 	a2, @Character
	ADDIU 	a2, a2, 1 // New Character Value
	LI 		a1, 5
	BNE 	a1, a2, GunCheck // If Character + 1 != 5, Don't wrap around to 0
	NOP

	WrapAround:
		LI 	a2, 0

	GunCheck:
		LW 		a1, @Player
		BEQZ 	a1, FinishTagAnywhere // If player isn't in RDRAM, cancel
		NOP
		LA 		a3, GunBitfields
		SLL 	t3, a2, 2 // new_kong x 4
		ADD 	a3, t3, a3
		LW 		a3, 0x0 (a3)
		LBU 	t9, 0x0 (a3) // Get gun bitfield for kong
		ANDI 	t9, t9, 1 // Has gun
		BEQZ 	t9, RetractGun
		NOP
		LBU 	t9, 0x20C(a1) // Was gun out
		BEQZ 	t9, RetractGun
		NOP

	PullOutGun:
		LA 		t9, HandStatesGun
		ADD 	t9, t9, a2
		LBU 	t9, 0x0 (t9)
		SB 		t9, 0x147 (a1) // Set Hand State
		LI 		t9, 1
		B 		ChangeCharacter
		SB 		t9, 0x20C (a1) // Set Gun State

	RetractGun:
		LA 		t9, HandStatesNoGun
		ADD 	t9, t9, a2
		LBU 	t9, 0x0 (t9)
		SB 		t9, 0x147 (a1) // Set Hand State
		SB 		r0, 0x20C (a1) // Set Gun State

	ChangeCharacter:
		LW 		a1, @Player
		BEQZ 	a1, FinishTagAnywhere // If player isn't in RDRAM, cancel
		ADDIU	a2, a2, 2
		SB 		a2, 0x36F (a1)
		LW 		a1, @SwapObject
		BEQZ 	a1, FinishTagAnywhere // If swap object isn't in RDRAM, cancel
		LI 		a2, 0x3B
		SH 		a2, 0x29C (a1) // Initiate Swap

	FinishTagAnywhere:
		JR 		ra
		NOP

GiveCoins:
	SW 		ra, @ReturnAddress
	LI 		a0, @MovesBase
	LI 		a1, 50
	SH 		a1, 0x0006(a0) // DK
	SH 		a1, 0x0064(a0) // Diddy
	SH 		a1, 0x00C2(a0) // Lanky
	SH 		a1, 0x0120(a0) // Tiny
	SH 		a1, 0x017E(a0) // Chunky
	JAL 	CodedPlaySFX
	LI 		a0, @Coin
	LW 		ra, @ReturnAddress
	JR 		ra
	NOP

// Populates each array
PopulateBetterWarpingArray:
	LA 		a0, Maps_Counts
	LA 		a1, Maps_text
	LA 		a3, Maps_arrays
	LA 		t6, Maps_textLength
	LI 		t4, 0 // Level Counter

	UpdateParametersForLevel:
		LW 		t3, 0x0 (a1) // Level text
		LBU 	a2, 0x0 (a0) // Level Map Count
		LW 		t9, 0x0 (t6) // Level text lengths
		LW 		t8, 0x0 (a3) // Level array write

	Load_Level:
		SW 		t3, 0x0(t8)
		LBU 	t0, 0x0(t9)
		ADDIU 	t0, t0, 1
		ADD 	t3, t3, t0
		ADDI 	a2, a2, -1
		ADDIU 	t8, t8, 4
		ADDIU 	t9, t9, 1
		BEQZ 	a2, IncrementLevel
		NOP
		B 		Load_Level
		NOP

	IncrementLevel:
		SLTI 	t3, t4, 9
		BEQZ 	t3, FinishMasterWarpPopulation
		NOP
		ADDIU 	t4, t4, 1
		ADDIU 	a1, a1, 4
		ADDIU 	a0, a0, 1
		ADDIU 	t6, t6, 4
		ADDIU  	a3, a3, 4
		B 		UpdateParametersForLevel
		NOP

	FinishMasterWarpPopulation:
		JR 		ra
		NOP

// Update Alt. Pause Menu Array
UpdateAltMenu:
	LBU 	a2, @MenuSlide
	BNEZ 	a2, SecondSlide
	NOP

	FirstSlide:
		LI 		a2, @SpecialFlagsArray
		// First item is warp
		LBU 	a1, @SpecialFlagIndex
		SLL 	a1, a1, 2
		ADD 	a1, a2, a1
		LW 		a1, 0x0(a1)
		LI 		a2, @NewPauseMenu
		SW 		a1, 0x0(a2)
		// Blank Entries
		LI 		a1, 0x19
		LI 		a3, 8

	Blank:
		ADD 	t6, a2, a3
		LI 		t9, @Slot3Array
		LBU 	a0, @Slot3Position
		SLL 	a0, a0, 2
		ADD 	t9, t9, a0
		LW 		t9, 0x0(t9)
		SW 		t9, 0x0(t6)
		BEQZ 	a1, SavestateMenu
		ADDIU 	a3, a3, 4
		B 		Blank
		ADDI 	a1, a1, -1

	SavestateMenu:
		// Savestate
		LBU 	a1, @MenuSavestateAction
		BNEZ 	a1, SavestateMenu_Load
		NOP
		LA 		a1, PauseMenu_Savestate_Save
		B  		WriteToMenu
		NOP

	SavestateMenu_Load:
		LI 		a3, 1
		BNE 	a1, a3, SavestateMenu_LoadExit
		NOP
		LA 		a1, PauseMenu_Savestate_Load
		B 		WriteToMenu
		NOP

	SavestateMenu_LoadExit:
		LA 		a1, PauseMenu_Savestate_LoadExit

	WriteToMenu:
		SW 		a1, 0x4(a2) // Save
		B 		FinishAltMenu
		SW 		a1, 0x10(a2) // Restart

	SecondSlide:
		LI 		a1, 1
		BNE 	a1, a2, SlideThree
		NOP
		LI 		a0, @NewPauseMenu
		LA 		a1, Maps_Title
		SW 		a1, 0x0 (a0)
		// Third slot
		LI 		a1, 0x19
		LI 		a3, 8

	SlideTwoSlotThree:
		ADD 	t6, a0, a3
		LA 		t9, Maps_arrays
		LBU 	a2, @SelectedMasterLevelIndex
		SLL 	a2, a2, 2
		ADD 	t9, t9, a2
		LW 		t9, 0x0 (t9)
		LBU 	a2, @SelectedMapIndex
		SLL 	a2, a2, 2
		ADD 	t9, t9, a2
		LW 		t9, 0x0 (t9)
		SW 		t9, 0x0 (t6)
		BEQZ 	a1, SlideTwoSlotTwo
		ADDIU 	a3, a3, 4
		B 		SlideTwoSlotThree
		ADDI 	a1, a1, -1

	SlideTwoSlotTwo:
		// Second item is master level
		LBU 	a1, @SelectedMasterLevelIndex
		SLL 	a1, a1, 2
		LI 		a2, @MapsArray_Master
		ADD 	a1, a2, a1
		LW 		a1, 0x0 (a1)
		SW 		a1, 0x4(a0) // Save
		B 		FinishAltMenu
		SW 		a1, 0x10(a0) // Restart

	SlideThree:
		LI 		a1, 2
		BNE 	a1, a2, SlideFour
		NOP
		LI 		a0, @NewPauseMenu
		LA 		a1, LoadingZone_Title
		SW 		a1, 0x0 (a0)
		// Third slot
		LI 		a1, 0x19
		LI 		a3, 8

	SlideThreeSlotThree:
		ADD 	t6, a0, a3
		LI 		t9, @LoadingZoneMass
		LBU 	a2, @LZMassSelected
		SLL 	a2, a2, 2
		ADD 	t9, t9, a2
		LW 		t9, 0x0 (t9)
		SW 		t9, 0x0 (t6)
		BEQZ 	a1, SlideThreeSlotTwo
		ADDIU 	a3, a3, 4
		B 		SlideThreeSlotThree
		ADDI 	a1, a1, -1

	SlideThreeSlotTwo:
		// Second item is individual LZ Types
		LBU 	a1, @LZTypesSelected
		SLL 	a1, a1, 2
		LI 		a2, @LoadingZoneTypes
		ADD 	a1, a2, a1
		LW 		a1, 0x0 (a1)
		SW 		a1, 0x4(a0) // Save
		B 		FinishAltMenu
		SW 		a1, 0x10(a0) // Restart

	SlideFour:
		LI 		a1, 3
		BNE 	a1, a2, SlideFive
		NOP
		LI 		a0, @NewPauseMenu
		LBU 	a2, @TimerStartMode
		LA 		a1, Timer_Start_Array
		SLL 	a2, a2, 2
		ADD 	a1, a1, a2
		LW 		a1, 0x0 (a1)
		SW 		a1, 0x0 (a0)
		// Third slot
		LI 		a1, 0x19
		LI 		a3, 8

	SlideFourSlotThree:
		ADD 	t6, a0, a3
		LA 		t9, Timer_Finish_Array
		LBU 	a2, @TimerFinishMode
		SLL 	a2, a2, 2
		ADD 	t9, t9, a2
		LW 		t9, 0x0 (t9)
		SW 		t9, 0x0 (t6)
		BEQZ 	a1, SlideFourSlotTwo
		ADDIU 	a3, a3, 4
		B 		SlideFourSlotThree
		ADDI 	a1, a1, -1

	SlideFourSlotTwo:
		// Second item is pause mode
		LBU 	a1, @TimerPauseMode
		SLL 	a1, a1, 2
		LA 		a2, Timer_Pause_Array
		ADD 	a1, a2, a1
		LW 		a1, 0x0 (a1)
		SW 		a1, 0x4(a0) // Save
		B 		FinishAltMenu
		SW 		a1, 0x10(a0) // Restart

	SlideFive:
		LI 		a1, 4
		BNE 	a1, a2, SlideSix
		NOP
		LI 		a0, @NewPauseMenu
		LBU 	a2, @SelectedMasterWarpLevel
		LA 		a1, Warps_Master_Array
		SLL 	a2, a2, 2
		ADD 	a1, a1, a2
		LW 		a1, 0x0 (a1)
		SW 		a1, 0x0 (a0)
		// Third slot
		LI 		a1, 0x19
		LI 		a3, 8

	SlideFiveSlotThree:
		ADD 	t6, a0, a3
		SW 		ra, @ReturnAddress
		SW 		a0, @VarStorage0
		SW 		a1, @VarStorage1
		SW 		t6, @VarStorage2
		SW 		a3, @VarStorage3
		LBU 	a0, @SelectedMasterWarpLevel
		SLL 	a0, a0, 2
		LA 		a1, Warps_Flag_Array
		ADD 	a1, a1, a0
		LW 		a1, 0x0 (a1)
		LBU 	a0, @SelectedSubWarpLevel
		SLL 	a0, a0, 1
		ADD 	a1, a1, a0
		LH	 	a0, 0x0 (a1)
		JAL 	@CheckFlag
		LI 		a1, 0 // Flag Type
		LW 		a3, @VarStorage3
		LW 		t6, @VarStorage2
		LW 		a1, @VarStorage1
		LW 		a0, @VarStorage0
		LW 		ra, @ReturnAddress
		LA 		t9, Warps_FlagControl_Array
		ADDIU 	a2, v0, 0
		SLL 	a2, a2, 2
		ADD 	t9, t9, a2
		LW 		t9, 0x0 (t9)
		SW 		t9, 0x0 (t6)
		BEQZ 	a1, SlideFiveSlotTwo
		ADDIU 	a3, a3, 4
		B 		SlideFiveSlotThree
		ADDI 	a1, a1, -1

	SlideFiveSlotTwo:
		// Second item is pause mode
		LBU 	a1, @SelectedMasterWarpLevel
		SLL 	a1, a1, 2
		LA 		a2, Warps_Text_Array
		ADD 	a1, a2, a1
		LW 		a2, 0x0 (a1)
		LBU 	a1, @SelectedSubWarpLevel
		SLL 	a1, a1, 2
		ADD 	a1, a2, a1
		LW 		a1, 0x0 (a1)
		SW 		a1, 0x4(a0) // Save
		B 		FinishAltMenu
		SW 		a1, 0x10(a0) // Restart

	SlideSix:
		LI 		a0, @NewPauseMenu
		LA 		a1, FileStatus_array_text
		LBU 	a2, @SelectedFileStatus
		SLL 	a2, a2, 2
		ADD 	a1, a1, a2
		LW 		a1, 0x0 (a1)
		SW 		a1, 0x0 (a0)
		// Third slot
		LI 		a1, 0x19
		LI 		a3, 8

	SlideSixSlotThree:
		// L Mode
		ADD 	t6, a0, a3
		LA 		t9, LMode_array_text
		LBU 	a2, @SelectedLMode
		SLL 	a2, a2, 2
		ADD 	t9, t9, a2
		LW 		t9, 0x0 (t9)
		SW 		t9, 0x0 (t6)
		BEQZ 	a1, SlideSixSlotTwo
		ADDIU 	a3, a3, 4
		B 		SlideSixSlotThree
		ADDI 	a1, a1, -1

	SlideSixSlotTwo:
		// Second item is individual LZ Types
		LBU 	a1, @SelectedIndependentCheat
		SLL 	a1, a1, 2
		LA 		a2, IndependentCheat_array_text
		ADD 	a1, a2, a1
		LW 		a1, 0x0 (a1)
		SW 		a1, 0x4(a0) // Save
		B 		FinishAltMenu
		SW 		a1, 0x10(a0) // Restart

	FinishAltMenu:
		JR 		ra
		NOP

ChangeMenuSlide:
	SW 		ra, @ReturnAddress
	LBU 	a0, @MenuOpen
	BEQZ 	a0, FinishMenuSlideChange
	NOP
	LH 		a1, @NewlyPressedControllerInput
	ANDI 	a1, a1, @Z_Button
	BEQZ 	a1, SlideChange_CheckR
	NOP
	JAL 	CodedPlaySFX
	LI 		a0, @Banana
	LBU 	a2, @MenuSlide
	BEQZ 	a2, DecreaseSlide_ZeroCase
	NOP
	ADDI 	a2, a2, -1
	SB 		a2, @MenuSlide
	B 		FinishMenuSlideChange
	NOP

	DecreaseSlide_ZeroCase:
		LI 		a2, @SlideCap
		SB 		a2, @MenuSlide
		B 		FinishMenuSlideChange
		NOP

	SlideChange_CheckR:
		LH 		a1, @NewlyPressedControllerInput
		ANDI 	a1, a1, @R_Button
		BEQZ 	a1, FinishMenuSlideChange
		NOP
		JAL 	CodedPlaySFX
		LI 		a0, @Banana
		LI 		a0, @SlideCap
		LBU 	a1, @MenuSlide
		BEQ 	a0, a1, IncreaseSlide_CapCase
		NOP
		ADDIU 	a1, a1, 1
		SB 		a1, @MenuSlide
		B 		FinishMenuSlideChange
		NOP

	IncreaseSlide_CapCase:
		SB 		r0, @MenuSlide

	FinishMenuSlideChange:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

HandleSecondSlide:
	SW 		ra, @ReturnAddress
	LBU 	a0, @MenuOpen
	BEQZ 	a0, FinishHandlingSlideTwo
	NOP
	LBU 	a0, @MenuSlide
	LI 		a1, 1
	BNE 	a0, a1, FinishHandlingSlideTwo
	NOP
	LH	 	a0, @NewlyPressedControllerInput
	ANDI 	a0, a0, @A_Button
	BEQZ 	a0, FinishHandlingSlideTwo
	NOP
	LBU		a1, @InBadMap
	BEQZ 	a1, No_Err_Map_SlideTwo
	NOP

	Err_Map_SlideTwo:
		JAL 	CodedPlaySFX
		LI 		a0, @Wrong
		B 		FinishHandlingSlideTwo
		NOP

	No_Err_Map_SlideTwo:
		// Close Menu
		SB 		r0, @MenuOpen
		SW 		r0, @StoredTime
		SB 		r0, @StoredTimerMode

		// Clear some K Rool stuff to prevent Bugs
		// Binary Strings
		// Setting
		// 0xB: 0010 0001 -|-|DK Phase Intro|-|-|-|-|Tiny Phase Intro
		// CLEARING
		// 0xA: 0001 1110 -|-|-|Toe 4|Toe 3|Toe 2|Toe 1|-
		// 0xB: 1000 0000 Gorilla Gone CS|-|-|-|-|-|-|-
		LI 		a0, @TempFlagBlock
		LH 		a1, 0xA(a0)
		ORI 	a1, a1, 0x0021
		ANDI 	a1, a1, 0xE17F
		SH 		a1, 0xA(a0)
		// B. Locker FTT
		JAL 	CodedSetPermFlag
		LI 		a0, 0x17E
		// Set Transition
		LA 		a1, Maps_Destination
		LA 		a3, Maps_Exits
		LBU 	a2, @SelectedMasterLevelIndex
		SLL 	a2, a2, 2
		ADD 	a1, a1, a2 // Selected Map List
		ADD 	a3, a3, a2 // Selected Exit List
		LW 		a1, 0x0 (a1)
		LW 		a3, 0x0 (a3)
		LBU 	a2, @SelectedMapIndex
		ADD 	a1, a1, a2 // Selected Map
		ADD 	a3, a3, a2 // Selected Exit
		LBU 	a0, 0x0 (a1) // Destination Map
		JAL 	@InitiateTransition
		LBU		a1, 0x0 (a3) // Destination Exit
		SLTI 	a3, a0, 0xCB
		BNEZ	a3, FinishHandlingSlideTwo // Not warping to K Rool
		SLTI 	a3, a0, 0xD0
		BEQZ 	a3, FinishHandlingSlideTwo // Not warping to K Rool
		ADDI 	a3, a0, -0xCB // Get Character Index
		SB 		a3, @Character
		LI 		a3, 0xCD
		BEQ 	a0, a3 FinishHandlingSlideTwo // If Lanky Phase, don't do some things
		// Lanky Phase Bugs
		// Reset everything
		LI      a0, 92
		LI      a1, 1
		JAL     @SetFlag
		LI      a2, 2

	FinishHandlingSlideTwo:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

HandleThirdSlide:
	SW 		ra, @ReturnAddress
	LBU 	a0, @MenuOpen
	BEQZ 	a0, FinishHandlingSlideThree
	NOP
	LBU 	a0, @MenuSlide
	LI 		a1, 2
	BNE 	a0, a1, FinishHandlingSlideThree
	NOP
	LH	 	a0, @NewlyPressedControllerInput
	ANDI 	a0, a0, @A_Button
	BEQZ 	a0, FinishHandlingSlideThree
	NOP
	LBU 	a0, @MenuPosition
	LI 		a1, 1
	BEQ 	a0, a1, IndividualLoadingZones
	LI 		a2, 2
	BEQ 	a0, a2, MassLoadingZones
	NOP
	B 		FinishHandlingSlideThree
	NOP

	IndividualLoadingZones:
		LBU 	a0, @LZTypesSelected
		LI 		a1, 1
		SLLV 	a1, a1, a0
		LBU 	a2, @LZTypesShownBitfield
		AND 	t9, a1, a2
		BEQZ 	t9, IndividualLoadingZones_Set
		NOP

	IndividualLoadingZones_Unset:
		B 		IndividualLoadingZones_0
		SUBU 	a2, a2, a1

	IndividualLoadingZones_Set:
		ADD 	a2, a2, a1

	IndividualLoadingZones_0:	
		SB 		a2, @LZTypesShownBitfield
		JAL 	UpdateShownLZIndicators
		NOP
		B 		FinishHandlingSlideThree
		NOP

	MassLoadingZones:
		LBU 	a0, @LZMassSelected // 0 = Show, 1 = Hide
		BEQZ 	a0, MassLoadingZones_Show
		NOP

	MassLoadingZones_Hide:
		SB 		r0, @LZTypesShownBitfield
		JAL 	UpdateShownLZIndicators
		NOP
		B 		FinishHandlingSlideThree
		NOP

	MassLoadingZones_Show:
		LI 		a0, 31
		SB 		a0, @LZTypesShownBitfield
		JAL 	UpdateShownLZIndicators
		NOP

	FinishHandlingSlideThree:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

HandleFourthSlide:
	SW 		ra, @ReturnAddress
	LBU 	a0, @MenuOpen
	BEQZ 	a0, FinishHandlingSlideFour
	NOP
	LBU 	a0, @MenuSlide
	LI 		a1, 3
	BNE 	a0, a1, FinishHandlingSlideFour
	NOP
	LH	 	a0, @NewlyPressedControllerInput
	ANDI 	a0, a0, @A_Button
	BEQZ 	a0, FinishHandlingSlideFour
	NOP
	LBU 	a0, @MenuPosition
	BEQZ 	a0, HandleFourthSlide_Start
	NOP
	LI 		a1, 1
	BEQ 	a0, a1, HandleFourthSlide_Pause
	NOP
	LI 		a1, 2
	BEQ 	a0, a1, HandleFourthSlide_Finish
	NOP
	B 		FinishHandlingSlideFour
	NOP

	HandleFourthSlide_Start:
		LBU 	a0, @TimerStartMode
		ADDIU 	a0, a0, 1
		LI 		a1, @TimerStartCount
		BEQ 	a0, a1, HandleFourthSlide_StartWrite
		LI 		a2, 0
		ADDIU 	a2, a0, 0

	HandleFourthSlide_StartWrite:
		SB 		a2, @TimerStartMode
		B 		FinishHandlingSlideFour
		NOP

	HandleFourthSlide_Pause:
		LBU 	a0, @TimerPauseMode
		ADDIU 	a0, a0, 1
		LI 		a1, 2
		BEQ 	a0, a1, HandleFourthSlide_PauseWrite
		LI 		a2, 0
		ADDIU 	a2, a0, 0

	HandleFourthSlide_PauseWrite:
		SB 		a2, @TimerPauseMode
		B 		FinishHandlingSlideFour
		NOP

	HandleFourthSlide_Finish:
		LBU 	a0, @TimerFinishMode
		ADDIU 	a0, a0, 1
		LI 		a1, @TimerFinishCount
		BEQ 	a0, a1, HandleFourthSlide_FinishWrite
		LI 		a2, 0
		ADDIU 	a2, a0, 0

	HandleFourthSlide_FinishWrite:
		SB 		a2, @TimerFinishMode
		B 		FinishHandlingSlideFour
		NOP

	FinishHandlingSlideFour:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

HandleFifthSlide:
	SW 		ra, @ReturnAddress
	LBU 	a0, @MenuOpen
	BEQZ 	a0, FinishHandlingSlideFive
	NOP
	LBU 	a0, @MenuSlide
	LI 		a1, 4
	BNE 	a0, a1, FinishHandlingSlideFive
	NOP
	LH	 	a0, @NewlyPressedControllerInput
	ANDI 	a0, a0, @A_Button
	BEQZ 	a0, FinishHandlingSlideFive
	NOP
	// LBU 	a0, @MenuPosition
	// LI 		a1, 2
	// BEQ 	a0, a1, HandleFifthSlide_SetUnset
	// NOP
	// B 		FinishHandlingSlideFive
	// NOP
	B 		HandleFifthSlide_SetUnset
	NOP	

	HandleFifthSlide_SetUnset:
		LBU 	a0, @SelectedMasterWarpLevel
		SLL 	a0, a0, 2
		LA 		a1, Warps_Flag_Array
		ADD 	a1, a1, a0
		LW 		a1, 0x0 (a1)
		LBU 	a0, @SelectedSubWarpLevel
		SLL 	a0, a0, 1
		ADD 	a1, a1, a0
		LH 		a0, 0x0 (a1) // Flag
		LI 		a1, 0
		SW 		a0, @VarStorage0
		SW 		a1, @VarStorage1
		JAL 	@CheckFlag
		NOP
		LW 		a1, @VarStorage1
		LW 		a0, @VarStorage0
		LI 		t6, 1
		ADDIU 	a2, a1, 0
		JAL     @SetFlag
		SUBU 	a1, t6, v0

	FinishHandlingSlideFive:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP


HandleSlideSix:
	// Cheats Menu
		// File Status
			// 101%
			// Max%
		// Independent Cheats
			// Infinite Health
			// Auto-phase state
		// L mode
			// Reset timers (L-Mode 0)
			// Levitate (L-Mode 1)
			// Toggle Aztec Sandstorm (L-Mode 2)
			// Cancel cutscene (L-Mode 3)
	SW 		ra, @ReturnAddress
	LBU 	a0, @MenuOpen
	BEQZ 	a0, FinishHandlingSlideSix
	NOP
	LBU 	a0, @MenuSlide
	LI 		a1, 5
	BNE 	a0, a1, FinishHandlingSlideSix
	NOP
	LH	 	a0, @NewlyPressedControllerInput
	ANDI 	a0, a0, @A_Button
	BEQZ 	a0, FinishHandlingSlideSix
	NOP
	LBU 	a0, @MenuPosition
	BEQZ 	a0, HandleSlideSix_FileStatus
	NOP
	LI 		a1, 1
	BEQ 	a0, a1, HandleSlideSix_IndependentCheats
	NOP
	LI 		a1, 2
	BEQ 	a0, a1, HandleSlideSix_LMode
	NOP
	B 		FinishHandlingSlideSix
	NOP

	HandleSlideSix_FileStatus:
		JAL 	HandleFileStatus
		NOP
		B 		FinishHandlingSlideSix
		NOP

	HandleSlideSix_IndependentCheats:
		JAL 	HandleIndependentCheats
		NOP
		B 		FinishHandlingSlideSix
		NOP

	HandleSlideSix_LMode:
		LBU 	a0, @SelectedLMode
		SB 		a0, @LButtonCheatMode
		LA 		a1, LMode_array_sfx
		SLL 	a2, a0, 1
		ADD 	a1, a1, a2
		JAL 	CodedPlaySFX
		LH 		a0, 0x0 (a1)
		B 		FinishHandlingSlideSix
		NOP
	
	FinishHandlingSlideSix:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP


PopulateSpecialFlagsArray:
	LI 		a0, @SpecialFlagsCount
	LA 		a1, SpecialFlags_text
	LA 		a2, SpecialFlags_length
	LI 		a3, @SpecialFlagsArray

	SpecialFlagsPopulate:
		SW 		a1, 0x0 (a3)
		ADDIU 	a3, a3, 4 // Array pointer slot
		ADDI 	a0, a0, -1 // Counter
		LBU 	t6, 0x0 (a2)
		ADDIU 	t6, t6, 1
		ADD 	a1, a1, t6 // Text location
		ADDIU	a2, a2, 1 // Focused length
		BEQZ 	a0, FinishSpecialFlagsPopulation
		NOP
		B 		SpecialFlagsPopulate
		NOP

	FinishSpecialFlagsPopulation:
		JR 		ra
		NOP

CorrectSpecialFlagsArray:
	SW 		ra, @ReturnAddress
	LBU 	a1, @TBVoidByte
	ANDI 	a1, a1, 2
	BEQZ 	a1, FinishSpecialFlagsCorrection
	NOP
	LI 		a0, @SpecialFlagsArray
	LA 		a1, SpecialFlags_length
	LA 		a2, SpecialFlags_flags
	LI 		a3, @SpecialFlagsCount

	CorrectSpecialFlagsText:
		// Check Flag
		SW 		a0, @VarStorage0
		SW 		a1, @VarStorage1
		SW 		a2, @VarStorage2
		SW 		a3, @VarStorage3
		LA 		a3, SpecialFlags_length
		SUBU 	a1, a1, a3
		LA 		a3, SpecialFlags_flagType
		ADD 	a1, a3, a1
		LBU 	a1, 0x0 (a1)
		JAL 	@CheckFlag
		LH 		a0, 0x0 (a2)
		LW 		a3, @VarStorage3
		LW 		a2, @VarStorage2
		LW 		a1, @VarStorage1
		LW 		a0, @VarStorage0
		// Get Address of last two characters
		LW 		t6, 0x0 (a0)
		LBU 	t9, 0x0 (a1)
		ADD 	t6, t6, t9
		ADDI 	t6, t6, -2 // FF or N_
		// Alter last two characters
		BEQZ 	v0, SpecialFlagsText_Off
		NOP

	SpecialFlagsText_On:
		LI 		t9, 0x4E
		SB 		t9, 0x0 (t6)
		B 		SpecialFlagsText_FinishCorrection
		SB 		r0, 0x1 (t6)

	SpecialFlagsText_Off:
		LI 		t9, 0x46
		SB 		t9, 0x0 (t6)
		SB 		t9, 0x1 (t6)

	SpecialFlagsText_FinishCorrection:
		ADDIU 	a0, a0, 4
		ADDIU 	a1, a1, 1
		ADDIU 	a2, a2, 2
		ADDI 	a3, a3, -1
		BEQZ 	a3, FinishSpecialFlagsCorrection
		NOP
		B 		CorrectSpecialFlagsText
		NOP	

	FinishSpecialFlagsCorrection:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

GrabSandstormAddress:
	LW 		a0, @CurrentMap
	LI 		a1, 0x26 // Aztec
	BNE 	a0, a1, FinishGrabbingSandstorm
	NOP
	LW 		a0, @ObjectModel2Timer
	LI 		a1, 1
	BNE 	a0, a1, FinishGrabbingSandstorm // Only grab address on frame 1 of loading a map
	NOP
	LW 		a0, @ObjectModel2Pointer
	LW 		a1, @ObjectModel2Count

	CheckThroughObjects:
		LHU 	a2, 0x8A (a0)
		LI 		a3, 0xC1
		BEQ 	a2, a3, SetSandstormAddress
		NOP
		ADDI 	a1, a1, -1
		BEQZ 	a1, FinishGrabbingSandstorm
		ADDIU 	a0, a0, 0x90
		B 		CheckThroughObjects
		NOP

	SetSandstormAddress:
		LW 		a2, 0x7C (a0)
		ADDIU 	a2, a2, 0x54
		SW 		a2, @SandstormAddress

	FinishGrabbingSandstorm:
		JR 		ra
		NOP

ToggleAztecSandstorm:
	SW 		ra, @ReturnAddress
	LW 		a0, @CurrentMap
	LI 		a1, 0x26 // Aztec
	BNE 	a0, a1, ToggleSandstorm_NotAztec
	NOP
	LBU 	a0, @TBVoidByte
	ANDI 	a0, a0, 2
	BNEZ 	a0, FinishTogglingSandstorm // Pause Menu
	NOP
	LH 		a0, @NewlyPressedControllerInput
	ANDI 	a0, a0, @L_Button
	BEQZ 	a0, FinishTogglingSandstorm
	NOP
	LW 		a0, @SandstormAddress
	BEQZ 	a0, FinishTogglingSandstorm
	NOP
	// Toggle Sandstorm
	LBU 	a1, 0x0 (a0)
	LI 		a2, 1
	SUBU 	a1, a2, a1
	SB 		a1, 0x0 (a0)

	ToggleSandstorm_NotAztec:

	FinishTogglingSandstorm:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

UpdateSandstormText:
	LW 		a0, @CurrentMap
	LI 		a1, 0x26
	BNE 	a0, a1, UpdateSandstorm_NotAztec
	NOP
	LBU 	a0, @SandstormChange
	BNEZ 	a0, UpdateSandstorm_ReadChange
	NOP
	LW 		a0, @SandstormAddress
	LBU 	a1, 0x0 (a0)
	BEQZ 	a1, UpdateSandstorm_IsOff
	NOP
	B 		UpdateSandstorm_IsOn
	NOP

	UpdateSandstorm_ReadChange:
		LBU  	a0, @SandstormActive
		BEQZ 	a0, UpdateSandstorm_IsOff
		NOP

	UpdateSandstorm_IsOn:
		LA 		a0, Sandstorm_text_IsOn
		SW 		a0, @SandstormText
		B  		FinishUpdatingSandstorm
		NOP

	UpdateSandstorm_IsOff:
		LA 		a0, Sandstorm_text_IsOff
		SW 		a0, @SandstormText
		B 		FinishUpdatingSandstorm
		NOP

	UpdateSandstorm_NotAztec:
		LA 		a0, Sandstorm_text_isUnknown
		SW 		a0, @SandstormText

	FinishUpdatingSandstorm:
		JR 		ra
		NOP

GetGKTimer:
	LW 		a0, @CurrentMap
	LI 		a1, 0x48 // Caves
	BNE 	a0, a1, FinishGettingGKTimer
	NOP
	LW 		a0, @ObjectModel2Timer
	BEQZ 	a0, FinishGettingGKTimer
	NOP
	LW 		a0, @GiantKoshaTimerAddress
	BEQZ 	a0, FinishGettingGKTimer
	NOP
	LHU 	a0, 0x0(a0)
	SH 		a0, @GiantKoshaTimerValue

	FinishGettingGKTimer:
		JR 		ra
		NOP


GrabGKTimerAddress:
	LW 		v1, 0x0 (a0)	
	ADDIU 	s0, v1, 6
	SW 		s0, @GiantKoshaTimerAddress
	OR 		s0, a0, r0
	J 		0x8064607C
	NOP

AutoPhaseState:
	LBU 	a0, @AutoPhaseStateOn
	BEQZ 	a0, FinishAutoPhaseState
	NOP
	LW 		a0, @Player
	BEQZ 	a0, FinishAutoPhaseState
	NOP
	LHU	 	a1, 0xE6 (a0) // Facing Angle
	LHU 	a3, 0x18A (a0) // Moving Angle
	SLTIU 	a2, a1, 2048 // 4096 for hyper-extended phase state
	BEQZ 	a2, FinishAutoPhaseState
	NOP
	ADDIU 	a1, a1, 4096
	ADDIU 	a3, a3, 4096
	SH 		a1, 0xE6 (a0)
	SH 		a3, 0x18A (a0)

	FinishAutoPhaseState:
		JR 		ra
		NOP

UpdateMovementStateText:
	LBU 	a0, @VariableDisplayOn
	LI 		a1, @MovementStateIndex
	BNE 	a0, a1, FinishUpdatingStateText
	NOP
	LW 		a0, @Player
	BEQZ 	a0, FinishUpdatingStateText
	NOP
	LBU 	a1, 0x154 (a0)
	LA 		a2, MovementStates
	LA 		a3, MovementStates_length

	LoopThroughText:
		BEQZ 	a1, WriteMovementStatePointer
		NOP
		ADDI 	a1, a1, -1
		LBU 	t6, 0x0 (a3)
		ADDIU 	t6, t6, 1
		ADD 	a2, a2, t6
		B 		LoopThroughText
		ADDIU 	a3, a3, 1

	WriteMovementStatePointer:
		SW 		a2, @MovementStateText

	FinishUpdatingStateText:
		JR 		ra
		NOP

FormatTextForWatch:
	// a0 = header (Max length = 5 Chars)
	// a1 = value (u32)
	// a2 = format_type
		// 0 = int
	// a3 = header_length (u8)
	LI 		t9, @DisplayText
	SD 		r0, 0x0 (t9)
	SD 		r0, 0x8 (t9)
	ADDIU 	t3, t9, 0
	ADD 	t3, t3, a3
	ADDI 	t3, t3, -1
	DADDIU 	t9, a0, 0
	LI 		t8, 0

	FormatText_HeaderLoop:
		ANDI 	t6, t9, 0xFF
		SB 		t6, 0x0 (t3)
		DSRL 	t9, t9, 8
		ADDI 	t3, t3, -1
		ADDIU 	t8, t8, 1
		BEQ 	t8, a3, FormatText_Delimiter
		NOP
		B 		FormatText_HeaderLoop
		NOP
	
	FormatText_Delimiter:
		LI 		t9, @DisplayText
		ADD 	t9, t9, a3
		LI 		t6, 0x3A
		SB 		t6, 0x0 (t9)
		LI 		t6, 0x20
		SB 		t6, 0x1 (t9)
		BEQZ 	a2, FormatText_IsInt
		LI 		t8, 1
		BEQ 	a2, t8, FormatText_IsFloat
		NOP
		B 		FinishFormattingText
		NOP

	FormatText_IsInt:
		LI 		t8, @DisplayText
		ADDIU 	t8, t8, 0xF
		ADDIU 	t9, a1, 0 // Remaining
		LI 		t6, 0 // Length

		FormatText_IntLoop:
			LI 		t3, 10
			DDIVU 	t9, t3
			MFHI 	t3 // Remainder
			ADDIU 	t3, t3, 0x30 // ASCII
			SB 		t3, 0x0 (t8)
			ADDIU 	t6, t6, 1
			ADDI 	t8, t8, -1
			MFLO 	t9 // Copy Quotient to remaining
			BEQZ 	t9, FormatText_Int_Finish
			NOP
			SLTIU 	t3, t6, 8
			BEQZ 	t3, FormatText_Int_Finish
			NOP
			B 		FormatText_IntLoop
			NOP

		FormatText_Int_Finish:
			LI 		t3, @DisplayText
			ADD 	t3, t3, a3
			ADDIU 	t3, t3, 2
			ADDIU 	t8, t8, 1
			
		FormatText_Int_FinishLoop:
			LBU 	t9, 0x0 (t8)
			SB 		t9, 0x0 (t3)
			ADDIU 	t3, t3, 1
			ADDIU 	t8, t8, 1
			ADDI 	t6, t6, -1
			BEQZ 	t6, FormatText_Int_FinishCap
			NOP
			B 		FormatText_Int_FinishLoop
			NOP

		FormatText_Int_FinishCap:
			B 		FinishFormattingText
			SB 		r0, 0x0 (t3)

	FormatText_IsFloat:
		LUI 	t6, 0x3F00 // 0.5 as float
		MTC1 	t6, f6 
		MTC1 	a1, f0
		SUB.S 	f0, f0, f6
		CVT.W.S f2, f0 // f2 = Int Portion
		CVT.S.W f4, f2
		ADD.S 	f0, f0, f6
		SUB.S 	f0, f0, f4 // f0 = Dec Portion
		LUI 	t6, 0x42C8 // 100 as float
		MTC1 	t6, f4
		MUL.S 	f0, f0, f4
		CVT.W.S f4, f0 // Dec as Int
		MFC1 	t6, f4 // Dec Portion
		MFC1 	t9, f2 // Int Portion
		SW 		t6, @VarStorage1
		SW 		t9, @VarStorage0
		LI 		t8, @DisplayText
		ADDIU 	t8, t8, 0xC
		// t9 = remaining
		LI 		t6, 0 // Length

		FormatText_FloatLoop_Int:
			LI 		t3, 10
			DDIVU 	t9, t3
			MFHI 	t3 // Remainder
			ADDIU 	t3, t3, 0x30 // ASCII
			SB 		t3, 0x0 (t8)
			ADDIU 	t6, t6, 1
			ADDI 	t8, t8, -1
			MFLO 	t9 // Copy Quotient to remaining
			BEQZ 	t9, FormatText_FloatInt_Finish
			NOP
			SLTIU 	t3, t6, 5
			BEQZ 	t3, FormatText_FloatInt_Finish
			NOP
			B 		FormatText_FloatLoop_Int
			NOP

		FormatText_FloatInt_Finish:
			LI 		t8, @DisplayText
			LI 		t9, 0x2E // "."
			SB 		t9, 0xD (t8)
			LW 		t9, @VarStorage1
			LI 		t3, 10
			DDIVU 	t9, t3
			MFLO 	t3 // 10th
			LI 		t9, 10
			BEQ 	t3, t9, FormatText_FloatInt_99
			ADDIU 	t3, t3, 0x30
			SB 		t3, 0xE (t8)
			MFHI 	t3 // 100th
			ADDIU 	t3, t3, 0x30
			B 		FormatText_FloatInt_GetRewriteAddresses
			SB 		t3, 0xF (t8)

		FormatText_FloatInt_99:
			LI 		t3, 0x39
			SB 		t3, 0xE (t8)
			SB 		t3, 0xF (t8)
			
		FormatText_FloatInt_GetRewriteAddresses:
			ADDIU 	t6, t6, 3 // Length
			LI 		t3, @DisplayText
			ADD 	t3, t3, a3
			ADDIU 	t9, t3, 2 // Start of text area to write
			LI 		t3, @DisplayText
			LI 		t8, 0x10
			ADD 	t8, t8, t3
			SUBU 	t8, t8, t6 // Start of written text area

		FormatText_FloatInt_FinishLoop:
			LBU 	t3, 0x0 (t8)
			SB 		t3, 0x0 (t9)
			ADDIU 	t9, t9, 1
			ADDIU 	t8, t8, 1
			ADDI 	t6, t6, -1
			BEQZ 	t6, FormatText_FloatInt_FinishCap
			NOP
			B 		FormatText_FloatInt_FinishLoop
			NOP

		FormatText_FloatInt_FinishCap:
			B 		FinishFormattingText
			SB 		r0, 0x0 (t9)


	FinishFormattingText:
		JR 		ra
		NOP

ConvertCodePointerForWatchText:
	// a1 = New Address
	SRL 	a2, a1, 16
	ANDI 	a0, a1, 0xFFFF
	SLTIU 	a1, a0, 0x8000
	ADD 	a2, a2, a1
	SH 		a2, 0x8068E80A
	SH 		a0, 0x8068E812
	JR 		ra
	NOP

SpawnLZIndicators:
	SW 		ra, @ReturnAddress
	LW 		a0, @ObjectModel2Pointer
	BEQZ 	a0, FinishSpawningLZIndicators
	NOP
	LW 		a0, @ObjectModel2Timer
	LI 		a1, 1
	BNE 	a0, a1, FinishSpawningLZIndicators
	NOP
	LW 		a0, @ObjectModel2Count_Dupe
	SW 		a0, @InitialObjectModel2ArrayCount
	LW 		t3, @LoadingZoneArray
	LHU 	t6, @LoadingZoneArraySize
	BEQZ 	t3, FinishSpawningLZIndicators
	NOP
	BEQZ 	t6, FinishSpawningLZIndicators
	NOP

	LoadingZoneLoop:
		LW 		a0, @ObjectModel2Count_Dupe // OM2 Count
		SW 		a0, @VarStorage0
		SW 		r0, 0x10 (sp)
		// X Position
		LH 		a1, 0x0 (t3)
		MTC1 	a1, f0
		CVT.S.W f0, f0
		MFC1 	a1, f0
		// Y Position
		LH 		a2, 0x2 (t3)
		MTC1 	a2, f0
		CVT.S.W f0, f0
		// Y Position - Negative Offset
		LHU 	a0, 0x6 (t3)
		MTC1 	a0, f2
		CVT.S.W f2, f2
		LI 		a0, 0x4154ec4f
		MTC1 	a0, f4
		DIV.S 	f6, f2, f4
		SUB.S 	f0, f0, f6
		MFC1 	a2, f0
		// Z Position
		LH 		a3, 0x4 (t3)
		MTC1 	a3, f0
		CVT.S.W f0, f0
		MFC1 	a3, f0
		SW 		t3, @VarStorage1
		SW 		t6, @VarStorage2
		// Object Type
		LH 		a0, 0x10 (t3)
		SLL 	a0, a0, 1
		LA 		t6, LoadingZone_ObjectIndicators
		ADD 	t6, t6, a0
		LHU 	a0, 0x0 (t6)
		JAL 	@SpawnObjectModelTwo
		SH 		a0, 0x16 (sp)  // Object ID
		// Set Hitbox Scale to be 0
		LW 		a0, @ObjectModel2Pointer
		LI 		a1, 0x90
		LW 		a2, @VarStorage0
		MULTU 	a1, a2
		MFLO 	a1
		ADD 	a1, a0, a1
		SW 		r0, 0xC (a1)
		// RADIUS
		LW 		t3, @VarStorage1
		LW 		t6, @VarStorage2
		LHU 	a0, 0x6 (t3)
		MTC1 	a0, f0
		CVT.S.W f0, f0
		LI 		a0, 0x41C4EC4F
		MTC1 	a0, f2
		DIV.S 	f4, f0, f2
		MFC1 	a0, f4
		LW 		a2, 0x20 (a1)
		SW 		r0, 0xC (a2) // Model Size (0 to hide initially)
		SW 		a0, 0x1C (a2) // Stored Model Size
		// Increment Object
		ADDI 	t6, t6, -1
		BEQZ 	t6, SpawnLZIndicators_CheckShown
		ADDIU 	t3, t3, 0x3A
		B 		LoadingZoneLoop
		NOP
	
	SpawnLZIndicators_CheckShown:
		JAL 	UpdateShownLZIndicators
		NOP

	FinishSpawningLZIndicators:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

CreateLZTypesArrays:
	LI 		a0, @LoadingZoneTypes
	LA 		a1, LoadingZone_TypeText
	LA 		a2, LoadingZone_TypeLength
	LI 		a3, @LoadingZoneTypesCount
	LI 		t9, 0

	CreateLZTypesSelectLoop:
		SW 		a1, 0x0 (a0)
		ADDI 	a3, a3, -1
		LBU 	t3, 0x0 (a2)
		ADDIU 	t3, t3, 1
		ADD 	a1, a1, t3
		ADDIU 	a2, a2, 1
		BEQZ 	a3, CreateMassTypeArray
		ADDIU 	a0, a0, 4
		B 		CreateLZTypesSelectLoop
		NOP

	CreateMassTypeArray:
		BNEZ 	t9, FinishCreatingLZTypesArrays
		NOP
		LI 		a0, @LoadingZoneMass
		LA 		a1, LoadingZone_MassActionText
		LA 		a2, LoadingZone_MassActionTextLength
		LI 		a3, @LoadingZoneMassCount
		B 		CreateLZTypesSelectLoop
		ADDIU 	t9, t9, 1

	FinishCreatingLZTypesArrays:
		JR 		ra
		NOP

CorrectLZTypesArray:
	LBU 	a1, @TBVoidByte
	ANDI 	a1, a1, 2
	BEQZ 	a1, FinishCorrectingLZTypesArrays
	NOP
	LI 		a0, @LoadingZoneTypes
	LA 		a1, LoadingZone_TypeLength
	LBU 	a2, @LZTypesShownBitfield
	LI 		a3, @LoadingZoneTypesCount
	LI 		t3, 1

	CorrectLZTypesText:
		// Check Bit
		AND 	t9, a2, t3 // 0 = not set
		LBU 	t8, 0x0 (a1) // Text Length
		LW 		t6, 0x0 (a0) // Text Location
		ADD 	t8, t6, t8
		ADDI 	t8, t8, -2 // Change location
		BEQZ 	t9, LZTypesText_Off
		NOP

	LZTypesText_On:
		LI 		t9, 0x4E
		SB 		t9, 0x0 (t8)
		B 		LZTypesText_FinishCorrection
		SB 		r0, 0x1 (t8)

	LZTypesText_Off:
		LI 		t9, 0x46
		SB 		t9, 0x0 (t8)
		SB 		t9, 0x1 (t8)

	LZTypesText_FinishCorrection:
		ADDIU 	a0, a0, 4
		ADDIU 	a1, a1, 1
		SLL 	t3, t3, 1
		ADDI 	a3, a3, -1
		BEQZ 	a3, FinishCorrectingLZTypesArrays
		NOP
		B 		CorrectLZTypesText
		NOP	

	FinishCorrectingLZTypesArrays:
		JR 		ra
		NOP

UpdateShownLZIndicators:
	// 0000 0001 - Loading Zones (0x1A8)
	// 0000 0010 - Cutscene Triggers (0x1A9)
	// 0000 0100 - Slide Triggers (0x1AC)
	// 0000 1000 - Misc Triggers (0x1AA)
	// 0001 0000 - Unknown Triggers (0x1AB)
	LW 		a0, @InitialObjectModel2ArrayCount
	LW 		a1, @ObjectModel2Pointer
	LW 		a2, @ObjectModel2Count_Dupe
	LA 		a3, LoadingZone_TypeObjs
	BEQ 	a0, a2, FinishUpdatingShownLZIndicators
	NOP
	LI 		t3, 0x90
	MULTU 	a0, t3
	MFLO 	t3
	ADD 	a1, a1, t3 // Start of new objs

	UpdateLZIndicatorLoop:
		LH 		t9, 0x84 (a1) // Object Type
		LI 		t8, 0
		
		LZIndicator_GetOffset:
			SLL 	t3, t8, 1
			ADD 	t6, t3, a3
			LHU		t6, 0x0 (t6) // Highlighted Object Type
			BEQ 	t6, t9, LZIndicator_FoundOffset
			NOP
			ADDIU 	t8, t8, 1
			LI 		t6, @LoadingZoneTypesCount
			BEQ 	t6, t8, LZIndicator_Increment // Not found offset
			NOP
			B 		LZIndicator_GetOffset
			NOP

		LZIndicator_FoundOffset:
			LI 		t3, 1
			SLLV 	t3, t3, t8
			LBU 	t9, @LZTypesShownBitfield
			AND		t9, t9, t3
			BEQZ 	t9, LZIndicator_NotShown
			NOP

		LZIndicator_Shown:
			LW 		t9, 0x20 (a1)
			LW 		t6, 0x1C (t9)
			B 		LZIndicator_Increment
			SW 		t6, 0x0C (t9)

		LZIndicator_NotShown:
			LW 		t9, 0x20 (a1)
			SW 		r0, 0x0C (t9)

		LZIndicator_Increment:
			ADDIU 	a1, a1, 0x90
			ADDIU 	a0, a0, 1
			BEQ 	a0, a2, FinishUpdatingShownLZIndicators
			NOP
			B 		UpdateLZIndicatorLoop
			NOP

	FinishUpdatingShownLZIndicators:
		JR 		ra
		NOP

InfiniteHealth:
	LBU 	a0, @InfiniteHealthCheatOn
	BEQZ 	a0, InfiniteHealth_Finish
	NOP
	LI 		a0, @CollectableBase
	LBU 	a1, 0xC (a0) // Grab Melons
	SLL 	a1, a1, 2
	SB 		a1, 0xB (a0) // Grab Health
	
	InfiniteHealth_Finish:
		JR 		ra
		NOP

CompleteFile:
	SW 		ra, @ReturnAddress4
	LA 		a0, FileCompleteFlag
	JAL 	SetAllFlags
	NOP
	LI 		a0, @MovesBase
	LI 		a2, 0 // Counter
	LI 		a3, 6 // Tiny Isles Count
	LI 		t3, 3 // Tiny Index

	WriteGBs:
		LI 		a1, 5
		SH 		a1, 0x42 (a0) // Japes
		SH 		a1, 0x44 (a0) // Aztec
		SH 		a1, 0x46 (a0) // Factory
		SH 		a1, 0x48 (a0) // Galleon
		SH 		a1, 0x4A (a0) // Fungi
		SH 		a1, 0x4C (a0) // Caves
		SH 		a1, 0x4E (a0) // Castle
		SH 		a1, 0x50 (a0) // Isles
		BNE 	a2, t3, CompleteFile_Increment
		NOP
		SH 		a3, 0x50 (a0) // Tiny Isles

	CompleteFile_Increment:
		ADDIU 	a2, a2, 1 // Increment counter
		BEQ 	a1, a2, CompleteFile_Finish
		NOP	
		B 		WriteGBs
		ADDIU 	a0, a0, 0x5E // Next kong base

	CompleteFile_Finish:
		LW 		ra, @ReturnAddress4
		JR 		ra
		NOP

MaxFile:
	SW 		ra, @ReturnAddress4
	LA 		a0, FileCompleteFlag
	JAL 	SetAllFlags
	NOP
	LI 		a0, @MovesBase
	LI 		a2, 0 // Counter
	LI 		a3, 5 // Kong Cap

	WriteMaxGBs:
		LI 		a1, 7
		SH 		a1, 0x42 (a0) // Japes
		SH 		a1, 0x44 (a0) // Aztec
		SH 		a1, 0x46 (a0) // Factory
		SH 		a1, 0x48 (a0) // Galleon
		SH 		a1, 0x4A (a0) // Fungi
		SH 		a1, 0x4C (a0) // Caves
		SH 		a1, 0x4E (a0) // Castle
		SH 		a1, 0x50 (a0) // Isles
		ADDIU 	a2, a2, 1 // Increment counter
		BEQ 	a3, a2, MaxFile_Finish
		NOP	
		B 		WriteMaxGBs
		ADDIU 	a0, a0, 0x5E // Next kong base

	MaxFile_Finish:
		LW 		ra, @ReturnAddress4
		JR 		ra
		NOP

HandleFileStatus:
	SW 		ra, @ReturnAddress2
	LBU 	a0, @SelectedFileStatus
	BEQZ 	a0, HandleFileStatus_Finish
	NOP
	LI 		a1, 1
	BEQ 	a0, a1, HandleFileStatus_Handle101
	NOP
	LI 		a1, 2
	BEQ 	a0, a1, HandleFileStatus_HandleMax
	NOP
	B 		HandleFileStatus_Finish
	NOP

	HandleFileStatus_Handle101:
		JAL 	CompleteFile
		NOP
		JAL 	CodedPlaySFX
		LI 		a0, @Bounce
		B 		HandleFileStatus_Finish
		NOP


	HandleFileStatus_HandleMax:
		JAL 	MaxFile
		NOP
		JAL 	CodedPlaySFX
		LI 		a0, @FeedMe
		B 		HandleFileStatus_Finish
		NOP

	HandleFileStatus_Finish:
		LW 		ra, @ReturnAddress2
		JR 		ra
		NOP

HandleIndependentCheats:
	SW 		ra, @ReturnAddress2
	LBU 	a0, @SelectedIndependentCheat
	BEQZ 	a0, HandleIndependentCheats_InfHealth
	NOP
	LI 		a1, 1
	BEQ 	a0, a1, HandleIndependentCheats_AutoPhaseState
	NOP
	B 		HandleIndependentCheats_Finish
	NOP

	HandleIndependentCheats_InfHealth:
		LBU 	a2, @InfiniteHealthCheatOn
		LI 		a3, 1
		SUBU 	a2, a3, a2
		SB 		a2, @InfiniteHealthCheatOn
		B 		HandleIndependentCheats_Finish
		NOP

	HandleIndependentCheats_AutoPhaseState:
		LBU 	a2, @AutoPhaseStateOn
		LI 		a3, 1
		SUBU 	a2, a3, a2
		SB 		a2, @AutoPhaseStateOn
		B 		HandleIndependentCheats_Finish
		NOP

	HandleIndependentCheats_Finish:
		LW 		ra, @ReturnAddress2
		JR 		ra
		NOP

UpdateIndependentCheatText:
	LA 		a0, IndependentCheat_array_text
	LI 		a1, @IndependentCheatCount
	LA 		a2, IndependentCheat_array_length
	LA 		a3, IndependentCheat_array_vars

	UpdateIndependentCheatText_Loop:
		LW 		t3, 0x0 (a0)
		LBU 	t6, 0x0 (a2)
		ADD 	t6, t6, t3
		ADDI 	t6, t6, -2 // Text Location
		LW 		t9, 0x0 (a3)
		LBU 	t9, 0x0 (t9) // Variable
		BEQZ 	t9, UpdateIndependentCheatText_IsOff
		NOP

	UpdateIndependentCheatText_IsOn:
		LI 		t8, 0x4E // N
		SB 		t8, 0x0 (t6)
		B  		UpdateIndependentCheatText_Increment
		SB 		r0, 0x1 (t6) // Terminator

	UpdateIndependentCheatText_IsOff:
		LI 		t8, 0x46 // F
		SB 		t8, 0x0 (t6)
		SB 		t8, 0x1 (t6) 

	UpdateIndependentCheatText_Increment:
		ADDIU 	a0, a0, 4 // Text
		ADDI 	a1, a1, -1 // Counter
		BEQZ 	a1, UpdateIndependentCheatText_Finish
		ADDIU 	a3, a3, 4 // Var
		B 		UpdateIndependentCheatText_Loop
		ADDIU 	a2, a2, 1 // Length

	UpdateIndependentCheatText_Finish:
		JR 		ra
		NOP

LToLevitate:
	LBU 	a0, @LButtonCheatMode
	LI 		a1, 1
	BNE 	a0, a1, LToLevitate_Finish
	NOP
	LBU 	a0, @TBVoidByte
	ANDI 	a0, a0, 2
	BNEZ 	a0, LToLevitate_Finish // Pause Menu
	NOP
	LH 		a0, @ControllerInput
	ANDI 	a0, a0, @L_Button
	BEQZ 	a0, LToLevitate_Finish
	NOP
	LW 		a0, @Player
	BEQZ 	a0, LToLevitate_Finish
	NOP
	LH 		a1, @ControllerInput
	ANDI 	a1, a1, @R_Button
	BNEZ 	a1, FastLevitate
	NOP
	LH 		a1, @ControllerInput
	ANDI 	a1, a1, @Z_Button
	BNEZ 	a1, SlowLevitate
	NOP
	B 		NormalLevitate
	NOP

	FastLevitate:
		B 		IncrementHeight
		LUI 	a1, 0x41A0 // 20 as float

	SlowLevitate:
		B 		IncrementHeight
		LUI 	a1, 0x40A0 // 10 as float

	NormalLevitate:
		LUI 	a1, 0x4120 // 10 as float

	IncrementHeight:
		MTC1 	a1, f2
		SW 		r0, 0xC0 (a0) // Set Y Veloc
		LW 		a1, 0x80 (a0)
		MTC1 	a1, f0
		ADD.S 	f0, f0, f2
		MFC1 	a1, f0
		SW 		a1, 0x80 (a0)

	LToLevitate_Finish:
		JR 		ra
		NOP

LToCancelCS:
	SW 		ra, @ReturnAddress
	LBU 	a0, @LButtonCheatMode
	LI 		a1, 3
	BNE 	a0, a1, LToCancelCS_Finish
	NOP
	LBU 	a0, @TBVoidByte
	ANDI 	a0, a0, 2
	BNEZ 	a0, LToCancelCS_Finish // Pause Menu
	NOP
	LH 		a0, @NewlyPressedControllerInput
	ANDI 	a0, a0, @L_Button
	BEQZ 	a0, LToCancelCS_Finish
	NOP
	LBU 	a0, @CutsceneActive
	BEQZ 	a0, LToCancelCS_Finish
	NOP
	LH 		a0, @CutsceneIndex
	LW 		a1, @CutsceneTypePointer
	BEQZ 	a1, LToCancelCS_Finish
	NOP
	LW  	a1, 0xD0 (a1) // Cutscene Databank
	BEQZ 	a1, LToCancelCS_Finish
	NOP
	LI 		a2, 0xC
	MULTU 	a0, a2
	MFLO 	a2
	ADD 	a1, a1, a2
	LH 		a1, 0x0 (a1) // Required Cam State
	SH 		a1, @CurrentCameraState
	SH 		a1, @PreviousCameraState
	ADDI 	a1, a1, -1
	SH 		r0, @CameraStateChangeTimer
	LW 		a0, @Player
	BEQZ 	a0, LToCancelCS_Finish
	NOP
	LI 		a1, 0xC
	SB 		a1, 0x154 (a0)

	LToCancelCS_Finish:
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

KongCode:
	SW 		ra, @ReturnAddress2
	JAL 	AutoPhaseState
	NOP
	LBU		t6, @DisablePositionButtons
	BNEZ 	t6, KongCode_Finish
	NOP
	JAL 	PositionSavestates
	NOP

	KongCode_Finish:
		LW 		ra, @ReturnAddress2
		LW 		s0, 0x28 (sp)
		ADDIU 	sp, sp, 0x78
		J 		0x806F3758
		NOP

HandleTimer:
	// Timer Modes
		// 0 - Reset, 1 - Go, 2 - Finish
	// Start Modes
		// 0 - L, 1 - Load, 2 - Input
	// Finish Modes
		// 0 - L, 1 - Transition, 2 - CS, 3 - GB
	LBU 	a0, @TBVoidByte
	ANDI 	a0, a0, 2
	BEQZ 	a0, HandleTimer_TimerModes // Pause Menu
	NOP
	LBU 	a0, @TimerPauseMode
	BEQZ 	a0, HandleTimer_Finish
	NOP
	LBU 	a0, @StoredTimerMode
	LI 		a1, 1
	BNE 	a0, a1, HandleTimer_Finish
	NOP
	LW 		a0, @StoredLag
	LW 		a1, @TimerReduction
	ADD 	a1, a1, a0
	SW 		a1, @TimerReduction
	LW 		a1, @FrameReal
	LW 		a2, @StoredStart
	SUBU 	a1, a1, a2
	SW 		a1, @StoredTime
	B 		HandleTimer_Finish
	NOP

	HandleTimer_TimerModes:
		LBU 	a0, @StoredTimerMode
		BEQZ 	a0, HandleTimer_Ready
		NOP
		LI 		a1, 1
		BEQ 	a0, a1, HandleTimer_Running
		NOP
		LI 		a1, 2
		BEQ 	a0, a1, HandleTimer_Stopped
		NOP
		B 		HandleTimer_Finish
		NOP

	HandleTimer_Ready:
		LBU 	a0, @TimerStartMode
		BEQZ 	a0, HandleTimer_Ready_L
		NOP
		LI 		a1, 1
		BEQ 	a0, a1, HandleTimer_Ready_MapLoad
		NOP
		LI 		a1, 2
		BEQ 	a0, a1, HandleTimer_Ready_Input
		NOP
		B 		HandleTimer_Finish
		NOP

		HandleTimer_Ready_L:
			LH 		a0, @NewlyPressedControllerInput
			ANDI 	a0, a0, @L_Button
			BNEZ 	a0, HandleTimer_ReadyTick
			NOP
			B 		HandleTimer_Finish
			NOP

		HandleTimer_Ready_MapLoad:
			LW 		a0, @ObjectModel2Timer
			LI 		a1, 1
			BEQ 	a0, a1, HandleTimer_ReadyTick
			NOP
			B 		HandleTimer_Finish
			NOP

		HandleTimer_Ready_Input:
			LW 		a0, @ControllerInput
			BNEZ 	a0, HandleTimer_ReadyTick
			NOP
			B 		HandleTimer_Finish
			NOP

		HandleTimer_ReadyTick:
			LI 		a1, 1
			SB 		a1, @StoredTimerMode
			B 		HandleTimer_Finish
			NOP

	HandleTimer_Running:
		LW 		a1, @FrameReal
		LW 		a2, @StoredStart
		BNEZ 	a2, HandleTimer_Running2
		NOP
		SW 		a1, @StoredStart
		
	HandleTimer_Running2:
		SUBU 	a1, a1, a2
		SW 		a1, @StoredTime
		LBU 	a0, @TimerFinishMode
		BEQZ 	a0, HandleTimer_Running_L
		NOP
		LI 		a1, 1
		BEQ 	a0, a1, HandleTimer_Running_Transition
		NOP
		LI 		a1, 2
		BEQ 	a0, a1, HandleTimer_Running_Cutscene
		NOP
		LI 		a1, 3
		BEQ 	a0, a1, HandleTimer_Running_GB
		NOP
		B 		HandleTimer_Finish
		NOP

		HandleTimer_Running_L:
			LH 		a0, @NewlyPressedControllerInput
			ANDI 	a0, a0, @L_Button
			BNEZ 	a0, HandleTimer_RunningTick
			NOP
			B 		HandleTimer_Finish
			NOP

		HandleTimer_Running_Transition:
			LW 		a0, @TransitionSpeed
			LUI 	a1, 0x3F80 // f32 = 1
			BEQ 	a0, a1, HandleTimer_RunningTick
			NOP
			B 		HandleTimer_Finish
			NOP

		HandleTimer_Running_Cutscene:
			LBU 	a0, @InCutscene
			LI 		a1, 1
			BEQ 	a0, a1, HandleTimer_RunningTick
			NOP
			B 		HandleTimer_Finish
			NOP

		HandleTimer_Running_GB:
			LW 		a0, @Player
			BEQZ  	a0, HandleTimer_Finish
			NOP
			LBU 	a1, 0x154 (a0)
			LI 		a2, 0x70
			BEQ 	a1, a2, HandleTimer_RunningTick
			NOP
			B 		HandleTimer_Finish
			NOP

		HandleTimer_RunningTick:
			LI 		a1, 2
			SB 		a1, @StoredTimerMode
			B 		HandleTimer_Finish
			NOP

	HandleTimer_Stopped:
		LH 		a0, @NewlyPressedControllerInput
		ANDI 	a0, a0, @L_Button
		BEQZ 	a0, HandleTimer_Finish
		NOP
		SB 		r0, @StoredTimerMode
		SW 		r0, @StoredTime
		SW 		r0, @StoredStart
		SW 		r0, @TimerReduction
		SW 		r0, @TimerAfterReduction
		B 		HandleTimer_Finish
		NOP

	HandleTimer_Finish:
		LW 		a0, @StoredTime
		LW 		a1, @TimerReduction
		SUBU 	a0, a0, a1
		SW 		a0, @TimerAfterReduction
		JR 		ra
		NOP

GiveMoves:
	LI 		a0, 4
	LI 		a1, @MovesBase
	WriteMoves:
		LI 		t3, 0x0300
		LBU 	a2, @SlamLevel
		ADD 	t3, t3, a2
		SH 		t3, 0x0 (a1) // Special | Slam Level | Guns | Ammo Belt
		LBU 	a2, @SniperOn
		BEQZ 	a2, Sniper
		LI 		t3, 0x0302
		B 		Sniper
		LI 		t3, 0x0702

	Sniper:
		SH 		t3, 0x2 (a1) // Gun Bitfield, Ammo belt
		LI 		t3, 15
		SB 		t3, 0x4 (a1) // Instrument
		BEQZ 	a0, WriteMoveFlags
		ADDI 	a0, a0, -1 // Decrement Value for next kong
		B 		WriteMoves
		ADDIU 	a1, a1, 0x5E // Next kong base
	
	WriteMoveFlags:
		SW 		ra, @ReturnAddress
		LI 		a0, @CollectableBase
		// Melons
		LI 		a1, 3
		SB 		a1, 0xC(a0)
		// Health
		LI 		a1, 12
		SB 		a1, 0xB(a0)
		// How were your trading barrels this run?
		LA 		a0, MoveFlags
		JAL 	SetAllFlags
		NOP
		// Sound Effect
		JAL 	CodedPlaySFX
		LI 		a0, @Potion
		LW 		ra, @ReturnAddress
		JR 		ra
		NOP

RestockInventory:
	SW 		ra, @ReturnAddress
	// Standard Ammo
	LI 		a0, @CollectableBase
	LI 		a1, 200
	SH 		a1, 0x0(a0)
	// Crystals
	LI 		a1, 3000 // Each crystal is 150, so this is 20 Crystals
	SH 		a1, 0x6(a0)
	// Film & Oranges
	LI 		a1, 20
	SH 		a1, 0x4(a0) // Oranges
	SH 		a1, 0x8(a0) // Film
	// Health
	LBU 	a1, 0xC (a0) // Grab Melons
	SLL 	a1, a1, 2
	SB 		a1, 0xB (a0) // Grab Health
	// Instrument Ammo
	LI 		a0, @MovesBase
	LI 		a1, 10
	SH 		a1, 0x0008(a0) // DK
	SH 		a1, 0x0066(a0) // Diddy
	SH 		a1, 0x00C4(a0) // Lanky
	SH 		a1, 0x0122(a0) // Tiny
	SH 		a1, 0x0180(a0) // Chunky
	// Sound Effect
	JAL 	CodedPlaySFX
	LI 		a0, @AmmoPickup
	LW 		ra, @ReturnAddress
	JR 		ra
	NOP

.align
ROM_Name:
	.asciiz "PRACTICE THROUGH VERTICAL WALLS"


.align
Maps_Title:
	.asciiz "WARP TO MAP"

.align
Maps_JungleJapes_text:
	.asciiz "MAIN - PORTAL"
	.asciiz "MAIN - INTRO"
	.asciiz "MAIN - RIVER LOWER"
	.asciiz "MAIN - RIVER UPPER"
	.asciiz "MAIN - STORM AREA"
	.asciiz "MAIN - ZINGER AREA"
	.asciiz "BABOON BLAST COURSE"
	.asciiz "MINECART"
	.asciiz "MOUNTAIN"
	.asciiz "PAINTING ROOM"
	.asciiz "SHELLHIVE"
	.asciiz "UNDERGROUND"

.align
Maps_JungleJapes_textLen:
	.byte 13
	.byte 12
	.byte 18
	.byte 18
	.byte 17
	.byte 18
	.byte 19
	.byte 8
	.byte 8
	.byte 13
	.byte 9
	.byte 11

.align
Maps_JungleJapes_DestMap:
	.byte 0x7
	.byte 0x7
	.byte 0x7
	.byte 0x7
	.byte 0x7
	.byte 0x7
	.byte 0x25
	.byte 0x6
	.byte 0x4
	.byte 0xD
	.byte 0xC
	.byte 0x21

.align
Maps_JungleJapes_DestExit:
	.byte 0xF
	.byte 0x0
	.byte 0x10
	.byte 0x2
	.byte 0x3
	.byte 0x1
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0

.align
Maps_AngryAztec_text:
	.asciiz "MAIN - PORTAL"
	// .asciiz "MAIN - INTRO"
	.asciiz "MAIN - FEED ME TOTEM"
	.asciiz "MAIN - OASIS"
	.asciiz "MAIN - SNAKE ROAD"
	.asciiz "BABOON BLAST COURSE"
	.asciiz "BEETLE RACE"
	.asciiz "FIVE DOOR TEMPLE - DK"
	.asciiz "FIVE DOOR TEMPLE - DIDDY"
	.asciiz "FIVE DOOR TEMPLE - LANKY"
	.asciiz "FIVE DOOR TEMPLE - TINY"
	.asciiz "FIVE DOOR TEMPLE - CHUNKY"
	.asciiz "LLAMA TEMPLE"
	.asciiz "TINY TEMPLE"

.align
Maps_AngryAztec_textLen:
	.byte 13
	// .byte 12
	.byte 20
	.byte 12
	.byte 17
	.byte 19
	.byte 11
	.byte 21
	.byte 24
	.byte 24
	.byte 23
	.byte 25
	.byte 12
	.byte 11

.align
Maps_AngryAztec_DestMap:
	.byte 0x26
	// .byte 0x26
	.byte 0x26
	.byte 0x26
	.byte 0x26
	.byte 0x29
	.byte 0xE
	.byte 0x13
	.byte 0x15
	.byte 0x17
	.byte 0x16
	.byte 0x18
	.byte 0x14
	.byte 0x10

.align
Maps_AngryAztec_DestExit:
	.byte 0x0
	// .byte - Intro
	.byte 0x12
	.byte 0x8
	.byte 0xA
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0


.align
Maps_FranticFactory_text:
	.asciiz "MAIN - PORTAL"
	.asciiz "MAIN - ARCADE ROOM"
	.asciiz "MAIN - BLOCK TOWER"
	.asciiz "MAIN - CANDY AREA"
	.asciiz "MAIN - FUNKY ROOM"
	// .asciiz "MAIN - PROD ROOM LOWER"
	.asciiz "MAIN - PRODUCTION ROOM"
	.asciiz "MAIN - RESEARCH AND DEV"
	.asciiz "MAIN - SNIDES ROOM"
	.asciiz "MAIN - STORAGE ROOM"
	.asciiz "ARCADE"
	.asciiz "BABOON BLAST COURSE"
	.asciiz "CAR RACE"
	.asciiz "CRUSHER ROOM"
	.asciiz "POWER SHED"

.align
Maps_FranticFactory_textLen:
	.byte 13
	.byte 18
	.byte 18
	.byte 17
	.byte 17
	// .byte 22
	.byte 22
	.byte 23
	.byte 18
	.byte 19
	.byte 6
	.byte 19
	.byte 8
	.byte 12
	.byte 10

.align
Maps_FranticFactory_DestMap:
	.byte 0x1A
	.byte 0x1A
	.byte 0x1A
	.byte 0x1A
	// .byte 0x1A
	.byte 0x1A
	.byte 0x1A
	.byte 0x1A
	.byte 0x1A
	.byte 0x1A
	.byte 0x2
	.byte 0x6E
	.byte 0x1B
	.byte 0x24
	.byte 0x1D

.align
Maps_FranticFactory_DestExit:
	.byte 0x0
	.byte 0xA
	.byte 0x9
	.byte 0x11
	.byte 0x6
	// .byte - Production Room Lower
	.byte 0xC
	.byte 0xB
	.byte 0x5
	.byte 0x4
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0

.align
Maps_GloomyGalleon_text:
	.asciiz "MAIN - PORTAL"
	// .asciiz "MAIN - INTRO"
	.asciiz "MAIN - CRANKY AREA"
	.asciiz "MAIN - LIGHTHOUSE SIDE"
	.asciiz "MAIN - SHIPWRECK SIDE"
	.asciiz "BABOON BLAST COURSE"
	.asciiz "FIVE DOOR SHIP - DK"
	.asciiz "FIVE DOOR SHIP - DIDDY"
	.asciiz "FIVE DOOR SHIP - LANKY"
	.asciiz "FIVE DOOR SHIP - TINY"
	.asciiz "FIVE DOOR SHIP - CHUNKY"
	.asciiz "K. ROOL'S SHIP"
	.asciiz "LIGHTHOUSE"
	.asciiz "MERMAID PALACE"
	.asciiz "MECHANICAL FISH"
	.asciiz "SEAL RACE"
	.asciiz "SUBMARINE"
	.asciiz "TREASURE CHEST"
	.asciiz "TWO DOOR SHIP - LANKY"
	.asciiz "TWO DOOR SHIP - TINY"

.align
Maps_GloomyGalleon_textLen:
	.byte 13
	// .byte 12
	.byte 18
	.byte 22
	.byte 21
	.byte 19
	// 5DS
	.byte 19
	.byte 22
	.byte 22
	.byte 21
	.byte 23
	// END 5DS
	.byte 14
	.byte 10
	.byte 14
	.byte 15
	.byte 9
	.byte 9
	.byte 14
	// 2DS
	.byte 21
	.byte 20

.align
Maps_GloomyGalleon_DestMap:
	.byte 0x1E
	// .byte 0x1E
	.byte 0x1E
	.byte 0x1E
	.byte 0x1E
	.byte 0x36
	.byte 0x2E // DK
	.byte 0x2B // Diddy
	.byte 0x2B // Lanky
	.byte 0x2E // Tiny
	.byte 0x2B // Chunky
	.byte 0x1F
	.byte 0x31
	.byte 0x2D
	.byte 0x33
	.byte 0x27
	.byte 0xB3
	.byte 0x2C
	.byte 0x2F // Lanky
	.byte 0x2F // Tiny

.align
Maps_GloomyGalleon_DestExit:
	.byte 0x0
	// .byte - Intro
	.byte 0xD
	.byte 0xB
	.byte 0x7
	.byte 0
	.byte 0x0 // DK
	.byte 0x0 // Diddy
	.byte 0x2 // Lanky
	.byte 0x1 // Tiny
	.byte 0x1 // Chunky
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0x1 // Lanky
	.byte 0x0 // Tiny

.align
Maps_FungiForest_text:
	.asciiz "MAIN - PORTAL"
	// .asciiz "MAIN - INTRO"
	.asciiz "MAIN - APPLE SIDE"
	.asciiz "MAIN - MILL SIDE"
	.asciiz "MAIN - MUSHROOM SIDE"
	.asciiz "MAIN - OWL TREE"
	.asciiz "MAIN - TOP OF MUSHROOM"
	.asciiz "ANTHILL"
	.asciiz "BABOON BLAST COURSE"
	.asciiz "BARN"
	.asciiz "DARK ATTIC"
	.asciiz "FACE PUZZLE"
	.asciiz "GIANT MUSHROOM - BOTTOM"
	.asciiz "GIANT MUSHROOM - MIDDLE"
	.asciiz "GIANT MUSHROOM - TOP"
	.asciiz "LANKY'S ATTIC"
	.asciiz "MILL - FRONT" // Crusher Side
	.asciiz "MILL - REAR" // Spider Side
	.asciiz "MINECART"
	.asciiz "MUSHROOM TOP - LIGHT ROOM"
	.asciiz "MUSHROOM TOP - DARK ROOM"
	.asciiz "SPIDER BOSS"
	.asciiz "WINCH ROOM"

.align
Maps_FungiForest_textLen:
	.byte 13
	// .byte 12
	.byte 17
	.byte 16
	.byte 20
	.byte 15
	.byte 22
	// END OF MAIN
	.byte 7
	.byte 19
	.byte 4
	.byte 10
	.byte 11
	// GIANT MUSHROOM
	.byte 23
	.byte 23
	.byte 20
	// END OF GM
	.byte 13
	.byte 12
	.byte 11
	.byte 8
	.byte 25
	.byte 24
	.byte 11
	.byte 10

.align
Maps_FungiForest_DestMap:
	.byte 0x30
	// .byte 0x30
	.byte 0x30
	.byte 0x30
	.byte 0x30
	.byte 0x30
	.byte 0x30
	// END OF MAIN
	.byte 0x34
	.byte 0xBC
	.byte 0x3B
	.byte 0x38
	.byte 0x47
	// GIANT MUSH
	.byte 0x40
	.byte 0x40
	.byte 0x40
	// END OF GM
	.byte 0x3A
	.byte 0x3D
	.byte 0x3E
	.byte 0x37
	.byte 0x3F
	.byte 0x46
	.byte 0x3C
	.byte 0x39

.align
Maps_FungiForest_DestExit:
	.byte 0x0
	// .byte - Intro
	.byte 0x12
	.byte 0x6
	.byte 0x8
	.byte 0x17
	.byte 0x18
	// END OF MAIN
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	// GIANT MUSH
	.byte 0x0
	.byte 0x1
	.byte 0x4
	// END OF GM
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0

.align
Maps_CrystalCaves_text:
	.asciiz "MAIN - PORTAL"
	// .asciiz "MAIN - INTRO"
	.asciiz "MAIN - CABINS"
	.asciiz "MAIN - GIANT BOULDER"
	.asciiz "MAIN - ICE CASTLE"
	.asciiz "MAIN - IGLOOS"
	.asciiz "MAIN - WATERFALL"
	.asciiz "BABOON BLAST COURSE"
	.asciiz "BEETLE RACE"
	.asciiz "FIVE DOOR CABIN - DK"
	.asciiz "FIVE DOOR CABIN - DIDDY CANDLES"
	.asciiz "FIVE DOOR CABIN - DIDDY ENEMIES"
	.asciiz "FIVE DOOR CABIN - TINY"
	.asciiz "FIVE DOOR CABIN - CHUNKY"
	.asciiz "FIVE DOOR IGLOO - DK"
	.asciiz "FIVE DOOR IGLOO - DIDDY"
	.asciiz "FIVE DOOR IGLOO - LANKY"
	.asciiz "FIVE DOOR IGLOO - TINY"
	.asciiz "FIVE DOOR IGLOO - CHUNKY"
	.asciiz "ICE CASTLE"
	.asciiz "ROTATING ROOM"
	.asciiz "SPRINT CABIN"

.align
Maps_CrystalCaves_textLen:
	.byte 13
	// .byte 12
	.byte 13
	.byte 20
	.byte 17
	.byte 13
	.byte 16
	// END OF MAIN
	.byte 19
	.byte 11
	.byte 20
	.byte 31
	.byte 31
	.byte 22
	.byte 24
	.byte 20
	.byte 23
	.byte 23
	.byte 22
	.byte 24
	.byte 10
	.byte 13
	.byte 12

.align
Maps_CrystalCaves_DestMap:
	.byte 0x48
	// .byte 0x48
	.byte 0x48
	.byte 0x48
	.byte 0x48
	.byte 0x48
	.byte 0x48
	// END OF MAIN
	.byte 0xBA
	.byte 0x52
	.byte 0x5B
	.byte 0xC8
	.byte 0x5C
	.byte 0x5D
	.byte 0x5A
	.byte 0x56
	.byte 0x64
	.byte 0x55
	.byte 0x54
	.byte 0x5F
	.byte 0x62
	.byte 0x59
	.byte 0x5E

.align
Maps_CrystalCaves_DestExit:
	.byte 0x0
	// .byte - Intro
	.byte 0x9
	.byte 0x1A
	.byte 0x6
	.byte 0xB
	.byte 0x14
	// END OF MAIN
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0

.align
Maps_CreepyCastle_text:
	.asciiz "MAIN - PORTAL"
	.asciiz "MAIN - INTRO"
	.asciiz "MAIN - TOP"
	.asciiz "MAIN - WARP 2"
	.asciiz "MAIN - WARP 4"
	.asciiz "BABOON BLAST COURSE"
	.asciiz "BALLROOM"
	.asciiz "CAR RACE"
	.asciiz "CRYPT - DK, DIDDY, CHUNKY"
	.asciiz "CRYPT - LANKY, TINY"
	.asciiz "CRYPT - HUB"
	.asciiz "DUNGEON"
	.asciiz "DUNGEON TUNNEL - NEAR"
	.asciiz "DUNGEON TUNNEL - FAR"
	.asciiz "GREENHOUSE"
	.asciiz "JETPAC"
	.asciiz "LIBRARY"
	.asciiz "MINECART"
	.asciiz "MUSEUM"
	.asciiz "SHED"
	.asciiz "TREE"
	.asciiz "TRASH CAN"
	.asciiz "WIND TOWER"

.align
Maps_CreepyCastle_textLen:
	.byte 13
	.byte 12
	.byte 10
	.byte 13
	.byte 13
	// END OF MAIN
	.byte 19
	.byte 8
	.byte 8
	.byte 25
	.byte 19
	.byte 11
	.byte 7
	// START OF TUNNEL
	.byte 21
	.byte 20
	// END OF TUNNEL
	.byte 10
	.byte 6
	.byte 7
	.byte 8
	.byte 6
	.byte 4
	.byte 4
	.byte 9
	.byte 10

.align
Maps_CreepyCastle_DestMap:
	.byte 0x57
	.byte 0x57
	.byte 0x57
	.byte 0x57
	.byte 0x57
	// END OF MAIN
	.byte 0xBB
	.byte 0x58
	.byte 0xB9
	.byte 0x70
	.byte 0x6C
	.byte 0xB7
	.byte 0xA3
	// START OF TUNNEL
	.byte 0x97
	.byte 0x97
	// END OF TUNNEL
	.byte 0xA8
	.byte 0x9
	.byte 0x72
	.byte 0x6A
	.byte 0x71
	.byte 0xA6
	.byte 0xA4
	.byte 0xA7
	.byte 0x69

.align
Maps_CreepyCastle_DestExit:
	.byte 0x0
	.byte 0x1
	.byte 0xE
	.byte 0x3
	.byte 0xA
	// END OF MAIN
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	// START OF TUNNEL
	.byte 0x0
	.byte 0x2
	// END OF TUNNEL
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0

.align
Maps_HideoutHelmKRool_text:
	.asciiz "HELM - ENTRANCE"
	.asciiz "HELM - BOM ROOM"
	.asciiz "HELM - NAVIGATION ROOM"
	.asciiz "K. ROOL - DK PHASE"
	.asciiz "K. ROOL - DIDDY PHASE"
	.asciiz "K. ROOL - LANKY PHASE"
	.asciiz "K. ROOL - TINY PHASE"
	.asciiz "K. ROOL - CHUNKY PHASE"

.align
Maps_HideoutHelmKRool_textLen:
	.byte 15
	.byte 15
	.byte 22
	// END OF HELM
	.byte 18
	.byte 21
	.byte 21
	.byte 20
	.byte 22

.align
Maps_HideoutHelmKRool_DestMap:
	.byte 0x11
	.byte 0x11
	.byte 0x11
	// END OF HELM
	.byte 0xCB
	.byte 0xCC
	.byte 0xCD
	.byte 0xCE
	.byte 0xCF

.align
Maps_HideoutHelmKRool_DestExit:
	.byte 0x0
	.byte 0x3
	.byte 0x4
	// END OF HELM
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0

.align
Maps_Isles_text:
	.asciiz "MAIN - ESCAPE"
	.asciiz "MAIN - BFI"
	.asciiz "MAIN - WARP 3"
	.asciiz "MAIN - KROC ISLE"
	.asciiz "MAIN - TOP OF DK ISLE"
	.asciiz "BANANA FAIRY ISLAND"
	.asciiz "K. LUMSY"
	.asciiz "LOBBY - JUNGLE JAPES"
	.asciiz "LOBBY - ANGRY AZTEC"
	.asciiz "LOBBY - FRANTIC FACTORY"
	.asciiz "LOBBY - GLOOMY GALLEON"
	.asciiz "LOBBY - FUNGI FOREST"
	.asciiz "LOBBY - CRYSTAL CAVES"
	.asciiz "LOBBY - CREEPY CASTLE"
	.asciiz "LOBBY - HIDEOUT HELM"
	.asciiz "SNIDE'S ROOM"
	.asciiz "TRAINING GROUNDS"
	.asciiz "TREEHOUSE"

.align
Maps_Isles_textLen:
	.byte 13
	.byte 10
	.byte 13
	.byte 16
	.byte 21
	// END OF ISLES
	.byte 19
	.byte 8
	.byte 20
	.byte 19
	.byte 23
	.byte 22
	.byte 20
	.byte 21
	.byte 21
	.byte 20
	.byte 12
	.byte 16
	.byte 9

.align
Maps_Isles_DestMap:
	.byte 0x22
	.byte 0x22
	.byte 0x22
	.byte 0x22
	.byte 0x22
	// END OF ISLES
	.byte 0xBD
	.byte 0x61
	.byte 0xA9
	.byte 0xAD
	.byte 0xAF
	.byte 0xAE
	.byte 0xB2
	.byte 0xC2
	.byte 0xC1
	.byte 0xAA
	.byte 0xC3
	.byte 0xB0
	.byte 0xAB

.align
Maps_Isles_DestExit:
	.byte 0x0
	.byte 0x8
	.byte 0xC
	.byte 0x4
	.byte 0x6
	// END OF ISLES
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 0
	.byte 1
	.byte 2

.align
Maps_Levels:
	.asciiz "JUNGLE JAPES"
	.asciiz "ANGRY AZTEC"
	.asciiz "FRANTIC FACTORY"
	.asciiz "GLOOMY GALLEON"
	.asciiz "FUNGI FOREST"
	.asciiz "CRYSTAL CAVES"
	.asciiz "CREEPY CASTLE"
	.asciiz "HIDEOUT HELM AND K. ROOL"
	.asciiz "DK ISLES"

.align
Maps_Levels_textLen:
	.byte 12
	.byte 11
	.byte 15
	.byte 14
	.byte 12
	.byte 13
	.byte 13
	.byte 24
	.byte 8

.align
Maps_Counts:
	.byte 12
	.byte 13
	.byte 14
	.byte 19
	.byte 22
	.byte 21
	.byte 23
	.byte 8
	.byte 18
	.byte @MasterLevelCount

.align
Maps_text:
	.word Maps_JungleJapes_text
	.word Maps_AngryAztec_text
	.word Maps_FranticFactory_text
	.word Maps_GloomyGalleon_text
	.word Maps_FungiForest_text
	.word Maps_CrystalCaves_text
	.word Maps_CreepyCastle_text
	.word Maps_HideoutHelmKRool_text
	.word Maps_Isles_text
	.word Maps_Levels

.align
Maps_textLength:
	.word Maps_JungleJapes_textLen
	.word Maps_AngryAztec_textLen
	.word Maps_FranticFactory_textLen
	.word Maps_GloomyGalleon_textLen
	.word Maps_FungiForest_textLen
	.word Maps_CrystalCaves_textLen
	.word Maps_CreepyCastle_textLen
	.word Maps_HideoutHelmKRool_textLen
	.word Maps_Isles_textLen
	.word Maps_Levels_textLen

.align
Maps_Destination:
	.word Maps_JungleJapes_DestMap
	.word Maps_AngryAztec_DestMap
	.word Maps_FranticFactory_DestMap
	.word Maps_GloomyGalleon_DestMap
	.word Maps_FungiForest_DestMap
	.word Maps_CrystalCaves_DestMap
	.word Maps_CreepyCastle_DestMap
	.word Maps_HideoutHelmKRool_DestMap
	.word Maps_Isles_DestMap

.align
Maps_Exits:
	.word Maps_JungleJapes_DestExit
	.word Maps_AngryAztec_DestExit
	.word Maps_FranticFactory_DestExit
	.word Maps_GloomyGalleon_DestExit
	.word Maps_FungiForest_DestExit
	.word Maps_CrystalCaves_DestExit
	.word Maps_CreepyCastle_DestExit
	.word Maps_HideoutHelmKRool_DestExit
	.word Maps_Isles_DestExit

.align
Maps_arrays:
	.word @MapsArray_Japes
	.word @MapsArray_Aztec
	.word @MapsArray_Factory
	.word @MapsArray_Galleon
	.word @MapsArray_Fungi
	.word @MapsArray_Caves
	.word @MapsArray_Castle
	.word @MapsArray_HelmRool
	.word @MapsArray_Isles
	.word @MapsArray_Master

.align
SpecialFlags_text:
	// Kongs
	.asciiz "DK FREED - OFF"
	.asciiz "DIDDY FREED - OFF"
	.asciiz "LANKY FREED - OFF"
	.asciiz "TINY FREED - OFF"
	.asciiz "CHUNKY FREED - OFF"
	// K. Lumsy & Keys
	.asciiz "K. LUMSY INTRO - OFF"
	.asciiz "KEY 1 - OFF"
	.asciiz "KEY 1 TURNED - OFF"
	.asciiz "KEY 2 - OFF"
	.asciiz "KEY 2 TURNED - OFF"
	.asciiz "KEY 3 - OFF"
	.asciiz "KEY 3 TURNED - OFF"
	.asciiz "KEY 4 - OFF"
	.asciiz "KEY 4 TURNED - OFF"
	.asciiz "KEY 5 - OFF"
	.asciiz "KEY 5 TURNED - OFF"
	.asciiz "KEY 6 - OFF"
	.asciiz "KEY 6 TURNED - OFF"
	.asciiz "KEY 7 - OFF"
	.asciiz "KEY 7 TURNED - OFF"
	.asciiz "KEY 8 - OFF"
	.asciiz "KEY 8 TURNED - OFF"
	// Level Intros
	.asciiz "JAPES INTRO - OFF"
	.asciiz "AZTEC INTRO - OFF"
	.asciiz "FACTORY INTRO - OFF"
	.asciiz "GALLEON INTRO - OFF"
	.asciiz "FUNGI INTRO - OFF"
	.asciiz "CAVES INTRO - OFF"
	.asciiz "CASTLE INTRO - OFF"
	// T&S Cleared
	.asciiz "JAPES TNS CLEAR - OFF"
	.asciiz "AZTEC TNS CLEAR - OFF"
	.asciiz "FACTORY TNS CLEAR - OFF"
	.asciiz "GALLEON TNS CLEAR - OFF"
	.asciiz "FUNGI TNS CLEAR - OFF"
	.asciiz "CAVES TNS CLEAR - OFF"
	.asciiz "CASTLE TNS CLEAR - OFF"
	// Boss Intros
	.asciiz "ARMY DILLO 1 INTRO - OFF"
	.asciiz "DOGADON 1 INTRO - OFF"
	.asciiz "MAD JACK INTRO - OFF"
	.asciiz "PUFFTOSS INTRO - OFF"
	.asciiz "DOGADON 2 INTRO - OFF"
	.asciiz "ARMY DILLO 2 INTRO - OFF"
	.asciiz "KUT OUT INTRO - OFF"
	// FTTs
	.asciiz "B. LOCKER FIRST TEXT - OFF"
	// Level Altering Flags
	.asciiz "LLAMA CUTSCENE - OFF"
	.asciiz "PRODUCTION ROOM - OFF"
	.asciiz "GALLEON WATER RAISED - OFF"
	.asciiz "GALLEON SHIP SPAWNED - OFF"
	.asciiz "RABBIT RACE 1 BEAT - OFF"
	.asciiz "FUNGI NIGHTTIME - OFF"
	.asciiz "CAVES KOSHA DEAD - OFF"
	.asciiz "BOM DEACTIVATED - OFF"

.align
SpecialFlags_length:
	.byte 14 // DK Free
	.byte 17 // Diddy Free
	.byte 17 // Lanky Free
	.byte 16 // Tiny Free
	.byte 18 // Chunky Free
	.byte 20 // K. Lumsy Intro
	.byte 11 // Key 1
	.byte 18 // Key 1 Turned
	.byte 11 // Key 2
	.byte 18 // Key 2 Turned
	.byte 11 // Key 3
	.byte 18 // Key 3 Turned
	.byte 11 // Key 4
	.byte 18 // Key 4 Turned
	.byte 11 // Key 5
	.byte 18 // Key 5 Turned
	.byte 11 // Key 6
	.byte 18 // Key 6 Turned
	.byte 11 // Key 7
	.byte 18 // Key 7 Turned
	.byte 11 // Key 8
	.byte 18 // Key 8 Turned
	.byte 17 // Japes Intro
	.byte 17 // Aztec Intro
	.byte 19 // Factory Intro
	.byte 19 // Galleon Intro
	.byte 17 // Fungi Intro
	.byte 17 // Caves Intro
	.byte 18 // Castle Intro
	.byte 21 // Japes T&S Clear
	.byte 21 // Aztec T&S Clear
	.byte 23 // Factory T&S Clear
	.byte 23 // Galleon T&S Clear
	.byte 21 // Fungi T&S Clear
	.byte 21 // Caves T&S Clear
	.byte 22 // Castle T&S Clear
	.byte 24 // AD1 Intro
	.byte 21 // Dog1 Intro
	.byte 20 // MJ Intro
	.byte 20 // Puff Intro
	.byte 21 // Dog2 Intro
	.byte 24 // AD2 Intro
	.byte 19 // Kut Out Intro
	.byte 26 // B. Locker FTT
	.byte 20 // Llama CS
	.byte 21 // Prod Room
	.byte 26 // Galleon Water Raised
	.byte 26 // Galleon Ship
	.byte 24 // Fungi Rabbit Race 1
	.byte 21 // Fungi Nighttime
	.byte 22 // Giant Kosha Dead
	.byte 21 // BoM Off

.align
SpecialFlags_flags:
	.half 0x181 // DK Free 
	.half 0x6 // Diddy Free
	.half 0x46 // Lanky Free
	.half 0x42 // Tiny Free
	.half 0x75 // Chunky Free
	.half 0x1BB // K. Lumsy Intro
	.half 0x1A // Key 1
	.half 0x1BC // Key 1 Turned
	.half 0x4A // Key 2
	.half 0x1BD // Key 2 Turned
	.half 0x8A // Key 3
	.half 0x1BE // Key 3 Turned
	.half 0xA8 // Key 4
	.half 0x1BF // Key 4 Turned
	.half 0xEC // Key 5
	.half 0x1C0 // Key 5 Turned
	.half 0x124 // Key 6
	.half 0x1C1 // Key 6 Turned
	.half 0x13D // Key 7
	.half 0x1C2 // Key 7 Turned
	.half 0x17C // Key 8
	.half 0x1C3 // Key 8 Turned
	.half 0x1B // Japes Intro
	.half 0x5F // Aztec Intro
	.half 0x8C // Factory Intro
	.half 0xC2 // Galleon Intro
	.half 0x101 // Fungi Intro
	.half 0x11A // Caves Intro
	.half 0x15D // Castle Intro
	.half 0x2E // Japes T&S Clear
	.half 0x6C // Aztec T&S Clear
	.half 0x98 // Factory T&S Clear
	.half 0xCB // Galleon T&S Clear
	.half 0x102 // Fungi T&S Clear
	.half 0x12E // Caves T&S Clear
	.half 0x160 // Castle T&S Clear
	.half 0x68 // AD1 Intro
	.half 0x67 // Dog1 Intro
	.half 0x6A // MJ Intro
	.half 0x6B // Puff Intro
	.half 0x69 // Dog2 Intro
	.half 0x6D // AD2 Intro
	.half 0x6C // Kut Out Intro
	.half 0x17E // B. Locker FTT
	.half 0x5C // Llama CS
	.half 0x6F // Prod Room
	.half 0xA0 // Galleon Water
	.half 0x9C // Galleon Ship
	.half 0xF8 // Fungi Rabbit Race 1
	.half 0xCE // Fungi Nighttime
	.half 0x12C // Giant Kosha
	.half 0x302 // BoM Off

.align
SpecialFlags_flagType:
	.byte 0 // DK Free
	.byte 0 // Diddy Free
	.byte 0 // Lanky Free
	.byte 0 // Tiny Free
	.byte 0 // Chunky Free
	.byte 0 // K. Lumsy Intro
	.byte 0 // Key 1
	.byte 0 // Key 1 Turned
	.byte 0 // Key 2
	.byte 0 // Key 2 Turned
	.byte 0 // Key 3
	.byte 0 // Key 3 Turned
	.byte 0 // Key 4
	.byte 0 // Key 4 Turned
	.byte 0 // Key 5
	.byte 0 // Key 5 Turned
	.byte 0 // Key 6
	.byte 0 // Key 6 Turned
	.byte 0 // Key 7
	.byte 0 // Key 7 Turned
	.byte 0 // Key 8
	.byte 0 // Key 8 Turned
	.byte 0 // Japes Intro
	.byte 0 // Aztec Intro
	.byte 0 // Factory Intro
	.byte 0 // Galleon Intro
	.byte 0 // Fungi Intro
	.byte 0 // Caves Intro
	.byte 0 // Castle Intro
	.byte 0 // Japes T&S Clear
	.byte 0 // Aztec T&S Clear
	.byte 0 // Factory T&S Clear
	.byte 0 // Galleon T&S Clear
	.byte 0 // Fungi T&S Clear
	.byte 0 // Caves T&S Clear
	.byte 0 // Castle T&S Clear
	.byte 2 // AD1 Intro
	.byte 2 // Dog1 Intro
	.byte 2 // MJ Intro
	.byte 2 // Puff Intro
	.byte 2 // Dog2 Intro
	.byte 2 // AD2 Intro
	.byte 2 // Kut Out Intro
	.byte 0 // B. Locker FTT
	.byte 0 // Llama CS
	.byte 0 // Prod Room
	.byte 0 // Galleon Water Raised
	.byte 0 // Galleon Ship
	.byte 0 // Fungi Rabbit Race 1
	.byte 0 // Fungi Nighttime
	.byte 0 // Giant Kosha Dead
	.byte 0 // BoM Off

.align
Sandstorm_text_IsOn:
	.asciiz "AZTEC SANDSTORM - ON"

.align
Sandstorm_text_IsOff:
	.asciiz "AZTEC SANDSTORM - OFF"

.align
Sandstorm_text_isUnknown:
	.asciiz "AZTEC SANDSTORM - UNK"

.align
PauseMenu_VDisplay_Off:
	.asciiz "DISPLAY - OFF"

.align
PauseMenu_VDisplay_Lag:
	.asciiz "DISPLAY - LAG"

.align
PauseMenu_VDisplay_CumulativeLag:
	.asciiz "DISPLAY - CUMULATIVE LAG"

.align
PauseMenu_VDisplay_Speed:
	.asciiz "DISPLAY - SPEED"

.align
PauseMenu_VDisplay_Timer:
	.asciiz "DISPLAY - TIMER"

.align
PauseMenu_VDisplay_GKTimer:
	.asciiz "DISPLAY - KOSHA TIMER"

.align
PauseMenu_VDisplay_Movement:
	.asciiz "DISPLAY - MOVEMENT STATE"

.align
PauseMenu_VDisplay_Angle:
	.asciiz "DISPLAY - ANGLE"


.align
PauseMenu_VDisplay_Array:
	.word PauseMenu_VDisplay_Off
	.word PauseMenu_VDisplay_Lag
	.word PauseMenu_VDisplay_CumulativeLag
	.word PauseMenu_VDisplay_Speed
	.word PauseMenu_VDisplay_Timer
	.word PauseMenu_VDisplay_GKTimer
	.word PauseMenu_VDisplay_Movement
	.word PauseMenu_VDisplay_Angle

.align
BadSavestateMaps:
	.byte 0x01 // Funky's
	.byte 0x03 // Lanky's Maze
	.byte 0x05 // Cranky's Lab
	.byte 0x08 // Japes: Dillo
	.byte 0x0A // KKosh (V Easy)
	.byte 0x0F // Snide's
	.byte 0x12 // TTTrouble (V Easy)
	.byte 0x19 // Candy's
	.byte 0x20 // BBBandit (Easy)
	.byte 0x23 // DK Target Minigame
	.byte 0x2A // Troff n Scoff
	.byte 0x32 // Tiny Mush Bounce Minigame
	.byte 0x35 // Crown - Beaver Bother
	.byte 0x41 // SSnoop (Normal)
	.byte 0x42 // MMMaul (Hard)
	.byte 0x43 // SSnatch (Hard)
	.byte 0x44 // MMMaul (Easy)
	.byte 0x45 // MMMaul (Normal)
	.byte 0x49 // Crown - Kritter Karnage
	.byte 0x4A // SSnatch (Easy)
	.byte 0x4B // SSnatch (Hard)
	.byte 0x4D // MMayhem (Easy)
	.byte 0x4E // BBBarrage (Easy)
	.byte 0x4F // BBBarrage (Normal)
	.byte 0x53 // Fungi: Dogadon
	.byte 0x60 // SSSalvage (Normal)
	.byte 0x63 // SSSortie (Easy)
	.byte 0x65 // Krazy KK (Easy)
	.byte 0x66 // BBBash (V Easy)
	.byte 0x67 // SSeek (V Easy)
	.byte 0x68 // BBother (Easy)
	.byte 0x6F // Galleon: Pufftoss
	// All values between 0x73 and 0x96 (Inclusive). Various bonus minigames
	.byte 0x9A // Factory: Jack
	.byte 0x9B // Crown - Arena Ambush
	.byte 0x9C // Crown - More Kritter Karnage
	.byte 0x9D // Crown - Forest Fracas
	.byte 0x9E // Crown - Bish Bash Brawl
	.byte 0x9F // Crown - Kamikaze Kremlings
	.byte 0xA0 // Crown - Plinth Panic
	.byte 0xA1 // Crown - Pinnacle Palaver
	.byte 0xA2 // Crown - Shockwave Showdown
	.byte 0xA5 // Diddy Kremling Game
	.byte 0xC4 // Caves: Dillo
	.byte 0xC5 // Aztec: Dogadon
	.byte 0xC7 // Castle: Kut Out
	.byte 0xC9 // Diddy Rocketbarrel Game
	.byte 0xCA // Lanky Shooting Game
	.byte 0xD1 // Chunky ? Box Game
	.byte 0xD2 // Tiny "Floor is Lava" Game
	.byte 0xD3 // Chunky Shooting Game
	.byte 0xD4 // DK Rambi Game
	.byte 0x0 // Terminator

.align
PauseMenu_Warp_List:
	.asciiz "TO ISLES"
	.asciiz "TO JAPES"
	.asciiz "TO AZTEC"
	.asciiz "TO FACTORY"
	.asciiz "TO GALLEON"
	.asciiz "TO FUNGI"
	.asciiz "TO CAVES"
	.asciiz "TO CASTLE"
	.asciiz "TO HELM"
	.asciiz "TO DK PHASE"
	.asciiz "TO DIDDY PHASE"
	.asciiz "TO LANKY PHASE"
	.asciiz "TO TINY PHASE"
	.asciiz "TO CHUNKY PHASE"

.align
WarpMapCodes:
	.byte 0x22 // Isles
	.byte 0x07 // Japes
	.byte 0x26 // Aztec
	.byte 0x1A // Factory
	.byte 0x1E // Galleon
	.byte 0x30 // Fungi
	.byte 0x48 // Caves
	.byte 0x57 // Castle
	.byte 0x11 // Helm
	.byte 0xCB // DK Phase
	.byte 0xCC // Diddy Phase
	.byte 0xCD // Lanky Phase
	.byte 0xCE // Tiny Phase
	.byte 0xCF // Chunky Phase

.align
TakeoffSkipSetFlags:
	.half 444 // Key 1 Turned In
	.half 445 // Key 2 Turned In
	.half 447 // Key 4 Turned In
	.half 448 // Key 5 Turned In
	.half 449 // Key 6 Turned In
	.half 450 // Key 7 Turned In
	.half 443 // Japes Rock Destroyed
	.half 138 // Key 3
	.half 380 // Key 8
	.half 0 // Terminator

.align
MoveFlags:
	.half 386 // Dive Barrel
	.half 387 // Vine Barrel
	.half 388 // Orange Barrel
	.half 389 // Barrel Barrel
	.half 377 // BFI Camera/Shockwave
	.half 6 // Diddy
	.half 66 // Tiny
	.half 70 // Lanky
	.half 117 // Chunky
	.half 385 // DK
	.half 0 // Terminator

.align
PauseMenu_Savestate_Save:
	.asciiz "SAVE STATE"

.align
PauseMenu_Savestate_Load:
	.asciiz "LOAD STATE - FROM POSITION"

.align
PauseMenu_Savestate_LoadExit:
	.asciiz "LOAD STATE - FROM EXIT"

PauseMenu_Slam:
	.asciiz "SLAM LEVEL - 0" // Replace last char with 0/1/2/3

.align
PauseMenu_Sniper_Off:
	.asciiz "SNIPER SCOPE - OFF"

.align
PauseMenu_Sniper_On:
	.asciiz "SNIPER SCOPE - ON"

.align
PauseMenu_Takeoff:
	.asciiz "SETUP TAKEOFF SKIP"

.align
PauseMenu_UnlockMoves:
	.asciiz "UNLOCK MOVES"

.align
PauseMenu_GiveInventoryItems:
	.asciiz "RESTOCK INVENTORY"

.align
PauseMenu_GiveCoins:
	.asciiz "GIVE COINS"

// DISABLE POSITION BUTTONS
.align
PauseMenu_DisablePositionLoad_Off:
	.asciiz "POSITION LOAD - ENABLED"

.align
PauseMenu_DisablePositionLoad_On:
	.asciiz "POSITION LOAD - DISABLED"

.align
PauseMenu_DisablePositionLoad_Array:
	.word PauseMenu_DisablePositionLoad_Off
	.word PauseMenu_DisablePositionLoad_On

// DISABLE TAG ANYWHERE BUTTONS
.align
PauseMenu_DisableTagAnywhere_Off:
	.asciiz "TAG ANYWHERE - ENABLED"

.align
PauseMenu_DisableTagAnywhere_On:
	.asciiz "TAG ANYWHERE - DISABLED"

.align
PauseMenu_DisableTagAnywhere_Array:
	.word PauseMenu_DisableTagAnywhere_Off
	.word PauseMenu_DisableTagAnywhere_On

// DISABLE SOUND EFFECTS
.align
PauseMenu_Sound_On:
	.asciiz "SOUND EFFECTS - ON"

.align
PauseMenu_Sound_Off:
	.asciiz "SOUND EFFECTS - OFF"

.align
PauseMenu_Sound_Array:
	.word PauseMenu_Sound_Off
	.word PauseMenu_Sound_On

// DISABLE MUSIC
.align
PauseMenu_Music_On:
	.asciiz "MUSIC - ON"

.align
PauseMenu_Music_Off:
	.asciiz "MUSIC - OFF"

.align
PauseMenu_Music_Array:
	.word PauseMenu_Music_Off
	.word PauseMenu_Music_On

// TOGGLE CAMERA
.align
PauseMenu_CameraMode_Free:
	.asciiz "CAMERA MODE - FREE"

.align
PauseMenu_CameraMode_Follow:
	.asciiz "CAMERA MODE - FOLLOW"

.align
PauseMenu_CameraMode_Array:
	.word PauseMenu_CameraMode_Free
	.word PauseMenu_CameraMode_Follow

// TOGGLE SCREEN
.align
PauseMenu_ScreenMode_Normal:
	.asciiz "SCREEN RATIO - 4:3"

.align
PauseMenu_ScreenMode_Wide:
	.asciiz "SCREEN RATIO - 16:9"

.align
PauseMenu_ScreenMode_Array:
	.word PauseMenu_ScreenMode_Normal
	.word PauseMenu_ScreenMode_Wide

.align
KongColours:
	.byte 0x02 // DK - Green Body
	.byte 0x02 // Diddy - Yellow Cap
	.byte 0x01 // Lanky - Green Straps
	.byte 0x02 // Tiny - Purple Suit
	.byte 0x01 // Chunky - Red Suit

.align
PauseMenu_Warp_Length:
	.byte 9  //11
	.byte 9  //11
	.byte 9  //11
	.byte 11 //13
	.byte 11 //13
	.byte 9  //11
	.byte 9  //11
	.byte 10 //12
	.byte 8  //10
	.byte 12 //14
	.byte 15 //17
	.byte 15 //17
	.byte 14 //16
	//.byte 17 //18 - Chunky phase, not needed

.align
MovementStates:
	// 0x0
	.asciiz "UNKNOWN 0x0"
	.asciiz "IDLE - ENEMY"
	.asciiz "1ST PERSON"
	.asciiz "WATER 1ST PERSON"
	.asciiz "CAMERA"
	.asciiz "WATER CAMERA"
	.asciiz "LOCKED 0x6"
	.asciiz "MINECART - IDLE"
	.asciiz "MINECART - DUCK"
	.asciiz "MINECART - JUMP"
	.asciiz "MINECART - L"
	.asciiz "MINECART - R"
	.asciiz "IDLE"
	.asciiz "WALKING"
	.asciiz "SKIDDING"
	.asciiz "SLIDING"
	// 0x10
	.asciiz "SLIDING - LEFT"
	.asciiz "SLIDING - RIGHT"
	.asciiz "SLIDING - UP"
	.asciiz "SLIDING - BACK"
	.asciiz "SLIDING - JUMP"
	.asciiz "SLIPPING 0x15"
	.asciiz "SLIPPING 0x16"
	.asciiz "JUMPING"
	.asciiz "BBLAST PAD"
	.asciiz "BOUNCING - MUSH"
	.asciiz "DOUBLE JUMP"
	.asciiz "SIMIAN SPRING"
	.asciiz "SIMIAN SLAM"
	.asciiz "LONG JUMPING"
	.asciiz "FALLING"
	.asciiz "GUN - FALLING"
	// 0x20
	.asciiz "FALLING TOO FAR"
	.asciiz "SLIDING - FALL"
	.asciiz "PONY TAIL TWIRL"
	.asciiz "ATTACKING 0x23"
	.asciiz "PRIMATE PUNCH"
	.asciiz "ATTACKING 0x25"
	.asciiz "GROUND ATTACK"
	.asciiz "ATTACKING 0x27"
	.asciiz "GROUND ATTACK 2"
	.asciiz "MOVING ATTACK"
	.asciiz "AERIAL ATTACK"
	.asciiz "ROLLING"
	.asciiz "THROWING ORANGE"
	.asciiz "SHOCKWAVE"
	.asciiz "CHIMPY CHARGE"
	.asciiz "CHARGING"
	// 0x30
	.asciiz "ENEMY BOUNCING"
	.asciiz "DAMAGED"
	.asciiz "STUNLOCKED"
	.asciiz "DAMAGED - MJ"
	.asciiz "UNKNOWN 0x34"
	.asciiz "DAMAGED - KLUMP"
	.asciiz "DEATH"
	.asciiz "DAMAGED - WATER"
	.asciiz "DAMAGED - BOAT"
	.asciiz "SHRINKING"
	.asciiz "UNKNOWN 0X3A"
	.asciiz "DEATH - DOGADON"
	.asciiz "CROUCHING"
	.asciiz "UNCROUCHING"
	.asciiz "BACKFLIP"
	.asciiz "ENTERING OSTAND"
	// 0x40
	.asciiz "ORANGSTAND"
	.asciiz "ORANGSTAND JUMP"
	.asciiz "BARREL"
	.asciiz "BARREL - WATER"
	.asciiz "BBLAST SHOT"
	.asciiz "CANNON SHOT"
	.asciiz "PUSHING OBJECT"
	.asciiz "PICK UP OBJECT"
	.asciiz "OBJECT - IDLE"
	.asciiz "OBJECT - WALK"
	.asciiz "DROPPING OBJECT"
	.asciiz "THROWING OBJECT"
	.asciiz "OBJECT - JUMP"
	.asciiz "AIRTHROW OBJECT"
	.asciiz "SURFACE SWIM"
	.asciiz "UNDERWATER"
	// 0x50
	.asciiz "LEAVING WATER"
	.asciiz "JUMPING - WATER"
	.asciiz "BANANAPORTING"
	.asciiz "MONKEYPORTING"
	.asciiz "BANANAPORT - MP"
	.asciiz "UNKNOWN 0x55"
	.asciiz "LOCKED - SHOPS"
	.asciiz "VINE - SWINGING"
	.asciiz "VINE - LEAVING"
	.asciiz "TREE - CLIMBING"
	.asciiz "TREE - LEAVING"
	.asciiz "GRABBING LEDGE"
	.asciiz "LEDGE PULL UP"
	.asciiz "GUN - IDLE"
	.asciiz "GUN - WALKING"
	.asciiz "PUT AWAY GUN"
	// 0x60
	.asciiz "PULLING OUT GUN"
	.asciiz "GUN - JUMPING"
	.asciiz "GUN - AIMING"
	.asciiz "ROCKETBARREL"
	.asciiz "PHOTO"
	.asciiz "PHOTO - WATER"
	.asciiz "DAMAGED - TNT"
	.asciiz "INSTRUMENT"
	.asciiz "UNKNOWN 0x68"
	.asciiz "FACTORY CAR"
	.asciiz "LEARNING GUN"
	.asciiz "LOCKED - 0X6B"
	.asciiz "FEEDING SCOFF"
	.asciiz "BOAT"
	.asciiz "BABOON BALLOON"
	.asciiz "UPDRAFT"
	// 0x70
	.asciiz "GB DANCE"
	.asciiz "KEY DANCE"
	.asciiz "CROWN DANCE"
	.asciiz "LOSS DANCE"
	.asciiz "VICTORY DANCE"
	.asciiz "CASTLE CAR"
	.asciiz "ENTERING CROWN"
	.asciiz "CUTSCENE LOCK"
	.asciiz "GORILLA GRAB"
	.asciiz "LEARNING MOVE"
	.asciiz "LOCKED - CAR"
	.asciiz "LOCKED - BEETLE"
	.asciiz "TRAPPED"
	.asciiz "KLAPTRAP KONG"
	.asciiz "ENG SWIM"
	.asciiz "ENG UNDERWATER"
	// 0x80
	.asciiz "ENG S.ATTACKING"
	.asciiz "ENG ATTACKING"
	.asciiz "ENG LEAPING"
	.asciiz "FAIRY REFILL"
	.asciiz "UNKNOWN 0x84"
	.asciiz "MAIN MENU"
	.asciiz "ENTER MAIN MENU"
	.asciiz "ENTERING PORTAL"
	.asciiz "EXITING PORTAL"

.align
MovementStates_length:
	// 0x0
	.byte 11 // "UNKNOWN 0X0"
	.byte 12 // "IDLE - ENEMY"
	.byte 10 // "1ST PERSON"
	.byte 16 // "WATER 1ST PERSON"
	.byte 6 // "CAMERA"
	.byte 12 // "WATER CAMERA"
	.byte 10 // "LOCKED 0X6"
	.byte 15 // "MINECART - IDLE"
	.byte 15 // "MINECART - DUCK"
	.byte 15 // "MINECART - JUMP"
	.byte 12 // "MINECART - L"
	.byte 12 // "MINECART - R"
	.byte 4 // "IDLE"
	.byte 7 // "WALKING"
	.byte 8 // "SKIDDING"
	.byte 7 // "SLIDING"
	// 0x10
	.byte 14 // "SLIDING - LEFT"
	.byte 15 // "SLIDING - RIGHT"
	.byte 12 // "SLIDING - UP"
	.byte 14 // "SLIDING - BACK"
	.byte 14 // "SLIDING - JUMP"
	.byte 13 // "SLIPPING 0X15"
	.byte 13 // "SLIPPING 0X16"
	.byte 7 // "JUMPING"
	.byte 10 // "BBLAST PAD"
	.byte 15 // "BOUNCING - MUSH"
	.byte 11 // "DOUBLE JUMP"
	.byte 13 // "SIMIAN SPRING"
	.byte 11 // "SIMIAN SLAM"
	.byte 12 // "LONG JUMPING"
	.byte 7 // "FALLING"
	.byte 13 // "GUN - FALLING"
	// 0x20
	.byte 15 // "FALLING TOO FAR"
	.byte 14 // "SLIDING - FALL"
	.byte 15 // "PONY TAIL TWIRL"
	.byte 14 // "ATTACKING 0X23"
	.byte 13 // "PRIMATE PUNCH"
	.byte 14 // "ATTACKING 0X25"
	.byte 13 // "GROUND ATTACK"
	.byte 14 // "ATTACKING 0X27"
	.byte 15 // "GROUND ATTACK 2"
	.byte 13 // "MOVING ATTACK"
	.byte 13 // "AERIAL ATTACK"
	.byte 7 // "ROLLING"
	.byte 15 // "THROWING ORANGE"
	.byte 9 // "SHOCKWAVE"
	.byte 13 // "CHIMPY CHARGE"
	.byte 8 // "CHARGING"
	// 0x30
	.byte 14 // "ENEMY BOUNCING"
	.byte 7 // "DAMAGED"
	.byte 10 // "STUNLOCKED"
	.byte 12 // "DAMAGED - MJ"
	.byte 12 // "UNKNOWN 0X34"
	.byte 15 // "DAMAGED - KLUMP"
	.byte 5 // "DEATH"
	.byte 15 // "DAMAGED - WATER"
	.byte 14 // "DAMAGED - BOAT"
	.byte 9 // "SHRINKING"
	.byte 12 // "UNKNOWN 0X3A"
	.byte 15 // "DEATH - DOGADON"
	.byte 9 // "CROUCHING"
	.byte 11 // "UNCROUCHING"
	.byte 8 // "BACKFLIP"
	.byte 15 // "ENTERING OSTAND"
	// 0x40
	.byte 10 // "ORANGSTAND"
	.byte 15 // "ORANGSTAND JUMP"
	.byte 6 // "BARREL"
	.byte 14 // "BARREL - WATER"
	.byte 11 // "BBLAST SHOT"
	.byte 11 // "CANNON SHOT"
	.byte 14 // "PUSHING OBJECT"
	.byte 14 // "PICK UP OBJECT"
	.byte 13 // "OBJECT - IDLE"
	.byte 13 // "OBJECT - WALK"
	.byte 15 // "DROPPING OBJECT"
	.byte 15 // "THROWING OBJECT"
	.byte 13 // "OBJECT - JUMP"
	.byte 15 // "AIRTHROW OBJECT"
	.byte 12 // "SURFACE SWIM"
	.byte 10 // "UNDERWATER"
	// 0x50
	.byte 13 // "LEAVING WATER"
	.byte 15 // "JUMPING - WATER"
	.byte 13 // "BANANAPORTING"
	.byte 13 // "MONKEYPORTING"
	.byte 15 // "BANANAPORT - MP"
	.byte 12 // "UNKNOWN 0X55"
	.byte 14 // "LOCKED - SHOPS"
	.byte 15 // "VINE - SWINGING"
	.byte 14 // "VINE - LEAVING"
	.byte 15 // "TREE - CLIMBING"
	.byte 14 // "TREE - LEAVING"
	.byte 14 // "GRABBING LEDGE"
	.byte 13 // "LEDGE PULL UP"
	.byte 10 // "GUN - IDLE"
	.byte 13 // "GUN - WALKING"
	.byte 12 // "PUT AWAY GUN"
	// 0x60
	.byte 15 // "PULLING OUT GUN"
	.byte 13 // "GUN - JUMPING"
	.byte 12 // "GUN - AIMING"
	.byte 12 // "ROCKETBARREL"
	.byte 5 // "PHOTO"
	.byte 13 // "PHOTO - WATER"
	.byte 13 // "DAMAGED - TNT"
	.byte 10 // "INSTRUMENT"
	.byte 12 // "UNKNOWN 0X68"
	.byte 11 // "FACTORY CAR"
	.byte 12 // "LEARNING GUN"
	.byte 13 // "LOCKED - 0X6B"
	.byte 13 // "FEEDING SCOFF"
	.byte 4 // "BOAT"
	.byte 14 // "BABOON BALLOON"
	.byte 7 // "UPDRAFT"
	// 0x70
	.byte 8 // "GB DANCE"
	.byte 9 // "KEY DANCE"
	.byte 11 // "CROWN DANCE"
	.byte 10 // "LOSS DANCE"
	.byte 13 // "VICTORY DANCE"
	.byte 10 // "CASTLE CAR"
	.byte 14 // "ENTERING CROWN"
	.byte 13 // "CUTSCENE LOCK"
	.byte 12 // "GORILLA GRAB"
	.byte 13 // "LEARNING MOVE"
	.byte 12 // "LOCKED - CAR"
	.byte 15 // "LOCKED - BEETLE"
	.byte 7 // "TRAPPED"
	.byte 13 // "KLAPTRAP KONG"
	.byte 8 // "ENG SWIM"
	.byte 14 // "ENG UNDERWATER"
	// 0x80
	.byte 15 // "ENG S.ATTACKING"
	.byte 13 // "ENG ATTACKING"
	.byte 11 // "ENG LEAPING"
	.byte 12 // "FAIRY REFILL"
	.byte 12 // "UNKNOWN 0X84"
	.byte 9 // "MAIN MENU"
	.byte 15 // "ENTER MAIN MENU"
	.byte 15 // "ENTERING PORTAL"
	.byte 14 // "EXITING PORTAL"

.align
LoadingZone_ObjectIndicators:
	// 0x1A8 - DK (Loading Zones)
	// 0x1A9 - Diddy (Cutscene Triggers)
	// 0x1AA - Tiny (Warp Trigger, Boss Door Trigger, Detransform Triggers)
	// 0x1AB - Chunky (Unknown)
	// 0x1AC - Lanky (Slide Trigger)
	.half 0x1AB // 0x0 - ?
	.half 0x1AB // 0x1 - ?
	.half 0x1AB // 0x2 - In Castle Minecart/MJ/Fungi
	.half 0x1AA // 0x3 - Boss Door Trigger
	.half 0x1AB // 0x4 - In Fungi Minecart
	.half 0x1A9 // 0x5 - Cutscene Trigger
	.half 0x1AB // 0x6 - In Treehouse/MJ/Fungi
	.half 0x1AB // 0x7 - In Fungi/Fungi Minecart
	.half 0x1AB // 0x8 - In Fungi/Fungi Minecart
	.half 0x1A8 // 0x9 - Loading Zone
	.half 0x1A9 // 0xA - Cutscene Trigger
	.half 0x1AB // 0xB - In Minecart Mayhem
	.half 0x1A8 // 0xC - Loading Zone + Objects
	.half 0x1A8 // 0xD - Loading Zone
	.half 0x1AB // 0xE - Unknown
	.half 0x1AA // 0xF - Warp Trigger
	.half 0x1A8 // 0x10 - Loading Zone
	.half 0x1A8 // 0x11 - Loading Zone
	.half 0x1AB // 0x12 - Unknown
	.half 0x1AA // 0x13 - Detransform Trigger
	.half 0x1A8 // 0x14 - Boss Door LZ
	.half 0x1A9 // 0x15 - Cutscene Trigger
	.half 0x1AB // 0x16 - Az Beetle
	.half 0x1A9 // 0x17 - Cutscene Trigger
	.half 0x1AB // 0x18 - In Fungi Minecart
	.half 0x1AB // 0x19 - Seal Race
	.half 0x1AB // 0x1A - Caves Beetle Slide
	.half 0x1AC // 0x1B - Slide Trigger
	.half 0x1AB // 0x1C - Beetle Slides
	.half 0x1AB // 0x1D - Unknown
	.half 0x1AB // 0x1E - Unknown
	.half 0x1AB // 0x1F - Unknown
	.half 0x1A9 // 0x20 - Cutscene Trigger
	.half 0x1AB // 0x21 - Unknown
	.half 0x1AB // 0x22 - Unknown
	.half 0x1AB // 0x23 - Unknown
	.half 0x1AA // 0x24 - Detransform Trigger
	.half 0x1AB // 0x25 - Factory
	.half 0x1AB // 0x26 - BFI/K. Lumsy (Centred around torches)

.align
LoadingZone_Title:
	.asciiz "TRIGGER VIEWER"

.align
LoadingZone_TypeText:
	.asciiz "LOADING ZONES - OFF"
	.asciiz "CUTSCENE TRIGGERS - OFF"
	.asciiz "SLIDE TRIGGERS - OFF"
	.asciiz "MISC TRIGGERS - OFF"
	.asciiz "UNKNOWN TRIGGER TYPES - OFF"

.align
LoadingZone_TypeObjs:
	.half 0x1A8
	.half 0x1A9
	.half 0x1AC
	.half 0x1AA
	.half 0x1AB

.align
LoadingZone_TypeLength:
	.byte 19
	.byte 23
	.byte 20
	.byte 19
	.byte 27

.align
LoadingZone_MassActionText:
	.asciiz "SHOW ALL"
	.asciiz "HIDE ALL"

.align
LoadingZone_MassActionTextLength:
	.byte 8
	.byte 8

.align
GunBitfields:
	.word 0x807FC952 // DK
	.word 0x807FC9B0 // Diddy
	.word 0x807FCA0E // Lanky
	.word 0x807FCA6C // Tiny
	.word 0x807FCACA // Chunky

.align
HandStatesNoGun:
	.byte 1 // DK
	.byte 0 // Diddy
	.byte 1 // Lanky
	.byte 1 // Tiny
	.byte 1 // Chunky

.align
HandStatesGun:
	.byte 2 // DK
	.byte 3 // Diddy
	.byte 2 // Lanky
	.byte 2 // Tiny
	.byte 2 // Chunky

.align
FileCompleteFlag:
	.half 0x84 // Nintendo Coin
	.half 0x17B // Rareware Coin
	.half 0x1A // Key 1
	.half 0x4A // Key 2
	.half 0x8A // Key 3
	.half 0xA8 // Key 4
	.half 0xEC // Key 5
	.half 0x124 // Key 6
	.half 0x13D // Key 7
	.half 0x17C // Key 8
	// MEDALS
	.half 0x225 // Japes
	.half 0x226
	.half 0x227
	.half 0x228
	.half 0x229
	.half 0x22A // Aztec
	.half 0x22B
	.half 0x22C
	.half 0x22D
	.half 0x22E
	.half 0x22F // Factory
	.half 0x230
	.half 0x231
	.half 0x232
	.half 0x233
	.half 0x234 // Galleon
	.half 0x235
	.half 0x236
	.half 0x237
	.half 0x238
	.half 0x239 // Fungi
	.half 0x23A
	.half 0x23B
	.half 0x23C
	.half 0x23D
	.half 0x23E // Caves
	.half 0x23F
	.half 0x240
	.half 0x241
	.half 0x242
	.half 0x243 // Castle
	.half 0x244
	.half 0x245
	.half 0x246
	.half 0x247
	.half 0x248 // Helm
	.half 0x249
	.half 0x24A
	.half 0x24B
	.half 0x24C
	// Fairy
	.half 0x24D
	.half 0x24E
	.half 0x24F
	.half 0x250
	.half 0x251 // 5
	.half 0x252
	.half 0x253
	.half 0x254
	.half 0x255
	.half 0x256 // 10
	.half 0x257
	.half 0x258
	.half 0x259
	.half 0x25A
	.half 0x25B // 15
	.half 0x25C
	.half 0x25D
	.half 0x25E
	.half 0x25F
	.half 0x260 // 20
	// Crown
	.half 0x261
	.half 0x262
	.half 0x263
	.half 0x264
	.half 0x265 // 5
	.half 0x266
	.half 0x267
	.half 0x268
	.half 0x269
	.half 0x26A // 10
	.half 0 // Terminator

.align
FileStatus_Custom_text:
	.asciiz "FILE STATUS - CUSTOM"

.align
FileStatus_101_text:
	.asciiz "FILE STATUS - 101%"
	
.align
FileStatus_Max_text:
	.asciiz "FILE STATUS - MAX%"

.align
FileStatus_array_text:
	.word FileStatus_Custom_text
	.word FileStatus_101_text
	.word FileStatus_Max_text

.align
IndependentCheat_InfHealth_text:
	.asciiz "INFINITE HEALTH - OFF"

.align
IndependentCheat_PhaseState_text:
	.asciiz "AUTO-PHASE STATE - OFF"

.align
IndependentCheat_array_length:
	.byte 21
	.byte 22

.align
IndependentCheat_array_vars:
	.word @InfiniteHealthCheatOn
	.word @AutoPhaseStateOn

.align
IndependentCheat_array_text:
	.word IndependentCheat_InfHealth_text
	.word IndependentCheat_PhaseState_text

.align
LMode_Timer_text:
	.asciiz "L TO - STOP TIMER"

.align
LMode_Levitate_text:
	.asciiz "L TO - LEVITATE"

.align
LMode_Sandstorm_text:
	.asciiz "L TO - TOGGLE SANDSTORM"

.align
LMode_Cutscene_text:
	.asciiz "L TO - CANCEL CUTSCENE"

.align
LMode_array_text:
	.word LMode_Timer_text
	.word LMode_Levitate_text
	.word LMode_Sandstorm_text
	.word LMode_Cutscene_text

.align
LMode_array_sfx:
	.half @TimerTock
	.half @ChunkyFallTooFar
	.half @Fire
	.half @BeepLow

.align
Timer_Start_OnL:
	.asciiz "START - ON L"

.align
Timer_Start_OnMapLoad:
	.asciiz "START - ON MAP LOAD"

.align
Timer_Start_OnInput:
	.asciiz "START - ON INPUT"

.align
Timer_Start_Array:
	.word Timer_Start_OnL
	.word Timer_Start_OnMapLoad
	.word Timer_Start_OnInput

.align
Timer_Pause_On:
	.asciiz "PAUSE ON PAUSE - ON"

.align
Timer_Pause_Off:
	.asciiz "PAUSE ON PAUSE - OFF"

.align
Timer_Pause_Array:
	.word Timer_Pause_Off
	.word Timer_Pause_On

.align
Timer_Finish_OnL:
	.asciiz "FINISH - ON L"

.align
Timer_Finish_OnTransition:
	.asciiz "FINISH - ON TRANSITION"

.align
Timer_Finish_OnCutscene:
	.asciiz "FINISH - ON CUTSCENE"

.align
Timer_Finish_OnGBGrab:
	.asciiz "FINISH - ON GB DANCE"

.align
Timer_Finish_Array:
	.word Timer_Finish_OnL
	.word Timer_Finish_OnTransition
	.word Timer_Finish_OnCutscene
	.word Timer_Finish_OnGBGrab

.align
FTT_Flags:
	.half 355
	.half 358
	.half 359
	.half 360
	.half 361
	.half 362
	.half 363
	.half 364
	.half 365
	.half 366
	.half 367
	.half 368
	.half 369
	.half 370
	.half 372
	.half 373
	.half 374
	.half 376
	.half 382
	.half 392
	.half 775
	.half 776
	.half 777
	.half 778
	.half 779
	.half 780
	.half 781
	.half 782
	.half 783
	.half 784
	.half 785
	.half 786
	.half 787
	.half 282
	.half 194
	.half 256
	.half 257
	.half 303
	.half 349
	.half 27
	.half 95
	.half 93
	.half 94
	.half 140
	.half 195
	.half 196
	.half 255
	.half 277
	.half 299
	.half 378


// WARPS
// Japes
.align
Warps_Japes_W1Portal:
	.asciiz "WARP 1 - PORTAL"

.align
Warps_Japes_W1Tunnel:
	.asciiz "WARP 1 - TUNNEL"

.align
Warps_Japes_W2Lower:
	.asciiz "WARP 2 - LOWER"

.align
Warps_Japes_W2Mountain:
	.asciiz "WARP 2 - MOUNTAIN"

.align
Warps_Japes_W3BBlast:
	.asciiz "WARP 3 - BBLAST"

.align
Warps_Japes_W3DiddyBP:
	.asciiz "WARP 3 - DIDDY BP"

.align
Warps_Japes_W4Tunnel:
	.asciiz "WARP 4 - TUNNEL"

.align
Warps_Japes_W4Cranky:
	.asciiz "WARP 4 - CRANKY"

.align
Warps_Japes_W5Shell:
	.asciiz "WARP 5 - SHELLHIVE"

.align
Warps_Japes_W5Mountain:
	.asciiz "WARP 5 - MOUNTAIN"

// Aztec
.align
Warps_Aztec_W1Portal:
	.asciiz "WARP 1 - PORTAL"

.align
Warps_Aztec_W1Oasis:
	.asciiz "WARP 1 - OASIS"

.align
Warps_Aztec_W2Oasis:
	.asciiz "WARP 2 - OASIS"

.align
Warps_Aztec_W2Tunnel:
	.asciiz "WARP 2 - TUNNEL"

.align
Warps_Aztec_W3Cranky:
	.asciiz "WARP 3 - CRANKY"

.align
Warps_Aztec_W3Tunnel:
	.asciiz "WARP 3 - TUNNEL"

.align
Warps_Aztec_W4Funky:
	.asciiz "WARP 4 - FUNKY"

.align
Warps_Aztec_W4Tunnel:
	.asciiz "WARP 4 - TUNNEL"

.align
Warps_Aztec_W5Totem:
	.asciiz "WARP 5 - TOTEM"

.align
Warps_Aztec_W5BonusRoom:
	.asciiz "WARP 5 - BONUS ROOM"

// Llama Temple
.align
Warps_Llama_W1Entrance:
	.asciiz "WARP 1 - ENTRANCE"

.align
Warps_Llama_W1Matching:
	.asciiz "WARP 1 - MATCHING GAME"

.align
Warps_Llama_W2Entrance:
	.asciiz "WARP 2 - ENTRANCE"

.align
Warps_Llama_W2LavaRoom:
	.asciiz "WARP 2 - LAVA ROOM"

// Factory
.align
Warps_Factory_W1Lobby:
	.asciiz "WARP 1 - LOBBY"

.align
Warps_Factory_W1Storage:
	.asciiz "WARP 1 - STORAGE ROOM"

.align
Warps_Factory_W2Lobby:
	.asciiz "WARP 2 - LOBBY"

.align
Warps_Factory_W2RND:
	.asciiz "WARP 2 - RND"

.align
Warps_Factory_W3Lobby:
	.asciiz "WARP 3 - LOBBY"

.align
Warps_Factory_W3Snide:
	.asciiz "WARP 3 - SNIDES"

.align
Warps_Factory_W4Low:
	.asciiz "WARP 4 - LOW"

.align
Warps_Factory_W4High:
	.asciiz "WARP 4 - HIGH"

.align
Warps_Factory_W5Arcade:
	.asciiz "WARP 5 - ARCADE"

.align
Warps_Factory_W5Funky:
	.asciiz "WARP 5 - FUNKY"

// Galleon
.align
Warps_Galleon_W1Portal:
	.asciiz "WARP 1 - PORTAL"

.align
Warps_Galleon_W1Lighthouse:
	.asciiz "WARP 1 - LIGHTHOUSE"

.align
Warps_Galleon_W2Tunnel:
	.asciiz "WARP 2 - TUNNEL"

.align
Warps_Galleon_W25DS:
	.asciiz "WARP 2 - SHIPWRECK"

.align
Warps_Galleon_W3Cranky:
	.asciiz "WARP 3 - CRANKY"

.align
Warps_Galleon_W3Snide:
	.asciiz "WARP 3 - SNIDES"

.align
Warps_Galleon_W45DS:
	.asciiz "WARP 4 - SHIPWRECK"

.align
Warps_Galleon_W4GoldTower:
	.asciiz "WARP 4 - GOLD TOWER"

.align
Warps_Galleon_W5Lighthouse:
	.asciiz "WARP 5 - LIGHTHOUSE"

.align
Warps_Galleon_W55DS:
	.asciiz "WARP 5 - SHIPWRECK"

// Fungi
.align
Warps_Fungi_W1Clock:
	.asciiz "WARP 1 - CLOCK"

.align
Warps_Fungi_W1Mill:
	.asciiz "WARP 1 - MILL"

.align
Warps_Fungi_W2Clock:
	.asciiz "WARP 2 - CLOCK"

.align
Warps_Fungi_W2Funky:
	.asciiz "WARP 2 - FUNKY"

.align
Warps_Fungi_W3Clock:
	.asciiz "WARP 3 - CLOCK"

.align
Warps_Fungi_W3Mushroom:
	.asciiz "WARP 3 - MUSHROOM"

.align
Warps_Fungi_W4Clock:
	.asciiz "WARP 4 - CLOCK"

.align
Warps_Fungi_W4Tree:
	.asciiz "WARP 4 - TREE"

.align
Warps_Fungi_W5Low:
	.asciiz "WARP 5 - LOW"

.align
Warps_Fungi_W5High:
	.asciiz "WARP 5 - HIGH"

// Caves
.align
Warps_Caves_W1Near:
	.asciiz "WARP 1 - NEAR"

.align
Warps_Caves_W15DI:
	.asciiz "WARP 1 - IGLOOS"

.align
Warps_Caves_W2Near:
	.asciiz "WARP 2 - NEAR"

.align
Warps_Caves_W2Cabins:
	.asciiz "WARP 2 - CABINS"

.align
Warps_Caves_W35DI:
	.asciiz "WARP 3 - IGLOOS"

.align
Warps_Caves_W3Cave:
	.asciiz "WARP 3 - CAVERN"

.align
Warps_Caves_W4Pillar:
	.asciiz "WARP 4 - PILLAR"

.align
Warps_Caves_W4Cave:
	.asciiz "WARP 4 - CAVERN"

.align
Warps_Caves_W5Cabins:
	.asciiz "WARP 5 - CABINS"

.align
Warps_Caves_W5LankyBP:
	.asciiz "WARP 5 - LANKY BP"

// Castle
.align
Warps_Castle_W1Near:
	.asciiz "WARP 1 - NEAR"

.align
Warps_Castle_W1Far:
	.asciiz "WARP 1 - FAR"

.align
Warps_Castle_W2Near:
	.asciiz "WARP 2 - NEAR"

.align
Warps_Castle_W2Upper:
	.asciiz "WARP 2 - UPPER"

.align
Warps_Castle_W3Near:
	.asciiz "WARP 3 - NEAR"

.align
Warps_Castle_W3Cranky:
	.asciiz "WARP 3 - CRANKY"

.align
Warps_Castle_W4Near:
	.asciiz "WARP 4 - NEAR"

.align
Warps_Castle_W4Trash:
	.asciiz "WARP 4 - TRASH CAN"

.align
Warps_Castle_W5Near:
	.asciiz "WARP 5 - NEAR"

.align
Warps_Castle_W5WindTower:
	.asciiz "WARP 5 - WIND TOWER"

// Crypt
.align
Warps_Crypt_W1Near:
	.asciiz "WARP 1 - NEAR"

.align
Warps_Crypt_W1DiddyCoffin:
	.asciiz "WARP 1 - DIDDY COFFIN"

.align
Warps_Crypt_W2Near:
	.asciiz "WARP 2 - NEAR"

.align
Warps_Crypt_W2Minecart:
	.asciiz "WARP 2 - MINECART"

.align
Warps_Crypt_W3Near:
	.asciiz "WARP 3 - NEAR"

.align
Warps_Crypt_W3ChunkyCoffin:
	.asciiz "WARP 3 - CHUNKY COFFINS"

// Isles
.align
Warps_Isles_W1Ring:
	.asciiz "WARP 1 - RING"

.align
Warps_Isles_W1KLumsy:
	.asciiz "WARP 1 - K. LUMSY"

.align
Warps_Isles_W2Ring:
	.asciiz "WARP 2 - RING"

.align
Warps_Isles_W2Aztec:
	.asciiz "WARP 2 - AZTEC LOBBY"

.align
Warps_Isles_W3Ring:
	.asciiz "WARP 3 - RING"

.align
Warps_Isles_W3KRool:
	.asciiz "WARP 3 - K. ROOL"

.align
Warps_Isles_W4Ring:
	.asciiz "WARP 4 - RING"

.align
Warps_Isles_W4Factory:
	.asciiz "WARP 4 - FACTORY LOBBY"

.align
Warps_Isles_W5Ring:
	.asciiz "WARP 5 - RING"

.align
Warps_Isles_W5BFI:
	.asciiz "WARP 5 - BFI"

// Helm
.align
Warps_Helm_W1Entrance:
	.asciiz "WARP 1 - ENTRANCE"

.align
Warps_Helm_W1Navigation:
	.asciiz "WARP 1 - NAVIGATION ROOM"

// Helm
.align
Warps_HelmLobby_W1Near:
	.asciiz "WARP 1 - NEAR"

.align
Warps_HelmLobby_W1Far:
	.asciiz "WARP 1 - FAR"

// Text Arrays & Flag Arrays
.align
Warps_Japes_Array:
	.word Warps_Japes_W1Portal
	.word Warps_Japes_W1Tunnel
	.word Warps_Japes_W2Lower
	.word Warps_Japes_W2Mountain
	.word Warps_Japes_W3BBlast
	.word Warps_Japes_W3DiddyBP
	.word Warps_Japes_W4Tunnel
	.word Warps_Japes_W4Cranky
	.word Warps_Japes_W5Shell
	.word Warps_Japes_W5Mountain

.align
Warps_Japes_Flags:
	.half 0x20
	.half 0x21
	.half 0x23
	.half 0x22
	.half 0x25
	.half 0x24
	.half 0x28
	.half 0x29
	.half 0x26
	.half 0x27

.align
Warps_Aztec_Array:
	.word Warps_Aztec_W1Portal
	.word Warps_Aztec_W1Oasis
	.word Warps_Aztec_W2Oasis
	.word Warps_Aztec_W2Tunnel
	.word Warps_Aztec_W3Cranky
	.word Warps_Aztec_W3Tunnel
	.word Warps_Aztec_W4Tunnel
	.word Warps_Aztec_W4Funky
	.word Warps_Aztec_W5Totem
	.word Warps_Aztec_W5BonusRoom

.align
Warps_Aztec_Flags:
	.half 0x4F
	.half 0x50
	.half 0x51
	.half 0x52
	.half 0x53
	.half 0x54
	.half 0x55
	.half 0x56
	.half 0x57
	.half 0x3E

.align
Warps_Llama_Array:
	.word Warps_Llama_W1Entrance
	.word Warps_Llama_W1Matching
	.word Warps_Llama_W2Entrance
	.word Warps_Llama_W2LavaRoom

.align
Warps_Llama_Flags:
	.half 0x59
	.half 0x58
	.half 0x5B
	.half 0x5A

.align
Warps_Factory_Array:
	.word Warps_Factory_W1Lobby
	.word Warps_Factory_W1Storage
	.word Warps_Factory_W2Lobby
	.word Warps_Factory_W2RND
	.word Warps_Factory_W3Lobby
	.word Warps_Factory_W3Snide
	.word Warps_Factory_W4Low
	.word Warps_Factory_W4High
	.word Warps_Factory_W5Arcade
	.word Warps_Factory_W5Funky

.align
Warps_Factory_Flags:
	.half 0x8D
	.half 0x8E
	.half 0x8F
	.half 0x90
	.half 0x91
	.half 0x92
	.half 0x94
	.half 0x93
	.half 0x96
	.half 0x95

.align
Warps_Galleon_Array:
	.word Warps_Galleon_W1Portal
	.word Warps_Galleon_W1Lighthouse
	.word Warps_Galleon_W2Tunnel
	.word Warps_Galleon_W25DS
	.word Warps_Galleon_W3Cranky
	.word Warps_Galleon_W3Snide
	.word Warps_Galleon_W45DS
	.word Warps_Galleon_W4GoldTower
	.word Warps_Galleon_W55DS
	.word Warps_Galleon_W5Lighthouse

.align
Warps_Galleon_Flags:
	.half 0xB2
	.half 0xB1
	.half 0xAC
	.half 0xAB
	.half 0xAE
	.half 0xAD
 	.half 0xAF
 	.half 0xA3
	.half 0xA9
	.half 0xAA

.align
Warps_Fungi_Array:
	.word Warps_Fungi_W1Clock
	.word Warps_Fungi_W1Mill
	.word Warps_Fungi_W2Clock
	.word Warps_Fungi_W2Funky
	.word Warps_Fungi_W3Clock
	.word Warps_Fungi_W3Mushroom
	.word Warps_Fungi_W4Clock
	.word Warps_Fungi_W4Tree
	.word Warps_Fungi_W5Low
	.word Warps_Fungi_W5High

.align
Warps_Fungi_Flags:
	.half 0xEE
	.half 0xED
	.half 0xEF
	.half 0xF0
	.half 0xF1
	.half 0xF2
	.half 0xF3
	.half 0xF4
	.half 0xF5
	.half 0xF6

.align
Warps_Caves_Array:
	.word Warps_Caves_W1Near
	.word Warps_Caves_W15DI
	.word Warps_Caves_W2Near
	.word Warps_Caves_W2Cabins
	.word Warps_Caves_W35DI
	.word Warps_Caves_W3Cave
	.word Warps_Caves_W4Pillar
	.word Warps_Caves_W4Cave
	.word Warps_Caves_W5Cabins
	.word Warps_Caves_W5LankyBP

.align
Warps_Caves_Flags:
	.half 0x11C
	.half 0x11B
	.half 0x11D
	.half 0x11E
	.half 0x123
	.half 0x127
	.half 0x120
	.half 0x11F
	.half 0x121
	.half 0x122

.align
Warps_Castle_Array:
	.word Warps_Castle_W1Near
	.word Warps_Castle_W1Far
	.word Warps_Castle_W2Near
	.word Warps_Castle_W2Upper
	.word Warps_Castle_W3Near
	.word Warps_Castle_W3Cranky
	.word Warps_Castle_W4Near
	.word Warps_Castle_W4Trash
	.word Warps_Castle_W5Near
	.word Warps_Castle_W5WindTower

.align
Warps_Castle_Flags:
	.half 0x147
	.half 0x148
	.half 0x149
	.half 0x14A
	.half 0x14B
	.half 0x14C
	.half 0x14D
	.half 0x14E
	.half 0x14F
	.half 0x150

.align
Warps_Crypt_Array:
	.word Warps_Crypt_W1Near
	.word Warps_Crypt_W1DiddyCoffin
	.word Warps_Crypt_W2Near
	.word Warps_Crypt_W2Minecart
	.word Warps_Crypt_W3Near
	.word Warps_Crypt_W3ChunkyCoffin

.align
Warps_Crypt_Flags:
	.half 0x151
	.half 0x152
	.half 0x153
	.half 0x154
	.half 0x155
	.half 0x156

.align
Warps_Helm_Array:
	.word Warps_Helm_W1Entrance
	.word Warps_Helm_W1Navigation

.align
Warps_Helm_Flags:
	.half 0x305
	.half 0x306

.align
Warps_Isles_Array:
	.word Warps_Isles_W1Ring
	.word Warps_Isles_W1KLumsy
	.word Warps_Isles_W2Ring
	.word Warps_Isles_W2Aztec
	.word Warps_Isles_W3Ring
	.word Warps_Isles_W3KRool
	.word Warps_Isles_W4Ring
	.word Warps_Isles_W4Factory
	.word Warps_Isles_W5Ring
	.word Warps_Isles_W5BFI

.align
Warps_Isles_Flags:
	.half 0x1B1
	.half 0x1B2
	.half 0x1B3
	.half 0x1B4
	.half 0x1B5
	.half 0x1B6
	.half 0x1B7
	.half 0x1B8
	.half 0x1BA
	.half 0x1B9

.align
Warps_HelmLobby_Array:
	.word Warps_HelmLobby_W1Near
	.word Warps_HelmLobby_W1Far

.align
Warps_HelmLobby_Flags:
	.half 0x1A1
	.half 0x1A2

// Master
.align
Warps_Master_Japes:
	.asciiz "JUNGLE JAPES"

.align
Warps_Master_Aztec:
	.asciiz "ANGRY AZTEC"

.align
Warps_Master_Llama:
	.asciiz "LLAMA TEMPLE"

.align
Warps_Master_Factory:
	.asciiz "FRANTIC FACTORY"

.align
Warps_Master_Galleon:
	.asciiz "GLOOMY GALLEON"

.align
Warps_Master_Fungi:
	.asciiz "FUNGI FOREST"

.align
Warps_Master_Caves:
	.asciiz "CRYSTAL CAVES"

.align
Warps_Master_Castle:
	.asciiz "CREEPY CASTLE"

.align
Warps_Master_Crypt:
	.asciiz "CASTLE CRYPT"

.align
Warps_Master_Helm:
	.asciiz "HIDEOUT HELM"

.align
Warps_Master_Isles:
	.asciiz "DK ISLES"

.align
Warps_Master_HelmLobby:
	.asciiz "HELM LOBBY"

.align
Warps_Master_Array:
	.word Warps_Master_Japes
	.word Warps_Master_Aztec
	.word Warps_Master_Llama
	.word Warps_Master_Factory
	.word Warps_Master_Galleon
	.word Warps_Master_Fungi
	.word Warps_Master_Caves
	.word Warps_Master_Castle
	.word Warps_Master_Crypt
	.word Warps_Master_Helm
	.word Warps_Master_Isles
	.word Warps_Master_HelmLobby

.align
Warps_Text_Array:
	.word Warps_Japes_Array
	.word Warps_Aztec_Array
	.word Warps_Llama_Array
	.word Warps_Factory_Array
	.word Warps_Galleon_Array
	.word Warps_Fungi_Array
	.word Warps_Caves_Array
	.word Warps_Castle_Array
	.word Warps_Crypt_Array
	.word Warps_Helm_Array
	.word Warps_Isles_Array
	.word Warps_HelmLobby_Array

.align
Warps_Flag_Array:
	.word Warps_Japes_Flags
	.word Warps_Aztec_Flags
	.word Warps_Llama_Flags
	.word Warps_Factory_Flags
	.word Warps_Galleon_Flags
	.word Warps_Fungi_Flags
	.word Warps_Caves_Flags
	.word Warps_Castle_Flags
	.word Warps_Crypt_Flags
	.word Warps_Helm_Flags
	.word Warps_Isles_Flags
	.word Warps_HelmLobby_Flags

.align
Warps_Master_Length:
	.byte 10 // Japes
	.byte 10 // Aztec
	.byte 4 // Llama Temple
	.byte 10 // Factory
	.byte 10 // Galleon
	.byte 10 // Fungi
	.byte 10 // Caves
	.byte 10 // Castle
	.byte 6 // Crypt
	.byte 2 // Helm
	.byte 10 // Isles
	.byte 2 // Helm Lobby

.align
Warps_FlagControl_Set:
	.asciiz "SET"

.align
Warps_FlagControl_Unset:
	.asciiz "CLEAR"

.align
Warps_FlagControl_Array:
	.word Warps_FlagControl_Set
	.word Warps_FlagControl_Unset
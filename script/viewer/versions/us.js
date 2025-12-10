window.version_us = {
    region: "NDOE",
    name: "US",
    table_offset: 0,
    geo_offset: 0,
    pointer_offset: 0x101C50,
    emoji: "\u{1F1FA}\u{1F1F8}",
    fluids: [
        {
            texture: {
                index: 0x3C5,
                table: 7,
                width: 32,
                height: 32,
            },
            ripple: 0, // field_0x14[1]
            name: "0: Water",
            loader: window.texParserRGBA32,
        },
        {
            texture: {
                index: 0x2EE,
                table: 25,
                width: 64,
                height: 64,
            },
            palette: {
                index: 0x2EF,
                table: 25,
                width: 4,
                height: 4,
            },
            ripple: 0,
            name: "1: Deep Lava",
            loader: window.texParserCI4,
        },
        {
            texture: {
                index: 0xF0,
                table: 25,
                width: 32,
                height: 32,
            },
            ripple: 1,
            name: "2: Japes Dillo Ground",
            loader: window.texParserRGBA5551,
        },
        {
            texture: {
                index: 0x3C5,
                table: 7,
                width: 32,
                height: 32,
            },
            ripple: 0,
            name: "3: Water",
            loader: window.texParserRGBA32,
        },
        {
            texture: {
                index: 0x75C,
                table: 25,
                width: 32,
                height: 32,
            },
            ripple: 2,
            name: "4: Caves Dillo Ground",
            loader: window.texParserRGBA5551,
        },
        {
            texture: {
                index: 0x3B9,
                table: 7,
                width: 32,
                height: 32,
            },
            ripple: 0,
            name: "5: Lava",
            loader: window.texParserRGBA5551,
        },
        {
            texture: {
                index: 0x3D2,
                table: 7,
                width: 32,
                height: 32,
            },
            ripple: 0,
            name: "6: Acid",
            loader: window.texParserRGBA5551,
        },
        {
            texture: {
                index: 0x3BA, // Also loads 0x3DB?
                table: 7,
                width: 32,
                height: 32,
            },
            ripple: 0,
            name: "7: Water Lava",
            loader: window.texParserRGBA5551,
        },
        {
            texture: {
                index: 0xAF4,
                table: 25,
                width: 32,
                height: 32,
            },
            ripple: 1,
            name: "8: Caves Dillo Ground",
            loader: window.texParserRGBA5551,
        },
    ],
    overlay_data: [
        {
            compressed: false,
            rom_code_start: 0x1050,
            rom_data_start: 0x11320,
            rdram_start: 0x80000450,
            rdram_code_end: 0x80010720,
            rdram_data_end: 0x80016630,
            rom_data_end: 0x113f0
        },
        {
            compressed: true,
            rom_code_start: 0x113f0,
            rom_data_start: 0xcbe70,
            rdram_start: 0x805fb300,
            rdram_code_end: 0x80761050,
            rdram_data_end: 0x807ff100,
            rom_data_end: 0xd4b00
        },
        {
            compressed: true,
            rom_code_start: 0xd4b00,
            rom_data_start: 0xd6b00,
            rdram_start: 0x80024000,
            rdram_code_end: 0x80027100,
            rdram_data_end: 0x80027110,
            rom_data_end: 0xd6b00
        },
        {
            compressed: true,
            rom_code_start: 0xd6b00,
            rom_data_start: 0xd9a40,
            rdram_start: 0x80024000,
            rdram_code_end: 0x80028e10,
            rdram_data_end: 0x80028e20,
            rom_data_end: 0xd9a40
        },
        {
            compressed: true,
            rom_code_start: 0xd9a40,
            rom_data_start: 0xdf600,
            rdram_start: 0x80024000,
            rdram_code_end: 0x8002def0,
            rdram_data_end: 0x8002df10,
            rom_data_end: 0xdf600
        },
        {
            compressed: true,
            rom_code_start: 0xdf600,
            rom_data_start: 0xe6780,
            rdram_start: 0x80024000,
            rdram_code_end: 0x80030160,
            rdram_data_end: 0x80030170,
            rom_data_end: 0xe6780
        },
        {
            compressed: true,
            rom_code_start: 0xe6780,
            rom_data_start: 0xea0b0,
            rdram_start: 0x80024000,
            rdram_code_end: 0x8002a1b0,
            rdram_data_end: 0x8002a1e0,
            rom_data_end: 0xea0b0
        },
        {
            compressed: true,
            rom_code_start: 0xea0b0,
            rom_data_start: 0xf41a0,
            rdram_start: 0x80024000,
            rdram_code_end: 0x80036dc0,
            rdram_data_end: 0x80036df0,
            rom_data_end: 0xf41a0
        },
        {
            compressed: true,
            rom_code_start: 0xf41a0,
            rom_data_start: 0xfd2f0,
            rdram_start: 0x80024000,
            rdram_code_end: 0x8004ac00,
            rdram_data_end: 0x8004c750,
            rom_data_end: 0xfd2f0
        },
        {
            compressed: true,
            rom_code_start: 0xfd2f0,
            rom_data_start: 0x101a40,
            rdram_start: 0x80024000,
            rdram_code_end: 0x8002ec30,
            rdram_data_end: 0x80045c00,
            rom_data_end: 0xcbe70
        },
        {
            compressed: true,
            rom_code_start: 0xcbe70,
            rom_data_start: 0xd4b00,
            rdram_start: 0x80024000,
            rdram_code_end: 0x80033f10,
            rdram_data_end: 0x80033fd0
        }
    ],
    actor_behav_rdram: 0x8074E8B0,
    actor_behav_count: 128,
    actor_spawner_offset: 0x10,
    char_spawner_rdram: 0x8075EB80,
    char_spawner_count: 113,
    char_spawner_size: 0x18,
    cutscene_model_rdram: 0x8075570C,
    cutscene_model_count: 68,
    sprite_table: 0x80755390,
    actor_sprites: [
        { actor: 99, sprite_index: 43 },
        { actor: 30, sprite_index: 43 },
        { actor: 59, sprite_index: 43 },
        { actor: 114, sprite_index: 132 },
        { actor: 91, sprite_index: 131 },
        { actor: 113, sprite_index: 133 },
        { actor: 112, sprite_index: 134 },
        { actor: 111, sprite_index: 130 },
    ],
    balloons: [114, 91, 113, 112, 111],
    has_box_void: true,
    music_triggers: [
        { map_id: 0x07, count: 7, addr: 0x80745F74 },
        { map_id: 0x26, count: 4, addr: 0x80745FD8 },
        { map_id: 0x1E, count: 3, addr: 0x80746010 },
        { map_id: 0x27, count: 4, addr: 0x8074603C },
        { map_id: 0x1A, count: 4, addr: 0x80746074 },
        { map_id: 0x0E, count: 4, addr: 0x807460AC },
        { map_id: 0x1B, count: 10, addr: 0x807460E4 },
        { map_id: 0x30, count: 8, addr: 0x80746170 },
        { map_id: 0x37, count: 7, addr: 0x807461E0 },
        { map_id: 0x22, count: 4, addr: 0x80746244 },
        { map_id: 0xB0, count: 3, addr: 0x8074627C },
    ],
    distant_screen_texture: 0x3C7,
    amb_sfx: {
        offset: 0x80745B28,
        count: 15,
        size: 0xC,
    }
};
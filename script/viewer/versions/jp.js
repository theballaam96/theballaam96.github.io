window.version_jp = {
    region: "NDOJ",
    name: "JP",
    table_offset: 0,
    geo_offset: 0,
    pointer_offset: 0x1039C0,
    emoji: "\u{1F1EF}\u{1F1F5}",
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
                index: 0x2ED,
                table: 25,
                width: 64,
                height: 64,
            },
            palette: {
                index: 0x2EE,
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
                index: 0xEF,
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
                index: 0x720,
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
                index: 0xAA8,
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
            rom_data_start: 0x11620,
            rdram_start: 0x80000450,
            rdram_code_end: 0x80010a20,
            rdram_data_end: 0x80016950,
            rom_data_end: 0x116f0
        },
        {
            compressed: true,
            rom_code_start: 0x116f0,
            rom_data_start: 0xcd840,
            rdram_start: 0x805f8b00,
            rdram_code_end: 0x80761240,
            rdram_data_end: 0x807ff590,
            rom_data_end: 0xd67d0
        },
        {
            compressed: true,
            rom_code_start: 0xd67d0,
            rom_data_start: 0xd8840,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8001a1a0,
            rdram_data_end: 0x8001a1b0,
            rom_data_end: 0xd8840
        },
        {
            compressed: true,
            rom_code_start: 0xd8840,
            rom_data_start: 0xdb790,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8001be60,
            rdram_data_end: 0x8001be70,
            rom_data_end: 0xdb790
        },
        {
            compressed: true,
            rom_code_start: 0xdb790,
            rom_data_start: 0xe1350,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80020fb0,
            rdram_data_end: 0x80020fe0,
            rom_data_end: 0xe1350
        },
        {
            compressed: true,
            rom_code_start: 0xe1350,
            rom_data_start: 0xe85d0,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80023340,
            rdram_data_end: 0x80023350,
            rom_data_end: 0xe85d0
        },
        {
            compressed: true,
            rom_code_start: 0xe85d0,
            rom_data_start: 0xebf10,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8001d1d0,
            rdram_data_end: 0x8001d210,
            rom_data_end: 0xebf10
        },
        {
            compressed: true,
            rom_code_start: 0xebf10,
            rom_data_start: 0xf6030,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80029e40,
            rdram_data_end: 0x80029e70,
            rom_data_end: 0xf6030
        },
        {
            compressed: true,
            rom_code_start: 0xf6030,
            rom_data_start: 0xff080,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8003d990,
            rdram_data_end: 0x8003f4e0,
            rom_data_end: 0xff080
        },
        {
            compressed: true,
            rom_code_start: 0xff080,
            rom_data_start: 0x1037b0,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80021c40,
            rdram_data_end: 0x80038c10,
            rom_data_end: 0xcd840
        },
        {
            compressed: true,
            rom_code_start: 0xcd840,
            rom_data_start: 0xd67d0,
            rdram_start: 0x80017000,
            rdram_code_end: 0x800275a0,
            rdram_data_end: 0x80027670
        }
    ],
    actor_behav_rdram: 0x8074E1D0,
    actor_behav_count: 128,
    actor_spawner_offset: 0x10,
    char_spawner_rdram: 0x8075ED40,
    char_spawner_count: 113,
    char_spawner_size: 0x18,
    cutscene_model_rdram: 0x807557CC,
    cutscene_model_count: 68,
    sprite_table: 0x80755450,
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
        { map_id: 0x07, count: 7, addr: 0x80745834 },
        { map_id: 0x26, count: 4, addr: 0x80745898 },
        { map_id: 0x1E, count: 3, addr: 0x807458D0 },
        { map_id: 0x27, count: 4, addr: 0x807458FC },
        { map_id: 0x1A, count: 4, addr: 0x80745934 },
        { map_id: 0x0E, count: 4, addr: 0x8074596C },
        { map_id: 0x1B, count: 10, addr: 0x807459A4 },
        { map_id: 0x30, count: 8, addr: 0x80745A30 },
        { map_id: 0x37, count: 7, addr: 0x80745AA0 },
        { map_id: 0x22, count: 4, addr: 0x80745B04 },
        { map_id: 0xB0, count: 3, addr: 0x80745B3C },
    ],
    distant_screen_texture: 0x3C7,
    amb_sfx: {
        offset: 0x807453E8,
        count: 15,
        size: 0xC,
    }
};
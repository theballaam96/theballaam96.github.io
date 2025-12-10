window.version_lodgenet = {
    region: "NDOG",
    name: "Lodgenet",
    table_offset: 0,
    geo_offset: 0,
    pointer_offset: 0x1037C0,
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
            rom_data_start: 0x11560,
            rdram_start: 0x80000450,
            rdram_code_end: 0x80010960,
            rdram_data_end: 0x80016890,
            rom_data_end: 0x11630
        },
        {
            compressed: true,
            rom_code_start: 0x11630,
            rom_data_start: 0xcd740,
            rdram_start: 0x805f8b00,
            rdram_code_end: 0x80760d50,
            rdram_data_end: 0x807ff0b0,
            rom_data_end: 0xd6630
        },
        {
            compressed: true,
            rom_code_start: 0xd6630,
            rom_data_start: 0xd86a0,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8001a1a0,
            rdram_data_end: 0x8001a1b0,
            rom_data_end: 0xd86a0
        },
        {
            compressed: true,
            rom_code_start: 0xd86a0,
            rom_data_start: 0xdb600,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8001be60,
            rdram_data_end: 0x8001be70,
            rom_data_end: 0xdb600
        },
        {
            compressed: true,
            rom_code_start: 0xdb600,
            rom_data_start: 0xe11c0,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80020f90,
            rdram_data_end: 0x80020fc0,
            rom_data_end: 0xe11c0
        },
        {
            compressed: true,
            rom_code_start: 0xe11c0,
            rom_data_start: 0xe8450,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80023350,
            rdram_data_end: 0x80023360,
            rom_data_end: 0xe8450
        },
        {
            compressed: true,
            rom_code_start: 0xe8450,
            rom_data_start: 0xebd00,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8001d0d0,
            rdram_data_end: 0x8001d110,
            rom_data_end: 0xebd00
        },
        {
            compressed: true,
            rom_code_start: 0xebd00,
            rom_data_start: 0xf5e30,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80029e90,
            rdram_data_end: 0x80029ec0,
            rom_data_end: 0xf5e30
        },
        {
            compressed: true,
            rom_code_start: 0xf5e30,
            rom_data_start: 0xfee80,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8003d990,
            rdram_data_end: 0x8003f4e0,
            rom_data_end: 0xfee80
        },
        {
            compressed: true,
            rom_code_start: 0xfee80,
            rom_data_start: 0x1035b0,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80021c40,
            rdram_data_end: 0x80038c10,
            rom_data_end: 0xcd740
        },
        {
            compressed: true,
            rom_code_start: 0xcd740,
            rom_data_start: 0xd6630,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80027450,
            rdram_data_end: 0x80027520
        }
    ],
    actor_behav_rdram: 0x8074E3E0,
    actor_behav_count: 128,
    actor_spawner_offset: 0x10,
    char_spawner_rdram: 0x8075E850,
    char_spawner_count: 113,
    char_spawner_size: 0x18,
    cutscene_model_rdram: 0x8075529C,
    cutscene_model_count: 68,
    sprite_table: 0x80754F20,
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
        { map_id: 0x07, count: 7, addr: 0x80745A64 },
        { map_id: 0x26, count: 4, addr: 0x80745AC8 },
        { map_id: 0x1E, count: 3, addr: 0x80745B00 },
        { map_id: 0x27, count: 4, addr: 0x80745B2C },
        { map_id: 0x1A, count: 4, addr: 0x80745B64 },
        { map_id: 0x0E, count: 4, addr: 0x80745B9C },
        { map_id: 0x1B, count: 10, addr: 0x80745BD4 },
        { map_id: 0x30, count: 8, addr: 0x80745C60 },
        { map_id: 0x37, count: 7, addr: 0x80745CD0 },
        { map_id: 0x22, count: 4, addr: 0x80745D34 },
        { map_id: 0xB0, count: 3, addr: 0x80745D6C },
    ],
    distant_screen_texture: 0x3C7,
    amb_sfx: {
        offset: 0x80745618,
        count: 15,
        size: 0xC,
    }
};
window.version_pal = {
    region: "NDOP",
    name: "PAL",
    table_offset: 0,
    geo_offset: 0,
    pointer_offset: 0x1038D0,
    emoji: "\u{1F1EA}\u{1F1FA}",
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
                index: 0x74C,
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
                index: 0xAE0,
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
            rom_data_start: 0x118e0,
            rdram_start: 0x80000450,
            rdram_code_end: 0x80010ce0,
            rdram_data_end: 0x80016c10,
            rom_data_end: 0x119b0
        },
        {
            compressed: true,
            rom_code_start: 0x119b0,
            rom_data_start: 0xcd370,
            rdram_start: 0x805f4300,
            rdram_code_end: 0x8075bb70,
            rdram_data_end: 0x807ff040,
            rom_data_end: 0xd64a0
        },
        {
            compressed: true,
            rom_code_start: 0xd64a0,
            rom_data_start: 0xd84d0,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8001a110,
            rdram_data_end: 0x8001a120,
            rom_data_end: 0xd84d0
        },
        {
            compressed: true,
            rom_code_start: 0xd84d0,
            rom_data_start: 0xdb480,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8001bee0,
            rdram_data_end: 0x8001bef0,
            rom_data_end: 0xdb480
        },
        {
            compressed: true,
            rom_code_start: 0xdb480,
            rom_data_start: 0xe1070,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80020fb0,
            rdram_data_end: 0x80020fe0,
            rom_data_end: 0xe1070
        },
        {
            compressed: true,
            rom_code_start: 0xe1070,
            rom_data_start: 0xe82e0,
            rdram_start: 0x80017000,
            rdram_code_end: 0x800232b0,
            rdram_data_end: 0x800232c0,
            rom_data_end: 0xe82e0
        },
        {
            compressed: true,
            rom_code_start: 0xe82e0,
            rom_data_start: 0xebc10,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8001d1c0,
            rdram_data_end: 0x8001d200,
            rom_data_end: 0xebc10
        },
        {
            compressed: true,
            rom_code_start: 0xebc10,
            rom_data_start: 0xf5dc0,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80029eb0,
            rdram_data_end: 0x80029ee0,
            rom_data_end: 0xf5dc0
        },
        {
            compressed: true,
            rom_code_start: 0xf5dc0,
            rom_data_start: 0xfef40,
            rdram_start: 0x80017000,
            rdram_code_end: 0x8003db60,
            rdram_data_end: 0x8003f6b0,
            rom_data_end: 0xfef40
        },
        {
            compressed: true,
            rom_code_start: 0xfef40,
            rom_data_start: 0x1036c0,
            rdram_start: 0x80017000,
            rdram_code_end: 0x80021ce0,
            rdram_data_end: 0x80038cb0,
            rom_data_end: 0xcd370
        },
        {
            compressed: true,
            rom_code_start: 0xcd370,
            rom_data_start: 0xd64a0,
            rdram_start: 0x80017000,
            rdram_code_end: 0x800278c0,
            rdram_data_end: 0x80027990
        }
    ],
    actor_behav_rdram: 0x80749010,
    actor_behav_count: 128,
    actor_spawner_offset: 0x10,
    char_spawner_rdram: 0x80759690,
    char_spawner_count: 113,
    char_spawner_size: 0x18,
    cutscene_model_rdram: 0x8074FF8C,
    cutscene_model_count: 68,
    sprite_table: 0x8074FC10,
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
        { map_id: 0x07, count: 7, addr: 0x807406C4 },
        { map_id: 0x26, count: 4, addr: 0x80740728 },
        { map_id: 0x1E, count: 3, addr: 0x80740760 },
        { map_id: 0x27, count: 4, addr: 0x8074078C },
        { map_id: 0x1A, count: 4, addr: 0x807407C4 },
        { map_id: 0x0E, count: 4, addr: 0x807407FC },
        { map_id: 0x1B, count: 10, addr: 0x80740834 },
        { map_id: 0x30, count: 8, addr: 0x807408C0 },
        { map_id: 0x37, count: 7, addr: 0x80740930 },
        { map_id: 0x22, count: 4, addr: 0x80740994 },
        { map_id: 0xB0, count: 3, addr: 0x807409CC },
    ],
    distant_screen_texture: 0x3C7,
    amb_sfx: {
        offset: 0x80740278,
        count: 15,
        size: 0xC,
    }
};
// --- II. CORE DATA STRUCTURES: VERTEX, TRIANGLE ---

class Vertex {
    /**
     * @param {Uint8Array} vertexData - 16 bytes of raw vertex data.
     */
    constructor(vertexData) {
        // X, Y, Z (Signed 16-bit integers, Big-Endian)
        this.raw = vertexData;
        this.x = window.readFile(vertexData, 0, 2); 
        this.y = window.readFile(vertexData, 2, 2); 
        this.z = window.readFile(vertexData, 4, 2);
        this.x = this.x > 0x7FFF ? this.x - 0x10000 : this.x;
        this.y = this.y > 0x7FFF ? this.y - 0x10000 : this.y;
        this.z = this.z > 0x7FFF ? this.z - 0x10000 : this.z;
        
        // UNK (Unsigned 16-bit integer, Big-Endian)
        this.unk = window.readFile(vertexData, 6, 2);
        
        // Texture Coords (Unsigned 16-bit integers, Big-Endian)
        this.texture_cord_u = window.readFile(vertexData, 8, 2);
        this.texture_cord_v = window.readFile(vertexData, 10, 2); 

        // R, G, B, Alpha (1 byte each)
        this.xr = vertexData[12]; 
        this.yg = vertexData[13];
        this.zb = vertexData[14];
        this.alpha = vertexData[15];
    }

    toString() {
        return `Vertex(${this.x}, ${this.y}, ${this.z})`;
    }
}


class Triangle {
    v1 = 0; v2 = 0; v3 = 0;

    constructor(v1, v2, v3) {
        this.v1 = v1; this.v2 = v2; this.v3 = v3;
    }

    toString() {
        return `Triangle(${this.v1}, ${this.v2}, ${this.v3})`;
    }

    /**
     * Creates a Triangle from a G_TRI1 command.
     * @param {G_TRI1} cmd 
     * @returns {Triangle}
     */
    static fromTri1(cmd) {
        if (cmd.opcode !== 0x05) throw new Error("Must be an instance of G_TRI1");
        return new Triangle(cmd.v1, cmd.v2, cmd.v3);
    }

    /**
     * Creates two Triangles from a G_TRI2 command.
     * @param {G_TRI2} cmd 
     * @returns {[Triangle, Triangle]}
     */
    static fromTri2(cmd) {
        if (cmd.opcode !== 0x06) throw new Error("Must be an instance of G_TRI2");
        const tri1 = new Triangle(cmd.v1, cmd.v2, cmd.v3);
        const tri2 = new Triangle(cmd.v4, cmd.v5, cmd.v6);
        return [tri1, tri2];
    }
}


// --- III. F3DEX2 COMMAND DEFINITIONS ---

/**
 * Base class for all Display List commands.
 */
class DL_Command {
    constructor(commandBytes) {
        this._rawData = commandBytes;
        this.opcode = commandBytes[0]; // The opcode is the first byte
    }
    toString() {
        return `${this.constructor.name}(0x${this.opcode.toString(16).toUpperCase().padStart(2, '0')})`;
    }
}

class G_SPNOOP extends DL_Command {
    constructor(command) {
        super(command);
        this.tag = command.slice(1, 8); 
    }
    toString() {
        const tagHex = Array.from(this.tag).map(b => b.toString(16).padStart(2, '0')).join('');
        return `G_SPNOOP(0x${tagHex})`;
    }
}

class G_VTX extends DL_Command {
    constructor(command) {
        super(command);
        const vCountWord = window.readFile(command, 1, 2);
        const vCountBinary = vCountWord.toString(2).padStart(16, '0');
        const vCountBits = vCountBinary.slice(4, 12);
        this.vertexCount = parseInt(vCountBits, 2);

        const bStartByte = command[3];
        this.bufferStart = bStartByte - this.vertexCount * 2;
        this.segment = command[4]; 
        this.address = command.slice(5, 8);
    }
    toString() {
        const addrHex = Array.from(this.address).map(b => b.toString(16).padStart(2, '0')).join('');
        return `G_VTX(${this.vertexCount}, ${this.bufferStart}, 0x${addrHex})`;
    }
}

class G_MODIFYVTX extends DL_Command { toString() { return "G_MODIFYVTX()"; } }
class G_CULLDL extends DL_Command { toString() { return "G_CULLDL()"; } }
class G_BRANCH_Z extends DL_Command { toString() { return "G_BRANCH_Z()"; } }

class G_TRI1 extends DL_Command {
    constructor(command) {
        super(command);
        this.v1 = Math.floor(command[1] / 2);
        this.v2 = Math.floor(command[2] / 2);
        this.v3 = Math.floor(command[3] / 2);
    }
    toString() { return `G_TRI1(${this.v1}, ${this.v2}, ${this.v3})`; }
}

class G_TRI2 extends DL_Command {
    constructor(command) {
        super(command);
        this.v1 = Math.floor(command[1] / 2);
        this.v2 = Math.floor(command[2] / 2);
        this.v3 = Math.floor(command[3] / 2);
        this.v4 = Math.floor(command[5] / 2);
        this.v5 = Math.floor(command[6] / 2);
        this.v6 = Math.floor(command[7] / 2);
    }
    toString() { return `G_TRI2((${this.v1}, ${this.v2}, ${this.v3}), (${this.v4}, ${this.v5}, ${this.v6}))`; }
}

class G_QUAD extends DL_Command { toString() { return "G_QUAD()"; } }
class G_SPECIAL_3 extends DL_Command { toString() { return "G_SPECIAL_3()"; } }
class G_SPECIAL_2 extends DL_Command { toString() { return "G_SPECIAL_2()"; } }
class G_SPECIAL_1 extends DL_Command { toString() { return "G_SPECIAL_1()"; } }
class G_DMA_IO extends DL_Command { toString() { return "G_DMA_IO()"; } }
class G_TEXTURE extends DL_Command { toString() { return "G_TEXTURE()"; } }
class G_POPMTX extends DL_Command { toString() { return "G_POPMTX()"; } }
class G_GEOMETRYMODE extends DL_Command { toString() { return "G_GEOMETRYMODE()"; } }
class G_MTX extends DL_Command { toString() { return "G_MTX()"; } }
class G_MOVEWORD extends DL_Command { toString() { return "G_MOVEWORD()"; } }
class G_MOVEMEM extends DL_Command { toString() { return "G_MOVEMEM()"; } }
class G_LOAD_UCODE extends DL_Command { toString() { return "G_LOAD_UCODE()"; } }

class G_DL extends DL_Command {
    constructor(command) {
        super(command);
        this.storeReturnAddress = command[1] === 0x00;
        this.segment = command[4];
        this.address = command.slice(5, 8);
    }
    toString() {
        const addrHex = Array.from(this.address).map(b => b.toString(16).padStart(2, '0')).join('');
        return `G_DL(${this.storeReturnAddress}, 0x${addrHex})`;
    }
}

class G_ENDDL extends DL_Command { toString() { return "G_ENDDL()"; } }
class G_NOOP extends DL_Command { toString() { return "G_NOOP()"; } }
class G_RDPHALF_1 extends DL_Command { toString() { return "G_RDPHALF_1()"; } }
class G_SetOtherMode_L extends DL_Command { toString() { return "G_SetOtherMode_L()"; } }
class G_SetOtherMode_H extends DL_Command { toString() { return "G_SetOtherMode_H()"; } }
class G_TEXRECT extends DL_Command { toString() { return "G_TEXRECT()"; } }
class G_TEXRECTFLIP extends DL_Command { toString() { return "G_TEXRECTFLIP()"; } }
class G_RDPLOADSYNC extends DL_Command { toString() { return "G_RDPLOADSYNC()"; } }
class G_RDPPIPESYNC extends DL_Command { toString() { return "G_RDPPIPESYNC()"; } }
class G_RDPTILESYNC extends DL_Command { toString() { return "G_RDPTILESYNC()"; } }
class G_RDPFULLSYNC extends DL_Command { toString() { return "G_RDPFULLSYNC()"; } }
class G_SETKEYGB extends DL_Command { toString() { return "G_SETKEYGB()"; } }
class G_SETKEYR extends DL_Command { toString() { return "G_SETKEYR()"; } }
class G_SETCONVERT extends DL_Command { toString() { return "G_SETCONVERT()"; } }
class G_SETSCISSOR extends DL_Command { toString() { return "G_SETSCISSOR()"; } }
class G_SETPRIMDEPTH extends DL_Command { toString() { return "G_SETPRIMDEPTH()"; } }
class G_RDPSetOtherMode extends DL_Command { toString() { return "G_RDPSetOtherMode()"; } }
class G_LOADTLUT extends DL_Command { toString() { return "G_LOADTLUT()"; } }
class G_RDPHALF_2 extends DL_Command { toString() { return "G_RDPHALF_2()"; } }
class G_SETTILESIZE extends DL_Command { toString() { return "G_SETTILESIZE()"; } }
class G_LOADBLOCK extends DL_Command { toString() { return "G_LOADBLOCK()"; } }
class G_LOADTILE extends DL_Command { toString() { return "G_LOADTILE()"; } }
class G_SETTILE extends DL_Command { toString() { return "G_SETTILE()"; } }
class G_FILLRECT extends DL_Command { toString() { return "G_FILLRECT()"; } }
class G_SETFILLCOLOR extends DL_Command { toString() { return "G_SETFILLCOLOR()"; } }
class G_SETFOGCOLOR extends DL_Command { toString() { return "G_SETFOGCOLOR()"; } }
class G_SETBLENDCOLOR extends DL_Command { toString() { return "G_SETBLENDCOLOR()"; } }
class G_SETPRIMCOLOR extends DL_Command { toString() { return "G_SETPRIMCOLOR()"; } }
class G_SETENVCOLOR extends DL_Command { toString() { return "G_SETENVCOLOR()"; } }
class G_SETCOMBINE extends DL_Command { toString() { return "G_SETCOMBINE()"; } }
class G_SETTIMG extends DL_Command { toString() { return "G_SETTIMG()"; } }
class G_SETZIMG extends DL_Command { toString() { return "G_SETZIMG()"; } }
class G_SETCIMG extends DL_Command { toString() { return "G_SETCIMG()"; } }


const DL_COMMANDS = {
    0x00: G_SPNOOP, 0x01: G_VTX, 0x02: G_MODIFYVTX, 0x03: G_CULLDL, 0x04: G_BRANCH_Z, 
    0x05: G_TRI1, 0x06: G_TRI2, 0x07: G_QUAD, 0xD3: G_SPECIAL_3, 0xD4: G_SPECIAL_2, 
    0xD5: G_SPECIAL_1, 0xD6: G_DMA_IO, 0xD7: G_TEXTURE, 0xD8: G_POPMTX, 0xD9: G_GEOMETRYMODE, 
    0xDA: G_MTX, 0xDB: G_MOVEWORD, 0xDC: G_MOVEMEM, 0xDD: G_LOAD_UCODE, 0xDE: G_DL, 
    0xDF: G_ENDDL, 0xE0: G_NOOP, 0xE1: G_RDPHALF_1, 0xE2: G_SetOtherMode_L, 0xE3: G_SetOtherMode_H, 
    0xE4: G_TEXRECT, 0xE5: G_TEXRECTFLIP, 0xE6: G_RDPLOADSYNC, 0xE7: G_RDPPIPESYNC, 
    0xE8: G_RDPTILESYNC, 0xE9: G_RDPFULLSYNC, 0xEA: G_SETKEYGB, 0xEB: G_SETKEYR, 
    0xEC: G_SETCONVERT, 0xED: G_SETSCISSOR, 0xEE: G_SETPRIMDEPTH, 0xEF: G_RDPSetOtherMode, 
    0xF0: G_LOADTLUT, 0xF1: G_RDPHALF_2, 0xF2: G_SETTILESIZE, 0xF3: G_LOADBLOCK, 
    0xF4: G_LOADTILE, 0xF5: G_SETTILE, 0xF6: G_FILLRECT, 0xF7: G_SETFILLCOLOR, 
    0xF8: G_SETFOGCOLOR, 0xF9: G_SETBLENDCOLOR, 0xFA: G_SETPRIMCOLOR, 0xFB: G_SETENVCOLOR, 
    0xFC: G_SETCOMBINE, 0xFD: G_SETTIMG, 0xFE: G_SETZIMG, 0xFF: G_SETCIMG
};

/**
 * Factory function to create the correct command object based on the opcode.
 * @param {Uint8Array} commandBytes - The 8 bytes of the raw command.
 * @returns {DL_Command | null} An instance of the correct command class, or null.
 */
const getCommand = (commandBytes) => {
    const opcode = commandBytes[0];
    const CommandClass = DL_COMMANDS[opcode];
    
    if (CommandClass) {
        return new CommandClass(commandBytes);
    }
    return null;
};

function getDLChunkData(data) {
    const output = {
        r: window.readFile(data, 0, 1),
        g: window.readFile(data, 1, 1),
        b: window.readFile(data, 2, 1),
        unknown_char: window.readFile(data, 3, 1),
        mips_instruction: [window.readFile(data, 4, 1), window.readFile(data, 5, 1), window.readFile(data, 6, 1), window.readFile(data, 7, 1)],
        unknown_flag: window.readFile(data, 8, 4),
        dl_1_start: window.readFile(data, 12, 4),
        dl_1_size: window.readFile(data, 16, 4),
        dl_2_start: window.readFile(data, 20, 4),
        dl_2_size: window.readFile(data, 24, 4),
        dl_3_start: window.readFile(data, 28, 4),
        dl_3_size: window.readFile(data, 32, 4),
        dl_4_start: window.readFile(data, 36, 4),
        dl_4_size: window.readFile(data, 40, 4),
        vertex_start: window.readFile(data, 44, 4),
        vertex_end: window.readFile(data, 48, 4),
        vertex_start_size: {},
    };
    output.vertex_start_size[output.dl_1_start] = [output.vertex_start, output.vertex_end];
    output.vertex_start_size[output.dl_2_start] = [output.vertex_start, output.vertex_end];
    output.vertex_start_size[output.dl_3_start] = [output.vertex_start, output.vertex_end];
    output.vertex_start_size[output.dl_4_start] = [output.vertex_start, output.vertex_end];
    return output;
}

function getVertexChunkData(fileBytes, chunkStart, chunkLength) {
    let output = [];
    for (let chunkNum = 0; chunkNum < parseInt(chunkLength / 52); chunkNum++) {
        let localChunkStart = chunkStart + 52 * chunkNum;
        let localChunkEnd = chunkStart + 52 * (chunkNum + 1);
        output.push(getDLChunkData(fileBytes.slice(localChunkStart, localChunkEnd)));
    }
    return output;
}

function getSoloDLExpansion(data) {
    return {
        unknown_1: window.readFile(data, 0, 4),
        unknown_2: window.readFile(data, 4, 4),
        display_list_offset: window.readFile(data, 8, 4),
        unknown_4: window.readFile(data, 12, 4),
    }
}

function getDLExpansions(fileBytes, expStart) {
    let output = [];
    let exp_count = window.readFile(fileBytes, expStart, 4);
    for (let i = 0; i < exp_count; i++) {
        let local_start = expStart + 4 + (i * 0x10);
        output.push(getSoloDLExpansion(fileBytes.slice(local_start, local_start + 0x10)));
    }
    return output;
}

class DisplayList {
    /**
     * @param {Uint8Array} rawData - Raw data of the display list
     * @param {Uint8Array} rawVertexData - Raw vertex data associated with this display list
     * @param {number} vertexPointer - The display list's pointer in the vertex data
     * @param {number} offset - Localized offset of this display list
     * @param {DisplayList[]} [branches=[]] - The display list's branches
     * @param {boolean} [branched=false] - Whether the display list is branched
     */
    constructor(rawData, rawVertexData, vertexPointer, offset, branches = [], branched = false) {
        this._rawData = rawData;
        this.branches = branches;
        this.rawVertexData = rawVertexData;
        this.vertexPointer = vertexPointer;
        this.offset = offset;
        this.isBranched = branched;
    }

    toString() {
        if (this.branches.length > 0)
            return `DisplayList(offset=${this.offset}, size=${this.size}, num_commands=${this.numCommands}, branches=${this.branches.length})`;
        return `DisplayList(offset=${this.offset}, size=${this.size}, num_commands=${this.numCommands})`;
    }

    equals(obj) {
        if (typeof obj === "number") return this.offset === obj;
        if (obj instanceof DisplayList) return this.offset === obj.offset;
        return false;
    }

    get rawVertexData() {
        return this.rawVertexData;
    }

    set rawVertexData(rawVertexData) {
        this._rawVertexData = rawVertexData;
        for (const branch of this.branches) {
            branch.rawVertexData = rawVertexData;
        }
    }

    get size() {
        return this._rawData.length;
    }

    get numCommands() {
        return Math.floor(this.size / 8);
    }

    get commands() {
        const ret = [];
        for (let i = 0; i < this.numCommands; i++) {
            const cmdBytes = this._rawData.slice(i * 8, i * 8 + 8);
            const cmd = getCommand(cmdBytes); // external function
            if (cmd) ret.push(cmd);
        }
        return ret;
    }

    get vertexBuffers() {
        return this.commands.filter(cmd => cmd.opcode === 0x01);
    }

    get vertexCount() {
        return this.vertexBuffers.reduce((sum, vtx) => sum + vtx.vertexCount, 0);
    }

    get recursiveVertexCount() {
        let total = this.vertexCount;
        for (const branch of this.branches) {
            total += branch.recursiveVertexCount;
        }
        return total;
    }

    get triangles() {
        const retList = [];
        let triList = [];
        let currTexConfig = {};

        for (const cmd of this.commands) {
            switch (cmd.opcode) {
                case 0x01:
                    triList = [];
                    retList.push(triList);
                    break;
                case 0x05:
                    const tri = Triangle.fromTri1(cmd);
                    triList.push({tri: tri});
                    break;
                case 0x06:
                    const [tri1, tri2] = Triangle.fromTri2(cmd);
                    triList.push({tri: tri1}, {tri: tri2});
                    break;
                case 0xDE:
                    const addr = window.readFile(cmd.address, 0, 4);
                    const branched = this.getBranchByOffset(addr);
                    if (branched) retList.push(...branched.triangles);
                    break;
                case 0xFD:
                    currTexConfig.texture = window.readFile(cmd._rawData, 5, 3);
                    currTexConfig.dyn_bank = window.readFile(cmd._rawData, 4, 1);
                    currTexConfig.texture_table = 25;
                    break;
                default:
                    // console.log(cmd.opcode.toString(16))
                    break;
            }
        }

        return retList;
    }

    get verticies() {
        const retList = [];
        let vertList = [];

        for (const cmd of this.commands) {
            const opcode = cmd.opcode;
            if (opcode === 0x01) {
                let vertexBufferStart = this.vertexPointer + window.readFile(cmd.address, 0, 4);
                let vertexBufferEnd = vertexBufferStart + (cmd.vertexCount * 16);

                let vertexData = this._rawVertexData.slice(vertexBufferStart, vertexBufferEnd);

                if (vertexBufferEnd > this._rawVertexData.length) {
                    vertexBufferStart = window.readFile(cmd.address, 0, 4);
                    vertexBufferEnd = vertexBufferStart + (cmd.vertexCount * 16);
                    vertexData = this._rawVertexData.slice(vertexBufferStart, vertexBufferEnd);
                }

                for (let i = 0; i < cmd.vertexCount; i++) {
                    const vertBytes = vertexData.slice(i * 16, i * 16 + 16);
                    vertList.push(new Vertex(vertBytes));
                }

                retList.push(vertList);
                vertList = [];
                continue;
            }

            if (opcode === 0xDE) {
                const addr = window.readFile(cmd.address, 0, 4);
                const branched = this.getBranchByOffset(addr);
                if (branched) retList.push(...branched.verticies);
                continue;
            }
        }

        return retList;
    }

    getBranchByOffset(offset) {
        const found = this.branches.find(b => b.offset === offset);
        return found || null;
    }
}



function createDisplayLists(rawDLData, rawVertexData, vertexChunkData, expansions) {
    function readDisplayLists(dl_pointer = 0, branched = false, inherited_vertex_data = null) {
        let output = [];
        let branches = [];
        let dl_vertex_starts = vertexChunkData.reduce((acc, chunk) => {
            // Merges the current accumulation object (acc) with the 
            // vertex_start_size object from the current chunk.
            // If there are duplicate keys, the later chunk's value will overwrite the former.
            return Object.assign(acc, chunk.vertex_start_size);
        }, {});
        let expansion_offsets = []
        if (expansions) {
            expansion_offsets = expansions.map(k => k.display_list_offset);
        }
        let raw_data = [];
        let vertex_pointer = 0;
        let old_vertex_start = 0;
        let branched_dls = {};
        let dl_raw_vertex_data = inherited_vertex_data ? inherited_vertex_data : rawVertexData;

        let seg_ref = dl_pointer;
        while (command_bytes = rawDLData.slice(seg_ref, seg_ref + 8)) {
            if (command_bytes.length == 0) {
                break;
            }
            cmd = getCommand(command_bytes);
            raw_data = raw_data.concat(Array.from(command_bytes));
            if (cmd.opcode == 0xDE) {
                let addr = window.readFile(cmd.address, 0, 4);
                branches = branches.concat(readDisplayLists(addr, true, dl_raw_vertex_data));
                seg_ref += 8;
                continue;
            } else if (cmd.opcode == 0xDF) {
                if (dl_vertex_starts[dl_pointer]) { // Object.keys(dl_vertex_starts).includes(dl_pointer) always returns false because Object.keys() stringifies the keys
                    vertex_start = dl_vertex_starts[dl_pointer][0]
                    vertex_size = dl_vertex_starts[dl_pointer][1]
                    if (vertex_start != old_vertex_start) {
                        vertex_pointer = 0;
                        old_vertex_start = vertex_start;
                    }
                    dl_raw_vertex_data = rawVertexData.slice(vertex_start, vertex_start + vertex_size);
                }
                if (expansion_offsets.includes(dl_pointer)) {
                    dl_raw_vertex_data = rawVertexData;
                    vertex_pointer = 0;
                }
                let display_list = branched_dls[dl_pointer];
                if (!display_list) {
                    display_list = new DisplayList(new Uint8Array(raw_data), new Uint8Array(dl_raw_vertex_data), vertex_pointer, dl_pointer, branches, branched);
                }
                output.push(display_list);
                display_list.branches.forEach(dl => {
                    branched_dls[dl.offset] = dl;
                })
                vertex_pointer += display_list.vertexCount * 16

                branches.forEach(branch => {
                    branch._rawVertexData = dl_raw_vertex_data;
                });

                raw_data = [];
                branches = [];
                seg_ref += 8;
                dl_pointer = seg_ref;

                if (branched) {
                    break;
                }
            } else {
                seg_ref += 8;
            }
        }
        return output;
    }

    return readDisplayLists();
}

function generateGeometryGeneric(config) {
    if (config.file.length == 0) {
        return "";
    }
    // Create Display Lists
    let raw_dl_data = config.file.slice(config.dl_start, config.dl_end);
    let raw_vertex_data = config.file.slice(config.vert_start, config.vert_start + config.vert_length);
    let vertex_chunk_data = [];
    if (Object.keys(config).includes("vert_chunk_start")) {
        vertex_chunk_data = getVertexChunkData(config.file, config.vert_chunk_start, config.vert_chunk_length);
    }
    let expansions = [];
    if (Object.keys(config).includes("dl_expansion_start")) {
        expansions = getDLExpansions(config.file, config.dl_expansion_start);
    }
    let display_lists = createDisplayLists(raw_dl_data, raw_vertex_data, vertex_chunk_data, expansions);

    // Create OBJ File
    let obj_data = "";
    let tri_offset = 1;

    display_lists.forEach((dl, dl_num) => {
        if (dl.isBranched) {
            return;
        }
        obj_data += `# Display List ${dl_num + 1}, Offset: ${dl.offset}\n\n`
        let vgroup = dl.verticies;
        let tgroup = dl.triangles;

        vgroup.forEach((verticies, group_num) => {
            triangles = tgroup[group_num];
            obj_data += `# Vertex Group ${group_num + 1}\n\n`

            // Write verticies to file
            verticies.forEach(vertex => {
                obj_data += `v ${vertex.x} ${vertex.y} ${vertex.z} ${window.getRatioString(vertex.xr, vertex.yg, vertex.zb, vertex.alpha)}\n`
            })
            obj_data += "\n"

            obj_data += `# Triangle Group ${group_num + 1}\n\n`

            // Write triangles/faces to file
            triangles.forEach(tri => {
                obj_data += `f ${tri.tri.v1 + tri_offset} ${tri.tri.v2 + tri_offset} ${tri.tri.v3 + tri_offset}\n`
            })
            obj_data += "\n"

            // The triangle offset is used to globally identify the vertex due to
            // Display Lists reading them with local positions
            tri_offset += verticies.length;
        })
    })
    return obj_data;
}
window.generateGeometryGeneric = generateGeometryGeneric;

function generateGeometry(map_id) {
    const map_geo = window.getFile(window.rom_bytes, window.rom_dv, 1, map_id, true);
    if (map_geo.length == 0) {
        return "";
    }
    const vert_start = window.readFile(map_geo, 0x38 - window.geo_offset, 4);
    const track_start = window.readFile(map_geo, 0x40 - window.geo_offset, 4);
    const unk_start_0 = window.readFile(map_geo, 0x6C - window.geo_offset, 4);
    const vert_chunk_start = window.readFile(map_geo, 0x68 - window.geo_offset, 4);
    return generateGeometryGeneric({
        file: map_geo,
        dl_start: window.readFile(map_geo, 0x34 - window.geo_offset, 4),
        dl_end: vert_start,
        vert_start: vert_start,
        vert_length: track_start - vert_start,
        vert_chunk_start: vert_chunk_start,
        vert_chunk_length: unk_start_0 - vert_chunk_start,
        dl_expansion_start: window.readFile(map_geo, 0x70 - window.geo_offset, 4),
    });
}
window.generateGeometry = generateGeometry;

function getFog() {
    const render_fog = document.getElementById("show_fog").checked;
    if (!render_fog) {
        return null;
    }
    const map_id = document.getElementById("map_id_selector").value;
    const map_geo = window.getFile(window.rom_bytes, window.rom_dv, 1, map_id, true);
    if (map_geo.length == 0) {
        return null;
    }
    const enabled = (window.readFile(map_geo, 8, 1) & 1) !== 0;
    if (!enabled) {
        return null;
    }
    const local_scale = window.getScale(map_id);
    const color = map_id == 0x26 ? 0x8A5216 : 0x000000;
    return new THREE.Fog(color, 990 * local_scale, (990 + 999) * local_scale);
}
window.getFog = getFog;

function getDistantScreens(map_id) {
    const map_geo = window.getFile(window.rom_bytes, window.rom_dv, 1, map_id, true);
    if (map_geo.length == 0) {
        return null;
    }
    const header = window.readFile(map_geo, 0x50 - window.geo_offset, 4);
    const count = window.readFile(map_geo, header, 4);
    let screens = [];
    for (let i = 0; i < count; i++) {
        const screen_head = header + 4 + (i * 0x40);
        const verts = [
            {
                coords: [
                    window.readFile(map_geo, screen_head + 0x20, 2, true),
                    window.readFile(map_geo, screen_head + 0x28, 2, true),
                    window.readFile(map_geo, screen_head + 0x30, 2, true),
                ],
                uv: [
                    parseInt(window.readFloat(map_geo, screen_head + 0x00) * 50) << 5,
                    parseInt(window.readFloat(map_geo, screen_head + 0x04) * 50) << 5,
                ],
            },
            {
                coords: [
                    window.readFile(map_geo, screen_head + 0x22, 2, true),
                    window.readFile(map_geo, screen_head + 0x2A, 2, true),
                    window.readFile(map_geo, screen_head + 0x32, 2, true),
                ],
                uv: [
                    parseInt(window.readFloat(map_geo, screen_head + 0x08) * 50) << 5,
                    parseInt(window.readFloat(map_geo, screen_head + 0x0C) * 50) << 5,
                ],
            },
            {
                coords: [
                    window.readFile(map_geo, screen_head + 0x24, 2, true),
                    window.readFile(map_geo, screen_head + 0x2C, 2, true),
                    window.readFile(map_geo, screen_head + 0x34, 2, true),
                ],
                uv: [
                    parseInt(window.readFloat(map_geo, screen_head + 0x10) * 50) << 5,
                    parseInt(window.readFloat(map_geo, screen_head + 0x14) * 50) << 5,
                ],
            },
            {
                coords: [
                    window.readFile(map_geo, screen_head + 0x26, 2, true),
                    window.readFile(map_geo, screen_head + 0x2E, 2, true),
                    window.readFile(map_geo, screen_head + 0x36, 2, true),
                ],
                uv: [
                    parseInt(window.readFloat(map_geo, screen_head + 0x18) * 50) << 5,
                    parseInt(window.readFloat(map_geo, screen_head + 0x1C) * 50) << 5,
                ],
            },
        ];
        let avg = [];
        for (let j = 0; j < 3; j++) {
            let local_total = 0;
            verts.forEach(vert => {
                local_total += vert.coords[j];
            })
            avg.push(local_total / verts.length);
        }
        screens.push(verts);
    }
    return screens;
}
window.getDistantScreens = getDistantScreens;
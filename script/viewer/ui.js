const map_ids = {
    "Japes": {
        "Jungle Japes: Mountain": 4,
        "Jungle Japes: Minecart": 6,
        "Jungle Japes": 7,
        "Jungle Japes: Army Dillo": 8,
        "Jungle Japes: Shell": 12,
        "Jungle Japes: Lanky's Cave": 13,
        "Jungle Japes: Chunky's Cave": 33,
        "Jungle Japes: Barrel Blast": 37,
    },
    "Aztec": {
        "Angry Aztec: Beetle Race": 14,
        "Angry Aztec: Tiny's Temple": 16,
        "Angry Aztec: Five Door Temple (DK)": 19,
        "Angry Aztec: Llama Temple": 20,
        "Angry Aztec: Five Door Temple (Diddy)": 21,
        "Angry Aztec: Five Door Temple (Tiny)": 22,
        "Angry Aztec: Five Door Temple (Lanky)": 23,
        "Angry Aztec: Five Door Temple (Chunky)": 24,
        "Angry Aztec": 38,
        "Angry Aztec: Barrel Blast": 41,
        "Angry Aztec: Dogadon": 197,
    },
    "Factory": {
        "Frantic Factory": 26,
        "Frantic Factory: Barrel Blast": 110,
        "Frantic Factory: Car Race": 27,
        "Frantic Factory: Power Shed": 29,
        "Frantic Factory: Crusher Room": 36,
        "Frantic Factory: Mad Jack": 154,
    },
    "Galleon": {
        "Gloomy Galleon": 30,
        "Gloomy Galleon: K. Rool's Ship": 31,
        "Gloomy Galleon: Seal Race": 39,
        "Gloomy Galleon: Shipwreck (Diddy, Lanky, Chunky)": 43,
        "Gloomy Galleon: Treasure Chest": 44,
        "Gloomy Galleon: Mermaid": 45,
        "Gloomy Galleon: Shipwreck (DK, Tiny)": 46,
        "Gloomy Galleon: Shipwreck (Lanky, Tiny)": 47,
        "Gloomy Galleon: Lighthouse": 49,
        "Gloomy Galleon: Mechanical Fish": 51,
        "Gloomy Galleon: Barrel Blast": 54,
        "Gloomy Galleon: Submarine": 179,
        "Gloomy Galleon: Pufftoss": 111,
    },
    "Fungi": {
        "Fungi Forest": 48,
        "Fungi Forest: Ant Hill": 52,
        "Fungi Forest: Minecart": 55,
        "Fungi Forest: Diddy's Barn": 56,
        "Fungi Forest: Diddy's Attic": 57,
        "Fungi Forest: Lanky's Attic": 58,
        "Fungi Forest: DK's Barn": 59,
        "Fungi Forest: Spider": 60,
        "Fungi Forest: Front Part of Mill": 61,
        "Fungi Forest: Rear Part of Mill": 62,
        "Fungi Forest: Mushroom Puzzle": 63,
        "Fungi Forest: Giant Mushroom": 64,
        "Fungi Forest: Mushroom Leap": 70,
        "Fungi Forest: Shooting Game": 71,
        "Fungi Forest: Dogadon": 83,
        "Fungi Forest: Barrel Blast": 188,
    },
    "Caves": {
        "Crystal Caves": 72,
        "Crystal Caves: Beetle Race": 82,
        "Crystal Caves: Igloo (Tiny)": 84,
        "Crystal Caves: Igloo (Lanky)": 85,
        "Crystal Caves: Igloo (DK)": 86,
        "Crystal Caves: Rotating Room": 89,
        "Crystal Caves: Shack (Chunky)": 90,
        "Crystal Caves: Shack (DK)": 91,
        "Crystal Caves: Shack (Diddy, middle part)": 92,
        "Crystal Caves: Shack (Tiny)": 93,
        "Crystal Caves: Lanky's Hut": 94,
        "Crystal Caves: Igloo (Chunky)": 95,
        "Crystal Caves: Ice Castle": 98,
        "Crystal Caves: Igloo (Diddy)": 100,
        "Crystal Caves: Barrel Blast": 186,
        "Crystal Caves: Army Dillo": 196,
        "Crystal Caves: Shack (Diddy, upper part)": 200,
    },
    "Castle": {
        "Creepy Castle": 87,
        "Creepy Castle: Ballroom": 88,
        "Creepy Castle: Tower": 105,
        "Creepy Castle: Minecart": 106,
        "Creepy Castle: Crypt (Lanky, Tiny)": 108,
        "Creepy Castle: Crypt (DK, Diddy, Chunky)": 112,
        "Creepy Castle: Museum": 113,
        "Creepy Castle: Library": 114,
        "Creepy Castle: Dungeon": 151,
        "Creepy Castle: Chunky's Toolshed": 166,
        "Creepy Castle: Trash Can": 167,
        "Creepy Castle: Greenhouse": 168,
        "Creepy Castle: Basement": 163,
        "Creepy Castle: Tree": 164,
        "Creepy Castle: Crypt": 183,
        "Creepy Castle: Car Race": 185,
        "Creepy Castle: Barrel Blast": 187,
        "Creepy Castle: King Kut Out": 199,
    },
    "Helm & K Rool": {
        "Hideout Helm": 17,
        "Hideout Helm (Level Intros, Game Over)": 28,
        "K. Rool Fight: DK Phase": 203,
        "K. Rool Fight: Diddy Phase": 204,
        "K. Rool Fight: Lanky Phase": 205,
        "K. Rool Fight: Tiny Phase": 206,
        "K. Rool Fight: Chunky Phase": 207,
        "K. Lumsy Ending": 213,
        "K. Rool's Shoe": 214,
        "K. Rool's Arena": 215,
        "Hideout Helm (Intro Story)": 152,
    },
    "Isles": {
        "DK Isles Overworld": 34,
        "K. Lumsy": 97,
        "Jungle Japes Lobby": 169,
        "Angry Aztec Lobby": 173,
        "Frantic Factory Lobby": 175,
        "Gloomy Galleon Lobby": 174,
        "Fungi Forest Lobby": 178,
        "Crystal Caves Lobby": 194,
        "Creepy Castle Lobby": 193,
        "Hideout Helm Lobby": 170,
        "DK's House": 171,
        "Training Grounds": 176,
        "Training Grounds (End Sequence)": 198,
        "DK Isles (DK Theatre)": 153,
        "Rock (Intro Story)": 172,
        "Fairy Island": 189,
        "DK Isles: Snide's Room": 195,
    },
    "Minigames": {
        "K. Rool Barrel: Lanky's Maze": 3,
        "Kremling Kosh! (very easy)": 10,
        "Stealthy Snoop! (normal, no logo)": 11,
        "Teetering Turtle Trouble! (very easy)": 18,
        "Batty Barrel Bandit! (easy)": 32,
        "K. Rool Barrel: DK's Target Game": 35,
        "K. Rool Barrel: Tiny's Mushroom Game": 50,
        "Stealthy Snoop! (normal)": 65,
        "Mad Maze Maul! (hard)": 66,
        "Stash Snatch! (normal)": 67,
        "Mad Maze Maul! (easy)": 68,
        "Mad Maze Maul! (normal)": 69,
        "Stash Snatch! (easy)": 74,
        "Stash Snatch! (hard)": 75,
        "Minecart Mayhem! (easy)": 77,
        "Busy Barrel Barrage! (easy)": 78,
        "Busy Barrel Barrage! (normal)": 79,
        "Splish-Splash Salvage! (normal)": 96,
        "Speedy Swing Sortie! (easy)": 99,
        "Krazy Kong Klamour! (easy)": 101,
        "Big Bug Bash! (very easy)": 102,
        "Searchlight Seek! (very easy)": 103,
        "Beaver Bother! (easy)": 104,
        "Kremling Kosh! (easy)": 115,
        "Kremling Kosh! (normal)": 116,
        "Kremling Kosh! (hard)": 117,
        "Teetering Turtle Trouble! (easy)": 118,
        "Teetering Turtle Trouble! (normal)": 119,
        "Teetering Turtle Trouble! (hard)": 120,
        "Batty Barrel Bandit! (easy)": 121,
        "Batty Barrel Bandit! (normal)": 122,
        "Batty Barrel Bandit! (hard)": 123,
        "Mad Maze Maul! (insane)": 124,
        "Stash Snatch! (insane)": 125,
        "Stealthy Snoop! (very easy)": 126,
        "Stealthy Snoop! (easy)": 127,
        "Stealthy Snoop! (hard)": 128,
        "Minecart Mayhem! (normal)": 129,
        "Minecart Mayhem! (hard)": 130,
        "Busy Barrel Barrage! (hard)": 131,
        "Splish-Splash Salvage! (hard)": 132,
        "Splish-Splash Salvage! (easy)": 133,
        "Speedy Swing Sortie! (normal)": 134,
        "Speedy Swing Sortie! (hard)": 135,
        "Beaver Bother! (normal)": 136,
        "Beaver Bother! (hard)": 137,
        "Searchlight Seek! (easy)": 138,
        "Searchlight Seek! (normal)": 139,
        "Searchlight Seek! (hard)": 140,
        "Krazy Kong Klamour! (normal)": 141,
        "Krazy Kong Klamour! (hard)": 142,
        "Krazy Kong Klamour! (insane)": 143,
        "Peril Path Panic! (very easy)": 144,
        "Peril Path Panic! (easy)": 145,
        "Peril Path Panic! (normal)": 146,
        "Peril Path Panic! (hard)": 147,
        "Big Bug Bash! (easy)": 148,
        "Big Bug Bash! (normal)": 149,
        "Big Bug Bash! (hard)": 150,
        "K. Rool Barrel: Diddy's Rocketbarrel Game": 201,
        "K. Rool Barrel: Lanky's Shooting Game": 202,
        "K. Rool Barrel: Chunky's Hidden Kremling Game": 209,
        "K. Rool Barrel: Tiny's Pony Tail Twirl Game": 210,
        "K. Rool Barrel: Chunky's Shooting Game": 211,
        "K. Rool Barrel: DK's Rambi Game": 212,
        "K. Rool Barrel: Diddy's Kremling Game": 165,
        "Dive Barrel": 177,
        "Orange Barrel": 180,
        "Barrel Barrel": 181,
        "Vine Barrel": 182,
        "Enguarde Arena": 184,
        "Rambi Arena": 191,
    },
    "Battle Arenas": {
        "Battle Arena: Beaver Brawl!": 53,
        "Battle Arena: Kritter Karnage!": 73,
        "Battle Arena: Arena Ambush!": 155,
        "Battle Arena: More Kritter Karnage!": 156,
        "Battle Arena: Forest Fracas!": 157,
        "Battle Arena: Bish Bash Brawl!": 158,
        "Battle Arena: Kamikaze Kremlings!": 159,
        "Battle Arena: Plinth Panic!": 160,
        "Battle Arena: Pinnacle Palaver!": 161,
        "Battle Arena: Shockwave Showdown!": 162,
    },
    "Misc": {
        "Test Map": 0,
        "Funky's Store": 1,
        "DK Arcade": 2,
        "Cranky's Lab": 5,
        "Jetpac": 9,
        "Snide's H.Q.": 15,
        "Candy's Music Shop": 25,
        "Nintendo Logo": 40,
        "Troff 'n' Scoff": 42,
        "DK Rap": 76,
        "Main Menu": 80,
        "Title Screen (Not For Resale Version)": 81,
        "Kong Battle: Arena 1": 109,
        "Kong Battle: Battle Arena": 107,
        "Kong Battle: Arena 2": 190,
        "Kong Battle: Arena 3": 192,
        "Bloopers Ending": 208,
    },
}

const geometries = {
    "Off": { internal: "off", hide_from: ["bg_selector"] },
    "Level Geometry (Vertex Colors)": { internal: "geo", hide_from: [] },
    "Collision": { internal: "collision", hide_from: [] },
    "Collision (Walls)": { internal: "walls", hide_from: [] },
    "Collision (Floor Properties)": { internal: "floors", hide_from: ["obj_selector"] },
    "Collision (Slippable Floors)": { internal: "slip", hide_from: [] },
    "Collision (Floor Special)": { internal: "enum_floors", hide_from: ["obj_selector"] },
    "Collision (Gaps) (WARNING: Expensive)": { internal: "gaps", hide_from: ["obj_selector"] },
}

const markers = {
    "trigger": { name: "Triggers", show: true },
    "lock": { name: "Cam Lock Zones", show: true },
    "path": { name: "Object Paths", show: true },
    "autowalk": { name: "Autowalk Paths", show: true },
    "exit": { name: "Exits", show: true },
    "e_fence": { name: "Enemy Fences", show: true },
    "e_path": { name: "Enemy Paths (WIP)", show: true },
    "cam_path": { name: "Camera Paths", show: true },
};

document.getElementById("extra_marker_dropdown").innerHTML = Object.keys(markers).map(internal => {
    const marker_name = markers[internal].name;
    const show = markers[internal].show;
    const class_additions = show ? "click-reload marker" : "";
    return `<li>
        <div class="form-check ${show ? '' : 'd-none'}">
            <input class="form-check-input ${class_additions}" type="checkbox" value="${marker_name}" id="${internal}_selector">
            <label class="form-check-label" for="${internal}_selector">${marker_name}</label>
        </div>
    </li>`;
}).join("") + `
    <li><hr class="dropdown-divider"></li>
    <li class="d-flex justify-content-between mt-2">
        <button class="btn btn-sm btn-outline-success mx-2 rounded-pill flex-grow-1" id="markers_all">All</button>
        <button class="btn btn-sm btn-outline-danger mx-2 rounded-pill flex-grow-1" id="markers_none">None</button>
    </li>
`;

const dropdownButton = document.getElementById('multiSelectDropdown');
const checkboxes = document.querySelectorAll('.dropdown-menu .form-check-input');

function updateDDText() {
    const selected = Array.from(checkboxes).filter(i => i.checked).map(i => i.value);
    let text = "Select Options";
    if (selected.length == 1) {
        text = selected;
    } else if (selected.length > 1) {
        text = `${selected.length} selected`;
    }
    dropdownButton.textContent = text;
}

checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updateDDText);
});

function setMarkersStatus(status) {
    const marker_els = document.getElementsByClassName("marker");
    for (let m = 0; m < marker_els.length; m++) {
        marker_els[m].checked = status;
    }
    updateDDText();
    reloadState(null);
}

document.getElementById("markers_all").addEventListener("click", (e) => {
    setMarkersStatus(true);
});
document.getElementById("markers_none").addEventListener("click", (e) => {
    setMarkersStatus(false);
});
document.getElementById("ortho_camera").addEventListener("click", () => {window.toggleCamera()});

document.getElementById("map_id_selector").innerHTML = Object.keys(map_ids).map(group => {
    return `<optgroup label="${group}">${Object.keys(map_ids[group]).sort().map(map_name => {
        return `<option value="${map_ids[group][map_name]}">${map_name}</option>`
    }).join("")}</optgroup>`
}).join("");
["bg_selector", "obj_selector"].forEach(id => {
    document.getElementById(id).innerHTML = Object.keys(geometries).filter(n => !geometries[n].hide_from.includes(id)).map(name => {
        return `<option value="${geometries[name].internal}">${name}</option>`
    }).join("");
})

function reloadState(el) {
    let force_camera = false;
    let double_reload = false;
    if (el) {
        force_camera = el.classList.contains("force-camera");
        double_reload = el.classList.contains("double-reload");
    }
    window.renderHandler(force_camera);
    if (double_reload) {
        window.renderHandler(false);
    }
}

// Dropdowns
const changeEls = document.getElementsByClassName("change-reload");
for (let c = 0; c < changeEls.length; c++) {
    changeEls[c].addEventListener("change", (e) => {
        reloadState(e.target);
    });
}

// Toggles
const clickEls = document.getElementsByClassName("click-reload");
for (let c = 0; c < clickEls.length; c++) {
    clickEls[c].addEventListener("click", (e) => {
        reloadState(e.target);
    });
}

// File Upload
document.getElementById("fileUploadButton").addEventListener("click", () => {
    document.getElementById("fileInput").click();
})

function fmtFloat(v) {
    return parseInt(v * 10) / 10;
}

function populateExtraData(mesh) {
    const extraData = mesh.extra;
    if (!extraData) {
        return;
    }
    const coord_names = ["X", "Y", "Z"];
    document.getElementById("extra_data").classList.remove("d-none");
    document.getElementById("extra_data_name").innerText = extraData.name;
    const coord_section = extraData.shape != "path" ? `
        ${extraData.coords.map((c, i) => {
            return `<div><span class='fw-bold'>${coord_names[i]}: </span>${fmtFloat(c)}</div>`
        }).join("")}
    ` : `
        <div class='fw-bold'>
            Path Segments
        </div>
        <div class='ps-2'>
            ${extraData.path.map((p, i) => {
                return `<div>${fmtFloat(p[0])}, ${fmtFloat(p[1])}, ${fmtFloat(p[2])}</div>`;
            }).join("")}
        </div>
    `;
    let dimensions_section = "";
    if (["cylinder", "sphere"].includes(extraData.shape)) {
        let radius = extraData.infinite_h ? "Infinite" : extraData.radius;
        dimensions_section += `
        <div><span class='fw-bold'>Radius: </span>${radius}</div>
        `;
        if (extraData.shape == "cylinder")  {
            let height = extraData.infinite_y ? "Infinite" : extraData.height;
            dimensions_section += `
                <div><span class='fw-bold'>Height: </span>${height}</div>
            `;
        }
    }
    document.getElementById("extra_data_info").innerHTML = `
        <div>
            ${coord_section}
            ${dimensions_section}
        </div>
    `;
    console.log(extraData);
}
document.getElementById("extra_data_close").addEventListener("click", () => {
    document.getElementById("extra_data").classList.add("d-none");
});

document.getElementById("toggle_visibility").addEventListener("click", () => {
    const btn = document.getElementById("toggle_visibility");
    btn.classList.toggle("minimized");
    const minimized = btn.classList.contains("minimized");
    if (minimized) {
        btn.innerHTML = "<i class='fa-solid fa-maximize'></i>";
    } else {
        btn.innerHTML = "<i class='fa-solid fa-minimize'></i>";
    }
    document.getElementById("controls_content").classList.toggle("d-none");
})

window.populateExtraData = populateExtraData;
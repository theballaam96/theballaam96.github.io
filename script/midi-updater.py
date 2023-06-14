import json
import string
from datetime import date

MIDI_JSON = "../data/midi.json"
GAME_JSON = "../data/midi-games.json"
ALLOWED_SHORT_CHARACTERS = list(string.ascii_lowercase) + list(string.ascii_uppercase) + [str(x) for x in range(10)] + ["_"]

game_data = None
data = None
with open(MIDI_JSON, "r") as fh:
    with open(GAME_JSON, "r") as fg:
        data = json.loads(fh.read())
        game_data = json.loads(fg.read())
game_list = [game_data[x]["name"] for x in game_data.keys()]
game_list.sort()
file_name = input("Input File Name: ")
if ".bin" not in file_name:
    file_name = file_name.split(".")[0] + ".bin"
print("Group types:")
group_types = ["bgm","events","majoritems","minoritems"]
for xi, x in enumerate(group_types):
    print(f" {xi} - {x}")
group_index = input(f"Enter index of group (0-{len(group_types)-1}): ")
group_index = int(group_index)
selected_group = None
if group_index >= 0 and group_index < len(group_types):
    selected_group = group_types[group_index]
print("Games:")
for xi, x in enumerate(game_list):
    print(f" {xi} - {x}")
game_index = input(f"Enter index of game (0-{len(game_list)-1}) or new game name: ")
game_short = None
if game_index.isnumeric():
    game_index = int(game_index)
    if game_index >= 0 and game_index < len(game_list):
        game_short = [x for x in game_data.keys() if game_data[x]["name"] == game_list[game_index]][0]
else:
    # Is new game
    game_short = game_index.replace(" ","_").replace("-","_")
    game_short = "".join([x for x in [*game_short] if x in ALLOWED_SHORT_CHARACTERS]).lower()
    game_data[game_short] = {
        "name": game_index,
    }
    with open(GAME_JSON, "w") as fh:
        fh.write(json.dumps(game_data, indent=4))
composers = input("Composer(s): ")
converters = input("Converter(s): ")
audio_link = input("Audio Link (Enter '0' if none): ")
new_midi = {
    "folder": selected_group,
    "game": game_short,
    "composer": composers,
    "converter": converters,
}
if audio_link != "0":
    new_midi["audio"] = audio_link
new_midi["publish_date"] = date.today().strftime("%d-%m-%Y")
data[file_name] = new_midi
with open(MIDI_JSON, "w") as fh:
    fh.write(json.dumps(data, indent=4))
    
    # print(data)
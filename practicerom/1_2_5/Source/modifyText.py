import subprocess
import os
import shutil

MainMenuText = "MainMenu_1118420.bin"
DolbyText = "Dolby_1115766.bin"
WrinklyText = "Wrinkly_1118BA4.bin"
KLumsyText = "KLumsy_11172E8.bin"

if os.path.exists(MainMenuText):
  os.remove(MainMenuText)

if os.path.exists(DolbyText):
  os.remove(DolbyText)

if os.path.exists(WrinklyText):
  os.remove(WrinklyText)

if os.path.exists(KLumsyText):
  os.remove(KLumsyText)

shutil.copyfile("1118420_ZLib.bin", MainMenuText);
shutil.copyfile("1115766_ZLib.bin", DolbyText);
shutil.copyfile("1118BA4_ZLib.bin", WrinklyText);
shutil.copyfile("11172E8_ZLib.bin", KLumsyText);

os.chdir("Changes")
os.chdir("Main Menu")

with open("adventure.bin", "rb") as fh:
  patch_adventure = fh.read(9);
  
with open("sound.bin", "rb") as fh:
  patch_sound = fh.read(5);

with open("kong_battle.bin", "rb") as fh:
  patch_kongbattle = fh.read(11);

with open("mystery.bin", "rb") as fh:
  patch_mystery = fh.read(7);

with open("options.bin", "rb") as fh:
  patch_options = fh.read(7);

with open ("survival.bin", "rb") as fh:
  patch_survival = fh.read(8);

with open("coin_hoard.bin", "rb") as fh:
  patch_coinhoard = fh.read(10);

with open("capture.bin", "rb") as fh:
  patch_capture = fh.read(7);

with open("capture_pad.bin", "rb") as fh:
  patch_capturepad = fh.read(11);

os.chdir("..")
os.chdir("Dolby")

with open("top_line.bin", "rb") as fh:
  patch_dolbytop = fh.read(33);

with open("bottom_line.bin", "rb") as fh:
  patch_dolbybottom = fh.read(33);

os.chdir("..")
os.chdir("K Lumsy")

with open("first_textbox.bin", "rb") as fh:
  patch_klumsyfirst = fh.read(339)

with open("final_textbox.bin", "rb") as fh:
  patch_klumsyfinal = fh.read(281)

os.chdir("..")
os.chdir("Wrinkly")

with open("FTT.bin", "rb") as fh:
  patch_wrinkly_ftt = fh.read(0x17A)

os.chdir("Japes")
with open("DKJapes.bin", "rb") as fh:
  patch_wrinkly_japes_dk = fh.read(0x52)
with open("DiddyJapes.bin", "rb") as fh:
  patch_wrinkly_japes_diddy = fh.read(0x5A)
with open("LankyJapes.bin", "rb") as fh:
  patch_wrinkly_japes_lanky = fh.read(0x5F)
with open("TinyJapes.bin", "rb") as fh:
  patch_wrinkly_japes_tiny = fh.read(0x4F)
with open("ChunkyJapes.bin", "rb") as fh:
  patch_wrinkly_japes_chunky = fh.read(0x45)
os.chdir("..")

os.chdir("Aztec")
with open("DKAztec.bin", "rb") as fh:
  patch_wrinkly_aztec_dk = fh.read(0x3A)
with open("DiddyAztec.bin", "rb") as fh:
  patch_wrinkly_aztec_diddy = fh.read(0x45)
with open("LankyAztec.bin", "rb") as fh:
  patch_wrinkly_aztec_lanky = fh.read(0x3E)
with open("TinyAztec.bin", "rb") as fh:
  patch_wrinkly_aztec_tiny = fh.read(0x43)
with open("ChunkyAztec.bin", "rb") as fh:
  patch_wrinkly_aztec_chunky = fh.read(0x4D)
os.chdir("..")

os.chdir("Factory")
with open("DKFactory.bin", "rb") as fh:
  patch_wrinkly_factory_dk = fh.read(0x4F)
with open("DiddyFactory.bin", "rb") as fh:
  patch_wrinkly_factory_diddy = fh.read(0x4D)
with open("LankyFactory.bin", "rb") as fh:
  patch_wrinkly_factory_lanky = fh.read(0x41)
with open("TinyFactory.bin", "rb") as fh:
  patch_wrinkly_factory_tiny = fh.read(0x30)
with open("ChunkyFactory.bin", "rb") as fh:
  patch_wrinkly_factory_chunky = fh.read(0x3E)
os.chdir("..")

os.chdir("Galleon")
with open("DKGalleon.bin", "rb") as fh:
  patch_wrinkly_galleon_dk = fh.read(0x47)
with open("DiddyGalleon.bin", "rb") as fh:
  patch_wrinkly_galleon_diddy = fh.read(0x44)
with open("LankyGalleon.bin", "rb") as fh:
  patch_wrinkly_galleon_lanky = fh.read(0x41)
with open("TinyGalleon.bin", "rb") as fh:
  patch_wrinkly_galleon_tiny = fh.read(0x4C)
with open("ChunkyGalleon.bin", "rb") as fh:
  patch_wrinkly_galleon_chunky = fh.read(0x40)
os.chdir("..")

os.chdir("Fungi")
with open("DKFungi.bin", "rb") as fh:
  patch_wrinkly_fungi_dk = fh.read(0x2C)
with open("DiddyFungi.bin", "rb") as fh:
  patch_wrinkly_fungi_diddy = fh.read(0x40)
with open("LankyFungi.bin", "rb") as fh:
  patch_wrinkly_fungi_lanky = fh.read(0x5E)
with open("TinyFungi.bin", "rb") as fh:
  patch_wrinkly_fungi_tiny = fh.read(0x3A)
with open("ChunkyFungi.bin", "rb") as fh:
  patch_wrinkly_fungi_chunky = fh.read(0x39)
os.chdir("..")

os.chdir("Caves")
with open("DKCaves.bin", "rb") as fh:
  patch_wrinkly_caves_dk = fh.read(0x33)
with open("DiddyCaves.bin", "rb") as fh:
  patch_wrinkly_caves_diddy = fh.read(0x40)
with open("LankyCaves.bin", "rb") as fh:
  patch_wrinkly_caves_lanky = fh.read(0x49)
with open("TinyCaves.bin", "rb") as fh:
  patch_wrinkly_caves_tiny = fh.read(0x4C)
with open("ChunkyCaves.bin", "rb") as fh:
  patch_wrinkly_caves_chunky = fh.read(0x34)
os.chdir("..")

os.chdir("Castle")
with open("DKCastle.bin", "rb") as fh:
  patch_wrinkly_castle_dk = fh.read(0x5D)
with open("DiddyCastle.bin", "rb") as fh:
  patch_wrinkly_castle_diddy = fh.read(0x39)
with open("LankyCastle.bin", "rb") as fh:
  patch_wrinkly_castle_lanky = fh.read(0x44)
with open("TinyCastle.bin", "rb") as fh:
  patch_wrinkly_castle_tiny = fh.read(0x3E)
with open("ChunkyCastle.bin", "rb") as fh:
  patch_wrinkly_castle_chunky = fh.read(0x2A)
os.chdir("..")

os.chdir("..")
os.chdir("..")
with open(MainMenuText, "r+b") as fh:
  fh.seek(0x5FD);
  fh.write(patch_adventure);
  fh.seek(0x606);
  fh.write(patch_sound);
  fh.seek(0x60B);
  fh.write(patch_kongbattle);
  fh.seek(0x616);
  fh.write(patch_mystery);
  fh.seek(0x61D);
  fh.write(patch_options);
  fh.seek(0x674);
  fh.write(patch_survival);
  fh.seek(0x67C);
  fh.write(patch_coinhoard);
  fh.seek(0x68E);
  fh.write(patch_capture);
  fh.seek(0x695);
  fh.write(patch_capturepad);
  print("Finished writing Main Menu text");

with open(DolbyText, "r+b") as fh:
  fh.seek(0x3C);
  fh.write(patch_dolbytop)
  fh.seek(0x5D);
  fh.write(patch_dolbybottom)
  print("Finished writing Dolby Trademark Text");

with open(KLumsyText, "r+b") as fh:
  fh.seek(0x67)
  fh.write(patch_klumsyfirst)
  fh.seek(0x245)
  fh.write(patch_klumsyfinal)
  print("Finished writing K. Lumsy Text");

with open(WrinklyText, "r+b") as fh:
  fh.seek(0x23F)
  fh.write(patch_wrinkly_ftt)
  fh.seek(0x3B9)
  fh.write(patch_wrinkly_japes_dk)
  fh.seek(0x40C)
  fh.write(patch_wrinkly_japes_diddy)
  fh.seek(0x464)
  fh.write(patch_wrinkly_japes_lanky)
  fh.seek(0x4C3)
  fh.write(patch_wrinkly_japes_tiny)
  fh.seek(0x512)
  fh.write(patch_wrinkly_japes_chunky)
  fh.seek(0x557)
  fh.write(patch_wrinkly_aztec_dk)
  fh.seek(0x592)
  fh.write(patch_wrinkly_aztec_diddy)
  fh.seek(0x5D6)
  fh.write(patch_wrinkly_aztec_lanky)
  fh.seek(0x614)
  fh.write(patch_wrinkly_aztec_tiny)
  fh.seek(0x657)
  fh.write(patch_wrinkly_aztec_chunky)
  fh.seek(0x6A4)
  fh.write(patch_wrinkly_factory_dk)
  fh.seek(0x6F3)
  fh.write(patch_wrinkly_factory_diddy)
  fh.seek(0x740)
  fh.write(patch_wrinkly_factory_lanky)
  fh.seek(0x781)
  fh.write(patch_wrinkly_factory_tiny)
  fh.seek(0x7B1)
  fh.write(patch_wrinkly_factory_chunky)
  fh.seek(0x7EF)
  fh.write(patch_wrinkly_galleon_dk)
  fh.seek(0x836)
  fh.write(patch_wrinkly_galleon_diddy)
  fh.seek(0x87A)
  fh.write(patch_wrinkly_galleon_lanky)
  fh.seek(0x8BB)
  fh.write(patch_wrinkly_galleon_tiny)
  fh.seek(0x907)
  fh.write(patch_wrinkly_galleon_chunky)
  fh.seek(0x947)
  fh.write(patch_wrinkly_fungi_dk)
  fh.seek(0x973)
  fh.write(patch_wrinkly_fungi_diddy)
  fh.seek(0x9B3)
  fh.write(patch_wrinkly_fungi_lanky)
  fh.seek(0xA11)
  fh.write(patch_wrinkly_fungi_tiny)
  fh.seek(0xA4B)
  fh.write(patch_wrinkly_fungi_chunky)
  fh.seek(0xA84)
  fh.write(patch_wrinkly_caves_dk)
  fh.seek(0xAB7)
  fh.write(patch_wrinkly_caves_diddy)
  fh.seek(0xAF7)
  fh.write(patch_wrinkly_caves_lanky)
  fh.seek(0xB40)
  fh.write(patch_wrinkly_caves_tiny)
  fh.seek(0xB8C)
  fh.write(patch_wrinkly_caves_chunky)
  fh.seek(0xBC0)
  fh.write(patch_wrinkly_castle_dk)
  fh.seek(0xC1D)
  fh.write(patch_wrinkly_castle_diddy)
  fh.seek(0xC56)
  fh.write(patch_wrinkly_castle_lanky)
  fh.seek(0xC9A)
  fh.write(patch_wrinkly_castle_tiny)
  fh.seek(0xCD8)
  fh.write(patch_wrinkly_castle_chunky)
  print("Finished writing Wrinkly Text");
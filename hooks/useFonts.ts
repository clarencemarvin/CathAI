import { useFonts as useExpoFonts } from "expo-font";
import { FontFamilies } from "@/helpers/FontFamiles";
export function useFonts() {
  return useExpoFonts({
    [FontFamilies.GTWalsheimRegular]: require("../assets/fonts/GT-Walsheim-Regular-Trial-BF651b7fc71a47d.otf"),
    [FontFamilies.GTWalsheimBlack]: require("../assets/fonts/GT-Walsheim-Black-Trial-BF651b7fc736a5b.otf"),
    [FontFamilies.GTWalsheimBold]: require("../assets/fonts/GT-Walsheim-Bold-Trial-BF651b7fc737c57.otf"),
    [FontFamilies.GTWalsheimLight]: require("../assets/fonts/GT-Walsheim-Light-Trial-BF651b7fc714941.otf"),
    [FontFamilies.GTWalsheimMedium]: require("../assets/fonts/GT-Walsheim-Medium-Trial-BF651b7fc728fb3.otf"),
    [FontFamilies.GTWalsheimThin]: require("../assets/fonts/GT-Walsheim-Thin-Trial-BF651b7fc728c4c.otf"),
    [FontFamilies.GTWalsheimUltraBold]: require("../assets/fonts/GT-Walsheim-Ultra-Bold-Trial-BF651b7fc6c21e5.otf"),
    [FontFamilies.GTWalsheimUltraLight]: require("../assets/fonts/GT-Walsheim-Ultra-Light-Trial-BF651b7fc72b236.otf"),
  });
}
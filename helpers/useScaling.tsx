import { Dimensions, PixelRatio } from "react-native";

const IPHONE_14PROMAX_HEIGHT = 932; // app looks most proportional in iphone 14/15 pro max
const scale = Dimensions.get("window").height / IPHONE_14PROMAX_HEIGHT;

export function normalize(size: number) {
  const newSize = size * scale;
  return Math.round(PixelRatio.roundToNearestPixel(newSize));
}

export function normalizeLineHeight({
  size,
  currentLocale,
}: {
  size: number;
  currentLocale: string;
}) {
  let newSize = size;

  if (currentLocale === "zh-Hant-HK") {
    newSize = Math.round(PixelRatio.roundToNearestPixel(newSize * 1.33));
  }

  return newSize;
}

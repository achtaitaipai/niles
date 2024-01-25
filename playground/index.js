import { modernFontStack, start } from "../dist/index.js";

start({
  fontCssPrefix: "font",
  fontsKeys: ["base", "display"],
  fontsValues: [modernFontStack.geohumanist, modernFontStack.systemui],
  fontsOptions: {
    default: "default",
    ...modernFontStack,
  },

  colorCssPrefix: "clr",
  colorsKeys: ["surface", "text", "primary"],
  colorsValues: ["#ffffff", "#000000", "#ee00fb"],
});

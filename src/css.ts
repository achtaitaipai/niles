import { copyToClipBoard } from "./utils.js";

export const updateCssProperties = (
  dictionary: Record<string, string>,
  element?: HTMLElement
) => {
  const root = element ?? document.documentElement;
  for (const propertie in dictionary) {
    if (Object.hasOwnProperty.call(dictionary, propertie)) {
      const value = dictionary[propertie];
      if (value) root.style.setProperty(propertie, value);
    }
  }
};

export const copyCss = (dictionary: Record<string, string>) => {
  let css = "";
  for (const key in dictionary) {
    if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
      const value = dictionary[key];
      if (value) css += `\t${key}: ${value};\n`;
    }
  }
  copyToClipBoard(css);
};

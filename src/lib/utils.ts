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

export const getCss = (dictionary: Record<string, string>) => {
  let css = "";
  for (const key in dictionary) {
    if (Object.prototype.hasOwnProperty.call(dictionary, key)) {
      const value = dictionary[key];
      if (value) css += `\t${key}: ${value};\n`;
    }
  }
  return css;
};

export const getCssVariableName = (...chunks: string[]) => {
  let name = "-";
  for (let index = 0; index < chunks.length; index++) {
    const element = chunks[index];
    if (element !== "") name += "-" + element;
  }
  return name;
};

export const copyToClipBoard = async (text: string) => {
  try {
    await navigator.clipboard.writeText(text);
    console.log("Content copied to clipboard");
  } catch (err) {
    console.error("Failed to copy: ", err);
  }
};

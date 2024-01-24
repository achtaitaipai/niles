import { TabPageApi } from "tweakpane";
import { Params } from "../../params.js";

export const addFontsControls = (
  page: TabPageApi | undefined,
  params: Params
) => {
  if (!page || params.fontsKeys.length === 0 || params.fontsValues.length === 0)
    return;
  for (let index = 0; index < params.fontsKeys.length; index++) {
    const key = params.fontsKeys[index];
    page.addBinding(params.fontsValues, index, {
      label: key,
      options: params.fontsOptions,
    });
  }
};

export const getFontsVariables = (params: Params) => {
  const fonts: Record<string, string> = {};
  for (let index = 0; index < params.fontsKeys.length; index++) {
    const key = params.fontsKeys[index];
    const value = params.fontsValues[index];
    if (key && value) fonts[`--${params.fontCssPrefix}-${key}`] = value;
  }
  return fonts;
};

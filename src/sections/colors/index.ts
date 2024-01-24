import { TabPageApi } from "tweakpane";
import { Params } from "../../params.js";
import { getCssVariableName } from "../../css.js";

export const addColorsControls = (
  page: TabPageApi | undefined,
  params: Params
) => {
  if (
    !page ||
    params.colorsKeys.length === 0 ||
    params.colorsValues.length === 0
  )
    return;
  for (let index = 0; index < params.colorsKeys.length; index++) {
    const key = params.colorsKeys[index];
    const value = params.colorsValues[index];
    if (key && value)
      page.addBinding(params.colorsValues, index, {
        label: key,
      });
  }
};

export const getColorsVariables = (params: Params) => {
  const colors: Record<string, string> = {};
  for (let index = 0; index < params.colorsKeys.length; index++) {
    const key = params.colorsKeys[index];
    const value = params.colorsValues[index];
    if (key && value)
      colors[getCssVariableName(params.colorCssPrefix, key)] = value;
  }
  return colors;
};

import { Params } from "../../params.js";
import { buildSpaces, buildTypeSizes } from "./helpers.js";
export const getUtopiaVariables = (params: Params) => {
  const types = buildTypeSizes(
    params.minWidth,
    params.maxWidth,
    params.minFontSize,
    params.maxFontSize,
    params.minTypeScale,
    params.maxTypeScale,
    params.negativeTypeSteps,
    params.positiveTypeSteps,
    params.typeCssPrefix
  );
  const spaces = buildSpaces(
    params.minWidth,
    params.maxWidth,
    params.minFontSize,
    params.maxFontSize,
    params.negativeSpaceSteps,
    params.positiveSpaceSteps,
    params.spaceCssPrefix
  );
  return { ...types, ...spaces };
};

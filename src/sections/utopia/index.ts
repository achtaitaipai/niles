import { Section } from "../";
import { addParamsToUrl, parseUrl } from "../../lib/searchQuery.js";
import { addUtopiaControls } from "./controls.js";
import { getUtopiaVariables } from "./getVariables.js";
import { z } from "zod";

export type UtopiaParams = {
  /**Minimum viewport width in px */
  minWidth: number;
  /**Maximum viewport width in px */
  maxWidth: number;
  /**Base font size for minimum viewport in px */
  minFontSize: number;
  /**Base font size for maximum viewport in px */
  maxFontSize: number;
  /**Scale between fontsizes for minimum viewport */
  minTypeScale: number;
  /**Scale between fontsizes for maximum viewport */
  maxTypeScale: number;
  /**Number of negatives types steps  */
  negativeTypeSteps: number;
  /**Number of positives types steps  */
  positiveTypeSteps: number;
  /**Multipliers < 0 for spaces */
  negativeSpaceSteps: number[];
  /**Multipliers >= 0 for spaces */
  positiveSpaceSteps: number[];
  /** Css prefix for types variables */
  typeCssPrefix: string;
  /** Css prefix for spaces variables */
  spaceCssPrefix: string;
};

const defaultUtopiaParams = {
  minWidth: 320,
  maxWidth: 1240,
  minFontSize: 18,
  maxFontSize: 20,
  minTypeScale: 1.2,
  maxTypeScale: 1.25,
  negativeTypeSteps: 2,
  positiveTypeSteps: 5,
  negativeSpaceSteps: [0.75, 0.5, 0.25],
  positiveSpaceSteps: [1, 1.5, 2, 3, 4, 6],
  typeCssPrefix: "step",
  spaceCssPrefix: "space",
};

const utopiaUrlSchema = z.object({
  m: z.array(z.coerce.number()).optional(),
  t: z
    .tuple([
      z.coerce.number(), //maxWidth
      z.coerce.number(), //maxFontsize
      z.coerce.number(), //maxTypyeScale
      z.coerce.number(), //minWidth
      z.coerce.number(), //minFontsize
      z.coerce.number(), //minTypyeScale
    ])
    .optional(),
});

type UrlUtopia = z.infer<typeof utopiaUrlSchema>;

export const utopiaSection: Section<UtopiaParams> = {
  title: "Utopia",
  gerUrlParams: (query, options) => {
    const urlParams = parseUrl(query, utopiaUrlSchema);
    const spacesMultipliers = urlParams.m;
    let negativeSpaceSteps =
      options.negativeSpaceSteps ?? defaultUtopiaParams.negativeSpaceSteps;
    let positiveSpaceSteps =
      options.positiveSpaceSteps ?? defaultUtopiaParams.positiveSpaceSteps;

    if (spacesMultipliers) {
      negativeSpaceSteps = negativeSpaceSteps.map(
        (el, i) => spacesMultipliers[i] ?? el
      );
      positiveSpaceSteps = positiveSpaceSteps.map(
        (el, i) => spacesMultipliers[i + negativeSpaceSteps.length] ?? el
      );
    }

    const typeParams = urlParams.t;
    let maxWidth = options.maxWidth ?? defaultUtopiaParams.maxWidth;
    let maxFontSize = options.maxFontSize ?? defaultUtopiaParams.maxFontSize;
    let maxTypeScale = options.maxTypeScale ?? defaultUtopiaParams.maxTypeScale;
    let minWidth = options.minWidth ?? defaultUtopiaParams.minWidth;
    let minFontSize = options.minFontSize ?? defaultUtopiaParams.minFontSize;
    let minTypeScale = options.minTypeScale ?? defaultUtopiaParams.minTypeScale;
    if (typeParams)
      [
        maxWidth,
        maxFontSize,
        maxTypeScale,
        minWidth,
        minFontSize,
        minTypeScale,
      ] = typeParams;

    return {
      negativeSpaceSteps,
      positiveSpaceSteps,
      maxWidth,
      maxFontSize,
      maxTypeScale,
      minWidth,
      minFontSize,
      minTypeScale,
    };
  },
  defaultParams: defaultUtopiaParams,
  addControls: addUtopiaControls,
  getVariables: getUtopiaVariables,
  getUrl: (params) => {
    const urlParams: UrlUtopia = {
      m: [...params.negativeSpaceSteps, ...params.positiveSpaceSteps],
      t: [
        params.maxWidth,
        params.maxFontSize,
        params.maxTypeScale,
        params.minWidth,
        params.minFontSize,
        params.minTypeScale,
      ],
    };
    return addParamsToUrl(urlParams);
  },
};

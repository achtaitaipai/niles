import queryString from "query-string";
import z from "zod";
import { modernFontStack } from "./modernFontStack.js";

export type Params = {
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
  /** Css prefix for types variables */
  typeCssPrefix: string;
  /** Css prefix for colors variables */
  colorCssPrefix: string;
  /** Css prefix for fonts variables */
  fontCssPrefix: string;
  /** Css prefix for spaces variables */
  spaceCssPrefix: string;
  /**Multipliers < 0 for spaces */
  negativeSpaceSteps: number[];
  /**Multipliers >= 0 for spaces */
  positiveSpaceSteps: number[];

  /**Colors names */
  colorsKeys: string[];
  /**Colors values in hexFormat */
  colorsValues: string[];

  /**Fonts names */
  fontsKeys: string[];
  /**Fonts index values */
  fontsValues: string[];
  /**Fonts options */
  fontsOptions: Record<string, string>;
};

type UrlParams = Omit<
  Params,
  | "positiveTypeSteps"
  | "negativeTypeSteps"
  | "typeCssPrefix"
  | "spaceCssPrefix"
  | "colorCssPrefix"
  | "fontCssPrefix"
  | "fontsOptions"
  | "colorsKeys"
  | "fontsKeys"
>;

export const defaultParams: Params = {
  minWidth: 320,
  maxWidth: 1240,
  minFontSize: 18,
  maxFontSize: 20,
  minTypeScale: 1.2,
  maxTypeScale: 1.25,
  negativeTypeSteps: 2,
  positiveTypeSteps: 5,
  typeCssPrefix: "step",
  spaceCssPrefix: "space",
  colorCssPrefix: "clr",
  fontCssPrefix: "font",
  negativeSpaceSteps: [0.75, 0.5, 0.25],
  positiveSpaceSteps: [1, 1.5, 2, 3, 4, 6],
  colorsKeys: [],
  colorsValues: [],
  fontsKeys: [],
  fontsValues: [],
  fontsOptions: modernFontStack,
};

export const getParams = (apiParams: Partial<Params>): Params =>
  Object.assign({}, defaultParams, apiParams, getUrlParams());

export const getUrlParams = (): Partial<Params> => {
  const urlSchema = z.object({
    minWidth: z.coerce.number().optional(),
    maxWidth: z.coerce.number().optional(),
    minFontSize: z.coerce.number().optional(),
    maxFontSize: z.coerce.number().optional(),
    minTypeScale: z.coerce.number().optional(),
    maxTypeScale: z.coerce.number().optional(),
    negativeSpaceSteps: z.array(z.coerce.number()).optional(),
    positiveSpaceSteps: z.array(z.coerce.number()).optional(),
    colorsValues: z.array(z.string()).optional(),
    fontsValues: z.array(z.string()).optional(),
  });

  return urlSchema.parse(
    queryString.parse(location.search, {
      arrayFormat: "separator",
      arrayFormatSeparator: "|",
    })
  );
};

export const updateUrl = (params: Params) => {
  const urlParams: UrlParams = {
    minWidth: params.minWidth,
    maxWidth: params.maxWidth,
    minFontSize: params.minFontSize,
    maxFontSize: params.maxFontSize,
    minTypeScale: params.minTypeScale,
    maxTypeScale: params.maxTypeScale,
    negativeSpaceSteps: params.negativeSpaceSteps,
    positiveSpaceSteps: params.positiveSpaceSteps,
    colorsValues: params.colorsValues,
    fontsValues: params.fontsValues,
  };

  const newUrl = queryString.stringifyUrl(
    {
      url: location.href,
      query: urlParams,
    },
    {
      arrayFormat: "separator",
      arrayFormatSeparator: "|",
    }
  );
  history.pushState(urlParams, "", newUrl);
};

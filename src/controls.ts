import { Pane } from "tweakpane";
import { copyCss, updateCssProperties } from "./css.js";
import { Params, getParams, updateUrl } from "./params.js";
import {
  addColorsControls,
  getColorsVariables,
} from "./sections/colors/index.js";
import { addFontsControls, getFontsVariables } from "./sections/fonts/index.js";
import {
  addUtopiaControls,
  getUtopiaVariables,
} from "./sections/utopia/index.js";
import { copyToClipBoard } from "./utils.js";

export const start = (apiParams: Partial<Params>) => {
  const params = getParams(apiParams);

  const pane = createPaneWrapper();
  const tabs = pane.addTab({
    pages: [{ title: "Utopia" }, { title: "Colors" }, { title: "Fonts" }],
  });
  const [utopiaPage, colorsPage, fontsPage] = tabs.pages;
  addUtopiaControls(utopiaPage, params);
  addColorsControls(colorsPage, params);
  addFontsControls(fontsPage, params);

  const copyParamsBtn = pane.addButton({ title: "copy Css" });
  const copyParams = pane.addButton({ title: "copy Parameters" });

  copyParamsBtn.on("click", () => {
    copyCss(getVariables(params));
  });

  copyParams.on("click", () => {
    copyToClipBoard(JSON.stringify(params));
  });

  pane.on("change", () => updateParams(params));

  updateParams(params);
};

const createPaneWrapper = () => {
  const wrapper = document.createElement("div");
  wrapper.style.setProperty("position", "fixed");
  wrapper.style.setProperty("top", "8px");
  wrapper.style.setProperty("right", "8px");
  wrapper.style.setProperty("height", "calc(100% - 16px)");
  wrapper.style.setProperty("overflow-y", "auto");
  document.body.append(wrapper);

  return new Pane({ title: "Theme Inspector", container: wrapper });
};

const updateParams = (params: Params) => {
  updateCssProperties(getVariables(params));
  updateUrl(params);
};

const getVariables = (params: Params) => {
  return {
    ...getUtopiaVariables(params),
    ...getColorsVariables(params),
    ...getFontsVariables(params),
  };
};

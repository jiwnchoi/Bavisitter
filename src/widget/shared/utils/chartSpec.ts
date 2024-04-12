import { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";

export function parseVegaLite(
  content: string,
  size: number,
): TopLevelUnitSpec<string> {
  let spec;
  try {
    if (content.includes("```")) {
      spec = JSON.parse(content.split("```")[0]);
    } else {
      spec = JSON.parse(content);
    }
  } catch (e) {
    spec = {};
  }
  // local file controller logic is needed here
  if (spec.data && spec.data.url) {
    spec.data = { name: spec.data.url };
  }
  for (const encodingName in spec.encoding) {
    spec.encoding[encodingName].legend = { orient: "bottom" };
  }
  spec.width = size;
  spec.height = size;
  spec.background = "transparent";
  spec.autosize = { type: "fit", contains: "padding" };
  return spec;
}

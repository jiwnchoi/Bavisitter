import { VisualizationSpec } from "react-vega";

export function parseVegaLite(content: string): VisualizationSpec {
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
  if (spec.data && spec.data.url === "artifacts/data.csv") {
    spec.data = { name: "table" };
  }
  for (const encodingName in spec.encoding) {
    spec.encoding[encodingName].legend = { orient: "bottom" };
  }
  spec.background = "transparent";
  spec.autosize = { type: "fit", contains: "padding" };
  return spec;
}

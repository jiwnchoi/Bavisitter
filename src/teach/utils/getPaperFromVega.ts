import "snapsvg-cjs-ts";
import Snap, { Paper } from "snapsvg";
import embed from "vega-embed";
import { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";

async function getPaperFromVega(
  spec: TopLevelUnitSpec<string>,
): Promise<Paper | null> {
  const container = document.createElement("div");
  await embed(container, spec, {
    actions: false,
    renderer: "svg",
  });
  const svgElement = container.querySelector("svg");
  return svgElement ? Snap(svgElement) : null;
}

export default getPaperFromVega;

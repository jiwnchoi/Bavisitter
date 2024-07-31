import Snap, { type Paper } from "snapsvg";
import type { Spec } from "vega";
import embed from "vega-embed";

async function getPaperFromVega(spec: Spec): Promise<Paper | null> {
  const container = document.createElement("div");
  await embed(container, spec, {
    actions: false,
    renderer: "svg",
  });
  const svgElement = container.querySelector("svg");
  return svgElement ? Snap(svgElement) : null;
}

export default getPaperFromVega;

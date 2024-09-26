import Snap, { type Paper } from "snapsvg";

async function getPaperFromSVG(svgElement: SVGSVGElement | null): Promise<Paper | null> {
  return svgElement ? Snap(svgElement) : null;
}

export default getPaperFromSVG;

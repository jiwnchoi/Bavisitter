import type { State } from "videre/model";

async function isUnderplotted(state: State) {
  const svg = await state.getSVG();
  if (!svg) throw new Error("SVG not found");

  const numCircles = svg.querySelectorAll("circle").length;
  return numCircles < 3;
}

export default isUnderplotted;

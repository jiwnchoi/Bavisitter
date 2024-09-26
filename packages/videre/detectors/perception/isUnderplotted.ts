import type { State } from "videre/model";
import { getAlphaMapFromCanvas } from "videre/utils";

async function isUnderplotted(state: State) {
  const canvas = await state.getMarksCanvas();
  const alphaMap = getAlphaMapFromCanvas(canvas, 4);

  return alphaMap.filter((alpha) => alpha > 0).length / alphaMap.length < 0.03;
}

export default isUnderplotted;

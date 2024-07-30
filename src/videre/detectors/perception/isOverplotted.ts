import { State } from "videre/model";
import { getAlphaMapFromCanvas, getMarkOpacity } from "videre/utils";

async function isOverplotted(state: State) {
  const canvas = await state.getMarksCanvas();
  const alphaMap = getAlphaMapFromCanvas(canvas, 4);
  const currentOpacity = getMarkOpacity(state.spec);

  return (
    currentOpacity > 0.25 &&
    alphaMap.filter((alpha) => alpha > 230).length /
      alphaMap.filter((alpha) => alpha > 0).length >
      0.3
  );
}

export default isOverplotted;

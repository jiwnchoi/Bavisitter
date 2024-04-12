import { State } from "teach/model";
import { getAlphaMapFromCanvas } from "teach/utils";

async function isOverplotted(state: State) {
  const canvas = await state.getMarksCanvas();
  const alphaMap = getAlphaMapFromCanvas(canvas, 4);

  return (
    alphaMap.filter((alpha) => alpha > 230).length /
      alphaMap.filter((alpha) => alpha > 0).length >
    0.5
  );
}

export default isOverplotted;

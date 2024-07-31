import { ScaleType } from "vega-lite/build/src/scale";
import type { State } from "videre/model";

export default function isNotZeroInPosition(state: State): boolean {
  const { spec } = state;
  if (!spec || !spec.encoding) {
    throw new Error("No encoding defined in the visualization spec.");
  }

  return Object.values(spec.encoding).some(encoding => {
    if (!encoding || !encoding.scale) return false;
    const { scale } = encoding;
    if (!scale) return false;

    return scale.type === ScaleType.LINEAR && scale.zero !== true;
  });
}

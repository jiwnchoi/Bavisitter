import { State } from "videre/model";
import { ScaleType } from "vega-lite/build/src/scale";

export default function isNoZeroInPosition(): (state: State) => boolean {
  return (state: State): boolean => {
    const { spec } = state;
    if (!spec || !spec.encoding) {
      console.error("No encoding defined in the visualization spec.");
      return false;
    }

    return Object.values(spec.encoding).some(encoding => {
      if (!encoding || !encoding.scale) return false; 
      const { channel, scale } = encoding;
      if (!channel || !scale) return false; 

      if (scale.type === ScaleType.LINEAR && scale.zero !== true) {
        return true; 
      }
      return false;
    });
  };
}

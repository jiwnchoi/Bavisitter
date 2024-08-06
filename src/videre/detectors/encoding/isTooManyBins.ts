import type { Encoding } from "vega-lite/build/src/encoding";
import type { State } from "videre/model";

export default function isTooManyBins(state: State): boolean {
  const { spec } = state;
  if (!spec || !spec.encoding) {
    throw new Error("No encoding defined in the visualization spec.");
  }

  const MAX_BIN_COUNT = 20; // This is a heuristic value and can be adjusted

  for (const channel in spec.encoding) {
    const encoding = spec.encoding[channel as keyof Encoding<string>];
    if (encoding && "bin" in encoding) {
      const bin = encoding.bin;
      // Only check when bin is explicitly specified as an object
      if (typeof bin === "object" && bin !== null) {
        if (bin.maxbins && bin.maxbins > MAX_BIN_COUNT) {
          return true;
        }
        if (bin.step && typeof bin.step === "number") {
          const field = encoding.field;
          if (field) {
            const values = state.data.map(d => d[field as string]);
            const extent = [Math.min(...values), Math.max(...values)];
            const binCount = Math.ceil((extent[1] - extent[0]) / bin.step);
            if (binCount > MAX_BIN_COUNT) {
              return true;
            }
          }
        }
      }
    }
  }

  return false;
}

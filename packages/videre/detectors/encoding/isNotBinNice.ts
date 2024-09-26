import type { Encoding } from "vega-lite/build/src/encoding";
import type { State } from "videre/model";

export default function IsNotBinNice(state: State): boolean {
  const { spec } = state;
  if (!spec || !spec.encoding) {
    throw new Error("No suitable spec defined in the visualization.");
  }

  for (const channel in spec.encoding) {
    const encoding = spec.encoding[channel as keyof Encoding<string>];
    if (encoding && "bin" in encoding) {
      const bin = encoding.bin;
      if (bin && bin !== true && typeof bin !== "string" && bin.nice === false) {
        return true;
      }
    }
  }

  return false;
}

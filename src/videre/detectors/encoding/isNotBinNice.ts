import { Encoding } from "vega-lite/build/src/encoding";
import { State } from "videre/model";

export default function IsNotBinNice(state: State): boolean {
  const { spec } = state;
  if (!spec || !spec.encoding) {
    console.error("No suitable spec defined in the visualization.");
    return false;
  }

  for (const channel in spec.encoding) {
    const encoding = spec.encoding[channel as keyof Encoding<string>];
    if (encoding && "bin" in encoding) {
      const bin = encoding.bin;
      if (
        bin &&
        bin !== true &&
        typeof bin !== "string" &&
        bin.nice === false
      ) {
        return true;
      }
    }
  }

  return false;
}

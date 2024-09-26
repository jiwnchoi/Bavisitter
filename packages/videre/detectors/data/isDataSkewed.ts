import { sampleSkewness } from "simple-statistics";
import type { PositionFieldDef } from "vega-lite/build/src/channeldef";
import type { State } from "videre/model";

export default function isDataSkewed(channel: "x" | "y", direction: "positive" | "negative") {
  return (state: State) => {
    const { data, spec } = state;
    const encoding = spec.encoding![channel] as PositionFieldDef<string>;
    const values = data
      .map((d) => d[encoding.field as string])
      .filter((d) => typeof d === "number")
      .filter((d) => d !== null) as number[];
    if (values.length < 20) return false;
    const skewness = sampleSkewness(values);
    return direction === "positive" ? skewness > 1 : skewness < -1;
  };
}

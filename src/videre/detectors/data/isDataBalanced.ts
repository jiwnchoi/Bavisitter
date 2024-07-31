import { sumSimple } from "simple-statistics";
import type { PositionFieldDef } from "vega-lite/build/src/channeldef";
import type { Encoding } from "vega-lite/build/src/encoding";
import type { State } from "videre/model";

const THRESHOLD = 0.5;

function entropyIndexWithValue(values: number[]) {
  const valueSum = sumSimple(values);
  const probs = values.map(value => value / valueSum);
  const dataEntropy = probs.reduce((acc, p) => acc - p * Math.log2(p), 0);
  const maxEntropy = Math.log2(values.length);
  return dataEntropy / maxEntropy; // [0, 1]
}

function entropyIndexWithCount(values: string[]) {
  const counts = values.reduce(
    (acc, value) => {
      acc[value] = (acc[value] || 0) + 1;
      return acc;
    },
    {} as Record<string, number>,
  );

  const total = values.length;
  const maxEntropy = Math.log2(total);
  const dataEntropy = Object.values(counts).reduce((acc, count) => {
    const p = count / total;
    return acc - p * Math.log2(p);
  }, 0);
  return dataEntropy / maxEntropy; // [0, 1]
}

export default function isDataBalanced(channel: keyof Encoding<string>, value?: "value" | "count") {
  return (state: State) => {
    const { data, spec } = state;
    const encoding = spec.encoding![channel] as PositionFieldDef<string>;
    const values = data.map(d => d[encoding.field as string]);
    if (value === "count") {
      return entropyIndexWithCount(values) > THRESHOLD;
    }
    if (value === "value") {
      return entropyIndexWithValue(values) > THRESHOLD;
    }
    const valueType = typeof values[0];
    if (valueType === "number") {
      return entropyIndexWithValue(values) > THRESHOLD;
    }
    return entropyIndexWithCount(values) > THRESHOLD;
  };
}

// aggregate 고려해서 수정해야함

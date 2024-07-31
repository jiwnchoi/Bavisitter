import type { Encoding } from "vega-lite/build/src/encoding";
import type { State } from "videre/model";

function isNotLabels(channel: keyof Encoding<string>): (state: State) => boolean {
  return (state: State): boolean => {
    const { spec } = state;
    if (!spec || !spec.encoding) {
      throw new Error("No encoding defined in the visualization spec.");
    }

    const encoding = spec.encoding[channel];
    return !!encoding && "axis" in encoding && !!encoding.axis && encoding.axis.labels === false;
  };
}

function isNotTicks(channel: keyof Encoding<string>): (state: State) => boolean {
  return (state: State): boolean => {
    const { spec } = state;
    if (!spec || !spec.encoding) {
      throw new Error("No encoding defined in the visualization spec.");
    }

    const encoding = spec.encoding[channel];
    return !!encoding && "axis" in encoding && !!encoding.axis && encoding.axis.ticks === false;
  };
}

function isNotLegend(state: State): boolean {
  const { spec } = state;
  if (!spec || !spec.encoding) {
    throw new Error("No encoding defined in the visualization spec.");
  }

  return Object.values(spec.encoding).every(encoding => {
    return !encoding || encoding.legend === false;
  });
}

export { isNotLabels, isNotLegend, isNotTicks };

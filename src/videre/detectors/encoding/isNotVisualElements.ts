import { State } from "videre/model";
import { Encoding } from "vega-lite/build/src/encoding";

function isNotLabels(
  channel: keyof Encoding<string>,
): (state: State) => boolean {
  return (state: State): boolean => {
    const { spec } = state;
    if (!spec || !spec.encoding) {
      console.error("No encoding defined in the visualization spec.");
      return false;
    }

    const encoding = spec.encoding[channel];
    return (
      !!encoding &&
      "axis" in encoding &&
      !!encoding.axis &&
      encoding.axis.labels === false
    );
  };
}

function isNotTicks(
  channel: keyof Encoding<string>,
): (state: State) => boolean {
  return (state: State): boolean => {
    const { spec } = state;
    if (!spec || !spec.encoding) {
      console.error("No encoding defined in the visualization spec.");
      return false;
    }

    const encoding = spec.encoding[channel];
    return (
      !!encoding &&
      "axis" in encoding &&
      !!encoding.axis &&
      encoding.axis.ticks === false
    );
  };
}

function isNotLegend(state: State): boolean {
  const { spec } = state;
  if (!spec || !spec.encoding) {
    console.error("No encoding defined in the visualization spec.");
    return false;
  }

  return Object.values(spec.encoding).every((encoding) => {
    return !encoding || encoding.legend === false;
  });
}

export { isNotLabels, isNotLegend, isNotTicks };

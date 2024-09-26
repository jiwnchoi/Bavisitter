import type { AnyMark } from "vega-lite/build/src/mark";
import type { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";
import type { State } from "videre/model";
import { getMarkOpacity } from "videre/utils";

export function replaceMark(mark: AnyMark) {
  return (state: State) => {
    const { spec } = state;
    const newSpec = {
      ...structuredClone(spec),
      mark,
    } as TopLevelUnitSpec<string>;
    return state.updateSpec(newSpec);
  };
}

export function convertPieToBar(state: State) {
  const { spec } = state;
  const newSpec = {
    ...structuredClone(spec),
    mark: "bar",
    encoding: {
      x: spec.encoding?.color,
      y: spec.encoding?.theta,
      color: spec.encoding?.color,
    },
  } as TopLevelUnitSpec<string>;
  return state.updateSpec(newSpec);
}

export function convertScatterToHeatmap(state: State) {
  const { spec } = state;
  const newSpec = {
    ...structuredClone(spec),
    mark: "rect",
    encoding: {
      x: { ...spec.encoding?.x, bin: true },
      y: { ...spec.encoding?.y, bin: true },
      color: {
        aggregate: "count",
        type: "quantitative",
      },
    },
  } as TopLevelUnitSpec<string>;

  return state.updateSpec(newSpec);
}
const MIN_OPACITY = 0.2;

export const reduceOpacity = (state: State) => {
  const { spec } = state;
  const currentOpacity = getMarkOpacity(spec);
  const newOpacity = Math.max(
    MIN_OPACITY,
    Math.round((MIN_OPACITY + (currentOpacity - MIN_OPACITY) / 2) * 100) / 100,
  );
  const newSpec = {
    ...structuredClone(spec),
    mark:
      typeof spec.mark === "string"
        ? {
            type: spec.mark,
            opacity: newOpacity,
          }
        : {
            ...spec.mark,
            opacity: newOpacity,
          },
  };

  return state.updateSpec(newSpec);
};

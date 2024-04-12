import { State } from "teach/model";
import { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";

export function convertPieToBar(state: State) {
  const { spec } = state;
  const newSpec = {
    ...spec,
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
    ...spec,
    mark: "rect",
    encoding: {
      x: { ...spec.encoding?.x, bin: true },
      y: { ...spec.encoding?.y, bin: true },
      color: {
        field: "count()",
      },
    },
  };

  return { ...state, spec: newSpec };
}
const MIN_OPACITY = 0.2;

export const reduceOpacity = (state: State) => {
  const { spec } = state;

  let currentOpacity = 0.7;

  if (state.specConfig.mark && state.specConfig.mark.opacity) {
    currentOpacity = state.specConfig.mark.opacity as number;
  } else if (typeof spec.mark !== "string" && spec.mark.opacity) {
    currentOpacity = spec.mark.opacity as number;
  }

  return state.updateSpec(spec, {
    mark: {
      opacity: (currentOpacity + MIN_OPACITY) / 2,
    },
  });
};

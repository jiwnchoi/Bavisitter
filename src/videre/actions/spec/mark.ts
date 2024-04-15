import { State } from "videre/model";
import { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";
import { cloneDeep } from "lodash-es";
export function convertPieToBar(state: State) {
  const { spec } = state;
  const newSpec = {
    ...cloneDeep(spec),
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
    ...cloneDeep(spec),
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
  const newSpec = cloneDeep(spec);

  let currentOpacity = 0.7;
  if (typeof newSpec.mark === "string") {
    newSpec.mark = {
      type: newSpec.mark,
      opacity: MIN_OPACITY + (0.7 - MIN_OPACITY) / 2,
    };
  } else {
    currentOpacity = newSpec.mark.opacity as number;
    newSpec.mark.opacity = MIN_OPACITY + (currentOpacity - MIN_OPACITY) / 2;
  }

  return state.updateSpec(newSpec);
};

import type { AnyMark } from "vega-lite/build/src/mark";
import type { State } from "videre/model";

export const isScatterplot = (state: State) => {
  const { spec } = state;
  return ["point", "circle"].includes(typeof spec.mark === "object" ? spec.mark.type : spec.mark);
};

export const isPieChart = (state: State) => {
  const { spec } = state;
  return ["arc"].includes(typeof spec.mark === "object" ? spec.mark.type : spec.mark);
};

export function isMark(marks: AnyMark[]) {
  return (state: State) => {
    const { spec } = state;

    return marks.includes(typeof spec.mark === "object" ? spec.mark.type : spec.mark);
  };
}

import { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";

export function getMarkOpacity(spec: TopLevelUnitSpec<string>) {
  if (typeof spec.mark === "string") {
    return ["point", "circle"].includes(spec.mark) ? 0.7 : 1;
  } else if (!("opacity" in spec.mark)) {
    return ["point", "circle"].includes(spec.mark.type) ? 0.7 : 1;
  } else {
    return spec.mark.opacity as number;
  }
}

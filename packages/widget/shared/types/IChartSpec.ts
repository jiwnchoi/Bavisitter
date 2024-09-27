import type { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";

interface IChartSpec {
  chatIndex: number;
  spec: TopLevelUnitSpec<string>;
}

export default IChartSpec;

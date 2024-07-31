import type { PlainObject } from "react-vega";
import type { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";

interface IChartSpec {
  spec: TopLevelUnitSpec<string>;
  chatIndex: number;
  data?: PlainObject;
  thumbnail?: string;
}

export default IChartSpec;

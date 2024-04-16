import { PlainObject } from "react-vega";
import { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";

interface IChartSpec {
  spec: TopLevelUnitSpec<string>;
  chatIndex: number;
  data?: PlainObject;
  thumbnail?: string;
}

export default IChartSpec;

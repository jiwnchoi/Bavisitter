import { IChartSpec } from "@shared/types";
import { PlainObject, Vega } from "react-vega";

interface IChartViewProps {
  spec: IChartSpec;
  width: number;
  data: PlainObject;
}

export default function ChartView({ spec, width, data }: IChartViewProps) {
  return (
    <>
      {spec && (
        <Vega
          mode={"vega-lite"}
          spec={spec.spec}
          width={width - 40}
          data={data}
          defaultStyle={true}
        />
      )}
    </>
  );
}

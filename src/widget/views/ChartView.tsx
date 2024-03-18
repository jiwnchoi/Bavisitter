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
          data={data}
          width={width - 40}
          height={width - 40}
          actions={false}
        />
      )}
    </>
  );
}

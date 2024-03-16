import { Center } from "@chakra-ui/react";
import { IChartSpec } from "@shared/types";
import { PlainObject, Vega } from "react-vega";

interface IChartViewProps {
  spec: IChartSpec;
  width: number;
  data: PlainObject;
}

export default function ChartView({ spec, width, data }: IChartViewProps) {
  return (
    <Center w={width} h={500}>
      {spec && (
        <Vega
          mode={"vega-lite"}
          spec={spec.spec}
          width={width - 40}
          data={data}
          defaultStyle={true}
        />
      )}
    </Center>
  );
}

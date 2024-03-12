import { Center } from "@chakra-ui/react";
import { Vega, type VisualizationSpec } from "react-vega";

interface IChartProps {
  spec: VisualizationSpec;
  width: number;
}

export default function ChartView({ spec, width }: IChartProps) {
  return (
    <Center minH={300}>
      <Vega mode="vega-lite" spec={spec} actions={false} width={width} />
    </Center>
  );
}

import { Center } from "@chakra-ui/react";
import useMessages from "@hooks/useMessages";
import { Vega, type VisualizationSpec } from "react-vega";

interface IChartProps {
  spec: VisualizationSpec;
  width: number;
}

export default function ChartView({ spec, width }: IChartProps) {
  const { currentVisualization } = useMessages();
  return (
    <Center w="full" h="full">
      {currentVisualization && (
        <Vega spec={currentVisualization} width={width} actions={false} />
      )}
    </Center>
  );
}

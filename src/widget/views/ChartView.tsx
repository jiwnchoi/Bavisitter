import { CenterProps, Flex, useColorMode } from "@chakra-ui/react";
import { useChartStore } from "@stores";
import { Vega } from "react-vega";

export default function ChartView(props: CenterProps) {
  const { colorMode } = useColorMode();
  const currentChart = useChartStore((state) => state.computed.currentChart);

  return (
    <Flex {...props}>
      {currentChart && (
        <Vega
          mode={"vega-lite"}
          spec={currentChart.spec}
          data={currentChart.data}
          actions={false}
          theme={colorMode === "light" ? undefined : "dark"}
        />
      )}
    </Flex>
  );
}

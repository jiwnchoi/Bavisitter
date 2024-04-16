import { Center, CenterProps } from "@chakra-ui/react";
import { useColorMode } from "@hooks";
import { useChartStore } from "@stores";
import { Vega } from "react-vega";

export default function ChartView(props: CenterProps & { chartSize: number }) {
  const { colorMode } = useColorMode();
  const currentChart = useChartStore((state) => state.computed.currentChart);
  return (
    <Center {...props}>
      {currentChart && (
        <Vega
          mode={"vega-lite"}
          spec={currentChart.spec}
          data={currentChart.data}
          actions={false}
          theme={colorMode === "light" ? undefined : "dark"}
        />
      )}
    </Center>
  );
}

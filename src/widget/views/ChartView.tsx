import { Center, CenterProps } from "@chakra-ui/react";
import { useCharts, useColorMode } from "@hooks";
import { Vega } from "react-vega";

export default function ChartView(props: CenterProps & { chartSize: number }) {
  const { colorMode } = useColorMode();
  const { currentChart } = useCharts(props.chartSize);

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

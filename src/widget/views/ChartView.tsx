import { Center, CenterProps } from "@chakra-ui/react";
import { useCharts, useColorMode } from "@hooks";
import { Vega } from "react-vega";

export default function ChartView(props: CenterProps & { width: number }) {
  const { colorMode } = useColorMode();
  const { currentChart } = useCharts();

  return (
    <Center {...props}>
      {currentChart && (
        <Vega
          mode={"vega-lite"}
          spec={currentChart.spec}
          data={currentChart.data}
          width={props.width - 40}
          height={props.width - 40}
          actions={false}
          theme={colorMode === "light" ? undefined : "dark"}
        />
      )}
    </Center>
  );
}

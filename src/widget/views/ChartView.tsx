import { CenterProps, Flex, useColorMode} from "@chakra-ui/react";
import { useChartStore } from "@stores";
import { Vega } from "react-vega";
import ThumbnailView from './ThumbnailView';

export default function ChartView(props: CenterProps) {
  const { colorMode } = useColorMode();
  const currentChart = useChartStore((state) => state.computed.currentChart);
  
  return (
    <Flex 
      margin={`${60}px ${10}px ${20}px ${10}px`} 
      flexDirection="column" {...props}>
      {currentChart && (
        <Vega
          mode={"vega-lite"}
          spec={currentChart.spec}
          data={currentChart.data}
          actions={false}
          theme={colorMode === "light" ? undefined : "dark"}
        />
      )}
      <ThumbnailView 
        width="400px" 
        height="90px" 
      />
    </Flex>
  );
}

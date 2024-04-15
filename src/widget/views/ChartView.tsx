import { Center, CenterProps, Flex, Image, Box } from "@chakra-ui/react";
import { useCharts, useColorMode } from "@hooks";
import { Vega } from "react-vega";

export default function ChartView(props: CenterProps & { chartSize: number }) {
  const { colorMode } = useColorMode();
  const { currentChart, charts } = useCharts(props.chartSize);

  return (
    <Center flexDirection="column" {...props}>
      {currentChart && (
        <Vega
          mode={"vega-lite"}
          spec={currentChart.spec}
          data={currentChart.data}
          actions={true}
          theme={colorMode === "light" ? undefined : "dark"}
        />
      )}
      <Flex overflowX="auto" width="full" maxWidth="300px" my={4}>
        {charts.map((chart, index) => (
          chart.thumbnail && (
            <Box key={index} p={1} mr={0}>
              <Image src={chart.thumbnail} alt={`Thumbnail ${index}`} boxSize="80px" />
            </Box>
          )
        ))}
      </Flex>

    </Center>
  );
}

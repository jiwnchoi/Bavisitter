import { Flex, useColorMode, type CenterProps } from "@chakra-ui/react";
import { useChartView } from "@hooks";
import { Vega } from "react-vega";

function ChartView(props: CenterProps) {
  const { colorMode } = useColorMode();
  const { spec, data } = useChartView();

  return (
    <Flex {...props}>
      {spec?.data.name && data && (
        <Vega
          mode={"vega-lite"}
          spec={spec}
          data={{ [spec.data.name]: data }}
          theme={colorMode === "light" ? undefined : "dark"}
        />
      )}
    </Flex>
  );
}

export default ChartView;

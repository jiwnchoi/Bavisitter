import { Center, Flex, type FlexProps, Image, Spinner, useColorMode } from "@chakra-ui/react";
import { useCharts } from "@hooks";
import { useGetThumbnail } from "@hooks/query";
import { type IChartSpec } from "@shared/types";
import { useInteractionStore } from "@stores";

interface HistoryViewProps extends FlexProps {
  thumbnailSize: number;
  scrollToContentByIndex: (chatIndex: number) => void;
}

interface ThumbnailViewProps extends FlexProps {
  chart: IChartSpec;
  chartIndex: number;
  thumbnailSize: number;
  scrollToContentByIndex: (chatIndex: number) => void;
}

const ThumbnailView = ({
  chart,
  chartIndex,
  thumbnailSize,
  scrollToContentByIndex,
  ...props
}: ThumbnailViewProps) => {
  const { chatIndex } = chart;
  const { colorMode } = useColorMode();
  const { thumbnail, loading } = useGetThumbnail(chart);
  const setCodeBlockOpened = useInteractionStore((state) => state.setCodeBlockOpened);
  const setCurrentChartIndex = useInteractionStore((state) => state.setCurrentChartIndex);

  return (
    <Flex
      backgroundColor={colorMode === "dark" ? "gray.700" : "gray.100"}
      borderRadius={8}
      overflow={"clip"}
      key={`thumbnail-${chartIndex}`}
      h={"fit-content"}
      {...props}>
      {loading && !thumbnail ? (
        <Center w={thumbnailSize} h={thumbnailSize}>
          <Spinner />
        </Center>
      ) : (
        <Image
          src={thumbnail}
          h={thumbnailSize}
          w={thumbnailSize}
          minW={thumbnailSize}
          minH={thumbnailSize}
          onClick={() => {
            setCurrentChartIndex(chartIndex);
            setCodeBlockOpened(chatIndex, true);
            scrollToContentByIndex(chatIndex);
          }}
          cursor="pointer"
          _hover={{ opacity: 0.5 }}
        />
      )}
    </Flex>
  );
};

const HistoryView = ({ thumbnailSize, scrollToContentByIndex, ...props }: HistoryViewProps) => {
  const { charts } = useCharts();

  return (
    <Flex {...props} overflowX="auto">
      <Flex gap={4} flexDirection={"row-reverse"}>
        {charts.map((chart, index) => (
          <ThumbnailView
            key={`thumbnail-${index}`}
            chart={chart}
            chartIndex={index}
            thumbnailSize={thumbnailSize}
            scrollToContentByIndex={scrollToContentByIndex}
          />
        ))}
      </Flex>
    </Flex>
  );
};

export default HistoryView;

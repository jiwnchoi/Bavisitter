import { Flex, FlexProps, Image, useColorMode } from "@chakra-ui/react";
import { useChartStore, useMessageStore } from "@stores";

interface ThumbnailViewProps extends FlexProps {
  thumbnailSize: number;
  scrollToContentByIndex: (chatIndex: number) => void;
}

const HistoryView = (props: ThumbnailViewProps) => {
  const charts = useChartStore((state) => state.charts);
  const setCurrentChartByChatIndex = useChartStore(
    (state) => state.setCurrentChartByChatIndex,
  );
  const toggleCodeBlock = useMessageStore((state) => state.toggleCodeBlock);
  const { thumbnailSize, scrollToContentByIndex } = props;
  const { colorMode } = useColorMode();
  return (
    <Flex {...props} overflowX="auto">
      <Flex gap={4} flexDirection={"row-reverse"}>
        {charts.map((chart, index) => (
          <Flex
            backgroundColor={colorMode === "dark" ? "gray.700" : "gray.100"}
            borderRadius={8}
            overflow={"clip"}
            key={`thumbnail-${index}`}
            h={"fit-content"}
          >
            <Image
              key={`thumbnail-${index}`}
              src={chart.thumbnail}
              h={thumbnailSize}
              w={thumbnailSize}
              minW={thumbnailSize}
              minH={thumbnailSize}
              onClick={() => {
                scrollToContentByIndex(chart.chatIndex);
                setCurrentChartByChatIndex(chart.chatIndex);
                toggleCodeBlock(chart.chatIndex)(true);
              }}
              cursor="pointer"
              _hover={{ opacity: 0.5 }}
            />
          </Flex>
        ))}
      </Flex>
    </Flex>
  );
};

export default HistoryView;

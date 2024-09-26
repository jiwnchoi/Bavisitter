import { Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import { useMessages } from "@hooks";
import ChartView from "./ChartView";
import HistoryView from "./HistoryView";
import Messages from "./Messages";

export default function Main({ chartWidth }: { chartWidth: number }) {
  const { chatBoxRef, chatBoxAtBottom, scrollToBottom, scrollToContentByIndex } = useMessages();

  return (
    <>
      <Messages
        w={"full"}
        h={"full"}
        overflowY={"auto"}
        overflowX={"hidden"}
        flexDir={"column"}
        gap={8}
        p={4}
        chatBoxRef={chatBoxRef}
        chatBoxAtBottom={chatBoxAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <Flex flexDir={"column"} w={chartWidth}>
        <Text px={4} pb={2} fontWeight={700}>
          Current Visualization
        </Text>
        <ChartView minW={chartWidth} />
        <Spacer />
        <Divider m={4} />
        <Text px={4} fontWeight={700}>
          Visualization History
        </Text>
        <HistoryView
          p={4}
          scrollToContentByIndex={scrollToContentByIndex}
          thumbnailSize={100}
          minH={150}
        />
      </Flex>
    </>
  );
}

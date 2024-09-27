import { Divider, Flex, Spacer, Text } from "@chakra-ui/react";
import { useMessages, useMessagesContainer } from "@hooks";
import { CHART_WIDTH } from "@shared/constants";
import ChartView from "./ChartView";
import HistoryView from "./HistoryView";
import Messages from "./Messages";
import Placeholder from "./Placeholder";

function Main() {
  const { messages } = useMessages();
  const { chatBoxRef, chatBoxAtBottom, scrollToBottom, scrollToContentByIndex } =
    useMessagesContainer();

  return messages.length !== 0 ? (
    <>
      <Messages
        w={"full"}
        h={"full"}
        overflowY={"auto"}
        overflowX={"hidden"}
        flexDir={"column"}
        gap={8}
        p={4}
        messages={messages}
        chatBoxRef={chatBoxRef}
        chatBoxAtBottom={chatBoxAtBottom}
        scrollToBottom={scrollToBottom}
      />
      <Flex flexDir={"column"} w={CHART_WIDTH}>
        <Text px={4} pb={2} fontWeight={700}>
          Current Visualization
        </Text>
        <ChartView minW={CHART_WIDTH} />
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
  ) : (
    <Placeholder />
  );
}

export default Main;

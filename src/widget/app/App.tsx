import { Center, Container, Flex } from "@chakra-ui/react";
import { useCharts, useData, useMessages } from "@hooks";
import { ChartView, Messages, PromptView } from "@views";
import Providers from "./Providers";

function App() {
  const {
    streaming,
    chatBoxRef,
    appendUserMessage,
    messagesWithRef,
    clearUserMessages,
    scrollToBottom,
    chatBoxAtBottom,
  } = useMessages();
  const data = useData();
  const { currentChart } = useCharts(messagesWithRef, streaming);
  return (
    <Providers>
      <Container minW={"full"} h="600px" m={0} p={0}>
        <Flex direction="row" gap={2} h="500px">
          <Messages
            messagesWithRef={messagesWithRef}
            chatBoxRef={chatBoxRef}
            streaming={streaming}
            scrollToBottom={scrollToBottom}
            chatBoxAtBottom={chatBoxAtBottom}
          />
          <Center w={400}>
            {currentChart && (
              <ChartView spec={currentChart} width={400} data={data} />
            )}
          </Center>
        </Flex>
        <PromptView
          appendUserMessage={appendUserMessage}
          clearUserMessages={clearUserMessages}
          streaming={streaming}
        />
      </Container>
    </Providers>
  );
}

export default App;

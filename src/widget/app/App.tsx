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
  } = useMessages();
  const data = useData();
  const { currentChart, setCurrentChartIndex } = useCharts(
    messagesWithRef,
    streaming,
  );
  return (
    <Providers>
      <Container minW={"100%"} h="600px" m={0} p={0}>
        <Flex direction="row" gap={2} h="500px">
          <Messages
            messagesWithRef={messagesWithRef}
            chatBoxRef={chatBoxRef}
            setCurrentChartIndex={setCurrentChartIndex}
            streaming={streaming}
          />
          <Center minW={300}>
            {currentChart && (
              <ChartView spec={currentChart} width={300} data={data} />
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

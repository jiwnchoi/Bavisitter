import { Center, Container, Flex } from "@chakra-ui/react";
import useMessages from "@hooks/useMessages";
import { ChartView, ChatView, PromptView } from "@views";
import Providers from "./Providers";
import useData from "@hooks/useData";

function App() {
  const { messages, streaming, specs, chatBoxRef, appendUserMessage } =
    useMessages();
  const { data } = useData();
  return (
    <Providers>
      <Container minW={"100%"} h="600px" margin={0} padding={0}>
        <Flex direction="row" gap={2} h="500px">
          <ChatView messages={messages} chatBoxRef={chatBoxRef} />
          <Center minW={300}>
            {specs.length > 0 && (
              <ChartView
                spec={specs[specs.length - 1]}
                width={300}
                data={data}
              />
            )}
          </Center>
        </Flex>
        <PromptView
          appendUserMessage={appendUserMessage}
          streaming={streaming}
        />
      </Container>
    </Providers>
  );
}

export default App;

import { Center, Container, Flex } from "@chakra-ui/react";
import useMessages from "@hooks/useMessages";
import { ChartView, ChatView, PromptView } from "@views";
import Providers from "./Providers";
import useData from "@hooks/useData";

function App() {
  const { messages, stream, specs } = useMessages();
  const { data } = useData();
  return (
    <Providers>
      <Container
        minW={"100%"}
        h="600px"
        margin={0}
        padding={0}
        display="flex"
        flexDir={"column"}
      >
        <Flex direction="row" w="full" gap={2}>
          <Center p={2} flexDir={"column"} h={"500px"} w="full">
            <ChatView messages={messages} stream={stream} />
          </Center>
          {specs.length && data && (
            <ChartView spec={specs[specs.length - 1]} width={300} data={data} />
          )}
        </Flex>
        <PromptView />
      </Container>
    </Providers>
  );
}

export default App;

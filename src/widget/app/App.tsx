import { ChartView, ChatView, PromptView } from "@views";
import Providers from "./Providers";
import { Center, Container, Flex } from "@chakra-ui/react";
import MOCK_CHART from "@shared/mock/chart";

function App() {
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
          <Center p={2} flexDir={"column"} maxH={"500px"} w="full">
            <ChatView />
          </Center>
          <ChartView spec={MOCK_CHART} width={300} />
        </Flex>
        <PromptView />
      </Container>
    </Providers>
  );
}

export default App;

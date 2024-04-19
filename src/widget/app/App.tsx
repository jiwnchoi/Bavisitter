import { Container, Flex } from "@chakra-ui/react";
import { useModelMessageEffect } from "@hooks";
import { useMessageStore } from "@stores";
import { Header, Main, Placeholder, PromptView } from "@views";
import Providers from "./Providers";
const CHART_WIDTH = 350;

const App = () => {
  useModelMessageEffect(CHART_WIDTH);

  const messages = useMessageStore((state) => state.messages);
  return (
    <Providers>
      <Container minW={"full"} m={0} p={4} position={"relative"}>
        <Header />
        <Flex flexDir="row" gap={2} h="600px" position={"relative"}>
          {messages.length > 0 ? (
            <Main chartWidth={CHART_WIDTH} />
          ) : (
            <Placeholder />
          )}
        </Flex>
        <PromptView />
      </Container>
    </Providers>
  );
};

export default App;

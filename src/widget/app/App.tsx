import { Container, Flex } from "@chakra-ui/react";
import { ChartView, Messages, PromptView } from "@views";
import Providers from "./Providers";
import { useModelMessageEffect } from "@hooks";

const App = () => {
  useModelMessageEffect();
  return (
    <Providers>
      <Container minW={"full"} h="600px" m={0} p={0}>
        <Flex direction="row" gap={2} h="500px">
          <Messages />
          <ChartView width={400} />
        </Flex>
        <PromptView />
      </Container>
    </Providers>
  );
};

export default App;

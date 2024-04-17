import { Container, Flex } from "@chakra-ui/react";
import { useModelMessageEffect } from "@hooks";
import { useMessageStore } from "@stores";
import {
  ChartView,
  Header,
  Messages,
  PlaceholderView,
  PromptView,
} from "@views";
import Providers from "./Providers";
const CHART_WIDTH = 400;
const App = () => {
  useModelMessageEffect(CHART_WIDTH);
  const messages = useMessageStore((state) => state.messages);
  return (
    <Providers>
      <Container minW={"full"} m={0} p={4} position={"relative"}>
        <Header />
        <Flex flexDir="row" gap={2} h="600px" position={"relative"}>
          {messages.length > 0 ? (
            <>
              <Messages
                w={"full"}
                h={"full"}
                overflowY={"auto"}
                overflowX={"hidden"}
                flexDir={"column"}
                gap={8}
                p={4}
              />
              <ChartView minW={CHART_WIDTH} w={CHART_WIDTH} />
            </>
          ) : (
            <PlaceholderView />
          )}
        </Flex>
        <PromptView />
      </Container>
    </Providers>
  );
};

export default App;

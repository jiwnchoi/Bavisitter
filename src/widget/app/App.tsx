import { Center, Container } from "@chakra-ui/react";
import { useModelMessageEffect } from "@hooks";
import { ChartView, Messages, PromptView } from "@views";
import Providers from "./Providers";

const App = () => {
  useModelMessageEffect();
  return (
    <Providers>
      <Container minW={"full"} m={0} p={0}>
        <Center flexDir="row" gap={2} h="700px">
          <Messages
            w={"full"}
            h={"full"}
            overflowY={"auto"}
            overflowX={"hidden"}
            flexDir={"column"}
            gap={8}
            p={4}
          />
          <ChartView width={500} chartSize={400} />
        </Center>
        <PromptView />
      </Container>
    </Providers>
  );
};

export default App;

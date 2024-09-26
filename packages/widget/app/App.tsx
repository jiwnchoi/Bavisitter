import { Container, Flex } from "@chakra-ui/react";
import { Header, Main, PromptView } from "@views";
import Providers from "./Providers";

const App = () => {
  return (
    <Providers>
      <Container minW={"full"} m={0} p={4} position={"relative"}>
        <Header />
        <Flex flexDir="row" gap={2} h="600px" position={"relative"}>
          <Main />
        </Flex>
        <PromptView />
      </Container>
    </Providers>
  );
};

export default App;

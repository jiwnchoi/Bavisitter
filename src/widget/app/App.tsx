import { Prompt } from "@views";
import Providers from "./Providers";
import { Container, Flex } from "@chakra-ui/react";

function App() {
  return (
    <Providers>
      <Container minW={"100%"} h="480px" margin={0} padding={0} display="flex">
        <Flex direction="column" w="full" gap={2}>
          <Flex p={2} flexDir={"column"} minH={"300px"}>
            Chat to Visualization!
          </Flex>
          <Prompt />
        </Flex>
        <Flex direction="column" w={"480px"} h="100%">
          <h1>Widget</h1>
        </Flex>
      </Container>
    </Providers>
  );
}

export default App;

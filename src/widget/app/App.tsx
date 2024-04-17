import {
  Button,
  Center,
  Container,
  Flex,
  Heading,
  Icon,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { useModelMessageEffect } from "@hooks";
import { useMessageStore } from "@stores";
import { ChartView, Messages, PlaceholderView, PromptView } from "@views";
import { FaGithub } from "react-icons/fa6";
import Providers from "./Providers";

const App = () => {
  useModelMessageEffect(400);
  const messages = useMessageStore((state) => state.messages);
  return (
    <Providers>
      <Container minW={"full"} m={0} p={4} position={"relative"}>
        <Flex w="full" flexDir="row" justify={"space-between"} mb={4}>
          <Text fontSize={"md"} fontWeight={700}>
            Bavisitter
          </Text>
          <Button
            leftIcon={<Icon as={FaGithub} />}
            size={"xs"}
            variant={"link"}
            p={0}
          >
            Github
          </Button>
        </Flex>
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
              <ChartView width={500} />
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

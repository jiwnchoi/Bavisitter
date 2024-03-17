import { Avatar, Box, Flex, Text, VStack } from "@chakra-ui/react";
import { IMessage } from "@shared/types";
import { RefObject } from "react";
import MessageContent from "./MessageContent";
import CodeContent from "./CodeContent";

function getUserName(
  currentMessage: IMessage,
  previousMessage: IMessage | null,
) {
  if (currentMessage.role === "user") {
    return "You";
  }
  if (previousMessage && previousMessage.role === "user") {
    return "Visualization Assistant";
  }
  if (previousMessage && previousMessage.role !== "user") {
    return null;
  }
  return null;
}

interface IChatViewProps {
  messages: IMessage[];
  chatBoxRef: RefObject<HTMLDivElement>;
}

const ChatView = ({ messages, chatBoxRef }: IChatViewProps) => (
  <VStack
    w={"full"}
    h={"full"}
    overflowY={"auto"}
    flexDir={"column"}
    gap={8}
    p={4}
    css={{
      "&::-webkit-scrollbar": {
        backgroundColor: "transparent",
        width: "8px",
      },
      "&::-webkit-scrollbar-thumb": {
        backgroundColor: "rgba(0,0,0, 0.1)",
      },
    }}
    ref={chatBoxRef}
  >
    {messages.map((message, index) => {
      const previousMessage = index > 0 ? messages[index - 1] : null;
      const userName = getUserName(message, previousMessage);
      return (
        <Flex dir="row" w="full">
          <Box minW={"32px"}>
            {userName && <Avatar size="sm" name={userName} />}
          </Box>
          <VStack align="flex-start" ml={2} gap={2}>
            {userName && (
              <Text as={"p"} fontSize="sm" fontWeight="bold">
                {userName}
              </Text>
            )}
            <Box w={"full"} overflow={"auto"}>
              {message.type === "message" && (
                <MessageContent message={message} key={`message${index}`} />
              )}
              {message.type !== "message" && (
                <CodeContent message={message} key={`message${index}`} />
              )}
            </Box>
          </VStack>
        </Flex>
      );
    })}
  </VStack>
);

export default ChatView;

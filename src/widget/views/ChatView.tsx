import { Avatar, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import useMessages from "@hooks/useMessages";
import MOCK_CHAT from "@shared/mock/chat";
import { IMessage } from "@shared/types";
import { removeCodeBlocksFromString } from "@shared/utils";

function Message({ message }: { message: IMessage }) {
  return (
    <Flex dir="row" w="full" p={2}>
      <Avatar
        size="sm"
        name={message.role === "user" ? "You" : "Visualization Assistant"}
      />
      <VStack align="flex-start" ml={2}>
        <Text as={"p"} fontSize="sm" fontWeight="bold">
          {message.role === "user" ? "You" : "Visualization Assistant"}
        </Text>
        <Text
          as={"p"}
          fontSize="sm"
          whiteSpace={"pre-line"}
          lineHeight={"20px"}
        >
          {removeCodeBlocksFromString(message.content)}
        </Text>
      </VStack>
    </Flex>
  );
}

export default function ChatView() {
  const { messages } = useMessages();
  return (
    <VStack
      overflow={"auto"}
      flexDir={"column-reverse"}
      // scroll bar background color transparent, width 8px, auto hide
      css={{
        "&::-webkit-scrollbar": {
          backgroundColor: "transparent",
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "rgba(0,0,0, 0.1)",
        },
      }}
    >
      {messages.map((_, index) => (
        <>
          <Message message={messages[messages.length - index - 1]} />
          {index < MOCK_CHAT.length - 1 && <Divider color={"gray.200"} />}
        </>
      ))}
    </VStack>
  );
}

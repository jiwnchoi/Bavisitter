import { Avatar, Divider, Flex, Spacer, Text, VStack } from "@chakra-ui/react";
import { IMessage } from "@shared/types";
import { replaceJSONCodeBlocks } from "@shared/utils";

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
          {replaceJSONCodeBlocks(message.content)}
        </Text>
      </VStack>
    </Flex>
  );
}

interface IChatViewProps {
  stream: IMessage;
  messages: IMessage[];
}

export default function ChatView({ stream, messages }: IChatViewProps) {
  return (
    <VStack
      w={"full"}
      h={"full"}
      overflow={"auto"}
      flexDir={"column"}
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
      {messages.map((message, index) => (
        <>
          <Message message={message} />
          {index < messages.length - 1 && <Divider color={"gray.200"} />}
        </>
      ))}
      {"content" in stream && (
        <>
          <Divider color={"gray.200"} />
          <Message message={stream} />
        </>
      )}
    </VStack>
  );
}

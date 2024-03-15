import { Avatar, Divider, Flex, Text, VStack } from "@chakra-ui/react";
import MOCK_CHAT from "@shared/mock/chat";
import { IMessage } from "@shared/types";
import { removeCodeBlocksFromString } from "@shared/utils";

function Message({ role, content }: IMessage) {
  return (
    <Flex dir="row" w="full" p={2}>
      <Avatar
        size="sm"
        name={role === "user" ? "You" : "Visualization Assistant"}
      />
      <VStack align="flex-start" ml={2}>
        <Text as={"p"} fontSize="sm" fontWeight="bold">
          {role === "user" ? "You" : "Visualization Assistant"}
        </Text>
        <Text
          as={"p"}
          fontSize="sm"
          whiteSpace={"pre-line"}
          lineHeight={"20px"}
        >
          {content}
        </Text>
      </VStack>
    </Flex>
  );
}

export default function ChatView() {
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
      {MOCK_CHAT.reverse().map(({ role: type, content }, index) => (
        <>
          <Message role={type} content={removeCodeBlocksFromString(content)} />
          {index < MOCK_CHAT.length - 1 && <Divider color={"gray.200"} />}
        </>
      ))}
    </VStack>
  );
}

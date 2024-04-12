import { Flex, IconButton } from "@chakra-ui/react";
import { useColorMode, useMessages } from "@hooks";
import { useMessageStore } from "@stores";
import { FaArrowDown } from "react-icons/fa";
import Content from "./Content";

const Messages = () => {
  const { colorMode } = useColorMode();
  const messages = useMessageStore((state) => state.messages);
  const { chatBoxRef, chatBoxAtBottom, scrollToBottom } = useMessages();

  return (
    <Flex
      w={"full"}
      h={"full"}
      overflowY={"auto"}
      flexDir={"column"}
      gap={8}
      p={4}
      ref={chatBoxRef}
      css={{
        "&::-webkit-scrollbar": {
          backgroundColor: "transparent",
          width: "8px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor:
            colorMode === "light"
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.1)",
        },
      }}
    >
      {messages.map((_, index) => (
        <Content key={index} index={index} />
      ))}
      {!chatBoxAtBottom && (
        <IconButton
          icon={<FaArrowDown />}
          onClick={scrollToBottom}
          position="absolute"
          bottom="104"
          left="calc(50% - 200px)"
          zIndex="1"
          aria-label={"scroll to bottom"}
        />
      )}
    </Flex>
  );
};

export default Messages;

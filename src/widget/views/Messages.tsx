import { Flex, FlexProps, IconButton, useColorMode } from "@chakra-ui/react";
import { useMessages } from "@hooks";
import { useMessageStore } from "@stores";
import { FaArrowDown } from "react-icons/fa";
import Content from "./Content";
import RevisionContent from "./RevisionContent";

const Messages = (props: FlexProps) => {
  const { colorMode } = useColorMode();
  const messages = useMessageStore((state) => state.messages);
  const { chatBoxRef, chatBoxAtBottom, scrollToBottom } = useMessages();

  return (
    <Flex
      {...props}
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
      <RevisionContent scrollToBottom={scrollToBottom} />
      {!chatBoxAtBottom && (
        <IconButton
          icon={<FaArrowDown />}
          onClick={() => {
            scrollToBottom("smooth");
          }}
          position="absolute"
          bottom={4}
          left={`calc((100% - 500px) / 2)`}
          zIndex={100}
          aria-label={"scroll to bottom"}
        />
      )}
    </Flex>
  );
};

export default Messages;

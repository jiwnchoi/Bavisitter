import { Flex, IconButton } from "@chakra-ui/react";
import { FaArrowDown } from "react-icons/fa";
import { useColorMode } from "@hooks";
import { IMessageWithRef } from "@shared/types";
import { RefObject } from "react";
import Content from "./Content";

interface IChatViewProps {
  messagesWithRef: IMessageWithRef[];
  chatBoxRef: RefObject<HTMLDivElement>;
  streaming: boolean;
  scrollToBottom: () => void;
  chatBoxAtBottom: boolean | null;
}

const Messages = ({
  messagesWithRef,
  chatBoxRef,
  streaming,
  scrollToBottom,
  chatBoxAtBottom,
}: IChatViewProps) => {
  const { colorMode } = useColorMode();
  return (
    <Flex
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
          backgroundColor:
            colorMode === "light"
              ? "rgba(0, 0, 0, 0.1)"
              : "rgba(255, 255, 255, 0.1)",
        },
      }}
      ref={chatBoxRef}
    >
      {messagesWithRef.map((_, index) => (
        <Content
          key={index}
          index={index}
          messagesWithRef={messagesWithRef}
          streaming={streaming}
        />
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

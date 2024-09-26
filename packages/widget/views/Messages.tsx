import { Flex, type FlexProps, IconButton, useColorMode } from "@chakra-ui/react";
import type { IMessageWithRef } from "@shared/types";
import { FaArrowDown } from "react-icons/fa";
import Content from "./Content";
import RevisionContent from "./RevisionContent";

interface IMessagesProps extends FlexProps {
  messages: IMessageWithRef[];
  chatBoxRef: React.RefObject<HTMLDivElement>;
  chatBoxAtBottom: boolean;
  scrollToBottom: (behavior?: ScrollBehavior) => void;
}

const Messages = ({
  messages,
  chatBoxRef,
  chatBoxAtBottom,
  scrollToBottom,
  ...props
}: IMessagesProps) => {
  const { colorMode } = useColorMode();

  return (
    <Flex {...props} ref={chatBoxRef}>
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
          left={"calc((100% - 500px) / 2)"}
          zIndex={100}
          aria-label={"scroll to bottom"}
          opacity={colorMode === "light" ? 0.6 : 0.8}
        />
      )}
    </Flex>
  );
};

export default Messages;

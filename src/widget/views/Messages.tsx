import { Flex } from "@chakra-ui/react";
import { useColorMode } from "@hooks";
import { IMessageWithRef } from "@shared/types";
import { RefObject } from "react";
import Content from "./Content";

interface IChatViewProps {
  messagesWithRef: IMessageWithRef[];
  chatBoxRef: RefObject<HTMLDivElement>;
  streaming: boolean;
  setCurrentChartIndex: (index: number) => void;
}

const Messages = ({
  messagesWithRef,
  chatBoxRef,
  streaming,
  setCurrentChartIndex,
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
          setCurrentChartIndex={setCurrentChartIndex}
        />
      ))}
    </Flex>
  );
};

export default Messages;

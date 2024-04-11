import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useContent } from "@hooks";
import { IMessageWithRef } from "@shared/types";
import CodeContent from "./CodeContent";
import MessageContent from "./MessageContent";

type IContentProps = {
  index: number;
  messagesWithRef: IMessageWithRef[];
  streaming: boolean;
  setCurrentChart: (index: number) => void;
};

export default function Content({
  index,
  messagesWithRef,
  streaming,
  setCurrentChart,
}: IContentProps) {
  const {
    userName,
    contentWithoutCodeblock,
    streamingMessage,
    format,
    type,
    ref,
    chartContent,
  } = useContent(messagesWithRef, index, streaming);

  return (
    <Flex direction="row" w="full" key={`content${index}`}>
      <Box minW={"32px"}>
        {userName && <Avatar size="sm" name={userName} />}
      </Box>
      <Flex direction="column" width="full" align="flex-start" ml={2} gap={2}>
        {userName && (
          <Text as={"p"} fontSize="sm" fontWeight="bold">
            {userName}
          </Text>
        )}
        <Box w={"full"} overflow={"auto"} ref={ref}>
          {type === "message" ? (
            <MessageContent
              content={contentWithoutCodeblock}
              key={`message${index}`}
            />
          ) : (
            <CodeContent
              index={index}
              content={contentWithoutCodeblock}
              chartContent={chartContent}
              format={format}
              key={`message${index}`}
              streamingMessage={streamingMessage}
              setCurrentChart={setCurrentChart}
            />
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

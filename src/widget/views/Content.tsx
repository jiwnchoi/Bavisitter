import { Avatar, Box, Button, Flex, Text, VStack } from "@chakra-ui/react";
import { useContent } from "@hooks";
import { IMessageWithRef } from "@shared/types";
import CodeContent from "./CodeContent";
import MessageContent from "./MessageContent";

type IContentProps = {
  index: number;
  messagesWithRef: IMessageWithRef[];
  streaming: boolean;
  setCurrentChartIndex: (index: number) => void;
};

export default function Content({
  index,
  messagesWithRef,
  streaming,
  setCurrentChartIndex,
}: IContentProps) {
  const {
    userName,
    contentWithoutCodeblock,
    streamingMessage,
    format,
    codeBlockExistance,
    type,
    ref,
  } = useContent(messagesWithRef, index, streaming);
  return (
    <Flex dir="row" w="full" key={`content${index}`}>
      <Box minW={"32px"}>
        {userName && <Avatar size="sm" name={userName} />}
      </Box>
      <VStack align="flex-start" ml={2} gap={2}>
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
              content={contentWithoutCodeblock}
              format={format}
              key={`message${index}`}
            />
          )}
        </Box>
        {codeBlockExistance && (
          <Button
            colorScheme="gray"
            size="sm"
            variant="solid"
            onClick={() => setCurrentChartIndex(index)}
            isLoading={streamingMessage}
            loadingText="Loading"
            mt={4}
          >
            Show Chart
          </Button>
        )}
      </VStack>
    </Flex>
  );
}

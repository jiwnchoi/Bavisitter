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
    codeBlocks,
    streamingMessage,
    //content,
    format,
    codeBlockExistance,
    type,
    ref,
    showCodeBlocks, 
    toggleCodeBlocks, 
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
        <Flex gap={2} w="full">
          {codeBlockExistance && (
            <Button
              colorScheme="gray"
              size="sm"
              variant="solid"
              onClick={() => setCurrentChartIndex(index)}
              isLoading={streamingMessage}
              loadingText="Loading"
            >
              Show Chart
            </Button>
          )}
          {codeBlockExistance && (
            <Button
              colorScheme="gray"
              size="sm"
              variant="solid"
              onClick={toggleCodeBlocks}
            >
              {showCodeBlocks ? "Hide Specification" : "Show Specification"}
            </Button>
          )}
        </Flex>
        {showCodeBlocks && (
          <CodeContent
            content={codeBlocks}
            format="json"
            key={`message${index}`}
          />
        )}
        
      </VStack>
    </Flex>
  );
}

import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { useContent } from "@hooks";
import CodeContent from "./CodeContent";
import MessageContent from "./MessageContent";
import { PropsWithChildren } from "react";

type IContentProps = {
  index: number;
};

export default function Content({ index }: PropsWithChildren<IContentProps>) {
  const {
    userName,
    contentWithoutCodeblock,
    streamingMessage,
    format,
    type,
    ref,
    chartContent,
  } = useContent(index);

  return (
    <Flex direction="row" maxW="full" key={`content${index}`}>
      <Box minW={"32px"}>
        {userName && <Avatar size="sm" name={userName} />}
      </Box>
      <Flex direction="column" width="full" align="flex-start" ml={2} gap={2}>
        {userName && (
          <Text as={"p"} fontSize="sm" fontWeight="bold">
            {userName}
          </Text>
        )}
        <Box w="full" overflow={"auto"} ref={ref}>
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
            />
          )}
        </Box>
      </Flex>
    </Flex>
  );
}

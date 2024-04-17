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
    contentIsVegaLite,
  } = useContent(index);

  return (
    <Flex direction="row" maxW="full" key={`content${index}`}>
      <Flex minW={"32px"}>
        {userName && <Avatar size="sm" name={userName} />}
      </Flex>
      <Flex direction="column" width="full" align="flex-start" ml={2} gap={2}>
        {userName && (
          <Text as={"p"} fontSize="sm" fontWeight="bold">
            {userName}
          </Text>
        )}
        <Flex w="full" overflow={"auto"} ref={ref}>
          {type === "message" ? (
            <MessageContent
              content={contentWithoutCodeblock}
              key={`message${index}`}
            />
          ) : (
            <CodeContent
              index={index}
              content={contentWithoutCodeblock}
              contentIsVegaLite={contentIsVegaLite}
              format={format}
              key={`message${index}`}
              streamingMessage={streamingMessage}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

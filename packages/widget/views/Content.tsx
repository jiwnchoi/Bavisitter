import { Avatar, Flex, Icon, Text } from "@chakra-ui/react";
import { useContent } from "@hooks";
import CodeContent from "./CodeContent";
import MessageContent from "./MessageContent";

type ContentProps = {
  index: number;
};

export default function Content({ index: messageIndex }: ContentProps) {
  const {
    userName,
    avatarColor,
    avatarIcon,
    contentWithoutCodeblock,
    streamingMessage,
    format,
    type,
    ref,
    contentIsVegaLite,
  } = useContent(messageIndex);

  return (
    <Flex direction="row" maxW="full" key={`content${messageIndex}`}>
      <Flex minW="32px">
        {userName && (
          <Avatar size="sm" bgColor={avatarColor} icon={<Icon as={avatarIcon} boxSize={5} />} />
        )}
      </Flex>
      <Flex direction="column" width="full" align="flex-start" ml={2} gap={2}>
        {userName && (
          <Text as="p" fontSize="sm" fontWeight="bold">
            {userName}
          </Text>
        )}
        <Flex w="full" overflow="auto" ref={ref}>
          {type === "message" ? (
            <MessageContent content={contentWithoutCodeblock} />
          ) : (
            <CodeContent
              chatIndex={messageIndex}
              content={contentWithoutCodeblock}
              contentIsVegaLite={contentIsVegaLite}
              format={format}
              streamingMessage={streamingMessage}
            />
          )}
        </Flex>
      </Flex>
    </Flex>
  );
}

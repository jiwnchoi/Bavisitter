import { useModelState } from "@anywidget/react";
import { Box, Button, Flex, Text } from "@chakra-ui/react";
import { IMessage } from "@shared/types";
import { replaceJSONCodeBlocks } from "@shared/utils";
import Markdown from "react-markdown";

interface IMessageContentProps {
  message: IMessage;
}
export default function MessageContent({ message }: IMessageContentProps) {
  const replacedMessage = replaceJSONCodeBlocks(message.content);
  const [streaming] = useModelState<boolean>("streaming");
  return (
    <Box dir="column" w="full">
      <Text as={"p"} fontSize="sm" whiteSpace={"pre-line"} lineHeight={"18px"}>
        {message.type === "message" && (
          <Markdown
            components={{
              li: ({ node, ...props }) => (
                <li style={{ marginLeft: 20 }} {...props} />
              ),
            }}
          >
            {replacedMessage}
          </Markdown>
        )}
      </Text>
      {replacedMessage !== message.content && (
        <Button
          mt={4}
          size="xs"
          colorScheme="gray"
          variant="solid"
          isLoading={streaming}
        >
          {streaming ? "Generating..." : "Load Visualization"}
        </Button>
      )}
    </Box>
  );
}

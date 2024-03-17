import { Flex, Text } from "@chakra-ui/react";
import { IMessage } from "@shared/types";
import { replaceJSONCodeBlocks } from "@shared/utils";
import Markdown from "react-markdown";

export default function MessageContent({ message }: { message: IMessage }) {
  return (
    <Flex dir="row" w="full">
      <Text as={"p"} fontSize="sm" whiteSpace={"pre-line"} lineHeight={"18px"}>
        {message.type === "message" && (
          <Markdown
            components={{
              li: ({ node, ...props }) => (
                <li style={{ marginLeft: 20 }} {...props} />
              ),
            }}
          >
            {replaceJSONCodeBlocks(message.content)}
          </Markdown>
        )}
      </Text>
    </Flex>
  );
}

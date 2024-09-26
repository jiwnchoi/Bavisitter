import { Flex, Text } from "@chakra-ui/react";
import { memo } from "react";
import Markdown from "react-markdown";

interface IMessageContentProps {
  content: string;
}
function MessageContent({ content }: IMessageContentProps) {
  return (
    <Flex flexDir="column" w="full">
      <Text as={"p"} fontSize="sm" whiteSpace={"pre-line"} lineHeight={"18px"}>
        <Markdown
          components={{
            ol: (props) => (
              <ol
                style={{
                  lineHeight: "8px",
                }}
                {...props}
              />
            ),
            ul: (props) => (
              <ul
                style={{
                  lineHeight: "8px",
                }}
                {...props}
              />
            ),

            li: (props) => (
              <li
                style={{
                  marginLeft: 20,
                  lineHeight: "18px",
                }}
                {...props}
              />
            ),
          }}>
          {content}
        </Markdown>
      </Text>
    </Flex>
  );
}

export default memo(MessageContent);

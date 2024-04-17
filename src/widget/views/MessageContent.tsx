import { Flex, Text } from "@chakra-ui/react";
import Markdown from "react-markdown";

interface IMessageContentProps {
  content: string;
}
export default function MessageContent({ content }: IMessageContentProps) {
  return (
    <Flex flexDir="column" w="full">
      <Text as={"p"} fontSize="sm" whiteSpace={"pre-line"} lineHeight={"18px"}>
        <Markdown
          components={{
            ol: ({ node, ...props }) => (
              <ol
                style={{
                  lineHeight: "8px",
                }}
                {...props}
              />
            ),
            ul: ({ node, ...props }) => (
              <ul
                style={{
                  lineHeight: "8px",
                }}
                {...props}
              />
            ),

            li: ({ node, ...props }) => (
              <li
                style={{
                  marginLeft: 20,
                  lineHeight: "18px",
                }}
                {...props}
              />
            ),
          }}
        >
          {content}
        </Markdown>
      </Text>
    </Flex>
  );
}

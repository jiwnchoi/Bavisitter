import { Box, Button, Flex, Icon, Text } from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { FaCopy } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import oneDark from "react-syntax-highlighter/dist/cjs/styles/prism/one-dark";

const globalScrollbarStyles = css`
  *::-webkit-scrollbar {
    height: 8px;
  }

  *::-webkit-scrollbar-thumb {
    background-color: #505661;
    border-radius: 8px;
  }

  *::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

interface ICodeContentProps {
  content: string;
  format?: string;
}

export default function CodeContent({ content, format }: ICodeContentProps) {
  return (
    <Box dir="row" w="600px" gap={0} borderRadius={8} overflow={"clip"}>
      <Flex
        dir="column"
        w="full"
        justify={"space-between"}
        backgroundColor={"#505661"}
      >
        <Text
          as={"p"}
          fontSize="sm"
          whiteSpace={"pre-line"}
          lineHeight={"18px"}
          color={"#ABB1BF"}
          px={4}
          py={2}
        >
          {format ?? "console"}
        </Text>
        <Button
          color={"#ABB1BF"}
          size="sm"
          fontWeight={"light"}
          variant="link"
          px={4}
          py={2}
          leftIcon={<Icon as={FaCopy} />}
          onClick={() => {
            navigator.clipboard.writeText(content);
          }}
          alignSelf={"flex-end"}
        >
          Copy code
        </Button>
      </Flex>
      <Global styles={globalScrollbarStyles} />
      <SyntaxHighlighter
        language={format}
        style={oneDark}
        customStyle={{
          borderRadius: 0,
          margin: 0,
        }}
      >
        {content}
      </SyntaxHighlighter>
    </Box>
  );
}

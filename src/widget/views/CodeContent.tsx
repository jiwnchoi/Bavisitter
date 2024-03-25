import {
  Box,
  Button,
  Collapse,
  Flex,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { useMemo, useState } from "react";
import { FaAngleDown, FaAngleUp, FaChartBar, FaCopy } from "react-icons/fa6";
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
  index: number;
  content: string;
  format?: string;
  streamingMessage: boolean;
  setCurrentChartIndex: (index: number) => void;
}

export default function CodeContent({
  index,
  content,
  format,
  streamingMessage,
  setCurrentChartIndex,
}: ICodeContentProps) {
  if (!format) {
    format = "console";
  }
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: !["json", "html"].includes(format),
  });

  const chartContent = useMemo(() => {
    return format === "json" && content.includes("$schema");
  }, [content, format]);

  return (
    <Box dir="row" w="600px" gap={0} borderRadius={8} overflow={"clip"}>
      <Flex
        dir="column"
        w="full"
        justify={"space-between"}
        backgroundColor={"#505661"}
      >
        <Flex>
          <IconButton
            color={"#ABB1BF"}
            size="sm"
            fontWeight={"light"}
            variant="link"
            py={2}
            icon={<Icon as={isOpen ? FaAngleUp : FaAngleDown} />}
            aria-label="Fold"
            onClick={() => {
              onToggle();
            }}
            alignSelf={"flex-end"}
          />
          <Text
            as={"p"}
            fontSize="sm"
            whiteSpace={"pre-line"}
            lineHeight={"18px"}
            color={"#ABB1BF"}
            py={2}
          >
            {chartContent ? "Vega-Lite" : format}
          </Text>
        </Flex>

        <Flex>
          {chartContent && (
            <Button
              color={"#ABB1BF"}
              size="sm"
              fontWeight={"light"}
              variant="link"
              px={1}
              py={2}
              leftIcon={<Icon as={FaChartBar} />}
              onClick={() => {
                setCurrentChartIndex(index);
              }}
              alignSelf={"flex-end"}
              isLoading={streamingMessage}
              loadingText={"Loading..."}
            >
              Load Chart
            </Button>
          )}
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
            Copy Code
          </Button>
        </Flex>
      </Flex>
      <Collapse in={isOpen} animateOpacity unmountOnExit>
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
      </Collapse>
    </Box>
  );
}

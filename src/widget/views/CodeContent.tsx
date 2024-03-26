import {
  Box,
  Button,
  ButtonProps,
  Collapse,
  Flex,
  Icon,
  Spacer,
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
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
  format: string;
  streamingMessage: boolean;
  chartContent: boolean;
  setCurrentChartIndex: (index: number) => void;
}

function CodeBlockButton(proos: ButtonProps) {
  return (
    <Button
      color={"#ABB1BF"}
      size="xs"
      fontWeight={"light"}
      variant="link"
      py={2}
      px={2}
      _hover={{ textDecoration: "none" }}
      {...proos}
    >
      {proos.children}
    </Button>
  );
}

export default function CodeContent({
  index,
  content,
  format,
  streamingMessage,
  chartContent,
  setCurrentChartIndex,
}: ICodeContentProps) {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  });

  return (
    <Box dir="row" w={"full"} gap={0} borderRadius={8} overflow={"clip"}>
      <Flex
        dir="column"
        w="full"
        backgroundColor={"#505661"}
        px={2}
        onClick={onToggle}
      >
        <CodeBlockButton
          leftIcon={
            streamingMessage ? (
              <Spinner size="xs" />
            ) : (
              <Icon as={isOpen ? FaAngleUp : FaAngleDown} />
            )
          }
        >
          {chartContent ? "Vega-Lite" : format}
        </CodeBlockButton>
        <Spacer />
        {chartContent && !streamingMessage && (
          <CodeBlockButton
            leftIcon={<Icon as={FaChartBar} />}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentChartIndex(index);
            }}
          >
            Load Chart
          </CodeBlockButton>
        )}
        <CodeBlockButton
          leftIcon={<Icon as={FaCopy} />}
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(content);
          }}
        >
          Copy Code
        </CodeBlockButton>
      </Flex>
      <Collapse in={isOpen} animateOpacity unmountOnExit>
        <Global styles={globalScrollbarStyles} />
        <SyntaxHighlighter
          language={format}
          style={oneDark}
          customStyle={{
            borderRadius: 0,
            margin: 0,
            overflow: "auto",
          }}
        >
          {content}
        </SyntaxHighlighter>
      </Collapse>
    </Box>
  );
}

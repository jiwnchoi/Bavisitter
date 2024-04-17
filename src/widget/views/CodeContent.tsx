import {
  Button,
  ButtonProps,
  Collapse,
  Flex,
  Icon,
  Spacer,
  Spinner,
  useColorMode,
  useDisclosure,
} from "@chakra-ui/react";
import { Global, css } from "@emotion/react";
import { useChartStore } from "@stores";
import { useRef } from "react";
import { FaAngleDown, FaAngleUp, FaChartBar, FaCopy } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  coldarkCold,
  coldarkDark,
} from "react-syntax-highlighter/dist/esm/styles/prism";

const globalScrollbarStyles = css`
  *::-webkit-scrollbar {
    height: 8px;
  }

  *::-webkit-scrollbar-thumb {
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
  contentIsVegaLite: boolean;
}
function CodeBlockButton(proos: ButtonProps) {
  const { colorMode } = useColorMode();
  return (
    <Button
      color={colorMode === "light" ? "gray.600" : "gray.400"}
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
  contentIsVegaLite,
}: ICodeContentProps) {
  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: false,
  });
  const setCurrentChartByChatIndex = useChartStore(
    (state) => state.setCurrentChartByChatIndex,
  );
  const { colorMode } = useColorMode();
  const ref = useRef<HTMLDivElement>(null);

  return (
    <Flex
      flexDir="column"
      w={"full"}
      maxW={"100%"}
      gap={0}
      borderRadius={8}
      overflow={"auto"}
      ref={ref}
    >
      <Flex
        flexDir="row"
        w="full"
        backgroundColor={colorMode === "dark" ? "gray.700" : "gray.100"}
        px={2}
        onClick={onToggle}
        _hover={{ cursor: "pointer" }}
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
          {contentIsVegaLite ? "Vega-Lite" : format}
        </CodeBlockButton>
        <Spacer />
        {contentIsVegaLite && !streamingMessage && (
          <CodeBlockButton
            leftIcon={<Icon as={FaChartBar} />}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentChartByChatIndex(index);
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
          wrapLongLines={false}
          style={colorMode === "light" ? coldarkCold : coldarkDark}
          customStyle={{
            borderRadius: 0,
            margin: 0,
            overflow: "auto",
            wordBreak: "break-all",
            whiteSpace: "pre-wrap",
            maxWidth: ref.current?.clientWidth,
          }}
        >
          {content}
        </SyntaxHighlighter>
      </Collapse>
    </Flex>
  );
}

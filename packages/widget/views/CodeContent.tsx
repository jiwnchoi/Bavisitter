import {
  Button,
  type ButtonProps,
  Collapse,
  Flex,
  Icon,
  Spacer,
  Spinner,
  useColorMode,
} from "@chakra-ui/react";
import { useCodeContent } from "@hooks";
import { FaAngleDown, FaAngleUp, FaChartBar, FaCopy } from "react-icons/fa6";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { coldarkCold, coldarkDark } from "react-syntax-highlighter/dist/esm/styles/prism";

interface ICodeContentProps {
  chatIndex: number;
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
      {...proos}>
      {proos.children}
    </Button>
  );
}
function CodeContent({
  chatIndex: chatIndex,
  content,
  format,
  streamingMessage,
  contentIsVegaLite,
}: ICodeContentProps) {
  const { colorMode } = useColorMode();
  const { codeBlockRef, onToggle, isOpen } = useCodeContent(chatIndex);

  return (
    <Flex
      flexDir="column"
      w={"full"}
      maxW={"100%"}
      gap={0}
      borderRadius={8}
      overflow={"auto"}
      ref={codeBlockRef}>
      <Flex
        flexDir="row"
        w="full"
        backgroundColor={colorMode === "dark" ? "gray.700" : "gray.100"}
        px={2}
        onClick={onToggle}
        _hover={{ cursor: "pointer" }}>
        <CodeBlockButton
          leftIcon={
            streamingMessage ? (
              <Spinner size="xs" />
            ) : (
              <Icon as={isOpen ? FaAngleUp : FaAngleDown} />
            )
          }>
          {contentIsVegaLite ? "Vega-Lite" : format}
        </CodeBlockButton>
        <Spacer />
        {contentIsVegaLite && !streamingMessage && (
          <CodeBlockButton
            leftIcon={<Icon as={FaChartBar} />}
            onClick={(e) => {
              e.stopPropagation();
              // setCurrentChartByChatIndex(chatIndex);
            }}>
            Load Chart
          </CodeBlockButton>
        )}
        <CodeBlockButton
          leftIcon={<Icon as={FaCopy} />} // Copied 추가
          onClick={(e) => {
            e.stopPropagation();
            navigator.clipboard.writeText(content);
          }}>
          Copy Code
        </CodeBlockButton>
      </Flex>
      <Collapse in={isOpen} unmountOnExit>
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
            maxWidth: codeBlockRef.current?.clientWidth,
          }}>
          {content}
        </SyntaxHighlighter>
      </Collapse>
    </Flex>
  );
}

export default CodeContent;

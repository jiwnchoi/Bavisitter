import { useDisclosure } from "@chakra-ui/react";
import { useChartStore, useMessageStore } from "@stores";
import { useEffect, useRef } from "react";

function useCodeContent(index: number) {
  const openedCodeBlockIndices = useMessageStore(state => state.openedCodeBlockIndices);
  const toggleCodeBlock = useMessageStore(state => state.toggleCodeBlock(index));

  const setCurrentChartByChatIndex = useChartStore(state => state.setCurrentChartByChatIndex);
  const ref = useRef<HTMLDivElement>(null);

  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: openedCodeBlockIndices.includes(index),
  });

  useEffect(() => {
    toggleCodeBlock(isOpen);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen !== openedCodeBlockIndices.includes(index)) {
      onToggle();
    }
  }, [openedCodeBlockIndices]);

  return {
    ref,
    onToggle,
    isOpen,
    setCurrentChartByChatIndex,
    toggleCodeBlock,
  };
}

export default useCodeContent;

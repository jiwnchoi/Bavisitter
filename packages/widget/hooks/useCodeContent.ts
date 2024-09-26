import { useDisclosure } from "@chakra-ui/react";
import { useChartStore, useMessageStore } from "@stores";
import { useEffect, useMemo, useRef } from "react";

function useCodeContent(index: number) {
  const openedCodeBlockIndices = useMessageStore((state) => state.openedCodeBlockIndices);
  const toggleCodeBlockBase = useMessageStore((state) => state.toggleCodeBlock);

  const toggleCodeBlock = useMemo(() => toggleCodeBlockBase(index), [index, toggleCodeBlockBase]);

  const setCurrentChartByChatIndex = useChartStore((state) => state.setCurrentChartByChatIndex);
  const ref = useRef<HTMLDivElement>(null);

  const { isOpen, onToggle } = useDisclosure({
    defaultIsOpen: openedCodeBlockIndices.includes(index),
  });

  useEffect(() => {
    toggleCodeBlock(isOpen);
  }, [isOpen, toggleCodeBlock]);

  useEffect(() => {
    if (isOpen !== openedCodeBlockIndices.includes(index)) {
      onToggle();
    }
  }, [index, isOpen, onToggle, openedCodeBlockIndices]);

  return {
    ref,
    onToggle,
    isOpen,
    setCurrentChartByChatIndex,
    toggleCodeBlock,
  };
}

export default useCodeContent;

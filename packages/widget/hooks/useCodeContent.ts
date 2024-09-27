import { useInteractionStore } from "@stores";
import { useCallback, useMemo, useRef } from "react";

function useCodeContent(chatIndex: number) {
  const setCodeBlockOpened = useInteractionStore((state) => state.setCodeBlockOpened);
  const openedCodeBlockIndices = useInteractionStore((state) => state.openedCodeBlockIndices);

  const codeBlockRef = useRef<HTMLDivElement>(null);

  const isOpen = useMemo(
    () => openedCodeBlockIndices.includes(chatIndex),
    [chatIndex, openedCodeBlockIndices],
  );
  const onToggle = useCallback(() => {
    setCodeBlockOpened(chatIndex, !isOpen);
  }, [chatIndex, isOpen, setCodeBlockOpened]);

  return {
    codeBlockRef,
    onToggle,
    isOpen,
  };
}

export default useCodeContent;

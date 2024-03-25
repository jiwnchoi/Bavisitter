import { IMessageWithRef } from "@shared/types";
import { splitCodeBlockAndContent } from "@shared/utils";
import { useMemo, useState } from "react";


export default function useContent(
  messagesWithRef: IMessageWithRef[],
  index: number,
  streaming: boolean,
) {
  const userName = useMemo(() => {
    const previousMessage = index > 0 ? messagesWithRef[index - 1] : null;
    if (messagesWithRef[index].role === "user") {
      return "You";
    }
    if (previousMessage && previousMessage.role === "user") {
      return "Visualization Assistant";
    }
    if (previousMessage && previousMessage.role !== "user") {
      return null;
    }
    return null;
  }, [messagesWithRef, index]);
  
  const streamingMessage = useMemo(() => {
    return index === messagesWithRef.length - 1 && streaming;
  }, [messagesWithRef, index, streaming]);
  
  const [codeBlocks, contentWithoutCodeblock ] = useMemo(() => {
    return splitCodeBlockAndContent(messagesWithRef[index].content);
  }, [messagesWithRef, index]);

  const [showCodeBlocks, setShowCodeBlocks] = useState(false);
  const toggleCodeBlocks = () => setShowCodeBlocks(!showCodeBlocks);

  const content = messagesWithRef[index].content;

  const format = messagesWithRef[index].format;

  const type = messagesWithRef[index].type;

  const codeBlockExistance = contentWithoutCodeblock !== content;

  const ref = messagesWithRef[index].ref;

  return {
    userName,
    contentWithoutCodeblock,
    codeBlocks,
    streamingMessage,
    content,
    format,
    type,
    ref,
    codeBlockExistance,
    showCodeBlocks,
    toggleCodeBlocks,
  };
}

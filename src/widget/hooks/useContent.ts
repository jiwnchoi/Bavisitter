import { IMessageWithRef } from "@shared/types";
import { replaceJSONCodeBlocks } from "@shared/utils";
import { useMemo } from "react";

export default function useContent(
  messgagesWithRef: IMessageWithRef[],
  index: number,
  streaming: boolean,
) {
  const userName = useMemo(() => {
    const previousMessage = index > 0 ? messgagesWithRef[index - 1] : null;
    if (messgagesWithRef[index].role === "user") {
      return "You";
    }
    if (previousMessage && previousMessage.role === "user") {
      return "Visualization Assistant";
    }
    if (previousMessage && previousMessage.role !== "user") {
      return null;
    }
    return null;
  }, [messgagesWithRef, index]);

  const contentWithoutCodeblock = useMemo(() => {
    return replaceJSONCodeBlocks(messgagesWithRef[index].content);
  }, [messgagesWithRef, index]);

  const streamingMessage = useMemo(() => {
    return index === messgagesWithRef.length - 1 && streaming;
  }, [messgagesWithRef, index]);

  const content = messgagesWithRef[index].content;

  const format = messgagesWithRef[index].format;

  const type = messgagesWithRef[index].type;

  const codeBlockExistance = contentWithoutCodeblock !== content;

  const ref = messgagesWithRef[index].ref;

  return {
    userName,
    contentWithoutCodeblock,
    streamingMessage,
    content,
    format,
    type,
    ref,
    codeBlockExistance,
  };
}

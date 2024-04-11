import { IMessageWithRef } from "@shared/types";
import { replaceJSONCodeBlocks } from "@shared/utils";
import { useMemo } from "react";

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

  const streamingMessage = useMemo(
    () => index === messagesWithRef.length - 1 && streaming,
    [messagesWithRef, index, streaming],
  );

  const contentWithoutCodeblock = useMemo(
    () => replaceJSONCodeBlocks(messagesWithRef[index].content),
    [messagesWithRef, index],
  );

  const format = useMemo(
    () => messagesWithRef[index].format ?? "console",
    [messagesWithRef, index],
  );

  const chartContent = useMemo(
    () =>
      format === "json" && messagesWithRef[index].content.includes("$schema"),
    [format, messagesWithRef, index],
  );

  const type = messagesWithRef[index].type;

  const ref = messagesWithRef[index].ref;

  return {
    userName,
    contentWithoutCodeblock,
    streamingMessage,
    chartContent,
    format,
    type,
    ref,
  };
}

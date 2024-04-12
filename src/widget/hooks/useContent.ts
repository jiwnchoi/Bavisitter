import { replaceJSONCodeBlocks } from "@shared/utils";
import { useMessageStore } from "@stores";
import { useMemo } from "react";

export default function useContent(index: number) {
  const messages = useMessageStore((state) => state.messages);
  const streaming = useMessageStore((state) => state.streaming);

  const userName = useMemo(() => {
    const previousMessage = index > 0 ? messages[index - 1] : null;
    if (messages[index].role === "user") {
      return "You";
    }
    if (previousMessage && previousMessage.role === "user") {
      return "Visualization Assistant";
    }
    if (previousMessage && previousMessage.role !== "user") {
      return null;
    }
    return null;
  }, [messages, index]);

  const streamingMessage = useMemo(
    () => index === messages.length - 1 && streaming,
    [messages, index, streaming],
  );

  const contentWithoutCodeblock = useMemo(
    () => replaceJSONCodeBlocks(messages[index].content),
    [messages, index],
  );

  const format = useMemo(
    () => messages[index].format ?? "console",
    [messages, index],
  );

  const chartContent = useMemo(
    () => format === "json" && messages[index].content.includes("$schema"),
    [format, messages, index],
  );

  const type = messages[index].type;

  const ref = messages[index].ref;

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

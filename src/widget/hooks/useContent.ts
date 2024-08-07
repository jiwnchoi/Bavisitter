import type { IMessageWithRef } from "@shared/types";
import { isCodeVegaLite, replaceJSONCodeBlocks } from "@shared/utils";
import { useMessageStore } from "@stores";

const isUserMessageBySystem = (message: IMessageWithRef) =>
  message.role === "user" &&
  message.content.startsWith("**Current Vega Lite visualization has following issues");

export default function useContent(index: number) {
  const messages = useMessageStore(state => state.messages);
  const streaming = useMessageStore(state => state.streaming);

  const userName = (() => {
    const previousMessage = index > 0 ? messages[index - 1] : null;
    if (isUserMessageBySystem(messages[index])) {
      return "Bavisitter";
    }
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
  })();

  const streamingMessage = index === messages.length - 1 && streaming;

  const contentWithoutCodeblock = replaceJSONCodeBlocks(messages[index].content);

  const format = messages[index].format ?? "console";

  const contentIsVegaLite = isCodeVegaLite(messages[index]);

  const type = messages[index].type;

  const ref = messages[index].ref;

  return {
    userName,
    contentWithoutCodeblock,
    streamingMessage,
    contentIsVegaLite,
    format,
    type,
    ref,
  };
}

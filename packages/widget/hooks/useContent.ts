import type { IMessageWithRef } from "@shared/types";
import { isCodeVegaLite, replaceJSONCodeBlocks } from "@shared/utils";
import { BabyBottleIcon, RoboticIcon, UserQuestion01Icon } from "hugeicons-react";
import type { FC } from "react";
import useMessages from "./useMessagess";
import useStreaming from "./useStreaming";
type TUserNames = "You" | "Visualization Assistant" | "Bavisitter";

const avatarIcons: Record<TUserNames, FC> = {
  You: UserQuestion01Icon,
  Bavisitter: BabyBottleIcon,
  "Visualization Assistant": RoboticIcon,
};

const avatarColors: Record<TUserNames, string> = {
  You: "green.500",
  Bavisitter: "blue.500",
  "Visualization Assistant": "orange.500",
};

const isUserMessageBySystem = (message: IMessageWithRef) =>
  message.role === "user" &&
  message.content.startsWith("**Current Vega Lite visualization has following issues");

export default function useContent(chatIndex: number) {
  const { messages } = useMessages();
  const streaming = useStreaming();

  const userName: TUserNames = (() => {
    const previousMessage = chatIndex > 0 ? messages[chatIndex - 1] : null;
    if (isUserMessageBySystem(messages[chatIndex])) {
      return "Bavisitter";
    }
    if (messages[chatIndex].role === "user") {
      return "You";
    }
    if (previousMessage && previousMessage.role === "user") {
      return "Visualization Assistant";
    }
    return "You";
  })();

  const avatarColor = avatarColors[userName];
  const avatarIcon = avatarIcons[userName];

  const streamingMessage = chatIndex === messages.length - 1 && streaming;

  const contentWithoutCodeblock = replaceJSONCodeBlocks(messages[chatIndex].content);

  const format = messages[chatIndex].format ?? "console";

  const contentIsVegaLite = isCodeVegaLite(messages[chatIndex]);

  const type = messages[chatIndex].type;

  const ref = messages[chatIndex].ref;

  return {
    userName,
    avatarIcon,
    avatarColor,
    contentWithoutCodeblock,
    streamingMessage,
    contentIsVegaLite,
    format,
    type,
    ref,
  };
}

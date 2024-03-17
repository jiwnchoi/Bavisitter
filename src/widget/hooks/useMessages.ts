import { useModelState } from "@anywidget/react";
import { IChartSpec, IMessage } from "@shared/types";
import { extractCodeBlocksFromString } from "@shared/utils";
import { useCallback, useEffect, useMemo, useRef } from "react";

export default function useMessages() {
  const [messages, _setMessages] = useModelState<IMessage[]>("messages");
  const [streaming] = useModelState<boolean>("streaming");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = useCallback(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatBoxRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const appendUserMessage = useCallback(
    (message: IMessage) => {
      console.log([...messages, message]);
      _setMessages([...messages, message]);
    },
    [messages, _setMessages],
  );

  const clearUserMessages = useCallback(() => {
    _setMessages([]);
  }, [_setMessages]);

  const editUserMessage = useCallback(
    (index: number, message: IMessage) => {
      _setMessages([...messages.slice(0, index), message]);
    },
    [messages, _setMessages],
  );

  const specs = useMemo(() => {
    return messages
      .map((m, index) => ({
        chatIndex: index,
        spec: extractCodeBlocksFromString(m.content),
      }))
      .filter((m) => m.spec !== "")
      .map((m) => {
        const spec = JSON.parse(m.spec);
        spec.$schema = "https://vega.github.io/schema/vega-lite/v5.json";
        if (spec.data && spec.data.url === "artifacts/data.csv") {
          spec.data = { name: "table" };
        }
        spec.autosize = { type: "fit", contains: "padding" };
        return { ...m, spec } as IChartSpec;
      });
  }, [messages]);
  return {
    messages,
    streaming,
    specs,
    chatBoxRef,
    appendUserMessage,
    clearUserMessages,
    editUserMessage,
  };
}

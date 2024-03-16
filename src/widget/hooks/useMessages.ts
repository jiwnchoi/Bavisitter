import { useModelState } from "@anywidget/react";
import { IChartSpec, IMessage } from "@shared/types";
import { extractCodeBlocksFromString } from "@shared/utils";
import { useCallback, useMemo } from "react";

export default function useMessages() {
  const [messages, _setMessages] = useModelState<IMessage[]>("messages");
  const [stream] = useModelState<IMessage>("stream");

  const appendUserMessage = useCallback((message: IMessage) => {
    _setMessages([...messages, message]);
  }, []);

  const clearUserMessages = useCallback(() => {
    _setMessages([]);
  }, []);

  const editUserMessage = useCallback((index: number, message: IMessage) => {
    _setMessages([...messages.slice(0, index), message]);
  }, []);

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
        spec.data = { name: "table" };
        spec.autosize = { type: "fit", contains: "padding" };
        return { ...m, spec } as IChartSpec;
      });
  }, [messages]);
  $schema: "https://vega.github.io/schema/vega-lite/v5.json";
  return {
    messages,
    stream,
    specs,
    appendUserMessage,
    clearUserMessages,
    editUserMessage,
  };
}

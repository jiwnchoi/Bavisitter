import { useModelState } from "@anywidget/react";
import { IMessage } from "@shared/types";
import { extractCodeBlocksFromString } from "@shared/utils";
import { useCallback, useMemo } from "react";
import { VisualizationSpec } from "react-vega";

export default function useMessages() {
  const [messages, _setMessages] = useModelState<IMessage[]>("messages");
  const [streaming] = useModelState<boolean>("streaming");

  const appendUserMessage = useCallback((message: IMessage) => {
    _setMessages([...messages, message]);
  }, []);

  const clearUserMessages = useCallback(() => {
    _setMessages([]);
  }, []);

  const editUserMessage = useCallback((index: number, message: IMessage) => {
    _setMessages([...messages.slice(0, index), message]);
  }, []);

  const currentVisualization = useMemo<VisualizationSpec | null>(() => {
    const lastVisualization = messages.find(
      (message) => extractCodeBlocksFromString(message.content) !== "",
    );
    if (lastVisualization) {
      return JSON.parse(
        extractCodeBlocksFromString(lastVisualization.content),
      ) as VisualizationSpec;
    }
    return null;
  }, [messages]);

  return {
    messages,
    streaming,
    currentVisualization,
    appendUserMessage,
    clearUserMessages,
    editUserMessage,
  };
}

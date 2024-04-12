import { useModelState } from "@anywidget/react";
import { IMessage } from "@shared/types";
import { useMessageStore } from "@stores";
import { createRef, useEffect } from "react";
export function useModelMessage() {
  const [modelMessages, setModelMessages] =
    useModelState<IMessage[]>("messages");

  const appendUserMessage = (message: IMessage) => {
    setModelMessages([...modelMessages, message]);
  };

  const sendCurrentMessages = () => {
    setModelMessages([...modelMessages]);
  };

  const clearUserMessages = () => {
    setModelMessages([]);
  };

  const editUserMessage = (index: number, message: IMessage) => {
    setModelMessages([...modelMessages.slice(0, index), message]);
  };

  return {
    setModelMessages,
    appendUserMessage,
    editUserMessage,
    clearUserMessages,
    sendCurrentMessages,
  };
}

export function useModelMessageEffect() {
  const [modelMessages] = useModelState<IMessage[]>("messages");
  const [modelStreaming] = useModelState<boolean>("streaming");
  const setMessages = useMessageStore((state) => state.setMessages);
  const setStreaming = useMessageStore((state) => state.setStreaming);

  useEffect(() => {
    setMessages(
      modelMessages.map((m, i) => ({
        ...m,
        ref: createRef<HTMLDivElement>(),
        chatIndex: i,
      })),
    );
  }, [modelMessages]);

  useEffect(() => {
    setStreaming(modelStreaming);
  }, [modelStreaming]);
}

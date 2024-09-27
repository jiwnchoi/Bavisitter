import { useModelState } from "@anywidget/react";
import { type IMessage, type IMessageWithRef } from "@shared/types";
import { createRef, useMemo, type RefObject } from "react";

const refCache = new Map<string, RefObject<HTMLDivElement>>();

export default function useMessages() {
  const [modelMessages, setModelMessages] = useModelState<IMessage[]>("messages");

  const messages: IMessageWithRef[] = useMemo(() => {
    return modelMessages.map((m, i) => {
      const ref = refCache.get(`message-${i}`) ?? createRef<HTMLDivElement>();
      refCache.set(`message-${i}`, ref);
      return { ...m, ref, chatIndex: i };
    });
  }, [modelMessages]);

  const appendMessages = (messages: IMessage[]) => {
    setModelMessages([...modelMessages, ...messages]);
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
    messages,
    setModelMessages,
    appendMessages,
    editUserMessage,
    clearUserMessages,
    sendCurrentMessages,
  };
}

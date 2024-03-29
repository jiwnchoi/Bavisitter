import { useModelState } from "@anywidget/react";
import { IMessage, IMessageWithRef } from "@shared/types";
import { createRef, useCallback, useEffect, useMemo, useRef } from "react";

export default function useMessages() {
  const [messages, _setMessages] = useModelState<IMessage[]>("messages");
  const [streaming] = useModelState<boolean>("streaming");
  const chatBoxRef = useRef<HTMLDivElement>(null);

  const messagesWithRef = useMemo(() => {
    return messages.map((m) => {
      return { ...m, ref: createRef<HTMLDivElement>() } as IMessageWithRef;
    });
  }, [messages]);

  const scrollToBottom = useCallback(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [chatBoxRef]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const appendUserMessage = (message: IMessage) => {
    _setMessages([...messages, message]);
  };

  const sendCurrentMessages = () => {
    _setMessages([...messages]);
  };

  const clearUserMessages = () => {
    _setMessages([]);
  };

  const editUserMessage = (index: number, message: IMessage) => {
    _setMessages([...messages.slice(0, index), message]);
  };

  return {
    streaming,
    chatBoxRef,
    messagesWithRef,
    appendUserMessage,
    editUserMessage,
    clearUserMessages,
    sendCurrentMessages,
  };
}

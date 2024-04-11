import { useModelState } from "@anywidget/react";
import { IMessage, IMessageWithRef } from "@shared/types";
import {
  createRef,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

export default function useMessages() {
  const [messages, _setMessages] = useModelState<IMessage[]>("messages");
  const [streaming] = useModelState<boolean>("streaming");
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const [chatBoxAtBottom, _setChatBoxAtBottom] = useState<boolean | null>(true);

  const messagesWithRef = useMemo(() => {
    return messages.map((m, i) => {
      return {
        ...m,
        ref: createRef<HTMLDivElement>(),
        chatIndex: i,
      } as IMessageWithRef;
    });
  }, [messages]);

  const setChatBoxAtBottom = useCallback(() => {
    _setChatBoxAtBottom(
      chatBoxRef.current &&
        chatBoxRef.current.scrollHeight -
          chatBoxRef.current.scrollTop -
          chatBoxRef.current.clientHeight <=
          100,
    );
  }, [chatBoxRef, _setChatBoxAtBottom]);

  chatBoxRef.current?.addEventListener("scroll", setChatBoxAtBottom);

  const scrollToBottomIfNearBottom = useCallback(() => {
    if (chatBoxRef.current && chatBoxAtBottom) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatBoxRef, chatBoxAtBottom]);

  useEffect(scrollToBottomIfNearBottom, [messages]);

  const scrollToBottom = useCallback(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [chatBoxRef]);

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
    scrollToBottom,
    chatBoxAtBottom,
  };
}

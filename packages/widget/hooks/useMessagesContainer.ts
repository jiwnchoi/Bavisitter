import { useCallback, useEffect, useRef, useState } from "react";
import useMessages from "./useMessagess";

export default function useMessagesContainer() {
  const { messages } = useMessages();

  const chatBoxRef = useRef<HTMLDivElement>(null);

  const [chatBoxAtBottom, _setChatBoxAtBottom] = useState<boolean>(true);

  const scrollToBottom = useCallback((behavior: ScrollBehavior = "instant") => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior,
      });
    }
  }, []);

  useEffect(() => {
    const setChatBoxAtBottom = () => {
      _setChatBoxAtBottom(
        chatBoxRef.current !== null &&
          chatBoxRef.current.scrollHeight -
            chatBoxRef.current.scrollTop -
            chatBoxRef.current.clientHeight <=
            50,
      );
    };

    const current = chatBoxRef.current;
    if (current) {
      current.addEventListener("scroll", setChatBoxAtBottom);
      return () => current.removeEventListener("scroll", setChatBoxAtBottom);
    }
  }, []);

  useEffect(() => {
    if (chatBoxRef.current && chatBoxAtBottom) {
      scrollToBottom();
    }
  }, [chatBoxAtBottom, messages, scrollToBottom]);

  const scrollToContentByIndex = (chatIndex: number) => {
    const message = messages.find((m) => m.chatIndex === chatIndex);
    if (chatBoxRef.current && message?.ref.current) {
      chatBoxRef.current.scrollTo({
        top: message.ref.current.offsetTop - 32,
        behavior: "smooth",
      });
    }
  };

  return {
    chatBoxRef,
    chatBoxAtBottom,
    scrollToBottom,
    scrollToContentByIndex,
  };
}

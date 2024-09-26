import { useMessageStore } from "@stores";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useMessages() {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const messages = useMessageStore((state) => state.messages);
  const [chatBoxAtBottom, _setChatBoxAtBottom] = useState<boolean>(true);
  const scrollToBottom = useCallback((behavior: ScrollBehavior = "instant") => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
        behavior,
      });
    }
  }, []);
  const scrollToContentByIndex = useCallback(
    (chatIndex: number) => {
      const message = messages.find((m) => m.chatIndex === chatIndex);
      if (chatBoxRef.current && message && message.ref.current) {
        chatBoxRef.current.scrollTo({
          top: message.ref.current.offsetTop - 32,
          behavior: "smooth",
        });
      }
    },
    [messages],
  );

  useEffect(() => {
    const current = chatBoxRef.current;
    const setChatBoxAtBottom = () => {
      _setChatBoxAtBottom(
        current !== null && current.scrollHeight - current.scrollTop - current.clientHeight <= 50,
      );
    };

    if (current) {
      current.addEventListener("scroll", setChatBoxAtBottom);
      return () => current?.removeEventListener("scroll", setChatBoxAtBottom);
    }
  }, [chatBoxRef, _setChatBoxAtBottom]);

  useEffect(() => {
    const current = chatBoxRef.current;
    if (current && chatBoxAtBottom) {
      scrollToBottom();
    }
  }, [messages, chatBoxAtBottom, scrollToBottom]);

  return {
    chatBoxRef,
    chatBoxAtBottom,
    scrollToBottom,
    scrollToContentByIndex,
  };
}

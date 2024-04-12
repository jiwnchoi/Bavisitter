import { useMessageStore } from "@stores";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useMessages() {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const messages = useMessageStore((state) => state.messages);
  const [chatBoxAtBottom, _setChatBoxAtBottom] = useState<boolean>(true);

  const setChatBoxAtBottom = () => {
    _setChatBoxAtBottom(
      chatBoxRef.current !== null &&
        chatBoxRef.current.scrollHeight -
          chatBoxRef.current.scrollTop -
          chatBoxRef.current.clientHeight <=
          50,
    );
  };

  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.addEventListener("scroll", setChatBoxAtBottom);
      return () =>
        chatBoxRef.current?.removeEventListener("scroll", setChatBoxAtBottom);
    }
  }, [chatBoxRef, setChatBoxAtBottom]);

  const scrollToBottomIfNearBottom = useCallback(() => {
    if (chatBoxRef.current && chatBoxAtBottom) {
      chatBoxRef.current.scrollTo({
        top: chatBoxRef.current.scrollHeight,
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

  return {
    chatBoxRef,
    scrollToBottom,
    chatBoxAtBottom,
  };
}

import { useMessageStore } from "@stores";
import { useCallback, useEffect, useRef, useState } from "react";

export default function useMessages() {
  const chatBoxRef = useRef<HTMLDivElement>(null);
  const messages = useMessageStore((state) => state.messages);
  const [chatBoxAtBottom, _setChatBoxAtBottom] = useState<boolean | null>(true);

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

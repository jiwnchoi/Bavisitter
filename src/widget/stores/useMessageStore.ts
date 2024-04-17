import { IMessageWithRef } from "@shared/types";
import { isCodeVegaLite, isContentValidJSON } from "@shared/utils";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface MessageState {
  messages: IMessageWithRef[];
  streaming: boolean;

  computed: {
    chartMessages: IMessageWithRef[];
  };
}

interface MessageAction {
  setMessages: (messages: IMessageWithRef[]) => void;
  setStreaming: (streaming: boolean) => void;
}

const useMessageStore = create(
  subscribeWithSelector<MessageAction & MessageState>((set, get) => ({
    messages: [],
    streaming: false,
    computed: {
      get chartMessages() {
        return get().messages.filter(
          (m) => isCodeVegaLite(m) && isContentValidJSON(m.content),
        );
      },
    },

    setMessages: (messages: IMessageWithRef[]) => set({ messages }),
    setStreaming: (streaming: boolean) => set({ streaming }),
  })),
);

export default useMessageStore;

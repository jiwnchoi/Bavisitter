import { IMessageWithRef } from "@shared/types";
import { isCodeVegaLite, isContentValidJSON } from "@shared/utils";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface MessageState {
  messages: IMessageWithRef[];
  streaming: boolean;
  openedCodeBlockIndices: number[];

  computed: {
    chartMessages: IMessageWithRef[];
  };
}

interface MessageAction {
  setMessages: (messages: IMessageWithRef[]) => void;
  setStreaming: (streaming: boolean) => void;

  toggleCodeBlock: (index: number) => (value: boolean) => void;
}

const useMessageStore = create(
  subscribeWithSelector<MessageAction & MessageState>((set, get) => ({
    messages: [],
    streaming: false,
    openedCodeBlockIndices: [],
    computed: {
      get chartMessages() {
        return get().messages.filter(
          (m) => isCodeVegaLite(m) && isContentValidJSON(m.content),
        );
      },
    },

    setMessages: (messages: IMessageWithRef[]) => set({ messages }),
    setStreaming: (streaming: boolean) => set({ streaming }),
    toggleCodeBlock: (chatIndex: number) => {
      return (value: boolean) => {
        const openedCodeBlockIndices = get().openedCodeBlockIndices;
        if (value) {
          set({
            openedCodeBlockIndices: [...openedCodeBlockIndices, chatIndex],
          });
        } else {
          set({
            openedCodeBlockIndices: openedCodeBlockIndices.filter(
              (index) => index !== chatIndex,
            ),
          });
        }
      };
    },
  })),
);

export default useMessageStore;

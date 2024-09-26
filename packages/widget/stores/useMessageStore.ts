import type { IMessageWithRef } from "@shared/types";
import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

interface MessageState {
  messages: IMessageWithRef[];
  streaming: boolean;
  openedCodeBlockIndices: number[];
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
            openedCodeBlockIndices: openedCodeBlockIndices.filter((index) => index !== chatIndex),
          });
        }
      };
    },
  })),
);

export default useMessageStore;

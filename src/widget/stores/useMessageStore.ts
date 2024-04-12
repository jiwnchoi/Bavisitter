import { IMessageWithRef } from "@shared/types";
import { create } from "zustand";

interface MessageState {
  messages: IMessageWithRef[];
  streaming: boolean;
}

interface MessageAction {
  setMessages: (messages: IMessageWithRef[]) => void;
  setStreaming: (streaming: boolean) => void;
}

const useMessageStore = create<MessageState & MessageAction>((set) => ({
  messages: [],
  streaming: false,
  setMessages: (messages: IMessageWithRef[]) => set({ messages }),
  setStreaming: (streaming: boolean) => set({ streaming }),
}));

export default useMessageStore;

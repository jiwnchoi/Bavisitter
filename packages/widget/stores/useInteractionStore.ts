import { create } from "zustand";
import { devtools } from "zustand/middleware";

interface InteractionState {
  currentChartIndex: number;
  setCurrentChartIndex: (index: number) => void;
  openedCodeBlockIndices: number[];
  setCodeBlockOpened: (index: number, value: boolean) => void;
}

const useInteractionStore = create<InteractionState>()(
  devtools(
    (set, get) => ({
      currentChartIndex: 0,
      setCurrentChartIndex: (index) => set({ currentChartIndex: index }),
      openedCodeBlockIndices: [],
      setCodeBlockOpened: (index, value) => {
        const indices = get().openedCodeBlockIndices;
        set({
          openedCodeBlockIndices: value ? [...indices, index] : indices.filter((i) => i !== index),
        });
      },
    }),
    { name: "InteractionStore", anonymousActionType: "Interaction Store Action" },
  ),
);

export default useInteractionStore;

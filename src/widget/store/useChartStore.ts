import { IChartSpec } from "@shared/types";
import { create } from "zustand";

interface ChartState {
  charts: IChartSpec[];
  currentChartIndex: number;
}

interface ChartAction {
  setCharts: (charts: IChartSpec[]) => void;
  setCurrentChartByChartIndex: (index: number) => void;
  setCurrentChartByChatIndex: (chatIndex: number) => void;
  getChartByChartIndex: (chartIndex: number) => IChartSpec | undefined;
  getChartByChatIndex: (chatIndex: number) => IChartSpec | undefined;
}

const useChartStore = create<ChartState & ChartAction>((set, get) => ({
  charts: [],
  currentChartIndex: -1,
  setCharts: (charts) => set({ charts }),
  setCurrentChartByChartIndex: (index) =>
    set({ currentChartIndex: index < 0 ? get().charts.length - 1 : index }),
  setCurrentChartByChatIndex: (chatIndex) => {
    const chartIndex = get().charts.findIndex((c) => c.chatIndex === chatIndex);
    set({ currentChartIndex: chartIndex });
  },
  getChartByChartIndex: (chartIndex) => get().charts[chartIndex] ?? undefined,
  getChartByChatIndex: (chatIndex) =>
    get().charts.find((c) => c.chatIndex === chatIndex) ?? undefined,
}));

export default useChartStore;

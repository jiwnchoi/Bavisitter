import { IChartSpec } from "@shared/types";
import { create } from "zustand";

interface ChartState {
  charts: IChartSpec[];
  currentChartIndex: number;
}

interface ChartAction {
  setCharts: (charts: IChartSpec[]) => void;
  setCurrentChart: (index: number) => void;
  getChartByChartIndex: (chartIndex: number) => IChartSpec | undefined;
  getChartByChatIndex: (chatIndex: number) => IChartSpec | undefined;
}

const useChartStore = create<ChartState & ChartAction>((set, get) => ({
  charts: [],
  currentChartIndex: -1,
  setCharts: (charts) => set({ charts }),
  setCurrentChart: (index) => set({ currentChartIndex: index }),
  getChartByChartIndex: (chartIndex) => get().charts[chartIndex] ?? undefined,
  getChartByChatIndex: (chatIndex) =>
    get().charts.find((c) => c.chatIndex === chatIndex) ?? undefined,
}));

export default useChartStore;

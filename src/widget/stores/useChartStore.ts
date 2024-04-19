import { IChartSpec } from "@shared/types";
import { create } from "zustand";

interface ChartState {
  charts: IChartSpec[];
  currentChartIndex: number;
  currentChart: {
    state: IChartSpec | null;
  };
}

interface CharTActuator {
  getCurrentChart: () => IChartSpec | null;
  setCharts: (charts: IChartSpec[]) => void;
  setCurrentChartByChartIndex: (index: number) => void;
  setCurrentChartByChatIndex: (chatIndex: number) => void;

  appendChart: (chart: IChartSpec) => void;

  getChartByChartIndex: (chartIndex: number) => IChartSpec | undefined;
  getChartByChatIndex: (chatIndex: number) => IChartSpec | undefined;

  updateChart: (chartIndex: number, chart: IChartSpec) => void;
  updateCurrentChart: (chart: IChartSpec) => void;
}

const useChartStore = create<ChartState & CharTActuator>((set, get) => ({
  charts: [],
  currentChartIndex: -1,
  currentChart: {
    get state() {
      return get().charts.at(get().currentChartIndex) ?? null;
    },
  },
  getCurrentChart: () => get().charts.at(get().currentChartIndex) ?? null,

  appendChart: (chart) => set({ charts: [...get().charts, chart] }),
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

  updateChart: (chartIndex, chart) => {
    const charts = get().charts;
    charts[chartIndex] = chart;
    set({ charts });
  },
  updateCurrentChart: (chart) => {
    const chartIndex = get().currentChartIndex;
    if (chartIndex !== -1) {
      const charts = get().charts;
      charts[chartIndex] = chart;
      set({ charts });
    }
  },
}));

export default useChartStore;

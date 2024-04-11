import { IChartSpec, IMessageWithRef } from "@shared/types";
import { parseVegaLite } from "@shared/utils";
import { useChartStore } from "@store";
import { useEffect, useState } from "react";

const isMessageWithChart = (m: IMessageWithRef) =>
  m.type === "code" && m.format === "json" && m.content.includes("$schema");

export default function useCharts(
  messagesWithRef: IMessageWithRef[],
  streaming: boolean,
) {
  const charts = useChartStore((state) => state.charts);
  const setCharts = useChartStore((state) => state.setCharts);
  const setCurrentChartByChartIndex = useChartStore(
    (state) => state.setCurrentChartByChartIndex,
  );
  const setCurrentChartByChatIndex = useChartStore(
    (state) => state.setCurrentChartByChatIndex,
  );

  const [currentChart, _setCurrentChart] = useState<IChartSpec | null>(null);
  useChartStore.subscribe((state) => {
    const currentIndex =
      state.currentChartIndex === -1
        ? state.charts.length - 1
        : state.currentChartIndex;
    _setCurrentChart(state.charts[currentIndex] ?? null);
  });

  useEffect(() => {
    if (streaming === false) {
      const newCharts = messagesWithRef
        .filter((m) => isMessageWithChart(m))
        .map((m) => ({
          chatIndex: m.chatIndex,
          spec: parseVegaLite(m.content),
        }));
      setCharts(newCharts);
      setCurrentChartByChartIndex(-1);
    }
  }, [streaming, messagesWithRef]);

  return {
    charts,
    currentChart,
    setCurrentChartByChartIndex,
    setCurrentChartByChatIndex,
  };
}

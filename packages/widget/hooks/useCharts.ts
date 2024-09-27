import { CHART_WIDTH } from "@shared/constants";
import type { IChartSpec } from "@shared/types";
import { isCodeVegaLite, isContentValidJSON, parseVegaLite } from "@shared/utils";
import { useInteractionStore } from "@stores";
import { useMemo } from "react";
import useMessages from "./useMessages";

export default function useCharts() {
  const { messages } = useMessages();

  const charts: IChartSpec[] = useMemo(() => {
    const charts = messages.filter((m) => isCodeVegaLite(m) && isContentValidJSON(m.content));
    return charts.map((m, i) => {
      return {
        spec: parseVegaLite(m.content, CHART_WIDTH),
        chatIndex: i,
      };
    });
  }, [messages]);
  const currentChartIndex = useInteractionStore((state) => state.currentChartIndex);
  const currentChart = charts[currentChartIndex];
  const lastChart = charts.length > 0 ? charts[charts.length - 1] : null;

  return {
    charts,
    currentChart,
    lastChart,
  };
}

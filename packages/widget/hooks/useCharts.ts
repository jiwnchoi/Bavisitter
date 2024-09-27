import { CHART_WIDTH } from "@shared/constants";
import type { IChartSpec } from "@shared/types";
import { isCodeVegaLite, isContentValidJSON, parseVegaLite } from "@shared/utils";
import { useInteractionStore } from "@stores";
import { useEffect, useMemo } from "react";
import useMessages from "./useMessages";

export default function useCharts() {
  const { messages } = useMessages();

  const charts: IChartSpec[] = useMemo(() => {
    const chartMessages = messages.filter(
      (m) => isCodeVegaLite(m) && isContentValidJSON(m.content),
    );
    return chartMessages.map((message) => {
      return {
        spec: parseVegaLite(message.content, CHART_WIDTH)!,
        chatIndex: message.chatIndex,
      };
    });
  }, [messages]);
  const currentChartIndex = useInteractionStore((state) => state.currentChartIndex);
  const setCurrentChartIndex = useInteractionStore((state) => state.setCurrentChartIndex);
  const currentChart = charts[currentChartIndex];
  const lastChart = charts.length > 0 ? charts[charts.length - 1] : null;

  useEffect(() => {
    setCurrentChartIndex(charts.length - 1);
  }, [charts.length, setCurrentChartIndex]);

  return {
    charts,
    currentChart,
    lastChart,
  };
}

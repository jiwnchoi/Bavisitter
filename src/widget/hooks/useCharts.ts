import { IChartSpec, IMessageWithRef } from "@shared/types";
import { useEffect, useMemo, useState } from "react";

export default function useCharts(
  messages: IMessageWithRef[],
  streaming: boolean,
) {
  const [currentChartIndex, setCurrentChartIndex] = useState(-1);
  const [charts, setCharts] = useState<IChartSpec[]>([]);

  useEffect(() => {
    if (streaming === true) {
      return;
    }
    const specs = messages
      .map((m, i) => ({
        ...m,
        chatIndex: i,
      }))
      .filter(
        (m) =>
          m.type === "code" &&
          m.format === "json" &&
          m.content.includes("$schema"),
      );
    const _charts = specs.map((m) => {
      let spec = JSON.parse(m.content);
      spec.$schema = "https://vega.github.io/schema/vega-lite/v5.json";
      if (spec.data && spec.data.url === "artifacts/data.csv") {
        spec.data = { name: "table" };
      }
      for (const encodingName in spec.encoding) {
        spec.encoding[encodingName].legend = { orient: "bottom" };
      }
      spec.background = "transparent";
      spec.autosize = { type: "fit", contains: "padding" };
      return { chatIndex: m.chatIndex, spec } as IChartSpec;
    });
    setCharts(_charts);
  }, [messages]);

  const currentChart = useMemo(() => {
    const currentIndex =
      currentChartIndex === -1 ? messages.length - 1 : currentChartIndex;
    return charts.find((c) => c.chatIndex === currentIndex);
  }, [charts, currentChartIndex]);

  useEffect(() => {
    if (streaming !== true) {
      setCurrentChartIndex(-1);
    }
  }, [streaming]);

  return {
    charts,
    currentChart,
    setCurrentChartIndex,
  };
}

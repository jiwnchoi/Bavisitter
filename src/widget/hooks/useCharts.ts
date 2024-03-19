import { IChartSpec, IMessageWithRef } from "@shared/types";
import { extractCodeBlocksFromString } from "@shared/utils";
import { useEffect, useMemo, useState } from "react";

export default function useCharts(
  messages: IMessageWithRef[],
  streaming: boolean,
) {
  const [currentChartIndex, setCurrentChartIndex] = useState(-1);
  const charts = useMemo(() => {
    return messages
      .map((m, index) => ({
        chatIndex: index,
        spec: extractCodeBlocksFromString(m.content),
      }))
      .filter((m) => m.spec !== "")
      .map((m) => {
        const spec = JSON.parse(m.spec);
        spec.$schema = "https://vega.github.io/schema/vega-lite/v5.json";
        if (spec.data && spec.data.url === "artifacts/data.csv") {
          spec.data = { name: "table" };
        }
        for (const encodingName in spec.encoding) {
          spec.encoding[encodingName].legend = { orient: "bottom" };
        }
        spec.background = "transparent";
        spec.autosize = { type: "fit", contains: "padding" };
        return { ...m, spec } as IChartSpec;
      });
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

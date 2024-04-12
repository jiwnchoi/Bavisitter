import { IChartSpec, IMessageWithRef, TData } from "@shared/types";
import { parseVegaLite } from "@shared/utils";
import { useChartStore, useMessageStore } from "@stores";
import { useEffect, useState } from "react";
import useIPC from "./useIPC";

const isMessageWithChart = (m: IMessageWithRef) =>
  m.type === "code" && m.format === "json" && m.content.includes("$schema");

export default function useCharts() {
  const [currentChart, _setCurrentChart] = useState<IChartSpec | null>(null);
  const { fetchModel } = useIPC();
  const charts = useChartStore((state) => state.charts);
  const setCurrentChartByChartIndex = useChartStore(
    (state) => state.setCurrentChartByChartIndex,
  );
  const setCurrentChartByChatIndex = useChartStore(
    (state) => state.setCurrentChartByChatIndex,
  );
  const getChartByChatIndex = useChartStore(
    (state) => state.getChartByChatIndex,
  );

  const appendChart = useChartStore((state) => state.appendChart);

  const streaming = useMessageStore((state) => state.streaming);
  const messages = useMessageStore((state) => state.messages);

  const handleChartLoaded = async () => {
    let chartAppended = false;
    for (let i = 0; i < messages.length; i++) {
      if (
        isMessageWithChart(messages[i]) &&
        getChartByChatIndex(i) === undefined
      ) {
        const spec = parseVegaLite(messages[i].content);
        const name = spec.data.name!;
        const _data = await fetchModel<TData>("load_artifact", name);
        chartAppended = true;
        appendChart({
          chatIndex: i,
          spec: parseVegaLite(messages[i].content),
          data: { [name]: _data },
        });
      }
    }

    if (chartAppended) {
      setCurrentChartByChartIndex(-1);
      // handleTeacher();
    }
  };

  useChartStore.subscribe((state) => {
    const currentIndex =
      state.currentChartIndex === -1
        ? state.charts.length - 1
        : state.currentChartIndex;
    _setCurrentChart(state.charts[currentIndex] ?? null);
  });

  useEffect(() => {
    if (streaming === false) {
      handleChartLoaded();
    }
  }, [streaming, messages]);

  return {
    charts,
    currentChart,
    setCurrentChartByChartIndex,
    setCurrentChartByChatIndex,
  };
}

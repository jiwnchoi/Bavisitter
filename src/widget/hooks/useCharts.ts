import { TData } from "@shared/types";
import { isCodeVegaLite, parseVegaLite, generateThumbnail } from "@shared/utils";
import { useArtifactStore, useChartStore, useMessageStore } from "@stores";
import { useEffect } from "react";
import useIPC from "./useIPC";

export default function useCharts(size: number) {
  const { fetchModel } = useIPC();
  const charts = useChartStore((state) => state.charts);
  const setCharts = useChartStore((state) => state.setCharts);
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
  const currentChartIndex = useChartStore((state) => state.currentChartIndex);
  const streaming = useMessageStore((state) => state.streaming);
  const messages = useMessageStore((state) => state.messages);

  const currentChart = charts.at(currentChartIndex);
  const getArtifact = useArtifactStore((state) => state.getArtifact);
  const handleChartLoaded = async () => {
    if (messages.length === 0) {
      setCharts([]);
      setCurrentChartByChartIndex(-1);
    }

    let chartAppended = false;
    for (let i = 0; i < messages.length; i++) {
      if (isCodeVegaLite(messages[i]) && getChartByChatIndex(i) === undefined) {
        const spec = parseVegaLite(messages[i].content, size);
        const name = spec.data.name!;
        let _data = getArtifact(name);
        if (!_data) {
          _data = await fetchModel<TData>("load_artifact", name);
        }
        const thumbnail = await generateThumbnail(spec, _data);
        chartAppended = true;
        appendChart({
          chatIndex: i,
          spec: spec,
          data: { [name]: _data },
          thumbnail: thumbnail,
        });
        //console.log(JSON.stringify(thumbnail));
      }
    }

    if (chartAppended) {
      setCurrentChartByChartIndex(-1);
      // handleTeacher();
    }
  };

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

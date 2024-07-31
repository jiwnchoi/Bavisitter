import { detectResultToContent, stringfyVegaLite } from "@shared/utils";
import { useArtifactStore, useChartStore, useMessageStore } from "@stores";
import { useEffect, useState } from "react";
import { type IDetectorResultWithSelection, detect, revise } from "videre/index";
import useIPC from "./useIPC";
import { useModelMessage } from "./useModelMessage";

export default function useRevisionContent() {
  const messages = useMessageStore(state => state.messages);
  const streaming = useMessageStore(state => state.streaming);
  const { appendMessages } = useModelMessage();
  const { fetchModel } = useIPC();
  const appendArtifact = useArtifactStore(state => state.appendArtifact);
  const [detecting, setDetecting] = useState(false);
  const [detectResult, setDetectorResult] = useState<IDetectorResultWithSelection[]>([]);
  const charts = useChartStore(state => state.charts);
  const [lastDetectedChart, setLastDetectedChart] = useState<number>(-1);
  const lastChart = charts[charts.length - 1];
  const lastUserMessage = messages.findLastIndex(m => m.role === "user");
  const lastChartIndex = lastChart ? lastChart.chatIndex : 0;
  const revisionViewDisplayed =
    !streaming &&
    messages.length > 0 &&
    lastChartIndex > lastUserMessage &&
    !detecting &&
    detectResult.length > 0;

  useEffect(() => {
    if (!lastChart || lastDetectedChart === lastChartIndex) return;

    const { spec, data } = lastChart;
    if (spec && data) {
      const records = data[spec.data.name!] as any[];
      setDetecting(true);
      try {
        detect(spec, records).then(prompts => {
          setDetectorResult(
            prompts.map(p => ({
              ...p,
              resolvers: p.resolvers.map(r => ({
                ...r,
                selected: false,
              })),
            })),
          );
          setDetecting(false);
          setLastDetectedChart(lastChartIndex);
        });
      } catch (e) {
        throw new Error("Failed to detect");
      }
    }
  }, [lastChart]);

  const reviseLastChartWithAction = (detectResult: IDetectorResultWithSelection[]) => {
    if (!lastChart) return;
    const { spec, data } = lastChart;

    if (spec && data) {
      const records = Object.values(data)[0] as Record<any, any>[];
      const { spec: revisedSpec, data: revisedData } = revise(
        spec,
        records,
        detectResult.flatMap(r => r.resolvers.filter(r => r.selected)).map(r => r.id),
      );
      appendArtifact(revisedSpec.data.name!, revisedData);
      fetchModel("save_artifact", {
        path: revisedSpec.data.name!,
        records: revisedData,
      });
      appendMessages([
        {
          role: "user",
          type: "message",
          content: detectResultToContent(detectResult, true),
        },
        {
          role: "assistant",
          type: "code",
          format: "json",
          content: stringfyVegaLite(revisedSpec),
        },
      ]);
    }
  };

  const reviseLastChartWithPrompt = (detectResult: IDetectorResultWithSelection[]) => {
    appendMessages([
      {
        role: "user",
        type: "message",
        content: detectResultToContent(detectResult, true),
      },
    ]);
  };

  const reviseLastChartWithProblem = (detectResult: IDetectorResultWithSelection[]) => {
    appendMessages([
      {
        role: "user",
        type: "message",
        content: detectResultToContent(detectResult, false),
      },
    ]);
  };

  const setResolver = (id: string) => (selected: boolean) => {
    setDetectorResult(
      detectResult.map(d => ({
        ...d,
        resolvers: d.resolvers.map(r => (r.id === id ? { ...r, selected } : r)),
      })),
    );
  };

  const setDetectResult = (index: number) => (selected: boolean) => {
    setDetectorResult([
      ...detectResult.slice(0, index),
      {
        ...detectResult[index],
        resolvers: detectResult[index].resolvers.map(r =>
          r.selected === selected ? r : { ...r, selected },
        ),
      },
      ...detectResult.slice(index + 1),
    ]);
  };

  return {
    revisionViewDisplayed,
    detecting,
    detectResult,
    reviseLastChartWithAction,
    reviseLastChartWithPrompt,
    reviseLastChartWithProblem,
    setDetectResult,
    setResolver,
  };
}

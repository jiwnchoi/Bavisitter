import { detectResultToContent, stringfyVegaLite } from "@shared/utils";
import { useArtifactStore, useChartStore, useMessageStore } from "@stores";
import { useEffect, useState } from "react";
import { detect, revise, type IDetectorResult } from "videre/index";
import useIPC from "./useIPC";
import { useModelMessage } from "./useModelMessage";

type IDetectorResultWithSelection = IDetectorResult & {
  selected: boolean;
};

export default function useRevisionContent() {
  const messages = useMessageStore((state) => state.messages);
  const streaming = useMessageStore((state) => state.streaming);
  const { appendMessages } = useModelMessage();
  const { fetchModel } = useIPC();
  const appendArtifact = useArtifactStore((state) => state.appendArtifact);
  const [detecting, setDetecting] = useState(false);
  const [detectResult, setDetectorResult] = useState<
    IDetectorResultWithSelection[]
  >([]);

  const lastChart = useChartStore((state) => state.computed.lastChart);
  const lastUserMessage = messages.findLastIndex((m) => m.role === "user");
  const lastChartIndex = lastChart ? lastChart.chatIndex : 0;
  const revisionViewDisplayed =
    !streaming &&
    messages.length > 0 &&
    lastChartIndex > lastUserMessage &&
    !detecting &&
    detectResult.length > 0;

  useEffect(() => {
    if (!lastChart) return;
    const { spec, data } = lastChart;
    if (spec && data) {
      const records = data[spec.data.name!] as any[];
      setDetecting(true);
      try {
        detect(spec, records).then((prompts) => {
          setDetectorResult(
            prompts.map((p) => ({
              ...p,
              selected: true,
            })),
          );
          setDetecting(false);
        });
      } catch (e) {
        console.error(e);
      }
    }
  }, [lastChart]);

  const reviseLastChartWithAction = () => {
    if (!lastChart) return;
    const { spec, data } = lastChart;

    if (spec && data) {
      const records = Object.values(data)[0] as Record<any, any>[];
      const { spec: revisedSpec, data: revisedData } = revise(
        spec,
        records,
        detectResult.filter((r) => r.selected),
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

  const reviseLastChartWithPrompt = () => {
    appendMessages([
      {
        role: "user",
        type: "message",
        content: detectResultToContent(detectResult, true),
      },
    ]);
  };

  const reviseLastChartWithProblem = () => {
    appendMessages([
      {
        role: "user",
        type: "message",
        content: detectResultToContent(detectResult, false),
      },
    ]);
  };

  const setDetectResult = (index: number) => (selected: boolean) => {
    setDetectorResult([
      ...detectResult.slice(0, index),
      {
        ...detectResult[index],
        selected,
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
  };
}

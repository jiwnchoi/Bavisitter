import {
  detectResultToContent,
  isCodeVegaLite,
  stringfyVegaLite,
} from "@shared/utils";
import { useChartStore, useMessageStore } from "@stores";
import { useEffect, useMemo, useState } from "react";
import { detect, revise, type IDetectResult } from "teach/index";
import { useModelMessage } from "./useModelMessage";

type IDetectResultWithSelection = IDetectResult & {
  selected: boolean;
};

export default function useRevisionContent() {
  const messages = useMessageStore((state) => state.messages);
  const streaming = useMessageStore((state) => state.streaming);
  const { appendMessages } = useModelMessage();

  const [detecting, setDetecting] = useState(false);
  const [detectResult, setDetectResult] = useState<
    IDetectResultWithSelection[]
  >([]);

  const revisionViewDisplayed =
    !streaming &&
    messages.length > 0 &&
    isCodeVegaLite(messages[messages.length - 1]);

  const charts = useChartStore((state) => state.charts);

  const lastChart = useMemo(() => {
    return charts[charts.length - 1];
  }, [charts]);

  useEffect(() => {
    if (!lastChart) return;
    const { spec, data } = lastChart;
    if (spec && data) {
      const records = data[spec.data.name!] as any[];
      setDetecting(true);
      detect(spec, records).then((prompts) => {
        setDetectResult(
          prompts.map((p) => ({
            ...p,
            selected: true,
          })),
        );
        setDetecting(false);
      });
    }
  }, [lastChart]);

  const reviseLastChartWithAction = () => {
    const { spec, data } = lastChart;
    if (spec && data) {
      const records = Object.values(data)[0] as Record<any, any>[];
      console.log(spec, records, detectResult);
      const { spec: revisedSpec, data: revisedData } = revise(
        spec,
        records,
        detectResult.filter((r) => r.selected),
      );
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

  const toggleDetectResult = (index: number) => {
    setDetectResult([
      ...detectResult.slice(0, index),
      {
        ...detectResult[index],
        selected: !detectResult[index].selected,
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
    toggleDetectResult,
  };
}

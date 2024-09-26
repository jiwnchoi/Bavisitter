import useLoadArtifact from "@hooks/query/useLoadArtifact";
import { detectResultToContent } from "@shared/utils";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useMemo, useState } from "react";
import { type IDetectorResultWithSelection, detect } from "videre/index";
import useCharts from "./useCharts";
import useMessages from "./useMessagess";
import useStreaming from "./useStreaming";

export default function useRevisionContent() {
  const { messages, appendMessages } = useMessages();
  const streaming = useStreaming();
  const { lastChart } = useCharts();
  const artifactName = lastChart.spec?.data?.name ?? "";
  const { artifact } = useLoadArtifact(artifactName);

  const lastUserMessage = messages.findLastIndex((m) => m.role === "user");
  const lastChartIndex = lastChart ? lastChart.chatIndex : 0;

  const { data: _detectResult, isLoading: detecting } = useQuery({
    queryKey: ["detectorResult", JSON.stringify(lastChart.spec), artifactName],
    queryFn: async () => {
      return await detect(lastChart.spec, artifact as unknown as Record<any, any>[]);
    },
    enabled: !!lastChart && !!artifact,
  });

  const [selectedDetectResultIndices, setSelectedDetectResultIndices] = useState<number[]>([]);

  const detectResult: IDetectorResultWithSelection[] = useMemo(
    () =>
      _detectResult?.map((d) => ({
        ...d,
        resolvers: d.resolvers.map((r, i) => ({
          ...r,
          selected: selectedDetectResultIndices.includes(i),
        })),
      })) ?? [],
    [_detectResult, selectedDetectResultIndices],
  );

  useEffect(() => {
    setSelectedDetectResultIndices([]);
  }, [_detectResult]);

  const revisionViewDisplayed =
    !streaming &&
    messages.length > 0 &&
    lastChartIndex > lastUserMessage &&
    !detecting &&
    detectResult &&
    detectResult.length > 0;

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

  const setDetectResultSelected = (detectResultIndex: number, selected: boolean) => {
    const newSelectedDetectResultIndices = selected
      ? [...selectedDetectResultIndices, detectResultIndex]
      : selectedDetectResultIndices.filter((i) => i !== detectResultIndex);
    setSelectedDetectResultIndices(newSelectedDetectResultIndices);
  };

  return {
    revisionViewDisplayed,
    detecting,
    detectResult,
    reviseLastChartWithPrompt,
    reviseLastChartWithProblem,
    setDetectResultSelected,
  };
}

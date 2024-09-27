import useLoadArtifact from "@hooks/query/useLoadArtifact";
import { detectResultToContent } from "@shared/utils";
import { useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { type IDetectorResultWithSelection, detect } from "videre/index";
import useCharts from "./useCharts";
import useMessages from "./useMessages";
import useStreaming from "./useStreaming";

export default function useRevisionContent() {
  const { messages, appendMessages } = useMessages();
  const streaming = useStreaming();
  const { lastChart } = useCharts();
  const artifactName = lastChart ? (lastChart.spec?.data?.name ?? "") : "";
  const { artifact } = useLoadArtifact(artifactName);

  const lastUserMessage = messages.findLastIndex((m) => m.role === "user");
  const lastChartIndex = lastChart ? lastChart.chatIndex : 0;

  const { data: _detectResult, isLoading: detecting } = useQuery({
    queryKey: ["detectorResult", JSON.stringify(lastChart?.spec), artifactName],
    queryFn: async () => {
      if (!lastChart || !artifact) {
        return [];
      }
      return await detect(lastChart.spec, artifact as unknown as Record<any, any>[]);
    },
    enabled: !!lastChart && !!artifact,
  });

  const [detectResult, setDetectResult] = useState<IDetectorResultWithSelection[]>([]);

  useEffect(() => {
    if (_detectResult) {
      setDetectResult(
        _detectResult.map((d) => ({
          ...d,
          resolvers: d.resolvers.map((r) => ({
            ...r,
            selected: false,
          })),
        })),
      );
    }
  }, [_detectResult, setDetectResult]);

  const setResolverSelected = (issueId: string, resolverId: string, selected: boolean) => {
    setDetectResult(
      produce<IDetectorResultWithSelection[]>((draft) => {
        const result = draft.find((r) => r.issue.id === issueId);
        if (result) {
          const resolver = result.resolvers.find((r) => r.id === resolverId);
          if (resolver) {
            resolver.selected = selected;
          }
        }
      }),
    );
  };

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

  return {
    revisionViewDisplayed,
    detecting,
    detectResult,
    setResolverSelected,
    reviseLastChartWithPrompt,
  };
}

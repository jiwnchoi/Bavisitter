import useLoadArtifact from "@hooks/query/useLoadArtifact";
import type { IChartSpec } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import { produce } from "immer";
import { useEffect, useState } from "react";
import { type IDetectorResultWithSelection, detect } from "videre/index";

export default function useViDeRe(chart: IChartSpec | null) {
  const artifactName = chart ? (chart.spec?.data?.name ?? "") : "";
  const { artifact } = useLoadArtifact(artifactName);
  const [detectResult, setDetectResult] = useState<IDetectorResultWithSelection[]>([]);

  const { data: _detectResult, isLoading: detecting } = useQuery({
    queryKey: ["detectorResult", JSON.stringify(chart?.spec), artifactName],
    queryFn: async () => {
      if (!chart || !artifact) return [];
      return await detect(chart.spec, artifact as unknown as Record<any, any>[]);
    },
    enabled: !!chart && !!artifact,
  });

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

  return {
    detectResult,
    detecting,
    setResolverSelected,
  };
}

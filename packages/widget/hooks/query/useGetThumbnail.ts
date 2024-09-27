import type { IChartSpec } from "@shared/types";
import { getThumbnailFromSpec } from "@shared/utils";
import { useQuery } from "@tanstack/react-query";

import useLoadArtifact from "./useLoadArtifact";

export default function useGetThumbnail(chart: IChartSpec) {
  const artifactName = chart.spec?.data?.name ?? "";
  const { artifact, loading: artifactLoading } = useLoadArtifact(artifactName);

  const { data, isLoading, error } = useQuery({
    queryKey: ["thumbnail", JSON.stringify(chart.spec)],
    queryFn: async () => {
      const thumbnail = await getThumbnailFromSpec(chart.spec, artifact!);
      return thumbnail;
    },
    enabled: !artifactLoading && !!artifact,
  });

  return {
    thumbnail: data,
    loading: isLoading,
    error,
  };
}

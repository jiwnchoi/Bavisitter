import type { TData } from "@shared/types";
import { useQuery } from "@tanstack/react-query";
import useIPC from "../useIPC";

export default function useLoadArtifact(name: string | undefined) {
  const { fetchModel } = useIPC();

  const { data, isLoading, error } = useQuery({
    queryKey: ["thumbnail", name],
    queryFn: async () => {
      const data = await fetchModel<TData>("load_artifact", name);
      return data;
    },
    enabled: !!name,
  });

  return {
    artifact: data,
    error,
    loading: isLoading,
  };
}

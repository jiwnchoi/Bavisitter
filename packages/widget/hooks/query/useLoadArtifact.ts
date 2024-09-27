import { useQuery } from "@tanstack/react-query";
import type { PlainObject } from "react-vega";
import useIPC from "../useIPC";

export default function useLoadArtifact(name: string | undefined) {
  const { fetchModel } = useIPC();

  const { data, isLoading, error } = useQuery({
    queryKey: ["thumbnail", name],
    queryFn: async () => {
      const data = await fetchModel<string>("load_artifact", name);
      return JSON.parse(data) as PlainObject;
    },
    enabled: !!name,
  });

  return {
    artifact: data,
    error,
    loading: isLoading,
  };
}

import useIPC from "@hooks/useIPC";
import { useMutation } from "@tanstack/react-query";

export default function useSaveArtifact() {
  const { fetchModel } = useIPC();
  const saveArtifact = useMutation({
    mutationFn: async ({ path, records }: { path: string; records: any }) =>
      fetchModel("save_artifact", {
        path,
        records,
      }),
  });
  return saveArtifact;
}

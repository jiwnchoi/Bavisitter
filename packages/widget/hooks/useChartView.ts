import { useLoadArtifact } from "./query";
import useCharts from "./useCharts";

function useChartView() {
  const { currentChart } = useCharts();
  const artifactName = currentChart?.spec?.data?.name;
  const { artifact } = useLoadArtifact(artifactName);

  return {
    spec: currentChart?.spec,
    data: artifact,
  };
}

export default useChartView;

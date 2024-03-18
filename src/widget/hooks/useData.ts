import { useModelState } from "@anywidget/react";
import { useMemo } from "react";

export default function useData() {
  const [_data] = useModelState<string>("data");
  const data = useMemo(() => JSON.parse(_data), [_data]);
  return {
    data,
  };
}

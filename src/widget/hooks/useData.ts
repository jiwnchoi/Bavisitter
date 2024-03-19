import { useModelState } from "@anywidget/react";
import { useMemo } from "react";

export default function useData() {
  const [_data] = useModelState<string>("data");

  return useMemo(() => ({ table: JSON.parse(_data) }), [_data]);
}

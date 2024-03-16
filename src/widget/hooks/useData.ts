import { useModelState } from "@anywidget/react";
import Papa from "papaparse";
import { useEffect, useMemo } from "react";
import { PlainObject } from "react-vega";

export default function useData() {
  const [_data] = useModelState<string>("data");
  const data = useMemo(() => {
    const parsed = Papa.parse(_data, {
      header: true,
      dynamicTyping: true,
      skipEmptyLines: true,
    });
    return {
      table: parsed.data as PlainObject[],
    };
  }, [_data]);

  useEffect(() => {
    console.log("data");
    console.log(data);
  }, [data]);

  return {
    data,
  };
}

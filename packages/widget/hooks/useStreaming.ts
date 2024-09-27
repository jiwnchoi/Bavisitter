import { useModelState } from "@anywidget/react";

export default function useStreaming() {
  const [streaming] = useModelState<boolean>("streaming");
  return streaming;
}

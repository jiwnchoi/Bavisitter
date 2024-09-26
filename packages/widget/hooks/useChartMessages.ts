import { isCodeVegaLite, isContentValidJSON } from "@shared/utils";
import { useMessageStore } from "@stores";
import { useMemo } from "react";
function useChartMessages() {
  const messages = useMessageStore((state) => state.messages);

  const chartMessages = useMemo(
    () => messages.filter((m) => isCodeVegaLite(m) && isContentValidJSON(m.content)),
    [messages],
  );

  return chartMessages;
}

export default useChartMessages;

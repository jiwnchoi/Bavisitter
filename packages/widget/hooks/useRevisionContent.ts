import { detectResultToContent } from "@shared/utils";
import { type IDetectorResultWithSelection } from "videre/index";
import { useViDeRe } from "./query";
import useCharts from "./useCharts";
import useMessages from "./useMessages";
import useStreaming from "./useStreaming";

export default function useRevisionContent() {
  const { messages, appendMessages } = useMessages();
  const streaming = useStreaming();
  const { lastChart } = useCharts();

  const lastUserMessage = messages.findLastIndex((m) => m.role === "user");
  const lastChartIndex = lastChart ? lastChart.chatIndex : 0;
  const { detecting, detectResult, setResolverSelected } = useViDeRe(lastChart);
  const revisionViewDisplayed =
    !streaming &&
    messages.length > 0 &&
    lastChartIndex > lastUserMessage &&
    !detecting &&
    detectResult &&
    detectResult.length > 0;

  const reviseLastChartWithPrompt = (detectResult: IDetectorResultWithSelection[]) => {
    appendMessages([
      {
        role: "user",
        type: "message",
        content: detectResultToContent(detectResult, true),
      },
    ]);
  };

  return {
    revisionViewDisplayed,
    detecting,
    detectResult,
    setResolverSelected,
    reviseLastChartWithPrompt,
  };
}

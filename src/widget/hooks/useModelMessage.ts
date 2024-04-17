import { useModelState } from "@anywidget/react";
import { IChartSpec, IMessage, IMessageWithRef, TData } from "@shared/types";
import { getThumbnailFromSpec, parseVegaLite } from "@shared/utils";
import { useArtifactStore, useChartStore, useMessageStore } from "@stores";
import { createRef, useEffect } from "react";
import useIPC from "./useIPC";

export function useModelMessage() {
  const [modelMessages, setModelMessages] =
    useModelState<IMessage[]>("messages");

  const appendMessages = (messages: IMessage[]) => {
    setModelMessages([...modelMessages, ...messages]);
  };

  const sendCurrentMessages = () => {
    setModelMessages([...modelMessages]);
  };

  const clearUserMessages = () => {
    setModelMessages([]);
  };

  const editUserMessage = (index: number, message: IMessage) => {
    setModelMessages([...modelMessages.slice(0, index), message]);
  };

  return {
    setModelMessages,
    appendMessages,
    editUserMessage,
    clearUserMessages,
    sendCurrentMessages,
  };
}

export function useModelMessageEffect(chartSize: number) {
  const [modelMessages] = useModelState<IMessage[]>("messages");
  const [modelStreaming] = useModelState<boolean>("streaming");
  const streaming = useMessageStore((state) => state.streaming);
  const setMessages = useMessageStore((state) => state.setMessages);
  const setStreaming = useMessageStore((state) => state.setStreaming);

  const { fetchModel } = useIPC();
  const getArtifact = useArtifactStore((state) => state.getArtifact);

  const setCharts = useChartStore((state) => state.setCharts);

  useEffect(() => {
    setMessages(
      modelMessages.map((m, i) => ({
        ...m,
        ref: createRef<HTMLDivElement>(),
        chatIndex: i,
      })),
    );
  }, [modelMessages]);

  useEffect(() => {
    setStreaming(modelStreaming);
  }, [modelStreaming]);

  useEffect(
    () =>
      useMessageStore.subscribe(
        (state) => state.computed.chartMessages,
        handleChartLoaded,
        {
          fireImmediately: true,
        },
      ),
    [],
  );

  const handleChartLoaded = async (chartMessages: IMessageWithRef[]) => {
    if (streaming) return;
    const newCharts: IChartSpec[] = [];

    for await (const message of chartMessages) {
      const spec = parseVegaLite(message.content, chartSize);
      const name = spec.data.name!;
      let _data = getArtifact(name);
      if (!_data) {
        _data = await fetchModel<TData>("load_artifact", name);
        _data = JSON.parse(_data);
      }
      newCharts.push({
        chatIndex: message.chatIndex,
        spec,
        data: { [name]: _data },
        thumbnail: await getThumbnailFromSpec(spec, _data),
      });
    }

    setCharts(newCharts);
  };
}

import { useModelState } from "@anywidget/react";
import { useEffect } from "react";

const pendingRequests = new Map<string, (data: any) => void>();

interface IIPCModel {
  type: "request" | "response";
  endpoint: string;
  content: any;
  uuid: string;
}

function useIPC() {
  const [ipcQueue, setIPCQueue] = useModelState<IIPCModel[]>("ipc_queue");

  const handleMessage = ({ content, uuid }: IIPCModel) => {
    if (pendingRequests.get(uuid)) {
      pendingRequests.get(uuid)!(content);
      pendingRequests.delete(uuid);
    }
    setIPCQueue(ipcQueue.filter((m) => m.uuid !== uuid));
  };

  async function fetchModel<T>(type: string, data: string) {
    const uuid = Math.random().toString(36).substring(7);
    setIPCQueue([
      ...ipcQueue,
      { type: "request", endpoint: type, content: data, uuid },
    ]);

    return new Promise<T>((resolve, reject) => {
      pendingRequests.set(uuid, (data: T) => {
        if (data === null) {
          reject("No data received");
        }
        resolve(data);
      });
    });
  }
  useEffect(() => {
    const lastMessage = ipcQueue[ipcQueue.length - 1];
    if (!lastMessage || lastMessage.type !== "response") {
      return;
    }

    handleMessage(lastMessage);
  }, [ipcQueue]);

  return { fetchModel };
}

export default useIPC;

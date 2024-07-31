import type TMessageRole from "./TMessageRole";
import type TMessageType from "./TMessageType";

interface IMessage {
  role: TMessageRole;
  type: TMessageType;
  content: string;
  format?: string;
}

export default IMessage;

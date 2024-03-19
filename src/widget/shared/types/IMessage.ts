import TMessageRole from "./TMessageRole";
import TMessageType from "./TMessageType";

interface IMessage {
  role: TMessageRole;
  type: TMessageType;
  content: string;
  format?: string;
}

export default IMessage;

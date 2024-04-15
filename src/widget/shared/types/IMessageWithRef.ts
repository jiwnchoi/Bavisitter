import { RefObject } from "react";
import { IMessage } from ".";

type IMessageWithRef = IMessage & {
  ref: RefObject<HTMLDivElement>;
  chatIndex: number;
};

export default IMessageWithRef;

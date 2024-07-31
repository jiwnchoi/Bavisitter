import type { RefObject } from "react";
import type { IMessage } from ".";

type IMessageWithRef = IMessage & {
  ref: RefObject<HTMLDivElement>;
  chatIndex: number;
};

export default IMessageWithRef;

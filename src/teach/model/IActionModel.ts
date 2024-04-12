import TActionType from "./TActionType";
import { State } from ".";

export default interface IActionModel {
  type: TActionType;
  description: string;
  action: ((state: State) => State)[];
}

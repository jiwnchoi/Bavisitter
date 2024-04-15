import TActuatorType from "./TActuatorType";
import { State } from ".";

export default interface IActuatorModel {
  type: TActuatorType;
  description: string;
  action: ((state: State) => State)[];
}

import TActuatorType from "./TActuatorType";
import { State } from ".";

export default interface IResolverModel {
  id: string;
  type?: TActuatorType;
  trigger: (state: State) => boolean | Promise<boolean>;
  description: string;
  resolve?: ((state: State) => State)[];
}

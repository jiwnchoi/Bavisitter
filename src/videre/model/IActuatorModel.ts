import type { State } from ".";
import type TActuatorType from "./TActuatorType";

export default interface IResolverModel {
  id: string;
  type?: TActuatorType;
  trigger: (state: State) => boolean | Promise<boolean>;
  description: string;
  resolve?: ((state: State) => State)[];
}

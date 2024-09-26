import type { State } from ".";
import type TResolverType from "./TResolverType";

export default interface IResolverModel {
  id: string;
  type?: TResolverType;
  trigger: (state: State) => boolean | Promise<boolean>;
  description: string;
  resolve?: ((state: State) => State)[];
}

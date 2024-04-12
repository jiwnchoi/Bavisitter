import { State } from ".";
import TLintLevel from "./TLintLevel";
import TLintType from "./TLintType";

export default interface ILintModel {
  type: TLintType;
  description: string;
  level: TLintLevel;
  lint: (state: State) => boolean | Promise<boolean>;
}

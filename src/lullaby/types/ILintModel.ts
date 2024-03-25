import IStateModel from "./IStateModel";
import TLintType from "./TLintType";
import TLintLevel from "./TLintLevel";

export default interface ILintModel {
  type: TLintType;
  level: TLintLevel;
  lint: (state: IStateModel) => boolean;
  description: string;
}

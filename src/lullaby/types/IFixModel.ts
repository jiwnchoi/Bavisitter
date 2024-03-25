import TFixType from "./TFixType";
import IStateModel from "./IStateModel";

export default interface IFixModel {
  fix: (state: IStateModel) => IStateModel;
  description: string;
  type: TFixType;
}

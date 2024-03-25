import IFixModel from "./IFixModel";
import ILintModel from "./ILintModel";
import IStateModel from "./IStateModel";

interface IManifest {
  name: string;
  validate: (state: IStateModel) => boolean;
  lint: ILintModel;
  fix: (IFixModel | IFixModel[])[];
}
export default IManifest;

import { State } from ".";
import IActionModel from "./IActionModel";
import ILintModel from "./ILintModel";

interface IManifest {
  trigger: (state: State) => boolean;
  linter: ILintModel;
  actuator: IActionModel;
}
export default IManifest;

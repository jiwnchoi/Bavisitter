import IActionModel from "./IActionModel";
import ILintModel from "./ILintModel";

interface IManifest {
  linter: ILintModel;
  actuator: IActionModel;
}
export default IManifest;

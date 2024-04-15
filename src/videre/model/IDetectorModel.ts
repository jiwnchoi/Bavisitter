import { State } from ".";
import TDetectorLevel from "./TDetectorLevel";
import TDetectorType from "./TDetectorType";

export default interface IDetectorModel {
  type: TDetectorType;
  description: string;
  level: TDetectorLevel;
  detect: (state: State) => boolean | Promise<boolean>;
}

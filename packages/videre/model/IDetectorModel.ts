import type { State } from ".";
import type TDetectorLevel from "./TDetectorLevel";
import type TDetectorType from "./TDetectorType";

export default interface IDetectorModel {
  id: string;
  type?: TDetectorType;
  description: string;
  level?: TDetectorLevel;
  detect: (state: State) => boolean | Promise<boolean>;
}

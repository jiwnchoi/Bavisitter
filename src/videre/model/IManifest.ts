import IActuatorModel from "./IActuatorModel";
import IDetectorModel from "./IDetectorModel";

interface IManifest {
  detector: IDetectorModel;
  actuator: IActuatorModel;
}
export default IManifest;

import IResolverModel from "./IActuatorModel";
import IDetectorModel from "./IDetectorModel";

export interface IManifestAuto {
  detector: IDetectorModel;
  resolver: IResolverModel;
}

export interface IManifestManual {
  detector: IDetectorModel;
  resolvers: IResolverModel[];
}

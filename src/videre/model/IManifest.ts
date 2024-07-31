import type IResolverModel from "./IActuatorModel";
import type IDetectorModel from "./IDetectorModel";

export interface IManifestAuto {
  detector: IDetectorModel;
  resolver: IResolverModel;
}

export interface IManifestManual {
  detector: IDetectorModel;
  resolvers: IResolverModel[];
}

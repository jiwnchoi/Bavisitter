import { isTooManyBins } from "videre/detectors/encoding";
import type { IManifestManual } from "videre/model";

const tooManyBins: IManifestManual = {
  detector: {
    id: "too-many-bins",
    type: "perception",
    description:
      "The number of explicitly specified bins is excessive, leading to visual complexity.",
    detect: isTooManyBins,
  },
  resolvers: [
    {
      id: "reduce-bin-count",
      trigger: () => true,
      description: "Reduce the number of bins to improve readability.",
    },
  ],
};

export default tooManyBins;

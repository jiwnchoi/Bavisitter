import { isNotZeroInPosition } from "videre/detectors/encoding";
import { IManifestManual } from "videre/model";

const noZeroInPosition: IManifestManual = {
  detector: {
    id: "no-zero-in-position",
    type: "interpretability",
    description: "Zero is not included in the position scale.",
    detect: isNotZeroInPosition,
  },
  resolvers: [
    {
      id: "include-zero-in-position",
      trigger: () => true,
      description: "Include zero in the position scale.",
    },
  ],
};

export default noZeroInPosition;

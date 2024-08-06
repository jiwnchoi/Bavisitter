import { isSmallMarks } from "videre/detectors/encoding";
import type { IManifestManual } from "videre/model";

const smallMarks: IManifestManual = {
  detector: {
    id: "small-marks",
    type: "legibility",
    description: "The size of marks is too small, potentially affecting legibility.",
    detect: isSmallMarks,
  },
  resolvers: [
    {
      id: "increase-mark-size",
      trigger: () => true,
      description: "Increase the size of marks to improve visibility.",
    },
  ],
};

export default smallMarks;

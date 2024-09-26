import { isNotLegend } from "videre/detectors/encoding";
import type { IManifestManual } from "videre/model";

const noLegend: IManifestManual = {
  detector: {
    id: "no-legend",
    type: "legibility",
    description: "Legends are missing.",
    detect: isNotLegend,
  },
  resolvers: [
    {
      id: "add-legend",
      trigger: () => true,
      description: "Add legends.",
    },
  ],
};

export default noLegend;

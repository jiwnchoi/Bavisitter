import { isMark } from "videre/detectors/encoding";
import { isUnderplotted } from "videre/detectors/perception";
import type { IManifestManual } from "videre/model";
import { asyncAnd } from "videre/utils";

const sparseMarks: IManifestManual = {
  detector: {
    id: "sparse-marks",
    type: "perception",
    description: "Marks are sparse.",
    detect: await asyncAnd(isMark(["point", "circle"]), isUnderplotted),
  },
  resolvers: [
    {
      id: "scatterplot-to-heatmap",
      description: "Convert scatterplot to bar chart.",
      trigger: isMark(["point", "circle"]),
    },
  ],
};

export default sparseMarks;

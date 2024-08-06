import { isMark } from "videre/detectors/encoding";
import { isUnderplotted } from "videre/detectors/perception";
import type { IManifestManual } from "videre/model";
import { asyncAnd } from "videre/utils";

const sparseMarks: IManifestManual = {
  detector: {
    id: "sparse-marks",
    type: "perception",
    description: "Marks are too sparse.",
    detect: await asyncAnd(isMark(["point", "circle"]), isUnderplotted),
  },
  resolvers: [
    {
      id: "increase-mark-size",
      description: "Increase mark size.",
      trigger: isMark(["point", "circle"]),
    },
  ],
};

export default sparseMarks;

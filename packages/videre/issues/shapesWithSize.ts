import { isShapesWithSize } from "videre/detectors/encoding";
import type { IManifestManual } from "videre/model";

const shapesWithSize: IManifestManual = {
  detector: {
    id: "shapes-with-size",
    type: "interpretability",
    description: "Shapes other than circles are used to encode size.",
    detect: isShapesWithSize,
  },
  resolvers: [
    {
      id: "use-circles-for-size",
      trigger: () => true,
      description: "Use circles to encode size.",
    },
  ],
};

export default shapesWithSize;

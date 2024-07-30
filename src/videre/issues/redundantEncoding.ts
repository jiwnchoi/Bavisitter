import { isRedundantEncoding } from "videre/detectors/encoding";
import { IManifestManual } from "videre/model";

const redundantEncoding: IManifestManual = {
  detector: {
    id: "redundant-encoding",
    type: "effectiveness",
    description:
      "Unnecessary multiple encodings are used to represent the same data.",
    detect: isRedundantEncoding,
  },
  resolvers: [
    {
      id: "remove-redundant-encoding",
      trigger: () => true,
      description: "Remove redundant encodings to simplify the visualization.",
    },
  ],
};

export default redundantEncoding;

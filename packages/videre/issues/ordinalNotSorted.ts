import { isOrdinalNotSorted } from "videre/detectors/encoding";
import type { IManifestManual } from "videre/model";

const ordinalNotSorted: IManifestManual = {
  detector: {
    id: "is-ordinal-not-sorted",
    type: "interpretability",
    description: "Ordinal data is not sorted.",
    detect: isOrdinalNotSorted,
  },
  resolvers: [
    {
      id: "sort-ordinal-data",
      trigger: () => true,
      description: "Sort the ordinal data.",
    },
  ],
};

export default ordinalNotSorted;

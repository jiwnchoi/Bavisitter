import { isNotBinNice } from "videre/detectors/encoding";
import { IManifestManual } from "videre/model";

const binIsNotNice: IManifestManual = {
  detector: {
    id: "is-not-bin-nice",
    type: "legibility",
    description: "The boundaries of bins are not nice numbers.",
    detect: isNotBinNice,
  },
  resolvers: [
    {
      id: "make-bin-nice",
      trigger: () => true,
      description: "Make the bin boundaries use human-friendly boundaries.",
    },
  ],
};
export default binIsNotNice;

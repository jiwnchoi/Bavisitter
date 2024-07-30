import { IManifestManual } from "videre/model";
import { isMark } from "videre/detectors/encoding";
import { and } from "videre/utils";
import { convertPieToBar } from "videre/resolvers/spec";
import { isDataBalanced } from "videre/detectors/data";

const indistinctTheta: IManifestManual = {
  detector: {
    id: "indistinct-theta",
    type: "effectiveness",
    description: "Values for theta channel are balanced.",
    detect: and(isMark(["arc"]), isDataBalanced("theta")),
  },
  resolvers: [
    {
      id: "convert-pie-to-bar",
      trigger: () => true,
      description: "Convert pie chart to bar chart.",
      resolve: [convertPieToBar],
    },
  ],
};

export default indistinctTheta;

import { isChannelProp, isMark } from "videre/detectors/encoding";
import { replaceMark } from "videre/resolvers/spec";
import { and } from "videre/utils";

const lineForNominal = {
  detector: {
    id: "line-for-nominal",
    description: "Line chart is used for categorical attribute.",
    detect: and(isMark(["line"]), isChannelProp("x", "type", "nominal")),
    type: "expressiveness",
  },
  resolvers: [
    {
      id: "convert-line-to-bar",
      trigger: () => true,
      description: "Convert line chart to bar chart",
      resolve: [replaceMark("bar")],
    },
  ],
};

export default lineForNominal;

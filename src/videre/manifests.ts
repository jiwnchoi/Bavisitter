import {
  removeMissingValue,
  removeNegativeValues,
  removeZeroValues,
} from "videre/actions/data";
import {
  applyScale,
  convertPieToBar,
  convertScatterToHeatmap,
  reduceOpacity,
  replaceMark,
} from "videre/actions/spec";
import { isDataBalanced, isDataSkewed } from "videre/detectors/data";
import { isChannelProp, isMark } from "videre/detectors/encoding";
import { isOverplotted } from "videre/detectors/perception";
import { IManifestManual } from "videre/model";
import { applyJitter } from "./actions/spec/jittering";
import { and, not } from "./utils";

const manifest: IManifestManual[] = [
  {
    detector: {
      id: "line-for-nominal",
      type: "expressivenss",
      description: "Line chart is used for nominal data.",
      detect: await and(
        isMark(["line"]),
        isChannelProp("x", "type", "nominal"),
      ),
    },
    resolvers: [
      {
        id: "convert-line-to-bar",
        trigger: () => true,
        description: "Convert line chart to bar chart",
        resolve: [replaceMark("bar")],
      },
    ],
  },
  {
    detector: {
      id: "indistinct-theta",
      type: "effectiveness",
      description: "Values for theta channel are balanced.",
      detect: await and(isMark(["arc"]), isDataBalanced("theta")),
    },
    resolvers: [
      {
        id: "convert-pie-to-bar",
        trigger: () => true,
        description: "Convert pie chart to bar chart",
        resolve: [convertPieToBar],
      },
    ],
  },
  {
    detector: {
      id: "overplotted-marks",
      type: "perception",
      description: "Marks are overplotted.",
      detect: await and(isMark(["point", "circle"]), isOverplotted),
    },
    resolvers: [
      {
        id: "apply-jitter-x",
        description: "Apply jittering to the x-axis.",
        trigger: await and(
          isChannelProp("x", "type", ["ordinal", "nominal"]),
          await not(isChannelProp("xOffset", "type", "quantitative")),
        ),
        resolve: [applyJitter("x")],
      },
      {
        id: "apply-jitter-y",
        description: "Apply jittering to the y-axis.",
        trigger: await and(
          isChannelProp("y", "type", ["ordinal", "nominal"]),
          await not(isChannelProp("yOffset", "type", "quantitative")),
        ),
        resolve: [applyJitter("y")],
      },
      {
        id: "scatterplot-to-heatmap",
        description: "Convert scatterplot to heatmap.",
        trigger: isMark(["point", "circle"]),
        resolve: [convertScatterToHeatmap],
      },
      {
        id: "reduce-opacity",
        trigger: () => true,
        description: "Reduce opacity of marks.",
        resolve: [reduceOpacity],
      },
      {
        id: "apply-log-scale-x",
        description:
          "Remove non-negative values and apply log scale to x-axis.",
        trigger: await and(
          isDataSkewed("x", "positive"),
          await not(isChannelProp("x", "scale", { type: "log" })),
        ),
        resolve: [
          removeNegativeValues(["x"]),
          removeZeroValues(["x"]),
          applyScale("x", "log"),
        ],
      },
      {
        id: "apply-log-scale-y",
        description:
          "Remove non-negative values and apply log scale to y-axis.",
        trigger: await and(
          isDataSkewed("y", "positive"),
          await not(isChannelProp("y", "scale", { type: "log" })),
        ),
        resolve: [
          removeNegativeValues(["y"]),
          removeZeroValues(["y"]),
          applyScale("y", "log"),
        ],
      },
      {
        id: "apply-pow-scale-x",
        description: "Apply power scale to x-axis.",
        trigger: await and(
          isDataSkewed("x", "negative"),
          await not(isChannelProp("x", "scale", { type: "pow" })),
        ),
        resolve: [applyScale("x", "pow")],
      },
      {
        id: "apply-pow-scale-y",
        description: "Apply power scale to y-axis.",
        trigger: await and(
          isDataSkewed("y", "negative"),
          await not(isChannelProp("y", "scale", { type: "pow" })),
        ),
        resolve: [applyScale("y", "pow")],
      },
    ],
  },
];

export default manifest;

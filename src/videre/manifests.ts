import { Encoding } from "vega-lite/build/src/encoding";
import { removeNegativeValues, removeZeroValues } from "videre/actions/data";
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
import { isCardinalityExcessive } from "./detectors/data/isCardinality";
import { and, asyncAnd, not } from "./utils";

const manifest: IManifestManual[] = [
  ...["x", "y"].map(
    (channel): IManifestManual => ({
      detector: {
        id: "label-overlap",
        type: "legibility",
        description: "Labels overlap each other.",
        detect: and(
          isCardinalityExcessive(channel as keyof Encoding<string>),
          isChannelProp(channel as keyof Encoding<string>, "type", "nominal"),
        ),
      },
      resolvers: [
        {
          id: "filter-20-and-group-rest",
          trigger: () => true,
          description: "Filter 20 unique values and group the rest.",
        },
      ],
    }),
  ),
  {
    detector: {
      id: "line-for-nominal",
      type: "expressivenss",
      description: "Line chart is used for categorical attribute.",
      detect: and(isMark(["line"]), isChannelProp("x", "type", "nominal")),
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
      detect: and(isMark(["arc"]), isDataBalanced("theta")),
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
      detect: await asyncAnd(isMark(["point", "circle"]), isOverplotted),
    },
    resolvers: [
      {
        id: "apply-jitter-x",
        description: "Apply jittering to the x-axis.",
        trigger: and(
          isChannelProp("x", "type", ["ordinal", "nominal"]),
          not(isChannelProp("xOffset", "type", "quantitative")),
        ),
        resolve: [applyJitter("x")],
      },
      {
        id: "apply-jitter-y",
        description: "Apply jittering to the y-axis.",
        trigger: and(
          isChannelProp("y", "type", ["ordinal", "nominal"]),
          not(isChannelProp("yOffset", "type", "quantitative")),
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
        trigger: and(
          isDataSkewed("x", "positive"),
          not(isChannelProp("x", "scale", { type: "log" })),
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
        trigger: and(
          isDataSkewed("y", "positive"),
          not(isChannelProp("y", "scale", { type: "log" })),
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
        trigger: and(
          isDataSkewed("x", "negative"),
          not(isChannelProp("x", "scale", { type: "pow" })),
        ),
        resolve: [applyScale("x", "pow")],
      },
      {
        id: "apply-pow-scale-y",
        description: "Apply power scale to y-axis.",
        trigger: and(
          isDataSkewed("y", "negative"),
          not(isChannelProp("y", "scale", { type: "pow" })),
        ),
        resolve: [applyScale("y", "pow")],
      },
    ],
  },
];

export default manifest;

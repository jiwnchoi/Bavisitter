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
import { isDataBalanced, isDataSkewed, isCardinalityOne, isCardinalityExcessive} from "videre/detectors/data";
import { isChannelProp, isMark, 
  isRedundantEncoding, 
  noZeroInPosition, isOrdinalNotSorted, 
  isNotBinNice, noLabels, noLegend, noTicks,
  shapesWithSize,
} from "videre/detectors/encoding";
import { isOverplotted } from "videre/detectors/perception";
import { IManifestManual } from "videre/model";
import { applyJitter } from "./actions/spec/jittering";
import { and, not } from "./utils";
import { } from './detectors/encoding/noZeroInPosition';
import { Encoding } from 'vega-lite/build/src/encoding';

const manifest: IManifestManual[] = [
  {// "line-for-categorical"
    detector: {
      id: "line-for-nominal",
      type: "expressiveness",
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
  {// "cat-colors-for-ordered"
    detector: {
      id: "cat-colors-for-ordered",
      type: "expressiveness",
      description: "Categorical colors are used for ordered data.",
      detect: await and(
        isChannelProp("color", "type", "nominal"),
        isChannelProp("x", "type", "ordinal"),
      ),
    },
    resolvers: [
      {
        id: "convert-cat-to-seq-colors",
        trigger: () => true,
        description: "Convert categorical color scale to a more appropriate scale for ordered data."
      }
    ]
  },
  { // cont-colors-for-cat
    detector: {
      id: "cont-colors-for-cat",
      type: "expressiveness",
      description: "Continuous colors are used for categorical data.",
      detect: await and(
        await not(isChannelProp("color", "type", "nominal")),
        isChannelProp("x", "type", "nominal"),
      ),
    },
    resolvers: [
      {
        id: "convert-cont-to-cat-colors",
        trigger: () => true,
        description: "Convert continuous color scale to categorical color scale for nominal data.",
      }
    ]
  },
  // "cardinality-is-one"
  ...["x", "y"].map(
    (channel): IManifestManual => ({
    detector: {
      id: "cardinality-is-one",
      type: "effectiveness",
      description: "Assigning a visual channel to an attribute of cardinality 1 is ineffective.",
      detect: isCardinalityOne(channel as keyof Encoding<string>),
    },
    resolvers: [
      {
        id: "remove-ineffective-encoding",
        trigger: () => true,
        description: "Remove the encoding from channels where the attribute's cardinality is 1."
      }
    ]}),
  ),
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
  {// "redundant-encoding"
    detector: {
      id: "redundant-encoding",
      type: "effectiveness",
      description: "Unnecessary multiple encodings are used to represent the same data.",
      detect: isRedundantEncoding(),
    },
    resolvers: [
      {
        id: "remove-redundant-encoding",
        trigger: () => true,
        description: "Remove redundant encodings to simplify the visualization."
      }
    ]
  }, // "exccessive-cardinaility"
  ...["x", "y"].map(
    (channel): IManifestManual => ({
      detector: {
        id: "exccessive-cardinaility",
        type: "effectiveness",
        description: "The cardinality of a categorical attribute is too high.",
        detect: isCardinalityExcessive(channel as keyof Encoding<string>),
      },
      resolvers: [
        {
          id: `reduce-cardinality`,
          trigger: () => true,
          description: `Reduce the cardinality of the channel.`
        },
      ],
    }),
  ),
  { // "no-zero-in-position"
    detector: {
      id: "no-zero-in-position",
      type: "interpretability",
      description: "Zero is not included in the position scale.",
      detect: noZeroInPosition(),
    },
    resolvers: [
      {
        id: "include-zero-in-position",
        trigger: () => true,
        description: "Include zero in the position scale."
      }
    ]
  },
  { // "is-ordinal-not-sorted"
    detector:{
      id: "is-ordinal-not-sorted",
      type: "interpretability",
      description: "Ordinal data is not sorted.",
      detect: isOrdinalNotSorted(),
    },
    resolvers: [
      {
        id: "sort-ordinal-data",
        trigger: () => true,
        description: "Sort the ordinal data."
      }
    ]
  },
  { // "is-not-bin-nice"
    detector:{
      id: "is-not-bin-nice",
      type: "legibility",
      description: "The boundaries of bins are not nice numbers.",
      detect: isNotBinNice(),
    },
    resolvers: [
      {
        id: "make-bin-nice",
        trigger: () => true,
        description: "Make the bin boundaries use human-friendly boundaries.",
      }
    ]
  },
  // "no-labels"
  ...["x", "y"].map(
    (channel): IManifestManual => ({
    detector: {
      id: "no-labels",
      type: "legibility",
      description: "Labels are missing.",
      detect: noLabels(channel as keyof Encoding<string>),
    },
    resolvers: [
      {
        id: "add-labels",
        trigger: () => true,
        description: "Add labels."
      }
    ]}),
  ),
  ...["x", "y"].map(
    (channel): IManifestManual => ({
    detector: {
      id: "no-ticks",
      type: "legibility",
      description: "Ticks are missing.",
      detect: noTicks(channel as keyof Encoding<string>),
    },
    resolvers: [
      {
        id: "add-ticks",
        trigger: () => true,
        description: "Add ticks."
      }
    ]}),
  ),
  { // "no-legend"
    detector:{
      id: "no-legend",
      type: "legibility",
      description: "Legends are missing.",
      detect: noLegend(),
    },
    resolvers: [
      {
        id: "add-legend",
        trigger: () => true,
        description: "Add legends."
      }
    ]
  }, 
  { // "shapes-with-size"
    detector:{
      id: "shapes-with-size",
      type: "interpretability",
      description: "Shapes other than circles are used to encode size.",
      detect: shapesWithSize(),
    },
    resolvers: [
      {
        id: "use-circles-for-size",
        trigger: () => true,
        description: "Use circles to encode size.",
      }
    ]
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

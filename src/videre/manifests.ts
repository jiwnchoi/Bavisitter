import { Encoding } from "vega-lite/build/src/encoding";
import { removeNegativeValues, removeZeroValues } from "videre/actions/data";
import {
  applyScale,
  convertPieToBar,
  convertScatterToHeatmap,
  reduceOpacity,
  replaceMark,
} from "videre/actions/spec";
import {
  isCardinalityExcessive,
  isCardinalityOne,
  isDataBalanced,
  isDataSkewed,
} from "videre/detectors/data";
import {
  isChannel,
  isChannelProp,
  isMark,
  isNotBinNice,
  isOrdinalNotSorted,
  isRedundantEncoding,
  noLabels,
  noLegend,
  noTicks,
  noZeroInPosition,
  shapesWithSize,
} from "videre/detectors/encoding";
import { isOverplotted } from "videre/detectors/perception";
import { IManifestManual } from "videre/model";
import { applyJitter } from "./actions/spec/jittering";
import { and, asyncAnd, not } from "./utils";

const manifest: IManifestManual[] = [
  ...["x", "y"].map(
    (channel): IManifestManual => ({
      detector: {
        id: `labels-overlap-${channel}`,
        type: "legibility",
        description: `Labels are overlap each other in the ${channel} channel.`,
        detect: and(
          isChannelProp(channel as keyof Encoding<string>, "type", [
            "nominal",
            "ordinal",
          ]),
          isCardinalityExcessive(channel as keyof Encoding<string>),
        ),
      },
      resolvers: [
        {
          id: "filter-20-and-group-rest",
          trigger: () => true,
          description: "Rotate labels to avoid overlap.",
        },
      ],
    }),
  ),
  {
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
  },
  {
    // "cat-colors-for-ordered"
    detector: {
      id: "cat-colors-for-ordered",
      type: "expressiveness",
      description: "Categorical colors are used for ordered data.",
      detect: and(
        isChannelProp("color", "scheme"),
        not(isChannelProp("color", "type", "nominal")),
        not(
          isChannelProp("color", "scheme", [
            "blues",
            "tealblues",
            "teals",
            "greens",
            "browns",
            "oranges",
            "reds",
            "purples",
            "warmgreys",
            "greys",
            "viridis",
            "magma",
            "inferno",
            "plasma",
            "cividis",
            "turbo",
            "bluegreen",
            "bluepurple",
            "goldgreen",
            "goldorange",
            "goldred",
            "greenblue",
            "orangered",
            "purplebluegreen",
            "purpleblue",
            "purplered",
            "redpurple",
            "yellowgreenblue",
            "yellowgreen",
            "yelloworangebrown",
            "yelloworangered",
            "darkblue",
            "darkgold",
            "darkgreen",
            "darkmulti",
            "darkred",
            "lightgreyred",
            "lightgreyteal",
            "lightmulti",
            "lightorange",
            "lighttealblue",
            "blueorange",
            "brownbluegreen",
            "purplegreen",
            "pinkyellowgreen",
            "purpleorange",
            "redblue",
            "redgrey",
            "redyellowblue",
            "redyellowgreen",
            "spectral",
          ]),
        ),
      ),
    },
    resolvers: [
      {
        id: "convert-cat-to-seq-colors",
        trigger: () => true,
        description:
          "Convert categorical color scale to a more appropriate scale for ordered data.",
      },
    ],
  },
  {
    // cont-colors-for-cat
    detector: {
      id: "cont-colors-for-cat",
      type: "expressiveness",
      description: "Continuous colors are used for categorical data.",
      detect: and(
        isChannelProp("color", "type", "nominal"),
        isChannelProp("color", "scheme"),
        not(
          isChannelProp("color", "scheme", [
            "accent",
            "category10",
            "category20",
            "category20b",
            "category20c",
            "observable10",
            "dark2",
            "paired",
            "pastel1",
            "pastel2",
            "set1",
            "set2",
            "set3",
            "tableau10",
            "tableau20",
          ]),
        ),
      ),
    },
    resolvers: [
      {
        id: "convert-cont-to-cat-colors",
        trigger: () => true,
        description:
          "Convert continuous color scale to categorical color scale for nominal data.",
      },
    ],
  },
  // "cardinality-is-one"
  ...["x", "y", "color"].map(
    (channel): IManifestManual => ({
      detector: {
        id: `cardinality-is-one-${channel}`,
        type: "effectiveness",
        description: `Assigning a ${channel} channel to an attribute of cardinality 1 is ineffective.`,
        detect: and(
          isChannel(channel as keyof Encoding<string>),
          isCardinalityOne(channel as keyof Encoding<string>),
        ),
      },
      resolvers: [
        {
          id: "remove-ineffective-encoding",
          trigger: () => true,
          description:
            "Move the unique value's information to title and reduct encoding dimensionality.",
        },
      ],
    }),
  ),
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
    // "redundant-encoding"
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
        description:
          "Remove redundant encodings to simplify the visualization.",
      },
    ],
  }, // "exccessive-cardinaility"
  ...["x", "y", "color"].map(
    (channel): IManifestManual => ({
      detector: {
        id: `excessive-cardinality-${channel}`,
        type: "effectiveness",
        description: `The cardinality of a ${channel} channel is too high.`,
        detect: and(
          isChannel(channel as keyof Encoding<string>),
          isChannelProp(channel as keyof Encoding<string>, "type", [
            "nominal",
            "ordinal",
          ]),
          isCardinalityExcessive(channel as keyof Encoding<string>),
        ),
      },
      resolvers: [
        {
          id: `reduce-cardinality`,
          trigger: () => true,
          description: `Filter 20 unique values and group the rest.`,
        },
      ],
    }),
  ),
  {
    // "no-zero-in-position"
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
        description: "Include zero in the position scale.",
      },
    ],
  },
  {
    // "is-ordinal-not-sorted"
    detector: {
      id: "is-ordinal-not-sorted",
      type: "interpretability",
      description: "Ordinal data is not sorted.",
      detect: isOrdinalNotSorted(),
    },
    resolvers: [
      {
        id: "sort-ordinal-data",
        trigger: () => true,
        description: "Sort the ordinal data.",
      },
    ],
  },
  {
    // "is-not-bin-nice"
    detector: {
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
      },
    ],
  },
  // "no-labels"
  ...["x", "y"].map(
    (channel): IManifestManual => ({
      detector: {
        id: `no-labels-${channel}`,
        type: "legibility",
        description: `Labels are missing in ${channel} channel.`,
        detect: noLabels(channel as keyof Encoding<string>),
      },
      resolvers: [
        {
          id: "add-labels",
          trigger: () => true,
          description: "Add labels.",
        },
      ],
    }),
  ),
  ...["x", "y"].map(
    (channel): IManifestManual => ({
      detector: {
        id: `no-ticks-${channel}`,
        type: "legibility",
        description: `Ticks are missing in ${channel} channel.`,
        detect: noTicks(channel as keyof Encoding<string>),
      },
      resolvers: [
        {
          id: "add-ticks",
          trigger: () => true,
          description: "Add ticks.",
        },
      ],
    }),
  ),
  {
    // "no-legend"
    detector: {
      id: "no-legend",
      type: "legibility",
      description: "Legends are missing.",
      detect: noLegend(),
    },
    resolvers: [
      {
        id: "add-legend",
        trigger: () => true,
        description: "Add legends.",
      },
    ],
  },
  {
    // "shapes-with-size"
    detector: {
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

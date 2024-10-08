import { isChannelProp } from "videre/detectors/encoding";
import type { IManifestManual } from "videre/model";
import { and, not } from "videre/utils";

const ORDERED_COLOR_SCHEMES = [
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
];

const catColorsForOrdered: IManifestManual = {
  detector: {
    id: "cat-colors-for-ordered",
    type: "expressiveness",
    description: "Categorical colors are used for ordered data.",
    detect: and(
      isChannelProp("color", "scheme"),
      not(isChannelProp("color", "type", "nominal")),
      not(isChannelProp("color", "scheme", ORDERED_COLOR_SCHEMES)),
    ),
  },
  resolvers: [
    {
      id: "convert-cat-to-seq-colors",
      trigger: () => true,
      description: "Convert categorical color scale to a more appropriate scale for ordered data.",
    },
  ],
};

export default catColorsForOrdered;

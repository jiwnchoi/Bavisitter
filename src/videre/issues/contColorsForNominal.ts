import { isChannelProp } from "videre/detectors/encoding";
import type { IManifestManual } from "videre/model";
import { and, not } from "videre/utils";

const contColorsForNominal: IManifestManual = {
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
      description: "Convert continuous color scale to categorical color scale for nominal data.",
    },
  ],
};

export default contColorsForNominal;

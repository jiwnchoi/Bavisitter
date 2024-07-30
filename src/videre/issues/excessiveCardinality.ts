import { Encoding } from "vega-lite/build/src/encoding";
import { isCardinalityExcessive } from "videre/detectors/data";
import { isChannel, isChannelProp } from "videre/detectors/encoding";
import { IManifestManual } from "videre/model";
import { and } from "videre/utils";

const exccessiveCardinality = ["x", "y", "color"].map(
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
);

export default exccessiveCardinality;

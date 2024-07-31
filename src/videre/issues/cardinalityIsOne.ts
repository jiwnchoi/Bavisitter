import type { Encoding } from "vega-lite/build/src/encoding";
import { isCardinalityOne } from "videre/detectors/data";
import { isChannel } from "videre/detectors/encoding";
import type { IManifestManual } from "videre/model";
import { and } from "videre/utils";

const cardinalityIsOne = ["x", "y", "color"].map(
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
          "Move the unique value's information to title and reduce encoding dimensionality.",
      },
    ],
  }),
);

export default cardinalityIsOne;

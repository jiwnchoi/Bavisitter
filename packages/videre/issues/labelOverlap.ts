import type { Encoding } from "vega-lite/build/src/encoding";
import { isCardinalityExcessive } from "videre/detectors/data";
import { isChannelProp } from "videre/detectors/encoding";
import type { IManifestManual } from "videre/model";
import { and } from "videre/utils";

const labelOverlap = ["x", "y"].map(
  (channel): IManifestManual => ({
    detector: {
      id: `labels-overlap-${channel}`,
      type: "legibility",
      description: `Labels are overlap each other in the ${channel} channel.`,
      detect: and(
        isChannelProp(channel as keyof Encoding<string>, "type", ["nominal", "ordinal"]),
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
);

export default labelOverlap;

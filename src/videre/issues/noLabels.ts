import type { Encoding } from "vega-lite/build/src/encoding";
import { isNotLabels } from "videre/detectors/encoding";
import type { IManifestManual } from "videre/model";

const noLabels = ["x", "y"].map(
  (channel): IManifestManual => ({
    detector: {
      id: `no-labels-${channel}`,
      type: "legibility",
      description: `Labels are missing in ${channel} channel.`,
      detect: isNotLabels(channel as keyof Encoding<string>),
    },
    resolvers: [
      {
        id: "add-labels",
        trigger: () => true,
        description: "Add labels.",
      },
    ],
  }),
);

export default noLabels;

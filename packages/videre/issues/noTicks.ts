import type { Encoding } from "vega-lite/build/src/encoding";
import { isNotTicks } from "videre/detectors/encoding";
import type { IManifestManual } from "videre/model";

const noTicks = ["x", "y"].map(
  (channel): IManifestManual => ({
    detector: {
      id: `no-ticks-${channel}`,
      type: "legibility",
      description: `Ticks are missing in ${channel} channel.`,
      detect: isNotTicks(channel as keyof Encoding<string>),
    },
    resolvers: [
      {
        id: "add-ticks",
        trigger: () => true,
        description: "Add ticks.",
      },
    ],
  }),
);

export default noTicks;

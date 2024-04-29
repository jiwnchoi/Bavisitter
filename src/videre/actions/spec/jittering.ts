import { State } from "videre/model";

export function applyJitter(channel: "x" | "y") {
  return (state: State) => {
    const { spec } = state;
    const jitterChannel = channel === "x" ? "xOffset" : "yOffset";

    const newSpec = {
      ...spec,
      transform: [
        {
          calculate: "random()",
          as: `jitter${channel}`,
        },
      ],
      encoding: {
        ...spec.encoding,
        [jitterChannel]: {
          field: `jitter${channel}`,
          type: "quantitative",
        },
      },
    };

    return state.updateSpec(newSpec);
  };
}

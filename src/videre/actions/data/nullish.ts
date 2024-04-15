import { State } from "videre/model";
import { Encoding } from "vega-lite/build/src/encoding";

export function removeMissingValue(channels: (keyof Encoding<string>)[]) {
  return (state: State) => {
    const { data } = state;
    const newData = data.filter((d) =>
      channels.every((channel) => d[channel] !== null),
    );
    return state.updateSpec(undefined, undefined, newData);
  };
}

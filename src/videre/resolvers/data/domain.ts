import type { Encoding } from "vega-lite/build/src/encoding";
import type { State } from "videre/model";

export function removeZeroValues(channels: (keyof Encoding<string>)[]) {
  return (state: State) => {
    const { data } = state;
    const newData = data.filter(d =>
      channels.every(channel => {
        const fieldName = state.getFieldFromChannel(channel);
        if (!fieldName) return true;
        return d[fieldName] !== 0;
      }),
    );
    return state.updateSpec(undefined, undefined, newData);
  };
}

export function removeNegativeValues(channels: (keyof Encoding<string>)[]) {
  return (state: State) => {
    const { data } = state;
    const newData = data.filter(d =>
      channels.every(channel => {
        const fieldName = state.getFieldFromChannel(channel);
        if (!fieldName) return true;
        return d[fieldName] >= 0;
      }),
    );
    return state.updateSpec(undefined, undefined, newData);
  };
}

export function removePositiveValues(channels: (keyof Encoding<string>)[]) {
  return (state: State) => {
    const { data } = state;
    const newData = data.filter(d =>
      channels.every(channel => {
        const fieldName = state.getFieldFromChannel(channel);
        if (!fieldName) return true;
        return d[fieldName] <= 0;
      }),
    );
    return state.updateSpec(undefined, undefined, newData);
  };
}

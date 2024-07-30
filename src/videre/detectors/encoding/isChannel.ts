import { type Encoding } from "vega-lite/build/src/encoding";
import { isUnitSpec } from "vega-lite/build/src/spec";
import { State } from "videre/model";

export default function isChannel(channelName: keyof Encoding<string>) {
  return (state: State) => {
    if (!isUnitSpec(state.spec)) {
      throw new Error("Spec is not a unit spec");
    }

    if (!state.spec.encoding) {
      throw new Error("Spec has no encoding");
    }
    const { spec } = state;
    return spec.encoding && channelName in spec.encoding;
  };
}

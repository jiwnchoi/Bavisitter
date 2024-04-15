//@ts-nocheck
import { State } from "videre/model";
import { PositionFieldDef } from "vega-lite/build/src/channeldef";
import { type Encoding } from "vega-lite/build/src/encoding";
import { isUnitSpec } from "vega-lite/build/src/spec";
import { deepEqual } from "vega-lite";

export default function isChannelProp(
  channelName: keyof Encoding<string>,
  prop: string,
  value: any,
) {
  return (state: State) => {
    if (!isUnitSpec(state.spec)) {
      throw new Error("Spec is not a unit spec");
    }

    if (!state.spec.encoding) {
      throw new Error("Spec has no encoding");
    }
    const { spec } = state;
    const encoding = spec.encoding![channelName] as PositionFieldDef<string>;
    console.log(encoding, prop, value, encoding && encoding[prop] === value);
    return encoding && deepEqual(encoding[prop], value);
  };
}

import { deepEqual } from "vega-lite";
import type { PositionFieldDef } from "vega-lite/build/src/channeldef";
import type { Encoding } from "vega-lite/build/src/encoding";
import { isUnitSpec } from "vega-lite/build/src/spec";
//@ts-nocheck
import type { State } from "videre/model";

export default function isChannelProp(
  channelName: keyof Encoding<string>,
  prop: string,
  value?: any,
) {
  return (state: State) => {
    if (!isUnitSpec(state.spec)) {
      throw new Error("Spec is not a unit spec");
    }

    if (!state.spec.encoding) {
      throw new Error("Spec has no encoding");
    }
    const { spec } = state;
    if (!spec.encoding[channelName]) {
      return false;
    }

    const encoding = spec.encoding![channelName] as PositionFieldDef<string>;

    if (Array.isArray(value)) {
      return value.some((v) => deepEqual(encoding[prop], v));
    }

    return encoding && deepEqual(encoding[prop], value);
  };
}

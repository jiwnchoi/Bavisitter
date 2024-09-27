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
    if (!spec.encoding || !spec.encoding[channelName]) {
      return false;
    }

    const encoding = spec.encoding![channelName] as PositionFieldDef<string>;

    // If value is undefined, just check if the property exists
    if (value === undefined) {
      return prop in encoding;
    }

    if (Array.isArray(value)) {
      return value.some((v) => deepEqual(encoding[prop as keyof PositionFieldDef<string>], v));
    }

    return encoding && deepEqual(encoding[prop as keyof PositionFieldDef<string>], value);
  };
}

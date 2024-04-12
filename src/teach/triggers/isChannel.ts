import { State } from "teach/model";
import { PositionFieldDef } from "vega-lite/build/src/channeldef";
import { type Encoding } from "vega-lite/build/src/encoding";
import { isUnitSpec } from "vega-lite/build/src/spec";
import { StandardType } from "vega-lite/build/src/type";

export default function isChannel(
  channelName: keyof Encoding<string>,
  type: StandardType,
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
    return encoding && encoding.type === type;
  };
}

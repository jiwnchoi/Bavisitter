import { State } from "teach/model";
import { PositionFieldDef } from "vega-lite/build/src/channeldef";
import { cloneDeep } from "lodash-es";

function applyScale(channelName: "x" | "y", type: "log" | "linear" | "pow") {
  return (state: State) => {
    const { spec } = state;
    const newSpec = cloneDeep(spec);
    const channel = newSpec.encoding![channelName] as PositionFieldDef<string>;
    channel.scale = { type };
    return state.updateSpec(newSpec);
  };
}

function removeScale(channelName: "x" | "y") {
  return (state: State) => {
    const { spec } = state;
    const newSpec = cloneDeep(spec);
    const channel = newSpec.encoding![channelName] as PositionFieldDef<string>;
    delete channel.scale;
    return state.updateSpec(newSpec);
  };
}

export { applyScale, removeScale };

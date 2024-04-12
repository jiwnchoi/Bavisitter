import { State } from "teach/model";
import { PositionFieldDef } from "vega-lite/build/src/channeldef";

function applyScale(channelName: "x" | "y", type: "log" | "linear" | "pow") {
  return (state: State) => {
    const { spec } = state;
    const channel = spec.encoding![channelName] as PositionFieldDef<string>;
    channel.scale = { type };
    return state;
  };
}

function removeScale(channelName: "x" | "y") {
  return (state: State) => {
    const { spec } = state;
    const channel = spec.encoding![channelName] as PositionFieldDef<string>;
    delete channel.scale;
    return state;
  };
}

export { applyScale, removeScale };

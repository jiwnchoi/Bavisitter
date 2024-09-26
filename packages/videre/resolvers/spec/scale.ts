import type { PositionFieldDef } from "vega-lite/build/src/channeldef";
import type { State } from "videre/model";

function applyScale(channelName: "x" | "y", type: "log" | "symlog" | "linear" | "pow") {
  return (state: State) => {
    const { spec } = state;
    const newSpec = structuredClone(spec);
    const channel = newSpec.encoding![channelName] as PositionFieldDef<string>;
    channel.scale = { type };
    return state.updateSpec(newSpec);
  };
}

function removeScale(channelName: "x" | "y") {
  return (state: State) => {
    const { spec } = state;
    const newSpec = structuredClone(spec);
    const channel = newSpec.encoding![channelName] as PositionFieldDef<string>;
    delete channel.scale;
    return state.updateSpec(newSpec);
  };
}

export { applyScale, removeScale };

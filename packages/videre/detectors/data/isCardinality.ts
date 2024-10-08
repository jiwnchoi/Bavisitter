import type { PositionFieldDef } from "vega-lite/build/src/channeldef";
import type { Encoding } from "vega-lite/build/src/encoding";
import type { State } from "videre/model";

function isCardinalityExcessive(channel: keyof Encoding<string>) {
  return (state: State) => {
    const { data, spec } = state;
    const encoding = spec?.encoding;
    if (!encoding || !encoding[channel]) return false;
    const fieldDef = encoding[channel] as PositionFieldDef<string>;
    if (!("field" in fieldDef)) return false;
    const values = data.map((d) => d[fieldDef.field as string] ?? null);
    const uniqueValues = new Set(values);
    return channel === "color" ? uniqueValues.size > 10 : uniqueValues.size > 21;
  };
}

function isCardinalityOne(channel: keyof Encoding<string>) {
  return (state: State) => {
    const { data, spec } = state;
    const encoding = spec?.encoding;
    if (!encoding || !encoding[channel]) return false;
    const fieldDef = encoding[channel] as PositionFieldDef<string>;
    if (!("field" in fieldDef)) return false;
    const values = data.map((d) => d[fieldDef.field as string] ?? null);
    const uniqueValues = new Set(values);
    return uniqueValues.size === 1;
  };
}

export { isCardinalityExcessive, isCardinalityOne };

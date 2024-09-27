import type { Config } from "vega-lite";
import type { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";
import { State } from "videre/model";
import { describe, expect, it } from "vitest";
import isChannelProp from "./isChannelProp";

describe("isChannelProp", () => {
  const data = [
    { Horsepower: 130, Miles_per_Gallon: 18 },
    { Horsepower: 165, Miles_per_Gallon: 15 },
  ];

  const spec: TopLevelUnitSpec<string> = {
    data: { values: data },
    mark: "point",
    encoding: {
      x: { field: "Horsepower", type: "quantitative" },
      y: { field: "Miles_per_Gallon", type: "quantitative" },
    },
  };

  const specConfig: Config = {
    background: "transparent",
  };

  const state = new State(spec, specConfig, data);

  it("should return true if the channel property matches the value", () => {
    const checkChannelProp = isChannelProp("x", "field", "Horsepower");
    expect(checkChannelProp(state)).toBe(true);
  });

  it("should return false if the channel property does not match the value", () => {
    const checkChannelProp = isChannelProp("x", "field", "Miles_per_Gallon");
    expect(checkChannelProp(state)).toBe(false);
  });

  it("should return true if the channel property matches one of the values in the array", () => {
    const checkChannelProp = isChannelProp("x", "field", ["Horsepower", "Miles_per_Gallon"]);
    expect(checkChannelProp(state)).toBe(true);
  });

  it("should return false if the channel property does not match any of the values in the array", () => {
    const checkChannelProp = isChannelProp("x", "field", ["Cylinders", "Displacement"]);
    expect(checkChannelProp(state)).toBe(false);
  });

  it("should throw an error if the spec has no encoding", () => {
    const noEncodingSpec = { ...spec, encoding: undefined } as any;
    const noEncodingState = new State(noEncodingSpec, specConfig, data);
    const checkChannelProp = isChannelProp("x", "field", "Horsepower");
    expect(() => checkChannelProp(noEncodingState)).toThrow("Spec has no encoding");
  });

  it("should return false if the channel does not exist in the encoding", () => {
    const checkChannelProp = isChannelProp("color", "field", "Horsepower");
    expect(checkChannelProp(state)).toBe(false);
  });

  it("should return true if the channel has property", () => {
    const checkChannelProp = isChannelProp("x", "type");
    expect(checkChannelProp(state)).toBe(true);
  });

  it("should return false if the channel does not have property", () => {
    const checkChannelProp = isChannelProp("x", "scheme");
    expect(checkChannelProp(state)).toBe(false);
  });
});

import type { Config } from "vega-lite";
import type { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";
import { State } from "videre/model";
import { describe, expect, it } from "vitest";
import isChannel from "./isChannel";

describe("isChannel", () => {
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

  it("should return true if the channel exists in the encoding", () => {
    const checkChannel = isChannel("x");
    expect(checkChannel(state)).toBe(true);
  });

  it("should return false if the channel does not exist in the encoding", () => {
    const checkChannel = isChannel("color");
    expect(checkChannel(state)).toBe(false);
  });

  it("should throw an error if the spec has no encoding", () => {
    const noEncodingSpec = { ...spec, encoding: undefined } as any;
    const noEncodingState = new State(noEncodingSpec, specConfig, data);
    const checkChannel = isChannel("x");
    expect(() => checkChannel(noEncodingState)).toThrow("Spec has no encoding");
  });
});

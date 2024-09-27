import type { Config } from "vega-lite";
import type { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";
import { State } from "videre/model";
import { isCardinalityExcessive } from "./isCardinality";

describe("isCardinalityExcessive", () => {
  const data = [
    { Category: "A", Value: 1 },
    { Category: "B", Value: 2 },
    { Category: "C", Value: 3 },
    { Category: "D", Value: 4 },
    { Category: "E", Value: 5 },
    { Category: "F", Value: 6 },
    { Category: "G", Value: 7 },
    { Category: "H", Value: 8 },
    { Category: "I", Value: 9 },
    { Category: "J", Value: 10 },
    { Category: "K", Value: 11 },
    { Category: "L", Value: 12 },
    { Category: "M", Value: 13 },
    { Category: "N", Value: 14 },
    { Category: "O", Value: 15 },
    { Category: "P", Value: 16 },
    { Category: "Q", Value: 17 },
    { Category: "R", Value: 18 },
    { Category: "S", Value: 19 },
    { Category: "T", Value: 20 },
    { Category: "U", Value: 21 },
    { Category: "V", Value: 22 },
  ];

  const spec: TopLevelUnitSpec<string> = {
    data: { values: data },
    mark: "point",
    encoding: {
      x: { field: "Category", type: "nominal" },
      color: { field: "Category", type: "nominal" },
    },
  };

  const specConfig: Config = {
    background: "transparent",
  };

  const state = new State(spec, specConfig, data);

  it("should return true if the cardinality of the color channel is excessive", () => {
    const checkCardinality = isCardinalityExcessive("color");
    expect(checkCardinality(state)).toBe(true);
  });

  it("should return false if the cardinality of the color channel is not excessive", () => {
    const limitedData = data.slice(0, 10);
    const limitedSpec = { ...spec, data: { values: limitedData } };
    const limitedState = new State(limitedSpec, specConfig, limitedData);
    const checkCardinality = isCardinalityExcessive("color");
    expect(checkCardinality(limitedState)).toBe(false);
  });

  it("should return true if the cardinality of the x channel is excessive", () => {
    const checkCardinality = isCardinalityExcessive("x");
    expect(checkCardinality(state)).toBe(true);
  });

  it("should return false if the cardinality of the x channel is not excessive", () => {
    const limitedData = data.slice(0, 21);
    const limitedSpec = { ...spec, data: { values: limitedData } };
    const limitedState = new State(limitedSpec, specConfig, limitedData);
    const checkCardinality = isCardinalityExcessive("x");
    expect(checkCardinality(limitedState)).toBe(false);
  });

  it("should return false if the channel does not exist in the encoding", () => {
    const checkCardinality = isCardinalityExcessive("y");
    expect(checkCardinality(state)).toBe(false);
  });
});

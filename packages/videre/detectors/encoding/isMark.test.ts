import type { Config } from "vega-lite";
import type { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";
import { State } from "videre/model";
import { describe, expect, it } from "vitest";
import { isMark, isPieChart, isScatterplot } from "./isMark";

describe("isMark detectors", () => {
  const data = [
    { Horsepower: 130, Miles_per_Gallon: 18 },
    { Horsepower: 165, Miles_per_Gallon: 15 },
  ];

  const specConfig: Config = {
    background: "transparent",
  };

  describe("isScatterplot", () => {
    it("should return true for point mark", () => {
      const spec: TopLevelUnitSpec<string> = {
        data: { values: data },
        mark: "point",
        encoding: {
          x: { field: "Horsepower", type: "quantitative" },
          y: { field: "Miles_per_Gallon", type: "quantitative" },
        },
      };
      const state = new State(spec, specConfig, data);
      expect(isScatterplot(state)).toBe(true);
    });

    it("should return true for circle mark", () => {
      const spec: TopLevelUnitSpec<string> = {
        data: { values: data },
        mark: "circle",
        encoding: {
          x: { field: "Horsepower", type: "quantitative" },
          y: { field: "Miles_per_Gallon", type: "quantitative" },
        },
      };
      const state = new State(spec, specConfig, data);
      expect(isScatterplot(state)).toBe(true);
    });

    it("should return false for non-scatterplot mark", () => {
      const spec: TopLevelUnitSpec<string> = {
        data: { values: data },
        mark: "bar",
        encoding: {
          x: { field: "Horsepower", type: "quantitative" },
          y: { field: "Miles_per_Gallon", type: "quantitative" },
        },
      };
      const state = new State(spec, specConfig, data);
      expect(isScatterplot(state)).toBe(false);
    });
  });

  describe("isPieChart", () => {
    it("should return true for arc mark", () => {
      const spec: TopLevelUnitSpec<string> = {
        data: { values: data },
        mark: "arc",
        encoding: {
          theta: { field: "Horsepower", type: "quantitative" },
          color: { field: "Miles_per_Gallon", type: "nominal" },
        },
      };
      const state = new State(spec, specConfig, data);
      expect(isPieChart(state)).toBe(true);
    });

    it("should return false for non-pie chart mark", () => {
      const spec: TopLevelUnitSpec<string> = {
        data: { values: data },
        mark: "bar",
        encoding: {
          x: { field: "Horsepower", type: "quantitative" },
          y: { field: "Miles_per_Gallon", type: "quantitative" },
        },
      };
      const state = new State(spec, specConfig, data);
      expect(isPieChart(state)).toBe(false);
    });
  });

  describe("isMark", () => {
    it("should return true for specified marks", () => {
      const spec: TopLevelUnitSpec<string> = {
        data: { values: data },
        mark: "point",
        encoding: {
          x: { field: "Horsepower", type: "quantitative" },
          y: { field: "Miles_per_Gallon", type: "quantitative" },
        },
      };
      const state = new State(spec, specConfig, data);
      const checkMark = isMark(["point", "circle"]);
      expect(checkMark(state)).toBe(true);
    });

    it("should return false for unspecified marks", () => {
      const spec: TopLevelUnitSpec<string> = {
        data: { values: data },
        mark: "bar",
        encoding: {
          x: { field: "Horsepower", type: "quantitative" },
          y: { field: "Miles_per_Gallon", type: "quantitative" },
        },
      };
      const state = new State(spec, specConfig, data);
      const checkMark = isMark(["point", "circle"]);
      expect(checkMark(state)).toBe(false);
    });
  });
});

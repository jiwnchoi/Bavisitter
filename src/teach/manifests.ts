import {
  removeMissingValue,
  removeNegativeValues,
  removeZeroValues,
} from "teach/actions/data";
import { applyScale, convertPieToBar, reduceOpacity } from "teach/actions/spec";
import { isDataBalanced, isDataSkewed } from "teach/linters/data";
import { isChannelProp, isMark } from "teach/linters/encoding";
import { isOverplotted } from "teach/linters/perception";
import { IManifest } from "teach/model";
import { and, not } from "./utils";

const manifest: IManifest[] = [
  {
    linter: {
      type: "data",
      level: "soft",
      description: "Values for theta channel are balanced.",
      lint: and(isMark(["arc"]), isDataBalanced("theta")),
    },
    actuator: {
      type: "spec",
      description: "Convert pie chart to bar chart",
      action: [convertPieToBar],
    },
  },
  {
    linter: {
      type: "data",
      level: "soft",
      description: "Data on x-axis is skewed positive.",
      lint: and(
        isChannelProp("x", "type", "quantitative"),
        isDataSkewed("x", "positive"),
        not(isChannelProp("x", "scale", { type: "log" })),
      ),
    },
    actuator: {
      type: "spec",
      description:
        "Remove nullish and non-positive values and apply log scale to x-axis.",
      action: [
        removeMissingValue(["x"]),
        removeNegativeValues(["x"]),
        removeZeroValues(["x"]),
        applyScale("x", "log"),
      ],
    },
  },
  {
    linter: {
      type: "data",
      level: "soft",
      description: "Data on y-axis is skewed positive.",
      lint: and(
        isChannelProp("y", "type", "quantitative"),
        isDataSkewed("y", "positive"),
        not(isChannelProp("y", "scale", { type: "log" })),
      ),
    },
    actuator: {
      type: "data",
      description:
        "Remove nullish and non-positive values and apply log scale to y-axis.",
      action: [
        removeMissingValue(["y"]),
        removeNegativeValues(["y"]),
        removeZeroValues(["y"]),
        applyScale("y", "log"),
      ],
    },
  },
  {
    linter: {
      type: "data",
      level: "soft",
      description: "Data on x-axis is skewed negative.",
      lint: and(
        isChannelProp("x", "type", "quantitative"),
        isDataSkewed("x", "negative"),
        not(isChannelProp("x", "scale", { type: "pow" })),
      ),
    },
    actuator: {
      type: "spec",
      description: "Apply power scale to x-axis.",
      action: [applyScale("x", "pow")],
    },
  },
  {
    linter: {
      type: "data",
      level: "soft",
      description: "Data on y-axis is skewed negative.",
      lint: and(
        isChannelProp("y", "type", "quantitative"),
        isDataSkewed("y", "negative"),
        not(isChannelProp("y", "scale", { type: "pow" })),
      ),
    },
    actuator: {
      type: "spec",
      description: "Apply power scale to y-axis.",
      action: [applyScale("y", "pow")],
    },
  },
  {
    linter: {
      type: "perception",
      level: "soft",
      description: "Marks are overplotted.",
      lint: and(isMark(["point", "circle"]), isOverplotted),
    },
    actuator: {
      type: "spec",
      description: "Reduce opacity of marks.",
      action: [reduceOpacity],
    },
  },
];

export default manifest;

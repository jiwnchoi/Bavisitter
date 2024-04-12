import { applyScale, convertPieToBar, reduceOpacity } from "teach/actions/spec";
import { isDataBalanced, isDataSkewed } from "teach/linters/data";
import { isOverplotted } from "teach/linters/perception";
import { IManifest } from "teach/model";
import { isChannel, isMark } from "teach/triggers";
import {
  removeMissingValue,
  removeNegativeValues,
  removeZeroValues,
} from "teach/actions/data";

const manifest: IManifest[] = [
  {
    trigger: isMark(["arc"]),
    linter: {
      type: "data",
      level: "soft",
      description: "Values for theta channel are balanced.",
      lint: isDataBalanced("theta"),
    },
    actuator: {
      type: "spec",
      description: "Convert pie chart to bar chart",
      action: [convertPieToBar],
    },
  },
  {
    trigger: isChannel("x", "quantitative"),
    linter: {
      type: "data",
      level: "soft",
      description: "Data on x-axis is skewed positive.",
      lint: isDataSkewed("x", "positive"),
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
    trigger: isChannel("y", "quantitative"),
    linter: {
      type: "data",
      level: "soft",
      description: "Data on y-axis is skewed positive.",
      lint: isDataSkewed("y", "positive"),
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
    trigger: isChannel("x", "quantitative"),
    linter: {
      type: "data",
      level: "soft",
      description: "Data on x-axis is skewed negative.",
      lint: isDataSkewed("x", "negative"),
    },
    actuator: {
      type: "spec",
      description: "Apply power scale to x-axis.",
      action: [applyScale("x", "pow")],
    },
  },
  {
    trigger: isChannel("y", "quantitative"),
    linter: {
      type: "data",
      level: "soft",
      description: "Data on y-axis is skewed negative.",
      lint: isDataSkewed("y", "negative"),
    },
    actuator: {
      type: "spec",
      description: "Apply power scale to y-axis.",
      action: [applyScale("y", "pow")],
    },
  },
  {
    trigger: isMark(["point", "circle"]),
    linter: {
      type: "perception",
      level: "soft",
      description: "Marks are overplotted.",
      lint: isOverplotted,
    },
    actuator: {
      type: "spec",
      description: "Reduce opacity of marks.",
      action: [reduceOpacity],
    },
  },
];

export default manifest;

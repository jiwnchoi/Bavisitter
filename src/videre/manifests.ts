import {
  removeMissingValue,
  removeNegativeValues,
  removeZeroValues,
} from "videre/actions/data";
import {
  applyScale,
  convertPieToBar,
  reduceOpacity,
} from "videre/actions/spec";
import { isDataBalanced, isDataSkewed } from "videre/detectors/data";
import { isChannelProp, isMark } from "videre/detectors/encoding";
import { isOverplotted } from "videre/detectors/perception";
import { IManifest } from "videre/model";
import { and, not } from "./utils";

const manifest: IManifest[] = [
  {
    detector: {
      type: "data",
      level: "soft",
      description: "Values for theta channel are balanced.",
      detect: await and(isMark(["arc"]), isDataBalanced("theta")),
    },
    actuator: {
      type: "spec",
      description: "Convert pie chart to bar chart",
      action: [convertPieToBar],
    },
  },
  {
    detector: {
      type: "data",
      level: "soft",
      description: "Data on x-axis is skewed positive.",
      detect: await and(
        isChannelProp("x", "type", "quantitative"),
        isDataSkewed("x", "positive"),
        await not(isChannelProp("x", "scale", { type: "log" })),
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
    detector: {
      type: "data",
      level: "soft",
      description: "Data on y-axis is skewed positive.",
      detect: await and(
        isChannelProp("y", "type", "quantitative"),
        isDataSkewed("y", "positive"),
        await not(isChannelProp("y", "scale", { type: "log" })),
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
    detector: {
      type: "data",
      level: "soft",
      description: "Data on x-axis is skewed negative.",
      detect: await and(
        isChannelProp("x", "type", "quantitative"),
        isDataSkewed("x", "negative"),
        await not(isChannelProp("x", "scale", { type: "pow" })),
      ),
    },
    actuator: {
      type: "spec",
      description: "Apply power scale to x-axis.",
      action: [applyScale("x", "pow")],
    },
  },
  {
    detector: {
      type: "data",
      level: "soft",
      description: "Data on y-axis is skewed negative.",
      detect: await and(
        isChannelProp("y", "type", "quantitative"),
        isDataSkewed("y", "negative"),
        await not(isChannelProp("y", "scale", { type: "pow" })),
      ),
    },
    actuator: {
      type: "spec",
      description: "Apply power scale to y-axis.",
      action: [applyScale("y", "pow")],
    },
  },
  {
    detector: {
      type: "perception",
      level: "soft",
      description: "Marks are overplotted.",
      detect: await and(isMark(["point", "circle"]), isOverplotted),
    },
    actuator: {
      type: "spec",
      description: "Reduce opacity of marks.",
      action: [reduceOpacity],
    },
  },
];

export default manifest;

import { isDataSkewed } from "videre/detectors/data";
import { isChannelProp, isMark } from "videre/detectors/encoding";
import { isOverplotted } from "videre/detectors/perception";
import { IManifestManual } from "videre/model";
import { removeNegativeValues, removeZeroValues } from "videre/resolvers/data";
import {
  applyScale,
  convertScatterToHeatmap,
  reduceOpacity,
} from "videre/resolvers/spec";
import { applyJitter } from "videre/resolvers/spec/jittering";
import { and, asyncAnd, not } from "videre/utils";

const overplottedMarks: IManifestManual = {
  detector: {
    id: "overplotted-marks",
    type: "perception",
    description: "Marks are overplotted.",
    detect: await asyncAnd(isMark(["point", "circle"]), isOverplotted),
  },
  resolvers: [
    {
      id: "apply-jitter-x",
      description: "Apply jittering to the x-axis.",
      trigger: and(
        isChannelProp("x", "type", ["ordinal", "nominal"]),
        not(isChannelProp("xOffset", "type", "quantitative")),
      ),
      resolve: [applyJitter("x")],
    },
    {
      id: "apply-jitter-y",
      description: "Apply jittering to the y-axis.",
      trigger: and(
        isChannelProp("y", "type", ["ordinal", "nominal"]),
        not(isChannelProp("yOffset", "type", "quantitative")),
      ),
      resolve: [applyJitter("y")],
    },
    {
      id: "scatterplot-to-heatmap",
      description: "Convert scatterplot to heatmap.",
      trigger: isMark(["point", "circle"]),
      resolve: [convertScatterToHeatmap],
    },
    {
      id: "reduce-opacity",
      trigger: () => true,
      description: "Reduce opacity of marks.",
      resolve: [reduceOpacity],
    },
    {
      id: "apply-log-scale-x",
      description: "Remove non-negative values and apply log scale to x-axis.",
      trigger: and(
        isDataSkewed("x", "positive"),
        not(isChannelProp("x", "scale", { type: "log" })),
      ),
      resolve: [
        removeNegativeValues(["x"]),
        removeZeroValues(["x"]),
        applyScale("x", "log"),
      ],
    },
    {
      id: "apply-log-scale-y",
      description: "Remove non-negative values and apply log scale to y-axis.",
      trigger: and(
        isDataSkewed("y", "positive"),
        not(isChannelProp("y", "scale", { type: "log" })),
      ),
      resolve: [
        removeNegativeValues(["y"]),
        removeZeroValues(["y"]),
        applyScale("y", "log"),
      ],
    },
    {
      id: "apply-pow-scale-x",
      description: "Apply power scale to x-axis.",
      trigger: and(
        isDataSkewed("x", "negative"),
        not(isChannelProp("x", "scale", { type: "pow" })),
      ),
      resolve: [applyScale("x", "pow")],
    },
    {
      id: "apply-pow-scale-y",
      description: "Apply power scale to y-axis.",
      trigger: and(
        isDataSkewed("y", "negative"),
        not(isChannelProp("y", "scale", { type: "pow" })),
      ),
      resolve: [applyScale("y", "pow")],
    },
  ],
};

export default overplottedMarks;

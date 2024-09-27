import type { IManifestManual } from "videre/model";

import {
  binIsNotNice,
  cardinalityIsOne,
  excessiveCardinality,
  indistinctTheta,
  labelOverlap,
  lineForNominal,
  noLabels,
  noLegend,
  noTicks,
  noZeroInPosition,
  ordinalNotSorted,
  overplottedMarks,
  redundantEncoding,
  shapesWithSize,
} from "videre/issues";

const manifest: IManifestManual[] = [
  lineForNominal,
  // catColorsForOrdered,
  // contColorsForNominal,
  ...cardinalityIsOne,
  indistinctTheta,
  redundantEncoding,
  ...excessiveCardinality,
  noZeroInPosition,
  ordinalNotSorted,
  binIsNotNice,
  noLegend,
  ...noLabels,
  ...noTicks,
  ...labelOverlap,
  shapesWithSize,
  overplottedMarks,
];

export default manifest;

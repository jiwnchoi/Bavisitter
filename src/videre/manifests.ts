import { IManifestManual } from "videre/model";
import {
  lineForNominal,
  catColorsForOrdered,
  contColorsForNominal,
  cardinalityIsOne,
  indistinctTheta,
  redundantEncoding,
  excessiveCardinality,
  noZeroInPosition,
  ordinalNotSorted,
  binIsNotNice,
  noLegend,
  noLabels,
  noTicks,
  labelOverlap,
  shapesWithSize,
  overplottedMarks,
} from "videre/issues";

const manifest: IManifestManual[] = [
  lineForNominal,
  catColorsForOrdered,
  contColorsForNominal,
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

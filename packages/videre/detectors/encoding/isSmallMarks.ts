import type { State } from "videre/model";

export default function isSmallMarks(state: State): boolean {
  const { spec } = state;
  if (!spec) {
    throw new Error("No spec defined in the visualization state.");
  }

  const MIN_SIZE = 2; // Minimum size in pixels

  function isNumber(value: any): value is number {
    return typeof value === "number" && !Number.isNaN(value);
  }

  // Check mark size
  if (typeof spec.mark === "object" && "size" in spec.mark) {
    const markSize = spec.mark.size;
    if (isNumber(markSize) && markSize < MIN_SIZE) {
      return true;
    }
  }

  // Check encoding size
  if (spec.encoding && "size" in spec.encoding) {
    const sizeEncoding = spec.encoding.size;
    if (typeof sizeEncoding === "object" && "value" in sizeEncoding) {
      const encodingSize = sizeEncoding.value;
      if (isNumber(encodingSize) && encodingSize < MIN_SIZE) {
        return true;
      }
    }
  }

  return false;
}

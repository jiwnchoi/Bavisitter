import type { State } from "videre/model";

export default function isOrdinalNotSorted(state: State): boolean {
  const { spec } = state;
  if (!spec || !spec.encoding) {
    throw new Error("No encoding defined in the visualization spec.");
  }

  return Object.values(spec.encoding).some(encoding => {
    if (!encoding || !encoding.type) return false;
    if (encoding.type !== "ordinal") return false;
    const { field, sort } = encoding;
    if (!field) return false;

    return sort === null;
  });
}

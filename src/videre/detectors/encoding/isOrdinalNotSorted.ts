import { State } from "videre/model";

export default function isOrdinalNotSorted(state: State): boolean {
  const { spec } = state;
  if (!spec || !spec.encoding) {
    console.error("No encoding defined in the visualization spec.");
    return false;
  }

  return Object.values(spec.encoding).some((encoding) => {
    if (!encoding || !encoding.type) return false;
    if (encoding.type !== "ordinal") return false;
    const { field, sort } = encoding;
    if (!field) return false;

    return sort === null;
  });
}

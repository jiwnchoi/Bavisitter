import { State } from "videre/model";

export default function isShapesWithSize(state: State): boolean {
  const { spec } = state;
  if (!spec || !spec.encoding) {
    console.error("No suitable spec defined in the visualization.");
    return false;
  }

  if (spec.encoding?.shape && spec.encoding?.size) {
    return true;
  }

  if (
    (spec.mark as { shape?: string }).shape !== "circle" &&
    spec.encoding?.size
  ) {
    return true;
  }

  return false;
}

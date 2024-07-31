import type { State } from "videre/model";

export default function isRedundantEncoding(state: State): boolean {
  const { spec } = state;
  if (!spec || !spec.encoding) {
    throw new Error("No encoding defined in the visualization spec.");
  }
  const encodingFields = new Map<string, string[]>();

  for (const [channel, encoding] of Object.entries(spec.encoding)) {
    if (encoding?.field) {
      if (!encodingFields.has(encoding.field)) {
        encodingFields.set(encoding.field, []);
      }
      encodingFields.get(encoding.field)!.push(channel);
    }
  }

  for (const [_field, channels] of encodingFields.entries()) {
    if (channels.length > 1) {
      return true;
    }
  }

  return false;
}

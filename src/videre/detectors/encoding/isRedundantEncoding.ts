import { State } from "videre/model";

export default function isRedundantEncoding(state: State): boolean {
  const { spec } = state;
  if (!spec || !spec.encoding) {
    console.error("No encoding defined in the visualization spec.");
    return false;
  }
  const encodingFields = new Map<string, string[]>();

  Object.entries(spec.encoding).forEach(([channel, encoding]) => {
    if (encoding && encoding.field) {
      if (!encodingFields.has(encoding.field)) {
        encodingFields.set(encoding.field, []);
      }
      encodingFields.get(encoding.field)!.push(channel);
    }
  });

  for (const [_field, channels] of encodingFields.entries()) {
    if (channels.length > 1) {
      return true;
    }
  }

  return false;
}

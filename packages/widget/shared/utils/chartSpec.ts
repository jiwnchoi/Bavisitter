/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import type { IMessageWithRef } from "@shared/types";
import embed from "vega-embed";
import type { InlineDataset } from "vega-lite/build/src/data";
import type { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";

export function parseVegaLite(content: string, size: number): TopLevelUnitSpec<string> | null {
  let parsedContent: unknown;
  try {
    if (content.includes("```")) {
      parsedContent = JSON.parse(content.split("```")[0]);
    } else {
      parsedContent = JSON.parse(content);
    }
  } catch {
    return null;
  }

  if (!isTopLevelUnitSpec(parsedContent)) {
    return null;
  }

  const spec: TopLevelUnitSpec<string> = parsedContent;

  if (spec.data && typeof spec.data === "object" && "url" in spec.data) {
    spec.data = { name: spec.data.url };
  }

  spec.width = size;
  spec.height = size;
  spec.config = {
    background: "transparent",
    autosize: { type: "fit", contains: "padding" },
    legend: { orient: "bottom" },
    style: {
      cell: {
        stroke: "transparent",
      },
    },
  };

  return spec;
}

function isTopLevelUnitSpec(obj: unknown): obj is TopLevelUnitSpec<string> {
  return typeof obj === "object" && obj !== null && "data" in obj;
}

export function stringfyVegaLite(spec: TopLevelUnitSpec<string>) {
  const newSpec = structuredClone(spec);
  if (newSpec.data?.name) {
    newSpec.data = { url: newSpec.data.name };
  }
  delete newSpec.width;
  delete newSpec.height;
  delete newSpec.config;
  return JSON.stringify(newSpec, null, 2);
}

export const isCodeVegaLite = (m: IMessageWithRef) =>
  m.type === "code" && m.format === "json" && m.content.includes("$schema");

export const isContentValidJSON = (content: string) => {
  try {
    JSON.parse(content);
    return true;
  } catch {
    return false;
  }
};
export async function getThumbnailFromSpec(
  spec: TopLevelUnitSpec<string>,
  _data: InlineDataset,
): Promise<string> {
  // Create a unique key for this spec and data combination
  const cacheKey = `thumbnail_${JSON.stringify(spec)}_${JSON.stringify(_data)}`;

  // Check if the thumbnail is already in SessionStorage
  const cachedThumbnail = sessionStorage.getItem(cacheKey);
  if (cachedThumbnail) {
    return cachedThumbnail;
  }

  let newSpec = structuredClone(spec);
  const thumbnailAxis = {
    disable: true,
    title: "",
    grid: false,
    ticks: false,
    labels: false,
  };
  newSpec = {
    ...newSpec,
    width: 200,
    height: 200,
    config: {
      ...newSpec.config,
      mark: {
        strokeWidth: newSpec.mark === "line" ? 4 : 0,
      },
      legend: {
        disable: true,
      },
    },
    data: { values: _data },
    title: undefined,
  };

  if (newSpec.encoding) {
    for (const key in newSpec.encoding) {
      const encodingField = newSpec.encoding[key as keyof typeof newSpec.encoding];
      if (encodingField && "legend" in encodingField) {
        (encodingField as any).legend = null;
      }
    }
  }

  if (newSpec.encoding?.x) {
    if ("title" in newSpec.encoding.x) {
      newSpec.encoding.x.title = "";
    }
    newSpec.encoding.x = { ...newSpec.encoding.x, axis: thumbnailAxis };
  }

  if (newSpec.encoding?.y) {
    if ("title" in newSpec.encoding.y) {
      newSpec.encoding.y.title = "";
    }
    newSpec.encoding.y = { ...newSpec.encoding.y, axis: thumbnailAxis };
  }

  const view = await embed(document.createElement("div"), newSpec, {
    actions: false,
  }).then((result) => result.view);
  const canvas = await view.toCanvas();
  const thumbnailDataURL = canvas.toDataURL();

  // Cache the result in SessionStorage
  try {
    sessionStorage.setItem(cacheKey, thumbnailDataURL);
  } catch (e) {
    // eslint-disable-next-line no-console
    console.warn("Failed to cache thumbnail in SessionStorage:", e);
  }

  return thumbnailDataURL;
}

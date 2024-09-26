import type { IMessageWithRef } from "@shared/types";
import embed from "vega-embed";
import type { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";

export function parseVegaLite(content: string, size: number): TopLevelUnitSpec<string> {
  // biome-ignore lint/suspicious/noImplicitAnyLet: <explanation>
  let spec;
  try {
    if (content.includes("```")) {
      spec = JSON.parse(content.split("```")[0]);
    } else {
      spec = JSON.parse(content);
    }
  } catch (e) {
    spec = {};
  }
  if (spec.data?.url) {
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
  } catch (e) {
    return false;
  }
};

export async function getThumbnailFromSpec(
  spec: TopLevelUnitSpec<string>,
  _data: any,
): Promise<string> {
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
      if ((newSpec.encoding[key as keyof typeof newSpec.encoding] as any)?.legend !== undefined) {
        (newSpec.encoding[key as keyof typeof newSpec.encoding] as any).legend = null;
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
  return thumbnailDataURL;
}

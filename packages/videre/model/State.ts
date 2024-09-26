import type { Paper } from "snapsvg";
import embed from "vega-embed";
import type { Config } from "vega-lite";
import { isFieldDef } from "vega-lite/build/src/channeldef";
import type { Encoding } from "vega-lite/build/src/encoding";
import { type TopLevelUnitSpec, isUnitSpec } from "vega-lite/build/src/spec/unit";
import { getCanvasFromPaper, getMarksFromPaper, getPaperFromSVG } from "../utils";

class State {
  public spec: TopLevelUnitSpec<string>;
  public specConfig: Config;
  public data: Record<any, any>[];
  private canvas?: HTMLCanvasElement;
  private marksCanvas?: HTMLCanvasElement;
  private paper?: Paper;
  private marksPaper?: Paper;

  constructor(spec: TopLevelUnitSpec<string>, specConfig: Config, data: Record<any, any>[]) {
    if (!isUnitSpec(spec)) throw new Error("Spec is not a unit spec");
    this.spec = spec;
    this.specConfig = {
      ...specConfig,
      background: "transparent",
    };
    this.data = data;
  }

  getFieldFromChannel(channelName: keyof Encoding<string>) {
    if (!this.spec.encoding) return;
    const field = this.spec.encoding[channelName];
    if (!isFieldDef(field)) return;
    return field.field;
  }

  async getSVG() {
    const container = document.createElement("div");

    await embed(
      container,
      {
        ...this.spec,
        data: { values: this.data },
        config: this.specConfig,
      },
      {
        renderer: "svg",
        actions: false,
      },
    );

    return container.querySelector("svg");
  }

  async getPaper() {
    const svg = await this.getSVG();
    return this.paper ?? (await getPaperFromSVG(svg));
  }

  async getMarksPaper() {
    return this.marksPaper ?? (await getMarksFromPaper((await this.getPaper())!));
  }

  async getCanvas() {
    return this.canvas ?? (await getCanvasFromPaper((await this.getPaper())!));
  }

  async getMarksCanvas() {
    return this.marksCanvas ?? (await getCanvasFromPaper((await this.getMarksPaper())!));
  }

  async render(container: HTMLElement, renderer: "svg" | "canvas") {
    return await embed(
      container,
      {
        ...this.spec,
        data: { values: this.data },
        config: this.specConfig,
      },
      {
        renderer,
      },
    );
  }

  updateSpec(spec?: TopLevelUnitSpec<string>, config?: Config, data?: Record<any, any>[]) {
    return new State(spec ?? this.spec, config ?? this.specConfig, data ?? this.data);
  }

  export() {
    const spec = structuredClone(this.spec);
    const data = structuredClone(this.data);
    const filePath = spec.data.name!;
    const [fileName, fileExt] = filePath.split(".");
    const rev = Number.parseInt(RegExp(/rev(\d+)/).exec(fileName)?.[1] ?? "0");
    const newFileName = `${fileName}-rev${rev + 1}.${fileExt}`;
    spec.data.name = newFileName;

    return {
      spec,
      data,
    };
  }
}

export default State;

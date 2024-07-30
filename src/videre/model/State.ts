import { Paper } from "snapsvg";
import embed from "vega-embed";
import { compile, type Config } from "vega-lite";
import { isFieldDef } from "vega-lite/build/src/channeldef";
import { Encoding } from "vega-lite/build/src/encoding";
import {
  isUnitSpec,
  type TopLevelUnitSpec,
} from "vega-lite/build/src/spec/unit";
import {
  getCanvasFromPaper,
  getMarksFromPaper,
  getPaperFromVega,
} from "../utils";
import { cloneDeep } from "lodash-es";

class State {
  public spec: TopLevelUnitSpec<string>;
  public specConfig: Config;
  public data: Record<any, any>[];
  private canvas?: HTMLCanvasElement;
  private marksCanvas?: HTMLCanvasElement;
  private paper?: Paper;
  private marksPaper?: Paper;

  constructor(
    spec: TopLevelUnitSpec<string>,
    specConfig: Config,
    data: Record<any, any>[],
  ) {
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

  async getPaper() {
    const compiledSpec = compile(
      {
        ...this.spec,
        data: { values: this.data },
      },
      { config: this.specConfig },
    ).spec;
    return this.paper ?? (await getPaperFromVega(compiledSpec));
  }

  async getMarksPaper() {
    return (
      this.marksPaper ?? (await getMarksFromPaper((await this.getPaper())!))
    );
  }

  async getCanvas() {
    return this.canvas ?? (await getCanvasFromPaper((await this.getPaper())!));
  }

  async getMarksCanvas() {
    return (
      this.marksCanvas ??
      (await getCanvasFromPaper((await this.getMarksPaper())!))
    );
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

  updateSpec(
    spec?: TopLevelUnitSpec<string>,
    config?: Config,
    data?: Record<any, any>[],
  ) {
    return new State(
      spec ?? this.spec,
      config ?? this.specConfig,
      data ?? this.data,
    );
  }

  export() {
    const spec = cloneDeep(this.spec);
    const data = cloneDeep(this.data);
    const filePath = spec.data.name!;
    const [fileName, fileExt] = filePath.split(".");
    const rev = parseInt(RegExp(/rev(\d+)/).exec(fileName)?.[1] ?? "0");
    const newFileName = `${fileName}-rev${rev + 1}.${fileExt}`;
    spec.data.name = newFileName;

    return {
      spec,
      data,
    };
  }
}

export default State;

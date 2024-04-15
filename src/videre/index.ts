import { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";
import { State } from "./model";
import manifests from "./manifests";
export interface IDetectorResult {
  problem: string;
  solution: string;
}

export interface IRevisionResult {
  spec: TopLevelUnitSpec<string>;
  data: Record<any, any>[];
}

export async function detect(
  spec: TopLevelUnitSpec<string>,
  data: Record<any, any>[],
): Promise<IDetectorResult[]> {
  let state = new State(spec, {}, data);
  const prompts: IDetectorResult[] = [];

  for (const { detector: linter, actuator } of manifests) {
    let hasToFix = await linter.detect(state);
    if (!hasToFix) continue;

    let actions = actuator.action;
    for (const action of actions) {
      state = action(state);
    }

    prompts.push({
      problem: linter.description,
      solution: actuator.description,
    });
  }
  return prompts;
}

export function revise(
  spec: TopLevelUnitSpec<string>,
  data: Record<any, any>[],
  prompts: IDetectorResult[],
) {
  let state = new State(spec, {}, data);
  for (const { detector: linter, actuator } of manifests) {
    const problemDescription =
      prompts.findIndex((prompt) => prompt.problem === linter.description) !==
      -1;
    if (!problemDescription) continue;

    let actions = actuator.action;
    for (const action of actions) {
      state = action(state);
    }
  }

  return state.export();
}

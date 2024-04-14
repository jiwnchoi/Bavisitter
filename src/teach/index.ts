import { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";
import { State } from "./model";
import manifests from "./manifests";
export interface IDetectResult {
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
): Promise<IDetectResult[]> {
  let state = new State(spec, {}, data);
  const prompts: IDetectResult[] = [];

  for (const { trigger, linter, actuator } of manifests) {
    if (!trigger(state)) continue;
    let hasToFix = await linter.lint(state);
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
  prompts: IDetectResult[],
) {
  console.log(spec, data, prompts);
  let state = new State(spec, {}, data);
  for (const { trigger, linter, actuator } of manifests) {
    if (!trigger(state)) continue;
    const problemDescription =
      prompts.findIndex((prompt) => prompt.problem === linter.description) !==
      -1;
    if (!problemDescription) continue;

    let actions = actuator.action;
    for (const action of actions) {
      state = action(state);
    }
  }

  return {
    spec: state.spec,
    data: state.data,
  };
}

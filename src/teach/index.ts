import { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";
import { State } from "./model";
import manifests from "./manifests";
export interface IPrompt {
  problem: string;
  solution: string;
}

export interface ITeachResult {
  prompts: IPrompt[];
  state: State;
}

export async function teach(
  spec: TopLevelUnitSpec<string>,
  data: Record<any, any>[],
): Promise<ITeachResult> {
  let state = new State(spec, {}, data);
  const prompts: IPrompt[] = [];

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
  return {
    prompts,
    state,
  };
}

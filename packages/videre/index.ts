import type { TopLevelUnitSpec } from "vega-lite/build/src/spec/unit";
import manifests from "./manifests";
import { type IDetectorModel, State } from "./model";
import type IResolverModel from "./model/IActuatorModel";
export interface IDetectorResult {
  issue: Pick<IDetectorModel, "id" | "description" | "type">;
  resolvers: Pick<IResolverModel, "id" | "description">[];
}

export type IDetectorResultWithSelection = Omit<IDetectorResult, "resolvers"> & {
  resolvers: (Pick<IResolverModel, "id" | "description"> & {
    selected: boolean;
  })[];
};

export interface IRevisionResult {
  spec: TopLevelUnitSpec<string>;
  data: Record<any, any>[];
}

export async function detect(
  spec: TopLevelUnitSpec<string>,
  data: Record<any, any>[],
): Promise<IDetectorResult[]> {
  const state = new State(spec, {}, data);
  const prompts: IDetectorResult[] = [];

  for (const { detector, resolvers } of manifests) {
    const hasToFix = await detector.detect(state);

    if (!hasToFix) continue;

    const triggeredResolvers: IResolverModel[] = [];
    for (const resolver of resolvers) {
      if (await resolver.trigger(state)) {
        triggeredResolvers.push(resolver);
      }
    }

    prompts.push({
      issue: {
        id: detector.id,
        type: detector.type,
        description: detector.description,
      },
      resolvers: triggeredResolvers.map((resolver) => ({
        id: resolver.id,
        description: resolver.description,
      })),
    });
  }

  return prompts;
}

export function revise(
  spec: TopLevelUnitSpec<string>,
  data: Record<any, any>[],
  resolverIds: string[],
) {
  let state = new State(spec, {}, data);
  for (const { resolvers } of manifests) {
    if (!resolvers.some((r) => resolverIds.includes(r.id))) continue;
    for (const resolver of resolvers) {
      if (resolverIds.includes(resolver.id) && resolver.resolve) {
        for (const r of resolver.resolve) {
          state = r(state);
        }
      }
    }
  }
  return state.export();
}

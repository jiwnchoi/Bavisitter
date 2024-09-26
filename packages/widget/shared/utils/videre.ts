import type { IDetectorResultWithSelection } from "videre/index";

export function detectResultToContent(
  detectResult: IDetectorResultWithSelection[],
  giveSolution: boolean,
): string {
  const selectedReslts = giveSolution
    ? detectResult
        .filter(({ resolvers }) => resolvers.some(({ selected }) => selected))
        .map(({ resolvers, ...rest }) => ({
          ...rest,
          resolvers: resolvers.filter(({ selected }) => selected),
        }))
    : detectResult;

  const problemString = `**Current Vega Lite visualization has following issues**:
  
${selectedReslts.map(({ issue }) => `  - ${issue.description}`).join("\n")}
  `;
  const solutionString = `\n\n**Revise the visualization according to the following suggestions**:

${selectedReslts.map(({ resolvers }) => resolvers.map(({ description }) => `  - ${description}`).join("\n")).join("\n")}`;

  const commandString =
    "\n\nBased on the detected issues, revise the Vega-Lite specification and data to improve the visualization.";

  return problemString + (giveSolution ? solutionString : commandString);
}

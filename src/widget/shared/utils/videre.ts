import { IDetectResult } from "teach/index";

type IDetectResultWithSelection = IDetectResult & {
  selected: boolean;
};

export function detectResultToContent(
  detectResult: IDetectResultWithSelection[],
  giveSolution: boolean,
): string {
  const problemString = `**Current Vega Lite visualization has following issues**:
  
${detectResult.map(({ problem }) => `  - ${problem}`).join("\n")}
  `;
  const solutionString = `\n\n**Revise the visualization according to the following suggestions**:

${detectResult.map(({ solution }) => `  - ${solution}`).join("\n")}`;

  const commandString = `\n\nBased on the detected issues, revise the Vega-Lite specification and data to improve the visualization.`;

  return problemString + (giveSolution ? solutionString : commandString);
}

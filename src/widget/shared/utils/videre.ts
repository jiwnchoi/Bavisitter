import { IDetectorResult } from "videre/index";

type IDetectorResultWithSelection = IDetectorResult & {
  selected: boolean;
};

export function detectResultToContent(
  detectResult: IDetectorResultWithSelection[],
  giveSolution: boolean,
): string {
  const filteredResult = detectResult.filter(({ selected }) => selected);

  const problemString = `**Current Vega Lite visualization has following issues**:
  
${filteredResult.map(({ problem }) => `  - ${problem}`).join("\n")}
  `;
  const solutionString = `\n\n**Revise the visualization according to the following suggestions**:

${filteredResult.map(({ solution }) => `  - ${solution}`).join("\n")}`;

  const commandString = `\n\nBased on the detected issues, revise the Vega-Lite specification and data to improve the visualization.`;

  return problemString + (giveSolution ? solutionString : commandString);
}

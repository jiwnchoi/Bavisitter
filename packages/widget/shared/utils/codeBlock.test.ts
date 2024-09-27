import { extractCodeBlocksFromString } from "./codeBlock";

const CODEBLOCK_STRING =
  '{"role": "assistant", "type": "message", "content": "Based on the available columns from the dataset, I will create a scatter plot to visualize the relationship between `Horsepower` (on the x-axis) and `Miles_per_Gallon` (on the y-axis).\\n\\nHere\'s the Vega-Lite specification for the scatter plot:\\n\\n```json\\n{\\n  \\"data\\": {\\n    \\"url\\": \\"data.csv\\"\\n  },\\n  \\"mark\\": \\"point\\",\\n  \\"encoding\\": {\\n    \\"x\\": {\\"field\\": \\"Horsepower\\", \\"type\\": \\"quantitative\\", \\"title\\": \\"Horsepower\\"},\\n    \\"y\\": {\\"field\\": \\"Miles_per_Gallon\\", \\"type\\": \\"quantitative\\", \\"title\\": \\"Miles per Gallon\\"},\\n    \\"tooltip\\": [\\n      {\\"field\\": \\"Name\\", \\"type\\": \\"nominal\\"},\\n      {\\"field\\": \\"Horsepower\\", \\"type\\": \\"quantitative\\"},\\n      {\\"field\\": \\"Miles_per_Gallon\\", \\"type\\": \\"quantitative\\"}\\n    ]\\n  }\\n}\\n```\\n\\nThis specification defines a scatter plot that illustrates the correlation between a car\'s horsepower and its fuel efficiency (miles per gallon). The tooltip displays the name of the car and the exact values of horsepower and miles per gallon when hovering over the points.\\n\\n"}';

const TEXT_STRING =
  '{"role": "assistant", "type": "message", "content": "Based on the available columns from the dataset, I will create a scatter plot to visualize the relationship between `Horsepower` (on the x-axis) and `Miles_per_Gallon` (on the y-axis) specification defines a scatter plot that illustrates the correlation between a car\'s horsepower and its fuel efficiency (miles per gallon). The tooltip displays the name of the car and the exact values of horsepower and miles per gallon when hovering over the points.\\n\\n"}';

describe("extractCodeBlocksFromString", () => {
  const TEST_MESSAGE = JSON.parse(CODEBLOCK_STRING);
  const codeBlockString = extractCodeBlocksFromString(TEST_MESSAGE.content);
  test("should extract code blocks from a string", () => {
    expect(JSON.parse(codeBlockString).data?.url).toBe("data.csv");
  });

  test("should return empty string if no code block is found", () => {
    expect(extractCodeBlocksFromString(TEXT_STRING)).toBe("");
  });
});

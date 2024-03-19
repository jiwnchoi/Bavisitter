import { IMessage } from "@shared/types";

const MOCK_CHAT: IMessage[] = [
  {
    role: "system",
    content: "Welcome to the chat room!",
  },
  {
    role: "user",
    content: "Draw Simple Bar Chart",
  },
  {
    role: "assistant",
    content: `To visualize the provided data as a simple bar chart using Vega-Lite specification, you can use the following spec. This specification describes a bar chart where the x-axis represents the category (field "a") and the y-axis represents the value (field "b").

\`\`\`json
{
  "$schema": "https://vega.github.io/schema/vega-lite/v5.json",
  "description": "A simple bar chart with rectangular bars.",
  "data": {
    "values": [
      {"a": "A", "b": 28},
      {"a": "B", "b": 55},
      {"a": "C", "b": 43},
      {"a": "D", "b": 91},
      {"a": "E", "b": 81},
      {"a": "F", "b": 53},
      {"a": "G", "b": 19},
      {"a": "H", "b": 87},
      {"a": "I", "b": 52}
    ]
  },
  "mark": "bar",
  "encoding": {
    "x": {"field": "a", "type": "ordinal", "axis": {"title": "Category"}},
    "y": {"field": "b", "type": "quantitative", "axis": {"title": "Value"}}
  }
}
\`\`\`
This spec defines a Vega-Lite visualization with:

- A schema for Vega-Lite version 5.
- A description of the chart.
- The given data embedded directly into the specification.
- A bar mark type to represent the data points.
- Encoding for the axes, with the "x" axis mapping to field "a" as an ordinal type (representing categorical data) and the "y" axis mapping to field "b" as a quantitative type (representing numerical data).
- To visualize this, you can paste this specification into a Vega-Lite editor, such as the online Vega Editor available at https://vega.github.io/editor/.`,
  },
];

export default MOCK_CHAT;

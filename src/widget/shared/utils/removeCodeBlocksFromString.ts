// remove code blocks from a string. Codeblock is looks like ```js ...code... ```, ```python ...code... ```
export const removeCodeBlocksFromString = (str: string) => {
  return str.replace(/```json[^`]+```/g, "[Visualization Right]");
};

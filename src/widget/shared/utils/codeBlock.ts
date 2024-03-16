export const extractCodeBlocksFromString = (str: string) => {
  return str.match(/```json[^`]+```/g)?.toString() || "";
};

export const removeCodeBlocksFromString = (str: string) => {
  return str.replace(/```json[^`]+```/g, "[Visualization Right]");
};

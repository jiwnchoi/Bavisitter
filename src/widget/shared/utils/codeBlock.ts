export const extractCodeBlocksFromString = (str: string) => {
  return (
    str
      .match(/```json[^`]+```/g)
      ?.toString()
      .replace("```json", "")
      .replace("```", "") || ""
  );
};

export const replaceJSONCodeBlocks = (str: string) => {
  return str.replace(/```json[^`]+```/g, "");
};

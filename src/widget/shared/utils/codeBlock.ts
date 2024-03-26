export const extractCodeBlocksFromString = (str: string) => {
  return (
    str
      .match(/```json[^`]+```/g)
      ?.toString()
      .replace("```json\n", "")
      .replace("```", "") || ""
  );
};

export const replaceJSONCodeBlocks = (str: string) => {
  const regex = /```json[\s\S]*?(?:```|$)/g;

  // Replace the matched code block with an empty string
  return str.replace(regex, "");
};

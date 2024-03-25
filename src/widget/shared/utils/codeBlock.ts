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

export const extractCodeBlocksFromIncompleteString = (str: string) => {
  return (
    str
      .match(/```json[^`]+/g)
      ?.toString()
      .replace("```json\n", "")
      .replace("```", "") || ""
  );
};

export const splitCodeBlockAndContent = (content: string) => {
  const codeBlocks = extractCodeBlocksFromIncompleteString(content);
  const contentWithoutCodeblock = replaceJSONCodeBlocks(content);
  return [ codeBlocks, contentWithoutCodeblock ];
};
import type { Paper } from "snapsvg";

function getMarksFromPaper(paper: Paper) {
  const newPaper = paper.clone();
  const children = newPaper.selectAll(".root > g > g > g");
  newPaper.select(".background").remove();
  // biome-ignore lint/complexity/noForEach: <explanation>
  children.forEach(child => {
    if (!child.hasClass("role-mark")) {
      child.remove();
    }
  });
  return newPaper as Paper;
}

export default getMarksFromPaper;

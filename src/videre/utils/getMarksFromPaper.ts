import { Paper } from "snapsvg";

function getMarksFromPaper(paper: Paper) {
  const newPaper = paper.clone();
  const children = newPaper.selectAll(".root > g > g > g");
  // const children = containerGroup.children()
  newPaper.select(".background").remove();
  children.forEach((child) => {
    if (!child.hasClass("role-mark")) {
      child.remove();
    }
  });
  return newPaper as Paper;
}

export default getMarksFromPaper;

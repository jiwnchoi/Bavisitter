import { Paper } from "snapsvg";

// const snapsvg = Snap(svgElement)
// const newSnapSvg = snapsvg.clone()

// const groups = newSnapSvg.selectAll(".root > g > g > g")
// console.log(groups)
// const containerGroup = newSnapSvg.select(".root > g > g")

// groups.forEach((group) => {
//   if (!group.hasClass("role-mark")) {
//     console.log(group)
//     group.remove()
//   }
// })

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

import { Paper } from "snapsvg";

async function getCanvasFromSnap(paper: Paper): Promise<HTMLCanvasElement> {
  const svgElement = paper.node;
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  canvas.width = svgElement.getAttribute("width")
    ? parseInt(svgElement.getAttribute("width")!)
    : 0;
  canvas.height = svgElement.getAttribute("height")
    ? parseInt(svgElement.getAttribute("height")!)
    : 0;
  const img = new Image();
  img.src = paper.toDataURL();

  return new Promise((resolve) => {
    img.onload = () => {
      context!.drawImage(img, 0, 0);
      resolve(canvas);
    };
  });
}

export default getCanvasFromSnap;

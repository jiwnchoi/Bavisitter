function getAlphaMapFromCanvas(
  canvas: HTMLCanvasElement,
  samplingRate: number = 4,
): Float32Array {
  const context = canvas.getContext("2d") as CanvasRenderingContext2D;
  const { width, height } = canvas;
  const imageData = context.getImageData(0, 0, width, height).data;
  const alphaValues = new Float32Array((width * height) / samplingRate);

  for (let i = 0; i < alphaValues.length; i++) {
    alphaValues[i] = imageData[i * 4 * samplingRate + 3];
  }

  return alphaValues;
}

export default getAlphaMapFromCanvas;

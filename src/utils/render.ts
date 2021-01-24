import {sort} from "./sort";


export const render = (
	{imageData, canvasElement, canvasContext}:
	{
		imageData: ImageData;
		canvasElement: HTMLCanvasElement | null;
		canvasContext: CanvasRenderingContext2D | null;
	}
): void => {
	if (canvasElement && canvasContext) {
		// Clear canvas and set dimensions
		canvasElement.height = imageData.height;
		canvasElement.width = imageData.width;
		// Paint a frame with the cleared canvas
		requestAnimationFrame(() => {
			// Paint the sorted image
			canvasContext.putImageData(sort(imageData, "lightness", "vertical", true), 0, 0);
		});
	}
};

import {SortBy} from "./color";
import {Direction} from "./pixels";
import {sort} from "./sort";


export const render = (
	{imageData, sortBy, direction, reversed, canvasElement, canvasContext}:
	{
		imageData: ImageData;
		sortBy: SortBy
		direction: Direction;
		reversed: boolean;
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
			canvasContext.putImageData(sort(imageData, sortBy, direction, reversed), 0, 0);
		});
	}
};

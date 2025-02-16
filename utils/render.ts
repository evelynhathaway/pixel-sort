import {ColorProps} from "./color.ts";
import {Threshold} from "./intervals.ts";
import {Direction} from "./pixels.ts";
import {sortImage} from "./sort.ts";

export const render = (
	{imageData, sortBy, direction, reversed, thresholds, canvasElement, canvasContext}:
	{
		imageData: ImageData;
		sortBy: ColorProps;
		direction: Direction;
		reversed: boolean;
		thresholds: Threshold[];
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
			canvasContext.putImageData(sortImage(imageData, sortBy, direction, reversed, thresholds), 0, 0);
		});
	}
};

import {ColorProps} from "./color";
import {Threshold} from "./intervals";
import {Direction} from "./pixels";
import {sortImage} from "./sort";

export const render = (
	{imageData, sortBy, direction, reversed, thresholds, canvasElement, canvasContext}:
	{
		imageData: ImageData;
		sortBy: ColorProps;
		direction: Direction;
		reversed: boolean;
		thresholds: Array<Threshold>;
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

import {ColorProps} from "./color.ts";
import {Interval, makeIntervals, Threshold} from "./intervals.ts";
import {Direction, getImageDataFromPixels, getPixelsFromImageData, Pixels1D} from "./pixels.ts";

export const sortPixels = (
	pixels: Pixels1D,
	sortBy: ColorProps,
	reverse: boolean
): Pixels1D => {
	pixels.sort(
		(colorA, colorB) => (
			reverse ?
				colorB[sortBy] - colorA[sortBy] :
				colorA[sortBy] - colorB[sortBy]
		)
	);
	return pixels;
};

export const sortImage = (
	imageData: ImageData,
	sortBy: ColorProps,
	direction: Direction,
	reverse: boolean,
	thresholds: Threshold[],
): ImageData => {
	return getImageDataFromPixels(
		getPixelsFromImageData(imageData, direction)
			.map(pixels => (
				makeIntervals(pixels, thresholds)
					.flatMap((interval: Interval) => (
						interval.sort ? sortPixels(interval.pixels, sortBy, reverse) : interval.pixels
					))
			)),
		direction,
	);
};

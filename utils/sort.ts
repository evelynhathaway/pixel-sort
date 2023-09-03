import {ColorProps} from "./color";
import {Interval, makeIntervals, Threshold} from "./intervals";
import {Direction, getImageDataFromPixels, getPixelsFromImageData, Pixels1D} from "./pixels";

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

const thresholds: Array<Threshold> = [{property: "alpha", min: 255, max: 255}];

export const sortImage = (
	imageData: ImageData,
	sortBy: ColorProps,
	direction: Direction,
	reverse: boolean
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

import {Color, ColorProps} from "./color.ts";
import {Pixels1D} from "./pixels.ts";


export interface Threshold {
	property: ColorProps;
	min: number;
	max: number;
}

export const checkThresholds = (pixel: Color, thresholds: Threshold[]): boolean => {
	for (const {property, min, max} of thresholds) {
		if (pixel[property] < min || pixel[property] > max) {
			return false;
		}
	}
	return true;
};

export interface Interval {
	sort: boolean;
	pixels: Pixels1D;
}

export const makeIntervals = (pixels: Pixels1D, thresholds: Threshold[]): Interval[] => {
	const intervals: Interval[] = [];
	let didMeetThreshold: boolean | undefined;
	for (const pixel of pixels) {
		const meetsThreshold = checkThresholds(pixel, thresholds);
		if (meetsThreshold === didMeetThreshold) {
			intervals.at(-1)?.pixels.push(pixel);
		} else {
			intervals.push({
				sort: meetsThreshold,
				pixels: [pixel],
			});
			didMeetThreshold = meetsThreshold;
		}
	}
	return intervals;
};

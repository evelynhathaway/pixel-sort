import {Color} from "./color";
import {Pixels2D} from "./pixels";


export const sort = (pixels: Pixels2D, property: keyof Color): Pixels2D => {
	pixels.forEach(array => array.sort((colorA, colorB) => colorA[property] - colorB[property]));
	return pixels;
};

import {Color} from "./color";
import {Direction, getImageDataFromPixels, getPixelsFromImageData} from "./pixels";


export const sort = (imageData: ImageData, property: keyof Color, direction: Direction, reverse: boolean): ImageData => {
	const pixels = getPixelsFromImageData(imageData, direction);
	pixels.forEach(array => array.sort((colorA, colorB) => reverse ? colorB[property] - colorA[property] : colorA[property] - colorB[property]));
	return getImageDataFromPixels(pixels, direction);
};

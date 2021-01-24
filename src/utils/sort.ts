import {SortBy} from "./color";
import {Direction, getImageDataFromPixels, getPixelsFromImageData} from "./pixels";


export const sort = (
	imageData: ImageData,
	sortBy: SortBy,
	direction: Direction,
	reverse: boolean
): ImageData => {
	const pixels = getPixelsFromImageData(imageData, direction);
	pixels.forEach(
		array => array.sort(
			(colorA, colorB) => (
				reverse ?
					colorB[sortBy] - colorA[sortBy] :
					colorA[sortBy] - colorB[sortBy]
			)
		)
	);
	return getImageDataFromPixels(pixels, direction);
};

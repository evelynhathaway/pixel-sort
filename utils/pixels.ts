import {Color} from "./color.ts";

export type Pixels1D = Color[];
export type Pixels2D = Pixels1D[];
export type Direction = "horizontal" | "vertical";

export const getPixelsFromImageData = (imageData: ImageData, direction: Direction): Pixels2D => {
	const pixels: Pixels2D = Array.from(
		{length: direction === "horizontal" ? imageData.height : imageData.width},
	).fill(null).map(() => []);

	for (let index = 0; index < imageData.data.length; index += 4) {
		const pixelIndex = index / 4;
		const row = Math.floor(pixelIndex / imageData.width);
		const column = pixelIndex % imageData.width;
		const pixel = new Color(
			imageData.data[index],
			imageData.data[index + 1],
			imageData.data[index + 2],
			imageData.data[index + 3],
		);
		if (direction === "horizontal") {
			pixels[row][column] = pixel;
		} else {
			pixels[column][row] = pixel;
		}
	}
	return pixels;
};

export const getImageDataFromPixels = (pixels: Pixels2D, direction: Direction): ImageData => {
	const height = direction === "horizontal" ? pixels.length : pixels[0].length;
	const width = direction === "horizontal" ? pixels[0].length : pixels.length;
	const data: number[] = [];

	for (let row = 0; row < height; row++) {
		for (let column = 0; column < width; column++) {
			data.push(...(direction === "horizontal" ? pixels[row][column] : pixels[column][row]));
		}
	}

	return new ImageData(new Uint8ClampedArray(data), width, height);
};

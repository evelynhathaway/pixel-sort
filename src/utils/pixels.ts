import {Color} from "./color";


export type Pixels1D = Array<Color>;
export type Pixels2D = Array<Pixels1D>;

export const getPixelsFromImageData = (imageData: ImageData): Pixels2D => {
	// eslint-disable-next-line unicorn/no-null
	const pixels: Pixels2D = new Array(imageData.height).fill(null).map(() => []);

	for (let index = 0; index < imageData.data.length; index += 4) {
		const pixelIndex = index / 4;
		const row = Math.floor(pixelIndex / imageData.width);
		pixels[row].push(new Color(
			imageData.data[index],
			imageData.data[index + 1],
			imageData.data[index + 2],
			imageData.data[index + 3],
		));
	}
	return pixels;
};

export const getImageDataFromPixels = (pixels: Pixels2D): ImageData => {
	const height = pixels.length;
	const width = pixels[0].length;
	const data: Array<number> = [];

	for (const row of pixels) {
		for (const pixel of row) {
			data.push(...pixel);
		}
	}

	return new ImageData(new Uint8ClampedArray(data), width, height);
};

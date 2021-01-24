export type ColorProps = keyof Color;

export class Color {
	public red: number;
	public green: number;
	public blue: number;
	public alpha: number;
	public rgba: number;
	public rgb: number;

	constructor (red: number, green: number, blue: number, alpha: number) {
		this.red = red;
		this.green = green;
		this.blue = blue;
		this.alpha = alpha;
		this.rgb = red + green + blue;
		this.rgba = this.rgb + alpha;
	}

	public get hue (): number {
		const red = this.red / 255;
		const green = this.green / 255;
		const blue = this.blue / 255;
		const min = Math.min(red, green, blue);
		const max = Math.max(red, green, blue);
		const delta = max - min;
		let hue: number;

		if (max === min) {
			hue = 0;
		} else if (red === max) {
			hue = (green - blue) / delta;
		} else if (green === max) {
			hue = 2 + (blue - red) / delta;
		} else {
			hue = 4 + (red - green) / delta;
		}

		hue = Math.min(hue * 60, 360);

		if (hue < 0) {
			hue += 360;
		}

		return hue;
	}

	public get lightness (): number {
		const red = this.red / 255;
		const green = this.green / 255;
		const blue = this.blue / 255;
		const min = Math.min(red, green, blue);
		const max = Math.max(red, green, blue);

		return (min + max) * 50;
	}

	public get saturation (): number {
		const red = this.red / 255;
		const green = this.green / 255;
		const blue = this.blue / 255;
		const min = Math.min(red, green, blue);
		const max = Math.max(red, green, blue);
		const delta = max - min;
		let saturation: number;

		if (max === min) {
			saturation = 0;
		} else if (this.lightness <= 50) {
			saturation = delta / (max + min);
		} else {
			saturation = delta / (2 - max - min);
		}

		return saturation * 100;
	}

	* [Symbol.iterator] (): Generator<number> {
		yield this.red;
		yield this.green;
		yield this.blue;
		yield this.alpha;
	}
}

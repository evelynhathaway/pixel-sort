export const hexToRgb = (hex: string) => {
	const result = /^#?(?<red>[\da-f]{2})(?<green>[\da-f]{2})(?<blue>[\da-f]{2})$/i.exec(hex);
	if (!result?.groups) throw new Error("Input is not a long form RGB hex string.");
	return {
		red: Number.parseInt(result.groups.red, 16),
		green: Number.parseInt(result.groups.green, 16),
		blue: Number.parseInt(result.groups.blue, 16),
	};
};

export type ColorProps = Extract<keyof Color, string>;

export class Color {
	public red: number;
	public green: number;
	public blue: number;
	public alpha: number;
	public rgba: number;
	public rgb: number;

	constructor (hex: string);
	constructor (red: number, green: number, blue: number, alpha?: number);
	constructor (redOrHex: number | string, green: number = 0, blue: number = 0, alpha: number = 255) {
		if (typeof redOrHex === "string") {
			const {red, green, blue} = hexToRgb(redOrHex);
			this.red = red;
			this.green = green;
			this.blue = blue;
		} else {
			this.red = redOrHex;
			this.green = green;
			this.blue = blue;
		}
		this.alpha = alpha;
		this.rgb = this.red + this.green + this.blue;
		this.rgba = this.rgb + this.alpha;
	}

	public get hue (): number {
		const red = this.red / 255;
		const green = this.green / 255;
		const blue = this.blue / 255;
		const min = Math.min(red, green, blue);
		const max = Math.max(red, green, blue);
		const delta = max - min;
		let hue: number;

		switch (max) {
			case min: {
				hue = 0;

				break;
			}
			case red: {
				hue = (green - blue) / delta;

				break;
			}
			case green: {
				hue = 2 + (blue - red) / delta;

				break;
			}
			default: {
				hue = 4 + (red - green) / delta;
			}
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

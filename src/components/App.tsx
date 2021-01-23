import React, {useRef} from "react";
import {getImageDataFromPixels, getPixelsFromImageData} from "../utils/pixels";
import {sort} from "../utils/sort";


const App: React.FC = () => {
	// eslint-disable-next-line unicorn/no-null
	const canvasRef = useRef<HTMLCanvasElement>(null);
	// eslint-disable-next-line unicorn/no-null
	const imageRef = useRef<HTMLImageElement>(null);

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const file = event.currentTarget.files?.[0];
		if (file && imageRef.current) {
			imageRef.current.src = URL.createObjectURL(file);
		}
	};

	const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
		const canvas = canvasRef.current;
		const context = canvas?.getContext("2d");
		if (canvas && context) {
			canvas.height = event.currentTarget.naturalHeight;
			canvas.width = event.currentTarget.naturalWidth;
			context.drawImage(event.currentTarget, 0, 0);
			const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
			context.putImageData(getImageDataFromPixels(sort(getPixelsFromImageData(imageData), "hue")), 0, 0);
		}
	};

	return (
		<div>
			<input type="file" accept="image/*" onChange={handleChange} />
			<img alt="Original" ref={imageRef} onLoad={handleLoad} />
			<canvas ref={canvasRef} />
		</div>
	);
};

export default App;

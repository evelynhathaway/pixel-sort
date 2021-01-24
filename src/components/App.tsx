import React, {useRef, useEffect} from "react";
import {Paper} from "@material-ui/core";
import {RenderTrigger, setUpCanvas} from "../utils/setup-canvas";
import classes from "./App.module.scss";



const App: React.FC = () => {
	// eslint-disable-next-line unicorn/no-null
	const canvasRef = useRef<HTMLCanvasElement>(null);
	// eslint-disable-next-line unicorn/no-null
	const imageRef = useRef<HTMLImageElement>(null);
	// eslint-disable-next-line unicorn/no-null
	const renderTriggerRef = useRef<RenderTrigger>();

	// Setup canvas on first render
	useEffect(() => {
		renderTriggerRef.current = setUpCanvas(canvasRef);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
		const file = event.currentTarget.files?.[0];
		const image = imageRef.current;
		if (file && image) {
			image.src = URL.createObjectURL(file);
		}
	};

	const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
		const canvasElement = document.createElement("canvas");
		const canvasContext = canvasElement.getContext("2d");
		if (canvasContext) {
			const image = event.currentTarget;
			canvasElement.height = image.naturalHeight;
			canvasElement.width = image.naturalWidth;
			canvasContext.drawImage(image, 0, 0);
			const imageData = canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height);
			renderTriggerRef.current?.(imageData);
		}
		canvasElement.remove();
	};

	return (
		<div>
			<input type="file" accept="image/*" onChange={handleChange} />
			<div className={classes.flexContainer}>
				<Paper elevation={3} className={classes.card}>
					<img alt="Original" ref={imageRef} onLoad={handleLoad} className={classes.image} />
				</Paper>
				<Paper elevation={3} className={classes.card}>
					<canvas ref={canvasRef} className={classes.image} />
				</Paper>
			</div>
		</div>
	);
};

export default App;

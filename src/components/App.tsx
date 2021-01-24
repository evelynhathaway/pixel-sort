import React, {useRef, useEffect, useState} from "react";
import {FormControl, InputLabel, MenuItem, Paper, Select} from "@material-ui/core";
import {SelectInputProps} from "@material-ui/core/Select/SelectInput";
import {Direction} from "../utils/pixels";
import {RenderTrigger, setUpCanvas} from "../utils/setup-canvas";
import classes from "./App.module.scss";


const App: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const renderTriggerRef = useRef<RenderTrigger>();
	const [direction, setDirection] = useState<Direction>("vertical");
	const [imageData, setImageData] = useState<ImageData>();

	// Setup canvas on first render
	useEffect(() => {
		renderTriggerRef.current = setUpCanvas(canvasRef);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

	const handleFileChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
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
			setImageData(canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height));
		}
		canvasElement.remove();
	};

	useEffect(() => {
		if (imageData) {
			renderTriggerRef.current?.(imageData, direction);
		}
	}, [imageData, direction]);

	const handleDirectionChange: SelectInputProps<Direction>["onChange"] = (event) => setDirection(event.target.value);

	return (
		<div>
			<div className={classes.flexContainer}>
				<Paper elevation={3} className={classes.card}>
					<img alt="Original" ref={imageRef} onLoad={handleLoad} className={classes.image} />
				</Paper>
				<Paper elevation={3} className={classes.card}>
					<canvas ref={canvasRef} className={classes.image} />
				</Paper>
			</div>
			<input type="file" accept="image/*" onChange={handleFileChange} />
			<FormControl>
				<InputLabel id="demo-simple-select-filled-label">Direction</InputLabel>
				<Select
					labelId="demo-simple-select-filled-label"
					id="demo-simple-select-filled"
					value={direction}
					onChange={handleDirectionChange}
				>
					<MenuItem value="horizontal">Horizontal</MenuItem>
					<MenuItem value="vertical">Vertical</MenuItem>
				</Select>
			</FormControl>

		</div>
	);
};

export default App;

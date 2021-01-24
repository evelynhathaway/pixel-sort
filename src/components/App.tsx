import React, {useRef, useEffect, useState} from "react";
import {FormControl, FormControlLabel, InputLabel, MenuItem, Paper, Select, StylesProvider, Switch, SwitchProps, ThemeProvider} from "@material-ui/core";
import {SelectInputProps} from "@material-ui/core/Select/SelectInput";
import createMuiTheme, {ThemeOptions} from "@material-ui/core/styles/createMuiTheme";
import clsx from "clsx";
import {ColorProps} from "../utils/color";
import {Direction} from "../utils/pixels";
import {RenderTrigger, setUpCanvas} from "../utils/setup-canvas";
import classes from "./App.module.scss";
import {Dropzone} from "./Dropzone";


const palette = {
	main: "#BE3256",
	dark: "#80223A",
	contrastText: "#FFECF1",
	light: "#FFB4C7",
};

export const themeOptions: ThemeOptions = {
	palette: {
		primary: palette,
		secondary: palette,
		success: {
			main: "#5DA78B",
			dark: "#3F705D",
			light: "#97E6C8",
			contrastText: "#152821",
		},
	},
	shape: {
		borderRadius: 12,
	},
};

const App: React.FC = () => {
	const canvasRef = useRef<HTMLCanvasElement>(null);
	const imageRef = useRef<HTMLImageElement>(null);
	const renderTriggerRef = useRef<RenderTrigger>();
	const [direction, setDirection] = useState<Direction>("vertical");
	const [sortBy, setSortBy] = useState<ColorProps>("lightness");
	const [reversed, setReversed] = useState<boolean>(false);
	const [imageData, setImageData] = useState<ImageData>();

	// Setup canvas on first render
	useEffect(() => {
		renderTriggerRef.current = setUpCanvas(canvasRef);
	}, []); // eslint-disable-line react-hooks/exhaustive-deps

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
			renderTriggerRef.current?.(imageData, sortBy, direction, reversed);
		}
	}, [imageData, sortBy, direction, reversed]);

	const handleDirectionChange: SelectInputProps<Direction>["onChange"] = (event) => setDirection(event.target.value);
	const handleSortByChange: SelectInputProps<ColorProps>["onChange"] = (event) => setSortBy(event.target.value);
	const handleReversedChange: SwitchProps["onChange"] = (event, checked) => setReversed(checked);

	return (
		<ThemeProvider theme={createMuiTheme(themeOptions)}>
			<StylesProvider injectFirst>
				<div className={clsx(!imageData && classes.hidden)}>
					<div className={classes.flexContainer}>
						<Paper elevation={8} className={classes.card}>
							<img alt="Original" ref={imageRef} onLoad={handleLoad} className={classes.image} />
						</Paper>
						<Paper elevation={8} className={classes.card}>
							<canvas ref={canvasRef} className={classes.image} />
						</Paper>
					</div>

					<FormControl>
						<InputLabel id="sort-by-label">Sort By</InputLabel>
						<Select labelId="sort-by-label" value={sortBy} onChange={handleSortByChange}>
							<MenuItem value="hue">Hue</MenuItem>
							<MenuItem value="saturation">Saturation</MenuItem>
							<MenuItem value="lightness">Lightness</MenuItem>
							<MenuItem value="red">Red</MenuItem>
							<MenuItem value="green">Green</MenuItem>
							<MenuItem value="blue">Blue</MenuItem>
							<MenuItem value="alpha">Alpha</MenuItem>
							<MenuItem value="rgb">RGB Summation</MenuItem>
							<MenuItem value="rgba">RGBA Summation</MenuItem>
						</Select>
					</FormControl>

					<FormControl>
						<InputLabel id="direction-input-label">Direction</InputLabel>
						<Select labelId="direction-input-label" value={direction} onChange={handleDirectionChange}>
							<MenuItem value="horizontal">Horizontal</MenuItem>
							<MenuItem value="vertical">Vertical</MenuItem>
						</Select>
					</FormControl>

					<FormControlLabel
						label="Reversed"
						control={<Switch checked={reversed} onChange={handleReversedChange} />}
					/>
				</div>

				{!imageData && <Dropzone imageRef={imageRef} />}
			</StylesProvider>
		</ThemeProvider>
	);
};

export default App;

"use client";

import {useOriginalImage} from "../contexts/original-image";
import {defaultDirection, defaultReversed, defaultSortBy, defaultThreshold, useSort} from "../contexts/sort";
import {ColorProps} from "../utils/color";
import {Direction} from "../utils/pixels";
import {Button} from "./button";
import styles from "./options-panel.module.scss";

type SortStartingFrom = "top" | "bottom" | "left" | "right";

const getSortStartingFromFromDirection = (direction: Direction, reversed: boolean): SortStartingFrom => {
	if (direction === "vertical") {
		return reversed ? "bottom" : "top";
	}
	if (direction === "horizontal") {
		return reversed ? "right" : "left";
	}
	throw new Error("Invalid direction");
};

const getDirectionFromSortStartingFrom = (sortStartingFrom: SortStartingFrom) => {
	let direction: Direction;
	let reversed: boolean;

	if (sortStartingFrom === "top" || sortStartingFrom === "bottom") {
		direction = "vertical";
	} else {
		direction = "horizontal";
	}
	if (sortStartingFrom === "top" || sortStartingFrom === "left") {
		reversed = false;
	} else {
		reversed = true;
	}

	return {
		direction,
		reversed,
	};
};

export const OptionsPanel = () => {
	const {originalImage} = useOriginalImage();
	const {canvasElementRef, setDirection, setReversed, setSortBy, threshold, setThreshold} = useSort();

	return (
		<aside className={styles.optionsPanel}>
			<h2>Options</h2>
			<label>
				Sort By
				<select
					defaultValue={defaultSortBy}
					onChange={(event) => {
						const {value} = event.currentTarget;
						setSortBy?.(value as ColorProps);
					}}
				>
					<option value="hue">Hue</option>
					<option value="saturation">Saturation</option>
					<option value="lightness">Lightness</option>
					<option value="red">Red</option>
					<option value="green">Green</option>
					<option value="blue">Blue</option>
					<option value="alpha">Alpha</option>
					<option value="rgb">RGB Summation</option>
					<option value="rgba">RGBA Summation</option>
				</select>
			</label>
			<label>
				Sort Starting From
				<select
					defaultValue={getSortStartingFromFromDirection(defaultDirection, defaultReversed)}
					onChange={(event) => {
						const {direction, reversed} = getDirectionFromSortStartingFrom(event.currentTarget.value as SortStartingFrom);
						setDirection?.(direction);
						setReversed?.(reversed);
					}}
				>
					<option value="top">Top</option>
					<option value="bottom">Bottom</option>
					<option value="left">Left</option>
					<option value="right">Right</option>
				</select>
			</label>
			<label>
				Selection Range
				<fieldset>
					<select
						defaultValue={defaultThreshold.property}
						onChange={(event) => {
							setThreshold?.({
								...threshold,
								property: event.currentTarget.value as ColorProps,
							});
						}}
					>
						<option value="hue">Hue</option>
						<option value="saturation">Saturation</option>
						<option value="lightness">Lightness</option>
						<option value="red">Red</option>
						<option value="green">Green</option>
						<option value="blue">Blue</option>
						<option value="alpha">Alpha</option>
						<option value="rgb">RGB Summation</option>
						<option value="rgba">RGBA Summation</option>
					</select>
					<input
						type="number"
						min="0"
						max="255"
						defaultValue={defaultThreshold.min}
						onChange={(event) => {
							setThreshold?.({
								...threshold,
								min: Number.parseInt(event.currentTarget.value, 10),
							});
						}}
					/>
					<input
						type="number"
						min="0"
						max="255"
						defaultValue={defaultThreshold.max}
						onChange={(event) => {
							setThreshold?.({
								...threshold,
								max: Number.parseInt(event.currentTarget.value, 10),
							});
						}}
					/>
				</fieldset>
			</label>
			<Button
				variation="promoted" onClick={() => {
					if (canvasElementRef.current) {
						const link = document.createElement("a");
						const [filename] = originalImage?.name.split(".") ?? ["image"];
						link.download = `${filename}-sorted.png`;
						link.href = canvasElementRef.current.toDataURL("image/png");
						link.click();
						link.remove();
					}
				}}
			>Download
			</Button>
		</aside>
	);
};

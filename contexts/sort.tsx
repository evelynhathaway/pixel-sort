"use client";

import React, {useContext, useEffect, useRef, useState} from "react";
import {ColorProps} from "../utils/color.ts";
import {getIsTouchAndStandaloneOrMinimalWebAppOrFullscreen, politelyRequestFullscreen} from "../utils/fullscreen.ts";
import {Threshold} from "../utils/intervals.ts";

export const defaultDirection = "vertical";
export const defaultReversed = false;
export const defaultSortBy = "lightness";
export const defaultThreshold: Threshold = {
	property: "lightness",
	min: 0,
	max: 255,
};

type Direction = "vertical" | "horizontal";

const SortContext = React.createContext<{
	direction: Direction;
	setDirection?: React.Dispatch<Direction>;
	reversed: boolean;
	setReversed?: React.Dispatch<boolean>;
	sortBy: ColorProps;
	setSortBy?: React.Dispatch<ColorProps>;
	threshold: Threshold;
	setThreshold?: React.Dispatch<Threshold>;
	canvasElementRef: React.RefObject<HTMLCanvasElement | null>;
}>({
	direction: defaultDirection,
	reversed: defaultReversed,
	sortBy: defaultSortBy,
	threshold: defaultThreshold,
	canvasElementRef: {current: null},
});

interface SortContextProviderProps {
	children: React.ReactNode;
}

export const SortContextProvider = (props: SortContextProviderProps) => {
	const {children} = props;
	const [direction, setDirection] = useState<Direction>(defaultDirection);
	const [reversed, setReversed] = useState<boolean>(defaultReversed);
	const [sortBy, setSortBy] = useState<ColorProps>(defaultSortBy);
	const [threshold, setThreshold] = useState<Threshold>(defaultThreshold);
	const canvasElementRef = useRef<HTMLCanvasElement>(null);


	useEffect(() => {
		// If launched from the progressive web app, request fullscreen for sorting
		if (getIsTouchAndStandaloneOrMinimalWebAppOrFullscreen()) {
			void politelyRequestFullscreen();
		}

		// Request fullscreen when the progressive web app is closed and re-opened while sorting
		const handleVisibilityChange = () => {
			if (
				getIsTouchAndStandaloneOrMinimalWebAppOrFullscreen()
				&& document.visibilityState === "visible"
			) {
				void politelyRequestFullscreen();
			}
		};
		document.addEventListener("visibilitychange", handleVisibilityChange);
		return () => {
			document.removeEventListener("visibilitychange", handleVisibilityChange);
		};
	}, []);

	return (
		<SortContext
			value={{
				direction,
				setDirection,
				reversed,
				setReversed,
				sortBy,
				setSortBy,
				threshold,
				setThreshold,
				canvasElementRef,
			}}
		>
			{children}
		</SortContext>
	);
};

export const useSort = () => useContext(SortContext);

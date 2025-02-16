"use client";

import React, {useContext, useRef, useState} from "react";
import {ColorProps} from "../utils/color.ts";
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

	return (
		<SortContext.Provider
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
		</SortContext.Provider>
	);
};

export const useSort = () => useContext(SortContext);

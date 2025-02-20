"use client";

import React, {useContext, useEffect, useRef, useState} from "react";
import {palettes, type Palette, type ColorName} from "../styles/palette.ts";

const defaultTheme = "dragonfruit";

const rotatingThemes = [
	"strawberry",
	"orange",
	"mango",
	"banana",
	"lime",
	"mint",
	"taffy",
	"cottonCandy",
	"blueberry",
	"plum",
	"grape",
	"dragonfruit",
] as const;

const ThemeContext = React.createContext<{
	theme: ColorName;
	setTheme?: React.Dispatch<ColorName>;
	palette: Palette;
	isRotating: boolean;
	setIsRotating?: React.Dispatch<boolean>;
}>({
	theme: defaultTheme,
	palette: palettes[defaultTheme],
	isRotating: false,
});

interface ThemeContextProviderProps {
	children: React.ReactNode;
}

export const ThemeContextProvider = (props: ThemeContextProviderProps) => {
	const {children} = props;
	const [theme, setTheme] = useState<ColorName>(defaultTheme);

	const [isRotating, setIsRotating] = useState(true);
	const rotatingIntervalRef = useRef<number>(undefined);
	const lastRotatedThemeIndexRef = useRef(0);
	useEffect(() => {
		if (isRotating && !rotatingIntervalRef.current) {
			rotatingIntervalRef.current = window.setInterval(() => {
				setTheme(rotatingThemes[lastRotatedThemeIndexRef.current]);
				lastRotatedThemeIndexRef.current = (lastRotatedThemeIndexRef.current + 1) % rotatingThemes.length;
			}, 5000);
		}
		if (!isRotating && rotatingIntervalRef.current) {
			clearInterval(rotatingIntervalRef.current);
			rotatingIntervalRef.current = undefined;
		}
		return () => {
			if (rotatingIntervalRef.current) {
				clearInterval(rotatingIntervalRef.current);
				rotatingIntervalRef.current = undefined;
			}
		};
	}, [isRotating]);

	return (
		<ThemeContext
			value={{
				theme,
				setTheme,
				palette: palettes[theme],
				isRotating,
				setIsRotating,
			}}
		>
			{children}
		</ThemeContext>
	);
};

export const useTheme = () => useContext(ThemeContext);

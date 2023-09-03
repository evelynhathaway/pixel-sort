/* eslint-disable @next/next/no-img-element */
"use client";

import React, {useCallback, useEffect, useRef} from "react";
import {useRouter} from "next/navigation";
import Vibrant from "node-vibrant";
import QuickPinchZoom, {make3dTransformValue} from "react-quick-pinch-zoom";
import {useImage} from "../contexts/image";
import {useTheme} from "../contexts/theme";
import {palettes} from "../styles/palette";
import {Color} from "../utils/color";

export const Canvas = () => {
	const {image} = useImage();
	const lastImageRef = useRef<File>();
	const {isRotating, setIsRotating, setTheme} = useTheme();
	const imageElementRef = useRef<HTMLImageElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (!image) {
			router.push("/");
		}
	}, [image, router]);

	useEffect(() => {
		void (async () => {
			if (image && lastImageRef.current !== image && imageElementRef.current) {
				lastImageRef.current = image;
				imageElementRef.current.src = URL.createObjectURL(image);
				const imagePalette = await Vibrant.from(imageElementRef.current).getPalette();
				const vibrantSwatch = imagePalette.Vibrant;
				if (!vibrantSwatch) {
					setTheme?.("silver");
					return;
				}
				const vibrantColor = new Color(...vibrantSwatch.rgb);
				const [[imageTheme]] = Object.entries(palettes)
					.map(([theme, palette]) => [
						theme as keyof typeof palettes,
						Math.abs(
							new Color(palette.get("500")).hue - vibrantColor.hue
						),
					] as const)
					.sort(([, hueDiffA], [, hueDiffB]) => {
						return hueDiffA - hueDiffB;
					});

				setTheme?.(imageTheme);
			}
		})();
	}, [image, setTheme]);

	useEffect(() => {
		if (isRotating) setIsRotating?.(false);
	}, [isRotating, setIsRotating]);

	const canvasRef = useRef<HTMLCanvasElement>(null);
	const onUpdate = useCallback(({x, y, scale}: {x: number; y: number; scale: number}) => {
		if (canvasRef.current) {
			const value = make3dTransformValue({x, y, scale});

			canvasRef.current.style.setProperty("transform", value);
		}
	}, []);

	return (
		<>
			<img ref={imageElementRef} alt="Original" />
			<QuickPinchZoom onUpdate={onUpdate}>
				<canvas ref={canvasRef} />
			</QuickPinchZoom>
		</>
	);
};

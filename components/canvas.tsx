/* eslint-disable @next/next/no-img-element */
"use client";

import React, {useCallback, useEffect, useRef, useState} from "react";
import clsx from "clsx";
import {useRouter} from "next/navigation";
import Vibrant from "node-vibrant";
import QuickPinchZoom, {make3dTransformValue} from "react-quick-pinch-zoom";
import {useOriginalImage} from "../contexts/original-image";
import {useSort} from "../contexts/sort";
import {useTheme} from "../contexts/theme";
import {useCancellableLongPressAndHold} from "../hooks/use-cancellable-long-press-and-hold";
import {palettes} from "../styles/palette";
import {Color} from "../utils/color";
import {RenderTrigger, setUpCanvas} from "../utils/setup-canvas";
import styles from "./canvas.module.scss";

export const Canvas = () => {
	const {originalImage: image} = useOriginalImage();
	const lastImageRef = useRef<File>();
	const {isRotating, setIsRotating, setTheme} = useTheme();
	const imageContainerElementRef = useRef<HTMLDivElement>(null);
	const imageElementRef = useRef<HTMLImageElement>(null);
	const router = useRouter();
	const renderTriggerRef = useRef<RenderTrigger>();
	const [imageData, setImageData] = useState<ImageData>();
	const {canvasElementRef, direction, reversed, sortBy, threshold} = useSort();
	const [showOriginal, setShowOriginal] = useState(false);

	const {cancellableLongPressAndHoldProps, cancelHold} = useCancellableLongPressAndHold(
		() => setShowOriginal(true),
		() => setShowOriginal(false),
	);

	// Setup canvas on first render
	useEffect(() => {
		if (!renderTriggerRef.current) {
			renderTriggerRef.current = setUpCanvas(canvasElementRef);
		}
	}, [canvasElementRef]);

	const handleLoad: React.ReactEventHandler<HTMLImageElement> = (event) => {
		const canvasElement = document.createElement("canvas");
		const canvasContext = canvasElement.getContext("2d");
		if (canvasContext) {
			const image = event.currentTarget;
			canvasElement.height = image.naturalHeight;
			canvasElement.width = image.naturalWidth;
			canvasContext.drawImage(image, 0, 0);
			setImageData?.(canvasContext.getImageData(0, 0, canvasElement.width, canvasElement.height));
		}
		canvasElement.remove();
	};

	useEffect(() => {
		if (imageData) {
			renderTriggerRef.current?.(imageData, sortBy, direction, reversed, [{property: "alpha", min: 255, max: 255}, threshold]);
		}
	}, [imageData, direction, reversed, sortBy, threshold]);

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

	const onUpdate = useCallback(({x, y, scale}: {x: number; y: number; scale: number}) => {
		if (imageContainerElementRef.current) {
			const value = make3dTransformValue({x, y, scale});

			imageContainerElementRef.current.style.setProperty("transform", value);
		}
	}, []);

	return image ? (
		<QuickPinchZoom
			onUpdate={onUpdate}
			shouldInterceptWheel={() => false}
			enforceBoundsDuringZoom
			onDragStart={cancelHold}
		>
			<div
				ref={imageContainerElementRef}
				className={clsx(styles.imageContainer, showOriginal && styles.showOriginal)}
				{...cancellableLongPressAndHoldProps}
			>
				<img className={styles.image} ref={imageElementRef} onLoad={handleLoad} alt="Original" />
				<canvas className={styles.canvas} ref={canvasElementRef} aria-label="Sorted" />
			</div>
		</QuickPinchZoom>
	) : null;
};

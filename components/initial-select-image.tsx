"use client";

import {useCallback, useEffect, useRef} from "react";
import clsx from "clsx";
import {useRouter} from "next/navigation";
import {mergeProps} from "react-aria";
import {useDropzone} from "react-dropzone";
import {useOriginalImage} from "../contexts/original-image.tsx";
import {useTheme} from "../contexts/theme.tsx";
import {useTransitionHeightAuto} from "../hooks/use-transition-height-auto.ts";
import {useTransitionInOut} from "../hooks/use-transition-in-out.ts";
import {Button} from "./button.tsx";
import styles from "./initial-select-image.module.scss";

export const InitialSelectImage = () => {
	const {setOriginalImage} = useOriginalImage();
	const {isRotating, setIsRotating} = useTheme();
	const instructionsRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (!isRotating) {
			setIsRotating?.(true);
		}
	}, [isRotating, setIsRotating]);

	const onDrop = useCallback(([file]: File[]) => {
		setOriginalImage?.(file);
		router.push("/sort");
	}, [setOriginalImage, router]);

	const {
		getRootProps,
		getInputProps,
		isDragActive,
		isDragReject,
	} = useDropzone({
		onDrop,
		accept: {"image/*": []},
		multiple: false,
	});

	// Uses negated reject instead of `isDragAccept` to fail safe on browsers that do not share the mime type before
	// dropping
	// - Avoids providing the visual accordance to drop when dragging multiple files or one that is not an image
	const isDraggingValidFile = isDragActive && !isDragReject;

	const {transitionInOutProps} = useTransitionInOut(
		!isDraggingValidFile,
		{
			shown: styles.instructionsShown,
			transitionIn: styles.instructionsTransitionIn,
			transitionOut: styles.instructionsTransitionOut,
		},
	);

	const {transitionHeightAutoProps} = useTransitionHeightAuto(
		!isDraggingValidFile,
		instructionsRef,
	);

	return (
		<div
			{...getRootProps()}
			className={clsx(
				styles.initialSelectImage,
				isDraggingValidFile && styles.isDraggingValidFile,
			)}
			tabIndex={undefined}
			role={undefined}
		>
			<input {...getInputProps()} />
			<div
				{...mergeProps(
					transitionInOutProps,
					transitionHeightAutoProps,
					{className: styles.instructions},
				)}
				ref={instructionsRef}
			>
				<span>Drag and drop an image</span>
				<span>or</span>
			</div>
			<Button variation="promoted">
				<span className={styles.buttonTextWrapper}>
					<span className={clsx(styles.buttonText, isDraggingValidFile && styles.hidden)}>
						Select an Image
					</span>
					<span className={clsx(styles.buttonText, !isDraggingValidFile && styles.hidden)} aria-hidden>
						Drop the Images
					</span>
				</span>
			</Button>
		</div>
	);
};

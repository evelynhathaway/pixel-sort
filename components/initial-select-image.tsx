"use client";

import {useCallback, useEffect, useRef} from "react";
import clsx from "clsx";
import {useRouter} from "next/navigation";
import {mergeProps} from "react-aria";
import {useDropzone} from "react-dropzone";
import {useImage} from "../contexts/image";
import {useTheme} from "../contexts/theme";
import {useTransitionHeightAuto} from "../hooks/use-transition-height-auto";
import {useTransitionInOut} from "../hooks/use-transition-in-out";
import {Button} from "./button";
import styles from "./initial-select-image.module.scss";

export default function InitialSelectImage () {
	const {setImage} = useImage();
	const {isRotating, setIsRotating} = useTheme();
	const instructionsRef = useRef<HTMLDivElement>(null);
	const router = useRouter();

	useEffect(() => {
		if (!isRotating) {
			setIsRotating?.(true);
		}
	}, [isRotating, setIsRotating]);

	const onDrop = useCallback(([file]: Array<File>) => {
		setImage?.(file);
		router.push("/sort");
	}, [setImage, router]);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		accept: {"image/*": []},
		multiple: false,
	});

	const {transitionInOutProps} = useTransitionInOut(
		!isDragActive,
		{
			shown: styles.instructionsShown,
			transitionIn: styles.instructionsTransitionIn,
			transitionOut: styles.instructionsTransitionOut,
		},
	);

	const {transitionHeightAutoProps} = useTransitionHeightAuto(
		!isDragActive,
		instructionsRef,
	);

	return (
		<div
			{...getRootProps()}
			className={clsx(
				styles.initialSelectImage,
				isDragActive && styles.isDragActive,
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
					<span className={clsx(styles.buttonText, isDragActive && styles.hidden)}>Select an Image</span>
					<span className={clsx(styles.buttonText, styles.buttonTextOverlay, !isDragActive && styles.hidden)} aria-hidden>Drop the Image</span>
				</span>
			</Button>
		</div>
	);
}

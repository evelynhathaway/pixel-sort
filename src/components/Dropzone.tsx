import React, {useCallback} from "react";
import {Button, ButtonBase} from "@material-ui/core";
import clsx from "clsx";
import {useDropzone} from "react-dropzone";
import {ReactComponent as Icon} from "../assets/icon.svg";
import classes from "./Dropzone.module.scss";


export interface DropzoneProps {
	imageRef: React.RefObject<HTMLImageElement>;
}

export const Dropzone: React.FC<DropzoneProps> = (props) => {
	const {imageRef} = props;

	const onDrop = useCallback(([file]: Array<File>) => {
		const image = imageRef.current;
		if (file && image) {
			image.src = URL.createObjectURL(file);
		}
	}, [imageRef]);

	const {getRootProps, getInputProps, isDragActive} = useDropzone({
		onDrop,
		accept: "image/*",
		multiple: false,
	});

	return (
		<ButtonBase
			{...getRootProps()}
			className={clsx(classes.Dropzone, isDragActive && classes.isDragActive)}
			classes={{focusVisible: classes.isDragActive}}
		>
			<Icon />
			<h1>Pixel Sort</h1>
			<input {...getInputProps()} />
			{
				isDragActive ? (
					<span className={classes.message}>Drop the image</span>
				) : (
					<div>
						<span className={classes.message}>Drag and drop an image or</span>
						<Button variant="contained" component="div" tabIndex={-1} role="presentation">Select Image</Button>
					</div>
				)
			}
		</ButtonBase>
	);
};

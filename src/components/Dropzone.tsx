import React, {useCallback} from "react";
import {Button, ButtonBase} from "@material-ui/core";
import clsx from "clsx";
import {useDropzone} from "react-dropzone";
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
			<input {...getInputProps()} />
			{
				isDragActive ? (
					<span className={classes.message}>Drop the image</span>
				) : (
					<>
						<span className={classes.message}>Drag and drop an image to pixel sort or</span>
						<Button variant="contained" component="div" tabIndex={-1} role="presentation">Select Image</Button>
					</>
				)
			}
		</ButtonBase>
	);
};

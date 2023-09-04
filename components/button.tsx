import React from "react";
import clsx from "clsx";
import styles from "./button.module.scss";

interface ButtonProps extends React.ComponentPropsWithoutRef<"button"> {
	variation: "promoted";
}

export const Button = (props: ButtonProps) => {
	const {variation, className, ...otherProps} = props;

	return (
		<button
			type="button"
			className={clsx(
				styles.button,
				styles[variation],
				className
			)}
			{...otherProps}
		/>
	);
};

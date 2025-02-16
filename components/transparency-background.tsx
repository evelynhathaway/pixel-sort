"use client";

import clsx from "clsx";
import {useTheme} from "../contexts/theme.tsx";
import styles from "./transparency-background.module.scss";

export const TransparencyBackground = () => {
	const {theme} = useTheme();

	return (
		<div
			className={clsx(styles[theme], styles.transparencyBackground)}
			aria-hidden
		/>
	);
};

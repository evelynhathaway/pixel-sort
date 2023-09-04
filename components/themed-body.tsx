"use client";

import clsx from "clsx";
import {Manrope} from "next/font/google";
import {useTheme} from "../contexts/theme";
import styles from "./themed-body.module.scss";

const manrope = Manrope({subsets: ["latin"]});

interface ThemedBodyProps {
	children: React.ReactNode;
}

export const ThemedBody = (props: ThemedBodyProps) => {
	const {children} = props;
	const {theme, isRotating} = useTheme();

	return (
		<body
			className={clsx(
				styles.body,
				styles[theme],
				isRotating && styles.isRotating,
				manrope.className,
			)}
		>
			{children}
		</body>
	);
};

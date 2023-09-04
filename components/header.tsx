"use client";
import clsx from "clsx";
import {usePathname} from "next/navigation";
import styles from "./header.module.scss";
import {Icon} from "./icon";

export const Header = () => {
	const pathname = usePathname();
	return (
		<header className={styles.header}>
			<Icon />
			<h1 className={clsx(styles.text, pathname === "/" || styles.hidden)}>Pixel Sort</h1>
		</header>
	);
};

"use client";

import clsx from "clsx";
import {useTheme} from "../contexts/theme";
import {hexToRgb} from "../utils/color";
import styles from "./icon.module.scss";

export const Icon = () => {
	const {theme, palette} = useTheme();
	const shadowColorHex = palette.get("950") ?? "#000000";
	const shadowColorRgb = hexToRgb(shadowColorHex);
	const shadowColorMatrix = `
		${shadowColorRgb.red / 255}	0								0								0		0
		0							${shadowColorRgb.green / 255}	0								0		0
		0							0								${shadowColorRgb.blue / 255}	0		0
		0							0								0								0.2		0
	`;

	return (
		<svg
			xmlns="http://www.w3.org/2000/svg"
			fill="none"
			viewBox="0 0 192 192"
			className={clsx(styles[theme], styles.icon)}
		>
			<path className={styles.background} d="M192 0H0v192h192V0Z"/>
			<g filter="url(#lightingEffects)">
				<rect width="24" height="24" x="22" y="22" className={styles.squareOne} rx="1"/>
				<rect width="24" height="24" x="53" y="22" className={styles.squareTwo} rx="1"/>
				<rect width="24" height="24" x="84" y="22" className={styles.squareThree} rx="1"/>
				<rect width="24" height="24" x="115" y="22" className={styles.squareFour} rx="1"/>
				<rect width="24" height="24" x="146" y="22" className={styles.squareFive} rx="1"/>
				<rect width="24" height="24" x="22" y="53" className={styles.squareTwo} rx="1"/>
				<rect width="24" height="24" x="53" y="53" className={styles.squareThree} rx="1"/>
				<rect width="24" height="24" x="84" y="53" className={styles.squareFour} rx="1"/>
				<rect width="24" height="24" x="115" y="53" className={styles.squareFive} rx="1"/>
				<rect width="24" height="24" x="146" y="53" className={styles.squareSix} rx="1"/>
				<rect width="24" height="24" x="22" y="84" className={styles.squareThree} rx="1"/>
				<rect width="24" height="24" x="53" y="84" className={styles.squareFour} rx="1"/>
				<rect width="24" height="24" x="84" y="84" className={styles.squareFive} rx="1"/>
				<rect width="24" height="24" x="115" y="84" className={styles.squareSix} rx="1"/>
				<rect width="24" height="24" x="22" y="115" className={styles.squareFour} rx="1"/>
				<rect width="24" height="24" x="53" y="115" className={styles.squareFive} rx="1"/>
				<rect width="24" height="24" x="84" y="115" className={styles.squareSix} rx="1"/>
				<rect width="24" height="24" x="22" y="146" className={styles.squareFive} rx="1"/>
				<rect width="24" height="24" x="53" y="146" className={styles.squareSix} rx="1"/>
			</g>
			<defs>
				<filter id="lightingEffects" colorInterpolationFilters="sRGB">
					{/* Setup */}
					<feFlood floodOpacity="0" result="BackgroundImageFix"/>

					{/* Shadow */}
					<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
					<feOffset dy="2"/>
					{/* 0.2 opacity palette shadow */}
					<feColorMatrix
						type="matrix"
						values={shadowColorMatrix}
					/>
					<feBlend in2="BackgroundImageFix" result="dropShadow"/>
					<feBlend in="SourceGraphic" in2="dropShadow" result="dropShadowResult"/>

					{/* Tint */}
					<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
					<feOffset dy="2"/>
					<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
					{/* 0.2 opacity white tint */}
					<feColorMatrix
						values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 0.2 0"
					/>
					<feBlend in2="dropShadowResult" result="tintResult"/>

					{/* Shade */}
					<feColorMatrix in="SourceAlpha" result="hardAlpha" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
					<feOffset dy="-2"/>
					<feComposite in2="hardAlpha" k2="-1" k3="1" operator="arithmetic"/>
					{/* 0.2 opacity palette shadow */}
					<feColorMatrix
						type="matrix"
						values={shadowColorMatrix}
					/>
					<feBlend in2="tintResult" result="shadeResult"/>
				</filter>
			</defs>
		</svg>
	);
};

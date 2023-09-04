"use client";

import {useRef, useCallback, useState, CSSProperties} from "react";

/**
 * React hook that animates elements with a height of auto
 * @example
 * import {useTransitionInOut} from "../hooks/use-transition-in-out";
 * import {mergeProps} from "react-aria";
 * import styles from "./MyElement.module.scss";
 *
 * // MyElement.module.scss
 * //
 * // .myElement {
 * // 	transition: height 0.2s ease-out;
 * // }
 *
 * const MyElement = () => {
 * 	// [...]
 * 	const myElementRef = useRef<HTMLElement>(null);
 * 	const {transitionHeightAutoProps} = useTransitionHeightAuto(isOpen, myElementRef);
 * 	return <div {...mergeProps(transitionHeightAutoProps, {className: styles.myElement})}/>
 * }
 */
export const useTransitionHeightAuto = (isShown: boolean, elementRef: React.RefObject<HTMLElement | null>) => {
	const [style, setStyle] = useState<CSSProperties | undefined>();
	const isShownRef = useRef(isShown);

	// Whenever `isShown` changes (e.g. when a modal is opened or closed)
	if (isShown !== isShownRef.current) {
		isShownRef.current = isShown;

		// Ignore the first run (first render), which will not transition as there was not a previous state
		if (isShown) {
			setStyle({height: 0});
			window.requestAnimationFrame(() => {
				if (elementRef.current) {
					const height = `${elementRef.current.scrollHeight}px`;
					setStyle({height});
				}
			});
		} else {
			if (elementRef.current) {
				const height = `${elementRef.current.scrollHeight}px`;
				setStyle({height});
				window.requestAnimationFrame(() => {
					setStyle({height: 0});
				});
			}
		}
	}

	const onTransitionEnd = useCallback(() => {
		// Reset inline style
		setStyle(undefined);
	}, []);

	return {
		transitionHeightAutoProps: {
			onTransitionEnd,
			style,
		},
	};
};

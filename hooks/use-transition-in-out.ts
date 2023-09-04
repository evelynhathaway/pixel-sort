"use client";

import {useRef, useCallback, useState} from "react";
import clsx from "clsx";
import styles from "./use-transition-in-out.module.scss";

interface TransitionClassNames {
	/** Class name with styles to apply while shown, e.g. the `display` property */
	shown: string;
	/** Class name with styles to apply while transitioning in, excluding the `display` property */
	transitionIn: string;
	/** Class name with styles to apply while transitioning out, excluding the `display` property */
	transitionOut: string;
}

/**
 * React hook that displays an element for a frame before transitioning in, and keeps it displayed while transitioning out
 * @example
 * import {useTransitionInOut} from "../hooks/use-transition-in-out";
 * import {mergeProps} from "react-aria";
 * import styles from "./MyElement.module.scss";
 *
 * // MyElement.module.scss
 * //
 * // .myElement {
 * // 	transition: opacity 0.2s ease-out;
 * // }
 * // .myElement,
 * // .myElementShown {
 * // 	display: block;
 * // }
 * // .myElement,
 * // .myElementTransitionOut {
 * // 	opacity: 0;
 * // }
 * // .myElementTransitionIn {
 * // 	opacity: 1;
 * // }
 *
 * const MyElement = () => {
 * 	// [...]
 * 	const {transitionInOutProps} = useTransitionInOut(isOpen, {
 * 		shown: styles.myElementShown,
 * 		transitionIn: styles.myElementTransitionIn,
 * 		transitionOut: styles.myElementTransitionOut,
 * 	});
 * 	return <div {...mergeProps(transitionInOutProps, {className: styles.myElement})}/>
 * }
 */
export const useTransitionInOut = (isShown: boolean, classNames: TransitionClassNames) => {
	const [className, setClassName] = useState(isShown ? styles.shown : styles.hidden);
	const classNamesRef = useRef<TransitionClassNames>(classNames);
	const isShownRef = useRef(isShown);

	classNamesRef.current = classNames;

	// Whenever `isShown` changes (e.g. when a modal is opened or closed)
	if (isShown !== isShownRef.current) {
		isShownRef.current = isShown;
		// Ignore the first run (first render), which will not transition as there was not a previous state
		if (isShown) {
			/*
				If shown, make sure the browser is able to paint one initial frame, then start the transition
				- Without displaying for a frame, the browser will not transition, and instead it will jump to the end
				of the transition

				As an example, consider a modal that has a CSS transition for opacity. While the modal is closed, the browser ignores `opacity: 0` because `display: none` tells the browser to completely remove the element. Removing the element required for making sure it's hidden, not receiving clicks, and not in the accessibility tree, so we set `display: block` while its still `opacity: 0` so the browser knows the desired initial state. We only add our desired end state, `opacity: 1`, after the browser has painted the initial state for a single frame.
			*/
			setClassName(classNamesRef.current.shown);
			window.requestAnimationFrame(() => {
				setClassName(clsx(
					classNamesRef.current.shown,
					classNamesRef.current.transitionIn,
				));
			});
		} else {
			// If hidden, start the transition out, making sure that it's still displayed for now
			setClassName(clsx(
				classNamesRef.current.shown,
				classNamesRef.current.transitionOut
			));
		}
	}

	const onTransitionEnd = useCallback(() => {
		// Once the transition has ended, set hide the element if it transitioned out
		if (!isShownRef.current) {
			setClassName(clsx(styles.hidden));
		}
	}, []);

	return {
		transitionInOutProps: {
			className,
			onTransitionEnd,
		},
	};
};

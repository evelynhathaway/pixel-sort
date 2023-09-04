"use client";

import {useRef} from "react";

/**
 * React hook that allows actions to occur after the user has pressed and held for a threshold, and then the action is
 * reverted when released.
 */
export const useCancellableLongPressAndHold = (
	onLongPressAndHold: () => void,
	onLongPressAndHoldEnd: () => void,
	threshold: number = 300,
) => {
	const isPressedRef = useRef(false);
	const isLongPressAndHeldRef = useRef(false);
	const timeoutRef = useRef<number>();

	const cancelHold = () => {
		clearTimeout(timeoutRef.current);
		isPressedRef.current = false;
		if (isLongPressAndHeldRef.current) {
			isLongPressAndHeldRef.current = false;
			onLongPressAndHoldEnd();
		}
		timeoutRef.current = undefined;
	};

	const handlePressStart = () => {
		isPressedRef.current = true;
		timeoutRef.current = window.setTimeout(() => {
			if (isPressedRef.current && !isLongPressAndHeldRef.current) {
				isLongPressAndHeldRef.current = true;
				onLongPressAndHold();
			}
		}, threshold);
	};

	return {
		cancellableLongPressAndHoldProps: {
			onMouseDown: handlePressStart,
			onMouseUp: cancelHold,
			onMouseLeave: cancelHold,
		},
		cancelHold,
	};
};

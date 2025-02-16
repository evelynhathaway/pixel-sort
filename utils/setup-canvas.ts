import Worker from "./offscreen-canvas.worker.js";
import {render} from "./render.ts";
import {sortImage} from "./sort.ts";

export type RenderTrigger = (...args: Parameters<typeof sortImage>) => void;

let worker: Worker;

export const setUpCanvas = function (
	{current: canvasElement}: React.RefObject<HTMLCanvasElement | null>,
): undefined | RenderTrigger {
	if (!canvasElement) return;

	const hasOffscreen = "OffscreenCanvas" in window;
	let offscreenCanvas: OffscreenCanvas, canvasContext: CanvasRenderingContext2D | null;
	if (hasOffscreen) {
		// Transfer to a worker if there is support to handle off the main thread
		if (!worker) {
			worker = new Worker();
			offscreenCanvas = canvasElement.transferControlToOffscreen();
			worker.postMessage({offscreenCanvas}, [offscreenCanvas]);
		}
	} else {
		// New canvas context, allow alpha for initial styles
		canvasContext = canvasElement.getContext("2d");
	}

	const renderHandoff: RenderTrigger = function (imageData, sortBy, direction, reversed, thresholds) {
		// Call render function in worker or on the main thread
		if (hasOffscreen) {
			worker.postMessage({imageData, sortBy, direction, reversed, thresholds});
		} else {
			render({imageData, sortBy, direction, reversed, thresholds, canvasElement, canvasContext});
		}
	};

	return renderHandoff;
};

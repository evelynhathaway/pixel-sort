import Worker from "./offscreen-canvas.worker";
import {render} from "./render";
import {sortImage} from "./sort";

export type RenderTrigger = (...args: Parameters<typeof sortImage>) => void;

let worker: Worker;

export const setUpCanvas = function (
	{current: canvasElement}: React.RefObject<HTMLCanvasElement>,
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

	const renderHandoff: RenderTrigger = function (imageData, sortBy, direction, reversed) {
		// Call render function in worker or on the main thread
		hasOffscreen ? worker.postMessage({imageData, sortBy, direction, reversed}) :
			render({imageData, sortBy, direction, reversed, canvasElement, canvasContext});
	};

	return renderHandoff;
};

/* eslint-disable unicorn/no-abusive-eslint-disable */
/* eslint-disable */
// eslint-disable-next-line import/no-unresolved
import Worker from "worker-loader!./offscreen-canvas.worker";
import {render} from "./render";


export type RenderTrigger = (imageData: ImageData) => void;

export const setUpCanvas = function (
	{current: canvasElement}: React.RefObject<HTMLCanvasElement>,
): undefined | RenderTrigger {
	if (!canvasElement) return;

	const hasOffscreen = "OffscreenCanvas" in window;
	let worker: Worker, offscreenCanvas: OffscreenCanvas, canvasContext: CanvasRenderingContext2D | null;
	if (hasOffscreen) {
		// Transfer to a worker if there is support to handle off the main thread
		worker = new Worker();
		offscreenCanvas = canvasElement.transferControlToOffscreen();
		worker.postMessage({offscreenCanvas}, [offscreenCanvas]);
	} else {
		// New canvas context, allow alpha for initial styles
		canvasContext = canvasElement.getContext("2d");
	}

	const renderHandoff = function (imageData: ImageData) {
		// Call render function in worker or on the main thread
		hasOffscreen ? worker.postMessage({imageData}) :
			render({imageData, canvasElement, canvasContext});
	};

	return renderHandoff;
};
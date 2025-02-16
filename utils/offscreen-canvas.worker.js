// Import render into the worker
// In webpack, use `import` or `require` instead of `importScripts()`
import {render} from "./render.ts";

let canvasElement;
let canvasContext;
const setup = function (offscreenCanvas) {
	// Store the canvas in the worker scope
	canvasElement = offscreenCanvas;
	// New canvas context, allow alpha for initial styles
	canvasContext = canvasElement.getContext("2d");
};

onmessage = function ({data}) {
	// Send to `setup` or `render` handlers
	(data.offscreenCanvas ? setup(data.offscreenCanvas) : render({...data, canvasElement, canvasContext}));
};

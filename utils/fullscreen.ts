export const getIsTouchAndStandaloneOrMinimalWebAppOrFullscreen = () => window.matchMedia(
	"(pointer: coarse) and ((display-mode: standalone) or (display-mode: fullscreen) or (display-mode: minimal-ui))"
).matches;

export const politelyRequestFullscreen = async (element: HTMLElement = document.documentElement) => {
	if (!document.fullscreenElement) {
		try {
			await element.requestFullscreen();
		} catch {
			// Do nothing if errored, as the reason for a browser being unable to fullscreen isn't important
		}
	}
};

export const politelyExitFullscreen = async () => {
	if (document.fullscreenElement) {
		try {
			await document.exitFullscreen();
		} catch {
			// Do nothing if errored, as the reason for a browser being unable to exit fullscreen isn't important
		}
	}
};

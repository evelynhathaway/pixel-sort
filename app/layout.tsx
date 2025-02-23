import "../styles/global.scss";
import type {Metadata, Viewport} from "next";
import {Header} from "../components/header.tsx";
import {ThemedBody} from "../components/themed-body.tsx";
import {TitleBar} from "../components/title-bar.tsx";
import {TransparencyBackground} from "../components/transparency-background.tsx";
import {OriginalImageContextProvider} from "../contexts/original-image.tsx";
import {ThemeContextProvider} from "../contexts/theme.tsx";

export const metadata: Metadata = {
	metadataBase: new URL("https://pixel-sort.evelyn.dev"),
	title: "Pixel Sort",
	applicationName: "Pixel Sort",
	description: "Liven your photos with a glitch effect",
	openGraph: {
		siteName: "Pixel Sort",
		type: "website",
	},
	manifest: "/site.webmanifest",
	appleWebApp: {
		capable: true,
		statusBarStyle: "black-translucent",
		title: "Pixel Sort",
	},
} satisfies Metadata;

export const viewport: Viewport = {
	viewportFit: "cover",
	interactiveWidget: "resizes-visual",
};

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout (props: RootLayoutProps) {
	const {children} = props;

	return (
		<html lang="en">
			<ThemeContextProvider>
				<ThemedBody>
					<TitleBar />
					<Header />
					<main>
						<OriginalImageContextProvider>
							{children}
						</OriginalImageContextProvider>
					</main>
					<TransparencyBackground />
				</ThemedBody>
			</ThemeContextProvider>
		</html>
	);
}

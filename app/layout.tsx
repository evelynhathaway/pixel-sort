import "../styles/global.scss";
import type {Metadata} from "next";
import {Header} from "../components/header";
import {ThemedBody} from "../components/themed-body";
import {TransparencyBackground} from "../components/transparency-background";
import {OriginalImageContextProvider} from "../contexts/original-image";
import {ThemeContextProvider} from "../contexts/theme";
import {dragonfruit} from "../styles/palette";

export const metadata = {
	metadataBase: new URL("https://pixel-sort.evelyn.dev"),
	title: "Pixel Sort",
	description: "Liven your photos with a glitch effect",
	openGraph: {
		siteName: "Pixel Sort",
		type: "website",
	},
	themeColor: dragonfruit.get("500"),
	manifest: "/site.webmanifest",
} satisfies Metadata;

interface RootLayoutProps {
	children: React.ReactNode;
}

export default function RootLayout (props: RootLayoutProps) {
	const {children} = props;

	return (
		<html lang="en">
			<ThemeContextProvider>
				<ThemedBody>
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

import "../styles/global.scss";
import type {Metadata} from "next";
import {Header} from "../components/header";
import {ThemedBody} from "../components/themed-body";
import {TransparencyBackground} from "../components/transparency-background";
import {ThemeContextProvider} from "../contexts/theme";

export const metadata: Metadata = {
	title: "Pixel Sort",
	description: "Liven your photos with a glitch effect",
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
					<Header />
					{children}
					<TransparencyBackground />
				</ThemedBody>
			</ThemeContextProvider>
		</html>
	);
}

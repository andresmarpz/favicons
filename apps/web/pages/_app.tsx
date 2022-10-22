import "../styles/globals.css";
import type { AppProps } from "next/app";
import NavLink from "../ui/NavLink";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<div className="p-4 max-w-3xl m-auto">
			<header className="py-6 flex gap-2">
				<NavLink href="#">F</NavLink>
				<NavLink href="https://www.npmjs.com/package/@andresmarpz/favicons">npm</NavLink>
				<NavLink href="#docs">docs</NavLink>
			</header>
			<Component {...pageProps} />
		</div>
	);
}

export default MyApp;

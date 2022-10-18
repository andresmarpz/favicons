import type { NextPage } from "next";
import Head from "next/head";
import NavLink from "../ui/NavLink";
import SearchBox from "../ui/SearchBox";

const Home: NextPage = () => {
	return (
		<>
		<Head>
			<title>Favicons</title>
		</Head>
		<div className="p-4 max-w-3xl m-auto">
		<header className="py-6 flex gap-2">
			<NavLink href="#">F</NavLink>
			<NavLink href="https://www.npmjs.com/package/@andresmarpz/favicons">npm</NavLink>
			<NavLink href="#docs">docs</NavLink>
		</header>
		<main className="">
			<h1 className="text-3xl text-black font-semibold mb-1">Favicons</h1>
			<p>
				It&apos;s unreasonably hard to find a favicon for a website. This is a simple library to fetch and parse
				every favicon from a URL. Ideally you would install{' '}
				<code className="rounded border px-1 py-[2px] bg-gray-100">@andresmarpz/favicons</code> and use it in your 
				project, but if you just want to try it out, you can use this page.
			</p>
			<div className="mt-8">
				<h2 className="text-xl text-black font-semibold mb-1">Search icons</h2>
				<SearchBox/>
			</div>
		</main>
		</div>
		</>
	);
};

export default Home;

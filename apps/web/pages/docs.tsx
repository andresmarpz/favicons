import { NextPage } from "next";
import Head from "next/head";

const Docs: NextPage = () => {
	return (
		<>
			<Head>
				<title>Docs — Favicons</title>
			</Head>
			<main>
				<h1 className="text-3xl text-black font-semibold mb-1">Docs</h1>
				<p>
					<code className="rounded border px-1 py-[2px] bg-gray-100">@andresmarpz/favicons</code> is a library
					to fetch and parse every favicon from a URL. It&apos;s unreasonably hard to find a favicon for a
					website, so this library aims to solve that problem.
				</p>
				<h2 className="text-xl text-black font-semibold mb-1 mt-8">Installation</h2>
				<p>
					Install the library with <code className="rounded border px-1 py-[2px] bg-gray-100">npm</code> or{" "}
					<code className="rounded border px-1 py-[2px] bg-gray-100">yarn</code>.
				</p>
				<pre className="rounded border px-4 py-2 bg-gray-100 mt-2">
					<code className="text-black">npm install @andresmarpz/favicons</code>
				</pre>
				<pre className="rounded border px-4 py-2 bg-gray-100 mt-2">
					<code className="text-black">yarn add @andresmarpz/favicons</code>
				</pre>
				<h2 className="text-xl text-black font-semibold mb-1 mt-8">Usage</h2>
				<p>
					Import the library and use it to fetch favicons from a URL. The library returns an array of objects
					with the following properties:
				</p>
				<ul className="list-disc list-inside">
					<li>
						<code className="rounded border px-1 py-[2px] bg-gray-100">url</code>: the URL of the favicon
					</li>
					<li>
						<code className="rounded border px-1 py-[2px] bg-gray-100">type</code>: the MIME type of the
						favicon
					</li>
					<li>
						<code className="rounded border px-1 py-[2px] bg-gray-100">size</code>: the size of the favicon
						in bytes
					</li>
				</ul>
				<pre className="rounded border px-4 py-2 bg-gray-100 mt-2">
					<code className="text-black">
						{`import favicons from "@andresmarpz/favicons";
						`}
					</code>
				</pre>
			</main>
		</>
	);
};

export default Docs;

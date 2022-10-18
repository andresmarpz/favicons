import { Favicon } from "@andresmarpz/favicons";
import type { NextPage } from "next";
import { FormEvent, useState } from "react";

const Home: NextPage = () => {
	const [loading, setLoading] = useState(false);
	const [url, setUrl] = useState("");
	const [icons, setIcons] = useState<Favicon[]>();

	const handleSearch = async (event: FormEvent) => {
		event.preventDefault();

		const { favicons } = await fetch("/api/icons?url=" + url).then((res) => res.json());
		setIcons(favicons);
	};

	return (
		<main className="p-4">
			<h1 className="text-2xl text-black font-semibold mb-1">Favicons</h1>
			<p>
				Use <code className="rounded border px-1 py-[2px] bg-gray-100">@andresmarpz/favicons</code> to fetch
				favicons from websites.
			</p>
			<div className="mt-4">
				<p>Insert url</p>
				<form onSubmit={handleSearch}>
					<input
						className="rounded border p-1"
						type="text"
						value={url}
						onChange={(e) => setUrl(e.target.value)}
					/>
					<button className="rounded border p-1" type="submit">
						Search
					</button>
				</form>
			</div>
			<div className="mt-4">
				Icons:
				{icons && icons.map((icon, index) => <div key={Math.random()}>{icon.url}</div>)}
			</div>
		</main>
	);
};

export default Home;

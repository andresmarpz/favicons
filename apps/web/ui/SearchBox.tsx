import { Favicon } from "@andresmarpz/favicons";
import Image from "next/image";
import { FormEvent, useState } from "react";
import Spinner from "./svgs/Spinner";

const MagnifyingGlass = () => {
	return (
		<svg width="15" height="15" viewBox="0 0 15 15" fill="none" xmlns="http://www.w3.org/2000/svg">
			<path
				d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
				fill="currentColor"
				fillRule="evenodd"
				clipRule="evenodd"></path>
		</svg>
	);
};

const SearchBox = () => {
	const [focus, setFocus] = useState<boolean>(false);
	const [url, setUrl] = useState("");
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(false);
	const [icons, setIcons] = useState<Favicon[]>([]);

	const handleSearch = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		setError(false);

		if (!url.length) return;

		setLoading(true);
		const res = await fetch(`/api/icons?${new URLSearchParams({ url })}`);
		if (!res.ok) setError(true);
		else {
			const data = await res.json();
			setIcons(data.favicons);
			setUrl("");
			setFocus(false);
		}
		setLoading(false);
	};

	return (
		<div>
			<form
				className={
					(focus ? "border-shadow " : "") +
					(loading ? "bg-gray-100 " : "bg-white ") +
					"relative flex items-center py-3 px-4 border rounded "
				}
				onSubmit={handleSearch}>
				<MagnifyingGlass />
				<input
					className="text-base px-2 border-none ml-1 focus:outline-none disabled:bg-gray-100 w-full"
					placeholder="Search.."
					disabled={loading}
					type="text"
					value={url}
					onChange={(e) => setUrl(e.target.value)}
					onFocus={() => setFocus(true)}
					onBlur={() => setFocus(false)}
				/>
				{
					// search button
					<button className="rounded border px-2 py-1">Search</button>
				}
				{loading && (
					<div className="flex items-center justify-center absolute inset-0 w-full h-full">
						<Spinner />
					</div>
				)}
			</form>
			<div className="flex flex-col gap-2 mt-2">
				{icons.map((icon, idx) => (
					<div className="rounded border p-2 flex flex-wrap items-center gap-3" key={"icon-" + idx}>
						{
							// disabling this because we can't use next/image since
							// 1. we dont want to optimize images
							// 2. we can't because we don't know the origin hostname
							// eslint-disable-next-line @next/next/no-img-element
							<img
								className="max-w-[120px] h-auto aspect-square"
								src={icon.url}
								alt={"Favicon from url " + icon.url}
							/>
						}
						<span className="flex flex-col gap-1">
							<span className="text-sm text-gray-500 breakword">{icon.url}</span>
							<span className="text-sm text-gray-500">{icon.size / 1000}kb</span>
						</span>
					</div>
				))}
				{error && <div className="rounded border border-red-300 bg-red-200 p-2">There was an error fetching the url.</div>}
			</div>
		</div>
	);
};

export default SearchBox;

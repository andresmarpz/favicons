import { fetch } from "./util";
import type { Favicon } from "./types";
import { isRelativeURL, processURL } from "./util";

const paths = ["/favicon.ico", "/favicon.png", "/favicon.svg", "/apple-touch-icon.png"];

async function getFaviconFrom(url: string) {
	const response = await fetch(url);

	// ensure there is a valid resource at the target url
	// and that it's an image
	const contentType = response.headers.get("content-type") ?? "";
	const isImage = contentType.startsWith("image/") || contentType.startsWith("application/ico");
	if (!response.ok || !contentType || !isImage) return undefined;

	const size = (await response.buffer()).byteLength;
	const extension = url.split(".").pop() as Favicon["extension"];

	return { url, size, extension } as Favicon;
}

export async function requestFavicons(url: string, hrefs: string[]) {
	const filteredPaths = paths.map((path) => url + path).filter((path) => !hrefs.includes(path));
	const favicons = await Promise.all([
		...hrefs.map((href) => getFaviconFrom(processURL(isRelativeURL(href) ? url + href : href, false))),
		...filteredPaths.map(getFaviconFrom),
	]);
	return favicons.filter((x): x is Favicon => x !== undefined);
}

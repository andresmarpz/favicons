import { fetchWithTimeout } from "./util";
import type { Favicon } from "./types";
import { isRelativeURL, processURL } from "./util";

const paths = [
	"/favicon.ico",
	"/favicon.png",
	"/favicon.gif",
	"/favicon.jpg",
	"/favicon.jpeg",
	"/favicon.svg",
	"/apple-touch-icon.png",
];

/**
 * Get the Favicon object from the given URL
 *
 * @example
 * ```ts
 * import { getFaviconFrom } from "favicons";
 *
 * const favicon = await getFaviconFrom("https://nextjs.com/favicon.ico");
 * ```
 *
 * @param url @description The URL to get the favicon object from
 * @returns Promise<Favicon>
 */
export async function getFaviconFrom(url: string) {
	const response = await fetchWithTimeout(url);
	if (!response || !response.ok) return undefined;

	// ensure there is a valid resource at the target url
	// and that it's an image
	const contentType = response.headers.get("content-type") ?? "";
	const isImage = contentType.startsWith("image/") || contentType.startsWith("application/ico");
	if (!response.ok || !contentType || !isImage) return undefined;

	const size = (await response.blob()).size;
	const extension = url.split(".").pop() as Favicon["extension"];

	return { url, size, extension } as Favicon;
}

/**
 * Get favicon objects from the given hrefs
 *
 * @example
 * ```ts
 * import { requestFavicons } from "favicons";
 *
 * const favicons = await requestFavicons(["https://nextjs.com/favicon.ico", "https://nextjs.com/favicon.png"]);
 * ```
 *
 * @param hrefs @description The list of hrefs to get the favicon objects from
 * @param url @description The URL to use as a base for relative paths
 * @returns Promise<Favicon[]>
 */
export async function getFaviconsFrom(hrefs: string[], url?: string) {
	const filteredPaths = paths.map((path) => url + path).filter((path) => !hrefs.includes(path));
	const favicons = await Promise.all([
		...hrefs
			.filter((href) => (isRelativeURL(href) && !url ? false : true))
			.map((href) => getFaviconFrom(processURL(isRelativeURL(href) ? url + href : href, false))),
		...filteredPaths.map(getFaviconFrom),
	]);
	return favicons.filter((x): x is Favicon => x !== undefined);
}

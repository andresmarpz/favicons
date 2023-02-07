import * as cheerio from "cheerio";
import { fetchWithTimeout } from "./util";
import { processURL, isRelativeURL } from "./util";

import { getFaviconsFrom } from "./fetcher";

import type { Favicon } from "./types";

const rels = ["shortcut icon", "icon shortcut", "icon", "apple-touch-icon", "apple-touch-icon-precomposed"];

interface Options {
	timeout?: number;
}

/**
 * Extract all favicons from the given URL
 *
 * @example
 * ```ts
 * import { getFavicons } from "favicons";
 *
 * const favicons = await getFavicons("nextjs.com");
 * ```
 *
 * @param url
 * @param options
 * @returns Favicon[]
 */
export async function getFavicons(
	url: string,
	options: Options = {
		timeout: 5000,
	}
): Promise<Favicon[]> {
	return new Promise(async (resolve, reject) => {
		url = processURL(url);

		if (isRelativeURL(url)) throw new Error("Only absolute urls are valid.");

		try {
			const result = await withRequest(url, options.timeout);
			if (result.length) resolve(result);
			else throw new Error("No favicons found for the given url.");
		} catch (error) {
			reject(error);
		}
	});
}

/**
 * Get the best favicon from the given URL
 *
 * @example
 * ```ts
 * import { getFavicon } from "favicons";
 *
 * const favicon = await getFavicon("nextjs.com");
 * ```
 *
 * @param url
 * @param options
 * @returns Favicon
 */
export async function getFavicon(url: string, options: Options): Promise<Favicon> {
	const favicons = await getFavicons(url, options);
	return favicons.sort((a, b) => b.size - a.size)[0];
}

/**
 * Get the favicon urls from the given HTML (or head element)
 *
 * @example
 * ```ts
 * import { extractFavicons } from "favicons";
 *
 * const request = await fetch("https://nextjs.com");
 * const html = await request.text();
 * const favicons = extractFavicons(html);
 * ```
 *
 * @param html - html string of a website or head element specifically (faster)
 * @returns string[] - array of favicon urls
 */
export function extractFavicons(html: string) {
	const $ = cheerio.load(html);
	const hrefs = rels
		.map((rel) => {
			return $(`link[rel="${rel}"]`)
				.map((_, el) => $(el).attr("href"))
				.get();
		})
		.flat();

	return hrefs;
}

async function withRequest(url: string, timeout: number = 5000) {
	const response = await fetchWithTimeout(url, timeout);
	if (!response || !response.ok) throw new Error(`Failed to fetch ${url}`);
	const html = await response.text();

	const hrefs = extractFavicons(html);

	return getFaviconsFrom(hrefs, url);
}

export type { Favicon } from "./types";

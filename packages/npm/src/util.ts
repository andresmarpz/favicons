import fetch, { Response } from "node-fetch";

export function processURL(url: string, removeParams: boolean = true): string {
	if (isRelativeURL(url)) return url;
	if (url.startsWith("//")) url = "https:" + url;
	if (!url.startsWith("http")) url = "https://" + url;
	const parsed = new URL(url);
	return removeParams ? parsed.origin : parsed.toString();
}

export function isRelativeURL(url: string): boolean {
	return url.startsWith("/") && !url.startsWith("//") && !url.startsWith("http");
}

/**
 * 	Use AbortController to timeout fetch requests
 */
export function fetchWithTimeout(url: string, ms: number = 5000) {
	return new Promise<Response | undefined>((resolve, reject) => {
		const controller = new AbortController();
		const signal = controller.signal;
		const timeout = setTimeout(() => {
			controller.abort();
			reject(new Error(`Request timed out: ${url}`));
		}, ms);

		fetch(url, {
			signal,
			headers: {
				"User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:98.0) Gecko/20100101 Firefox/98.0",
				Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,*/*;q=0.8",
				"Accept-Language": "en-US,en;q=0.5",
				"Accept-Encoding": "gzip, deflate",
				Connection: "keep-alive",
				"Upgrade-Insecure-Requests": "1",
				"Sec-Fetch-Dest": "document",
				"Sec-Fetch-Mode": "navigate",
				"Sec-Fetch-Site": "none",
				"Sec-Fetch-User": "?1",
				"Cache-Control": "max-age=0",
			},
		})
			.then((response: Response) => resolve(response))
			.catch((error) => reject(error))
			.finally(() => clearTimeout(timeout));
	});
}

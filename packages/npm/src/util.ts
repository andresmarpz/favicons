import nodeFetch from 'node-fetch'
import type { AbortSignal } from 'node-fetch/externals';
import type { Response } from 'node-fetch';

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
export function fetch(url: string, ms: number = 5000) {
	return new Promise<Response | undefined>((resolve, reject) => {
		const controller = new AbortController();
		const signal = controller.signal as AbortSignal;

		const timeout = setTimeout(() => {
			controller.abort();
			reject(new Error(`Request timed out: ${url}`));
		}, ms);

		nodeFetch(url, { signal })
			.then((response) => {
				timeout.unref();
				resolve(response);
			})
			.catch((error) => {
				timeout.unref();
				reject(error);
			});
	})
}
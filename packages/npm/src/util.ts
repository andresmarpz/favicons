import nodeFetch from 'node-fetch'
import type { Response } from 'node-fetch'

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
 *  since node-fetch doesn't time out connections, there is a chance that the request will hang forever
 *  https://github.com/github/fetch/issues/175#issuecomment-125779262 solves the issue
 *  with https://stackoverflow.com/questions/46946380/fetch-api-request-timeout as well
 *  wrapping the fetch into a promise that times out after x seconds
 */
function timeout(ms: number, promise: Promise<Response>){
	return new Promise<Response>((resolve, reject) => {
		const timeoutId = setTimeout(() => {
			reject(new Error("Request timed out"));
		}, ms);
		promise.then(
			res => {
				clearTimeout(timeoutId);
				resolve(res);
			},
			err => {
				clearTimeout(timeoutId);
				reject(err);
			}
		);
	});
}

/**
 * @param url URL to fetch as string
 * @param ms Timeout in miliseconds
 */
export function fetch(url: string, ms: number = 10000) {
	return timeout(ms, nodeFetch(url));
}	
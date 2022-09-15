import puppeteer from "puppeteer";
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import { processURL, isRelativeURL } from "./util";

import { scanPath } from "./fetcher";

import type { Favicon } from './types';

const rels = ["shortcut icon", "icon shortcut", "icon", "apple-touch-icon", "apple-touch-icon-precomposed"];
const paths = ["/favicon.ico", "/favicon.png", "/favicon.svg", "/apple-touch-icon.png"];

function timeout(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

async function getFaviconWithHttp(url: string): Promise<Favicon[]> {
	const start = Date.now();
	const html = await fetch(url).then((res) => res.text());
	console.log("fetch", Date.now() - start);

	const $ = cheerio.load(html);
	const scanRel = async(rel: string) => {
		const links = $(`link[rel="${rel}"]`);
		const hrefs = links.map((i, link) => $(link).attr("href")).get();
		const icons = await Promise.all(hrefs.map(async(href) => {
			if(!href) return undefined;
			if(paths.includes(href)) return undefined;
			href = processURL(href, false);
			if(isRelativeURL(href)) href = url + href;

			const res = await fetch(href);
			if(!res.ok || !res.headers.get("content-type")) return undefined;
			return {
				url: href,
				size: parseInt(res.headers.get("content-length") || '0'),
				extension: href.split(".").pop() as Favicon["extension"],
			};
		}));

		return icons;
	}

	const favicons = await Promise.all([
		...rels.map(scanRel),
		...paths.map(path => scanPath(url, path))
	])

	console.log(`Took ${Date.now() - start}ms`)
	return [...new Set(favicons.flat().filter((x): x is Favicon => x !== undefined))]
}

async function getFaviconWithBrowser(url: string): Promise<Favicon[]> {
	// ensure there is a valid url
	url = processURL(url);
	const start = Date.now();

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { timeout: 10000 });

	const scanRel = async(rel: string) => {
		const hrefs = await page.$$eval(`link[rel="${rel}"]`, (links) => links.map((link) => link.getAttribute("href")));
		const icons = await Promise.all(hrefs.map(async(href) => {
			if(!href) return undefined;
			href = processURL(href, false);
			if(isRelativeURL(href)) href = url + href;

			if (!paths.includes(href)){
				const resource = await fetch(href);
				if(!resource.ok || !resource.headers.get("content-type")) return undefined;

				const size = (await resource.buffer()).byteLength;
				const extension = href.split(".").pop() as Favicon['extension'];

				return {
					url: href,
					size,
					extension
				} as Favicon;
			}
			else return undefined;
		}));

		return icons.flat();
	};
	
	const res = await Promise.all([
		...rels.map(scanRel), 
		...paths.map(path => scanPath(url, path))
	]);

	browser.close();

	// flatten the array, remove undefined values
	console.log(`Took ${Date.now() - start}ms`)
	return res.flat().filter((x): x is Favicon => x !== undefined);
}

export { processURL, isRelativeURL, getFaviconWithBrowser };
export default getFaviconWithHttp;

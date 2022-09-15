import puppeteer from "puppeteer";
import fetch from 'node-fetch';
import { processURL, isRelativeURL } from "./util";

const rels = ["shortcut icon", "icon shortcut", "icon", "apple-touch-icon", "apple-touch-icon-precomposed"];
const paths = ["/favicon.ico", "/favicon.png", "/favicon.svg", "/apple-touch-icon.png"];

function timeout(ms: number) {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export interface Favicon {
	url: string;
	size: number;
	extension: "jpg" | "ico" | "svg" | "png";
}

async function getFavicon(url: string): Promise<Favicon[]> {
	// ensure there is a valid url
	url = processURL(url);

	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { timeout: 10000 });

	const start = Date.now();
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
	
	const scanPath = async(path: string) => {
		const resource = await fetch(url + path);
		const contentType = resource.headers.get("content-type");
		if(!resource.ok || !contentType || !(contentType.startsWith("image/") || contentType.startsWith("application/ico"))) return undefined;
		
		const size = (await resource.buffer()).byteLength;
		const extension = path.split(".").pop() as Favicon["extension"];
		
		return {
			url: url + path,
			size,
			extension,
		} as Favicon;
	}
	
	const res = await Promise.all([...rels.map(scanRel), ...paths.map(scanPath)]);

	browser.close();

	// flatten the array, remove undefined values
	return res.flat().filter((x): x is Favicon => x !== undefined);
}

export { processURL, isRelativeURL };
export default getFavicon;

import puppeteer from "puppeteer";
import processURL from "./util";

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

async function getFavicon(url: string): Promise<any[]> {
	url = processURL(url);
	const browser = await puppeteer.launch();
	const page = await browser.newPage();
	await page.goto(url, { waitUntil: "networkidle2", timeout: 10000 });

	const icons: Favicon[] = [];

	const tags = page
		.evaluate(
			(rels, paths) => {
				const urls: Favicon[] = [];
				rels.forEach((rel: string) =>
					Array.from(document.querySelectorAll(`link[rel="${rel}"]`)).forEach((el) => {
						if (!el.getAttribute("href") || paths.includes(el.getAttribute("href")!)) return;

						const imageExtension = el.getAttribute("href")?.split(".").pop() as Favicon["extension"];
						const imageSize = parseInt(el.getAttribute("sizes")?.split("x")[0] || "0");

						urls.push({
							url: el.getAttribute("href")!,
							size: imageSize,
							extension: imageExtension,
						});
					})
				);
				return urls;
			},
			rels,
			paths
		)
		.then((res) => icons.push(...res));

	const links = paths.map((link) =>
		browser.newPage().then(async (page) => {
			const load = await page.goto(url + link, { waitUntil: "networkidle2", timeout: 10000 });
			if (load?.status() === 200) {
				const imageExtension = link.split(".").pop() as Favicon["extension"];

				icons.push({
					url: url + link,
					size: 0,
					extension: imageExtension,
				});
			}
		})
	);

	await Promise.all([tags, ...links]);

	browser.close();

	return icons;
}

export { processURL };
export default getFavicon;

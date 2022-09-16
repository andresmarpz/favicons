import puppeteer from "puppeteer";
import * as cheerio from 'cheerio';
import fetch from 'node-fetch';
import { processURL, isRelativeURL } from "./util";

import { requestFavicons } from "./fetcher";

import type { Favicon } from './types';

const rels = ["shortcut icon", "icon shortcut", "icon", "apple-touch-icon", "apple-touch-icon-precomposed"];

interface Options{
	method?: 'request' | 'browser',
}

export async function getFavicons(url: string, options: Options = {
	method: 'request'
}): Promise<Favicon[]>{
	// ensure there is a valid url
	url = processURL(url);

	if(isRelativeURL(url)) throw new Error("Only absolute urls are valid.");

	return options.method === 'request' ? 
		await withRequest(url) :
		await withBrowser(url);
}

export async function getFavicon(url: string, {
	method = 'request',
}: Options): Promise<Favicon>{
	const favicons = await getFavicons(url, { method });
	return favicons.sort((a, b) => b.size - a.size)[0];
}

async function withRequest(url: string) {
	const html = await fetch(url).then((res) => res.text());

	const $ = cheerio.load(html);
	const hrefs = rels.map(rel => {
		return $(`link[rel="${rel}"]`).map((_, el) => $(el).attr("href")).get();
	}).flat();

	return requestFavicons(url, hrefs);
}

async function withBrowser(url: string): Promise<Favicon[]> {
	const browser = await puppeteer.launch({
		args: ['--no-sandbox', '--disable-setuid-sandbox'],
	});
	const page = await browser.newPage();
	await page.goto(url, { timeout: 10000 });

	const hrefs = await Promise.all(rels.map(rel => {
		return page.$$eval(`link[rel="${rel}"]`, els => els.map(el => el.getAttribute("href")));
	})).then(x => x.flat().filter((x): x is string => x !== null));
	
	browser.close();

	return requestFavicons(url, hrefs);
}

import { getFavicons } from "../src";

describe("test getFavicon(url: string)", () => {
	it('should return favicons from github.com', async() => {
		const favicons = await getFavicons('github.com');
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	})

	it('should return favicons from https://github.com', async() => {
		const favicons = await getFavicons('https://github.com');
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	})

	it('should return favicons from vercel.com/', async() => {
		const favicons = await getFavicons('vercel.com/');
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	})

	it('should return favicons from http://radix-ui.com', async() => {
		const favicons = await getFavicons('http://radix-ui.com');
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	})

	it('should return favicons from twitter.com/andresmarpz', async() => {
		const favicons = await getFavicons('twitter.com/andresmarpz');
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	})

	it('should return favicons from turborepo.org with browser', async() => {
		const favicons = await getFavicons('turborepo.org', { method: 'browser' });
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	})

	it('should return favicons from http://stitches.dev/?test=1 with browser', async() => {
		const favicons = await getFavicons('http://stitches.dev/?test=1', {
			method: 'browser'
		});
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	})
});
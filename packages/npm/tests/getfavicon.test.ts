import { getFavicons } from "../src";

describe("test getFavicon(url: string)", () => {
	it("should return favicons from github.com", async () => {
		const favicons = await getFavicons("github.com");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	});

	it("should return favicons from https://github.com", async () => {
		const favicons = await getFavicons("https://github.com");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	});

	it("should return favicons from vercel.com/", async () => {
		const favicons = await getFavicons("vercel.com/");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	});

	it("should return favicons from http://radix-ui.com", async () => {
		const favicons = await getFavicons("http://radix-ui.com");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	});

	it("should return favicons from twitter.com/andresmarpz", async () => {
		const favicons = await getFavicons("twitter.com/andresmarpz");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	});

	it("should time out if the domain/dns is not resolved", async () => {
		expect(getFavicons("https://hopethissitedoesntexistplease.com")).rejects.toThrow();
	});

	it("should time out if the website does not respond for too long", async () => {
		expect(getFavicons("https://http://example.com:81/")).rejects.toThrow("Request timed out");
	}, 15000);

	it("should time out with custom timeout", async () => {
		expect(getFavicons("https://http://example.com:81/", { timeout: 1000 })).rejects.toThrow("Request timed out");
	});
});

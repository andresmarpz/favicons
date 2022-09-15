import getFavicon from "../src";

describe("test getFavicon(url: string)", () => {
	it("should return favicon url for google.com", async () => {
		const favicons = await getFavicon("google.com");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	});

	it("should return favicon url for google.com with trailing slash", async () => {
		const favicons = await getFavicon("google.com/");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	});

	it("should return favicon url for google.com with subdomain", async () => {
		const favicons = await getFavicon("www.google.com");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	});

	it("should return favicon url for google.com with subdomain and trailing slash", async () => {
		const favicons = await getFavicon("www.google.com/");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	});

	it("should return favicon url for google.com with subdomain and extra trailing slash", async () => {
		const favicons = await getFavicon("www.google.com///");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	});

	it("should return favicon url for google.com with subdomain parameters", async () => {
		const favicons = await getFavicon("www.google.com/?test=1");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	});

	it("should return favicon url for twitter.com", async () => {
		const favicons = await getFavicon("twitter.com");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	})

	it("should return favicon url for http://twitter.com", async () => {
		const favicons = await getFavicon("http://twitter.com");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	})

	it("should return favicon url for https://twitter.com", async () => {
		const favicons = await getFavicon("https://twitter.com");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	})

	it("should return favicon url for https://twitter.com/", async () => {
		const favicons = await getFavicon("https://twitter.com/");
		expect(favicons.length).toBeGreaterThanOrEqual(1);
	})

	it('should return favicon url for radix-ui.com', async () => {
		const favicons = await getFavicon('radix-ui.com')
		expect(favicons.length).toBeGreaterThanOrEqual(1)
	})

	it('should return favicon url for github.com', async () => {
		const favicons = await getFavicon('github.com')
		expect(favicons.length).toBeGreaterThanOrEqual(1)
	})
});
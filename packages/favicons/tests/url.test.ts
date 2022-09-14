import { processURL } from '../src';

describe("test processURL(url: string)", () => {
	it("should maintain correct url", () => {
		expect(processURL('https://google.com')).toBe("https://google.com");
	});

	it("should add protocol", () => {
		expect(processURL('google.com')).toBe("https://google.com");
	})

	it("should remove trailing slash", () => {
		expect(processURL('https://google.com/')).toBe("https://google.com");
	})

	it("should remove trailing slash and add protocol", () => {
		expect(processURL('google.com/')).toBe("https://google.com");
	});

	it("should remove extra parameters", () => {
		expect(processURL('https://google.com/?test=1')).toBe("https://google.com");
	})
});

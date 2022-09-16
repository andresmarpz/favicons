import { processURL } from "../src/util";

describe("test processURL(url: string)", () => {
	it("should maintain correct url", () => {
		expect(processURL("https://google.com")).toBe("https://google.com");
	});

	it("should add protocol", () => {
		expect(processURL("google.com")).toBe("https://google.com");
	});

	it('should add protocol 2', () => {
		expect(processURL('turborepo.org')).toBe('https://turborepo.org');
	})

	it("should remove trailing slash and add protocol", () => {
		expect(processURL("google.com/")).toBe("https://google.com");
	});

	it("should add protocol and remove parameters", () => {
		expect(processURL("google.com/?test=1")).toBe("https://google.com");
	});

	it("should add protocol to url with subdomain", () => {
		expect(processURL("www.google.com")).toBe("https://www.google.com");
	});

	it("should add protocol to url with subdomain 2", () => {
		expect(processURL("test.google.com")).toBe("https://test.google.com");
	});

	it("should remove trailing slash and add protocol to url with subdomain", () => {
		expect(processURL("www.google.com/")).toBe("https://www.google.com");
	});

	it('should add protocol to url and keep parameters', () => {
		expect(processURL("google.com/?test=1", false)).toBe("https://google.com/?test=1");
	})

	it('should add protocol to url with // and keep parameters', () => {
		expect(processURL("//google.com/?test=1", false)).toBe("https://google.com/?test=1");
	})

	it("should remove trailing slash", () => {
		expect(processURL("https://google.com/")).toBe("https://google.com");
	});

	it("should remove extra trailing slashes", () => {
		expect(processURL("https://google.com///")).toBe("https://google.com");
	});

	it("should remove extra parameters", () => {
		expect(processURL("https://google.com/?test=1")).toBe("https://google.com");
	});

	it('should add protocol to url starting with //', () => {
		expect(processURL("//google.com")).toBe("https://google.com");
	})

	it('should leave relative url as-is', () => {
		expect(processURL("/test")).toBe("/test");
	})

	it('should leave relative url with extension as-is', () => {
		expect(processURL("/test.png")).toBe("/test.png");
	})
});

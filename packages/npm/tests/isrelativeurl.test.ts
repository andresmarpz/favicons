import { isRelativeURL } from "../src/util";

describe('test isRelativeURL(url: string)', () => {
	it('should return true for relative url', () => {
		expect(isRelativeURL('/test')).toBe(true);
	});

	it('should return true for relative url with parameters', () => {
		expect(isRelativeURL('/test?test=1')).toBe(true);
	})

	it('should return true for relative url with extension', () => {
		expect(isRelativeURL('/test.png')).toBe(true);
	})

	it('should return false for relative url with // resource', () => {
		expect(isRelativeURL('//test.png')).toBe(false);
	})

	it('should return false for relative url with // url', () => {
		expect(isRelativeURL('//test.com/test.png')).toBe(false);
	})

	it('should return false for url without protocol', () => {
		expect(isRelativeURL('google.com')).toBe(false);
	})

	it('should return false for url without protocol and subdomain', () => {
		expect(isRelativeURL('www.google.com')).toBe(false);
	})

	it('should return false for absolute url', () => {
		expect(isRelativeURL('https://google.com')).toBe(false);
	});

	it('should return false for absolute url with subdomain', () => {
		expect(isRelativeURL('https://www.google.com')).toBe(false);
	});

	it('should return false for absolute url with subdomain 2', () => {
		expect(isRelativeURL('https://test.google.com')).toBe(false);
	});
})
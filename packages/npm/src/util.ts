export default function processURL(url: string): string {
	const parsed = new URL(!url.startsWith("http") ? "https://" + url : url);
	return parsed.origin;
}
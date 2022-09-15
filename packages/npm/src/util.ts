export function processURL(url: string, removeParams: boolean = true): string {
	if(isRelativeURL(url)) return url;
	if(url.startsWith('//')) url = 'https:' + url;
	if(!url.startsWith('http')) url = 'https://' + url;
	const parsed = new URL(url);
	return removeParams ? parsed.origin : parsed.toString();
}

export function isRelativeURL(url: string): boolean {
	return url.startsWith("/") && !url.startsWith('//') && !url.startsWith("http");
}
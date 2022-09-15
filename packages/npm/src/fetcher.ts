import fetch from 'node-fetch';
import type { Favicon } from "./types";

export async function scanPath(url: string, path: string){
	const resource = await fetch(url + path);
	const contentType = resource.headers.get("content-type");
	if(!resource.ok || !contentType || !(contentType.startsWith("image/") || contentType.startsWith("application/ico"))) return undefined;
	
	const size = (await resource.buffer()).byteLength;
	const extension = path.split(".").pop() as Favicon["extension"];
	
	return {
		url: url + path,
		size,
		extension,
	} as Favicon;
}
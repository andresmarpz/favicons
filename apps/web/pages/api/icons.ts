// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Favicon, getFavicons } from "@andresmarpz/favicons";

type Data = Favicon[] | undefined;

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { url } = req.query;
	if (!url) {
		res.status(400).send(undefined)
		return;
	}

	try{
		const favicons = await getFavicons(url.toString());
		res.status(200).send(favicons);
	}catch(e){
		res.status(500).send(undefined)
	}
}

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Favicon, getFavicons } from "@andresmarpz/favicons";

type Data = {
	favicons: Favicon[] | undefined;
};

export default async function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	const { url } = req.query;
	if (!url) {
		res.status(400).json({ favicons: undefined });
		return;
	}

	const favicons = await getFavicons(url.toString());

	res.status(200).send({ favicons });
}

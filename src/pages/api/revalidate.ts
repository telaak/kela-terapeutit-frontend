import type { NextApiRequest, NextApiResponse } from "next";

/**
 * Used to revalidate statically generated pages: the main table for now
 * See {@link https://nextjs.org/docs/pages/building-your-application/data-fetching/incremental-static-regeneration}
 * @param req incoming request
 * @param res response object
 * @returns
 */

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  if (req.query.secret !== global.process.env.REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }
  try {
    await res.revalidate("/");
    return res.json({ revalidated: true });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}

import { authOptions } from "@/appa/api/autha/[...nextauth]/authOptions";
import { prisma } from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { getServerSession } from "next-auth";
import pDebounce from "p-debounce";

const debouncedRevalidate = pDebounce(
  (res: NextApiResponse<any>) => res.revalidate("/"),
  1000 * 10
);

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    const session = await getServerSession(req, res, authOptions);
    switch (req.method) {
      case "GET": {
        return res.json(session);
      }
      case "POST": {
        const isActive: boolean = req.body.isActive;
        if (session && session.user) {
          const email = session.user.email;
          const therapist = await prisma.therapist.updateMany({
            where: {
              email,
            },
            data: {
              isActive: isActive,
            },
          });
          debouncedRevalidate(res);
          return res.json(therapist);
        }
        return res.json({ session });
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

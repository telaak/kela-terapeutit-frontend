import { TherapistWithTherapies, prisma } from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";
import { debouncedRevalidate } from "@/cloudflare";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    switch (req.method) {
      case "POST": {
        if (req.query.secret !== process.env.POST_SECRET) {
          return res.status(401).json({ message: "Invalid token" });
        }
        const therapist: TherapistWithTherapies = req.body;
        const upsert = await prisma.therapist.upsert({
          where: {
            name: therapist.name,
          },
          update: {
            ...therapist,
            therapies: {
              // Deletes the linked therapies first so there are no duplicates
              deleteMany: {},
              create: therapist.therapies,
            },
          },
          create: {
            ...therapist,
            therapies: {
              create: therapist.therapies,
            },
          },
        });
        debouncedRevalidate(res);
        res.status(200).send(upsert);
      }
    }
  } catch (error) {
    console.error(error)
    res.status(500).send(error);
  }
}

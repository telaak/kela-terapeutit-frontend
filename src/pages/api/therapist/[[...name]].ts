import { prisma } from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

const selectClause = {
  name: true,
  locations: true,
  phoneNumbers: true,
  languages: true,
  orientations: true,
  therapies: {
    select: {
      lajit: true,
      muoto: true,
    },
  },
  email: true,
  homepage: true,
  lastActive: true,
  isActive: true,
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    switch (req.method) {
      case "GET": {
        if (req.query.name) {
          const therapist = await prisma.therapist.findUnique({
            where: {
              name: req.query.name as string,
            },
            select: selectClause,
          });
          return res.json(therapist);
        } else {
          const therapists = await prisma.therapist.findMany({
            select: selectClause,
            orderBy: {
              name: "asc",
            },
          });
          return res.json(therapists);
        }
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

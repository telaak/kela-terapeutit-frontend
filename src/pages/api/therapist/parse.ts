import { prisma } from "@/prisma";
import type { NextApiRequest, NextApiResponse } from "next";

export type ParsedEmail = {
  from: string;
  subject: string;
  text: string;
  html: string;
  secret: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  try {
    switch (req.method) {
      case "POST": {
        const email: ParsedEmail = req.body;
        if (email.secret !== process.env.EMAIL_SECRET)
          return res.status(401).send({ message: "Invalid token" });
        const trimmedText = email.text.trim();
        const trimmedSubject = email.subject.trim();
        const update = await prisma.therapist.updateMany({
          where: {
            email: trimmedText,
          },
          data: {
            lastActive: new Date(),
            isActive: trimmedSubject === "enable" ? true : false,
          },
        });
        res.revalidate("/");
        res.status(200).send(update);
      }
    }
  } catch (error) {
    res.status(500).send(error);
  }
}

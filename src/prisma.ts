import { PrismaClient, Prisma } from "@prisma/client";

export const prisma = new PrismaClient();

export type TherapistWithTherapies = Prisma.TherapistGetPayload<{
  include: { therapies: true };
}>;

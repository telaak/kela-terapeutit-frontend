import { getServerSession } from "next-auth";
import { authOptions } from "../api/autha/[...nextauth]/authOptions";
import { prisma } from "@/prisma";


export async function getTherapist() {
  const session = await getServerSession(authOptions);
  if (!session) return null;
  const therapist = await prisma.therapist.findFirst({
    where: {
      email: session?.user?.email,
    },
  });
  return therapist;
}

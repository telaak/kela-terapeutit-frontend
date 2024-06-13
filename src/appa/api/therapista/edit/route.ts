import { prisma } from "@/prisma";
import { getServerSession } from "next-auth";
import { authOptions } from "../../autha/[...nextauth]/authOptions";

export async function GET() {
  const session = await getServerSession(authOptions);
  if (session && session.user) {
    const email = session.user.email;
    const therapist = await prisma.therapist.findFirst({
      where: {
        email,
      },
    });
    return Response.json(therapist);
  }
  return Response.json({ session });
}

export async function POST(req: Request) {
  const session = await getServerSession(authOptions);
  const body: { isActive: boolean } = await req.json();
  if (session && session.user) {
    const email = session.user.email;
    const therapist = await prisma.therapist.updateMany({
      where: {
        email,
      },
      data: {
        isActive: body.isActive,
      },
    });
    return Response.json(therapist);
  }
  return Response.json({ session });
}

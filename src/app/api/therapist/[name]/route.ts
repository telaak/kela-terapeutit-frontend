import { prisma } from "@/prisma";

export async function GET(
  request: Request,
  { params }: { params: { name: string } }
) {
  try {
    const therapist = await prisma.therapist.findUnique({
      where: {
        name: params.name,
      },
      include: {
        therapies: true,
      },
    });
    return Response.json(therapist);
  } catch (error) {
    return Response.json(params.name);
  }
}

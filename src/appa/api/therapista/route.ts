import { prisma } from "@/prisma";

export const revalidate = 0

export async function GET() {
  try {
    const therapists = await prisma.therapist.findMany({
      select: {
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
      },
      orderBy: {
        name: "asc",
      },
    });
    return Response.json(therapists);
  } catch (error) {
    return Response.json(
      { error },
      {
        status: 500,
      }
    );
  }
}

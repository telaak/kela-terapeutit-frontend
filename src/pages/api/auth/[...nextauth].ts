import Email from "next-auth/providers/email";
import { PrismaAdapter } from "@auth/prisma-adapter";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "@/prisma";
import NextAuth from "next-auth";


export const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),

  providers: [
    Email({
      server: {
        host: process.env.SMTP_HOST,
        port: Number(process.env.SMTP_PORT),
        auth: {
          user: process.env.SMTP_USER,
          pass: process.env.SMTP_PASSWORD,
        },
      },
      from: process.env.EMAIL_FROM,
    }),
  ],
  callbacks: {
    async signIn(params) {
      if (params.user.email === "teemulaaks@gmail.com") return true;
      const therapist = await prisma.therapist.findMany({
        where: {
          email: params.user.email,
        },
      });
      return therapist.length ? true : false;
    },
  },
};

export default NextAuth(authOptions)
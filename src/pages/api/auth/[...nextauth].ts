import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { prisma } from "@/lib/prisma";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async signIn({ user }) {
      const email = user.email;
      if (!email) {
        // No email, don't allow sign in
        return false;
      }

      // Update lastLogin in User model
      await prisma.user.update({
        where: { email },
        data: { lastLogin: new Date() },
      });

      // Upsert today's Engagement record
      const today = new Date();
      today.setHours(0, 0, 0, 0);

      await prisma.engagement.upsert({
        where: {
          userId_date: {
            userId: email, // use email as userId
            date: today,
          },
        },
        update: {
          login: true, // or checkin: true if you prefer
        },
        create: {
          userId: email,
          date: today,
          login: true,
          checkin: true,
          mood: false,
          reminder: false,
          journal: false,
        },
      });

      return true;
    },
  },
});

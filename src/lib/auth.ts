import GoogleProvider from "next-auth/providers/google";
import type { AuthOptions } from "next-auth";

export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: (process.env.GOOGLE_CLIENT_ID || "").trim(),
      clientSecret: (process.env.GOOGLE_CLIENT_SECRET || "").trim(),
    }),
  ],
  secret: (process.env.NEXTAUTH_SECRET || "").trim(),
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
};

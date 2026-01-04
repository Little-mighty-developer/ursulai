import NextAuth from "next-auth";
import { prisma } from "@/lib/prisma";
import { authOptions } from "@/lib/auth";
import type { NextApiRequest, NextApiResponse } from "next";

// Sanitize URL to remove invalid characters for HTTP headers
// Only removes characters that are invalid in HTTP Location headers
const sanitizeUrl = (url: string): string => {
  if (!url) return "";
  // Remove control characters that are invalid in HTTP headers
  // But preserve the URL structure
  return (
    url
      .trim()
      .replace(/[\r\n\t\0]/g, "") // Remove line breaks, tabs, null bytes
      // eslint-disable-next-line no-control-regex
      .replace(/[\x00-\x1F\x7F]/g, "")
  ); // Remove other control characters
};

// Sanitize and validate NEXTAUTH_URL with fallback to Netlify environment variables
const getNextAuthUrl = (): string => {
  const url =
    process.env.NEXTAUTH_URL ||
    process.env.DEPLOY_PRIME_URL ||
    process.env.URL ||
    (process.env.NODE_ENV === "development" ? "http://localhost:3000" : "");

  if (!url) {
    throw new Error("NEXTAUTH_URL, DEPLOY_PRIME_URL, or URL must be set");
  }
  return sanitizeUrl(url);
};

// Set NEXTAUTH_URL dynamically if not set (for preview deployments)
// NextAuth reads from process.env.NEXTAUTH_URL, so we need to set it
if (!process.env.NEXTAUTH_URL) {
  const computedUrl = getNextAuthUrl();
  process.env.NEXTAUTH_URL = computedUrl;
}

const handler = NextAuth({
  ...authOptions,
  callbacks: {
    async signIn({ user }) {
      try {
        const email = user.email;
        if (!email) {
          // No email, don't allow sign in
          console.error("[NextAuth SignIn] No email provided");
          return false;
        }

        if (process.env.NODE_ENV === "development") {
          console.log("[NextAuth SignIn] Processing sign in for:", email);
        }

        // Update lastLogin in User model
        // Wrap in try-catch so database errors don't prevent authentication
        try {
          await prisma.user.upsert({
            where: { email },
            update: { lastLogin: new Date() },
            create: {
              email,
              firstName: user.name || null,
              lastLogin: new Date(),
            },
          });
          if (process.env.NODE_ENV === "development") {
            console.log("[NextAuth SignIn] User record updated successfully");
          }
        } catch (dbError) {
          console.error(
            "[NextAuth SignIn] Database error updating user:",
            dbError,
          );
          // Continue with sign-in even if database update fails
          // The user is authenticated, database issues shouldn't block them
        }

        // Upsert today's Engagement record
        // Wrap in try-catch so database errors don't prevent authentication
        try {
          const today = new Date();
          today.setHours(0, 0, 0, 0);

          await prisma.engagement.upsert({
            where: {
              userId_date: {
                userId: email,
                date: today,
              },
            },
            update: {
              login: true,
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
          if (process.env.NODE_ENV === "development") {
            console.log(
              "[NextAuth SignIn] Engagement record updated successfully",
            );
          }
        } catch (dbError) {
          console.error(
            "[NextAuth SignIn] Database error updating engagement:",
            dbError,
          );
          // Continue with sign-in even if database update fails
          // The user is authenticated, database issues shouldn't block them
        }

        if (process.env.NODE_ENV === "development") {
          console.log("[NextAuth SignIn] Sign in successful for:", email);
        }
        return true;
      } catch (error) {
        console.error(
          "[NextAuth SignIn] Unexpected error during sign in:",
          error,
        );
        // Return false to prevent sign in on unexpected errors
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      // Log for debugging
      if (process.env.NODE_ENV === "development") {
        console.log("[NextAuth Redirect] url:", url);
        console.log("[NextAuth Redirect] baseUrl:", baseUrl);
      }

      // Get base URL - ensure it's clean
      const defaultBaseUrl = getNextAuthUrl();
      const cleanBaseUrl = baseUrl ? sanitizeUrl(baseUrl) : defaultBaseUrl;

      // If url is relative, make it absolute
      if (url && url.startsWith("/")) {
        const redirectUrl = `${cleanBaseUrl}${url}`;
        // Validate and return
        try {
          const urlObj = new URL(redirectUrl);
          const finalUrl = urlObj.toString();
          // Remove any control characters that might have slipped through
          const cleaned = finalUrl.replace(/[\r\n\t\0]/g, "");
          if (process.env.NODE_ENV === "development") {
            console.log("[NextAuth Redirect] Returning:", cleaned);
          }
          return cleaned;
        } catch (e) {
          console.error("[NextAuth Redirect] Error creating URL:", e);
          return cleanBaseUrl;
        }
      }

      // If url is absolute and on same origin
      if (url && url.startsWith("http")) {
        try {
          const urlObj = new URL(url);
          const baseUrlObj = new URL(cleanBaseUrl);
          if (urlObj.origin === baseUrlObj.origin) {
            const cleaned = urlObj.toString().replace(/[\r\n\t\0]/g, "");
            if (process.env.NODE_ENV === "development") {
              console.log("[NextAuth Redirect] Returning absolute:", cleaned);
            }
            return cleaned;
          }
        } catch (e) {
          console.error("[NextAuth Redirect] Error with absolute URL:", e);
        }
      }

      // Default: return baseUrl
      const cleaned = cleanBaseUrl.replace(/[\r\n\t\0]/g, "");
      if (process.env.NODE_ENV === "development") {
        console.log("[NextAuth Redirect] Defaulting to:", cleaned);
      }
      return cleaned;
    },
  },
  pages: {
    signIn: "/login",
    error: "/login",
  },
  debug: process.env.NODE_ENV === "development",
});

// Wrap the handler to sanitize Location headers
export default async function authHandler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  // Patch res.setHeader to sanitize Location headers
  const originalSetHeader = res.setHeader.bind(res);
  res.setHeader = function (name: string, value: string | string[]) {
    if (name.toLowerCase() === "location" && typeof value === "string") {
      const sanitized = sanitizeUrl(value);
      if (process.env.NODE_ENV === "development") {
        console.log(
          "[Header Sanitize] Original Location:",
          JSON.stringify(value),
        );
        console.log("[Header Sanitize] Sanitized Location:", sanitized);
      }
      return originalSetHeader(name, sanitized);
    }
    return originalSetHeader(name, value);
  };

  return handler(req, res);
}

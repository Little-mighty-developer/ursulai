import { PrismaClient } from "../generated/prisma";

const globalForPrisma = global as unknown as { prisma?: PrismaClient };

// Optimize Prisma Client for serverless environments
// Force new instance if gratitudeEntry is missing (for hot reload during development)
const existingPrisma = globalForPrisma.prisma;
const hasGratitudeEntryModel = (client: PrismaClient) =>
  "gratitudeEntry" in (client as unknown as Record<string, unknown>);

if (existingPrisma && !hasGratitudeEntryModel(existingPrisma)) {
  // Clear the cached instance if it's missing the new model
  delete globalForPrisma.prisma;
  existingPrisma.$disconnect().catch(() => {});
}

export const prisma =
  globalForPrisma.prisma ||
  new PrismaClient({
    log: process.env.NODE_ENV === "development" ? ["query"] : [],
    // Connection pool settings for serverless
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  });

// Reuse Prisma Client instance in serverless to avoid connection exhaustion
if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

// Handle graceful shutdown in serverless environments
if (typeof process !== "undefined" && process.on) {
  process.on("beforeExit", async () => {
    await prisma.$disconnect();
  });

  process.on("SIGINT", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });

  process.on("SIGTERM", async () => {
    await prisma.$disconnect();
    process.exit(0);
  });
}

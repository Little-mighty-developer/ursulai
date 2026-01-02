import { PrismaClient } from "../generated/prisma";

const globalForPrisma = global as unknown as { prisma: PrismaClient };

// Optimize Prisma Client for serverless environments
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

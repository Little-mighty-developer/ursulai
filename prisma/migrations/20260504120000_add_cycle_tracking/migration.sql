-- AlterTable
ALTER TABLE "UserPreference" ADD COLUMN     "cycleTrackingEnabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN     "typicalCycleLength" INTEGER NOT NULL DEFAULT 28;

-- CreateTable
CREATE TABLE "CyclePeriodStart" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "startDate" DATE NOT NULL,
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CyclePeriodStart_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "CyclePeriodStart_userId_startDate_idx" ON "CyclePeriodStart"("userId", "startDate" DESC);

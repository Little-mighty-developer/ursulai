-- CreateTable
CREATE TABLE "BodyActivity" (
    "id" TEXT NOT NULL,
    "key" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "emoji" TEXT,
    "tags" TEXT[],
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BodyActivity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "BodyActivityLog" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "activityKey" TEXT NOT NULL,
    "activityLabel" TEXT NOT NULL,
    "activityEmoji" TEXT,
    "symptomKeys" TEXT[],
    "skipped" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "BodyActivityLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "BodyActivity_key_key" ON "BodyActivity"("key");

-- CreateIndex
CREATE INDEX "BodyActivityLog_userId_createdAt_idx" ON "BodyActivityLog"("userId", "createdAt" DESC);

-- CreateIndex
CREATE INDEX "BodyActivityLog_userId_activityKey_createdAt_idx" ON "BodyActivityLog"("userId", "activityKey", "createdAt" DESC);

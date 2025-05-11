-- CreateTable
CREATE TABLE "Engagement" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "checkin" BOOLEAN NOT NULL DEFAULT false,
    "mood" BOOLEAN NOT NULL DEFAULT false,
    "reminder" BOOLEAN NOT NULL DEFAULT false,
    "journal" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "Engagement_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Engagement_userId_date_key" ON "Engagement"("userId", "date");

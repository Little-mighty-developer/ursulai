-- CreateTable
CREATE TABLE "MoodEntry" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "energy" INTEGER NOT NULL,
    "calmness" INTEGER NOT NULL,
    "connection" INTEGER NOT NULL,
    "anticipation" INTEGER NOT NULL,
    "socialBattery" INTEGER NOT NULL,
    "joy" INTEGER NOT NULL,
    "sadness" INTEGER NOT NULL,
    "desire" INTEGER NOT NULL,

    CONSTRAINT "MoodEntry_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "MoodEntry_userId_date_key" ON "MoodEntry"("userId", "date");

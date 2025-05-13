/*
  Warnings:

  - The primary key for the `MoodEntry` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `anticipation` on the `MoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `calmness` on the `MoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `connection` on the `MoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `desire` on the `MoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `energy` on the `MoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `joy` on the `MoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `sadness` on the `MoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `socialBattery` on the `MoodEntry` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `MoodEntry` table. All the data in the column will be lost.
  - The `id` column on the `MoodEntry` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - Added the required column `moodType` to the `MoodEntry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `value` to the `MoodEntry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MoodEntry" DROP CONSTRAINT "MoodEntry_pkey",
DROP COLUMN "anticipation",
DROP COLUMN "calmness",
DROP COLUMN "connection",
DROP COLUMN "desire",
DROP COLUMN "energy",
DROP COLUMN "joy",
DROP COLUMN "sadness",
DROP COLUMN "socialBattery",
DROP COLUMN "updatedAt",
ADD COLUMN     "moodType" TEXT NOT NULL,
ADD COLUMN     "value" INTEGER NOT NULL,
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "MoodEntry_pkey" PRIMARY KEY ("id");

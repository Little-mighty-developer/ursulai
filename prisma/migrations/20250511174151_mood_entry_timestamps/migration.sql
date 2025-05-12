/*
  Warnings:

  - You are about to drop the column `date` on the `MoodEntry` table. All the data in the column will be lost.
  - Added the required column `updatedAt` to the `MoodEntry` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "MoodEntry_userId_date_key";

-- AlterTable
ALTER TABLE "MoodEntry" DROP COLUMN "date",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

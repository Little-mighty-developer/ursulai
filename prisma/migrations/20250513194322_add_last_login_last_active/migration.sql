-- AlterTable
ALTER TABLE "User" ADD COLUMN     "firstName" TEXT,
ADD COLUMN     "lastActive" TIMESTAMP(3),
ADD COLUMN     "lastLogin" TIMESTAMP(3);

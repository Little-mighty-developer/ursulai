-- CreateTable
CREATE TABLE "SymptomEvent" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "symptomKey" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "SymptomEvent_pkey" PRIMARY KEY ("id")
);

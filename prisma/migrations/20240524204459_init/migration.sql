/*
  Warnings:

  - You are about to drop the `Hours` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Hours";

-- CreateTable
CREATE TABLE "Hour" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "value" TEXT NOT NULL,
    "time" TEXT NOT NULL,

    CONSTRAINT "Hour_pkey" PRIMARY KEY ("id")
);

/*
  Warnings:

  - You are about to drop the `creditCard` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "creditCard" DROP CONSTRAINT "creditCard_ownerId_fkey";

-- AlterTable
ALTER TABLE "Branch" ADD COLUMN     "email" TEXT,
ADD COLUMN     "schedule" TEXT;

-- DropTable
DROP TABLE "creditCard";

-- CreateTable
CREATE TABLE "CreditCard" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "number" TEXT NOT NULL,
    "expiration" TEXT NOT NULL,
    "cvv" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "ownerId" TEXT NOT NULL,

    CONSTRAINT "CreditCard_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "CreditCard" ADD CONSTRAINT "CreditCard_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

/*
  Warnings:

  - You are about to drop the `EyeCodition` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "EyeCodition" DROP CONSTRAINT "EyeCodition_customerId_fkey";

-- DropTable
DROP TABLE "EyeCodition";

-- CreateTable
CREATE TABLE "EyeCondition" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "customerId" TEXT NOT NULL,

    CONSTRAINT "EyeCondition_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "EyeCondition" ADD CONSTRAINT "EyeCondition_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

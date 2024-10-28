/*
  Warnings:

  - You are about to drop the column `branch` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `service` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Branch` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `Hour` table. All the data in the column will be lost.
  - Added the required column `branchId` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `serviceId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Branch_value_key";

-- DropIndex
DROP INDEX "Hour_value_key";

-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "branch",
DROP COLUMN "service",
ADD COLUMN     "branchId" TEXT NOT NULL,
ADD COLUMN     "serviceId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Branch" DROP COLUMN "value";

-- AlterTable
ALTER TABLE "Hour" DROP COLUMN "value";

-- CreateTable
CREATE TABLE "Service" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,

    CONSTRAINT "Service_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_branchId_fkey" FOREIGN KEY ("branchId") REFERENCES "Branch"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_serviceId_fkey" FOREIGN KEY ("serviceId") REFERENCES "Service"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

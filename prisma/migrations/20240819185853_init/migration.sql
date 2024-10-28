/*
  Warnings:

  - You are about to drop the column `extensiones` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "extensiones",
ADD COLUMN     "extensions" TEXT[];

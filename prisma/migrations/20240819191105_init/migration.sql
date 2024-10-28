/*
  Warnings:

  - You are about to drop the column `cejas` on the `Appointment` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "cejas",
ADD COLUMN     "eyebrows" TEXT[];

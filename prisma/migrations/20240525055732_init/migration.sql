/*
  Warnings:

  - You are about to drop the column `hours` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `hourId` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "hours",
ADD COLUMN     "hourId" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Appointment" ADD CONSTRAINT "Appointment_hourId_fkey" FOREIGN KEY ("hourId") REFERENCES "Hour"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

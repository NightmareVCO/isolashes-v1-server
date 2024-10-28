/*
  Warnings:

  - You are about to drop the column `password_hash` on the `Appointment` table. All the data in the column will be lost.
  - You are about to drop the column `role` on the `Appointment` table. All the data in the column will be lost.
  - Added the required column `branch` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hours` to the `Appointment` table without a default value. This is not possible if the table is not empty.
  - Added the required column `service` to the `Appointment` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Appointment" DROP COLUMN "password_hash",
DROP COLUMN "role",
ADD COLUMN     "branch" TEXT NOT NULL,
ADD COLUMN     "hours" TEXT NOT NULL,
ADD COLUMN     "service" TEXT NOT NULL;

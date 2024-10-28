/*
  Warnings:

  - Made the column `schedule` on table `Branch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cover` on table `Branch` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Branch" ALTER COLUMN "schedule" SET NOT NULL,
ALTER COLUMN "cover" SET NOT NULL;

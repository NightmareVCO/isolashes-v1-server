/*
  Warnings:

  - Made the column `address` on table `Branch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `phone` on table `Branch` required. This step will fail if there are existing NULL values in that column.
  - Made the column `email` on table `Branch` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Branch" ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "phone" SET NOT NULL,
ALTER COLUMN "email" SET NOT NULL;

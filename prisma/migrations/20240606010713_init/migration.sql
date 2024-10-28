/*
  Warnings:

  - You are about to drop the column `code` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `ProductCategory` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[name]` on the table `Product` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ProductCategory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Service` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `ServiceCategory` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Product_code_key";

-- DropIndex
DROP INDEX "ProductCategory_code_key";

-- AlterTable
ALTER TABLE "Product" DROP COLUMN "code";

-- AlterTable
ALTER TABLE "ProductCategory" DROP COLUMN "code";

-- CreateIndex
CREATE UNIQUE INDEX "Product_name_key" ON "Product"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ProductCategory_name_key" ON "ProductCategory"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Service_name_key" ON "Service"("name");

-- CreateIndex
CREATE UNIQUE INDEX "ServiceCategory_name_key" ON "ServiceCategory"("name");

/*
  Warnings:

  - A unique constraint covering the columns `[receiptId]` on the table `Order` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Receipt_branchId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Order_receiptId_key" ON "Order"("receiptId");

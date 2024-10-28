/*
  Warnings:

  - A unique constraint covering the columns `[value]` on the table `Hour` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[time]` on the table `Hour` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Hour_value_key" ON "Hour"("value");

-- CreateIndex
CREATE UNIQUE INDEX "Hour_time_key" ON "Hour"("time");

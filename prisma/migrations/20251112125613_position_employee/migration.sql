/*
  Warnings:

  - A unique constraint covering the columns `[name]` on the table `City` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[name]` on the table `Position` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Position" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "City_name_key" ON "City"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Position_name_key" ON "Position"("name");

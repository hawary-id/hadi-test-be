/*
  Warnings:

  - You are about to drop the column `createdBy` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[employeeId]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" DROP COLUMN "createdBy",
ALTER COLUMN "updatedAt" DROP NOT NULL,
ALTER COLUMN "updatedBy" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "User_employeeId_key" ON "User"("employeeId");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_employeeId_fkey" FOREIGN KEY ("employeeId") REFERENCES "Employee"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

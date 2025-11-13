/*
  Warnings:

  - You are about to drop the column `positionId` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[code]` on the table `Group` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `code` to the `Group` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "User" DROP CONSTRAINT "User_positionId_fkey";

-- AlterTable
ALTER TABLE "City" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Company" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Country" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Employee" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Group" ADD COLUMN     "code" TEXT NOT NULL,
ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "Province" ALTER COLUMN "deletedAt" DROP NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "positionId",
ALTER COLUMN "deletedAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Group_code_key" ON "Group"("code");

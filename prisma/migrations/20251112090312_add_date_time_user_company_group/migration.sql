/*
  Warnings:

  - Added the required column `updatedAt` to the `CompanyUser` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `UserGroup` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "CompanyUser" ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(6),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "UserGroup" ADD COLUMN     "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "deletedAt" TIMESTAMP(6),
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

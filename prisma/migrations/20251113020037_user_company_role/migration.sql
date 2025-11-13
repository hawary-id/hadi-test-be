/*
  Warnings:

  - You are about to drop the column `positionId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Employee` table. All the data in the column will be lost.
  - You are about to drop the column `postCode` on the `User` table. All the data in the column will be lost.
  - You are about to drop the `CompanyUser` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Group` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserGroup` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[code]` on the table `Employee` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `createdBy` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `City` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Company` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `code` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Employee` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Position` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `Province` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `Province` table without a default value. This is not possible if the table is not empty.
  - Added the required column `createdBy` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `employeeId` to the `User` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedBy` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CompanyUser" DROP CONSTRAINT "CompanyUser_companyId_fkey";

-- DropForeignKey
ALTER TABLE "CompanyUser" DROP CONSTRAINT "CompanyUser_userId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_positionId_fkey";

-- DropForeignKey
ALTER TABLE "Employee" DROP CONSTRAINT "Employee_userId_fkey";

-- DropForeignKey
ALTER TABLE "UserGroup" DROP CONSTRAINT "UserGroup_groupId_fkey";

-- DropForeignKey
ALTER TABLE "UserGroup" DROP CONSTRAINT "UserGroup_userId_fkey";

-- DropIndex
DROP INDEX "Employee_positionId_key";

-- DropIndex
DROP INDEX "Employee_userId_key";

-- DropIndex
DROP INDEX "User_name_idx";

-- AlterTable
ALTER TABLE "City" ADD COLUMN     "createdBy" UUID NOT NULL,
ADD COLUMN     "deletedBy" UUID,
ADD COLUMN     "updatedBy" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Company" ADD COLUMN     "createdBy" UUID NOT NULL,
ADD COLUMN     "deletedBy" UUID,
ADD COLUMN     "updatedBy" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Country" ADD COLUMN     "createdBy" UUID NOT NULL,
ADD COLUMN     "deletedBy" UUID,
ADD COLUMN     "updatedBy" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "positionId",
DROP COLUMN "userId",
ADD COLUMN     "code" TEXT NOT NULL,
ADD COLUMN     "createdBy" UUID NOT NULL,
ADD COLUMN     "deletedBy" UUID,
ADD COLUMN     "updatedBy" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Position" ADD COLUMN     "createdBy" UUID NOT NULL,
ADD COLUMN     "deletedBy" UUID,
ADD COLUMN     "updatedBy" UUID NOT NULL;

-- AlterTable
ALTER TABLE "Province" ADD COLUMN     "createdBy" UUID NOT NULL,
ADD COLUMN     "deletedBy" UUID,
ADD COLUMN     "updatedBy" UUID NOT NULL;

-- AlterTable
ALTER TABLE "User" DROP COLUMN "postCode",
ADD COLUMN     "createdBy" UUID NOT NULL,
ADD COLUMN     "deletedBy" UUID,
ADD COLUMN     "employeeId" UUID NOT NULL,
ADD COLUMN     "updatedBy" UUID NOT NULL;

-- DropTable
DROP TABLE "CompanyUser";

-- DropTable
DROP TABLE "Group";

-- DropTable
DROP TABLE "UserGroup";

-- CreateTable
CREATE TABLE "Role" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(6),
    "createdBy" UUID NOT NULL,
    "updatedBy" UUID NOT NULL,
    "deletedBy" UUID,

    CONSTRAINT "Role_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "UserCompanyRole" (
    "userId" UUID NOT NULL,
    "companyId" UUID NOT NULL,
    "positionId" UUID NOT NULL,
    "roleId" UUID,
    "createdAt" TIMESTAMP(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "deletedAt" TIMESTAMP(6),
    "createdBy" UUID NOT NULL,
    "updatedBy" UUID NOT NULL,
    "deletedBy" UUID,

    CONSTRAINT "UserCompanyRole_pkey" PRIMARY KEY ("userId","companyId","positionId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Role_name_key" ON "Role"("name");

-- CreateIndex
CREATE UNIQUE INDEX "Employee_code_key" ON "Employee"("code");

-- AddForeignKey
ALTER TABLE "UserCompanyRole" ADD CONSTRAINT "UserCompanyRole_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompanyRole" ADD CONSTRAINT "UserCompanyRole_companyId_fkey" FOREIGN KEY ("companyId") REFERENCES "Company"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompanyRole" ADD CONSTRAINT "UserCompanyRole_positionId_fkey" FOREIGN KEY ("positionId") REFERENCES "Position"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserCompanyRole" ADD CONSTRAINT "UserCompanyRole_roleId_fkey" FOREIGN KEY ("roleId") REFERENCES "Role"("id") ON DELETE SET NULL ON UPDATE CASCADE;

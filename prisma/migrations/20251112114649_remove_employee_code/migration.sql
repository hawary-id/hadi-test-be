/*
  Warnings:

  - You are about to drop the column `code` on the `Employee` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Employee_code_key";

-- AlterTable
ALTER TABLE "Employee" DROP COLUMN "code";

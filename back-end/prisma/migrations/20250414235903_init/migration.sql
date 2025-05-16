/*
  Warnings:

  - You are about to drop the column `currencu` on the `tipnrain` table. All the data in the column will be lost.
  - Added the required column `currency` to the `tipnrain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tipnrain" DROP COLUMN "currencu",
ADD COLUMN     "currency" TEXT NOT NULL;

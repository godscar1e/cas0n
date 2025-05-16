/*
  Warnings:

  - You are about to drop the column `username` on the `double_spins` table. All the data in the column will be lost.
  - Added the required column `betValue` to the `double_spins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "double_spins" DROP COLUMN "username",
ADD COLUMN     "betValue" TEXT NOT NULL;

/*
  Warnings:

  - Added the required column `gameId` to the `double_spins` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "double_spins" ADD COLUMN     "gameId" TEXT NOT NULL;

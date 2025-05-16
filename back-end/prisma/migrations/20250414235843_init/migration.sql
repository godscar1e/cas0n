/*
  Warnings:

  - Added the required column `currencu` to the `tipnrain` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tipnrain" ADD COLUMN     "currencu" TEXT NOT NULL;

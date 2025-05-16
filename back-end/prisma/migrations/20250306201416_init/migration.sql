/*
  Warnings:

  - Added the required column `currency` to the `user` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "user" ADD COLUMN     "currency" TEXT NOT NULL;

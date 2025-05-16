/*
  Warnings:

  - You are about to drop the column `transactionsId` on the `withdrawals` table. All the data in the column will be lost.
  - Added the required column `transactionId` to the `withdrawals` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "withdrawals" DROP COLUMN "transactionsId",
ADD COLUMN     "transactionId" TEXT NOT NULL;

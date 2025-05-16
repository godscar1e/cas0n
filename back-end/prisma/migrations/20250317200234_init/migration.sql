-- AlterTable
ALTER TABLE "user" ALTER COLUMN "currency" SET DEFAULT 'USD';

-- CreateTable
CREATE TABLE "basic_user_info" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "country" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "dateOfBirth" TEXT NOT NULL,

    CONSTRAINT "basic_user_info_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "basic_user_info_userId_key" ON "basic_user_info"("userId");

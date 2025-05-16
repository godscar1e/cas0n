-- AlterTable
ALTER TABLE "user" ALTER COLUMN "isActive" DROP NOT NULL;

-- CreateTable
CREATE TABLE "notifications" (
    "id" TEXT NOT NULL,
    "type" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "userId" TEXT,
    "metadata" TEXT,

    CONSTRAINT "notifications_pkey" PRIMARY KEY ("id")
);

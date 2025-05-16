-- CreateTable
CREATE TABLE "roulette_spins" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "betAmount" INTEGER NOT NULL,
    "isWin" BOOLEAN NOT NULL,
    "amountOfWin" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "roulette_spins_pkey" PRIMARY KEY ("id")
);

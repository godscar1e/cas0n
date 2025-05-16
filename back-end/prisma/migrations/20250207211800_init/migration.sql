-- CreateTable
CREATE TABLE "roulette_spin_numbers" (
    "id" TEXT NOT NULL,
    "number" INTEGER NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "roulette_spin_numbers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "double_bets" (
    "id" TEXT NOT NULL,
    "gameId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "betAmount" DECIMAL(65,30) NOT NULL,
    "betValue" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "double_bets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "double_bets" ADD CONSTRAINT "double_bets_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

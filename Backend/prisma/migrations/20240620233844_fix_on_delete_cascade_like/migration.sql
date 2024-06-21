-- DropForeignKey
ALTER TABLE "Like" DROP CONSTRAINT "Like_cardId_fkey";

-- AddForeignKey
ALTER TABLE "Like" ADD CONSTRAINT "Like_cardId_fkey" FOREIGN KEY ("cardId") REFERENCES "Card"("id") ON DELETE CASCADE ON UPDATE CASCADE;

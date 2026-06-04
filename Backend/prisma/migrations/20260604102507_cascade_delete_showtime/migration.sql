-- DropForeignKey
ALTER TABLE "showtimes" DROP CONSTRAINT "showtimes_roomId_fkey";

-- AddForeignKey
ALTER TABLE "showtimes" ADD CONSTRAINT "showtimes_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "cinema_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

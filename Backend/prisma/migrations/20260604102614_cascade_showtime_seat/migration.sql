-- DropForeignKey
ALTER TABLE "showtime_seats" DROP CONSTRAINT "showtime_seats_seatId_fkey";

-- AddForeignKey
ALTER TABLE "showtime_seats" ADD CONSTRAINT "showtime_seats_seatId_fkey" FOREIGN KEY ("seatId") REFERENCES "seats"("id") ON DELETE CASCADE ON UPDATE CASCADE;

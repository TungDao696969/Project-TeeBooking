-- DropForeignKey
ALTER TABLE "seats" DROP CONSTRAINT "seats_roomId_fkey";

-- AddForeignKey
ALTER TABLE "seats" ADD CONSTRAINT "seats_roomId_fkey" FOREIGN KEY ("roomId") REFERENCES "cinema_rooms"("id") ON DELETE CASCADE ON UPDATE CASCADE;

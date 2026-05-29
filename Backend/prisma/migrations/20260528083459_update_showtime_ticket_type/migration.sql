-- CreateTable
CREATE TABLE "showtime_ticket_types" (
    "id" TEXT NOT NULL,
    "showtimeId" TEXT NOT NULL,
    "ticketTypeId" TEXT NOT NULL,
    "price" DECIMAL(10,2) NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "showtime_ticket_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "showtime_ticket_types" ADD CONSTRAINT "showtime_ticket_types_showtimeId_fkey" FOREIGN KEY ("showtimeId") REFERENCES "showtimes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "showtime_ticket_types" ADD CONSTRAINT "showtime_ticket_types_ticketTypeId_fkey" FOREIGN KEY ("ticketTypeId") REFERENCES "ticketTypes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

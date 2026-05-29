-- CreateTable
CREATE TABLE "ticketTypes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "description" TEXT,
    "type" TEXT NOT NULL,
    "price" DECIMAL(65,30) NOT NULL,
    "cinemaId" TEXT,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ticketTypes_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ticketTypes_code_key" ON "ticketTypes"("code");

-- AddForeignKey
ALTER TABLE "ticketTypes" ADD CONSTRAINT "ticketTypes_cinemaId_fkey" FOREIGN KEY ("cinemaId") REFERENCES "cinemas"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- CreateEnum
CREATE TYPE "TrailerType" AS ENUM ('teaser', 'official', 'final', 'clip', 'behind_the_scenes');

-- CreateTable
CREATE TABLE "trailers" (
    "id" TEXT NOT NULL,
    "movieId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "videoUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT,
    "type" "TrailerType" NOT NULL,
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "trailers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "trailers_movieId_idx" ON "trailers"("movieId");

-- AddForeignKey
ALTER TABLE "trailers" ADD CONSTRAINT "trailers_movieId_fkey" FOREIGN KEY ("movieId") REFERENCES "movies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

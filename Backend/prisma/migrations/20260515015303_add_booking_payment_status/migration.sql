-- CreateEnum
CREATE TYPE "BookingPaymentStatus" AS ENUM ('pending', 'paid', 'failed', 'refunded');

-- AlterTable
ALTER TABLE "bookings" ADD COLUMN     "paymentStatus" "BookingPaymentStatus" NOT NULL DEFAULT 'pending';

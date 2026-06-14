import { prisma } from './src/utils/prisma';
async function check() {
  const b = await prisma.booking.findUnique({where: {bookingCode: 'BK74416381'}});
  console.log("BOOKING:", b);
  const p = await prisma.payment.findMany({where: {bookingId: b?.id}});
  console.log("PAYMENTS:", p);
}
check().then(() => prisma.$disconnect());

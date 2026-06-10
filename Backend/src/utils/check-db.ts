import { prisma } from "./prisma";

async function main() {
  console.log("Checking users in database...");
  const users = await prisma.user.findMany({
    select: {
      id: true,
      email: true,
      fullName: true,
      role: true,
      passwordHash: true,
      isVerified: true,
      isActive: true,
    }
  });
  console.log(JSON.stringify(users, null, 2));
}

main()
  .catch(err => console.error(err))
  .finally(() => prisma.$disconnect());

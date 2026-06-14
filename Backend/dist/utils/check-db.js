"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const prisma_1 = require("./prisma");
async function main() {
    console.log("Checking users in database...");
    const users = await prisma_1.prisma.user.findMany({
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
    .finally(() => prisma_1.prisma.$disconnect());
//# sourceMappingURL=check-db.js.map
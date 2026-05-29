"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTicketTypeService = exports.updateTicketTypeService = exports.getTicketTypeByIdService = exports.getAllTicketTypesService = exports.createTicketTypeService = void 0;
const prisma_1 = require("../utils/prisma");
const redis_1 = require("../utils/redis");
const CACHE_KEY = "ticket-types:all";
const CACHE_TTL = 60 * 5;
async function clearTicketTypeCaches() {
    await redis_1.redis.del(CACHE_KEY);
    const showtimeKeys = await redis_1.redis.keys("showtime:*:ticket-types");
    if (showtimeKeys.length > 0) {
        await redis_1.redis.del(...showtimeKeys);
    }
}
const createTicketTypeService = async (body) => {
    const existing = await prisma_1.prisma.ticketType.findUnique({
        where: {
            code: body.code,
        },
    });
    if (existing) {
        throw new Error("Ticket type code already exists");
    }
    const ticketType = await prisma_1.prisma.ticketType.create({
        data: {
            name: body.name,
            code: body.code,
            description: body.description,
            type: body.type,
            price: body.price,
            isActive: body.isActive ?? true,
        },
    });
    await clearTicketTypeCaches();
    return ticketType;
};
exports.createTicketTypeService = createTicketTypeService;
const getAllTicketTypesService = async () => {
    const cachedData = await redis_1.redis.get(CACHE_KEY);
    if (cachedData) {
        return JSON.parse(cachedData);
    }
    const ticketTypes = await prisma_1.prisma.ticketType.findMany({
        orderBy: {
            createdAt: "desc",
        },
    });
    await redis_1.redis.set(CACHE_KEY, JSON.stringify(ticketTypes), "EX", CACHE_TTL);
    return ticketTypes;
};
exports.getAllTicketTypesService = getAllTicketTypesService;
const getTicketTypeByIdService = async (id) => {
    return prisma_1.prisma.ticketType.findUnique({
        where: {
            id,
        },
    });
};
exports.getTicketTypeByIdService = getTicketTypeByIdService;
const updateTicketTypeService = async (id, body) => {
    const existing = await prisma_1.prisma.ticketType.findUnique({
        where: {
            id,
        },
    });
    if (!existing) {
        throw new Error("Ticket type not found");
    }
    if (body.code) {
        const duplicated = await prisma_1.prisma.ticketType.findFirst({
            where: {
                code: body.code,
                NOT: {
                    id,
                },
            },
        });
        if (duplicated) {
            throw new Error("Ticket type code already exists");
        }
    }
    const updated = await prisma_1.prisma.ticketType.update({
        where: {
            id,
        },
        data: body,
    });
    await clearTicketTypeCaches();
    return updated;
};
exports.updateTicketTypeService = updateTicketTypeService;
const deleteTicketTypeService = async (id) => {
    const existing = await prisma_1.prisma.ticketType.findUnique({
        where: {
            id,
        },
    });
    if (!existing) {
        throw new Error("Ticket type not found");
    }
    await prisma_1.prisma.ticketType.delete({
        where: {
            id,
        },
    });
    await clearTicketTypeCaches();
    return true;
};
exports.deleteTicketTypeService = deleteTicketTypeService;
//# sourceMappingURL=ticket-type.service.js.map
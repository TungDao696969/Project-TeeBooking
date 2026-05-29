import { prisma } from "../utils/prisma";
import { redis } from "../utils/redis";

const CACHE_KEY = "ticket-types:all";

const CACHE_TTL = 60 * 5;

async function clearTicketTypeCaches() {
  await redis.del(CACHE_KEY);

  const showtimeKeys = await redis.keys("showtime:*:ticket-types");
  if (showtimeKeys.length > 0) {
    await redis.del(...showtimeKeys);
  }
}

export const createTicketTypeService = async (body: {
  name: string;
  code: string;
  description?: string;
  type: string;
  price: number;
  isActive?: boolean;
}) => {
  const existing = await prisma.ticketType.findUnique({
    where: {
      code: body.code,
    },
  });

  if (existing) {
    throw new Error("Ticket type code already exists");
  }

  const ticketType = await prisma.ticketType.create({
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

export const getAllTicketTypesService = async () => {
  const cachedData = await redis.get(CACHE_KEY);

  if (cachedData) {
    return JSON.parse(cachedData);
  }

  const ticketTypes = await prisma.ticketType.findMany({
    orderBy: {
      createdAt: "desc",
    },
  });

  await redis.set(CACHE_KEY, JSON.stringify(ticketTypes), "EX", CACHE_TTL);

  return ticketTypes;
};

export const getTicketTypeByIdService = async (id: string) => {
  return prisma.ticketType.findUnique({
    where: {
      id,
    },
  });
};

export const updateTicketTypeService = async (
  id: string,
  body: {
    name?: string;
    code?: string;
    description?: string;
    isActive?: boolean;
  },
) => {
  const existing = await prisma.ticketType.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    throw new Error("Ticket type not found");
  }

  if (body.code) {
    const duplicated = await prisma.ticketType.findFirst({
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

  const updated = await prisma.ticketType.update({
    where: {
      id,
    },

    data: body,
  });

  await clearTicketTypeCaches();

  return updated;
};

export const deleteTicketTypeService = async (id: string) => {
  const existing = await prisma.ticketType.findUnique({
    where: {
      id,
    },
  });

  if (!existing) {
    throw new Error("Ticket type not found");
  }

  await prisma.ticketType.delete({
    where: {
      id,
    },
  });

  await clearTicketTypeCaches();

  return true;
};

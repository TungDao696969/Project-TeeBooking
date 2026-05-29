export declare const createTicketTypeService: (body: {
    name: string;
    code: string;
    description?: string;
    type: string;
    price: number;
    isActive?: boolean;
}) => Promise<{
    name: string;
    type: string;
    id: string;
    isActive: boolean;
    createdAt: Date;
    code: string;
    description: string | null;
    cinemaId: string | null;
    price: import("@prisma/client-runtime-utils").Decimal;
}>;
export declare const getAllTicketTypesService: () => Promise<any>;
export declare const getTicketTypeByIdService: (id: string) => Promise<{
    name: string;
    type: string;
    id: string;
    isActive: boolean;
    createdAt: Date;
    code: string;
    description: string | null;
    cinemaId: string | null;
    price: import("@prisma/client-runtime-utils").Decimal;
} | null>;
export declare const updateTicketTypeService: (id: string, body: {
    name?: string;
    code?: string;
    description?: string;
    isActive?: boolean;
}) => Promise<{
    name: string;
    type: string;
    id: string;
    isActive: boolean;
    createdAt: Date;
    code: string;
    description: string | null;
    cinemaId: string | null;
    price: import("@prisma/client-runtime-utils").Decimal;
}>;
export declare const deleteTicketTypeService: (id: string) => Promise<boolean>;
//# sourceMappingURL=ticket-type.service.d.ts.map
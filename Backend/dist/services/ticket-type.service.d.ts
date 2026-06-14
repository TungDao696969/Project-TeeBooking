export declare const createTicketTypeService: (body: {
    name: string;
    code: string;
    description?: string;
    type: string;
    price: number;
    isActive?: boolean;
}) => Promise<{
    type: string;
    name: string;
    id: string;
    createdAt: Date;
    isActive: boolean;
    cinemaId: string | null;
    description: string | null;
    code: string;
    price: import("@prisma/client-runtime-utils").Decimal;
}>;
export declare const getAllTicketTypesService: () => Promise<any>;
export declare const getTicketTypeByIdService: (id: string) => Promise<{
    type: string;
    name: string;
    id: string;
    createdAt: Date;
    isActive: boolean;
    cinemaId: string | null;
    description: string | null;
    code: string;
    price: import("@prisma/client-runtime-utils").Decimal;
} | null>;
export declare const updateTicketTypeService: (id: string, body: {
    name?: string;
    code?: string;
    description?: string;
    isActive?: boolean;
}) => Promise<{
    type: string;
    name: string;
    id: string;
    createdAt: Date;
    isActive: boolean;
    cinemaId: string | null;
    description: string | null;
    code: string;
    price: import("@prisma/client-runtime-utils").Decimal;
}>;
export declare const deleteTicketTypeService: (id: string) => Promise<boolean>;
//# sourceMappingURL=ticket-type.service.d.ts.map
import { CreateCinemaInput, UpdateCinemaInput } from "../validations/cinema.schema";
export declare const createCinemaService: (data: CreateCinemaInput) => Promise<{
    name: string;
    email: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    province: string;
    district: string;
    ward: string;
    slug: string;
    hotline: string | null;
    address: string;
    latitude: number | null;
    longitude: number | null;
    openingHours: string | null;
}>;
export declare const getCinemaService: () => Promise<any>;
export declare const getCinemaByIdService: (id: string) => Promise<any>;
export declare const updateCinemaService: (id: string, data: UpdateCinemaInput) => Promise<{
    name: string;
    email: string | null;
    id: string;
    createdAt: Date;
    updatedAt: Date;
    province: string;
    district: string;
    ward: string;
    slug: string;
    hotline: string | null;
    address: string;
    latitude: number | null;
    longitude: number | null;
    openingHours: string | null;
}>;
export declare const deleteCinemaService: (id: string) => Promise<boolean>;
//# sourceMappingURL=cinema.service.d.ts.map
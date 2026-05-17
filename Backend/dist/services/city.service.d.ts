export declare const createCityService: (data: {
    name: string;
    slug: string;
}) => Promise<{
    success: boolean;
    message: string;
    data: {
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    };
}>;
export declare const getCitiesService: () => Promise<any>;
export declare const getCityByIdService: (id: string) => Promise<{
    success: boolean;
    data: {
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    };
}>;
export declare const updateCityService: (id: string, data: any) => Promise<{
    success: boolean;
    message: string;
    data: {
        name: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        slug: string;
    };
}>;
export declare const deleteCityService: (id: string) => Promise<{
    success: boolean;
    message: string;
}>;
//# sourceMappingURL=city.service.d.ts.map
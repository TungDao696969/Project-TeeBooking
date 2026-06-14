export declare const getAllFoodCombosService: () => Promise<{
    name: string;
    id: string;
    createdAt: Date;
    isActive: boolean;
    description: string | null;
    price: number;
    imageUrl: string | null;
    stockQuantity: number;
}[]>;
export declare const getFoodComboByIdService: (id: string) => Promise<{
    name: string;
    id: string;
    createdAt: Date;
    isActive: boolean;
    description: string | null;
    price: number;
    imageUrl: string | null;
    stockQuantity: number;
} | null>;
export declare const createFoodComboService: (data: any) => Promise<{
    name: string;
    id: string;
    createdAt: Date;
    isActive: boolean;
    description: string | null;
    price: number;
    imageUrl: string | null;
    stockQuantity: number;
}>;
export declare const updateFoodComboService: (id: string, data: any) => Promise<{
    name: string;
    id: string;
    createdAt: Date;
    isActive: boolean;
    description: string | null;
    price: number;
    imageUrl: string | null;
    stockQuantity: number;
}>;
export declare const deleteFoodComboService: (id: string) => Promise<{
    name: string;
    id: string;
    createdAt: Date;
    isActive: boolean;
    description: string | null;
    price: number;
    imageUrl: string | null;
    stockQuantity: number;
}>;
//# sourceMappingURL=foodCombo.service.d.ts.map
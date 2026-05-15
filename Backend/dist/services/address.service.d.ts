import { CreateAddressInput, UpdateAddressInput } from "../validations/address.schema";
export declare const createAddressService: (userId: string, data: CreateAddressInput) => Promise<{
    userId: string;
    id: string;
    createdAt: Date;
    province: string;
    district: string;
    ward: string;
    addressDetail: string;
    isDefault: boolean;
}>;
export declare const getAddressesService: (userId: string) => Promise<any>;
export declare const getAddressByIdService: (userId: string, addressId: string) => Promise<{
    userId: string;
    id: string;
    createdAt: Date;
    province: string;
    district: string;
    ward: string;
    addressDetail: string;
    isDefault: boolean;
}>;
export declare const updateAddressService: (userId: string, addressId: string, data: UpdateAddressInput) => Promise<{
    userId: string;
    id: string;
    createdAt: Date;
    province: string;
    district: string;
    ward: string;
    addressDetail: string;
    isDefault: boolean;
}>;
export declare const deleteAddressService: (userId: string, addressId: string) => Promise<boolean>;
export declare const setDefaultAddressService: (userId: string, addressId: string) => Promise<void>;
//# sourceMappingURL=address.service.d.ts.map
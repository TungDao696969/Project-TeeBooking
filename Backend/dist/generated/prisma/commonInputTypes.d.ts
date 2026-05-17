import * as $Enums from "./enums";
import type * as Prisma from "./internal/prismaNamespace";
export type StringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type SortOrderInput = {
    sort: Prisma.SortOrder;
    nulls?: Prisma.NullsOrder;
};
export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    mode?: Prisma.QueryMode;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type FloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type EnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | Prisma.EnumBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus;
};
export type EnumBookingPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingPaymentStatus | Prisma.EnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingPaymentStatus[] | Prisma.ListEnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingPaymentStatus[] | Prisma.ListEnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingPaymentStatusFilter<$PrismaModel> | $Enums.BookingPaymentStatus;
};
export type FloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatFilter<$PrismaModel>;
};
export type EnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | Prisma.EnumBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel>;
};
export type EnumBookingPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingPaymentStatus | Prisma.EnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingPaymentStatus[] | Prisma.ListEnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingPaymentStatus[] | Prisma.ListEnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingPaymentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBookingPaymentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBookingPaymentStatusFilter<$PrismaModel>;
};
export type IntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type FloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type FloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
};
export type EnumMovieStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MovieStatus | Prisma.EnumMovieStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MovieStatus[] | Prisma.ListEnumMovieStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MovieStatus[] | Prisma.ListEnumMovieStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMovieStatusFilter<$PrismaModel> | $Enums.MovieStatus;
};
export type EnumMovieStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MovieStatus | Prisma.EnumMovieStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MovieStatus[] | Prisma.ListEnumMovieStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MovieStatus[] | Prisma.ListEnumMovieStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMovieStatusWithAggregatesFilter<$PrismaModel> | $Enums.MovieStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMovieStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMovieStatusFilter<$PrismaModel>;
};
export type EnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod;
};
export type EnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
};
export type EnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
};
export type EnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
};
export type EnumPromotionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | Prisma.EnumPromotionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel> | $Enums.PromotionType;
};
export type EnumPromotionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | Prisma.EnumPromotionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionTypeWithAggregatesFilter<$PrismaModel> | $Enums.PromotionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel>;
};
export type EnumSeatTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SeatType | Prisma.EnumSeatTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SeatType[] | Prisma.ListEnumSeatTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeatType[] | Prisma.ListEnumSeatTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeatTypeFilter<$PrismaModel> | $Enums.SeatType;
};
export type EnumSeatTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SeatType | Prisma.EnumSeatTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SeatType[] | Prisma.ListEnumSeatTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeatType[] | Prisma.ListEnumSeatTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeatTypeWithAggregatesFilter<$PrismaModel> | $Enums.SeatType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSeatTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSeatTypeFilter<$PrismaModel>;
};
export type EnumSeatStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SeatStatus | Prisma.EnumSeatStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SeatStatus[] | Prisma.ListEnumSeatStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeatStatus[] | Prisma.ListEnumSeatStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeatStatusFilter<$PrismaModel> | $Enums.SeatStatus;
};
export type EnumSeatStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SeatStatus | Prisma.EnumSeatStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SeatStatus[] | Prisma.ListEnumSeatStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeatStatus[] | Prisma.ListEnumSeatStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeatStatusWithAggregatesFilter<$PrismaModel> | $Enums.SeatStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSeatStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSeatStatusFilter<$PrismaModel>;
};
export type EnumTrailerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TrailerType | Prisma.EnumTrailerTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TrailerType[] | Prisma.ListEnumTrailerTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TrailerType[] | Prisma.ListEnumTrailerTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTrailerTypeFilter<$PrismaModel> | $Enums.TrailerType;
};
export type EnumTrailerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrailerType | Prisma.EnumTrailerTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TrailerType[] | Prisma.ListEnumTrailerTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TrailerType[] | Prisma.ListEnumTrailerTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTrailerTypeWithAggregatesFilter<$PrismaModel> | $Enums.TrailerType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTrailerTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTrailerTypeFilter<$PrismaModel>;
};
export type EnumGenderTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderType | Prisma.EnumGenderTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.GenderType[] | Prisma.ListEnumGenderTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.GenderType[] | Prisma.ListEnumGenderTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumGenderTypeNullableFilter<$PrismaModel> | $Enums.GenderType | null;
};
export type EnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type EnumGenderTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderType | Prisma.EnumGenderTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.GenderType[] | Prisma.ListEnumGenderTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.GenderType[] | Prisma.ListEnumGenderTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumGenderTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.GenderType | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGenderTypeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGenderTypeNullableFilter<$PrismaModel>;
};
export type EnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type EnumVoucherStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VoucherStatus | Prisma.EnumVoucherStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VoucherStatus[] | Prisma.ListEnumVoucherStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VoucherStatus[] | Prisma.ListEnumVoucherStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVoucherStatusFilter<$PrismaModel> | $Enums.VoucherStatus;
};
export type EnumVoucherStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VoucherStatus | Prisma.EnumVoucherStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VoucherStatus[] | Prisma.ListEnumVoucherStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VoucherStatus[] | Prisma.ListEnumVoucherStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVoucherStatusWithAggregatesFilter<$PrismaModel> | $Enums.VoucherStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVoucherStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVoucherStatusFilter<$PrismaModel>;
};
export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringFilter<$PrismaModel> | string;
};
export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableFilter<$PrismaModel> | string | null;
};
export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeFilter<$PrismaModel> | Date | string;
};
export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel>;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringWithAggregatesFilter<$PrismaModel> | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedStringFilter<$PrismaModel>;
    _max?: Prisma.NestedStringFilter<$PrismaModel>;
};
export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntFilter<$PrismaModel> | number;
};
export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | Prisma.StringFieldRefInput<$PrismaModel> | null;
    in?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    notIn?: string[] | Prisma.ListStringFieldRefInput<$PrismaModel> | null;
    lt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    lte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gt?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    gte?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    contains?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    startsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    endsWith?: string | Prisma.StringFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedStringNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedStringNullableFilter<$PrismaModel>;
};
export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntNullableFilter<$PrismaModel> | number | null;
};
export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel>;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeFilter<$PrismaModel>;
};
export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolFilter<$PrismaModel> | boolean;
};
export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | Prisma.BooleanFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedBoolWithAggregatesFilter<$PrismaModel> | boolean;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedBoolFilter<$PrismaModel>;
    _max?: Prisma.NestedBoolFilter<$PrismaModel>;
};
export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null;
};
export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel> | null;
    in?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    notIn?: Date[] | string[] | Prisma.ListDateTimeFieldRefInput<$PrismaModel> | null;
    lt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    lte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gt?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    gte?: Date | string | Prisma.DateTimeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedDateTimeNullableFilter<$PrismaModel>;
};
export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatFilter<$PrismaModel> | number;
};
export type NestedEnumBookingStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | Prisma.EnumBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel> | $Enums.BookingStatus;
};
export type NestedEnumBookingPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingPaymentStatus | Prisma.EnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingPaymentStatus[] | Prisma.ListEnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingPaymentStatus[] | Prisma.ListEnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingPaymentStatusFilter<$PrismaModel> | $Enums.BookingPaymentStatus;
};
export type NestedFloatWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatFilter<$PrismaModel>;
};
export type NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingStatus | Prisma.EnumBookingStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingStatus[] | Prisma.ListEnumBookingStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBookingStatusFilter<$PrismaModel>;
};
export type NestedEnumBookingPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.BookingPaymentStatus | Prisma.EnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.BookingPaymentStatus[] | Prisma.ListEnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.BookingPaymentStatus[] | Prisma.ListEnumBookingPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumBookingPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.BookingPaymentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumBookingPaymentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumBookingPaymentStatusFilter<$PrismaModel>;
};
export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    in?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    notIn?: number[] | Prisma.ListIntFieldRefInput<$PrismaModel>;
    lt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.IntFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedIntWithAggregatesFilter<$PrismaModel> | number;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatFilter<$PrismaModel>;
    _sum?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedIntFilter<$PrismaModel>;
    _max?: Prisma.NestedIntFilter<$PrismaModel>;
};
export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableFilter<$PrismaModel> | number | null;
};
export type NestedFloatNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | Prisma.FloatFieldRefInput<$PrismaModel> | null;
    in?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    notIn?: number[] | Prisma.ListFloatFieldRefInput<$PrismaModel> | null;
    lt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    lte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gt?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    gte?: number | Prisma.FloatFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedFloatNullableWithAggregatesFilter<$PrismaModel> | number | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _avg?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _sum?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedFloatNullableFilter<$PrismaModel>;
};
export type NestedEnumMovieStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.MovieStatus | Prisma.EnumMovieStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MovieStatus[] | Prisma.ListEnumMovieStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MovieStatus[] | Prisma.ListEnumMovieStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMovieStatusFilter<$PrismaModel> | $Enums.MovieStatus;
};
export type NestedEnumMovieStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.MovieStatus | Prisma.EnumMovieStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.MovieStatus[] | Prisma.ListEnumMovieStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.MovieStatus[] | Prisma.ListEnumMovieStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumMovieStatusWithAggregatesFilter<$PrismaModel> | $Enums.MovieStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumMovieStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumMovieStatusFilter<$PrismaModel>;
};
export type NestedEnumPaymentMethodFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel> | $Enums.PaymentMethod;
};
export type NestedEnumPaymentStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel> | $Enums.PaymentStatus;
};
export type NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentMethod | Prisma.EnumPaymentMethodFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentMethod[] | Prisma.ListEnumPaymentMethodFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentMethodWithAggregatesFilter<$PrismaModel> | $Enums.PaymentMethod;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentMethodFilter<$PrismaModel>;
};
export type NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PaymentStatus | Prisma.EnumPaymentStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PaymentStatus[] | Prisma.ListEnumPaymentStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPaymentStatusWithAggregatesFilter<$PrismaModel> | $Enums.PaymentStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPaymentStatusFilter<$PrismaModel>;
};
export type NestedEnumPromotionTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | Prisma.EnumPromotionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel> | $Enums.PromotionType;
};
export type NestedEnumPromotionTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.PromotionType | Prisma.EnumPromotionTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.PromotionType[] | Prisma.ListEnumPromotionTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumPromotionTypeWithAggregatesFilter<$PrismaModel> | $Enums.PromotionType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumPromotionTypeFilter<$PrismaModel>;
};
export type NestedEnumSeatTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.SeatType | Prisma.EnumSeatTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SeatType[] | Prisma.ListEnumSeatTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeatType[] | Prisma.ListEnumSeatTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeatTypeFilter<$PrismaModel> | $Enums.SeatType;
};
export type NestedEnumSeatTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SeatType | Prisma.EnumSeatTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.SeatType[] | Prisma.ListEnumSeatTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeatType[] | Prisma.ListEnumSeatTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeatTypeWithAggregatesFilter<$PrismaModel> | $Enums.SeatType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSeatTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSeatTypeFilter<$PrismaModel>;
};
export type NestedEnumSeatStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.SeatStatus | Prisma.EnumSeatStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SeatStatus[] | Prisma.ListEnumSeatStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeatStatus[] | Prisma.ListEnumSeatStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeatStatusFilter<$PrismaModel> | $Enums.SeatStatus;
};
export type NestedEnumSeatStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.SeatStatus | Prisma.EnumSeatStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.SeatStatus[] | Prisma.ListEnumSeatStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.SeatStatus[] | Prisma.ListEnumSeatStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumSeatStatusWithAggregatesFilter<$PrismaModel> | $Enums.SeatStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumSeatStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumSeatStatusFilter<$PrismaModel>;
};
export type NestedEnumTrailerTypeFilter<$PrismaModel = never> = {
    equals?: $Enums.TrailerType | Prisma.EnumTrailerTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TrailerType[] | Prisma.ListEnumTrailerTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TrailerType[] | Prisma.ListEnumTrailerTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTrailerTypeFilter<$PrismaModel> | $Enums.TrailerType;
};
export type NestedEnumTrailerTypeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.TrailerType | Prisma.EnumTrailerTypeFieldRefInput<$PrismaModel>;
    in?: $Enums.TrailerType[] | Prisma.ListEnumTrailerTypeFieldRefInput<$PrismaModel>;
    notIn?: $Enums.TrailerType[] | Prisma.ListEnumTrailerTypeFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumTrailerTypeWithAggregatesFilter<$PrismaModel> | $Enums.TrailerType;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumTrailerTypeFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumTrailerTypeFilter<$PrismaModel>;
};
export type NestedEnumGenderTypeNullableFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderType | Prisma.EnumGenderTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.GenderType[] | Prisma.ListEnumGenderTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.GenderType[] | Prisma.ListEnumGenderTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumGenderTypeNullableFilter<$PrismaModel> | $Enums.GenderType | null;
};
export type NestedEnumUserRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleFilter<$PrismaModel> | $Enums.UserRole;
};
export type NestedEnumGenderTypeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.GenderType | Prisma.EnumGenderTypeFieldRefInput<$PrismaModel> | null;
    in?: $Enums.GenderType[] | Prisma.ListEnumGenderTypeFieldRefInput<$PrismaModel> | null;
    notIn?: $Enums.GenderType[] | Prisma.ListEnumGenderTypeFieldRefInput<$PrismaModel> | null;
    not?: Prisma.NestedEnumGenderTypeNullableWithAggregatesFilter<$PrismaModel> | $Enums.GenderType | null;
    _count?: Prisma.NestedIntNullableFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumGenderTypeNullableFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumGenderTypeNullableFilter<$PrismaModel>;
};
export type NestedEnumUserRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.UserRole | Prisma.EnumUserRoleFieldRefInput<$PrismaModel>;
    in?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    notIn?: $Enums.UserRole[] | Prisma.ListEnumUserRoleFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumUserRoleWithAggregatesFilter<$PrismaModel> | $Enums.UserRole;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumUserRoleFilter<$PrismaModel>;
};
export type NestedEnumVoucherStatusFilter<$PrismaModel = never> = {
    equals?: $Enums.VoucherStatus | Prisma.EnumVoucherStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VoucherStatus[] | Prisma.ListEnumVoucherStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VoucherStatus[] | Prisma.ListEnumVoucherStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVoucherStatusFilter<$PrismaModel> | $Enums.VoucherStatus;
};
export type NestedEnumVoucherStatusWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.VoucherStatus | Prisma.EnumVoucherStatusFieldRefInput<$PrismaModel>;
    in?: $Enums.VoucherStatus[] | Prisma.ListEnumVoucherStatusFieldRefInput<$PrismaModel>;
    notIn?: $Enums.VoucherStatus[] | Prisma.ListEnumVoucherStatusFieldRefInput<$PrismaModel>;
    not?: Prisma.NestedEnumVoucherStatusWithAggregatesFilter<$PrismaModel> | $Enums.VoucherStatus;
    _count?: Prisma.NestedIntFilter<$PrismaModel>;
    _min?: Prisma.NestedEnumVoucherStatusFilter<$PrismaModel>;
    _max?: Prisma.NestedEnumVoucherStatusFilter<$PrismaModel>;
};
//# sourceMappingURL=commonInputTypes.d.ts.map
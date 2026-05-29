import type * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model ShowtimeTicketType
 *
 */
export type ShowtimeTicketTypeModel = runtime.Types.Result.DefaultSelection<Prisma.$ShowtimeTicketTypePayload>;
export type AggregateShowtimeTicketType = {
    _count: ShowtimeTicketTypeCountAggregateOutputType | null;
    _avg: ShowtimeTicketTypeAvgAggregateOutputType | null;
    _sum: ShowtimeTicketTypeSumAggregateOutputType | null;
    _min: ShowtimeTicketTypeMinAggregateOutputType | null;
    _max: ShowtimeTicketTypeMaxAggregateOutputType | null;
};
export type ShowtimeTicketTypeAvgAggregateOutputType = {
    price: runtime.Decimal | null;
};
export type ShowtimeTicketTypeSumAggregateOutputType = {
    price: runtime.Decimal | null;
};
export type ShowtimeTicketTypeMinAggregateOutputType = {
    id: string | null;
    showtimeId: string | null;
    ticketTypeId: string | null;
    price: runtime.Decimal | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type ShowtimeTicketTypeMaxAggregateOutputType = {
    id: string | null;
    showtimeId: string | null;
    ticketTypeId: string | null;
    price: runtime.Decimal | null;
    isActive: boolean | null;
    createdAt: Date | null;
};
export type ShowtimeTicketTypeCountAggregateOutputType = {
    id: number;
    showtimeId: number;
    ticketTypeId: number;
    price: number;
    isActive: number;
    createdAt: number;
    _all: number;
};
export type ShowtimeTicketTypeAvgAggregateInputType = {
    price?: true;
};
export type ShowtimeTicketTypeSumAggregateInputType = {
    price?: true;
};
export type ShowtimeTicketTypeMinAggregateInputType = {
    id?: true;
    showtimeId?: true;
    ticketTypeId?: true;
    price?: true;
    isActive?: true;
    createdAt?: true;
};
export type ShowtimeTicketTypeMaxAggregateInputType = {
    id?: true;
    showtimeId?: true;
    ticketTypeId?: true;
    price?: true;
    isActive?: true;
    createdAt?: true;
};
export type ShowtimeTicketTypeCountAggregateInputType = {
    id?: true;
    showtimeId?: true;
    ticketTypeId?: true;
    price?: true;
    isActive?: true;
    createdAt?: true;
    _all?: true;
};
export type ShowtimeTicketTypeAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ShowtimeTicketType to aggregate.
     */
    where?: Prisma.ShowtimeTicketTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ShowtimeTicketTypes to fetch.
     */
    orderBy?: Prisma.ShowtimeTicketTypeOrderByWithRelationInput | Prisma.ShowtimeTicketTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.ShowtimeTicketTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ShowtimeTicketTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ShowtimeTicketTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned ShowtimeTicketTypes
    **/
    _count?: true | ShowtimeTicketTypeCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: ShowtimeTicketTypeAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: ShowtimeTicketTypeSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: ShowtimeTicketTypeMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: ShowtimeTicketTypeMaxAggregateInputType;
};
export type GetShowtimeTicketTypeAggregateType<T extends ShowtimeTicketTypeAggregateArgs> = {
    [P in keyof T & keyof AggregateShowtimeTicketType]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateShowtimeTicketType[P]> : Prisma.GetScalarType<T[P], AggregateShowtimeTicketType[P]>;
};
export type ShowtimeTicketTypeGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShowtimeTicketTypeWhereInput;
    orderBy?: Prisma.ShowtimeTicketTypeOrderByWithAggregationInput | Prisma.ShowtimeTicketTypeOrderByWithAggregationInput[];
    by: Prisma.ShowtimeTicketTypeScalarFieldEnum[] | Prisma.ShowtimeTicketTypeScalarFieldEnum;
    having?: Prisma.ShowtimeTicketTypeScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: ShowtimeTicketTypeCountAggregateInputType | true;
    _avg?: ShowtimeTicketTypeAvgAggregateInputType;
    _sum?: ShowtimeTicketTypeSumAggregateInputType;
    _min?: ShowtimeTicketTypeMinAggregateInputType;
    _max?: ShowtimeTicketTypeMaxAggregateInputType;
};
export type ShowtimeTicketTypeGroupByOutputType = {
    id: string;
    showtimeId: string;
    ticketTypeId: string;
    price: runtime.Decimal;
    isActive: boolean;
    createdAt: Date;
    _count: ShowtimeTicketTypeCountAggregateOutputType | null;
    _avg: ShowtimeTicketTypeAvgAggregateOutputType | null;
    _sum: ShowtimeTicketTypeSumAggregateOutputType | null;
    _min: ShowtimeTicketTypeMinAggregateOutputType | null;
    _max: ShowtimeTicketTypeMaxAggregateOutputType | null;
};
export type GetShowtimeTicketTypeGroupByPayload<T extends ShowtimeTicketTypeGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<ShowtimeTicketTypeGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof ShowtimeTicketTypeGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], ShowtimeTicketTypeGroupByOutputType[P]> : Prisma.GetScalarType<T[P], ShowtimeTicketTypeGroupByOutputType[P]>;
}>>;
export type ShowtimeTicketTypeWhereInput = {
    AND?: Prisma.ShowtimeTicketTypeWhereInput | Prisma.ShowtimeTicketTypeWhereInput[];
    OR?: Prisma.ShowtimeTicketTypeWhereInput[];
    NOT?: Prisma.ShowtimeTicketTypeWhereInput | Prisma.ShowtimeTicketTypeWhereInput[];
    id?: Prisma.StringFilter<"ShowtimeTicketType"> | string;
    showtimeId?: Prisma.StringFilter<"ShowtimeTicketType"> | string;
    ticketTypeId?: Prisma.StringFilter<"ShowtimeTicketType"> | string;
    price?: Prisma.DecimalFilter<"ShowtimeTicketType"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFilter<"ShowtimeTicketType"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ShowtimeTicketType"> | Date | string;
    showtime?: Prisma.XOR<Prisma.ShowtimeScalarRelationFilter, Prisma.ShowtimeWhereInput>;
    ticketType?: Prisma.XOR<Prisma.TicketTypeScalarRelationFilter, Prisma.TicketTypeWhereInput>;
};
export type ShowtimeTicketTypeOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    showtimeId?: Prisma.SortOrder;
    ticketTypeId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    showtime?: Prisma.ShowtimeOrderByWithRelationInput;
    ticketType?: Prisma.TicketTypeOrderByWithRelationInput;
};
export type ShowtimeTicketTypeWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.ShowtimeTicketTypeWhereInput | Prisma.ShowtimeTicketTypeWhereInput[];
    OR?: Prisma.ShowtimeTicketTypeWhereInput[];
    NOT?: Prisma.ShowtimeTicketTypeWhereInput | Prisma.ShowtimeTicketTypeWhereInput[];
    showtimeId?: Prisma.StringFilter<"ShowtimeTicketType"> | string;
    ticketTypeId?: Prisma.StringFilter<"ShowtimeTicketType"> | string;
    price?: Prisma.DecimalFilter<"ShowtimeTicketType"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFilter<"ShowtimeTicketType"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ShowtimeTicketType"> | Date | string;
    showtime?: Prisma.XOR<Prisma.ShowtimeScalarRelationFilter, Prisma.ShowtimeWhereInput>;
    ticketType?: Prisma.XOR<Prisma.TicketTypeScalarRelationFilter, Prisma.TicketTypeWhereInput>;
}, "id">;
export type ShowtimeTicketTypeOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    showtimeId?: Prisma.SortOrder;
    ticketTypeId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.ShowtimeTicketTypeCountOrderByAggregateInput;
    _avg?: Prisma.ShowtimeTicketTypeAvgOrderByAggregateInput;
    _max?: Prisma.ShowtimeTicketTypeMaxOrderByAggregateInput;
    _min?: Prisma.ShowtimeTicketTypeMinOrderByAggregateInput;
    _sum?: Prisma.ShowtimeTicketTypeSumOrderByAggregateInput;
};
export type ShowtimeTicketTypeScalarWhereWithAggregatesInput = {
    AND?: Prisma.ShowtimeTicketTypeScalarWhereWithAggregatesInput | Prisma.ShowtimeTicketTypeScalarWhereWithAggregatesInput[];
    OR?: Prisma.ShowtimeTicketTypeScalarWhereWithAggregatesInput[];
    NOT?: Prisma.ShowtimeTicketTypeScalarWhereWithAggregatesInput | Prisma.ShowtimeTicketTypeScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"ShowtimeTicketType"> | string;
    showtimeId?: Prisma.StringWithAggregatesFilter<"ShowtimeTicketType"> | string;
    ticketTypeId?: Prisma.StringWithAggregatesFilter<"ShowtimeTicketType"> | string;
    price?: Prisma.DecimalWithAggregatesFilter<"ShowtimeTicketType"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolWithAggregatesFilter<"ShowtimeTicketType"> | boolean;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"ShowtimeTicketType"> | Date | string;
};
export type ShowtimeTicketTypeCreateInput = {
    id?: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: boolean;
    createdAt?: Date | string;
    showtime: Prisma.ShowtimeCreateNestedOneWithoutShowtimeTicketTypesInput;
    ticketType: Prisma.TicketTypeCreateNestedOneWithoutShowtimeTicketTypesInput;
};
export type ShowtimeTicketTypeUncheckedCreateInput = {
    id?: string;
    showtimeId: string;
    ticketTypeId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ShowtimeTicketTypeUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    showtime?: Prisma.ShowtimeUpdateOneRequiredWithoutShowtimeTicketTypesNestedInput;
    ticketType?: Prisma.TicketTypeUpdateOneRequiredWithoutShowtimeTicketTypesNestedInput;
};
export type ShowtimeTicketTypeUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    ticketTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShowtimeTicketTypeCreateManyInput = {
    id?: string;
    showtimeId: string;
    ticketTypeId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ShowtimeTicketTypeUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShowtimeTicketTypeUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    ticketTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShowtimeTicketTypeListRelationFilter = {
    every?: Prisma.ShowtimeTicketTypeWhereInput;
    some?: Prisma.ShowtimeTicketTypeWhereInput;
    none?: Prisma.ShowtimeTicketTypeWhereInput;
};
export type ShowtimeTicketTypeOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type ShowtimeTicketTypeCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    showtimeId?: Prisma.SortOrder;
    ticketTypeId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShowtimeTicketTypeAvgOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type ShowtimeTicketTypeMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    showtimeId?: Prisma.SortOrder;
    ticketTypeId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShowtimeTicketTypeMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    showtimeId?: Prisma.SortOrder;
    ticketTypeId?: Prisma.SortOrder;
    price?: Prisma.SortOrder;
    isActive?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type ShowtimeTicketTypeSumOrderByAggregateInput = {
    price?: Prisma.SortOrder;
};
export type ShowtimeTicketTypeCreateNestedManyWithoutShowtimeInput = {
    create?: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutShowtimeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutShowtimeInput> | Prisma.ShowtimeTicketTypeCreateWithoutShowtimeInput[] | Prisma.ShowtimeTicketTypeUncheckedCreateWithoutShowtimeInput[];
    connectOrCreate?: Prisma.ShowtimeTicketTypeCreateOrConnectWithoutShowtimeInput | Prisma.ShowtimeTicketTypeCreateOrConnectWithoutShowtimeInput[];
    createMany?: Prisma.ShowtimeTicketTypeCreateManyShowtimeInputEnvelope;
    connect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
};
export type ShowtimeTicketTypeUncheckedCreateNestedManyWithoutShowtimeInput = {
    create?: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutShowtimeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutShowtimeInput> | Prisma.ShowtimeTicketTypeCreateWithoutShowtimeInput[] | Prisma.ShowtimeTicketTypeUncheckedCreateWithoutShowtimeInput[];
    connectOrCreate?: Prisma.ShowtimeTicketTypeCreateOrConnectWithoutShowtimeInput | Prisma.ShowtimeTicketTypeCreateOrConnectWithoutShowtimeInput[];
    createMany?: Prisma.ShowtimeTicketTypeCreateManyShowtimeInputEnvelope;
    connect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
};
export type ShowtimeTicketTypeUpdateManyWithoutShowtimeNestedInput = {
    create?: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutShowtimeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutShowtimeInput> | Prisma.ShowtimeTicketTypeCreateWithoutShowtimeInput[] | Prisma.ShowtimeTicketTypeUncheckedCreateWithoutShowtimeInput[];
    connectOrCreate?: Prisma.ShowtimeTicketTypeCreateOrConnectWithoutShowtimeInput | Prisma.ShowtimeTicketTypeCreateOrConnectWithoutShowtimeInput[];
    upsert?: Prisma.ShowtimeTicketTypeUpsertWithWhereUniqueWithoutShowtimeInput | Prisma.ShowtimeTicketTypeUpsertWithWhereUniqueWithoutShowtimeInput[];
    createMany?: Prisma.ShowtimeTicketTypeCreateManyShowtimeInputEnvelope;
    set?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    disconnect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    delete?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    connect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    update?: Prisma.ShowtimeTicketTypeUpdateWithWhereUniqueWithoutShowtimeInput | Prisma.ShowtimeTicketTypeUpdateWithWhereUniqueWithoutShowtimeInput[];
    updateMany?: Prisma.ShowtimeTicketTypeUpdateManyWithWhereWithoutShowtimeInput | Prisma.ShowtimeTicketTypeUpdateManyWithWhereWithoutShowtimeInput[];
    deleteMany?: Prisma.ShowtimeTicketTypeScalarWhereInput | Prisma.ShowtimeTicketTypeScalarWhereInput[];
};
export type ShowtimeTicketTypeUncheckedUpdateManyWithoutShowtimeNestedInput = {
    create?: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutShowtimeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutShowtimeInput> | Prisma.ShowtimeTicketTypeCreateWithoutShowtimeInput[] | Prisma.ShowtimeTicketTypeUncheckedCreateWithoutShowtimeInput[];
    connectOrCreate?: Prisma.ShowtimeTicketTypeCreateOrConnectWithoutShowtimeInput | Prisma.ShowtimeTicketTypeCreateOrConnectWithoutShowtimeInput[];
    upsert?: Prisma.ShowtimeTicketTypeUpsertWithWhereUniqueWithoutShowtimeInput | Prisma.ShowtimeTicketTypeUpsertWithWhereUniqueWithoutShowtimeInput[];
    createMany?: Prisma.ShowtimeTicketTypeCreateManyShowtimeInputEnvelope;
    set?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    disconnect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    delete?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    connect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    update?: Prisma.ShowtimeTicketTypeUpdateWithWhereUniqueWithoutShowtimeInput | Prisma.ShowtimeTicketTypeUpdateWithWhereUniqueWithoutShowtimeInput[];
    updateMany?: Prisma.ShowtimeTicketTypeUpdateManyWithWhereWithoutShowtimeInput | Prisma.ShowtimeTicketTypeUpdateManyWithWhereWithoutShowtimeInput[];
    deleteMany?: Prisma.ShowtimeTicketTypeScalarWhereInput | Prisma.ShowtimeTicketTypeScalarWhereInput[];
};
export type DecimalFieldUpdateOperationsInput = {
    set?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    increment?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    decrement?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    multiply?: runtime.Decimal | runtime.DecimalJsLike | number | string;
    divide?: runtime.Decimal | runtime.DecimalJsLike | number | string;
};
export type ShowtimeTicketTypeCreateNestedManyWithoutTicketTypeInput = {
    create?: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutTicketTypeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutTicketTypeInput> | Prisma.ShowtimeTicketTypeCreateWithoutTicketTypeInput[] | Prisma.ShowtimeTicketTypeUncheckedCreateWithoutTicketTypeInput[];
    connectOrCreate?: Prisma.ShowtimeTicketTypeCreateOrConnectWithoutTicketTypeInput | Prisma.ShowtimeTicketTypeCreateOrConnectWithoutTicketTypeInput[];
    createMany?: Prisma.ShowtimeTicketTypeCreateManyTicketTypeInputEnvelope;
    connect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
};
export type ShowtimeTicketTypeUncheckedCreateNestedManyWithoutTicketTypeInput = {
    create?: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutTicketTypeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutTicketTypeInput> | Prisma.ShowtimeTicketTypeCreateWithoutTicketTypeInput[] | Prisma.ShowtimeTicketTypeUncheckedCreateWithoutTicketTypeInput[];
    connectOrCreate?: Prisma.ShowtimeTicketTypeCreateOrConnectWithoutTicketTypeInput | Prisma.ShowtimeTicketTypeCreateOrConnectWithoutTicketTypeInput[];
    createMany?: Prisma.ShowtimeTicketTypeCreateManyTicketTypeInputEnvelope;
    connect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
};
export type ShowtimeTicketTypeUpdateManyWithoutTicketTypeNestedInput = {
    create?: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutTicketTypeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutTicketTypeInput> | Prisma.ShowtimeTicketTypeCreateWithoutTicketTypeInput[] | Prisma.ShowtimeTicketTypeUncheckedCreateWithoutTicketTypeInput[];
    connectOrCreate?: Prisma.ShowtimeTicketTypeCreateOrConnectWithoutTicketTypeInput | Prisma.ShowtimeTicketTypeCreateOrConnectWithoutTicketTypeInput[];
    upsert?: Prisma.ShowtimeTicketTypeUpsertWithWhereUniqueWithoutTicketTypeInput | Prisma.ShowtimeTicketTypeUpsertWithWhereUniqueWithoutTicketTypeInput[];
    createMany?: Prisma.ShowtimeTicketTypeCreateManyTicketTypeInputEnvelope;
    set?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    disconnect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    delete?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    connect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    update?: Prisma.ShowtimeTicketTypeUpdateWithWhereUniqueWithoutTicketTypeInput | Prisma.ShowtimeTicketTypeUpdateWithWhereUniqueWithoutTicketTypeInput[];
    updateMany?: Prisma.ShowtimeTicketTypeUpdateManyWithWhereWithoutTicketTypeInput | Prisma.ShowtimeTicketTypeUpdateManyWithWhereWithoutTicketTypeInput[];
    deleteMany?: Prisma.ShowtimeTicketTypeScalarWhereInput | Prisma.ShowtimeTicketTypeScalarWhereInput[];
};
export type ShowtimeTicketTypeUncheckedUpdateManyWithoutTicketTypeNestedInput = {
    create?: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutTicketTypeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutTicketTypeInput> | Prisma.ShowtimeTicketTypeCreateWithoutTicketTypeInput[] | Prisma.ShowtimeTicketTypeUncheckedCreateWithoutTicketTypeInput[];
    connectOrCreate?: Prisma.ShowtimeTicketTypeCreateOrConnectWithoutTicketTypeInput | Prisma.ShowtimeTicketTypeCreateOrConnectWithoutTicketTypeInput[];
    upsert?: Prisma.ShowtimeTicketTypeUpsertWithWhereUniqueWithoutTicketTypeInput | Prisma.ShowtimeTicketTypeUpsertWithWhereUniqueWithoutTicketTypeInput[];
    createMany?: Prisma.ShowtimeTicketTypeCreateManyTicketTypeInputEnvelope;
    set?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    disconnect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    delete?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    connect?: Prisma.ShowtimeTicketTypeWhereUniqueInput | Prisma.ShowtimeTicketTypeWhereUniqueInput[];
    update?: Prisma.ShowtimeTicketTypeUpdateWithWhereUniqueWithoutTicketTypeInput | Prisma.ShowtimeTicketTypeUpdateWithWhereUniqueWithoutTicketTypeInput[];
    updateMany?: Prisma.ShowtimeTicketTypeUpdateManyWithWhereWithoutTicketTypeInput | Prisma.ShowtimeTicketTypeUpdateManyWithWhereWithoutTicketTypeInput[];
    deleteMany?: Prisma.ShowtimeTicketTypeScalarWhereInput | Prisma.ShowtimeTicketTypeScalarWhereInput[];
};
export type ShowtimeTicketTypeCreateWithoutShowtimeInput = {
    id?: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: boolean;
    createdAt?: Date | string;
    ticketType: Prisma.TicketTypeCreateNestedOneWithoutShowtimeTicketTypesInput;
};
export type ShowtimeTicketTypeUncheckedCreateWithoutShowtimeInput = {
    id?: string;
    ticketTypeId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ShowtimeTicketTypeCreateOrConnectWithoutShowtimeInput = {
    where: Prisma.ShowtimeTicketTypeWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutShowtimeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutShowtimeInput>;
};
export type ShowtimeTicketTypeCreateManyShowtimeInputEnvelope = {
    data: Prisma.ShowtimeTicketTypeCreateManyShowtimeInput | Prisma.ShowtimeTicketTypeCreateManyShowtimeInput[];
    skipDuplicates?: boolean;
};
export type ShowtimeTicketTypeUpsertWithWhereUniqueWithoutShowtimeInput = {
    where: Prisma.ShowtimeTicketTypeWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShowtimeTicketTypeUpdateWithoutShowtimeInput, Prisma.ShowtimeTicketTypeUncheckedUpdateWithoutShowtimeInput>;
    create: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutShowtimeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutShowtimeInput>;
};
export type ShowtimeTicketTypeUpdateWithWhereUniqueWithoutShowtimeInput = {
    where: Prisma.ShowtimeTicketTypeWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShowtimeTicketTypeUpdateWithoutShowtimeInput, Prisma.ShowtimeTicketTypeUncheckedUpdateWithoutShowtimeInput>;
};
export type ShowtimeTicketTypeUpdateManyWithWhereWithoutShowtimeInput = {
    where: Prisma.ShowtimeTicketTypeScalarWhereInput;
    data: Prisma.XOR<Prisma.ShowtimeTicketTypeUpdateManyMutationInput, Prisma.ShowtimeTicketTypeUncheckedUpdateManyWithoutShowtimeInput>;
};
export type ShowtimeTicketTypeScalarWhereInput = {
    AND?: Prisma.ShowtimeTicketTypeScalarWhereInput | Prisma.ShowtimeTicketTypeScalarWhereInput[];
    OR?: Prisma.ShowtimeTicketTypeScalarWhereInput[];
    NOT?: Prisma.ShowtimeTicketTypeScalarWhereInput | Prisma.ShowtimeTicketTypeScalarWhereInput[];
    id?: Prisma.StringFilter<"ShowtimeTicketType"> | string;
    showtimeId?: Prisma.StringFilter<"ShowtimeTicketType"> | string;
    ticketTypeId?: Prisma.StringFilter<"ShowtimeTicketType"> | string;
    price?: Prisma.DecimalFilter<"ShowtimeTicketType"> | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFilter<"ShowtimeTicketType"> | boolean;
    createdAt?: Prisma.DateTimeFilter<"ShowtimeTicketType"> | Date | string;
};
export type ShowtimeTicketTypeCreateWithoutTicketTypeInput = {
    id?: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: boolean;
    createdAt?: Date | string;
    showtime: Prisma.ShowtimeCreateNestedOneWithoutShowtimeTicketTypesInput;
};
export type ShowtimeTicketTypeUncheckedCreateWithoutTicketTypeInput = {
    id?: string;
    showtimeId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ShowtimeTicketTypeCreateOrConnectWithoutTicketTypeInput = {
    where: Prisma.ShowtimeTicketTypeWhereUniqueInput;
    create: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutTicketTypeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutTicketTypeInput>;
};
export type ShowtimeTicketTypeCreateManyTicketTypeInputEnvelope = {
    data: Prisma.ShowtimeTicketTypeCreateManyTicketTypeInput | Prisma.ShowtimeTicketTypeCreateManyTicketTypeInput[];
    skipDuplicates?: boolean;
};
export type ShowtimeTicketTypeUpsertWithWhereUniqueWithoutTicketTypeInput = {
    where: Prisma.ShowtimeTicketTypeWhereUniqueInput;
    update: Prisma.XOR<Prisma.ShowtimeTicketTypeUpdateWithoutTicketTypeInput, Prisma.ShowtimeTicketTypeUncheckedUpdateWithoutTicketTypeInput>;
    create: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateWithoutTicketTypeInput, Prisma.ShowtimeTicketTypeUncheckedCreateWithoutTicketTypeInput>;
};
export type ShowtimeTicketTypeUpdateWithWhereUniqueWithoutTicketTypeInput = {
    where: Prisma.ShowtimeTicketTypeWhereUniqueInput;
    data: Prisma.XOR<Prisma.ShowtimeTicketTypeUpdateWithoutTicketTypeInput, Prisma.ShowtimeTicketTypeUncheckedUpdateWithoutTicketTypeInput>;
};
export type ShowtimeTicketTypeUpdateManyWithWhereWithoutTicketTypeInput = {
    where: Prisma.ShowtimeTicketTypeScalarWhereInput;
    data: Prisma.XOR<Prisma.ShowtimeTicketTypeUpdateManyMutationInput, Prisma.ShowtimeTicketTypeUncheckedUpdateManyWithoutTicketTypeInput>;
};
export type ShowtimeTicketTypeCreateManyShowtimeInput = {
    id?: string;
    ticketTypeId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ShowtimeTicketTypeUpdateWithoutShowtimeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    ticketType?: Prisma.TicketTypeUpdateOneRequiredWithoutShowtimeTicketTypesNestedInput;
};
export type ShowtimeTicketTypeUncheckedUpdateWithoutShowtimeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ticketTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShowtimeTicketTypeUncheckedUpdateManyWithoutShowtimeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    ticketTypeId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShowtimeTicketTypeCreateManyTicketTypeInput = {
    id?: string;
    showtimeId: string;
    price: runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: boolean;
    createdAt?: Date | string;
};
export type ShowtimeTicketTypeUpdateWithoutTicketTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    showtime?: Prisma.ShowtimeUpdateOneRequiredWithoutShowtimeTicketTypesNestedInput;
};
export type ShowtimeTicketTypeUncheckedUpdateWithoutTicketTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShowtimeTicketTypeUncheckedUpdateManyWithoutTicketTypeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    price?: Prisma.DecimalFieldUpdateOperationsInput | runtime.Decimal | runtime.DecimalJsLike | number | string;
    isActive?: Prisma.BoolFieldUpdateOperationsInput | boolean;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type ShowtimeTicketTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    showtimeId?: boolean;
    ticketTypeId?: boolean;
    price?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
    ticketType?: boolean | Prisma.TicketTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["showtimeTicketType"]>;
export type ShowtimeTicketTypeSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    showtimeId?: boolean;
    ticketTypeId?: boolean;
    price?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
    ticketType?: boolean | Prisma.TicketTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["showtimeTicketType"]>;
export type ShowtimeTicketTypeSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    showtimeId?: boolean;
    ticketTypeId?: boolean;
    price?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
    ticketType?: boolean | Prisma.TicketTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["showtimeTicketType"]>;
export type ShowtimeTicketTypeSelectScalar = {
    id?: boolean;
    showtimeId?: boolean;
    ticketTypeId?: boolean;
    price?: boolean;
    isActive?: boolean;
    createdAt?: boolean;
};
export type ShowtimeTicketTypeOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "showtimeId" | "ticketTypeId" | "price" | "isActive" | "createdAt", ExtArgs["result"]["showtimeTicketType"]>;
export type ShowtimeTicketTypeInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
    ticketType?: boolean | Prisma.TicketTypeDefaultArgs<ExtArgs>;
};
export type ShowtimeTicketTypeIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
    ticketType?: boolean | Prisma.TicketTypeDefaultArgs<ExtArgs>;
};
export type ShowtimeTicketTypeIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
    ticketType?: boolean | Prisma.TicketTypeDefaultArgs<ExtArgs>;
};
export type $ShowtimeTicketTypePayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "ShowtimeTicketType";
    objects: {
        showtime: Prisma.$ShowtimePayload<ExtArgs>;
        ticketType: Prisma.$TicketTypePayload<ExtArgs>;
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        showtimeId: string;
        ticketTypeId: string;
        price: runtime.Decimal;
        isActive: boolean;
        createdAt: Date;
    }, ExtArgs["result"]["showtimeTicketType"]>;
    composites: {};
};
export type ShowtimeTicketTypeGetPayload<S extends boolean | null | undefined | ShowtimeTicketTypeDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload, S>;
export type ShowtimeTicketTypeCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<ShowtimeTicketTypeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: ShowtimeTicketTypeCountAggregateInputType | true;
};
export interface ShowtimeTicketTypeDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['ShowtimeTicketType'];
        meta: {
            name: 'ShowtimeTicketType';
        };
    };
    /**
     * Find zero or one ShowtimeTicketType that matches the filter.
     * @param {ShowtimeTicketTypeFindUniqueArgs} args - Arguments to find a ShowtimeTicketType
     * @example
     * // Get one ShowtimeTicketType
     * const showtimeTicketType = await prisma.showtimeTicketType.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ShowtimeTicketTypeFindUniqueArgs>(args: Prisma.SelectSubset<T, ShowtimeTicketTypeFindUniqueArgs<ExtArgs>>): Prisma.Prisma__ShowtimeTicketTypeClient<runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one ShowtimeTicketType that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ShowtimeTicketTypeFindUniqueOrThrowArgs} args - Arguments to find a ShowtimeTicketType
     * @example
     * // Get one ShowtimeTicketType
     * const showtimeTicketType = await prisma.showtimeTicketType.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ShowtimeTicketTypeFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, ShowtimeTicketTypeFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShowtimeTicketTypeClient<runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ShowtimeTicketType that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShowtimeTicketTypeFindFirstArgs} args - Arguments to find a ShowtimeTicketType
     * @example
     * // Get one ShowtimeTicketType
     * const showtimeTicketType = await prisma.showtimeTicketType.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ShowtimeTicketTypeFindFirstArgs>(args?: Prisma.SelectSubset<T, ShowtimeTicketTypeFindFirstArgs<ExtArgs>>): Prisma.Prisma__ShowtimeTicketTypeClient<runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first ShowtimeTicketType that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShowtimeTicketTypeFindFirstOrThrowArgs} args - Arguments to find a ShowtimeTicketType
     * @example
     * // Get one ShowtimeTicketType
     * const showtimeTicketType = await prisma.showtimeTicketType.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ShowtimeTicketTypeFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, ShowtimeTicketTypeFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__ShowtimeTicketTypeClient<runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more ShowtimeTicketTypes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShowtimeTicketTypeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all ShowtimeTicketTypes
     * const showtimeTicketTypes = await prisma.showtimeTicketType.findMany()
     *
     * // Get first 10 ShowtimeTicketTypes
     * const showtimeTicketTypes = await prisma.showtimeTicketType.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const showtimeTicketTypeWithIdOnly = await prisma.showtimeTicketType.findMany({ select: { id: true } })
     *
     */
    findMany<T extends ShowtimeTicketTypeFindManyArgs>(args?: Prisma.SelectSubset<T, ShowtimeTicketTypeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a ShowtimeTicketType.
     * @param {ShowtimeTicketTypeCreateArgs} args - Arguments to create a ShowtimeTicketType.
     * @example
     * // Create one ShowtimeTicketType
     * const ShowtimeTicketType = await prisma.showtimeTicketType.create({
     *   data: {
     *     // ... data to create a ShowtimeTicketType
     *   }
     * })
     *
     */
    create<T extends ShowtimeTicketTypeCreateArgs>(args: Prisma.SelectSubset<T, ShowtimeTicketTypeCreateArgs<ExtArgs>>): Prisma.Prisma__ShowtimeTicketTypeClient<runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many ShowtimeTicketTypes.
     * @param {ShowtimeTicketTypeCreateManyArgs} args - Arguments to create many ShowtimeTicketTypes.
     * @example
     * // Create many ShowtimeTicketTypes
     * const showtimeTicketType = await prisma.showtimeTicketType.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends ShowtimeTicketTypeCreateManyArgs>(args?: Prisma.SelectSubset<T, ShowtimeTicketTypeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many ShowtimeTicketTypes and returns the data saved in the database.
     * @param {ShowtimeTicketTypeCreateManyAndReturnArgs} args - Arguments to create many ShowtimeTicketTypes.
     * @example
     * // Create many ShowtimeTicketTypes
     * const showtimeTicketType = await prisma.showtimeTicketType.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many ShowtimeTicketTypes and only return the `id`
     * const showtimeTicketTypeWithIdOnly = await prisma.showtimeTicketType.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends ShowtimeTicketTypeCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, ShowtimeTicketTypeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a ShowtimeTicketType.
     * @param {ShowtimeTicketTypeDeleteArgs} args - Arguments to delete one ShowtimeTicketType.
     * @example
     * // Delete one ShowtimeTicketType
     * const ShowtimeTicketType = await prisma.showtimeTicketType.delete({
     *   where: {
     *     // ... filter to delete one ShowtimeTicketType
     *   }
     * })
     *
     */
    delete<T extends ShowtimeTicketTypeDeleteArgs>(args: Prisma.SelectSubset<T, ShowtimeTicketTypeDeleteArgs<ExtArgs>>): Prisma.Prisma__ShowtimeTicketTypeClient<runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one ShowtimeTicketType.
     * @param {ShowtimeTicketTypeUpdateArgs} args - Arguments to update one ShowtimeTicketType.
     * @example
     * // Update one ShowtimeTicketType
     * const showtimeTicketType = await prisma.showtimeTicketType.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends ShowtimeTicketTypeUpdateArgs>(args: Prisma.SelectSubset<T, ShowtimeTicketTypeUpdateArgs<ExtArgs>>): Prisma.Prisma__ShowtimeTicketTypeClient<runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more ShowtimeTicketTypes.
     * @param {ShowtimeTicketTypeDeleteManyArgs} args - Arguments to filter ShowtimeTicketTypes to delete.
     * @example
     * // Delete a few ShowtimeTicketTypes
     * const { count } = await prisma.showtimeTicketType.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends ShowtimeTicketTypeDeleteManyArgs>(args?: Prisma.SelectSubset<T, ShowtimeTicketTypeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ShowtimeTicketTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShowtimeTicketTypeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many ShowtimeTicketTypes
     * const showtimeTicketType = await prisma.showtimeTicketType.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends ShowtimeTicketTypeUpdateManyArgs>(args: Prisma.SelectSubset<T, ShowtimeTicketTypeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more ShowtimeTicketTypes and returns the data updated in the database.
     * @param {ShowtimeTicketTypeUpdateManyAndReturnArgs} args - Arguments to update many ShowtimeTicketTypes.
     * @example
     * // Update many ShowtimeTicketTypes
     * const showtimeTicketType = await prisma.showtimeTicketType.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more ShowtimeTicketTypes and only return the `id`
     * const showtimeTicketTypeWithIdOnly = await prisma.showtimeTicketType.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    updateManyAndReturn<T extends ShowtimeTicketTypeUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, ShowtimeTicketTypeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one ShowtimeTicketType.
     * @param {ShowtimeTicketTypeUpsertArgs} args - Arguments to update or create a ShowtimeTicketType.
     * @example
     * // Update or create a ShowtimeTicketType
     * const showtimeTicketType = await prisma.showtimeTicketType.upsert({
     *   create: {
     *     // ... data to create a ShowtimeTicketType
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the ShowtimeTicketType we want to update
     *   }
     * })
     */
    upsert<T extends ShowtimeTicketTypeUpsertArgs>(args: Prisma.SelectSubset<T, ShowtimeTicketTypeUpsertArgs<ExtArgs>>): Prisma.Prisma__ShowtimeTicketTypeClient<runtime.Types.Result.GetResult<Prisma.$ShowtimeTicketTypePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of ShowtimeTicketTypes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShowtimeTicketTypeCountArgs} args - Arguments to filter ShowtimeTicketTypes to count.
     * @example
     * // Count the number of ShowtimeTicketTypes
     * const count = await prisma.showtimeTicketType.count({
     *   where: {
     *     // ... the filter for the ShowtimeTicketTypes we want to count
     *   }
     * })
    **/
    count<T extends ShowtimeTicketTypeCountArgs>(args?: Prisma.Subset<T, ShowtimeTicketTypeCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], ShowtimeTicketTypeCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a ShowtimeTicketType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShowtimeTicketTypeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ShowtimeTicketTypeAggregateArgs>(args: Prisma.Subset<T, ShowtimeTicketTypeAggregateArgs>): Prisma.PrismaPromise<GetShowtimeTicketTypeAggregateType<T>>;
    /**
     * Group by ShowtimeTicketType.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ShowtimeTicketTypeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     *
    **/
    groupBy<T extends ShowtimeTicketTypeGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: ShowtimeTicketTypeGroupByArgs['orderBy'];
    } : {
        orderBy?: ShowtimeTicketTypeGroupByArgs['orderBy'];
    }, OrderFields extends Prisma.ExcludeUnderscoreKeys<Prisma.Keys<Prisma.MaybeTupleToUnion<T['orderBy']>>>, ByFields extends Prisma.MaybeTupleToUnion<T['by']>, ByValid extends Prisma.Has<ByFields, OrderFields>, HavingFields extends Prisma.GetHavingFields<T['having']>, HavingValid extends Prisma.Has<ByFields, HavingFields>, ByEmpty extends T['by'] extends never[] ? Prisma.True : Prisma.False, InputErrors extends ByEmpty extends Prisma.True ? `Error: "by" must not be empty.` : HavingValid extends Prisma.False ? {
        [P in HavingFields]: P extends ByFields ? never : P extends string ? `Error: Field "${P}" used in "having" needs to be provided in "by".` : [
            Error,
            'Field ',
            P,
            ` in "having" needs to be provided in "by"`
        ];
    }[HavingFields] : 'take' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "take", you also need to provide "orderBy"' : 'skip' extends Prisma.Keys<T> ? 'orderBy' extends Prisma.Keys<T> ? ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields] : 'Error: If you provide "skip", you also need to provide "orderBy"' : ByValid extends Prisma.True ? {} : {
        [P in OrderFields]: P extends ByFields ? never : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`;
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, ShowtimeTicketTypeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetShowtimeTicketTypeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the ShowtimeTicketType model
     */
    readonly fields: ShowtimeTicketTypeFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for ShowtimeTicketType.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__ShowtimeTicketTypeClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    showtime<T extends Prisma.ShowtimeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShowtimeDefaultArgs<ExtArgs>>): Prisma.Prisma__ShowtimeClient<runtime.Types.Result.GetResult<Prisma.$ShowtimePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    ticketType<T extends Prisma.TicketTypeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.TicketTypeDefaultArgs<ExtArgs>>): Prisma.Prisma__TicketTypeClient<runtime.Types.Result.GetResult<Prisma.$TicketTypePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): runtime.Types.Utils.JsPromise<TResult1 | TResult2>;
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): runtime.Types.Utils.JsPromise<T | TResult>;
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): runtime.Types.Utils.JsPromise<T>;
}
/**
 * Fields of the ShowtimeTicketType model
 */
export interface ShowtimeTicketTypeFieldRefs {
    readonly id: Prisma.FieldRef<"ShowtimeTicketType", 'String'>;
    readonly showtimeId: Prisma.FieldRef<"ShowtimeTicketType", 'String'>;
    readonly ticketTypeId: Prisma.FieldRef<"ShowtimeTicketType", 'String'>;
    readonly price: Prisma.FieldRef<"ShowtimeTicketType", 'Decimal'>;
    readonly isActive: Prisma.FieldRef<"ShowtimeTicketType", 'Boolean'>;
    readonly createdAt: Prisma.FieldRef<"ShowtimeTicketType", 'DateTime'>;
}
/**
 * ShowtimeTicketType findUnique
 */
export type ShowtimeTicketTypeFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeInclude<ExtArgs> | null;
    /**
     * Filter, which ShowtimeTicketType to fetch.
     */
    where: Prisma.ShowtimeTicketTypeWhereUniqueInput;
};
/**
 * ShowtimeTicketType findUniqueOrThrow
 */
export type ShowtimeTicketTypeFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeInclude<ExtArgs> | null;
    /**
     * Filter, which ShowtimeTicketType to fetch.
     */
    where: Prisma.ShowtimeTicketTypeWhereUniqueInput;
};
/**
 * ShowtimeTicketType findFirst
 */
export type ShowtimeTicketTypeFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeInclude<ExtArgs> | null;
    /**
     * Filter, which ShowtimeTicketType to fetch.
     */
    where?: Prisma.ShowtimeTicketTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ShowtimeTicketTypes to fetch.
     */
    orderBy?: Prisma.ShowtimeTicketTypeOrderByWithRelationInput | Prisma.ShowtimeTicketTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ShowtimeTicketTypes.
     */
    cursor?: Prisma.ShowtimeTicketTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ShowtimeTicketTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ShowtimeTicketTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ShowtimeTicketTypes.
     */
    distinct?: Prisma.ShowtimeTicketTypeScalarFieldEnum | Prisma.ShowtimeTicketTypeScalarFieldEnum[];
};
/**
 * ShowtimeTicketType findFirstOrThrow
 */
export type ShowtimeTicketTypeFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeInclude<ExtArgs> | null;
    /**
     * Filter, which ShowtimeTicketType to fetch.
     */
    where?: Prisma.ShowtimeTicketTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ShowtimeTicketTypes to fetch.
     */
    orderBy?: Prisma.ShowtimeTicketTypeOrderByWithRelationInput | Prisma.ShowtimeTicketTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for ShowtimeTicketTypes.
     */
    cursor?: Prisma.ShowtimeTicketTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ShowtimeTicketTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ShowtimeTicketTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ShowtimeTicketTypes.
     */
    distinct?: Prisma.ShowtimeTicketTypeScalarFieldEnum | Prisma.ShowtimeTicketTypeScalarFieldEnum[];
};
/**
 * ShowtimeTicketType findMany
 */
export type ShowtimeTicketTypeFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeInclude<ExtArgs> | null;
    /**
     * Filter, which ShowtimeTicketTypes to fetch.
     */
    where?: Prisma.ShowtimeTicketTypeWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of ShowtimeTicketTypes to fetch.
     */
    orderBy?: Prisma.ShowtimeTicketTypeOrderByWithRelationInput | Prisma.ShowtimeTicketTypeOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing ShowtimeTicketTypes.
     */
    cursor?: Prisma.ShowtimeTicketTypeWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` ShowtimeTicketTypes from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` ShowtimeTicketTypes.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of ShowtimeTicketTypes.
     */
    distinct?: Prisma.ShowtimeTicketTypeScalarFieldEnum | Prisma.ShowtimeTicketTypeScalarFieldEnum[];
};
/**
 * ShowtimeTicketType create
 */
export type ShowtimeTicketTypeCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeInclude<ExtArgs> | null;
    /**
     * The data needed to create a ShowtimeTicketType.
     */
    data: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateInput, Prisma.ShowtimeTicketTypeUncheckedCreateInput>;
};
/**
 * ShowtimeTicketType createMany
 */
export type ShowtimeTicketTypeCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many ShowtimeTicketTypes.
     */
    data: Prisma.ShowtimeTicketTypeCreateManyInput | Prisma.ShowtimeTicketTypeCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * ShowtimeTicketType createManyAndReturn
 */
export type ShowtimeTicketTypeCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * The data used to create many ShowtimeTicketTypes.
     */
    data: Prisma.ShowtimeTicketTypeCreateManyInput | Prisma.ShowtimeTicketTypeCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * ShowtimeTicketType update
 */
export type ShowtimeTicketTypeUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeInclude<ExtArgs> | null;
    /**
     * The data needed to update a ShowtimeTicketType.
     */
    data: Prisma.XOR<Prisma.ShowtimeTicketTypeUpdateInput, Prisma.ShowtimeTicketTypeUncheckedUpdateInput>;
    /**
     * Choose, which ShowtimeTicketType to update.
     */
    where: Prisma.ShowtimeTicketTypeWhereUniqueInput;
};
/**
 * ShowtimeTicketType updateMany
 */
export type ShowtimeTicketTypeUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update ShowtimeTicketTypes.
     */
    data: Prisma.XOR<Prisma.ShowtimeTicketTypeUpdateManyMutationInput, Prisma.ShowtimeTicketTypeUncheckedUpdateManyInput>;
    /**
     * Filter which ShowtimeTicketTypes to update
     */
    where?: Prisma.ShowtimeTicketTypeWhereInput;
    /**
     * Limit how many ShowtimeTicketTypes to update.
     */
    limit?: number;
};
/**
 * ShowtimeTicketType updateManyAndReturn
 */
export type ShowtimeTicketTypeUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * The data used to update ShowtimeTicketTypes.
     */
    data: Prisma.XOR<Prisma.ShowtimeTicketTypeUpdateManyMutationInput, Prisma.ShowtimeTicketTypeUncheckedUpdateManyInput>;
    /**
     * Filter which ShowtimeTicketTypes to update
     */
    where?: Prisma.ShowtimeTicketTypeWhereInput;
    /**
     * Limit how many ShowtimeTicketTypes to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * ShowtimeTicketType upsert
 */
export type ShowtimeTicketTypeUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeInclude<ExtArgs> | null;
    /**
     * The filter to search for the ShowtimeTicketType to update in case it exists.
     */
    where: Prisma.ShowtimeTicketTypeWhereUniqueInput;
    /**
     * In case the ShowtimeTicketType found by the `where` argument doesn't exist, create a new ShowtimeTicketType with this data.
     */
    create: Prisma.XOR<Prisma.ShowtimeTicketTypeCreateInput, Prisma.ShowtimeTicketTypeUncheckedCreateInput>;
    /**
     * In case the ShowtimeTicketType was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.ShowtimeTicketTypeUpdateInput, Prisma.ShowtimeTicketTypeUncheckedUpdateInput>;
};
/**
 * ShowtimeTicketType delete
 */
export type ShowtimeTicketTypeDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeInclude<ExtArgs> | null;
    /**
     * Filter which ShowtimeTicketType to delete.
     */
    where: Prisma.ShowtimeTicketTypeWhereUniqueInput;
};
/**
 * ShowtimeTicketType deleteMany
 */
export type ShowtimeTicketTypeDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which ShowtimeTicketTypes to delete
     */
    where?: Prisma.ShowtimeTicketTypeWhereInput;
    /**
     * Limit how many ShowtimeTicketTypes to delete.
     */
    limit?: number;
};
/**
 * ShowtimeTicketType without action
 */
export type ShowtimeTicketTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeTicketType
     */
    select?: Prisma.ShowtimeTicketTypeSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeTicketType
     */
    omit?: Prisma.ShowtimeTicketTypeOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeTicketTypeInclude<ExtArgs> | null;
};
//# sourceMappingURL=ShowtimeTicketType.d.ts.map
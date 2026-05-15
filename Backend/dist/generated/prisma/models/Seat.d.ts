import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Seat
 *
 */
export type SeatModel = runtime.Types.Result.DefaultSelection<Prisma.$SeatPayload>;
export type AggregateSeat = {
    _count: SeatCountAggregateOutputType | null;
    _avg: SeatAvgAggregateOutputType | null;
    _sum: SeatSumAggregateOutputType | null;
    _min: SeatMinAggregateOutputType | null;
    _max: SeatMaxAggregateOutputType | null;
};
export type SeatAvgAggregateOutputType = {
    seatNumber: number | null;
    extraPrice: number | null;
};
export type SeatSumAggregateOutputType = {
    seatNumber: number | null;
    extraPrice: number | null;
};
export type SeatMinAggregateOutputType = {
    id: string | null;
    roomId: string | null;
    seatRow: string | null;
    seatNumber: number | null;
    seatCode: string | null;
    seatType: $Enums.SeatType | null;
    extraPrice: number | null;
    createdAt: Date | null;
};
export type SeatMaxAggregateOutputType = {
    id: string | null;
    roomId: string | null;
    seatRow: string | null;
    seatNumber: number | null;
    seatCode: string | null;
    seatType: $Enums.SeatType | null;
    extraPrice: number | null;
    createdAt: Date | null;
};
export type SeatCountAggregateOutputType = {
    id: number;
    roomId: number;
    seatRow: number;
    seatNumber: number;
    seatCode: number;
    seatType: number;
    extraPrice: number;
    createdAt: number;
    _all: number;
};
export type SeatAvgAggregateInputType = {
    seatNumber?: true;
    extraPrice?: true;
};
export type SeatSumAggregateInputType = {
    seatNumber?: true;
    extraPrice?: true;
};
export type SeatMinAggregateInputType = {
    id?: true;
    roomId?: true;
    seatRow?: true;
    seatNumber?: true;
    seatCode?: true;
    seatType?: true;
    extraPrice?: true;
    createdAt?: true;
};
export type SeatMaxAggregateInputType = {
    id?: true;
    roomId?: true;
    seatRow?: true;
    seatNumber?: true;
    seatCode?: true;
    seatType?: true;
    extraPrice?: true;
    createdAt?: true;
};
export type SeatCountAggregateInputType = {
    id?: true;
    roomId?: true;
    seatRow?: true;
    seatNumber?: true;
    seatCode?: true;
    seatType?: true;
    extraPrice?: true;
    createdAt?: true;
    _all?: true;
};
export type SeatAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Seat to aggregate.
     */
    where?: Prisma.SeatWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Seats to fetch.
     */
    orderBy?: Prisma.SeatOrderByWithRelationInput | Prisma.SeatOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.SeatWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Seats.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Seats
    **/
    _count?: true | SeatCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: SeatAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: SeatSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: SeatMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: SeatMaxAggregateInputType;
};
export type GetSeatAggregateType<T extends SeatAggregateArgs> = {
    [P in keyof T & keyof AggregateSeat]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateSeat[P]> : Prisma.GetScalarType<T[P], AggregateSeat[P]>;
};
export type SeatGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.SeatWhereInput;
    orderBy?: Prisma.SeatOrderByWithAggregationInput | Prisma.SeatOrderByWithAggregationInput[];
    by: Prisma.SeatScalarFieldEnum[] | Prisma.SeatScalarFieldEnum;
    having?: Prisma.SeatScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: SeatCountAggregateInputType | true;
    _avg?: SeatAvgAggregateInputType;
    _sum?: SeatSumAggregateInputType;
    _min?: SeatMinAggregateInputType;
    _max?: SeatMaxAggregateInputType;
};
export type SeatGroupByOutputType = {
    id: string;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: $Enums.SeatType;
    extraPrice: number;
    createdAt: Date;
    _count: SeatCountAggregateOutputType | null;
    _avg: SeatAvgAggregateOutputType | null;
    _sum: SeatSumAggregateOutputType | null;
    _min: SeatMinAggregateOutputType | null;
    _max: SeatMaxAggregateOutputType | null;
};
export type GetSeatGroupByPayload<T extends SeatGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<SeatGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof SeatGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], SeatGroupByOutputType[P]> : Prisma.GetScalarType<T[P], SeatGroupByOutputType[P]>;
}>>;
export type SeatWhereInput = {
    AND?: Prisma.SeatWhereInput | Prisma.SeatWhereInput[];
    OR?: Prisma.SeatWhereInput[];
    NOT?: Prisma.SeatWhereInput | Prisma.SeatWhereInput[];
    id?: Prisma.StringFilter<"Seat"> | string;
    roomId?: Prisma.StringFilter<"Seat"> | string;
    seatRow?: Prisma.StringFilter<"Seat"> | string;
    seatNumber?: Prisma.IntFilter<"Seat"> | number;
    seatCode?: Prisma.StringFilter<"Seat"> | string;
    seatType?: Prisma.EnumSeatTypeFilter<"Seat"> | $Enums.SeatType;
    extraPrice?: Prisma.FloatFilter<"Seat"> | number;
    createdAt?: Prisma.DateTimeFilter<"Seat"> | Date | string;
    room?: Prisma.XOR<Prisma.CinemaRoomScalarRelationFilter, Prisma.CinemaRoomWhereInput>;
    showtimeSeats?: Prisma.ShowtimeSeatListRelationFilter;
};
export type SeatOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    seatRow?: Prisma.SortOrder;
    seatNumber?: Prisma.SortOrder;
    seatCode?: Prisma.SortOrder;
    seatType?: Prisma.SortOrder;
    extraPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    room?: Prisma.CinemaRoomOrderByWithRelationInput;
    showtimeSeats?: Prisma.ShowtimeSeatOrderByRelationAggregateInput;
};
export type SeatWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    AND?: Prisma.SeatWhereInput | Prisma.SeatWhereInput[];
    OR?: Prisma.SeatWhereInput[];
    NOT?: Prisma.SeatWhereInput | Prisma.SeatWhereInput[];
    roomId?: Prisma.StringFilter<"Seat"> | string;
    seatRow?: Prisma.StringFilter<"Seat"> | string;
    seatNumber?: Prisma.IntFilter<"Seat"> | number;
    seatCode?: Prisma.StringFilter<"Seat"> | string;
    seatType?: Prisma.EnumSeatTypeFilter<"Seat"> | $Enums.SeatType;
    extraPrice?: Prisma.FloatFilter<"Seat"> | number;
    createdAt?: Prisma.DateTimeFilter<"Seat"> | Date | string;
    room?: Prisma.XOR<Prisma.CinemaRoomScalarRelationFilter, Prisma.CinemaRoomWhereInput>;
    showtimeSeats?: Prisma.ShowtimeSeatListRelationFilter;
}, "id">;
export type SeatOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    seatRow?: Prisma.SortOrder;
    seatNumber?: Prisma.SortOrder;
    seatCode?: Prisma.SortOrder;
    seatType?: Prisma.SortOrder;
    extraPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
    _count?: Prisma.SeatCountOrderByAggregateInput;
    _avg?: Prisma.SeatAvgOrderByAggregateInput;
    _max?: Prisma.SeatMaxOrderByAggregateInput;
    _min?: Prisma.SeatMinOrderByAggregateInput;
    _sum?: Prisma.SeatSumOrderByAggregateInput;
};
export type SeatScalarWhereWithAggregatesInput = {
    AND?: Prisma.SeatScalarWhereWithAggregatesInput | Prisma.SeatScalarWhereWithAggregatesInput[];
    OR?: Prisma.SeatScalarWhereWithAggregatesInput[];
    NOT?: Prisma.SeatScalarWhereWithAggregatesInput | Prisma.SeatScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Seat"> | string;
    roomId?: Prisma.StringWithAggregatesFilter<"Seat"> | string;
    seatRow?: Prisma.StringWithAggregatesFilter<"Seat"> | string;
    seatNumber?: Prisma.IntWithAggregatesFilter<"Seat"> | number;
    seatCode?: Prisma.StringWithAggregatesFilter<"Seat"> | string;
    seatType?: Prisma.EnumSeatTypeWithAggregatesFilter<"Seat"> | $Enums.SeatType;
    extraPrice?: Prisma.FloatWithAggregatesFilter<"Seat"> | number;
    createdAt?: Prisma.DateTimeWithAggregatesFilter<"Seat"> | Date | string;
};
export type SeatCreateInput = {
    id?: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: $Enums.SeatType;
    extraPrice?: number;
    createdAt?: Date | string;
    room: Prisma.CinemaRoomCreateNestedOneWithoutSeatsInput;
    showtimeSeats?: Prisma.ShowtimeSeatCreateNestedManyWithoutSeatInput;
};
export type SeatUncheckedCreateInput = {
    id?: string;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: $Enums.SeatType;
    extraPrice?: number;
    createdAt?: Date | string;
    showtimeSeats?: Prisma.ShowtimeSeatUncheckedCreateNestedManyWithoutSeatInput;
};
export type SeatUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    seatRow?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seatCode?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.EnumSeatTypeFieldUpdateOperationsInput | $Enums.SeatType;
    extraPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.CinemaRoomUpdateOneRequiredWithoutSeatsNestedInput;
    showtimeSeats?: Prisma.ShowtimeSeatUpdateManyWithoutSeatNestedInput;
};
export type SeatUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    seatRow?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seatCode?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.EnumSeatTypeFieldUpdateOperationsInput | $Enums.SeatType;
    extraPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    showtimeSeats?: Prisma.ShowtimeSeatUncheckedUpdateManyWithoutSeatNestedInput;
};
export type SeatCreateManyInput = {
    id?: string;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: $Enums.SeatType;
    extraPrice?: number;
    createdAt?: Date | string;
};
export type SeatUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    seatRow?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seatCode?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.EnumSeatTypeFieldUpdateOperationsInput | $Enums.SeatType;
    extraPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SeatUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    seatRow?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seatCode?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.EnumSeatTypeFieldUpdateOperationsInput | $Enums.SeatType;
    extraPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SeatListRelationFilter = {
    every?: Prisma.SeatWhereInput;
    some?: Prisma.SeatWhereInput;
    none?: Prisma.SeatWhereInput;
};
export type SeatOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type SeatCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    seatRow?: Prisma.SortOrder;
    seatNumber?: Prisma.SortOrder;
    seatCode?: Prisma.SortOrder;
    seatType?: Prisma.SortOrder;
    extraPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SeatAvgOrderByAggregateInput = {
    seatNumber?: Prisma.SortOrder;
    extraPrice?: Prisma.SortOrder;
};
export type SeatMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    seatRow?: Prisma.SortOrder;
    seatNumber?: Prisma.SortOrder;
    seatCode?: Prisma.SortOrder;
    seatType?: Prisma.SortOrder;
    extraPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SeatMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    roomId?: Prisma.SortOrder;
    seatRow?: Prisma.SortOrder;
    seatNumber?: Prisma.SortOrder;
    seatCode?: Prisma.SortOrder;
    seatType?: Prisma.SortOrder;
    extraPrice?: Prisma.SortOrder;
    createdAt?: Prisma.SortOrder;
};
export type SeatSumOrderByAggregateInput = {
    seatNumber?: Prisma.SortOrder;
    extraPrice?: Prisma.SortOrder;
};
export type SeatScalarRelationFilter = {
    is?: Prisma.SeatWhereInput;
    isNot?: Prisma.SeatWhereInput;
};
export type SeatCreateNestedManyWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.SeatCreateWithoutRoomInput, Prisma.SeatUncheckedCreateWithoutRoomInput> | Prisma.SeatCreateWithoutRoomInput[] | Prisma.SeatUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.SeatCreateOrConnectWithoutRoomInput | Prisma.SeatCreateOrConnectWithoutRoomInput[];
    createMany?: Prisma.SeatCreateManyRoomInputEnvelope;
    connect?: Prisma.SeatWhereUniqueInput | Prisma.SeatWhereUniqueInput[];
};
export type SeatUncheckedCreateNestedManyWithoutRoomInput = {
    create?: Prisma.XOR<Prisma.SeatCreateWithoutRoomInput, Prisma.SeatUncheckedCreateWithoutRoomInput> | Prisma.SeatCreateWithoutRoomInput[] | Prisma.SeatUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.SeatCreateOrConnectWithoutRoomInput | Prisma.SeatCreateOrConnectWithoutRoomInput[];
    createMany?: Prisma.SeatCreateManyRoomInputEnvelope;
    connect?: Prisma.SeatWhereUniqueInput | Prisma.SeatWhereUniqueInput[];
};
export type SeatUpdateManyWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.SeatCreateWithoutRoomInput, Prisma.SeatUncheckedCreateWithoutRoomInput> | Prisma.SeatCreateWithoutRoomInput[] | Prisma.SeatUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.SeatCreateOrConnectWithoutRoomInput | Prisma.SeatCreateOrConnectWithoutRoomInput[];
    upsert?: Prisma.SeatUpsertWithWhereUniqueWithoutRoomInput | Prisma.SeatUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: Prisma.SeatCreateManyRoomInputEnvelope;
    set?: Prisma.SeatWhereUniqueInput | Prisma.SeatWhereUniqueInput[];
    disconnect?: Prisma.SeatWhereUniqueInput | Prisma.SeatWhereUniqueInput[];
    delete?: Prisma.SeatWhereUniqueInput | Prisma.SeatWhereUniqueInput[];
    connect?: Prisma.SeatWhereUniqueInput | Prisma.SeatWhereUniqueInput[];
    update?: Prisma.SeatUpdateWithWhereUniqueWithoutRoomInput | Prisma.SeatUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?: Prisma.SeatUpdateManyWithWhereWithoutRoomInput | Prisma.SeatUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: Prisma.SeatScalarWhereInput | Prisma.SeatScalarWhereInput[];
};
export type SeatUncheckedUpdateManyWithoutRoomNestedInput = {
    create?: Prisma.XOR<Prisma.SeatCreateWithoutRoomInput, Prisma.SeatUncheckedCreateWithoutRoomInput> | Prisma.SeatCreateWithoutRoomInput[] | Prisma.SeatUncheckedCreateWithoutRoomInput[];
    connectOrCreate?: Prisma.SeatCreateOrConnectWithoutRoomInput | Prisma.SeatCreateOrConnectWithoutRoomInput[];
    upsert?: Prisma.SeatUpsertWithWhereUniqueWithoutRoomInput | Prisma.SeatUpsertWithWhereUniqueWithoutRoomInput[];
    createMany?: Prisma.SeatCreateManyRoomInputEnvelope;
    set?: Prisma.SeatWhereUniqueInput | Prisma.SeatWhereUniqueInput[];
    disconnect?: Prisma.SeatWhereUniqueInput | Prisma.SeatWhereUniqueInput[];
    delete?: Prisma.SeatWhereUniqueInput | Prisma.SeatWhereUniqueInput[];
    connect?: Prisma.SeatWhereUniqueInput | Prisma.SeatWhereUniqueInput[];
    update?: Prisma.SeatUpdateWithWhereUniqueWithoutRoomInput | Prisma.SeatUpdateWithWhereUniqueWithoutRoomInput[];
    updateMany?: Prisma.SeatUpdateManyWithWhereWithoutRoomInput | Prisma.SeatUpdateManyWithWhereWithoutRoomInput[];
    deleteMany?: Prisma.SeatScalarWhereInput | Prisma.SeatScalarWhereInput[];
};
export type EnumSeatTypeFieldUpdateOperationsInput = {
    set?: $Enums.SeatType;
};
export type SeatCreateNestedOneWithoutShowtimeSeatsInput = {
    create?: Prisma.XOR<Prisma.SeatCreateWithoutShowtimeSeatsInput, Prisma.SeatUncheckedCreateWithoutShowtimeSeatsInput>;
    connectOrCreate?: Prisma.SeatCreateOrConnectWithoutShowtimeSeatsInput;
    connect?: Prisma.SeatWhereUniqueInput;
};
export type SeatUpdateOneRequiredWithoutShowtimeSeatsNestedInput = {
    create?: Prisma.XOR<Prisma.SeatCreateWithoutShowtimeSeatsInput, Prisma.SeatUncheckedCreateWithoutShowtimeSeatsInput>;
    connectOrCreate?: Prisma.SeatCreateOrConnectWithoutShowtimeSeatsInput;
    upsert?: Prisma.SeatUpsertWithoutShowtimeSeatsInput;
    connect?: Prisma.SeatWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.SeatUpdateToOneWithWhereWithoutShowtimeSeatsInput, Prisma.SeatUpdateWithoutShowtimeSeatsInput>, Prisma.SeatUncheckedUpdateWithoutShowtimeSeatsInput>;
};
export type SeatCreateWithoutRoomInput = {
    id?: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: $Enums.SeatType;
    extraPrice?: number;
    createdAt?: Date | string;
    showtimeSeats?: Prisma.ShowtimeSeatCreateNestedManyWithoutSeatInput;
};
export type SeatUncheckedCreateWithoutRoomInput = {
    id?: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: $Enums.SeatType;
    extraPrice?: number;
    createdAt?: Date | string;
    showtimeSeats?: Prisma.ShowtimeSeatUncheckedCreateNestedManyWithoutSeatInput;
};
export type SeatCreateOrConnectWithoutRoomInput = {
    where: Prisma.SeatWhereUniqueInput;
    create: Prisma.XOR<Prisma.SeatCreateWithoutRoomInput, Prisma.SeatUncheckedCreateWithoutRoomInput>;
};
export type SeatCreateManyRoomInputEnvelope = {
    data: Prisma.SeatCreateManyRoomInput | Prisma.SeatCreateManyRoomInput[];
    skipDuplicates?: boolean;
};
export type SeatUpsertWithWhereUniqueWithoutRoomInput = {
    where: Prisma.SeatWhereUniqueInput;
    update: Prisma.XOR<Prisma.SeatUpdateWithoutRoomInput, Prisma.SeatUncheckedUpdateWithoutRoomInput>;
    create: Prisma.XOR<Prisma.SeatCreateWithoutRoomInput, Prisma.SeatUncheckedCreateWithoutRoomInput>;
};
export type SeatUpdateWithWhereUniqueWithoutRoomInput = {
    where: Prisma.SeatWhereUniqueInput;
    data: Prisma.XOR<Prisma.SeatUpdateWithoutRoomInput, Prisma.SeatUncheckedUpdateWithoutRoomInput>;
};
export type SeatUpdateManyWithWhereWithoutRoomInput = {
    where: Prisma.SeatScalarWhereInput;
    data: Prisma.XOR<Prisma.SeatUpdateManyMutationInput, Prisma.SeatUncheckedUpdateManyWithoutRoomInput>;
};
export type SeatScalarWhereInput = {
    AND?: Prisma.SeatScalarWhereInput | Prisma.SeatScalarWhereInput[];
    OR?: Prisma.SeatScalarWhereInput[];
    NOT?: Prisma.SeatScalarWhereInput | Prisma.SeatScalarWhereInput[];
    id?: Prisma.StringFilter<"Seat"> | string;
    roomId?: Prisma.StringFilter<"Seat"> | string;
    seatRow?: Prisma.StringFilter<"Seat"> | string;
    seatNumber?: Prisma.IntFilter<"Seat"> | number;
    seatCode?: Prisma.StringFilter<"Seat"> | string;
    seatType?: Prisma.EnumSeatTypeFilter<"Seat"> | $Enums.SeatType;
    extraPrice?: Prisma.FloatFilter<"Seat"> | number;
    createdAt?: Prisma.DateTimeFilter<"Seat"> | Date | string;
};
export type SeatCreateWithoutShowtimeSeatsInput = {
    id?: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: $Enums.SeatType;
    extraPrice?: number;
    createdAt?: Date | string;
    room: Prisma.CinemaRoomCreateNestedOneWithoutSeatsInput;
};
export type SeatUncheckedCreateWithoutShowtimeSeatsInput = {
    id?: string;
    roomId: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: $Enums.SeatType;
    extraPrice?: number;
    createdAt?: Date | string;
};
export type SeatCreateOrConnectWithoutShowtimeSeatsInput = {
    where: Prisma.SeatWhereUniqueInput;
    create: Prisma.XOR<Prisma.SeatCreateWithoutShowtimeSeatsInput, Prisma.SeatUncheckedCreateWithoutShowtimeSeatsInput>;
};
export type SeatUpsertWithoutShowtimeSeatsInput = {
    update: Prisma.XOR<Prisma.SeatUpdateWithoutShowtimeSeatsInput, Prisma.SeatUncheckedUpdateWithoutShowtimeSeatsInput>;
    create: Prisma.XOR<Prisma.SeatCreateWithoutShowtimeSeatsInput, Prisma.SeatUncheckedCreateWithoutShowtimeSeatsInput>;
    where?: Prisma.SeatWhereInput;
};
export type SeatUpdateToOneWithWhereWithoutShowtimeSeatsInput = {
    where?: Prisma.SeatWhereInput;
    data: Prisma.XOR<Prisma.SeatUpdateWithoutShowtimeSeatsInput, Prisma.SeatUncheckedUpdateWithoutShowtimeSeatsInput>;
};
export type SeatUpdateWithoutShowtimeSeatsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    seatRow?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seatCode?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.EnumSeatTypeFieldUpdateOperationsInput | $Enums.SeatType;
    extraPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    room?: Prisma.CinemaRoomUpdateOneRequiredWithoutSeatsNestedInput;
};
export type SeatUncheckedUpdateWithoutShowtimeSeatsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    roomId?: Prisma.StringFieldUpdateOperationsInput | string;
    seatRow?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seatCode?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.EnumSeatTypeFieldUpdateOperationsInput | $Enums.SeatType;
    extraPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
export type SeatCreateManyRoomInput = {
    id?: string;
    seatRow: string;
    seatNumber: number;
    seatCode: string;
    seatType: $Enums.SeatType;
    extraPrice?: number;
    createdAt?: Date | string;
};
export type SeatUpdateWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    seatRow?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seatCode?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.EnumSeatTypeFieldUpdateOperationsInput | $Enums.SeatType;
    extraPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    showtimeSeats?: Prisma.ShowtimeSeatUpdateManyWithoutSeatNestedInput;
};
export type SeatUncheckedUpdateWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    seatRow?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seatCode?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.EnumSeatTypeFieldUpdateOperationsInput | $Enums.SeatType;
    extraPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    showtimeSeats?: Prisma.ShowtimeSeatUncheckedUpdateManyWithoutSeatNestedInput;
};
export type SeatUncheckedUpdateManyWithoutRoomInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    seatRow?: Prisma.StringFieldUpdateOperationsInput | string;
    seatNumber?: Prisma.IntFieldUpdateOperationsInput | number;
    seatCode?: Prisma.StringFieldUpdateOperationsInput | string;
    seatType?: Prisma.EnumSeatTypeFieldUpdateOperationsInput | $Enums.SeatType;
    extraPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    createdAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
};
/**
 * Count Type SeatCountOutputType
 */
export type SeatCountOutputType = {
    showtimeSeats: number;
};
export type SeatCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    showtimeSeats?: boolean | SeatCountOutputTypeCountShowtimeSeatsArgs;
};
/**
 * SeatCountOutputType without action
 */
export type SeatCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SeatCountOutputType
     */
    select?: Prisma.SeatCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * SeatCountOutputType without action
 */
export type SeatCountOutputTypeCountShowtimeSeatsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.ShowtimeSeatWhereInput;
};
export type SeatSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    seatRow?: boolean;
    seatNumber?: boolean;
    seatCode?: boolean;
    seatType?: boolean;
    extraPrice?: boolean;
    createdAt?: boolean;
    room?: boolean | Prisma.CinemaRoomDefaultArgs<ExtArgs>;
    showtimeSeats?: boolean | Prisma.Seat$showtimeSeatsArgs<ExtArgs>;
    _count?: boolean | Prisma.SeatCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["seat"]>;
export type SeatSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    seatRow?: boolean;
    seatNumber?: boolean;
    seatCode?: boolean;
    seatType?: boolean;
    extraPrice?: boolean;
    createdAt?: boolean;
    room?: boolean | Prisma.CinemaRoomDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["seat"]>;
export type SeatSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    roomId?: boolean;
    seatRow?: boolean;
    seatNumber?: boolean;
    seatCode?: boolean;
    seatType?: boolean;
    extraPrice?: boolean;
    createdAt?: boolean;
    room?: boolean | Prisma.CinemaRoomDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["seat"]>;
export type SeatSelectScalar = {
    id?: boolean;
    roomId?: boolean;
    seatRow?: boolean;
    seatNumber?: boolean;
    seatCode?: boolean;
    seatType?: boolean;
    extraPrice?: boolean;
    createdAt?: boolean;
};
export type SeatOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "roomId" | "seatRow" | "seatNumber" | "seatCode" | "seatType" | "extraPrice" | "createdAt", ExtArgs["result"]["seat"]>;
export type SeatInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.CinemaRoomDefaultArgs<ExtArgs>;
    showtimeSeats?: boolean | Prisma.Seat$showtimeSeatsArgs<ExtArgs>;
    _count?: boolean | Prisma.SeatCountOutputTypeDefaultArgs<ExtArgs>;
};
export type SeatIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.CinemaRoomDefaultArgs<ExtArgs>;
};
export type SeatIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    room?: boolean | Prisma.CinemaRoomDefaultArgs<ExtArgs>;
};
export type $SeatPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Seat";
    objects: {
        room: Prisma.$CinemaRoomPayload<ExtArgs>;
        showtimeSeats: Prisma.$ShowtimeSeatPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        roomId: string;
        seatRow: string;
        seatNumber: number;
        seatCode: string;
        seatType: $Enums.SeatType;
        extraPrice: number;
        createdAt: Date;
    }, ExtArgs["result"]["seat"]>;
    composites: {};
};
export type SeatGetPayload<S extends boolean | null | undefined | SeatDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$SeatPayload, S>;
export type SeatCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<SeatFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: SeatCountAggregateInputType | true;
};
export interface SeatDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Seat'];
        meta: {
            name: 'Seat';
        };
    };
    /**
     * Find zero or one Seat that matches the filter.
     * @param {SeatFindUniqueArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SeatFindUniqueArgs>(args: Prisma.SelectSubset<T, SeatFindUniqueArgs<ExtArgs>>): Prisma.Prisma__SeatClient<runtime.Types.Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Seat that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SeatFindUniqueOrThrowArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SeatFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, SeatFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__SeatClient<runtime.Types.Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Seat that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindFirstArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SeatFindFirstArgs>(args?: Prisma.SelectSubset<T, SeatFindFirstArgs<ExtArgs>>): Prisma.Prisma__SeatClient<runtime.Types.Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Seat that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindFirstOrThrowArgs} args - Arguments to find a Seat
     * @example
     * // Get one Seat
     * const seat = await prisma.seat.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SeatFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, SeatFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__SeatClient<runtime.Types.Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Seats that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Seats
     * const seats = await prisma.seat.findMany()
     *
     * // Get first 10 Seats
     * const seats = await prisma.seat.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const seatWithIdOnly = await prisma.seat.findMany({ select: { id: true } })
     *
     */
    findMany<T extends SeatFindManyArgs>(args?: Prisma.SelectSubset<T, SeatFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Seat.
     * @param {SeatCreateArgs} args - Arguments to create a Seat.
     * @example
     * // Create one Seat
     * const Seat = await prisma.seat.create({
     *   data: {
     *     // ... data to create a Seat
     *   }
     * })
     *
     */
    create<T extends SeatCreateArgs>(args: Prisma.SelectSubset<T, SeatCreateArgs<ExtArgs>>): Prisma.Prisma__SeatClient<runtime.Types.Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Seats.
     * @param {SeatCreateManyArgs} args - Arguments to create many Seats.
     * @example
     * // Create many Seats
     * const seat = await prisma.seat.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends SeatCreateManyArgs>(args?: Prisma.SelectSubset<T, SeatCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Seats and returns the data saved in the database.
     * @param {SeatCreateManyAndReturnArgs} args - Arguments to create many Seats.
     * @example
     * // Create many Seats
     * const seat = await prisma.seat.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Seats and only return the `id`
     * const seatWithIdOnly = await prisma.seat.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends SeatCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, SeatCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Seat.
     * @param {SeatDeleteArgs} args - Arguments to delete one Seat.
     * @example
     * // Delete one Seat
     * const Seat = await prisma.seat.delete({
     *   where: {
     *     // ... filter to delete one Seat
     *   }
     * })
     *
     */
    delete<T extends SeatDeleteArgs>(args: Prisma.SelectSubset<T, SeatDeleteArgs<ExtArgs>>): Prisma.Prisma__SeatClient<runtime.Types.Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Seat.
     * @param {SeatUpdateArgs} args - Arguments to update one Seat.
     * @example
     * // Update one Seat
     * const seat = await prisma.seat.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends SeatUpdateArgs>(args: Prisma.SelectSubset<T, SeatUpdateArgs<ExtArgs>>): Prisma.Prisma__SeatClient<runtime.Types.Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Seats.
     * @param {SeatDeleteManyArgs} args - Arguments to filter Seats to delete.
     * @example
     * // Delete a few Seats
     * const { count } = await prisma.seat.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends SeatDeleteManyArgs>(args?: Prisma.SelectSubset<T, SeatDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Seats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Seats
     * const seat = await prisma.seat.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends SeatUpdateManyArgs>(args: Prisma.SelectSubset<T, SeatUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Seats and returns the data updated in the database.
     * @param {SeatUpdateManyAndReturnArgs} args - Arguments to update many Seats.
     * @example
     * // Update many Seats
     * const seat = await prisma.seat.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Seats and only return the `id`
     * const seatWithIdOnly = await prisma.seat.updateManyAndReturn({
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
    updateManyAndReturn<T extends SeatUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, SeatUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Seat.
     * @param {SeatUpsertArgs} args - Arguments to update or create a Seat.
     * @example
     * // Update or create a Seat
     * const seat = await prisma.seat.upsert({
     *   create: {
     *     // ... data to create a Seat
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Seat we want to update
     *   }
     * })
     */
    upsert<T extends SeatUpsertArgs>(args: Prisma.SelectSubset<T, SeatUpsertArgs<ExtArgs>>): Prisma.Prisma__SeatClient<runtime.Types.Result.GetResult<Prisma.$SeatPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Seats.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatCountArgs} args - Arguments to filter Seats to count.
     * @example
     * // Count the number of Seats
     * const count = await prisma.seat.count({
     *   where: {
     *     // ... the filter for the Seats we want to count
     *   }
     * })
    **/
    count<T extends SeatCountArgs>(args?: Prisma.Subset<T, SeatCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], SeatCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Seat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SeatAggregateArgs>(args: Prisma.Subset<T, SeatAggregateArgs>): Prisma.PrismaPromise<GetSeatAggregateType<T>>;
    /**
     * Group by Seat.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SeatGroupByArgs} args - Group by arguments.
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
    groupBy<T extends SeatGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: SeatGroupByArgs['orderBy'];
    } : {
        orderBy?: SeatGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, SeatGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSeatGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Seat model
     */
    readonly fields: SeatFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Seat.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__SeatClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    room<T extends Prisma.CinemaRoomDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.CinemaRoomDefaultArgs<ExtArgs>>): Prisma.Prisma__CinemaRoomClient<runtime.Types.Result.GetResult<Prisma.$CinemaRoomPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    showtimeSeats<T extends Prisma.Seat$showtimeSeatsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Seat$showtimeSeatsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$ShowtimeSeatPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Seat model
 */
export interface SeatFieldRefs {
    readonly id: Prisma.FieldRef<"Seat", 'String'>;
    readonly roomId: Prisma.FieldRef<"Seat", 'String'>;
    readonly seatRow: Prisma.FieldRef<"Seat", 'String'>;
    readonly seatNumber: Prisma.FieldRef<"Seat", 'Int'>;
    readonly seatCode: Prisma.FieldRef<"Seat", 'String'>;
    readonly seatType: Prisma.FieldRef<"Seat", 'SeatType'>;
    readonly extraPrice: Prisma.FieldRef<"Seat", 'Float'>;
    readonly createdAt: Prisma.FieldRef<"Seat", 'DateTime'>;
}
/**
 * Seat findUnique
 */
export type SeatFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatInclude<ExtArgs> | null;
    /**
     * Filter, which Seat to fetch.
     */
    where: Prisma.SeatWhereUniqueInput;
};
/**
 * Seat findUniqueOrThrow
 */
export type SeatFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatInclude<ExtArgs> | null;
    /**
     * Filter, which Seat to fetch.
     */
    where: Prisma.SeatWhereUniqueInput;
};
/**
 * Seat findFirst
 */
export type SeatFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatInclude<ExtArgs> | null;
    /**
     * Filter, which Seat to fetch.
     */
    where?: Prisma.SeatWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Seats to fetch.
     */
    orderBy?: Prisma.SeatOrderByWithRelationInput | Prisma.SeatOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Seats.
     */
    cursor?: Prisma.SeatWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Seats.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Seats.
     */
    distinct?: Prisma.SeatScalarFieldEnum | Prisma.SeatScalarFieldEnum[];
};
/**
 * Seat findFirstOrThrow
 */
export type SeatFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatInclude<ExtArgs> | null;
    /**
     * Filter, which Seat to fetch.
     */
    where?: Prisma.SeatWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Seats to fetch.
     */
    orderBy?: Prisma.SeatOrderByWithRelationInput | Prisma.SeatOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Seats.
     */
    cursor?: Prisma.SeatWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Seats.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Seats.
     */
    distinct?: Prisma.SeatScalarFieldEnum | Prisma.SeatScalarFieldEnum[];
};
/**
 * Seat findMany
 */
export type SeatFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatInclude<ExtArgs> | null;
    /**
     * Filter, which Seats to fetch.
     */
    where?: Prisma.SeatWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Seats to fetch.
     */
    orderBy?: Prisma.SeatOrderByWithRelationInput | Prisma.SeatOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Seats.
     */
    cursor?: Prisma.SeatWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Seats from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Seats.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Seats.
     */
    distinct?: Prisma.SeatScalarFieldEnum | Prisma.SeatScalarFieldEnum[];
};
/**
 * Seat create
 */
export type SeatCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatInclude<ExtArgs> | null;
    /**
     * The data needed to create a Seat.
     */
    data: Prisma.XOR<Prisma.SeatCreateInput, Prisma.SeatUncheckedCreateInput>;
};
/**
 * Seat createMany
 */
export type SeatCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Seats.
     */
    data: Prisma.SeatCreateManyInput | Prisma.SeatCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Seat createManyAndReturn
 */
export type SeatCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * The data used to create many Seats.
     */
    data: Prisma.SeatCreateManyInput | Prisma.SeatCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Seat update
 */
export type SeatUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatInclude<ExtArgs> | null;
    /**
     * The data needed to update a Seat.
     */
    data: Prisma.XOR<Prisma.SeatUpdateInput, Prisma.SeatUncheckedUpdateInput>;
    /**
     * Choose, which Seat to update.
     */
    where: Prisma.SeatWhereUniqueInput;
};
/**
 * Seat updateMany
 */
export type SeatUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Seats.
     */
    data: Prisma.XOR<Prisma.SeatUpdateManyMutationInput, Prisma.SeatUncheckedUpdateManyInput>;
    /**
     * Filter which Seats to update
     */
    where?: Prisma.SeatWhereInput;
    /**
     * Limit how many Seats to update.
     */
    limit?: number;
};
/**
 * Seat updateManyAndReturn
 */
export type SeatUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * The data used to update Seats.
     */
    data: Prisma.XOR<Prisma.SeatUpdateManyMutationInput, Prisma.SeatUncheckedUpdateManyInput>;
    /**
     * Filter which Seats to update
     */
    where?: Prisma.SeatWhereInput;
    /**
     * Limit how many Seats to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Seat upsert
 */
export type SeatUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatInclude<ExtArgs> | null;
    /**
     * The filter to search for the Seat to update in case it exists.
     */
    where: Prisma.SeatWhereUniqueInput;
    /**
     * In case the Seat found by the `where` argument doesn't exist, create a new Seat with this data.
     */
    create: Prisma.XOR<Prisma.SeatCreateInput, Prisma.SeatUncheckedCreateInput>;
    /**
     * In case the Seat was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.SeatUpdateInput, Prisma.SeatUncheckedUpdateInput>;
};
/**
 * Seat delete
 */
export type SeatDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatInclude<ExtArgs> | null;
    /**
     * Filter which Seat to delete.
     */
    where: Prisma.SeatWhereUniqueInput;
};
/**
 * Seat deleteMany
 */
export type SeatDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Seats to delete
     */
    where?: Prisma.SeatWhereInput;
    /**
     * Limit how many Seats to delete.
     */
    limit?: number;
};
/**
 * Seat.showtimeSeats
 */
export type Seat$showtimeSeatsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ShowtimeSeat
     */
    select?: Prisma.ShowtimeSeatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the ShowtimeSeat
     */
    omit?: Prisma.ShowtimeSeatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.ShowtimeSeatInclude<ExtArgs> | null;
    where?: Prisma.ShowtimeSeatWhereInput;
    orderBy?: Prisma.ShowtimeSeatOrderByWithRelationInput | Prisma.ShowtimeSeatOrderByWithRelationInput[];
    cursor?: Prisma.ShowtimeSeatWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.ShowtimeSeatScalarFieldEnum | Prisma.ShowtimeSeatScalarFieldEnum[];
};
/**
 * Seat without action
 */
export type SeatDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Seat
     */
    select?: Prisma.SeatSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Seat
     */
    omit?: Prisma.SeatOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.SeatInclude<ExtArgs> | null;
};
//# sourceMappingURL=Seat.d.ts.map
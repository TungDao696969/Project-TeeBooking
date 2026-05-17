import type * as runtime from "@prisma/client/runtime/client";
import type * as $Enums from "../enums";
import type * as Prisma from "../internal/prismaNamespace";
/**
 * Model Booking
 *
 */
export type BookingModel = runtime.Types.Result.DefaultSelection<Prisma.$BookingPayload>;
export type AggregateBooking = {
    _count: BookingCountAggregateOutputType | null;
    _avg: BookingAvgAggregateOutputType | null;
    _sum: BookingSumAggregateOutputType | null;
    _min: BookingMinAggregateOutputType | null;
    _max: BookingMaxAggregateOutputType | null;
};
export type BookingAvgAggregateOutputType = {
    totalTicketPrice: number | null;
    totalComboPrice: number | null;
    discountAmount: number | null;
    finalAmount: number | null;
};
export type BookingSumAggregateOutputType = {
    totalTicketPrice: number | null;
    totalComboPrice: number | null;
    discountAmount: number | null;
    finalAmount: number | null;
};
export type BookingMinAggregateOutputType = {
    id: string | null;
    bookingCode: string | null;
    userId: string | null;
    showtimeId: string | null;
    totalTicketPrice: number | null;
    totalComboPrice: number | null;
    discountAmount: number | null;
    finalAmount: number | null;
    status: $Enums.BookingStatus | null;
    paymentStatus: $Enums.BookingPaymentStatus | null;
    bookedAt: Date | null;
    expiresAt: Date | null;
};
export type BookingMaxAggregateOutputType = {
    id: string | null;
    bookingCode: string | null;
    userId: string | null;
    showtimeId: string | null;
    totalTicketPrice: number | null;
    totalComboPrice: number | null;
    discountAmount: number | null;
    finalAmount: number | null;
    status: $Enums.BookingStatus | null;
    paymentStatus: $Enums.BookingPaymentStatus | null;
    bookedAt: Date | null;
    expiresAt: Date | null;
};
export type BookingCountAggregateOutputType = {
    id: number;
    bookingCode: number;
    userId: number;
    showtimeId: number;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: number;
    paymentStatus: number;
    bookedAt: number;
    expiresAt: number;
    _all: number;
};
export type BookingAvgAggregateInputType = {
    totalTicketPrice?: true;
    totalComboPrice?: true;
    discountAmount?: true;
    finalAmount?: true;
};
export type BookingSumAggregateInputType = {
    totalTicketPrice?: true;
    totalComboPrice?: true;
    discountAmount?: true;
    finalAmount?: true;
};
export type BookingMinAggregateInputType = {
    id?: true;
    bookingCode?: true;
    userId?: true;
    showtimeId?: true;
    totalTicketPrice?: true;
    totalComboPrice?: true;
    discountAmount?: true;
    finalAmount?: true;
    status?: true;
    paymentStatus?: true;
    bookedAt?: true;
    expiresAt?: true;
};
export type BookingMaxAggregateInputType = {
    id?: true;
    bookingCode?: true;
    userId?: true;
    showtimeId?: true;
    totalTicketPrice?: true;
    totalComboPrice?: true;
    discountAmount?: true;
    finalAmount?: true;
    status?: true;
    paymentStatus?: true;
    bookedAt?: true;
    expiresAt?: true;
};
export type BookingCountAggregateInputType = {
    id?: true;
    bookingCode?: true;
    userId?: true;
    showtimeId?: true;
    totalTicketPrice?: true;
    totalComboPrice?: true;
    discountAmount?: true;
    finalAmount?: true;
    status?: true;
    paymentStatus?: true;
    bookedAt?: true;
    expiresAt?: true;
    _all?: true;
};
export type BookingAggregateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Booking to aggregate.
     */
    where?: Prisma.BookingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Bookings to fetch.
     */
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the start position
     */
    cursor?: Prisma.BookingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Bookings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Count returned Bookings
    **/
    _count?: true | BookingCountAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to average
    **/
    _avg?: BookingAvgAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to sum
    **/
    _sum?: BookingSumAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the minimum value
    **/
    _min?: BookingMinAggregateInputType;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     *
     * Select which fields to find the maximum value
    **/
    _max?: BookingMaxAggregateInputType;
};
export type GetBookingAggregateType<T extends BookingAggregateArgs> = {
    [P in keyof T & keyof AggregateBooking]: P extends '_count' | 'count' ? T[P] extends true ? number : Prisma.GetScalarType<T[P], AggregateBooking[P]> : Prisma.GetScalarType<T[P], AggregateBooking[P]>;
};
export type BookingGroupByArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingWhereInput;
    orderBy?: Prisma.BookingOrderByWithAggregationInput | Prisma.BookingOrderByWithAggregationInput[];
    by: Prisma.BookingScalarFieldEnum[] | Prisma.BookingScalarFieldEnum;
    having?: Prisma.BookingScalarWhereWithAggregatesInput;
    take?: number;
    skip?: number;
    _count?: BookingCountAggregateInputType | true;
    _avg?: BookingAvgAggregateInputType;
    _sum?: BookingSumAggregateInputType;
    _min?: BookingMinAggregateInputType;
    _max?: BookingMaxAggregateInputType;
};
export type BookingGroupByOutputType = {
    id: string;
    bookingCode: string;
    userId: string;
    showtimeId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus: $Enums.BookingPaymentStatus;
    bookedAt: Date;
    expiresAt: Date | null;
    _count: BookingCountAggregateOutputType | null;
    _avg: BookingAvgAggregateOutputType | null;
    _sum: BookingSumAggregateOutputType | null;
    _min: BookingMinAggregateOutputType | null;
    _max: BookingMaxAggregateOutputType | null;
};
export type GetBookingGroupByPayload<T extends BookingGroupByArgs> = Prisma.PrismaPromise<Array<Prisma.PickEnumerable<BookingGroupByOutputType, T['by']> & {
    [P in ((keyof T) & (keyof BookingGroupByOutputType))]: P extends '_count' ? T[P] extends boolean ? number : Prisma.GetScalarType<T[P], BookingGroupByOutputType[P]> : Prisma.GetScalarType<T[P], BookingGroupByOutputType[P]>;
}>>;
export type BookingWhereInput = {
    AND?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    OR?: Prisma.BookingWhereInput[];
    NOT?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    id?: Prisma.StringFilter<"Booking"> | string;
    bookingCode?: Prisma.StringFilter<"Booking"> | string;
    userId?: Prisma.StringFilter<"Booking"> | string;
    showtimeId?: Prisma.StringFilter<"Booking"> | string;
    totalTicketPrice?: Prisma.FloatFilter<"Booking"> | number;
    totalComboPrice?: Prisma.FloatFilter<"Booking"> | number;
    discountAmount?: Prisma.FloatFilter<"Booking"> | number;
    finalAmount?: Prisma.FloatFilter<"Booking"> | number;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFilter<"Booking"> | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"Booking"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    showtime?: Prisma.XOR<Prisma.ShowtimeScalarRelationFilter, Prisma.ShowtimeWhereInput>;
    tickets?: Prisma.BookingTicketListRelationFilter;
    combos?: Prisma.BookingComboListRelationFilter;
    payments?: Prisma.PaymentListRelationFilter;
    invoice?: Prisma.XOR<Prisma.InvoiceNullableScalarRelationFilter, Prisma.InvoiceWhereInput> | null;
    refunds?: Prisma.RefundListRelationFilter;
};
export type BookingOrderByWithRelationInput = {
    id?: Prisma.SortOrder;
    bookingCode?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    showtimeId?: Prisma.SortOrder;
    totalTicketPrice?: Prisma.SortOrder;
    totalComboPrice?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    bookedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    user?: Prisma.UserOrderByWithRelationInput;
    showtime?: Prisma.ShowtimeOrderByWithRelationInput;
    tickets?: Prisma.BookingTicketOrderByRelationAggregateInput;
    combos?: Prisma.BookingComboOrderByRelationAggregateInput;
    payments?: Prisma.PaymentOrderByRelationAggregateInput;
    invoice?: Prisma.InvoiceOrderByWithRelationInput;
    refunds?: Prisma.RefundOrderByRelationAggregateInput;
};
export type BookingWhereUniqueInput = Prisma.AtLeast<{
    id?: string;
    bookingCode?: string;
    AND?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    OR?: Prisma.BookingWhereInput[];
    NOT?: Prisma.BookingWhereInput | Prisma.BookingWhereInput[];
    userId?: Prisma.StringFilter<"Booking"> | string;
    showtimeId?: Prisma.StringFilter<"Booking"> | string;
    totalTicketPrice?: Prisma.FloatFilter<"Booking"> | number;
    totalComboPrice?: Prisma.FloatFilter<"Booking"> | number;
    discountAmount?: Prisma.FloatFilter<"Booking"> | number;
    finalAmount?: Prisma.FloatFilter<"Booking"> | number;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFilter<"Booking"> | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"Booking"> | Date | string | null;
    user?: Prisma.XOR<Prisma.UserScalarRelationFilter, Prisma.UserWhereInput>;
    showtime?: Prisma.XOR<Prisma.ShowtimeScalarRelationFilter, Prisma.ShowtimeWhereInput>;
    tickets?: Prisma.BookingTicketListRelationFilter;
    combos?: Prisma.BookingComboListRelationFilter;
    payments?: Prisma.PaymentListRelationFilter;
    invoice?: Prisma.XOR<Prisma.InvoiceNullableScalarRelationFilter, Prisma.InvoiceWhereInput> | null;
    refunds?: Prisma.RefundListRelationFilter;
}, "id" | "bookingCode">;
export type BookingOrderByWithAggregationInput = {
    id?: Prisma.SortOrder;
    bookingCode?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    showtimeId?: Prisma.SortOrder;
    totalTicketPrice?: Prisma.SortOrder;
    totalComboPrice?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    bookedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrderInput | Prisma.SortOrder;
    _count?: Prisma.BookingCountOrderByAggregateInput;
    _avg?: Prisma.BookingAvgOrderByAggregateInput;
    _max?: Prisma.BookingMaxOrderByAggregateInput;
    _min?: Prisma.BookingMinOrderByAggregateInput;
    _sum?: Prisma.BookingSumOrderByAggregateInput;
};
export type BookingScalarWhereWithAggregatesInput = {
    AND?: Prisma.BookingScalarWhereWithAggregatesInput | Prisma.BookingScalarWhereWithAggregatesInput[];
    OR?: Prisma.BookingScalarWhereWithAggregatesInput[];
    NOT?: Prisma.BookingScalarWhereWithAggregatesInput | Prisma.BookingScalarWhereWithAggregatesInput[];
    id?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    bookingCode?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    userId?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    showtimeId?: Prisma.StringWithAggregatesFilter<"Booking"> | string;
    totalTicketPrice?: Prisma.FloatWithAggregatesFilter<"Booking"> | number;
    totalComboPrice?: Prisma.FloatWithAggregatesFilter<"Booking"> | number;
    discountAmount?: Prisma.FloatWithAggregatesFilter<"Booking"> | number;
    finalAmount?: Prisma.FloatWithAggregatesFilter<"Booking"> | number;
    status?: Prisma.EnumBookingStatusWithAggregatesFilter<"Booking"> | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusWithAggregatesFilter<"Booking"> | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeWithAggregatesFilter<"Booking"> | Date | string;
    expiresAt?: Prisma.DateTimeNullableWithAggregatesFilter<"Booking"> | Date | string | null;
};
export type BookingCreateInput = {
    id?: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    showtime: Prisma.ShowtimeCreateNestedOneWithoutBookingsInput;
    tickets?: Prisma.BookingTicketCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateInput = {
    id?: string;
    bookingCode: string;
    userId: string;
    showtimeId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboUncheckedCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceUncheckedCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    showtime?: Prisma.ShowtimeUpdateOneRequiredWithoutBookingsNestedInput;
    tickets?: Prisma.BookingTicketUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUncheckedUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUncheckedUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingCreateManyInput = {
    id?: string;
    bookingCode: string;
    userId: string;
    showtimeId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
};
export type BookingUpdateManyMutationInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BookingUncheckedUpdateManyInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BookingCountOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingCode?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    showtimeId?: Prisma.SortOrder;
    totalTicketPrice?: Prisma.SortOrder;
    totalComboPrice?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    bookedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type BookingAvgOrderByAggregateInput = {
    totalTicketPrice?: Prisma.SortOrder;
    totalComboPrice?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
};
export type BookingMaxOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingCode?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    showtimeId?: Prisma.SortOrder;
    totalTicketPrice?: Prisma.SortOrder;
    totalComboPrice?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    bookedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type BookingMinOrderByAggregateInput = {
    id?: Prisma.SortOrder;
    bookingCode?: Prisma.SortOrder;
    userId?: Prisma.SortOrder;
    showtimeId?: Prisma.SortOrder;
    totalTicketPrice?: Prisma.SortOrder;
    totalComboPrice?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
    status?: Prisma.SortOrder;
    paymentStatus?: Prisma.SortOrder;
    bookedAt?: Prisma.SortOrder;
    expiresAt?: Prisma.SortOrder;
};
export type BookingSumOrderByAggregateInput = {
    totalTicketPrice?: Prisma.SortOrder;
    totalComboPrice?: Prisma.SortOrder;
    discountAmount?: Prisma.SortOrder;
    finalAmount?: Prisma.SortOrder;
};
export type BookingScalarRelationFilter = {
    is?: Prisma.BookingWhereInput;
    isNot?: Prisma.BookingWhereInput;
};
export type BookingListRelationFilter = {
    every?: Prisma.BookingWhereInput;
    some?: Prisma.BookingWhereInput;
    none?: Prisma.BookingWhereInput;
};
export type BookingOrderByRelationAggregateInput = {
    _count?: Prisma.SortOrder;
};
export type FloatFieldUpdateOperationsInput = {
    set?: number;
    increment?: number;
    decrement?: number;
    multiply?: number;
    divide?: number;
};
export type EnumBookingStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingStatus;
};
export type EnumBookingPaymentStatusFieldUpdateOperationsInput = {
    set?: $Enums.BookingPaymentStatus;
};
export type BookingCreateNestedOneWithoutCombosInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutCombosInput, Prisma.BookingUncheckedCreateWithoutCombosInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutCombosInput;
    connect?: Prisma.BookingWhereUniqueInput;
};
export type BookingUpdateOneRequiredWithoutCombosNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutCombosInput, Prisma.BookingUncheckedCreateWithoutCombosInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutCombosInput;
    upsert?: Prisma.BookingUpsertWithoutCombosInput;
    connect?: Prisma.BookingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BookingUpdateToOneWithWhereWithoutCombosInput, Prisma.BookingUpdateWithoutCombosInput>, Prisma.BookingUncheckedUpdateWithoutCombosInput>;
};
export type BookingCreateNestedOneWithoutTicketsInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTicketsInput, Prisma.BookingUncheckedCreateWithoutTicketsInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTicketsInput;
    connect?: Prisma.BookingWhereUniqueInput;
};
export type BookingUpdateOneRequiredWithoutTicketsNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutTicketsInput, Prisma.BookingUncheckedCreateWithoutTicketsInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutTicketsInput;
    upsert?: Prisma.BookingUpsertWithoutTicketsInput;
    connect?: Prisma.BookingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BookingUpdateToOneWithWhereWithoutTicketsInput, Prisma.BookingUpdateWithoutTicketsInput>, Prisma.BookingUncheckedUpdateWithoutTicketsInput>;
};
export type BookingCreateNestedOneWithoutInvoiceInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutInvoiceInput, Prisma.BookingUncheckedCreateWithoutInvoiceInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutInvoiceInput;
    connect?: Prisma.BookingWhereUniqueInput;
};
export type BookingUpdateOneRequiredWithoutInvoiceNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutInvoiceInput, Prisma.BookingUncheckedCreateWithoutInvoiceInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutInvoiceInput;
    upsert?: Prisma.BookingUpsertWithoutInvoiceInput;
    connect?: Prisma.BookingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BookingUpdateToOneWithWhereWithoutInvoiceInput, Prisma.BookingUpdateWithoutInvoiceInput>, Prisma.BookingUncheckedUpdateWithoutInvoiceInput>;
};
export type BookingCreateNestedOneWithoutPaymentsInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutPaymentsInput, Prisma.BookingUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutPaymentsInput;
    connect?: Prisma.BookingWhereUniqueInput;
};
export type BookingUpdateOneRequiredWithoutPaymentsNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutPaymentsInput, Prisma.BookingUncheckedCreateWithoutPaymentsInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutPaymentsInput;
    upsert?: Prisma.BookingUpsertWithoutPaymentsInput;
    connect?: Prisma.BookingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BookingUpdateToOneWithWhereWithoutPaymentsInput, Prisma.BookingUpdateWithoutPaymentsInput>, Prisma.BookingUncheckedUpdateWithoutPaymentsInput>;
};
export type BookingCreateNestedOneWithoutRefundsInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutRefundsInput, Prisma.BookingUncheckedCreateWithoutRefundsInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutRefundsInput;
    connect?: Prisma.BookingWhereUniqueInput;
};
export type BookingUpdateOneRequiredWithoutRefundsNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutRefundsInput, Prisma.BookingUncheckedCreateWithoutRefundsInput>;
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutRefundsInput;
    upsert?: Prisma.BookingUpsertWithoutRefundsInput;
    connect?: Prisma.BookingWhereUniqueInput;
    update?: Prisma.XOR<Prisma.XOR<Prisma.BookingUpdateToOneWithWhereWithoutRefundsInput, Prisma.BookingUpdateWithoutRefundsInput>, Prisma.BookingUncheckedUpdateWithoutRefundsInput>;
};
export type BookingCreateNestedManyWithoutShowtimeInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutShowtimeInput, Prisma.BookingUncheckedCreateWithoutShowtimeInput> | Prisma.BookingCreateWithoutShowtimeInput[] | Prisma.BookingUncheckedCreateWithoutShowtimeInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutShowtimeInput | Prisma.BookingCreateOrConnectWithoutShowtimeInput[];
    createMany?: Prisma.BookingCreateManyShowtimeInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutShowtimeInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutShowtimeInput, Prisma.BookingUncheckedCreateWithoutShowtimeInput> | Prisma.BookingCreateWithoutShowtimeInput[] | Prisma.BookingUncheckedCreateWithoutShowtimeInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutShowtimeInput | Prisma.BookingCreateOrConnectWithoutShowtimeInput[];
    createMany?: Prisma.BookingCreateManyShowtimeInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutShowtimeNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutShowtimeInput, Prisma.BookingUncheckedCreateWithoutShowtimeInput> | Prisma.BookingCreateWithoutShowtimeInput[] | Prisma.BookingUncheckedCreateWithoutShowtimeInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutShowtimeInput | Prisma.BookingCreateOrConnectWithoutShowtimeInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutShowtimeInput | Prisma.BookingUpsertWithWhereUniqueWithoutShowtimeInput[];
    createMany?: Prisma.BookingCreateManyShowtimeInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutShowtimeInput | Prisma.BookingUpdateWithWhereUniqueWithoutShowtimeInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutShowtimeInput | Prisma.BookingUpdateManyWithWhereWithoutShowtimeInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutShowtimeNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutShowtimeInput, Prisma.BookingUncheckedCreateWithoutShowtimeInput> | Prisma.BookingCreateWithoutShowtimeInput[] | Prisma.BookingUncheckedCreateWithoutShowtimeInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutShowtimeInput | Prisma.BookingCreateOrConnectWithoutShowtimeInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutShowtimeInput | Prisma.BookingUpsertWithWhereUniqueWithoutShowtimeInput[];
    createMany?: Prisma.BookingCreateManyShowtimeInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutShowtimeInput | Prisma.BookingUpdateWithWhereUniqueWithoutShowtimeInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutShowtimeInput | Prisma.BookingUpdateManyWithWhereWithoutShowtimeInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUncheckedCreateNestedManyWithoutUserInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
};
export type BookingUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutUserInput | Prisma.BookingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutUserInput | Prisma.BookingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutUserInput | Prisma.BookingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingUncheckedUpdateManyWithoutUserNestedInput = {
    create?: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput> | Prisma.BookingCreateWithoutUserInput[] | Prisma.BookingUncheckedCreateWithoutUserInput[];
    connectOrCreate?: Prisma.BookingCreateOrConnectWithoutUserInput | Prisma.BookingCreateOrConnectWithoutUserInput[];
    upsert?: Prisma.BookingUpsertWithWhereUniqueWithoutUserInput | Prisma.BookingUpsertWithWhereUniqueWithoutUserInput[];
    createMany?: Prisma.BookingCreateManyUserInputEnvelope;
    set?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    disconnect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    delete?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    connect?: Prisma.BookingWhereUniqueInput | Prisma.BookingWhereUniqueInput[];
    update?: Prisma.BookingUpdateWithWhereUniqueWithoutUserInput | Prisma.BookingUpdateWithWhereUniqueWithoutUserInput[];
    updateMany?: Prisma.BookingUpdateManyWithWhereWithoutUserInput | Prisma.BookingUpdateManyWithWhereWithoutUserInput[];
    deleteMany?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
};
export type BookingCreateWithoutCombosInput = {
    id?: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    showtime: Prisma.ShowtimeCreateNestedOneWithoutBookingsInput;
    tickets?: Prisma.BookingTicketCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutCombosInput = {
    id?: string;
    bookingCode: string;
    userId: string;
    showtimeId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceUncheckedCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutCombosInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutCombosInput, Prisma.BookingUncheckedCreateWithoutCombosInput>;
};
export type BookingUpsertWithoutCombosInput = {
    update: Prisma.XOR<Prisma.BookingUpdateWithoutCombosInput, Prisma.BookingUncheckedUpdateWithoutCombosInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutCombosInput, Prisma.BookingUncheckedCreateWithoutCombosInput>;
    where?: Prisma.BookingWhereInput;
};
export type BookingUpdateToOneWithWhereWithoutCombosInput = {
    where?: Prisma.BookingWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutCombosInput, Prisma.BookingUncheckedUpdateWithoutCombosInput>;
};
export type BookingUpdateWithoutCombosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    showtime?: Prisma.ShowtimeUpdateOneRequiredWithoutBookingsNestedInput;
    tickets?: Prisma.BookingTicketUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutCombosInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUncheckedUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingCreateWithoutTicketsInput = {
    id?: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    showtime: Prisma.ShowtimeCreateNestedOneWithoutBookingsInput;
    combos?: Prisma.BookingComboCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutTicketsInput = {
    id?: string;
    bookingCode: string;
    userId: string;
    showtimeId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    combos?: Prisma.BookingComboUncheckedCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceUncheckedCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutTicketsInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutTicketsInput, Prisma.BookingUncheckedCreateWithoutTicketsInput>;
};
export type BookingUpsertWithoutTicketsInput = {
    update: Prisma.XOR<Prisma.BookingUpdateWithoutTicketsInput, Prisma.BookingUncheckedUpdateWithoutTicketsInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutTicketsInput, Prisma.BookingUncheckedCreateWithoutTicketsInput>;
    where?: Prisma.BookingWhereInput;
};
export type BookingUpdateToOneWithWhereWithoutTicketsInput = {
    where?: Prisma.BookingWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutTicketsInput, Prisma.BookingUncheckedUpdateWithoutTicketsInput>;
};
export type BookingUpdateWithoutTicketsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    showtime?: Prisma.ShowtimeUpdateOneRequiredWithoutBookingsNestedInput;
    combos?: Prisma.BookingComboUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutTicketsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    combos?: Prisma.BookingComboUncheckedUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUncheckedUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingCreateWithoutInvoiceInput = {
    id?: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    showtime: Prisma.ShowtimeCreateNestedOneWithoutBookingsInput;
    tickets?: Prisma.BookingTicketCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutBookingInput;
    refunds?: Prisma.RefundCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutInvoiceInput = {
    id?: string;
    bookingCode: string;
    userId: string;
    showtimeId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboUncheckedCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutBookingInput;
    refunds?: Prisma.RefundUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutInvoiceInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutInvoiceInput, Prisma.BookingUncheckedCreateWithoutInvoiceInput>;
};
export type BookingUpsertWithoutInvoiceInput = {
    update: Prisma.XOR<Prisma.BookingUpdateWithoutInvoiceInput, Prisma.BookingUncheckedUpdateWithoutInvoiceInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutInvoiceInput, Prisma.BookingUncheckedCreateWithoutInvoiceInput>;
    where?: Prisma.BookingWhereInput;
};
export type BookingUpdateToOneWithWhereWithoutInvoiceInput = {
    where?: Prisma.BookingWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutInvoiceInput, Prisma.BookingUncheckedUpdateWithoutInvoiceInput>;
};
export type BookingUpdateWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    showtime?: Prisma.ShowtimeUpdateOneRequiredWithoutBookingsNestedInput;
    tickets?: Prisma.BookingTicketUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutBookingNestedInput;
    refunds?: Prisma.RefundUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutInvoiceInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUncheckedUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutBookingNestedInput;
    refunds?: Prisma.RefundUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingCreateWithoutPaymentsInput = {
    id?: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    showtime: Prisma.ShowtimeCreateNestedOneWithoutBookingsInput;
    tickets?: Prisma.BookingTicketCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutPaymentsInput = {
    id?: string;
    bookingCode: string;
    userId: string;
    showtimeId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboUncheckedCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceUncheckedCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutPaymentsInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutPaymentsInput, Prisma.BookingUncheckedCreateWithoutPaymentsInput>;
};
export type BookingUpsertWithoutPaymentsInput = {
    update: Prisma.XOR<Prisma.BookingUpdateWithoutPaymentsInput, Prisma.BookingUncheckedUpdateWithoutPaymentsInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutPaymentsInput, Prisma.BookingUncheckedCreateWithoutPaymentsInput>;
    where?: Prisma.BookingWhereInput;
};
export type BookingUpdateToOneWithWhereWithoutPaymentsInput = {
    where?: Prisma.BookingWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutPaymentsInput, Prisma.BookingUncheckedUpdateWithoutPaymentsInput>;
};
export type BookingUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    showtime?: Prisma.ShowtimeUpdateOneRequiredWithoutBookingsNestedInput;
    tickets?: Prisma.BookingTicketUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutPaymentsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUncheckedUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUncheckedUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingCreateWithoutRefundsInput = {
    id?: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    showtime: Prisma.ShowtimeCreateNestedOneWithoutBookingsInput;
    tickets?: Prisma.BookingTicketCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceCreateNestedOneWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutRefundsInput = {
    id?: string;
    bookingCode: string;
    userId: string;
    showtimeId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboUncheckedCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceUncheckedCreateNestedOneWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutRefundsInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutRefundsInput, Prisma.BookingUncheckedCreateWithoutRefundsInput>;
};
export type BookingUpsertWithoutRefundsInput = {
    update: Prisma.XOR<Prisma.BookingUpdateWithoutRefundsInput, Prisma.BookingUncheckedUpdateWithoutRefundsInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutRefundsInput, Prisma.BookingUncheckedCreateWithoutRefundsInput>;
    where?: Prisma.BookingWhereInput;
};
export type BookingUpdateToOneWithWhereWithoutRefundsInput = {
    where?: Prisma.BookingWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutRefundsInput, Prisma.BookingUncheckedUpdateWithoutRefundsInput>;
};
export type BookingUpdateWithoutRefundsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    showtime?: Prisma.ShowtimeUpdateOneRequiredWithoutBookingsNestedInput;
    tickets?: Prisma.BookingTicketUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUpdateOneWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutRefundsInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUncheckedUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUncheckedUpdateOneWithoutBookingNestedInput;
};
export type BookingCreateWithoutShowtimeInput = {
    id?: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    user: Prisma.UserCreateNestedOneWithoutBookingsInput;
    tickets?: Prisma.BookingTicketCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutShowtimeInput = {
    id?: string;
    bookingCode: string;
    userId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboUncheckedCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceUncheckedCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutShowtimeInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutShowtimeInput, Prisma.BookingUncheckedCreateWithoutShowtimeInput>;
};
export type BookingCreateManyShowtimeInputEnvelope = {
    data: Prisma.BookingCreateManyShowtimeInput | Prisma.BookingCreateManyShowtimeInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutShowtimeInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutShowtimeInput, Prisma.BookingUncheckedUpdateWithoutShowtimeInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutShowtimeInput, Prisma.BookingUncheckedCreateWithoutShowtimeInput>;
};
export type BookingUpdateWithWhereUniqueWithoutShowtimeInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutShowtimeInput, Prisma.BookingUncheckedUpdateWithoutShowtimeInput>;
};
export type BookingUpdateManyWithWhereWithoutShowtimeInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutShowtimeInput>;
};
export type BookingScalarWhereInput = {
    AND?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
    OR?: Prisma.BookingScalarWhereInput[];
    NOT?: Prisma.BookingScalarWhereInput | Prisma.BookingScalarWhereInput[];
    id?: Prisma.StringFilter<"Booking"> | string;
    bookingCode?: Prisma.StringFilter<"Booking"> | string;
    userId?: Prisma.StringFilter<"Booking"> | string;
    showtimeId?: Prisma.StringFilter<"Booking"> | string;
    totalTicketPrice?: Prisma.FloatFilter<"Booking"> | number;
    totalComboPrice?: Prisma.FloatFilter<"Booking"> | number;
    discountAmount?: Prisma.FloatFilter<"Booking"> | number;
    finalAmount?: Prisma.FloatFilter<"Booking"> | number;
    status?: Prisma.EnumBookingStatusFilter<"Booking"> | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFilter<"Booking"> | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFilter<"Booking"> | Date | string;
    expiresAt?: Prisma.DateTimeNullableFilter<"Booking"> | Date | string | null;
};
export type BookingCreateWithoutUserInput = {
    id?: string;
    bookingCode: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    showtime: Prisma.ShowtimeCreateNestedOneWithoutBookingsInput;
    tickets?: Prisma.BookingTicketCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundCreateNestedManyWithoutBookingInput;
};
export type BookingUncheckedCreateWithoutUserInput = {
    id?: string;
    bookingCode: string;
    showtimeId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedCreateNestedManyWithoutBookingInput;
    combos?: Prisma.BookingComboUncheckedCreateNestedManyWithoutBookingInput;
    payments?: Prisma.PaymentUncheckedCreateNestedManyWithoutBookingInput;
    invoice?: Prisma.InvoiceUncheckedCreateNestedOneWithoutBookingInput;
    refunds?: Prisma.RefundUncheckedCreateNestedManyWithoutBookingInput;
};
export type BookingCreateOrConnectWithoutUserInput = {
    where: Prisma.BookingWhereUniqueInput;
    create: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput>;
};
export type BookingCreateManyUserInputEnvelope = {
    data: Prisma.BookingCreateManyUserInput | Prisma.BookingCreateManyUserInput[];
    skipDuplicates?: boolean;
};
export type BookingUpsertWithWhereUniqueWithoutUserInput = {
    where: Prisma.BookingWhereUniqueInput;
    update: Prisma.XOR<Prisma.BookingUpdateWithoutUserInput, Prisma.BookingUncheckedUpdateWithoutUserInput>;
    create: Prisma.XOR<Prisma.BookingCreateWithoutUserInput, Prisma.BookingUncheckedCreateWithoutUserInput>;
};
export type BookingUpdateWithWhereUniqueWithoutUserInput = {
    where: Prisma.BookingWhereUniqueInput;
    data: Prisma.XOR<Prisma.BookingUpdateWithoutUserInput, Prisma.BookingUncheckedUpdateWithoutUserInput>;
};
export type BookingUpdateManyWithWhereWithoutUserInput = {
    where: Prisma.BookingScalarWhereInput;
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyWithoutUserInput>;
};
export type BookingCreateManyShowtimeInput = {
    id?: string;
    bookingCode: string;
    userId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
};
export type BookingUpdateWithoutShowtimeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    user?: Prisma.UserUpdateOneRequiredWithoutBookingsNestedInput;
    tickets?: Prisma.BookingTicketUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutShowtimeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUncheckedUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUncheckedUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateManyWithoutShowtimeInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    userId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
export type BookingCreateManyUserInput = {
    id?: string;
    bookingCode: string;
    showtimeId: string;
    totalTicketPrice: number;
    totalComboPrice: number;
    discountAmount: number;
    finalAmount: number;
    status: $Enums.BookingStatus;
    paymentStatus?: $Enums.BookingPaymentStatus;
    bookedAt?: Date | string;
    expiresAt?: Date | string | null;
};
export type BookingUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    showtime?: Prisma.ShowtimeUpdateOneRequiredWithoutBookingsNestedInput;
    tickets?: Prisma.BookingTicketUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
    tickets?: Prisma.BookingTicketUncheckedUpdateManyWithoutBookingNestedInput;
    combos?: Prisma.BookingComboUncheckedUpdateManyWithoutBookingNestedInput;
    payments?: Prisma.PaymentUncheckedUpdateManyWithoutBookingNestedInput;
    invoice?: Prisma.InvoiceUncheckedUpdateOneWithoutBookingNestedInput;
    refunds?: Prisma.RefundUncheckedUpdateManyWithoutBookingNestedInput;
};
export type BookingUncheckedUpdateManyWithoutUserInput = {
    id?: Prisma.StringFieldUpdateOperationsInput | string;
    bookingCode?: Prisma.StringFieldUpdateOperationsInput | string;
    showtimeId?: Prisma.StringFieldUpdateOperationsInput | string;
    totalTicketPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    totalComboPrice?: Prisma.FloatFieldUpdateOperationsInput | number;
    discountAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    finalAmount?: Prisma.FloatFieldUpdateOperationsInput | number;
    status?: Prisma.EnumBookingStatusFieldUpdateOperationsInput | $Enums.BookingStatus;
    paymentStatus?: Prisma.EnumBookingPaymentStatusFieldUpdateOperationsInput | $Enums.BookingPaymentStatus;
    bookedAt?: Prisma.DateTimeFieldUpdateOperationsInput | Date | string;
    expiresAt?: Prisma.NullableDateTimeFieldUpdateOperationsInput | Date | string | null;
};
/**
 * Count Type BookingCountOutputType
 */
export type BookingCountOutputType = {
    tickets: number;
    combos: number;
    payments: number;
    refunds: number;
};
export type BookingCountOutputTypeSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    tickets?: boolean | BookingCountOutputTypeCountTicketsArgs;
    combos?: boolean | BookingCountOutputTypeCountCombosArgs;
    payments?: boolean | BookingCountOutputTypeCountPaymentsArgs;
    refunds?: boolean | BookingCountOutputTypeCountRefundsArgs;
};
/**
 * BookingCountOutputType without action
 */
export type BookingCountOutputTypeDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCountOutputType
     */
    select?: Prisma.BookingCountOutputTypeSelect<ExtArgs> | null;
};
/**
 * BookingCountOutputType without action
 */
export type BookingCountOutputTypeCountTicketsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingTicketWhereInput;
};
/**
 * BookingCountOutputType without action
 */
export type BookingCountOutputTypeCountCombosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.BookingComboWhereInput;
};
/**
 * BookingCountOutputType without action
 */
export type BookingCountOutputTypeCountPaymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.PaymentWhereInput;
};
/**
 * BookingCountOutputType without action
 */
export type BookingCountOutputTypeCountRefundsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    where?: Prisma.RefundWhereInput;
};
export type BookingSelect<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingCode?: boolean;
    userId?: boolean;
    showtimeId?: boolean;
    totalTicketPrice?: boolean;
    totalComboPrice?: boolean;
    discountAmount?: boolean;
    finalAmount?: boolean;
    status?: boolean;
    paymentStatus?: boolean;
    bookedAt?: boolean;
    expiresAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
    tickets?: boolean | Prisma.Booking$ticketsArgs<ExtArgs>;
    combos?: boolean | Prisma.Booking$combosArgs<ExtArgs>;
    payments?: boolean | Prisma.Booking$paymentsArgs<ExtArgs>;
    invoice?: boolean | Prisma.Booking$invoiceArgs<ExtArgs>;
    refunds?: boolean | Prisma.Booking$refundsArgs<ExtArgs>;
    _count?: boolean | Prisma.BookingCountOutputTypeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingCode?: boolean;
    userId?: boolean;
    showtimeId?: boolean;
    totalTicketPrice?: boolean;
    totalComboPrice?: boolean;
    discountAmount?: boolean;
    finalAmount?: boolean;
    status?: boolean;
    paymentStatus?: boolean;
    bookedAt?: boolean;
    expiresAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetSelect<{
    id?: boolean;
    bookingCode?: boolean;
    userId?: boolean;
    showtimeId?: boolean;
    totalTicketPrice?: boolean;
    totalComboPrice?: boolean;
    discountAmount?: boolean;
    finalAmount?: boolean;
    status?: boolean;
    paymentStatus?: boolean;
    bookedAt?: boolean;
    expiresAt?: boolean;
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
}, ExtArgs["result"]["booking"]>;
export type BookingSelectScalar = {
    id?: boolean;
    bookingCode?: boolean;
    userId?: boolean;
    showtimeId?: boolean;
    totalTicketPrice?: boolean;
    totalComboPrice?: boolean;
    discountAmount?: boolean;
    finalAmount?: boolean;
    status?: boolean;
    paymentStatus?: boolean;
    bookedAt?: boolean;
    expiresAt?: boolean;
};
export type BookingOmit<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = runtime.Types.Extensions.GetOmit<"id" | "bookingCode" | "userId" | "showtimeId" | "totalTicketPrice" | "totalComboPrice" | "discountAmount" | "finalAmount" | "status" | "paymentStatus" | "bookedAt" | "expiresAt", ExtArgs["result"]["booking"]>;
export type BookingInclude<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
    tickets?: boolean | Prisma.Booking$ticketsArgs<ExtArgs>;
    combos?: boolean | Prisma.Booking$combosArgs<ExtArgs>;
    payments?: boolean | Prisma.Booking$paymentsArgs<ExtArgs>;
    invoice?: boolean | Prisma.Booking$invoiceArgs<ExtArgs>;
    refunds?: boolean | Prisma.Booking$refundsArgs<ExtArgs>;
    _count?: boolean | Prisma.BookingCountOutputTypeDefaultArgs<ExtArgs>;
};
export type BookingIncludeCreateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
};
export type BookingIncludeUpdateManyAndReturn<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    user?: boolean | Prisma.UserDefaultArgs<ExtArgs>;
    showtime?: boolean | Prisma.ShowtimeDefaultArgs<ExtArgs>;
};
export type $BookingPayload<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    name: "Booking";
    objects: {
        user: Prisma.$UserPayload<ExtArgs>;
        showtime: Prisma.$ShowtimePayload<ExtArgs>;
        tickets: Prisma.$BookingTicketPayload<ExtArgs>[];
        combos: Prisma.$BookingComboPayload<ExtArgs>[];
        payments: Prisma.$PaymentPayload<ExtArgs>[];
        invoice: Prisma.$InvoicePayload<ExtArgs> | null;
        refunds: Prisma.$RefundPayload<ExtArgs>[];
    };
    scalars: runtime.Types.Extensions.GetPayloadResult<{
        id: string;
        bookingCode: string;
        userId: string;
        showtimeId: string;
        totalTicketPrice: number;
        totalComboPrice: number;
        discountAmount: number;
        finalAmount: number;
        status: $Enums.BookingStatus;
        paymentStatus: $Enums.BookingPaymentStatus;
        bookedAt: Date;
        expiresAt: Date | null;
    }, ExtArgs["result"]["booking"]>;
    composites: {};
};
export type BookingGetPayload<S extends boolean | null | undefined | BookingDefaultArgs> = runtime.Types.Result.GetResult<Prisma.$BookingPayload, S>;
export type BookingCountArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = Omit<BookingFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
    select?: BookingCountAggregateInputType | true;
};
export interface BookingDelegate<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['model']['Booking'];
        meta: {
            name: 'Booking';
        };
    };
    /**
     * Find zero or one Booking that matches the filter.
     * @param {BookingFindUniqueArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends BookingFindUniqueArgs>(args: Prisma.SelectSubset<T, BookingFindUniqueArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find one Booking that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {BookingFindUniqueOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends BookingFindUniqueOrThrowArgs>(args: Prisma.SelectSubset<T, BookingFindUniqueOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Booking that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends BookingFindFirstArgs>(args?: Prisma.SelectSubset<T, BookingFindFirstArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    /**
     * Find the first Booking that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindFirstOrThrowArgs} args - Arguments to find a Booking
     * @example
     * // Get one Booking
     * const booking = await prisma.booking.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends BookingFindFirstOrThrowArgs>(args?: Prisma.SelectSubset<T, BookingFindFirstOrThrowArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Find zero or more Bookings that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Bookings
     * const bookings = await prisma.booking.findMany()
     *
     * // Get first 10 Bookings
     * const bookings = await prisma.booking.findMany({ take: 10 })
     *
     * // Only select the `id`
     * const bookingWithIdOnly = await prisma.booking.findMany({ select: { id: true } })
     *
     */
    findMany<T extends BookingFindManyArgs>(args?: Prisma.SelectSubset<T, BookingFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>;
    /**
     * Create a Booking.
     * @param {BookingCreateArgs} args - Arguments to create a Booking.
     * @example
     * // Create one Booking
     * const Booking = await prisma.booking.create({
     *   data: {
     *     // ... data to create a Booking
     *   }
     * })
     *
     */
    create<T extends BookingCreateArgs>(args: Prisma.SelectSubset<T, BookingCreateArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Create many Bookings.
     * @param {BookingCreateManyArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     */
    createMany<T extends BookingCreateManyArgs>(args?: Prisma.SelectSubset<T, BookingCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Create many Bookings and returns the data saved in the database.
     * @param {BookingCreateManyAndReturnArgs} args - Arguments to create many Bookings.
     * @example
     * // Create many Bookings
     * const booking = await prisma.booking.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Create many Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     *
     */
    createManyAndReturn<T extends BookingCreateManyAndReturnArgs>(args?: Prisma.SelectSubset<T, BookingCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>;
    /**
     * Delete a Booking.
     * @param {BookingDeleteArgs} args - Arguments to delete one Booking.
     * @example
     * // Delete one Booking
     * const Booking = await prisma.booking.delete({
     *   where: {
     *     // ... filter to delete one Booking
     *   }
     * })
     *
     */
    delete<T extends BookingDeleteArgs>(args: Prisma.SelectSubset<T, BookingDeleteArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Update one Booking.
     * @param {BookingUpdateArgs} args - Arguments to update one Booking.
     * @example
     * // Update one Booking
     * const booking = await prisma.booking.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    update<T extends BookingUpdateArgs>(args: Prisma.SelectSubset<T, BookingUpdateArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Delete zero or more Bookings.
     * @param {BookingDeleteManyArgs} args - Arguments to filter Bookings to delete.
     * @example
     * // Delete a few Bookings
     * const { count } = await prisma.booking.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     *
     */
    deleteMany<T extends BookingDeleteManyArgs>(args?: Prisma.SelectSubset<T, BookingDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     *
     */
    updateMany<T extends BookingUpdateManyArgs>(args: Prisma.SelectSubset<T, BookingUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<Prisma.BatchPayload>;
    /**
     * Update zero or more Bookings and returns the data updated in the database.
     * @param {BookingUpdateManyAndReturnArgs} args - Arguments to update many Bookings.
     * @example
     * // Update many Bookings
     * const booking = await prisma.booking.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *
     * // Update zero or more Bookings and only return the `id`
     * const bookingWithIdOnly = await prisma.booking.updateManyAndReturn({
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
    updateManyAndReturn<T extends BookingUpdateManyAndReturnArgs>(args: Prisma.SelectSubset<T, BookingUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>;
    /**
     * Create or update one Booking.
     * @param {BookingUpsertArgs} args - Arguments to update or create a Booking.
     * @example
     * // Update or create a Booking
     * const booking = await prisma.booking.upsert({
     *   create: {
     *     // ... data to create a Booking
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Booking we want to update
     *   }
     * })
     */
    upsert<T extends BookingUpsertArgs>(args: Prisma.SelectSubset<T, BookingUpsertArgs<ExtArgs>>): Prisma.Prisma__BookingClient<runtime.Types.Result.GetResult<Prisma.$BookingPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>;
    /**
     * Count the number of Bookings.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingCountArgs} args - Arguments to filter Bookings to count.
     * @example
     * // Count the number of Bookings
     * const count = await prisma.booking.count({
     *   where: {
     *     // ... the filter for the Bookings we want to count
     *   }
     * })
    **/
    count<T extends BookingCountArgs>(args?: Prisma.Subset<T, BookingCountArgs>): Prisma.PrismaPromise<T extends runtime.Types.Utils.Record<'select', any> ? T['select'] extends true ? number : Prisma.GetScalarType<T['select'], BookingCountAggregateOutputType> : number>;
    /**
     * Allows you to perform aggregations operations on a Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends BookingAggregateArgs>(args: Prisma.Subset<T, BookingAggregateArgs>): Prisma.PrismaPromise<GetBookingAggregateType<T>>;
    /**
     * Group by Booking.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {BookingGroupByArgs} args - Group by arguments.
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
    groupBy<T extends BookingGroupByArgs, HasSelectOrTake extends Prisma.Or<Prisma.Extends<'skip', Prisma.Keys<T>>, Prisma.Extends<'take', Prisma.Keys<T>>>, OrderByArg extends Prisma.True extends HasSelectOrTake ? {
        orderBy: BookingGroupByArgs['orderBy'];
    } : {
        orderBy?: BookingGroupByArgs['orderBy'];
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
    }[OrderFields]>(args: Prisma.SubsetIntersection<T, BookingGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetBookingGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>;
    /**
     * Fields of the Booking model
     */
    readonly fields: BookingFieldRefs;
}
/**
 * The delegate class that acts as a "Promise-like" for Booking.
 * Why is this prefixed with `Prisma__`?
 * Because we want to prevent naming conflicts as mentioned in
 * https://github.com/prisma/prisma-client-js/issues/707
 */
export interface Prisma__BookingClient<T, Null = never, ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise";
    user<T extends Prisma.UserDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.UserDefaultArgs<ExtArgs>>): Prisma.Prisma__UserClient<runtime.Types.Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    showtime<T extends Prisma.ShowtimeDefaultArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.ShowtimeDefaultArgs<ExtArgs>>): Prisma.Prisma__ShowtimeClient<runtime.Types.Result.GetResult<Prisma.$ShowtimePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>;
    tickets<T extends Prisma.Booking$ticketsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Booking$ticketsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingTicketPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    combos<T extends Prisma.Booking$combosArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Booking$combosArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$BookingComboPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    payments<T extends Prisma.Booking$paymentsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Booking$paymentsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$PaymentPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
    invoice<T extends Prisma.Booking$invoiceArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Booking$invoiceArgs<ExtArgs>>): Prisma.Prisma__InvoiceClient<runtime.Types.Result.GetResult<Prisma.$InvoicePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>;
    refunds<T extends Prisma.Booking$refundsArgs<ExtArgs> = {}>(args?: Prisma.Subset<T, Prisma.Booking$refundsArgs<ExtArgs>>): Prisma.PrismaPromise<runtime.Types.Result.GetResult<Prisma.$RefundPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>;
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
 * Fields of the Booking model
 */
export interface BookingFieldRefs {
    readonly id: Prisma.FieldRef<"Booking", 'String'>;
    readonly bookingCode: Prisma.FieldRef<"Booking", 'String'>;
    readonly userId: Prisma.FieldRef<"Booking", 'String'>;
    readonly showtimeId: Prisma.FieldRef<"Booking", 'String'>;
    readonly totalTicketPrice: Prisma.FieldRef<"Booking", 'Float'>;
    readonly totalComboPrice: Prisma.FieldRef<"Booking", 'Float'>;
    readonly discountAmount: Prisma.FieldRef<"Booking", 'Float'>;
    readonly finalAmount: Prisma.FieldRef<"Booking", 'Float'>;
    readonly status: Prisma.FieldRef<"Booking", 'BookingStatus'>;
    readonly paymentStatus: Prisma.FieldRef<"Booking", 'BookingPaymentStatus'>;
    readonly bookedAt: Prisma.FieldRef<"Booking", 'DateTime'>;
    readonly expiresAt: Prisma.FieldRef<"Booking", 'DateTime'>;
}
/**
 * Booking findUnique
 */
export type BookingFindUniqueArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
    /**
     * Filter, which Booking to fetch.
     */
    where: Prisma.BookingWhereUniqueInput;
};
/**
 * Booking findUniqueOrThrow
 */
export type BookingFindUniqueOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
    /**
     * Filter, which Booking to fetch.
     */
    where: Prisma.BookingWhereUniqueInput;
};
/**
 * Booking findFirst
 */
export type BookingFindFirstArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
    /**
     * Filter, which Booking to fetch.
     */
    where?: Prisma.BookingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Bookings to fetch.
     */
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Bookings.
     */
    cursor?: Prisma.BookingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Bookings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Bookings.
     */
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
/**
 * Booking findFirstOrThrow
 */
export type BookingFindFirstOrThrowArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
    /**
     * Filter, which Booking to fetch.
     */
    where?: Prisma.BookingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Bookings to fetch.
     */
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for searching for Bookings.
     */
    cursor?: Prisma.BookingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Bookings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Bookings.
     */
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
/**
 * Booking findMany
 */
export type BookingFindManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
    /**
     * Filter, which Bookings to fetch.
     */
    where?: Prisma.BookingWhereInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     *
     * Determine the order of Bookings to fetch.
     */
    orderBy?: Prisma.BookingOrderByWithRelationInput | Prisma.BookingOrderByWithRelationInput[];
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     *
     * Sets the position for listing Bookings.
     */
    cursor?: Prisma.BookingWhereUniqueInput;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Take `±n` Bookings from the position of the cursor.
     */
    take?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     *
     * Skip the first `n` Bookings.
     */
    skip?: number;
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     *
     * Filter by unique combinations of Bookings.
     */
    distinct?: Prisma.BookingScalarFieldEnum | Prisma.BookingScalarFieldEnum[];
};
/**
 * Booking create
 */
export type BookingCreateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
    /**
     * The data needed to create a Booking.
     */
    data: Prisma.XOR<Prisma.BookingCreateInput, Prisma.BookingUncheckedCreateInput>;
};
/**
 * Booking createMany
 */
export type BookingCreateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to create many Bookings.
     */
    data: Prisma.BookingCreateManyInput | Prisma.BookingCreateManyInput[];
    skipDuplicates?: boolean;
};
/**
 * Booking createManyAndReturn
 */
export type BookingCreateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelectCreateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * The data used to create many Bookings.
     */
    data: Prisma.BookingCreateManyInput | Prisma.BookingCreateManyInput[];
    skipDuplicates?: boolean;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingIncludeCreateManyAndReturn<ExtArgs> | null;
};
/**
 * Booking update
 */
export type BookingUpdateArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
    /**
     * The data needed to update a Booking.
     */
    data: Prisma.XOR<Prisma.BookingUpdateInput, Prisma.BookingUncheckedUpdateInput>;
    /**
     * Choose, which Booking to update.
     */
    where: Prisma.BookingWhereUniqueInput;
};
/**
 * Booking updateMany
 */
export type BookingUpdateManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * The data used to update Bookings.
     */
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyInput>;
    /**
     * Filter which Bookings to update
     */
    where?: Prisma.BookingWhereInput;
    /**
     * Limit how many Bookings to update.
     */
    limit?: number;
};
/**
 * Booking updateManyAndReturn
 */
export type BookingUpdateManyAndReturnArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelectUpdateManyAndReturn<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * The data used to update Bookings.
     */
    data: Prisma.XOR<Prisma.BookingUpdateManyMutationInput, Prisma.BookingUncheckedUpdateManyInput>;
    /**
     * Filter which Bookings to update
     */
    where?: Prisma.BookingWhereInput;
    /**
     * Limit how many Bookings to update.
     */
    limit?: number;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingIncludeUpdateManyAndReturn<ExtArgs> | null;
};
/**
 * Booking upsert
 */
export type BookingUpsertArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
    /**
     * The filter to search for the Booking to update in case it exists.
     */
    where: Prisma.BookingWhereUniqueInput;
    /**
     * In case the Booking found by the `where` argument doesn't exist, create a new Booking with this data.
     */
    create: Prisma.XOR<Prisma.BookingCreateInput, Prisma.BookingUncheckedCreateInput>;
    /**
     * In case the Booking was found with the provided `where` argument, update it with this data.
     */
    update: Prisma.XOR<Prisma.BookingUpdateInput, Prisma.BookingUncheckedUpdateInput>;
};
/**
 * Booking delete
 */
export type BookingDeleteArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
    /**
     * Filter which Booking to delete.
     */
    where: Prisma.BookingWhereUniqueInput;
};
/**
 * Booking deleteMany
 */
export type BookingDeleteManyArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Filter which Bookings to delete
     */
    where?: Prisma.BookingWhereInput;
    /**
     * Limit how many Bookings to delete.
     */
    limit?: number;
};
/**
 * Booking.tickets
 */
export type Booking$ticketsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingTicket
     */
    select?: Prisma.BookingTicketSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BookingTicket
     */
    omit?: Prisma.BookingTicketOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingTicketInclude<ExtArgs> | null;
    where?: Prisma.BookingTicketWhereInput;
    orderBy?: Prisma.BookingTicketOrderByWithRelationInput | Prisma.BookingTicketOrderByWithRelationInput[];
    cursor?: Prisma.BookingTicketWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingTicketScalarFieldEnum | Prisma.BookingTicketScalarFieldEnum[];
};
/**
 * Booking.combos
 */
export type Booking$combosArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the BookingCombo
     */
    select?: Prisma.BookingComboSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the BookingCombo
     */
    omit?: Prisma.BookingComboOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingComboInclude<ExtArgs> | null;
    where?: Prisma.BookingComboWhereInput;
    orderBy?: Prisma.BookingComboOrderByWithRelationInput | Prisma.BookingComboOrderByWithRelationInput[];
    cursor?: Prisma.BookingComboWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.BookingComboScalarFieldEnum | Prisma.BookingComboScalarFieldEnum[];
};
/**
 * Booking.payments
 */
export type Booking$paymentsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Payment
     */
    select?: Prisma.PaymentSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Payment
     */
    omit?: Prisma.PaymentOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.PaymentInclude<ExtArgs> | null;
    where?: Prisma.PaymentWhereInput;
    orderBy?: Prisma.PaymentOrderByWithRelationInput | Prisma.PaymentOrderByWithRelationInput[];
    cursor?: Prisma.PaymentWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.PaymentScalarFieldEnum | Prisma.PaymentScalarFieldEnum[];
};
/**
 * Booking.invoice
 */
export type Booking$invoiceArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Invoice
     */
    select?: Prisma.InvoiceSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Invoice
     */
    omit?: Prisma.InvoiceOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.InvoiceInclude<ExtArgs> | null;
    where?: Prisma.InvoiceWhereInput;
};
/**
 * Booking.refunds
 */
export type Booking$refundsArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Refund
     */
    select?: Prisma.RefundSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Refund
     */
    omit?: Prisma.RefundOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.RefundInclude<ExtArgs> | null;
    where?: Prisma.RefundWhereInput;
    orderBy?: Prisma.RefundOrderByWithRelationInput | Prisma.RefundOrderByWithRelationInput[];
    cursor?: Prisma.RefundWhereUniqueInput;
    take?: number;
    skip?: number;
    distinct?: Prisma.RefundScalarFieldEnum | Prisma.RefundScalarFieldEnum[];
};
/**
 * Booking without action
 */
export type BookingDefaultArgs<ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Booking
     */
    select?: Prisma.BookingSelect<ExtArgs> | null;
    /**
     * Omit specific fields from the Booking
     */
    omit?: Prisma.BookingOmit<ExtArgs> | null;
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: Prisma.BookingInclude<ExtArgs> | null;
};
//# sourceMappingURL=Booking.d.ts.map
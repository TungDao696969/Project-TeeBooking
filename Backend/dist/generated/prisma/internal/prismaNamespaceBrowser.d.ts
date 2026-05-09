import * as runtime from "@prisma/client/runtime/index-browser";
export type * from '../models';
export type * from './prismaNamespace';
export declare const Decimal: typeof runtime.Decimal;
export declare const NullTypes: {
    DbNull: (new (secret: never) => typeof runtime.DbNull);
    JsonNull: (new (secret: never) => typeof runtime.JsonNull);
    AnyNull: (new (secret: never) => typeof runtime.AnyNull);
};
/**
 * Helper for filtering JSON entries that have `null` on the database (empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const DbNull: import("@prisma/client-runtime-utils").DbNullClass;
/**
 * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const JsonNull: import("@prisma/client-runtime-utils").JsonNullClass;
/**
 * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
 *
 * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
 */
export declare const AnyNull: import("@prisma/client-runtime-utils").AnyNullClass;
export declare const ModelName: {
    readonly AdminLog: "AdminLog";
    readonly AnalyticsDaily: "AnalyticsDaily";
    readonly Booking: "Booking";
    readonly Category: "Category";
    readonly Coupon: "Coupon";
    readonly Notification: "Notification";
    readonly Payment: "Payment";
    readonly Review: "Review";
    readonly Tour: "Tour";
    readonly TourAvailability: "TourAvailability";
    readonly TourImage: "TourImage";
    readonly User: "User";
    readonly Wishlist: "Wishlist";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const AdminLogScalarFieldEnum: {
    readonly id: "id";
    readonly adminId: "adminId";
    readonly action: "action";
    readonly targetType: "targetType";
    readonly targetId: "targetId";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type AdminLogScalarFieldEnum = (typeof AdminLogScalarFieldEnum)[keyof typeof AdminLogScalarFieldEnum];
export declare const AnalyticsDailyScalarFieldEnum: {
    readonly id: "id";
    readonly date: "date";
    readonly totalUsers: "totalUsers";
    readonly totalBookings: "totalBookings";
    readonly totalRevenue: "totalRevenue";
    readonly cancellationRate: "cancellationRate";
    readonly topTourId: "topTourId";
    readonly createdAt: "createdAt";
};
export type AnalyticsDailyScalarFieldEnum = (typeof AnalyticsDailyScalarFieldEnum)[keyof typeof AnalyticsDailyScalarFieldEnum];
export declare const BookingScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tourId: "tourId";
    readonly couponId: "couponId";
    readonly bookingDate: "bookingDate";
    readonly guestCount: "guestCount";
    readonly unitPrice: "unitPrice";
    readonly subtotal: "subtotal";
    readonly discountAmount: "discountAmount";
    readonly totalPrice: "totalPrice";
    readonly status: "status";
    readonly paymentStatus: "paymentStatus";
    readonly specialRequests: "specialRequests";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum];
export declare const CategoryScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly description: "description";
    readonly createdAt: "createdAt";
};
export type CategoryScalarFieldEnum = (typeof CategoryScalarFieldEnum)[keyof typeof CategoryScalarFieldEnum];
export declare const CouponScalarFieldEnum: {
    readonly id: "id";
    readonly code: "code";
    readonly discountType: "discountType";
    readonly value: "value";
    readonly usageLimit: "usageLimit";
    readonly usedCount: "usedCount";
    readonly expiresAt: "expiresAt";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type CouponScalarFieldEnum = (typeof CouponScalarFieldEnum)[keyof typeof CouponScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly title: "title";
    readonly message: "message";
    readonly isRead: "isRead";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly paymentMethod: "paymentMethod";
    readonly transactionId: "transactionId";
    readonly amount: "amount";
    readonly currency: "currency";
    readonly status: "status";
    readonly paidAt: "paidAt";
    readonly createdAt: "createdAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tourId: "tourId";
    readonly bookingId: "bookingId";
    readonly rating: "rating";
    readonly comment: "comment";
    readonly isVerified: "isVerified";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const TourScalarFieldEnum: {
    readonly id: "id";
    readonly guideId: "guideId";
    readonly categoryId: "categoryId";
    readonly title: "title";
    readonly slug: "slug";
    readonly description: "description";
    readonly location: "location";
    readonly meetingPoint: "meetingPoint";
    readonly durationHours: "durationHours";
    readonly maxGuests: "maxGuests";
    readonly price: "price";
    readonly currency: "currency";
    readonly cancellationPolicy: "cancellationPolicy";
    readonly included: "included";
    readonly excluded: "excluded";
    readonly faq: "faq";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TourScalarFieldEnum = (typeof TourScalarFieldEnum)[keyof typeof TourScalarFieldEnum];
export declare const TourAvailabilityScalarFieldEnum: {
    readonly id: "id";
    readonly tourId: "tourId";
    readonly availableDate: "availableDate";
    readonly availableSlots: "availableSlots";
    readonly createdAt: "createdAt";
};
export type TourAvailabilityScalarFieldEnum = (typeof TourAvailabilityScalarFieldEnum)[keyof typeof TourAvailabilityScalarFieldEnum];
export declare const TourImageScalarFieldEnum: {
    readonly id: "id";
    readonly tourId: "tourId";
    readonly imageUrl: "imageUrl";
    readonly isCover: "isCover";
    readonly createdAt: "createdAt";
};
export type TourImageScalarFieldEnum = (typeof TourImageScalarFieldEnum)[keyof typeof TourImageScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly email: "email";
    readonly passwordHash: "passwordHash";
    readonly phone: "phone";
    readonly avatarUrl: "avatarUrl";
    readonly country: "country";
    readonly language: "language";
    readonly role: "role";
    readonly isVerified: "isVerified";
    readonly resetPasswordToken: "resetPasswordToken";
    readonly resetPasswordExpires: "resetPasswordExpires";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const WishlistScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly tourId: "tourId";
    readonly createdAt: "createdAt";
};
export type WishlistScalarFieldEnum = (typeof WishlistScalarFieldEnum)[keyof typeof WishlistScalarFieldEnum];
export declare const SortOrder: {
    readonly asc: "asc";
    readonly desc: "desc";
};
export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder];
export declare const QueryMode: {
    readonly default: "default";
    readonly insensitive: "insensitive";
};
export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode];
export declare const NullsOrder: {
    readonly first: "first";
    readonly last: "last";
};
export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder];
//# sourceMappingURL=prismaNamespaceBrowser.d.ts.map
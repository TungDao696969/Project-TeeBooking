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
    readonly ActivityLog: "ActivityLog";
    readonly Banner: "Banner";
    readonly BlogPost: "BlogPost";
    readonly Booking: "Booking";
    readonly BookingCombo: "BookingCombo";
    readonly BookingTicket: "BookingTicket";
    readonly Cinema: "Cinema";
    readonly CinemaRoom: "CinemaRoom";
    readonly City: "City";
    readonly FoodCombo: "FoodCombo";
    readonly Genre: "Genre";
    readonly Invoice: "Invoice";
    readonly Membership: "Membership";
    readonly Movie: "Movie";
    readonly MovieCast: "MovieCast";
    readonly MovieGenre: "MovieGenre";
    readonly Notification: "Notification";
    readonly Payment: "Payment";
    readonly Person: "Person";
    readonly Promotion: "Promotion";
    readonly Refund: "Refund";
    readonly Review: "Review";
    readonly Seat: "Seat";
    readonly Showtime: "Showtime";
    readonly ShowtimeSeat: "ShowtimeSeat";
    readonly ShowtimeTicketType: "ShowtimeTicketType";
    readonly TicketType: "TicketType";
    readonly Trailer: "Trailer";
    readonly User: "User";
    readonly UserAddress: "UserAddress";
    readonly UserVoucher: "UserVoucher";
    readonly Voucher: "Voucher";
};
export type ModelName = (typeof ModelName)[keyof typeof ModelName];
export declare const TransactionIsolationLevel: {
    readonly ReadUncommitted: "ReadUncommitted";
    readonly ReadCommitted: "ReadCommitted";
    readonly RepeatableRead: "RepeatableRead";
    readonly Serializable: "Serializable";
};
export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel];
export declare const ActivityLogScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly action: "action";
    readonly targetType: "targetType";
    readonly targetId: "targetId";
    readonly ipAddress: "ipAddress";
    readonly userAgent: "userAgent";
    readonly createdAt: "createdAt";
};
export type ActivityLogScalarFieldEnum = (typeof ActivityLogScalarFieldEnum)[keyof typeof ActivityLogScalarFieldEnum];
export declare const BannerScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly imageUrl: "imageUrl";
    readonly redirectUrl: "redirectUrl";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type BannerScalarFieldEnum = (typeof BannerScalarFieldEnum)[keyof typeof BannerScalarFieldEnum];
export declare const BlogPostScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly slug: "slug";
    readonly thumbnailUrl: "thumbnailUrl";
    readonly content: "content";
    readonly authorId: "authorId";
    readonly publishedAt: "publishedAt";
    readonly createdAt: "createdAt";
};
export type BlogPostScalarFieldEnum = (typeof BlogPostScalarFieldEnum)[keyof typeof BlogPostScalarFieldEnum];
export declare const BookingScalarFieldEnum: {
    readonly id: "id";
    readonly bookingCode: "bookingCode";
    readonly userId: "userId";
    readonly showtimeId: "showtimeId";
    readonly totalTicketPrice: "totalTicketPrice";
    readonly totalComboPrice: "totalComboPrice";
    readonly discountAmount: "discountAmount";
    readonly finalAmount: "finalAmount";
    readonly status: "status";
    readonly paymentStatus: "paymentStatus";
    readonly bookedAt: "bookedAt";
    readonly expiresAt: "expiresAt";
};
export type BookingScalarFieldEnum = (typeof BookingScalarFieldEnum)[keyof typeof BookingScalarFieldEnum];
export declare const BookingComboScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly comboId: "comboId";
    readonly quantity: "quantity";
    readonly unitPrice: "unitPrice";
    readonly totalPrice: "totalPrice";
};
export type BookingComboScalarFieldEnum = (typeof BookingComboScalarFieldEnum)[keyof typeof BookingComboScalarFieldEnum];
export declare const BookingTicketScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly showtimeSeatId: "showtimeSeatId";
    readonly ticketPrice: "ticketPrice";
    readonly qrCode: "qrCode";
    readonly checkinStatus: "checkinStatus";
    readonly checkedInAt: "checkedInAt";
};
export type BookingTicketScalarFieldEnum = (typeof BookingTicketScalarFieldEnum)[keyof typeof BookingTicketScalarFieldEnum];
export declare const CinemaScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly hotline: "hotline";
    readonly email: "email";
    readonly cityId: "cityId";
    readonly province: "province";
    readonly district: "district";
    readonly ward: "ward";
    readonly address: "address";
    readonly latitude: "latitude";
    readonly longitude: "longitude";
    readonly openingHours: "openingHours";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type CinemaScalarFieldEnum = (typeof CinemaScalarFieldEnum)[keyof typeof CinemaScalarFieldEnum];
export declare const CinemaRoomScalarFieldEnum: {
    readonly id: "id";
    readonly cinemaId: "cinemaId";
    readonly roomName: "roomName";
    readonly roomType: "roomType";
    readonly totalSeats: "totalSeats";
    readonly screenType: "screenType";
    readonly soundSystem: "soundSystem";
    readonly isActive: "isActive";
    readonly deletedAt: "deletedAt";
    readonly createdAt: "createdAt";
};
export type CinemaRoomScalarFieldEnum = (typeof CinemaRoomScalarFieldEnum)[keyof typeof CinemaRoomScalarFieldEnum];
export declare const CityScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type CityScalarFieldEnum = (typeof CityScalarFieldEnum)[keyof typeof CityScalarFieldEnum];
export declare const FoodComboScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly description: "description";
    readonly imageUrl: "imageUrl";
    readonly price: "price";
    readonly stockQuantity: "stockQuantity";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type FoodComboScalarFieldEnum = (typeof FoodComboScalarFieldEnum)[keyof typeof FoodComboScalarFieldEnum];
export declare const GenreScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly slug: "slug";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type GenreScalarFieldEnum = (typeof GenreScalarFieldEnum)[keyof typeof GenreScalarFieldEnum];
export declare const InvoiceScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly invoiceNumber: "invoiceNumber";
    readonly subtotal: "subtotal";
    readonly discount: "discount";
    readonly total: "total";
    readonly pdfUrl: "pdfUrl";
    readonly issuedAt: "issuedAt";
};
export type InvoiceScalarFieldEnum = (typeof InvoiceScalarFieldEnum)[keyof typeof InvoiceScalarFieldEnum];
export declare const MembershipScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly membershipCode: "membershipCode";
    readonly level: "level";
    readonly points: "points";
    readonly lifetimePoints: "lifetimePoints";
    readonly joinedAt: "joinedAt";
    readonly expiredAt: "expiredAt";
};
export type MembershipScalarFieldEnum = (typeof MembershipScalarFieldEnum)[keyof typeof MembershipScalarFieldEnum];
export declare const MovieScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly slug: "slug";
    readonly originalTitle: "originalTitle";
    readonly description: "description";
    readonly durationMinutes: "durationMinutes";
    readonly releaseDate: "releaseDate";
    readonly endDate: "endDate";
    readonly ageRating: "ageRating";
    readonly language: "language";
    readonly subtitle: "subtitle";
    readonly trailerUrl: "trailerUrl";
    readonly posterUrl: "posterUrl";
    readonly bannerUrl: "bannerUrl";
    readonly status: "status";
    readonly country: "country";
    readonly producer: "producer";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type MovieScalarFieldEnum = (typeof MovieScalarFieldEnum)[keyof typeof MovieScalarFieldEnum];
export declare const MovieCastScalarFieldEnum: {
    readonly id: "id";
    readonly movieId: "movieId";
    readonly personId: "personId";
    readonly roleType: "roleType";
    readonly characterName: "characterName";
};
export type MovieCastScalarFieldEnum = (typeof MovieCastScalarFieldEnum)[keyof typeof MovieCastScalarFieldEnum];
export declare const MovieGenreScalarFieldEnum: {
    readonly movieId: "movieId";
    readonly genreId: "genreId";
};
export type MovieGenreScalarFieldEnum = (typeof MovieGenreScalarFieldEnum)[keyof typeof MovieGenreScalarFieldEnum];
export declare const NotificationScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly title: "title";
    readonly content: "content";
    readonly type: "type";
    readonly isRead: "isRead";
    readonly createdAt: "createdAt";
};
export type NotificationScalarFieldEnum = (typeof NotificationScalarFieldEnum)[keyof typeof NotificationScalarFieldEnum];
export declare const PaymentScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly paymentMethod: "paymentMethod";
    readonly paymentGateway: "paymentGateway";
    readonly transactionCode: "transactionCode";
    readonly amount: "amount";
    readonly status: "status";
    readonly paidAt: "paidAt";
    readonly expiresAt: "expiresAt";
    readonly createdAt: "createdAt";
};
export type PaymentScalarFieldEnum = (typeof PaymentScalarFieldEnum)[keyof typeof PaymentScalarFieldEnum];
export declare const PersonScalarFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly avatarUrl: "avatarUrl";
    readonly bio: "bio";
    readonly birthDate: "birthDate";
    readonly nationality: "nationality";
};
export type PersonScalarFieldEnum = (typeof PersonScalarFieldEnum)[keyof typeof PersonScalarFieldEnum];
export declare const PromotionScalarFieldEnum: {
    readonly id: "id";
    readonly title: "title";
    readonly description: "description";
    readonly imageUrl: "imageUrl";
    readonly type: "type";
    readonly discountValue: "discountValue";
    readonly minOrderValue: "minOrderValue";
    readonly maxDiscount: "maxDiscount";
    readonly startDate: "startDate";
    readonly endDate: "endDate";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type PromotionScalarFieldEnum = (typeof PromotionScalarFieldEnum)[keyof typeof PromotionScalarFieldEnum];
export declare const RefundScalarFieldEnum: {
    readonly id: "id";
    readonly bookingId: "bookingId";
    readonly paymentId: "paymentId";
    readonly refundAmount: "refundAmount";
    readonly refundReason: "refundReason";
    readonly refundStatus: "refundStatus";
    readonly processedAt: "processedAt";
};
export type RefundScalarFieldEnum = (typeof RefundScalarFieldEnum)[keyof typeof RefundScalarFieldEnum];
export declare const ReviewScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly movieId: "movieId";
    readonly rating: "rating";
    readonly comment: "comment";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type ReviewScalarFieldEnum = (typeof ReviewScalarFieldEnum)[keyof typeof ReviewScalarFieldEnum];
export declare const SeatScalarFieldEnum: {
    readonly id: "id";
    readonly roomId: "roomId";
    readonly seatRow: "seatRow";
    readonly seatNumber: "seatNumber";
    readonly seatCode: "seatCode";
    readonly seatType: "seatType";
    readonly extraPrice: "extraPrice";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly deletedAt: "deletedAt";
};
export type SeatScalarFieldEnum = (typeof SeatScalarFieldEnum)[keyof typeof SeatScalarFieldEnum];
export declare const ShowtimeScalarFieldEnum: {
    readonly id: "id";
    readonly movieId: "movieId";
    readonly roomId: "roomId";
    readonly showDate: "showDate";
    readonly startTime: "startTime";
    readonly endTime: "endTime";
    readonly basePrice: "basePrice";
    readonly format: "format";
    readonly language: "language";
    readonly subtitle: "subtitle";
    readonly isActive: "isActive";
    readonly deletedAt: "deletedAt";
    readonly createdAt: "createdAt";
};
export type ShowtimeScalarFieldEnum = (typeof ShowtimeScalarFieldEnum)[keyof typeof ShowtimeScalarFieldEnum];
export declare const ShowtimeSeatScalarFieldEnum: {
    readonly id: "id";
    readonly showtimeId: "showtimeId";
    readonly seatId: "seatId";
    readonly status: "status";
    readonly finalPrice: "finalPrice";
    readonly lockedUntil: "lockedUntil";
};
export type ShowtimeSeatScalarFieldEnum = (typeof ShowtimeSeatScalarFieldEnum)[keyof typeof ShowtimeSeatScalarFieldEnum];
export declare const ShowtimeTicketTypeScalarFieldEnum: {
    readonly id: "id";
    readonly showtimeId: "showtimeId";
    readonly ticketTypeId: "ticketTypeId";
    readonly price: "price";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type ShowtimeTicketTypeScalarFieldEnum = (typeof ShowtimeTicketTypeScalarFieldEnum)[keyof typeof ShowtimeTicketTypeScalarFieldEnum];
export declare const TicketTypeScalarFieldEnum: {
    readonly id: "id";
    readonly name: "name";
    readonly code: "code";
    readonly description: "description";
    readonly type: "type";
    readonly price: "price";
    readonly cinemaId: "cinemaId";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
};
export type TicketTypeScalarFieldEnum = (typeof TicketTypeScalarFieldEnum)[keyof typeof TicketTypeScalarFieldEnum];
export declare const TrailerScalarFieldEnum: {
    readonly id: "id";
    readonly movieId: "movieId";
    readonly title: "title";
    readonly videoUrl: "videoUrl";
    readonly thumbnailUrl: "thumbnailUrl";
    readonly type: "type";
    readonly isActive: "isActive";
    readonly sortOrder: "sortOrder";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
};
export type TrailerScalarFieldEnum = (typeof TrailerScalarFieldEnum)[keyof typeof TrailerScalarFieldEnum];
export declare const UserScalarFieldEnum: {
    readonly id: "id";
    readonly fullName: "fullName";
    readonly email: "email";
    readonly phone: "phone";
    readonly passwordHash: "passwordHash";
    readonly avatarUrl: "avatarUrl";
    readonly gender: "gender";
    readonly dateOfBirth: "dateOfBirth";
    readonly role: "role";
    readonly verificationCode: "verificationCode";
    readonly resetPasswordCode: "resetPasswordCode";
    readonly resetPasswordExpiresAt: "resetPasswordExpiresAt";
    readonly refreshToken: "refreshToken";
    readonly isVerified: "isVerified";
    readonly isActive: "isActive";
    readonly createdAt: "createdAt";
    readonly updatedAt: "updatedAt";
    readonly deletedAt: "deletedAt";
};
export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum];
export declare const UserAddressScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly province: "province";
    readonly district: "district";
    readonly ward: "ward";
    readonly addressDetail: "addressDetail";
    readonly isDefault: "isDefault";
    readonly createdAt: "createdAt";
};
export type UserAddressScalarFieldEnum = (typeof UserAddressScalarFieldEnum)[keyof typeof UserAddressScalarFieldEnum];
export declare const UserVoucherScalarFieldEnum: {
    readonly id: "id";
    readonly userId: "userId";
    readonly voucherId: "voucherId";
    readonly usedAt: "usedAt";
};
export type UserVoucherScalarFieldEnum = (typeof UserVoucherScalarFieldEnum)[keyof typeof UserVoucherScalarFieldEnum];
export declare const VoucherScalarFieldEnum: {
    readonly id: "id";
    readonly promotionId: "promotionId";
    readonly code: "code";
    readonly usageLimit: "usageLimit";
    readonly usedCount: "usedCount";
    readonly status: "status";
    readonly createdAt: "createdAt";
};
export type VoucherScalarFieldEnum = (typeof VoucherScalarFieldEnum)[keyof typeof VoucherScalarFieldEnum];
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
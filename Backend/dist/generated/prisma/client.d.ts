import * as runtime from "@prisma/client/runtime/client";
import * as $Class from "./internal/class";
import * as Prisma from "./internal/prismaNamespace";
export * as $Enums from './enums';
export * from "./enums";
/**
 * ## Prisma Client
 *
 * Type-safe database client for TypeScript
 * @example
 * ```
 * const prisma = new PrismaClient({
 *   adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL })
 * })
 * // Fetch zero or more ActivityLogs
 * const activityLogs = await prisma.activityLog.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model ActivityLog
 *
 */
export type ActivityLog = Prisma.ActivityLogModel;
/**
 * Model Banner
 *
 */
export type Banner = Prisma.BannerModel;
/**
 * Model BlogPost
 *
 */
export type BlogPost = Prisma.BlogPostModel;
/**
 * Model Booking
 *
 */
export type Booking = Prisma.BookingModel;
/**
 * Model BookingCombo
 *
 */
export type BookingCombo = Prisma.BookingComboModel;
/**
 * Model BookingTicket
 *
 */
export type BookingTicket = Prisma.BookingTicketModel;
/**
 * Model Cinema
 *
 */
export type Cinema = Prisma.CinemaModel;
/**
 * Model CinemaRoom
 *
 */
export type CinemaRoom = Prisma.CinemaRoomModel;
/**
 * Model FoodCombo
 *
 */
export type FoodCombo = Prisma.FoodComboModel;
/**
 * Model Genre
 *
 */
export type Genre = Prisma.GenreModel;
/**
 * Model Membership
 *
 */
export type Membership = Prisma.MembershipModel;
/**
 * Model Movie
 *
 */
export type Movie = Prisma.MovieModel;
/**
 * Model MovieCast
 *
 */
export type MovieCast = Prisma.MovieCastModel;
/**
 * Model MovieGenre
 *
 */
export type MovieGenre = Prisma.MovieGenreModel;
/**
 * Model Notification
 *
 */
export type Notification = Prisma.NotificationModel;
/**
 * Model Payment
 *
 */
export type Payment = Prisma.PaymentModel;
/**
 * Model Person
 *
 */
export type Person = Prisma.PersonModel;
/**
 * Model Promotion
 *
 */
export type Promotion = Prisma.PromotionModel;
/**
 * Model Refund
 *
 */
export type Refund = Prisma.RefundModel;
/**
 * Model Review
 *
 */
export type Review = Prisma.ReviewModel;
/**
 * Model Seat
 *
 */
export type Seat = Prisma.SeatModel;
/**
 * Model Showtime
 *
 */
export type Showtime = Prisma.ShowtimeModel;
/**
 * Model ShowtimeSeat
 *
 */
export type ShowtimeSeat = Prisma.ShowtimeSeatModel;
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model UserAddress
 *
 */
export type UserAddress = Prisma.UserAddressModel;
/**
 * Model UserVoucher
 *
 */
export type UserVoucher = Prisma.UserVoucherModel;
/**
 * Model Voucher
 *
 */
export type Voucher = Prisma.VoucherModel;
//# sourceMappingURL=client.d.ts.map
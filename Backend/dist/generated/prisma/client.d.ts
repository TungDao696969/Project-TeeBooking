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
 * // Fetch zero or more AdminLogs
 * const adminLogs = await prisma.adminLog.findMany()
 * ```
 *
 * Read more in our [docs](https://pris.ly/d/client).
 */
export declare const PrismaClient: $Class.PrismaClientConstructor;
export type PrismaClient<LogOpts extends Prisma.LogLevel = never, OmitOpts extends Prisma.PrismaClientOptions["omit"] = Prisma.PrismaClientOptions["omit"], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> = $Class.PrismaClient<LogOpts, OmitOpts, ExtArgs>;
export { Prisma };
/**
 * Model AdminLog
 *
 */
export type AdminLog = Prisma.AdminLogModel;
/**
 * Model AnalyticsDaily
 *
 */
export type AnalyticsDaily = Prisma.AnalyticsDailyModel;
/**
 * Model Booking
 *
 */
export type Booking = Prisma.BookingModel;
/**
 * Model Category
 *
 */
export type Category = Prisma.CategoryModel;
/**
 * Model Coupon
 *
 */
export type Coupon = Prisma.CouponModel;
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
 * Model Review
 *
 */
export type Review = Prisma.ReviewModel;
/**
 * Model Tour
 *
 */
export type Tour = Prisma.TourModel;
/**
 * Model TourAvailability
 *
 */
export type TourAvailability = Prisma.TourAvailabilityModel;
/**
 * Model TourImage
 *
 */
export type TourImage = Prisma.TourImageModel;
/**
 * Model User
 *
 */
export type User = Prisma.UserModel;
/**
 * Model Wishlist
 *
 */
export type Wishlist = Prisma.WishlistModel;
//# sourceMappingURL=client.d.ts.map
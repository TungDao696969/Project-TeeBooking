import * as runtime from "@prisma/client/runtime/client";
import type * as Prisma from "./prismaNamespace";
export type LogOptions<ClientOptions extends Prisma.PrismaClientOptions> = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never;
export interface PrismaClientConstructor {
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
    new <Options extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions, LogOpts extends LogOptions<Options> = LogOptions<Options>, OmitOpts extends Prisma.PrismaClientOptions['omit'] = Options extends {
        omit: infer U;
    } ? U : Prisma.PrismaClientOptions['omit'], ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs>(options: Prisma.Subset<Options, Prisma.PrismaClientOptions>): PrismaClient<LogOpts, OmitOpts, ExtArgs>;
}
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
export interface PrismaClient<in LogOpts extends Prisma.LogLevel = never, in out OmitOpts extends Prisma.PrismaClientOptions['omit'] = undefined, in out ExtArgs extends runtime.Types.Extensions.InternalArgs = runtime.Types.Extensions.DefaultArgs> {
    [K: symbol]: {
        types: Prisma.TypeMap<ExtArgs>['other'];
    };
    $on<V extends LogOpts>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;
    /**
     * Connect with the database
     */
    $connect(): runtime.Types.Utils.JsPromise<void>;
    /**
     * Disconnect from the database
     */
    $disconnect(): runtime.Types.Utils.JsPromise<void>;
    /**
       * Executes a prepared raw query and returns the number of affected rows.
       * @example
       * ```
       * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
       * ```
       *
       * Read more in our [docs](https://pris.ly/d/raw-queries).
       */
    $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Executes a raw query and returns the number of affected rows.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;
    /**
     * Performs a prepared raw query and returns the `SELECT` data.
     * @example
     * ```
     * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Performs a raw query and returns the `SELECT` data.
     * Susceptible to SQL injections, see documentation.
     * @example
     * ```
     * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
     * ```
     *
     * Read more in our [docs](https://pris.ly/d/raw-queries).
     */
    $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;
    /**
     * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
     * @example
     * ```
     * const [george, bob, alice] = await prisma.$transaction([
     *   prisma.user.create({ data: { name: 'George' } }),
     *   prisma.user.create({ data: { name: 'Bob' } }),
     *   prisma.user.create({ data: { name: 'Alice' } }),
     * ])
     * ```
     *
     * Read more in our [docs](https://www.prisma.io/docs/orm/prisma-client/queries/transactions).
     */
    $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>;
    $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => runtime.Types.Utils.JsPromise<R>, options?: {
        maxWait?: number;
        timeout?: number;
        isolationLevel?: Prisma.TransactionIsolationLevel;
    }): runtime.Types.Utils.JsPromise<R>;
    $extends: runtime.Types.Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<OmitOpts>, ExtArgs, runtime.Types.Utils.Call<Prisma.TypeMapCb<OmitOpts>, {
        extArgs: ExtArgs;
    }>>;
    /**
 * `prisma.activityLog`: Exposes CRUD operations for the **ActivityLog** model.
  * Example usage:
  * ```ts
  * // Fetch zero or more ActivityLogs
  * const activityLogs = await prisma.activityLog.findMany()
  * ```
  */
    get activityLog(): Prisma.ActivityLogDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.banner`: Exposes CRUD operations for the **Banner** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Banners
      * const banners = await prisma.banner.findMany()
      * ```
      */
    get banner(): Prisma.BannerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.blogPost`: Exposes CRUD operations for the **BlogPost** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more BlogPosts
      * const blogPosts = await prisma.blogPost.findMany()
      * ```
      */
    get blogPost(): Prisma.BlogPostDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.booking`: Exposes CRUD operations for the **Booking** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Bookings
      * const bookings = await prisma.booking.findMany()
      * ```
      */
    get booking(): Prisma.BookingDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.bookingCombo`: Exposes CRUD operations for the **BookingCombo** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more BookingCombos
      * const bookingCombos = await prisma.bookingCombo.findMany()
      * ```
      */
    get bookingCombo(): Prisma.BookingComboDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.bookingTicket`: Exposes CRUD operations for the **BookingTicket** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more BookingTickets
      * const bookingTickets = await prisma.bookingTicket.findMany()
      * ```
      */
    get bookingTicket(): Prisma.BookingTicketDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cinema`: Exposes CRUD operations for the **Cinema** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Cinemas
      * const cinemas = await prisma.cinema.findMany()
      * ```
      */
    get cinema(): Prisma.CinemaDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.cinemaRoom`: Exposes CRUD operations for the **CinemaRoom** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more CinemaRooms
      * const cinemaRooms = await prisma.cinemaRoom.findMany()
      * ```
      */
    get cinemaRoom(): Prisma.CinemaRoomDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.city`: Exposes CRUD operations for the **City** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Cities
      * const cities = await prisma.city.findMany()
      * ```
      */
    get city(): Prisma.CityDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.foodCombo`: Exposes CRUD operations for the **FoodCombo** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more FoodCombos
      * const foodCombos = await prisma.foodCombo.findMany()
      * ```
      */
    get foodCombo(): Prisma.FoodComboDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.genre`: Exposes CRUD operations for the **Genre** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Genres
      * const genres = await prisma.genre.findMany()
      * ```
      */
    get genre(): Prisma.GenreDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.invoice`: Exposes CRUD operations for the **Invoice** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Invoices
      * const invoices = await prisma.invoice.findMany()
      * ```
      */
    get invoice(): Prisma.InvoiceDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.membership`: Exposes CRUD operations for the **Membership** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Memberships
      * const memberships = await prisma.membership.findMany()
      * ```
      */
    get membership(): Prisma.MembershipDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.movie`: Exposes CRUD operations for the **Movie** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Movies
      * const movies = await prisma.movie.findMany()
      * ```
      */
    get movie(): Prisma.MovieDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.movieCast`: Exposes CRUD operations for the **MovieCast** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MovieCasts
      * const movieCasts = await prisma.movieCast.findMany()
      * ```
      */
    get movieCast(): Prisma.MovieCastDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.movieGenre`: Exposes CRUD operations for the **MovieGenre** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more MovieGenres
      * const movieGenres = await prisma.movieGenre.findMany()
      * ```
      */
    get movieGenre(): Prisma.MovieGenreDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.notification`: Exposes CRUD operations for the **Notification** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Notifications
      * const notifications = await prisma.notification.findMany()
      * ```
      */
    get notification(): Prisma.NotificationDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.payment`: Exposes CRUD operations for the **Payment** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Payments
      * const payments = await prisma.payment.findMany()
      * ```
      */
    get payment(): Prisma.PaymentDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.person`: Exposes CRUD operations for the **Person** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more People
      * const people = await prisma.person.findMany()
      * ```
      */
    get person(): Prisma.PersonDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.promotion`: Exposes CRUD operations for the **Promotion** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Promotions
      * const promotions = await prisma.promotion.findMany()
      * ```
      */
    get promotion(): Prisma.PromotionDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.refund`: Exposes CRUD operations for the **Refund** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Refunds
      * const refunds = await prisma.refund.findMany()
      * ```
      */
    get refund(): Prisma.RefundDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.review`: Exposes CRUD operations for the **Review** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Reviews
      * const reviews = await prisma.review.findMany()
      * ```
      */
    get review(): Prisma.ReviewDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.seat`: Exposes CRUD operations for the **Seat** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Seats
      * const seats = await prisma.seat.findMany()
      * ```
      */
    get seat(): Prisma.SeatDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.showtime`: Exposes CRUD operations for the **Showtime** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Showtimes
      * const showtimes = await prisma.showtime.findMany()
      * ```
      */
    get showtime(): Prisma.ShowtimeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.showtimeSeat`: Exposes CRUD operations for the **ShowtimeSeat** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ShowtimeSeats
      * const showtimeSeats = await prisma.showtimeSeat.findMany()
      * ```
      */
    get showtimeSeat(): Prisma.ShowtimeSeatDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.showtimeTicketType`: Exposes CRUD operations for the **ShowtimeTicketType** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more ShowtimeTicketTypes
      * const showtimeTicketTypes = await prisma.showtimeTicketType.findMany()
      * ```
      */
    get showtimeTicketType(): Prisma.ShowtimeTicketTypeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.ticketType`: Exposes CRUD operations for the **TicketType** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more TicketTypes
      * const ticketTypes = await prisma.ticketType.findMany()
      * ```
      */
    get ticketType(): Prisma.TicketTypeDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.trailer`: Exposes CRUD operations for the **Trailer** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Trailers
      * const trailers = await prisma.trailer.findMany()
      * ```
      */
    get trailer(): Prisma.TrailerDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.user`: Exposes CRUD operations for the **User** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Users
      * const users = await prisma.user.findMany()
      * ```
      */
    get user(): Prisma.UserDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.userAddress`: Exposes CRUD operations for the **UserAddress** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UserAddresses
      * const userAddresses = await prisma.userAddress.findMany()
      * ```
      */
    get userAddress(): Prisma.UserAddressDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.userVoucher`: Exposes CRUD operations for the **UserVoucher** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more UserVouchers
      * const userVouchers = await prisma.userVoucher.findMany()
      * ```
      */
    get userVoucher(): Prisma.UserVoucherDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
    /**
     * `prisma.voucher`: Exposes CRUD operations for the **Voucher** model.
      * Example usage:
      * ```ts
      * // Fetch zero or more Vouchers
      * const vouchers = await prisma.voucher.findMany()
      * ```
      */
    get voucher(): Prisma.VoucherDelegate<ExtArgs, {
        omit: OmitOpts;
    }>;
}
export declare function getPrismaClientClass(): PrismaClientConstructor;
//# sourceMappingURL=class.d.ts.map
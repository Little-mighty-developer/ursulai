
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model User
 * 
 */
export type User = $Result.DefaultSelection<Prisma.$UserPayload>
/**
 * Model Activity
 * 
 */
export type Activity = $Result.DefaultSelection<Prisma.$ActivityPayload>
/**
 * Model Engagement
 * 
 */
export type Engagement = $Result.DefaultSelection<Prisma.$EngagementPayload>
/**
 * Model MoodEntry
 * 
 */
export type MoodEntry = $Result.DefaultSelection<Prisma.$MoodEntryPayload>
/**
 * Model SymptomEvent
 * 
 */
export type SymptomEvent = $Result.DefaultSelection<Prisma.$SymptomEventPayload>
/**
 * Model DailyNote
 * 
 */
export type DailyNote = $Result.DefaultSelection<Prisma.$DailyNotePayload>

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Users
 * const users = await prisma.user.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Users
   * const users = await prisma.user.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
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
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.user`: Exposes CRUD operations for the **User** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Users
    * const users = await prisma.user.findMany()
    * ```
    */
  get user(): Prisma.UserDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.activity`: Exposes CRUD operations for the **Activity** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Activities
    * const activities = await prisma.activity.findMany()
    * ```
    */
  get activity(): Prisma.ActivityDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.engagement`: Exposes CRUD operations for the **Engagement** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Engagements
    * const engagements = await prisma.engagement.findMany()
    * ```
    */
  get engagement(): Prisma.EngagementDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.moodEntry`: Exposes CRUD operations for the **MoodEntry** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more MoodEntries
    * const moodEntries = await prisma.moodEntry.findMany()
    * ```
    */
  get moodEntry(): Prisma.MoodEntryDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.symptomEvent`: Exposes CRUD operations for the **SymptomEvent** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more SymptomEvents
    * const symptomEvents = await prisma.symptomEvent.findMany()
    * ```
    */
  get symptomEvent(): Prisma.SymptomEventDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.dailyNote`: Exposes CRUD operations for the **DailyNote** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more DailyNotes
    * const dailyNotes = await prisma.dailyNote.findMany()
    * ```
    */
  get dailyNote(): Prisma.DailyNoteDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.7.0
   * Query Engine version: 3cff47a7f5d65c3ea74883f1d736e41d68ce91ed
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    User: 'User',
    Activity: 'Activity',
    Engagement: 'Engagement',
    MoodEntry: 'MoodEntry',
    SymptomEvent: 'SymptomEvent',
    DailyNote: 'DailyNote'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "user" | "activity" | "engagement" | "moodEntry" | "symptomEvent" | "dailyNote"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      User: {
        payload: Prisma.$UserPayload<ExtArgs>
        fields: Prisma.UserFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UserFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UserFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findFirst: {
            args: Prisma.UserFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UserFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          findMany: {
            args: Prisma.UserFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          create: {
            args: Prisma.UserCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          createMany: {
            args: Prisma.UserCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UserCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          delete: {
            args: Prisma.UserDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          update: {
            args: Prisma.UserUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          deleteMany: {
            args: Prisma.UserDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UserUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UserUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>[]
          }
          upsert: {
            args: Prisma.UserUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UserPayload>
          }
          aggregate: {
            args: Prisma.UserAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUser>
          }
          groupBy: {
            args: Prisma.UserGroupByArgs<ExtArgs>
            result: $Utils.Optional<UserGroupByOutputType>[]
          }
          count: {
            args: Prisma.UserCountArgs<ExtArgs>
            result: $Utils.Optional<UserCountAggregateOutputType> | number
          }
        }
      }
      Activity: {
        payload: Prisma.$ActivityPayload<ExtArgs>
        fields: Prisma.ActivityFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ActivityFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ActivityFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findFirst: {
            args: Prisma.ActivityFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ActivityFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          findMany: {
            args: Prisma.ActivityFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          create: {
            args: Prisma.ActivityCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          createMany: {
            args: Prisma.ActivityCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ActivityCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          delete: {
            args: Prisma.ActivityDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          update: {
            args: Prisma.ActivityUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          deleteMany: {
            args: Prisma.ActivityDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ActivityUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ActivityUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>[]
          }
          upsert: {
            args: Prisma.ActivityUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ActivityPayload>
          }
          aggregate: {
            args: Prisma.ActivityAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateActivity>
          }
          groupBy: {
            args: Prisma.ActivityGroupByArgs<ExtArgs>
            result: $Utils.Optional<ActivityGroupByOutputType>[]
          }
          count: {
            args: Prisma.ActivityCountArgs<ExtArgs>
            result: $Utils.Optional<ActivityCountAggregateOutputType> | number
          }
        }
      }
      Engagement: {
        payload: Prisma.$EngagementPayload<ExtArgs>
        fields: Prisma.EngagementFieldRefs
        operations: {
          findUnique: {
            args: Prisma.EngagementFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.EngagementFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          findFirst: {
            args: Prisma.EngagementFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.EngagementFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          findMany: {
            args: Prisma.EngagementFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>[]
          }
          create: {
            args: Prisma.EngagementCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          createMany: {
            args: Prisma.EngagementCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.EngagementCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>[]
          }
          delete: {
            args: Prisma.EngagementDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          update: {
            args: Prisma.EngagementUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          deleteMany: {
            args: Prisma.EngagementDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.EngagementUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.EngagementUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>[]
          }
          upsert: {
            args: Prisma.EngagementUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$EngagementPayload>
          }
          aggregate: {
            args: Prisma.EngagementAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateEngagement>
          }
          groupBy: {
            args: Prisma.EngagementGroupByArgs<ExtArgs>
            result: $Utils.Optional<EngagementGroupByOutputType>[]
          }
          count: {
            args: Prisma.EngagementCountArgs<ExtArgs>
            result: $Utils.Optional<EngagementCountAggregateOutputType> | number
          }
        }
      }
      MoodEntry: {
        payload: Prisma.$MoodEntryPayload<ExtArgs>
        fields: Prisma.MoodEntryFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MoodEntryFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MoodEntryFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          findFirst: {
            args: Prisma.MoodEntryFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MoodEntryFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          findMany: {
            args: Prisma.MoodEntryFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>[]
          }
          create: {
            args: Prisma.MoodEntryCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          createMany: {
            args: Prisma.MoodEntryCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MoodEntryCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>[]
          }
          delete: {
            args: Prisma.MoodEntryDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          update: {
            args: Prisma.MoodEntryUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          deleteMany: {
            args: Prisma.MoodEntryDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MoodEntryUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MoodEntryUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>[]
          }
          upsert: {
            args: Prisma.MoodEntryUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MoodEntryPayload>
          }
          aggregate: {
            args: Prisma.MoodEntryAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMoodEntry>
          }
          groupBy: {
            args: Prisma.MoodEntryGroupByArgs<ExtArgs>
            result: $Utils.Optional<MoodEntryGroupByOutputType>[]
          }
          count: {
            args: Prisma.MoodEntryCountArgs<ExtArgs>
            result: $Utils.Optional<MoodEntryCountAggregateOutputType> | number
          }
        }
      }
      SymptomEvent: {
        payload: Prisma.$SymptomEventPayload<ExtArgs>
        fields: Prisma.SymptomEventFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SymptomEventFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomEventPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SymptomEventFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomEventPayload>
          }
          findFirst: {
            args: Prisma.SymptomEventFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomEventPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SymptomEventFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomEventPayload>
          }
          findMany: {
            args: Prisma.SymptomEventFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomEventPayload>[]
          }
          create: {
            args: Prisma.SymptomEventCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomEventPayload>
          }
          createMany: {
            args: Prisma.SymptomEventCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SymptomEventCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomEventPayload>[]
          }
          delete: {
            args: Prisma.SymptomEventDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomEventPayload>
          }
          update: {
            args: Prisma.SymptomEventUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomEventPayload>
          }
          deleteMany: {
            args: Prisma.SymptomEventDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SymptomEventUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SymptomEventUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomEventPayload>[]
          }
          upsert: {
            args: Prisma.SymptomEventUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SymptomEventPayload>
          }
          aggregate: {
            args: Prisma.SymptomEventAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSymptomEvent>
          }
          groupBy: {
            args: Prisma.SymptomEventGroupByArgs<ExtArgs>
            result: $Utils.Optional<SymptomEventGroupByOutputType>[]
          }
          count: {
            args: Prisma.SymptomEventCountArgs<ExtArgs>
            result: $Utils.Optional<SymptomEventCountAggregateOutputType> | number
          }
        }
      }
      DailyNote: {
        payload: Prisma.$DailyNotePayload<ExtArgs>
        fields: Prisma.DailyNoteFieldRefs
        operations: {
          findUnique: {
            args: Prisma.DailyNoteFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyNotePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.DailyNoteFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyNotePayload>
          }
          findFirst: {
            args: Prisma.DailyNoteFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyNotePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.DailyNoteFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyNotePayload>
          }
          findMany: {
            args: Prisma.DailyNoteFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyNotePayload>[]
          }
          create: {
            args: Prisma.DailyNoteCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyNotePayload>
          }
          createMany: {
            args: Prisma.DailyNoteCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.DailyNoteCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyNotePayload>[]
          }
          delete: {
            args: Prisma.DailyNoteDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyNotePayload>
          }
          update: {
            args: Prisma.DailyNoteUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyNotePayload>
          }
          deleteMany: {
            args: Prisma.DailyNoteDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.DailyNoteUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.DailyNoteUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyNotePayload>[]
          }
          upsert: {
            args: Prisma.DailyNoteUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$DailyNotePayload>
          }
          aggregate: {
            args: Prisma.DailyNoteAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateDailyNote>
          }
          groupBy: {
            args: Prisma.DailyNoteGroupByArgs<ExtArgs>
            result: $Utils.Optional<DailyNoteGroupByOutputType>[]
          }
          count: {
            args: Prisma.DailyNoteCountArgs<ExtArgs>
            result: $Utils.Optional<DailyNoteCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    user?: UserOmit
    activity?: ActivityOmit
    engagement?: EngagementOmit
    moodEntry?: MoodEntryOmit
    symptomEvent?: SymptomEventOmit
    dailyNote?: DailyNoteOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type UserCountOutputType
   */

  export type UserCountOutputType = {
    activities: number
  }

  export type UserCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | UserCountOutputTypeCountActivitiesArgs
  }

  // Custom InputTypes
  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UserCountOutputType
     */
    select?: UserCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UserCountOutputType without action
   */
  export type UserCountOutputTypeCountActivitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
  }


  /**
   * Models
   */

  /**
   * Model User
   */

  export type AggregateUser = {
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  export type UserMinAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastLogin: Date | null
    lastActive: Date | null
  }

  export type UserMaxAggregateOutputType = {
    id: string | null
    email: string | null
    firstName: string | null
    lastLogin: Date | null
    lastActive: Date | null
  }

  export type UserCountAggregateOutputType = {
    id: number
    email: number
    firstName: number
    lastLogin: number
    lastActive: number
    _all: number
  }


  export type UserMinAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastLogin?: true
    lastActive?: true
  }

  export type UserMaxAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastLogin?: true
    lastActive?: true
  }

  export type UserCountAggregateInputType = {
    id?: true
    email?: true
    firstName?: true
    lastLogin?: true
    lastActive?: true
    _all?: true
  }

  export type UserAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which User to aggregate.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Users
    **/
    _count?: true | UserCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UserMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UserMaxAggregateInputType
  }

  export type GetUserAggregateType<T extends UserAggregateArgs> = {
        [P in keyof T & keyof AggregateUser]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUser[P]>
      : GetScalarType<T[P], AggregateUser[P]>
  }




  export type UserGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UserWhereInput
    orderBy?: UserOrderByWithAggregationInput | UserOrderByWithAggregationInput[]
    by: UserScalarFieldEnum[] | UserScalarFieldEnum
    having?: UserScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UserCountAggregateInputType | true
    _min?: UserMinAggregateInputType
    _max?: UserMaxAggregateInputType
  }

  export type UserGroupByOutputType = {
    id: string
    email: string
    firstName: string | null
    lastLogin: Date | null
    lastActive: Date | null
    _count: UserCountAggregateOutputType | null
    _min: UserMinAggregateOutputType | null
    _max: UserMaxAggregateOutputType | null
  }

  type GetUserGroupByPayload<T extends UserGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UserGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UserGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UserGroupByOutputType[P]>
            : GetScalarType<T[P], UserGroupByOutputType[P]>
        }
      >
    >


  export type UserSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastLogin?: boolean
    lastActive?: boolean
    activities?: boolean | User$activitiesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["user"]>

  export type UserSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastLogin?: boolean
    lastActive?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastLogin?: boolean
    lastActive?: boolean
  }, ExtArgs["result"]["user"]>

  export type UserSelectScalar = {
    id?: boolean
    email?: boolean
    firstName?: boolean
    lastLogin?: boolean
    lastActive?: boolean
  }

  export type UserOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "email" | "firstName" | "lastLogin" | "lastActive", ExtArgs["result"]["user"]>
  export type UserInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    activities?: boolean | User$activitiesArgs<ExtArgs>
    _count?: boolean | UserCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UserIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UserIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UserPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "User"
    objects: {
      activities: Prisma.$ActivityPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      email: string
      firstName: string | null
      lastLogin: Date | null
      lastActive: Date | null
    }, ExtArgs["result"]["user"]>
    composites: {}
  }

  type UserGetPayload<S extends boolean | null | undefined | UserDefaultArgs> = $Result.GetResult<Prisma.$UserPayload, S>

  type UserCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UserFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UserCountAggregateInputType | true
    }

  export interface UserDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['User'], meta: { name: 'User' } }
    /**
     * Find zero or one User that matches the filter.
     * @param {UserFindUniqueArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UserFindUniqueArgs>(args: SelectSubset<T, UserFindUniqueArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one User that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UserFindUniqueOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UserFindUniqueOrThrowArgs>(args: SelectSubset<T, UserFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UserFindFirstArgs>(args?: SelectSubset<T, UserFindFirstArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first User that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindFirstOrThrowArgs} args - Arguments to find a User
     * @example
     * // Get one User
     * const user = await prisma.user.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UserFindFirstOrThrowArgs>(args?: SelectSubset<T, UserFindFirstOrThrowArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Users that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Users
     * const users = await prisma.user.findMany()
     * 
     * // Get first 10 Users
     * const users = await prisma.user.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const userWithIdOnly = await prisma.user.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends UserFindManyArgs>(args?: SelectSubset<T, UserFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a User.
     * @param {UserCreateArgs} args - Arguments to create a User.
     * @example
     * // Create one User
     * const User = await prisma.user.create({
     *   data: {
     *     // ... data to create a User
     *   }
     * })
     * 
     */
    create<T extends UserCreateArgs>(args: SelectSubset<T, UserCreateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Users.
     * @param {UserCreateManyArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UserCreateManyArgs>(args?: SelectSubset<T, UserCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Users and returns the data saved in the database.
     * @param {UserCreateManyAndReturnArgs} args - Arguments to create many Users.
     * @example
     * // Create many Users
     * const user = await prisma.user.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Users and only return the `id`
     * const userWithIdOnly = await prisma.user.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UserCreateManyAndReturnArgs>(args?: SelectSubset<T, UserCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a User.
     * @param {UserDeleteArgs} args - Arguments to delete one User.
     * @example
     * // Delete one User
     * const User = await prisma.user.delete({
     *   where: {
     *     // ... filter to delete one User
     *   }
     * })
     * 
     */
    delete<T extends UserDeleteArgs>(args: SelectSubset<T, UserDeleteArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one User.
     * @param {UserUpdateArgs} args - Arguments to update one User.
     * @example
     * // Update one User
     * const user = await prisma.user.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UserUpdateArgs>(args: SelectSubset<T, UserUpdateArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Users.
     * @param {UserDeleteManyArgs} args - Arguments to filter Users to delete.
     * @example
     * // Delete a few Users
     * const { count } = await prisma.user.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UserDeleteManyArgs>(args?: SelectSubset<T, UserDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UserUpdateManyArgs>(args: SelectSubset<T, UserUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Users and returns the data updated in the database.
     * @param {UserUpdateManyAndReturnArgs} args - Arguments to update many Users.
     * @example
     * // Update many Users
     * const user = await prisma.user.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Users and only return the `id`
     * const userWithIdOnly = await prisma.user.updateManyAndReturn({
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
    updateManyAndReturn<T extends UserUpdateManyAndReturnArgs>(args: SelectSubset<T, UserUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one User.
     * @param {UserUpsertArgs} args - Arguments to update or create a User.
     * @example
     * // Update or create a User
     * const user = await prisma.user.upsert({
     *   create: {
     *     // ... data to create a User
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the User we want to update
     *   }
     * })
     */
    upsert<T extends UserUpsertArgs>(args: SelectSubset<T, UserUpsertArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Users.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserCountArgs} args - Arguments to filter Users to count.
     * @example
     * // Count the number of Users
     * const count = await prisma.user.count({
     *   where: {
     *     // ... the filter for the Users we want to count
     *   }
     * })
    **/
    count<T extends UserCountArgs>(
      args?: Subset<T, UserCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UserCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends UserAggregateArgs>(args: Subset<T, UserAggregateArgs>): Prisma.PrismaPromise<GetUserAggregateType<T>>

    /**
     * Group by User.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UserGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends UserGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UserGroupByArgs['orderBy'] }
        : { orderBy?: UserGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UserGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUserGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the User model
   */
  readonly fields: UserFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for User.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UserClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    activities<T extends User$activitiesArgs<ExtArgs> = {}>(args?: Subset<T, User$activitiesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the User model
   */
  interface UserFieldRefs {
    readonly id: FieldRef<"User", 'String'>
    readonly email: FieldRef<"User", 'String'>
    readonly firstName: FieldRef<"User", 'String'>
    readonly lastLogin: FieldRef<"User", 'DateTime'>
    readonly lastActive: FieldRef<"User", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * User findUnique
   */
  export type UserFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findUniqueOrThrow
   */
  export type UserFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User findFirst
   */
  export type UserFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findFirstOrThrow
   */
  export type UserFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which User to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Users.
     */
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User findMany
   */
  export type UserFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter, which Users to fetch.
     */
    where?: UserWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Users to fetch.
     */
    orderBy?: UserOrderByWithRelationInput | UserOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Users.
     */
    cursor?: UserWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Users from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Users.
     */
    skip?: number
    distinct?: UserScalarFieldEnum | UserScalarFieldEnum[]
  }

  /**
   * User create
   */
  export type UserCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to create a User.
     */
    data: XOR<UserCreateInput, UserUncheckedCreateInput>
  }

  /**
   * User createMany
   */
  export type UserCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User createManyAndReturn
   */
  export type UserCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to create many Users.
     */
    data: UserCreateManyInput | UserCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * User update
   */
  export type UserUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The data needed to update a User.
     */
    data: XOR<UserUpdateInput, UserUncheckedUpdateInput>
    /**
     * Choose, which User to update.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User updateMany
   */
  export type UserUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User updateManyAndReturn
   */
  export type UserUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * The data used to update Users.
     */
    data: XOR<UserUpdateManyMutationInput, UserUncheckedUpdateManyInput>
    /**
     * Filter which Users to update
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to update.
     */
    limit?: number
  }

  /**
   * User upsert
   */
  export type UserUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * The filter to search for the User to update in case it exists.
     */
    where: UserWhereUniqueInput
    /**
     * In case the User found by the `where` argument doesn't exist, create a new User with this data.
     */
    create: XOR<UserCreateInput, UserUncheckedCreateInput>
    /**
     * In case the User was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UserUpdateInput, UserUncheckedUpdateInput>
  }

  /**
   * User delete
   */
  export type UserDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
    /**
     * Filter which User to delete.
     */
    where: UserWhereUniqueInput
  }

  /**
   * User deleteMany
   */
  export type UserDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Users to delete
     */
    where?: UserWhereInput
    /**
     * Limit how many Users to delete.
     */
    limit?: number
  }

  /**
   * User.activities
   */
  export type User$activitiesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    cursor?: ActivityWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * User without action
   */
  export type UserDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the User
     */
    select?: UserSelect<ExtArgs> | null
    /**
     * Omit specific fields from the User
     */
    omit?: UserOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UserInclude<ExtArgs> | null
  }


  /**
   * Model Activity
   */

  export type AggregateActivity = {
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  export type ActivityMinAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    checkin: boolean | null
    mood: boolean | null
    reminder: boolean | null
    journal: boolean | null
  }

  export type ActivityMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    checkin: boolean | null
    mood: boolean | null
    reminder: boolean | null
    journal: boolean | null
  }

  export type ActivityCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    checkin: number
    mood: number
    reminder: number
    journal: number
    _all: number
  }


  export type ActivityMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    checkin?: true
    mood?: true
    reminder?: true
    journal?: true
  }

  export type ActivityMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    checkin?: true
    mood?: true
    reminder?: true
    journal?: true
  }

  export type ActivityCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    checkin?: true
    mood?: true
    reminder?: true
    journal?: true
    _all?: true
  }

  export type ActivityAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activity to aggregate.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Activities
    **/
    _count?: true | ActivityCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ActivityMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ActivityMaxAggregateInputType
  }

  export type GetActivityAggregateType<T extends ActivityAggregateArgs> = {
        [P in keyof T & keyof AggregateActivity]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateActivity[P]>
      : GetScalarType<T[P], AggregateActivity[P]>
  }




  export type ActivityGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ActivityWhereInput
    orderBy?: ActivityOrderByWithAggregationInput | ActivityOrderByWithAggregationInput[]
    by: ActivityScalarFieldEnum[] | ActivityScalarFieldEnum
    having?: ActivityScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ActivityCountAggregateInputType | true
    _min?: ActivityMinAggregateInputType
    _max?: ActivityMaxAggregateInputType
  }

  export type ActivityGroupByOutputType = {
    id: string
    userId: string
    date: Date
    checkin: boolean
    mood: boolean
    reminder: boolean
    journal: boolean
    _count: ActivityCountAggregateOutputType | null
    _min: ActivityMinAggregateOutputType | null
    _max: ActivityMaxAggregateOutputType | null
  }

  type GetActivityGroupByPayload<T extends ActivityGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ActivityGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ActivityGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ActivityGroupByOutputType[P]>
            : GetScalarType<T[P], ActivityGroupByOutputType[P]>
        }
      >
    >


  export type ActivitySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
    user?: boolean | UserDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["activity"]>

  export type ActivitySelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }

  export type ActivityOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "checkin" | "mood" | "reminder" | "journal", ExtArgs["result"]["activity"]>
  export type ActivityInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }
  export type ActivityIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    user?: boolean | UserDefaultArgs<ExtArgs>
  }

  export type $ActivityPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Activity"
    objects: {
      user: Prisma.$UserPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      date: Date
      checkin: boolean
      mood: boolean
      reminder: boolean
      journal: boolean
    }, ExtArgs["result"]["activity"]>
    composites: {}
  }

  type ActivityGetPayload<S extends boolean | null | undefined | ActivityDefaultArgs> = $Result.GetResult<Prisma.$ActivityPayload, S>

  type ActivityCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ActivityFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ActivityCountAggregateInputType | true
    }

  export interface ActivityDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Activity'], meta: { name: 'Activity' } }
    /**
     * Find zero or one Activity that matches the filter.
     * @param {ActivityFindUniqueArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ActivityFindUniqueArgs>(args: SelectSubset<T, ActivityFindUniqueArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Activity that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ActivityFindUniqueOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ActivityFindUniqueOrThrowArgs>(args: SelectSubset<T, ActivityFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ActivityFindFirstArgs>(args?: SelectSubset<T, ActivityFindFirstArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Activity that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindFirstOrThrowArgs} args - Arguments to find a Activity
     * @example
     * // Get one Activity
     * const activity = await prisma.activity.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ActivityFindFirstOrThrowArgs>(args?: SelectSubset<T, ActivityFindFirstOrThrowArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Activities that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Activities
     * const activities = await prisma.activity.findMany()
     * 
     * // Get first 10 Activities
     * const activities = await prisma.activity.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const activityWithIdOnly = await prisma.activity.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ActivityFindManyArgs>(args?: SelectSubset<T, ActivityFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Activity.
     * @param {ActivityCreateArgs} args - Arguments to create a Activity.
     * @example
     * // Create one Activity
     * const Activity = await prisma.activity.create({
     *   data: {
     *     // ... data to create a Activity
     *   }
     * })
     * 
     */
    create<T extends ActivityCreateArgs>(args: SelectSubset<T, ActivityCreateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Activities.
     * @param {ActivityCreateManyArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ActivityCreateManyArgs>(args?: SelectSubset<T, ActivityCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Activities and returns the data saved in the database.
     * @param {ActivityCreateManyAndReturnArgs} args - Arguments to create many Activities.
     * @example
     * // Create many Activities
     * const activity = await prisma.activity.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ActivityCreateManyAndReturnArgs>(args?: SelectSubset<T, ActivityCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Activity.
     * @param {ActivityDeleteArgs} args - Arguments to delete one Activity.
     * @example
     * // Delete one Activity
     * const Activity = await prisma.activity.delete({
     *   where: {
     *     // ... filter to delete one Activity
     *   }
     * })
     * 
     */
    delete<T extends ActivityDeleteArgs>(args: SelectSubset<T, ActivityDeleteArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Activity.
     * @param {ActivityUpdateArgs} args - Arguments to update one Activity.
     * @example
     * // Update one Activity
     * const activity = await prisma.activity.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ActivityUpdateArgs>(args: SelectSubset<T, ActivityUpdateArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Activities.
     * @param {ActivityDeleteManyArgs} args - Arguments to filter Activities to delete.
     * @example
     * // Delete a few Activities
     * const { count } = await prisma.activity.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ActivityDeleteManyArgs>(args?: SelectSubset<T, ActivityDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ActivityUpdateManyArgs>(args: SelectSubset<T, ActivityUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Activities and returns the data updated in the database.
     * @param {ActivityUpdateManyAndReturnArgs} args - Arguments to update many Activities.
     * @example
     * // Update many Activities
     * const activity = await prisma.activity.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Activities and only return the `id`
     * const activityWithIdOnly = await prisma.activity.updateManyAndReturn({
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
    updateManyAndReturn<T extends ActivityUpdateManyAndReturnArgs>(args: SelectSubset<T, ActivityUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Activity.
     * @param {ActivityUpsertArgs} args - Arguments to update or create a Activity.
     * @example
     * // Update or create a Activity
     * const activity = await prisma.activity.upsert({
     *   create: {
     *     // ... data to create a Activity
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Activity we want to update
     *   }
     * })
     */
    upsert<T extends ActivityUpsertArgs>(args: SelectSubset<T, ActivityUpsertArgs<ExtArgs>>): Prisma__ActivityClient<$Result.GetResult<Prisma.$ActivityPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Activities.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityCountArgs} args - Arguments to filter Activities to count.
     * @example
     * // Count the number of Activities
     * const count = await prisma.activity.count({
     *   where: {
     *     // ... the filter for the Activities we want to count
     *   }
     * })
    **/
    count<T extends ActivityCountArgs>(
      args?: Subset<T, ActivityCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ActivityCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends ActivityAggregateArgs>(args: Subset<T, ActivityAggregateArgs>): Prisma.PrismaPromise<GetActivityAggregateType<T>>

    /**
     * Group by Activity.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ActivityGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends ActivityGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ActivityGroupByArgs['orderBy'] }
        : { orderBy?: ActivityGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ActivityGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetActivityGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Activity model
   */
  readonly fields: ActivityFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Activity.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ActivityClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    user<T extends UserDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UserDefaultArgs<ExtArgs>>): Prisma__UserClient<$Result.GetResult<Prisma.$UserPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Activity model
   */
  interface ActivityFieldRefs {
    readonly id: FieldRef<"Activity", 'String'>
    readonly userId: FieldRef<"Activity", 'String'>
    readonly date: FieldRef<"Activity", 'DateTime'>
    readonly checkin: FieldRef<"Activity", 'Boolean'>
    readonly mood: FieldRef<"Activity", 'Boolean'>
    readonly reminder: FieldRef<"Activity", 'Boolean'>
    readonly journal: FieldRef<"Activity", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Activity findUnique
   */
  export type ActivityFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findUniqueOrThrow
   */
  export type ActivityFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity findFirst
   */
  export type ActivityFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findFirstOrThrow
   */
  export type ActivityFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activity to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Activities.
     */
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity findMany
   */
  export type ActivityFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter, which Activities to fetch.
     */
    where?: ActivityWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Activities to fetch.
     */
    orderBy?: ActivityOrderByWithRelationInput | ActivityOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Activities.
     */
    cursor?: ActivityWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Activities from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Activities.
     */
    skip?: number
    distinct?: ActivityScalarFieldEnum | ActivityScalarFieldEnum[]
  }

  /**
   * Activity create
   */
  export type ActivityCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to create a Activity.
     */
    data: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
  }

  /**
   * Activity createMany
   */
  export type ActivityCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Activity createManyAndReturn
   */
  export type ActivityCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to create many Activities.
     */
    data: ActivityCreateManyInput | ActivityCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity update
   */
  export type ActivityUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The data needed to update a Activity.
     */
    data: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
    /**
     * Choose, which Activity to update.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity updateMany
   */
  export type ActivityUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
  }

  /**
   * Activity updateManyAndReturn
   */
  export type ActivityUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * The data used to update Activities.
     */
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyInput>
    /**
     * Filter which Activities to update
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Activity upsert
   */
  export type ActivityUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * The filter to search for the Activity to update in case it exists.
     */
    where: ActivityWhereUniqueInput
    /**
     * In case the Activity found by the `where` argument doesn't exist, create a new Activity with this data.
     */
    create: XOR<ActivityCreateInput, ActivityUncheckedCreateInput>
    /**
     * In case the Activity was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ActivityUpdateInput, ActivityUncheckedUpdateInput>
  }

  /**
   * Activity delete
   */
  export type ActivityDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
    /**
     * Filter which Activity to delete.
     */
    where: ActivityWhereUniqueInput
  }

  /**
   * Activity deleteMany
   */
  export type ActivityDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Activities to delete
     */
    where?: ActivityWhereInput
    /**
     * Limit how many Activities to delete.
     */
    limit?: number
  }

  /**
   * Activity without action
   */
  export type ActivityDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Activity
     */
    select?: ActivitySelect<ExtArgs> | null
    /**
     * Omit specific fields from the Activity
     */
    omit?: ActivityOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ActivityInclude<ExtArgs> | null
  }


  /**
   * Model Engagement
   */

  export type AggregateEngagement = {
    _count: EngagementCountAggregateOutputType | null
    _min: EngagementMinAggregateOutputType | null
    _max: EngagementMaxAggregateOutputType | null
  }

  export type EngagementMinAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    login: boolean | null
    checkin: boolean | null
    mood: boolean | null
    reminder: boolean | null
    journal: boolean | null
  }

  export type EngagementMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    date: Date | null
    login: boolean | null
    checkin: boolean | null
    mood: boolean | null
    reminder: boolean | null
    journal: boolean | null
  }

  export type EngagementCountAggregateOutputType = {
    id: number
    userId: number
    date: number
    login: number
    checkin: number
    mood: number
    reminder: number
    journal: number
    _all: number
  }


  export type EngagementMinAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    login?: true
    checkin?: true
    mood?: true
    reminder?: true
    journal?: true
  }

  export type EngagementMaxAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    login?: true
    checkin?: true
    mood?: true
    reminder?: true
    journal?: true
  }

  export type EngagementCountAggregateInputType = {
    id?: true
    userId?: true
    date?: true
    login?: true
    checkin?: true
    mood?: true
    reminder?: true
    journal?: true
    _all?: true
  }

  export type EngagementAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Engagement to aggregate.
     */
    where?: EngagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Engagements to fetch.
     */
    orderBy?: EngagementOrderByWithRelationInput | EngagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: EngagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Engagements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Engagements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Engagements
    **/
    _count?: true | EngagementCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: EngagementMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: EngagementMaxAggregateInputType
  }

  export type GetEngagementAggregateType<T extends EngagementAggregateArgs> = {
        [P in keyof T & keyof AggregateEngagement]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateEngagement[P]>
      : GetScalarType<T[P], AggregateEngagement[P]>
  }




  export type EngagementGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: EngagementWhereInput
    orderBy?: EngagementOrderByWithAggregationInput | EngagementOrderByWithAggregationInput[]
    by: EngagementScalarFieldEnum[] | EngagementScalarFieldEnum
    having?: EngagementScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: EngagementCountAggregateInputType | true
    _min?: EngagementMinAggregateInputType
    _max?: EngagementMaxAggregateInputType
  }

  export type EngagementGroupByOutputType = {
    id: string
    userId: string
    date: Date
    login: boolean
    checkin: boolean
    mood: boolean
    reminder: boolean
    journal: boolean
    _count: EngagementCountAggregateOutputType | null
    _min: EngagementMinAggregateOutputType | null
    _max: EngagementMaxAggregateOutputType | null
  }

  type GetEngagementGroupByPayload<T extends EngagementGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<EngagementGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof EngagementGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], EngagementGroupByOutputType[P]>
            : GetScalarType<T[P], EngagementGroupByOutputType[P]>
        }
      >
    >


  export type EngagementSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    login?: boolean
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }, ExtArgs["result"]["engagement"]>

  export type EngagementSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    login?: boolean
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }, ExtArgs["result"]["engagement"]>

  export type EngagementSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    date?: boolean
    login?: boolean
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }, ExtArgs["result"]["engagement"]>

  export type EngagementSelectScalar = {
    id?: boolean
    userId?: boolean
    date?: boolean
    login?: boolean
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }

  export type EngagementOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "date" | "login" | "checkin" | "mood" | "reminder" | "journal", ExtArgs["result"]["engagement"]>

  export type $EngagementPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Engagement"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      date: Date
      login: boolean
      checkin: boolean
      mood: boolean
      reminder: boolean
      journal: boolean
    }, ExtArgs["result"]["engagement"]>
    composites: {}
  }

  type EngagementGetPayload<S extends boolean | null | undefined | EngagementDefaultArgs> = $Result.GetResult<Prisma.$EngagementPayload, S>

  type EngagementCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<EngagementFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: EngagementCountAggregateInputType | true
    }

  export interface EngagementDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Engagement'], meta: { name: 'Engagement' } }
    /**
     * Find zero or one Engagement that matches the filter.
     * @param {EngagementFindUniqueArgs} args - Arguments to find a Engagement
     * @example
     * // Get one Engagement
     * const engagement = await prisma.engagement.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends EngagementFindUniqueArgs>(args: SelectSubset<T, EngagementFindUniqueArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Engagement that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {EngagementFindUniqueOrThrowArgs} args - Arguments to find a Engagement
     * @example
     * // Get one Engagement
     * const engagement = await prisma.engagement.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends EngagementFindUniqueOrThrowArgs>(args: SelectSubset<T, EngagementFindUniqueOrThrowArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Engagement that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFindFirstArgs} args - Arguments to find a Engagement
     * @example
     * // Get one Engagement
     * const engagement = await prisma.engagement.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends EngagementFindFirstArgs>(args?: SelectSubset<T, EngagementFindFirstArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Engagement that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFindFirstOrThrowArgs} args - Arguments to find a Engagement
     * @example
     * // Get one Engagement
     * const engagement = await prisma.engagement.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends EngagementFindFirstOrThrowArgs>(args?: SelectSubset<T, EngagementFindFirstOrThrowArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Engagements that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Engagements
     * const engagements = await prisma.engagement.findMany()
     * 
     * // Get first 10 Engagements
     * const engagements = await prisma.engagement.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const engagementWithIdOnly = await prisma.engagement.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends EngagementFindManyArgs>(args?: SelectSubset<T, EngagementFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Engagement.
     * @param {EngagementCreateArgs} args - Arguments to create a Engagement.
     * @example
     * // Create one Engagement
     * const Engagement = await prisma.engagement.create({
     *   data: {
     *     // ... data to create a Engagement
     *   }
     * })
     * 
     */
    create<T extends EngagementCreateArgs>(args: SelectSubset<T, EngagementCreateArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Engagements.
     * @param {EngagementCreateManyArgs} args - Arguments to create many Engagements.
     * @example
     * // Create many Engagements
     * const engagement = await prisma.engagement.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends EngagementCreateManyArgs>(args?: SelectSubset<T, EngagementCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Engagements and returns the data saved in the database.
     * @param {EngagementCreateManyAndReturnArgs} args - Arguments to create many Engagements.
     * @example
     * // Create many Engagements
     * const engagement = await prisma.engagement.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Engagements and only return the `id`
     * const engagementWithIdOnly = await prisma.engagement.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends EngagementCreateManyAndReturnArgs>(args?: SelectSubset<T, EngagementCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Engagement.
     * @param {EngagementDeleteArgs} args - Arguments to delete one Engagement.
     * @example
     * // Delete one Engagement
     * const Engagement = await prisma.engagement.delete({
     *   where: {
     *     // ... filter to delete one Engagement
     *   }
     * })
     * 
     */
    delete<T extends EngagementDeleteArgs>(args: SelectSubset<T, EngagementDeleteArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Engagement.
     * @param {EngagementUpdateArgs} args - Arguments to update one Engagement.
     * @example
     * // Update one Engagement
     * const engagement = await prisma.engagement.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends EngagementUpdateArgs>(args: SelectSubset<T, EngagementUpdateArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Engagements.
     * @param {EngagementDeleteManyArgs} args - Arguments to filter Engagements to delete.
     * @example
     * // Delete a few Engagements
     * const { count } = await prisma.engagement.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends EngagementDeleteManyArgs>(args?: SelectSubset<T, EngagementDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Engagements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Engagements
     * const engagement = await prisma.engagement.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends EngagementUpdateManyArgs>(args: SelectSubset<T, EngagementUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Engagements and returns the data updated in the database.
     * @param {EngagementUpdateManyAndReturnArgs} args - Arguments to update many Engagements.
     * @example
     * // Update many Engagements
     * const engagement = await prisma.engagement.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Engagements and only return the `id`
     * const engagementWithIdOnly = await prisma.engagement.updateManyAndReturn({
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
    updateManyAndReturn<T extends EngagementUpdateManyAndReturnArgs>(args: SelectSubset<T, EngagementUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Engagement.
     * @param {EngagementUpsertArgs} args - Arguments to update or create a Engagement.
     * @example
     * // Update or create a Engagement
     * const engagement = await prisma.engagement.upsert({
     *   create: {
     *     // ... data to create a Engagement
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Engagement we want to update
     *   }
     * })
     */
    upsert<T extends EngagementUpsertArgs>(args: SelectSubset<T, EngagementUpsertArgs<ExtArgs>>): Prisma__EngagementClient<$Result.GetResult<Prisma.$EngagementPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Engagements.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementCountArgs} args - Arguments to filter Engagements to count.
     * @example
     * // Count the number of Engagements
     * const count = await prisma.engagement.count({
     *   where: {
     *     // ... the filter for the Engagements we want to count
     *   }
     * })
    **/
    count<T extends EngagementCountArgs>(
      args?: Subset<T, EngagementCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], EngagementCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Engagement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends EngagementAggregateArgs>(args: Subset<T, EngagementAggregateArgs>): Prisma.PrismaPromise<GetEngagementAggregateType<T>>

    /**
     * Group by Engagement.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {EngagementGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends EngagementGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: EngagementGroupByArgs['orderBy'] }
        : { orderBy?: EngagementGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, EngagementGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetEngagementGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Engagement model
   */
  readonly fields: EngagementFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Engagement.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__EngagementClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Engagement model
   */
  interface EngagementFieldRefs {
    readonly id: FieldRef<"Engagement", 'String'>
    readonly userId: FieldRef<"Engagement", 'String'>
    readonly date: FieldRef<"Engagement", 'DateTime'>
    readonly login: FieldRef<"Engagement", 'Boolean'>
    readonly checkin: FieldRef<"Engagement", 'Boolean'>
    readonly mood: FieldRef<"Engagement", 'Boolean'>
    readonly reminder: FieldRef<"Engagement", 'Boolean'>
    readonly journal: FieldRef<"Engagement", 'Boolean'>
  }
    

  // Custom InputTypes
  /**
   * Engagement findUnique
   */
  export type EngagementFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Filter, which Engagement to fetch.
     */
    where: EngagementWhereUniqueInput
  }

  /**
   * Engagement findUniqueOrThrow
   */
  export type EngagementFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Filter, which Engagement to fetch.
     */
    where: EngagementWhereUniqueInput
  }

  /**
   * Engagement findFirst
   */
  export type EngagementFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Filter, which Engagement to fetch.
     */
    where?: EngagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Engagements to fetch.
     */
    orderBy?: EngagementOrderByWithRelationInput | EngagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Engagements.
     */
    cursor?: EngagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Engagements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Engagements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Engagements.
     */
    distinct?: EngagementScalarFieldEnum | EngagementScalarFieldEnum[]
  }

  /**
   * Engagement findFirstOrThrow
   */
  export type EngagementFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Filter, which Engagement to fetch.
     */
    where?: EngagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Engagements to fetch.
     */
    orderBy?: EngagementOrderByWithRelationInput | EngagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Engagements.
     */
    cursor?: EngagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Engagements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Engagements.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Engagements.
     */
    distinct?: EngagementScalarFieldEnum | EngagementScalarFieldEnum[]
  }

  /**
   * Engagement findMany
   */
  export type EngagementFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Filter, which Engagements to fetch.
     */
    where?: EngagementWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Engagements to fetch.
     */
    orderBy?: EngagementOrderByWithRelationInput | EngagementOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Engagements.
     */
    cursor?: EngagementWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Engagements from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Engagements.
     */
    skip?: number
    distinct?: EngagementScalarFieldEnum | EngagementScalarFieldEnum[]
  }

  /**
   * Engagement create
   */
  export type EngagementCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * The data needed to create a Engagement.
     */
    data: XOR<EngagementCreateInput, EngagementUncheckedCreateInput>
  }

  /**
   * Engagement createMany
   */
  export type EngagementCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Engagements.
     */
    data: EngagementCreateManyInput | EngagementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Engagement createManyAndReturn
   */
  export type EngagementCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * The data used to create many Engagements.
     */
    data: EngagementCreateManyInput | EngagementCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Engagement update
   */
  export type EngagementUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * The data needed to update a Engagement.
     */
    data: XOR<EngagementUpdateInput, EngagementUncheckedUpdateInput>
    /**
     * Choose, which Engagement to update.
     */
    where: EngagementWhereUniqueInput
  }

  /**
   * Engagement updateMany
   */
  export type EngagementUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Engagements.
     */
    data: XOR<EngagementUpdateManyMutationInput, EngagementUncheckedUpdateManyInput>
    /**
     * Filter which Engagements to update
     */
    where?: EngagementWhereInput
    /**
     * Limit how many Engagements to update.
     */
    limit?: number
  }

  /**
   * Engagement updateManyAndReturn
   */
  export type EngagementUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * The data used to update Engagements.
     */
    data: XOR<EngagementUpdateManyMutationInput, EngagementUncheckedUpdateManyInput>
    /**
     * Filter which Engagements to update
     */
    where?: EngagementWhereInput
    /**
     * Limit how many Engagements to update.
     */
    limit?: number
  }

  /**
   * Engagement upsert
   */
  export type EngagementUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * The filter to search for the Engagement to update in case it exists.
     */
    where: EngagementWhereUniqueInput
    /**
     * In case the Engagement found by the `where` argument doesn't exist, create a new Engagement with this data.
     */
    create: XOR<EngagementCreateInput, EngagementUncheckedCreateInput>
    /**
     * In case the Engagement was found with the provided `where` argument, update it with this data.
     */
    update: XOR<EngagementUpdateInput, EngagementUncheckedUpdateInput>
  }

  /**
   * Engagement delete
   */
  export type EngagementDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
    /**
     * Filter which Engagement to delete.
     */
    where: EngagementWhereUniqueInput
  }

  /**
   * Engagement deleteMany
   */
  export type EngagementDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Engagements to delete
     */
    where?: EngagementWhereInput
    /**
     * Limit how many Engagements to delete.
     */
    limit?: number
  }

  /**
   * Engagement without action
   */
  export type EngagementDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Engagement
     */
    select?: EngagementSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Engagement
     */
    omit?: EngagementOmit<ExtArgs> | null
  }


  /**
   * Model MoodEntry
   */

  export type AggregateMoodEntry = {
    _count: MoodEntryCountAggregateOutputType | null
    _avg: MoodEntryAvgAggregateOutputType | null
    _sum: MoodEntrySumAggregateOutputType | null
    _min: MoodEntryMinAggregateOutputType | null
    _max: MoodEntryMaxAggregateOutputType | null
  }

  export type MoodEntryAvgAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type MoodEntrySumAggregateOutputType = {
    id: number | null
    value: number | null
  }

  export type MoodEntryMinAggregateOutputType = {
    id: number | null
    userId: string | null
    moodType: string | null
    value: number | null
    createdAt: Date | null
  }

  export type MoodEntryMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    moodType: string | null
    value: number | null
    createdAt: Date | null
  }

  export type MoodEntryCountAggregateOutputType = {
    id: number
    userId: number
    moodType: number
    value: number
    createdAt: number
    _all: number
  }


  export type MoodEntryAvgAggregateInputType = {
    id?: true
    value?: true
  }

  export type MoodEntrySumAggregateInputType = {
    id?: true
    value?: true
  }

  export type MoodEntryMinAggregateInputType = {
    id?: true
    userId?: true
    moodType?: true
    value?: true
    createdAt?: true
  }

  export type MoodEntryMaxAggregateInputType = {
    id?: true
    userId?: true
    moodType?: true
    value?: true
    createdAt?: true
  }

  export type MoodEntryCountAggregateInputType = {
    id?: true
    userId?: true
    moodType?: true
    value?: true
    createdAt?: true
    _all?: true
  }

  export type MoodEntryAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoodEntry to aggregate.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned MoodEntries
    **/
    _count?: true | MoodEntryCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MoodEntryAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MoodEntrySumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MoodEntryMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MoodEntryMaxAggregateInputType
  }

  export type GetMoodEntryAggregateType<T extends MoodEntryAggregateArgs> = {
        [P in keyof T & keyof AggregateMoodEntry]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMoodEntry[P]>
      : GetScalarType<T[P], AggregateMoodEntry[P]>
  }




  export type MoodEntryGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MoodEntryWhereInput
    orderBy?: MoodEntryOrderByWithAggregationInput | MoodEntryOrderByWithAggregationInput[]
    by: MoodEntryScalarFieldEnum[] | MoodEntryScalarFieldEnum
    having?: MoodEntryScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MoodEntryCountAggregateInputType | true
    _avg?: MoodEntryAvgAggregateInputType
    _sum?: MoodEntrySumAggregateInputType
    _min?: MoodEntryMinAggregateInputType
    _max?: MoodEntryMaxAggregateInputType
  }

  export type MoodEntryGroupByOutputType = {
    id: number
    userId: string
    moodType: string
    value: number
    createdAt: Date
    _count: MoodEntryCountAggregateOutputType | null
    _avg: MoodEntryAvgAggregateOutputType | null
    _sum: MoodEntrySumAggregateOutputType | null
    _min: MoodEntryMinAggregateOutputType | null
    _max: MoodEntryMaxAggregateOutputType | null
  }

  type GetMoodEntryGroupByPayload<T extends MoodEntryGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MoodEntryGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MoodEntryGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MoodEntryGroupByOutputType[P]>
            : GetScalarType<T[P], MoodEntryGroupByOutputType[P]>
        }
      >
    >


  export type MoodEntrySelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    moodType?: boolean
    value?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["moodEntry"]>

  export type MoodEntrySelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    moodType?: boolean
    value?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["moodEntry"]>

  export type MoodEntrySelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    moodType?: boolean
    value?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["moodEntry"]>

  export type MoodEntrySelectScalar = {
    id?: boolean
    userId?: boolean
    moodType?: boolean
    value?: boolean
    createdAt?: boolean
  }

  export type MoodEntryOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "moodType" | "value" | "createdAt", ExtArgs["result"]["moodEntry"]>

  export type $MoodEntryPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "MoodEntry"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      moodType: string
      value: number
      createdAt: Date
    }, ExtArgs["result"]["moodEntry"]>
    composites: {}
  }

  type MoodEntryGetPayload<S extends boolean | null | undefined | MoodEntryDefaultArgs> = $Result.GetResult<Prisma.$MoodEntryPayload, S>

  type MoodEntryCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MoodEntryFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MoodEntryCountAggregateInputType | true
    }

  export interface MoodEntryDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['MoodEntry'], meta: { name: 'MoodEntry' } }
    /**
     * Find zero or one MoodEntry that matches the filter.
     * @param {MoodEntryFindUniqueArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MoodEntryFindUniqueArgs>(args: SelectSubset<T, MoodEntryFindUniqueArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one MoodEntry that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MoodEntryFindUniqueOrThrowArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MoodEntryFindUniqueOrThrowArgs>(args: SelectSubset<T, MoodEntryFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MoodEntry that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryFindFirstArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MoodEntryFindFirstArgs>(args?: SelectSubset<T, MoodEntryFindFirstArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first MoodEntry that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryFindFirstOrThrowArgs} args - Arguments to find a MoodEntry
     * @example
     * // Get one MoodEntry
     * const moodEntry = await prisma.moodEntry.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MoodEntryFindFirstOrThrowArgs>(args?: SelectSubset<T, MoodEntryFindFirstOrThrowArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more MoodEntries that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all MoodEntries
     * const moodEntries = await prisma.moodEntry.findMany()
     * 
     * // Get first 10 MoodEntries
     * const moodEntries = await prisma.moodEntry.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const moodEntryWithIdOnly = await prisma.moodEntry.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends MoodEntryFindManyArgs>(args?: SelectSubset<T, MoodEntryFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a MoodEntry.
     * @param {MoodEntryCreateArgs} args - Arguments to create a MoodEntry.
     * @example
     * // Create one MoodEntry
     * const MoodEntry = await prisma.moodEntry.create({
     *   data: {
     *     // ... data to create a MoodEntry
     *   }
     * })
     * 
     */
    create<T extends MoodEntryCreateArgs>(args: SelectSubset<T, MoodEntryCreateArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many MoodEntries.
     * @param {MoodEntryCreateManyArgs} args - Arguments to create many MoodEntries.
     * @example
     * // Create many MoodEntries
     * const moodEntry = await prisma.moodEntry.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MoodEntryCreateManyArgs>(args?: SelectSubset<T, MoodEntryCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many MoodEntries and returns the data saved in the database.
     * @param {MoodEntryCreateManyAndReturnArgs} args - Arguments to create many MoodEntries.
     * @example
     * // Create many MoodEntries
     * const moodEntry = await prisma.moodEntry.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many MoodEntries and only return the `id`
     * const moodEntryWithIdOnly = await prisma.moodEntry.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MoodEntryCreateManyAndReturnArgs>(args?: SelectSubset<T, MoodEntryCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a MoodEntry.
     * @param {MoodEntryDeleteArgs} args - Arguments to delete one MoodEntry.
     * @example
     * // Delete one MoodEntry
     * const MoodEntry = await prisma.moodEntry.delete({
     *   where: {
     *     // ... filter to delete one MoodEntry
     *   }
     * })
     * 
     */
    delete<T extends MoodEntryDeleteArgs>(args: SelectSubset<T, MoodEntryDeleteArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one MoodEntry.
     * @param {MoodEntryUpdateArgs} args - Arguments to update one MoodEntry.
     * @example
     * // Update one MoodEntry
     * const moodEntry = await prisma.moodEntry.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MoodEntryUpdateArgs>(args: SelectSubset<T, MoodEntryUpdateArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more MoodEntries.
     * @param {MoodEntryDeleteManyArgs} args - Arguments to filter MoodEntries to delete.
     * @example
     * // Delete a few MoodEntries
     * const { count } = await prisma.moodEntry.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MoodEntryDeleteManyArgs>(args?: SelectSubset<T, MoodEntryDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MoodEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many MoodEntries
     * const moodEntry = await prisma.moodEntry.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MoodEntryUpdateManyArgs>(args: SelectSubset<T, MoodEntryUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more MoodEntries and returns the data updated in the database.
     * @param {MoodEntryUpdateManyAndReturnArgs} args - Arguments to update many MoodEntries.
     * @example
     * // Update many MoodEntries
     * const moodEntry = await prisma.moodEntry.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more MoodEntries and only return the `id`
     * const moodEntryWithIdOnly = await prisma.moodEntry.updateManyAndReturn({
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
    updateManyAndReturn<T extends MoodEntryUpdateManyAndReturnArgs>(args: SelectSubset<T, MoodEntryUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one MoodEntry.
     * @param {MoodEntryUpsertArgs} args - Arguments to update or create a MoodEntry.
     * @example
     * // Update or create a MoodEntry
     * const moodEntry = await prisma.moodEntry.upsert({
     *   create: {
     *     // ... data to create a MoodEntry
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the MoodEntry we want to update
     *   }
     * })
     */
    upsert<T extends MoodEntryUpsertArgs>(args: SelectSubset<T, MoodEntryUpsertArgs<ExtArgs>>): Prisma__MoodEntryClient<$Result.GetResult<Prisma.$MoodEntryPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of MoodEntries.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryCountArgs} args - Arguments to filter MoodEntries to count.
     * @example
     * // Count the number of MoodEntries
     * const count = await prisma.moodEntry.count({
     *   where: {
     *     // ... the filter for the MoodEntries we want to count
     *   }
     * })
    **/
    count<T extends MoodEntryCountArgs>(
      args?: Subset<T, MoodEntryCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MoodEntryCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a MoodEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends MoodEntryAggregateArgs>(args: Subset<T, MoodEntryAggregateArgs>): Prisma.PrismaPromise<GetMoodEntryAggregateType<T>>

    /**
     * Group by MoodEntry.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MoodEntryGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends MoodEntryGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MoodEntryGroupByArgs['orderBy'] }
        : { orderBy?: MoodEntryGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MoodEntryGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMoodEntryGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the MoodEntry model
   */
  readonly fields: MoodEntryFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for MoodEntry.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MoodEntryClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the MoodEntry model
   */
  interface MoodEntryFieldRefs {
    readonly id: FieldRef<"MoodEntry", 'Int'>
    readonly userId: FieldRef<"MoodEntry", 'String'>
    readonly moodType: FieldRef<"MoodEntry", 'String'>
    readonly value: FieldRef<"MoodEntry", 'Int'>
    readonly createdAt: FieldRef<"MoodEntry", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * MoodEntry findUnique
   */
  export type MoodEntryFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry findUniqueOrThrow
   */
  export type MoodEntryFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry findFirst
   */
  export type MoodEntryFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoodEntries.
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoodEntries.
     */
    distinct?: MoodEntryScalarFieldEnum | MoodEntryScalarFieldEnum[]
  }

  /**
   * MoodEntry findFirstOrThrow
   */
  export type MoodEntryFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Filter, which MoodEntry to fetch.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for MoodEntries.
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of MoodEntries.
     */
    distinct?: MoodEntryScalarFieldEnum | MoodEntryScalarFieldEnum[]
  }

  /**
   * MoodEntry findMany
   */
  export type MoodEntryFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Filter, which MoodEntries to fetch.
     */
    where?: MoodEntryWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of MoodEntries to fetch.
     */
    orderBy?: MoodEntryOrderByWithRelationInput | MoodEntryOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing MoodEntries.
     */
    cursor?: MoodEntryWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` MoodEntries from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` MoodEntries.
     */
    skip?: number
    distinct?: MoodEntryScalarFieldEnum | MoodEntryScalarFieldEnum[]
  }

  /**
   * MoodEntry create
   */
  export type MoodEntryCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * The data needed to create a MoodEntry.
     */
    data: XOR<MoodEntryCreateInput, MoodEntryUncheckedCreateInput>
  }

  /**
   * MoodEntry createMany
   */
  export type MoodEntryCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many MoodEntries.
     */
    data: MoodEntryCreateManyInput | MoodEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MoodEntry createManyAndReturn
   */
  export type MoodEntryCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * The data used to create many MoodEntries.
     */
    data: MoodEntryCreateManyInput | MoodEntryCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * MoodEntry update
   */
  export type MoodEntryUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * The data needed to update a MoodEntry.
     */
    data: XOR<MoodEntryUpdateInput, MoodEntryUncheckedUpdateInput>
    /**
     * Choose, which MoodEntry to update.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry updateMany
   */
  export type MoodEntryUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update MoodEntries.
     */
    data: XOR<MoodEntryUpdateManyMutationInput, MoodEntryUncheckedUpdateManyInput>
    /**
     * Filter which MoodEntries to update
     */
    where?: MoodEntryWhereInput
    /**
     * Limit how many MoodEntries to update.
     */
    limit?: number
  }

  /**
   * MoodEntry updateManyAndReturn
   */
  export type MoodEntryUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * The data used to update MoodEntries.
     */
    data: XOR<MoodEntryUpdateManyMutationInput, MoodEntryUncheckedUpdateManyInput>
    /**
     * Filter which MoodEntries to update
     */
    where?: MoodEntryWhereInput
    /**
     * Limit how many MoodEntries to update.
     */
    limit?: number
  }

  /**
   * MoodEntry upsert
   */
  export type MoodEntryUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * The filter to search for the MoodEntry to update in case it exists.
     */
    where: MoodEntryWhereUniqueInput
    /**
     * In case the MoodEntry found by the `where` argument doesn't exist, create a new MoodEntry with this data.
     */
    create: XOR<MoodEntryCreateInput, MoodEntryUncheckedCreateInput>
    /**
     * In case the MoodEntry was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MoodEntryUpdateInput, MoodEntryUncheckedUpdateInput>
  }

  /**
   * MoodEntry delete
   */
  export type MoodEntryDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
    /**
     * Filter which MoodEntry to delete.
     */
    where: MoodEntryWhereUniqueInput
  }

  /**
   * MoodEntry deleteMany
   */
  export type MoodEntryDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which MoodEntries to delete
     */
    where?: MoodEntryWhereInput
    /**
     * Limit how many MoodEntries to delete.
     */
    limit?: number
  }

  /**
   * MoodEntry without action
   */
  export type MoodEntryDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the MoodEntry
     */
    select?: MoodEntrySelect<ExtArgs> | null
    /**
     * Omit specific fields from the MoodEntry
     */
    omit?: MoodEntryOmit<ExtArgs> | null
  }


  /**
   * Model SymptomEvent
   */

  export type AggregateSymptomEvent = {
    _count: SymptomEventCountAggregateOutputType | null
    _avg: SymptomEventAvgAggregateOutputType | null
    _sum: SymptomEventSumAggregateOutputType | null
    _min: SymptomEventMinAggregateOutputType | null
    _max: SymptomEventMaxAggregateOutputType | null
  }

  export type SymptomEventAvgAggregateOutputType = {
    id: number | null
  }

  export type SymptomEventSumAggregateOutputType = {
    id: number | null
  }

  export type SymptomEventMinAggregateOutputType = {
    id: number | null
    userId: string | null
    symptomKey: string | null
    eventType: string | null
    timestamp: Date | null
  }

  export type SymptomEventMaxAggregateOutputType = {
    id: number | null
    userId: string | null
    symptomKey: string | null
    eventType: string | null
    timestamp: Date | null
  }

  export type SymptomEventCountAggregateOutputType = {
    id: number
    userId: number
    symptomKey: number
    eventType: number
    timestamp: number
    _all: number
  }


  export type SymptomEventAvgAggregateInputType = {
    id?: true
  }

  export type SymptomEventSumAggregateInputType = {
    id?: true
  }

  export type SymptomEventMinAggregateInputType = {
    id?: true
    userId?: true
    symptomKey?: true
    eventType?: true
    timestamp?: true
  }

  export type SymptomEventMaxAggregateInputType = {
    id?: true
    userId?: true
    symptomKey?: true
    eventType?: true
    timestamp?: true
  }

  export type SymptomEventCountAggregateInputType = {
    id?: true
    userId?: true
    symptomKey?: true
    eventType?: true
    timestamp?: true
    _all?: true
  }

  export type SymptomEventAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SymptomEvent to aggregate.
     */
    where?: SymptomEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SymptomEvents to fetch.
     */
    orderBy?: SymptomEventOrderByWithRelationInput | SymptomEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SymptomEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SymptomEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SymptomEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned SymptomEvents
    **/
    _count?: true | SymptomEventCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SymptomEventAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SymptomEventSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SymptomEventMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SymptomEventMaxAggregateInputType
  }

  export type GetSymptomEventAggregateType<T extends SymptomEventAggregateArgs> = {
        [P in keyof T & keyof AggregateSymptomEvent]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSymptomEvent[P]>
      : GetScalarType<T[P], AggregateSymptomEvent[P]>
  }




  export type SymptomEventGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SymptomEventWhereInput
    orderBy?: SymptomEventOrderByWithAggregationInput | SymptomEventOrderByWithAggregationInput[]
    by: SymptomEventScalarFieldEnum[] | SymptomEventScalarFieldEnum
    having?: SymptomEventScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SymptomEventCountAggregateInputType | true
    _avg?: SymptomEventAvgAggregateInputType
    _sum?: SymptomEventSumAggregateInputType
    _min?: SymptomEventMinAggregateInputType
    _max?: SymptomEventMaxAggregateInputType
  }

  export type SymptomEventGroupByOutputType = {
    id: number
    userId: string
    symptomKey: string
    eventType: string
    timestamp: Date
    _count: SymptomEventCountAggregateOutputType | null
    _avg: SymptomEventAvgAggregateOutputType | null
    _sum: SymptomEventSumAggregateOutputType | null
    _min: SymptomEventMinAggregateOutputType | null
    _max: SymptomEventMaxAggregateOutputType | null
  }

  type GetSymptomEventGroupByPayload<T extends SymptomEventGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SymptomEventGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SymptomEventGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SymptomEventGroupByOutputType[P]>
            : GetScalarType<T[P], SymptomEventGroupByOutputType[P]>
        }
      >
    >


  export type SymptomEventSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symptomKey?: boolean
    eventType?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["symptomEvent"]>

  export type SymptomEventSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symptomKey?: boolean
    eventType?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["symptomEvent"]>

  export type SymptomEventSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    symptomKey?: boolean
    eventType?: boolean
    timestamp?: boolean
  }, ExtArgs["result"]["symptomEvent"]>

  export type SymptomEventSelectScalar = {
    id?: boolean
    userId?: boolean
    symptomKey?: boolean
    eventType?: boolean
    timestamp?: boolean
  }

  export type SymptomEventOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "symptomKey" | "eventType" | "timestamp", ExtArgs["result"]["symptomEvent"]>

  export type $SymptomEventPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "SymptomEvent"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: number
      userId: string
      symptomKey: string
      eventType: string
      timestamp: Date
    }, ExtArgs["result"]["symptomEvent"]>
    composites: {}
  }

  type SymptomEventGetPayload<S extends boolean | null | undefined | SymptomEventDefaultArgs> = $Result.GetResult<Prisma.$SymptomEventPayload, S>

  type SymptomEventCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SymptomEventFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SymptomEventCountAggregateInputType | true
    }

  export interface SymptomEventDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['SymptomEvent'], meta: { name: 'SymptomEvent' } }
    /**
     * Find zero or one SymptomEvent that matches the filter.
     * @param {SymptomEventFindUniqueArgs} args - Arguments to find a SymptomEvent
     * @example
     * // Get one SymptomEvent
     * const symptomEvent = await prisma.symptomEvent.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SymptomEventFindUniqueArgs>(args: SelectSubset<T, SymptomEventFindUniqueArgs<ExtArgs>>): Prisma__SymptomEventClient<$Result.GetResult<Prisma.$SymptomEventPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one SymptomEvent that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SymptomEventFindUniqueOrThrowArgs} args - Arguments to find a SymptomEvent
     * @example
     * // Get one SymptomEvent
     * const symptomEvent = await prisma.symptomEvent.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SymptomEventFindUniqueOrThrowArgs>(args: SelectSubset<T, SymptomEventFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SymptomEventClient<$Result.GetResult<Prisma.$SymptomEventPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SymptomEvent that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomEventFindFirstArgs} args - Arguments to find a SymptomEvent
     * @example
     * // Get one SymptomEvent
     * const symptomEvent = await prisma.symptomEvent.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SymptomEventFindFirstArgs>(args?: SelectSubset<T, SymptomEventFindFirstArgs<ExtArgs>>): Prisma__SymptomEventClient<$Result.GetResult<Prisma.$SymptomEventPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first SymptomEvent that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomEventFindFirstOrThrowArgs} args - Arguments to find a SymptomEvent
     * @example
     * // Get one SymptomEvent
     * const symptomEvent = await prisma.symptomEvent.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SymptomEventFindFirstOrThrowArgs>(args?: SelectSubset<T, SymptomEventFindFirstOrThrowArgs<ExtArgs>>): Prisma__SymptomEventClient<$Result.GetResult<Prisma.$SymptomEventPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more SymptomEvents that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomEventFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all SymptomEvents
     * const symptomEvents = await prisma.symptomEvent.findMany()
     * 
     * // Get first 10 SymptomEvents
     * const symptomEvents = await prisma.symptomEvent.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const symptomEventWithIdOnly = await prisma.symptomEvent.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends SymptomEventFindManyArgs>(args?: SelectSubset<T, SymptomEventFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SymptomEventPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a SymptomEvent.
     * @param {SymptomEventCreateArgs} args - Arguments to create a SymptomEvent.
     * @example
     * // Create one SymptomEvent
     * const SymptomEvent = await prisma.symptomEvent.create({
     *   data: {
     *     // ... data to create a SymptomEvent
     *   }
     * })
     * 
     */
    create<T extends SymptomEventCreateArgs>(args: SelectSubset<T, SymptomEventCreateArgs<ExtArgs>>): Prisma__SymptomEventClient<$Result.GetResult<Prisma.$SymptomEventPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many SymptomEvents.
     * @param {SymptomEventCreateManyArgs} args - Arguments to create many SymptomEvents.
     * @example
     * // Create many SymptomEvents
     * const symptomEvent = await prisma.symptomEvent.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SymptomEventCreateManyArgs>(args?: SelectSubset<T, SymptomEventCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many SymptomEvents and returns the data saved in the database.
     * @param {SymptomEventCreateManyAndReturnArgs} args - Arguments to create many SymptomEvents.
     * @example
     * // Create many SymptomEvents
     * const symptomEvent = await prisma.symptomEvent.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many SymptomEvents and only return the `id`
     * const symptomEventWithIdOnly = await prisma.symptomEvent.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SymptomEventCreateManyAndReturnArgs>(args?: SelectSubset<T, SymptomEventCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SymptomEventPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a SymptomEvent.
     * @param {SymptomEventDeleteArgs} args - Arguments to delete one SymptomEvent.
     * @example
     * // Delete one SymptomEvent
     * const SymptomEvent = await prisma.symptomEvent.delete({
     *   where: {
     *     // ... filter to delete one SymptomEvent
     *   }
     * })
     * 
     */
    delete<T extends SymptomEventDeleteArgs>(args: SelectSubset<T, SymptomEventDeleteArgs<ExtArgs>>): Prisma__SymptomEventClient<$Result.GetResult<Prisma.$SymptomEventPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one SymptomEvent.
     * @param {SymptomEventUpdateArgs} args - Arguments to update one SymptomEvent.
     * @example
     * // Update one SymptomEvent
     * const symptomEvent = await prisma.symptomEvent.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SymptomEventUpdateArgs>(args: SelectSubset<T, SymptomEventUpdateArgs<ExtArgs>>): Prisma__SymptomEventClient<$Result.GetResult<Prisma.$SymptomEventPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more SymptomEvents.
     * @param {SymptomEventDeleteManyArgs} args - Arguments to filter SymptomEvents to delete.
     * @example
     * // Delete a few SymptomEvents
     * const { count } = await prisma.symptomEvent.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SymptomEventDeleteManyArgs>(args?: SelectSubset<T, SymptomEventDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SymptomEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomEventUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many SymptomEvents
     * const symptomEvent = await prisma.symptomEvent.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SymptomEventUpdateManyArgs>(args: SelectSubset<T, SymptomEventUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more SymptomEvents and returns the data updated in the database.
     * @param {SymptomEventUpdateManyAndReturnArgs} args - Arguments to update many SymptomEvents.
     * @example
     * // Update many SymptomEvents
     * const symptomEvent = await prisma.symptomEvent.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more SymptomEvents and only return the `id`
     * const symptomEventWithIdOnly = await prisma.symptomEvent.updateManyAndReturn({
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
    updateManyAndReturn<T extends SymptomEventUpdateManyAndReturnArgs>(args: SelectSubset<T, SymptomEventUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SymptomEventPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one SymptomEvent.
     * @param {SymptomEventUpsertArgs} args - Arguments to update or create a SymptomEvent.
     * @example
     * // Update or create a SymptomEvent
     * const symptomEvent = await prisma.symptomEvent.upsert({
     *   create: {
     *     // ... data to create a SymptomEvent
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the SymptomEvent we want to update
     *   }
     * })
     */
    upsert<T extends SymptomEventUpsertArgs>(args: SelectSubset<T, SymptomEventUpsertArgs<ExtArgs>>): Prisma__SymptomEventClient<$Result.GetResult<Prisma.$SymptomEventPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of SymptomEvents.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomEventCountArgs} args - Arguments to filter SymptomEvents to count.
     * @example
     * // Count the number of SymptomEvents
     * const count = await prisma.symptomEvent.count({
     *   where: {
     *     // ... the filter for the SymptomEvents we want to count
     *   }
     * })
    **/
    count<T extends SymptomEventCountArgs>(
      args?: Subset<T, SymptomEventCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SymptomEventCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a SymptomEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomEventAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends SymptomEventAggregateArgs>(args: Subset<T, SymptomEventAggregateArgs>): Prisma.PrismaPromise<GetSymptomEventAggregateType<T>>

    /**
     * Group by SymptomEvent.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SymptomEventGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends SymptomEventGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SymptomEventGroupByArgs['orderBy'] }
        : { orderBy?: SymptomEventGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SymptomEventGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSymptomEventGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the SymptomEvent model
   */
  readonly fields: SymptomEventFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for SymptomEvent.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SymptomEventClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the SymptomEvent model
   */
  interface SymptomEventFieldRefs {
    readonly id: FieldRef<"SymptomEvent", 'Int'>
    readonly userId: FieldRef<"SymptomEvent", 'String'>
    readonly symptomKey: FieldRef<"SymptomEvent", 'String'>
    readonly eventType: FieldRef<"SymptomEvent", 'String'>
    readonly timestamp: FieldRef<"SymptomEvent", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * SymptomEvent findUnique
   */
  export type SymptomEventFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
    /**
     * Filter, which SymptomEvent to fetch.
     */
    where: SymptomEventWhereUniqueInput
  }

  /**
   * SymptomEvent findUniqueOrThrow
   */
  export type SymptomEventFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
    /**
     * Filter, which SymptomEvent to fetch.
     */
    where: SymptomEventWhereUniqueInput
  }

  /**
   * SymptomEvent findFirst
   */
  export type SymptomEventFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
    /**
     * Filter, which SymptomEvent to fetch.
     */
    where?: SymptomEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SymptomEvents to fetch.
     */
    orderBy?: SymptomEventOrderByWithRelationInput | SymptomEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SymptomEvents.
     */
    cursor?: SymptomEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SymptomEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SymptomEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SymptomEvents.
     */
    distinct?: SymptomEventScalarFieldEnum | SymptomEventScalarFieldEnum[]
  }

  /**
   * SymptomEvent findFirstOrThrow
   */
  export type SymptomEventFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
    /**
     * Filter, which SymptomEvent to fetch.
     */
    where?: SymptomEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SymptomEvents to fetch.
     */
    orderBy?: SymptomEventOrderByWithRelationInput | SymptomEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for SymptomEvents.
     */
    cursor?: SymptomEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SymptomEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SymptomEvents.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of SymptomEvents.
     */
    distinct?: SymptomEventScalarFieldEnum | SymptomEventScalarFieldEnum[]
  }

  /**
   * SymptomEvent findMany
   */
  export type SymptomEventFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
    /**
     * Filter, which SymptomEvents to fetch.
     */
    where?: SymptomEventWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of SymptomEvents to fetch.
     */
    orderBy?: SymptomEventOrderByWithRelationInput | SymptomEventOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing SymptomEvents.
     */
    cursor?: SymptomEventWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` SymptomEvents from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` SymptomEvents.
     */
    skip?: number
    distinct?: SymptomEventScalarFieldEnum | SymptomEventScalarFieldEnum[]
  }

  /**
   * SymptomEvent create
   */
  export type SymptomEventCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
    /**
     * The data needed to create a SymptomEvent.
     */
    data: XOR<SymptomEventCreateInput, SymptomEventUncheckedCreateInput>
  }

  /**
   * SymptomEvent createMany
   */
  export type SymptomEventCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many SymptomEvents.
     */
    data: SymptomEventCreateManyInput | SymptomEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SymptomEvent createManyAndReturn
   */
  export type SymptomEventCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
    /**
     * The data used to create many SymptomEvents.
     */
    data: SymptomEventCreateManyInput | SymptomEventCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * SymptomEvent update
   */
  export type SymptomEventUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
    /**
     * The data needed to update a SymptomEvent.
     */
    data: XOR<SymptomEventUpdateInput, SymptomEventUncheckedUpdateInput>
    /**
     * Choose, which SymptomEvent to update.
     */
    where: SymptomEventWhereUniqueInput
  }

  /**
   * SymptomEvent updateMany
   */
  export type SymptomEventUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update SymptomEvents.
     */
    data: XOR<SymptomEventUpdateManyMutationInput, SymptomEventUncheckedUpdateManyInput>
    /**
     * Filter which SymptomEvents to update
     */
    where?: SymptomEventWhereInput
    /**
     * Limit how many SymptomEvents to update.
     */
    limit?: number
  }

  /**
   * SymptomEvent updateManyAndReturn
   */
  export type SymptomEventUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
    /**
     * The data used to update SymptomEvents.
     */
    data: XOR<SymptomEventUpdateManyMutationInput, SymptomEventUncheckedUpdateManyInput>
    /**
     * Filter which SymptomEvents to update
     */
    where?: SymptomEventWhereInput
    /**
     * Limit how many SymptomEvents to update.
     */
    limit?: number
  }

  /**
   * SymptomEvent upsert
   */
  export type SymptomEventUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
    /**
     * The filter to search for the SymptomEvent to update in case it exists.
     */
    where: SymptomEventWhereUniqueInput
    /**
     * In case the SymptomEvent found by the `where` argument doesn't exist, create a new SymptomEvent with this data.
     */
    create: XOR<SymptomEventCreateInput, SymptomEventUncheckedCreateInput>
    /**
     * In case the SymptomEvent was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SymptomEventUpdateInput, SymptomEventUncheckedUpdateInput>
  }

  /**
   * SymptomEvent delete
   */
  export type SymptomEventDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
    /**
     * Filter which SymptomEvent to delete.
     */
    where: SymptomEventWhereUniqueInput
  }

  /**
   * SymptomEvent deleteMany
   */
  export type SymptomEventDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which SymptomEvents to delete
     */
    where?: SymptomEventWhereInput
    /**
     * Limit how many SymptomEvents to delete.
     */
    limit?: number
  }

  /**
   * SymptomEvent without action
   */
  export type SymptomEventDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the SymptomEvent
     */
    select?: SymptomEventSelect<ExtArgs> | null
    /**
     * Omit specific fields from the SymptomEvent
     */
    omit?: SymptomEventOmit<ExtArgs> | null
  }


  /**
   * Model DailyNote
   */

  export type AggregateDailyNote = {
    _count: DailyNoteCountAggregateOutputType | null
    _min: DailyNoteMinAggregateOutputType | null
    _max: DailyNoteMaxAggregateOutputType | null
  }

  export type DailyNoteMinAggregateOutputType = {
    id: string | null
    userId: string | null
    content: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyNoteMaxAggregateOutputType = {
    id: string | null
    userId: string | null
    content: string | null
    date: Date | null
    createdAt: Date | null
    updatedAt: Date | null
  }

  export type DailyNoteCountAggregateOutputType = {
    id: number
    userId: number
    content: number
    date: number
    createdAt: number
    updatedAt: number
    _all: number
  }


  export type DailyNoteMinAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyNoteMaxAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    date?: true
    createdAt?: true
    updatedAt?: true
  }

  export type DailyNoteCountAggregateInputType = {
    id?: true
    userId?: true
    content?: true
    date?: true
    createdAt?: true
    updatedAt?: true
    _all?: true
  }

  export type DailyNoteAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyNote to aggregate.
     */
    where?: DailyNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyNotes to fetch.
     */
    orderBy?: DailyNoteOrderByWithRelationInput | DailyNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: DailyNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned DailyNotes
    **/
    _count?: true | DailyNoteCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: DailyNoteMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: DailyNoteMaxAggregateInputType
  }

  export type GetDailyNoteAggregateType<T extends DailyNoteAggregateArgs> = {
        [P in keyof T & keyof AggregateDailyNote]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateDailyNote[P]>
      : GetScalarType<T[P], AggregateDailyNote[P]>
  }




  export type DailyNoteGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: DailyNoteWhereInput
    orderBy?: DailyNoteOrderByWithAggregationInput | DailyNoteOrderByWithAggregationInput[]
    by: DailyNoteScalarFieldEnum[] | DailyNoteScalarFieldEnum
    having?: DailyNoteScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: DailyNoteCountAggregateInputType | true
    _min?: DailyNoteMinAggregateInputType
    _max?: DailyNoteMaxAggregateInputType
  }

  export type DailyNoteGroupByOutputType = {
    id: string
    userId: string
    content: string
    date: Date
    createdAt: Date
    updatedAt: Date
    _count: DailyNoteCountAggregateOutputType | null
    _min: DailyNoteMinAggregateOutputType | null
    _max: DailyNoteMaxAggregateOutputType | null
  }

  type GetDailyNoteGroupByPayload<T extends DailyNoteGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<DailyNoteGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof DailyNoteGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], DailyNoteGroupByOutputType[P]>
            : GetScalarType<T[P], DailyNoteGroupByOutputType[P]>
        }
      >
    >


  export type DailyNoteSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyNote"]>

  export type DailyNoteSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyNote"]>

  export type DailyNoteSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    userId?: boolean
    content?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }, ExtArgs["result"]["dailyNote"]>

  export type DailyNoteSelectScalar = {
    id?: boolean
    userId?: boolean
    content?: boolean
    date?: boolean
    createdAt?: boolean
    updatedAt?: boolean
  }

  export type DailyNoteOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "userId" | "content" | "date" | "createdAt" | "updatedAt", ExtArgs["result"]["dailyNote"]>

  export type $DailyNotePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "DailyNote"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      id: string
      userId: string
      content: string
      date: Date
      createdAt: Date
      updatedAt: Date
    }, ExtArgs["result"]["dailyNote"]>
    composites: {}
  }

  type DailyNoteGetPayload<S extends boolean | null | undefined | DailyNoteDefaultArgs> = $Result.GetResult<Prisma.$DailyNotePayload, S>

  type DailyNoteCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<DailyNoteFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: DailyNoteCountAggregateInputType | true
    }

  export interface DailyNoteDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['DailyNote'], meta: { name: 'DailyNote' } }
    /**
     * Find zero or one DailyNote that matches the filter.
     * @param {DailyNoteFindUniqueArgs} args - Arguments to find a DailyNote
     * @example
     * // Get one DailyNote
     * const dailyNote = await prisma.dailyNote.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends DailyNoteFindUniqueArgs>(args: SelectSubset<T, DailyNoteFindUniqueArgs<ExtArgs>>): Prisma__DailyNoteClient<$Result.GetResult<Prisma.$DailyNotePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one DailyNote that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {DailyNoteFindUniqueOrThrowArgs} args - Arguments to find a DailyNote
     * @example
     * // Get one DailyNote
     * const dailyNote = await prisma.dailyNote.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends DailyNoteFindUniqueOrThrowArgs>(args: SelectSubset<T, DailyNoteFindUniqueOrThrowArgs<ExtArgs>>): Prisma__DailyNoteClient<$Result.GetResult<Prisma.$DailyNotePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyNote that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyNoteFindFirstArgs} args - Arguments to find a DailyNote
     * @example
     * // Get one DailyNote
     * const dailyNote = await prisma.dailyNote.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends DailyNoteFindFirstArgs>(args?: SelectSubset<T, DailyNoteFindFirstArgs<ExtArgs>>): Prisma__DailyNoteClient<$Result.GetResult<Prisma.$DailyNotePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first DailyNote that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyNoteFindFirstOrThrowArgs} args - Arguments to find a DailyNote
     * @example
     * // Get one DailyNote
     * const dailyNote = await prisma.dailyNote.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends DailyNoteFindFirstOrThrowArgs>(args?: SelectSubset<T, DailyNoteFindFirstOrThrowArgs<ExtArgs>>): Prisma__DailyNoteClient<$Result.GetResult<Prisma.$DailyNotePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more DailyNotes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyNoteFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all DailyNotes
     * const dailyNotes = await prisma.dailyNote.findMany()
     * 
     * // Get first 10 DailyNotes
     * const dailyNotes = await prisma.dailyNote.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const dailyNoteWithIdOnly = await prisma.dailyNote.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends DailyNoteFindManyArgs>(args?: SelectSubset<T, DailyNoteFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyNotePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a DailyNote.
     * @param {DailyNoteCreateArgs} args - Arguments to create a DailyNote.
     * @example
     * // Create one DailyNote
     * const DailyNote = await prisma.dailyNote.create({
     *   data: {
     *     // ... data to create a DailyNote
     *   }
     * })
     * 
     */
    create<T extends DailyNoteCreateArgs>(args: SelectSubset<T, DailyNoteCreateArgs<ExtArgs>>): Prisma__DailyNoteClient<$Result.GetResult<Prisma.$DailyNotePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many DailyNotes.
     * @param {DailyNoteCreateManyArgs} args - Arguments to create many DailyNotes.
     * @example
     * // Create many DailyNotes
     * const dailyNote = await prisma.dailyNote.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends DailyNoteCreateManyArgs>(args?: SelectSubset<T, DailyNoteCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many DailyNotes and returns the data saved in the database.
     * @param {DailyNoteCreateManyAndReturnArgs} args - Arguments to create many DailyNotes.
     * @example
     * // Create many DailyNotes
     * const dailyNote = await prisma.dailyNote.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many DailyNotes and only return the `id`
     * const dailyNoteWithIdOnly = await prisma.dailyNote.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends DailyNoteCreateManyAndReturnArgs>(args?: SelectSubset<T, DailyNoteCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyNotePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a DailyNote.
     * @param {DailyNoteDeleteArgs} args - Arguments to delete one DailyNote.
     * @example
     * // Delete one DailyNote
     * const DailyNote = await prisma.dailyNote.delete({
     *   where: {
     *     // ... filter to delete one DailyNote
     *   }
     * })
     * 
     */
    delete<T extends DailyNoteDeleteArgs>(args: SelectSubset<T, DailyNoteDeleteArgs<ExtArgs>>): Prisma__DailyNoteClient<$Result.GetResult<Prisma.$DailyNotePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one DailyNote.
     * @param {DailyNoteUpdateArgs} args - Arguments to update one DailyNote.
     * @example
     * // Update one DailyNote
     * const dailyNote = await prisma.dailyNote.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends DailyNoteUpdateArgs>(args: SelectSubset<T, DailyNoteUpdateArgs<ExtArgs>>): Prisma__DailyNoteClient<$Result.GetResult<Prisma.$DailyNotePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more DailyNotes.
     * @param {DailyNoteDeleteManyArgs} args - Arguments to filter DailyNotes to delete.
     * @example
     * // Delete a few DailyNotes
     * const { count } = await prisma.dailyNote.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends DailyNoteDeleteManyArgs>(args?: SelectSubset<T, DailyNoteDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyNoteUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many DailyNotes
     * const dailyNote = await prisma.dailyNote.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends DailyNoteUpdateManyArgs>(args: SelectSubset<T, DailyNoteUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more DailyNotes and returns the data updated in the database.
     * @param {DailyNoteUpdateManyAndReturnArgs} args - Arguments to update many DailyNotes.
     * @example
     * // Update many DailyNotes
     * const dailyNote = await prisma.dailyNote.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more DailyNotes and only return the `id`
     * const dailyNoteWithIdOnly = await prisma.dailyNote.updateManyAndReturn({
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
    updateManyAndReturn<T extends DailyNoteUpdateManyAndReturnArgs>(args: SelectSubset<T, DailyNoteUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$DailyNotePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one DailyNote.
     * @param {DailyNoteUpsertArgs} args - Arguments to update or create a DailyNote.
     * @example
     * // Update or create a DailyNote
     * const dailyNote = await prisma.dailyNote.upsert({
     *   create: {
     *     // ... data to create a DailyNote
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the DailyNote we want to update
     *   }
     * })
     */
    upsert<T extends DailyNoteUpsertArgs>(args: SelectSubset<T, DailyNoteUpsertArgs<ExtArgs>>): Prisma__DailyNoteClient<$Result.GetResult<Prisma.$DailyNotePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of DailyNotes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyNoteCountArgs} args - Arguments to filter DailyNotes to count.
     * @example
     * // Count the number of DailyNotes
     * const count = await prisma.dailyNote.count({
     *   where: {
     *     // ... the filter for the DailyNotes we want to count
     *   }
     * })
    **/
    count<T extends DailyNoteCountArgs>(
      args?: Subset<T, DailyNoteCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], DailyNoteCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a DailyNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyNoteAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
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
    aggregate<T extends DailyNoteAggregateArgs>(args: Subset<T, DailyNoteAggregateArgs>): Prisma.PrismaPromise<GetDailyNoteAggregateType<T>>

    /**
     * Group by DailyNote.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {DailyNoteGroupByArgs} args - Group by arguments.
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
    groupBy<
      T extends DailyNoteGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: DailyNoteGroupByArgs['orderBy'] }
        : { orderBy?: DailyNoteGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, DailyNoteGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetDailyNoteGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the DailyNote model
   */
  readonly fields: DailyNoteFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for DailyNote.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__DailyNoteClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the DailyNote model
   */
  interface DailyNoteFieldRefs {
    readonly id: FieldRef<"DailyNote", 'String'>
    readonly userId: FieldRef<"DailyNote", 'String'>
    readonly content: FieldRef<"DailyNote", 'String'>
    readonly date: FieldRef<"DailyNote", 'DateTime'>
    readonly createdAt: FieldRef<"DailyNote", 'DateTime'>
    readonly updatedAt: FieldRef<"DailyNote", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * DailyNote findUnique
   */
  export type DailyNoteFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
    /**
     * Filter, which DailyNote to fetch.
     */
    where: DailyNoteWhereUniqueInput
  }

  /**
   * DailyNote findUniqueOrThrow
   */
  export type DailyNoteFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
    /**
     * Filter, which DailyNote to fetch.
     */
    where: DailyNoteWhereUniqueInput
  }

  /**
   * DailyNote findFirst
   */
  export type DailyNoteFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
    /**
     * Filter, which DailyNote to fetch.
     */
    where?: DailyNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyNotes to fetch.
     */
    orderBy?: DailyNoteOrderByWithRelationInput | DailyNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyNotes.
     */
    cursor?: DailyNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyNotes.
     */
    distinct?: DailyNoteScalarFieldEnum | DailyNoteScalarFieldEnum[]
  }

  /**
   * DailyNote findFirstOrThrow
   */
  export type DailyNoteFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
    /**
     * Filter, which DailyNote to fetch.
     */
    where?: DailyNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyNotes to fetch.
     */
    orderBy?: DailyNoteOrderByWithRelationInput | DailyNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for DailyNotes.
     */
    cursor?: DailyNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyNotes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of DailyNotes.
     */
    distinct?: DailyNoteScalarFieldEnum | DailyNoteScalarFieldEnum[]
  }

  /**
   * DailyNote findMany
   */
  export type DailyNoteFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
    /**
     * Filter, which DailyNotes to fetch.
     */
    where?: DailyNoteWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of DailyNotes to fetch.
     */
    orderBy?: DailyNoteOrderByWithRelationInput | DailyNoteOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing DailyNotes.
     */
    cursor?: DailyNoteWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` DailyNotes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` DailyNotes.
     */
    skip?: number
    distinct?: DailyNoteScalarFieldEnum | DailyNoteScalarFieldEnum[]
  }

  /**
   * DailyNote create
   */
  export type DailyNoteCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
    /**
     * The data needed to create a DailyNote.
     */
    data: XOR<DailyNoteCreateInput, DailyNoteUncheckedCreateInput>
  }

  /**
   * DailyNote createMany
   */
  export type DailyNoteCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many DailyNotes.
     */
    data: DailyNoteCreateManyInput | DailyNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyNote createManyAndReturn
   */
  export type DailyNoteCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
    /**
     * The data used to create many DailyNotes.
     */
    data: DailyNoteCreateManyInput | DailyNoteCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * DailyNote update
   */
  export type DailyNoteUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
    /**
     * The data needed to update a DailyNote.
     */
    data: XOR<DailyNoteUpdateInput, DailyNoteUncheckedUpdateInput>
    /**
     * Choose, which DailyNote to update.
     */
    where: DailyNoteWhereUniqueInput
  }

  /**
   * DailyNote updateMany
   */
  export type DailyNoteUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update DailyNotes.
     */
    data: XOR<DailyNoteUpdateManyMutationInput, DailyNoteUncheckedUpdateManyInput>
    /**
     * Filter which DailyNotes to update
     */
    where?: DailyNoteWhereInput
    /**
     * Limit how many DailyNotes to update.
     */
    limit?: number
  }

  /**
   * DailyNote updateManyAndReturn
   */
  export type DailyNoteUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
    /**
     * The data used to update DailyNotes.
     */
    data: XOR<DailyNoteUpdateManyMutationInput, DailyNoteUncheckedUpdateManyInput>
    /**
     * Filter which DailyNotes to update
     */
    where?: DailyNoteWhereInput
    /**
     * Limit how many DailyNotes to update.
     */
    limit?: number
  }

  /**
   * DailyNote upsert
   */
  export type DailyNoteUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
    /**
     * The filter to search for the DailyNote to update in case it exists.
     */
    where: DailyNoteWhereUniqueInput
    /**
     * In case the DailyNote found by the `where` argument doesn't exist, create a new DailyNote with this data.
     */
    create: XOR<DailyNoteCreateInput, DailyNoteUncheckedCreateInput>
    /**
     * In case the DailyNote was found with the provided `where` argument, update it with this data.
     */
    update: XOR<DailyNoteUpdateInput, DailyNoteUncheckedUpdateInput>
  }

  /**
   * DailyNote delete
   */
  export type DailyNoteDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
    /**
     * Filter which DailyNote to delete.
     */
    where: DailyNoteWhereUniqueInput
  }

  /**
   * DailyNote deleteMany
   */
  export type DailyNoteDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which DailyNotes to delete
     */
    where?: DailyNoteWhereInput
    /**
     * Limit how many DailyNotes to delete.
     */
    limit?: number
  }

  /**
   * DailyNote without action
   */
  export type DailyNoteDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the DailyNote
     */
    select?: DailyNoteSelect<ExtArgs> | null
    /**
     * Omit specific fields from the DailyNote
     */
    omit?: DailyNoteOmit<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const UserScalarFieldEnum: {
    id: 'id',
    email: 'email',
    firstName: 'firstName',
    lastLogin: 'lastLogin',
    lastActive: 'lastActive'
  };

  export type UserScalarFieldEnum = (typeof UserScalarFieldEnum)[keyof typeof UserScalarFieldEnum]


  export const ActivityScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    checkin: 'checkin',
    mood: 'mood',
    reminder: 'reminder',
    journal: 'journal'
  };

  export type ActivityScalarFieldEnum = (typeof ActivityScalarFieldEnum)[keyof typeof ActivityScalarFieldEnum]


  export const EngagementScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    date: 'date',
    login: 'login',
    checkin: 'checkin',
    mood: 'mood',
    reminder: 'reminder',
    journal: 'journal'
  };

  export type EngagementScalarFieldEnum = (typeof EngagementScalarFieldEnum)[keyof typeof EngagementScalarFieldEnum]


  export const MoodEntryScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    moodType: 'moodType',
    value: 'value',
    createdAt: 'createdAt'
  };

  export type MoodEntryScalarFieldEnum = (typeof MoodEntryScalarFieldEnum)[keyof typeof MoodEntryScalarFieldEnum]


  export const SymptomEventScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    symptomKey: 'symptomKey',
    eventType: 'eventType',
    timestamp: 'timestamp'
  };

  export type SymptomEventScalarFieldEnum = (typeof SymptomEventScalarFieldEnum)[keyof typeof SymptomEventScalarFieldEnum]


  export const DailyNoteScalarFieldEnum: {
    id: 'id',
    userId: 'userId',
    content: 'content',
    date: 'date',
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  };

  export type DailyNoteScalarFieldEnum = (typeof DailyNoteScalarFieldEnum)[keyof typeof DailyNoteScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Boolean'
   */
  export type BooleanFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Boolean'>
    


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type UserWhereInput = {
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    id?: StringFilter<"User"> | string
    email?: StringFilter<"User"> | string
    firstName?: StringNullableFilter<"User"> | string | null
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    lastActive?: DateTimeNullableFilter<"User"> | Date | string | null
    activities?: ActivityListRelationFilter
  }

  export type UserOrderByWithRelationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastLogin?: SortOrderInput | SortOrder
    lastActive?: SortOrderInput | SortOrder
    activities?: ActivityOrderByRelationAggregateInput
  }

  export type UserWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    email?: string
    AND?: UserWhereInput | UserWhereInput[]
    OR?: UserWhereInput[]
    NOT?: UserWhereInput | UserWhereInput[]
    firstName?: StringNullableFilter<"User"> | string | null
    lastLogin?: DateTimeNullableFilter<"User"> | Date | string | null
    lastActive?: DateTimeNullableFilter<"User"> | Date | string | null
    activities?: ActivityListRelationFilter
  }, "id" | "email">

  export type UserOrderByWithAggregationInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrderInput | SortOrder
    lastLogin?: SortOrderInput | SortOrder
    lastActive?: SortOrderInput | SortOrder
    _count?: UserCountOrderByAggregateInput
    _max?: UserMaxOrderByAggregateInput
    _min?: UserMinOrderByAggregateInput
  }

  export type UserScalarWhereWithAggregatesInput = {
    AND?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    OR?: UserScalarWhereWithAggregatesInput[]
    NOT?: UserScalarWhereWithAggregatesInput | UserScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"User"> | string
    email?: StringWithAggregatesFilter<"User"> | string
    firstName?: StringNullableWithAggregatesFilter<"User"> | string | null
    lastLogin?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
    lastActive?: DateTimeNullableWithAggregatesFilter<"User"> | Date | string | null
  }

  export type ActivityWhereInput = {
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    id?: StringFilter<"Activity"> | string
    userId?: StringFilter<"Activity"> | string
    date?: DateTimeFilter<"Activity"> | Date | string
    checkin?: BoolFilter<"Activity"> | boolean
    mood?: BoolFilter<"Activity"> | boolean
    reminder?: BoolFilter<"Activity"> | boolean
    journal?: BoolFilter<"Activity"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }

  export type ActivityOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    checkin?: SortOrder
    mood?: SortOrder
    reminder?: SortOrder
    journal?: SortOrder
    user?: UserOrderByWithRelationInput
  }

  export type ActivityWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    AND?: ActivityWhereInput | ActivityWhereInput[]
    OR?: ActivityWhereInput[]
    NOT?: ActivityWhereInput | ActivityWhereInput[]
    userId?: StringFilter<"Activity"> | string
    date?: DateTimeFilter<"Activity"> | Date | string
    checkin?: BoolFilter<"Activity"> | boolean
    mood?: BoolFilter<"Activity"> | boolean
    reminder?: BoolFilter<"Activity"> | boolean
    journal?: BoolFilter<"Activity"> | boolean
    user?: XOR<UserScalarRelationFilter, UserWhereInput>
  }, "id">

  export type ActivityOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    checkin?: SortOrder
    mood?: SortOrder
    reminder?: SortOrder
    journal?: SortOrder
    _count?: ActivityCountOrderByAggregateInput
    _max?: ActivityMaxOrderByAggregateInput
    _min?: ActivityMinOrderByAggregateInput
  }

  export type ActivityScalarWhereWithAggregatesInput = {
    AND?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    OR?: ActivityScalarWhereWithAggregatesInput[]
    NOT?: ActivityScalarWhereWithAggregatesInput | ActivityScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Activity"> | string
    userId?: StringWithAggregatesFilter<"Activity"> | string
    date?: DateTimeWithAggregatesFilter<"Activity"> | Date | string
    checkin?: BoolWithAggregatesFilter<"Activity"> | boolean
    mood?: BoolWithAggregatesFilter<"Activity"> | boolean
    reminder?: BoolWithAggregatesFilter<"Activity"> | boolean
    journal?: BoolWithAggregatesFilter<"Activity"> | boolean
  }

  export type EngagementWhereInput = {
    AND?: EngagementWhereInput | EngagementWhereInput[]
    OR?: EngagementWhereInput[]
    NOT?: EngagementWhereInput | EngagementWhereInput[]
    id?: StringFilter<"Engagement"> | string
    userId?: StringFilter<"Engagement"> | string
    date?: DateTimeFilter<"Engagement"> | Date | string
    login?: BoolFilter<"Engagement"> | boolean
    checkin?: BoolFilter<"Engagement"> | boolean
    mood?: BoolFilter<"Engagement"> | boolean
    reminder?: BoolFilter<"Engagement"> | boolean
    journal?: BoolFilter<"Engagement"> | boolean
  }

  export type EngagementOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    login?: SortOrder
    checkin?: SortOrder
    mood?: SortOrder
    reminder?: SortOrder
    journal?: SortOrder
  }

  export type EngagementWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_date?: EngagementUserIdDateCompoundUniqueInput
    AND?: EngagementWhereInput | EngagementWhereInput[]
    OR?: EngagementWhereInput[]
    NOT?: EngagementWhereInput | EngagementWhereInput[]
    userId?: StringFilter<"Engagement"> | string
    date?: DateTimeFilter<"Engagement"> | Date | string
    login?: BoolFilter<"Engagement"> | boolean
    checkin?: BoolFilter<"Engagement"> | boolean
    mood?: BoolFilter<"Engagement"> | boolean
    reminder?: BoolFilter<"Engagement"> | boolean
    journal?: BoolFilter<"Engagement"> | boolean
  }, "id" | "userId_date">

  export type EngagementOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    login?: SortOrder
    checkin?: SortOrder
    mood?: SortOrder
    reminder?: SortOrder
    journal?: SortOrder
    _count?: EngagementCountOrderByAggregateInput
    _max?: EngagementMaxOrderByAggregateInput
    _min?: EngagementMinOrderByAggregateInput
  }

  export type EngagementScalarWhereWithAggregatesInput = {
    AND?: EngagementScalarWhereWithAggregatesInput | EngagementScalarWhereWithAggregatesInput[]
    OR?: EngagementScalarWhereWithAggregatesInput[]
    NOT?: EngagementScalarWhereWithAggregatesInput | EngagementScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"Engagement"> | string
    userId?: StringWithAggregatesFilter<"Engagement"> | string
    date?: DateTimeWithAggregatesFilter<"Engagement"> | Date | string
    login?: BoolWithAggregatesFilter<"Engagement"> | boolean
    checkin?: BoolWithAggregatesFilter<"Engagement"> | boolean
    mood?: BoolWithAggregatesFilter<"Engagement"> | boolean
    reminder?: BoolWithAggregatesFilter<"Engagement"> | boolean
    journal?: BoolWithAggregatesFilter<"Engagement"> | boolean
  }

  export type MoodEntryWhereInput = {
    AND?: MoodEntryWhereInput | MoodEntryWhereInput[]
    OR?: MoodEntryWhereInput[]
    NOT?: MoodEntryWhereInput | MoodEntryWhereInput[]
    id?: IntFilter<"MoodEntry"> | number
    userId?: StringFilter<"MoodEntry"> | string
    moodType?: StringFilter<"MoodEntry"> | string
    value?: IntFilter<"MoodEntry"> | number
    createdAt?: DateTimeFilter<"MoodEntry"> | Date | string
  }

  export type MoodEntryOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    moodType?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
  }

  export type MoodEntryWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: MoodEntryWhereInput | MoodEntryWhereInput[]
    OR?: MoodEntryWhereInput[]
    NOT?: MoodEntryWhereInput | MoodEntryWhereInput[]
    userId?: StringFilter<"MoodEntry"> | string
    moodType?: StringFilter<"MoodEntry"> | string
    value?: IntFilter<"MoodEntry"> | number
    createdAt?: DateTimeFilter<"MoodEntry"> | Date | string
  }, "id">

  export type MoodEntryOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    moodType?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
    _count?: MoodEntryCountOrderByAggregateInput
    _avg?: MoodEntryAvgOrderByAggregateInput
    _max?: MoodEntryMaxOrderByAggregateInput
    _min?: MoodEntryMinOrderByAggregateInput
    _sum?: MoodEntrySumOrderByAggregateInput
  }

  export type MoodEntryScalarWhereWithAggregatesInput = {
    AND?: MoodEntryScalarWhereWithAggregatesInput | MoodEntryScalarWhereWithAggregatesInput[]
    OR?: MoodEntryScalarWhereWithAggregatesInput[]
    NOT?: MoodEntryScalarWhereWithAggregatesInput | MoodEntryScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"MoodEntry"> | number
    userId?: StringWithAggregatesFilter<"MoodEntry"> | string
    moodType?: StringWithAggregatesFilter<"MoodEntry"> | string
    value?: IntWithAggregatesFilter<"MoodEntry"> | number
    createdAt?: DateTimeWithAggregatesFilter<"MoodEntry"> | Date | string
  }

  export type SymptomEventWhereInput = {
    AND?: SymptomEventWhereInput | SymptomEventWhereInput[]
    OR?: SymptomEventWhereInput[]
    NOT?: SymptomEventWhereInput | SymptomEventWhereInput[]
    id?: IntFilter<"SymptomEvent"> | number
    userId?: StringFilter<"SymptomEvent"> | string
    symptomKey?: StringFilter<"SymptomEvent"> | string
    eventType?: StringFilter<"SymptomEvent"> | string
    timestamp?: DateTimeFilter<"SymptomEvent"> | Date | string
  }

  export type SymptomEventOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    symptomKey?: SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
  }

  export type SymptomEventWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: SymptomEventWhereInput | SymptomEventWhereInput[]
    OR?: SymptomEventWhereInput[]
    NOT?: SymptomEventWhereInput | SymptomEventWhereInput[]
    userId?: StringFilter<"SymptomEvent"> | string
    symptomKey?: StringFilter<"SymptomEvent"> | string
    eventType?: StringFilter<"SymptomEvent"> | string
    timestamp?: DateTimeFilter<"SymptomEvent"> | Date | string
  }, "id">

  export type SymptomEventOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    symptomKey?: SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
    _count?: SymptomEventCountOrderByAggregateInput
    _avg?: SymptomEventAvgOrderByAggregateInput
    _max?: SymptomEventMaxOrderByAggregateInput
    _min?: SymptomEventMinOrderByAggregateInput
    _sum?: SymptomEventSumOrderByAggregateInput
  }

  export type SymptomEventScalarWhereWithAggregatesInput = {
    AND?: SymptomEventScalarWhereWithAggregatesInput | SymptomEventScalarWhereWithAggregatesInput[]
    OR?: SymptomEventScalarWhereWithAggregatesInput[]
    NOT?: SymptomEventScalarWhereWithAggregatesInput | SymptomEventScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"SymptomEvent"> | number
    userId?: StringWithAggregatesFilter<"SymptomEvent"> | string
    symptomKey?: StringWithAggregatesFilter<"SymptomEvent"> | string
    eventType?: StringWithAggregatesFilter<"SymptomEvent"> | string
    timestamp?: DateTimeWithAggregatesFilter<"SymptomEvent"> | Date | string
  }

  export type DailyNoteWhereInput = {
    AND?: DailyNoteWhereInput | DailyNoteWhereInput[]
    OR?: DailyNoteWhereInput[]
    NOT?: DailyNoteWhereInput | DailyNoteWhereInput[]
    id?: StringFilter<"DailyNote"> | string
    userId?: StringFilter<"DailyNote"> | string
    content?: StringFilter<"DailyNote"> | string
    date?: DateTimeFilter<"DailyNote"> | Date | string
    createdAt?: DateTimeFilter<"DailyNote"> | Date | string
    updatedAt?: DateTimeFilter<"DailyNote"> | Date | string
  }

  export type DailyNoteOrderByWithRelationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyNoteWhereUniqueInput = Prisma.AtLeast<{
    id?: string
    userId_date?: DailyNoteUserIdDateCompoundUniqueInput
    AND?: DailyNoteWhereInput | DailyNoteWhereInput[]
    OR?: DailyNoteWhereInput[]
    NOT?: DailyNoteWhereInput | DailyNoteWhereInput[]
    userId?: StringFilter<"DailyNote"> | string
    content?: StringFilter<"DailyNote"> | string
    date?: DateTimeFilter<"DailyNote"> | Date | string
    createdAt?: DateTimeFilter<"DailyNote"> | Date | string
    updatedAt?: DateTimeFilter<"DailyNote"> | Date | string
  }, "id" | "userId_date">

  export type DailyNoteOrderByWithAggregationInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
    _count?: DailyNoteCountOrderByAggregateInput
    _max?: DailyNoteMaxOrderByAggregateInput
    _min?: DailyNoteMinOrderByAggregateInput
  }

  export type DailyNoteScalarWhereWithAggregatesInput = {
    AND?: DailyNoteScalarWhereWithAggregatesInput | DailyNoteScalarWhereWithAggregatesInput[]
    OR?: DailyNoteScalarWhereWithAggregatesInput[]
    NOT?: DailyNoteScalarWhereWithAggregatesInput | DailyNoteScalarWhereWithAggregatesInput[]
    id?: StringWithAggregatesFilter<"DailyNote"> | string
    userId?: StringWithAggregatesFilter<"DailyNote"> | string
    content?: StringWithAggregatesFilter<"DailyNote"> | string
    date?: DateTimeWithAggregatesFilter<"DailyNote"> | Date | string
    createdAt?: DateTimeWithAggregatesFilter<"DailyNote"> | Date | string
    updatedAt?: DateTimeWithAggregatesFilter<"DailyNote"> | Date | string
  }

  export type UserCreateInput = {
    id?: string
    email: string
    firstName?: string | null
    lastLogin?: Date | string | null
    lastActive?: Date | string | null
    activities?: ActivityCreateNestedManyWithoutUserInput
  }

  export type UserUncheckedCreateInput = {
    id?: string
    email: string
    firstName?: string | null
    lastLogin?: Date | string | null
    lastActive?: Date | string | null
    activities?: ActivityUncheckedCreateNestedManyWithoutUserInput
  }

  export type UserUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activities?: ActivityUpdateManyWithoutUserNestedInput
  }

  export type UserUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    activities?: ActivityUncheckedUpdateManyWithoutUserNestedInput
  }

  export type UserCreateManyInput = {
    id?: string
    email: string
    firstName?: string | null
    lastLogin?: Date | string | null
    lastActive?: Date | string | null
  }

  export type UserUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ActivityCreateInput = {
    id?: string
    date: Date | string
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
    user: UserCreateNestedOneWithoutActivitiesInput
  }

  export type ActivityUncheckedCreateInput = {
    id?: string
    userId: string
    date: Date | string
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }

  export type ActivityUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkin?: BoolFieldUpdateOperationsInput | boolean
    mood?: BoolFieldUpdateOperationsInput | boolean
    reminder?: BoolFieldUpdateOperationsInput | boolean
    journal?: BoolFieldUpdateOperationsInput | boolean
    user?: UserUpdateOneRequiredWithoutActivitiesNestedInput
  }

  export type ActivityUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkin?: BoolFieldUpdateOperationsInput | boolean
    mood?: BoolFieldUpdateOperationsInput | boolean
    reminder?: BoolFieldUpdateOperationsInput | boolean
    journal?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityCreateManyInput = {
    id?: string
    userId: string
    date: Date | string
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }

  export type ActivityUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkin?: BoolFieldUpdateOperationsInput | boolean
    mood?: BoolFieldUpdateOperationsInput | boolean
    reminder?: BoolFieldUpdateOperationsInput | boolean
    journal?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkin?: BoolFieldUpdateOperationsInput | boolean
    mood?: BoolFieldUpdateOperationsInput | boolean
    reminder?: BoolFieldUpdateOperationsInput | boolean
    journal?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EngagementCreateInput = {
    id?: string
    userId: string
    date: Date | string
    login?: boolean
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }

  export type EngagementUncheckedCreateInput = {
    id?: string
    userId: string
    date: Date | string
    login?: boolean
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }

  export type EngagementUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    login?: BoolFieldUpdateOperationsInput | boolean
    checkin?: BoolFieldUpdateOperationsInput | boolean
    mood?: BoolFieldUpdateOperationsInput | boolean
    reminder?: BoolFieldUpdateOperationsInput | boolean
    journal?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EngagementUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    login?: BoolFieldUpdateOperationsInput | boolean
    checkin?: BoolFieldUpdateOperationsInput | boolean
    mood?: BoolFieldUpdateOperationsInput | boolean
    reminder?: BoolFieldUpdateOperationsInput | boolean
    journal?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EngagementCreateManyInput = {
    id?: string
    userId: string
    date: Date | string
    login?: boolean
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }

  export type EngagementUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    login?: BoolFieldUpdateOperationsInput | boolean
    checkin?: BoolFieldUpdateOperationsInput | boolean
    mood?: BoolFieldUpdateOperationsInput | boolean
    reminder?: BoolFieldUpdateOperationsInput | boolean
    journal?: BoolFieldUpdateOperationsInput | boolean
  }

  export type EngagementUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    login?: BoolFieldUpdateOperationsInput | boolean
    checkin?: BoolFieldUpdateOperationsInput | boolean
    mood?: BoolFieldUpdateOperationsInput | boolean
    reminder?: BoolFieldUpdateOperationsInput | boolean
    journal?: BoolFieldUpdateOperationsInput | boolean
  }

  export type MoodEntryCreateInput = {
    userId: string
    moodType: string
    value: number
    createdAt?: Date | string
  }

  export type MoodEntryUncheckedCreateInput = {
    id?: number
    userId: string
    moodType: string
    value: number
    createdAt?: Date | string
  }

  export type MoodEntryUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    moodType?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    moodType?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryCreateManyInput = {
    id?: number
    userId: string
    moodType: string
    value: number
    createdAt?: Date | string
  }

  export type MoodEntryUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    moodType?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type MoodEntryUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    moodType?: StringFieldUpdateOperationsInput | string
    value?: IntFieldUpdateOperationsInput | number
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SymptomEventCreateInput = {
    userId: string
    symptomKey: string
    eventType: string
    timestamp?: Date | string
  }

  export type SymptomEventUncheckedCreateInput = {
    id?: number
    userId: string
    symptomKey: string
    eventType: string
    timestamp?: Date | string
  }

  export type SymptomEventUpdateInput = {
    userId?: StringFieldUpdateOperationsInput | string
    symptomKey?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SymptomEventUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    symptomKey?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SymptomEventCreateManyInput = {
    id?: number
    userId: string
    symptomKey: string
    eventType: string
    timestamp?: Date | string
  }

  export type SymptomEventUpdateManyMutationInput = {
    userId?: StringFieldUpdateOperationsInput | string
    symptomKey?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SymptomEventUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    userId?: StringFieldUpdateOperationsInput | string
    symptomKey?: StringFieldUpdateOperationsInput | string
    eventType?: StringFieldUpdateOperationsInput | string
    timestamp?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyNoteCreateInput = {
    id?: string
    userId: string
    content: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyNoteUncheckedCreateInput = {
    id?: string
    userId: string
    content: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyNoteUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyNoteUncheckedUpdateInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyNoteCreateManyInput = {
    id?: string
    userId: string
    content: string
    date: Date | string
    createdAt?: Date | string
    updatedAt?: Date | string
  }

  export type DailyNoteUpdateManyMutationInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type DailyNoteUncheckedUpdateManyInput = {
    id?: StringFieldUpdateOperationsInput | string
    userId?: StringFieldUpdateOperationsInput | string
    content?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
    updatedAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type DateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type ActivityListRelationFilter = {
    every?: ActivityWhereInput
    some?: ActivityWhereInput
    none?: ActivityWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ActivityOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UserCountOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastLogin?: SortOrder
    lastActive?: SortOrder
  }

  export type UserMaxOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastLogin?: SortOrder
    lastActive?: SortOrder
  }

  export type UserMinOrderByAggregateInput = {
    id?: SortOrder
    email?: SortOrder
    firstName?: SortOrder
    lastLogin?: SortOrder
    lastActive?: SortOrder
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type DateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type BoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type UserScalarRelationFilter = {
    is?: UserWhereInput
    isNot?: UserWhereInput
  }

  export type ActivityCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    checkin?: SortOrder
    mood?: SortOrder
    reminder?: SortOrder
    journal?: SortOrder
  }

  export type ActivityMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    checkin?: SortOrder
    mood?: SortOrder
    reminder?: SortOrder
    journal?: SortOrder
  }

  export type ActivityMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    checkin?: SortOrder
    mood?: SortOrder
    reminder?: SortOrder
    journal?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type BoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type EngagementUserIdDateCompoundUniqueInput = {
    userId: string
    date: Date | string
  }

  export type EngagementCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    login?: SortOrder
    checkin?: SortOrder
    mood?: SortOrder
    reminder?: SortOrder
    journal?: SortOrder
  }

  export type EngagementMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    login?: SortOrder
    checkin?: SortOrder
    mood?: SortOrder
    reminder?: SortOrder
    journal?: SortOrder
  }

  export type EngagementMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    date?: SortOrder
    login?: SortOrder
    checkin?: SortOrder
    mood?: SortOrder
    reminder?: SortOrder
    journal?: SortOrder
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type MoodEntryCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    moodType?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
  }

  export type MoodEntryAvgOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type MoodEntryMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    moodType?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
  }

  export type MoodEntryMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    moodType?: SortOrder
    value?: SortOrder
    createdAt?: SortOrder
  }

  export type MoodEntrySumOrderByAggregateInput = {
    id?: SortOrder
    value?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type SymptomEventCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symptomKey?: SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
  }

  export type SymptomEventAvgOrderByAggregateInput = {
    id?: SortOrder
  }

  export type SymptomEventMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symptomKey?: SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
  }

  export type SymptomEventMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    symptomKey?: SortOrder
    eventType?: SortOrder
    timestamp?: SortOrder
  }

  export type SymptomEventSumOrderByAggregateInput = {
    id?: SortOrder
  }

  export type DailyNoteUserIdDateCompoundUniqueInput = {
    userId: string
    date: Date | string
  }

  export type DailyNoteCountOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyNoteMaxOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type DailyNoteMinOrderByAggregateInput = {
    id?: SortOrder
    userId?: SortOrder
    content?: SortOrder
    date?: SortOrder
    createdAt?: SortOrder
    updatedAt?: SortOrder
  }

  export type ActivityCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type ActivityUncheckedCreateNestedManyWithoutUserInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type NullableDateTimeFieldUpdateOperationsInput = {
    set?: Date | string | null
  }

  export type ActivityUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type ActivityUncheckedUpdateManyWithoutUserNestedInput = {
    create?: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput> | ActivityCreateWithoutUserInput[] | ActivityUncheckedCreateWithoutUserInput[]
    connectOrCreate?: ActivityCreateOrConnectWithoutUserInput | ActivityCreateOrConnectWithoutUserInput[]
    upsert?: ActivityUpsertWithWhereUniqueWithoutUserInput | ActivityUpsertWithWhereUniqueWithoutUserInput[]
    createMany?: ActivityCreateManyUserInputEnvelope
    set?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    disconnect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    delete?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    connect?: ActivityWhereUniqueInput | ActivityWhereUniqueInput[]
    update?: ActivityUpdateWithWhereUniqueWithoutUserInput | ActivityUpdateWithWhereUniqueWithoutUserInput[]
    updateMany?: ActivityUpdateManyWithWhereWithoutUserInput | ActivityUpdateManyWithWhereWithoutUserInput[]
    deleteMany?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
  }

  export type UserCreateNestedOneWithoutActivitiesInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    connect?: UserWhereUniqueInput
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type BoolFieldUpdateOperationsInput = {
    set?: boolean
  }

  export type UserUpdateOneRequiredWithoutActivitiesNestedInput = {
    create?: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    connectOrCreate?: UserCreateOrConnectWithoutActivitiesInput
    upsert?: UserUpsertWithoutActivitiesInput
    connect?: UserWhereUniqueInput
    update?: XOR<XOR<UserUpdateToOneWithWhereWithoutActivitiesInput, UserUpdateWithoutActivitiesInput>, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedDateTimeNullableFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableFilter<$PrismaModel> | Date | string | null
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedDateTimeNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel> | null
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel> | null
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeNullableWithAggregatesFilter<$PrismaModel> | Date | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedDateTimeNullableFilter<$PrismaModel>
    _max?: NestedDateTimeNullableFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedBoolFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolFilter<$PrismaModel> | boolean
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedBoolWithAggregatesFilter<$PrismaModel = never> = {
    equals?: boolean | BooleanFieldRefInput<$PrismaModel>
    not?: NestedBoolWithAggregatesFilter<$PrismaModel> | boolean
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedBoolFilter<$PrismaModel>
    _max?: NestedBoolFilter<$PrismaModel>
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type ActivityCreateWithoutUserInput = {
    id?: string
    date: Date | string
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }

  export type ActivityUncheckedCreateWithoutUserInput = {
    id?: string
    date: Date | string
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }

  export type ActivityCreateOrConnectWithoutUserInput = {
    where: ActivityWhereUniqueInput
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityCreateManyUserInputEnvelope = {
    data: ActivityCreateManyUserInput | ActivityCreateManyUserInput[]
    skipDuplicates?: boolean
  }

  export type ActivityUpsertWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    update: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
    create: XOR<ActivityCreateWithoutUserInput, ActivityUncheckedCreateWithoutUserInput>
  }

  export type ActivityUpdateWithWhereUniqueWithoutUserInput = {
    where: ActivityWhereUniqueInput
    data: XOR<ActivityUpdateWithoutUserInput, ActivityUncheckedUpdateWithoutUserInput>
  }

  export type ActivityUpdateManyWithWhereWithoutUserInput = {
    where: ActivityScalarWhereInput
    data: XOR<ActivityUpdateManyMutationInput, ActivityUncheckedUpdateManyWithoutUserInput>
  }

  export type ActivityScalarWhereInput = {
    AND?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    OR?: ActivityScalarWhereInput[]
    NOT?: ActivityScalarWhereInput | ActivityScalarWhereInput[]
    id?: StringFilter<"Activity"> | string
    userId?: StringFilter<"Activity"> | string
    date?: DateTimeFilter<"Activity"> | Date | string
    checkin?: BoolFilter<"Activity"> | boolean
    mood?: BoolFilter<"Activity"> | boolean
    reminder?: BoolFilter<"Activity"> | boolean
    journal?: BoolFilter<"Activity"> | boolean
  }

  export type UserCreateWithoutActivitiesInput = {
    id?: string
    email: string
    firstName?: string | null
    lastLogin?: Date | string | null
    lastActive?: Date | string | null
  }

  export type UserUncheckedCreateWithoutActivitiesInput = {
    id?: string
    email: string
    firstName?: string | null
    lastLogin?: Date | string | null
    lastActive?: Date | string | null
  }

  export type UserCreateOrConnectWithoutActivitiesInput = {
    where: UserWhereUniqueInput
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
  }

  export type UserUpsertWithoutActivitiesInput = {
    update: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
    create: XOR<UserCreateWithoutActivitiesInput, UserUncheckedCreateWithoutActivitiesInput>
    where?: UserWhereInput
  }

  export type UserUpdateToOneWithWhereWithoutActivitiesInput = {
    where?: UserWhereInput
    data: XOR<UserUpdateWithoutActivitiesInput, UserUncheckedUpdateWithoutActivitiesInput>
  }

  export type UserUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type UserUncheckedUpdateWithoutActivitiesInput = {
    id?: StringFieldUpdateOperationsInput | string
    email?: StringFieldUpdateOperationsInput | string
    firstName?: NullableStringFieldUpdateOperationsInput | string | null
    lastLogin?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
    lastActive?: NullableDateTimeFieldUpdateOperationsInput | Date | string | null
  }

  export type ActivityCreateManyUserInput = {
    id?: string
    date: Date | string
    checkin?: boolean
    mood?: boolean
    reminder?: boolean
    journal?: boolean
  }

  export type ActivityUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkin?: BoolFieldUpdateOperationsInput | boolean
    mood?: BoolFieldUpdateOperationsInput | boolean
    reminder?: BoolFieldUpdateOperationsInput | boolean
    journal?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityUncheckedUpdateWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkin?: BoolFieldUpdateOperationsInput | boolean
    mood?: BoolFieldUpdateOperationsInput | boolean
    reminder?: BoolFieldUpdateOperationsInput | boolean
    journal?: BoolFieldUpdateOperationsInput | boolean
  }

  export type ActivityUncheckedUpdateManyWithoutUserInput = {
    id?: StringFieldUpdateOperationsInput | string
    date?: DateTimeFieldUpdateOperationsInput | Date | string
    checkin?: BoolFieldUpdateOperationsInput | boolean
    mood?: BoolFieldUpdateOperationsInput | boolean
    reminder?: BoolFieldUpdateOperationsInput | boolean
    journal?: BoolFieldUpdateOperationsInput | boolean
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}
import { GraphQLResolveInfo } from "graphql";
export type Maybe<T> = T | null;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type Customer = {
  __typename?: "Customer";
  id: Maybe<Scalars["ID"]>;
  name: Maybe<Scalars["String"]>;
};

export enum LuckLevel {
  High = "HIGH",
  Low = "LOW",
  Medium = "MEDIUM",
  Reallylow = "REALLYLOW"
}

export type PageInfo = {
  __typename?: "PageInfo";
  hasNextPage: Scalars["Boolean"];
  hasPreviousPage: Scalars["Boolean"];
  startCursor: Maybe<Scalars["String"]>;
  endCursor: Maybe<Scalars["String"]>;
};

export type Person = {
  __typename?: "Person";
  id: Maybe<Scalars["ID"]>;
  age: Maybe<Scalars["Float"]>;
  luckLevel: Maybe<LuckLevel>;
  name: Maybe<Scalars["String"]>;
  pageInfo: Maybe<PageInfo>;
};

export type Query = {
  __typename?: "Query";
  whoami: Maybe<Customer>;
  persons: Maybe<Array<Maybe<Person>>>;
  something: Scalars["Int"];
};

export type QueryWhoamiArgs = {
  id: Scalars["ID"];
};

export type QueryPersonsArgs = {
  id: Scalars["ID"];
};

export type QuerySomethingArgs = {
  arg: Scalars["String"];
};

export type ResolverTypeWrapper<T> = Promise<T> | T;

export type ResolverFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => Promise<TResult> | TResult;

export type StitchingResolver<TResult, TParent, TContext, TArgs> = {
  fragment: string;
  resolve: ResolverFn<TResult, TParent, TContext, TArgs>;
};

export type Resolver<TResult, TParent = {}, TContext = {}, TArgs = {}> =
  | ResolverFn<TResult, TParent, TContext, TArgs>
  | StitchingResolver<TResult, TParent, TContext, TArgs>;

export type SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => AsyncIterator<TResult> | Promise<AsyncIterator<TResult>>;

export type SubscriptionResolveFn<TResult, TParent, TContext, TArgs> = (
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

export interface SubscriptionResolverObject<TResult, TParent, TContext, TArgs> {
  subscribe: SubscriptionSubscribeFn<TResult, TParent, TContext, TArgs>;
  resolve?: SubscriptionResolveFn<TResult, TParent, TContext, TArgs>;
}

export type SubscriptionResolver<
  TResult,
  TParent = {},
  TContext = {},
  TArgs = {}
> =
  | ((
      ...args: any[]
    ) => SubscriptionResolverObject<TResult, TParent, TContext, TArgs>)
  | SubscriptionResolverObject<TResult, TParent, TContext, TArgs>;

export type TypeResolveFn<TTypes, TParent = {}, TContext = {}> = (
  parent: TParent,
  context: TContext,
  info: GraphQLResolveInfo
) => Maybe<TTypes>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<
  TResult = {},
  TParent = {},
  TContext = {},
  TArgs = {}
> = (
  next: NextResolverFn<TResult>,
  parent: TParent,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo
) => TResult | Promise<TResult>;

/** Mapping between all available schema types and the resolvers types */
export type ResolversTypes = {
  Query: ResolverTypeWrapper<{}>;
  ID: ResolverTypeWrapper<Scalars["ID"]>;
  Customer: ResolverTypeWrapper<Customer>;
  String: ResolverTypeWrapper<Scalars["String"]>;
  Person: ResolverTypeWrapper<Person>;
  Float: ResolverTypeWrapper<Scalars["Float"]>;
  LuckLevel: LuckLevel;
  PageInfo: ResolverTypeWrapper<PageInfo>;
  Boolean: ResolverTypeWrapper<Scalars["Boolean"]>;
  Int: ResolverTypeWrapper<Scalars["Int"]>;
};

/** Mapping between all available schema types and the resolvers parents */
export type ResolversParentTypes = {
  Query: {};
  ID: Scalars["ID"];
  Customer: Customer;
  String: Scalars["String"];
  Person: Person;
  Float: Scalars["Float"];
  LuckLevel: LuckLevel;
  PageInfo: PageInfo;
  Boolean: Scalars["Boolean"];
  Int: Scalars["Int"];
};

export type CustomerResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Customer"] = ResolversParentTypes["Customer"]
> = {
  id: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
};

export type PageInfoResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["PageInfo"] = ResolversParentTypes["PageInfo"]
> = {
  hasNextPage: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  hasPreviousPage: Resolver<ResolversTypes["Boolean"], ParentType, ContextType>;
  startCursor: Resolver<
    Maybe<ResolversTypes["String"]>,
    ParentType,
    ContextType
  >;
  endCursor: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
};

export type PersonResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Person"] = ResolversParentTypes["Person"]
> = {
  id: Resolver<Maybe<ResolversTypes["ID"]>, ParentType, ContextType>;
  age: Resolver<Maybe<ResolversTypes["Float"]>, ParentType, ContextType>;
  luckLevel: Resolver<
    Maybe<ResolversTypes["LuckLevel"]>,
    ParentType,
    ContextType
  >;
  name: Resolver<Maybe<ResolversTypes["String"]>, ParentType, ContextType>;
  pageInfo: Resolver<
    Maybe<ResolversTypes["PageInfo"]>,
    ParentType,
    ContextType
  >;
};

export type QueryResolvers<
  ContextType = any,
  ParentType extends ResolversParentTypes["Query"] = ResolversParentTypes["Query"]
> = {
  whoami: Resolver<
    Maybe<ResolversTypes["Customer"]>,
    ParentType,
    ContextType,
    QueryWhoamiArgs
  >;
  persons: Resolver<
    Maybe<Array<Maybe<ResolversTypes["Person"]>>>,
    ParentType,
    ContextType,
    QueryPersonsArgs
  >;
  something: Resolver<
    ResolversTypes["Int"],
    ParentType,
    ContextType,
    QuerySomethingArgs
  >;
};

export type Resolvers<ContextType = any> = {
  Customer: CustomerResolvers<ContextType>;
  PageInfo: PageInfoResolvers<ContextType>;
  Person: PersonResolvers<ContextType>;
  Query: QueryResolvers<ContextType>;
};

/**
 * @deprecated
 * Use "Resolvers" root object instead. If you wish to get "IResolvers", add "typesPrefix: I" to your config.
 */
export type IResolvers<ContextType = any> = Resolvers<ContextType>;

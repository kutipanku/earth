import type { Prisma } from '../../lib/prisma-types';

//////////////////////////////////////////////////////////
// Request
//////////////////////////////////////////////////////////
export type InputAuthorCreate = Prisma.AuthorCreateArgs;
export type InputAuthorUpdate = Prisma.AuthorUpdateArgs;
export type InputAuthorDelete = Prisma.AuthorDeleteArgs;
export type InputAuthorGetMany = Prisma.AuthorFindManyArgs;
export type InputAuthorGetOne = Prisma.AuthorFindFirstArgs;

//////////////////////////////////////////////////////////
// Response
//////////////////////////////////////////////////////////
export type ResponseAuthor = Prisma.AuthorGetPayload<{}>;
export type ResponseAuthorExtended = Prisma.AuthorGetPayload<{
  include: {
    nationality: true;
    profession: true;
  };
}>;
export type ResponseAuthorSimplified = Prisma.AuthorGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

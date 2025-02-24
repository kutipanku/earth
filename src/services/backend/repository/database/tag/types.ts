import type { Prisma } from '../../lib/prisma/types';

//////////////////////////////////////////////////////////
// Request
//////////////////////////////////////////////////////////
export type InputTagCreate = Prisma.TagCreateArgs;
export type InputTagUpdate = Prisma.TagUpdateArgs;
export type InputTagDelete = Prisma.TagDeleteArgs;
export type InputTagGetMany = Prisma.TagFindManyArgs;
export type InputTagGetOne = Prisma.TagFindFirstArgs;

//////////////////////////////////////////////////////////
// Response
//////////////////////////////////////////////////////////
export type ResponseTag = Prisma.TagGetPayload<{}>;
export type ResponseTagSimplified = Prisma.TagGetPayload<{
  select: {
    id: true;
    name_eng: true;
    name_ind: true;
  };
}>;

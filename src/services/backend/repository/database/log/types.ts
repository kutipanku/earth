import type { Prisma } from '../../lib/prisma/types';

//////////////////////////////////////////////////////////
// Request
//////////////////////////////////////////////////////////
export type InputLogCreate = Prisma.LogCreateArgs;
export type InputLogGetMany = Prisma.LogFindManyArgs;
export type InputLogGetOne = Prisma.LogFindFirstArgs;

//////////////////////////////////////////////////////////
// Response
//////////////////////////////////////////////////////////
export type ResponseLog = Prisma.LogGetPayload<{}>;
export type ResponseLogExtended = Prisma.LogGetPayload<{
  include: {
    user: true;
  };
}>;

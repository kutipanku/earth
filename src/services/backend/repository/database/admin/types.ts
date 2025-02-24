import type { Prisma } from '../../lib/prisma/types';

//////////////////////////////////////////////////////////
// Request
//////////////////////////////////////////////////////////
export type InputAdminGetMany = Prisma.AdminFindManyArgs;
export type InputAdminGetOne = Prisma.AdminFindFirstArgs;

//////////////////////////////////////////////////////////
// Response
//////////////////////////////////////////////////////////
export type ResponseAdmin = Prisma.AdminGetPayload<{}>;

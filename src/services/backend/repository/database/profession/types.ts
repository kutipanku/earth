import type { Prisma } from '../../lib/prisma/types';

//////////////////////////////////////////////////////////
// Request
//////////////////////////////////////////////////////////
export type InputProfessionCreate = Prisma.ProfessionCreateArgs;
export type InputProfessionUpdate = Prisma.ProfessionUpdateArgs;
export type InputProfessionDelete = Prisma.ProfessionDeleteArgs;
export type InputProfessionGetMany = Prisma.ProfessionFindManyArgs;
export type InputProfessionGetOne = Prisma.ProfessionFindFirstArgs;

//////////////////////////////////////////////////////////
// Response
//////////////////////////////////////////////////////////
export type ResponseProfession = Prisma.ProfessionGetPayload<{}>;
export type ResponseProfessionSimplified = Prisma.ProfessionGetPayload<{
  select: {
    id: true;
    name_eng: true;
    name_ind: true;
  };
}>;

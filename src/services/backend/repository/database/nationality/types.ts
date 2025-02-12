import type { Prisma } from '../../lib/prisma/types';

//////////////////////////////////////////////////////////
// Request
//////////////////////////////////////////////////////////
export type InputNationalityCreate = Prisma.NationalityCreateArgs;
export type InputNationalityUpdate = Prisma.NationalityUpdateArgs;
export type InputNationalityDelete = Prisma.NationalityDeleteArgs;
export type InputNationalityGetMany = Prisma.NationalityFindManyArgs;
export type InputNationalityGetOne = Prisma.NationalityFindFirstArgs;

//////////////////////////////////////////////////////////
// Response
//////////////////////////////////////////////////////////
export type ResponseNationality = Prisma.NationalityGetPayload<{}>;
export type ResponseNationalitySimplified = Prisma.NationalityGetPayload<{
  select: {
    id: true;
    name_en: true;
    name_id: true;
  };
}>;

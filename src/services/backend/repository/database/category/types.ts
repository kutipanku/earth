import type { Prisma } from '../../lib/prisma/types';

//////////////////////////////////////////////////////////
// Request
//////////////////////////////////////////////////////////
export type InputCategoryCreate = Prisma.CategoryCreateArgs;
export type InputCategoryUpdate = Prisma.CategoryUpdateArgs;
export type InputCategoryDelete = Prisma.CategoryDeleteArgs;
export type InputCategoryGetMany = Prisma.CategoryFindManyArgs;
export type InputCategoryGetOne = Prisma.CategoryFindFirstArgs;

//////////////////////////////////////////////////////////
// Response
//////////////////////////////////////////////////////////
export type ResponseCategory = Prisma.CategoryGetPayload<{}>;
export type ResponseCategorySimplified = Prisma.CategoryGetPayload<{
  select: {
    id: true;
    name_eng: true;
    name_ind: true;
  };
}>;

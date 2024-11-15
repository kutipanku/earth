import type { Prisma } from '@/backend/repository/lib/prisma-types';

export type AuthorForMany = Prisma.AuthorGetPayload<{
  include: {
    nationality: {
      select: {
        name_en: true;
      };
    };
    profession: {
      select: {
        name_en: true;
      };
    };
  };
}>;

export type AuthorForOne = Prisma.AuthorGetPayload<{
  include: {
    nationality: true;
    profession: true;
  };
}>;

export type AuthorForManyOptions = Prisma.AuthorGetPayload<{}>;
export type AuthorForOtherEntity = Prisma.AuthorGetPayload<{}>;
export type AuthorForOtherEntityList = Prisma.AuthorGetPayload<{
  select: {
    id: true;
    name: true;
  };
}>;

export interface FindOptionsProps {
  name: string | null;
}

export interface CreateOneProps {
  payload: {
    name?: string;
    slug?: string;
    dob?: string;
    description_en?: string;
    description_id?: string;
    picture_url?: string;
    nationality_id?: string;
    profession_id?: string;
  };
}

export interface DeleteOneProps {
  id: string;
}

export interface UpdateOneProps {
  id: string;
  payload: {
    name?: string;
    slug?: string;
    dob?: string;
    description_en?: string;
    description_id?: string;
    picture_url?: string;
    nationality_id?: string;
    profession_id?: string;
  };
}

export interface FindOneProps {
  id: string;
}

export interface FindManyProps {
  page: string | null;
  limit: string | null;
  filterName?: string | null;
  filterSlug?: string | null;
}

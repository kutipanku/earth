import type { Prisma } from '@/backend/repository/lib/prisma-types';

export type TagForMany = Prisma.TagGetPayload<{}>;

export type TagForOne = Prisma.TagGetPayload<{}>;
export type TagForOtherEntity = Prisma.TagGetPayload<{}>;
export type TagForOtherEntityList = Prisma.TagGetPayload<{
  select: {
    id: true;
    name_en: true;
    name_id: true;
  };
}>;

export interface CreateOneProps {
  payload: {
    name_en?: string;
    name_id?: string;
    description_en?: string;
    description_id?: string;
    slug?: string;
  };
}

export interface DeleteOneProps {
  id: string;
}

export interface FindManyProps {
  page: string | null;
  limit: string | null;
  filterName?: string | null;
  filterSlug?: string | null;
}

export interface FindOneProps {
  id: string;
}

export interface FindOptionsProps {
  name: string | null;
}

export interface UpdateOneProps {
  id: string;
  payload: {
    name_en?: string;
    name_id?: string;
    slug?: string;
    description_en?: string;
    description_id?: string;
  };
}

import type { Prisma } from '@/backend/repository/lib/prisma-types';

export type ProfessionForMany = Prisma.ProfessionGetPayload<{}>;

export type ProfessionForOne = Prisma.ProfessionGetPayload<{}>;

export interface CreateOneProps {
  payload: {
    name_en?: string;
    name_id?: string;
    icon?: string;
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
    icon?: string;
    slug?: string;
  };
}

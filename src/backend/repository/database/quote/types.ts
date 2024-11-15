import type { Prisma } from '@/backend/repository/lib/prisma-types';

export type QuoteForMany = Prisma.QuoteGetPayload<{
  include: {
    author: {
      select: {
        id: true;
        name: true;
      };
    };
    category: {
      select: {
        id: true;
        name_id: true;
        name_en: true;
      };
    };
    tags: {
      select: {
        id: true;
        name_id: true;
        name_en: true;
      };
    };
  };
}>;

export type QuoteForOne = Prisma.QuoteGetPayload<{
  include: {
    author: true;
    category: true;
    tags: true;
  };
}>;

export interface FindOptionsProps {
  content_id: string | null;
  content_en: string | null;
}

export interface CreateOneProps {
  payload: {
    slug?: string;
    content_id?: string;
    content_en?: string;
    description_en?: string;
    description_id?: string;
    image_id_url?: string;
    image_en_url?: string;
    author_id?: string;
    category_id?: string;
    tag_ids?: string;
  };
}

export interface DeleteOneProps {
  id: string;
}

export interface UpdateOneProps {
  id: string;
  payload: {
    slug?: string;
    content_id?: string;
    content_en?: string;
    description_en?: string;
    description_id?: string;
    image_id_url?: string;
    image_en_url?: string;
    author_id?: string;
    category_id?: string;
    tag_ids?: string;
  };
}

export interface FindOneProps {
  id: string;
}

export interface FindManyProps {
  page: string | null;
  limit: string | null;
  filter_content_id?: string | null;
  filter_content_en?: string | null;
  filter_category_id?: string | null;
  filter_category_en?: string | null;
  filter_tag_id?: string | null;
  filter_tag_en?: string | null;
  filter_author?: string | null;
}

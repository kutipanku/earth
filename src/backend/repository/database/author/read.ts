import prisma from '@/backend/repository/lib/prisma';
import type { Author, AuthorListItem } from '@/backend/entity/author/type';
import type { AuthorForOne, AuthorForMany } from './types';
import { normalizerForOne, normalizerFoList } from './normalizer';

export interface FindManyProps {
  page: string | null;
  limit: string | null;
  filterName?: string | null;
  filterSlug?: string | null;
}

interface ResultMany {
  status: number;
  data: {
    list: AuthorListItem[];
    total: number;
  };
  error: string | null;
  errorFields?: string[];
}

interface ResultOne {
  status: number;
  data: Author | null;
  error: string | null;
  errorFields?: string[];
}

export const findMany = async (props: FindManyProps): Promise<ResultMany> => {
  const { page, limit, filterName = '', filterSlug = '' } = props;

  const authors: AuthorForMany[] = await prisma.author.findMany({
    skip: Number(page) * Number(limit),
    take: Number(limit),
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(filterName && {
        name: { contains: filterName, mode: 'insensitive' },
      }),
      ...(filterSlug && {
        slug: { contains: filterSlug, mode: 'insensitive' },
      }),
    },
    include: {
      nationality: {
        select: {
          id: true,
          name_en: true,
        },
      },
      profession: {
        select: {
          id: true,
          name_en: true,
        },
      },
    },
  });

  const count = await prisma.author.count({
    where: {
      ...(filterName && {
        name: { contains: filterName, mode: 'insensitive' },
      }),
      ...(filterSlug && {
        slug: { contains: filterSlug, mode: 'insensitive' },
      }),
    },
  });

  return {
    data: { list: normalizerFoList(authors), total: count },
    error: null,
    status: 200,
  };
};

export interface FindOneProps {
  id: string;
}

export const finOne = async (props: FindOneProps): Promise<ResultOne> => {
  const { id } = props;

  const author: AuthorForOne | null = await prisma.author.findFirst({
    where: { id },
    include: {
      nationality: true,
      profession: true,
    },
  });

  if (author === null) {
    return { data: null, error: 'Not found', status: 404 };
  }
  return { data: normalizerForOne(author), error: null, status: 200 };
};

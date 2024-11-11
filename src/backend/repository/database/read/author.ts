import prisma from '@/backend/repository/lib/prisma';
import type { Author } from '@/backend/repository/lib/prisma-types';

export interface FindManyProps {
  page: string | null;
  limit: string | null;
  filterName?: string | null;
  filterSlug?: string | null;
}

export const findMany = async (props: FindManyProps) => {
  const { page, limit, filterName = '', filterSlug = '' } = props;

  const authors: Author[] = await prisma.author.findMany({
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

  return { data: { list: authors, total: count }, error: null, status: 200 };
};

export interface FindOneProps {
  id: string;
}

export const finOne = async (props: FindOneProps) => {
  const { id } = props;

  const author: Author | null = await prisma.author.findFirst({
    where: { id },
    include: {
      nationality: true,
      profession: true,
    },
  });

  if (author === null) {
    return { data: null, error: 'Not found', status: 404 };
  }
  return { data: author, error: null, status: 200 };
};

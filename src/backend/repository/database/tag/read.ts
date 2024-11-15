import prisma from '@/backend/repository/lib/prisma';
import type {
  Tag,
  TagListItem,
  TagOptionItem,
} from '@/backend/entity/tag/type';
import type {
  TagForOne,
  TagForMany,
  FindManyProps,
  FindOneProps,
  FindOptionsProps,
} from './types';
import {
  normalizeForOne,
  normalizeFoList,
  normalizeForOption,
} from './normalizer';

interface ResultMany {
  status: number;
  data: {
    list: TagListItem[];
    total: number;
  };
  error: string | null;
  errorFields?: string[];
}

interface ResultOne {
  status: number;
  data: Tag | null;
  error: string | null;
  errorFields?: string[];
}

interface ResultOptions {
  status: number;
  data: TagOptionItem[];
  error: string | null;
  errorFields?: string[];
}

export const findMany = async (props: FindManyProps): Promise<ResultMany> => {
  const { page, limit, filterName = '', filterSlug = '' } = props;

  const categories: TagForMany[] = await prisma.tag.findMany({
    skip: Number(page) * Number(limit),
    take: Number(limit),
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(filterName && {
        OR: [
          { name_en: { contains: filterName, mode: 'insensitive' } },
          { name_id: { contains: filterName, mode: 'insensitive' } },
        ],
      }),
      ...(filterSlug && {
        slug: { contains: filterSlug, mode: 'insensitive' },
      }),
    },
  });

  const count = await prisma.tag.count({
    where: {
      ...(filterName && {
        OR: [
          { name_en: { contains: filterName, mode: 'insensitive' } },
          { name_id: { contains: filterName, mode: 'insensitive' } },
        ],
      }),
      ...(filterSlug && {
        slug: { contains: filterSlug, mode: 'insensitive' },
      }),
    },
  });

  return {
    data: { list: normalizeFoList(categories), total: count },
    error: null,
    status: 200,
  };
};

export const finOne = async (props: FindOneProps): Promise<ResultOne> => {
  const { id } = props;

  const tag: TagForOne | null = await prisma.tag.findFirst({
    where: { id },
  });

  if (tag === null) {
    return { data: null, error: 'Not found', status: 404 };
  }
  return { data: normalizeForOne(tag), error: null, status: 200 };
};

export const findOptions = async (
  props: FindOptionsProps
): Promise<ResultOptions> => {
  const { name } = props;

  const categories = await prisma.tag.findMany({
    orderBy: [{ name_en: 'asc' }, { name_id: 'asc' }],
    skip: 0,
    take: 100,
    where: {
      ...(name && {
        OR: [
          { name_en: { contains: name, mode: 'insensitive' } },
          { name_id: { contains: name, mode: 'insensitive' } },
        ],
      }),
    },
  });

  return { data: normalizeForOption(categories), error: null, status: 200 };
};

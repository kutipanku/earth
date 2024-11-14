import prisma from '@/backend/repository/lib/prisma';
import type {
  Profession,
  ProfessionListItem,
  ProfessionOptionItem,
} from '@/backend/entity/profession/type';
import type {
  ProfessionForOne,
  ProfessionForMany,
  FindManyProps,
  FindOneProps,
  FindOptionsProps,
} from './types';
import {
  normalizerForOne,
  normalizerFoList,
  normalizerForOption,
} from './normalizer';

interface ResultMany {
  status: number;
  data: {
    list: ProfessionListItem[];
    total: number;
  };
  error: string | null;
  errorFields?: string[];
}

interface ResultOne {
  status: number;
  data: Profession | null;
  error: string | null;
  errorFields?: string[];
}

interface ResultOptions {
  status: number;
  data: ProfessionOptionItem[];
  error: string | null;
  errorFields?: string[];
}

export const findMany = async (props: FindManyProps): Promise<ResultMany> => {
  const { page, limit, filterName = '', filterSlug = '' } = props;

  const professions: ProfessionForMany[] = await prisma.profession.findMany({
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

  const count = await prisma.nationality.count({
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
    data: { list: normalizerFoList(professions), total: count },
    error: null,
    status: 200,
  };
};

export const finOne = async (props: FindOneProps): Promise<ResultOne> => {
  const { id } = props;

  const profession: ProfessionForOne | null = await prisma.profession.findFirst(
    {
      where: { id },
    }
  );

  if (profession === null) {
    return { data: null, error: 'Not found', status: 404 };
  }
  return { data: normalizerForOne(profession), error: null, status: 200 };
};

export const findOptions = async (
  props: FindOptionsProps
): Promise<ResultOptions> => {
  const { name } = props;

  const professions = await prisma.profession.findMany({
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

  return { data: normalizerForOption(professions), error: null, status: 200 };
};

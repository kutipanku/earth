import prisma from '@/backend/repository/lib/prisma';
import type {
  Nationality,
  NationalityListItem,
  NationalityOptionItem,
} from '@/backend/entity/nationality/type';
import type {
  NationalityForOne,
  NationalityForMany,
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
    list: NationalityListItem[];
    total: number;
  };
  error: string | null;
  errorFields?: string[];
}

interface ResultOne {
  status: number;
  data: Nationality | null;
  error: string | null;
  errorFields?: string[];
}

interface ResultOptions {
  status: number;
  data: NationalityOptionItem[];
  error: string | null;
  errorFields?: string[];
}

export const findMany = async (props: FindManyProps): Promise<ResultMany> => {
  const { page, limit, filterName = '', filterSlug = '' } = props;

  const nationalities: NationalityForMany[] = await prisma.nationality.findMany(
    {
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
    }
  );

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
    data: { list: normalizeFoList(nationalities), total: count },
    error: null,
    status: 200,
  };
};

export const finOne = async (props: FindOneProps): Promise<ResultOne> => {
  const { id } = props;

  const nationality: NationalityForOne | null =
    await prisma.nationality.findFirst({
      where: { id },
    });

  if (nationality === null) {
    return { data: null, error: 'Not found', status: 404 };
  }
  return { data: normalizeForOne(nationality), error: null, status: 200 };
};

export const findOptions = async (
  props: FindOptionsProps
): Promise<ResultOptions> => {
  const { name } = props;

  const nationalities = await prisma.nationality.findMany({
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

  return { data: normalizeForOption(nationalities), error: null, status: 200 };
};

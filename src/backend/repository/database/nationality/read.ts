import prisma from '@/backend/repository/lib/prisma';
import type {
  Nationality,
  NationalityListItem,
} from '@/backend/entity/nationality/type';
import type { NationalityForOne, NationalityForMany } from './types';
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
    data: { list: normalizerFoList(nationalities), total: count },
    error: null,
    status: 200,
  };
};

export interface FindOneProps {
  id: string;
}

export const finOne = async (props: FindOneProps): Promise<ResultOne> => {
  const { id } = props;

  const nationality: NationalityForOne | null =
    await prisma.nationality.findFirst({
      where: { id },
    });

  if (nationality === null) {
    return { data: null, error: 'Not found', status: 404 };
  }
  return { data: normalizerForOne(nationality), error: null, status: 200 };
};

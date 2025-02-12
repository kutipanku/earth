import prisma from '../../lib/prisma/prisma';
import {
  normalizeForOne,
  normalizeFoList,
  normalizeForOption,
} from './normalizer';

import type {
  Nationality,
  NationalitySimplified,
  Filter,
  Find,
} from '@backend/entity/nationality/type';
import type { ResultOne, ResultMany, ResultOptions } from '../types';
import type {
  InputNationalityGetOne,
  InputNationalityGetMany,
  ResponseNationality,
} from './types';

type NationalityResultOne = ResultOne<Nationality>;
type NationalityResultMany = ResultMany<Nationality>;
type NationalityResultManyOptions = ResultOptions<NationalitySimplified>;

export const findMany = async (
  props: Filter
): Promise<NationalityResultMany> => {
  const payload: InputNationalityGetMany = {
    skip: props.page * props.limit,
    take: props.limit,
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(props.name && {
        OR: [
          { name_en: { contains: props.name, mode: 'insensitive' } },
          { name_id: { contains: props.name, mode: 'insensitive' } },
        ],
      }),
      ...(props.slug && {
        slug: { contains: props.slug, mode: 'insensitive' },
      }),
    },
  };

  try {
    const nationalities: ResponseNationality[] =
      await prisma.nationality.findMany(payload);

    const count = await prisma.nationality.count({
      where: {
        ...(props.name && {
          OR: [
            { name_en: { contains: props.name, mode: 'insensitive' } },
            { name_id: { contains: props.name, mode: 'insensitive' } },
          ],
        }),
        ...(props.slug && {
          slug: { contains: props.slug, mode: 'insensitive' },
        }),
      },
    });

    return {
      success: true,
      status: 200,
      data: { list: normalizeFoList(nationalities), total: count },
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: { list: [], total: 0 },
      error: JSON.stringify(error),
    };
  }
};

export const finOne = async (props: Find): Promise<NationalityResultOne> => {
  const payload: InputNationalityGetOne = {
    where: {
      id: props.id ?? '',
    },
  };

  try {
    const nationality: ResponseNationality | null =
      await prisma.nationality.findFirst(payload);

    if (nationality === null) {
      return { success: false, status: 404, data: null, error: 'Not found' };
    }
    return {
      success: true,
      status: 200,
      data: normalizeForOne(nationality),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: null,
      error: JSON.stringify(error),
    };
  }
};

export const findOptions = async (
  props: Filter
): Promise<NationalityResultManyOptions> => {
  const payload: InputNationalityGetMany = {
    orderBy: [{ name_en: 'asc' }, { name_id: 'asc' }],
    skip: props.page * props.limit,
    take: props.limit,
    where: {
      ...(props.name && {
        OR: [
          { name_en: { contains: props.name, mode: 'insensitive' } },
          { name_id: { contains: props.name, mode: 'insensitive' } },
        ],
      }),
    },
  };

  try {
    const nationalities = await prisma.nationality.findMany(payload);

    return {
      success: true,
      status: 200,
      data: normalizeForOption(nationalities),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: null,
      error: JSON.stringify(error),
    };
  }
};

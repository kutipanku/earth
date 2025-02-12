import prisma from '../../lib/prisma/prisma';
import {
  normalizeForOne,
  normalizeFoList,
  normalizeForOption,
} from './normalizer';

import type {
  Profession,
  ProfessionSimplified,
  Filter,
  Find,
} from '@backend/entity/profession/type';
import type { ResultOne, ResultMany, ResultOptions } from '../types';
import type {
  InputProfessionGetOne,
  InputProfessionGetMany,
  ResponseProfession,
} from './types';

type ProfessionResultOne = ResultOne<Profession>;
type ProfessionResultMany = ResultMany<Profession>;
type ProfessionResultManyOptions = ResultOptions<ProfessionSimplified>;

export const findMany = async (
  props: Filter
): Promise<ProfessionResultMany> => {
  const payload: InputProfessionGetMany = {
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
    const professions: ResponseProfession[] =
      await prisma.profession.findMany(payload);

    const count = await prisma.profession.count({
      where: payload.where,
    });

    return {
      success: true,
      status: 200,
      data: { list: normalizeFoList(professions), total: count },
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

export const finOne = async (props: Find): Promise<ProfessionResultOne> => {
  const payload: InputProfessionGetOne = {
    where: {
      id: props.id || '',
    },
  };

  try {
    const profession: ResponseProfession | null =
      await prisma.profession.findFirst(payload);

    if (profession === null) {
      return { success: false, data: null, error: 'Not found', status: 404 };
    }
    return {
      success: true,
      status: 200,
      data: normalizeForOne(profession),
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
): Promise<ProfessionResultManyOptions> => {
  const payload: InputProfessionGetMany = {
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
    const professions = await prisma.profession.findMany(payload);

    return {
      success: true,
      status: 200,
      data: normalizeForOption(professions),
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

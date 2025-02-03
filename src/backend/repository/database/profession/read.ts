import prisma from '../../lib/prisma';
import {
  normalizeForOne,
  normalizeFoList,
  normalizeForOption,
} from './normalizer';

import type {
  Profession,
  ProfessionSimplified,
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
  props: InputProfessionGetMany
): Promise<ProfessionResultMany> => {
  try {
    const professions: ResponseProfession[] =
      await prisma.profession.findMany(props);

    const count = await prisma.profession.count({
      where: props.where,
    });

    return {
      data: { list: normalizeFoList(professions), total: count },
      error: null,
      status: 200,
    };
  } catch (error) {
    return {
      data: { list: [], total: 0 },
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

export const finOne = async (
  props: InputProfessionGetOne
): Promise<ProfessionResultOne> => {
  try {
    const profession: ResponseProfession | null =
      await prisma.profession.findFirst(props);

    if (profession === null) {
      return { data: null, error: 'Not found', status: 404 };
    }
    return { data: normalizeForOne(profession), error: null, status: 200 };
  } catch (error) {
    return {
      data: null,
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

export const findOptions = async (
  props: InputProfessionGetMany
): Promise<ProfessionResultManyOptions> => {
  try {
    const professions = await prisma.profession.findMany({
      orderBy: [{ name_en: 'asc' }, { name_id: 'asc' }],
      skip: 0,
      take: 100,
      ...props,
    });

    return { data: normalizeForOption(professions), error: null, status: 200 };
  } catch (error) {
    return {
      data: null,
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

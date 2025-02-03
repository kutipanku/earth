import prisma from '../../lib/prisma';
import {
  normalizeForOne,
  normalizeFoList,
  normalizeForOption,
} from './normalizer';

import type {
  Nationality,
  NationalitySimplified,
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
  props: InputNationalityGetMany
): Promise<NationalityResultMany> => {
  try {
    const nationalities: ResponseNationality[] =
      await prisma.nationality.findMany(props);

    const count = await prisma.nationality.count({
      where: props.where,
    });

    return {
      data: { list: normalizeFoList(nationalities), total: count },
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
  props: InputNationalityGetOne
): Promise<NationalityResultOne> => {
  try {
    const nationality: ResponseNationality | null =
      await prisma.nationality.findFirst(props);

    if (nationality === null) {
      return { data: null, error: 'Not found', status: 404 };
    }
    return { data: normalizeForOne(nationality), error: null, status: 200 };
  } catch (error) {
    return {
      data: null,
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

export const findOptions = async (
  props: InputNationalityGetMany
): Promise<NationalityResultManyOptions> => {
  try {
    const nationalities = await prisma.nationality.findMany({
      orderBy: [{ name_en: 'asc' }, { name_id: 'asc' }],
      skip: 0,
      take: 100,
      ...props,
    });

    return {
      data: normalizeForOption(nationalities),
      error: null,
      status: 200,
    };
  } catch (error) {
    return {
      data: null,
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

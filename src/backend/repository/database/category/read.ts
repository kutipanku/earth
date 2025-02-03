import prisma from '../../lib/prisma';
import {
  normalizeForOne,
  normalizeFoList,
  normalizeForOption,
} from './normalizer';

import type {
  Category,
  CategorySimplified,
} from '@backend/entity/category/type';
import type { ResultOne, ResultMany, ResultOptions } from '../types';
import type {
  InputCategoryGetOne,
  InputCategoryGetMany,
  ResponseCategory,
} from './types';

type CategoryResultOne = ResultOne<Category>;
type CategoryResultMany = ResultMany<Category>;
type CategoryResultManyOptions = ResultOptions<CategorySimplified>;

export const findMany = async (
  props: InputCategoryGetMany
): Promise<CategoryResultMany> => {
  try {
    const categories: ResponseCategory[] =
      await prisma.category.findMany(props);

    const count = await prisma.category.count({
      where: props.where,
    });

    return {
      data: { list: normalizeFoList(categories), total: count },
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
  props: InputCategoryGetOne
): Promise<CategoryResultOne> => {
  try {
    const category: ResponseCategory | null =
      await prisma.category.findFirst(props);

    if (category === null) {
      return { data: null, error: 'Not found', status: 404 };
    }
    return { data: normalizeForOne(category), error: null, status: 200 };
  } catch (error) {
    return {
      data: null,
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

export const findOptions = async (
  props: InputCategoryGetMany
): Promise<CategoryResultManyOptions> => {
  try {
    const categories = await prisma.category.findMany({
      orderBy: [{ name_en: 'asc' }, { name_id: 'asc' }],
      skip: 0,
      take: 100,
      ...props,
    });
    return { data: normalizeForOption(categories), error: null, status: 200 };
  } catch (error) {
    return {
      data: null,
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

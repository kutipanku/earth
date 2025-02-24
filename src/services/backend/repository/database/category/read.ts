import prisma from '../../lib/prisma/prisma';
import {
  normalizeForOne,
  normalizeFoList,
  normalizeForOption,
} from './normalizer';

import type {
  Category,
  CategorySimplified,
  Filter,
  Find,
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

export const findMany = async (props: Filter): Promise<CategoryResultMany> => {
  const payload: InputCategoryGetMany = {
    skip: props.page * props.limit,
    take: props.limit,
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(props.name && {
        OR: [
          { name_eng: { contains: props.name, mode: 'insensitive' } },
          { name_ind: { contains: props.name, mode: 'insensitive' } },
        ],
      }),
      ...(props.slug && {
        slug: { contains: props.slug, mode: 'insensitive' },
      }),
    },
  };

  try {
    const categories: ResponseCategory[] =
      await prisma.category.findMany(payload);

    const count = await prisma.category.count({
      where: payload.where,
    });

    return {
      success: true,
      status: 200,
      data: { list: normalizeFoList(categories), total: count },
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      data: { list: [], total: 0 },
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

export const finOne = async (props: Find): Promise<CategoryResultOne> => {
  const payload: InputCategoryGetOne = {
    where: {
      id: props.id || '',
    },
  };

  try {
    const category: ResponseCategory | null =
      await prisma.category.findFirst(payload);

    if (category === null) {
      return { success: false, status: 404, data: null, error: 'Not found' };
    }
    return {
      success: true,
      status: 200,
      data: normalizeForOne(category),
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
): Promise<CategoryResultManyOptions> => {
  const payload: InputCategoryGetMany = {
    orderBy: [{ name_eng: 'asc' }, { name_ind: 'asc' }],
    skip: props.page * props.limit,
    take: props.limit,
    where: {
      ...(props.name && {
        OR: [
          { name_eng: { contains: props.name, mode: 'insensitive' } },
          { name_ind: { contains: props.name, mode: 'insensitive' } },
        ],
      }),
    },
  };

  try {
    const categories = await prisma.category.findMany(payload);
    return {
      success: true,
      status: 200,
      data: normalizeForOption(categories),
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

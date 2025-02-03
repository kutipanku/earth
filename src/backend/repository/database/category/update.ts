import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Category } from '@/backend/entity/category/type';
import type { ResultOne } from '../types';
import type { InputCategoryUpdate, ResponseCategory } from './types';

type CategoryResultOne = ResultOne<Category>;

export const updateOne = async (
  props: InputCategoryUpdate
): Promise<CategoryResultOne> => {
  try {
    const updatedCategory: ResponseCategory =
      await prisma.category.update(props);

    return {
      status: 200,
      data: normalizeForOne(updatedCategory),
      error: null,
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      error: JSON.stringify(error),
    };
  }
};

import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Category } from '@/backend/entity/category/type';
import type { ResultOne } from '../types';
import type { InputCategoryDelete, ResponseCategory } from './types';

type CategoryResultOne = ResultOne<Category>;

export const deleteOne = async (
  props: InputCategoryDelete
): Promise<CategoryResultOne> => {
  try {
    const deletedCategory: ResponseCategory =
      await prisma.category.delete(props);
    return {
      status: 200,
      data: normalizeForOne(deletedCategory),
      error: null,
    };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

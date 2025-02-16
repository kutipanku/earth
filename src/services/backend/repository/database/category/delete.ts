import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Category, Find } from '@backend/entity/category/type';
import type { ResultOne } from '../types';
import type { InputCategoryDelete, ResponseCategory } from './types';

type CategoryResultOne = ResultOne<Category>;

export const deleteOne = async (props: Find): Promise<CategoryResultOne> => {
  const payload: InputCategoryDelete = {
    where: {
      id: props.id || '',
    },
  };

  try {
    const deletedCategory: ResponseCategory =
      await prisma.category.delete(payload);
    return {
      success: true,
      status: 200,
      data: normalizeForOne(deletedCategory),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 400,
      data: null,
      error: JSON.stringify(error),
    };
  }
};

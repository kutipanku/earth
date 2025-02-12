import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Category } from '@/backend/entity/category/type';
import type { ResultOne } from '../types';
import type { InputCategoryUpdate, ResponseCategory } from './types';

type CategoryResultOne = ResultOne<Category>;

export const updateOne = async (
  props: Category
): Promise<CategoryResultOne> => {
  const payload: InputCategoryUpdate = {
    where: {
      id: props.id,
    },
    data: {
      slug: props.slug,
      name_en: props.name.eng ?? '',
      name_id: props.name.ind ?? '',
      description_en: props.description.eng ?? '',
      description_id: props.description.ind ?? '',
    },
  };

  try {
    const updatedCategory: ResponseCategory =
      await prisma.category.update(payload);

    return {
      success: true,
      status: 200,
      data: normalizeForOne(updatedCategory),
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

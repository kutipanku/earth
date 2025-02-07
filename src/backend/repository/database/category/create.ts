import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Category } from '@backend/entity/category/type';
import type { ResultOne } from '../types';
import type { InputCategoryCreate, ResponseCategory } from './types';

type CategoryResultOne = ResultOne<Category>;

export const createOne = async (
  props: Category
): Promise<CategoryResultOne> => {
  const payload: InputCategoryCreate = {
    data: {
      slug: props.slug,
      name_en: props.name.eng ?? '',
      name_id: props.name.ind ?? '',
      description_en: props.description.eng ?? '',
      description_id: props.description.ind ?? '',
    },
  };

  try {
    const category: ResponseCategory = await prisma.category.create(payload);
    return {
      success: true,
      status: 201,
      data: normalizeForOne(category),
      error: null,
    };
  } catch (error) {
    return {
      success: true,
      status: 400,
      data: null,
      error: JSON.stringify(error),
    };
  }
};

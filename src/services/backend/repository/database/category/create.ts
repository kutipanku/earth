import prisma from '../../lib/prisma/prisma';
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
      name_eng: props.name.eng ?? '',
      name_ind: props.name.ind ?? '',
      description_eng: props.description.eng ?? '',
      description_ind: props.description.ind ?? '',
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

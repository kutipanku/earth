import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Category } from '@backend/entity/category/type';
import type { ResultOne } from '../types';
import type { InputCategoryCreate, ResponseCategory } from './types';

type CategoryResultOne = ResultOne<Category>;

export const createOne = async (
  props: InputCategoryCreate
): Promise<CategoryResultOne> => {
  try {
    const category: ResponseCategory = await prisma.category.create(props);
    return { status: 201, data: normalizeForOne(category), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

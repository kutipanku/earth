import prisma from '@/backend/repository/lib/prisma';
import type { Category } from '@/backend/entity/category/type';
import type { CategoryForOne, CreateOneProps } from './types';
import { normalizeForOne } from './normalizer';

interface Result {
  status: number;
  data: Category | null;
  error: string | null;
  errorFields?: string[];
}

export const createOne = async (props: CreateOneProps): Promise<Result> => {
  const { payload } = props;

  type BodyKey = keyof typeof payload;
  const requiredFields: BodyKey[] = ['name_en', 'name_id', 'slug'];

  const errorFields = requiredFields.filter((key) => !payload[key]);

  if (
    errorFields.length ||
    !payload.name_en ||
    !payload.name_id ||
    !payload.slug
  ) {
    return {
      status: 404,
      data: null,
      error: `Missing ${errorFields.join(', ')} on body`,
      errorFields,
    };
  }

  try {
    const category: CategoryForOne = await prisma.category.create({
      data: {
        name_en: payload.name_en,
        name_id: payload.name_id,
        slug: payload.slug,
        description_en: payload.description_en,
        description_id: payload.description_id,
      },
    });
    return { status: 201, data: normalizeForOne(category), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

import prisma from '@/backend/repository/lib/prisma';
import type { Category } from '@/backend/entity/category/type';
import type { CategoryForOne, UpdateOneProps } from './types';
import { normalizerForOne } from './normalizer';

interface Result {
  status: number;
  data: {
    new: Category | null;
    old: Category | null;
  } | null;
  error: string | null;
  errorFields?: string[];
}

export const updateOne = async (props: UpdateOneProps): Promise<Result> => {
  const { id, payload } = props;

  const category: CategoryForOne | null = await prisma.category.findUnique({
    where: {
      id,
    },
  });

  if (!category || category === null)
    return {
      status: 404,
      data: null,
      error: 'Unable to find category to edit',
      errorFields: [],
    };

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

  const data: {
    name_en?: string;
    name_id?: string;
    slug?: string;
    description_en?: string;
    description_id?: string;
  } = {
    name_en: payload.name_en,
    name_id: payload.name_id,
    slug: payload.slug,
  };
  if (payload.description_en) payload.description_en = payload.description_en;
  if (payload.description_id) payload.description_id = payload.description_id;

  try {
    const updatedCategory: CategoryForOne = await prisma.category.update({
      where: {
        id,
      },
      data,
    });

    return {
      status: 200,
      data: {
        new: normalizerForOne(updatedCategory),
        old: normalizerForOne(category),
      },
      error: null,
      errorFields,
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      error: JSON.stringify(error),
      errorFields,
    };
  }
};

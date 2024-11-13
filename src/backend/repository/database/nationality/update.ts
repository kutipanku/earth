import prisma from '@/backend/repository/lib/prisma';
import type { Nationality } from '@/backend/entity/nationality/type';
import type { NationalityForOne, UpdateOneProps } from './types';
import { normalizerForOne } from './normalizer';

interface Result {
  status: number;
  data: {
    new: Nationality | null;
    old: Nationality | null;
  } | null;
  error: string | null;
  errorFields?: string[];
}

export const updateOne = async (props: UpdateOneProps): Promise<Result> => {
  const { id, payload } = props;

  const nationality: NationalityForOne | null =
    await prisma.nationality.findUnique({
      where: {
        id,
      },
    });

  if (!nationality || nationality === null)
    return {
      status: 404,
      data: null,
      error: 'Unable to find nationality to edit',
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
    flag?: string;
  } = {
    name_en: payload.name_en,
    name_id: payload.name_id,
    slug: payload.slug,
  };
  if (payload.flag) payload.flag = payload.flag;

  try {
    const updatedNationality: NationalityForOne =
      await prisma.nationality.update({
        where: {
          id,
        },
        data,
      });

    return {
      status: 200,
      data: {
        new: normalizerForOne(updatedNationality),
        old: normalizerForOne(nationality),
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

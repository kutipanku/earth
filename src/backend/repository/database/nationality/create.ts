import prisma from '@/backend/repository/lib/prisma';
import type { Nationality } from '@/backend/entity/nationality/type';
import type { NationalityForOne, CreateOneProps } from './types';
import { normalizerForOne } from './normalizer';

interface Result {
  status: number;
  data: Nationality | null;
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
    const nationality: NationalityForOne = await prisma.nationality.create({
      data: {
        name_en: payload.name_en,
        name_id: payload.name_id,
        slug: payload.slug,
        flag: payload.flag,
      },
    });
    return { status: 201, data: normalizerForOne(nationality), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

import prisma from '@/backend/repository/lib/prisma';
import type { Profession } from '@/backend/entity/profession/type';
import type { ProfessionForOne, CreateOneProps } from './types';
import { normalizerForOne } from './normalizer';

interface Result {
  status: number;
  data: Profession | null;
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
    const profession: ProfessionForOne = await prisma.profession.create({
      data: {
        name_en: payload.name_en,
        name_id: payload.name_id,
        slug: payload.slug,
        icon: payload.icon,
      },
    });
    return { status: 201, data: normalizerForOne(profession), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

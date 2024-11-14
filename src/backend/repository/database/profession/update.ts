import prisma from '@/backend/repository/lib/prisma';
import type { Profession } from '@/backend/entity/profession/type';
import type { ProfessionForOne, UpdateOneProps } from './types';
import { normalizerForOne } from './normalizer';

interface Result {
  status: number;
  data: {
    new: Profession | null;
    old: Profession | null;
  } | null;
  error: string | null;
  errorFields?: string[];
}

export const updateOne = async (props: UpdateOneProps): Promise<Result> => {
  const { id, payload } = props;

  const profession: ProfessionForOne | null =
    await prisma.profession.findUnique({
      where: {
        id,
      },
    });

  if (!profession || profession === null)
    return {
      status: 404,
      data: null,
      error: 'Unable to find profession to edit',
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
    icon?: string;
  } = {
    name_en: payload.name_en,
    name_id: payload.name_id,
    slug: payload.slug,
  };
  if (payload.icon) payload.icon = payload.icon;

  try {
    const updatedProfession: ProfessionForOne = await prisma.profession.update({
      where: {
        id,
      },
      data,
    });

    return {
      status: 200,
      data: {
        new: normalizerForOne(updatedProfession),
        old: normalizerForOne(profession),
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

import prisma from '@/backend/repository/lib/prisma';
import type { Tag } from '@/backend/entity/tag/type';
import type { TagForOne, UpdateOneProps } from './types';
import { normalizerForOne } from './normalizer';

interface Result {
  status: number;
  data: {
    new: Tag | null;
    old: Tag | null;
  } | null;
  error: string | null;
  errorFields?: string[];
}

export const updateOne = async (props: UpdateOneProps): Promise<Result> => {
  const { id, payload } = props;

  const tag: TagForOne | null = await prisma.tag.findUnique({
    where: {
      id,
    },
  });

  if (!tag || tag === null)
    return {
      status: 404,
      data: null,
      error: 'Unable to find tag to edit',
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
    const updatedTag: TagForOne = await prisma.tag.update({
      where: {
        id,
      },
      data,
    });

    return {
      status: 200,
      data: {
        new: normalizerForOne(updatedTag),
        old: normalizerForOne(tag),
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

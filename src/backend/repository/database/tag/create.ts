import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Tag } from '@backend/entity/tag/type';
import type { ResultOne } from '../types';
import type { InputTagCreate, ResponseTag } from './types';

type TagResultOne = ResultOne<Tag>;

export const createOne = async (props: Tag): Promise<TagResultOne> => {
  const payload: InputTagCreate = {
    data: {
      slug: props.slug,
      name_en: props.name.eng ?? '',
      name_id: props.name.ind ?? '',
      description_en: props.description.eng ?? '',
      description_id: props.description.ind ?? '',
    },
  };

  try {
    const tag: ResponseTag = await prisma.tag.create(payload);
    return {
      success: true,
      status: 201,
      data: normalizeForOne(tag),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 400,
      data: null,
      error: JSON.stringify(error),
    };
  }
};

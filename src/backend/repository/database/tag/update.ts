import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Tag } from '@backend/entity/tag/type';
import type { ResultOne } from '../types';
import type { InputTagUpdate, ResponseTag } from './types';

type TagResultOne = ResultOne<Tag>;

export const updateOne = async (props: Tag): Promise<TagResultOne> => {
  const payload: InputTagUpdate = {
    where: {
      id: props.id,
    },
    data: {
      slug: props.slug,
      name_en: props.name.eng ?? '',
      name_id: props.name.ind ?? '',
      description_en: props.description.eng ?? '',
      description_id: props.description.ind ?? '',
    },
  };

  try {
    const updatedTag: ResponseTag = await prisma.tag.update(payload);

    return {
      success: true,
      status: 200,
      data: normalizeForOne(updatedTag),
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

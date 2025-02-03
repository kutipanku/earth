import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Tag } from '@backend/entity/tag/type';
import type { ResultOne } from '../types';
import type { InputTagUpdate, ResponseTag } from './types';

type TagResultOne = ResultOne<Tag>;

export const updateOne = async (
  props: InputTagUpdate
): Promise<TagResultOne> => {
  try {
    const updatedTag: ResponseTag = await prisma.tag.update(props);

    return {
      status: 200,
      data: normalizeForOne(updatedTag),
      error: null,
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      error: JSON.stringify(error),
    };
  }
};

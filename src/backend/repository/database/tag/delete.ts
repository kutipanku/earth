import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Tag } from '@/backend/entity/tag/type';
import type { ResultOne } from '../types';
import type { InputTagDelete, ResponseTag } from './types';

type TagResultOne = ResultOne<Tag>;

export const deleteOne = async (
  props: InputTagDelete
): Promise<TagResultOne> => {
  try {
    const deletedTag: ResponseTag = await prisma.tag.delete(props);
    return {
      status: 200,
      data: normalizeForOne(deletedTag),
      error: null,
    };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

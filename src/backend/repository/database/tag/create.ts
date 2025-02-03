import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Tag } from '@backend/entity/tag/type';
import type { ResultOne } from '../types';
import type { InputTagCreate, ResponseTag } from './types';

type TagResultOne = ResultOne<Tag>;

export const createOne = async (
  props: InputTagCreate
): Promise<TagResultOne> => {
  try {
    const tag: ResponseTag = await prisma.tag.create(props);
    return { status: 201, data: normalizeForOne(tag), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

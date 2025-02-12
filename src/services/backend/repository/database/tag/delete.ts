import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Tag, Find } from '@beckend/entity/tag/type';
import type { ResultOne } from '../types';
import type { InputTagDelete, ResponseTag } from './types';

type TagResultOne = ResultOne<Tag>;

export const deleteOne = async (props: Find): Promise<TagResultOne> => {
  const payload: InputTagDelete = {
    where: {
      id: props.id || '',
    },
  };

  try {
    const deletedTag: ResponseTag = await prisma.tag.delete(payload);
    return {
      success: true,
      status: 200,
      data: normalizeForOne(deletedTag),
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

import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Author } from '@backend/entity/author/type';
import type { ResultOne } from '../types';
import type { InputAuthorUpdate, ResponseAuthorExtended } from './types';

type AuthorResultOne = ResultOne<Author>;

export const updateOne = async (
  props: InputAuthorUpdate
): Promise<AuthorResultOne> => {
  try {
    const updatedAuthor: ResponseAuthorExtended = await prisma.author.update({
      ...props,
      include: {
        nationality: true,
        profession: true,
      },
    });

    return {
      status: 200,
      data: normalizeForOne(updatedAuthor),
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

import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Author } from '@backend/entity/author/type';
import type { ResultOne } from '../types';
import type { InputAuthorDelete, ResponseAuthorExtended } from './types';

type AuthorResultOne = ResultOne<Author>;

export const deleteOne = async (
  props: InputAuthorDelete
): Promise<AuthorResultOne> => {
  try {
    const deletedAuthor: ResponseAuthorExtended = await prisma.author.delete({
      ...props,
      include: {
        nationality: true,
        profession: true,
      },
    });
    return { status: 200, data: normalizeForOne(deletedAuthor), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

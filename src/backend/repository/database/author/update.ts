import prisma from '@/backend/repository/lib/prisma';
import type { Author } from '@/backend/entity/author/type';
import type { InputAuthorUpdate, ResponseAuthorExtended } from './types';
import { normalizeForOne } from './normalizer';
import type { ResultOne } from '../types';

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

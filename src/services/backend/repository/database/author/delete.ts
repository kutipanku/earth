import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Author, Find } from '@backend/entity/author/type';
import type { ResultOne } from '../types';
import type { InputAuthorDelete, ResponseAuthorExtended } from './types';

type AuthorResultOne = ResultOne<Author>;

export const deleteOne = async (props: Find): Promise<AuthorResultOne> => {
  const payload: InputAuthorDelete = {
    where: {
      id: props.id || '',
    },
  };

  try {
    const deletedAuthor: ResponseAuthorExtended = await prisma.author.delete({
      ...payload,
      include: {
        nationality: true,
        profession: true,
      },
    });
    return {
      success: true,
      status: 200,
      data: normalizeForOne(deletedAuthor),
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

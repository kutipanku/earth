import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Author } from '@backend/entity/author/type';
import type { ResultOne } from '../types';
import type { InputAuthorCreate, ResponseAuthorExtended } from './types';

type AuthorResultOne = ResultOne<Author>;

export const createOne = async (
  props: InputAuthorCreate
): Promise<AuthorResultOne> => {
  try {
    const author: ResponseAuthorExtended = await prisma.author.create({
      ...props,
      include: {
        nationality: true,
        profession: true,
      },
    });
    return { status: 201, data: normalizeForOne(author), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

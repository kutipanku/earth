import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Quote } from '@backend/entity/quote/type';
import type { ResultOne } from '../types';
import type { InputQuoteDelete, ResponseQuote } from './types';

type QuoteResultOne = ResultOne<Quote>;

export const deleteOne = async (
  props: InputQuoteDelete
): Promise<QuoteResultOne> => {
  try {
    const deletedQuote: ResponseQuote = await prisma.quote.delete({
      ...props,
      include: {
        author: {
          include: {
            nationality: true,
            profession: true,
          },
        },
        category: true,
        tags: true,
      },
    });
    return { status: 200, data: normalizeForOne(deletedQuote), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

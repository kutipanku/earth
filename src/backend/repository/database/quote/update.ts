import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Quote } from '@backend/entity/quote/type';
import type { ResultOne } from '../types';
import type { InputQuoteUpdate, ResponseQuote } from './types';

type QuoteResultOne = ResultOne<Quote>;

export const updateOne = async (
  props: InputQuoteUpdate
): Promise<QuoteResultOne> => {
  try {
    const updatedQuote: ResponseQuote = await prisma.quote.update({
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

    return {
      status: 200,
      data: normalizeForOne(updatedQuote),
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

import prisma from '../../lib/prisma';
import { normalizeForOne } from './normalizer';

import type { Quote } from '@backend/entity/quote/type';
import type { ResultOne } from '../types';
import type { InputQuoteCreate, ResponseQuote } from './types';

type QuoteResultOne = ResultOne<Quote>;

export const createOne = async (
  props: InputQuoteCreate
): Promise<QuoteResultOne> => {
  try {
    const quote: ResponseQuote = await prisma.quote.create({
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
    return { status: 201, data: normalizeForOne(quote), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

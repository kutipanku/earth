import prisma from '../../lib/prisma';
import { normalizeForOne, normalizeForList } from './normalizer';

import type { Quote } from '@backend/entity/quote/type';
import type {
  InputQuoteGetOne,
  InputQuoteGetMany,
  ResponseQuote,
} from './types';
import type { ResultOne, ResultMany } from '../types';

type QuoteResultOne = ResultOne<Quote>;
type QuoteResultMany = ResultMany<Quote>;

export const findMany = async (
  props: InputQuoteGetMany
): Promise<QuoteResultMany> => {
  try {
    const quotes: ResponseQuote[] = await prisma.quote.findMany({
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

    const count = await prisma.quote.count({
      where: props.where,
    });

    return {
      data: { list: normalizeForList(quotes), total: count },
      error: null,
      status: 200,
    };
  } catch (error) {
    return {
      data: { list: [], total: 0 },
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

export const finOne = async (
  props: InputQuoteGetOne
): Promise<QuoteResultOne> => {
  try {
    const quote: ResponseQuote | null = await prisma.quote.findFirst({
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

    if (quote === null) {
      return { data: null, error: 'Not found', status: 404 };
    }
    return { data: normalizeForOne(quote), error: null, status: 200 };
  } catch (error) {
    return {
      data: null,
      error: JSON.stringify(error),
      status: 500,
    };
  }
};

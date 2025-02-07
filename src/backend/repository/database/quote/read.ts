import prisma from '../../lib/prisma';
import { normalizeForOne, normalizeForList } from './normalizer';

import type { Quote, Filter, Find } from '@backend/entity/quote/type';
import type {
  InputQuoteGetOne,
  InputQuoteGetMany,
  ResponseQuote,
} from './types';
import type { ResultOne, ResultMany } from '../types';

type QuoteResultOne = ResultOne<Quote>;
type QuoteResultMany = ResultMany<Quote>;

export const findMany = async (props: Filter): Promise<QuoteResultMany> => {
  const payload: InputQuoteGetMany = {
    skip: props.page * props.limit,
    take: props.limit,
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(props.author && {
        author: {
          id: props.author,
        },
      }),
      ...(props.category && {
        category: {
          id: props.category,
        },
      }),
      ...(props.tags && {
        tags: {
          some: {
            id: {
              in: props.tags,
            },
          },
        },
      }),
      ...(props.content && {
        OR: [
          { content_en: { contains: props.content, mode: 'insensitive' } },
          { content_id: { contains: props.content, mode: 'insensitive' } },
        ],
      }),
    },
  };

  try {
    const quotes: ResponseQuote[] = await prisma.quote.findMany({
      ...payload,
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
      where: payload.where,
    });

    return {
      success: true,
      status: 200,
      data: { list: normalizeForList(quotes), total: count },
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: { list: [], total: 0 },
      error: JSON.stringify(error),
    };
  }
};

export const finOne = async (props: Find): Promise<QuoteResultOne> => {
  const payload: InputQuoteGetOne = {
    where: {
      id: props.id ?? '',
    },
  };

  try {
    const quote: ResponseQuote | null = await prisma.quote.findFirst({
      ...payload,
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
      return { success: false, status: 404, data: null, error: 'Not found' };
    }
    return {
      success: true,
      status: 200,
      data: normalizeForOne(quote),
      error: null,
    };
  } catch (error) {
    return {
      success: false,
      status: 500,
      data: null,
      error: JSON.stringify(error),
    };
  }
};

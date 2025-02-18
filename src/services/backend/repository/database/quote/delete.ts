import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Quote, Find } from '@backend/entity/quote/type';
import type { ResultOne } from '../types';
import type { InputQuoteDelete, ResponseQuote } from './types';

type QuoteResultOne = ResultOne<Quote>;

export const deleteOne = async (props: Find): Promise<QuoteResultOne> => {
  const payload: InputQuoteDelete = {
    where: {
      id: props.id || '',
    },
  };

  try {
    const deletedQuote: ResponseQuote = await prisma.quote.delete({
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
    return {
      success: true,
      status: 200,
      data: normalizeForOne(deletedQuote),
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

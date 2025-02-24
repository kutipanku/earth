import prisma from '../../lib/prisma/prisma';
import { normalizeForOne } from './normalizer';

import type { Quote } from '@backend/entity/quote/type';
import type { ResultOne } from '../types';
import type { InputQuoteCreate, ResponseQuote } from './types';

type QuoteResultOne = ResultOne<Quote>;

export const createOne = async (props: Quote): Promise<QuoteResultOne> => {
  const payload: InputQuoteCreate = {
    data: {
      slug: props.slug,
      content_eng: props.content.eng,
      content_ind: props.content.ind,
      description_eng: props.description.eng,
      description_ind: props.description.ind,
      image_url_eng: props.url.eng,
      image_url_ind: props.url.ind,
      ...(props.ids?.author_id && { author_id: props.ids.author_id }),
      ...(props.ids?.category_id && { category_id: props.ids.category_id }),
      ...(props.ids?.tags_id && {
        tags: {
          connect: props.ids.tags_id.map((tag_id) => ({ id: tag_id })),
        },
      }),
    },
  };
  try {
    const quote: ResponseQuote = await prisma.quote.create({
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
      status: 201,
      data: normalizeForOne(quote),
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

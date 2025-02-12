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
      content_en: props.content.eng,
      content_id: props.content.ind,
      description_en: props.description.eng,
      description_id: props.description.ind,
      image_en_url: props.url.eng,
      image_id_url: props.url.ind,
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

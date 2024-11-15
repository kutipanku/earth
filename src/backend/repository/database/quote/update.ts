import prisma from '@/backend/repository/lib/prisma';
import type { Quote } from '@/backend/entity/quote/type';
import type { QuoteForOne, UpdateOneProps } from './types';
import { normalizeForOne } from './normalizer';

interface Result {
  status: number;
  data: {
    new: Quote | null;
    old: Quote | null;
  } | null;
  error: string | null;
  errorFields?: string[];
}

export const updateOne = async (props: UpdateOneProps): Promise<Result> => {
  const { id, payload } = props;

  const quote: QuoteForOne | null = await prisma.quote.findUnique({
    where: {
      id,
    },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  });

  if (!quote || quote === null)
    return {
      status: 404,
      data: null,
      error: 'Unable to find quote to edit',
      errorFields: [],
    };

  type BodyKey = keyof typeof payload;
  const requiredFields: BodyKey[] = ['slug'];

  const errorFields = requiredFields.filter((key) => !payload[key]);

  if (errorFields.length || !payload.slug) {
    return {
      status: 404,
      data: null,
      error: `Missing ${errorFields.join(', ')} on body`,
      errorFields,
    };
  }

  const data: {
    slug: string;
    content_id?: string;
    content_en?: string;
    description_en?: string;
    description_id?: string;
    image_id_url?: string;
    image_en_url?: string;
    author_id?: string;
    category_id?: string;
    tags?: {
      connect: {
        id: string;
      }[];
    };
  } = {
    slug: payload.slug,
  };

  if (payload.content_en) payload.content_en = payload.content_en;
  if (payload.content_id) payload.content_id = payload.content_id;
  if (payload.description_id) payload.description_id = payload.description_id;
  if (payload.description_en) payload.description_en = payload.description_en;
  if (payload.image_id_url) payload.image_id_url = payload.image_id_url;
  if (payload.image_en_url) payload.image_en_url = payload.image_en_url;
  if (payload.author_id) payload.author_id = payload.author_id;
  if (payload.category_id) payload.category_id = payload.category_id;
  if (payload.tag_ids)
    data.tags = {
      connect: payload.tag_ids.map((tag_id) => ({ id: tag_id })),
    };

  try {
    const updatedQuote: QuoteForOne = await prisma.quote.update({
      where: {
        id,
      },
      include: {
        author: true,
        category: true,
        tags: true,
      },
      data,
    });

    return {
      status: 200,
      data: {
        new: normalizeForOne(updatedQuote),
        old: normalizeForOne(quote),
      },
      error: null,
      errorFields,
    };
  } catch (error) {
    return {
      status: 400,
      data: null,
      error: JSON.stringify(error),
      errorFields,
    };
  }
};

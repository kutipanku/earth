import prisma from '@/backend/repository/lib/prisma';
import type { Quote } from '@/backend/entity/quote/type';
import type { QuoteForOne, CreateOneProps } from './types';
import { normalizerForOne } from './normalizer';

interface Result {
  status: number;
  data: Quote | null;
  error: string | null;
  errorFields?: string[];
}

export const createOne = async (props: CreateOneProps): Promise<Result> => {
  const { payload } = props;

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
    tag_ids?: string;
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
  if (payload.tag_ids) payload.tag_ids = payload.tag_ids;

  try {
    const quote: QuoteForOne = await prisma.quote.create({
      data,
      include: {
        author: true,
        category: true,
        tags: true,
      },
    });
    return { status: 201, data: normalizerForOne(quote), error: null };
  } catch (error) {
    return { status: 400, data: null, error: JSON.stringify(error) };
  }
};

import prisma from '@/backend/repository/lib/prisma';
import type { Quote, QuoteListItem } from '@/backend/entity/quote/type';
import type {
  QuoteForOne,
  QuoteForMany,
  FindOneProps,
  FindManyProps,
} from './types';
import { normalizerForOne, normalizerForList } from './normalizer';

interface ResultMany {
  status: number;
  data: {
    list: QuoteListItem[];
    total: number;
  };
  error: string | null;
  errorFields?: string[];
}

interface ResultOne {
  status: number;
  data: Quote | null;
  error: string | null;
  errorFields?: string[];
}

export const findMany = async (props: FindManyProps): Promise<ResultMany> => {
  const {
    page,
    limit,
    filter_content_id = '',
    filter_content_en = '',
    filter_category_id = '',
    filter_category_en = '',
    filter_tag_id = '',
    filter_tag_en = '',
    filter_author = '',
  } = props;

  const quotes: QuoteForMany[] = await prisma.quote.findMany({
    skip: Number(page) * Number(limit),
    take: Number(limit),
    orderBy: {
      created_at: 'desc',
    },
    where: {
      ...(filter_content_id && {
        content_id: { contains: filter_content_id, mode: 'insensitive' },
      }),
      ...(filter_content_en && {
        content_en: { contains: filter_content_en, mode: 'insensitive' },
      }),
      ...((filter_category_id || filter_category_en) && {
        category: {
          ...(filter_category_id && {
            name_id: { contains: filter_category_id, mode: 'insensitive' },
          }),
          ...(filter_category_en && {
            name_en: { contains: filter_category_en, mode: 'insensitive' },
          }),
        },
      }),
      ...((filter_tag_id || filter_tag_en) && {
        tag: {
          ...(filter_tag_id && {
            name_id: { contains: filter_tag_id, mode: 'insensitive' },
          }),
          ...(filter_tag_en && {
            name_en: { contains: filter_tag_en, mode: 'insensitive' },
          }),
        },
      }),
      ...(filter_author && {
        author: {
          name: { contains: filter_author, mode: 'insensitive' },
        },
      }),
    },
    include: {
      author: {
        select: {
          id: true,
          name: true,
        },
      },
      category: {
        select: {
          id: true,
          name_id: true,
          name_en: true,
        },
      },
      tags: {
        select: {
          id: true,
          name_id: true,
          name_en: true,
        },
      },
    },
  });

  const count = await prisma.quote.count({
    where: {
      ...(filter_content_id && {
        content_id: { contains: filter_content_id, mode: 'insensitive' },
      }),
      ...(filter_content_en && {
        content_en: { contains: filter_content_en, mode: 'insensitive' },
      }),
      ...((filter_category_id || filter_category_en) && {
        category: {
          ...(filter_category_id && {
            name_id: { contains: filter_category_id, mode: 'insensitive' },
          }),
          ...(filter_category_en && {
            name_en: { contains: filter_category_en, mode: 'insensitive' },
          }),
        },
      }),
      ...((filter_tag_id || filter_tag_en) && {
        tag: {
          ...(filter_tag_id && {
            name_id: { contains: filter_tag_id, mode: 'insensitive' },
          }),
          ...(filter_tag_en && {
            name_en: { contains: filter_tag_en, mode: 'insensitive' },
          }),
        },
      }),
      ...(filter_author && {
        author: {
          name: { contains: filter_author, mode: 'insensitive' },
        },
      }),
    },
  });

  return {
    data: { list: normalizerForList(quotes), total: count },
    error: null,
    status: 200,
  };
};

export const finOne = async (props: FindOneProps): Promise<ResultOne> => {
  const { id } = props;

  const quote: QuoteForOne | null = await prisma.quote.findFirst({
    where: { id },
    include: {
      author: true,
      category: true,
      tags: true,
    },
  });

  if (quote === null) {
    return { data: null, error: 'Not found', status: 404 };
  }
  return { data: normalizerForOne(quote), error: null, status: 200 };
};

import type { Quote } from '@backend/entity/quote/type';
import type { GetQuote, GetQuotes } from './contract';

type ResponseGetQuote = GetQuote['response']['data'];
type ResponseGetQuotesList = GetQuotes['response']['data']['list'];

export const normalizeOne = (item: Quote | null) => {
  if (item === null) return null;

  const normalizedItem: ResponseGetQuote = {
    id: item.id,
    slug: item.slug,
    content: {
      ind: item.content.ind,
      eng: item.content.eng,
    },
    description: {
      ind: item.description.ind,
      eng: item.description.eng,
    },
    url: {
      ind: item.url.ind,
      eng: item.url.eng,
    },
    author: {
      id: item.author?.id || '',
      name: item.author?.name || '',
    },
    category: {
      id: item.category?.id || '',
      name: item.category?.name.eng || '',
    },
    tags:
      item.tags?.map((tag) => ({
        id: tag?.id || '',
        name: tag?.name.eng || '',
      })) || [],
    metadata: item.metadata && {
      created_at: item.metadata.created_at.toISOString(),
      updated_at:
        item.metadata.updated_at !== null
          ? item.metadata.updated_at.toISOString()
          : item.metadata.created_at.toISOString(),
    },
  };

  return normalizedItem;
};

export const normalizeForList = (items: Quote[] | null) => {
  if (items === null) return [];

  const normalizedItem: ResponseGetQuotesList = items.map((item) => ({
    id: item.id,
    slug: item.slug,
    content: {
      ind: item.content.ind,
      eng: item.content.eng,
    },
    author: {
      id: item.author?.id || '',
      name: item.author?.name || '',
    },
    category: {
      id: item.category?.id || '',
      name: item.category?.name.eng || '',
    },
    tags:
      item.tags?.map((tag) => ({
        id: tag?.id || '',
        name: tag?.name.eng || '',
      })) || [],
    metadata: item.metadata && {
      created_at: item.metadata.created_at.toISOString(),
      updated_at:
        item.metadata.updated_at !== null
          ? item.metadata.updated_at.toISOString()
          : item.metadata.created_at.toISOString(),
    },
  }));

  return normalizedItem;
};

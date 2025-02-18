import type { Quote, QuoteVariable } from '@frontend/entity/quote/types';
import type { AddQuote, GetQuote, GetQuotes } from './types';

type AddQuoteRequestBody = AddQuote['request']['body'];
type GetQuoteResponseData = GetQuote['response']['data'];
type GetQuotesResponseDataList = GetQuotes['response']['data']['list'];

export const constructExternalBodyPayload = (internalData: Quote) => {
  const externalData: AddQuoteRequestBody = {
    slug: internalData.slug,
    content: {
      eng: internalData.content.eng,
      ind: internalData.content.ind,
    },
    description: {
      eng: internalData.description.eng,
      ind: internalData.description.ind,
    },
    ...(internalData.author && { author_id: internalData.author?.id }),
    ...(internalData.category && { category_id: internalData.category?.id }),
    ...(internalData.tags && {
      tags_id: internalData.tags?.map((tag) => tag.id),
    }),
  };

  return externalData;
};

export const constructOwnSystemData = (externalData: GetQuoteResponseData) => {
  if (externalData === null) return null;

  const internalData: Quote = {
    id: externalData.id ?? '',
    slug: externalData.slug,
    content: {
      ind: externalData.content.ind ?? '',
      eng: externalData.content.eng ?? '',
    },
    description: {
      ind: externalData.description.ind ?? '',
      eng: externalData.description.eng ?? '',
    },
    imageUrl: {
      ind: externalData.url.ind ?? '',
      eng: externalData.url.eng ?? '',
    },
    author: externalData.author,
    category: externalData.category,
    tags: externalData.tags,
    metadata: {
      createdAt: externalData.metadata?.created_at || '',
      updatedAt: externalData.metadata?.updated_at || '',
    },
  };

  return internalData;
};

export const constructOwnSystemFieldData = (
  externalData: GetQuoteResponseData,
  type: 'edit' | 'detail' = 'detail'
) => {
  if (externalData === null) return null;

  const identifier = type === 'edit' ? 'id' : 'name';

  const internalData: QuoteVariable = {
    id: externalData.id,
    slug: externalData.slug,
    contentEng: externalData.content.eng,
    contentInd: externalData.content.ind,
    descriptionEng: externalData.description.eng,
    descriptionInd: externalData.description.ind,
    imageUrlEng: externalData.url.eng,
    imageUrlInd: externalData.url.ind,
    author: externalData.author?.[identifier] || null,
    category: externalData.category?.[identifier] || null,
    tags: externalData.tags.map((tag) => tag[identifier]) || null,
    createdAt: externalData.metadata?.created_at || null,
    updatedAt: externalData.metadata?.updated_at || null,
  };

  return internalData;
};

export const constructOwnSystemRowData = (
  externalDataItems: GetQuotesResponseDataList
) => {
  const internalDataItems: Quote[] = externalDataItems.map((externalData) => {
    return {
      id: externalData.id ?? '',
      slug: externalData.slug,
      content: {
        ind: externalData.content.ind ?? '',
        eng: externalData.content.eng ?? '',
      },
      description: {
        ind: '',
        eng: '',
      },
      imageUrl: {
        ind: '',
        eng: '',
      },
      author: externalData.author,
      category: externalData.category,
      tags: externalData.tags,
      metadata: {
        createdAt: '',
        updatedAt: '',
      },
    };
  });

  return internalDataItems;
};

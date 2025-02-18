import type { Quote, QuoteVariable } from './types';

export const convertToVariable = (quote: Quote): QuoteVariable => ({
  id: quote.id,
  slug: quote.slug,
  contentEng: quote.content.eng,
  contentInd: quote.content.ind,
  descriptionEng: quote.description.eng,
  descriptionInd: quote.description.ind,
  imageUrlEng: quote.imageUrl.eng,
  imageUrlInd: quote.imageUrl.ind,
  author: quote.author?.id || null,
  category: quote.category?.id || null,
  tags: quote.tags?.map((tag) => tag.id) || null,
  createdAt: quote.metadata.createdAt,
  updatedAt: quote.metadata.updatedAt,
});

export const convertFromVariable = (variable: QuoteVariable): Quote => ({
  id: variable.id ?? '',
  slug: variable.slug,
  content: {
    ind: variable.contentInd ?? '',
    eng: variable.contentEng ?? '',
  },
  description: {
    ind: variable.descriptionInd ?? '',
    eng: variable.descriptionEng ?? '',
  },
  imageUrl: {
    ind: variable.imageUrlInd ?? '',
    eng: variable.imageUrlEng ?? '',
  },
  metadata: {
    createdAt: variable.createdAt ?? '',
    updatedAt: variable.updatedAt ?? '',
  },
  author: null,
  ...(variable.author && {
    author: {
      id: variable.author,
      name: '',
    },
  }),
  category: null,
  ...(variable.category && {
    category: {
      id: variable.category,
      name: '',
    },
  }),
  tags: null,
  ...(variable.tags && {
    tags: variable.tags.map((tagId) => ({
      id: tagId,
      name: '',
    })),
  }),
});

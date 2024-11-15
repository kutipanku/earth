import type { Quote, QuoteListItem } from '@/backend/entity/quote/type';
import {
  normalizerForOtherEntity as normalizeAuthor,
  normalizerForOtherEntityList as normalizeAuthorList,
} from '@/backend/repository/database/author/normalizer';
import {
  normalizerForOtherEntity as normalizeCategory,
  normalizerForOtherEntityList as normalizeCategoryList,
} from '@/backend/repository/database/category/normalizer';
import type { QuoteForOne, QuoteForMany } from './types';

export const normalizerForOne = (itemOnDB: QuoteForOne | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Quote = {
    id: itemOnDB.id,
    slug: itemOnDB.slug,
    content: {
      id: itemOnDB.content_id || '',
      en: itemOnDB.content_en || '',
    },
    description: {
      id: itemOnDB.description_id || '',
      en: itemOnDB.description_en || '',
    },
    url: {
      id: itemOnDB.image_id_url || '',
      en: itemOnDB.image_en_url || '',
    },
    author: normalizeAuthor(itemOnDB.author),
    category: normalizeCategory(itemOnDB.category),
    // TODO: integrate with tag entity
    tags: [],
    metadata: {
      created_at: new Date(itemOnDB.created_at),
      updated_at:
        itemOnDB.updated_at === null ? null : new Date(itemOnDB.updated_at),
    },
  };

  return normalizedItem;
};

export const normalizerFoList = (itemsOnDB: QuoteForMany[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: QuoteListItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    slug: item.slug,
    content: {
      id: item.content_id || '',
      en: item.content_en || '',
    },
    author: normalizeAuthorList(item.author),
    category: normalizeCategoryList(item.category),
    tags: [],
  }));

  return normalizedItem;
};

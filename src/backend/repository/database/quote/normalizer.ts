import type { Quote, QuoteListItem } from '@/backend/entity/quote/type';
import {
  normalizeForOtherEntity as normalizeAuthor,
  normalizeForOtherEntityList as normalizeAuthorList,
} from '@/backend/repository/database/author/normalizer';
import {
  normalizeForOtherEntity as normalizeCategory,
  normalizeForOtherEntityList as normalizeCategoryList,
} from '@/backend/repository/database/category/normalizer';
import {
  normalizeForOtherEntity as normalizeTag,
  normalizeForOtherEntityList as normalizeTagList,
} from '@/backend/repository/database/tag/normalizer';
import type { QuoteForOne, QuoteForMany } from './types';

export const normalizeForOne = (itemOnDB: QuoteForOne | null) => {
  if (itemOnDB === null) return null;

  const normalizedItem: Quote = {
    id: itemOnDB.id,
    slug: itemOnDB.slug,
    content: {
      ind: itemOnDB.content_id || '',
      eng: itemOnDB.content_en || '',
    },
    description: {
      ind: itemOnDB.description_id || '',
      eng: itemOnDB.description_en || '',
    },
    url: {
      ind: itemOnDB.image_id_url || '',
      eng: itemOnDB.image_en_url || '',
    },
    author: normalizeAuthor(itemOnDB.author),
    category: normalizeCategory(itemOnDB.category),
    tags: normalizeTag(itemOnDB.tags),
    metadata: {
      created_at: new Date(itemOnDB.created_at),
      updated_at:
        itemOnDB.updated_at === null ? null : new Date(itemOnDB.updated_at),
    },
  };

  return normalizedItem;
};

export const normalizeForList = (itemsOnDB: QuoteForMany[] | null) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: QuoteListItem[] = itemsOnDB.map((item) => ({
    id: item.id,
    slug: item.slug,
    content: {
      ind: item.content_id || '',
      eng: item.content_en || '',
    },
    author: normalizeAuthorList(item.author),
    category: normalizeCategoryList(item.category),
    tags: normalizeTagList(item.tags),
  }));

  return normalizedItem;
};

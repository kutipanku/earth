import { normalizeForOne as normalizeAuthor } from '../author/normalizer';
import { normalizeForOne as normalizeCategory } from '../category/normalizer';
import { normalizeForOne as normalizeTag } from '../tag/normalizer';

import type { Quote } from '@backend/entity/quote/type';
import type { Tag } from '@backend/entity/tag/type';
import type { ResponseQuote, ResponseQuoteSimplified } from './types';

const DUMMY_DATE = new Date();
const LEAVE_EMPTY = '';

export const normalizeForOne = (itemOnDB: ResponseQuote | null) => {
  if (itemOnDB === null) return null;
  const normalizedItem: Quote = {
    id: itemOnDB.id,
    slug: itemOnDB.slug,
    content: {
      ind: itemOnDB.content_ind || LEAVE_EMPTY,
      eng: itemOnDB.content_eng || LEAVE_EMPTY,
    },
    description: {
      ind: itemOnDB.description_ind || LEAVE_EMPTY,
      eng: itemOnDB.description_eng || LEAVE_EMPTY,
    },
    url: {
      ind: itemOnDB.image_url_ind || LEAVE_EMPTY,
      eng: itemOnDB.image_url_eng || LEAVE_EMPTY,
    },
    author: normalizeAuthor(itemOnDB.author),
    category: normalizeCategory(itemOnDB.category),
    tags: itemOnDB.tags
      .filter((tag) => tag !== null)
      .map((tag) => normalizeTag(tag)) as Tag[],
    metadata: {
      created_at: new Date(itemOnDB.created_at),
      updated_at:
        itemOnDB.updated_at === null ? null : new Date(itemOnDB.updated_at),
    },
  };

  return normalizedItem;
};

export const normalizeForList = (
  itemsOnDB: ResponseQuoteSimplified[] | null
) => {
  if (itemsOnDB === null) return [];

  const normalizedItem: Quote[] = itemsOnDB.map((item) => ({
    id: item.id,
    slug: item.slug,
    content: {
      ind: item.content_ind || LEAVE_EMPTY,
      eng: item.content_eng || LEAVE_EMPTY,
    },
    description: {
      ind: LEAVE_EMPTY,
      eng: LEAVE_EMPTY,
    },
    url: {
      ind: LEAVE_EMPTY,
      eng: LEAVE_EMPTY,
    },
    metadata: {
      created_at: item.created_at,
      updated_at: item.updated_at,
    },
    author:
      item.author &&
      normalizeAuthor({
        id: item.author.id,
        name: item.author.name,
        slug: LEAVE_EMPTY,
        dob: null,
        picture_url: null,
        description_ind: null,
        description_eng: null,
        nationality_id: null,
        profession_id: null,
        nationality: null,
        profession: null,
        created_at: DUMMY_DATE,
        updated_at: DUMMY_DATE,
      }),
    category:
      item.category &&
      normalizeCategory({
        id: item.category.id,
        name_eng: item.category.name_eng,
        slug: LEAVE_EMPTY,
        name_ind: LEAVE_EMPTY,
        description_eng: null,
        description_ind: null,
        created_at: DUMMY_DATE,
        updated_at: DUMMY_DATE,
      }),
    tags:
      item.tags &&
      (item.tags
        .filter((tag) => tag !== null)
        .map((tag) =>
          normalizeTag({
            id: tag.id,
            name_eng: tag.name_eng,
            name_ind: LEAVE_EMPTY,
            slug: LEAVE_EMPTY,
            description_eng: null,
            description_ind: null,
            created_at: DUMMY_DATE,
            updated_at: DUMMY_DATE,
          })
        ) as Tag[]),
  }));

  return normalizedItem;
};
